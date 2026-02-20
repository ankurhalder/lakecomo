import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS,
  useCdn: false,
});

const schemaTypes = [
  "homepage",
  "navbar",
  "footer",
  "themesPage",
  "castPage",
  "processPage",
  "moviePage",
  "crewPage",
  "venuePage",
  "galleryPage",
  "faqPage",
  "contactPage",
];

const REMOVED_INTERNAL_FIELDS = new Set([
  "_rev",
  "_createdAt",
  "_updatedAt",
  "_system",
]);

function buildAssetRefToUrlMap(assets) {
  const map = new Map();

  if (!Array.isArray(assets)) return map;

  for (const asset of assets) {
    if (
      asset &&
      typeof asset._id === "string" &&
      typeof asset.url === "string"
    ) {
      map.set(asset._id, asset.url);
    }
  }

  return map;
}

function toShortValue(value, assetRefToUrl, stats) {
  if (Array.isArray(value)) {
    return value.map((item) => toShortValue(item, assetRefToUrl, stats));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const shortObject = {};

  for (const [key, nestedValue] of Object.entries(value)) {
    if (REMOVED_INTERNAL_FIELDS.has(key)) {
      continue;
    }

    if (key.startsWith("_") && key !== "_id" && key !== "_type") {
      continue;
    }

    if (
      key === "asset" &&
      nestedValue &&
      typeof nestedValue === "object" &&
      typeof nestedValue._ref === "string"
    ) {
      const assetRef = nestedValue._ref;
      const resolvedAssetUrl = assetRefToUrl.get(assetRef);

      stats.assetRefs += 1;

      if (resolvedAssetUrl) {
        shortObject.assetUrl = resolvedAssetUrl;
        stats.resolvedAssetRefs += 1;
      } else {
        shortObject.assetRef = assetRef;
        stats.unresolvedAssetRefs += 1;
      }

      continue;
    }

    shortObject[key] = toShortValue(nestedValue, assetRefToUrl, stats);
  }

  return shortObject;
}

function buildShortExport(allData, assetRefToUrl, stats) {
  const shortData = {
    _metadata: allData._metadata,
  };

  for (const schemaType of schemaTypes) {
    const schemaDocuments = allData[schemaType];
    if (!Array.isArray(schemaDocuments)) {
      shortData[schemaType] = schemaDocuments;
      continue;
    }

    shortData[schemaType] = schemaDocuments.map((doc) =>
      toShortValue(doc, assetRefToUrl, stats),
    );
  }

  return shortData;
}

async function fetchAllData() {
  console.log("🎬 Fetching all Lake Como Style data from Sanity...\n");

  const allData = {
    _metadata: {
      exportedAt: new Date().toISOString(),
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    },
  };

  for (const schemaType of schemaTypes) {
    try {
      console.log(`📦 Fetching ${schemaType}...`);
      const data = await client.fetch(`*[_type == "${schemaType}"]`);
      allData[schemaType] = data;
      console.log(`   ✅ Found ${data.length} document(s)`);
    } catch (error) {
      console.error(`   ❌ Error fetching ${schemaType}:`, error.message);
      allData[schemaType] = { error: error.message };
    }
  }

  console.log("\n📦 Fetching all assets (images/files)...");
  try {
    const assets =
      await client.fetch(`*[_type in ["sanity.imageAsset", "sanity.fileAsset"]] {
      _id,
      _type,
      originalFilename,
      url,
      mimeType,
      size,
      metadata
    }`);
    allData["_assets"] = assets;
    console.log(`   ✅ Found ${assets.length} asset(s)`);
  } catch (error) {
    console.error(`   ❌ Error fetching assets:`, error.message);
    allData["_assets"] = { error: error.message };
  }

  const shortExportStats = {
    assetRefs: 0,
    resolvedAssetRefs: 0,
    unresolvedAssetRefs: 0,
  };
  const assetRefToUrl = buildAssetRefToUrlMap(allData["_assets"]);
  const shortData = buildShortExport(allData, assetRefToUrl, shortExportStats);

  const fullOutputPath = path.join(process.cwd(), "lakecomostyle.json");
  const shortOutputPath = path.join(process.cwd(), "lakecomostyle.short.json");

  fs.writeFileSync(fullOutputPath, JSON.stringify(allData, null, 2), "utf-8");
  fs.writeFileSync(
    shortOutputPath,
    JSON.stringify(shortData, null, 2),
    "utf-8",
  );

  console.log("\n✅ Export complete!");
  console.log(`📄 Full data saved to: ${fullOutputPath}`);
  console.log(`📄 Short data saved to: ${shortOutputPath}`);
  console.log(`📊 Total schema types exported: ${schemaTypes.length}`);

  const stats = schemaTypes.map((type) => ({
    type,
    count: Array.isArray(allData[type]) ? allData[type].length : 0,
  }));
  console.log("\n📈 Summary:");
  stats.forEach(({ type, count }) => {
    console.log(`   ${type}: ${count} document(s)`);
  });

  console.log("\n🔗 Asset reference summary (short export):");
  console.log(`   Total refs found: ${shortExportStats.assetRefs}`);
  console.log(`   Resolved URLs: ${shortExportStats.resolvedAssetRefs}`);
  console.log(`   Unresolved refs: ${shortExportStats.unresolvedAssetRefs}`);
}

fetchAllData().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
