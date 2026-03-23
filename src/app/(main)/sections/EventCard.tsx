"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, RefreshCw, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { EventData } from "@/sanity/lib/getLandingPage";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  // Parse without timezone shift by constructing from parts
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

interface EventCardProps {
  event: EventData;
  index: number;
  onCtaClick: () => void;
}

export default function EventCard({
  event,
  index,
  onCtaClick,
}: EventCardProps) {
  const {
    title,
    badge,
    eventType,
    date,
    time,
    description,
    location,
    ctaLabel,
    ctaUrl,
    imageUrl,
    videoUrl,
  } = event;

  // Lazy loading state
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isRecurring = eventType === "recurring_event";
  const dateLabel = isRecurring ? "Every Week" : date ? formatDate(date) : null;
  const hasVideo = !!videoUrl;
  const hasImage = !!imageUrl;

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (!mediaRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { rootMargin: "100px" },
    );

    observer.observe(mediaRef.current);
    return () => observer.disconnect();
  }, [hasVideo]);

  // Resume video playback when visible
  useEffect(() => {
    if (isVisible && videoLoaded && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked - user interaction required
      });
    }
  }, [isVisible, videoLoaded]);

  // Sync muted state to video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.6)" }}
      className="flex flex-col rounded-sm overflow-hidden border group"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
        // transition for the non-Framer properties
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* ── Media (video or image with object-contain + black letterbox bg) ── */}
      <div
        ref={mediaRef}
        className="relative w-full overflow-hidden shrink-0"
        style={{
          aspectRatio: "16 / 9",
          backgroundColor: "#000",
        }}
      >
        {hasVideo ? (
          // Video rendering with lazy load + cinematic effects
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {isVisible ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedData={() => setVideoLoaded(true)}
                className="w-full h-full object-contain transition-all duration-500 group-hover:brightness-110"
                style={{
                  filter: "brightness(0.9)",
                }}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            ) : (
              // Placeholder while video loads
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: "#000",
                  color: "var(--text-muted)",
                }}
              >
                <span className="text-xs uppercase tracking-widest">
                  Loading...
                </span>
              </div>
            )}
          </motion.div>
        ) : hasImage ? (
          // Image rendering with zoom effect
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={imageUrl}
              alt={title || "Upcoming event on Lake Como"}
              fill
              className="object-contain transition-all duration-500 group-hover:brightness-110"
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                filter: "brightness(0.95)",
              }}
            />
          </motion.div>
        ) : (
          // Placeholder when no media is set in CMS
          <div
            className="absolute inset-0 flex items-center justify-center border border-dashed"
            style={{
              borderColor: "var(--border-subtle)",
              color: "var(--text-muted)",
            }}
          >
            <span className="text-xs uppercase tracking-widest">
              Event Media
            </span>
          </div>
        )}

        {/* Cinematic gradient overlay — fades on hover */}
        {(hasVideo || hasImage) && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
              opacity: 1,
            }}
          />
        )}

        {/* Additional overlay that fades on hover for depth */}
        {(hasVideo || hasImage) && (
          <div className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-500 group-hover:opacity-15" />
        )}

        {/* Mute toggle — only for video cards */}
        {hasVideo && (
          <button
            onClick={toggleMute}
            className="absolute bottom-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border transition-opacity duration-200 opacity-60 hover:opacity-100"
            style={{
              backgroundColor: "rgba(0,0,0,0.55)",
              borderColor: "rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.9)",
            }}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-4">
        {/* Badge + date row */}
        <div className="flex items-center gap-2 flex-wrap">
          {badge && (
            <span
              className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border shrink-0"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              {badge}
            </span>
          )}
          {dateLabel && (
            <span
              className="text-[10px] uppercase tracking-[0.2em] flex items-center gap-1"
              style={{ color: "var(--text-muted)" }}
            >
              {isRecurring ? (
                <RefreshCw size={9} strokeWidth={2} className="shrink-0" />
              ) : null}
              {dateLabel}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="leading-tight"
          style={{
            fontFamily: "var(--font-limelight)",
            fontSize: "var(--fs-h3)",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p
            className="text-sm flex-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        )}

        {/* Divider */}
        <div
          className="h-px"
          style={{ backgroundColor: "var(--divider-color)" }}
        />

        {/* Metadata row — location + time */}
        <div className="flex flex-col gap-1.5">
          {location && (
            <div
              className="flex items-start gap-2 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <MapPin
                size={11}
                strokeWidth={1.5}
                className="shrink-0 mt-[2px]"
              />
              <span>{location}</span>
            </div>
          )}
          {!isRecurring && time && (
            <div
              className="flex items-start gap-2 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <Clock
                size={11}
                strokeWidth={1.5}
                className="shrink-0 mt-[2px]"
              />
              <span>{time}</span>
            </div>
          )}
          {isRecurring && (
            <div
              className="flex items-start gap-2 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <RefreshCw
                size={11}
                strokeWidth={1.5}
                className="shrink-0 mt-[2px]"
              />
              <span>Weekly — contact us for current schedule</span>
            </div>
          )}
        </div>

        {/* CTA button — external link when ctaUrl is set, else scroll to contact */}
        {ctaUrl ? (
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-full px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-full transition-opacity hover:opacity-90 cursor-pointer text-center block"
            style={{
              background: "var(--accent-gradient)",
              color: "var(--accent-text)",
            }}
          >
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="block"
            >
              {ctaLabel ?? "GET TICKETS"}
            </motion.span>
          </a>
        ) : (
          <button
            onClick={onCtaClick}
            className="mt-auto w-full px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-full transition-opacity hover:opacity-90 cursor-pointer"
            style={{
              background: "var(--accent-gradient)",
              color: "var(--accent-text)",
            }}
          >
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="block"
            >
              {ctaLabel ?? "ENQUIRE NOW"}
            </motion.span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
