/**
 * Ship Name Generator Algorithm
 * Creates romantic couple names by combining two names using various linguistic techniques
 *
 * Optimized with:
 * - True syllable-based mixing (not character-based)
 * - Context-sensitive vowel detection (including 'y')
 * - Extended portmanteau detection (up to 6 characters)
 * - Phonetic equivalence matching
 * - Fluency scoring for result ranking
 * - International character support
 */

import {
  isVowel,
  findFirstVowel,
  findLastVowel,
  countSyllables,
  splitIntoSyllables,
  findBestSplitPoint,
  normalizeToAscii,
} from './phonetics';

import { scoreFluency, sortByFluency } from './fluency-scorer';

export interface ShipResult {
  best: string[];
  funny: string[];
  wedding: string[];
  all: string[];
}

export interface LoveScore {
  score: number;
  message: string;
  emoji: string;
}

/**
 * Capitalize the first letter of a string
 */
function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Phonetic equivalents for enhanced portmanteau detection
 * Allows matching sounds that spell differently
 */
const PHONETIC_EQUIVALENTS: [string, string][] = [
  ['ph', 'f'],
  ['ck', 'k'],
  ['gh', 'f'],
  ['c', 'k'],
  ['c', 's'],
  ['x', 'ks'],
  ['qu', 'kw'],
];

/**
 * Check if two strings are phonetically equivalent
 */
function arePhoneticallyEquivalent(s1: string, s2: string): boolean {
  if (s1 === s2) return true;

  const lower1 = s1.toLowerCase();
  const lower2 = s2.toLowerCase();

  for (const [a, b] of PHONETIC_EQUIVALENTS) {
    if ((lower1 === a && lower2 === b) || (lower1 === b && lower2 === a)) {
      return true;
    }
  }
  return false;
}

/**
 * Vowel Pivot Logic: Blend names at vowel positions
 * Example: Brad + Angelina → Brangelina (take 'Bra' from Brad + 'ngelina' from Angelina)
 */
function vowelPivotMix(name1: string, name2: string): string[] {
  const results: string[] = [];
  const n1 = normalizeToAscii(name1).toLowerCase();
  const n2 = normalizeToAscii(name2).toLowerCase();

  // Method 1: Cut name1 at last vowel + name2 from first vowel
  const lastVowel1 = findLastVowel(n1);
  const firstVowel2 = findFirstVowel(n2);

  if (lastVowel1 > 0 && firstVowel2 > 0) {
    const mix1 = n1.slice(0, lastVowel1) + n2.slice(firstVowel2);
    results.push(capitalize(mix1));
  }

  // Method 2: Cut name1 at first vowel + full name2
  const firstVowel1 = findFirstVowel(n1);
  if (firstVowel1 > 1) {
    const mix2 = n1.slice(0, firstVowel1) + n2;
    results.push(capitalize(mix2));
  }

  // Method 3: Full name1 + cut name2 at first vowel
  if (firstVowel2 > 1) {
    const mix3 = n1 + n2.slice(firstVowel2);
    results.push(capitalize(mix3));
  }

  // Method 4: Blend at vowel sounds - take first part of name1 up to vowel + rest of name2 from vowel
  if (firstVowel1 >= 0 && firstVowel2 >= 0) {
    const mix4 = n1.slice(0, firstVowel1 + 1) + n2.slice(firstVowel2 + 1);
    results.push(capitalize(mix4));
  }

  return results;
}

/**
 * Enhanced Portmanteau Logic: Merge names when they share letters
 * Extended to check up to 6 character overlaps and phonetic equivalents
 * Example: Brad + Angelina → Brangelina (d + A overlap)
 */
function portmanteauMix(name1: string, name2: string): string[] {
  const results: string[] = [];
  const n1 = normalizeToAscii(name1).toLowerCase();
  const n2 = normalizeToAscii(name2).toLowerCase();

  // Extended overlap check (up to 6 characters, was 3)
  const maxOverlap = Math.min(n1.length, n2.length, 6);

  for (let i = maxOverlap; i >= 1; i--) {
    const end1 = n1.slice(-i);
    const start2 = n2.slice(0, i);

    // Exact match
    if (end1 === start2) {
      const blend = n1 + n2.slice(i);
      results.push(capitalize(blend));
    }

    // Phonetic similarity match
    if (i <= 2 && arePhoneticallyEquivalent(end1, start2)) {
      const blend = n1.slice(0, -i) + n2;
      if (!results.includes(capitalize(blend))) {
        results.push(capitalize(blend));
      }
    }
  }

  // Check for middle overlaps (e.g., "Michael" + "Elena" -> "Michelena")
  for (let i = 1; i < n1.length - 1; i++) {
    const suffix1 = n1.slice(i);
    for (let j = 2; j <= Math.min(suffix1.length, 4); j++) {
      const overlap = suffix1.slice(0, j);
      if (n2.toLowerCase().startsWith(overlap)) {
        const blend = n1.slice(0, i) + n2;
        const capitalized = capitalize(blend);
        if (!results.includes(capitalized) && blend.length <= 15) {
          results.push(capitalized);
        }
      }
    }
  }

  return Array.from(new Set(results)); // Remove duplicates
}

