import { getMoviePageData } from "@/sanity/lib/getMoviePage"
import MovieContent from "./MovieContent"
import type { Metadata } from "next"
import { Suspense } from "react"
import PageLoading from "@/components/shared/PageLoading"

export const metadata: Metadata = {
  title: "Your Movie | Lake Como Style",
  description: "Get your cinematic trailer delivered within 3-4 weeks. A 3-minute movie trailer with music, titles, cast names, special effects, and social media-ready cuts.",
  openGraph: {
    title: "Your Final Cut | Lake Como Style", 
    description: "Your personalized movie trailer - ready for its premiere.",
    type: "website",
  },
}

async function MoviePageContent() {
  const data = await getMoviePageData()
  return <MovieContent data={data} />
}

export default async function MoviePage() {
  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Suspense fallback={<PageLoading />}>
        <MoviePageContent />
      </Suspense>
    </main>
  )
}
