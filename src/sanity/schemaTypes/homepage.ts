import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      description: '⚠️ Note: The background video is now served from local files to optimize bandwidth usage and reduce Sanity CDN costs. The video file is located at /public/assets/home/ and can only be changed by the development team.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ 
          name: 'posterImage', 
          title: 'Video Poster Image', 
          type: 'image',
          description: 'This image is shown while the video is loading. Recommended: 1920x1080px.'
        }),
        defineField({ name: 'preHeading', title: 'Pre-Heading', type: 'string', initialValue: 'Presenting Our Guests With' }),
        defineField({ name: 'mainHeading', title: 'Main Heading', type: 'text', rows: 3, initialValue: 'A one-of-a-kind cinematic immersive experience transforming celebrations into unforgettable movie trailers.' }),
        defineField({ name: 'subHeading', title: 'Sub Heading', type: 'string', initialValue: 'Your Party, Your Theme, Your Movie Trailer' }),
        defineField({ name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'Book Now' }),
        defineField({ name: 'ctaLink', title: 'Button Link', type: 'string' })
      ]
    }),
    defineField({
      name: 'featuresGrid',
      title: 'Features / Services Grid',
      type: 'array',
      of: [{ type: 'featureCard' }],
      description: 'Add the 3 columns here (Parties, Venue, Gallery)'
    }),
  ],
})