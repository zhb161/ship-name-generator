/**
 * Ship Name Generator Algorithm
 * Creates romantic couple names by combining two names using various linguistic techniques
 */

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

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

/**
 * Check if a character is a vowel
 */
function isVowel(char: string): boolean {
  return VOWELS.has(char);
}

/**
 * Find the first vowel index in a string
 */
function findFirstVowel(str: string): number {
  for (let i = 0; i < str.length; i++) {
    if (isVowel(str[i])) return i;
  }
  return -1;
}

/**
 * Find the last vowel index in a string
 */
function findLastVowel(str: string): number {
  for (let i = str.length - 1; i >= 0; i--) {
    if (isVowel(str[i])) return i;
  }
  return -1;
}

/**
 * Find the last consonant cluster index (for better portmanteaus)
 */
function findLastConsonantCluster(str: string): number {
  let i = str.length - 1;
  while (i >= 0 && !isVowel(str[i])) {
    i--;
  }
  return i + 1;
}

/**
 * Capitalize the first letter of a string
 */
function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Vowel Pivot Logic: Blend names at vowel positions
 * Example: Brad + Angelina → Brangelina (take 'Bra' from Brad + 'ngelina' from Angelina)
 */
function vowelPivotMix(name1: string, name2: string): string[] {
  const results: string[] = [];
  const n1 = name1.toLowerCase();
  const n2 = name2.toLowerCase();
  
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
 * Portmanteau Logic: Merge names when they share letters
 * Example: Brad + Angelina → Brangelina (d + A overlap)
 */
function portmanteauMix(name1: string, name2: string): string[] {
  const results: string[] = [];
  const n1 = name1.toLowerCase();
  const n2 = name2.toLowerCase();
  
  // Check if name1 ends with same letter name2 starts with
  if (n1[n1.length - 1] === n2[0]) {
    results.push(capitalize(n1 + n2.slice(1)));
  }
  
  // Check for last 2 letters match
  if (n1.length >= 2 && n2.length >= 2) {
    if (n1.slice(-2) === n2.slice(0, 2)) {
      results.push(capitalize(n1 + n2.slice(2)));
    }
  }
  
  // Check for any overlapping ending/starting sequences
  for (let i = Math.min(n1.length, 3); i >= 1; i--) {
    const end1 = n1.slice(-i);
    const start2 = n2.slice(0, i);
    if (end1 === start2 && i >= 2) {
      results.push(capitalize(n1 + n2.slice(i)));
    }
  }
  
  return results;
}

/**
 * Syllable-based mixing
 */
function syllableMix(name1: string, name2: string): string[] {
  const results: string[] = [];
  const n1 = name1.toLowerCase();
  const n2 = name2.toLowerCase();
  
  // Approximate syllable by taking first half of name1 + second half of name2
  const half1 = Math.ceil(n1.length / 2);
  const half2 = Math.floor(n2.length / 2);
  
  results.push(capitalize(n1.slice(0, half1) + n2.slice(half2)));
  
  // First half of both
  results.push(capitalize(n1.slice(0, half1) + n2.slice(0, half2)));
  
  // Second half of both
  results.push(capitalize(n1.slice(half1) + n2.slice(half2)));
  
  return results;
}

/**
 * Classic ship name combinations
 */
function classicMix(name1: string, name2: string): string[] {
  const results: string[] = [];
  const n1 = capitalize(name1);
  const n2 = capitalize(name2);
  
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
 */
function funnyMix(name1: string, name2: string): string[] {
  const results: string[] = [];
  const n1 = name1.toLowerCase();
  const n2 = name2.toLowerCase();
  
  // Simple concatenation
  results.push(capitalize(n1 + n2));
  results.push(capitalize(n2 + n1));
  
  // With 'y' ending for cuteness
  results.push(capitalize(n1.slice(0, Math.min(3, n1.length)) + n2.slice(0, Math.min(3, n2.length)) + 'y'));
  
  // Reversed combination
  results.push(capitalize(n1.split('').reverse().join('') + n2));
  
  // With 'ie' ending
  results.push(capitalize(n1[0] + n2 + 'ie'));
  
  return results;
}

/**
 * Generate wedding hashtags
 */
function weddingHashtags(name1: string, name2: string, lastName?: string): string[] {
  const results: string[] = [];
  const n1 = capitalize(name1);
  const n2 = capitalize(name2);
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
    const ln = capitalize(lastName);
    results.push(`#The${ln}s${currentYear}`);
    results.push(`#The${ln}Wedding`);
    results.push(`#${n1}And${n2}${ln}`);
  }
  
  // Creative combinations
  const shipName = generateBestShipName(name1, name2);
  results.push(`#${shipName}Wedding`);
  results.push(`#Team${shipName}`);
  
  return results;
}

/**
 * Get the single best ship name
 */
function generateBestShipName(name1: string, name2: string): string {
  const vowelResults = vowelPivotMix(name1, name2);
  const portmanteauResults = portmanteauMix(name1, name2);
  
  // Prefer portmanteau if available (more natural sounding)
  if (portmanteauResults.length > 0) {
    return portmanteauResults[0];
  }
  
  // Otherwise use vowel pivot
  if (vowelResults.length > 0) {
    return vowelResults[0];
  }
  
  // Fallback: simple blend
  return capitalize(name1.slice(0, Math.ceil(name1.length / 2)) + name2.slice(Math.floor(name2.length / 2)));
}

/**
 * Main function to generate all ship names
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
  
  // Combine best results (unique)
  const bestSet = new Set<string>([
    ...portmanteauResults.slice(0, 2),
    ...vowelResults.slice(0, 2),
    ...classicResults.slice(0, 2),
  ]);
  
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
  const combined = (name1 + name2).toLowerCase();
  let seed = 0;
  for (let i = 0; i < combined.length; i++) {
    seed = ((seed << 5) - seed) + combined.charCodeAt(i);
    seed = seed & seed; // Convert to 32bit integer
  }
  return Math.abs(seed) || 1;
}

/**
 * Calculate love compatibility score
 */
export function calculateLoveScore(name1: string, name2: string): LoveScore {
  if (!name1 || !name2 || name1.trim() === '' || name2.trim() === '') {
    return { score: 0, message: 'Enter two names to calculate love!', emoji: '💝' };
  }
  
  const seed = generateSeed(name1.trim(), name2.trim());
  const baseScore = Math.floor(seededRandom(seed) * 40) + 60; // Score between 60-99
  
  // Add some determinism based on name length compatibility
  const len1 = name1.length;
  const len2 = name2.length;
  const lenDiff = Math.abs(len1 - len2);
  const lenBonus = Math.max(0, 5 - lenDiff); // Names with similar length get bonus
  
  let score = Math.min(99, baseScore + lenBonus);
  
  // Special cases
  if (name1.toLowerCase() === name2.toLowerCase()) {
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
