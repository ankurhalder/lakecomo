'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import LaurelBadge from '@/components/shared/LaurelBadge'

interface FeatureItem {
  title: string;
  subtitle?: string;
  tag?: string;
  link?: string;
}

interface ThemesHeroProps {
  hero?: {
    mainTitle?: string
    highlightTitle?: string
    secondaryTitle?: string
    description?: string
  }
  featuresGrid?: FeatureItem[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5
    }
  }
}

const defaultFeatures: FeatureItem[] = [
  {
    subtitle: "Dive into the World of Cinematic Creativity",
    title: "THEMED CINEMATIC PARTIES",
    tag: "Choose Your Theme",
    link: "/themes",
  },
  {
    subtitle: "Unlock Your Imagination",
    title: "VENUE SELECTION",
    tag: "2026",
    link: "/venues",
  },
  {
    subtitle: "Discover Your Dream Location",
    title: "GALLERY",
    tag: "2026",
    link: "/gallery",
  },
];

export default function ThemesHero({ hero = {}, featuresGrid = [] }: ThemesHeroProps) {
  const features = featuresGrid.length > 0 ? featuresGrid : defaultFeatures;
  
  return (
    <section className="min-h-[80vh] flex items-center px-4 md:px-8 lg:px-12 relative">
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' }}
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="text-center md:text-left">
          <motion.p
            className="text-xs md:text-sm uppercase tracking-[0.4em] mb-4"
            style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Choose Your Experience
          </motion.p>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 tracking-tight leading-[1.1]"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {hero.mainTitle || "2026 Themes"}
          </motion.h1>

          <motion.p
            className="text-base md:text-lg lg:text-xl font-light italic mb-6"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {hero.secondaryTitle || "Themes Designed to Make Every Guest a Star"}
          </motion.p>

          {hero.description && (
            <motion.p
              className="max-w-xl leading-relaxed text-sm md:text-base mx-auto md:mx-0"
              style={{ color: 'var(--text-secondary)', opacity: 0.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {hero.description}
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

        <motion.div 
          className="hidden lg:flex lg:flex-col gap-2 md:gap-3 items-center lg:items-end justify-center lg:justify-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((item, index) => (
            <LaurelBadge 
              key={item.title} 
              title={item.title}
              subtitle={item.subtitle}
              tag={item.tag}
              link={item.link}
              themeAware={true}
              index={index} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
