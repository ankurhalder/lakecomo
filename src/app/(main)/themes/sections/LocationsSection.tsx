"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import type { LocationData } from "@/sanity/lib/getThemesPage";

interface LocationsSectionProps {
  locationsSection?: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    locations?: LocationData[];
    closingLine?: string;
  };
}

const DEFAULT_LOCATIONS: LocationData[] = [
  {
    name: "Brunate Nights",
    label: "Cinematic Arrival + Full Dinner",
    tagline: "Dramatic arrival. Full immersion.",
    highlights: [
      "Arrive via the iconic funicular from Como — a cinematic entrance.",
      "Locanda Milano 1873 becomes your spy headquarters for the evening.",
      "Full-course dinner with interactive missions and historical storytelling.",
      "Panoramic lake views and elegant decor set the stage.",
    ],
  },
  {
    name: "Cernobbio Nights",
    label: "Intimate Aperitivo Adventure",
    tagline: "Intimate. Elegant. Electrifying.",
    highlights: [
      "Intimate setting with garden and wine cellar experiences.",
      "Aperitivo-style dining with small bites and curated wines.",
      "Missions and storytelling unfold among hidden clues and themed backdrops.",
      "Perfect for a shorter, social, and immersive spy adventure.",
    ],
  },
];

export default function LocationsSection({
  locationsSection = {},
}: LocationsSectionProps) {
  const sectionTitle =
    locationsSection.sectionTitle ?? "Two Locations, One Story";
  const sectionSubtitle =
    locationsSection.sectionSubtitle ??
    "Experience the adventure in two distinct, cinematic locations, each offering its own style and immersive energy:";
  const locations =
    locationsSection.locations && locationsSection.locations.length > 0
      ? locationsSection.locations
      : DEFAULT_LOCATIONS;
  const closingLine =
    locationsSection.closingLine ??
    "One story, two distinct locations — choose your adventure.";

  return (
    <section
      className="relative py-10 md:py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-10 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.2))",
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.5em] font-light"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Choose Your Adventure
            </span>
            <div
              className="h-px w-10 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(255,255,255,0.2))",
              }}
            />
          </div>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {sectionTitle}
          </h2>
          <p
            className="text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.name ?? index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.75,
                delay: index * 0.15,
                ease: "easeOut",
              }}
            >
              <LocationCard location={location} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Closing Line */}
        <motion.div
          className="text-center mt-8 md:mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.15))",
              }}
            />
            <div
              className="w-1.5 h-1.5 rotate-45"
              style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            />
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(255,255,255,0.15))",
              }}
            />
          </div>
          <p
            className="text-sm md:text-base italic font-light tracking-wide"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {closingLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function LocationCard({
  location,
  index,
}: {
  location: LocationData;
  index: number;
}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        border: "1px solid var(--border-color)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Location Image */}
      {location.imageUrl ? (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={location.imageUrl}
            alt={location.name ?? "Location"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)",
            }}
          />
          {location.label && (
            <div className="absolute bottom-4 left-4">
              <span
                className="text-[10px] uppercase tracking-[0.4em] px-3 py-1 rounded-full font-light"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {location.label}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          className="relative w-full aspect-[16/9] flex items-center justify-center"
          style={{
            background:
              index === 0
                ? "linear-gradient(135deg, #0a0a14 0%, #141424 100%)"
                : "linear-gradient(135deg, #0f0c0a 0%, #141414 100%)",
          }}
        >
          {location.label && (
            <span
              className="text-[10px] uppercase tracking-[0.4em] px-3 py-1 rounded-full absolute bottom-4 left-4 font-light"
              style={{
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              {location.label}
            </span>
          )}
        </div>
      )}

      {/* Card Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[10px] uppercase tracking-[0.5em] font-light"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Location {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className="text-2xl md:text-3xl font-bold tracking-tight leading-[1.1] mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {location.name}
        </h3>

        {location.tagline && (
          <p
            className="text-sm italic mb-6 font-light"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {location.tagline}
          </p>
        )}

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.12), transparent)",
          }}
        />

        {/* Highlights */}
        {location.highlights && location.highlights.length > 0 && (
          <ul className="space-y-3 flex-1">
            {location.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <Check size={9} style={{ color: "rgba(255,255,255,0.7)" }} />
                </div>
                <span
                  className="text-sm leading-relaxed font-light"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />
    </div>
  );
}