/**
 * Enhanced Syllable-based mixing using true syllable detection
 * Now uses phonetic syllable boundaries instead of character count
 */
function syllableMix(name1: string, name2: string): string[] {
  const results: string[] = [];
  const n1 = normalizeToAscii(name1).toLowerCase();
  const n2 = normalizeToAscii(name2).toLowerCase();

  // Get syllables for both names
  const syllables1 = splitIntoSyllables(n1);
  const syllables2 = splitIntoSyllables(n2);

  // Method 1: First syllable(s) of name1 + last syllable(s) of name2
  if (syllables1.length >= 1 && syllables2.length >= 1) {
    const firstHalf1 = syllables1.slice(0, Math.ceil(syllables1.length / 2)).join('');
    const secondHalf2 = syllables2.slice(Math.floor(syllables2.length / 2)).join('');
    results.push(capitalize(firstHalf1 + secondHalf2));
  }

  // Method 2: First syllable of name1 + all of name2 except first syllable
  if (syllables1.length >= 1 && syllables2.length >= 2) {
    const first1 = syllables1[0];
    const rest2 = syllables2.slice(1).join('');
    results.push(capitalize(first1 + rest2));
  }

  // Method 3: All of name1 except last syllable + last syllable of name2
  if (syllables1.length >= 2 && syllables2.length >= 1) {
    const start1 = syllables1.slice(0, -1).join('');
    const last2 = syllables2[syllables2.length - 1];
    results.push(capitalize(start1 + last2));
  }

  // Method 4: Use best split points (based on syllable boundaries near middle)
  const split1 = findBestSplitPoint(n1);
  const split2 = findBestSplitPoint(n2);
  results.push(capitalize(n1.slice(0, split1) + n2.slice(split2)));

  // Method 5: Cross-combine first and last syllables
  if (syllables1.length >= 1 && syllables2.length >= 1) {
    const first1 = syllables1[0];
    const last2 = syllables2[syllables2.length - 1];
    if (first1 + last2 !== n1 && first1 + last2 !== n2) {
      results.push(capitalize(first1 + last2));
    }
  }

  return Array.from(new Set(results)); // Remove duplicates
}

/**
 * Classic ship name combinations
 */
function classicMix(name1: string, name2: string): string[] {
  const results: string[] = [];
  const n1 = capitalize(normalizeToAscii(name1));
  const n2 = capitalize(normalizeToAscii(name2));

  // First 2 letters of name1 + full name2
  if (name1.length >= 2) {
    results.push(name1.slice(0, 2) + n2);
  }

  // Full name1 + last 2-3 letters of name2
  if (name2.length >= 3) {
    results.push(n1 + name2.slice(-3));
  }

  // First 3 letters of each
  if (name1.length >= 3 && name2.length >= 3) {
    results.push(capitalize(name1.slice(0, 3) + name2.slice(0, 3)));
  }

  return results;
}

/**
 * Funny/Playful combinations
 * Now uses syllable detection and fluency scoring
 */
function funnyMix(name1: string, name2: string): string[] {
  const results: string[] = [];
  const n1 = normalizeToAscii(name1).toLowerCase();
  const n2 = normalizeToAscii(name2).toLowerCase();

  // Get syllables for both names
  const syllables1 = splitIntoSyllables(n1);
  const syllables2 = splitIntoSyllables(n2);

  // Simple concatenation (original)
  results.push(capitalize(n1 + n2));
  results.push(capitalize(n2 + n1));

  // Syllable-based fun combinations
  if (syllables1.length >= 1 && syllables2.length >= 1) {
    // First syllable + first syllable + "y"
    results.push(capitalize(syllables1[0] + syllables2[0] + 'y'));

    // First syllable of name1 + last syllable of name2 + "ie"
    const last2 = syllables2[syllables2.length - 1];
    results.push(capitalize(syllables1[0] + last2 + 'ie'));

    // Last syllable of name1 + first syllable of name2
    const last1 = syllables1[syllables1.length - 1];
    results.push(capitalize(last1 + syllables2[0]));
  }

  // With 'y' ending for cuteness (original)
  results.push(capitalize(n1.slice(0, Math.min(3, n1.length)) + n2.slice(0, Math.min(3, n2.length)) + 'y'));

  // Reversed combination (original)
  results.push(capitalize(n1.split('').reverse().join('') + n2));

  // With 'ie' ending (original)
  results.push(capitalize(n1[0] + n2 + 'ie'));

  // Remove duplicates and sort by fluency
  return sortByFluency(Array.from(new Set(results)));
}

