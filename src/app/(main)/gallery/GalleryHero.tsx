"use client";

import { motion } from "framer-motion";
import { ChevronDown, Camera, Sparkles, Film, Star } from "lucide-react";
import LaurelBadge from "@/components/shared/LaurelBadge";

interface GalleryHeroProps {
  hero?: {
    heading?: string;
    subHeading?: string;
    agentNote?: string;
  };
  heroFeature?: {
    title: string;
    subtitle?: string;
    tag?: string;
    link?: string;
  };
  features?: {
    title: string;
    description?: string;
  }[];
}

const featureIcons = [Camera, Sparkles, Film, Star];

export default function GalleryHero({
  hero,
  heroFeature,
  features,
}: GalleryHeroProps) {
  return (
    <section className="min-h-[70vh] flex items-center px-4 md:px-8 lg:px-12 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto pt-20 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <motion.p
            className="text-xs md:text-sm uppercase tracking-[0.4em] mb-4"
            style={{ color: "var(--text-secondary)", opacity: 0.6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Exclusive Access
          </motion.p>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 tracking-tight leading-[1.1]"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {(hero?.heading || "Behind the Magic")
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </motion.h1>

          <motion.p
            className="text-base md:text-lg lg:text-xl font-light italic mb-6"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {hero?.subHeading || "A Star is Born"}
          </motion.p>

          {hero?.agentNote && (
            <motion.div
              className="relative p-4 md:p-5 rounded-lg border mb-6"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--bg-secondary) 50%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--accent) 30%, transparent)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <span
                  className="text-[10px] uppercase tracking-widest font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  Agent Note — Classified
                </span>
              </div>
              <p
                className="text-xs md:text-sm leading-relaxed italic"
                style={{ color: "var(--text-secondary)", opacity: 0.9 }}
              >
                {hero.agentNote}
              </p>
            </motion.div>
          )}

          <motion.div
            className="flex flex-col items-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span
              className="text-xs uppercase tracking-[0.2em] font-light"
              style={{ color: "var(--text-secondary)", opacity: 0.5 }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown
                size={28}
                style={{ color: "var(--text-secondary)", opacity: 0.4 }}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="space-y-6">
          {heroFeature && (
            <motion.div
              className="flex justify-center lg:justify-end mb-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            >
              <LaurelBadge
                title={heroFeature.title}
                subtitle={heroFeature.subtitle}
                tag={heroFeature.tag}
                link={heroFeature.link}
                themeAware={true}
                index={0}
              />
            </motion.div>
          )}

          {features && features.length > 0 && (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3
                className="text-xs uppercase tracking-widest mb-4 lg:text-right"
                style={{ color: "var(--text-secondary)", opacity: 0.6 }}
              >
                What You&apos;ll Discover
              </h3>
              {features.map((feature, idx) => {
                const IconComponent = featureIcons[idx % featureIcons.length];
                return (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg lg:flex-row-reverse lg:text-right"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--bg-secondary) 30%, transparent)",
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--accent) 20%, transparent)",
                      }}
                    >
                      <IconComponent
                        size={14}
                        style={{ color: "var(--accent)" }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4
                        className="text-sm font-medium mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {feature.title}
                      </h4>
                      {feature.description && (
                        <p
                          className="text-xs leading-relaxed"
                          style={{
                            color: "var(--text-secondary)",
                            opacity: 0.8,
                          }}
                        >
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
