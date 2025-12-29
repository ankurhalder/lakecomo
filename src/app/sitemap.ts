import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lakecomostyle.it'
  
  const routes = [
    '',
    '/process',
    '/themes',
    '/cast',
    '/movie',
    '/about',
    '/gallery',
    '/contact',
  ]
  
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
