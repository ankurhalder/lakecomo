/**
 * seed-theme-page.mjs
 *
 * Seeds the Sanity themesPage document with ALL content for the redesigned
 * "Spies of Style" experience page.
 *
 * SAFE TO RE-RUN (idempotent):
 *   - .set()          → always overwrites text fields (keeps them current)
 *   - .setIfMissing() → only writes on FIRST run for arrays
 *                       (preserves images uploaded via Studio)
 *
 * Images and videos MUST be uploaded manually via Sanity Studio.
 * This script never touches image/file assets.
 *
 * Usage:
 *   node scripts/seed-theme-page.mjs
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

// Helper: generate a stable _key for array items
const key = (prefix, index) => `${prefix}_${index}`;

async function seedThemePage() {
  console.log("🕵️  Seeding Theme Page (Spies of Style) to Sanity...\n");

  try {
    // ── Step 1: Create document skeleton if it doesn't exist ────────────────
    await client.createIfNotExists({ _id: "themesPage", _type: "themesPage" });
    console.log("✓ Document ensured");

    // ── Step 2: Always-overwrite text fields ─────────────────────────────────
    await client
      .patch("themesPage")
      .set({
        title: "Spies of Style — Cinematic Spy Experience",

        // ── Hero text overlay ──────────────────────────────────────────────
        // heroSlides images must be uploaded via Studio — not seeded here
        "hero.blinkingLabel": "Classified Intelligence",
        "hero.headline": "Spies of Style",
        "hero.subheadline":
          "Step into the true mission of Cecil Richard Mallaby — a WWII spy whose daring story inspired James Bond — through an immersive dinner or cocktail experience on Lake Como.",
        "hero.ctaText": "Reserve Your Mission",
        "hero.ctaLink": "/contact",

        // ── The Real-Life 007 section ──────────────────────────────────────
        // real007Section.image must be uploaded via Studio
        "real007Section.heading": "The Real-Life 007",
        "real007Section.paragraph1":
          "During World War II, intelligence operative Cecile Mallory arrived secretly in Cernobbio on Lake Como carrying a critical Allied mission. Her audacious operations, coded messages, and elegant style remain part of the region's wartime history.",
        "real007Section.paragraph2":
          "Historians believe Mallory's daring missions and sophistication inspired elements of Ian Fleming's James Bond, from secret communications to high-stakes espionage in glamorous locations.",

        // ── Assignments section header ─────────────────────────────────────
        "assignmentsSection.sectionTitle": "Choose Your Assignment",

        // ── Private Villa section ──────────────────────────────────────────
        // privateVillaSection.image must be uploaded via Studio
        "privateVillaSection.title": "Private Villa Operations",
        "privateVillaSection.description":
          "Bring the mission to your exclusive Lake Como residence. Ideal for private celebrations, corporate retreats, or destination weddings.",
        "privateVillaSection.ctaText": "Inquire About Private Events",
        "privateVillaSection.ctaLink": "/contact",

        // ── CTA section ───────────────────────────────────────────────────
        // ctaSection.backgroundImage must be uploaded via Studio
        "ctaSection.title": "Live a True Spy Mission on Lake Como",
        "ctaSection.quote":
          "Step into history, mystery, and glamour on Lake Como. Choose your night, grab your spy kit, and live the adventure.",

        // ── What's Included header ────────────────────────────────────────
        "whatsIncludedSection.title": "What's Included",
      })
      // ── Arrays: only written once (first run), preserves Studio edits ────
      .setIfMissing({
        "real007Section.bullets": [
          "Solve the type of codes used by Mallory",
          "Experience the suspense and strategy of a true spy mission",
          "Collaborate with teams in a cinematic setting",
          "Walk in the footsteps of the spy who inspired James Bond",
        ],

        "assignmentsSection.cards": [
          {
            _key: key("card", 0),
            _type: "object",
            title: "Dinner Mission",
            duration: "3-hour immersive experience",
            features: [
              "Multi-course themed dinner",
              "Full spy kit & historical dossier",
              "Interactive historical mission",
              "Cinematic photo opportunities",
            ],
            ctaText: "Book Dinner Mission",
            ctaLink: "/contact",
          },
          {
            _key: key("card", 1),
            _type: "object",
            title: "Cocktail Mission",
            duration: "90\u2013120 minute experience",
            features: [
              "Curated cocktails & hors d\u2019oeuvres",
              "Spy kit and tactical briefing",
              "Interactive mission puzzles",
              "Perfect pre-dinner social experience",
            ],
            ctaText: "Book Cocktail Mission",
            ctaLink: "/contact",
          },
        ],

        "privateVillaSection.features": [
          "Personalized storylines for your group",
          "Optional 3-minute cinematic event trailer",
          "Full immersive setup & professional cast",
        ],

        "ctaSection.ctas": [
          {
            _key: key("cta", 0),
            _type: "object",
            text: "Book Dinner Mission",
            link: "/contact",
          },
          {
            _key: key("cta", 1),
            _type: "object",
            text: "Book Cocktail Mission",
            link: "/contact",
          },
          {
            _key: key("cta", 2),
            _type: "object",
            text: "Inquire About Private Villa Events",
            link: "/contact",
          },
        ],

        "whatsIncludedSection.items": [
          "Custom spy kit for every guest",
          "Historic codes and mission dossiers",
          "Multi-course dinner or curated cocktail service",
          "Cinematic photo opportunities",
          "Optional cinematic trailer for private events",
        ],
      })
      .commit();

    // ── Step 3: Summary report ───────────────────────────────────────────────
    console.log("\n\u2705 Successfully seeded themesPage document!\n");

    console.log("\ud83d\udce6 Text fields (always updated):");
    console.log("   \u2713 Internal title");
    console.log("   \u2713 Hero: blinkingLabel, headline, subheadline, CTA");
    console.log("   \u2713 Real-Life 007: heading, paragraph1, paragraph2");
    console.log("   \u2713 Assignments: sectionTitle");
    console.log(
      "   \u2713 Private Villa: title, description, ctaText, ctaLink",
    );
    console.log("   \u2713 CTA: title, quote");
    console.log("   \u2713 What\u2019s Included: title");

    console.log(
      "\n\ud83d\udce6 Arrays (written only if missing \u2014 first run only):",
    );
    console.log("   \u2713 Real-Life 007 bullet points (4 items)");
    console.log(
      "   \u2713 Assignment cards: Dinner Mission + Cocktail Mission",
    );
    console.log("   \u2713 Private Villa features (3 items)");
    console.log("   \u2713 CTA buttons (3 buttons)");
    console.log("   \u2713 What\u2019s Included items (5 items)");

    console.log(
      "\n\ud83d\udd12 Assets preserved (never touched by this script):",
    );
    console.log(
      "   \u2022 heroSlides images \u2014 upload via Studio \u2192 Hero Slider Images group",
    );
    console.log(
      "   \u2022 Real-Life 007 historical image \u2014 upload via Studio",
    );
    console.log("   \u2022 Assignment card images \u2014 upload via Studio");
    console.log("   \u2022 Private Villa image \u2014 upload via Studio");
    console.log("   \u2022 CTA background image \u2014 upload via Studio");

    console.log("\n\ud83c\udf10 Next steps:");
    console.log(
      "   1. Open Sanity Studio: https://lakecomostyle.sanity.studio",
    );
    console.log("   2. Navigate to Themes Page \u2192 Hero Slider Images");
    console.log("   3. Upload 3\u20135 cinematic Lake Como/spy-themed images");
    console.log(
      "   4. Upload section images (007, Villa, etc.) in their groups",
    );
    console.log("   5. Publish the document");
  } catch (error) {
    console.error("\n\u274c Error seeding theme page:", error.message);
    console.error(error);
    process.exit(1);
  }
}

seedThemePage().catch((error) => {
  console.error("\u274c Fatal error:", error);
  process.exit(1);
});
