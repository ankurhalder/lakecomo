import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
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
        defineField({ name: 'heading', title: 'Main Heading', type: 'string', initialValue: 'BEHIND THE MAGIC' }),
        defineField({ name: 'subHeading', title: 'Sub Heading', type: 'string', initialValue: 'A Star is Born' }),
      ]
    }),
    defineField({
      name: 'heroFeature',
      title: 'Hero Feature Badge',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Badge Title', type: 'string', initialValue: 'FEATURED' }),
        defineField({ name: 'subtitle', title: 'Badge Subtitle', type: 'string', initialValue: 'Highlights' }),
        defineField({ name: 'tag', title: 'Badge Tag', type: 'string', initialValue: '2026' }),
        defineField({ name: 'link', title: 'Badge Link', type: 'string', initialValue: '/contact' }),
      ]
    }),
    defineField({
      name: 'details',
      title: 'Details / Description',
      type: 'text',
      rows: 4,
      description: 'Introductory text describing the gallery or the experience.'
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      description: 'Upload images for the gallery carousel. Supports bulk upload by dragging and dropping multiple images at once.',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        ]
      }],
      options: {
        layout: 'grid'
      }
    }),
  ]
})
