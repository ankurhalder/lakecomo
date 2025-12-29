'use client'

import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse rounded ${className}`}
      style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.08 }}
    />
  )
}

interface PageLoadingProps {
  title?: string
  showHero?: boolean
  showCarousel?: boolean
  showGrid?: boolean
  gridCols?: number
  gridItems?: number
}

export default function PageLoading({ 
  title,
  showHero = true,
  showCarousel = false,
  showGrid = false,
  gridCols = 3,
  gridItems = 6
}: PageLoadingProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {showHero && (
        <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 pt-20">
          <div 
            className="absolute inset-0 -z-10"
            style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' }}
          />
          
          <div className="w-full max-w-4xl mx-auto text-center">
            {title ? (
              <h1 
                className="text-3xl md:text-5xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {title}
              </h1>
            ) : (
              <Skeleton className="w-64 h-12 mx-auto mb-4" />
            )}
            <Skeleton className="w-48 h-6 mx-auto" />
          </div>
        </section>
      )}

      {showCarousel && (
        <section className="py-8 px-4">
          <div className="flex items-center justify-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-[350px] md:w-[450px] aspect-video rounded-xl" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <Skeleton className="w-6 h-2 rounded-full" />
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="w-2 h-2 rounded-full" />
          </div>
        </section>
      )}

      {showGrid && (
        <section className="px-4 md:px-8 lg:px-12 py-16">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${gridCols} gap-6 max-w-7xl mx-auto`}>
            {Array.from({ length: gridItems }).map((_, idx) => (
              <div key={idx} className="space-y-3">
                <Skeleton className="w-full aspect-video rounded-xl" />
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex items-center justify-center py-12">
        <motion.div
          className="w-8 h-8 border-2 rounded-full"
          style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
