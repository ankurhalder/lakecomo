export default function GalleryLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-3 rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
        <p className="text-sm uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Loading Gallery...</p>
      </div>
    </div>
  )
}
