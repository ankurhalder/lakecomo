/**
 * Sanity Migration Engine v3 — Schema Introspection Engine
 *
 * Statically analyses every schema file in src/sanity/schemaTypes/ and
 * produces:
 *   sanity-mirror/schema-map.json   — field/reference/asset map per type
 *   sanity-mirror/schemas/<type>.json — raw field list per type
 *
 * Runs with: tsx scripts/sanity/introspect-schemas.ts
 */

import * as fs from "fs";
import * as path from "path";
import {
  SCHEMAS_DIR,
  MIRROR_DIR,
  SCHEMAS_META_DIR,
  SCHEMA_MAP_FILE,
  writeJson,
  ensureDir,
  log,
} from "./config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface FieldMeta {
  name: string;
  type: string;
  required: boolean;
  isArray: boolean;
}

interface SchemaMeta {
  name: string;
  type: "document" | "object";
  fields: FieldMeta[];
  references: string[]; // field names that hold references
  assets: string[]; // field names that hold images/files
}

type SchemaMap = Record<string, SchemaMeta>;

// ---------------------------------------------------------------------------
// Static field-type regex patterns
// ---------------------------------------------------------------------------
const ASSET_TYPES = new Set(["image", "file"]);
const REF_TYPES = new Set(["reference"]);

/**
 * Simple regex-based field extractor.
 * Parses `defineField({ name: "foo", type: "bar" })` patterns.
 */
function extractFields(source: string): FieldMeta[] {
  const fields: FieldMeta[] = [];

  // Match defineField({ ... }) blocks - capture the object body
  const defineFieldRe =
    /defineField\s*\(\s*\{([\s\S]*?)(?=\}\s*\)(?:,|\s*\]))/g;
  let match: RegExpExecArray | null;

  while ((match = defineFieldRe.exec(source)) !== null) {
    const body = match[1];

    const nameMatch = body.match(/\bname\s*:\s*["']([^"']+)["']/);
    const typeMatch = body.match(/\btype\s*:\s*["']([^"']+)["']/);

    if (!nameMatch || !typeMatch) continue;

    const name = nameMatch[1];
    const type = typeMatch[1];

    // Detect required validation
    const required = /\.required\(\)/.test(body);

    // Detect array wrapper around type
    const isArray = type === "array";

    fields.push({ name, type, required, isArray });
  }

  return fields;
}

/** Extract the document/object type name from a schema file */
function extractTypeName(source: string): string | null {
  const m =
    source.match(/defineType\s*\(\s*\{[\s\S]*?\bname\s*:\s*["']([^"']+)["']/) ||
    source.match(/name\s*:\s*["']([^"']+)["']/);
  return m ? m[1] : null;
}

/** Extract the document type ("document" | "object" | ...) */
function extractDocType(source: string): "document" | "object" {
  const m = source.match(/\btype\s*:\s*["'](document|object)["']/);
  return m?.[1] === "object" ? "object" : "document";
}

// ---------------------------------------------------------------------------
// Process a single schema file
// ---------------------------------------------------------------------------
function processSchemaFile(filePath: string): SchemaMeta | null {
  const source = fs.readFileSync(filePath, "utf-8");

  const name = extractTypeName(source);
  if (!name) {
    log(`Could not extract type name from ${path.basename(filePath)}`, "warn");
    return null;
  }

  // Skip barrel index.ts
  if (name === filePath) return null;

  const docType = extractDocType(source);
  const fields = extractFields(source);

  const references: string[] = [];
  const assets: string[] = [];

  for (const f of fields) {
    if (REF_TYPES.has(f.type)) references.push(f.name);
    if (ASSET_TYPES.has(f.type)) assets.push(f.name);
    // Array fields - check the "of" content for nested asset/ref types
    if (f.isArray) {
      // Look for nested image/file within the same block following the field
      const arrayBodyRe = new RegExp(
        `name\\s*:\\s*["']${f.name}["'][\\s\\S]{0,500}?of\\s*:\\s*\\[([\\s\\S]{0,800}?)\\]`,
        "m"
      );
      const arrayMatch = source.match(arrayBodyRe);
      if (arrayMatch) {
        const ofBody = arrayMatch[1];
        if (/type\s*:\s*["']image["']/.test(ofBody)) assets.push(`${f.name}[].image`);
        if (/type\s*:\s*["']reference["']/.test(ofBody)) references.push(`${f.name}[].ref`);
      }
    }
  }

  return {
    name,
    type: docType,
    fields,
    references: [...new Set(references)],
    assets: [...new Set(assets)],
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  log(`Scanning schemas in ${SCHEMAS_DIR}`);

  const schemaFiles = fs
    .readdirSync(SCHEMAS_DIR)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => path.join(SCHEMAS_DIR, f));

  if (schemaFiles.length === 0) {
    log("No schema files found.", "warn");
    process.exit(1);
  }

  log(`Found ${schemaFiles.length} schema file(s): ${schemaFiles.map((f) => path.basename(f)).join(", ")}`);

  const schemaMap: SchemaMap = {};

  for (const filePath of schemaFiles) {
    const meta = processSchemaFile(filePath);
    if (meta) {
      schemaMap[meta.name] = meta;
      log(`  ✓ ${meta.name} — ${meta.fields.length} fields, ${meta.assets.length} asset(s), ${meta.references.length} reference(s)`);
    }
  }

  // Write schema-map.json (compact form for tooling)
  const compactMap: Record<
    string,
    { fields: string[]; references: string[]; assets: string[] }
  > = {};
  for (const [name, meta] of Object.entries(schemaMap)) {
    compactMap[name] = {
      fields: meta.fields.map((f) => f.name),
      references: meta.references,
      assets: meta.assets,
    };
  }

  ensureDir(MIRROR_DIR);
  writeJson(SCHEMA_MAP_FILE, compactMap);
  log(`✓ schema-map.json written → ${SCHEMA_MAP_FILE}`);

  // Write per-type schema detail files
  ensureDir(SCHEMAS_META_DIR);
  for (const [name, meta] of Object.entries(schemaMap)) {
    const dest = path.join(SCHEMAS_META_DIR, `${name}.json`);
    writeJson(dest, meta);
  }
  log(`✓ per-type schema files written → ${SCHEMAS_META_DIR}/`);

  console.log("\nSchema introspection complete.");
  console.table(
    Object.entries(compactMap).map(([name, m]) => ({
      type: name,
      fields: m.fields.length,
      assets: m.assets.join(", ") || "—",
      references: m.references.join(", ") || "—",
    }))
  );
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
