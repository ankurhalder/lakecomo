/**
 * seed-themes-page.mjs
 *
 * Seeds the Sanity themesPage document with all TEXT content.
 * Images and videos must be uploaded manually via Sanity Studio.
 *
 * SAFE TO RE-RUN: uses createIfNotExists + patch so uploaded
 * assets (cover image, slider images, location photos, Bond video)
 * are NEVER overwritten.
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

const key = (prefix, index) => `${prefix}_${index}`;

async function seedThemesPage() {
  console.log("🕵️  Seeding Themes Page (Spies of Style) to Sanity...\n");

  try {
    // Step 1 — create the document skeleton only if it doesn't exist yet.
    // This never overwrites anything that's already there.
    await client.createIfNotExists({ _id: "themesPage", _type: "themesPage" });

    // Step 2 — patch text-only fields using dot notation.
    // Image fields (hero.coverImage, storySection.bondConnectionImage,
    // locationsSection.locations[].image, sliderImages, bondVideo) are
    // intentionally omitted so Studio-uploaded assets are never touched.
    await client
      .patch("themesPage")
      .set({
        title: "Spies of Style Dinner Experience",

        // ── Hero (text only — hero.coverImage stays untouched) ──────────────
        "hero.preHeading": "An Immersive Experience",
        "hero.headline": "Spies of Style Dinner Experience",
        "hero.subheadline":
          "Step into history, intrigue, and glamour — live a James Bond–inspired adventure on Lake Como.",
        "hero.ctaText": "Book Your Experience",
        "hero.ctaLink": "/contact",

        // ── Story (storySection.bondConnectionImage stays untouched) ────────
        "storySection.historyTitle": "Step Into History on Lake Como",
        "storySection.historyText":
          "During WWII, British officer Cecil Richard Mallaby parachuted into the hills above Lake Como carrying secret documents, miniature radios, and encrypted messages. Arrested, interrogated, and operating under extreme pressure, Mallaby became a key figure in secret communications between the Italian authorities and Allied command.\n\nStep into Mallaby\u2019s world: become the spy, enact daring missions, decode hidden messages, and live the suspense and elegance of espionage \u2014 all with Lake Como as your stage.",
        "storySection.bondConnectionTitle": "The James Bond Connection",
        "storySection.bondConnectionText":
          "Cecil Richard Mallaby, a fearless British intelligence officer, carried out daring secret missions on Lake Como during WWII \u2014 parachuting behind enemy lines, using disguises, and transmitting critical information under pressure. Some historians believe his exploits inspired Ian Fleming when he created James Bond, the world\u2019s most iconic spy. At our Spies of Style Dinner Experience, guests step into this thrilling world of espionage, intrigue, and adventure.",

        // ── Locations section header (individual location items use setIfMissing below) ─
        "locationsSection.sectionTitle": "Two Locations, One Story",
        "locationsSection.sectionSubtitle":
          "Experience the adventure in two distinct, cinematic locations, each offering its own style and immersive energy:",
        "locationsSection.closingLine":
          "One story, two distinct locations \u2014 choose your adventure.",

        // ── Props section (propsSection.backgroundImage stays untouched) ────
        "propsSection.title": "Props, Spy Kits & Photo Ops",
        "propsSection.quote":
          "Decode messages, uncover secrets, and become the spy you\u2019ve always wanted to be \u2014 all while enjoying the elegance and beauty of Lake Como.",

        // ── Highlights header ────────────────────────────────────────────────
        "highlightsSection.title": "Experience Highlights",

        // ── Logistics header ─────────────────────────────────────────────────
        "logisticsSection.title": "Details & Logistics",

        // ── CTA (ctaSection.backgroundImage stays untouched) ────────────────
        "ctaSection.title": "Reserve Your Adventure",
        "ctaSection.quote":
          "Step into history, mystery, and glamour on Lake Como. Choose your night, grab your spy kit, and live the adventure.",
        "ctaSection.ctaText": "Book Now",
        "ctaSection.ctaLink": "/contact",
      })
      // Arrays use setIfMissing — only written on first run, never overwritten.
      // This preserves any images added to location cards via Studio.
      .setIfMissing({
        "propsSection.highlights": [
          "Every guest receives a custom spy kit to unlock missions and solve secret codes.",
          "Themed props and dramatic backdrops create Instagram-ready photo moments.",
          "Explore hidden clues, enact spy missions, and immerse yourself in the role of a WWII operative.",
        ],
        "highlightsSection.highlights": [
          "James Bond\u2013inspired dining and interactive espionage",
          "Historical storytelling based on the real-life exploits of Cecil Richard Mallaby",
          "Dramatic arrivals, panoramic lake views, and immersive decor",
          "Props, spy kits, and secret missions at every turn",
          "Photo-worthy moments at each location",
        ],
        "logisticsSection.details": [
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
        "locationsSection.locations": [
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
      })
      .commit();

    console.log("✅ Successfully seeded themesPage document!");
    console.log("\n📦 Text fields updated (always):");
    console.log("   ✓ Title");
    console.log("   ✓ Hero (headline, subheadline, CTA)");
    console.log("   ✓ Story (Mallaby history + Bond connection)");
    console.log("   ✓ Two Locations header text");
    console.log("   ✓ Props & Spy Kits (title + quote)");
    console.log("   ✓ Experience Highlights title");
    console.log("   ✓ Details & Logistics title");
    console.log("   ✓ Reserve Adventure CTA");
    console.log("\n📦 Arrays written only if missing (first run):");
    console.log("   ✓ Props highlights list");
    console.log("   ✓ Experience highlights list");
    console.log("   ✓ Logistics details (4 items)");
    console.log("   ✓ Locations (Brunate + Cernobbio)");
    console.log("\n🔒 Assets preserved (never touched by this script):");
    console.log("   • Hero cover image");
    console.log("   • Bond video");
    console.log("   • Slider images");
    console.log("   • Location card images");
    console.log("   • Story Bond connection image");
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
