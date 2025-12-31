'use client'

import PageError from '@/components/shared/PageError'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PageError
      title="Couldn't load Process page"
      message="Something went wrong while loading the process page. Please try again."
      showRetry={true}
      showHome={true}
      onRetry={reset}
    />
  )
}

