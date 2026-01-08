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

async function seedEventShowcase() {
  console.log('🎬 Seeding Event Showcase data to homepage...\n')

  const eventShowcaseData = {
    title: 'Perfect For',
    eventTypes: ['Weddings', 'Bachelorette Parties', 'Corporate Events'],
    link: '/themes',
    tagline: 'Your Event Awaits'
  }

  try {
    const result = await client
      .patch('homepage')
      .set({
        'heroSection.eventShowcase': eventShowcaseData
      })
      .commit()

    console.log('✅ Successfully updated homepage with eventShowcase!')
    console.log('📄 Updated document ID:', result._id)
    console.log('\n📦 Event Showcase Data:')
    console.log('   Title:', eventShowcaseData.title)
    console.log('   Event Types:', eventShowcaseData.eventTypes.join(', '))
    console.log('   Link:', eventShowcaseData.link)
    console.log('   Tagline:', eventShowcaseData.tagline)
  } catch (error) {
    console.error('❌ Error updating homepage:', error.message)
    process.exit(1)
  }
}

seedEventShowcase().catch(error => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})
