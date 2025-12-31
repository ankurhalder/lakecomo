import { type SchemaTypeDefinition } from 'sanity'
import homepage from './homepage'
import footer from './footer'
import navbar from './navbar'
import featureCard from './objects/featureCard'
import themesPage from './themesPage'
import castPage from './castPage'
import processPage from './processPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homepage,
    navbar,
    footer,
    featureCard,
    themesPage,
    castPage,
    processPage,
  ],
}