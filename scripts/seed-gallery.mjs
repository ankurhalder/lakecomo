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

const galleryPageData = {
  _type: 'galleryPage',
  title: 'Gallery',
  hero: {
    heading: 'BEHIND THE MAGIC',
    subHeading: 'A Star is Born'
  },
  heroFeature: {
    title: 'CINEMATIC',
    subtitle: 'Backstage Pass',
    tag: '2026',
    link: '/process'
  },
  details: 'Experience the unseen moments that make every event unforgettable. From the meticulous preparation to the candid emotions, our gallery captures the essence of what happens behind the scenes. Every smile, every touch up, every last-minute adjustment contributes to the cinematic masterpiece that is your celebration. Witness the dedication and artistry that transforms a simple gathering into a legendary production.',
  galleryImages: [] 
}

async function seedGalleryPage() {
  console.log('🏛️ Seeding Gallery Page data...')
  
  try {
    const existing = await client.fetch('*[_type == "galleryPage"][0]')
    
    if (existing) {
      console.log('📝 Gallery Page already exists, updating...')
      await client.patch(existing._id).set(galleryPageData).commit()
      console.log('✅ Gallery Page updated successfully!')
    } else {
      console.log('📝 Creating new Gallery Page...')
      await client.create(galleryPageData)
      console.log('✅ Gallery Page created successfully!')
    }
    
    console.log('')
    console.log('📸 Remember to upload gallery images via Sanity Studio at /admin')
    console.log('')
  } catch (error) {
    console.error('❌ Error seeding gallery page:', error)
    process.exit(1)
  }
}

seedGalleryPage()
