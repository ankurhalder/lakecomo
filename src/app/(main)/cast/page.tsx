import { getCastPageData, type CastImage } from "@/sanity/lib/getCastPage";
import CastContent from "./CastContent";
import { Suspense } from "react";
import PageLoading from "@/components/shared/PageLoading";

export const metadata = {
  title: "Become the Cast | Lake Como Style",
  description:
    "Join the cinematic experience. Lights, Camera, Action - Your Time to Shine.",
};

async function CastPageContent() {
  const data = await getCastPageData();

  if (!data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <p style={{ color: "var(--text-primary)" }}>Loading...</p>
      </div>
    );
  }

  const { hero, heroFeature, fallingStars, showcaseImages, content, cta } =
    data;

  const images: CastImage[] = (showcaseImages || [])
    .filter((img) => img?.url)
    .map((img) => ({
      url: img.url,
      title: img.title || undefined,
      role: img.role || undefined,
    }));

  return (
    <CastContent
      hero={hero}
      heroFeature={heroFeature}
      fallingStars={fallingStars}
      showcaseImages={images}
      content={content}
      cta={cta}
    />
  );
}

export default async function CastPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <CastPageContent />
    </Suspense>
  );
}
