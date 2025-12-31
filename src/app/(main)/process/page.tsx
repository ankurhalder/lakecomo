import { getProcessPageData } from "@/sanity/lib/getProcessPage"
import ProcessContent from "./ProcessContent"
import type { Metadata } from "next"
import { Suspense } from "react"
import PageLoading from "@/components/shared/PageLoading"

export const metadata: Metadata = {
  title: "The Movie Process | Lake Como Style",
  description: "From concept to cinema - discover our 6-step process for creating your personalized movie trailer experience in Lake Como, Italy.",
  openGraph: {
    title: "The Movie Process | Lake Como Style",
    description: "From concept to cinema - your story unfolds in 6 steps",
    type: "website",
  },
}

async function ProcessPageContent() {
  const data = await getProcessPageData()
  
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <p style={{ color: 'var(--text-primary)' }}>Loading...</p>
      </div>
    )
  }
  
  return <ProcessContent data={data} />
}

export default async function ProcessPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Suspense fallback={<PageLoading />}>
        <ProcessPageContent />
      </Suspense>
    </main>
  )
}
