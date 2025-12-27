import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Your Adventure in Style Awaits'
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@lakecomostyle.it'
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2025 by Lake Como Style'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform Name' },
            { name: 'url', type: 'url', title: 'URL' }
          ]
        }
      ]
    })
  ]
})