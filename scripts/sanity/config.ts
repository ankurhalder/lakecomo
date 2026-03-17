/**
 * Sanity Migration Engine v3 — Shared Configuration
 *
 * Loads env vars from .env.local and wires up two Sanity clients:
 *  - readClient  → no token needed, for exports / diffs
 *  - writeClient → requires SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS
 */

import * as fs from "fs";
import * as path from "path";
import { createClient, type SanityClient } from "@sanity/client";

// ---------------------------------------------------------------------------
// .env.local loader (lightweight, no dotenv dependency)
// ---------------------------------------------------------------------------
function loadEnvFile(envPath: string): void {
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed
      .slice(eqIdx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
}

const repoRoot = path.resolve(__dirname, "../..");
loadEnvFile(path.join(repoRoot, ".env.local"));
loadEnvFile(path.join(repoRoot, ".env"));

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
export const PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "c20abca7";

export const DATASET =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

export const API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-12-27";

export const WRITE_TOKEN =
  process.env.SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS || "";

export const SCHEMAS_DIR = path.join(repoRoot, "src/sanity/schemaTypes");
export const MIRROR_DIR = path.join(repoRoot, "sanity-mirror");
export const DOCUMENTS_DIR = path.join(MIRROR_DIR, "documents");
export const SCHEMAS_META_DIR = path.join(MIRROR_DIR, "schemas");
export const QUERIES_DIR = path.join(MIRROR_DIR, "queries");
export const BACKUP_DIR = path.join(repoRoot, "sanity-backups");

export const SCHEMA_MAP_FILE = path.join(MIRROR_DIR, "schema-map.json");
export const DIFF_REPORT_FILE = path.join(MIRROR_DIR, "diff-report.json");
export const GENERATED_TYPES_FILE = path.join(MIRROR_DIR, "generated-types.ts");
export const MIGRATION_PLAN_FILE = path.join(repoRoot, "migration-plan.json");

/** All known document types in this project */
export const KNOWN_TYPES = [
  "landingPage",
  "navbar",
  "footer",
  "event",
] as const;

// ---------------------------------------------------------------------------
// Client factory
// ---------------------------------------------------------------------------
export function makeReadClient(): SanityClient {
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    useCdn: false,
  });
}

export function makeWriteClient(): SanityClient {
  if (!WRITE_TOKEN) {
    throw new Error(
      "SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS is not set. " +
        "Add it to your .env.local file.",
    );
  }
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    useCdn: false,
    token: WRITE_TOKEN,
  });
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
export function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

export function writeJson(filePath: string, data: unknown): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function readJson<T = unknown>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export function isoDate(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

export function log(
  msg: string,
  level: "info" | "warn" | "error" = "info",
): void {
  const prefix =
    level === "error" ? "[ERROR]" : level === "warn" ? "[WARN]" : "[INFO]";
  console.log(`${prefix} ${msg}`);
}
