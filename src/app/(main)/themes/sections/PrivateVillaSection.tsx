"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface PrivateVillaSectionProps {
  section?: {
    title?: string;
    description?: string;
    features?: string[];
    ctaText?: string;
    ctaLink?: string;
    imageUrl?: string | null;
  };
}

const DEFAULTS = {
  title: "Private Villa Operations",
  description:
    "Bring the mission to your exclusive Lake Como residence. Ideal for private celebrations, corporate retreats, or destination weddings.",
  features: [
    "Personalized storylines for your group",
    "Optional 3-minute cinematic event trailer",
    "Full immersive setup & professional cast",
  ],
  ctaText: "Inquire About Private Events",
  ctaLink: "/contact",
};

export default function PrivateVillaSection({
  section = {},
}: PrivateVillaSectionProps) {
  const title = section.title ?? DEFAULTS.title;
  const description = section.description ?? DEFAULTS.description;
  const features =
    section.features && section.features.length > 0
      ? section.features
      : DEFAULTS.features;
  const ctaText = section.ctaText ?? DEFAULTS.ctaText;
  const ctaLink = section.ctaLink ?? DEFAULTS.ctaLink;

  return (
    <section
      className="relative py-14 md:py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── LEFT: Image ─────────────────────────────────────────────── */}
          {section.imageUrl ? (
            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden order-2 lg:order-1"
              initial={{ opacity: 0, x: -32, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                border: "1px solid var(--border-color)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
              }}
            >
              <Image
                src={section.imageUrl}
                alt="Private Villa Operations on Lake Como"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-contain"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.32) 0%, transparent 55%)",
                }}
              />
              <div
                className="absolute top-4 left-4 w-7 h-7"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.22)",
                  borderLeft: "1px solid rgba(255,255,255,0.22)",
                }}
              />
              <div
                className="absolute bottom-4 right-4 w-7 h-7"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.22)",
                  borderRight: "1px solid rgba(255,255,255,0.22)",
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              className="relative aspect-[4/5] rounded-2xl hidden lg:flex items-center justify-center order-1"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                border: "1px solid var(--border-subtle)",
                backgroundColor: "var(--surface-raised)",
              }}
            >
              <span
                className="text-[9px] uppercase tracking-[0.5em] font-light"
                style={{ color: "var(--text-muted)" }}
              >
                Villa Image
              </span>
              <div
                className="absolute top-4 left-4 w-7 h-7"
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  borderLeft: "1px solid var(--border-subtle)",
                }}
              />
              <div
                className="absolute bottom-4 right-4 w-7 h-7"
                style={{
                  borderBottom: "1px solid var(--border-subtle)",
                  borderRight: "1px solid var(--border-subtle)",
                }}
              />
            </motion.div>
          )}

          {/* ── RIGHT: Content ──────────────────────────────────────────── */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-px w-8 flex-shrink-0"
                style={{ backgroundColor: "var(--divider-color)" }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.5em] font-light"
                style={{ color: "var(--text-muted)" }}
              >
                Private Experience
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h2>

            {/* Description */}
            <p
              className="text-base leading-[1.9] font-light mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              {description}
            </p>

            {/* Features list */}
            <ul className="space-y-3.5 mb-9">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[0.48em]"
                    style={{ backgroundColor: "var(--divider-color)" }}
                  />
                  <span
                    className="text-sm font-light leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <Link href={ctaLink}>
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full cursor-pointer"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-text)",
                }}
              >
                {ctaText}
                <span style={{ fontSize: "1.1em" }}>→</span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
