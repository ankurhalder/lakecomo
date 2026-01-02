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
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'preHeading', title: 'Pre-Heading', type: 'string', initialValue: 'Get in Touch' }),
        defineField({ name: 'mainHeading', title: 'Main Heading', type: 'string', initialValue: 'The Spotlight Awaits in Italy' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, initialValue: 'Ready to create your unforgettable cinematic experience? Fill out the form and we\'ll be in touch soon.' }),
      ]
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
    defineField({
      name: 'form',
      title: 'Form Configuration',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'formTitle', title: 'Form Title', type: 'string', initialValue: 'Create Your Cinematic Event' }),
        defineField({ name: 'firstNameLabel', title: 'First Name Label', type: 'string', initialValue: 'First Name' }),
        defineField({ name: 'firstNamePlaceholder', title: 'First Name Placeholder', type: 'string', initialValue: 'John' }),
        defineField({ name: 'lastNameLabel', title: 'Last Name Label', type: 'string', initialValue: 'Last Name' }),
        defineField({ name: 'lastNamePlaceholder', title: 'Last Name Placeholder', type: 'string', initialValue: 'Doe' }),
        defineField({ name: 'emailLabel', title: 'Email Label', type: 'string', initialValue: 'Email' }),
        defineField({ name: 'emailPlaceholder', title: 'Email Placeholder', type: 'string', initialValue: 'john@example.com' }),
        defineField({ name: 'phoneLabel', title: 'Phone Label', type: 'string', initialValue: 'Phone' }),
        defineField({ name: 'phonePlaceholder', title: 'Phone Placeholder', type: 'string', initialValue: '555 123-4567' }),
        defineField({ name: 'groupSizeLabel', title: 'Group Size Label', type: 'string', initialValue: 'How many will you be?' }),
        defineField({ name: 'groupSizeDefaultOption', title: 'Group Size Default Option', type: 'string', initialValue: 'Select group size' }),
        defineField({
          name: 'groupSizeOptions',
          title: 'Group Size Options',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['2-5 people', '6-10 people', '11-20 people', '21-50 people', '50+ people']
        }),
        defineField({ name: 'eventDateLabel', title: 'Event Date Label', type: 'string', initialValue: 'Date of Event' }),
        defineField({ name: 'messageLabel', title: 'Message Label', type: 'string', initialValue: 'Tell us about your vision' }),
        defineField({ name: 'messagePlaceholder', title: 'Message Placeholder', type: 'string', initialValue: 'Describe your dream cinematic event...' }),
        defineField({ name: 'submitButtonText', title: 'Submit Button Text', type: 'string', initialValue: 'Be A Star' }),
        defineField({ name: 'submitButtonLoadingText', title: 'Submit Button Loading Text', type: 'string', initialValue: 'Sending...' }),
      ]
    }),
    defineField({
      name: 'success',
      title: 'Success/Thank You Section',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Success Title', type: 'string', initialValue: 'The Spotlight Awaits!' }),
        defineField({ name: 'message', title: 'Success Message', type: 'text', rows: 3, initialValue: 'Thank you for reaching out. We\'ll be in touch soon to help you create your unforgettable cinematic experience.' }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Back to Home' }),
        defineField({ name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/' }),
      ]
    }),
  ],
})
