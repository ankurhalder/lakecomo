'use client'

export default function GalleryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Something went wrong
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          {error.message || 'Failed to load the gallery.'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
