'use client'

import PageLoading from '@/components/shared/PageLoading'

export default function Loading() {
  return (
    <PageLoading 
      title="2026 Themes"
      showHero={true}
      showGrid={true}
      gridCols={1}
      gridItems={3}
    />
  )
}
