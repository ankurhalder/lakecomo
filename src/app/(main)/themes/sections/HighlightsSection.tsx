"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SPY_GOLD = "#C9A86C";

interface HighlightsSectionProps {
  highlightsSection?: {
    title?: string;
    highlights?: string[];
  };
}

const DEFAULTS = {
  title: "Experience Highlights",
  highlights: [
    "James Bond–inspired dining and interactive espionage",
    "Historical storytelling based on the real-life exploits of Cecil Richard Mallaby",
    "Dramatic arrivals, panoramic lake views, and immersive decor",
    "Props, spy kits, and secret missions at every turn",
    "Photo-worthy moments at each location",
  ],
};

export default function HighlightsSection({
  highlightsSection = {},
}: HighlightsSectionProps) {
  const title = highlightsSection.title ?? DEFAULTS.title;
  const highlights =
    highlightsSection.highlights && highlightsSection.highlights.length > 0
      ? highlightsSection.highlights
      : DEFAULTS.highlights;

  return (
    <section
      className="relative py-10 md:py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Faint horizontal scan lines — cinematic effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(201,168,108,0.015) 3px,
            rgba(201,168,108,0.015) 4px
          )`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-10 flex-shrink-0"
              style={{
                background: `linear-gradient(to right, transparent, ${SPY_GOLD})`,
              }}
            />
            <Sparkles size={13} style={{ color: SPY_GOLD }} />
            <div
              className="h-px w-10 flex-shrink-0"
              style={{
                background: `linear-gradient(to left, transparent, ${SPY_GOLD})`,
              }}
            />
          </div>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-limelight)",
            }}
          >
            {title}
          </h2>
        </motion.div>

        {/* Highlights Grid
            Responsive: 1 col mobile, 2 col tablet, 3 col large desktop.
            Conversion strategy: numbered items with strong visual weight.
            Odd item gets full-width on its row for breathing room. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className={`relative p-6 md:p-7 rounded-2xl flex items-start gap-4 ${
                // If last item and total is odd, span full on md, center on lg
                index === highlights.length - 1 && highlights.length % 2 !== 0
                  ? "sm:col-span-2 lg:col-span-1"
                  : ""
              }`}
              style={{
                border: `1px solid ${SPY_GOLD}1E`,
                background:
                  "linear-gradient(135deg, rgba(201,168,108,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                borderColor: `${SPY_GOLD}44`,
                background:
                  "linear-gradient(135deg, rgba(201,168,108,0.07) 0%, rgba(255,255,255,0.02) 100%)",
              }}
            >
              {/* Gold number bullet */}
              <div
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  border: `1px solid ${SPY_GOLD}55`,
                  backgroundColor: `${SPY_GOLD}11`,
                }}
              >
                <span
                  className="text-xs font-bold tracking-wider"
                  style={{
                    color: SPY_GOLD,
                    fontFamily: "var(--font-limelight)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p
                className="text-sm md:text-base leading-relaxed font-light pt-1.5"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {highlight}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
