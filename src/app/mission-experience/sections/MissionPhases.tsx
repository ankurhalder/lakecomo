"use client";

import { motion } from "framer-motion";
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

export default function MissionPhases({ phases }: { phases: MissionPhase[] }) {
  return (
    <section style={{ backgroundColor: "var(--bg-primary)" }}>
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
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-8"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-xs uppercase tracking-[0.3em] font-light gold-text">
              Operation Phases
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
            The Mission Unfolds
          </h2>
        </motion.div>

        {/* Phases */}
        <div className="space-y-16 sm:space-y-20">
          {phases.map((phase, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={phase.order}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
              >
                {/* Text column */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[10px] uppercase tracking-[0.3em] font-bold"
                      style={{
                        fontFamily: "var(--font-courier)",
                        color: "var(--accent)",
                      }}
                    >
                      Phase {phase.order}
                    </span>
                    <span
                      className="h-px flex-1"
                      style={{ backgroundColor: "var(--border-color)" }}
                    />
                  </div>

                  <PhaseIcon icon={phase.icon} />

                  <h3
                    className="font-bold mb-4"
                    style={{
                      fontFamily: "var(--font-limelight)",
                      fontSize: "var(--fs-h3)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {phase.title}
                  </h3>

                  {phase.description && (
                    <div className="space-y-3">
                      {phase.description.split("\n\n").map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-sm sm:text-base leading-relaxed whitespace-pre-line"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Image/Carousel column */}
                <div className="flex-1 min-w-0 w-full max-w-lg lg:max-w-none">
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
