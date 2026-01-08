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
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'videoFile', title: 'Background Video (MP4) - Desktop', type: 'file', options: { accept: 'video/mp4' }, description: 'Video for desktop screens' }),
        defineField({ name: 'mobileVideoFile', title: 'Background Video (MP4) - Mobile', type: 'file', options: { accept: 'video/mp4' }, description: 'Video for mobile/phone screens (optimized for iOS)' }),
        defineField({ name: 'posterImage', title: 'Video Poster Image', type: 'image' }),
        defineField({ name: 'preHeading', title: 'Pre-Heading', type: 'string', initialValue: 'Presenting Our Guests With' }),
        defineField({ name: 'mainHeading', title: 'Main Heading', type: 'text', rows: 3, initialValue: 'A one-of-a-kind cinematic immersive experience transforming celebrations into unforgettable movie trailers.' }),
        defineField({ name: 'subHeading', title: 'Sub Heading', type: 'string', initialValue: 'Your Party, Your Theme, Your Movie Trailer' }),
        defineField({ name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'Book Now' }),
        defineField({ name: 'ctaLink', title: 'Button Link', type: 'string' }),
        defineField({ name: 'secondaryCtaText', title: 'Secondary Button Text (Movie)', type: 'string', initialValue: 'Watch Our Films' }),
        defineField({ name: 'secondaryCtaLink', title: 'Secondary Button Link', type: 'string', initialValue: '/movie' }),
        defineField({ name: 'playIndicatorText', title: 'Play Indicator Text', type: 'string', initialValue: 'Tap to see the magic ✨', description: 'Text shown next to the sound toggle button' })
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