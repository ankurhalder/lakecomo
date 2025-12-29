'use client'

function Skeleton({ className }: { className?: string }) {
  return (
    <div 
      className={`animate-pulse rounded ${className}`}
      style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.08 }}
    />
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section className="min-h-[90vh] flex flex-col px-4 md:px-8 lg:px-12 relative pt-20">
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' }}
        />
        
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start pt-8 lg:pt-16 max-w-7xl mx-auto w-full">
            <div className="text-center lg:text-left">
              <Skeleton className="w-3/4 max-w-md h-12 md:h-16 mb-4 mx-auto lg:mx-0" />
              <Skeleton className="w-2/3 max-w-sm h-6 mx-auto lg:mx-0" />
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="w-[180px] aspect-[4/3] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="w-16 h-2" />
                  <Skeleton className="w-24 h-5" />
                  <Skeleton className="w-12 h-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center py-8">
            <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
              <Skeleton className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[450px] aspect-video rounded-xl" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pb-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-16 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>

          <div className="flex justify-center gap-2 pb-8">
            <Skeleton className="w-8 h-2 rounded-full" />
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="w-2 h-2 rounded-full" />
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-5/6 h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-4/5 h-6" />
        </div>
      </section>
    </div>
  )
}
