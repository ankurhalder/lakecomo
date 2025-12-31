'use client'

import { Skeleton } from '@/components/shared/PageLoading'

export default function Loading() {
  return (
    <div 
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))' }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] pt-24 pb-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto items-center gap-8">
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <Skeleton className="w-32 h-4 mb-4" />
          <Skeleton className="w-full max-w-md h-10 mb-3" />
          <Skeleton className="w-4/5 max-w-sm h-6 mb-4" />
          <Skeleton className="w-full max-w-lg h-16 mb-8" />
          <Skeleton className="w-24 h-4 mb-2" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>

        <div className="hidden lg:flex justify-end">
          <Skeleton className="w-[200px] h-[150px] rounded-xl" />
        </div>
      </div>

      <div className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <Skeleton className="w-[200px] h-[200px] rounded-full" />
          <div className="space-y-4 max-w-lg">
            <Skeleton className="w-48 h-8" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-40 h-12 rounded-full" />
          </div>
        </div>
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="w-48 h-10 mx-auto mb-4" />
            <Skeleton className="w-64 h-4 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
