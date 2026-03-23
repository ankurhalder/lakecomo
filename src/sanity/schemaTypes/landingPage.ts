import { defineField, defineType } from "sanity";

export default defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  groups: [
    { name: "seo", title: "SEO & Metadata" },
    { name: "hero", title: "Hero — Video Banner", default: true },
    { name: "story", title: "Our Story" },
    { name: "experience", title: "The Experience" },
    { name: "assignment", title: "Your Assignment" },
    { name: "privateEvents", title: "Private Events" },
    { name: "upcomingEvents", title: "Upcoming Events" },
    { name: "inquire", title: "Inquire / Contact" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      group: "hero",
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description:
        "Custom page title used for search engines and social previews.",
      validation: (Rule) => Rule.max(65),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Meta description shown in search results.",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "seoImage",
      title: "SEO Image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      description: "Open Graph and Twitter image. Recommended size: 1200x630.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      group: "seo",
      description: "Override canonical URL if needed.",
    }),

    // ─── HERO ────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "videoFile",
          title: "Background Video (Desktop)",
          type: "file",
          options: { accept: "video/mp4" },
        }),
        defineField({
          name: "mobileVideoFile",
          title: "Background Video (Mobile)",
          type: "file",
          options: { accept: "video/mp4" },
        }),
        defineField({
          name: "posterImage",
          title: "Video Poster Image",
          type: "image",
        }),
        defineField({
          name: "preHeading",
          title: "Pre-Heading",
          type: "string",
          initialValue: "Presenting Our Guests With",
        }),
        defineField({
          name: "mainHeading",
          title: "Main Heading",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "subHeading",
          title: "Sub Heading",
          type: "string",
        }),
        defineField({
          name: "playIndicatorText",
          title: "Play Indicator Text",
          type: "string",
          initialValue: "Tap to see the magic",
        }),
      ],
    }),

    // ─── STORY ───────────────────────────────────────────────────
    defineField({
      name: "story",
      title: "Story Section",
      type: "object",
      group: "story",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "blinkingLabel",
          title: "Blinking Label",
          type: "string",
          initialValue: "Classified Intelligence",
        }),
        defineField({
          name: "headline",
          title: "Headline",
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
          name: "real007",
          title: "The Real-Life 007",
          type: "object",
          options: { collapsible: true },
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
            }),
            defineField({
              name: "paragraph2",
              title: "Second Paragraph",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "bullets",
              title: "Bullet Points",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "image",
              title: "Historical Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        }),
      ],
    }),

    // ─── EXPERIENCE ──────────────────────────────────────────────
    defineField({
      name: "experience",
      title: "Experience Section",
      type: "object",
      group: "experience",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "sectionTitle",
          title: "Section Title",
          type: "string",
          initialValue: "Step Into the Spotlight",
        }),
        defineField({
          name: "sectionSubtitle",
          title: "Section Subtitle",
          type: "string",
        }),
        defineField({
          name: "eyebrowLabel",
          title: "Eyebrow Label",
          type: "string",
          initialValue: "The Experience",
          description: "Small text above the section title.",
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Button Label",
          type: "string",
          initialValue: "Mission Experience",
        }),
        defineField({
          name: "ctaLink",
          title: "CTA Button Link",
          type: "string",
          initialValue: "#mission-experience",
          description: "Anchor that scrolls to mission content, e.g. #mission-experience",
        }),
        defineField({
          name: "showcaseImages",
          title: "Showcase Images (Carousel)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "title",
                  title: "Character Name",
                  type: "string",
                }),
                defineField({
                  name: "role",
                  title: "Role Description",
                  type: "string",
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "role", media: "image" },
              },
            },
          ],
          options: { layout: "grid" },
        }),
        defineField({
          name: "paragraphs",
          title: "Body Paragraphs",
          type: "array",
          of: [{ type: "text", rows: 4 }],
        }),

        // ─── MISSION EXPERIENCE (embedded) ───────────────────────
        defineField({
          name: "missionExperience",
          title: "Mission Experience",
          type: "object",
          description:
            "Inline mission experience content — displayed as a sub-section after the experience carousel.",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "hero",
              title: "Hero Section",
              type: "object",
              options: { collapsible: true, collapsed: false },
              fields: [
                defineField({
                  name: "title",
                  title: "Hero Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "subtitle",
                  title: "Hero Subtitle",
                  type: "text",
                  rows: 3,
                }),
                defineField({
                  name: "backgroundImage",
                  title: "Background Image",
                  type: "image",
                  options: { hotspot: true },
                  description: "Shown when no video is provided.",
                }),
                defineField({
                  name: "backgroundVideo",
                  title: "Background Video",
                  type: "file",
                  options: { accept: "video/mp4" },
                  description:
                    "Takes priority over background image when present.",
                }),
              ],
            }),
            defineField({
              name: "setup",
              title: "The Setup Section",
              type: "object",
              options: { collapsible: true, collapsed: false },
              fields: [
                defineField({
                  name: "title",
                  title: "Section Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 6,
                }),
              ],
            }),
            defineField({
              name: "phases",
              title: "Mission Phases",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Phase Title",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "text",
                      rows: 8,
                    }),
                    defineField({
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      options: {
                        list: [
                          { title: "Lock — Secrecy / Intel", value: "lock" },
                          { title: "Document — File / Dossier", value: "file-text" },
                          { title: "People — Team / Network", value: "users" },
                          { title: "Key — Access / Entry", value: "key" },
                          { title: "Target — Mission / Objective", value: "target" },
                        ],
                        layout: "radio",
                      },
                      description: "Icon displayed next to the phase title.",
                    }),
                    defineField({
                      name: "images",
                      title: "Phase Images",
                      type: "array",
                      of: [{ type: "image", options: { hotspot: true } }],
                      options: { layout: "grid" },
                      description:
                        "Upload one or more images. Multiple images display as an auto-playing carousel.",
                    }),
                    defineField({
                      name: "order",
                      title: "Phase Order",
                      type: "number",
                      validation: (Rule) => Rule.required().min(1),
                    }),
                  ],
                  preview: {
                    select: {
                      title: "title",
                      subtitle: "order",
                      media: "images.0",
                    },
                    prepare({ title, subtitle, media }) {
                      return {
                        title: title || "Untitled Phase",
                        subtitle: subtitle ? `Phase ${subtitle}` : "",
                        media,
                      };
                    },
                  },
                },
              ],
            }),
          ],
        }),
      ],
    }),

    // ─── ASSIGNMENT ──────────────────────────────────────────────
    defineField({
      name: "assignment",
      title: "Assignment Section",
      type: "object",
      group: "assignment",
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
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Mission Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "duration",
                  title: "Duration",
                  type: "string",
                }),
                defineField({
                  name: "features",
                  title: "Features",
                  type: "array",
                  of: [{ type: "string" }],
                }),
                defineField({
                  name: "ctaText",
                  title: "CTA Text",
                  type: "string",
                  initialValue: "Book Now",
                }),
                defineField({
                  name: "image",
                  title: "Card Image",
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "duration",
                  media: "image",
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(2),
        }),
      ],
    }),

    // ─── PRIVATE EVENTS ──────────────────────────────────────────
    defineField({
      name: "privateEvents",
      title: "Private Events Section",
      type: "object",
      group: "privateEvents",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "label",
          title: "Section Label",
          type: "string",
          initialValue: "LAKE COMO EXCLUSIVE",
        }),
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Private Spy Missions",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          initialValue: "Host Your Bond-Inspired Spy Experience",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue:
            "Bring the thrill of espionage to Lake Como with a fully immersive, cinematic spy experience. Perfect for private villas or pre- and post-wedding celebrations.",
        }),
        defineField({
          name: "features",
          title: "Feature Cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Target / Bullseye", value: "target" },
                      { title: "Map Pin / Location", value: "map-pin" },
                      { title: "Martini Glass", value: "martini" },
                      { title: "Briefcase", value: "briefcase" },
                    ],
                    layout: "radio",
                  },
                  description: "Icon shown next to the feature bullet.",
                }),
                defineField({
                  name: "text",
                  title: "Feature Text",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: "text", subtitle: "icon" } },
            },
          ],
          validation: (Rule) => Rule.max(4),
        }),
        defineField({
          name: "ctaText",
          title: "CTA Button Text",
          type: "string",
          initialValue: "DISCOVER HOW IT WORKS",
        }),
        defineField({
          name: "ctaLink",
          title: "CTA Link",
          type: "string",
          initialValue: "#contact",
        }),
        defineField({
          name: "image",
          title: "Cinematic Image",
          type: "image",
          options: { hotspot: true },
          description:
            "A luxury alpine palace beside a calm lake at dusk surrounded by forest.",
        }),
        defineField({
          name: "videographyLabel",
          title: "Videography Section Label",
          type: "string",
          initialValue: "A TRULY UNIQUE OFFERING",
        }),
        defineField({
          name: "videographyTitle",
          title: "Videography Section Title",
          type: "string",
          initialValue: "Photography & Videography",
        }),
        defineField({
          name: "videographySubtitle",
          title: "Videography Subtitle",
          type: "text",
          rows: 2,
          initialValue:
            "We offer an exclusive cinematic video experience — the only spy event videography of its kind on Lake Como.",
        }),
        defineField({
          name: "videographyHighlights",
          title: "Videography Highlights",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "photographyHighlights",
          title: "Photography Highlights",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),

    // ─── UPCOMING EVENTS ─────────────────────────────────────────────────────
    defineField({
      name: "upcomingEvents",
      title: "Upcoming Events Section",
      type: "object",
      group: "upcomingEvents",
      description:
        "Manage all events shown in the Upcoming Events section on the website.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "events",
          title: "Events",
          type: "array",
          description:
            "Add, edit, or remove events. Drag and drop to reorder. Pinned events always appear first on the website.",
          of: [
            {
              type: "object",
              title: "Event",
              fields: [
                defineField({
                  name: "title",
                  title: "Event Name",
                  type: "string",
                  validation: (Rule) =>
                    Rule.required().error("Every event needs a name."),
                  description: "The display name shown on the event card.",
                }),
                defineField({
                  name: "badge",
                  title: "Badge Label",
                  type: "string",
                  description:
                    "Short label shown as a gold pill on the card (e.g. Season Premiere, Weekly Residency).",
                }),
                defineField({
                  name: "eventType",
                  title: "Event Type",
                  type: "string",
                  options: {
                    list: [
                      {
                        title: "One-off Event — has a specific date",
                        value: "single_event",
                      },
                      {
                        title:
                          "Recurring Event — happens every week, no date needed",
                        value: "recurring_event",
                      },
                    ],
                    layout: "radio",
                  },
                  initialValue: "single_event",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "date",
                  title: "Event Date",
                  type: "date",
                  options: { dateFormat: "MMMM D, YYYY" },
                  description:
                    "The date of the event. Leave blank for recurring events.",
                  hidden: ({ parent }) =>
                    (parent as { eventType?: string })?.eventType ===
                    "recurring_event",
                }),
                defineField({
                  name: "time",
                  title: "Event Time",
                  type: "string",
                  description:
                    "Time range displayed on the card (e.g. 5:00 PM – 8:00 PM).",
                  hidden: ({ parent }) =>
                    (parent as { eventType?: string })?.eventType ===
                    "recurring_event",
                }),
                defineField({
                  name: "image",
                  title: "Event Image",
                  type: "image",
                  options: { hotspot: true },
                  description:
                    "Photo for the event card. Displayed letterboxed — never cropped.",
                }),
                defineField({
                  name: "videoFile",
                  title: "Event Video (optional)",
                  type: "file",
                  options: { accept: "video/mp4,video/webm" },
                  description:
                    "Optional video for the event card — will autoplay on loop. When set, takes priority over the image.",
                }),
                defineField({
                  name: "description",
                  title: "Event Description",
                  type: "text",
                  rows: 3,
                  description:
                    "Short evocative text shown on the event card (2–4 sentences recommended).",
                }),
                defineField({
                  name: "location",
                  title: "Location",
                  type: "string",
                  description:
                    "Venue and area shown below the description (e.g. Terzo Crotto, Cernobbio).",
                }),
                defineField({
                  name: "ctaLabel",
                  title: "Button Text",
                  type: "string",
                  initialValue: "ENQUIRE NOW",
                  description:
                    "Text on the call-to-action button (e.g. RSVP / DETAILS, GET TICKETS).",
                }),
                defineField({
                  name: "ctaUrl",
                  title: "Button Link (optional)",
                  type: "url",
                  description:
                    "When set, the button opens this URL in a new tab (e.g. an Eventbrite link). Leave blank to scroll to the contact form instead.",
                }),
                defineField({
                  name: "pinned",
                  title: "Pin to Top",
                  type: "boolean",
                  initialValue: false,
                  description:
                    "Pinned events always appear first in the grid, regardless of date.",
                }),
                defineField({
                  name: "displayOrder",
                  title: "Display Order",
                  type: "number",
                  description:
                    "Lower numbers appear first within pinned or non-pinned groups. Leave blank for automatic ordering.",
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  badge: "badge",
                  date: "date",
                  eventType: "eventType",
                  media: "image",
                },
                prepare({ title, badge, date, eventType, media }) {
                  const dateStr =
                    eventType === "recurring_event"
                      ? "Recurring — Every Week"
                      : date
                        ? new Date(date + "T00:00:00").toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "No date set";
                  return {
                    title: title || "Untitled Event",
                    subtitle: [badge, dateStr].filter(Boolean).join(" · "),
                    media,
                  };
                },
              },
            },
          ],
        }),
      ],
    }),

    // ─── INQUIRE / CONTACT ───────────────────────────────────────
    defineField({
      name: "inquire",
      title: "Inquire Section",
      type: "object",
      group: "inquire",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "preHeading",
          title: "Pre-Heading",
          type: "string",
          initialValue: "Get in Touch",
        }),
        defineField({
          name: "mainHeading",
          title: "Main Heading",
          type: "string",
          initialValue: "The Spotlight Awaits",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "form",
          title: "Form Configuration",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "formTitle",
              title: "Form Title",
              type: "string",
              initialValue: "Create Your Cinematic Event",
            }),
            defineField({
              name: "firstNameLabel",
              title: "First Name Label",
              type: "string",
              initialValue: "First Name",
            }),
            defineField({
              name: "firstNamePlaceholder",
              title: "First Name Placeholder",
              type: "string",
              initialValue: "John",
            }),
            defineField({
              name: "lastNameLabel",
              title: "Last Name Label",
              type: "string",
              initialValue: "Last Name",
            }),
            defineField({
              name: "lastNamePlaceholder",
              title: "Last Name Placeholder",
              type: "string",
              initialValue: "Doe",
            }),
            defineField({
              name: "emailLabel",
              title: "Email Label",
              type: "string",
              initialValue: "Email",
            }),
            defineField({
              name: "emailPlaceholder",
              title: "Email Placeholder",
              type: "string",
              initialValue: "john@example.com",
            }),
            defineField({
              name: "phoneLabel",
              title: "Phone Label",
              type: "string",
              initialValue: "Phone",
            }),
            defineField({
              name: "phonePlaceholder",
              title: "Phone Placeholder",
              type: "string",
              initialValue: "555 123-4567",
            }),
            defineField({
              name: "groupSizeLabel",
              title: "Group Size Label",
              type: "string",
              initialValue: "How many will you be?",
            }),
            defineField({
              name: "groupSizeDefaultOption",
              title: "Group Size Default Option",
              type: "string",
              initialValue: "Select group size",
            }),
            defineField({
              name: "groupSizeOptions",
              title: "Group Size Options",
              type: "array",
              of: [{ type: "string" }],
              initialValue: [
                "2-5 people",
                "6-10 people",
                "11-20 people",
                "21-50 people",
                "50+ people",
              ],
            }),
            defineField({
              name: "eventDateLabel",
              title: "Event Date Label",
              type: "string",
              initialValue: "Date of Event",
            }),
            defineField({
              name: "messageLabel",
              title: "Message Label",
              type: "string",
              initialValue: "Tell us about your vision",
            }),
            defineField({
              name: "messagePlaceholder",
              title: "Message Placeholder",
              type: "string",
              initialValue: "Describe your dream cinematic event...",
            }),
            defineField({
              name: "submitButtonText",
              title: "Submit Button Text",
              type: "string",
              initialValue: "Be A Star",
            }),
            defineField({
              name: "submitButtonLoadingText",
              title: "Submit Button Loading Text",
              type: "string",
              initialValue: "Sending...",
            }),
          ],
        }),
        defineField({
          name: "success",
          title: "Success State",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "title",
              title: "Success Title",
              type: "string",
              initialValue: "The Spotlight Awaits!",
            }),
            defineField({
              name: "message",
              title: "Success Message",
              type: "text",
              rows: 3,
              initialValue:
                "Thank you for reaching out. We'll be in touch soon to help you create your unforgettable cinematic experience.",
            }),
            defineField({
              name: "buttonText",
              title: "Button Text",
              type: "string",
              initialValue: "Back to Top",
            }),
          ],
        }),
      ],
    }),
  ],
});
