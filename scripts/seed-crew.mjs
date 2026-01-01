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

const crewPageData = {
  _type: 'crewPage',
  title: 'About Your Crew',
  hero: {
    heading: 'Your Film Crew',
    subHeading: 'From the Big Apple to the heart of Milan — our team brings international talent to your celebration',
    description: 'Our passion for creating unforgettable cinematic experiences led us to establish Lake Como Style, the premier provider of themed cinematic experiences in Italy. We are an international crew dedicated to bringing the magic of fashion and cinema to life, offering a range of themes and settings to cater to every client\'s unique vision. Our team delivers exceptional movie trailers and ensures that every event is a spectacular and memorable occasion for all.'
  },
  heroFeature: {
    title: 'MEET THE TEAM',
    subtitle: 'International Expertise',
    tag: '2026',
    link: '/contact'
  },
  crewMembers: [
    {
      _key: 'dee-lasprogata',
      name: 'Dee Lasprogata',
      role: 'Founder & Creative Director',
      bio: [
        'Our founder, Dee Lasprogata has over 30 years of experience in fashion, working in New York, Los Angeles, Rome, Milan, and Lake Como, where she resides. She has worked with celebrities including Stevie Wonder and Giada DeLaurentiis, pioneering fashion ventures and collections. With Dee\'s expert styling, you don\'t simply wear a costume — you embody the timeless elegance and sophistication that movies are made of.',
        'With roots in Philadelphia, Dee grew up surrounded by couture as her grandmother operated a custom gown atelier. Later, she graduated from both Vanderbilt University and the Fashion Institute of Design in New York City.',
        'She arrived on the shores of Lake Como over 20 years ago for a fashion textile show in Cernobbio and has been back and forth ever since.',
        'During her New York years, she launched a pioneering fashion collection working with celebrities including Stevie Wonder and Giada De Laurentiis. Over the years, her pieces have been featured in major publications in both the USA and Italy, including People, Glamour, Io Donna, Women\'s Wear Daily (WWD), Fox & Friends, TG5, and Entrepreneur.',
        'Today, Dee combines her fashion-forward sensibilities with cinematic flair to craft an unforgettable experience; she curates the wardrobe, props, and look for every guest.'
      ],
      socials: {
        instagram: 'https://instagram.com/lakecomostyle',
        linkedin: 'https://linkedin.com/in/deelasprogata'
      }
    },
    {
      _key: 'stefano-dozza',
      name: 'Stefano Dozza',
      role: 'Filmmaker & Visual Director',
      bio: [
        'Stefano Dozza is a filmmaker, photographer, and content producer from Bologna, currently based between Milan and Rome. He has studied and worked in New York, Los Angeles, and the UK. Over the years, his work has spanned corporate and fashion projects, with each video carefully tailored to reflect the unique look and identity of each brand.',
        'As a versatile creative professional, Stefano brings expertise in filmmaking, photography, copywriting, and podcasting to Lake Como Style. His international experience and artistic vision ensure that every cinematic experience captures the essence of Italian elegance combined with Hollywood production values.',
        'Stefano\'s commitment to sustainability and thoughtful content creation aligns perfectly with Lake Como Style\'s mission to deliver meaningful, memorable experiences that respect both artistry and environment.'
      ],
      socials: {
        website: 'https://johntouche.com',
        instagram: 'https://instagram.com/johntouche'
      }
    }
  ]
}

async function seedCrewPage() {
  console.log('🎬 Seeding Crew Page data...')
  
  try {
    const existing = await client.fetch('*[_type == "crewPage"][0]')
    
    if (existing) {
      console.log('📝 Crew Page already exists, updating...')
      await client.patch(existing._id).set(crewPageData).commit()
      console.log('✅ Crew Page updated successfully!')
    } else {
      console.log('📝 Creating new Crew Page...')
      await client.create(crewPageData)
      console.log('✅ Crew Page created successfully!')
    }
    
    console.log('')
    console.log('📸 Remember to upload crew member images via Sanity Studio at /admin')
    console.log('')
  } catch (error) {
    console.error('❌ Error seeding crew page:', error)
    process.exit(1)
  }
}

seedCrewPage()
