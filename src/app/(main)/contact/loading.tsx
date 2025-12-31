'use client'

import { Skeleton } from '@/components/shared/PageLoading'

export default function Loading() {
  return (
    <div 
      className="relative min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pt-28 md:pt-36 pb-20">
        <div className="text-center mb-12">
          <Skeleton className="w-24 h-4 mx-auto mb-4" />
          <Skeleton className="w-80 h-10 mx-auto mb-4" />
          <Skeleton className="w-32 h-4 mx-auto" />
        </div>

        <div className="p-6 md:p-10 rounded-2xl" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <Skeleton className="w-48 h-6 mx-auto mb-8" />
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-12 rounded-lg" />
              <Skeleton className="h-12 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-12 rounded-lg" />
              <Skeleton className="h-12 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-12 rounded-lg" />
              <Skeleton className="h-12 rounded-lg" />
            </div>
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="w-40 h-14 mx-auto rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
