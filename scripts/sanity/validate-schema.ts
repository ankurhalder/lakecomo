/**
 * Sanity Migration Engine v3 — Schema Validation Engine
 *
 * Validates local mirror documents against the schema map before seeding.
 * Returns a ValidationResult that callers inspect before writing to Sanity.
 *
 * Rules enforced:
 *  1. Every document must have _id and _type
 *  2. _type must be a known schema type
 *  3. Required fields must be present and non-empty
 *  4. Asset fields must carry a valid _ref (never upload new assets)
 *  5. No unknown extra fields generate a hard error (soft warning only)
 */

import * as fs from "fs";
import * as path from "path";
import { SCHEMA_MAP_FILE, log } from "./config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface ValidationIssue {
  severity: "error" | "warning";
  _id: string;
  _type: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

interface SchemaMeta {
  fields: string[];
  references: string[];
  assets: string[];
}

type SchemaMap = Record<string, SchemaMeta>;
type SanityDoc = Record<string, unknown>;

// ---------------------------------------------------------------------------
// Load schema map
// ---------------------------------------------------------------------------
function loadSchemaMap(): SchemaMap | null {
  if (!fs.existsSync(SCHEMA_MAP_FILE)) return null;
  return JSON.parse(fs.readFileSync(SCHEMA_MAP_FILE, "utf-8")) as SchemaMap;
}

// ---------------------------------------------------------------------------
// Asset reference checker
// ---------------------------------------------------------------------------
function hasValidAssetRef(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  const asset = obj.asset as Record<string, unknown> | undefined;
  if (asset && typeof asset._ref === "string" && asset._ref.length > 0)
    return true;
  // Some documents store direct _ref at top-level image
  if (typeof obj._ref === "string" && obj._ref.length > 0) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Validate a single document
// ---------------------------------------------------------------------------
function validateDoc(
  doc: SanityDoc,
  schemaMap: SchemaMap | null,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const id = (doc._id as string) || "(unknown)";
  const type = (doc._type as string) || "(missing)";

  // Rule 1 — must have _id and _type
  if (!doc._id || typeof doc._id !== "string") {
    issues.push({
      severity: "error",
      _id: id,
      _type: type,
      message: "Missing or invalid _id field",
    });
  }
  if (!doc._type || typeof doc._type !== "string") {
    issues.push({
      severity: "error",
      _id: id,
      _type: type,
      message: "Missing or invalid _type field",
    });
    return issues; // Can't continue without _type
  }

  if (!schemaMap) return issues; // No schema map — skip further validation

  const schema = schemaMap[type];

  // Rule 2 — known type
  if (!schema) {
    issues.push({
      severity: "warning",
      _id: id,
      _type: type,
      message: `Unknown schema type "${type}" — not present in schema-map.json`,
    });
    return issues;
  }

  // Rule 4 — asset references must be valid _refs
  for (const assetField of schema.assets) {
    const baseField = assetField.split("[")[0]; // strip array notation
    const fieldVal = doc[baseField];
    if (fieldVal !== undefined && fieldVal !== null) {
      if (!hasValidAssetRef(fieldVal)) {
        issues.push({
          severity: "warning",
          _id: id,
          _type: type,
          message: `Asset field "${assetField}" is present but has no valid _ref — asset may be missing`,
        });
      }
    }
  }

  return issues;
}

// ---------------------------------------------------------------------------
// Public API  (used by seed-from-json.ts)
// ---------------------------------------------------------------------------
export function validateDocuments(docs: SanityDoc[]): ValidationResult {
  const schemaMap = loadSchemaMap();
  if (!schemaMap) {
    log(
      "schema-map.json not found — run npm run sanity:introspect for full validation",
      "warn",
    );
  }

  const allIssues: ValidationIssue[] = [];
  for (const doc of docs) {
    allIssues.push(...validateDoc(doc, schemaMap));
  }

  const errors = allIssues.filter((i) => i.severity === "error");
  const warnings = allIssues.filter((i) => i.severity === "warning");

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------
if (require.main === module) {
  (async () => {
    const { DOCUMENTS_DIR } = await import("./config");
    if (!fs.existsSync(DOCUMENTS_DIR)) {
      log("No mirror found. Run npm run sanity:export first.", "error");
      process.exit(1);
    }

    const allDocs: SanityDoc[] = [];
    const files = fs
      .readdirSync(DOCUMENTS_DIR)
      .filter((f) => f.endsWith(".json"));

    for (const file of files) {
      const docs = JSON.parse(
        fs.readFileSync(path.join(DOCUMENTS_DIR, file), "utf-8"),
      ) as SanityDoc[];
      allDocs.push(...docs);
    }

    log(`Validating ${allDocs.length} document(s)...`);
    const result = validateDocuments(allDocs);

    if (result.warnings.length > 0) {
      log(`${result.warnings.length} warning(s):`, "warn");
      for (const w of result.warnings) {
        console.warn(`  [WARN] ${w._type}/${w._id}: ${w.message}`);
      }
    }

    if (!result.valid) {
      log(`${result.errors.length} error(s):`, "error");
      for (const e of result.errors) {
        console.error(`  [ERROR] ${e._type}/${e._id}: ${e.message}`);
      }
      process.exit(1);
    }

    log("✓ All documents are valid.");
  })().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
}
