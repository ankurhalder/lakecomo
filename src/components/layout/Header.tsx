"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";

interface NavLink {
  label: string;
  url: string;
}

interface HeaderData {
  logoText?: string;
  links?: NavLink[];
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Story",      url: "/#story" },
  { label: "Experience", url: "/#experience" },
  { label: "Assignment", url: "/#assignment" },
  { label: "Inquire",    url: "/#contact" },
];

export default function Header({ data }: { data: HeaderData }) {
  const { lenisRef } = useLenis();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const logoText = data?.logoText || "Lake Como Style";
  const allLinks = data?.links?.length ? data.links : DEFAULT_LINKS;

  // Last link becomes the gold CTA; rest are plain nav links
  const navLinks = allLinks.slice(0, -1);
  const ctaLink = allLinks[allLinks.length - 1];

  // Scroll-hide: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY < 60) {
          setIsVisible(true);
        } else if (currentY > lastScrollY.current + 6) {
          setIsVisible(false);
        } else if (currentY < lastScrollY.current - 4) {
          setIsVisible(true);
        }
        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHash = (url: string) => {
    const hash = url.replace("/", "");
    const el = document.querySelector(hash);
    if (el) {
      lenisRef.current?.scrollTo(el as HTMLElement, { offset: -48 });
    }
  };

  const handleNavClick = (url: string) => {
    if (url.startsWith("/#")) {
      scrollToHash(url);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md px-4 md:px-8 lg:px-12 h-10 md:h-12 flex items-center justify-between border-b"
        style={{
          backgroundColor: "var(--header-bg)",
          color: "var(--text-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick("/#hero")}
          className="font-limelight text-sm md:text-base tracking-wide z-10 cursor-pointer shrink-0"
          style={{ color: "var(--text-primary)" }}
        >
          {logoText}
        </button>

        {/* Inline nav links */}
        <nav className="flex items-center gap-5 sm:gap-7 lg:gap-9">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.url)}
              className="text-[11px] sm:text-xs lg:text-sm uppercase tracking-widest font-light transition-opacity hover:opacity-70 cursor-pointer"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA pill */}
        {ctaLink && (
          <button
            onClick={() => handleNavClick(ctaLink.url)}
            className="shrink-0 px-3 sm:px-5 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full transition-opacity hover:opacity-90 cursor-pointer"
            style={{
              background: "var(--accent-gradient)",
              color: "var(--accent-text)",
            }}
          >
            {ctaLink.label}
          </button>
        )}
      </motion.header>

      {/* Spacer so content starts below the fixed header */}
      <div className="h-10 md:h-12" aria-hidden="true" />
    </>
  );
}
