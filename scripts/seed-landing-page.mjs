/**
 * seed-landing-page.mjs
 *
 * Migrates content from existing Sanity documents (homepage, themesPage,
 * castPage, contactPage) into the new unified landingPage document.
 * Also updates the navbar document links to use anchor hashes.
 *
 * SAFE TO RE-RUN (idempotent):
 *   - .set()          → always overwrites text fields
 *   - .setIfMissing() → only writes on FIRST run for arrays/assets
 *
 * Does NOT delete any source documents.
 *
 * Usage:
 *   node scripts/seed-landing-page.mjs
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

const key = (prefix, index) => `${prefix}_${index}`;

async function migrate() {
  console.log("🎬 Starting landing page migration...\n");

  // ── Step 1: Fetch all source documents ─────────────────────────────────────
  console.log("📥 Fetching source documents...");
  const { homepage, themesPage, castPage, contactPage, navbar } =
    await client.fetch(`{
    "homepage":    *[_type == "homepage"][0],
    "themesPage":  *[_type == "themesPage"][0],
    "castPage":    *[_type == "castPage"][0],
    "contactPage": *[_type == "contactPage"][0],
    "navbar":      *[_type == "navbar"][0]
  }`);

  console.log(
    `   ✓ homepage:    ${homepage ? "found" : "not found (will use defaults)"}`,
  );
  console.log(
    `   ✓ themesPage:  ${themesPage ? "found" : "not found (will use defaults)"}`,
  );
  console.log(
    `   ✓ castPage:    ${castPage ? "found" : "not found (will use defaults)"}`,
  );
  console.log(
    `   ✓ contactPage: ${contactPage ? "found" : "not found (will use defaults)"}`,
  );
  console.log(
    `   ✓ navbar:      ${navbar ? "found" : "not found (will skip link update)"}`,
  );

  // ── Step 2: Create landingPage skeleton ────────────────────────────────────
  console.log("\n📄 Ensuring landingPage document exists...");
  await client.createIfNotExists({ _id: "landingPage", _type: "landingPage" });
  console.log("   ✓ Document ready");

  // ── Step 3: Map and patch text fields ──────────────────────────────────────
  console.log("\n✏️  Patching text fields...");

  const hero = homepage?.heroSection || {};
  const story = themesPage?.hero || {};
  const real007 = themesPage?.real007Section || {};
  const assignments = themesPage?.assignmentsSection || {};
  const contactHero = contactPage?.hero || {};
  const castContent = castPage?.content || {};

  await client
    .patch("landingPage")
    .set({
      title: "Lake Como Style — Landing Page",

      // ── Hero ──────────────────────────────────────────────────
      "hero.preHeading": hero.preHeading || "Presenting Our Guests With",
      "hero.mainHeading": hero.mainHeading || "A Cinematic Event Experience",
      "hero.subHeading": hero.subHeading || "Lake Como, Italy",
      "hero.playIndicatorText":
        hero.playIndicatorText || "Tap to see the magic",

      // ── Story ─────────────────────────────────────────────────
      "story.blinkingLabel": story.blinkingLabel || "Classified Intelligence",
      "story.headline": story.headline || "Spies of Style",
      "story.subheadline":
        story.subheadline ||
        "Step into the true mission of Cecil Richard Mallaby — a WWII spy whose daring story inspired James Bond — through an immersive dinner or cocktail experience on Lake Como.",

      // ── Story — Real 007 ──────────────────────────────────────
      "story.real007.heading": real007.heading || "The Real-Life 007",
      "story.real007.paragraph1":
        real007.paragraph1 ||
        "During World War II, intelligence operative Cecile Mallory arrived secretly in Cernobbio on Lake Como carrying a critical Allied mission. Her audacious operations, coded messages, and elegant style remain part of the region's wartime history.",
      "story.real007.paragraph2":
        real007.paragraph2 ||
        "Historians believe Mallory's daring missions and sophistication inspired elements of Ian Fleming's James Bond, from secret communications to high-stakes espionage in glamorous locations.",

      // ── Experience ────────────────────────────────────────────
      "experience.sectionTitle": "Step Into the Spotlight",
      "experience.sectionSubtitle":
        castContent.subtitle ||
        "Every character, every scene — crafted for your event.",

      // ── Assignment ────────────────────────────────────────────
      "assignment.sectionTitle":
        assignments.sectionTitle || "Choose Your Assignment",

      // ── Inquire ───────────────────────────────────────────────
      "inquire.preHeading": contactHero.preHeading || "Get in Touch",
      "inquire.mainHeading": contactHero.mainHeading || "The Spotlight Awaits",
      "inquire.description": contactHero.description || "",

      // ── Inquire form ──────────────────────────────────────────
      "inquire.form.formTitle":
        contactPage?.form?.formTitle || "Create Your Cinematic Event",
      "inquire.form.firstNameLabel":
        contactPage?.form?.firstNameLabel || "First Name",
      "inquire.form.firstNamePlaceholder":
        contactPage?.form?.firstNamePlaceholder || "John",
      "inquire.form.lastNameLabel":
        contactPage?.form?.lastNameLabel || "Last Name",
      "inquire.form.lastNamePlaceholder":
        contactPage?.form?.lastNamePlaceholder || "Doe",
      "inquire.form.emailLabel": contactPage?.form?.emailLabel || "Email",
      "inquire.form.emailPlaceholder":
        contactPage?.form?.emailPlaceholder || "john@example.com",
      "inquire.form.phoneLabel": contactPage?.form?.phoneLabel || "Phone",
      "inquire.form.phonePlaceholder":
        contactPage?.form?.phonePlaceholder || "555 123-4567",
      "inquire.form.groupSizeLabel":
        contactPage?.form?.groupSizeLabel || "How many will you be?",
      "inquire.form.groupSizeDefaultOption":
        contactPage?.form?.groupSizeDefaultOption || "Select group size",
      "inquire.form.eventDateLabel":
        contactPage?.form?.eventDateLabel || "Date of Event",
      "inquire.form.messageLabel":
        contactPage?.form?.messageLabel || "Tell us about your vision",
      "inquire.form.messagePlaceholder":
        contactPage?.form?.messagePlaceholder ||
        "Describe your dream cinematic event...",
      "inquire.form.submitButtonText":
        contactPage?.form?.submitButtonText || "Be A Star",
      "inquire.form.submitButtonLoadingText":
        contactPage?.form?.submitButtonLoadingText || "Sending...",

      // ── Inquire success ───────────────────────────────────────
      "inquire.success.title":
        contactPage?.success?.successTitle || "The Spotlight Awaits!",
      "inquire.success.message":
        contactPage?.success?.successMessage ||
        "Thank you for reaching out. We'll be in touch soon to help you create your unforgettable cinematic experience.",
      "inquire.success.buttonText":
        contactPage?.success?.successButtonText || "Back to Top",

      // ── Content arrays + images — always overwrite from source ────
      "story.real007.image": real007.image || null,
      "story.real007.bullets": real007.bullets || [
        "Solve the type of codes used by Mallory",
        "Experience the suspense and strategy of a true spy mission",
        "Collaborate with teams in a cinematic setting",
        "Walk in the footsteps of the spy who inspired James Bond",
      ],

      "experience.showcaseImages": (castPage?.showcaseImages || []).map(
        (img, idx) => ({
          _key: key("exp", idx),
          _type: "object",
          image: img.image || img,
          title: img.title || null,
          role: img.role || null,
        }),
      ),

      "experience.paragraphs": (castContent.paragraphs || []).filter(
        (p) => typeof p === "string" && p.length > 0,
      ),

      "assignment.cards": (assignments.cards || []).map((card, idx) => ({
        _key: key("card", idx),
        _type: "object",
        title: card.title,
        duration: card.duration,
        features: card.features || [],
        ctaText: card.ctaText || "Book Now",
        image: card.image || null,
      })),
    })
    .setIfMissing({
      // Hero media — only on first run to preserve Studio uploads
      "hero.videoFile": hero.videoFile,
      "hero.mobileVideoFile": hero.mobileVideoFile,
      "hero.posterImage": hero.posterImage,

      "inquire.form.groupSizeOptions": contactPage?.form?.groupSizeOptions || [
        "2-5 people",
        "6-10 people",
        "11-20 people",
        "21-50 people",
        "50+ people",
      ],
    })
    .commit();

  console.log("   ✓ landingPage patched successfully");

  // ── Step 4: Update navbar links to anchor hashes ───────────────────────────
  if (navbar?._id) {
    console.log("\n🔗 Updating navbar links to anchor hashes...");
    await client
      .patch(navbar._id)
      .set({
        links: [
          {
            _key: key("nav", 0),
            _type: "object",
            label: "Story",
            url: "/#story",
          },
          {
            _key: key("nav", 1),
            _type: "object",
            label: "Experience",
            url: "/#experience",
          },
          {
            _key: key("nav", 2),
            _type: "object",
            label: "Assignment",
            url: "/#assignment",
          },
          {
            _key: key("nav", 3),
            _type: "object",
            label: "Inquire",
            url: "/#contact",
          },
        ],
      })
      .commit();
    console.log("   ✓ Navbar links updated");
  } else {
    console.log(
      "\n⚠️  No navbar document found — skipping link update.\n   Create the navbar document in Sanity Studio and set links manually.",
    );
  }

  // ── Step 5: Summary ─────────────────────────────────────────────────────────
  console.log("\n✅ Migration complete!\n");
  console.log("📦 Next steps:");
  console.log(
    "   1. Open Sanity Studio at /admin and verify the Landing Page document",
  );
  console.log(
    "   2. Upload any missing images in the Story, Experience, and Assignment groups",
  );
  console.log("   3. Publish the document");
  console.log("   4. Verify the site renders correctly at /\n");
}

migrate().catch((error) => {
  console.error("❌ Migration failed:", error);
  process.exit(1);
});
