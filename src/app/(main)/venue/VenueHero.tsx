'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import LaurelBadge from '@/components/shared/LaurelBadge'

interface GalleryImage {
  url: string
  alt?: string
}

interface VenueHeroProps {
  hero: {
    heading?: string
    subHeading?: string
    location?: string
  }
  heroFeature?: {
    subtitle?: string
    title: string
    tag?: string
    link?: string
  }
  galleryImages: GalleryImage[]
}

const DEFAULT_HERO = {
  heading: 'Palazzo Odescalchi',
  subHeading: 'Create Cinematic Magic in a Legendary Setting',
  location: 'Como, Italy',
}

const DEFAULT_FEATURE = {
  subtitle: 'Historic Palace',
  title: 'EXCLUSIVE VENUE',
  tag: '2026',
  link: '/contact',
}

export default function VenueHero({ hero, heroFeature, galleryImages }: VenueHeroProps) {
  const feature = heroFeature || DEFAULT_FEATURE
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const validImages = galleryImages?.filter(img => img?.url) || []
  const hasImages = validImages.length > 0

  const nextImage = useCallback(() => {
    if (validImages.length > 1) {
      setCurrentIndex(prev => (prev + 1) % validImages.length)
    }
  }, [validImages.length])

  useEffect(() => {
    if (!isAutoPlaying || validImages.length <= 1) return
    
    const interval = setInterval(nextImage, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextImage, validImages.length])

  useEffect(() => {
    if (hasImages) {
      const randomStart = Math.floor(Math.random() * validImages.length)
      setCurrentIndex(randomStart)
    }
  }, [hasImages, validImages.length])

  return (
    <section 
      className="relative min-h-[100vh] flex items-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        {hasImages && validImages[currentIndex] && (
          <motion.div 
            key={currentIndex}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src={validImages[currentIndex].url}
              alt={validImages[currentIndex].alt || hero?.heading || 'Venue'}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="100vw"
            />
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="absolute inset-0 z-[1]"
        style={{ 
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)' 
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="text-center lg:text-left">
          {hero?.location && (
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <MapPin size={14} className="text-white/70" />
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/70">
                {hero.location}
              </span>
            </motion.div>
          )}

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 tracking-tight leading-[1.1] text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {hero?.heading || DEFAULT_HERO.heading}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl font-light italic mb-6 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {hero?.subHeading || DEFAULT_HERO.subHeading}
          </motion.p>

          <motion.div 
            className="mt-8 flex flex-col items-center lg:items-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] font-light text-white/50">
              Explore the venue
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={28} className="text-white/40" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="hidden lg:flex justify-center lg:justify-end items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          <LaurelBadge 
            title={feature.title}
            subtitle={feature.subtitle}
            tag={feature.tag}
            link={feature.link}
            themeAware={false}
            index={0}
          />
        </motion.div>
      </div>
    </section>
  )
}
