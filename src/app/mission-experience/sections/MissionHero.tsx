"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MissionExperiencePageData } from "@/sanity/lib/getMissionExperiencePage";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  }),
};

export default function MissionHero({
  data,
}: {
  data: MissionExperiencePageData["hero"];
}) {
  const { title, subtitle, backgroundImageUrl, backgroundVideoUrl } = data;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background drifts up at ~40% of scroll speed — classic parallax depth
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  // Text block fades out and floats upward as the hero leaves viewport
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-14%"]);

  // Overlay deepens slightly on scroll for a "receding into darkness" feel
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.82]);

  const videoSrc = backgroundVideoUrl
    ? backgroundVideoUrl.includes("#")
      ? backgroundVideoUrl
      : `${backgroundVideoUrl}#t=0.001`
    : undefined;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80dvh] flex items-center justify-center overflow-hidden"
    >
      {/* ── Parallax background layer (scales up slightly so edges never show) ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: 1.15 }}
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={backgroundImageUrl || undefined}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : backgroundImageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, var(--bg-primary) 0%, #1a1a2e 50%, var(--bg-primary) 100%)",
            }}
          />
        )}
      </motion.div>

      {/* ── Cinematic overlay deepens on scroll ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/50 to-black/80"
        style={{ opacity: overlayOpacity }}
      />

      {/* ── Content — fades and lifts away as hero scrolls out ──────────────── */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto pt-20"
        style={{ opacity: textOpacity, y: textY }}
      >
        <motion.div
          custom={0.3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="inline-block -rotate-1 mb-6"
        >
          <div
            className="border-2 px-5 py-2"
            style={{
              borderColor: "rgba(255,255,255,0.55)",
              boxShadow:
                "0 0 0 4px rgba(255,255,255,0.05), inset 0 0 12px rgba(255,255,255,0.03)",
            }}
          >
            <p
              className="text-[9px] sm:text-[10px] uppercase font-bold text-center"
              style={{
                fontFamily: "var(--font-courier)",
                color: "rgba(255,255,255,0.8)",
                letterSpacing: "5px",
              }}
            >
              Mission Briefing
            </p>
          </div>
        </motion.div>

        <motion.h1
          custom={0.5}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-bold text-white leading-[1.15] tracking-tight mb-4 drop-shadow-2xl"
          style={{
            fontSize: "var(--fs-hero)",
            fontFamily: "var(--font-limelight)",
          }}
        >
          {title}
        </motion.h1>

        <motion.p
          custom={0.7}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-sm sm:text-base md:text-lg font-light tracking-wide italic drop-shadow-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border mx-auto flex items-start justify-center pt-1.5"
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
          >
            <div
              className="w-1 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
