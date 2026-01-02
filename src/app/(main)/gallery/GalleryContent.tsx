'use client'

import GalleryHero from './GalleryHero'
import GalleryParallax from './GalleryParallax'
import type { GalleryPageData } from '@/sanity/lib/getGalleryPage'

interface GalleryContentProps {
  data: GalleryPageData | null
}

const DEFAULT_HERO = {
  heading: 'BEHIND THE MAGIC',
  subHeading: 'A Star is Born',
  agentNote: 'What you are about to witness is the culmination of artistry, passion, and pure cinematic magic. These frames capture the essence of Lake Como Style.'
}

const DEFAULT_FEATURES = [
  { title: 'Professional Photography', description: 'Every moment captured by our expert cinematographers.' },
  { title: 'Costume Gallery', description: 'Over 3,000 costumes and props available.' },
  { title: 'Venue Showcases', description: 'Stunning locations from historic palaces to lakeside villas.' },
  { title: 'Event Highlights', description: 'From intimate gatherings to grand celebrations.' }
]

export default function GalleryContent({ data }: GalleryContentProps) {
  const hero = data?.hero || DEFAULT_HERO
  const heroFeature = data?.heroFeature
  const features = data?.features?.length ? data.features : DEFAULT_FEATURES
  const images = data?.images || []

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <GalleryHero 
        hero={hero} 
        heroFeature={heroFeature}
        features={features}
      />
      
      <GalleryParallax images={images} />
    </div>
  )
}

