"use client";

/**
 * ThemesContent — Cinematic Experience Page Orchestrator (Spies of Style)
 *
 * Section rendering order (conversion narrative arc):
 *   1. HeroSlider          — Full-screen cinematic image slider + persistent CTA overlay
 *   2. RealLifeSection     — "The Real-Life 007" two-column storytelling section
 *   3. AssignmentsSection  — "Choose Your Assignment" — Dinner + Cocktail mission cards
 *   4. PrivateVillaSection — Private villa experience with image + bullet features
 *   5. CtaSection          — Multi-button conversion block
 *   6. WhatsIncludedSection— What every mission includes
 *
 * All sections tolerate undefined/null props — hard-coded fallback defaults
 * are embedded within each section component.
 */

import type { ThemesPageData } from "@/sanity/lib/getThemesPage";
import HeroSlider from "./sections/HeroSlider";
import RealLifeSection from "./sections/RealLifeSection";
import AssignmentsSection from "./sections/AssignmentsSection";
import PrivateVillaSection from "./sections/PrivateVillaSection";
import CtaSection from "./sections/CtaSection";
import WhatsIncludedSection from "./sections/WhatsIncludedSection";

interface ThemesContentProps {
  data: ThemesPageData | null;
}

export default function ThemesContent({ data }: ThemesContentProps) {
  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* 1 ── Full-screen cinematic slider */}
      <HeroSlider
        slides={data?.heroSlides}
        blinkingLabel={data?.hero?.blinkingLabel}
        headline={data?.hero?.headline}
        description={data?.hero?.subheadline}
        ctaText={data?.hero?.ctaText}
        ctaLink={data?.hero?.ctaLink}
      />

      {/* 2 ── The Real-Life 007: Two-column narrative */}
      <RealLifeSection section={data?.real007Section} />

      {/* 3 ── Choose Your Assignment: Dinner + Cocktail mission cards */}
      <AssignmentsSection assignmentsSection={data?.assignmentsSection} />

      {/* 4 ── Private Villa Operations */}
      <PrivateVillaSection section={data?.privateVillaSection} />

      {/* 5 ── Cinematic multi-button CTA */}
      <CtaSection ctaSection={data?.ctaSection} />

      {/* 6 ── What's Included list */}
      <WhatsIncludedSection section={data?.whatsIncludedSection} />
    </div>
  );
}
