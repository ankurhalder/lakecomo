import { getHomePageData } from "@/sanity/lib/getHomePage"
import Hero3D from "@/components/home/Hero3D"

export default async function Home() {
  const data = await getHomePageData()

  return (
    <main className="min-h-screen bg-black">
      <Hero3D data={data} />
    </main>
  )
}