/**
 * Get top N ship names sorted by fluency score
 * Used for generating high-quality hashtag variations
 */
function getTopShipNames(name1: string, name2: string, count: number): string[] {
  const vowelResults = vowelPivotMix(name1, name2);
  const portmanteauResults = portmanteauMix(name1, name2);
  const syllableResults = syllableMix(name1, name2);

  const allResults = [...portmanteauResults, ...vowelResults, ...syllableResults];
  const sorted = sortByFluency(allResults);

  // Deduplicate (case-insensitive) and return top N
  const unique: string[] = [];
  for (const name of sorted) {
    const lower = name.toLowerCase();
    if (!unique.some(n => n.toLowerCase() === lower)) {
      unique.push(name);
    }
    if (unique.length >= count) break;
  }

  return unique;
}

/**
 * Generate wedding hashtags
 * Now uses multiple high-quality ship name variations
 */
function weddingHashtags(name1: string, name2: string, lastName?: string): string[] {
  const results: string[] = [];
  const n1 = capitalize(normalizeToAscii(name1));
  const n2 = capitalize(normalizeToAscii(name2));
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  // Basic combinations
  results.push(`#${n1}And${n2}Forever`);
  results.push(`#${n1}And${n2}Wedding`);
  results.push(`#${n1}Loves${n2}`);
  results.push(`#${n2}Loves${n1}`);

  // With years
  results.push(`#${n1}And${n2}${currentYear}`);
  results.push(`#${n1}And${n2}${nextYear}`);
  results.push(`#${n1}${n2}Wedding${currentYear}`);

  // Romantic phrases
  results.push(`#${n1}And${n2}TieTheKnot`);
  results.push(`#${n1}And${n2}Hitched`);
  results.push(`#Finally${n1}And${n2}`);
  results.push(`#${n1}And${n2}SayIDo`);
  results.push(`#HappilyEver${n1}And${n2}`);

  // With last name if provided
  if (lastName) {
    const ln = capitalize(normalizeToAscii(lastName));
    results.push(`#The${ln}s${currentYear}`);
    results.push(`#The${ln}Wedding`);
    results.push(`#${n1}And${n2}${ln}`);
  }

  // Creative combinations with multiple high-quality ship names
  const topShipNames = getTopShipNames(name1, name2, 3);

  for (const shipName of topShipNames) {
    results.push(`#${shipName}Wedding`);
    results.push(`#Team${shipName}`);
    results.push(`#${shipName}Forever`);
  }

  // Syllable-based creative hashtag
  const syllables1 = splitIntoSyllables(normalizeToAscii(name1).toLowerCase());
  const syllables2 = splitIntoSyllables(normalizeToAscii(name2).toLowerCase());

  if (syllables1.length >= 1 && syllables2.length >= 1) {
    const syllableBlend = capitalize(syllables1[0] + syllables2[syllables2.length - 1]);
    results.push(`#${syllableBlend}SaysIDo`);
    results.push(`#${syllableBlend}InLove`);
  }

  return results;
}

/**
 * Get the single best ship name
 * Now uses fluency scoring to determine the best result
 */
function generateBestShipName(name1: string, name2: string): string {
  const vowelResults = vowelPivotMix(name1, name2);
  const portmanteauResults = portmanteauMix(name1, name2);

  // Combine and score all results
  const allResults = [...portmanteauResults, ...vowelResults];

  if (allResults.length > 0) {
    // Sort by fluency and return the best
    const sorted = sortByFluency(allResults);
    return sorted[0];
  }

  // Fallback: use syllable-based blend
  const split1 = findBestSplitPoint(name1);
  const split2 = findBestSplitPoint(name2);
  return capitalize(name1.slice(0, split1) + name2.slice(split2));
}

/**
 * Main function to generate all ship names
 * Results are now sorted by fluency score
 */
