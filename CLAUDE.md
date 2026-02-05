# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ship Name Generator is a Next.js 14 web application that creates couple nicknames (ship names) and wedding hashtags. It uses linguistic algorithms to blend two names naturally (e.g., "Brad" + "Angelina" → "Brangelina").

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Core Algorithm ([utils/ship-algorithm.ts](utils/ship-algorithm.ts))

The name generation uses four mixing techniques:
1. **Vowel Pivot** - Blends names at vowel positions for natural flow
2. **Portmanteau** - Merges names when they share letter patterns
3. **Syllable Mix** - Combines halves of each name
4. **Classic Mix** - Simple prefix/suffix combinations

Key exports:
- `generateShipNames(name1, name2, lastName?)` → Returns `ShipResult` with `best`, `funny`, `wedding` arrays
- `calculateLoveScore(name1, name2)` → Returns `LoveScore` with deterministic score (same names = same result)

### App Router Pages

- `/` ([app/page.tsx](app/page.tsx)) - Main ship name generator
- `/wedding-hashtag-generator` - Dedicated wedding hashtag page
- `/privacy-policy`, `/terms-of-service` - Legal pages

### Components

| Component | Purpose |
|-----------|---------|
| `NameInput` | Dual input form with heart icon separator |
| `ResultCard` | Displays a generated name with copy-to-clipboard |
| `LoveMeter` | Animated circular progress showing love score |
| `ShipCertificate` | Modal with downloadable certificate (uses html2canvas) |

### Styling

- **Custom colors**: `coral-*` (primary pink/red) and `purple-*` palettes defined in [tailwind.config.ts](tailwind.config.ts)
- **Fonts**: Inter (body), Poppins (display) - loaded via CSS in globals.css
- **Custom classes in globals.css**: `.glass` (glassmorphism), `.text-gradient`, `.card-hover`, `.btn-romantic`, `.input-romantic`
- **Animations**: `heart-beat`, `fade-in`, `slide-up`, `pulse-soft`
