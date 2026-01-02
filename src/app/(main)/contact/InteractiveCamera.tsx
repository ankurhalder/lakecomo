'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTheme } from '@/components/providers/ThemeProvider'

interface InteractiveCameraProps {
  focusedField?: string | null
  isSubmitting?: boolean
  cameraImageUrl?: string | null
}

export default function InteractiveCamera({ focusedField, isSubmitting, cameraImageUrl }: InteractiveCameraProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme, mounted } = useTheme()
  const [imageIsDark, setImageIsDark] = useState<boolean | null>(null)
  
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

  useEffect(() => {
    const imageSrc = cameraImageUrl || '/assets/video-camera.png'
    const img = document.createElement('img')
    img.crossOrigin = 'anonymous'
    img.src = imageSrc
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      let totalBrightness = 0
      let pixelCount = 0
      
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3]
        if (alpha > 50) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114)
          totalBrightness += brightness
          pixelCount++
        }
      }
      
      if (pixelCount > 0) {
        const avgBrightness = totalBrightness / pixelCount
        setImageIsDark(avgBrightness < 128)
      }
    }
  }, [cameraImageUrl])

  const shouldInvert = mounted && imageIsDark !== null && (
    (imageIsDark && theme === 'dark') ||
    (!imageIsDark && theme === 'light')
  )

  return (
    <div className="flex items-center justify-center w-full">
      <div ref={containerRef} className="relative w-56 h-56 md:w-64 md:h-64" style={{ perspective: '1000px' }}>
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
              className="object-contain drop-shadow-2xl transition-all duration-300"
              style={{ filter: shouldInvert ? 'invert(1)' : 'none' }}
              priority
            />
          </div>
        </motion.div>

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
    </div>
  )
}
