"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useLenis } from "@/components/providers/SmoothScroll";
import type { LandingPageData } from "@/sanity/lib/getLandingPage";

const SIMULATE_AUTOPLAY_FAIL = false;

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" as const },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 1.2, ease: "easeOut" as const },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 25px 50px -12px rgba(201, 168, 76, 0.4)",
    transition: { type: "spring" as const, stiffness: 400 },
  },
  tap: { scale: 0.95 },
};

/** Wraps a specific word in a gold-gradient span */
function renderGoldWord(text: string, word: string) {
  const parts = text.split(new RegExp(`(\\b${word}\\b)`, "g"));
  return parts.map((part, i) =>
    part === word ? (
      <span key={i} className="gold-text">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function HeroSection({
  data,
}: {
  data: LandingPageData["hero"];
}) {
  const { lenisRef } = useLenis();
  const {
    preHeading,
    mainHeading,
    subHeading,
    playIndicatorText,
    videoUrl,
    mobileVideoUrl,
    posterImageUrl,
  } = data;

  const [isMobile, setIsMobile] = useState(false);
  const [showPlayIndicator, setShowPlayIndicator] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const hasPlayedRef = useRef(false);
  const playCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeVideoUrl = useMemo(() => {
    const url = isMobile && mobileVideoUrl ? mobileVideoUrl : videoUrl;
    if (!url) return undefined;
    return url.includes("#") ? url : `${url}#t=0.001`;
  }, [isMobile, mobileVideoUrl, videoUrl]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const forcePlay = async () => {
      if (hasPlayedRef.current) return true;
      try {
        video.muted = true;
        await video.play();
        hasPlayedRef.current = true;
        return true;
      } catch {
        return false;
      }
    };

    const handlePlaying = () => {
      hasPlayedRef.current = true;
    };

    video.addEventListener("playing", handlePlaying);

    playCheckTimeoutRef.current = setTimeout(() => {
      if (SIMULATE_AUTOPLAY_FAIL || (!hasPlayedRef.current && video.paused)) {
        setShowPlayIndicator(true);
      }
    }, 1000);

    const handleInteraction = () => {
      if (!hasPlayedRef.current) forcePlay();
    };

    const docEvents = [
      "touchstart",
      "touchend",
      "click",
      "mousedown",
      "pointerdown",
    ];
    docEvents.forEach((event) => {
      document.addEventListener(event, handleInteraction, {
        once: true,
        passive: true,
        capture: true,
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) forcePlay();
        });
      },
      { threshold: [0.1, 0.5] },
    );

    const videoEvents = [
      "loadeddata",
      "loadedmetadata",
      "canplay",
      "canplaythrough",
    ];
    videoEvents.forEach((event) => {
      video.addEventListener(event, () => forcePlay());
    });

    forcePlay();
    observer.observe(video);

    return () => {
      if (playCheckTimeoutRef.current)
        clearTimeout(playCheckTimeoutRef.current);
      observer.disconnect();
      video.removeEventListener("playing", handlePlaying);
    };
  }, [activeVideoUrl]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      videoRef.current.muted = !isMuted;
    }
    setIsMuted((prev) => !prev);
    setShowPlayIndicator(false);
    setUserInteracted(true);
  };

  const scrollToStory = () => {
    const el = document.querySelector("#story");
    if (el) {
      lenisRef.current?.scrollTo(el as HTMLElement, { offset: -48 });
    } else {
      document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToEvents = () => {
    const el = document.querySelector("#upcoming-events");
    if (el) {
      lenisRef.current?.scrollTo(el as HTMLElement, { offset: -48 });
    }
  };

  return (
    <div
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-y-auto overflow-x-hidden bg-black font-sans flex flex-col"
    >
      {activeVideoUrl && (
        <video
          ref={videoRef}
          key={activeVideoUrl}
          src={activeVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterImageUrl || undefined}
          className="absolute inset-0 w-full h-full object-contain z-0 bg-black"
          style={{ objectFit: "contain" }}
        />
      )}

      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/90 via-transparent to-black/90 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Mobile Layout */}
      <div className="md:hidden relative z-10 flex flex-col justify-between min-h-[100dvh] py-8 px-4">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center text-center bg-gradient-to-b from-black via-black/95 to-transparent pt-8 pb-12"
        >
          <motion.div
            custom={0.3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="inline-block -rotate-2 mb-3"
          >
            <div
              className="border-2 px-4 py-1.5"
              style={{
                borderColor: "rgba(255,255,255,0.55)",
                boxShadow:
                  "0 0 0 4px rgba(255,255,255,0.05), inset 0 0 12px rgba(255,255,255,0.03)",
              }}
            >
              <p
                className="text-[9px] uppercase font-bold text-center"
                style={{
                  fontFamily: "var(--font-courier)",
                  color: "rgba(255,255,255,0.8)",
                  letterSpacing: "5px",
                }}
              >
                {preHeading}
              </p>
            </div>
          </motion.div>
          <motion.h1
            custom={0.5}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-bold text-white leading-[1.15] tracking-tight mb-2 drop-shadow-2xl px-2"
            style={{
              fontSize: "var(--fs-hero)",
              fontFamily: "var(--font-limelight)",
            }}
          >
            {renderGoldWord(mainHeading ?? "", "Spy")}
          </motion.h1>
          <motion.p
            custom={0.7}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-white text-sm sm:text-base font-light tracking-wide italic drop-shadow-lg"
          >
            {subHeading}
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-2.5 items-center w-full max-w-xs mx-auto pb-12">
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToStory}
            className="w-full px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg"
            style={{
              background: "var(--accent-gradient)",
              color: "var(--accent-text)",
            }}
          >
            Discover the Mission
          </motion.button>
          <button
            onClick={scrollToEvents}
            className="w-full px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full border"
            style={{
              borderColor: "var(--accent)",
              color: "var(--text-primary)",
            }}
          >
            Browse Events
          </button>
          <Link
            href="/mission-experience"
            className="w-full text-center px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full border"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            Mission Experience
          </Link>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:flex relative z-10 flex-1 md:grid md:grid-cols-1 lg:grid-cols-2 overflow-visible">
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-8 pb-8 md:py-12 px-4 md:px-8 lg:px-12 xl:pl-12 max-w-3xl mx-auto lg:mx-0 gap-1 sm:gap-2">
          <motion.div className="flex flex-col items-center lg:items-start w-full">
            <motion.div
              custom={0.3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="inline-block -rotate-2 mb-4"
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
                  className="text-[10px] uppercase font-bold text-center"
                  style={{
                    fontFamily: "var(--font-courier)",
                    color: "rgba(255,255,255,0.8)",
                    letterSpacing: "5px",
                  }}
                >
                  {preHeading}
                </p>
              </div>
            </motion.div>
            <motion.h1
              custom={0.5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-bold text-white leading-[1.15] tracking-tight mb-3 drop-shadow-2xl"
              style={{
                fontSize: "var(--fs-hero)",
                fontFamily: "var(--font-limelight)",
              }}
            >
              {renderGoldWord(mainHeading ?? "", "Spy")}
            </motion.h1>
            <motion.p
              custom={0.7}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-white text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-light tracking-wide mb-6 italic drop-shadow-lg"
            >
              {subHeading}
            </motion.p>
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={scrollToStory}
              className="px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg"
              style={{
                background: "var(--accent-gradient)",
                color: "var(--accent-text)",
              }}
            >
              Discover the Mission
            </motion.button>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <button
                onClick={scrollToEvents}
                className="px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full border"
                style={{
                  borderColor: "var(--accent)",
                  color: "var(--text-primary)",
                }}
              >
                Browse Events
              </button>
              <Link
                href="/mission-experience"
                className="px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full border"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-secondary)",
                }}
              >
                Mission Experience
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mute toggle */}
      <div className="fixed bottom-8 md:bottom-10 right-4 md:right-6 z-50">
        <AnimatePresence>
          {showPlayIndicator && !userInteracted && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                animate={{ scale: [1, 1.7, 1.7], opacity: [0.3, 0, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                animate={{ scale: [1, 2.2, 2.2], opacity: [0.18, 0, 0.18] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.3,
                }}
              />
              <motion.div
                className="absolute -left-2 -translate-x-full top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full shadow-lg"
                style={{
                  backgroundColor: "rgba(255,255,255,0.93)",
                  color: "#0a0a0f",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2 }}
              >
                {playIndicatorText || "Tap to see the magic"}
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: showPlayIndicator && !userInteracted ? [1, 1.1, 1] : 1,
          }}
          transition={{
            opacity: { delay: 0.5 },
            scale:
              showPlayIndicator && !userInteracted
                ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                : { type: "spring", stiffness: 200 },
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSound}
          className="relative w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md border flex items-center justify-center"
          style={{
            backgroundColor:
              showPlayIndicator && !userInteracted
                ? "rgba(255,255,255,0.18)"
                : "rgba(255,255,255,0.1)",
            borderColor:
              showPlayIndicator && !userInteracted
                ? "rgba(255,255,255,0.55)"
                : "rgba(255,255,255,0.25)",
            color: "rgba(255,255,255,0.9)",
          }}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          <motion.div
            key={isMuted ? "muted" : "unmuted"}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring" as const, stiffness: 300 }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
