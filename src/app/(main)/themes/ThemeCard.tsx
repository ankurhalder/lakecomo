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

interface ThemeCardProps {
  theme: Theme
  index: number
  onReadMore: () => void
}

export default function ThemeCard({ theme, index, onReadMore }: ThemeCardProps) {
  const isEven = index % 2 === 0
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const skewY = useTransform(scrollYProgress, [0, 0.4, 0.6], isEven ? [5, 0, -5] : [-5, 0, 5])
  const y = useTransform(scrollYProgress, [0, 0.5], [120, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

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
