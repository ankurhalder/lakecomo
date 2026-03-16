"use client";

import { motion } from "framer-motion";
import type { MissionExperiencePageData } from "@/sanity/lib/getMissionExperiencePage";

export default function MissionSetup({
  data,
}: {
  data: MissionExperiencePageData["setup"];
}) {
  const { title, description } = data;

  return (
    <section style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
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
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-8"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-xs uppercase tracking-[0.3em] font-light gold-text">
              Intelligence Report
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
            {title}
          </h2>
        </motion.div>

        {/* Description */}
        {description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          >
            {description.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-sm sm:text-base leading-relaxed mb-4 last:mb-0"
                style={{ color: "var(--text-secondary)" }}
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
