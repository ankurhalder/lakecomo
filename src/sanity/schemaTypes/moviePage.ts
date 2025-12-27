import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'moviePage',
  title: 'Movie Page',
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
        defineField({ name: 'title', title: 'Main Title', type: 'string', initialValue: 'Your Movie' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'Ready for its Premiere, Bring Your Popcorn' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({ name: 'popcornImage', title: 'Hero Icon (Popcorn)', type: 'image' })
      ]
    }),
    defineField({
      name: 'deliverables',
      title: 'List of Deliverables',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Deliverable Item',
          fields: [
            defineField({ name: 'title', title: 'Item Title', type: 'string' }),
            defineField({
              name: 'details',
              title: 'Bullet Points',
              type: 'array',
              of: [{ type: 'string' }]
            })
          ]
        }
      ]
    })
  ]
})