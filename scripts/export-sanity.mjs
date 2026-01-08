import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const schemaTypes = [
  'homepage',
  'navbar',
  'footer',
  'themesPage',
  'castPage',
  'processPage',
  'moviePage',
  'crewPage',
  'venuePage',
  'galleryPage',
  "faqPage",
  'contactPage'
]

async function fetchAllData() {
  console.log('🎬 Fetching all Lake Como Style data from Sanity...\n')

  const allData = {
    _metadata: {
      exportedAt: new Date().toISOString(),
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    },
  }

  for (const schemaType of schemaTypes) {
    try {
      console.log(`📦 Fetching ${schemaType}...`)
      const data = await client.fetch(`*[_type == "${schemaType}"]`)
      allData[schemaType] = data
      console.log(`   ✅ Found ${data.length} document(s)`)
    } catch (error) {
      console.error(`   ❌ Error fetching ${schemaType}:`, error.message)
      allData[schemaType] = { error: error.message }
    }
  }

  console.log('\n📦 Fetching all assets (images/files)...')
  try {
    const assets = await client.fetch(`*[_type in ["sanity.imageAsset", "sanity.fileAsset"]] {
      _id,
      _type,
      originalFilename,
      url,
      mimeType,
      size,
      metadata
    }`)
    allData['_assets'] = assets
    console.log(`   ✅ Found ${assets.length} asset(s)`)
  } catch (error) {
    console.error(`   ❌ Error fetching assets:`, error.message)
    allData['_assets'] = { error: error.message }
  }

  const outputPath = path.join(process.cwd(), 'lakecomostyle.json')
  fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2), 'utf-8')

  console.log('\n✅ Export complete!')
  console.log(`📄 Data saved to: ${outputPath}`)
  console.log(`📊 Total schema types exported: ${schemaTypes.length}`)

  const stats = schemaTypes.map(type => ({
    type,
    count: Array.isArray(allData[type]) ? allData[type].length : 0
  }))
  console.log('\n📈 Summary:')
  stats.forEach(({ type, count }) => {
    console.log(`   ${type}: ${count} document(s)`)
  })
}

fetchAllData().catch(error => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
