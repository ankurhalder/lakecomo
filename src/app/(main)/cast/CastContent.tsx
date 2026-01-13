"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import LaurelBadge from "@/components/shared/LaurelBadge";
import CastCarousel from "./CastCarousel";
import FallingStars from "@/components/shared/FallingStars";
import {
  DEFAULT_CAST_HERO_FEATURE,
  DEFAULT_CAST_HERO,
  DEFAULT_FALLING_STARS,
} from "@/lib/constants";

interface CastImage {
  url: string;
  title?: string;
  role?: string;
}

interface FallingStarsSettings {
  enabled?: boolean;
  count?: number;
  mobileCount?: number;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
}

interface CastContentProps {
  hero: {
    title?: string;
    subtitle?: string;
  };
  heroFeature?: {
    title: string;
    subtitle?: string;
    tag?: string;
    link?: string;
  };
  fallingStars?: FallingStarsSettings;
  showcaseImages: CastImage[];
  content?: {
    paragraphs?: string[];
  };
}

export default function CastContent({
  hero,
  heroFeature,
  fallingStars,
  showcaseImages,
  content,
}: CastContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const stars = fallingStars || {};
  const showStars = stars.enabled !== false;

  const feature = heroFeature || DEFAULT_CAST_HERO_FEATURE;

  return (
    <div
      ref={contentRef}
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {showStars && (
        <FallingStars
          count={stars.count ?? DEFAULT_FALLING_STARS.count}
          mobileCount={stars.mobileCount ?? DEFAULT_FALLING_STARS.mobileCount}
          minSize={stars.minSize ?? DEFAULT_FALLING_STARS.minSize}
          maxSize={stars.maxSize ?? DEFAULT_FALLING_STARS.maxSize}
          minSpeed={stars.minSpeed ?? DEFAULT_FALLING_STARS.minSpeed}
          maxSpeed={stars.maxSpeed ?? DEFAULT_FALLING_STARS.maxSpeed}
          sidesOnly={true}
          sideWidth={0.15}
          color="var(--text-primary)"
        />
      )}
      <section className="h-[calc(100dvh-60px)] min-h-[600px] flex flex-col px-4 md:px-8 lg:px-12 relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))",
          }}
        />

        <div className="relative z-10 flex-1 flex flex-col pt-16 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center max-w-7xl mx-auto w-full">
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 tracking-tight leading-[1.1]"
                style={{ color: "var(--text-primary)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {(hero?.title || DEFAULT_CAST_HERO.title)
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </motion.h1>

              <motion.div
                className="flex items-center justify-center lg:justify-start gap-3 mb-3"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.35 }}
              >
                <div
                  className="h-px w-8 md:w-12"
                  style={{
                    backgroundColor: "var(--text-secondary)",
                    opacity: 0.3,
                  }}
                />
                <span
                  className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-light"
                  style={{ color: "var(--text-secondary)", opacity: 0.6 }}
                >
                  A Cinematic Experience
                </span>
                <div
                  className="h-px w-8 md:w-12"
                  style={{
                    backgroundColor: "var(--text-secondary)",
                    opacity: 0.3,
                  }}
                />
              </motion.div>

              <motion.p
                className="text-xs sm:text-sm md:text-base uppercase tracking-[0.15em] font-medium"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {hero?.subtitle || DEFAULT_CAST_HERO.subtitle}
              </motion.p>
            </motion.div>

            <motion.div
              className="hidden lg:flex justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            >
              <LaurelBadge
                title={feature.title}
                subtitle={feature.subtitle}
                tag={feature.tag}
                link={feature.link}
                themeAware={true}
                index={0}
              />
            </motion.div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <CastCarousel images={showcaseImages} />
          </div>

          <motion.div
            className="flex flex-col items-center gap-1 pb-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.2em] font-light"
              style={{ color: "var(--text-secondary)", opacity: 0.5 }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown
                size={24}
                style={{ color: "var(--text-secondary)", opacity: 0.4 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {content?.paragraphs && content.paragraphs.length > 0 && (
        <section className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-8">
            {content.paragraphs.map((paragraph, idx) => (
              <motion.p
                key={idx}
                className="text-lg md:text-xl leading-relaxed font-light"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                {typeof paragraph === "string"
                  ? paragraph
                  : (paragraph as { text?: string }).text || ""}
              </motion.p>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 md:px-8 lg:px-12 py-16 pb-28 md:py-24">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 tracking-tight leading-[1.1]"
            style={{ color: "var(--text-primary)" }}
          >
            Ready to Become a Star?
          </h2>
          <p
            className="text-base md:text-lg mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            Join our next cinematic experience and transform into your movie
            character.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded-full transition-colors"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg-primary)",
            }}
          >
            Book Your Experience
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
