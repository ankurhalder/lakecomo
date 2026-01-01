import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'crewPage',
  title: 'Crew Page',
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
        defineField({ name: 'heading', title: 'Main Heading', type: 'string', initialValue: 'Your Film Crew' }),
        defineField({ name: 'subHeading', title: 'Sub Heading', type: 'string', initialValue: 'From the Big Apple to the heart of Milan — our team brings international talent to your celebration' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
      ]
    }),
    defineField({
      name: 'heroFeature',
      title: 'Hero Feature Badge',
      description: 'Feature badge displayed on the right side of the hero section (desktop only).',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Badge Title', type: 'string', initialValue: 'MEET THE TEAM' }),
        defineField({ name: 'subtitle', title: 'Badge Subtitle', type: 'string', initialValue: 'International Expertise' }),
        defineField({ name: 'tag', title: 'Badge Tag', type: 'string', initialValue: '2026' }),
        defineField({ name: 'link', title: 'Badge Link', type: 'string', initialValue: '/contact' }),
      ]
    }),
    defineField({
      name: 'crewMembers',
      title: 'Crew Members',
      description: 'Add your crew members here.',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Crew Member',
        fields: [
          defineField({ name: 'name', title: 'Full Name', type: 'string' }),
          defineField({ name: 'role', title: 'Role/Title', type: 'string' }),
          defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
          defineField({ 
            name: 'bio', 
            title: 'Biography', 
            type: 'array', 
            of: [{ type: 'text', rows: 4 }],
            description: 'Add multiple paragraphs for the bio.'
          }),
          defineField({
            name: 'socials',
            title: 'Social Media Links',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
              defineField({ name: 'website', title: 'Website URL', type: 'url' }),
              defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
              defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
              defineField({ name: 'twitter', title: 'Twitter/X URL', type: 'url' }),
            ]
          }),
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'role',
            media: 'image'
          }
        }
      }],
    }),
  ]
})
