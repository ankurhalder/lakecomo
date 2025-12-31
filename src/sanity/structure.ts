import type {StructureResolver} from 'sanity/structure'

const SCHEMA_TYPES = [
  'homepage',
  'navbar', 
  'footer',
  'themesPage',
  'castPage',
  'processPage',
  'moviePage',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(
      SCHEMA_TYPES.map((type) =>
        S.listItem()
          .title(type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1'))
          .schemaType(type)
          .child(S.documentTypeList(type))
      )
    )
