/**
 * cleanup-sanity.mjs
 *
 * Safely removes unused Sanity assets (images / files) that are not
 * referenced by any document in the dataset.
 *
 * SAFETY GUARANTEES:
 *   1. Fetches ALL documents before doing anything destructive.
 *   2. Builds a complete reference map — every asset referenced anywhere
 *      in any document is marked as "in use".
 *   3. Never deletes an asset that is referenced.
 *   4. Displays a full deletion report BEFORE asking for confirmation.
 *   5. Supports --dry-run mode: shows what WOULD be deleted, nothing is touched.
 *   6. Requires explicit --confirm flag to actually delete anything.
 *
 * Usage:
 *   node scripts/cleanup-sanity.mjs --dry-run     # preview only
 *   node scripts/cleanup-sanity.mjs --confirm     # actually delete
 *
 * Required env (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config({ path: ".env.local" });

// ── CLI flags ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isConfirm = args.includes("--confirm");

if (!isDryRun && !isConfirm) {
  console.log(`
\u26a0\ufe0f  Sanity Asset Cleanup

Usage:
  node scripts/cleanup-sanity.mjs --dry-run     Preview orphaned assets (safe, no deletes)
  node scripts/cleanup-sanity.mjs --confirm     Delete orphaned assets after confirmation

Always run --dry-run first to review what will be deleted.
`);
  process.exit(0);
}

// ── Client ─────────────────────────────────────────────────────────────────────
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-12-27",
  token: process.env.SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS,
  useCdn: false,
});

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Recursively extract all asset _ref strings from a value */
function extractAssetRefs(value, refs = new Set()) {
  if (!value || typeof value !== "object") return refs;
  if (Array.isArray(value)) {
    for (const item of value) extractAssetRefs(item, refs);
    return refs;
  }
  // If this object has an _ref and its parent key was "asset" → it's an asset ref
  for (const [key, val] of Object.entries(value)) {
    if (key === "asset" && val && typeof val === "object" && val._ref) {
      refs.add(val._ref);
    } else {
      extractAssetRefs(val, refs);
    }
  }
  return refs;
}

/** Format bytes to human-readable size string */
function formatSize(bytes) {
  if (!bytes) return "unknown size";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Ask user for yes/no confirmation via stdin */
async function confirm(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(`${question} [y/N] `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function runCleanup() {
  const mode = isDryRun ? "DRY RUN" : "LIVE DELETE";
  console.log(`\n\ud83e\uddf9  Sanity Asset Cleanup — ${mode}\n`);

  // ── Step 1: Fetch all content documents ─────────────────────────────────────
  console.log("Step 1/4 \u2014 Fetching all content documents...");
  const allDocs = await client.fetch(`*[!(_type match "sanity.*")] { ... }`);
  console.log(`         Found ${allDocs.length} content documents\n`);

  // ── Step 2: Build reference set ─────────────────────────────────────────────
  console.log("Step 2/4 \u2014 Building asset reference map...");
  const referencedAssetIds = new Set();
  for (const doc of allDocs) {
    extractAssetRefs(doc, referencedAssetIds);
  }
  console.log(
    `         ${referencedAssetIds.size} unique asset references found\n`,
  );

  // ── Step 3: Fetch all assets ─────────────────────────────────────────────────
  console.log("Step 3/4 \u2014 Fetching all image and file assets...");
  const imageAssets = await client.fetch(
    `*[_type == "sanity.imageAsset"] { _id, _type, url, size, originalFilename, _createdAt }`,
  );
  const fileAssets = await client.fetch(
    `*[_type == "sanity.fileAsset"] { _id, _type, url, size, originalFilename, _createdAt }`,
  );
  const allAssets = [...imageAssets, ...fileAssets];
  console.log(
    `         Found ${imageAssets.length} image assets, ${fileAssets.length} file assets\n`,
  );

  // ── Step 4: Compute orphans ──────────────────────────────────────────────────
  const orphans = allAssets.filter(
    (asset) => !referencedAssetIds.has(asset._id),
  );
  const referenced = allAssets.filter((asset) =>
    referencedAssetIds.has(asset._id),
  );

  // ── Deletion report ─────────────────────────────────────────────────────────
  console.log("Step 4/4 \u2014 Analysis complete\n");
  console.log(
    `\u2500\u2500 Summary \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500`,
  );
  console.log(`  Total assets:      ${allAssets.length}`);
  console.log(
    `  Referenced:        ${referenced.length}  \u2705 (safe, will not be touched)`,
  );
  console.log(
    `  Orphaned:          ${orphans.length}  \u{1f4a5} (unused, candidates for deletion)`,
  );

  const totalOrphanSize = orphans.reduce((sum, a) => sum + (a.size || 0), 0);
  console.log(`  Orphan total size: ${formatSize(totalOrphanSize)}`);
  console.log();

  if (orphans.length === 0) {
    console.log("\u2705 No orphaned assets found. Your dataset is clean!\n");
    return;
  }

  // List the orphans
  console.log(
    "\u2500\u2500 Orphaned Assets (to be deleted) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
  );
  for (let i = 0; i < orphans.length; i++) {
    const a = orphans[i];
    const name = a.originalFilename || a._id;
    const type = a._type === "sanity.imageAsset" ? "image" : "file";
    const size = formatSize(a.size);
    const created = a._createdAt
      ? new Date(a._createdAt).toLocaleDateString()
      : "unknown";
    console.log(
      `  ${String(i + 1).padStart(3, " ")}. [${type}] ${name}  (${size})  uploaded: ${created}`,
    );
  }
  console.log();

  // ── Dry-run stops here ───────────────────────────────────────────────────────
  if (isDryRun) {
    console.log(`\ud83d\udccc DRY RUN complete. No assets were deleted.`);
    console.log(`   To delete the ${orphans.length} orphaned assets, run:`);
    console.log(`   node scripts/cleanup-sanity.mjs --confirm\n`);
    return;
  }

  // ── Confirm before deletion ──────────────────────────────────────────────────
  const proceed = await confirm(
    `\u26a0\ufe0f  About to permanently delete ${orphans.length} orphaned assets. Continue?`,
  );

  if (!proceed) {
    console.log("\n\u274c Deletion cancelled. No assets were deleted.\n");
    return;
  }

  // ── Delete ───────────────────────────────────────────────────────────────────
  console.log("\n\ud83d\uddd1\ufe0f  Deleting orphaned assets...\n");
  let deleted = 0;
  let failed = 0;

  for (const asset of orphans) {
    try {
      await client.delete(asset._id);
      const name = asset.originalFilename || asset._id;
      console.log(`  \u2713 Deleted: ${name}`);
      deleted++;
    } catch (err) {
      console.error(`  \u274c Failed:  ${asset._id} — ${err.message}`);
      failed++;
    }
  }

  console.log(
    `\n\u2500\u2500 Done \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500`,
  );
  console.log(`  \u2705 Deleted: ${deleted} assets`);
  if (failed > 0) {
    console.log(`  \u274c Failed:  ${failed} assets`);
  }
  console.log(`  \ud83d\udcbe Space freed: ${formatSize(totalOrphanSize)}`);
  console.log();
}

runCleanup().catch((error) => {
  console.error("\u274c Fatal error:", error.message);
  console.error(error);
  process.exit(1);
});
