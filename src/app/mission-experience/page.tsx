import type { Metadata } from "next";
import { Suspense } from "react";
import { getMissionExperiencePageData } from "@/sanity/lib/getMissionExperiencePage";
import MissionHero from "./sections/MissionHero";
import MissionSetup from "./sections/MissionSetup";
import MissionPhases from "./sections/MissionPhases";
import MissionFooter from "./sections/MissionFooter";
import MissionHeader from "./sections/MissionHeader";
import PageLoading from "@/components/shared/PageLoading";

export const metadata: Metadata = {
  title: "Spies of Style Mission Experience",
  description:
    "An immersive espionage experience on Lake Como inspired by real WWII intelligence missions.",
  openGraph: {
    title: "Spies of Style Mission Experience",
    description:
      "An immersive espionage experience on Lake Como inspired by real WWII intelligence missions.",
    type: "website",
  },
};

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
  return (
    <main
      id="main-content"
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Suspense fallback={<PageLoading />}>
        <MissionContent />
      </Suspense>
    </main>
  );
}
