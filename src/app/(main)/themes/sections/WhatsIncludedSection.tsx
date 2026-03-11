"use client";

import { motion } from "framer-motion";

interface WhatsIncludedSectionProps {
  section?: {
    title?: string;
    items?: string[];
  };
}

const DEFAULTS = {
  title: "What's Included",
  items: [
    "Custom spy kit for every guest",
    "Historic codes and mission dossiers",
    "Multi-course dinner or curated cocktail service",
    "Cinematic photo opportunities",
    "Optional cinematic trailer for private events",
  ],
};

export default function WhatsIncludedSection({
  section = {},
}: WhatsIncludedSectionProps) {
  const title = section.title ?? DEFAULTS.title;
  const items =
    section.items && section.items.length > 0 ? section.items : DEFAULTS.items;

  return (
    <section
      className="relative py-14 md:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--divider-color), transparent)",
        }}
      />

      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.55em] font-light block mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Every Mission Includes
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.08] mb-12"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h2>
        </motion.div>

        {/* Items list */}
        <ul className="space-y-4">
          {items.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-center gap-4 text-left"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.08,
                ease: "easeOut",
              }}
            >
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--divider-color)" }}
                />
              </div>
              <span
                className="text-sm md:text-base font-light leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--divider-color), transparent)",
        }}
      />
    </section>
  );
}
