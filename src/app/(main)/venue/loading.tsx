export default function VenueLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="animate-pulse" style={{ color: 'var(--text-secondary)' }}>Loading...</div>
    </div>
  )
}
