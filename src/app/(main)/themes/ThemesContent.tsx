"use client";

/**
 * ThemesContent — Cinematic Experience Page Orchestrator
 *
 * This component is the single orchestrator for the /themes page.
 * It receives fully-typed, transformed data from the server-side
 * getThemesPageData() function and distributes it to each section component.
 *
 * Section rendering order (conversion narrative arc):
 *   1. HeroSection      — First impression + immediate CTA trigger
 *   2. StorySection     — Emotional context + trust through history
 *   3. LocationsSection — Concrete options + decision scaffolding
 *   4. PropsSection     — Tactile detail + "what I get" clarity
 *   5. HighlightsSection — Summary validation + conversion nudge
 *   6. LogisticsSection  — Practical answers, removes booking friction
 *   7. CtaSection        — Final conversion moment
 *   8. ImageSlider       — Social proof + aspirational imagery
 *
 * All section components handle their own null/missing content
 * via internal DEFAULTS — the page never breaks from empty CMS state.
 */

import type { ThemesPageData } from "@/sanity/lib/getThemesPage";
import HeroSection from "./sections/HeroSection";
import StorySection from "./sections/StorySection";
import LocationsSection from "./sections/LocationsSection";
import PropsSection from "./sections/PropsSection";
import HighlightsSection from "./sections/HighlightsSection";
import LogisticsSection from "./sections/LogisticsSection";
import CtaSection from "./sections/CtaSection";
import ImageSlider from "./sections/ImageSlider";

interface ThemesContentProps {
  data: ThemesPageData | null;
}

export default function ThemesContent({ data }: ThemesContentProps) {
  // All sections tolerate undefined props — defaults are embedded within each section.
  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* 1 ── Cinematic Hero: Full-bleed cover image + Bond video inset */}
      <HeroSection hero={data?.hero} bondVideoUrl={data?.bondVideoUrl} />

      {/* 2 ── Story: History of Mallaby + Bond connection narrative */}
      <StorySection storySection={data?.storySection} />

      {/* 3 ── Two Locations: Brunate vs Cernobbio cinematic comparison */}
      <LocationsSection locationsSection={data?.locationsSection} />

      {/* 4 ── Props & Spy Kits: Tactile detail + quote callout */}
      <PropsSection propsSection={data?.propsSection} />

      {/* 5 ── Experience Highlights: Numbered grid summary */}
      <HighlightsSection highlightsSection={data?.highlightsSection} />

      {/* 6 ── Details & Logistics: Friction-removing practical info */}
      <LogisticsSection logisticsSection={data?.logisticsSection} />

      {/* 7 ── Image Slider: Ken Burns autoplay — social proof before final CTA */}
      {data?.sliderImages && data.sliderImages.length > 0 && (
        <ImageSlider images={data.sliderImages} />
      )}

      {/* 8 ── Reserve CTA: Primary conversion block */}
      <CtaSection ctaSection={data?.ctaSection} />
    </div>
  );
}
