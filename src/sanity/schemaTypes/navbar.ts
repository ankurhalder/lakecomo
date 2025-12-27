import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Main Navigation'
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      initialValue: 'LAKE COMO STYLE'
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo Image',
      type: 'image'
    }),
    defineField({
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'url', type: 'string', title: 'URL' })
          ]
        }
      ]
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Book Now'
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/contact'
    })
  ]
})