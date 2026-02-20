"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PropsSectionProps {
  propsSection?: {
    title?: string;
    highlights?: string[];
    quote?: string;
    backgroundImageUrl?: string | null;
  };
}

const DEFAULTS = {
  title: "Props, Spy Kits & Photo Ops",
  highlights: [
    "Every guest receives a custom spy kit to unlock missions and solve secret codes.",
    "Themed props and dramatic backdrops create Instagram-ready photo moments.",
    "Explore hidden clues, enact spy missions, and immerse yourself in the role of a WWII operative.",
  ],
  quote:
    "Decode messages, uncover secrets, and become the spy you've always wanted to be — all while enjoying the elegance and beauty of Lake Como.",
};

export default function PropsSection({ propsSection = {} }: PropsSectionProps) {
  const title = propsSection.title ?? DEFAULTS.title;
  const highlights =
    propsSection.highlights && propsSection.highlights.length > 0
      ? propsSection.highlights
      : DEFAULTS.highlights;
  const quote = propsSection.quote ?? DEFAULTS.quote;

  return (
    <section className="relative py-10 md:py-14 lg:py-20 overflow-hidden">
      {/* Background */}
      {propsSection.backgroundImageUrl ? (
        <>
          <Image
            src={propsSection.backgroundImageUrl}
            alt="Props and Spy Kits"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.82)" }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--bg-primary)" }}
        />
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
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
            <div
              className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            />
            <div
              className="h-px w-10 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(255,255,255,0.2))",
              }}
            />
          </div>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1]"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h2>
        </motion.div>

        {/* Feature Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl p-6 md:p-7 text-center"
              style={{
                border: "1px solid var(--border-color)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              {/* Number */}
              <div
                className="text-4xl font-bold mb-4 leading-none"
                style={{ color: "rgba(255,255,255,0.12)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <p
                className="text-sm md:text-base leading-relaxed font-light"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {highlight}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote Callout */}
        <motion.div
          className="relative max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="h-px w-20 mx-auto mb-6"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          />
          <blockquote>
            <span
              className="block text-5xl leading-none font-serif mb-2"
              style={{ color: "rgba(255,255,255,0.15)" }}
            >
              &ldquo;
            </span>
            <p
              className="text-base md:text-xl leading-[1.9] italic font-light"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {quote}
            </p>
          </blockquote>
          <div
            className="h-px w-20 mx-auto mt-6"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
