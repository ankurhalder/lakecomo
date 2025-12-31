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
      title="Couldn't load Cast page"
      message="Something went wrong while loading the cast showcase. Please try again."
      showRetry={true}
      showHome={true}
      onRetry={reset}
    />
  )
}
