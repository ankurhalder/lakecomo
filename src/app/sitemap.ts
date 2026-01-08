import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lakecomostyle.it'
  
  const routes = [
    '',
    '/cast',
    '/contact',
    '/crew',
    '/faq',
    '/gallery',
    '/movie',
    '/process',
    '/themes',
    '/venue',
  

  
  ]
  
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
