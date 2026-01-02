import { client } from './client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export interface GalleryImage {
  imageUrl: string
  alt: string
  caption?: string
  category?: string
}

export interface GalleryFeature {
  title: string
  description?: string
}

export interface GalleryPageData {
  title?: string
  hero?: {
    heading?: string
    subHeading?: string
    agentNote?: string
  }
  heroFeature?: {
    title: string
    subtitle?: string
    tag?: string
    link?: string
  }
  features?: GalleryFeature[]
  images?: GalleryImage[]
}

export async function getGalleryPage(): Promise<GalleryPageData | null> {
  const data = await client.fetch(`
    *[_type == "galleryPage"][0] {
      title,
      hero,
      heroFeature,
      features,
      images[] {
        "imageUrl": asset->url,
        alt,
        caption,
        category
      }
    }
  `)
  
  return data
}
