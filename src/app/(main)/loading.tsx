'use client'

function Skeleton({ className }: { className?: string }) {
  return (
    <div 
      className={`animate-pulse rounded ${className}`}
      style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.08 }}
    />
  )
}

function LaurelBadgeSkeleton() {
  return (
    <div className="relative w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] aspect-[4/3] flex items-center justify-center">
      <div 
        className="absolute inset-0 rounded-full opacity-10"
        style={{ 
          border: '2px solid var(--text-secondary)',
          borderRadius: '50%',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-6">
        <Skeleton className="w-20 h-2" />
        <Skeleton className="w-32 h-5" />
        <Skeleton className="w-16 h-2" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div 
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))' 
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-20 pb-32 md:pb-24 px-4 md:px-8 lg:px-12">
        
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:pl-6 xl:pl-10 max-w-2xl mx-auto lg:mx-0 py-8 lg:py-0">
          <Skeleton className="w-48 h-5 mb-6" />
          
          <Skeleton className="w-full max-w-lg h-8 mb-3" />
          <Skeleton className="w-4/5 max-w-md h-8 mb-3" />
          <Skeleton className="w-3/5 max-w-sm h-8 mb-8" />
          
          <Skeleton className="w-56 h-6 mb-12" />
          
          <Skeleton className="w-40 h-12 rounded-full" />
        </div>

        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-end gap-3 pr-10">
          <LaurelBadgeSkeleton />
          <LaurelBadgeSkeleton />
          <LaurelBadgeSkeleton />
        </div>
      </div>

      <div 
        className="fixed bottom-24 md:bottom-28 right-4 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full animate-pulse"
        style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.1 }}
      />
    </div>
  )
}
