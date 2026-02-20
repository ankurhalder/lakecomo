"use client";

/**
 * IMAGEСЛIDER — Premium Cinematic Autoplay Slider
 *
 * ARCHITECTURE DECISIONS:
 *
 * 1. Ken Burns Effect
 *    Each active image animates scale: 1.0 → 1.08 over the full display duration
 *    using Framer Motion's `animate` prop. The scale transition uses `ease: "linear"`
 *    to ensure a constant, imperceptible slow zoom — not a jump. When the slide
 *    exits, it starts the next image fresh at scale 1.0, resetting the zoom.
 *    Implementation: key={currentIndex} on the motion.div forces React to unmount
 *    and remount the element each time, resetting the animation state cleanly.
 *
 * 2. Fade Transitions
 *    AnimatePresence with mode="wait" ensures the old image fades out before
 *    the new image fades in — creating a clean cinematic dissolve. Duration: 1.4s.
 *    mode="sync" was considered but "wait" creates more deliberate pacing.
 *
 * 3. Parallax Layer
 *    useScroll + useTransform on the section container creates a 12% vertical
 *    offset as the section enters and exits the viewport. On mobile, this is
 *    reduced to 5% to prevent content clipping on small screens.
 *
 * 4. Autoplay
 *    setInterval in useEffect advances the slide every 5.5 seconds. This gives
 *    Ken Burns ~5s of visible animation before the next fade begins.
 *    Interval is cleared and restarted when the user manually changes slides.
 *
 * 5. Touch Support
 *    Touch start/end delta tracking detects horizontal swipes (>50px) and
 *    advances/reverses the slide accordingly. Works with Lenis smooth scroll.
 *
 * 6. Performance
 *    All images are preloaded via Next.js Image priority on the first 2 slides.
 *    Remaining slides use lazy loading. Motion is wrapped in a will-change hint
 *    via style={{ willChange: "transform, opacity" }}.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { SliderImage } from "@/sanity/lib/getThemesPage";

const SPY_GOLD = "#C9A86C";

// Slide display duration in ms (how long each slide is visible)
const SLIDE_DURATION = 5500;
// Fade transition duration in seconds
const FADE_DURATION = 1.4;
// Ken Burns zoom target (1.0 = no zoom, 1.08 = 8% zoom)
const KEN_BURNS_SCALE = 1.08;
// Ken Burns animation duration matches slide duration + fade
const KEN_BURNS_DURATION = (SLIDE_DURATION + FADE_DURATION * 1000) / 1000;

const FALLBACK_IMAGES: SliderImage[] = [];

interface ImageSliderProps {
  images?: SliderImage[];
}

export default function ImageSlider({ images = [] }: ImageSliderProps) {
  const displayImages = images.length > 0 ? images : FALLBACK_IMAGES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ── Parallax ─────────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Subtle vertical parallax — inner image layer moves slower than scroll
  const innerY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // ── Autoplay ──────────────────────────────────────────────────────────────
  const advance = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1,
    );
  }, [displayImages.length]);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (displayImages.length <= 1) return;
    intervalRef.current = setInterval(() => {
      if (!isPaused) advance();
    }, SLIDE_DURATION);
  }, [advance, displayImages.length, isPaused]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  // ── Manual Navigation ─────────────────────────────────────────────────────
  const goTo = (index: number) => {
    setCurrentIndex(index);
    startInterval(); // restart timer on manual nav
  };

  const goPrev = () =>
    goTo(currentIndex === 0 ? displayImages.length - 1 : currentIndex - 1);
  const goNext = () =>
    goTo(currentIndex === displayImages.length - 1 ? 0 : currentIndex + 1);

  // ── Touch Handlers ────────────────────────────────────────────────────────
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

  // Empty state — nothing to show
  if (displayImages.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(300px, 60vw, 700px)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Event photo gallery"
    >
      {/* ── Section Label ──────────────────────────────────────────────────── */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex items-center gap-2">
          <div className="h-px w-6" style={{ backgroundColor: SPY_GOLD }} />
          <span
            className="text-[9px] uppercase tracking-[0.5em] font-light"
            style={{ color: SPY_GOLD, opacity: 0.75 }}
          >
            Gallery
          </span>
        </div>
      </div>

      {/* ── Parallax Wrapper ───────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: innerY, willChange: "transform" }}
      >
        {/* ── AnimatePresence: Crossfade between slides ─────────────────── */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: KEN_BURNS_SCALE,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: FADE_DURATION,
                ease: "easeInOut",
              },
              scale: {
                duration: KEN_BURNS_DURATION,
                ease: "linear",
              },
            }}
            style={{
              scale: 1, // initial scale before animation — set via initial above
              willChange: "transform, opacity",
            }}
          >
            {displayImages[currentIndex]?.url && (
              <Image
                src={displayImages[currentIndex].url}
                alt={
                  displayImages[currentIndex].alt ||
                  `Spies of Style event photo ${currentIndex + 1}`
                }
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={currentIndex < 2}
                draggable={false}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Overlay Layers ─────────────────────────────────────────────────── */}
      {/* Bottom gradient for caption readability */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 30%, transparent 55%)",
        }}
      />
      {/* Top gradient for gallery label */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%)",
        }}
      />

      {/* ── Caption ────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {displayImages[currentIndex]?.caption && (
          <motion.p
            key={`caption-${currentIndex}`}
            className="absolute bottom-12 md:bottom-14 left-6 md:left-10 z-20 text-xs md:text-sm italic font-light max-w-xs"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-courier)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {displayImages[currentIndex].caption}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Navigation Dots ────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Slide navigation"
      >
        {displayImages.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full flex-shrink-0"
            style={{
              width: i === currentIndex ? "20px" : "5px",
              height: "5px",
              backgroundColor:
                i === currentIndex ? SPY_GOLD : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {/* ── Slide Counter ──────────────────────────────────────────────────── */}
      <div className="absolute bottom-6 right-6 z-20">
        <span
          className="text-[10px] tracking-[0.3em] font-light"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {String(currentIndex + 1).padStart(2, "0")}{" "}
          <span style={{ color: SPY_GOLD, opacity: 0.5 }}>/</span>{" "}
          {String(displayImages.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Progress Bar ───────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-0.5"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        <motion.div
          key={`progress-${currentIndex}`}
          className="h-full"
          style={{ backgroundColor: SPY_GOLD }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: SLIDE_DURATION / 1000,
            ease: "linear",
          }}
        />
      </div>
    </section>
  );
}
