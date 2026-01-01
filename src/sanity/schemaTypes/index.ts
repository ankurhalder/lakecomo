import { type SchemaTypeDefinition } from 'sanity'
import homepage from './homepage'
import footer from './footer'
import navbar from './navbar'
import featureCard from './objects/featureCard'
import themesPage from './themesPage'
import castPage from './castPage'
import processPage from './processPage'
import moviePage from './moviePage'
import crewPage from './crewPage'
import venuePage from './venuePage'
import galleryPage from './galleryPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homepage,
    navbar,
    footer,
    featureCard,
    themesPage,
    castPage,
    processPage,
    moviePage,
    crewPage,
    venuePage,
    galleryPage,
  ],
}