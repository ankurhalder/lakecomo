import { type SchemaTypeDefinition } from 'sanity'
import homepage from './homepage'
import footer from './footer'
import navbar from './navbar'
import featureCard from './objects/featureCard'
import processPage from './processPage'
import themesPage from './themesPage'
import castPage from './castPage'
import moviePage from './moviePage'
import aboutPage from './aboutPage'
import galleryPage from './galleryPage'
import contactPage from './contactPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homepage,
    navbar,
    footer,
    featureCard,
    processPage,
    themesPage,
    castPage,
    moviePage,
    aboutPage,
    galleryPage,
    contactPage
  ],
}