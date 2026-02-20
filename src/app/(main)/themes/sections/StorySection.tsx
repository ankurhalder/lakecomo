"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface StorySectionProps {
  storySection?: {
    historyTitle?: string;
    historyText?: string;
    bondConnectionTitle?: string;
    bondConnectionText?: string;
    bondConnectionImageUrl?: string | null;
  };
}

const DEFAULTS = {
  historyTitle: "Step Into History on Lake Como",
  historyText:
    "During WWII, British officer Cecil Richard Mallaby parachuted into the hills above Lake Como carrying secret documents, miniature radios, and encrypted messages. Arrested, interrogated, and operating under extreme pressure, Mallaby became a key figure in secret communications between the Italian authorities and Allied command.\n\nStep into Mallaby's world: become the spy, enact daring missions, decode hidden messages, and live the suspense and elegance of espionage — all with Lake Como as your stage.",
  bondConnectionTitle: "The James Bond Connection",
  bondConnectionText:
    "Cecil Richard Mallaby, a fearless British intelligence officer, carried out daring secret missions on Lake Como during WWII — parachuting behind enemy lines, using disguises, and transmitting critical information under pressure. Some historians believe his exploits inspired Ian Fleming when he created James Bond, the world's most iconic spy. At our Spies of Style Dinner Experience, guests step into this thrilling world of espionage, intrigue, and adventure.",
};

function CinematicDivider() {
  return (
    <div className="flex items-center gap-4 my-7 md:my-10">
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2))",
        }}
      />
      <div
        className="w-2 h-2 rotate-45 flex-shrink-0"
        style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
      />
      <div
        className="flex-1 h-px"
        style={{
          background: "linear-gradient(to left, transparent, rgba(255,255,255,0.2))",
        }}
      />
    </div>
  );
}

export default function StorySection({ storySection = {} }: StorySectionProps) {
  const historyTitle = storySection.historyTitle ?? DEFAULTS.historyTitle;
  const historyText = storySection.historyText ?? DEFAULTS.historyText;
  const bondConnectionTitle =
    storySection.bondConnectionTitle ?? DEFAULTS.bondConnectionTitle;
  const bondConnectionText =
    storySection.bondConnectionText ?? DEFAULTS.bondConnectionText;

  const historyParagraphs = historyText
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      className="relative py-10 md:py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
        {/* ── HISTORY BLOCK ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-px w-8 flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.5em] font-light"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              The Story
            </span>
          </div>

          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            {historyTitle}
          </h2>

          <div className="space-y-4 max-w-3xl">
            {historyParagraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                className="text-base md:text-lg leading-[1.85] font-light"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <CinematicDivider />

        {/* ── BOND CONNECTION BLOCK ─────────────────────────────────────── */}
        <div
          className={`grid grid-cols-1 ${storySection.bondConnectionImageUrl ? "lg:grid-cols-2" : ""} gap-8 lg:gap-10 items-center`}
        >
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px w-8 flex-shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.5em] font-light"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                The Inspiration
              </span>
            </div>

            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              {bondConnectionTitle}
            </h2>

            {/* Quote block */}
            <div className="relative pl-7">
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",
                }}
              />
              <span
                className="block text-4xl leading-none mb-1 font-serif"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                &ldquo;
              </span>
              <p
                className="text-base md:text-lg leading-[1.9] italic font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                {bondConnectionText}
              </p>
            </div>
          </motion.div>

          {/* Optional Bond Connection Image */}
          {storySection.bondConnectionImageUrl && (
            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                border: "1px solid var(--border-color)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              }}
            >
              <Image
                src={storySection.bondConnectionImageUrl}
                alt="The James Bond Connection"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                }}
              />
              <div
                className="absolute top-3 left-3 w-6 h-6"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.25)",
                  borderLeft: "1px solid rgba(255,255,255,0.25)",
                }}
              />
              <div
                className="absolute bottom-3 right-3 w-6 h-6"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.25)",
                  borderRight: "1px solid rgba(255,255,255,0.25)",
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
