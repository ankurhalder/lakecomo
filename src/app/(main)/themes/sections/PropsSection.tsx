"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target } from "lucide-react";

const SPY_GOLD = "#C9A86C";

interface PropsSectionProps {
  propsSection?: {
    title?: string;
    highlights?: string[];
    quote?: string;
    backgroundImageUrl?: string | null;
  };
}

const DEFAULTS = {
  title: "Props, Spy Kits & Photo Ops",
  highlights: [
    "Every guest receives a custom spy kit to unlock missions and solve secret codes.",
    "Themed props and dramatic backdrops create Instagram-ready photo moments.",
    "Explore hidden clues, enact spy missions, and immerse yourself in the role of a WWII operative.",
  ],
  quote:
    "Decode messages, uncover secrets, and become the spy you've always wanted to be — all while enjoying the elegance and beauty of Lake Como.",
};

export default function PropsSection({ propsSection = {} }: PropsSectionProps) {
  const title = propsSection.title ?? DEFAULTS.title;
  const highlights =
    propsSection.highlights && propsSection.highlights.length > 0
      ? propsSection.highlights
      : DEFAULTS.highlights;
  const quote = propsSection.quote ?? DEFAULTS.quote;

  return (
    <section className="relative py-10 md:py-14 lg:py-20 overflow-hidden">
      {/* Background image with overlay, or pure dark gradient */}
      {propsSection.backgroundImageUrl ? (
        <>
          <Image
            src={propsSection.backgroundImageUrl}
            alt="Props and Spy Kits"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.82)" }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #09090f 0%, #0a0a0a 50%, #0f0a06 100%)",
          }}
        />
      )}

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${SPY_GOLD}08 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 lg:px-12 xl:px-16">
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
            <Target size={14} style={{ color: SPY_GOLD }} />
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

        {/* Feature Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-16">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl p-6 md:p-7 text-center"
              style={{
                border: `1px solid ${SPY_GOLD}22`,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              whileHover={{ borderColor: `${SPY_GOLD}55` }}
            >
              {/* Number */}
              <div
                className="text-4xl font-bold mb-4 leading-none"
                style={{
                  color: SPY_GOLD,
                  opacity: 0.3,
                  fontFamily: "var(--font-limelight)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <p
                className="text-sm md:text-base leading-relaxed font-light"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {highlight}
              </p>
              {/* Corner accent */}
              <div
                className="absolute top-3 left-3 w-4 h-4"
                style={{
                  borderTop: `1px solid ${SPY_GOLD}44`,
                  borderLeft: `1px solid ${SPY_GOLD}44`,
                }}
              />
              <div
                className="absolute bottom-3 right-3 w-4 h-4"
                style={{
                  borderBottom: `1px solid ${SPY_GOLD}44`,
                  borderRight: `1px solid ${SPY_GOLD}44`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Quote Callout */}
        <motion.div
          className="relative max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Top gold line */}
          <div
            className="h-px w-20 mx-auto mb-6"
            style={{ backgroundColor: `${SPY_GOLD}77` }}
          />
          <blockquote>
            <span
              className="block text-5xl leading-none font-serif mb-2"
              style={{ color: SPY_GOLD, opacity: 0.5 }}
            >
              &ldquo;
            </span>
            <p
              className="text-base md:text-xl leading-[1.9] italic font-light"
              style={{
                color: "rgba(255,255,255,0.88)",
                fontFamily: "var(--font-courier)",
              }}
            >
              {quote}
            </p>
          </blockquote>
          <div
            className="h-px w-20 mx-auto mt-6"
            style={{ backgroundColor: `${SPY_GOLD}77` }}
          />
        </motion.div>
      </div>
    </section>
  );
}
