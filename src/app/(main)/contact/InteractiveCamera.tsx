'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'

interface InteractiveCameraProps {
  focusedField?: string | null
  isSubmitting?: boolean
  cameraImageUrl?: string | null
}

export default function InteractiveCamera({ cameraImageUrl }: InteractiveCameraProps) {
  const { theme, mounted } = useTheme()
  const [imageIsDark, setImageIsDark] = useState<boolean | null>(null)

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
      <div className="relative w-56 h-56 md:w-64 md:h-64">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <Image
            src={cameraImageUrl || '/assets/video-camera.png'}
            alt="Camera"
            width={200}
            height={200}
            className="object-contain drop-shadow-2xl"
            style={{ filter: shouldInvert ? 'invert(1)' : 'none' }}
            priority
          />
        </div>
      </div>
    </div>
  )
}
