import type { Metadata } from "next";
import { Suspense } from "react";
import { getLandingPageData } from "@/sanity/lib/getLandingPage";
import LandingPage from "./sections/LandingPage";
import PageLoading from "@/components/shared/PageLoading";

export const metadata: Metadata = {
  title: "Lake Como Style | Cinematic Event Experiences",
  description:
    "Step into the true mission of Cecil Richard Mallaby — a WWII spy who inspired James Bond — through an immersive dinner or cocktail experience on Lake Como, Italy.",
  openGraph: {
    title: "Lake Como Style | Cinematic Event Experiences",
    description:
      "Immersive spy-themed dining and cocktail experiences on Lake Como, Italy. Inspired by the real-life story behind James Bond.",
    type: "website",
  },
};

async function LandingContent() {
  const data = await getLandingPageData();
  if (!data) return null;
  return <LandingPage data={data} />;
}

export default async function Home() {
  return (
    <main
      id="main-content"
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Suspense fallback={<PageLoading />}>
        <LandingContent />
      </Suspense>
    </main>
  );
}
