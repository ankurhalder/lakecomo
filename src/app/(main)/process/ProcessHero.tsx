'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import LaurelBadge from '@/components/shared/LaurelBadge'

interface ProcessHeroProps {
  hero: {
    heading?: string
    subHeading?: string
    description?: string
  }
  heroFeature?: {
    subtitle?: string
    title: string
    tag?: string
    link?: string
  }
}

const DEFAULT_HERO = {
  heading: 'The Process',
  subHeading: 'From Concept to Cinema - Your Story Unfolds',
}

const DEFAULT_FEATURE = {
  subtitle: 'Dive into the World of Cinematic Creativity',
  title: 'THEMED CINEMATIC PARTIES',
  tag: 'Choose Your Theme',
  link: '/themes',
}

export default function ProcessHero({ hero, heroFeature }: ProcessHeroProps) {
  const feature = heroFeature || DEFAULT_FEATURE
  
  return (
    <section className="min-h-[85vh] flex items-center px-4 md:px-8 lg:px-12 relative">
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' }}
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="text-center lg:text-left">
          <motion.p
            className="text-xs md:text-sm uppercase tracking-[0.4em] mb-4"
            style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            How It Works
          </motion.p>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 tracking-tight leading-[1.1]"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {hero?.heading || DEFAULT_HERO.heading}
          </motion.h1>

          <motion.p
            className="text-base md:text-lg lg:text-xl font-light italic mb-6"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {hero?.subHeading || DEFAULT_HERO.subHeading}
          </motion.p>

          {hero?.description && (
            <motion.p
              className="max-w-xl leading-relaxed text-sm md:text-base mx-auto lg:mx-0"
              style={{ color: 'var(--text-secondary)', opacity: 0.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {hero.description}
            </motion.p>
          )}

          <motion.div 
            className="mt-8 flex flex-col items-center lg:items-start gap-2"
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
            themeAware={true}
            index={0}
          />
        </motion.div>
      </div>
    </section>
  )
}
