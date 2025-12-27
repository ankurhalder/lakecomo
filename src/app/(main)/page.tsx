import { getHomePageData } from "@/sanity/lib/getHomePage"
import Hero from "@/components/home/Hero"

export default async function Home() {
  const data = await getHomePageData()

  return (
    <main className="min-h-screen bg-black">
      <Hero data={data} />
    </main>
  )
}
