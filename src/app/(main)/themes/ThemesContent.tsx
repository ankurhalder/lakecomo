'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Wand2 } from 'lucide-react'
import ThemesHero from './ThemesHero'
import ThemeCard from './ThemeCard'
import ThemeModal from './ThemeModal'

interface Theme {
  title: string
  genre: string
  icon?: string
  imageUrl?: string
  vibe: string
  story: string
  feel: string
  ctaText?: string
  ctaLink?: string
}

interface ThemesData {
  title?: string
  hero?: {
    mainTitle?: string
    highlightTitle?: string
    secondaryTitle?: string
    description?: string
  }
  themesList?: Theme[]
}

const defaultThemes: Theme[] = [
  {
    title: "007 Agents of Style",
    genre: "Spy / Action Theme",
    icon: "glasses",
    vibe: "Sleek, stylish, high-stakes, espionage.",
    story: "Guests step into the world of secret agents, daring missions, and intrigue. Think tuxedos, glamorous dresses, and action-packed poses.",
    feel: "Sophisticated, adventurous, playful suspense."
  },
  {
    title: "The Hollywood Hussle",
    genre: "Old Hollywood / Glamour Theme",
    icon: "star",
    vibe: "Classic 1940s–1960s Tinseltown glamour.",
    story: "Guests become stars of a vintage cinematic caper, full of red carpets, flashing cameras, and silver-screen drama.",
    feel: "Elegant, nostalgic, cinematic, stylish drama."
  },
  {
    title: "La Dolce Vita",
    genre: "Italian / Romantic Glamour Theme",
    icon: "heart",
    vibe: "Stylish, fun, romantic, sun-soaked Italian adventure.",
    story: "Guests star in a story of romance, intrigue, and playful elegance in the heart of 1960s Rome.",
    feel: "Romantic, stylish, lively, playful charm."
  }
]

export default function ThemesContent({ data }: { data: ThemesData }) {
  const hero = data?.hero || {}
  const themes = data?.themesList || []
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)

  const displayThemes = themes.length > 0 ? themes : defaultThemes

  return (
    <>
      <div ref={containerRef} className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <ThemesHero hero={hero} />

        <section className="relative px-4 md:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
          {displayThemes.map((theme, index) => (
            <ThemeCard 
              key={theme.title} 
              theme={theme} 
              index={index}
              onReadMore={() => setSelectedTheme(theme)}
            />
          ))}
        </section>

        <section className="relative py-24 px-4">
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, var(--bg-primary), var(--bg-secondary), transparent)' }}
          />
          
          <motion.div 
            className="relative z-10 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Wand2 className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
            
            <h2 
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Create Your Own Theme
            </h2>
            
            <p 
              className="text-sm md:text-base mb-8 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Don&apos;t see what you&apos;re looking for? We can design a completely custom theme tailored to your vision.
            </p>
            
            <Link href="/contact">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full transition-all"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                Start Your Custom Theme
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </div>

      <ThemeModal theme={selectedTheme} onClose={() => setSelectedTheme(null)} />
    </>
  )
}
