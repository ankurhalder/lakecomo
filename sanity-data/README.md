# Sanity Data Sync

This folder contains the local backup of Sanity CMS data.

## Files
- `data.json` - The current state of all CMS documents

## Commands

### Pull from Sanity (Cloud → Local)
```bash
npm run sanity:pull
```
Downloads the latest data from Sanity cloud and saves it to `data.json`.
Use this to backup or sync your local copy with the latest cloud changes.

### Push to Sanity (Local → Cloud)
```bash
npm run sanity:push
```
Uploads the local `data.json` to Sanity cloud.
Use this to restore data or seed a new dataset.

## Important Notes
- Always run `sanity:pull` before making changes to ensure you have the latest data
- The `data.json` file is safe to commit to git (no secrets)
- Asset files (images, videos) are NOT synced - only document data