export function generateShipNames(name1: string, name2: string, lastName?: string): ShipResult {
  if (!name1 || !name2 || name1.trim() === '' || name2.trim() === '') {
    return { best: [], funny: [], wedding: [], all: [] };
  }

  const trimmed1 = name1.trim();
  const trimmed2 = name2.trim();

  // Generate all types
  const vowelResults = vowelPivotMix(trimmed1, trimmed2);
  const portmanteauResults = portmanteauMix(trimmed1, trimmed2);
  const syllableResults = syllableMix(trimmed1, trimmed2);
  const classicResults = classicMix(trimmed1, trimmed2);
  const funnyResults = funnyMix(trimmed1, trimmed2);
  const weddingResults = weddingHashtags(trimmed1, trimmed2, lastName);

  // Combine best results (unique) - prioritize portmanteau and vowel pivot
  const bestCandidates = [
    ...portmanteauResults,
    ...vowelResults,
    ...syllableResults.slice(0, 2),
    ...classicResults.slice(0, 2),
  ];

  // Sort by fluency score and deduplicate
  const sortedBest = sortByFluency(bestCandidates);
  const bestSet = new Set<string>();
  for (const name of sortedBest) {
    if (bestSet.size >= 6) break;
    const lowerName = name.toLowerCase();
    // Avoid duplicates (case-insensitive)
    if (!Array.from(bestSet).some(n => n.toLowerCase() === lowerName)) {
      bestSet.add(name);
    }
  }

  // Ensure we have at least some best results
  if (bestSet.size < 3) {
    bestSet.add(generateBestShipName(trimmed1, trimmed2));
    bestSet.add(capitalize(trimmed1.slice(0, 2) + trimmed2));
    bestSet.add(capitalize(trimmed1 + trimmed2.slice(-2)));
  }

  const best = Array.from(bestSet).slice(0, 6);
  const funny = funnyResults.slice(0, 4);
  const wedding = weddingResults;

  // All unique results
  const allSet = new Set<string>([...best, ...vowelResults, ...portmanteauResults, ...syllableResults, ...classicResults, ...funny]);
  const all = Array.from(allSet);

  return { best, funny, wedding, all };
}

/**
 * Seeded random number generator for consistent love scores
 * Using xorshift algorithm for better distribution
 */
function seededRandom(seed: number): number {
  let x = seed;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return ((x >>> 0) % 100) / 100;
}

/**
 * Generate a seed from two names
 */
function generateSeed(name1: string, name2: string): number {
  const combined = normalizeToAscii(name1 + name2).toLowerCase();
  let seed = 0;
  for (let i = 0; i < combined.length; i++) {
    seed = ((seed << 5) - seed) + combined.charCodeAt(i);
    seed = seed & seed; // Convert to 32bit integer
  }
  return Math.abs(seed) || 1;
}

/**
 * Calculate love compatibility score
 * Now considers additional factors like shared letters and phonetic harmony
 */
export function calculateLoveScore(name1: string, name2: string): LoveScore {
  if (!name1 || !name2 || name1.trim() === '' || name2.trim() === '') {
    return { score: 0, message: 'Enter two names to calculate love!', emoji: '💝' };
  }

  const n1 = normalizeToAscii(name1.trim()).toLowerCase();
  const n2 = normalizeToAscii(name2.trim()).toLowerCase();

  const seed = generateSeed(name1.trim(), name2.trim());
  const baseScore = Math.floor(seededRandom(seed) * 40) + 60; // Score between 60-99

  // Add some determinism based on name length compatibility
  const len1 = n1.length;
  const len2 = n2.length;
  const lenDiff = Math.abs(len1 - len2);
  const lenBonus = Math.max(0, 5 - lenDiff); // Names with similar length get bonus

  // New: Bonus for shared letters
  const set1 = new Set(n1.split(''));
  const set2 = new Set(n2.split(''));
  let sharedLetters = 0;
  Array.from(set1).forEach(letter => {
    if (set2.has(letter)) sharedLetters++;
  });
  const sharedBonus = Math.min(5, Math.floor(sharedLetters / 2));

  // New: Bonus for similar syllable count
  const syllables1 = countSyllables(n1);
  const syllables2 = countSyllables(n2);
  const syllableDiff = Math.abs(syllables1 - syllables2);
  const syllableBonus = syllableDiff === 0 ? 3 : syllableDiff === 1 ? 1 : 0;

  let score = Math.min(99, baseScore + lenBonus + sharedBonus + syllableBonus);

  // Special cases
  if (n1 === n2) {
    score = 100;
  }

  // Determine message based on score
  let message: string;
  let emoji: string;

  if (score >= 95) {
    message = 'Soulmates! 💫 This is a match made in heaven!';
    emoji = '💫';
  } else if (score >= 85) {
    message = 'Perfect Match! 🌟 You two are meant to be together!';
    emoji = '🌟';
  } else if (score >= 75) {
    message = 'Great Chemistry! 💕 Strong connection and compatibility!';
    emoji = '💕';
  } else if (score >= 65) {
    message = 'Good Potential! 💗 With some effort, this could be beautiful!';
    emoji = '💗';
  } else {
    message = 'Interesting Dynamic! 💝 Every relationship is unique!';
    emoji = '💝';
  }

  return { score, message, emoji };
}

/**
 * Generate ship name for URL/SEO purposes
 */
export function generateSlug(name1: string, name2: string): string {
  const shipName = generateBestShipName(name1, name2);
  return shipName.toLowerCase().replace(/[^a-z0-9]/g, '-');
}
