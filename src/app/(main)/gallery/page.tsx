import { getGalleryPage } from '@/sanity/lib/getGalleryPage'
import GalleryContent from './GalleryContent'

export const metadata = {
  title: 'Gallery | Lake Como Style',
  description: 'Behind the scenes of Lake Como Style cinematic experiences',
}

export default async function GalleryPage() {
  const data = await getGalleryPage()
  
  return <GalleryContent data={data} />
}
