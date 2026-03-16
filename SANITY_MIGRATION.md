# Sanity Migration Engine v3 — Developer Workflow Guide

## Overview

This system enables safe, schema-aware, repeatable migrations of Sanity CMS content.
It supports export → diff → plan → seed → rollback across all environments.

## Directory Structure

```
scripts/sanity/
  config.ts               Shared client, env, paths, utilities
  introspect-schemas.ts   Schema static analysis → schema-map.json
  export-dataset.ts       Live CMS → sanity-mirror/documents/
  diff-dataset.ts         Live vs mirror → diff-report.json
  generate-migration-plan.ts  Diff → migration-plan.json
  seed-from-json.ts       Mirror → live Sanity (safe upsert)
  validate-schema.ts      Pre-seed validation (used as library)
  verify-assets.ts        Asset reference integrity check
  rollback.ts             Snapshot/restore live dataset
  generate-types.ts       schema-map.json → TypeScript types
  discover-queries.ts     Scan src/ for GROQ queries

sanity-mirror/
  documents/              Per-type JSON files (version controlled)
  schemas/                Parsed schema metadata per type
  queries/                Archived GROQ query files
  schema-map.json         Field/asset/reference map (generated)
  generated-types.ts      TypeScript interfaces (generated)
  export-meta.json        Last export metadata
  diff-report.json        Last diff result

sanity-backups/
  YYYY-MM-DD/
    HH-MM-SS.---Z/        Timestamped snapshot
      event.json
      landingPage.json
      _meta.json
```

## Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=c20abca7
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-27

# Required for seed / rollback restore operations
SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS=sk...

# Required to confirm destructive rollback restore
SANITY_MIGRATE_CONFIRM=yes
```

Override dataset per-command:

```bash
SANITY_DATASET=staging npm run sanity:export
```

---

## CLI Commands

| Command | Description |
|---|---|
| `npm run sanity:introspect` | Analyse schemas → schema-map.json |
| `npm run sanity:export` | Export live CMS → documents/ |
| `npm run sanity:diff` | Compare live vs mirror → diff-report.json |
| `npm run sanity:plan` | Generate migration-plan.json from diff |
| `npm run sanity:seed` | Upsert mirror docs into live Sanity |
| `npm run sanity:seed:dry-run` | Preview seed without writing |
| `npm run sanity:verify-assets` | Check all asset _refs are valid |
| `npm run sanity:rollback` | Snapshot live dataset to sanity-backups/ |
| `npm run sanity:rollback:list` | List available snapshots |
| `npm run sanity:generate-types` | Generate TypeScript interfaces |
| `npm run sanity:discover-queries` | Archive GROQ queries from src/ |
| `npm run sanity:validate` | Validate mirror docs against schema |
| `npm run sanity:migrate` | Full pipeline: snapshot → diff → plan → seed |

---

## Standard Workflows

### 1. Initial Setup

```bash
# Install deps (tsx + @sanity/client were added to devDependencies)
npm install

# Analyse schemas
npm run sanity:introspect

# Generate TypeScript types
npm run sanity:generate-types

# Archive GROQ queries for reference
npm run sanity:discover-queries
```

### 2. Export Live CMS → Local Mirror

```bash
npm run sanity:export
# → sanity-mirror/documents/event.json
# → sanity-mirror/documents/landingPage.json
# → sanity-mirror/documents/navbar.json
# → sanity-mirror/documents/footer.json
```

### 3. Edit Content Locally

Edit any file in `sanity-mirror/documents/`.
Example: update an event title in `sanity-mirror/documents/event.json`.

### 4. Diff and Plan Migration

```bash
# Compare local edits vs live dataset
npm run sanity:diff
# → sanity-mirror/diff-report.json

# Generate a plan
npm run sanity:plan
# → migration-plan.json
```

Review `migration-plan.json`:
```json
{
  "summary": { "create": 1, "update": 2, "skip": 19 },
  ...
}
```

### 5. Safe Seed

```bash
# Dry run first (no writes)
npm run sanity:seed:dry-run

# If plan looks correct, seed
npm run sanity:seed
```

Seed rules:
- Existing `_id` → `createOrReplace` (full upsert)
- New `_id` → `createIfNotExists`
- Documents in live but not in mirror → **skipped** (never auto-deleted)
- Asset `_ref` values are never modified or re-uploaded

### 6. Full Migration Pipeline (one command)

```bash
npm run sanity:migrate
```

This runs: snapshot → diff → plan → seed.
A backup snapshot is always created before any write operation.

### 7. Rollback

```bash
# List available snapshots
npm run sanity:rollback:list

# Create a manual snapshot
npm run sanity:rollback

# Restore to a specific date (DANGEROUS — requires confirmation env var)
SANITY_MIGRATE_CONFIRM=yes tsx --tsconfig tsconfig.scripts.json scripts/sanity/rollback.ts restore 2026-03-16
```

---

## CI/CD Integration

Add to your CI pipeline (e.g. GitHub Actions):

```yaml
- name: Sanity export & diff
  env:
    NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
    NEXT_PUBLIC_SANITY_DATASET: production
    NEXT_PUBLIC_SANITY_API_VERSION: 2025-12-27
    SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS: ${{ secrets.SANITY_WRITE_TOKEN }}
  run: |
    npm run sanity:export
    npm run sanity:diff
    npm run sanity:plan

- name: Sanity seed (staging only)
  if: github.ref == 'refs/heads/staging'
  run: npm run sanity:seed
```

### Git-Aware Migration Detection

Only run migration if `sanity-mirror/` content changed:

```bash
git diff --quiet sanity-mirror/ || npm run sanity:migrate
```

---

## Asset Safety Rules

The engine enforces these rules for all operations:

1. **Never re-upload assets.** Asset `_ref` values are immutable identifiers.
2. **Never modify asset `_ref`.** Import/export preserves refs exactly.
3. **Never delete assets.** Deletions are always manual operations via Studio.
4. **Verify before seeding.** Run `npm run sanity:verify-assets` to check all refs.

If `verify-assets` reports broken refs:
- Open Sanity Studio
- Locate the affected document
- Re-attach the image asset via the Studio UI
- Re-export the document: `npm run sanity:export`

---

## Multi-Dataset (staging / production)

```bash
# Export from staging
SANITY_DATASET=staging npm run sanity:export

# Export from production
SANITY_DATASET=production npm run sanity:export

# Seed staging with production content
SANITY_DATASET=staging npm run sanity:seed
```

---

## Idempotency Guarantee

Running `npm run sanity:seed` multiple times is safe:
- Documents that already match the mirror → no change (skipped by diff)
- No duplicate documents — `createIfNotExists` handles existing IDs
- No document deletion — removed docs are always skipped

---

## Schema Changes

When schemas change:

```bash
# Re-introspect to update schema-map.json
npm run sanity:introspect

# Regenerate TypeScript types
npm run sanity:generate-types

# Re-validate mirror documents against new schema
npm run sanity:validate
```
