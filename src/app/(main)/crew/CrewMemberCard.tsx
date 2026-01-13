"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Film, Clapperboard, Camera } from "lucide-react";

interface CrewMemberCardProps {
  name: string;
  role: string;
  imageUrl?: string;
  bio: string[];
  index: number;
  isReversed?: boolean;
}

const decorativeIcons = [Film, Clapperboard, Camera];

export default function CrewMemberCard({
  name,
  role,
  imageUrl,
  bio,
  index,
  isReversed = false,
}: CrewMemberCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const IconComponent = decorativeIcons[index % decorativeIcons.length];

  return (
    <motion.article
      ref={ref}
      className="relative py-12 md:py-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none ${isReversed ? "right-8 lg:right-16" : "left-8 lg:left-16"}`}
        initial={{ scale: 0, rotate: -30 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
      >
        <IconComponent
          size={160}
          style={{ color: "var(--text-primary)" }}
          strokeWidth={0.5}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div
          className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center`}
        >
          <motion.div
            className="relative bg-black/5 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] flex-shrink-0 overflow-hidden rounded-xl"
            initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                width={500}
                height={600}
                className="w-full h-auto object-contain max-h-[500px]"
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 360px"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                <span
                  className="text-5xl md:text-6xl font-bold opacity-20"
                  style={{ color: "var(--text-primary)" }}
                >
                  {name.charAt(0)}
                </span>
              </div>
            )}

            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: isReversed
                  ? "linear-gradient(to left, transparent 70%, var(--bg-primary))"
                  : "linear-gradient(to right, transparent 70%, var(--bg-primary))",
              }}
            />
          </motion.div>

          <motion.div
            className={`flex-1 space-y-4 ${isReversed ? "lg:text-right" : ""}`}
            initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div>
              <div
                className={`flex items-center gap-2 mb-2 ${isReversed ? "justify-end" : ""}`}
              >
                <IconComponent size={14} style={{ color: "var(--accent)" }} />
                <span
                  className="text-xs md:text-sm uppercase tracking-[0.3em] font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {role}
                </span>
              </div>

              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1] mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {name}
              </h2>
            </div>

            <div className="space-y-3">
              {bio.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 bottom-0 h-px"
        style={{ backgroundColor: "var(--text-secondary)", opacity: 0.1 }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      />
    </motion.article>
  );
}
