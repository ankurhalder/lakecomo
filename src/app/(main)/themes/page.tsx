import { getThemesPageData } from "@/sanity/lib/getThemesPage"
import ThemesContent from "./ThemesContent"
import type { Metadata } from "next"
import { Suspense } from "react"
import PageLoading from "@/components/shared/PageLoading"

export const metadata: Metadata = {
  title: "Themes | Lake Como Style",
  description: "Choose from our signature cinematic themes: 007 Agents of Style, The Hollywood Hussle, and La Dolce Vita. Transform your celebration into an unforgettable movie experience.",
  openGraph: {
    title: "Cinematic Themes | Lake Como Style", 
    description: "Explore our signature themes designed to make every guest a star.",
    type: "website",
  },
}

async function ThemesPageContent() {
  const data = await getThemesPageData()
  return <ThemesContent data={data} />
}

export default async function ThemesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Suspense fallback={<PageLoading />}>
        <ThemesPageContent />
      </Suspense>
    </main>
  )
}
