import { getThemesPageData } from "@/sanity/lib/getThemesPage"
import ThemesContent from "./ThemesContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Themes | Lake Como Style",
  description: "Choose from our signature cinematic themes: 007 Agents of Style, The Hollywood Hussle, and La Dolce Vita. Transform your celebration into an unforgettable movie experience.",
  openGraph: {
    title: "Cinematic Themes | Lake Como Style", 
    description: "Explore our signature themes designed to make every guest a star.",
    type: "website",
  },
}

export default async function ThemesPage() {
  const data = await getThemesPageData()

  return (
    <main className="min-h-screen bg-black">
      <ThemesContent data={data} />
    </main>
  )
}
