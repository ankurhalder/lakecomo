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
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'title', title: 'Main Title', type: 'string', initialValue: 'Get in Touch' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', initialValue: 'The Spotlight Awaits in Italy' }),
      ]
    }),
    defineField({
      name: 'formConfig',
      title: 'Form Configuration',
      type: 'object',
      fields: [
        defineField({ name: 'submitButtonText', title: 'Submit Button Text', type: 'string', initialValue: 'Be A Star' }),
        defineField({ name: 'successMessage', title: 'Success Message', type: 'string', initialValue: 'Thank you! We will be in touch shortly.' })
      ]
    })
  ]
})