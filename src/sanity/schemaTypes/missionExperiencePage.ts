import { defineField, defineType } from "sanity";

export default defineType({
  name: "missionExperiencePage",
  title: "Mission Experience Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "setup", title: "The Setup" },
    { name: "phases", title: "Mission Phases" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      group: "hero",
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
          description: "Takes priority over background image when present.",
        }),
      ],
    }),

    // ─── SETUP ───────────────────────────────────────────────────
    defineField({
      name: "setup",
      title: "The Setup Section",
      type: "object",
      group: "setup",
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

    // ─── PHASES ──────────────────────────────────────────────────
    defineField({
      name: "phases",
      title: "Mission Phases",
      type: "array",
      group: "phases",
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
              title: "Icon Name",
              type: "string",
              description:
                "Lucide icon key: lock, file-text, users, key, target, etc.",
            }),
            defineField({
              name: "images",
              title: "Phase Images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              options: { layout: "grid" },
              description:
                "Upload one or more images. Multiple images will display as an auto-playing carousel.",
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
});
