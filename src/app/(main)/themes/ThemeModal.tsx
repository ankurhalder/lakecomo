'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useCallback, useRef } from 'react'
import { Film, Sparkles, Heart, X } from 'lucide-react'
import FocusTrap from 'focus-trap-react'

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
}

const getIcon = (iconName?: string) => {
  if (!iconName) return <Film size={20} />
  const key = iconName.toLowerCase()
  return iconMap[key] || <Film size={20} />
}

interface ThemeModalProps {
  theme: Theme | null
  onClose: () => void
}

export default function ThemeModal({ theme, onClose }: ThemeModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!theme) return
    
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
      document.body.style.overflow = originalStyle.overflow
      document.body.style.paddingRight = originalStyle.paddingRight
      window.removeEventListener('keydown', handleEscape)
    }
  }, [theme, handleClose])

  return (
    <AnimatePresence>
      {theme && (
        <FocusTrap focusTrapOptions={{ initialFocus: () => closeButtonRef.current }}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
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
                ref={closeButtonRef}
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

                <h2 id="modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
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
        </FocusTrap>
      )}
    </AnimatePresence>
  )
}
