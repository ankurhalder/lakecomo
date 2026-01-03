'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import FeaturesList from './FeaturesList'

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut" as const
    }
  })
}

const buttonVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 1.2,
      ease: "easeOut" as const
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.3)",
    transition: { type: "spring" as const, stiffness: 400 }
  },
  tap: { scale: 0.95 }
}

interface FeatureItem {
  title: string;
  subtitle?: string;
  tag?: string;
  link?: string;
  iconUrl?: string;
}

interface HeroData {
  heroSection?: {
    preHeading?: string;
    mainHeading?: string;
    subHeading?: string;
    ctaText?: string;
    ctaLink?: string;
    videoUrl?: string;
    mobileVideoUrl?: string;
    posterImage?: string;
  };
  featuresGrid?: FeatureItem[];
}

export default function Hero({ data }: { data: HeroData }) {
  const { preHeading, mainHeading, subHeading, ctaText, ctaLink, videoUrl, mobileVideoUrl } = data?.heroSection || {}
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  const features = data?.featuresGrid || []
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const hasPlayedRef = useRef(false)
  const interactionListenerAddedRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let rafId: number
    let lastAttempt = 0

    const forcePlay = async () => {
      if (hasPlayedRef.current) return true
      try {
        video.muted = true
        await video.play()
        hasPlayedRef.current = true
        return true
      } catch {
        return false
      }
    }

    const throttledPlay = (timestamp: number) => {
      if (hasPlayedRef.current) return
      if (timestamp - lastAttempt > 250) {
        lastAttempt = timestamp
        forcePlay()
      }
      rafId = requestAnimationFrame(throttledPlay)
    }

    const handleInteraction = () => {
      if (!hasPlayedRef.current) {
        forcePlay()
      }
    }

    const addInteractionListeners = () => {
      if (interactionListenerAddedRef.current) return
      interactionListenerAddedRef.current = true
      
      const docEvents = ['touchstart', 'touchend', 'touchmove', 'click', 'mousedown', 'mouseup', 'mousemove', 
        'scroll', 'wheel', 'keydown', 'keyup', 'pointerdown', 'pointerup', 'pointermove', 'contextmenu']
      const winEvents = ['focus', 'blur', 'resize', 'orientationchange', 'popstate', 'hashchange']
      
      docEvents.forEach(event => {
        document.addEventListener(event, handleInteraction, { once: true, passive: true, capture: true })
      })
      
      winEvents.forEach(event => {
        window.addEventListener(event, handleInteraction, { once: true })
      })
      
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') forcePlay()
      })
      
      window.addEventListener('pageshow', () => forcePlay())
      window.addEventListener('pagehide', () => forcePlay())
      
      if (typeof DeviceMotionEvent !== 'undefined') {
        window.addEventListener('devicemotion', handleInteraction, { once: true, passive: true })
        window.addEventListener('deviceorientation', handleInteraction, { once: true, passive: true })
      }
      
      document.body?.addEventListener('touchstart', handleInteraction, { once: true, passive: true })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) forcePlay()
        })
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )

    const videoEvents = ['loadstart', 'loadeddata', 'loadedmetadata', 'canplay', 'canplaythrough', 'progress', 'suspend', 'stalled']
    videoEvents.forEach(event => {
      video.addEventListener(event, () => forcePlay())
    })
    
    forcePlay()
    requestAnimationFrame(throttledPlay)
    
    observer.observe(video)
    addInteractionListeners()

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [videoUrl])

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
      videoRef.current.muted = !isMuted
    }
    setIsMuted(prev => !prev)
  }

  return (
    <div className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-black font-sans flex flex-col">

      {videoUrl && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline={true}
          webkit-playsinline=""
          x5-playsinline=""
          x-webkit-airplay="allow"
          preload="auto"
          poster={data?.heroSection?.posterImage || undefined}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ objectFit: 'cover' }}
        >
          {mobileVideoUrl && <source src={mobileVideoUrl} type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" media="(max-width: 767px)" />}
          {videoUrl && <source src={videoUrl} type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" media="(min-width: 768px)" />}
          <source src={isMobile && mobileVideoUrl ? mobileVideoUrl : videoUrl} type="video/mp4" />
        </video>
      )}

      <motion.div 
        className="absolute inset-0 z-[1] bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/50 to-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 md:px-8 lg:px-12 overflow-hidden">
        
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:pl-6 xl:pl-10 max-w-2xl mx-auto lg:mx-0 py-4 lg:py-0">
          <motion.p
            custom={0.3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl italic font-light mb-2 sm:mb-4 md:mb-6 tracking-wide font-serif"
          >
            {preHeading}
          </motion.p>

          <motion.h1
            custom={0.5}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-2 sm:mb-4 md:mb-6 drop-shadow-xl"
          >
            {mainHeading}
          </motion.h1>

          <motion.p
            custom={0.7}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light tracking-wide mb-4 sm:mb-6 md:mb-8 italic"
          >
            {subHeading}
          </motion.p>

          <Link href={ctaLink || '/contact'}>
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              className="px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-4 bg-white text-black text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {ctaText}
            </motion.button>
          </Link>
        </div>

        <div className="hidden md:flex md:justify-center lg:justify-end items-center">
          <FeaturesList features={features} />
        </div>

      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring" as const, stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSound}
        className="fixed bottom-24 md:bottom-28 right-4 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        <motion.div
          key={isMuted ? 'muted' : 'unmuted'}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring" as const, stiffness: 300 }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.div>
      </motion.button>
    </div>
  )
}
