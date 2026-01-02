'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import LaurelBadge from '@/components/shared/LaurelBadge'

interface MovieHeroProps {
  hero: {
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
  popcornImageUrl?: string
}

export default function MovieHero({ hero, heroFeature, popcornImageUrl }: MovieHeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const popcornY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const popcornRotate = useTransform(scrollYProgress, [0, 1], [-8, 15])
  const popcornScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 0.95])

  const kernelY1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const kernelY2 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const kernelY3 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const kernelRotate1 = useTransform(scrollYProgress, [0, 1], [0, 180])
  const kernelRotate2 = useTransform(scrollYProgress, [0, 1], [0, -135])
  const kernelRotate3 = useTransform(scrollYProgress, [0, 1], [0, 225])

  const imageUrl = popcornImageUrl || '/images/popcorn.webp'

  return (
    <section ref={containerRef} className="min-h-[85vh] flex items-center px-4 md:px-8 lg:px-12 relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' }}
      />

      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <motion.div 
          className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px]"
          style={{ y: popcornY, rotate: popcornRotate, scale: popcornScale }}
        >
          <div className="relative w-full h-full flex items-center justify-center opacity-35">
            <Image
              src={imageUrl}
              alt="Popcorn"
              width={320}
              height={320}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <motion.div
            className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full opacity-40"
            style={{ 
              y: kernelY1, 
              rotate: kernelRotate1,
              backgroundColor: '#F5DEB3',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          />
          <motion.div
            className="absolute top-4 sm:top-6 -left-3 sm:-left-4 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 rounded-full opacity-40"
            style={{ 
              y: kernelY2, 
              rotate: kernelRotate2,
              backgroundColor: '#FFF8DC',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          />
          <motion.div
            className="absolute -bottom-1 right-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full opacity-40"
            style={{ 
              y: kernelY3, 
              rotate: kernelRotate3,
              backgroundColor: '#FFFACD',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          />
        </motion.div>
      </motion.div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="text-center md:text-left">
          <motion.p
            className="text-xs md:text-sm uppercase tracking-[0.4em] mb-4"
            style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Your Final Cut
          </motion.p>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 tracking-tight leading-[1.1]"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {hero.heading || "Your Movie"}
          </motion.h1>

          <motion.p
            className="text-base md:text-lg lg:text-xl font-light italic mb-4"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {hero.subHeading || "Ready for its Premiere, Bring Your Popcorn"}
          </motion.p>

          {hero.subSubHeading && (
            <motion.p
              className="max-w-xl leading-relaxed text-sm md:text-base mx-auto md:mx-0"
              style={{ color: 'var(--text-secondary)', opacity: 0.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {hero.subSubHeading}
            </motion.p>
          )}

          <motion.div 
            className="mt-8 flex flex-col items-center md:items-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span 
              className="text-xs uppercase tracking-[0.2em] font-light"
              style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={28} style={{ color: 'var(--text-secondary)', opacity: 0.4 }} />
            </motion.div>
          </motion.div>
        </div>

        {heroFeature && (
          <motion.div 
            className="hidden lg:flex lg:flex-col gap-2 md:gap-3 items-center lg:items-end justify-center lg:justify-start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <LaurelBadge 
              title={heroFeature.title}
              subtitle={heroFeature.subtitle}
              tag={heroFeature.tag}
              link={heroFeature.link}
              themeAware={true}
              index={0} 
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
