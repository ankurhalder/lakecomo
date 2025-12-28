'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { 
  Film, Sparkles, Heart, Star, Crown, 
  Glasses, Drama, Clapperboard, Camera, 
  PartyPopper, Wand2, Theater
} from 'lucide-react'

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
    backgroundImageUrl?: string
  }
  themesList?: Theme[]
}

const iconMap: Record<string, React.ReactNode> = {
  film: <Film size={24} />,
  sparkles: <Sparkles size={24} />,
  heart: <Heart size={24} />,
  star: <Star size={24} />,
  crown: <Crown size={24} />,
  glasses: <Glasses size={24} />,
  drama: <Drama size={24} />,
  clapperboard: <Clapperboard size={24} />,
  camera: <Camera size={24} />,
  party: <PartyPopper size={24} />,
  wand: <Wand2 size={24} />,
  theater: <Theater size={24} />,
}

const getIcon = (iconName?: string) => {
  if (!iconName) return <Film size={24} />
  const key = iconName.toLowerCase()
  return iconMap[key] || <Film size={24} />
}

function ThemeCard({ theme, index }: { theme: Theme; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const skewY = useTransform(scrollYProgress, [0, 0.5], [3, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [80, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        skewY, 
        y, 
        opacity,
        scale,
      }}
      className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center py-16 lg:py-24`}
    >
      <motion.div 
        className="relative w-full lg:w-1/2 aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden group shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring" as const, stiffness: 300 }}
      >
        {theme.imageUrl ? (
          <Image
            src={theme.imageUrl}
            alt={theme.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            priority={index < 2}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))' }}
          >
            <motion.span 
              className="text-8xl opacity-30"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              🎬
            </motion.span>
          </div>
        )}
        
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent 50%)' }}
        />
        
        <motion.div
          className="absolute bottom-6 left-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div 
            className="w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center"
            style={{ 
              backgroundColor: 'var(--overlay)', 
              borderColor: 'var(--text-secondary)',
              color: 'var(--text-primary)'
            }}
          >
            {getIcon(theme.icon)}
          </div>
          <span 
            className="text-sm font-medium uppercase tracking-wider"
            style={{ color: 'var(--text-secondary)' }}
          >
            {theme.genre}
          </span>
        </motion.div>
      </motion.div>

      <div className={`w-full lg:w-1/2 space-y-6 ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span 
            className="text-sm uppercase tracking-[0.3em] font-light"
            style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
          >
            Theme {String(index + 1).padStart(2, '0')}
          </span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 tracking-tight leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {theme.title}
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div 
            className="backdrop-blur-sm rounded-xl p-4 border transition-colors"
            style={{ 
              backgroundColor: 'var(--overlay)',
              borderColor: 'color-mix(in srgb, var(--text-primary) 10%, transparent)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} style={{ color: 'var(--text-secondary)' }} />
              <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Vibe</p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>{theme.vibe}</p>
          </div>

          <div 
            className="backdrop-blur-sm rounded-xl p-4 border transition-colors"
            style={{ 
              backgroundColor: 'var(--overlay)',
              borderColor: 'color-mix(in srgb, var(--text-primary) 10%, transparent)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Film size={14} style={{ color: 'var(--text-secondary)' }} />
              <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Story</p>
            </div>
            <p className="text-sm leading-relaxed line-clamp-4" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>{theme.story}</p>
          </div>

          <div 
            className="backdrop-blur-sm rounded-xl p-4 border transition-colors"
            style={{ 
              backgroundColor: 'var(--overlay)',
              borderColor: 'color-mix(in srgb, var(--text-primary) 10%, transparent)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Heart size={14} style={{ color: 'var(--text-secondary)' }} />
              <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Feel</p>
            </div>
            <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>{theme.feel}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href={theme.ctaLink || '/contact'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-8 py-4 font-bold uppercase tracking-widest rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ 
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-primary)',
              }}
            >
              <span>{theme.ctaText || 'Book This Theme'}</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ThemesContent({ data }: { data: ThemesData }) {
  const hero = data?.hero || {}
  const themes = data?.themesList || []
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])

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

  const displayThemes = themes.length > 0 ? themes : defaultThemes

  return (
    <div ref={containerRef} className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {hero.backgroundImageUrl && (
          <div className="absolute inset-0">
            <Image
              src={hero.backgroundImageUrl}
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.6 }} />
          </div>
        )}
        
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: `linear-gradient(to bottom, var(--bg-primary), transparent 30%, transparent 70%, var(--bg-primary))` 
          }}
        />
        
        <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-sm md:text-base uppercase tracking-[0.4em] mb-6"
              style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Choose Your Experience
            </motion.p>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 tracking-tight leading-[0.9]"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" as const }}
            >
              {hero.mainTitle || "2026 Themes"}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl font-light italic mb-6"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {hero.secondaryTitle || "Themes Designed to Make Every Guest a Star"}
            </motion.p>

            {hero.description && (
              <motion.p
                className="max-w-3xl mx-auto leading-relaxed text-lg"
                style={{ color: 'var(--text-secondary)', opacity: 0.7 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {hero.description}
              </motion.p>
            )}
          </motion.div>

          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-6 h-10 border-2 rounded-full mx-auto flex justify-center"
              style={{ borderColor: 'var(--text-secondary)', opacity: 0.3 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <motion.div 
                className="w-1.5 h-3 rounded-full mt-2"
                style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.5 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
            <p 
              className="text-xs uppercase tracking-widest mt-4"
              style={{ color: 'var(--text-secondary)', opacity: 0.4 }}
            >
              Scroll to explore
            </p>
          </motion.div>
        </div>
      </motion.section>

      <section className="relative px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div 
          className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
          style={{ 
            background: `linear-gradient(to bottom, transparent, var(--text-secondary), transparent)`,
            opacity: 0.1
          }}
        />
        
        {displayThemes.map((theme, index) => (
          <ThemeCard key={theme.title} theme={theme} index={index} />
        ))}
      </section>

      <section className="relative py-32 px-4">
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to top, var(--bg-primary), var(--bg-secondary), transparent)` 
          }}
        />
        
        <motion.div 
          className="relative z-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Wand2 className="w-12 h-12 mx-auto mb-6" style={{ color: 'var(--text-secondary)', opacity: 0.4 }} />
          
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Create Your Own Theme
          </h2>
          
          <p 
            className="text-lg mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Don't see what you're looking for? We can design a completely custom theme 
            tailored to your vision, from concept to costume.
          </p>
          
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 text-lg font-bold uppercase tracking-widest rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ 
                backgroundColor: 'var(--accent)',
                color: 'var(--bg-primary)',
              }}
            >
              Start Your Custom Theme
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
