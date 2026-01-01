import { getCrewPageData } from "@/sanity/lib/getCrewPage"
import CrewContent from "./CrewContent"
import type { Metadata } from "next"
import { Suspense } from "react"
import PageLoading from "@/components/shared/PageLoading"

export const metadata: Metadata = {
  title: "Your Film Crew | Lake Como Style",
  description: "Meet the international team behind Lake Como Style. From New York to Milan, our experts bring decades of fashion and film experience to your celebration.",
  openGraph: {
    title: "Your Film Crew | Lake Como Style",
    description: "Meet the international team bringing cinematic magic to your celebration.",
    type: "website",
  },
}

async function CrewPageContent() {
  const data = await getCrewPageData()
  
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <p style={{ color: 'var(--text-primary)' }}>Loading...</p>
      </div>
    )
  }
  
  return <CrewContent data={data} />
}

export default async function CrewPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Suspense fallback={<PageLoading />}>
        <CrewPageContent />
      </Suspense>
    </main>
  )
}
