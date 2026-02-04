import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ship Name Generator | Create Cute Couple Names & Wedding Hashtags',
  description: 'Generate adorable ship names for couples! Combine two names into one cute nickname like Brangelina. Perfect for couples, OTPs, and wedding hashtags. Try our free love calculator too!',
  keywords: [
    'ship name generator',
    'couple name generator',
    'relationship names',
    'wedding hashtag generator',
    'OTP name maker',
    'couple nickname',
    'celebrity couple names',
    'love calculator',
    'relationship compatibility',
  ],
  authors: [{ name: 'Ship Name Generator' }],
  creator: 'Ship Name Generator',
  publisher: 'Ship Name Generator',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ship-name-generator.com',
    siteName: 'Ship Name Generator',
    title: 'Ship Name Generator | Create Cute Couple Names',
    description: 'Generate adorable ship names for couples! Combine two names into cute nicknames like Brangelina.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ship Name Generator - Create Cute Couple Names',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ship Name Generator | Create Cute Couple Names',
    description: 'Generate adorable ship names for couples! Combine two names into cute nicknames.',
    images: ['/og-image.jpg'],
    creator: '@shipnamegen',
  },
  alternates: {
    canonical: 'https://ship-name-generator.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: '#FF6B6B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23FF6B6B'/><path d='M50 75 C50 75, 20 55, 20 35 C20 25, 28 17, 38 17 C44 17, 48 21, 50 25 C52 21, 56 17, 62 17 C72 17, 80 25, 80 35 C80 55, 50 75, 50 75Z' fill='white'/></svg>" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Ship Name Generator',
              description: 'Generate adorable ship names for couples and wedding hashtags',
              url: 'https://ship-name-generator.com',
              applicationCategory: 'EntertainmentApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Organization',
                name: 'Ship Name Generator',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
