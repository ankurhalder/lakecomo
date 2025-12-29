'use client'

import PageError from '@/components/shared/PageError'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <PageError
      title="Scene Interrupted"
      message="Something went wrong while loading this experience. Our crew is working on it."
      showRetry={true}
      showHome={true}
      onRetry={reset}
    />
  )
}
