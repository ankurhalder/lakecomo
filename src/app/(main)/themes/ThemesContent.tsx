'use client'

import { motion, useScroll, useTransform, AnimatePresence, useSpring, type MotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useEffect, useCallback } from 'react'
import { 
  Film, Sparkles, Heart, Star, Crown, 
  Glasses, Drama, Clapperboard, Camera, 
  PartyPopper, Wand2, Theater, X, ChevronDown
} from 'lucide-react'
import { useLenis } from '@/components/providers/SmoothScroll'

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

const iconMap: Record<string, React.ReactNode> = {
  film: <Film size={20} />,
  sparkles: <Sparkles size={20} />,
  heart: <Heart size={20} />,
  star: <Star size={20} />,
  crown: <Crown size={20} />,
  glasses: <Glasses size={20} />,
  drama: <Drama size={20} />,
  clapperboard: <Clapperboard size={20} />,
  camera: <Camera size={20} />,
  party: <PartyPopper size={20} />,
  wand: <Wand2 size={20} />,
  theater: <Theater size={20} />,
}

const getIcon = (iconName?: string) => {
  if (!iconName) return <Film size={20} />
  const key = iconName.toLowerCase()
  return iconMap[key] || <Film size={20} />
}

function ThemeModal({ theme, onClose }: { theme: Theme; onClose: () => void }) {
  const { stop: stopLenis, start: startLenis } = useLenis()
  
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    stopLenis()
    
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight
    }
    
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleEscape)
    
    return () => {
      startLenis()
      document.body.style.overflow = originalStyle.overflow
      document.body.style.paddingRight = originalStyle.paddingRight
      window.removeEventListener('keydown', handleEscape)
    }
  }, [handleClose, stopLenis, startLenis])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleClose}
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div
        className="relative w-full max-w-xl max-h-[75vh] sm:max-h-[70vh] overflow-y-auto overflow-x-hidden rounded-xl sm:rounded-2xl border shadow-2xl"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'color-mix(in srgb, var(--text-primary) 10%, transparent)',
          overscrollBehavior: 'contain'
        }}
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-black/10"
          style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {theme.imageUrl && (
          <div className="relative w-full aspect-[16/9] sm:aspect-video">
            <Image
              src={theme.imageUrl}
              alt={theme.title}
              fill
              className="object-cover object-top"
            />
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, var(--bg-secondary) 5%, transparent 60%)' }}
            />
          </div>
        )}

        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--overlay)', color: 'var(--text-primary)' }}
            >
              {getIcon(theme.icon)}
            </div>
            <span style={{ color: 'var(--text-secondary)' }} className="text-xs sm:text-sm uppercase tracking-wider">
              {theme.genre}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {theme.title}
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Sparkles size={12} />Vibe
              </p>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>{theme.vibe}</p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Film size={12} />Story
              </p>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>{theme.story}</p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Heart size={12} />Feel
              </p>
              <p className="text-sm sm:text-base leading-relaxed italic" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>{theme.feel}</p>
            </div>
          </div>

          <Link href={theme.ctaLink || '/contact'} className="block pt-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-widest rounded-full transition-all"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              {theme.ctaText || 'Book This Theme'}
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

function AnimatedSVGTrail({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const springProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25, restDelta: 0.001 })
  
  const y = useTransform(springProgress, [0, 1], ["0%", "100%"])
  
  const x = useTransform(
    springProgress,
    [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
    ["0px", "25px", "-20px", "15px", "-25px", "10px", "0px"]
  )

  const iconOpacity = useTransform(springProgress, [0, 0.02, 0.98, 1], [0, 0.9, 0.9, 0])
  const progressHeight = useTransform(springProgress, [0, 1], ["0%", "100%"])
  const glowScale = useTransform(springProgress, [0, 0.5, 1], [1, 1.1, 1])

  return (
    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[120px] pointer-events-none z-20">
      <div 
        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{ 
          background: 'linear-gradient(to bottom, transparent 5%, var(--text-secondary) 15%, var(--text-secondary) 85%, transparent 95%)',
          opacity: 0.08
        }}
      />
      
      <motion.div 
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 rounded-full"
        style={{ 
          height: progressHeight,
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          opacity: 0.15
        }}
      />
      
      {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            top: `${pos * 100}%`,
            backgroundColor: 'var(--accent)',
            opacity: useTransform(springProgress, 
              [pos - 0.1, pos, pos + 0.1], 
              [0, 0.4, 0]
            ),
            scale: useTransform(springProgress,
              [pos - 0.1, pos, pos + 0.1],
              [0.5, 1, 0.5]
            )
          }}
        />
      ))}
      
      <motion.div
        style={{ top: y, x, opacity: iconOpacity }}
        className="absolute left-1/2 -translate-x-1/2 -mt-4"
      >
        <motion.div 
          className="relative w-8 h-8 flex items-center justify-center"
          style={{ scale: glowScale }}
        >
          <motion.div 
            className="absolute inset-[-4px] rounded-full"
            style={{ 
              backgroundColor: 'var(--accent)', 
              opacity: 0.1 
            }}
          />
          <motion.div 
            className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center border"
            style={{ 
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'color-mix(in srgb, var(--accent) 50%, transparent)',
              color: 'var(--accent)'
            }}
          >
            <Sparkles size={14} />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute top-full left-1/2 -translate-x-1/2 w-px h-12 rounded-full"
          style={{ 
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            opacity: 0.2
          }}
        />
      </motion.div>
    </div>
  )
}

