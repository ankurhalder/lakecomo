"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { SliderImage } from "@/sanity/lib/getThemesPage";

const SPY_GOLD = "#C9A86C";
const TRANSITION_DURATION = 0.9;
const KEN_BURNS_SCALE = 1.04;
const KEN_BURNS_DURATION = 7.4;

interface ImageSliderProps {
  images?: SliderImage[];
}

// Slide variants — subtle 3D perspective warp on enter/exit
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "5%" : "-5%",
    opacity: 0,
    rotateY: dir > 0 ? -4 : 4,
    scale: 0.98,
  }),
  center: {
    x: "0%",
    opacity: 1,
    rotateY: 0,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-5%" : "5%",
    opacity: 0,
    rotateY: dir > 0 ? 4 : -4,
    scale: 0.98,
  }),
};

export default function ImageSlider({ images = [] }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const innerY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrentIndex(index);
    },
    [],
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goDot = useCallback(
    (i: number) => {
      goTo(i, i >= currentIndex ? 1 : -1);
    },
    [currentIndex, goTo],
  );

  // Touch swipe
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

  if (images.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(320px, 55vh, 560px)",
        backgroundColor: "#0a0a0a",
        perspective: "1400px",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Event photo gallery"
    >
      {/* Gallery label — top left */}
      <div className="absolute top-6 left-8 md:left-14 z-20 flex items-center gap-2.5">
        <div
          className="h-px w-7 flex-shrink-0"
          style={{ backgroundColor: SPY_GOLD }}
        />
        <span
          className="text-[9px] uppercase tracking-[0.55em] font-light"
          style={{ color: SPY_GOLD, opacity: 0.8 }}
        >
          Gallery
        </span>
      </div>

      {/* ── Parallax container ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: innerY, willChange: "transform" }}
      >
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: TRANSITION_DURATION,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              willChange: "transform, opacity",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Ken Burns zoom on inner image layer */}
            <motion.div
              key={`kb-${currentIndex}`}
              className="absolute inset-0"
              initial={{ scale: 1.0 }}
              animate={{ scale: KEN_BURNS_SCALE }}
              transition={{ duration: KEN_BURNS_DURATION, ease: "linear" }}
            >
              {images[currentIndex]?.url && (
                <Image
                  src={images[currentIndex].url}
                  alt={
                    images[currentIndex].alt ||
                    `Spies of Style event photo ${currentIndex + 1}`
                  }
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={currentIndex < 2}
                  draggable={false}
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Gradient overlays ──────────────────────────────────────────────── */}
      {/* Bottom */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 35%, transparent 60%)",
        }}
      />
      {/* Top */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 28%)",
        }}
      />
      {/* Left vignette */}
      <div
        className="absolute inset-y-0 left-0 w-28 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.45), transparent)",
        }}
      />
      {/* Right vignette */}
      <div
        className="absolute inset-y-0 right-0 w-28 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, rgba(0,0,0,0.45), transparent)",
        }}
      />

      {/* ── Caption ────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {images[currentIndex]?.caption && (
          <motion.p
            key={`caption-${currentIndex}`}
            className="absolute bottom-14 left-8 md:left-14 z-20 text-xs md:text-sm italic font-light max-w-xs"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "var(--font-courier)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            {images[currentIndex].caption}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Prev arrow ─────────────────────────────────────────────────────── */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: "rgba(0,0,0,0.50)",
          border: `1px solid ${SPY_GOLD}55`,
          color: SPY_GOLD,
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

      {/* ── Next arrow ─────────────────────────────────────────────────────── */}
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: "rgba(0,0,0,0.50)",
          border: `1px solid ${SPY_GOLD}55`,
          color: SPY_GOLD,
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

      {/* ── Bottom controls: dots + counter ───────────────────────────────── */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex flex-col items-center gap-2">
        {/* Dot pagination */}
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Slide navigation"
        >
          {images.map((_, i) => (
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
                  i === currentIndex ? SPY_GOLD : "rgba(255,255,255,0.28)",
              }}
            />
          ))}
        </div>
        {/* Slide counter */}
        <span
          className="text-[9px] tracking-[0.35em] font-light"
          style={{ color: "rgba(255,255,255,0.32)" }}
        >
          {String(currentIndex + 1).padStart(2, "0")}
          <span style={{ color: SPY_GOLD, opacity: 0.5 }}> / </span>
          {String(images.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
