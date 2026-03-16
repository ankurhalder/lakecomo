/**
 * Sanity Migration Engine v3 — Rollback Engine
 *
 * BEFORE any migration: automatically snapshot the live dataset to
 *   sanity-backups/YYYY-MM-DD/
 *
 * To rollback: restore documents from a snapshot back into Sanity.
 *
 * Sub-commands:
 *   snapshot   Create a backup snapshot of the live dataset (default)
 *   restore    Restore from a specific snapshot directory
 *   list       List available snapshots
 *
 * Usage:
 *   tsx scripts/sanity/rollback.ts snapshot
 *   tsx scripts/sanity/rollback.ts restore 2026-03-16
 *   tsx scripts/sanity/rollback.ts list
 */

import * as fs from "fs";
import * as path from "path";
import {
  makeReadClient,
  makeWriteClient,
  BACKUP_DIR,
  writeJson,
  readJson,
  log,
  isoDate,
} from "./config";
import { validateDocuments } from "./validate-schema";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type SanityDoc = Record<string, unknown>;

interface SnapshotMeta {
  snapshotAt: string;
  date: string;
  totalDocuments: number;
  types: string[];
}

// ---------------------------------------------------------------------------
// SNAPSHOT
// ---------------------------------------------------------------------------
async function snapshot(): Promise<string> {
  const client = makeReadClient();
  const date = isoDate();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(BACKUP_DIR, date, timestamp);

  log(`Creating snapshot → ${backupPath}`);
  fs.mkdirSync(backupPath, { recursive: true });

  const docs = await client.fetch<SanityDoc[]>(
    `*[!(_type in ["sanity.imageAsset","sanity.fileAsset"])] | order(_type asc)`
  );

  log(`Fetched ${docs.length} document(s) from live dataset.`);

  // Group by type
  const byType: Record<string, SanityDoc[]> = {};
  for (const doc of docs) {
    (byType[doc._type as string] ??= []).push(doc);
  }

  for (const [type, typeDocs] of Object.entries(byType)) {
    writeJson(path.join(backupPath, `${type}.json`), typeDocs);
  }

  const meta: SnapshotMeta = {
    snapshotAt: new Date().toISOString(),
    date,
    totalDocuments: docs.length,
    types: Object.keys(byType),
  };
  writeJson(path.join(backupPath, "_meta.json"), meta);

  log(`✓ Snapshot complete — ${docs.length} docs in ${backupPath}`);
  return backupPath;
}

// ---------------------------------------------------------------------------
// LIST
// ---------------------------------------------------------------------------
function listSnapshots(): void {
  if (!fs.existsSync(BACKUP_DIR)) {
    log("No backups found.", "warn");
    return;
  }

  const dates = fs
    .readdirSync(BACKUP_DIR)
    .filter((d) => fs.statSync(path.join(BACKUP_DIR, d)).isDirectory())
    .sort()
    .reverse();

  if (dates.length === 0) {
    log("No snapshots available.");
    return;
  }

  console.log("\nAvailable snapshots:");
  for (const date of dates) {
    const dateDir = path.join(BACKUP_DIR, date);
    const timestamps = fs
      .readdirSync(dateDir)
      .filter((d) => fs.statSync(path.join(dateDir, d)).isDirectory())
      .sort()
      .reverse();

    for (const ts of timestamps) {
      const metaPath = path.join(dateDir, ts, "_meta.json");
      if (fs.existsSync(metaPath)) {
        const meta = readJson<SnapshotMeta>(metaPath);
        console.log(
          `  ${date}/${ts}  —  ${meta.totalDocuments} docs  [${meta.types.join(", ")}]`
        );
      }
    }
  }
}

// ---------------------------------------------------------------------------
// RESTORE
// ---------------------------------------------------------------------------
async function restore(targetDate: string): Promise<void> {
  const dateDir = path.join(BACKUP_DIR, targetDate);

  if (!fs.existsSync(dateDir)) {
    log(`No snapshot found for date: ${targetDate}`, "error");
    log(`Available dates: ${fs.readdirSync(BACKUP_DIR).join(", ")}`);
    process.exit(1);
  }

  // Use the latest timestamp snapshot for the given date
  const timestamps = fs
    .readdirSync(dateDir)
    .filter((d) => fs.statSync(path.join(dateDir, d)).isDirectory())
    .sort()
    .reverse();

  if (timestamps.length === 0) {
    log(`No timestamp snapshots found in ${dateDir}`, "error");
    process.exit(1);
  }

  const snapshotPath = path.join(dateDir, timestamps[0]);
  log(`Restoring from snapshot: ${snapshotPath}`);

  // Load all documents from snapshot
  const files = fs
    .readdirSync(snapshotPath)
    .filter((f) => f.endsWith(".json") && f !== "_meta.json");

  const allDocs: SanityDoc[] = [];
  for (const file of files) {
    const docs = JSON.parse(
      fs.readFileSync(path.join(snapshotPath, file), "utf-8")
    ) as SanityDoc[];
    allDocs.push(...docs);
  }

  log(`Loaded ${allDocs.length} document(s) from snapshot.`);

  // Validate snapshot documents
  const validation = validateDocuments(allDocs);
  if (!validation.valid) {
    log("Snapshot validation failed — aborting restore.", "error");
    for (const e of validation.errors) {
      log(`  ${e._type}/${e._id}: ${e.message}`, "error");
    }
    process.exit(1);
  }

  // Confirm restore (safety gate for production)
  log("\n⚠️  RESTORE OPERATION", "warn");
  log(`  Source: ${snapshotPath}`, "warn");
  log(`  Documents: ${allDocs.length}`, "warn");
  log(
    "  This will overwrite ALL matching documents in the live dataset.",
    "warn"
  );

  const confirmVar = process.env.SANITY_MIGRATE_CONFIRM;
  if (confirmVar !== "yes") {
    log(
      "\nSet SANITY_MIGRATE_CONFIRM=yes to proceed with restore.",
      "error"
    );
    process.exit(1);
  }

  const writeClient = makeWriteClient();
  let tx = writeClient.transaction();
  let batchCount = 0;

  const BATCH_SIZE = 50;

  for (const doc of allDocs) {
    tx.createOrReplace(doc as Parameters<typeof tx.createOrReplace>[0]);
    batchCount++;

    if (batchCount >= BATCH_SIZE) {
      await tx.commit({ visibility: "async" });
      log(`  Committed ${batchCount} documents.`);
      tx = writeClient.transaction();
      batchCount = 0;
    }
  }

  if (batchCount > 0) {
    await tx.commit({ visibility: "async" });
    log(`  Committed final ${batchCount} documents.`);
  }

  log(`\n✓ Restore complete — ${allDocs.length} documents restored.`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  const cmd = process.argv[2] || "snapshot";
  const arg = process.argv[3];

  switch (cmd) {
    case "snapshot":
      await snapshot();
      break;
    case "list":
      listSnapshots();
      break;
    case "restore":
      if (!arg) {
        log("Usage: rollback.ts restore <YYYY-MM-DD>", "error");
        process.exit(1);
      }
      await restore(arg);
      break;
    default:
      log(`Unknown command: ${cmd}. Use snapshot | list | restore.`, "error");
      process.exit(1);
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
