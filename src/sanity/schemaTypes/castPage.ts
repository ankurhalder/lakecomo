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
        defineField({ name: 'icon', title: 'Hero Icon', type: 'image' })
      ]
    }),
    defineField({
      name: 'showcaseImages',
      title: 'Showcase Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' }
    }),
    defineField({
      name: 'content',
      title: 'Body Content',
      type: 'object',
      fields: [
        defineField({
          name: 'paragraphs',
          title: 'Text Paragraphs',
          type: 'array',
          of: [{ type: 'text', rows: 4 }]
        })
      ]
    })
  ]
})