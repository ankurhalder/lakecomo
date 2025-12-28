
import { createClient } from 'next-sanity';
import dotenv from 'dotenv';


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

const docs = [
  {
    _id: 'homepage',
    _type: 'homepage',
    title: 'Home Page',
    heroSection: {
      preHeading: 'Presenting Our Guests With',
      mainHeading: 'A one-of-a-kind cinematic immersive experience transforming celebrations into unforgettable movie trailers.',
      subHeading: 'Your Party, Your Theme, Your Movie Trailer',
      ctaText: 'Book Now',
      ctaLink: '/contact'
    },
    featuresGrid: [
      { 
        _type: 'featureCard',
        _key: 'feat1',
        title: 'THEMED CINEMATIC PARTIES', 
        subtitle: 'Dive into the World of Cinematic Creativity. Choose Your Theme. Unlock Your Imagination',
        link: '/themes'
      },
      { 
        _type: 'featureCard',
        _key: 'feat2',
        title: 'VENUE SELECTION', 
        subtitle: 'Unlock Your Imagination',
        tag: '2026',
        link: '/process'
      },
      { 
        _type: 'featureCard',
        _key: 'feat3',
        title: 'GALLERY', 
        subtitle: 'Discover Your Dream Location',
        tag: '2026',
        link: '/gallery'
      }
    ]
  },

  {
    _id: 'processPage',
    _type: 'processPage',
    title: 'Process Page',
    hero: {
      title: 'The Process',
      subtitle: 'From Concept to Cinema - Your Story Unfolds',
      description: 'Dive into the World of Cinematic Creativity. THEMED CINEMATIC PARTIES. Lake Como Style offers unique cinematic experiences.'
    },
    steps: [
      {
        _key: 'step1',
        stepNumber: '1-SELECT',
        stepTitle: 'YOUR THEME',
        tagline: 'BOND TO STARWARS',
        description: 'Select from our signature themes: 007 Agents of Style, Hollywood Hussle, or La Dolce Vita or create a custom theme. With over 3,000 costumes and props, your celebration can be uniquely tailored to your group.'
      },
      {
        _key: 'step2',
        stepNumber: '2-SELECT',
        stepTitle: 'YOUR VENUE',
        tagline: 'YOU NAME IT',
        description: 'Decide where your cinematic experience will take place: Our Private Palace, Luxury Hotel, or Your Chosen Venue.'
      },
      {
        _key: 'step3',
        stepNumber: '3-WE DESIGN',
        stepTitle: 'YOUR EVENT',
        tagline: 'PROPS & COSTUMES',
        description: 'Our team curates every detail to bring your theme to life. From custom step & repeat backdrops and curated props to music and atmosphere.'
      },
      {
        _key: 'step4',
        stepNumber: '4-CELEBRATE',
        stepTitle: 'IN STYLE',
        tagline: 'TIME TO SHINE',
        description: 'On the day of your event, guests step into the story. With guidance from our production team, everyone gets to act out key scenes from your chosen theme.'
      },
      {
        _key: 'step5',
        stepNumber: '5-YOUR MOVIE &',
        stepTitle: 'SOCIAL MEDIA CLIPS',
        tagline: 'YOUR SILVER SCREEN',
        description: 'Within 3–4 weeks, we deliver a beautifully produced 3-minute cinematic trailer, along with social media-ready clips.'
      },
      {
        _key: 'step6',
        stepNumber: '6-RELIVE',
        stepTitle: 'THE EXPERIENCE',
        tagline: 'POPCORN TIME',
        description: 'Your personalized movie trailer can be treasured for years to come — the perfect way to relive the magic of your celebration.'
      }
    ]
  },

  {
    _id: 'themesPage',
    _type: 'themesPage',
    title: 'Themes Page',
    hero: {
      mainTitle: '2026 Themes',
      highlightTitle: 'Best 2026 Theme is YOU DECIDE',
      secondaryTitle: 'Themes Designed to Make Every Guest a Star',
      description: 'With three main themes and an extensive inventory of over 3,000 costumes and props, we provide the ultimate immersive cinematic party service for rehearsal dinners, pool parties, bachelorette/bachelor gatherings, hotel-hosted theme nights and corporate events.'
    },
    themesList: [
      {
        _key: 'theme1',
        title: '007 Agents of Style',
        genre: 'Spy / Action Theme',
        vibe: 'Sleek, stylish, high-stakes, espionage.',
        story: 'Guests step into the world of secret agents, daring missions, and intrigue. Think tuxedos, glamorous dresses, clever props, and action-packed poses.',
        feel: 'Sophisticated, adventurous, playful suspense.'
      },
      {
        _key: 'theme2',
        title: 'The Hollywood Hussle',
        genre: 'Old Hollywood / Glamour Theme',
        vibe: 'Classic 1940s–1960s Tinseltown glamour.',
        story: 'Guests become stars of a vintage cinematic caper, full of red carpets, flashing cameras, and silver-screen drama. Think Marilyn Monroe–style gowns, sharp tuxedos, and iconic poses.',
        feel: 'Elegant, nostalgic, cinematic, story-driven, stylish drama.'
      },
      {
        _key: 'theme3',
        title: 'La Dolce Vita',
        genre: 'Italian / Romantic Glamour Theme',
        vibe: 'Stylish, fun, romantic, sun-soaked Italian adventure.',
        story: 'Guests star in a story of romance, intrigue, and playful elegance in the heart of 1960s Rome. Think flowing dresses, sharp suits, chic sunglasses, and a cinematic, social-energy vibe.',
        feel: 'Romantic, stylish, lively, playful, cinematic charm.'
      },
      {
        _key: 'theme4',
        title: 'Pink Ladies & T-Birds',
        genre: 'Retro Cool / Grease Movie Theme',
        vibe: 'Pink Ladies–inspired retro glamour with Grease-era attitude. Think bubble-gum pink, black leather accents, cat-eye liner, soft curls, and confident, feminine rebellion.',
        story: 'Guests become members of the iconic Pink Ladies & T-Birds, stepping into a playful cinematic fantasy inspired by Grease. It’s a stylish, story-driven night of sisterhood, sass, and star moments — where the bride is the leading lady and every woman is part of the cast, striking poses and owning the spotlight.',
        feel: 'Fun, empowering, nostalgic, cinematic, stylish drama with attitude.'
      }, 
      {
        _key: 'theme5',
        title: 'Angels & Demons',
        genre: 'Secret Societies / Mystery Adventure Theme',
        vibe: 'Dark, intellectual cinematic drama — mystery, symbolism, and high-stakes elegance. Think Vatican grandeur, ancient secrets, candlelight, stone corridors, and a refined, suspenseful atmosphere.',
        story: 'Guests step into a cinematic world inspired by Angels & Demons, where secret societies, hidden symbols, and the tension between faith and reason drive the night. As scenes from the film unfold around them, guests become part of the mystery — aligned as Angels or Demons — navigating a story of power, belief, and revelation, with the event’s hosts at the center of the unfolding narrative.',
        feel: 'Mysterious, dramatic, cinematic, intellectual, suspense-driven elegance.'
      },
 
    ]
  },

  {
    _id: 'castPage',
    _type: 'castPage',
    title: 'Cast Page',
    hero: {
      title: 'Become the Cast',
      subtitle: 'Lights, Camera, Action - Your Time to Shine'
    },
    showcaseImages: [],
    content: {
      paragraphs: [
        {_key: 'p1', _type: 'text', text: 'The theme is set. The venue is chosen. Now it’s time for your guests to shine.'},
        {_key: 'p2', _type: 'text', text: 'Upon arrival, every guest receives a QR code that unlocks their story and sets the stage for the experience. As guests mingle, sip cocktails, and enjoy the atmosphere, we invite volunteers to step into the main character roles.'},
        {_key: 'p3', _type: 'text', text: 'For weddings, we recommend featuring the Bride, Groom, Best Man, Best Woman, and select members of the wedding party as the main cast. For corporate parties, we suggest spotlighting key leaders such as the CEO, CFO, COO, and other Senior Vice Presidents to take on the leading roles.'},
        {_key: 'p4', _type: 'text', text: 'Before the big day, lead roles are chosen so our stars can be styled and camera-ready right when they arrive. Guests should arrive dressed to match the selected vibe — think creative, on-theme, and camera-ready.'},
        {_key: 'p5', _type: 'text', text: 'To turn up the fun, we provide plenty of props and accessories for background actors and actresses, including hats, masks, and other fashion-forward pieces to spice up every look.'},
        {_key: 'p6', _type: 'text', text: 'No prior acting experience is necessary. Our team provides hands-on direction for the main characters — guiding stances, expressions, stares, and enactments — while background guests play a key role in making each scene feel full, energetic, and authentic.'},
        {_key: 'p7', _type: 'text', text: 'In between scenes, guests can enjoy photos in front of our step-and-repeat backdrops, cocktails, dancing, and mingling until it’s time for their moment on camera.'},
        {_key: 'p8', _type: 'text', text: 'Every role matters. Every moment counts. Together, you create a movie-worthy experience your guests will never forget.'},
        {_key: 'p9', _type: 'text', text: 'Your trailer. Your story. Your spotlight. Become the cast today!'}
      ]
    }
  },

  {
    _id: 'moviePage',
    _type: 'moviePage',
    title: 'Movie Page',
    hero: {
      title: 'Your Movie',
      subtitle: 'Ready for its Premiere, Bring Your Popcorn',
      description: 'In just 3–4 weeks, you’ll get a 3-minute cinematic trailer with your music, titles, cast names, and special effects — plus social media-ready cuts to share with the world.'
    },
    deliverables: [
      {
        _key: 'd1',
        title: '3-Minute Movie Trailer',
        details: [
          'A fully edited trailer up to 3 minutes in length',
          'Includes your choice of music to match the tone and style',
          'Features custom title and cast names',
          'Enhanced with special effects to elevate the cinematic impact'
        ]
      },
      {
        _key: 'd2',
        title: 'Social Media Ready Cuts',
        details: [
          'Shorter versions optimized for social media platforms',
          'Perfect for Instagram, TikTok, YouTube, or Facebook',
          'Designed to grab attention and drive engagement'
        ]
      },
      {
        _key: 'd3',
        title: 'Timeline',
        details: [
          'Delivered within 3–4 weeks from event date'
        ]
      }
    ]
  },

  {
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: 'About Page',
    hero: {
      title: 'Your Film Crew',
      subtitle: 'From the Big Apple to the heart of Milan — our team brings international talent to your celebration'
    },
    mission: 'Our passion for creating unforgettable cinematic experiences led us to establish Lake Como Style, the premier provider of themed cinematic experiences in Italy. We are an international crew dedicated to bringing the magic of fashion and cinema to life, offering a range of themes and settings to cater to every client\'s unique vision. Our team is delivers exceptional movie trailers and ensures that every event is a spectacular and memorable occasion for all.',
    teamMembers: [
      {
        _key: 'tm1',
        name: 'Dee Lasprogata',
        role: 'Founder / Stylist',
        bio: 'Our founder, Dee Lasprogata has over 30 years of experience in fashion, working in New York, Los Angeles, Rome, Milan, and Lake Como, where she resides. She has worked with celebrities including Stevie Wonder and Giada DeLaurentiis, pioneering fashion ventures and collections. With Dee’s expert styling, you don’t simply wear a costume- you embody the timeless elegance and sophistication that movies are made of.'
      },
      {
        _key: 'tm2',
        name: 'Stefano',
        role: 'Videography Lead',
        bio: 'Stefano has over x years of experience'
      }
    ]
  },


  {
    _id: 'galleryPage',
    _type: 'galleryPage',
    title: 'Gallery Page',
    hero: {
      title: 'BEHIND THE MAGIC',
      subtitle: 'A Star is Born'
    },
    images: []
  },


  {
    _id: 'contactPage',
    _type: 'contactPage',
    title: 'Contact Page',
    hero: {
      title: 'Get in Touch',
      subtitle: 'The Spotlight Awaits in Italy'
    },
    formConfig: {
      submitButtonText: 'Be A Star',
      successMessage: 'Thank you! We will be in touch shortly.'
    }
  },


  {
    _id: 'footer',
    _type: 'footer',
    title: 'Global Footer',
    footerTagline: 'Your Adventure in Style Awaits',
    email: 'info@lakecomostyle.it',
    copyright: '© 2025 by Lake Como Style',
    socialLinks: [
        { _key: 'soc1', platform: 'Instagram', url: 'https://instagram.com' },
        { _key: 'soc2', platform: 'Facebook', url: 'https://facebook.com' },
        { _key: 'soc3', platform: 'TikTok', url: 'https://tiktok.com' }
    ]
  },
  {
    _id: 'navbar',
    _type: 'navbar',
    title: 'Main Navigation',
    logoText: 'LAKE COMO STYLE',
    links: [
      { _key: 'nav1', label: 'Home', url: '/' },
      { _key: 'nav2', label: 'Process', url: '/process' },
      { _key: 'nav3', label: 'Themes', url: '/themes' },
      { _key: 'nav4', label: 'Cast', url: '/cast' },
      { _key: 'nav5', label: 'Your Movie', url: '/movie' },
      { _key: 'nav6', label: 'Crew', url: '/about' },
      { _key: 'nav7', label: 'Gallery', url: '/gallery' },
    ],
    ctaText: 'Book Now',
    ctaLink: '/contact'
  },
];

