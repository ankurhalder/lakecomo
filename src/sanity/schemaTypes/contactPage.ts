
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The title of the contact page (e.g., "Contact Us")',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'cameraImage',
      title: 'Camera Image',
      type: 'image',
      description: 'The image to replace the interactive 3D camera. Fallback is the default video camera icon.',
      options: {
        hotspot: true,
      },
    }),
  ],
})
