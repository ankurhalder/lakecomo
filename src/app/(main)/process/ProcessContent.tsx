"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Film, Clapperboard, Camera } from "lucide-react";
import ProcessHero from "./ProcessHero";
import ProcessVideo from "./ProcessVideo";
import FilmStrip from "./FilmStrip";
import type { ProcessPageData } from "@/sanity/lib/getProcessPage";

interface ProcessContentProps {
  data: ProcessPageData;
}

export default function ProcessContent({ data }: ProcessContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const steps = data?.steps || [];
  const cta = data?.cta || {};

  const IconComponent =
    cta.icon === "Clapperboard"
      ? Clapperboard
      : cta.icon === "Camera"
        ? Camera
        : Film;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <ProcessHero hero={data?.hero} heroFeature={data?.heroFeature} />

      {data?.videoSection?.enabled && (
        <ProcessVideo videoSection={data.videoSection} />
      )}

      <FilmStrip steps={steps} />

      <section className="relative py-16 pb-28 sm:py-20 md:py-24 px-4">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary), var(--bg-secondary), transparent)",
          }}
        />

        <motion.div
          className="relative z-10 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <IconComponent
            className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4"
            style={{ color: "var(--text-secondary)", opacity: 0.5 }}
          />

          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            {cta.title || "Ready to Create Your Movie?"}
          </h2>

          <p
            className="text-xs sm:text-sm md:text-base mb-6 sm:mb-8 leading-relaxed px-4"
            style={{ color: "var(--text-secondary)" }}
          >
            {cta.description ||
              "Start your cinematic journey today. Let us transform your celebration into an unforgettable movie experience."}
          </p>

          <Link href={cta.buttonLink || "/contact"}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg-primary)",
              }}
            >
              {cta.buttonText || "Start Your Experience"}
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
