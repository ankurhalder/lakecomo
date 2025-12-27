import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'featureCard',
  title: 'Feature / Service Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Year',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon / Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'link',
      title: 'Link URL',
      type: 'string'
    })
  ]
})