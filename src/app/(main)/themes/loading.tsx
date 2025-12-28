'use client'

import { motion } from 'framer-motion'

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <motion.div
      className={`rounded-lg ${className}`}
      style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.1 }}
      animate={{ opacity: [0.1, 0.2, 0.1] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
    />
  )
}

function ThemeCardSkeleton({ index }: { index: number }) {
  const isEven = index % 2 === 0
  
  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center py-16 lg:py-24`}>
      <div className="relative w-full lg:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden">
        <SkeletonPulse className="w-full h-full" />
        
        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <SkeletonPulse className="w-12 h-12 rounded-full" />
          <SkeletonPulse className="w-24 h-4" />
        </div>
      </div>

      <div className={`w-full lg:w-1/2 space-y-6 ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
        <div>
          <SkeletonPulse className="w-20 h-3 mb-3" />
          <SkeletonPulse className="w-3/4 h-10 mb-2" />
          <SkeletonPulse className="w-1/2 h-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="rounded-xl p-4 border"
              style={{ 
                backgroundColor: 'var(--overlay)',
                borderColor: 'color-mix(in srgb, var(--text-primary) 10%, transparent)'
              }}
            >
              <SkeletonPulse className="w-16 h-3 mb-3" />
              <SkeletonPulse className="w-full h-4 mb-2" />
              <SkeletonPulse className="w-2/3 h-4" />
            </div>
          ))}
        </div>

        <SkeletonPulse className="w-48 h-14 rounded-full" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-5xl mx-auto pt-32 pb-20">
          <SkeletonPulse className="w-48 h-4 mx-auto mb-6" />
          
          <SkeletonPulse className="w-full max-w-2xl h-16 md:h-20 mx-auto mb-4" />
          <SkeletonPulse className="w-3/4 max-w-xl h-16 md:h-20 mx-auto mb-8" />
          
          <SkeletonPulse className="w-2/3 max-w-lg h-8 mx-auto mb-6" />
          
          <SkeletonPulse className="w-full max-w-2xl h-6 mx-auto mb-2" />
          <SkeletonPulse className="w-2/3 max-w-xl h-6 mx-auto" />

          <motion.div 
            className="mt-16 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="w-6 h-10 border-2 rounded-full flex justify-center"
              style={{ borderColor: 'var(--text-secondary)', opacity: 0.2 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <motion.div 
                className="w-1.5 h-3 rounded-full mt-2"
                style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {[0, 1, 2].map((index) => (
          <ThemeCardSkeleton key={index} index={index} />
        ))}
      </section>

      <section className="py-32 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <SkeletonPulse className="w-12 h-12 rounded-full mx-auto mb-6" />
          <SkeletonPulse className="w-64 h-10 mx-auto mb-4" />
          <SkeletonPulse className="w-full max-w-md h-6 mx-auto mb-2" />
          <SkeletonPulse className="w-2/3 max-w-sm h-6 mx-auto mb-10" />
          <SkeletonPulse className="w-56 h-14 rounded-full mx-auto" />
        </div>
      </section>
    </div>
  )
}
