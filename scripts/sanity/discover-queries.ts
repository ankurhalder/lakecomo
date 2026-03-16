/**
 * Sanity Migration Engine v3 — GROQ Query Discovery
 *
 * Scans src/sanity/lib/ for all GROQ queries used by the website and
 * archives them to sanity-mirror/queries/ for migration safety reference.
 *
 * This ensures that any schema migration is cross-checked against
 * the actual queries the application depends on.
 *
 * Runs with: tsx scripts/sanity/discover-queries.ts
 */

import * as fs from "fs";
import * as path from "path";
import { QUERIES_DIR, ensureDir, log } from "./config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface DiscoveredQuery {
  file: string;
  variable: string;
  groq: string;
}

// ---------------------------------------------------------------------------
// Patterns for GROQ query extraction
// ---------------------------------------------------------------------------

/** Match template literal GROQ queries: const foo = `*[...]` or groq`*[...]` */
const GROQ_TEMPLATE_LITERAL_RE =
  /(?:const|let|var)\s+(\w+)\s*=\s*(?:groq\s*)?\`([\s\S]*?)\`/g;

function extractGroqQueries(
  source: string,
): Array<{ variable: string; groq: string }> {
  const found: Array<{ variable: string; groq: string }> = [];
  const seen = new Set<string>();

  // Template literals
  let m: RegExpExecArray | null;
  const re1 = new RegExp(GROQ_TEMPLATE_LITERAL_RE.source, "g");
  while ((m = re1.exec(source)) !== null) {
    const varName = m[1];
    const body = m[2].trim();
    if (body.includes("*[") || body.includes("->") || body.includes("_type")) {
      const key = `${varName}:${body.slice(0, 40)}`;
      if (!seen.has(key)) {
        seen.add(key);
        found.push({ variable: varName, groq: body });
      }
    }
  }

  return found;
}

// ---------------------------------------------------------------------------
// Scan sanity lib directory
// ---------------------------------------------------------------------------
function scanDir(dir: string): DiscoveredQuery[] {
  if (!fs.existsSync(dir)) return [];

  const all: DiscoveredQuery[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      all.push(...scanDir(fullPath));
      continue;
    }
    if (!entry.name.endsWith(".ts") && !entry.name.endsWith(".tsx")) continue;

    const source = fs.readFileSync(fullPath, "utf-8");
    const queries = extractGroqQueries(source);

    for (const q of queries) {
      all.push({
        file: entry.name,
        variable: q.variable,
        groq: q.groq,
      });
    }
  }
  return all;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  const repoRoot = path.resolve(__dirname, "../..");
  const sanityLibDir = path.join(repoRoot, "src/sanity/lib");

  log(`Scanning GROQ queries in ${sanityLibDir}`);
  const queries = scanDir(sanityLibDir);
  log(`Found ${queries.length} GROQ query expression(s).`);

  if (queries.length === 0) {
    log("No GROQ queries found. Check src/sanity/lib/ directory.", "warn");
    return;
  }

  ensureDir(QUERIES_DIR);

  // Write individual .groq files
  const byFile: Record<string, DiscoveredQuery[]> = {};
  for (const q of queries) {
    (byFile[q.file] ??= []).push(q);
  }

  for (const [file, fileQueries] of Object.entries(byFile)) {
    const baseName = path.basename(file, ".ts").replace(/\.(tsx?)$/, "");
    const content = fileQueries
      .map((q) => `// Variable: ${q.variable}\n${q.groq}`)
      .join("\n\n// ---\n\n");
    fs.writeFileSync(
      path.join(QUERIES_DIR, `${baseName}.groq`),
      content,
      "utf-8",
    );
    log(`  ✓ ${baseName}.groq — ${fileQueries.length} query expression(s)`);
  }

  // Write index
  const index = queries.map((q) => ({
    file: q.file,
    variable: q.variable,
    preview:
      q.groq.slice(0, 80).replace(/\n/g, " ") + (q.groq.length > 80 ? "…" : ""),
  }));

  fs.writeFileSync(
    path.join(QUERIES_DIR, "index.json"),
    JSON.stringify(index, null, 2) + "\n",
    "utf-8",
  );

  log(`\n✓ GROQ queries archived → ${QUERIES_DIR}`);
  console.table(queries.map((q) => ({ file: q.file, variable: q.variable })));
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
