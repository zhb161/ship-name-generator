import { MetadataRoute } from 'next'
import { pageUrl } from '@/utils/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: pageUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: pageUrl('/couple-ship-name-generator'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: pageUrl('/random-ship-name-generator'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: pageUrl('/wedding-hashtag-generator'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: pageUrl('/privacy-policy'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: pageUrl('/terms-of-service'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
