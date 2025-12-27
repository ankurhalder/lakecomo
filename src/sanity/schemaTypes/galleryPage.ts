import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
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
        defineField({ name: 'title', title: 'Main Title', type: 'string', initialValue: 'BEHIND THE MAGIC' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'A Star is Born' }),
      ]
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption'
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text'
            })
          ]
        }
      ],
      options: { layout: 'grid' }
    })
  ]
})