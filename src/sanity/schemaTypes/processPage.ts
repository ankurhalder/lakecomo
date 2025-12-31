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
        defineField({ 
          name: 'details', 
          title: 'Details', 
          type: 'text', 
          rows: 4,
          initialValue: 'Lake Como Style offers unique cinematic experiences where groups and couples can create their own movie trailers against the stunning backdrop of Lake Como. It\'s a perfect place for people to immerse themselves in the art of filmmaking while enjoying the beauty of Italy.'
        }),
      ]
    }),
    defineField({
      name: 'heroFeature',
      title: 'Hero Feature Badge',
      description: 'Feature badge displayed on the right side of the hero section (desktop only).',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Badge Title', type: 'string', initialValue: 'THEMED CINEMATIC PARTIES' }),
        defineField({ name: 'subtitle', title: 'Badge Subtitle', type: 'string', initialValue: 'Dive into the World of Cinematic Creativity' }),
        defineField({ name: 'tag', title: 'Badge Tag', type: 'string', initialValue: '2026' }),
        defineField({ name: 'link', title: 'Badge Link', type: 'string', initialValue: '/contact' }),
      ]
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      description: 'The steps in the movie-making process.',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Process Step',
        fields: [
          defineField({ name: 'stepNumber', title: 'Step Number', type: 'number', validation: Rule => Rule.required().min(1).max(10) }),
          defineField({ 
            name: 'titleLines', 
            title: 'Title Lines', 
            description: 'Each line of the title (for multi-line display)',
            type: 'array', 
            of: [{ type: 'string' }] 
          }),
          defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 6 }),
        ],
        preview: {
          select: {
            stepNumber: 'stepNumber',
            subtitle: 'subtitle',
          },
          prepare({ stepNumber, subtitle }) {
            return {
              title: `Step ${stepNumber}`,
              subtitle: subtitle
            }
          }
        }
      }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Process Page'
      }
    }
  }
})
