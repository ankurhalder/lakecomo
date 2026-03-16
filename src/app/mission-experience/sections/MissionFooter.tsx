"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MissionFooter() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          paddingTop: "var(--section-py)",
          paddingBottom: "var(--section-py)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-12"
              style={{ backgroundColor: "var(--border-color)" }}
            />
            <span
              className="w-2 h-2 rotate-45"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span
              className="h-px w-12"
              style={{ backgroundColor: "var(--border-color)" }}
            />
          </div>

          <p
            className="text-xs uppercase tracking-[0.4em] font-bold mb-2 gold-text"
            style={{ fontFamily: "var(--font-courier)" }}
          >
            End of Transmission
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.25em] mb-8"
            style={{
              fontFamily: "var(--font-courier)",
              color: "var(--text-muted)",
            }}
          >
            Confidential Property &bull; Do Not Duplicate
          </p>

          <Link href="/#experience">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-6 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full cursor-pointer"
              style={{
                background: "var(--accent-gradient)",
                color: "var(--accent-text)",
              }}
            >
              Return to Base
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </footer>
  );
}
