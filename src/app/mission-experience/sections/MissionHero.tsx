"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = backgroundVideoUrl
    ? backgroundVideoUrl.includes("#")
      ? backgroundVideoUrl
      : `${backgroundVideoUrl}#t=0.001`
    : undefined;

  return (
    <section className="relative w-full min-h-[80dvh] flex items-center justify-center overflow-hidden">
      {/* Background: Video or Image */}
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={backgroundImageUrl || undefined}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : backgroundImageUrl ? (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      ) : (
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, var(--bg-primary) 0%, #1a1a2e 50%, var(--bg-primary) 100%)",
          }}
        />
      )}

      {/* Cinematic overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/50 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto pt-20">
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
      </div>
    </section>
  );
}
