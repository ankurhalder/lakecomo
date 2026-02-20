"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  hero?: {
    coverImageUrl?: string | null;
    preHeading?: string;
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  bondVideoUrl?: string | null;
}

const DEFAULTS = {
  preHeading: "An Immersive Experience",
  headline: "Spies of Style\nDinner Experience",
  subheadline:
    "Step into history, intrigue, and glamour — live a James Bond–inspired adventure on Lake Como.",
  ctaText: "Book Your Experience",
  ctaLink: "/contact",
};

export default function HeroSection({
  hero = {},
  bondVideoUrl,
}: HeroSectionProps) {
  const preHeading = hero.preHeading ?? DEFAULTS.preHeading;
  const headline = hero.headline ?? DEFAULTS.headline;
  const subheadline = hero.subheadline ?? DEFAULTS.subheadline;
  const ctaText = hero.ctaText ?? DEFAULTS.ctaText;
  const ctaLink = hero.ctaLink ?? DEFAULTS.ctaLink;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-16 md:pb-20 lg:items-center lg:pb-0 overflow-hidden">
        {/* Cover Image */}
        {hero.coverImageUrl ? (
          <Image
            src={hero.coverImageUrl}
            alt="Spies of Style Dinner Experience"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
            }}
          />
        )}

        {/* Overlay Stack */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.52)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 35%, transparent 65%)",
          }}
        />

        {/* Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-12 xl:px-16 pt-28 lg:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen lg:min-h-0 lg:py-16">
            {/* ── LEFT: Text Content ─────────────────────────────────────── */}
            <div className="flex flex-col justify-center">
              {/* Pre-heading */}
              <motion.div
                className="flex items-center gap-3 mb-5"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              >
                <div
                  className="h-px w-10 flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
                />
                <span
                  className="text-xs uppercase tracking-[0.45em] font-light"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {preHeading}
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-[1.05] tracking-tight mb-4 whitespace-pre-line"
                style={{
                  color: "var(--text-primary)",
                  textShadow: "0 2px 32px rgba(0,0,0,0.6)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.38, ease: "easeOut" }}
              >
                {headline}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-sm md:text-base lg:text-sm xl:text-base leading-relaxed max-w-lg mb-6 font-light"
                style={{ color: "rgba(255,255,255,0.75)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              >
                {subheadline}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.72, ease: "easeOut" }}
              >
                <Link href={ctaLink}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full transition-all"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--bg-primary)",
                    }}
                  >
                    {ctaText}
                    <span style={{ fontSize: "1.1em" }}>→</span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* ── RIGHT: Bond Video Inset (Desktop Only) ──────────────────── */}
            {bondVideoUrl && (
              <motion.div
                className="hidden lg:flex flex-col items-end justify-center"
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    width: "min(380px, 100%)",
                    aspectRatio: "16/9",
                    border: "1px solid var(--border-color)",
                    boxShadow: "0 0 60px rgba(0,0,0,0.8)",
                  }}
                >
                  <video
                    src={bondVideoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Corner accents */}
                  <div
                    className="absolute top-0 left-0 w-5 h-5"
                    style={{
                      borderTop: "2px solid rgba(255,255,255,0.3)",
                      borderLeft: "2px solid rgba(255,255,255,0.3)",
                    }}
                  />
                  <div
                    className="absolute top-0 right-0 w-5 h-5"
                    style={{
                      borderTop: "2px solid rgba(255,255,255,0.3)",
                      borderRight: "2px solid rgba(255,255,255,0.3)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-5 h-5"
                    style={{
                      borderBottom: "2px solid rgba(255,255,255,0.3)",
                      borderLeft: "2px solid rgba(255,255,255,0.3)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-5 h-5"
                    style={{
                      borderBottom: "2px solid rgba(255,255,255,0.3)",
                      borderRight: "2px solid rgba(255,255,255,0.3)",
                    }}
                  />
                </div>
                <p
                  className="mt-3 text-[10px] uppercase tracking-[0.4em] font-light"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Bond Theme Preview
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.4em]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            <ChevronDown size={20} style={{ color: "rgba(255,255,255,0.3)" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── MOBILE BOND VIDEO ─────────────────────────────────────────────── */}
      {bondVideoUrl && (
        <section
          className="lg:hidden relative py-8 px-5"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <div className="max-w-lg mx-auto">
            <p
              className="text-center text-[10px] uppercase tracking-[0.45em] mb-4 font-light"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Bond Theme Preview
            </p>
            <div
              className="relative rounded-xl overflow-hidden w-full"
              style={{
                aspectRatio: "16/9",
                border: "1px solid var(--border-color)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.8)",
              }}
            >
              <video
                src={bondVideoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-0 left-0 w-4 h-4"
                style={{
                  borderTop: "2px solid rgba(255,255,255,0.25)",
                  borderLeft: "2px solid rgba(255,255,255,0.25)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-4 h-4"
                style={{
                  borderBottom: "2px solid rgba(255,255,255,0.25)",
                  borderRight: "2px solid rgba(255,255,255,0.25)",
                }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
