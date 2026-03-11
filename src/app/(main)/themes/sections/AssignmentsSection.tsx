"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface AssignmentCard {
  title?: string;
  duration?: string;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string | null;
}

interface AssignmentsSectionProps {
  assignmentsSection?: {
    sectionTitle?: string;
    cards?: AssignmentCard[];
  };
}

const DEFAULT_CARDS: AssignmentCard[] = [
  {
    title: "Dinner Mission",
    duration: "3-hour immersive experience",
    features: [
      "Multi-course themed dinner",
      "Full spy kit & historical dossier",
      "Interactive historical mission",
      "Cinematic photo opportunities",
    ],
    ctaText: "Book Dinner Mission",
    ctaLink: "/contact",
  },
  {
    title: "Cocktail Mission",
    duration: "90–120 minute experience",
    features: [
      "Curated cocktails & hors d'oeuvres",
      "Spy kit and tactical briefing",
      "Interactive mission puzzles",
      "Perfect pre-dinner social experience",
    ],
    ctaText: "Book Cocktail Mission",
    ctaLink: "/contact",
  },
];

interface MissionCardProps {
  card: AssignmentCard;
  defaultCard: AssignmentCard;
  index: number;
}

function MissionCard({ card, defaultCard, index }: MissionCardProps) {
  const title = card.title ?? defaultCard.title ?? "";
  const duration = card.duration ?? defaultCard.duration ?? "";
  const features =
    card.features && card.features.length > 0
      ? card.features
      : (defaultCard.features ?? []);
  const ctaText = card.ctaText ?? defaultCard.ctaText ?? "Book Now";
  const ctaLink = card.ctaLink ?? defaultCard.ctaLink ?? "/contact";

  return (
    <motion.div
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{
        y: -6,
        boxShadow:
          "0 28px 64px rgba(0,0,0,0.22), 0 0 0 1px var(--border-color)",
      }}
    >
      {/* Image area */}
      {card.imageUrl ? (
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image
            src={card.imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-contain"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, var(--bg-primary) 100%)",
            }}
          />
        </div>
      ) : (
        <div
          className="relative w-full flex items-center justify-center"
          style={{
            aspectRatio: "16/9",
            backgroundColor: "var(--surface-raised)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.5em] font-light"
            style={{ color: "var(--text-muted)" }}
          >
            Mission Image
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-7 md:p-8">
        {/* Mission number */}
        <span
          className="text-[9px] uppercase tracking-[0.55em] font-light mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          Mission {String(index + 1).padStart(2, "0")}
        </span>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-bold tracking-tight mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>

        {/* Duration */}
        <div
          className="pb-5 mb-5"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <span
            className="text-xs font-light tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            {duration}
          </span>
        </div>

        {/* Features list */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div
                className="w-1 h-1 rounded-full flex-shrink-0 mt-[0.5em]"
                style={{ backgroundColor: "var(--divider-color)" }}
              />
              <span
                className="text-sm font-light leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href={ctaLink} className="block">
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full w-full justify-center cursor-pointer"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-text)",
            }}
          >
            {ctaText}
            <span>→</span>
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function AssignmentsSection({
  assignmentsSection = {},
}: AssignmentsSectionProps) {
  const sectionTitle =
    assignmentsSection.sectionTitle ?? "Choose Your Assignment";
  const cards =
    assignmentsSection.cards && assignmentsSection.cards.length > 0
      ? assignmentsSection.cards
      : DEFAULT_CARDS;

  return (
    <section
      className="relative py-14 md:py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-10 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--divider-color))",
              }}
            />
            <div
              className="w-2 h-2 rotate-45 flex-shrink-0"
              style={{ border: "1px solid var(--border-color)" }}
            />
            <div
              className="h-px w-10 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(to left, transparent, var(--divider-color))",
              }}
            />
          </div>
          <span
            className="text-[10px] uppercase tracking-[0.55em] font-light block mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Your Assignment
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]"
            style={{ color: "var(--text-primary)" }}
          >
            {sectionTitle}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <MissionCard
              key={i}
              card={card}
              defaultCard={DEFAULT_CARDS[i] ?? DEFAULT_CARDS[0]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
