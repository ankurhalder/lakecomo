import { defineField, defineType } from "sanity";

/**
 * THEMES PAGE SCHEMA — Fully Modular Cinematic Experience Document
 *
 * Architecture: Each section of the /themes page maps 1:1 to a schema group.
 * The client can edit every word, image, and CTA without touching code.
 * Groups collapse cleanly in the Sanity Studio sidebar for fast navigation.
 *
 * Section groups:
 *   hero        → Full-bleed cinematic hero (cover image, headline, CTA, Bond video)
 *   story       → History + James Bond connection narrative
 *   locations   → Two location comparison blocks (Brunate / Cernobbio)
 *   props       → Props, spy kits, and photo ops section
 *   highlights  → Experience highlights grid
 *   logistics   → Details & logistics (duration, group size, dress code, booking)
 *   cta         → Reserve Your Adventure CTA block
 *   slider      → Bottom autoplay image slider (10+ images)
 *   legacy      → Preserved theme cards (future-proof, not displayed by default)
 */

export default defineType({
  name: "themesPage",
  title: "Themes Page",
  type: "document",
  groups: [
    { name: "hero", title: "🎬 Hero Section", default: true },
    { name: "story", title: "📖 Story Section" },
    { name: "locations", title: "📍 Two Locations" },
    { name: "props", title: "🕵️ Props & Spy Kits" },
    { name: "highlights", title: "✨ Experience Highlights" },
    { name: "logistics", title: "📋 Details & Logistics" },
    { name: "cta", title: "🎯 Reserve CTA" },
    { name: "slider", title: "🖼️ Image Slider" },
    { name: "legacy", title: "⚠️ Legacy Theme Cards (Advanced)" },
  ],
  fields: [
    // ─── PAGE META ─────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Internal Page Title",
      type: "string",
      description: "Not displayed publicly. Used as a CMS document label.",
      group: "hero",
    }),

    // ─── HERO SECTION ──────────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "coverImage",
          title: "Cover Image",
          type: "image",
          options: { hotspot: true },
          description:
            "Full-bleed background image for the hero. Recommended: 2560×1440px or larger. Use a high-contrast dark/dramatic image.",
        }),
        defineField({
          name: "preHeading",
          title: "Pre-Heading Label",
          type: "string",
          initialValue: "An Immersive Experience",
          description: "Small uppercase label above the main headline.",
        }),
        defineField({
          name: "headline",
          title: "Main Headline",
          type: "string",
          initialValue: "Spies of Style Dinner Experience",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline / Tagline",
          type: "text",
          rows: 2,
          initialValue:
            "Step into history, intrigue, and glamour — live a James Bond–inspired adventure on Lake Como.",
        }),
        defineField({
          name: "ctaText",
          title: "CTA Button Text",
          type: "string",
          initialValue: "Book Your Experience",
        }),
        defineField({
          name: "ctaLink",
          title: "CTA Button Link",
          type: "string",
          initialValue: "/contact",
        }),
      ],
    }),

    // ─── BOND VIDEO ────────────────────────────────────────────────────────────
    defineField({
      name: "bondVideo",
      title: "Bond Theme Video",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      group: "hero",
      description:
        "The Bond theme video clip. Displayed as a cinematic inset card in the hero on desktop, and as a standalone section below the hero on mobile. Keep under 30MB for performance.",
    }),

    // ─── STORY SECTION ─────────────────────────────────────────────────────────
    defineField({
      name: "storySection",
      title: "Story Section",
      type: "object",
      group: "story",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "historyTitle",
          title: "History Block — Title",
          type: "string",
          initialValue: "Step Into History on Lake Como",
        }),
        defineField({
          name: "historyText",
          title: "History Block — Paragraph",
          type: "text",
          rows: 6,
          initialValue:
            "During WWII, British officer Cecil Richard Mallaby parachuted into the hills above Lake Como carrying secret documents, miniature radios, and encrypted messages. Arrested, interrogated, and operating under extreme pressure, Mallaby became a key figure in secret communications between the Italian authorities and Allied command.\n\nStep into Mallaby's world: become the spy, enact daring missions, decode hidden messages, and live the suspense and elegance of espionage — all with Lake Como as your stage.",
        }),
        defineField({
          name: "bondConnectionTitle",
          title: "Bond Connection Block — Title",
          type: "string",
          initialValue: "The James Bond Connection",
        }),
        defineField({
          name: "bondConnectionText",
          title: "Bond Connection Block — Quote / Paragraph",
          type: "text",
          rows: 5,
          initialValue:
            "Cecil Richard Mallaby, a fearless British intelligence officer, carried out daring secret missions on Lake Como during WWII — parachuting behind enemy lines, using disguises, and transmitting critical information under pressure. Some historians believe his exploits inspired Ian Fleming when he created James Bond, the world's most iconic spy. At our Spies of Style Dinner Experience, guests step into this thrilling world of espionage, intrigue, and adventure.",
        }),
        defineField({
          name: "bondConnectionImage",
          title: "Bond Connection — Background Image (Optional)",
          type: "image",
          options: { hotspot: true },
          description:
            "Optional atmospheric image displayed alongside the Bond connection text.",
        }),
      ],
    }),

    // ─── LOCATIONS SECTION ─────────────────────────────────────────────────────
    defineField({
      name: "locationsSection",
      title: "Two Locations Section",
      type: "object",
      group: "locations",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "sectionTitle",
          title: "Section Title",
          type: "string",
          initialValue: "Two Locations, One Story",
        }),
        defineField({
          name: "sectionSubtitle",
          title: "Section Subtitle",
          type: "text",
          rows: 2,
          initialValue:
            "Experience the adventure in two distinct, cinematic locations, each offering its own style and immersive energy:",
        }),
        defineField({
          name: "locations",
          title: "Location Cards",
          type: "array",
          description:
            "Add exactly 2 locations. Each appears as a full cinematic card. Displayed side-by-side on desktop, stacked on mobile.",
          of: [
            {
              type: "object",
              title: "Location",
              fields: [
                defineField({
                  name: "name",
                  title: "Location Name",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "label",
                  title: "Experience Label",
                  type: "string",
                  description:
                    'Short label, e.g. "Cinematic Arrival + Full Dinner"',
                }),
                defineField({
                  name: "tagline",
                  title: "Location Tagline",
                  type: "string",
                }),
                defineField({
                  name: "highlights",
                  title: "Experience Highlights",
                  type: "array",
                  description:
                    "Bullet points about this location's experience.",
                  of: [{ type: "string" }],
                }),
                defineField({
                  name: "image",
                  title: "Location Image",
                  type: "image",
                  options: { hotspot: true },
                  description: "Recommended: 800×1100px portrait orientation.",
                }),
              ],
              preview: {
                select: {
                  title: "name",
                  subtitle: "tagline",
                  media: "image",
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(2),
        }),
        defineField({
          name: "closingLine",
          title: "Closing / Transition Line",
          type: "string",
          initialValue:
            "One story, two distinct locations — choose your adventure.",
        }),
      ],
    }),

    // ─── PROPS & SPY KIT SECTION ───────────────────────────────────────────────
    defineField({
      name: "propsSection",
      title: "Props & Spy Kit Section",
      type: "object",
      group: "props",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Props, Spy Kits & Photo Ops",
        }),
        defineField({
          name: "highlights",
          title: "Feature Points",
          type: "array",
          description: "Each item appears as a distinct feature line.",
          of: [{ type: "string" }],
          initialValue: [
            "Every guest receives a custom spy kit to unlock missions and solve secret codes.",
            "Themed props and dramatic backdrops create Instagram-ready photo moments.",
            "Explore hidden clues, enact spy missions, and immerse yourself in the role of a WWII operative.",
          ],
        }),
        defineField({
          name: "quote",
          title: "Featured Quote / Callout",
          type: "text",
          rows: 3,
          initialValue:
            "Decode messages, uncover secrets, and become the spy you've always wanted to be — all while enjoying the elegance and beauty of Lake Como.",
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image (Optional)",
          type: "image",
          options: { hotspot: true },
          description:
            "Optional atmospheric full-bleed background. Use a dark, dramatic image.",
        }),
      ],
    }),

    // ─── EXPERIENCE HIGHLIGHTS SECTION ────────────────────────────────────────
    defineField({
      name: "highlightsSection",
      title: "Experience Highlights Section",
      type: "object",
      group: "highlights",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Experience Highlights",
        }),
        defineField({
          name: "highlights",
          title: "Highlights",
          type: "array",
          description:
            "Each item appears as a highlighted feature card in a responsive grid.",
          of: [{ type: "string" }],
          initialValue: [
            "James Bond–inspired dining and interactive espionage",
            "Historical storytelling based on the real-life exploits of Cecil Richard Mallaby",
            "Dramatic arrivals, panoramic lake views, and immersive decor",
            "Props, spy kits, and secret missions at every turn",
            "Photo-worthy moments at each location",
          ],
        }),
      ],
    }),

    // ─── DETAILS & LOGISTICS SECTION ──────────────────────────────────────────
    defineField({
      name: "logisticsSection",
      title: "Details & Logistics Section",
      type: "object",
      group: "logistics",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Details & Logistics",
        }),
        defineField({
          name: "details",
          title: "Detail Items",
          type: "array",
          description:
            "Each item is a Label: Value pair displayed in a structured grid.",
          of: [
            {
              type: "object",
              title: "Detail Item",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                  description: 'e.g. "Duration", "Group Size", "Dress Code"',
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "text",
                  rows: 2,
                  validation: (Rule) => Rule.required(),
                  description:
                    'e.g. "Brunate (full dinner) 3 hours | Cernobbio (aperitivo) 2 hours"',
                }),
                defineField({
                  name: "icon",
                  title: "Icon Name (Lucide)",
                  type: "string",
                  description:
                    "Optional. Lucide icon name: Clock, Users, Shirt, Calendar, MapPin, etc.",
                }),
              ],
              preview: {
                select: { title: "label", subtitle: "value" },
              },
            },
          ],
          initialValue: [
            {
              label: "Duration",
              value:
                "Brunate (full dinner) 3 hours | Cernobbio (aperitivo) 2 hours",
              icon: "Clock",
            },
            {
              label: "Group Size",
              value: "Small, intimate groups for personalized immersion",
              icon: "Users",
            },
            {
              label: "Dress Code",
              value: "Elegant, spy-inspired attire encouraged",
              icon: "Shirt",
            },
            {
              label: "Booking",
              value:
                "Private or semi-private dates available; choose your location based on mood and availability",
              icon: "Calendar",
            },
          ],
        }),
      ],
    }),

    // ─── RESERVE CTA SECTION ──────────────────────────────────────────────────
    defineField({
      name: "ctaSection",
      title: "Reserve Your Adventure CTA",
      type: "object",
      group: "cta",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "title",
          title: "Section Heading",
          type: "string",
          initialValue: "Reserve Your Adventure",
        }),
        defineField({
          name: "quote",
          title: "Quote Line",
          type: "text",
          rows: 3,
          initialValue:
            "Step into history, mystery, and glamour on Lake Como. Choose your night, grab your spy kit, and live the adventure.",
        }),
        defineField({
          name: "ctaText",
          title: "CTA Button Text",
          type: "string",
          initialValue: "Book Now",
        }),
        defineField({
          name: "ctaLink",
          title: "CTA Button Link",
          type: "string",
          initialValue: "/contact",
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image (Optional)",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // ─── BOTTOM IMAGE SLIDER ───────────────────────────────────────────────────
    defineField({
      name: "sliderImages",
      title: "Bottom Image Slider",
      type: "array",
      group: "slider",
      description:
        "Upload 10+ event images. These autoplay in a cinematic Ken Burns slider at the bottom of the page. Drag to reorder. Recommended: 1920×1280px landscape.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Short description for accessibility.",
            }),
            defineField({
              name: "caption",
              title: "Caption (Optional)",
              type: "string",
              description: "Displayed as a subtle overlay caption.",
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),

    // ─── LEGACY — THEME CARDS (PRESERVED, NOT SHOWN BY DEFAULT) ───────────────
    defineField({
      name: "themesList",
      title: "Legacy Theme Cards",
      description:
        "Preserved for future use. These cards are not displayed on the current /themes page layout but can be re-enabled by a developer.",
      type: "array",
      group: "legacy",
      of: [
        {
          type: "object",
          title: "Theme",
          fields: [
            defineField({
              name: "title",
              title: "Theme Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "genre",
              title: "Genre / Subtitle",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
              description:
                "Lucide icon name (e.g., Drama, Sparkles, Heart, Film, Star, Crown, Glasses)",
            }),
            defineField({
              name: "image",
              title: "Theme Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "videoFile",
              title: "Theme Video (Optional)",
              type: "file",
              options: { accept: "video/mp4" },
            }),
            defineField({ name: "vibe", title: "Vibe", type: "text", rows: 2 }),
            defineField({
              name: "story",
              title: "Story",
              type: "text",
              rows: 4,
            }),
            defineField({ name: "feel", title: "Feel", type: "text", rows: 2 }),
            defineField({
              name: "ctaText",
              title: "CTA Button Text",
              type: "string",
              initialValue: "Book This Theme",
            }),
            defineField({
              name: "ctaLink",
              title: "CTA Button Link",
              type: "string",
              initialValue: "/contact",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "genre", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "customThemeCta",
      title: "Legacy Custom Theme CTA",
      description: "Preserved for future use. Not displayed in current layout.",
      type: "object",
      group: "legacy",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "icon",
          title: "Icon Name",
          type: "string",
          initialValue: "Wand2",
        }),
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Create Your Own Theme",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue:
            "Don't see what you're looking for? We can design a completely custom theme tailored to your vision.",
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
          initialValue: "Start Your Custom Theme",
        }),
        defineField({
          name: "buttonLink",
          title: "Button Link",
          type: "string",
          initialValue: "/contact",
        }),
      ],
    }),
  ],
});
