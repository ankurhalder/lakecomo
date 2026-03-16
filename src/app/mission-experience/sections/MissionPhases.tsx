"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Lock,
  FileText,
  Users,
  Key,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { MissionPhase } from "@/sanity/lib/getMissionExperiencePage";
import PhaseCarousel from "../components/PhaseCarousel";

const ICON_MAP: Record<string, LucideIcon> = {
  lock: Lock,
  "file-text": FileText,
  users: Users,
  key: Key,
  target: Target,
};

function PhaseIcon({ icon }: { icon?: string }) {
  const IconComponent = icon ? ICON_MAP[icon] : null;
  if (!IconComponent) return null;
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center mb-4 border"
      style={{
        borderColor: "var(--accent)",
        backgroundColor: "rgba(201, 168, 76, 0.08)",
      }}
    >
      <IconComponent size={18} style={{ color: "var(--accent)" }} />
    </div>
  );
}

// ── Each phase row tracks its own scroll for independent parallax ────────────

function PhaseRow({ phase, index }: { phase: MissionPhase; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Image column floats upward against the scroll direction
  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  // Text column slides in from its edge (left for even, right for odd)
  const textX = useTransform(
    scrollYProgress,
    [0, 0.4],
    [isEven ? "-5%" : "5%", "0%"],
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Ghost phase number drifts at a slower rate — decorative depth layer
  const ghostY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const ghostOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 1],
    [0, 0.07, 0.07, 0],
  );

  const paragraphs = phase.description ? phase.description.split("\n\n") : [];

  return (
    <div
      ref={rowRef}
      className={`relative flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center`}
    >
      {/* ── Ghost phase number — parallax depth element ─────────────────── */}
      <motion.span
        className="absolute pointer-events-none select-none font-bold leading-none"
        style={{
          fontFamily: "var(--font-limelight)",
          fontSize: "clamp(6rem, 18vw, 14rem)",
          color: "var(--text-primary)",
          opacity: ghostOpacity,
          y: ghostY,
          left: isEven ? "-0.1em" : "auto",
          right: isEven ? "auto" : "-0.1em",
          top: "50%",
          translateY: "-50%",
          zIndex: 0,
        }}
        aria-hidden
      >
        0{phase.order}
      </motion.span>

      {/* ── Text column ────────────────────────────────────────────────────── */}
      <motion.div
        className="flex-1 min-w-0 relative z-10"
        style={{ x: textX, opacity: textOpacity }}
      >
        {/* Phase label + growing divider line */}
        <div className="flex items-center gap-3 mb-3">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap"
            style={{
              fontFamily: "var(--font-courier)",
              color: "var(--accent)",
            }}
          >
            Phase {phase.order}
          </motion.span>
          <motion.span
            className="h-px block"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            style={{ backgroundColor: "var(--border-color)", minWidth: 0 }}
          />
        </div>

        <PhaseIcon icon={phase.icon} />

        {/* Title: blur-to-clear reveal */}
        <motion.h3
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="font-bold mb-4"
          style={{
            fontFamily: "var(--font-limelight)",
            fontSize: "var(--fs-h3)",
            color: "var(--text-primary)",
          }}
        >
          {phase.title}
        </motion.h3>

        {/* Paragraphs stagger in */}
        {paragraphs.length > 0 && (
          <div className="space-y-3">
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + i * 0.1,
                  ease: "easeOut",
                }}
                className="text-sm sm:text-base leading-relaxed whitespace-pre-line"
                style={{ color: "var(--text-secondary)" }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Image / Carousel column with vertical parallax ─────────────────── */}
      <div className="flex-1 min-w-0 w-full max-w-lg lg:max-w-none relative z-10 overflow-hidden rounded-lg">
        <motion.div style={{ y: imageY }}>
          {phase.imageUrls.length > 0 ? (
            <PhaseCarousel images={phase.imageUrls} />
          ) : (
            <div
              className="w-full aspect-video rounded-lg border flex items-center justify-center"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <div className="text-center px-4">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border"
                  style={{
                    borderColor: "var(--border-color)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  <PhaseIcon icon={phase.icon} />
                </div>
                <p
                  className="text-xs uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: "var(--font-courier)",
                    color: "var(--text-muted)",
                  }}
                >
                  Image pending upload
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ── Section wrapper with its own ambient parallax ────────────────────────────

export default function MissionPhases({ phases }: { phases: MissionPhase[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Faint gold accent glow drifts upward through the section
  const ambientY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* ── Ambient parallax glow ──────────────────────────────────────────── */}
      <motion.div
        className="absolute right-0 top-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          y: ambientY,
          background:
            "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)",
          filter: "blur(60px)",
          translateX: "30%",
        }}
        aria-hidden
      />

      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          paddingTop: "var(--section-py)",
          paddingBottom: "var(--section-py)",
        }}
      >
        {/* ── Section header ────────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.span
              className="h-px block"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 32, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              style={{ backgroundColor: "var(--accent)", minWidth: 0 }}
            />
            <span className="text-xs uppercase tracking-[0.3em] font-light gold-text">
              Operation Phases
            </span>
            <motion.span
              className="h-px block"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 32, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              style={{ backgroundColor: "var(--accent)", minWidth: 0 }}
            />
          </div>
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
            The Mission Unfolds
          </motion.h2>
        </div>

        {/* ── Phase rows ────────────────────────────────────────────────────── */}
        <div className="space-y-24 sm:space-y-28">
          {phases.map((phase, index) => (
            <PhaseRow key={phase.order} phase={phase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
