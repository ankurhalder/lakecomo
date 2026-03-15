import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [
    { name: "details", title: "Event Details", default: true },
    { name: "content", title: "Content" },
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
      name: "image",
      title: "Event Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description:
        "Photo for the event card. The image is never cropped — black letterboxing is added if the aspect ratio doesn't match.",
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
