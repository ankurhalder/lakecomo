import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

async function fixGallerySchema() {
  console.log('🔧 Checking Gallery Page for invalid fields...')
  
  try {
    const doc = await client.fetch('*[_type == "galleryPage"][0]')
    
    if (!doc) {
      console.log('❌ Gallery Page not found!')
      return
    }

    const updates = {}
    let hasUpdates = false

    if (doc.images) {
      console.log('⚠️  Found invalid field "images", scheduling for removal...')
      await client.patch(doc._id).unset(['images']).commit()
      console.log('✅ Removed "images" field.')
      hasUpdates = true
    }

    if (!hasUpdates) {
      console.log('✨ No invalid fields found. Document looks correct.')
    }

  } catch (error) {
    console.error('❌ Error fixing gallery page:', error)
  }
}

fixGallerySchema()
