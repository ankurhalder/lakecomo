"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { LandingPageData } from "@/sanity/lib/getLandingPage";

const DEFAULTS = {
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

/** Wraps the first letter of each target word with a gold gradient span */
function renderInitialGold(text: string, words: string[]) {
  const regex = new RegExp(`(\\b(?:${words.join("|")})\\b)`, "g");
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (words.includes(part)) {
      return (
        <span key={i}>
          <span className="gold-text">{part[0]}</span>
          {part.slice(1)}
        </span>
      );
    }
    return part;
  });
}

export default function StorySection({
  data,
}: {
  data: LandingPageData["story"];
}) {
  const { blinkingLabel, headline, subheadline, real007 } = data;
  const { heading, paragraph1, paragraph2, bullets, imageUrl } = real007;

  return (
    <section id="story" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* ── Intro ─────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 lg:pt-14 lg:pb-10 text-center">
        {blinkingLabel && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span
              className="h-px w-8 block"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span
              className="text-xs uppercase tracking-[0.3em] font-light animate-pulse gold-text"
            >
              {blinkingLabel}
            </span>
            <span
              className="h-px w-8 block"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-bold mb-4 leading-tight"
          style={{
            fontFamily: "var(--font-limelight)",
            fontSize: "var(--fs-hero)",
            color: "var(--text-primary)",
          }}
        >
          {renderInitialGold(headline ?? "", ["Spies", "Style", "Spy"])}
        </motion.h2>

        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {subheadline}
          </motion.p>
        )}
      </div>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div
        className="h-px max-w-5xl mx-auto mx-4 sm:mx-6 lg:mx-auto"
        style={{ backgroundColor: "var(--divider-color)" }}
      />

      {/* ── Real-Life 007 ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "var(--section-py)", paddingBottom: "var(--section-py)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px flex-1 max-w-[40px]"
                style={{ backgroundColor: "var(--silver-muted)" }}
              />
              <span
                className="text-xs uppercase tracking-[0.25em] font-light gold-text"
              >
                The Inspiration
              </span>
            </div>

            <h3
              className="font-bold leading-tight"
              style={{ fontFamily: "var(--font-limelight)", fontSize: "var(--fs-h2)", color: "var(--text-primary)" }}
            >
              {heading}
            </h3>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {paragraph1 || DEFAULTS.paragraph1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.18, ease: "easeOut" }}
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {paragraph2 || DEFAULTS.paragraph2}
            </motion.p>

            {(bullets?.length ? bullets : DEFAULTS.bullets).length > 0 && (
              <motion.ul
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-2 pt-2"
              >
                {(bullets?.length ? bullets : DEFAULTS.bullets).map(
                  (bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                      {bullet}
                    </motion.li>
                  ),
                )}
              </motion.ul>
            )}
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative block max-w-[340px] mx-auto lg:max-w-none"
          >
            {imageUrl ? (
              <div className="relative w-full rounded-sm overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={heading || "The Real-Life 007"}
                  width={700}
                  height={700}
                  className="object-cover w-full h-auto block"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Cinematic corner frames */}
                <span
                  className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2"
                  style={{ borderColor: "rgba(255,255,255,0.45)" }}
                />
                <span
                  className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2"
                  style={{ borderColor: "rgba(255,255,255,0.45)" }}
                />
                <span
                  className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2"
                  style={{ borderColor: "rgba(255,255,255,0.45)" }}
                />
                <span
                  className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2"
                  style={{ borderColor: "rgba(255,255,255,0.45)" }}
                />
              </div>
            ) : (
              <div
                className="relative w-full rounded-sm flex flex-col items-center justify-center gap-3"
                style={{
                  aspectRatio: "4/5",
                  background:
                    "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 100%)",
                  border: "1px solid rgba(201,168,76,0.25)",
                }}
              >
                <span
                  style={{ color: "var(--accent)" }}
                  className="text-[10px] uppercase tracking-[0.3em] font-light"
                >
                  Classified
                </span>
                <span
                  style={{ color: "var(--text-muted)" }}
                  className="text-xs"
                >
                  Image Pending
                </span>
                <span
                  className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2"
                  style={{ borderColor: "rgba(201,168,76,0.35)" }}
                />
                <span
                  className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2"
                  style={{ borderColor: "rgba(201,168,76,0.35)" }}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
