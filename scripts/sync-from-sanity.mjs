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

const DOCUMENT_TYPES = [
  'homepage',
  'processPage', 
  'themesPage',
  'castPage',
  'moviePage',
  'aboutPage',
  'galleryPage',
  'contactPage',
  'navbar',
  'footer'
];

async function syncFromSanity() {
  console.log('🔄 Syncing data FROM Sanity to local...\n');

  try {
    const query = `*[_type in $types]{
      ...,
      "heroSection": heroSection{
        ...,
        "videoUrl": video.asset->url
      }
    }`;
    
    const documents = await client.fetch(query, { types: DOCUMENT_TYPES });
    
    if (documents.length === 0) {
      console.log('⚠️  No documents found in Sanity.');
      return;
    }

    const cleanedDocs = documents.map(doc => {
      const cleaned = { ...doc };
      delete cleaned._rev;
      delete cleaned._updatedAt;
      delete cleaned._createdAt;
      return cleaned;
    });

    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(cleanedDocs, null, 2));
    
    console.log(`✅ Successfully synced ${documents.length} documents to local file:`);
    console.log(`   📁 ${DATA_FILE}\n`);
    
    console.log('Documents synced:');
    documents.forEach(doc => {
      console.log(`   - ${doc._type} (${doc._id})`);
    });
    
  } catch (error) {
    console.error('❌ Error syncing from Sanity:', error.message);
    process.exit(1);
  }
}

syncFromSanity();
