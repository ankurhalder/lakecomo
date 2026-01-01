'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface GalleryImage {
  url: string
  alt?: string
  caption?: string
}

interface GalleryCarouselProps {
  images: GalleryImage[]
}

export default function GalleryCarousel({ images }: GalleryCarouselProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Horizontal scroll effect
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])

  if (!images || images.length === 0) return null

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
          {images.map((img, i) => (
            <div 
              key={i} 
              className="relative h-[60vh] md:h-[70vh] aspect-[2/3] md:aspect-[3/4] flex-shrink-0 group overflow-hidden rounded-lg shadow-2xl"
            >
              <Image
                src={img.url}
                alt={img.alt || `Gallery Image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white font-courier text-lg tracking-wide border-l-2 border-white pl-3">
                    {img.caption}
                  </p>
                </div>
              )}
              <div className="absolute top-4 left-4 text-white/20 font-limelight text-6xl pointer-events-none z-10">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute bottom-12 left-12 text-white/50 text-sm font-courier animate-pulse">
        SCROLL TO EXPLORE →
      </div>
    </section>
  )
}
