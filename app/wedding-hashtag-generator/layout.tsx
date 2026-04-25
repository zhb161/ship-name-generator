import { Metadata } from 'next'
import { pageUrl } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Wedding Hashtag Generator - Create Custom Wedding Hashtags',
  description: 'Generate custom wedding hashtags from names, wedding year, and last name. Create memorable hashtags for Instagram, TikTok, invitations, and guest photos.',
  keywords: [
    'wedding hashtag generator',
    'wedding hashtag ideas',
    'custom wedding hashtag',
    'wedding instagram hashtag',
    'couple hashtag maker',
  ],
  openGraph: {
    title: 'Wedding Hashtag Generator - Create Custom Wedding Hashtags',
    description: 'Generate custom wedding hashtags from names, wedding year, and last name.',
    url: pageUrl('/wedding-hashtag-generator'),
  },
  alternates: {
    canonical: pageUrl('/wedding-hashtag-generator'),
  },
}

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
