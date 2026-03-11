"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CtaButton {
  text: string;
  link: string;
}

interface CtaSectionProps {
  ctaSection?: {
    title?: string;
    quote?: string;
    // Multi-button array (new)
    ctas?: CtaButton[];
    // Single-button fallback (legacy compat)
    ctaText?: string;
    ctaLink?: string;
    backgroundImageUrl?: string | null;
  };
}

const DEFAULTS = {
  title: "Live a True Spy Mission on Lake Como",
  quote:
    "Step into history, mystery, and glamour on Lake Como. Choose your night, grab your spy kit, and live the adventure.",
  ctas: [
    { text: "Book Dinner Mission", link: "/contact" },
    { text: "Book Cocktail Mission", link: "/contact" },
    { text: "Inquire About Private Villa Events", link: "/contact" },
  ],
};

export default function CtaSection({ ctaSection = {} }: CtaSectionProps) {
  const title = ctaSection.title ?? DEFAULTS.title;
  const quote = ctaSection.quote ?? DEFAULTS.quote;

  // Prefer the ctas array; fall back to single legacy button; then hard defaults
  let ctas: CtaButton[];
  if (ctaSection.ctas && ctaSection.ctas.length > 0) {
    ctas = ctaSection.ctas;
  } else if (ctaSection.ctaText && ctaSection.ctaLink) {
    ctas = [{ text: ctaSection.ctaText, link: ctaSection.ctaLink }];
  } else {
    ctas = DEFAULTS.ctas;
  }

  const hasBg = !!ctaSection.backgroundImageUrl;
  const labelColor = hasBg ? "rgba(255,255,255,0.45)" : "var(--text-muted)";
  const quoteColor = hasBg ? "rgba(255,255,255,0.7)" : "var(--text-secondary)";
  const trustColor = hasBg ? "rgba(255,255,255,0.3)" : "var(--text-muted)";
  const separatorColor = hasBg
    ? "rgba(255,255,255,0.12)"
    : "var(--divider-color)";
  const dividerColor = hasBg ? "rgba(255,255,255,0.2)" : "var(--divider-color)";
  const diamondBorder = hasBg
    ? "rgba(255,255,255,0.25)"
    : "var(--border-color)";

  return (
    <section className="relative py-14 md:py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      {ctaSection.backgroundImageUrl ? (
        <>
          <Image
            src={ctaSection.backgroundImageUrl}
            alt="Reserve your mission"
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
          style={{ backgroundColor: "var(--bg-secondary)" }}
        />
      )}

      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${separatorColor}, transparent)`,
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
                background: `linear-gradient(to right, transparent, ${dividerColor})`,
              }}
            />
            <div
              className="w-2.5 h-2.5 rotate-45 border"
              style={{ borderColor: diamondBorder }}
            />
            <div
              className="h-px w-12"
              style={{
                background: `linear-gradient(to left, transparent, ${dividerColor})`,
              }}
            />
          </div>

          {/* Label */}
          <span
            className="text-[10px] uppercase tracking-[0.55em] font-light block mb-5"
            style={{ color: labelColor }}
          >
            Your Mission Awaits
          </span>

          {/* Title */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-5"
            style={{
              color: "var(--text-primary)",
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            {title}
          </h2>

          {/* Quote */}
          <p
            className="text-sm md:text-base leading-[1.9] italic font-light mb-9 max-w-2xl mx-auto"
            style={{ color: quoteColor }}
          >
            &ldquo;{quote}&rdquo;
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            {ctas.map((cta, i) => (
              <Link key={i} href={cta.link}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full cursor-pointer whitespace-nowrap"
                  style={
                    i === 0
                      ? {
                          backgroundColor: "var(--accent)",
                          color: "var(--accent-text)",
                        }
                      : {
                          backgroundColor: "transparent",
                          color: hasBg
                            ? "rgba(255,255,255,0.8)"
                            : "var(--text-primary)",
                          border: `1px solid ${hasBg ? "rgba(255,255,255,0.25)" : "var(--border-color)"}`,
                        }
                  }
                >
                  {cta.text}
                  <span style={{ fontSize: "1.05em" }}>→</span>
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Trust micro-copy */}
          <p
            className="mt-6 text-xs font-light tracking-wider"
            style={{ color: trustColor }}
          >
            Private & semi-private dates available · Lake Como, Italy
          </p>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${separatorColor}, transparent)`,
        }}
      />
    </section>
  );
}
