import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
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
        defineField({ name: 'title', title: 'Main Title', type: 'string', initialValue: 'Your Film Crew' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2, initialValue: 'From the Big Apple to the heart of Milan — our team brings international talent to your celebration' }),
      ]
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 5
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Team Member',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
            defineField({ name: 'bio', title: 'Biography', type: 'text', rows: 4 }),
            defineField({ name: 'image', title: 'Portrait', type: 'image' })
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image'
            }
          }
        }
      ]
    })
  ]
})