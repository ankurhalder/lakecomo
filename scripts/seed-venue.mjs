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

const venuePageData = {
  _type: 'venuePage',
  title: 'Our Venue',
  hero: {
    heading: 'Palazzo Odescalchi',
    subHeading: 'Create Cinematic Magic in a Legendary Setting in the Center of Como',
    location: 'Como, Italy'
  },
  heroFeature: {
    title: 'EXCLUSIVE VENUE',
    subtitle: 'Historic Palace',
    tag: '2026',
    link: '/contact'
  },
  description: [
    'In the heart of Como, Palazzo Odescalchi stands as a testament to centuries of art, power, and noble heritage. Once the grand residence of the influential Odescalchi family, it played a key role in the city\'s aristocratic life, with ties to military leaders, European nobles, and even Pope Innocent XI.',
    'The palace\'s architecture reflects its rich history, blending medieval, Renaissance, and Baroque styles. Inside, magnificent frescoes and stucco decorations celebrate the family\'s triumphs, faith, and connections to European royalty. Scenes of battles, legends, and noble life adorn the grand halls, making it one of Como\'s most impressive artistic treasures and the perfect location for your cinematic-themed shoot!',
    'In the heart of Como, Palazzo Odescalchi stands as a living monument to centuries of history and art. Once a Papal Residence, it reflects the legacy of the noble Odescalchi family, whose lineage includes Pope Innocent XI. With biblical frescoes, gilded ceilings, and monumental fireplaces, this majestic palace is a place where history meets grandeur, a timeless symbol of noble prestige.'
  ],
  features: [
    {
      _key: 'capacity',
      title: 'Capacity',
      description: 'The palace offers a versatile and elegant space, ideal for gatherings of various sizes and types of events.'
    },
    {
      _key: 'accessibility',
      title: 'Accessibility',
      description: 'The venue is located in a restricted traffic area but is easily accessible through a private car service.'
    },
    {
      _key: 'interior',
      title: 'Interior Spaces',
      description: 'The layout includes two spacious corridors and five well-appointed rooms, along with two conveniently located restrooms.'
    },
    {
      _key: 'history',
      title: 'Historic Heritage',
      description: 'Biblical frescoes, gilded ceilings, and monumental fireplaces create a timeless atmosphere of noble prestige.'
    }
  ],
  eventInfo: 'Every event runs for at least three hours, featuring an open bar, popcorn, and a DJ to soundtrack the action between scenes. For guests seeking a full dining experience, we craft menus inspired by your theme, from elegant dinners to relaxed lunches, ensuring each moment is as cinematic as the story unfolding around you.',
  youtubeUrl: 'https://www.youtube.com/watch?v=6IsGbxc14CY',
  externalLinks: {
    palaceWebsite: 'https://palazzoodescalchicomo.it/',
    bookingLink: '/contact'
  }
}

async function seedVenuePage() {
  console.log('🏛️ Seeding Venue Page data...')
  
  try {
    const existing = await client.fetch('*[_type == "venuePage"][0]')
    
    if (existing) {
      console.log('📝 Venue Page already exists, updating...')
      await client.patch(existing._id).set(venuePageData).commit()
      console.log('✅ Venue Page updated successfully!')
    } else {
      console.log('📝 Creating new Venue Page...')
      await client.create(venuePageData)
      console.log('✅ Venue Page created successfully!')
    }
    
    console.log('')
    console.log('📸 Remember to upload venue gallery images via Sanity Studio at /admin')
    console.log('   You can bulk upload by dragging multiple images into the Gallery Images field.')
    console.log('')
  } catch (error) {
    console.error('❌ Error seeding venue page:', error)
    process.exit(1)
  }
}

seedVenuePage()
