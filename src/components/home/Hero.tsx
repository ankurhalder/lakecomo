'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import FeaturesList from './FeaturesList'

export default function Hero({ data }: { data: any }) {
  const { preHeading, mainHeading, subHeading, ctaText, ctaLink, videoUrl } = data?.heroSection || {}
  const features = data?.featuresGrid || []

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans">
      
      <div className="absolute inset-0 z-0">
        {videoUrl && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full pt-20 pb-20 px-6 md:px-12">
        
        <div className="flex flex-col justify-center items-start text-left pl-4 lg:pl-10 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/90 text-lg italic font-light mb-4 tracking-wide font-serif"
          >
            {preHeading}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tighter mb-6 drop-shadow-xl"
          >
            {mainHeading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/90 text-lg font-light tracking-wide mb-10 italic"
          >
            {subHeading}
          </motion.p>

          <Link href={ctaLink || '/contact'}>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="px-10 py-3 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg"
            >
              {ctaText}
            </motion.button>
          </Link>
        </div>

        <div className="hidden lg:flex justify-end items-center">
          <FeaturesList features={features} />
        </div>

      </div>
    </div>
  )
}
