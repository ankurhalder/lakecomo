"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface RealLifeSectionProps {
  section?: {
    heading?: string;
    paragraph1?: string;
    paragraph2?: string;
    bullets?: string[];
    imageUrl?: string | null;
  };
}

const DEFAULTS = {
  heading: "The Real-Life 007",
  paragraph1:
    "During World War II, intelligence operative Cecile Mallory arrived secretly in Cernobbio on Lake Como carrying a critical Allied mission. Her audacious operations, coded messages, and elegant style remain part of the region's wartime history.",
  paragraph2:
    "Historians believe Mallory's daring missions and sophistication inspired elements of Ian Fleming's James Bond, from secret communications to high-stakes espionage in glamorous locations.",
  bullets: [
    "Solve the type of codes used by Mallory",
    "Experience the suspense and strategy of a true spy mission",
    "Collaborate with teams in a cinematic setting",
    "Walk in the footsteps of the spy who inspired James Bond",
  ],
};

export default function RealLifeSection({
  section = {},
}: RealLifeSectionProps) {
  const heading = section.heading ?? DEFAULTS.heading;
  const paragraph1 = section.paragraph1 ?? DEFAULTS.paragraph1;
  const paragraph2 = section.paragraph2 ?? DEFAULTS.paragraph2;
  const bullets =
    section.bullets && section.bullets.length > 0
      ? section.bullets
      : DEFAULTS.bullets;

  return (
    <section
      className="relative py-14 md:py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── LEFT: Text content ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
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
                The Inspiration
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] mb-7"
              style={{ color: "var(--text-primary)" }}
            >
              {heading}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 mb-8">
              <motion.p
                className="text-base leading-[1.9] font-light"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              >
                {paragraph1}
              </motion.p>
              <motion.p
                className="text-base leading-[1.9] font-light"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
              >
                {paragraph2}
              </motion.p>
            </div>

            {/* Bullet list */}
            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[0.48em]"
                    style={{ backgroundColor: "var(--divider-color)" }}
                  />
                  <span
                    className="text-sm font-light leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── RIGHT: Historical image ──────────────────────────────────── */}
          {section.imageUrl ? (
            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                border: "1px solid var(--border-color)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
              }}
            >
              <Image
                src={section.imageUrl}
                alt="The Real-Life 007 — Cecil Richard Mallaby"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
                }}
              />
              {/* Cinematic frame corners */}
              <div
                className="absolute top-4 left-4 w-7 h-7"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.22)",
                  borderLeft: "1px solid rgba(255,255,255,0.22)",
                }}
              />
              <div
                className="absolute top-4 right-4 w-7 h-7"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.22)",
                  borderRight: "1px solid rgba(255,255,255,0.22)",
                }}
              />
              <div
                className="absolute bottom-4 left-4 w-7 h-7"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.22)",
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
            /* Decorative frame placeholder when no image uploaded */
            <motion.div
              className="relative aspect-[4/5] rounded-2xl hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 32 }}
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
                Historical image
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
        </div>
      </div>
    </section>
  );
}
