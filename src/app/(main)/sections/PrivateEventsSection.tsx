"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, MapPin, Wine, Briefcase } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScroll";
import type { LandingPageData } from "@/sanity/lib/getLandingPage";

type FeatureCard = NonNullable<
  LandingPageData["privateEvents"]["features"]
>[number];

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number }>
> = {
  target: Target,
  "map-pin": MapPin,
  martini: Wine,
  briefcase: Briefcase,
};

const DEFAULT_FEATURES: FeatureCard[] = [
  {
    icon: "target",
    text: "Choose your mission: Spy Mission Dinner or Cocktail Party",
  },
  {
    icon: "map-pin",
    text: "Fully tailored for your specific location and guest count",
  },
  {
    icon: "martini",
    text: "Gourmet dining, cocktails, immersive storytelling",
  },
  {
    icon: "briefcase",
    text: "Complete with cinematic backdrops, spy props, and spy kits",
  },
];

const DEFAULT_VIDEOGRAPHY_HIGHLIGHTS: string[] = [
  'Bespoke 5-minute cinematic "movie trailer" of your mission',
  "Custom cast names for each guest and tailored music",
  "Fully produced and delivered within 10 days",
  "Includes short social media clips for sharing",
];

const DEFAULT_PHOTOGRAPHY_HIGHLIGHTS: string[] = [
  "Professional images capturing the drama and elegance",
  "Guests interacting with spy kits, props, and backdrops",
  "Perfect for keepsakes, social media, or personal mementos",
];

export default function PrivateEventsSection({
  data,
}: {
  data: LandingPageData["privateEvents"];
}) {
  const { lenisRef } = useLenis();

  const label = data.label ?? "LAKE COMO EXCLUSIVE";
  const title = data.title ?? "Private Spy Missions";
  const subtitle = data.subtitle ?? "Host Your Bond-Inspired Spy Experience";
  const description =
    data.description ??
    "Bring the thrill of espionage to Lake Como with a fully immersive, cinematic spy experience. Perfect for private villas or pre- and post-wedding celebrations.";
  const features =
    data.features && data.features.length > 0
      ? data.features
      : DEFAULT_FEATURES;
  const ctaText = data.ctaText ?? "DISCOVER HOW IT WORKS";
  const ctaLink = data.ctaLink ?? "#contact";
  const imageUrl = data.imageUrl ?? null;
  const videographyLabel = data.videographyLabel ?? "A TRULY UNIQUE OFFERING";
  const videographyTitle = data.videographyTitle ?? "Photography & Videography";
  const videographySubtitle =
    data.videographySubtitle ??
    "We offer an exclusive cinematic video experience — the only spy event videography of its kind on Lake Como.";
  const videographyHighlights =
    data.videographyHighlights && data.videographyHighlights.length > 0
      ? data.videographyHighlights
      : DEFAULT_VIDEOGRAPHY_HIGHLIGHTS;
  const photographyHighlights =
    data.photographyHighlights && data.photographyHighlights.length > 0
      ? data.photographyHighlights
      : DEFAULT_PHOTOGRAPHY_HIGHLIGHTS;

  const handleCtaClick = () => {
    const hash = ctaLink.startsWith("#") ? ctaLink : ctaLink.replace("/", "");
    const el = document.querySelector(hash);
    if (el) {
      lenisRef.current?.scrollTo(el as HTMLElement, { offset: -48 });
    } else {
      const contact = document.querySelector("#contact");
      if (contact)
        lenisRef.current?.scrollTo(contact as HTMLElement, { offset: -48 });
    }
  };

  return (
    <section
      id="private-events"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          paddingTop: "var(--section-py)",
          paddingBottom: "var(--section-py)",
        }}
      >
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-8"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-xs uppercase tracking-[0.3em] font-light gold-text">
              {label}
            </span>
            <span
              className="h-px w-8"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </div>

          <h2
            className="font-bold"
            style={{
              fontFamily: "var(--font-limelight)",
              fontSize: "var(--fs-h2)",
              color: "var(--text-primary)",
            }}
          >
            {title}
          </h2>

          <p
            className="mt-2 text-sm sm:text-base font-light"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-courier)",
            }}
          >
            {subtitle}
          </p>

          <p
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        </motion.div>

        {/* ── Feature cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {features.map((feat, i) => {
            const IconComponent = ICON_MAP[feat.icon ?? "target"] ?? Target;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center text-center p-5 rounded-sm border gap-3"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full border shrink-0"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--accent)",
                  }}
                >
                  <IconComponent size={18} strokeWidth={1.5} />
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {feat.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-10"
        >
          <button
            onClick={handleCtaClick}
            className="px-8 py-3 text-xs font-bold uppercase tracking-widest rounded-full transition-opacity hover:opacity-90 cursor-pointer"
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
              {ctaText}
            </motion.span>
          </button>
        </motion.div>

        {/* ── Cinematic image ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full overflow-hidden rounded-sm mb-12"
          style={{
            aspectRatio: "16/7",
            backgroundColor: "var(--bg-primary)",
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="A luxury alpine palace beside a calm lake at dusk surrounded by forest"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="text-sm tracking-widest uppercase">
                Venue Image
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Location badge */}
          <div
            className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] font-bold border"
            style={{
              backgroundColor: "rgba(10,10,15,0.85)",
              color: "var(--accent)",
              borderColor: "var(--accent)",
            }}
          >
            TARGET LOCATION: LAKE COMO
          </div>
        </motion.div>

        {/* ── Photo & Video section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-8"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-xs uppercase tracking-[0.3em] font-light gold-text">
              {videographyLabel}
            </span>
            <span
              className="h-px w-8"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </div>

          <h3
            className="font-bold"
            style={{
              fontFamily: "var(--font-limelight)",
              fontSize: "var(--fs-h3)",
              color: "var(--text-primary)",
            }}
          >
            {videographyTitle}
          </h3>

          <p
            className="mt-3 max-w-2xl mx-auto text-sm sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            {videographySubtitle}
          </p>
        </motion.div>

        {/* ── Two-column highlights ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* Videography highlights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="p-6 rounded-sm border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Videography
            </h4>
            <ul className="space-y-3">
              {videographyHighlights.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="mt-[7px] shrink-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Photography highlights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="p-6 rounded-sm border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--accent)" }}
            >
              Photography
            </h4>
            <ul className="space-y-3">
              {photographyHighlights.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="mt-[7px] shrink-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: "var(--silver)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
