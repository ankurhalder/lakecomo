'use client'

import { useRef } from 'react'
import MovieHero from './MovieHero'
import DeliverablesSection from './DeliverablesSection'
import ParallaxPopcorn from './ParallaxPopcorn'

interface DeliverableItem {
  title: string
  description?: string
  features?: string[]
}

interface MovieData {
  title?: string
  hero?: {
    heading?: string
    subHeading?: string
    subSubHeading?: string
  }
  heroFeature?: {
    title: string
    subtitle?: string
    tag?: string
    link?: string
  }
  deliverables?: DeliverableItem[]
  timeline?: string
  popcornSection?: {
    imageUrl?: string
    heading?: string
    description?: string
    ctaText?: string
    ctaLink?: string
  }
}

const DEFAULT_HERO = {
  heading: 'Your Movie',
  subHeading: 'Ready for its Premiere, Bring Your Popcorn',
  subSubHeading: "In just 3-4 weeks, you'll get a 3-minute cinematic trailer with your music, titles, cast names, and special effects - plus social media-ready cuts to share with the world.",
}

const DEFAULT_FEATURE = {
  subtitle: 'Your Cinematic Keepsake',
  title: 'MOVIE PREMIERE',
  tag: 'Coming Soon',
  link: '/contact',
}

const DEFAULT_DELIVERABLES: DeliverableItem[] = [
  {
    title: '3-Minute Movie Trailer',
    description: 'A fully edited trailer up to 3 minutes in length',
    features: [
      'Includes your choice of music to match the tone and style',
      'Features custom title and cast names',
      'Enhanced with special effects to elevate the cinematic impact',
    ],
  },
  {
    title: 'Social Media Ready Cuts',
    description: 'Shorter versions optimized for social media platforms',
    features: [
      'Perfect for Instagram, TikTok, YouTube, or Facebook',
      'Designed to grab attention and drive engagement',
    ],
  },
  {
    title: 'Timeline',
    description: 'Delivered within 3-4 weeks from event date',
    features: [
      'Professional post-production editing',
      'Quality assurance review',
      'Secure digital delivery',
    ],
  },
]

export default function MovieContent({ data }: { data: MovieData | null }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const hero = data?.hero || DEFAULT_HERO
  const heroFeature = data?.heroFeature || DEFAULT_FEATURE
  const deliverables = data?.deliverables?.length ? data.deliverables : DEFAULT_DELIVERABLES
  const popcornSection = data?.popcornSection

  return (
    <div ref={containerRef} className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <MovieHero hero={hero} heroFeature={heroFeature} />
      
      <ParallaxPopcorn popcornSection={popcornSection} />
      
      <DeliverablesSection deliverables={deliverables} />
    </div>
  )
}
