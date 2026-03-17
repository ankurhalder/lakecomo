"use client";

import { motion } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import CastCarousel from "@/components/shared/CastCarousel";
import type { LandingPageData } from "@/sanity/lib/getLandingPage";
import MissionHero from "@/components/sections/mission/MissionHero";
import MissionSetup from "@/components/sections/mission/MissionSetup";
import MissionPhases from "@/components/sections/mission/MissionPhases";

export default function ExperienceSection({
  data,
}: {
  data: LandingPageData["experience"];
}) {
  const {
    sectionTitle,
    sectionSubtitle,
    eyebrowLabel,
    ctaLabel,
    ctaLink,
    showcaseImages,
    missionExperience,
  } = data;
  const { lenisRef } = useLenis();

  return (
    <>
      <section
        id="experience"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            paddingTop: "var(--section-py)",
            paddingBottom: "var(--section-py)",
          }}
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span
                className="h-px w-8"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span className="text-xs uppercase tracking-[0.3em] font-light gold-text">
                {eyebrowLabel ?? "The Experience"}
              </span>
              <span
                className="h-px w-8"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </div>
            <h2
              className="font-bold"
              style={{
                fontFamily: "var(--font-limelight)",
                fontSize: "var(--fs-h2)",
                color: "var(--text-primary)",
              }}
            >
              {sectionTitle}
            </h2>
            {sectionSubtitle && (
              <p
                className="mt-3 text-sm sm:text-base max-w-xl mx-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                {sectionSubtitle}
              </p>
            )}
          </motion.div>

          {/* Carousel */}
          {showcaseImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <CastCarousel images={showcaseImages} />
            </motion.div>
          )}

          {/* Mission Experience CTA — only shown when mission content exists */}
          {missionExperience && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-center mt-8"
            >
              <button
                onClick={() => {
                  const anchor = ctaLink?.startsWith("#")
                    ? ctaLink
                    : "#mission-experience";
                  const element = document.querySelector(anchor);
                  if (element && lenisRef.current) {
                    lenisRef.current.scrollTo(element as HTMLElement, {
                      offset: -48,
                    });
                  }
                }}
                className="relative group"
              >
                <motion.span
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(201, 168, 76, 0.35)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-full cursor-pointer transition-shadow"
                  style={{
                    background: "var(--accent-gradient)",
                    color: "var(--accent-text)",
                  }}
                >
                  {ctaLabel ?? "Mission Experience"}
                </motion.span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Mission Experience Sub-section — injected inline after the experience carousel */}
      {missionExperience && (
        <div id="mission-experience">
          <MissionHero data={missionExperience.hero} />
          <MissionSetup data={missionExperience.setup} />
          {missionExperience.phases.length > 0 && (
            <MissionPhases phases={missionExperience.phases} />
          )}
        </div>
      )}
    </>
  );
}
