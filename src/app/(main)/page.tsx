import { getHomePageData } from "@/sanity/lib/getHomePage"
import Hero from "@/components/home/Hero"
import type { Metadata } from "next"
import { Suspense } from "react"
import PageLoading from "@/components/shared/PageLoading"

export const metadata: Metadata = {
  title: "Lake Como Style | Cinematic Event Experiences",
  description: "Transform your celebration into an unforgettable cinematic experience. Themed parties, professional videography, and custom movie trailers in Lake Como, Italy.",
  openGraph: {
    title: "Lake Como Style | Cinematic Event Experiences",
    description: "Transform your celebration into an unforgettable cinematic experience in Lake Como, Italy.",
    type: "website",
  },
}

async function HomeContent() {
  const data = await getHomePageData()
  return <Hero data={data} />
}

export default async function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Suspense fallback={<PageLoading />}>
        <HomeContent />
      </Suspense>
    </main>
  )
}
