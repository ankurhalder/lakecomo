/**
 * seed-themes-page.mjs
 *
 * Seeds the Sanity themesPage document with all content from the
 * "Spies of Style Dinner Experience" page (client email + schema).
 *
 * Images and videos must be uploaded manually via Sanity Studio.
 * All text content, CTA links, and structured data are seeded here.
 *
 * Usage:
 *   node scripts/seed-themes-page.mjs
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

// Helper: generate a deterministic _key for array items
const key = (prefix, index) => `${prefix}_${index}`;

const themesPageData = {
  _id: "themesPage",
  _type: "themesPage",

  title: "Spies of Style Dinner Experience",

  // ── HERO SECTION ────────────────────────────────────────────────────────────
  hero: {
    preHeading: "An Immersive Experience",
    headline: "Spies of Style Dinner Experience",
    subheadline:
      "Step into history, intrigue, and glamour — live a James Bond–inspired adventure on Lake Como.",
    ctaText: "Book Your Experience",
    ctaLink: "/contact",
  },

  // ── STORY SECTION ───────────────────────────────────────────────────────────
  storySection: {
    historyTitle: "Step Into History on Lake Como",
    historyText:
      "During WWII, British officer Cecil Richard Mallaby parachuted into the hills above Lake Como carrying secret documents, miniature radios, and encrypted messages. Arrested, interrogated, and operating under extreme pressure, Mallaby became a key figure in secret communications between the Italian authorities and Allied command.\n\nStep into Mallaby's world: become the spy, enact daring missions, decode hidden messages, and live the suspense and elegance of espionage — all with Lake Como as your stage.",
    bondConnectionTitle: "The James Bond Connection",
    bondConnectionText:
      "Cecil Richard Mallaby, a fearless British intelligence officer, carried out daring secret missions on Lake Como during WWII — parachuting behind enemy lines, using disguises, and transmitting critical information under pressure. Some historians believe his exploits inspired Ian Fleming when he created James Bond, the world's most iconic spy. At our Spies of Style Dinner Experience, guests step into this thrilling world of espionage, intrigue, and adventure.",
  },

  // ── LOCATIONS SECTION ───────────────────────────────────────────────────────
  locationsSection: {
    sectionTitle: "Two Locations, One Story",
    sectionSubtitle:
      "Experience the adventure in two distinct, cinematic locations, each offering its own style and immersive energy:",
    locations: [
      {
        _key: key("loc", 0),
        name: "Brunate Nights",
        label: "Cinematic Arrival + Full Dinner",
        tagline: "Dramatic arrival. Full immersion.",
        highlights: [
          "Guests may arrive via the funicular from Como, creating a dramatic, cinematic entrance.",
          "Locanda Milano 1873 becomes your spy headquarters for the evening.",
          "A full-course dinner accompanies interactive missions, clue-solving, and historical storytelling.",
          "Panoramic lake views and elegant decor set the stage for a night of intrigue and glamour.",
        ],
      },
      {
        _key: key("loc", 1),
        name: "Cernobbio Nights",
        label: "Intimate Aperitivo Adventure",
        tagline: "Intimate. Elegant. Electrifying.",
        highlights: [
          "An intimate setting in Cernobbio with garden and wine cellar experiences.",
          "Guests enjoy aperitivo-style dining with small bites and curated wines.",
          "Missions and interactive storytelling unfold among hidden clues, props, and themed backdrops.",
          "Perfect for a shorter, social, and immersive spy adventure with a secret-agent vibe.",
        ],
      },
    ],
    closingLine: "One story, two distinct locations — choose your adventure.",
  },

  // ── PROPS & SPY KIT SECTION ─────────────────────────────────────────────────
  propsSection: {
    title: "Props, Spy Kits & Photo Ops",
    highlights: [
      "Every guest receives a custom spy kit to unlock missions and solve secret codes.",
      "Themed props and dramatic backdrops create Instagram-ready photo moments.",
      "Explore hidden clues, enact spy missions, and immerse yourself in the role of a WWII operative.",
    ],
    quote:
      "Decode messages, uncover secrets, and become the spy you've always wanted to be — all while enjoying the elegance and beauty of Lake Como.",
  },

  // ── EXPERIENCE HIGHLIGHTS SECTION ──────────────────────────────────────────
  highlightsSection: {
    title: "Experience Highlights",
    highlights: [
      "James Bond–inspired dining and interactive espionage",
      "Historical storytelling based on the real-life exploits of Cecil Richard Mallaby",
      "Dramatic arrivals, panoramic lake views, and immersive decor",
      "Props, spy kits, and secret missions at every turn",
      "Photo-worthy moments at each location",
    ],
  },

  // ── LOGISTICS SECTION ───────────────────────────────────────────────────────
  logisticsSection: {
    title: "Details & Logistics",
    details: [
      {
        _key: key("detail", 0),
        label: "Duration",
        value: "Brunate (full dinner) 3 hours | Cernobbio (aperitivo) 2 hours",
        icon: "Clock",
      },
      {
        _key: key("detail", 1),
        label: "Group Size",
        value: "Small, intimate groups for personalized immersion",
        icon: "Users",
      },
      {
        _key: key("detail", 2),
        label: "Dress Code",
        value: "Elegant, spy-inspired attire encouraged",
        icon: "Shirt",
      },
      {
        _key: key("detail", 3),
        label: "Booking",
        value:
          "Private or semi-private dates available; choose your location based on mood and availability",
        icon: "Calendar",
      },
    ],
  },

  // ── RESERVE CTA SECTION ─────────────────────────────────────────────────────
  ctaSection: {
    title: "Reserve Your Adventure",
    quote:
      "Step into history, mystery, and glamour on Lake Como. Choose your night, grab your spy kit, and live the adventure.",
    ctaText: "Book Now",
    ctaLink: "/contact",
  },
};

async function seedThemesPage() {
  console.log("🕵️  Seeding Themes Page (Spies of Style) to Sanity...\n");

  try {
    // createOrReplace ensures the doc is created if it doesn't exist,
    // or fully replaced if it does — a clean idempotent operation.
    const result = await client.createOrReplace(themesPageData);

    console.log("✅ Successfully seeded themesPage document!");
    console.log("📄 Document ID:", result._id);
    console.log("📦 Sections seeded:");
    console.log("   ✓ Hero (headline, subheadline, CTA)");
    console.log("   ✓ Story (Mallaby history + Bond connection)");
    console.log("   ✓ Two Locations (Brunate + Cernobbio)");
    console.log("   ✓ Props & Spy Kits (3 points + quote)");
    console.log("   ✓ Experience Highlights (5 items)");
    console.log("   ✓ Details & Logistics (4 items)");
    console.log("   ✓ Reserve Adventure CTA");
    console.log("\n⚠️  Manual steps required in Sanity Studio:");
    console.log("   • Upload cover image → Hero Section → Cover Image");
    console.log("   • Upload Bond video  → Bond Theme Video");
    console.log("   • Upload 10+ event images → Bottom Image Slider");
    console.log("   • Upload location photos → Two Locations → each card");
    console.log("\n🌐 Sanity Studio: https://lakecomostyle.sanity.studio");
  } catch (error) {
    console.error("❌ Error seeding themes page:", error.message);
    console.error(error);
    process.exit(1);
  }
}

seedThemesPage().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
