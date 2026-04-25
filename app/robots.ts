import { MetadataRoute } from 'next'
import { pageUrl } from '@/utils/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: pageUrl('/sitemap.xml'),
  }
}
