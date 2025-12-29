'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

interface CastImage {
  url: string
  title?: string
  role?: string
}

interface CastCarouselProps {
  images: CastImage[]
}

export default function CastCarousel({ images }: CastCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  
  const totalImages = images.length
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages)
  }, [totalImages])
  
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages)
  }, [totalImages])

  useEffect(() => {
    if (!isAutoPlaying || isHovering) return
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, isHovering, nextSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    const normalizedDiff = ((diff + totalImages) % totalImages)
    const adjustedDiff = normalizedDiff > totalImages / 2 ? normalizedDiff - totalImages : normalizedDiff
    
    const rotateY = adjustedDiff * 35
    const translateZ = adjustedDiff === 0 ? 0 : -150
    const translateX = adjustedDiff * 240
    const scale = adjustedDiff === 0 ? 1 : 0.7
    const opacity = Math.abs(adjustedDiff) <= 1 ? (adjustedDiff === 0 ? 1 : 0.6) : 0
    const zIndex = 10 - Math.abs(adjustedDiff)
    
    return { rotateY, translateZ, translateX, scale, opacity, zIndex }
  }

  if (!images || images.length === 0) return null

  return (
    <div className="relative w-full flex flex-col items-center">
      <div 
        className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white'
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white'
          }}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </motion.button>

        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((image, index) => {
            const style = getCardStyle(index)
            const isCurrent = index === currentIndex
            const isVisible = Math.abs(style.zIndex - 10) <= 1
            
            if (!isVisible) return null
            
            return (
              <motion.div
                key={index}
                className="absolute w-[280px] sm:w-[360px] md:w-[450px] lg:w-[550px] aspect-video rounded-xl overflow-hidden shadow-2xl cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: style.zIndex
                }}
                animate={{
                  rotateY: style.rotateY,
                  x: style.translateX,
                  z: style.translateZ,
                  scale: style.scale,
                  opacity: style.opacity
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  opacity: { duration: 0 }
                }}
                onClick={() => {
                  if (!isCurrent) {
                    setCurrentIndex(index)
                  }
                }}
                onMouseEnter={() => isCurrent && setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Image
                  src={image.url}
                  alt={image.title || `Cast Member ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 450px, 550px"
                  priority={index === currentIndex}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {isCurrent && (image.title || image.role) && (
                  <motion.div 
                    className="absolute bottom-3 left-3 right-12 text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {image.title && (
                      <h3 className="text-base md:text-lg lg:text-xl font-bold text-white drop-shadow-lg">
                        {image.title}
                      </h3>
                    )}
                    {image.role && (
                      <p className="text-xs md:text-sm text-white/80 font-light">
                        {image.role}
                      </p>
                    )}
                  </motion.div>
                )}

                {isCurrent && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsAutoPlaying(!isAutoPlaying)
                    }}
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-opacity opacity-60 hover:opacity-100"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white'
                    }}
                    aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
                  >
                    {isAutoPlaying && !isHovering ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-6' : 'w-2'
            }`}
            style={{ 
              backgroundColor: index === currentIndex ? 'var(--accent)' : 'var(--text-secondary)',
              opacity: index === currentIndex ? 1 : 0.3
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
