import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding Hashtag Generator | Create Unique Wedding Hashtags',
  description: 'Generate creative wedding hashtags for your special day! Combine names into memorable hashtags for Instagram, TikTok and social media. Free and easy to use.',
  keywords: [
    'wedding hashtag generator',
    'wedding hashtag ideas',
    'custom wedding hashtag',
    'wedding instagram hashtag',
    'couple hashtag maker',
  ],
  openGraph: {
    title: 'Wedding Hashtag Generator | Create Unique Wedding Hashtags',
    description: 'Generate creative wedding hashtags for your special day!',
    url: 'https://ship-name-generator.com/wedding-hashtag-generator',
  },
  alternates: {
    canonical: 'https://ship-name-generator.com/wedding-hashtag-generator',
  },
}

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
