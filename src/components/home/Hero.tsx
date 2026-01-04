'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import FeaturesList from './FeaturesList'

const SIMULATE_AUTOPLAY_FAIL = false

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
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayIndicator, setShowPlayIndicator] = useState(true)
  const [textHidden, setTextHidden] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)
  const features = data?.featuresGrid || []
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const hasPlayedRef = useRef(false)
  const playCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const activeVideoUrl = useMemo(() => {
    const url = isMobile && mobileVideoUrl ? mobileVideoUrl : videoUrl
    if (!url) return undefined
    return url.includes('#') ? url : `${url}#t=0.001`
  }, [isMobile, mobileVideoUrl, videoUrl])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setTextHidden(true)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [isMobile])



  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const forcePlay = async () => {
      if (hasPlayedRef.current) return true
      try {
        video.muted = true
        await video.play()
        hasPlayedRef.current = true
        setIsPlaying(true)
        return true
      } catch {
        return false
      }
    }

    const handlePlaying = () => {
      if (!SIMULATE_AUTOPLAY_FAIL) {
        setIsPlaying(true)
      }
      hasPlayedRef.current = true
    }

    const handlePause = () => {
      if (!hasPlayedRef.current) {
        setIsPlaying(false)
      }
    }

    video.addEventListener('playing', handlePlaying)
    video.addEventListener('pause', handlePause)

    playCheckTimeoutRef.current = setTimeout(() => {
      if (SIMULATE_AUTOPLAY_FAIL || (!hasPlayedRef.current && video.paused)) {
        setShowPlayIndicator(true)
      }
    }, 1000)

    const handleInteraction = () => {
      if (!hasPlayedRef.current) {
        forcePlay()
      }
    }

    const docEvents = ['touchstart', 'touchend', 'click', 'mousedown', 'pointerdown']
    docEvents.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true, passive: true, capture: true })
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) forcePlay()
        })
      },
      { threshold: [0.1, 0.5] }
    )

    const videoEvents = ['loadeddata', 'loadedmetadata', 'canplay', 'canplaythrough']
    videoEvents.forEach(event => {
      video.addEventListener(event, () => forcePlay())
    })
    
    forcePlay()
    observer.observe(video)

    return () => {
      if (playCheckTimeoutRef.current) {
        clearTimeout(playCheckTimeoutRef.current)
      }
      observer.disconnect()
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('pause', handlePause)
    }
  }, [activeVideoUrl])

  const handlePlayClick = async () => {
    const video = videoRef.current
    if (!video) return
    
    try {
      video.muted = true
      await video.play()
      hasPlayedRef.current = true
      setIsPlaying(true)
      setShowPlayIndicator(false)
    } catch {
      video.muted = true
      video.play().catch(() => {})
    }
  }

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
      videoRef.current.muted = !isMuted
    }
    setIsMuted(prev => !prev)
    setShowPlayIndicator(false)
    setIsPlaying(true)
    setUserInteracted(true)
  }

  return (
    <div className="relative w-full min-h-[100dvh] overflow-y-auto overflow-x-hidden bg-black font-sans flex flex-col">

      {activeVideoUrl && (
        <video
          ref={videoRef}
          key={activeVideoUrl}
          src={activeVideoUrl}
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
        />
      )}


      <motion.div 
        className="absolute inset-0 z-[1] bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/50 to-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 px-4 md:px-8 lg:px-12 overflow-visible">
        
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:pl-8 xl:pl-12 max-w-3xl mx-auto lg:mx-0 py-4 lg:py-0 gap-1 sm:gap-2">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isMobile && textHidden ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start"
            style={{ pointerEvents: isMobile && textHidden ? 'none' : 'auto' }}
          >
            <motion.p
              custom={0.3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl italic font-light mb-2 sm:mb-4 md:mb-6 tracking-wide font-serif"
            >
              {preHeading}
            </motion.p>

            <motion.h1
              custom={0.5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-3 sm:mb-4 md:mb-6 drop-shadow-xl"
            >
              {mainHeading}
            </motion.h1>

            <motion.p
              custom={0.7}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light tracking-wide mb-4 sm:mb-6 md:mb-8 italic"
            >
              {subHeading}
            </motion.p>

            <Link href={ctaLink || '/contact'} className="md:inline-block hidden">
              <motion.button
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                className="px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-4 bg-white text-black text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-lg"
              >
                {ctaText || 'Book your free consultation'}
              </motion.button>
            </Link>
          </motion.div>

          <Link href={ctaLink || '/contact'} className="md:hidden">
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate={textHidden ? { opacity: 0, pointerEvents: 'none' as const } : "visible"}
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.5 }}
              className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-lg"
            >
              {ctaText || 'Book your free consultation'}
            </motion.button>
          </Link>
        </div>

        <div className="hidden md:flex md:justify-center lg:justify-end items-center">
          <FeaturesList features={features} />
        </div>

      </div>

      <AnimatePresence>
        {isMobile && textHidden && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fixed bottom-24 left-0 right-0 z-45 flex justify-center px-4"
          >
            <Link href={ctaLink || '/contact'}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {ctaText || 'Book your free consultation'}
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-24 md:bottom-28 right-4 md:right-6 z-50">
        <AnimatePresence>
          {showPlayIndicator && !userInteracted && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-white/30"
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 2, 2],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 2.5, 2.5],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.3
                }}
              />
              <motion.div
                className="absolute -top-12 right-0 whitespace-nowrap bg-white/90 text-black text-xs font-medium px-3 py-1.5 rounded-full shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2 }}
              >
                Tap to see the magic ✨
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: showPlayIndicator && !userInteracted ? [1, 1.1, 1] : 1,
          }}
          transition={{ 
            opacity: { delay: 0.5 },
            scale: showPlayIndicator && !userInteracted ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 200 }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSound}
          className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md border flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
            showPlayIndicator && !userInteracted 
              ? 'bg-white/30 border-white/50 shadow-lg shadow-white/20' 
              : 'bg-white/10 border-white/20 hover:bg-white/20'
          }`}
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
    </div>
  )
}
