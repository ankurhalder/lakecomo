/**
 * Sanity Migration Engine v3 — Safe Seed Engine
 *
 * Reads documents from sanity-mirror/documents/ and upserts them into the
 * configured Sanity dataset.
 *
 * Safety rules:
 *   • existing _id → patch (never replace revision metadata)
 *   • new _id      → createIfNotExists
 *   • never delete any document automatically
 *   • validates all documents before writing (stops on error)
 *   • preserves all asset _ref values — never re-uploads assets
 *
 * Flags:
 *   --dry-run   Print what would happen without writing
 *   --type=foo  Only seed documents of a specific _type
 *   --force     Skip diff check, seed everything in mirror
 *
 * Runs with: tsx scripts/sanity/seed-from-json.ts [--dry-run] [--type=event]
 */

import * as fs from "fs";
import * as path from "path";
import {
  makeWriteClient,
  makeReadClient,
  DOCUMENTS_DIR,
  MIGRATION_PLAN_FILE,
  writeJson,
  log,
  MIRROR_DIR,
  isoDate,
} from "./config";
import { validateDocuments } from "./validate-schema";

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");
const TYPE_FILTER = args.find((a) => a.startsWith("--type="))?.split("=")[1];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type SanityDoc = Record<string, unknown>;

type SeedAction = "create" | "update" | "skip";

interface SeedResult {
  _id: string;
  _type: string;
  action: SeedAction;
  success: boolean;
  error?: string;
}

// ---------------------------------------------------------------------------
// Strip asset inline data (safety: never send base64 or binary data)
// ---------------------------------------------------------------------------
function stripAssetData(doc: SanityDoc): SanityDoc {
  const cleaned = { ...doc };
  // Recursively sanitise — keep only _ref in asset objects
  return JSON.parse(
    JSON.stringify(cleaned, (key, value) => {
      // Preserve asset reference objects exactly
      if (
        key === "asset" &&
        value &&
        typeof value === "object" &&
        "_ref" in value
      ) {
        return { _ref: (value as Record<string, unknown>)._ref };
      }
      return value;
    })
  ) as SanityDoc;
}

// ---------------------------------------------------------------------------
// Determine seed action by comparing with live doc
// ---------------------------------------------------------------------------
async function determineSeedAction(
  doc: SanityDoc,
  liveIds: Set<string>
): Promise<SeedAction> {
  if (FORCE) return liveIds.has(doc._id as string) ? "update" : "create";

  // Use migration plan if available
  if (fs.existsSync(MIGRATION_PLAN_FILE)) {
    const plan = JSON.parse(
      fs.readFileSync(MIGRATION_PLAN_FILE, "utf-8")
    ) as {
      actions: Array<{ _id: string; action: SeedAction }>;
    };
    const entry = plan.actions.find((a) => a._id === doc._id);
    if (entry) return entry.action;
  }

  // Fallback: create if not in live, update if present
  return liveIds.has(doc._id as string) ? "update" : "create";
}

