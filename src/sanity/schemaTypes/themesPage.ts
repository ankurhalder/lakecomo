import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'themesPage',
  title: 'Themes Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'mainTitle', title: 'Main Title', type: 'string', initialValue: '2026 Themes' }),
        defineField({ name: 'highlightTitle', title: 'Highlight Title', type: 'string', initialValue: 'Best 2026 Theme is YOU DECIDE' }),
        defineField({ name: 'secondaryTitle', title: 'Secondary Title', type: 'string', initialValue: 'Themes Designed to Make Every Guest a Star' }),
        defineField({ name: 'description', title: 'Intro Description', type: 'text', rows: 4 }),
      ]
    }),
    defineField({
      name: 'themesList',
      title: 'Themes List',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Theme',
          fields: [
            defineField({ name: 'title', title: 'Theme Title', type: 'string' }),
            defineField({ name: 'genre', title: 'Genre / Subtitle', type: 'string' }),
            defineField({ name: 'image', title: 'Theme Image', type: 'image' }),
            defineField({ name: 'vibe', title: 'Vibe', type: 'text', rows: 2 }),
            defineField({ name: 'story', title: 'Story', type: 'text', rows: 4 }),
            defineField({ name: 'feel', title: 'Feel', type: 'text', rows: 2 }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'genre',
              media: 'image'
            }
          }
        }
      ]
    }),
  ],
})