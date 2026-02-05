/**
 * Phonetics Module
 * Provides syllable detection and enhanced vowel analysis for ship name generation
 */

const BASIC_VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

/**
 * Check if a character is a vowel, with context-sensitive 'y' detection
 * 'y' is treated as a vowel when:
 * - Not at the start of the word
 * - Not followed by another vowel
 * - The word contains at least one other basic vowel
 * Examples: "Mary" (y=vowel), "Yellow" (y=consonant), "Tony" (y=vowel), "xyz" (y=consonant)
 */
export function isVowel(char: string, index: number = 0, word: string = ''): boolean {
  const c = char.toLowerCase();

  if (BASIC_VOWELS.has(c)) return true;

  // Context-sensitive 'y' detection
  if (c === 'y') {
    // y at start of word is usually consonant (Yellow, Yes)
    if (index === 0) return false;

    // y followed by vowel is usually consonant (beyond -> be-yond)
    const nextChar = word[index + 1]?.toLowerCase();
    if (nextChar && BASIC_VOWELS.has(nextChar)) return false;

    // In words without any basic vowels (like "xyz", "gym", "myth"),
    // y is the only vowel sound, so treat it as vowel
    // But in words like "Mary", "Tony" where there are other vowels, y is also a vowel
    const wordLower = word.toLowerCase();
    const hasOtherVowels = wordLower.split('').some((ch, i) => i !== index && BASIC_VOWELS.has(ch));

    // y is vowel if: word has other vowels OR y is at word end (common pattern)
    if (hasOtherVowels || index === word.length - 1) {
      return true;
    }

    // For words like "gym", "myth", "lynx" - y is the only vowel sound
    // Check if this y is needed as the vowel
    if (!hasOtherVowels) {
      return true;
    }

    return false;
  }

  return false;
}

/**
 * Check if character is a vowel (international support)
 * Handles accented vowels: á, é, í, ó, ú, etc.
 */
export function isInternationalVowel(char: string): boolean {
  const normalized = normalizeToAscii(char).toLowerCase();
  return BASIC_VOWELS.has(normalized) || normalized === 'y';
}

/**
 * Normalize international characters to ASCII
 * Preserves the base character while removing diacritics
 */
export function normalizeToAscii(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Count syllables in a word using English phonetic rules
 * Rules:
 * 1. Count vowel groups (consecutive vowels = 1 syllable)
 * 2. Silent 'e' at end doesn't count (unless word has no other vowels)
 * 3. '-le' at end counts if preceded by consonant
 * 4. Minimum 1 syllable per word
 */
export function countSyllables(word: string): number {
  const w = normalizeToAscii(word).toLowerCase().trim();

  if (w.length === 0) return 0;
  if (w.length <= 2) return 1;

  let count = 0;
  let prevWasVowel = false;

  for (let i = 0; i < w.length; i++) {
    const isCurrentVowel = isVowel(w[i], i, w);

    // Count new vowel groups
    if (isCurrentVowel && !prevWasVowel) {
      count++;
    }
    prevWasVowel = isCurrentVowel;
  }

  // Silent 'e' rule: final 'e' often silent except in '-le' endings
  if (w.endsWith('e') && w.length > 2) {
    // Check if it's a '-le' ending preceded by consonant
    const isConsonantLE = w.length >= 3 &&
      w.endsWith('le') &&
      !isVowel(w[w.length - 3], w.length - 3, w);

    // Silent 'e' at end (not '-le' pattern) and has other vowels
    if (!isConsonantLE && count > 1) {
      count--;
    }
  }

  // Handle common silent 'e' patterns
  const silentEPatterns = ['ate', 'ite', 'ote', 'ute', 'ake', 'ike', 'oke', 'uke', 'ame', 'ime', 'ome', 'ume'];
  for (const pattern of silentEPatterns) {
    if (w.endsWith(pattern) && count > 1) {
      // These patterns typically have silent 'e' - already counted correctly
      break;
    }
  }

  return Math.max(1, count);
}

/**
 * Split a word into syllable boundaries
 * Returns array of syllable strings
 * Uses the "Maximum Onset Principle" - consonants prefer to start syllables
 */
export function splitIntoSyllables(word: string): string[] {
  const w = normalizeToAscii(word).toLowerCase();

  if (w.length <= 2) return [word];

  const syllables: string[] = [];
  let currentSyllable = '';
  let i = 0;

  while (i < w.length) {
    const char = w[i];
    const isCurrentVowel = isVowel(char, i, w);

    currentSyllable += char;

    if (isCurrentVowel) {
      // Look ahead for syllable boundary
      let consonantCount = 0;
      let j = i + 1;

      // Count consonants after this vowel
      while (j < w.length && !isVowel(w[j], j, w)) {
        consonantCount++;
        j++;
      }

      // If there are consonants and more vowels ahead, split
      if (j < w.length && consonantCount > 0) {
        // Maximum Onset Principle: keep one consonant with current syllable
        // unless it's a consonant cluster that can start a syllable
        let splitPoint = i + 1;

        if (consonantCount === 1) {
          // Single consonant goes with next syllable
          syllables.push(currentSyllable);
          currentSyllable = '';
        } else if (consonantCount >= 2) {
          // Keep first consonant, rest go to next syllable
          currentSyllable += w[i + 1];
          syllables.push(currentSyllable);
          currentSyllable = '';
          i++; // Skip the consonant we just added
        }
      }
    }

    i++;
  }

  // Add remaining syllable
  if (currentSyllable) {
    if (syllables.length > 0 && !hasVowel(currentSyllable)) {
      // Append consonant-only ending to last syllable
      syllables[syllables.length - 1] += currentSyllable;
    } else {
      syllables.push(currentSyllable);
    }
  }

  // Reconstruct with original casing
  return reconstructWithOriginalCase(word, syllables);
}

/**
 * Check if a string contains a vowel
 */
function hasVowel(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (isVowel(str[i], i, str)) return true;
  }
  return false;
}

