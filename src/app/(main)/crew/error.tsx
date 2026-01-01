'use client'

export default function CrewError() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <p style={{ color: 'var(--text-primary)' }}>Something went wrong loading the crew page.</p>
    </div>
  )
}
