"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Step {
  stepNumber: number;
  titleLines: string[];
  tagline: string;
  heading: string;
  body: string;
}

interface FilmStripProps {
  steps: Step[];
}

function FilmRollCard({ step, index }: { step: Step; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [120, 0, 0, -120]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  const sprocketHoles = Array.from({ length: 6 }, (_, i) => i);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="relative w-full max-w-4xl mx-auto my-10 sm:my-12 md:my-16"
    >
      <div
        className="relative overflow-visible"
        style={{
          boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          className="flex justify-around items-center px-4 py-2 sm:py-3"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          {sprocketHoles.map((i) => (
            <div
              key={`top-${i}`}
              className="w-5 h-2.5 sm:w-7 sm:h-3.5 md:w-8 md:h-4 rounded-sm"
              style={{ backgroundColor: "#1a1a1a" }}
            />
          ))}
        </div>

        <div
          className="relative px-5 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10"
          style={{ backgroundColor: "#fafafa" }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
              <span
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none"
                style={{ color: "#1a1a1a" }}
              >
                {String(step.stepNumber).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h2
                  className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide leading-tight"
                  style={{ color: "#1a1a1a" }}
                >
                  {step.titleLines.join(" ")}
                </h2>
                <span
                  className="text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium"
                  style={{ color: "#8b7355" }}
                >
                  {step.tagline}
                </span>
              </div>
            </div>

            <div
              className="border-t pt-4 sm:pt-5"
              style={{ borderColor: "rgba(0,0,0,0.1)" }}
            >
              <h3
                className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3"
                style={{ color: "#2a2a2a" }}
              >
                {step.heading}
              </h3>
              <p
                className="text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line"
                style={{ color: "#555" }}
              >
                {step.body}
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex justify-around items-center px-4 py-2 sm:py-3"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          {sprocketHoles.map((i) => (
            <div
              key={`bottom-${i}`}
              className="w-5 h-2.5 sm:w-7 sm:h-3.5 md:w-8 md:h-4 rounded-sm"
              style={{ backgroundColor: "#1a1a1a" }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FilmStrip({ steps }: FilmStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="film-grain" />

      <div className="max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <FilmRollCard key={step.stepNumber} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
