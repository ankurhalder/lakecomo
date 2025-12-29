import { getHomePageData } from "@/sanity/lib/getHomePage"
import Hero from "@/components/home/Hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lake Como Style | Cinematic Event Experiences",
  description: "Transform your celebration into an unforgettable cinematic experience. Themed parties, professional videography, and custom movie trailers in Lake Como, Italy.",
  openGraph: {
    title: "Lake Como Style | Cinematic Event Experiences",
    description: "Transform your celebration into an unforgettable cinematic experience in Lake Como, Italy.",
    type: "website",
  },
}

export default async function Home() {
  const data = await getHomePageData()

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Hero data={data} />
    </main>
  )
}
