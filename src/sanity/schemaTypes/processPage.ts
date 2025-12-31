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
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'The Process' }),
        defineField({ name: 'subHeading', title: 'Sub Heading', type: 'string', initialValue: 'From Concept to Cinema - Your Story Unfolds' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
      ]
    }),
    defineField({
      name: 'heroFeature',
      title: 'Hero Feature Badge',
      description: 'Single feature badge displayed on the right side of the hero section (desktop only).',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'subtitle', title: 'Badge Subtitle', type: 'string' }),
        defineField({ name: 'title', title: 'Badge Title', type: 'string' }),
        defineField({ name: 'tag', title: 'Badge Tag', type: 'string' }),
        defineField({ name: 'link', title: 'Badge Link', type: 'string', initialValue: '/themes' }),
      ]
    }),
    defineField({
      name: 'steps',
      title: 'Process Steps',
      description: 'Add the 6 process steps. Each step has a number, title, tagline, and body content.',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Process Step',
        fields: [
          defineField({ name: 'stepNumber', title: 'Step Number', type: 'number', validation: Rule => Rule.required().min(1).max(10) }),
          defineField({ 
            name: 'titleLines', 
            title: 'Title Lines', 
            type: 'array', 
            of: [{ type: 'string' }],
            description: 'Each line of the title displayed separately (e.g., SELECT, YOUR, THEME)'
          }),
          defineField({ name: 'tagline', title: 'Tagline', type: 'string', description: 'Short tagline below title (e.g., PINK LADIES TO LA DOLCE VITA)' }),
          defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
          defineField({ name: 'body', title: 'Body Content', type: 'text', rows: 6 }),
        ],
        preview: {
          select: {
            stepNumber: 'stepNumber',
            heading: 'heading'
          },
          prepare({ stepNumber, heading }) {
            return {
              title: `Step ${stepNumber}: ${heading || 'Untitled'}`,
            }
          }
        }
      }],
    }),
  ],
})
