import { defineField, defineType } from "sanity";

/**
 * THEMES PAGE — Spies of Style Cinematic Experience
 *
 * Section groups (match the rendered page order):
 *   hero        → Persistent text overlay on the slider (headline, label, CTA)
 *   heroSlider  → Full-screen slider images
 *   real007     → "The Real-Life 007" two-column section
 *   assignments → Choose Your Assignment (Dinner & Cocktail cards)
 *   privateVilla→ Private Villa Operations section
 *   cta         → Multi-button CTA block
 *   whatsIncluded → What's Included list
 */

export default defineType({
  name: "themesPage",
  title: "Themes Page",
  type: "document",
  groups: [
    { name: "hero", title: "🎬 Hero Text Overlay", default: true },
    { name: "heroSlider", title: "🖼️ Hero Slider Images" },
    { name: "real007", title: "🕵️ The Real-Life 007" },
    { name: "assignments", title: "🎯 Choose Your Assignment" },
    { name: "privateVilla", title: "🏛️ Private Villa Operations" },
    { name: "cta", title: "✅ Reserve CTA" },
    { name: "whatsIncluded", title: "📋 What's Included" },
  ],
  fields: [
    // ─── PAGE META ─────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Internal Page Title",
      type: "string",
      description: "Not displayed publicly. Used as a label inside Sanity Studio.",
      group: "hero",
    }),

    // ─── HERO TEXT OVERLAY ─────────────────────────────────────────────────────
    // These fields appear as a persistent overlay on top of the slider images.
    defineField({
      name: "hero",
      title: "Hero Text Overlay",
      type: "object",
      group: "hero",
      description:
        "Text and button shown on top of every slider image. The images themselves are managed in the 'Hero Slider Images' tab.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "blinkingLabel",
          title: "Blinking Label",
          type: "string",
          initialValue: "Classified Intelligence",
          description:
            'Small pulsing label shown above the headline. Default: "Classified Intelligence".',
        }),
        defineField({
          name: "headline",
          title: "Main Headline",
          type: "string",
          initialValue: "Spies of Style",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subheadline",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue:
            "Step into the true mission of Cecil Richard Mallaby — a WWII spy whose daring story inspired James Bond — through an immersive dinner or cocktail experience on Lake Como.",
        }),
        defineField({
          name: "ctaText",
          title: "CTA Button Text",
          type: "string",
          initialValue: "Reserve Your Mission",
        }),
        defineField({
          name: "ctaLink",
          title: "CTA Button Link",
          type: "string",
          initialValue: "/contact",
        }),
      ],
    }),

    // ─── HERO SLIDER IMAGES ────────────────────────────────────────────────────
    defineField({
      name: "heroSlides",
      title: "Hero Slider Images",
      type: "array",
      group: "heroSlider",
      description:
        "Cinematic images for the full-screen hero slider. Images display with object-fit: contain — black bars on the sides are intentional for a cinematic look. Recommended: 1920×1080px or wider. Add 3–5 images minimum for a smooth loop.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Short description for accessibility and SEO.",
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),

    // ─── THE REAL-LIFE 007 SECTION ─────────────────────────────────────────────
    defineField({
      name: "real007Section",
      title: "The Real-Life 007 Section",
      type: "object",
      group: "real007",
      description:
        "Two-column layout: text on the left, cinematic historical image on the right.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "The Real-Life 007",
        }),
        defineField({
          name: "paragraph1",
          title: "First Paragraph",
          type: "text",
          rows: 4,
          initialValue:
            "During World War II, intelligence operative Cecile Mallory arrived secretly in Cernobbio on Lake Como carrying a critical Allied mission. Her audacious operations, coded messages, and elegant style remain part of the region's wartime history.",
        }),
        defineField({
          name: "paragraph2",
          title: "Second Paragraph",
          type: "text",
          rows: 4,
          initialValue:
            "Historians believe Mallory's daring missions and sophistication inspired elements of Ian Fleming's James Bond, from secret communications to high-stakes espionage in glamorous locations.",
        }),
        defineField({
          name: "bullets",
          title: "Bullet Points",
          type: "array",
          description: "Key experience highlights shown as bullet points. Recommended: 4 items.",
          of: [{ type: "string" }],
          initialValue: [
            "Solve the type of codes used by Mallory",
            "Experience the suspense and strategy of a true spy mission",
            "Collaborate with teams in a cinematic setting",
            "Walk in the footsteps of the spy who inspired James Bond",
          ],
        }),
        defineField({
          name: "image",
          title: "Historical Image (Right Column)",
          type: "image",
          options: { hotspot: true },
          description:
            "Cinematic portrait displayed on the right side. Recommended: 800×1000px. A decorative frame is applied automatically.",
        }),
      ],
    }),

    // ─── CHOOSE YOUR ASSIGNMENT SECTION ───────────────────────────────────────
    defineField({
      name: "assignmentsSection",
      title: "Choose Your Assignment Section",
      type: "object",
      group: "assignments",
      description: "Two side-by-side mission cards — Dinner Mission and Cocktail Mission.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "sectionTitle",
          title: "Section Heading",
          type: "string",
          initialValue: "Choose Your Assignment",
        }),
        defineField({
          name: "cards",
          title: "Mission Cards",
          type: "array",
          description: "Add exactly 2 cards. Each card shows a mission type with features and a CTA.",
          of: [
            {
              type: "object",
              title: "Mission Card",
              fields: [
                defineField({
                  name: "title",
                  title: "Mission Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                  description: 'e.g. "Dinner Mission"',
                }),
                defineField({
                  name: "duration",
                  title: "Duration",
                  type: "string",
                  description: 'e.g. "3-hour immersive experience"',
                }),
                defineField({
                  name: "features",
                  title: "Mission Features",
                  type: "array",
                  description: "Bullet points on the card. Recommended: 4 items.",
                  of: [{ type: "string" }],
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
                  name: "image",
                  title: "Card Image (Optional)",
                  type: "image",
                  options: { hotspot: true },
                  description: "Optional top-of-card image. Recommended: 800×450px landscape.",
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "duration", media: "image" },
              },
            },
          ],
          validation: (Rule) => Rule.max(2),
        }),
      ],
    }),

    // ─── PRIVATE VILLA OPERATIONS SECTION ─────────────────────────────────────
    defineField({
      name: "privateVillaSection",
      title: "Private Villa Operations Section",
      type: "object",
      group: "privateVilla",
      description: "Image on the left, content on the right (two-column on desktop).",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "title",
          title: "Section Heading",
          type: "string",
          initialValue: "Private Villa Operations",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue:
            "Bring the mission to your exclusive Lake Como residence. Ideal for private celebrations, corporate retreats, or destination weddings.",
        }),
        defineField({
          name: "features",
          title: "Feature Points",
          type: "array",
          description: "Bullet points. Recommended: 3–4 items.",
          of: [{ type: "string" }],
          initialValue: [
            "Personalized storylines for your group",
            "Optional 3-minute cinematic event trailer",
            "Full immersive setup & professional cast",
          ],
        }),
        defineField({
          name: "ctaText",
          title: "CTA Button Text",
          type: "string",
          initialValue: "Inquire About Private Events",
        }),
        defineField({
          name: "ctaLink",
          title: "CTA Button Link",
          type: "string",
          initialValue: "/contact",
        }),
        defineField({
          name: "image",
          title: "Section Image (Left Column)",
          type: "image",
          options: { hotspot: true },
          description: "Portrait image on the left. Recommended: 800×1000px.",
        }),
      ],
    }),

    // ─── RESERVE CTA SECTION ──────────────────────────────────────────────────
    defineField({
      name: "ctaSection",
      title: "Reserve CTA Section",
      type: "object",
      group: "cta",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "title",
          title: "Section Heading",
          type: "string",
          initialValue: "Live a True Spy Mission on Lake Como",
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
          name: "ctas",
          title: "CTA Buttons",
          type: "array",
          description:
            "Up to 3 buttons. The first is the primary (filled) button; the rest appear outlined.",
          of: [
            {
              type: "object",
              title: "Button",
              fields: [
                defineField({
                  name: "text",
                  title: "Button Text",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "link",
                  title: "Button Link",
                  type: "string",
                  initialValue: "/contact",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: "text", subtitle: "link" } },
            },
          ],
          initialValue: [
            { text: "Book Dinner Mission", link: "/contact" },
            { text: "Book Cocktail Mission", link: "/contact" },
            { text: "Inquire About Private Villa Events", link: "/contact" },
          ],
          validation: (Rule) => Rule.max(3),
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image (Optional)",
          type: "image",
          options: { hotspot: true },
          description:
            "Optional full-bleed background. Use a dark, atmospheric photo. A black overlay is applied automatically.",
        }),
      ],
    }),

    // ─── WHAT'S INCLUDED SECTION ───────────────────────────────────────────────
    defineField({
      name: "whatsIncludedSection",
      title: "What's Included Section",
      type: "object",
      group: "whatsIncluded",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "title",
          title: "Section Heading",
          type: "string",
          initialValue: "What's Included",
        }),
        defineField({
          name: "items",
          title: "Included Items",
          type: "array",
          description: "Each item appears as a bullet point. Recommended: 5–7 items.",
          of: [{ type: "string" }],
          initialValue: [
            "Custom spy kit for every guest",
            "Historic codes and mission dossiers",
            "Multi-course dinner or curated cocktail service",
            "Cinematic photo opportunities",
            "Optional cinematic trailer for private events",
          ],
        }),
      ],
    }),
  ],
});
