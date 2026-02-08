import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ship-name-generator.com'),
  title: 'Ship Name Generator | Create Cute Couple Names & Wedding Hashtags',
  description: 'Generate adorable ship names for couples! Combine two names into one cute nickname like Brangelina. Perfect for couples, OTPs, and wedding hashtags. Try our free love calculator too!',
  keywords: [
    'ship name generator',
    'couple name generator',
    'relationship name generator',
    'name combiner',
    'celebrity couple names',
    'wedding hashtag generator',
    'OTP name maker',
    'love calculator',
    'couple nickname generator',
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
  // verification: {
  //   google: 'your-google-verification-code', // TODO: 添加真实的 Google Search Console 验证码
  // },
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KZGTR5L5NK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KZGTR5L5NK');
          `}
        </Script>

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
