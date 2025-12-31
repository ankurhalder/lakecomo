'use client'

import PageError from '@/components/shared/PageError'

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  void _error
  return (
    <PageError
      title="Couldn't load Movie page"
      message="Something went wrong while loading the movie page. Please try again."
      showRetry={true}
      showHome={true}
      onRetry={reset}
    />
  )
}
