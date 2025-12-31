'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import LaurelBadge from '@/components/shared/LaurelBadge'
import ProcessSteps from './ProcessSteps'
import type { ProcessPageData } from '@/sanity/lib/getProcessPage'

const DEFAULT_HERO = {
  heading: 'The Process',
  subHeading: 'From Concept to Cinema - Your Story Unfolds',
  details: 'Lake Como Style offers unique cinematic experiences where groups and couples can create their own movie trailers against the stunning backdrop of Lake Como.'
}

const DEFAULT_HERO_FEATURE = {
  title: 'THEMED CINEMATIC PARTIES',
  subtitle: 'Dive into the World of Cinematic Creativity',
  tag: '2026',
  link: '/contact'
}

interface ProcessContentProps {
  data: ProcessPageData
}

export default function ProcessContent({ data }: ProcessContentProps) {
  const hero = data.hero || DEFAULT_HERO
  const feature = data.heroFeature || DEFAULT_HERO_FEATURE
  const steps = data.processSteps || []

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section className="min-h-[calc(100dvh-60px)] flex flex-col px-4 md:px-8 lg:px-12 relative">
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' }}
        />
        
        <div className="relative z-10 flex-1 flex flex-col pt-20 md:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl mx-auto w-full">
            <motion.div 
              className="text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] mb-4 uppercase"
                style={{ 
                  background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {hero.heading}
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg uppercase tracking-[0.1em] font-medium mb-6"
                style={{ color: 'var(--text-secondary)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                {hero.subHeading}
              </motion.p>

              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.45 }}
              >
                <div className="h-px w-12 md:w-16" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }} />
                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-light" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                  Your Journey
                </span>
                <div className="h-px w-12 md:w-16" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }} />
              </motion.div>

              <motion.p
                className="text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-xl"
                style={{ color: 'var(--text-secondary)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {hero.details}
              </motion.p>
            </motion.div>

            <motion.div 
              className="hidden lg:flex justify-end items-start pt-8"
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

          <div className="flex-1" />

          <motion.div 
            className="flex flex-col items-center gap-1 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span 
              className="text-[10px] uppercase tracking-[0.2em] font-light"
              style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={24} style={{ color: 'var(--text-secondary)', opacity: 0.4 }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ProcessSteps steps={steps} />

      <section className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Ready to Create Your Movie?
          </h2>
          <p 
            className="text-base md:text-lg mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Start your cinematic journey with Lake Como Style.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded-full transition-colors"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            Start Your Journey
          </motion.a>
        </motion.div>
      </section>
    </div>
  )
}
