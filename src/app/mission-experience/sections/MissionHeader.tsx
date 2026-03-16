"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MissionHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "var(--header-bg)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:opacity-80"
          style={{
            fontFamily: "var(--font-courier)",
            color: "var(--text-secondary)",
          }}
        >
          Project: Spies of Style
        </Link>

        <div
          className="flex items-center gap-2 px-3 py-1 rounded-sm border"
          style={{
            borderColor: "var(--accent)",
            backgroundColor: "rgba(201, 168, 76, 0.08)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold gold-text">
            Classified
          </span>
        </div>
      </div>
    </motion.header>
  );
}
