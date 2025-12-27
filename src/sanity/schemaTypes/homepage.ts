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
      initialValue: 'Lake Como Edition'
    }),
    defineField({
      name: 'hero3DModel',
      title: 'Hero 3D Model (.glb)',
      type: 'file',
      options: { accept: '.glb,.gltf' }
    }),
  ],
})