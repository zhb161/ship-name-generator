# Ship Name Generator - Agent Guide

## Project Overview

Ship Name Generator is a web application for generating couple nicknames (ship names) and wedding hashtags. It uses linguistic algorithms including vowel pivoting and portmanteau techniques to blend two names naturally into adorable combinations like "Brangelina" (Brad + Angelina).

**Key Features:**
- Smart name mixing using multiple linguistic algorithms
- Love calculator with seeded random compatibility scores
- Downloadable ship certificates using html2canvas
- Wedding hashtag generator with year options
- Mobile-first responsive design with romantic styling

## Technology Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict mode enabled)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Canvas:** [html2canvas](https://html2canvas.hertzen.com/) (for certificate generation)
- **Build Output:** Static export (images unoptimized)

## Project Structure

```
ship-name-generator/
├── app/                              # Next.js App Router
│   ├── globals.css                   # Global styles, Tailwind imports, custom CSS
│   ├── layout.tsx                    # Root layout with SEO metadata, structured data
│   ├── page.tsx                      # Homepage (ship name generator)
│   └── wedding-hashtag-generator/
│       └── page.tsx                  # Wedding hashtag generator page
├── components/                       # React components (all client components)
│   ├── LoveMeter.tsx                 # Animated love score display
│   ├── NameInput.tsx                 # Dual name input form with heart icon
│   ├── ResultCard.tsx                # Result card with copy functionality
│   └── ShipCertificate.tsx           # Certificate modal with download
├── utils/
│   └── ship-algorithm.ts             # Name mixing algorithms and love score logic
├── public/
│   └── site.webmanifest              # PWA manifest
├── package.json                      # Dependencies and scripts
├── tailwind.config.ts                # Tailwind with custom colors/animations
├── next.config.js                    # Next.js config (static export)
├── tsconfig.json                     # TypeScript config with path aliases
└── postcss.config.js                 # PostCSS with Tailwind + autoprefixer
```

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production (outputs to .next/)
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Key Configuration Details

### Path Aliases
The project uses `@/*` as a path alias pointing to the project root:
```typescript
// Example import
import { generateShipNames } from '@/utils/ship-algorithm';
import NameInput from '@/components/NameInput';
```

### Tailwind Customizations
- **Custom Colors:** `coral` (romantic red), `purple.soft` (accent), `cream` (background)
- **Custom Animations:** `heart-beat`, `fade-in`, `slide-up`, `pulse-soft`
- **Custom Shadows:** `soft`, `soft-lg`, `glow`
- **Fonts:** Inter (body), Poppins (display)

### Next.js Configuration
- `reactStrictMode: true`
- `images.unoptimized: true` (required for static export)
- Output is configured for static site generation

## Code Organization

### Component Patterns
All components are **Client Components** (`'use client'`) because they use:
- React hooks (useState, useEffect, useRef)
- Browser APIs (navigator.clipboard, html2canvas)
- Event handlers

### Algorithm Structure (`utils/ship-algorithm.ts`)
The core algorithm exports:
- `generateShipNames(name1, name2, lastName?)` - Returns `ShipResult` with best/funny/wedding names
- `calculateLoveScore(name1, name2)` - Returns `LoveScore` with seeded random score
- `generateSlug(name1, name2)` - SEO-friendly URL slug

Mixing algorithms include:
1. **Vowel Pivot Logic** - Cuts names at vowel positions for smooth blending
2. **Portmanteau Logic** - Merges names when they share starting/ending letters
3. **Syllable Mixing** - Combines halves of names
4. **Classic Combinations** - Traditional blending patterns
5. **Funny Mix** - Playful/creative combinations

### Styling Patterns
- Use Tailwind utility classes exclusively
- Custom classes defined in `globals.css`: `.btn-romantic`, `.input-romantic`, `.card-hover`, `.text-gradient`, `.glass`
- All components use responsive prefixes (`sm:`, `md:`, `lg:`) for mobile-first design
- Glassmorphism effect via `.glass` class (backdrop blur + translucent background)

## SEO and Meta Configuration

SEO is configured in `app/layout.tsx`:
- Comprehensive meta tags, Open Graph, Twitter Cards
- JSON-LD structured data for WebApplication
- Canonical URLs and keyword optimization
- Viewport configuration with theme color

## Testing

**No test framework is currently configured.** The project does not include:
- Jest
- Vitest
- Cypress/Playwright
- Any test files

To add testing, you would need to install and configure a test runner.

## Deployment

The project is optimized for **Vercel** deployment:
```bash
# Using Vercel CLI
vercel

# Or build locally
npm run build
```

The build produces a static site suitable for any static hosting platform.

## Development Conventions

### File Naming
- Components: PascalCase (`LoveMeter.tsx`)
- Utilities: kebab-case (`ship-algorithm.ts`)
- Pages: lowercase (`page.tsx`)

### Code Style
- TypeScript with strict mode
- Explicit return types on exported functions
- Interface-based props (no inline type definitions)
- Single quotes for strings
- Semicolons required

### Accessibility
- All inputs have associated labels (visually hidden with `sr-only` if needed)
- Focus visible styles defined in globals.css
- ARIA labels on icon buttons
- Semantic HTML structure
- Keyboard navigation support

## Security Considerations

- No sensitive environment variables currently used
- No API keys or authentication
- `dangerouslySetInnerHTML` is used only for JSON-LD structured data (safe)
- Clipboard access uses modern `navigator.clipboard` API with fallbacks

## Adding New Features

When adding new features:
1. Components go in `/components` with PascalCase names
2. Utility functions go in `/utils` with kebab-case names
3. New pages go in `/app` following Next.js App Router conventions
4. Update `tailwind.config.ts` for new theme values
5. Add route to navigation in both `page.tsx` and `layout.tsx` if needed
