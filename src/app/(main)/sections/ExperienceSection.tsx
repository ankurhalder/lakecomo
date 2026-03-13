"use client";

import { motion } from "framer-motion";
import CastCarousel from "@/components/shared/CastCarousel";
import type { LandingPageData } from "@/sanity/lib/getLandingPage";

export default function ExperienceSection({
  data,
}: {
  data: LandingPageData["experience"];
}) {
  const { sectionTitle, sectionSubtitle, showcaseImages } = data;

  return (
    <section id="experience" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "var(--section-py)", paddingBottom: "var(--section-py)" }}>
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
            <span
              className="text-xs uppercase tracking-[0.3em] font-light gold-text"
            >
              The Experience
            </span>
            <span
              className="h-px w-8"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </div>
          <h2
            className="font-bold"
            style={{ fontFamily: "var(--font-limelight)", fontSize: "var(--fs-h2)", color: "var(--text-primary)" }}
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
      </div>
    </section>
  );
}
