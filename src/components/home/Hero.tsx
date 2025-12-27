'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import FeaturesList from './FeaturesList'

export default function Hero({ data }: { data: any }) {
  const { preHeading, mainHeading, subHeading, ctaText, ctaLink, videoUrl } = data?.heroSection || {}
  const features = data?.featuresGrid || []
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedPref = localStorage.getItem('videoSound')
    if (savedPref === 'on') {
      setIsMuted(false)
    }
  }, [])

  useEffect(() => {
    if (mounted && videoRef.current) {
      videoRef.current.muted = isMuted
      localStorage.setItem('videoSound', isMuted ? 'off' : 'on')
    }
  }, [isMuted, mounted])

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
    setIsMuted(prev => !prev)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans">
      
      <div className="absolute inset-0 z-0">
        {videoUrl && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full pt-24 pb-24 px-6 md:px-12">
        
        <div className="flex flex-col justify-center items-start text-left pl-4 lg:pl-10 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/90 text-xl md:text-2xl italic font-light mb-6 tracking-wide font-serif"
          >
            {preHeading}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-8 drop-shadow-xl"
          >
            {mainHeading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/90 text-xl md:text-2xl font-light tracking-wide mb-12 italic"
          >
            {subHeading}
          </motion.p>

          <Link href={ctaLink || '/contact'}>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-white text-black text-base font-bold uppercase tracking-widest rounded-full hover:bg-gray-100 transition-all shadow-2xl shadow-white/20"
            >
              {ctaText}
            </motion.button>
          </Link>
        </div>

        <div className="hidden lg:flex justify-end items-center">
          <FeaturesList features={features} />
        </div>

      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        onClick={toggleSound}
        className="fixed bottom-28 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>
    </div>
  )
}
