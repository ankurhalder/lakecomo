"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CastImage {
  url: string;
  title?: string;
  role?: string;
}

interface CastCarouselProps {
  images: CastImage[];
}

export default function CastCarousel({ images }: CastCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalImages = images.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 2200);
  }, [totalImages]);

  // Start autoscroll; pause on hover
  useEffect(() => {
    if (isHovering) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovering, startTimer]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      // Reset timer so it doesn't fire immediately after manual nav
      if (!isHovering) startTimer();
    },
    [isHovering, startTimer],
  );

  const nextSlide = useCallback(() => goTo((currentIndex + 1) % totalImages), [currentIndex, totalImages, goTo]);
  const prevSlide = useCallback(() => goTo((currentIndex - 1 + totalImages) % totalImages), [currentIndex, totalImages, goTo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = (diff + totalImages) % totalImages;
    const adjustedDiff =
      normalizedDiff > totalImages / 2
        ? normalizedDiff - totalImages
        : normalizedDiff;

    const rotateY = adjustedDiff * 35;
    const translateZ = adjustedDiff === 0 ? 0 : -150;
    const translateX = adjustedDiff * 240;
    const scale = adjustedDiff === 0 ? 1 : 0.7;
    const opacity =
      Math.abs(adjustedDiff) <= 1 ? (adjustedDiff === 0 ? 1 : 0.6) : 0;
    const zIndex = 10 - Math.abs(adjustedDiff);

    return { rotateY, translateZ, translateX, scale, opacity, zIndex };
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Track hover on the whole carousel viewport */}
      <div
        className="relative w-full h-[170px] sm:h-[210px] md:h-[260px] lg:h-[300px] overflow-hidden"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "white" }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "white" }}
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </motion.button>

        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((image, index) => {
            const style = getCardStyle(index);
            const isVisible = Math.abs(style.zIndex - 10) <= 1;
            if (!isVisible) return null;
            const isCurrent = index === currentIndex;

            return (
              <motion.div
                key={index}
                className="absolute w-[240px] sm:w-[300px] md:w-[380px] lg:w-[460px] aspect-video rounded-xl overflow-hidden shadow-2xl cursor-pointer bg-black"
                style={{ transformStyle: "preserve-3d", zIndex: style.zIndex }}
                animate={{
                  rotateY: style.rotateY,
                  x: style.translateX,
                  z: style.translateZ,
                  scale: style.scale,
                  opacity: style.opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  opacity: { duration: 0 },
                }}
                onClick={() => {
                  if (!isCurrent) goTo(index);
                }}
              >
                <Image
                  src={image.url}
                  alt={image.title || `Cast Member ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 450px, 550px"
                  priority={isCurrent}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {isCurrent && (image.title || image.role) && (
                  <motion.div
                    className="absolute bottom-3 left-3 right-8 text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {image.title && (
                      <h3 className="text-sm md:text-base font-bold text-white drop-shadow-lg">
                        {image.title}
                      </h3>
                    )}
                    {image.role && (
                      <p className="text-xs text-white/75 font-light">
                        {image.role}
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators with gradient */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: index === currentIndex ? "20px" : "6px",
              background:
                index === currentIndex
                  ? "var(--accent-gradient)"
                  : "rgba(255,255,255,0.25)",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
