'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface ThemesHeroProps {
  hero?: {
    mainTitle?: string
    highlightTitle?: string
    secondaryTitle?: string
    description?: string
  }
}

export default function ThemesHero({ hero = {} }: ThemesHeroProps) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' }}
      />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto pt-24 pb-16">
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1]"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {hero.mainTitle || "2026 Themes"}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl font-light italic mb-4"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {hero.secondaryTitle || "Themes Designed to Make Every Guest a Star"}
        </motion.p>

        {hero.description && (
          <motion.p
            className="max-w-2xl mx-auto leading-relaxed text-sm md:text-base"
            style={{ color: 'var(--text-secondary)', opacity: 0.8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {hero.description}
          </motion.p>
        )}

        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={32} style={{ color: 'var(--text-secondary)', opacity: 0.4 }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
