import type { Metadata } from "next";
import { getMissionExperiencePageData } from "@/sanity/lib/getMissionExperiencePage";
import MissionHero from "./sections/MissionHero";
import MissionSetup from "./sections/MissionSetup";
import MissionPhases from "./sections/MissionPhases";
import MissionFooter from "./sections/MissionFooter";
import MissionHeader from "./sections/MissionHeader";
import { generateMetadata as createMetadata } from "@/lib/seo/generateMetadata";
import JsonLd from "@/components/shared/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMissionExperiencePageData();

  return createMetadata({
    title: data?.seo?.seoTitle || "Mission Experience | Spies of Style",
    description:
      data?.seo?.seoDescription ||
      "An immersive espionage experience on Lake Como inspired by real WWII intelligence missions.",
    canonical: data?.seo?.canonicalUrl || "/mission-experience",
    openGraph: {
      type: "website",
      image: data?.seo?.seoImageUrl || undefined,
    },
    twitter: {
      image: data?.seo?.seoImageUrl || undefined,
    },
  });
}

async function MissionContent() {
  const data = await getMissionExperiencePageData();
  if (!data) return null;

  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <MissionHeader />
      <MissionHero data={data.hero} />
      <MissionSetup data={data.setup} />
      <MissionPhases phases={data.phases} />
      <MissionFooter />
    </div>
  );
}

export default async function MissionExperiencePage() {
  const missionStructuredData = {
    "@context": "https://schema.org",
    "@type": "TouristExperience",
    name: "Mission Experience",
    description:
      "A cinematic mission-led tourist experience on Lake Como inspired by real WWII intelligence stories.",
    provider: {
      "@type": "Organization",
      name: "Spies of Style",
      url: "https://spiesofstyle.com",
    },
    url: "https://spiesofstyle.com/mission-experience",
    areaServed: "Lake Como, Italy",
  };

  return (
    <main
      id="main-content"
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <JsonLd data={missionStructuredData} />
      <MissionContent />
    </main>
  );
}
