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
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Your Movie' }),
        defineField({ name: 'subHeading', title: 'Sub Heading', type: 'string', initialValue: 'Ready for its Premiere, Bring Your Popcorn' }),
        defineField({ name: 'subSubHeading', title: 'Sub Sub Heading', type: 'text', rows: 3 }),
      ]
    }),
    defineField({
      name: 'heroFeature',
      title: 'Hero Feature Badge',
      description: 'Feature badge displayed on the right side of the hero section.',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'subtitle', title: 'Badge Subtitle', type: 'string' }),
        defineField({ name: 'title', title: 'Badge Title', type: 'string' }),
        defineField({ name: 'tag', title: 'Badge Tag', type: 'string' }),
        defineField({ name: 'link', title: 'Badge Link', type: 'string', initialValue: '/contact' }),
      ]
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      description: 'List of deliverables included in the movie package.',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Deliverable',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({ 
            name: 'features', 
            title: 'Features', 
            type: 'array', 
            of: [{ type: 'string' }],
            description: 'List of features/bullet points'
          }),
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'description'
          }
        }
      }],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      description: 'Delivery timeline text',
    }),
    defineField({
      name: 'popcornSection',
      title: 'Popcorn Section',
      description: 'The parallax popcorn section content.',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ 
          name: 'image', 
          title: 'Popcorn Image', 
          type: 'image',
          options: { hotspot: true },
          description: 'Upload a popcorn image (transparent PNG recommended)'
        }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Grab Your Popcorn' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
        defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'Book Your Premiere' }),
        defineField({ name: 'ctaLink', title: 'CTA Button Link', type: 'string', initialValue: '/contact' }),
      ]
    }),
  ],
})