/**
 * Reconstruct syllables with original word's case pattern
 */
function reconstructWithOriginalCase(original: string, syllables: string[]): string[] {
  const normalized = normalizeToAscii(original);
  const result: string[] = [];
  let charIndex = 0;

  for (const syllable of syllables) {
    let reconstructed = '';
    for (let i = 0; i < syllable.length && charIndex < normalized.length; i++) {
      // Use original character's case
      const originalChar = original[charIndex];
      const normalizedChar = normalized[charIndex];

      if (normalizedChar.toLowerCase() === syllable[i].toLowerCase()) {
        reconstructed += originalChar;
        charIndex++;
      }
    }
    if (reconstructed) {
      result.push(reconstructed);
    }
  }

  return result.length > 0 ? result : syllables;
}

/**
 * Find the best split point between two names for blending
 * Returns the syllable boundary index closest to the middle
 */
export function findBestSplitPoint(name: string): number {
  const syllables = splitIntoSyllables(name);

  if (syllables.length <= 1) {
    return Math.ceil(name.length / 2);
  }

  // Find split point at syllable boundary closest to middle
  const targetLength = name.length / 2;
  let currentLength = 0;
  let bestSplit = 0;
  let minDiff = name.length;

  for (let i = 0; i < syllables.length; i++) {
    const diff = Math.abs(currentLength - targetLength);
    if (diff < minDiff) {
      minDiff = diff;
      bestSplit = currentLength;
    }
    currentLength += syllables[i].length;
  }

  // Also check the full length
  const finalDiff = Math.abs(currentLength - targetLength);
  if (finalDiff < minDiff) {
    bestSplit = currentLength;
  }

  return bestSplit || Math.ceil(name.length / 2);
}

/**
 * Find first vowel index in a string
 */
export function findFirstVowel(str: string): number {
  const s = normalizeToAscii(str);
  for (let i = 0; i < s.length; i++) {
    if (isVowel(s[i], i, s)) return i;
  }
  return -1;
}

/**
 * Find last vowel index in a string
 */
export function findLastVowel(str: string): number {
  const s = normalizeToAscii(str);
  for (let i = s.length - 1; i >= 0; i--) {
    if (isVowel(s[i], i, s)) return i;
  }
  return -1;
}
