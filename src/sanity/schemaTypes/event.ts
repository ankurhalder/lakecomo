import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [
    { name: "details", title: "Event Details", default: true },
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    // ─── DETAILS ─────────────────────────────────────────────────────────────

    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required(),
      description:
        "The display name of the event shown on the card (e.g. 'Corso Eleganza Cocktail Party').",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "details",
      options: { source: "title" },
      description:
        "Auto-generated from the title. Used as a unique identifier.",
    }),

    defineField({
      name: "badge",
      title: "Badge Label",
      type: "string",
      group: "details",
      description:
        "Short label shown as a pill on the card (e.g. 'Season Premiere', 'Weekly Residency').",
    }),

    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Single Event — specific date", value: "single_event" },
          {
            title: "Recurring Event — weekly series",
            value: "recurring_event",
          },
        ],
        layout: "radio",
      },
      initialValue: "single_event",
      validation: (Rule) => Rule.required(),
      description:
        "Choose 'Single Event' for a one-off occasion, or 'Recurring Event' for a weekly series (no date needed).",
    }),

    defineField({
      name: "date",
      title: "Event Date",
      type: "date",
      group: "details",
      options: { dateFormat: "MMMM D, YYYY" },
      description: "The date of the event. Not required for recurring events.",
      hidden: ({ document }) => document?.eventType === "recurring_event",
    }),

    defineField({
      name: "time",
      title: "Event Time",
      type: "string",
      group: "details",
      description:
        "Time range shown on the card (e.g. '5:00 PM – 8:00 PM'). Not required for recurring events.",
      hidden: ({ document }) => document?.eventType === "recurring_event",
    }),

    // ─── CONTENT ─────────────────────────────────────────────────────────────

    defineField({
      name: "media",
      title: "Event Media",
      type: "object",
      group: "content",
      description:
        "Choose either an image or video for the event card. Only one can be active at a time. Video will autoplay on hover with cinematic effects.",
      fields: [
        {
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          description:
            "Photo for the event card. Never cropped — black letterboxing preserves aspect ratio.",
        },
        {
          name: "video",
          title: "Video",
          type: "file",
          options: {
            accept: "video/mp4,video/webm",
          },
          description:
            "Video for the event card (MP4 or WebM). Will autoplay muted on loop. Lazy-loaded for performance.",
        },
      ],
      validation: (Rule) =>
        Rule.custom(
          (media: { image?: unknown; video?: unknown } | undefined) => {
            if (!media) return true;
            if (media.image && media.video) {
              return "Please use either an image OR a video, not both.";
            }
            return true;
          },
        ),
    }),

    defineField({
      name: "image",
      title: "Event Image (Legacy)",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description:
        "DEPRECATED: Use 'Event Media' above instead. This field is kept for backward compatibility with existing events.",
      hidden: true,
    }),

    defineField({
      name: "description",
      title: "Event Description",
      type: "text",
      rows: 4,
      group: "content",
      description:
        "A short, evocative description shown on the event card (2–4 sentences recommended).",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
      description:
        "Venue and area (e.g. 'Terzo Crotto, Cernobbio'). Shown in the metadata row below the description.",
    }),

    defineField({
      name: "ctaLabel",
      title: "Button Label",
      type: "string",
      group: "content",
      initialValue: "ENQUIRE NOW",
      description:
        "Text shown on the call-to-action button (e.g. 'RSVP / DETAILS', 'VIEW SCHEDULE').",
    }),

    defineField({
      name: "ctaType",
      title: "Button Action",
      type: "string",
      group: "content",
      options: {
        list: [
          {
            title: "Scroll to Contact Form (Inquire section)",
            value: "scroll_contact",
          },
        ],
        layout: "radio",
      },
      initialValue: "scroll_contact",
      description:
        "What happens when the button is clicked. Currently: smoothly scrolls to the Inquire / contact form.",
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(65),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: "seoImage",
      title: "SEO Image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      description: "Social preview image. Recommended size: 1200x630.",
    }),

    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      group: "seo",
    }),

    // ─── SETTINGS ────────────────────────────────────────────────────────────

    defineField({
      name: "pinned",
      title: "Pin to Top",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description:
        "Pinned events always appear first in the grid, regardless of their date.",
    }),

    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      group: "settings",
      description:
        "Optional manual sort number within pinned or non-pinned groups. Lower numbers appear first.",
    }),
  ],

  // ─── STUDIO PREVIEW ──────────────────────────────────────────────────────

  preview: {
    select: {
      title: "title",
      badge: "badge",
      date: "date",
      type: "eventType",
      media: "image",
    },
    prepare({ title, badge, date, type, media }) {
      const dateStr =
        type === "recurring_event"
          ? "Recurring · Every Week"
          : date
            ? new Date(date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "No date set";
      return {
        title: title || "Untitled Event",
        subtitle: [badge, dateStr].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
