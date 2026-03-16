/**
 * Sanity Migration Engine v3 — Dataset Export Engine
 *
 * Fetches all non-asset documents from the live Sanity dataset and writes
 * them to the local JSON mirror:
 *
 *   sanity-mirror/documents/<type>.json
 *
 * Also captures a full metadata snapshot:
 *   sanity-mirror/export-meta.json
 *
 * Runs with: tsx scripts/sanity/export-dataset.ts
 * Env:  SANITY_DATASET=staging  (override dataset)
 */

import * as path from "path";
import {
  makeReadClient,
  DOCUMENTS_DIR,
  MIRROR_DIR,
  DATASET,
  PROJECT_ID,
  API_VERSION,
  writeJson,
  ensureDir,
  isoDate,
  log,
} from "./config";

// ---------------------------------------------------------------------------
// GROQ — fetch all user documents (exclude binary asset records)
// ---------------------------------------------------------------------------
const ALL_DOCS_QUERY = `*[
  !(_type in ["sanity.imageAsset", "sanity.fileAsset"])
] | order(_type asc, _createdAt asc)`;

interface SanityDocument {
  _id: string;
  _type: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  log(`Dataset export — project: ${PROJECT_ID}, dataset: ${DATASET}`);

  const client = makeReadClient();

  log("Fetching all documents...");
  const docs = await client.fetch<SanityDocument[]>(ALL_DOCS_QUERY);
  log(`Fetched ${docs.length} document(s).`);

  if (docs.length === 0) {
    log("No documents found. Verify project ID and dataset.", "warn");
    process.exit(1);
  }

  // Group by _type
  const byType: Record<string, SanityDocument[]> = {};
  for (const doc of docs) {
    (byType[doc._type] ??= []).push(doc);
  }

  ensureDir(DOCUMENTS_DIR);

  const summary: Array<{ type: string; count: number; file: string }> = [];

  for (const [type, typeDocs] of Object.entries(byType)) {
    const dest = path.join(DOCUMENTS_DIR, `${type}.json`);
    writeJson(dest, typeDocs);
    summary.push({ type, count: typeDocs.length, file: path.basename(dest) });
    log(`  ✓ ${type}.json — ${typeDocs.length} doc(s)`);
  }

  // Export metadata
  const meta = {
    exportedAt: new Date().toISOString(),
    exportedDate: isoDate(),
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    totalDocuments: docs.length,
    types: summary,
  };
  writeJson(path.join(MIRROR_DIR, "export-meta.json"), meta);

  log(`\n✓ Export complete — ${docs.length} docs in ${Object.keys(byType).length} type(s)`);
  console.log(`  Mirror: ${DOCUMENTS_DIR}`);
  console.table(summary);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
