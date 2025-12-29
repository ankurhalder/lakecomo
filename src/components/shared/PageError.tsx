'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface PageErrorProps {
  title?: string
  message?: string
  showRetry?: boolean
  showHome?: boolean
  onRetry?: () => void
}

export default function PageError({ 
  title = "Something went wrong",
  message = "We couldn't load this page. Please try again.",
  showRetry = true,
  showHome = true,
  onRetry
}: PageErrorProps) {
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
          className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--overlay)' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <AlertTriangle size={32} style={{ color: 'var(--accent)' }} />
        </motion.div>

        <h1 
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h1>

        <p 
          className="text-base mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          {message}
        </p>

        <div className="flex items-center justify-center gap-4">
          {showRetry && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry || (() => window.location.reload())}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wider transition-colors"
              style={{ 
                backgroundColor: 'var(--accent)', 
                color: 'var(--bg-primary)' 
              }}
            >
              <RefreshCw size={16} />
              Try Again
            </motion.button>
          )}

          {showHome && (
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wider border transition-colors"
                style={{ 
                  borderColor: 'var(--text-secondary)', 
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent'
                }}
              >
                <Home size={16} />
                Go Home
              </motion.button>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  )
}
