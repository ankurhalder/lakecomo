'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'
import GalleryLightbox from './GalleryLightbox'

interface GalleryImage {
  imageUrl: string
  alt: string
  caption?: string
  category?: string
}

interface ParallaxGalleryProps {
  images: GalleryImage[]
}

export default function GalleryParallax({ images }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsMounted(true)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  if (!images || images.length === 0) {
    return (
      <div className="py-24 text-center">
        <p style={{ color: 'var(--text-secondary)' }}>
          No gallery images yet. Add them in Sanity Studio.
        </p>
      </div>
    )
  }

  const columns = [[], [], []] as GalleryImage[][]
  images.forEach((img, idx) => {
    columns[idx % 3].push(img)
  })

  const columnSpeeds = [0.5, -0.35, 0.6]

  return (
    <>
      <section ref={containerRef} className="relative py-24 pb-28 md:pb-24 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Explore the Gallery
            </motion.h2>
            <motion.p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Click any image to view fullscreen
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {columns.map((columnImages, colIdx) => (
              <ParallaxColumn 
                key={colIdx}
                images={columnImages}
                speed={columnSpeeds[colIdx]}
                columnIndex={colIdx}
                isMounted={isMounted}
                onImageClick={(imgIdx) => {
                  const globalIndex = images.findIndex(
                    (img) => img.imageUrl === columnImages[imgIdx].imageUrl
                  )
                  openLightbox(globalIndex !== -1 ? globalIndex : 0)
                }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <GalleryLightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={prevImage}
      />
    </>
  )
}

interface ParallaxColumnProps {
  images: GalleryImage[]
  speed: number
  columnIndex: number
  isMounted: boolean
  onImageClick: (index: number) => void
}

function ParallaxColumn({ images, speed, columnIndex, isMounted, onImageClick }: ParallaxColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: isMounted ? columnRef : undefined,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [200 * speed, -200 * speed])

  return (
    <motion.div 
      ref={columnRef}
      className="flex flex-col gap-4 md:gap-6"
      style={{ y: isMounted ? y : 0 }}
    >
      {images.map((image, imgIdx) => (
        <GalleryCard 
          key={imgIdx} 
          image={image} 
          index={columnIndex * 10 + imgIdx}
          onClick={() => onImageClick(imgIdx)}
        />
      ))}
    </motion.div>
  )
}

interface GalleryCardProps {
  image: GalleryImage
  index: number
  onClick: () => void
}

function GalleryCard({ image, index, onClick }: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: (index % 5) * 0.05,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Image
        src={image.imageUrl}
        alt={image.alt || `Gallery image ${index + 1}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <motion.div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          opacity: isHovered ? 1 : 0
        }}
      />

      {image.caption && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <p className="text-white text-sm font-medium drop-shadow-lg">
            {image.caption}
          </p>
        </motion.div>
      )}

      <motion.div
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-300"
        style={{ 
          backgroundColor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          opacity: isHovered ? 1 : 0
        }}
      >
        <span className="text-white text-xs font-bold">{index + 1}</span>
      </motion.div>
    </motion.div>
  )
}
