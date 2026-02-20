"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SPY_GOLD = "#C9A86C";

interface CtaSectionProps {
  ctaSection?: {
    title?: string;
    quote?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImageUrl?: string | null;
  };
}

const DEFAULTS = {
  title: "Reserve Your Adventure",
  quote:
    "Step into history, mystery, and glamour on Lake Como. Choose your night, grab your spy kit, and live the adventure.",
  ctaText: "Book Now",
  ctaLink: "/contact",
};

export default function CtaSection({ ctaSection = {} }: CtaSectionProps) {
  const title = ctaSection.title ?? DEFAULTS.title;
  const quote = ctaSection.quote ?? DEFAULTS.quote;
  const ctaText = ctaSection.ctaText ?? DEFAULTS.ctaText;
  const ctaLink = ctaSection.ctaLink ?? DEFAULTS.ctaLink;

  return (
    <section className="relative py-14 md:py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      {ctaSection.backgroundImageUrl ? (
        <>
          <Image
            src={ctaSection.backgroundImageUrl}
            alt="Reserve your adventure"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.78)" }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #080808 0%, #0b0a07 50%, #0a0808 100%)",
          }}
        />
      )}

      {/* Warm gold radial glow — luxury warmth signal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${SPY_GOLD}10 0%, transparent 65%)`,
        }}
      />

      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${SPY_GOLD}55, transparent)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          {/* Decorative emblem */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-12"
              style={{
                background: `linear-gradient(to right, transparent, ${SPY_GOLD})`,
              }}
            />
            <div
              className="w-2.5 h-2.5 rotate-45 border"
              style={{
                borderColor: SPY_GOLD,
                backgroundColor: `${SPY_GOLD}22`,
              }}
            />
            <div
              className="h-px w-12"
              style={{
                background: `linear-gradient(to left, transparent, ${SPY_GOLD})`,
              }}
            />
          </div>

          {/* Section Label */}
          <span
            className="text-[10px] uppercase tracking-[0.55em] font-light block mb-5"
            style={{ color: SPY_GOLD, opacity: 0.75 }}
          >
            Your Mission Awaits
          </span>

          {/* Title */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-limelight)",
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            {title}
          </h2>

          {/* Quote */}
          <p
            className="text-sm md:text-base leading-[1.9] italic font-light mb-7 max-w-2xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.8)",
              fontFamily: "var(--font-courier)",
            }}
          >
            &ldquo;{quote}&rdquo;
          </p>

          {/* CTA Button */}
          <Link href={ctaLink}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-10 py-5 text-sm font-bold uppercase tracking-[0.25em] transition-all"
              style={{
                backgroundColor: SPY_GOLD,
                color: "#0a0a0a",
                clipPath:
                  "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                boxShadow: `0 0 40px ${SPY_GOLD}33`,
              }}
            >
              {ctaText}
              <span style={{ fontSize: "1.1em" }}>→</span>
            </motion.button>
          </Link>

          {/* Guarantee / Trust micro-copy */}
          <p
            className="mt-5 text-xs font-light tracking-wider"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Private & semi-private dates available · Lake Como, Italy
          </p>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${SPY_GOLD}33, transparent)`,
        }}
      />
    </section>
  );
}
