import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'venuePage',
  title: 'Venue Page',
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
        defineField({ name: 'heading', title: 'Venue Name', type: 'string', initialValue: 'Palazzo Odescalchi' }),
        defineField({ name: 'subHeading', title: 'Tagline', type: 'string', initialValue: 'Create Cinematic Magic in a Legendary Setting' }),
        defineField({ name: 'location', title: 'Location', type: 'string', initialValue: 'Como, Italy' }),
      ]
    }),
    defineField({
      name: 'heroFeature',
      title: 'Hero Feature Badge',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Badge Title', type: 'string', initialValue: 'EXCLUSIVE VENUE' }),
        defineField({ name: 'subtitle', title: 'Badge Subtitle', type: 'string', initialValue: 'Historic Palace' }),
        defineField({ name: 'tag', title: 'Badge Tag', type: 'string', initialValue: '2026' }),
        defineField({ name: 'link', title: 'Badge Link', type: 'string', initialValue: '/contact' }),
      ]
    }),
    defineField({
      name: 'description',
      title: 'Main Description',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'Main description paragraphs about the venue.'
    }),
    defineField({
      name: 'features',
      title: 'Venue Features',
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
      name: 'eventInfo',
      title: 'Event Information',
      type: 'text',
      rows: 3,
      description: 'Info about events (e.g., duration, amenities).'
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      description: 'Upload multiple venue images. Supports bulk upload - drag and drop multiple files at once.',
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
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Embed a YouTube video at the end of the page.'
    }),
    defineField({
      name: 'externalLinks',
      title: 'External Links',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'palaceWebsite', title: 'Palace Website', type: 'url' }),
        defineField({ name: 'bookingLink', title: 'Booking/Contact Link', type: 'string' }),
      ]
    }),
  ]
})
