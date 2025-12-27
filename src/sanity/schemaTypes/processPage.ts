import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'processPage',
  title: 'Process Page',
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
      fields: [
        defineField({ name: 'title', title: 'Main Title', type: 'string', initialValue: 'The Process' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'From Concept to Cinema - Your Story Unfolds' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
      ]
    }),
    defineField({
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Step',
          fields: [
            defineField({ name: 'stepNumber', title: 'Step Number', type: 'string' }),
            defineField({ name: 'stepTitle', title: 'Step Title', type: 'string' }),
            defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
            defineField({ name: 'image', title: 'Icon/Image', type: 'image' }),
          ],
          preview: {
            select: {
              title: 'stepTitle',
              subtitle: 'stepNumber'
            }
          }
        }
      ]
    }),
  ],
})