async function seedData() {
  console.log(`🚀 Starting Seed... Target Project: ${projectId}`);
  
  const assetFields = ['videoFile', 'posterImage', 'logoImage', 'icon', 'images', 'showcaseImages', 'teamMembers'];
  
  for (const doc of docs) {
    try {
      const existingDoc = await client.getDocument(doc._id);
      
      if (existingDoc) {
        const patchData = { ...doc };
        delete patchData._id;
        delete patchData._type;
        
        if (patchData.heroSection && existingDoc.heroSection) {
          assetFields.forEach(field => {
            if (existingDoc.heroSection[field]) {
              patchData.heroSection[field] = existingDoc.heroSection[field];
            }
          });
        }
        
        assetFields.forEach(field => {
          if (existingDoc[field]) {
            patchData[field] = existingDoc[field];
          }
        });
        
        if (patchData.teamMembers && existingDoc.teamMembers) {
          patchData.teamMembers = existingDoc.teamMembers.map((member, idx) => {
            const seedMember = doc.teamMembers?.[idx];
            if (seedMember && member.image) {
              return { ...seedMember, image: member.image };
            }
            return seedMember || member;
          });
        }
        
        await client.patch(doc._id).set(patchData).commit();
        console.log(`✅ Patched: ${doc._type} (preserved assets)`);
      } else {
        await client.createOrReplace(doc);
        console.log(`✅ Created: ${doc._type}`);
      }
    } catch (err) {
      console.error(`❌ Failed ${doc._type}: `, err.message);
    }
  }
  
  console.log('🎉 Seed complete!');
}

seedData();
