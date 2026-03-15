"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, RefreshCw } from "lucide-react";
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
    imageUrl,
  } = event;

  const isRecurring = eventType === "recurring_event";
  const dateLabel = isRecurring ? "Every Week" : date ? formatDate(date) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.6)" }}
      className="flex flex-col rounded-sm overflow-hidden border"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
        // transition for the non-Framer properties
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* ── Image (object-contain + black letterbox bg) ── */}
      <div
        className="relative w-full overflow-hidden shrink-0"
        style={{
          aspectRatio: "16 / 9",
          backgroundColor: "#000",
        }}
      >
        {imageUrl ? (
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        ) : (
          // Placeholder when no image is set in CMS
          <div
            className="absolute inset-0 flex items-center justify-center border border-dashed"
            style={{
              borderColor: "var(--border-subtle)",
              color: "var(--text-muted)",
            }}
          >
            <span className="text-xs uppercase tracking-widest">
              Event Image
            </span>
          </div>
        )}

        {/* Subtle bottom fade for smooth transition to card body */}
        {imageUrl && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
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

        {/* CTA button */}
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
      </div>
    </motion.div>
  );
}
