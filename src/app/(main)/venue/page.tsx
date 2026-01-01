import { getVenuePageData } from "@/sanity/lib/getVenuePage"
import VenueContent from "./VenueContent"
import type { Metadata } from "next"
import { Suspense } from "react"
import PageLoading from "@/components/shared/PageLoading"

export const metadata: Metadata = {
  title: "Palazzo Odescalchi | Lake Como Style",
  description: "Create cinematic magic in a legendary setting. Palazzo Odescalchi - a historic palace in the heart of Como with centuries of art, power, and noble heritage.",
  openGraph: {
    title: "Palazzo Odescalchi | Lake Como Style",
    description: "Create cinematic magic in a legendary historic palace in Como, Italy.",
    type: "website",
  },
}

async function VenuePageContent() {
  const data = await getVenuePageData()
  
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <p style={{ color: 'var(--text-primary)' }}>Loading...</p>
      </div>
    )
  }
  
  return <VenueContent data={data} />
}

export default async function VenuePage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Suspense fallback={<PageLoading />}>
        <VenuePageContent />
      </Suspense>
    </main>
  )
}
