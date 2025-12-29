import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Lake Como Style',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <main 
      id="main-content"
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🎬</div>
        
        <h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Scene Not Found
        </h1>
        
        <p 
          className="text-lg mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          Looks like this scene didn&apos;t make the final cut. 
          Let&apos;s get you back to the main show.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
