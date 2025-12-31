import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2025-12-27',
  useCdn: false,
})

const processPageData = {
  _type: 'processPage',
  _id: 'processPage',
  title: 'The Movie Process',
  hero: {
    heading: 'The Process',
    subHeading: 'From Concept to Cinema - Your Story Unfolds',
    description: 'Lake Como Style offers unique cinematic experiences where groups and couples can create their own movie trailers against the stunning backdrop of Lake Como. It\'s a perfect place for people to immerse themselves in the art of filmmaking while enjoying the beauty of Italy.',
  },
  heroFeature: {
    subtitle: 'Dive into the World of Cinematic Creativity',
    title: 'THEMED CINEMATIC PARTIES',
    tag: 'Choose Your Theme',
    link: '/themes',
  },
  steps: [
    {
      _key: 'step1',
      stepNumber: 1,
      titleLines: ['SELECT', 'YOUR', 'THEME'],
      tagline: 'PINK LADIES TO LA DOLCE VITA',
      heading: 'Choose Your Story',
      body: `Select from our signature themes: International Agents of Style, Hollywood Hussle, La Dolce Vita, Pink Ladies, Angels & Demons or create a custom theme. With over 3,000 costumes and props, your celebration can be uniquely tailored to your group. We consult with you to build any themed story - the sky is the limit with us!

Whether you are celebrating with a bachelorette/bachelor party, a rehearsal dinner, a "day after" pool party, a tour group cocktail party, a corporate event or a honeymoon love story, we build themes for any group size and celebration.`,
    },
    {
      _key: 'step2',
      stepNumber: 2,
      titleLines: ['SELECT', 'YOUR', 'VENUE'],
      tagline: 'YOU NAME IT',
      heading: 'Pick Your Location',
      body: `Decide where your cinematic experience will take place:

• Our Private Palace: Our Turnkey setup with cocktails, gourmet popcorn with DJ & dancing

• Luxury Hotel: Partnering with selected hotels for seamless events offering guests an exclusive experience

• Your Chosen Venue: We bring all props, costumes, step & repeat backdrops, and filming to your location whether it be at a restaurant, villa or hotel. We do travel to various locations in Italy with advance requests.

• We offer day filming on the Lake with boats, vespas, costumes and props for groups wanting a day event while visiting the Lake. A perfect memorabilia and adventure for guests.`,
    },
    {
      _key: 'step3',
      stepNumber: 3,
      titleLines: ['WE DESIGN', 'YOUR', 'EVENT'],
      tagline: 'PROPS & COSTUMES',
      heading: 'Production Design',
      body: `Our team curates every detail to bring your theme to life. From custom step & repeat backdrops and curated props to music and storylines, we transform venues into a cinematic setting. Our stylist works directly with you to ensure all props, costumes and backdrops are ready for your film. You relax while we handle all the production details.`,
    },
    {
      _key: 'step4',
      stepNumber: 4,
      titleLines: ['CELEBRATE', 'IN', 'STYLE'],
      tagline: 'TIME TO SHINE',
      heading: 'The Big Day',
      body: `On the day of your event, guests step into the story. With guidance from our production team, everyone gets to act out key scenes from your chosen theme, making the experience interactive and unforgettable. Our professional videographer captures both spontaneous and directed moments, ensuring every guest shines on camera while enjoying an elevated, immersive celebration.`,
    },
    {
      _key: 'step5',
      stepNumber: 5,
      titleLines: ['YOUR MOVIE &', 'SOCIAL', 'MEDIA CLIPS'],
      tagline: 'YOUR SILVER SCREEN',
      heading: 'Post-Production Magic',
      body: `Within 3–4 weeks, we deliver a beautifully produced 3-minute cinematic trailer, along with social media-ready clips. Each main character can have custom cast names, and special effects can be added upon request, so your celebration is uniquely yours — both on screen and online.`,
    },
    {
      _key: 'step6',
      stepNumber: 6,
      titleLines: ['RELIVE', 'THE', 'EXPERIENCE'],
      tagline: 'POPCORN TIME',
      heading: 'Share The Magic',
      body: `Your personalized movie trailer can be treasured for years to come — the perfect way to relive the magic of your celebration. After your 3-minute trailer and social media clips are delivered, we can create a private, password-secured website where all your guests can watch your film. It's a great way to share the movie and host a screening, either on Zoom or in person. Bring your popcorn!`,
    },
  ],
}

async function seedProcessPage() {
  console.log('🎬 Seeding Process Page data...')
  
  try {
    const result = await client.createOrReplace(processPageData)
    console.log('✅ Process Page created successfully!')
    console.log('Document ID:', result._id)
  } catch (error) {
    console.error('❌ Error seeding Process Page:', error)
    process.exit(1)
  }
}

seedProcessPage()
