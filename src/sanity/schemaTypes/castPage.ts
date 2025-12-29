import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'castPage',
  title: 'Cast Page',
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
        defineField({ name: 'title', title: 'Main Title', type: 'string', initialValue: 'Become the Cast' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Lights, Camera, Action - Your Time to Shine' }),
      ]
    }),
    defineField({
      name: 'heroFeature',
      title: 'Hero Feature Badge',
      description: 'Single feature badge displayed on the right side of the hero section (desktop only).',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Badge Title', type: 'string', initialValue: 'BECOME A STAR' }),
        defineField({ name: 'subtitle', title: 'Badge Subtitle', type: 'string', initialValue: 'Step into the spotlight' }),
        defineField({ name: 'tag', title: 'Badge Tag', type: 'string', initialValue: '2026' }),
        defineField({ name: 'link', title: 'Badge Link', type: 'string', initialValue: '/contact' }),
      ]
    }),
    defineField({
      name: 'showcaseImages',
      title: 'Showcase Images (Carousel)',
      description: 'Add 4-6 images for the 3D carousel. Each image can have a character title and role.',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Cast Image',
        fields: [
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'title', title: 'Character Name', type: 'string', description: 'e.g., THE SPY IN RED, AGENT 737' }),
          defineField({ name: 'role', title: 'Role Description', type: 'string', description: 'e.g., Armored Aly (BRIDE or CFO)' }),
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'role',
            media: 'image'
          }
        }
      }],
      options: { layout: 'grid' }
    }),
    defineField({
      name: 'content',
      title: 'Body Content',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'paragraphs',
          title: 'Text Paragraphs',
          description: 'These paragraphs appear below the carousel with scroll animations.',
          type: 'array',
          of: [{ type: 'text', rows: 4 }]
        })
      ]
    })
  ]
})