function ThemeCard({ theme, index, onReadMore }: { theme: Theme; index: number; onReadMore: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const skewY = useTransform(scrollYProgress, [0, 0.4, 0.6], [4, 0, -1])
  const y = useTransform(scrollYProgress, [0, 0.5], [120, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      id={`theme-${index}`}
      style={{ skewY, y, opacity, scale }}
      className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-32 items-center py-16 lg:py-24 px-4 lg:px-12`}
    >
      <div className="relative w-full lg:w-[45%] aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
        {theme.imageUrl ? (
          <Image
            src={theme.imageUrl}
            alt={theme.title}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-top"
            priority={index < 2}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))' }}
          >
            <span className="text-8xl opacity-30">🎬</span>
          </div>
        )}
        
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent 50%)' }}
        />
        
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full border flex items-center justify-center"
            style={{ 
              backgroundColor: 'var(--overlay)', 
              borderColor: 'var(--text-secondary)',
              color: 'var(--text-primary)'
            }}
          >
            {getIcon(theme.icon)}
          </div>
          <span 
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: 'var(--text-secondary)' }}
          >
            {theme.genre}
          </span>
        </div>
      </div>

      <div className={`w-full lg:w-[45%] space-y-4`}>
        <div>
          <span 
            className="text-xs uppercase tracking-[0.3em] font-light"
            style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
          >
            Theme {String(index + 1).padStart(2, '0')}
          </span>
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mt-1 tracking-tight leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {theme.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div 
            className="rounded-xl p-3 border transition-colors"
            style={{ 
              backgroundColor: 'var(--overlay)',
              borderColor: 'color-mix(in srgb, var(--text-primary) 10%, transparent)'
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={12} style={{ color: 'var(--text-secondary)' }} />
              <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Vibe</p>
            </div>
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>{theme.vibe}</p>
          </div>

          <div 
            className="rounded-xl p-3 border transition-colors"
            style={{ 
              backgroundColor: 'var(--overlay)',
              borderColor: 'color-mix(in srgb, var(--text-primary) 10%, transparent)'
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Film size={12} style={{ color: 'var(--text-secondary)' }} />
              <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Story</p>
            </div>
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>{theme.story}</p>
          </div>

          <div 
            className="rounded-xl p-3 border transition-colors"
            style={{ 
              backgroundColor: 'var(--overlay)',
              borderColor: 'color-mix(in srgb, var(--text-primary) 10%, transparent)'
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Heart size={12} style={{ color: 'var(--text-secondary)' }} />
              <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Feel</p>
            </div>
            <p className="text-xs leading-relaxed line-clamp-2 italic" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>{theme.feel}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={onReadMore}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all"
            style={{ 
              borderColor: 'var(--text-secondary)',
              color: 'var(--text-primary)',
              backgroundColor: 'transparent'
            }}
          >
            Read More
          </button>
          
          <Link href={theme.ctaLink || '/contact'}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              {theme.ctaText || 'Book This Theme'}
              <span>→</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function ThemesContent({ data }: { data: ThemesData }) {
  const hero = data?.hero || {}
  const themes = data?.themesList || []
  const containerRef = useRef<HTMLDivElement>(null)
  const themesRef = useRef<HTMLDivElement>(null)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)


  const { scrollYProgress } = useScroll({
    target: themesRef,
    offset: ["start center", "end center"]
  })

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
    <>
      <div ref={containerRef} className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 z-50 origin-left lg:hidden" 
          style={{ scaleX: scrollYProgress, backgroundColor: 'var(--accent)' }} 
        />
        
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

        <section ref={themesRef} className="relative px-4 md:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
          <AnimatedSVGTrail scrollYProgress={scrollYProgress} />
          
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
              Don't see what you're looking for? We can design a completely custom theme tailored to your vision.
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

      <AnimatePresence>
        {selectedTheme && (
          <ThemeModal theme={selectedTheme} onClose={() => setSelectedTheme(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
