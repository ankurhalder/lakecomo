"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Shirt,
  Calendar,
  MapPin,
  Info,
  type LucideIcon,
} from "lucide-react";
import type { LogisticsDetail } from "@/sanity/lib/getThemesPage";

const SPY_GOLD = "#C9A86C";

interface LogisticsSectionProps {
  logisticsSection?: {
    title?: string;
    details?: LogisticsDetail[];
  };
}

const DEFAULTS = {
  title: "Details & Logistics",
  details: [
    {
      label: "Duration",
      value: "Brunate (full dinner) 3 hours | Cernobbio (aperitivo) 2 hours",
      icon: "Clock",
    },
    {
      label: "Group Size",
      value: "Small, intimate groups for personalized immersion",
      icon: "Users",
    },
    {
      label: "Dress Code",
      value: "Elegant, spy-inspired attire encouraged",
      icon: "Shirt",
    },
    {
      label: "Booking",
      value:
        "Private or semi-private dates available; choose your location based on mood and availability",
      icon: "Calendar",
    },
  ] as LogisticsDetail[],
};

const iconMap: Record<string, LucideIcon> = {
  Clock,
  Users,
  Shirt,
  Calendar,
  MapPin,
  Info,
};

function getIcon(name?: string): LucideIcon {
  if (!name) return Info;
  const key = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return iconMap[key] ?? iconMap[name] ?? Info;
}

export default function LogisticsSection({
  logisticsSection = {},
}: LogisticsSectionProps) {
  const title = logisticsSection.title ?? DEFAULTS.title;
  const details =
    logisticsSection.details && logisticsSection.details.length > 0
      ? logisticsSection.details
      : DEFAULTS.details;

  return (
    <section
      className="relative py-10 md:py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${SPY_GOLD}05 0%, transparent 70%)`,
        }}
      />

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
                background: `linear-gradient(to right, transparent, ${SPY_GOLD})`,
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.5em] font-light"
              style={{ color: SPY_GOLD }}
            >
              Know Before You Go
            </span>
            <div
              className="h-px w-10 flex-shrink-0"
              style={{
                background: `linear-gradient(to left, transparent, ${SPY_GOLD})`,
              }}
            />
          </div>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-limelight)",
            }}
          >
            {title}
          </h2>
        </motion.div>

        {/* Details Grid — 2 columns on tablet/desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {details.map((detail, index) => {
            const IconComponent = getIcon(detail.icon);
            const isLastRow =
              index >= details.length - (details.length % 2 === 0 ? 2 : 1);
            const isRightCol = index % 2 !== 0;

            return (
              <motion.div
                key={detail.label ?? index}
                className={`relative flex items-start gap-5 py-7 px-6 md:px-8 ${
                  isRightCol ? "md:border-l" : ""
                } ${isLastRow ? "" : "border-b"}`}
                style={{
                  borderColor: `${SPY_GOLD}1E`,
                }}
                initial={{ opacity: 0, x: isRightCol ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                  style={{
                    border: `1px solid ${SPY_GOLD}44`,
                    backgroundColor: `${SPY_GOLD}0E`,
                  }}
                >
                  <IconComponent size={16} style={{ color: SPY_GOLD }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[10px] uppercase tracking-[0.4em] font-light block mb-1.5"
                    style={{ color: SPY_GOLD, opacity: 0.75 }}
                  >
                    {detail.label}
                  </span>
                  <p
                    className="text-sm md:text-base leading-relaxed font-light"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {detail.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom border line */}
        <div
          className="mt-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${SPY_GOLD}33, transparent)`,
          }}
        />
      </div>
    </section>
  );
}
