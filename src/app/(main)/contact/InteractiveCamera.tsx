'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface InteractiveCameraProps {
  focusedField?: string | null
  isSubmitting?: boolean
  cameraImageUrl?: string | null
}

export default function InteractiveCamera({ focusedField, isSubmitting, cameraImageUrl }: InteractiveCameraProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 120 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothMouseY, [-200, 200], [15, -15])
  const rotateY = useTransform(smoothMouseX, [-200, 200], [-20, 20])
  const rotateZ = useTransform(smoothMouseX, [-200, 200], [-5, 5])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])


  return (
    <div ref={containerRef} className="relative w-56 h-56 md:w-64 md:h-64 mx-auto" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: 'preserve-3d'
        }}
      >
          <div className="relative w-full h-full flex items-center justify-center p-4">
             <Image
              src={cameraImageUrl || '/assets/video-camera.png'}
              alt="Camera"
              width={200}
              height={200}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>      </motion.div>

      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-light whitespace-nowrap"
        style={{ color: 'var(--text-secondary)' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: focusedField ? 0.8 : 0.5,
          y: focusedField ? -4 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        {isSubmitting ? "🎬 Rolling..." : focusedField ? "🎥 Recording..." : "📹 Ready to film"}
      </motion.div>
    </div>
  )
}
