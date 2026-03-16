/**
 * Sanity Migration Engine v3 — Asset Integrity Engine
 *
 * Scans all documents in the local mirror (and live dataset) and verifies
 * that every asset reference points to a real Sanity asset.
 *
 * Output:
 *   sanity-mirror/asset-report.json   — summary + broken refs
 *
 * Principles:
 *   • Never re-upload assets. Asset _ref values are treated as immutable.
 *   • Only report — never modify any asset reference.
 *
 * Runs with: tsx scripts/sanity/verify-assets.ts
 */

import * as fs from "fs";
import * as path from "path";
import {
  makeReadClient,
  DOCUMENTS_DIR,
  MIRROR_DIR,
  writeJson,
  log,
  isoDate,
} from "./config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface AssetRef {
  _ref: string;
  foundIn: string; // _id of parent document
  fieldPath: string;
}

interface AssetReport {
  generatedAt: string;
  date: string;
  totalRefsFound: number;
  liveAssets: number;
  valid: number;
  broken: AssetRef[];
  summary: { valid: boolean; brokenCount: number };
}

type SanityDoc = Record<string, unknown>;

// ---------------------------------------------------------------------------
// Recursive asset-ref extractor
// ---------------------------------------------------------------------------
function extractAssetRefs(
  obj: unknown,
  parentId: string,
  fieldPath: string,
  refs: AssetRef[]
): void {
  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    obj.forEach((item, i) =>
      extractAssetRefs(item, parentId, `${fieldPath}[${i}]`, refs)
    );
    return;
  }

  const record = obj as Record<string, unknown>;

  // Asset reference pattern: { asset: { _ref: "image-xxxx" } }
  if (
    record.asset &&
    typeof record.asset === "object" &&
    "_ref" in (record.asset as Record<string, unknown>)
  ) {
    const ref = (record.asset as Record<string, unknown>)._ref as string;
    if (typeof ref === "string" && ref.length > 0) {
      refs.push({ _ref: ref, foundIn: parentId, fieldPath });
    }
  }

  // Walk all keys
  for (const [key, value] of Object.entries(record)) {
    if (key === "_ref") continue; // already handled via asset
    extractAssetRefs(value, parentId, `${fieldPath}.${key}`, refs);
  }
}

// ---------------------------------------------------------------------------
// Load mirror documents
// ---------------------------------------------------------------------------
function loadMirrorDocs(): SanityDoc[] {
  if (!fs.existsSync(DOCUMENTS_DIR)) return [];
  const files = fs
    .readdirSync(DOCUMENTS_DIR)
    .filter((f) => f.endsWith(".json"));
  const all: SanityDoc[] = [];
  for (const file of files) {
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
  log("Asset Integrity Engine starting...");

  const mirrorDocs = loadMirrorDocs();
  log(`Mirror: ${mirrorDocs.length} document(s) loaded.`);

  // Collect all asset refs from mirror
  const allRefs: AssetRef[] = [];
  for (const doc of mirrorDocs) {
    extractAssetRefs(doc, doc._id as string, "$", allRefs);
  }

  log(`Found ${allRefs.length} asset reference(s) in mirror.`);

  if (allRefs.length === 0) {
    log("No asset references found. Nothing to verify.");
    const emptyReport: AssetReport = {
      generatedAt: new Date().toISOString(),
      date: isoDate(),
      totalRefsFound: 0,
      liveAssets: 0,
      valid: 0,
      broken: [],
      summary: { valid: true, brokenCount: 0 },
    };
    writeJson(path.join(MIRROR_DIR, "asset-report.json"), emptyReport);
    return;
  }

  // Fetch live asset IDs from Sanity
  const client = makeReadClient();
  log("Fetching live asset IDs from Sanity...");
  const liveAssets = await client.fetch<Array<{ _id: string }>>(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]{ _id }`
  );
  const liveAssetIds = new Set(liveAssets.map((a) => a._id));
  log(`Live assets: ${liveAssetIds.size} found.`);

  // Verify each ref
  const broken: AssetRef[] = [];
  for (const ref of allRefs) {
    // Sanity asset _ref format: "image-<hash>-<WxH>-<ext>"
    // The corresponding _id is identical (sans the alt prefix for files)
    const assetId = ref._ref;
    if (!liveAssetIds.has(assetId)) {
      broken.push(ref);
    }
  }

  const report: AssetReport = {
    generatedAt: new Date().toISOString(),
    date: isoDate(),
    totalRefsFound: allRefs.length,
    liveAssets: liveAssetIds.size,
    valid: allRefs.length - broken.length,
    broken,
    summary: {
      valid: broken.length === 0,
      brokenCount: broken.length,
    },
  };

  writeJson(path.join(MIRROR_DIR, "asset-report.json"), report);
  log(`\n✓ Asset report written → ${path.join(MIRROR_DIR, "asset-report.json")}`);

  if (broken.length > 0) {
    log(`${broken.length} BROKEN asset reference(s) found:`, "warn");
    for (const b of broken) {
      console.warn(`  [BROKEN] _ref: ${b._ref}`);
      console.warn(`           in doc: ${b.foundIn} at path: ${b.fieldPath}`);
    }
    log(
      "These refs point to assets that do not exist in the live dataset.",
      "warn"
    );
    log("Do NOT re-upload assets. Investigate missing assets in Sanity Studio.", "warn");
  } else {
    log(`✓ All ${allRefs.length} asset reference(s) are valid.`);
  }

  console.log("\nSummary:");
  console.table([report.summary]);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
