/**
 * Sanity Migration Engine v3 — Field-Level Diff Engine
 *
 * Compares the LIVE Sanity dataset against the LOCAL JSON mirror and
 * produces a structured diff report:
 *
 *   sanity-mirror/diff-report.json
 *
 * Diff categories:
 *   NEW       — document exists in mirror but not in live dataset
 *   UPDATED   — document exists in both; one or more fields changed
 *   REMOVED   — document exists in live dataset but not in mirror
 *   UNCHANGED — identical in both (included for audit completeness)
 *
 * Runs with: tsx scripts/sanity/diff-dataset.ts
 */

import * as fs from "fs";
import * as path from "path";
import {
  makeReadClient,
  DOCUMENTS_DIR,
  DIFF_REPORT_FILE,
  writeJson,
  ensureDir,
  isoDate,
  log,
} from "./config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type ChangeStatus = "NEW" | "UPDATED" | "REMOVED" | "UNCHANGED";

interface FieldChange {
  field: string;
  old: unknown;
  new: unknown;
}

interface DocDiff {
  _id: string;
  _type: string;
  status: ChangeStatus;
  fieldChanges: FieldChange[];
}

interface DiffReport {
  generatedAt: string;
  date: string;
  summary: {
    total: number;
    new: number;
    updated: number;
    removed: number;
    unchanged: number;
  };
  changes: DocDiff[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Deep equality check for JSON-serialisable values */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, (b as unknown[])[i]));
  }
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) =>
      deepEqual(
        (a as Record<string, unknown>)[k],
        (b as Record<string, unknown>)[k],
      ),
    );
  }
  return false;
}

/** Compare two doc objects field-by-field; skip Sanity system meta fields */
const SKIP_FIELDS = new Set(["_rev", "_createdAt", "_updatedAt"]);

function diffDocs(
  live: Record<string, unknown>,
  mirror: Record<string, unknown>,
): FieldChange[] {
  const allKeys = new Set([...Object.keys(live), ...Object.keys(mirror)]);
  const changes: FieldChange[] = [];

  for (const key of allKeys) {
    if (SKIP_FIELDS.has(key)) continue;
    const liveVal = live[key];
    const mirrorVal = mirror[key];
    if (!deepEqual(liveVal, mirrorVal)) {
      changes.push({ field: key, old: liveVal, new: mirrorVal });
    }
  }

  return changes;
}

type SanityDoc = Record<string, unknown>;

// ---------------------------------------------------------------------------
// Load mirror documents from disk
// ---------------------------------------------------------------------------
function loadMirrorDocs(): Map<string, SanityDoc> {
  const map = new Map<string, SanityDoc>();

  if (!fs.existsSync(DOCUMENTS_DIR)) {
    log("No local mirror found. Run npm run sanity:export first.", "warn");
    return map;
  }

  const files = fs
    .readdirSync(DOCUMENTS_DIR)
    .filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const docs = JSON.parse(
      fs.readFileSync(path.join(DOCUMENTS_DIR, file), "utf-8"),
    ) as SanityDoc[];
    for (const doc of docs) {
      map.set(doc._id as string, doc);
    }
  }

  return map;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  log("Field-level diff engine starting...");

  const client = makeReadClient();

  log("Fetching live documents...");
  const liveDocs = await client.fetch<SanityDoc[]>(
    `*[!(_type in ["sanity.imageAsset", "sanity.fileAsset"])] | order(_type asc)`,
  );
  log(`Live dataset: ${liveDocs.length} doc(s)`);

  const mirrorMap = loadMirrorDocs();
  log(`Local mirror: ${mirrorMap.size} doc(s)`);

  const liveMap = new Map<string, SanityDoc>(
    liveDocs.map((d) => [d._id as string, d]),
  );

  const changes: DocDiff[] = [];

  // Check documents in mirror against live
  for (const [id, mirrorDoc] of mirrorMap) {
    const liveDoc = liveMap.get(id);

    if (!liveDoc) {
      changes.push({
        _id: id,
        _type: mirrorDoc._type as string,
        status: "NEW",
        fieldChanges: [],
      });
      continue;
    }

    const fieldChanges = diffDocs(liveDoc, mirrorDoc);
    changes.push({
      _id: id,
      _type: mirrorDoc._type as string,
      status: fieldChanges.length > 0 ? "UPDATED" : "UNCHANGED",
      fieldChanges,
    });
  }

  // Check documents in live that are not in mirror
  for (const [id, liveDoc] of liveMap) {
    if (!mirrorMap.has(id)) {
      changes.push({
        _id: id,
        _type: liveDoc._type as string,
        status: "REMOVED",
        fieldChanges: [],
      });
    }
  }

  const summary = {
    total: changes.length,
    new: changes.filter((c) => c.status === "NEW").length,
    updated: changes.filter((c) => c.status === "UPDATED").length,
    removed: changes.filter((c) => c.status === "REMOVED").length,
    unchanged: changes.filter((c) => c.status === "UNCHANGED").length,
  };

  const report: DiffReport = {
    generatedAt: new Date().toISOString(),
    date: isoDate(),
    summary,
    changes: changes.filter((c) => c.status !== "UNCHANGED"), // exclude noise
  };

  ensureDir(path.dirname(DIFF_REPORT_FILE));
  writeJson(DIFF_REPORT_FILE, report);

  log(`\n✓ Diff report written → ${DIFF_REPORT_FILE}`);
  console.log("\nSummary:");
  console.table([summary]);

  if (summary.new + summary.updated + summary.removed === 0) {
    log("Local mirror is in sync with the live dataset.");
  } else {
    log(
      `${summary.new} new, ${summary.updated} updated, ${summary.removed} removed`,
      "warn",
    );
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
