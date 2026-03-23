"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScroll";
import type { LandingPageData, EventData } from "@/sanity/lib/getLandingPage";
import EventCard from "./EventCard";

// ─── DEFAULT EVENTS (fallback when Sanity has no events) ─────────────────────

const DEFAULT_EVENTS: EventData[] = [
  {
    _id: "default-event-1",
    title: "Corso Eleganza 2026 Season Kick Off Cocktail Party",
    badge: "Season Premiere",
    eventType: "single_event",
    date: "2026-05-16",
    time: "5:00 PM – 8:00 PM",
    description:
      "Inaugurate the season in spectacular style at the renowned Corso Eleganza. Join us for an exclusive cocktail evening surrounded by classic automotive beauty and unparalleled Lake Como elegance.",
    location: "Terzo Crotto, Cernobbio",
    ctaLabel: "GET TICKETS",
    ctaUrl: "https://www.eventbrite.com/e/spies-of-style-a-bond-inspired-immersive-cocktail-party-tickets-1985643475086?aff=oddtdtcreator",
    imageUrl: null,
    pinned: true,
  },
  {
    _id: "default-event-2",
    title: "Weekly Spies of Style Dinners",
    badge: "Weekly Residency",
    eventType: "recurring_event",
    description:
      "Experience the mystery and luxury on a weekly basis high above the lake. Enjoy bespoke cocktails, curated styling sessions, and the unparalleled ambiance of a historic retreat.",
    location: "Locanda Milano 1873, Brunate",
    ctaLabel: "VIEW SCHEDULE",
    imageUrl: null,
    pinned: false,
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function UpcomingEventsSection({
  events,
  videoMuteLabel,
}: {
  events: LandingPageData["events"];
  videoMuteLabel?: string;
}) {
  const { lenisRef } = useLenis();

  const displayEvents = events && events.length > 0 ? events : DEFAULT_EVENTS;

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element as HTMLElement, { offset: -48 });
    }
  };

  return (
    <section
      id="upcoming-events"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          paddingTop: "var(--section-py)",
          paddingBottom: "var(--section-py)",
        }}
      >
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="h-px w-8"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span className="text-xs uppercase tracking-[0.3em] font-light gold-text">
              Lake Como Experiences
            </span>
            <span
              className="h-px w-8"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </div>

          {/* Icon + Title */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <Calendar
              size={22}
              strokeWidth={1.5}
              style={{ color: "var(--accent)" }}
              aria-hidden="true"
            />
            <h2
              className="font-bold"
              style={{
                fontFamily: "var(--font-limelight)",
                fontSize: "var(--fs-h2)",
                color: "var(--text-primary)",
              }}
            >
              Upcoming Events
            </h2>
          </div>

          {/* Subtitle */}
          <p
            className="mt-3 max-w-2xl mx-auto text-sm sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Join us for a curated series of events that celebrate the cinematic
            allure and sartorial excellence of the world&rsquo;s most
            sophisticated secret agents.
          </p>
        </motion.div>

        {/* ── Events display ────────────────────────────────────────────────────
         *  MARQUEE ARCHITECTURE NOTE:
         *  When event count grows beyond grid capacity, this block can be
         *  replaced with a horizontal marquee / ticker implementation.
         *  To do so:
         *    1. Add a displayMode: "grid" | "marquee" prop or derive from count
         *    2. Wrap displayEvents in a <MarqueeTrack> component
         *    3. Keep EventCard unchanged — it is marquee-ready
         * ─────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {displayEvents.map((event, i) => (
            <EventCard
              key={event._id}
              event={event}
              index={i}
              onCtaClick={scrollToContact}
              muteLabel={videoMuteLabel}
            />
          ))}
        </div>

        {/* ── No events fallback (Sanity returned empty, no DEFAULT applied) ── */}
        {displayEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-16"
          >
            <p
              className="text-sm uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              No upcoming events — check back soon
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
