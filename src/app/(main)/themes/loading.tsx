'use client'

function Skeleton({ className }: { className?: string }) {
  return (
    <div 
      className={`animate-pulse rounded ${className}`}
      style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.08 }}
    />
  )
}

function ThemeCardSkeleton({ index }: { index: number }) {
  const isEven = index % 2 === 0
  
  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-32 items-center py-16 lg:py-24 px-4 lg:px-12`}>
      <div className="relative w-full lg:w-[45%] aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden">
        <Skeleton className="w-full h-full rounded-2xl" />
        
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-24 h-3 rounded" />
        </div>
      </div>

      <div className={`w-full lg:w-[45%] space-y-4`}>
        <div>
          <Skeleton className="w-20 h-2 mb-3" />
          <Skeleton className="w-full max-w-xs h-8 mb-2" />
          <Skeleton className="w-3/4 max-w-[200px] h-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="rounded-xl p-3 border"
              style={{ 
                backgroundColor: 'var(--overlay)',
                borderColor: 'color-mix(in srgb, var(--text-primary) 5%, transparent)'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="w-3 h-3 rounded" />
                <Skeleton className="w-10 h-2" />
              </div>
              <Skeleton className="w-full h-3 mb-1" />
              <Skeleton className="w-2/3 h-3" />
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Skeleton className="w-24 h-10 rounded-full" />
          <Skeleton className="w-36 h-10 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function LaurelBadgeSkeleton() {
  return (
    <div className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px] aspect-[4/3] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 px-4">
        <Skeleton className="w-16 h-2" />
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-12 h-2" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Skeleton className="fixed top-0 left-0 right-0 h-1 z-50 lg:hidden" />
      
      <section className="min-h-[80vh] flex items-center px-4 md:px-8 lg:px-12 relative">
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' }}
        />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center md:text-left">
            <Skeleton className="w-40 h-3 mb-6 mx-auto md:mx-0" />
            <Skeleton className="w-full max-w-md h-12 mb-3 mx-auto md:mx-0" />
            <Skeleton className="w-3/4 max-w-sm h-6 mb-6 mx-auto md:mx-0" />
            <Skeleton className="w-full max-w-lg h-4 mb-2 mx-auto md:mx-0" />
            <Skeleton className="w-2/3 max-w-sm h-4 mx-auto md:mx-0" />
          </div>

          <div className="hidden lg:flex lg:flex-col gap-3 items-end">
            <LaurelBadgeSkeleton />
            <LaurelBadgeSkeleton />
            <LaurelBadgeSkeleton />
          </div>
        </div>
      </section>

      <section className="relative px-4 md:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px z-10">
          <Skeleton className="w-full h-full" />
        </div>
        
        <ThemeCardSkeleton index={0} />
        <ThemeCardSkeleton index={1} />
        <ThemeCardSkeleton index={2} />
      </section>

      <section className="py-24 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <Skeleton className="w-10 h-10 rounded-full mx-auto mb-6" />
          <Skeleton className="w-64 h-8 mx-auto mb-4" />
          <Skeleton className="w-full max-w-sm h-4 mx-auto mb-2" />
          <Skeleton className="w-2/3 max-w-xs h-4 mx-auto mb-10" />
          <Skeleton className="w-52 h-12 rounded-full mx-auto" />
        </div>
      </section>
    </div>
  )
}
