"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
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
  { label: "Story",           url: "/#story"          },
  { label: "Experience",      url: "/#experience"     },
  { label: "Assignment",      url: "/#assignment"     },
  { label: "Private Events",  url: "/#private-events" },
  { label: "Upcoming Events", url: "/#events"         },
  { label: "Inquire",         url: "/#contact"        },
];

export default function Header({ data }: { data: HeaderData }) {
  const { lenisRef } = useLenis();
  const [isVisible, setIsVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const logoText = data?.logoText || "Lake Como Style";
  const allLinks = data?.links?.length ? data.links : DEFAULT_LINKS;
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

  // Close sidebar on ESC key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll while sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const scrollToHash = (url: string) => {
    const hash = url.replace("/", "");
    const el = document.querySelector(hash);
    if (el) lenisRef.current?.scrollTo(el as HTMLElement, { offset: -48 });
  };

  const handleNavClick = (url: string | null | undefined) => {
    if (!url) return;
    if (sidebarOpen) {
      // Close sidebar first, then scroll after animation completes
      setSidebarOpen(false);
      setTimeout(() => {
        if (url.startsWith("/#")) scrollToHash(url);
      }, 320);
    } else {
      if (url.startsWith("/#")) scrollToHash(url);
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
          className="font-limelight text-sm md:text-base tracking-wide cursor-pointer shrink-0"
          style={{ color: "var(--text-primary)" }}
        >
          {logoText}
        </button>

        {/* Desktop inline nav — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-9">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.url)}
              className="text-xs lg:text-sm uppercase tracking-widest font-light transition-opacity hover:opacity-70 cursor-pointer"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA pill — hidden on mobile */}
        {ctaLink && (
          <button
            onClick={() => handleNavClick(ctaLink.url)}
            className="hidden md:block shrink-0 px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-opacity hover:opacity-90 cursor-pointer"
            style={{
              background: "var(--accent-gradient)",
              color: "var(--accent-text)",
            }}
          >
            {ctaLink.label}
          </button>
        )}

        {/* Mobile hamburger — hidden on desktop */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden flex items-center justify-center w-8 h-8 cursor-pointer transition-opacity hover:opacity-70"
          style={{ color: "var(--text-primary)" }}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </motion.header>

      {/* Spacer so content starts below the fixed header */}
      <div className="h-10 md:h-12" aria-hidden="true" />

      {/* ── Mobile sidebar ────────────────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[60] md:hidden"
              style={{
                backgroundColor: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(3px)",
              }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
              className="fixed top-0 right-0 h-full w-[72vw] max-w-[280px] z-[70] md:hidden flex flex-col"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderLeft: "1px solid var(--border-color)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 h-10 shrink-0"
                style={{ borderBottom: "1px solid var(--border-color)" }}
              >
                <span
                  className="font-limelight text-sm tracking-wide"
                  style={{ color: "var(--text-primary)" }}
                >
                  {logoText}
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-center w-7 h-7 cursor-pointer transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-secondary)" }}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-5 pt-4 flex-1">
                {allLinks.map((link, i) => {
                  const isCta = link === ctaLink;
                  if (isCta) return null;
                  return (
                    <motion.button
                      key={link.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055 + 0.08 }}
                      onClick={() => handleNavClick(link.url)}
                      className="text-left py-3.5 text-sm uppercase tracking-[0.25em] font-light cursor-pointer transition-opacity hover:opacity-70"
                      style={{
                        color: "var(--text-secondary)",
                        borderBottom: "1px solid var(--border-color)",
                      }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </nav>

              {/* CTA button pinned to bottom */}
              {ctaLink && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.055 + 0.16 }}
                  className="px-5 pb-10 pt-4 shrink-0"
                >
                  <button
                    onClick={() => handleNavClick(ctaLink.url)}
                    className="w-full py-3 text-[11px] font-bold uppercase tracking-widest rounded-full transition-opacity hover:opacity-90 cursor-pointer"
                    style={{
                      background: "var(--accent-gradient)",
                      color: "var(--accent-text)",
                    }}
                  >
                    {ctaLink.label}
                  </button>
                </motion.div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
