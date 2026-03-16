/**
 * Sanity Migration Engine v3 — Migration Plan Generator
 *
 * Reads sanity-mirror/diff-report.json and produces migration-plan.json
 * with a precise, actionable breakdown of what will happen during seeding.
 *
 * Runs with: tsx scripts/sanity/generate-migration-plan.ts
 */

import * as fs from "fs";
import {
  DIFF_REPORT_FILE,
  MIGRATION_PLAN_FILE,
  DOCUMENTS_DIR,
  writeJson,
  readJson,
  isoDate,
  log,
} from "./config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface DiffEntry {
  _id: string;
  _type: string;
  status: "NEW" | "UPDATED" | "REMOVED" | "UNCHANGED";
  fieldChanges: Array<{ field: string; old: unknown; new: unknown }>;
}

interface DiffReport {
  summary: {
    total: number;
    new: number;
    updated: number;
    removed: number;
    unchanged: number;
  };
  changes: DiffEntry[];
}

interface PlanAction {
  _id: string;
  _type: string;
  action: "create" | "update" | "skip";
  reason: string;
  fields?: string[];
}

interface MigrationPlan {
  generatedAt: string;
  date: string;
  summary: {
    create: number;
    update: number;
    skip: number;
    total: number;
  };
  typeBreakdown: Record<string, { create: number; update: number; skip: number }>;
  actions: PlanAction[];
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  // Ensure diff report exists
  if (!fs.existsSync(DIFF_REPORT_FILE)) {
    log("diff-report.json not found. Run npm run sanity:diff first.", "error");
    process.exit(1);
  }

  if (!fs.existsSync(DOCUMENTS_DIR)) {
    log("documents/ mirror not found. Run npm run sanity:export first.", "error");
    process.exit(1);
  }

  const report = readJson<DiffReport>(DIFF_REPORT_FILE);
  log(`Processing diff report: ${report.changes.length} change(s) to plan.`);

  const actions: PlanAction[] = [];

  // NEW → create
  for (const entry of report.changes.filter((c) => c.status === "NEW")) {
    actions.push({
      _id: entry._id,
      _type: entry._type,
      action: "create",
      reason: "Document exists in mirror but not in live dataset",
    });
  }

  // UPDATED → update (with field list)
  for (const entry of report.changes.filter((c) => c.status === "UPDATED")) {
    actions.push({
      _id: entry._id,
      _type: entry._type,
      action: "update",
      reason: `${entry.fieldChanges.length} field(s) changed`,
      fields: entry.fieldChanges.map((f) => f.field),
    });
  }

  // REMOVED → skip (never auto-delete)
  for (const entry of report.changes.filter((c) => c.status === "REMOVED")) {
    actions.push({
      _id: entry._id,
      _type: entry._type,
      action: "skip",
      reason:
        "Document exists in live dataset but not in mirror — auto-delete is disabled",
    });
  }

  // Also count documents that are UNCHANGED (not in diff changes array)
  const unchangedCount =
    report.summary.unchanged +
    (report.summary.total - report.changes.length - report.summary.unchanged);

  // Type breakdown
  const typeBreakdown: Record<
    string,
    { create: number; update: number; skip: number }
  > = {};
  for (const action of actions) {
    const t = typeBreakdown[action._type] ?? { create: 0, update: 0, skip: 0 };
    t[action.action as "create" | "update" | "skip"]++;
    typeBreakdown[action._type] = t;
  }

  const summary = {
    create: actions.filter((a) => a.action === "create").length,
    update: actions.filter((a) => a.action === "update").length,
    skip: actions.filter((a) => a.action === "skip").length + unchangedCount,
    total: actions.length + unchangedCount,
  };

  const plan: MigrationPlan = {
    generatedAt: new Date().toISOString(),
    date: isoDate(),
    summary,
    typeBreakdown,
    actions,
  };

  writeJson(MIGRATION_PLAN_FILE, plan);

  log(`\n✓ Migration plan written → ${MIGRATION_PLAN_FILE}`);
  console.log("\nSummary:");
  console.table([plan.summary]);

  if (summary.create + summary.update === 0) {
    log("Nothing to migrate — all documents are in sync.");
  } else {
    log(
      `Ready to migrate: ${summary.create} create, ${summary.update} update, ${summary.skip} skip`,
      "warn"
    );
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
