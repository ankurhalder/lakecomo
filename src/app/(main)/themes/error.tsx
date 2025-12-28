'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { RefreshCw, Home, Film } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Themes page error:', error)
  }, [error])

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--overlay)' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" as const, delay: 0.2 }}
        >
          <Film size={40} style={{ color: 'var(--text-secondary)' }} />
        </motion.div>
        
        <h1 
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Scene Cut Short
        </h1>
        
        <p 
          className="mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          We couldn't load the themes right now. 
          Our crew is working behind the scenes to fix this.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ 
              backgroundColor: 'var(--accent)',
              color: 'var(--bg-primary)',
            }}
          >
            <RefreshCw size={18} />
            Try Again
          </motion.button>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ 
                backgroundColor: 'var(--overlay)',
                color: 'var(--text-primary)',
                borderColor: 'var(--text-secondary)',
              }}
            >
              <Home size={18} />
              Go Home
            </motion.button>
          </Link>
        </div>
        
        {error.digest && (
          <p 
            className="mt-8 text-xs"
            style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
          >
            Error ID: {error.digest}
          </p>
        )}
      </motion.div>
    </div>
  )
}
