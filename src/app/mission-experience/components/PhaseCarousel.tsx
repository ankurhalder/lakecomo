"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PhaseCarouselProps {
  images: string[];
  altBase?: string;
}

export default function PhaseCarousel({ images, altBase }: PhaseCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const count = images.length;
  const isSingle = count <= 1;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + count) % count);
  }, [count]);

  // Auto-play every 2 seconds
  useEffect(() => {
    if (isSingle || isPaused) return;
    const interval = setInterval(next, 2000);
    return () => clearInterval(interval);
  }, [isSingle, isPaused, next]);

  if (count === 0) return null;

  return (
    <div
      className="relative w-full aspect-video rounded-lg overflow-hidden"
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => {
        setIsPaused(true);
        setDragStartX(e.touches[0].clientX);
      }}
      onTouchEnd={(e) => {
        const diff = dragStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            next();
          } else {
            prev();
          }
        }
        setIsPaused(false);
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${altBase || "Mission phase"} image ${current + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      {!isSingle && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                background:
                  i === current
                    ? "var(--accent-gradient)"
                    : "rgba(255,255,255,0.3)",
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
