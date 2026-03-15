/**
 * seed-events.mjs
 *
 * Creates two example Event documents in Sanity CMS for the Upcoming Events
 * section on the landing page.
 *
 * SAFE TO RE-RUN — uses createOrReplace (idempotent).
 *
 * Usage:
 *   node scripts/seed-events.mjs
 *
 * Required env (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-12-27",
  token: process.env.SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS,
  useCdn: false,
});

// ─── EVENT DATA ───────────────────────────────────────────────────────────────

const EVENTS = [
  {
    _id: "event-corso-eleganza-2026",
    _type: "event",
    title: "Corso Eleganza 2026 Season Kick Off Cocktail Party",
    slug: { _type: "slug", current: "corso-eleganza-2026-season-kick-off" },
    badge: "Season Premiere",
    eventType: "single_event",
    date: "2026-05-16",
    time: "5:00 PM – 8:00 PM",
    description:
      "Inaugurate the season in spectacular style at the renowned Corso Eleganza. " +
      "Join us for an exclusive cocktail evening surrounded by classic automotive beauty " +
      "and unparalleled Lake Como elegance.",
    location: "Terzo Crotto, Cernobbio",
    ctaLabel: "RSVP / DETAILS",
    ctaType: "scroll_contact",
    pinned: true,
    displayOrder: 1,
  },
  {
    _id: "event-weekly-spies-of-style",
    _type: "event",
    title: "Weekly Spies of Style Dinners",
    slug: { _type: "slug", current: "weekly-spies-of-style-dinners" },
    badge: "Weekly Residency",
    eventType: "recurring_event",
    description:
      "Experience the mystery and luxury on a weekly basis high above the lake. " +
      "Enjoy bespoke cocktails, curated styling sessions, and the unparalleled ambiance " +
      "of a historic retreat.",
    location: "Locanda Milano 1873, Brunate",
    ctaLabel: "VIEW SCHEDULE",
    ctaType: "scroll_contact",
    pinned: false,
    displayOrder: 2,
  },
];

// ─── SEED ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🎬 Seeding Upcoming Events...\n");

  // Verify connection
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId) {
    console.error(
      "ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local",
    );
    process.exit(1);
  }
  if (!process.env.SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS) {
    console.error(
      "ERROR: SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS is not set in .env.local",
    );
    process.exit(1);
  }

  console.log(`   Project: ${projectId}`);
  console.log(`   Dataset: ${dataset}\n`);

  for (const event of EVENTS) {
    console.log(
      `   → ${event.pinned ? "📌 " : "   "}Creating: "${event.title}"`,
    );
    await client.createOrReplace(event);
    console.log(`      ✓ Saved as _id: "${event._id}"\n`);
  }

  console.log("✅ Events seeded successfully.\n");
  console.log("   Next steps:");
  console.log("   1. Open /admin → Events to view and edit the seeded events.");
  console.log("   2. Upload images via the 'Event Image' field on each event.");
  console.log(
    "   3. The Upcoming Events section will appear on the landing page.\n",
  );
}

seed().catch((err) => {
  console.error("\n❌ Seed failed:", err.message || err);
  process.exit(1);
});
