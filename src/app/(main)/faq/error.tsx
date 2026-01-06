'use client'

import PageError from '@/components/shared/PageError'

export default function FAQError() {
  return (
    <PageError 
      title="Unable to load FAQ"
      message="We couldn't load the FAQ page. Please try again."
      showRetry={true}
      showHome={true}
    />
  )
}