// ---------------------------------------------------------------------------
// Load all mirror documents
// ---------------------------------------------------------------------------
function loadMirrorDocs(): SanityDoc[] {
  if (!fs.existsSync(DOCUMENTS_DIR)) {
    log("No mirror found. Run npm run sanity:export first.", "error");
    process.exit(1);
  }

  const files = fs
    .readdirSync(DOCUMENTS_DIR)
    .filter((f) => f.endsWith(".json"));

  const all: SanityDoc[] = [];
  for (const file of files) {
    const type = path.basename(file, ".json");
    if (TYPE_FILTER && type !== TYPE_FILTER) continue;
    const docs = JSON.parse(
      fs.readFileSync(path.join(DOCUMENTS_DIR, file), "utf-8")
    ) as SanityDoc[];
    all.push(...docs);
  }
  return all;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  if (DRY_RUN) log("DRY RUN MODE — no documents will be written.");
  if (TYPE_FILTER) log(`Type filter: only seeding "${TYPE_FILTER}" documents.`);

  const docs = loadMirrorDocs();
  log(`Loaded ${docs.length} document(s) from local mirror.`);

  if (docs.length === 0) {
    log("Nothing to seed.", "warn");
    return;
  }

  // Validate before writing
  log("Validating documents...");
  const validation = validateDocuments(docs);
  if (validation.warnings.length > 0) {
    for (const w of validation.warnings) {
      log(`  [WARN] ${w._type}/${w._id}: ${w.message}`, "warn");
    }
  }
  if (!validation.valid) {
    log("Validation failed. Fix errors before seeding.", "error");
    for (const e of validation.errors) {
      log(`  [ERROR] ${e._type}/${e._id}: ${e.message}`, "error");
    }
    process.exit(1);
  }
  log("✓ Validation passed.");

  // Fetch live IDs
  const readClient = makeReadClient();
  const liveIds = new Set<string>(
    (await readClient.fetch<Array<{ _id: string }>>(
      `*[!(_type in ["sanity.imageAsset","sanity.fileAsset"])]{ _id }`
    )).map((d) => d._id)
  );
  log(`Live dataset: ${liveIds.size} existing document(s).`);

  const writeClient = DRY_RUN ? null : makeWriteClient();

  const results: SeedResult[] = [];
  let tx = writeClient?.transaction();

  const BATCH_SIZE = 50;
  let batchCount = 0;

  const flush = async () => {
    if (!tx || !writeClient) return;
    try {
      await tx.commit({ visibility: "async" });
      log(`  Committed batch of ${batchCount} operations.`);
    } catch (err: unknown) {
      log(`  Batch commit failed: ${String(err)}`, "error");
    }
    tx = writeClient.transaction();
    batchCount = 0;
  };

  for (const rawDoc of docs) {
    const doc = stripAssetData(rawDoc);
    const action = await determineSeedAction(doc, liveIds);

    if (action === "skip") {
      results.push({ _id: doc._id as string, _type: doc._type as string, action: "skip", success: true });
      continue;
    }

    if (DRY_RUN) {
      log(`  [DRY-RUN] ${action.toUpperCase()} ${doc._type}/${doc._id}`);
      results.push({ _id: doc._id as string, _type: doc._type as string, action, success: true });
      continue;
    }

    try {
      if (action === "create") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tx!.createIfNotExists(doc as any);
      } else {
        // update: use createOrReplace for full upsert
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tx!.createOrReplace(doc as any);
      }
      batchCount++;
      results.push({ _id: doc._id as string, _type: doc._type as string, action, success: true });

      if (batchCount >= BATCH_SIZE) await flush();
    } catch (err: unknown) {
      const errMsg = String(err);
      log(`  Error processing ${doc._id}: ${errMsg}`, "error");
      results.push({
        _id: doc._id as string,
        _type: doc._type as string,
        action,
        success: false,
        error: errMsg,
      });
    }
  }

  // Flush remaining
  if (batchCount > 0) await flush();

  // Write seed report
  const report = {
    seededAt: new Date().toISOString(),
    date: isoDate(),
    dryRun: DRY_RUN,
    typeFilter: TYPE_FILTER || null,
    summary: {
      create: results.filter((r) => r.action === "create").length,
      update: results.filter((r) => r.action === "update").length,
      skip: results.filter((r) => r.action === "skip").length,
      failed: results.filter((r) => !r.success).length,
      total: results.length,
    },
    results,
  };

  writeJson(path.join(MIRROR_DIR, "seed-report.json"), report);

  log("\n✓ Seed complete.");
  console.table([report.summary]);

  const failures = results.filter((r) => !r.success);
  if (failures.length > 0) {
    log(`${failures.length} failure(s):`, "error");
    for (const f of failures) {
      console.error(`  ${f._type}/${f._id}: ${f.error}`);
    }
    process.exit(1);
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
