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
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center py-16 lg:py-24`}>
      <div className="relative w-full lg:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden">
        <Skeleton className="w-full h-full rounded-2xl" />
        
        <div className="absolute bottom-6 left-6 flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-28 h-4 rounded" />
        </div>
      </div>

      <div className={`w-full lg:w-1/2 space-y-6 ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
        <div>
          <Skeleton className="w-24 h-3 mb-4" />
          <Skeleton className="w-full max-w-sm h-10 mb-2" />
          <Skeleton className="w-3/4 max-w-xs h-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="rounded-xl p-4 border"
              style={{ 
                backgroundColor: 'var(--overlay)',
                borderColor: 'color-mix(in srgb, var(--text-primary) 5%, transparent)'
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="w-12 h-3" />
              </div>
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-2/3 h-4" />
            </div>
          ))}
        </div>

        <Skeleton className="w-48 h-14 rounded-full" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' 
          }}
        />
        
        <div className="relative z-10 text-center max-w-5xl mx-auto pt-32 pb-20">
          <Skeleton className="w-40 h-4 mx-auto mb-8" />
          
          <Skeleton className="w-full max-w-3xl h-14 md:h-16 mx-auto mb-3" />
          <Skeleton className="w-3/4 max-w-2xl h-14 md:h-16 mx-auto mb-10" />
          
          <Skeleton className="w-2/3 max-w-xl h-8 mx-auto mb-4" />
          
          <Skeleton className="w-full max-w-2xl h-5 mx-auto mb-2" />
          <Skeleton className="w-2/3 max-w-lg h-5 mx-auto" />

          <div className="mt-20 flex flex-col items-center">
            <div 
              className="w-6 h-10 border-2 rounded-full"
              style={{ borderColor: 'var(--text-secondary)', opacity: 0.15 }}
            />
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <ThemeCardSkeleton index={0} />
        <ThemeCardSkeleton index={1} />
        <ThemeCardSkeleton index={2} />
      </section>

      <section className="py-32 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <Skeleton className="w-12 h-12 rounded-full mx-auto mb-8" />
          <Skeleton className="w-72 h-10 mx-auto mb-6" />
          <Skeleton className="w-full max-w-md h-5 mx-auto mb-2" />
          <Skeleton className="w-2/3 max-w-sm h-5 mx-auto mb-12" />
          <Skeleton className="w-64 h-14 rounded-full mx-auto" />
        </div>
      </section>
    </div>
  )
}
