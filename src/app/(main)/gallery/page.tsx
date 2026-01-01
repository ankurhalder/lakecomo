import { getGalleryPageData } from "@/sanity/lib/getGalleryPage"
import GalleryHero from "./GalleryHero"
import GalleryCarousel from "./GalleryCarousel"
import type { Metadata } from "next"
import { Suspense } from "react"
import PageLoading from "@/components/shared/PageLoading"

export const metadata: Metadata = {
  title: "Gallery | Lake Como Style",
  description: "Behind the magic of our cinematic events.",
}

async function GalleryPageContent() {
  const data = await getGalleryPageData()
  
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white">Loading...</p>
      </div>
    )
  }
  
  return (
    <>
      <GalleryHero hero={data.hero} heroFeature={data.heroFeature} galleryImages={data.galleryImages} />
      
      {data.details && (
        <section className="py-24 px-4 md:px-12 max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-2xl font-light leading-relaxed text-white/80 font-courier">
            {data.details}
          </p>
        </section>
      )}

      {data.galleryImages.length > 0 ? (
        <GalleryCarousel images={data.galleryImages} />
      ) : (
        <div className="py-24 text-center text-white/50">
          <p>No images available yet. Please upload via admin panel.</p>
        </div>
      )}
    </>
  )
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black">
      <Suspense fallback={<PageLoading />}>
        <GalleryPageContent />
      </Suspense>
    </main>
  )
}
