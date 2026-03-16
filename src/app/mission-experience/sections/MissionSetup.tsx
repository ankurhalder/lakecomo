"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MissionExperiencePageData } from "@/sanity/lib/getMissionExperiencePage";

export default function MissionSetup({
  data,
}: {
  data: MissionExperiencePageData["setup"];
}) {
  const { title, description } = data;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Decorative radial glow drifts upward as section passes through viewport
  const glowY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const paragraphs = description ? description.split("\n\n") : [];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* ── Ambient glow that parallax-drifts through the section ──────────── */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          y: glowY,
          background:
            "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <div
        className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          paddingTop: "var(--section-py)",
          paddingBottom: "var(--section-py)",
        }}
      >
        {/* ── Header — eyebrow lines grow in, heading blurs clear ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* Left line grows from 0 */}
            <motion.span
              className="h-px block"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 32, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              style={{ backgroundColor: "var(--accent)", minWidth: 0 }}
            />
            <span className="text-xs uppercase tracking-[0.3em] font-light gold-text">
              Intelligence Report
            </span>
            {/* Right line grows from 0 */}
            <motion.span
              className="h-px block"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 32, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              style={{ backgroundColor: "var(--accent)", minWidth: 0 }}
            />
          </div>

          {/* Heading emerges through a blur — like a classified doc loading */}
          <motion.h2
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
            className="font-bold"
            style={{
              fontFamily: "var(--font-limelight)",
              fontSize: "var(--fs-h2)",
              color: "var(--text-primary)",
            }}
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* ── Paragraphs stagger in one by one ────────────────────────────── */}
        {paragraphs.length > 0 && (
          <div>
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: 0.1 + i * 0.12,
                  ease: "easeOut",
                }}
                className="text-sm sm:text-base leading-relaxed mb-4 last:mb-0"
                style={{ color: "var(--text-secondary)" }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
