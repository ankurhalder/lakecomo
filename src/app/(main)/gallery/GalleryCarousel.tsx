'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X } from 'lucide-react'
import { useLenis } from '@/components/providers/SmoothScroll'
import FocusTrap from 'focus-trap-react'

interface GalleryImage {
  imageUrl: string
  alt: string
  caption?: string
  category?: string
}

interface GalleryCarouselProps {
  images: GalleryImage[]
}

export default function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [direction, setDirection] = useState(0)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const { stop: stopLenis, start: startLenis } = useLenis()

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true)
    stopLenis()
    document.body.style.overflow = 'hidden'
  }, [stopLenis])

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false)
    startLenis()
    document.body.style.overflow = ''
  }, [startLenis])

  useEffect(() => {
    if (isPlaying) {
      autoplayRef.current = setInterval(goNext, 4000)
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isPlaying, goNext])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'Escape' && isFullscreen) closeFullscreen()
      else if (e.key === ' ') {
        e.preventDefault()
        togglePlay()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev, isFullscreen, closeFullscreen, togglePlay])

  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumb = thumbnailsRef.current.children[currentIndex] as HTMLElement
      if (thumb) {
        thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [currentIndex])

  if (!images || images.length === 0) {
    return (
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ color: 'var(--text-secondary)' }}>
            No images available yet. Add images via Sanity Studio.
          </p>
        </div>
      </section>
    )
  }

  const currentImage = images[currentIndex]

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 })
  }

  return (
    <>
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImage.imageUrl}
                  alt={currentImage.alt || `Gallery image ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                />
                <div 
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 30%)' }}
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={goPrev}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goNext}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-4 md:left-6 z-10">
              {currentImage.caption && (
                <p className="text-white text-sm md:text-base font-medium drop-shadow-lg">
                  {currentImage.caption}
                </p>
              )}
              {currentImage.category && (
                <span className="text-white/70 text-xs uppercase tracking-wider">
                  {currentImage.category}
                </span>
              )}
            </div>

            <div className="absolute bottom-4 right-4 md:right-6 flex items-center gap-2 z-10">
              <span className="text-white/80 text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </span>
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={openFullscreen}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
                aria-label="Fullscreen"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'w-6' : ''}`}
                style={{ 
                  backgroundColor: idx === currentIndex ? 'var(--accent)' : 'var(--text-secondary)',
                  opacity: idx === currentIndex ? 1 : 0.3
                }}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          <div 
            ref={thumbnailsRef}
            className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`relative flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-lg overflow-hidden transition-all ${idx === currentIndex ? 'ring-2 ring-[var(--accent)]' : 'opacity-50 hover:opacity-80'}`}
              >
                <Image
                  src={img.imageUrl}
                  alt={img.alt || `Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isFullscreen && (
          <FocusTrap>
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={closeFullscreen}
                className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                aria-label="Close fullscreen"
              >
                <X size={24} />
              </button>

              <button
                onClick={goPrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={goNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all hover:scale-110"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
              >
                <ChevronRight size={28} />
              </button>

              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="relative w-[90vw] h-[80vh] max-w-6xl"
                >
                  <Image
                    src={currentImage.imageUrl}
                    alt={currentImage.alt || `Gallery image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <span className="text-white text-sm">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </>
  )
}
