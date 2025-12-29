import { createClient } from 'next-sanity';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_WRITE_TOKEN;

const missingVars = [];
if (!projectId) missingVars.push("NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dataset) missingVars.push("NEXT_PUBLIC_SANITY_DATASET");
if (!token) missingVars.push("SANITY_WRITE_TOKEN");

if (missingVars.length > 0) {
  console.error(`❌ Missing environment variables: ${missingVars.join(", ")}`);
  console.error("Please add them to your .env.local file.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const DATA_FILE = path.join(process.cwd(), 'sanity-data', 'data.json');

async function pushToSanity() {
  console.log('🚀 Pushing local data TO Sanity...\n');

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Data file not found: ${DATA_FILE}`);
    console.error('   Run "npm run sanity:pull" first to create the data file.');
    process.exit(1);
  }

  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    const documents = JSON.parse(rawData);

    if (!Array.isArray(documents) || documents.length === 0) {
      console.log('⚠️  No documents found in local file.');
      return;
    }

    console.log(`📦 Found ${documents.length} documents to push:\n`);

    for (const doc of documents) {
      if (!doc._id || !doc._type) {
        console.log(`   ⚠️  Skipping invalid document (missing _id or _type)`);
        continue;
      }

      try {
        const existing = await client.getDocument(doc._id);
        
        if (existing) {
          await client.createOrReplace(doc);
          console.log(`   ✅ Updated: ${doc._type} (${doc._id})`);
        } else {
          await client.create(doc);
          console.log(`   ✅ Created: ${doc._type} (${doc._id})`);
        }
      } catch (docError) {
        console.log(`   ❌ Failed: ${doc._type} (${doc._id}) - ${docError.message}`);
      }
    }

    console.log('\n✅ Push complete!');
    
  } catch (error) {
    console.error('❌ Error pushing to Sanity:', error.message);
    process.exit(1);
  }
}

pushToSanity();
