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
      description: 'Add as many themes as you want. Each theme will be displayed with parallax animations.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Theme',
          fields: [
            defineField({ name: 'title', title: 'Theme Title', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'genre', title: 'Genre / Subtitle', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name (e.g., Drama, Sparkles, Heart, Film, Star, Crown, Glasses)' }),
            defineField({ 
              name: 'image', 
              title: 'Theme Image', 
              type: 'image',
              options: { hotspot: true },
              description: 'Upload a high-quality image for this theme. Recommended: 1200x800px or larger.'
            }),
            defineField({ name: 'vibe', title: 'Vibe', type: 'text', rows: 2, description: 'Short keywords describing the feel' }),
            defineField({ name: 'story', title: 'Story', type: 'text', rows: 4, description: 'What guests will experience' }),
            defineField({ name: 'feel', title: 'Feel', type: 'text', rows: 2, description: 'The emotional impact' }),
            defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'Book This Theme' }),
            defineField({ name: 'ctaLink', title: 'CTA Button Link', type: 'string', initialValue: '/contact' }),
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
