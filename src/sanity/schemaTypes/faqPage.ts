import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'preHeading', title: 'Pre-Heading', type: 'string', initialValue: 'Help Center' }),
        defineField({ name: 'mainHeading', title: 'Main Heading', type: 'string', initialValue: 'Questions? We Have Answers.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({ name: 'searchPlaceholder', title: 'Search Placeholder', type: 'string', initialValue: 'Search questions...' }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'FAQ Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Category Name', type: 'string' }),
            defineField({ name: 'slug', title: 'Slug', type: 'string', description: 'Lowercase, no spaces (e.g., "experience")' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
            defineField({ name: 'category', title: 'Category Slug', type: 'string', description: 'Must match a category slug above' }),
          ],
          preview: {
            select: { title: 'question', subtitle: 'category' },
          },
        },
      ],
    }),
    defineField({
      name: 'contactCta',
      title: 'Contact CTA',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'text', title: 'CTA Text', type: 'string', initialValue: 'Still have questions?' }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Contact Us' }),
        defineField({ name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/contact' }),
      ],
    }),
  ],
})
