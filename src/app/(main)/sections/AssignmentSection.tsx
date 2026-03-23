"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLenis } from "@/components/providers/SmoothScroll";
import type { LandingPageData } from "@/sanity/lib/getLandingPage";

type AssignmentCard = NonNullable<
  LandingPageData["assignment"]["cards"]
>[number];

const DEFAULT_CARDS: AssignmentCard[] = [
  {
    title: "Dinner Mission",
    description: undefined,
    duration: "3-hour immersive experience",
    features: [
      "Multi-course themed dinner",
      "Full spy kit & historical dossier",
      "Interactive historical mission",
      "Cinematic photo opportunities",
    ],
    ctaText: "Book Dinner Mission",
    imageUrl: null,
  },
  {
    title: "Cocktail Mission",
    description: undefined,
    duration: "90–120 minute experience",
    features: [
      "Curated cocktails & hors d'oeuvres",
      "Spy kit and tactical briefing",
      "Interactive mission puzzles",
      "Perfect pre-dinner social experience",
    ],
    ctaText: "Book Cocktail Mission",
    imageUrl: null,
  },
];

/** Returns the responsive grid class based on card count */
function getGridClass(count: number): string {
  if (count <= 1) return "grid grid-cols-1 gap-4 lg:gap-6";
  if (count === 2) return "grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6";
  if (count === 3) return "grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6";
  if (count === 4) return "grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6";
  return "grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"; // 5+
}

/** Number of columns at md+ breakpoint for a given count */
function getCols(count: number): number {
  if (count <= 1) return 1;
  if (count <= 3) return count;
  if (count === 4) return 2;
  return 3; // 5+
}

function MissionCard({
  card,
  fallback,
  index,
  onCtaClick,
  compact,
}: {
  card: AssignmentCard;
  fallback: AssignmentCard;
  index: number;
  onCtaClick: () => void;
  compact: boolean;
}) {
  const title = card.title || fallback.title;
  const description = card.description ?? fallback.description;
  const duration = card.duration || fallback.duration;
  const features = card.features?.length
    ? card.features
    : (fallback.features ?? []);
  const ctaText = card.ctaText || fallback.ctaText || "Book Now";
  const imageUrl = card.imageUrl ?? null;

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
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Image */}
      <div
        className={`relative w-full overflow-hidden ${compact ? "h-[100px]" : "h-[120px] sm:h-[150px]"}`}
        style={{ backgroundColor: "var(--surface-raised)" }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title || "Mission"}
            fill
            className="object-cover object-top"
            sizes={
              compact
                ? "(max-width: 768px) 100vw, 33vw"
                : "(max-width: 768px) 100vw, 50vw"
            }
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="text-sm tracking-widest uppercase">
              Mission Image
            </span>
          </div>
        )}
        {imageUrl && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 gap-4 ${compact ? "p-4" : "p-5 sm:p-6"}`}>
        <div>
          <p
            className="text-xs uppercase tracking-[0.25em] mb-1 font-light"
            style={{ color: "var(--accent)" }}
          >
            Mission {String(index + 1).padStart(2, "0")}
          </p>
          <h3
            className={`font-bold leading-tight ${compact ? "text-lg" : "text-xl sm:text-2xl"}`}
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h3>
        </div>

        {description && (
          <p
            className={`italic ${compact ? "text-xs" : "text-sm"}`}
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        )}

        <div
          className="h-px"
          style={{ backgroundColor: "var(--divider-color)" }}
        />

        {duration && (
          <p
            className={compact ? "text-xs" : "text-xs sm:text-sm"}
            style={{ color: "var(--text-muted)" }}
          >
            {duration}
          </p>
        )}

        {features.length > 0 && (
          <ul className="space-y-2 flex-1">
            {features.map((feat, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="mt-[7px] shrink-0 w-1 h-1 rounded-full"
                  style={{ backgroundColor: "var(--silver)" }}
                />
                {feat}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onCtaClick}
          className="mt-2 w-full px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-full transition-opacity hover:opacity-90"
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
      </div>
    </motion.div>
  );
}

export default function AssignmentSection({
  data,
}: {
  data: LandingPageData["assignment"];
}) {
  const { sectionTitle, cards } = data;
  const { lenisRef } = useLenis();

  const displayCards = cards && cards.length > 0 ? cards : DEFAULT_CARDS;
  const count = displayCards.length;
  const cols = getCols(count);
  const compact = cols >= 3;

  // Split into full rows + an incomplete last row (needs centering)
  const remainder = count % cols;
  const fullRowItems = remainder ? displayCards.slice(0, -remainder) : displayCards;
  const lastRowItems = remainder ? displayCards.slice(-remainder) : [];

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      lenisRef.current?.scrollTo(el as HTMLElement, { offset: -48 });
    }
  };

  return (
    <section id="assignment" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          paddingTop: "var(--section-py)",
          paddingBottom: "var(--section-py)",
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-8"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-xs uppercase tracking-[0.3em] font-light gold-text">
              Your Assignment
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
            {sectionTitle}
          </h2>
        </motion.div>

        {/* Cards grid — full rows */}
        <div className={getGridClass(count)}>
          {fullRowItems.map((card, i) => (
            <MissionCard
              key={i}
              card={card}
              fallback={DEFAULT_CARDS[i] || DEFAULT_CARDS[0]}
              index={i}
              onCtaClick={scrollToContact}
              compact={compact}
            />
          ))}
        </div>

        {/* Centered last row (only when last row is incomplete) */}
        {lastRowItems.length > 0 && (
          <div className="flex justify-center gap-4 lg:gap-6 mt-4 lg:mt-6 flex-wrap">
            {lastRowItems.map((card, i) => {
              const globalIndex = fullRowItems.length + i;
              return (
                <div
                  key={globalIndex}
                  className="w-full md:w-[calc(33.333%-1rem)]"
                >
                  <MissionCard
                    card={card}
                    fallback={DEFAULT_CARDS[globalIndex] || DEFAULT_CARDS[0]}
                    index={globalIndex}
                    onCtaClick={scrollToContact}
                    compact={compact}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
