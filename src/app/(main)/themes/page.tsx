import { getThemesPageData } from "@/sanity/lib/getThemesPage";
import ThemesContent from "./ThemesContent";
import type { Metadata } from "next";
import { Suspense } from "react";
import PageLoading from "@/components/shared/PageLoading";

export const metadata: Metadata = {
  title: "Spies of Style Dinner Experience | Lake Como Style",
  description:
    "Step into history, intrigue, and glamour on Lake Como. A James Bond–inspired immersive dinner experience rooted in the real wartime exploits of Cecil Richard Mallaby.",
  openGraph: {
    title: "Spies of Style Dinner Experience | Lake Como Style",
    description:
      "Live a James Bond–inspired spy adventure on the shores of Lake Como. Interactive missions, cinematic dining, secret codes, and glamour await.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spies of Style Dinner Experience | Lake Como Style",
    description:
      "An immersive James Bond–inspired dining experience on Lake Como — two cinematic locations, spy kits, secret missions, and glamour.",
  },
};

async function ThemesPageContent() {
  const data = await getThemesPageData();
  return <ThemesContent data={data} />;
}

export default async function ThemesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Suspense fallback={<PageLoading />}>
        <ThemesPageContent />
      </Suspense>
    </main>
  );
}
