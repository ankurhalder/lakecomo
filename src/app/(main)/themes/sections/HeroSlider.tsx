"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AUTOPLAY_INTERVAL = 5000;
const FADE_DURATION = 0.9;

export interface HeroSlide {
  url: string;
  alt?: string;
}

interface HeroSliderProps {
  slides?: HeroSlide[];
  blinkingLabel?: string;
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

const DEFAULTS = {
  blinkingLabel: "Classified Intelligence",
  headline: "Spies of Style",
  description:
    "Step into the true mission of Cecil Richard Mallaby — a WWII spy whose daring story inspired James Bond — through an immersive dinner or cocktail experience on Lake Como.",
  ctaText: "Reserve Your Mission",
  ctaLink: "/contact",
};

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function HeroSlider({
  slides = [],
  blinkingLabel,
  headline,
  description,
  ctaText,
  ctaLink,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const resolvedLabel = blinkingLabel ?? DEFAULTS.blinkingLabel;
  const resolvedHeadline = headline ?? DEFAULTS.headline;
  const resolvedDescription = description ?? DEFAULTS.description;
  const resolvedCtaText = ctaText ?? DEFAULTS.ctaText;
  const resolvedCtaLink = ctaLink ?? DEFAULTS.ctaLink;

  const goNext = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    if (slides.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goDot = useCallback((i: number) => {
    setCurrentIndex(i);
  }, []);

  // Keep ref in sync for the interval closure
  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "100svh",
        minHeight: "600px",
        backgroundColor: "#000",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Spies of Style hero image slider"
    >
      {/* ── SLIDE IMAGES ──────────────────────────────────────────────────── */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
          style={{ willChange: "opacity" }}
        >
          {slides[currentIndex]?.url ? (
            <Image
              src={slides[currentIndex].url}
              alt={
                slides[currentIndex].alt ??
                `Spies of Style scene ${currentIndex + 1}`
              }
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="object-contain"
              draggable={false}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #1c1c1c 0%, #0a0a0a 100%)",
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── OVERLAY STACK ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.42)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 25%)",
        }}
      />

      {/* ── PERSISTENT TEXT OVERLAY ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-[88px] md:pb-[100px] px-5 text-center">
        {/* Blinking classified label */}
        <motion.div
          className="flex items-center gap-2.5 mb-5"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: "var(--accent)" }}
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.6em] font-light"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            {resolvedLabel}
          </span>
          <motion.span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: "var(--accent)" }}
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              delay: 0.8,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-5"
          style={{
            color: "var(--bg-secondary)",
            fontFamily: "var(--font-limelight)",
            textShadow: "0 3px 48px rgba(0,0,0,0.75)",
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.88, delay: 0.45, ease: "easeOut" }}
        >
          {resolvedHeadline}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-sm md:text-base leading-[1.85] max-w-lg font-light mb-9"
          style={{ color: "rgba(255,255,255,0.72)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.65, ease: "easeOut" }}
        >
          {resolvedDescription}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.85, ease: "easeOut" }}
        >
          <Link href={resolvedCtaLink}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-9 py-4 text-sm font-bold uppercase tracking-widest rounded-full cursor-pointer"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-text)",
              }}
            >
              {resolvedCtaText}
              <span style={{ fontSize: "1.1em" }}>→</span>
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* ── NAVIGATION ARROWS ─────────────────────────────────────────────── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              backgroundColor: "var(--nav-button-bg)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "var(--accent)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 2L4 7L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              backgroundColor: "var(--nav-button-bg)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "var(--accent)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 2L10 7L5 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* ── PAGINATION DOTS ───────────────────────────────────────────────── */}
      {slides.length > 1 && (
        <div
          className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Slide navigation"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goDot(i)}
              className="transition-all duration-300 rounded-full flex-shrink-0"
              style={{
                width: i === currentIndex ? "22px" : "5px",
                height: "5px",
                backgroundColor:
                  i === currentIndex
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      )}

      {/* ── AUTOPLAY PAUSE INDICATOR ──────────────────────────────────────── */}
      {isPaused && slides.length > 1 && (
        <div
          className="absolute top-5 right-6 z-30 text-[9px] uppercase tracking-[0.45em] font-light pointer-events-none"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          Paused
        </div>
      )}
    </section>
  );
}
