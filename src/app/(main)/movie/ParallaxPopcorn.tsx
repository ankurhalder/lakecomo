'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface PopcornSectionProps {
  imageUrl?: string
  heading?: string
  description?: string
  ctaText?: string
  ctaLink?: string
}

interface ParallaxPopcornProps {
  popcornSection?: PopcornSectionProps
}

const DEFAULT_POPCORN = {
  imageUrl: '/images/popcorn.webp',
  heading: 'Grab Your Popcorn',
  description: "Your movie premiere awaits. In just a few weeks, you'll have a professionally edited cinematic trailer featuring you and your guests as the stars. Perfect for sharing, rewatching, and reliving the magic.",
  ctaText: 'Book Your Premiere',
  ctaLink: '/contact',
}

export default function ParallaxPopcorn({ popcornSection }: ParallaxPopcornProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const kernelY1 = useTransform(scrollYProgress, [0, 1], [50, -150])
  const kernelY2 = useTransform(scrollYProgress, [0, 1], [80, -120])
  const kernelY3 = useTransform(scrollYProgress, [0, 1], [30, -180])
  const kernelRotate1 = useTransform(scrollYProgress, [0, 1], [0, 360])
  const kernelRotate2 = useTransform(scrollYProgress, [0, 1], [0, -270])
  const kernelRotate3 = useTransform(scrollYProgress, [0, 1], [0, 450])

  const imageUrl = popcornSection?.imageUrl || DEFAULT_POPCORN.imageUrl
  const heading = popcornSection?.heading || DEFAULT_POPCORN.heading
  const description = popcornSection?.description || DEFAULT_POPCORN.description
  const ctaText = popcornSection?.ctaText || DEFAULT_POPCORN.ctaText
  const ctaLink = popcornSection?.ctaLink || DEFAULT_POPCORN.ctaLink

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        <motion.div 
          className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px]"
          style={{ y, rotate, scale, opacity }}
        >
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, var(--accent), transparent)' }}
          />
          
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={imageUrl}
              alt="Popcorn"
              width={320}
              height={320}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <motion.div
            className="absolute -top-4 -right-4 w-6 h-6 md:w-8 md:h-8 rounded-full"
            style={{ 
              y: kernelY1, 
              rotate: kernelRotate1,
              backgroundColor: '#F5DEB3',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          />
          <motion.div
            className="absolute top-8 -left-6 w-5 h-5 md:w-7 md:h-7 rounded-full"
            style={{ 
              y: kernelY2, 
              rotate: kernelRotate2,
              backgroundColor: '#FFF8DC',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          />
          <motion.div
            className="absolute -bottom-2 right-4 w-4 h-4 md:w-6 md:h-6 rounded-full"
            style={{ 
              y: kernelY3, 
              rotate: kernelRotate3,
              backgroundColor: '#FFFACD',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}
          />
        </motion.div>

        <motion.div 
          className="text-center lg:text-left max-w-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {heading}
          </h2>
          <p 
            className="text-sm md:text-base leading-relaxed mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            {description}
          </p>
          <motion.a
            href={ctaLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full transition-colors"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            {ctaText}
          </motion.a>
        </motion.div>
      </div>

      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, var(--accent) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, var(--accent) 0%, transparent 50%)`
        }}
      />
    </section>
  )
}
