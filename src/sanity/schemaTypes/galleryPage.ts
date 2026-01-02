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
      initialValue: 'Gallery'
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'BEHIND THE MAGIC' }),
        defineField({ name: 'subHeading', title: 'Sub Heading', type: 'string', initialValue: 'A Star is Born' }),
        defineField({ name: 'agentNote', title: 'Agent Note', type: 'text', rows: 3 }),
      ]
    }),
    defineField({
      name: 'heroFeature',
      title: 'Hero Feature Badge',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Badge Title', type: 'string', initialValue: 'EXCLUSIVE ACCESS' }),
        defineField({ name: 'subtitle', title: 'Badge Subtitle', type: 'string', initialValue: 'Behind the Scenes' }),
        defineField({ name: 'tag', title: 'Badge Tag', type: 'string', initialValue: '2026' }),
        defineField({ name: 'link', title: 'Badge Link', type: 'string', initialValue: '/contact' }),
      ]
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Feature Title', type: 'string' }),
          defineField({ name: 'description', title: 'Feature Description', type: 'text', rows: 2 }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'description' }
        }
      }]
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      description: 'Upload multiple images. Supports bulk upload.',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          defineField({ 
            name: 'category', 
            title: 'Category', 
            type: 'string',
            options: {
              list: [
                { title: 'Events', value: 'events' },
                { title: 'Behind the Scenes', value: 'bts' },
                { title: 'Costumes', value: 'costumes' },
                { title: 'Venues', value: 'venues' },
                { title: 'Productions', value: 'productions' },
              ]
            }
          }),
        ]
      }],
      options: {
        layout: 'grid'
      }
    }),
  ]
})
