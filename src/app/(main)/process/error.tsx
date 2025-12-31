'use client'

import PageError from "@/components/shared/PageError"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <PageError message={error.message} onRetry={reset} />
}
