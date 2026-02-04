# Ship Name Generator

A beautiful, modern web application for generating couple nicknames (ship names) and wedding hashtags. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Ship Name Generator](https://ship-name-generator.com/og-image.jpg)

## Features

- 🚢 **Smart Name Mixing Algorithm**: Uses vowel pivoting and portmanteau techniques
- 💕 **Love Calculator**: Seeded random compatibility score with animations
- 📱 **Mobile-First Design**: Fully responsive and touch-friendly
- 🎨 **Beautiful UI**: Romantic color palette with smooth animations
- 📸 **Ship Certificates**: Downloadable shareable certificates
- 🏷️ **Wedding Hashtags**: Specialized generator with year options
- 🔍 **SEO Optimized**: Meta tags, structured data, and semantic HTML
- ♿ **Accessible**: A11y compliant with keyboard navigation

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Canvas**: [html2canvas](https://html2canvas.hertzen.com/) (for certificates)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ship-name-generator.git
cd ship-name-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ship-name-generator/
├── app/
│   ├── globals.css          # Global styles & Tailwind
│   ├── layout.tsx           # Root layout with SEO
│   ├── page.tsx             # Homepage
│   └── wedding-hashtag-generator/
│       └── page.tsx         # Wedding hashtag page
├── components/
│   ├── LoveMeter.tsx        # Love score component
│   ├── NameInput.tsx        # Name input form
│   ├── ResultCard.tsx       # Result display card
│   └── ShipCertificate.tsx  # Certificate modal
├── utils/
│   └── ship-algorithm.ts    # Name mixing algorithms
├── public/
│   └── site.webmanifest     # PWA manifest
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Algorithm Details

The ship name generator uses multiple techniques to create natural-sounding couple names:

1. **Vowel Pivot Logic**: Cuts names at vowel positions for smooth blending
2. **Portmanteau Logic**: Merges names when they share starting/ending letters
3. **Syllable Mixing**: Combines first/second halves of names
4. **Classic Combinations**: Traditional blending patterns

The love calculator uses a seeded random generator based on character codes for consistent results.

## Deployment

This project is optimized for [Vercel](https://vercel.com/) deployment:

```bash
npm run build
```

Or deploy directly with the Vercel CLI:

```bash
vercel
```

## SEO Features

- Comprehensive meta tags and Open Graph data
- JSON-LD structured data
- Semantic HTML with proper heading hierarchy
- Canonical URLs and sitemap ready
- Mobile-optimized viewport settings

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

Made with ❤️ for couples everywhere!
