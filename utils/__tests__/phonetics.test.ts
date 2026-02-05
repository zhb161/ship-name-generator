import { describe, it, expect } from 'vitest';
import {
  isVowel,
  countSyllables,
  splitIntoSyllables,
  findFirstVowel,
  findLastVowel,
  findBestSplitPoint,
  normalizeToAscii,
} from '../phonetics';

describe('isVowel', () => {
  it('identifies basic vowels', () => {
    expect(isVowel('a')).toBe(true);
    expect(isVowel('e')).toBe(true);
    expect(isVowel('i')).toBe(true);
    expect(isVowel('o')).toBe(true);
    expect(isVowel('u')).toBe(true);
  });

  it('identifies uppercase vowels', () => {
    expect(isVowel('A')).toBe(true);
    expect(isVowel('E')).toBe(true);
  });

  it('rejects consonants', () => {
    expect(isVowel('b')).toBe(false);
    expect(isVowel('c')).toBe(false);
    expect(isVowel('d')).toBe(false);
  });

  it('handles y as vowel when not at word start', () => {
    // y at start is consonant
    expect(isVowel('y', 0, 'yellow')).toBe(false);
    expect(isVowel('y', 0, 'yes')).toBe(false);

    // y in middle or end is often vowel
    expect(isVowel('y', 3, 'mary')).toBe(true);
    expect(isVowel('y', 3, 'tony')).toBe(true);
    expect(isVowel('y', 4, 'happy')).toBe(true);
  });

  it('handles y before vowel as consonant', () => {
    // y followed by vowel is consonant (like in "beyond")
    expect(isVowel('y', 2, 'beyond')).toBe(false);
  });
});

describe('countSyllables', () => {
  it('counts single syllable words', () => {
    expect(countSyllables('Brad')).toBe(1);
    expect(countSyllables('John')).toBe(1);
    expect(countSyllables('Jane')).toBe(1); // Silent e
    expect(countSyllables('Kate')).toBe(1); // Silent e
  });

  it('counts two syllable words', () => {
    expect(countSyllables('Mary')).toBe(2);
    expect(countSyllables('Tony')).toBe(2);
    expect(countSyllables('Sarah')).toBe(2);
    expect(countSyllables('Emma')).toBe(2);
  });

  it('counts three syllable words', () => {
    // Note: Adjacent vowels like 'ie', 'eo' may be counted as diphthongs
    // These words have clear syllable boundaries
    expect(countSyllables('Amanda')).toBe(3);   // A-man-da
    expect(countSyllables('Rebecca')).toBe(3);  // Re-bec-ca
    expect(countSyllables('Samantha')).toBe(3); // Sa-man-tha
    expect(countSyllables('Banana')).toBe(3);   // Ba-na-na
  });

  it('counts four+ syllable words', () => {
    expect(countSyllables('Angelina')).toBe(4);
    expect(countSyllables('Jennifer')).toBe(3);
    expect(countSyllables('Elizabeth')).toBe(4);
  });

  it('handles short names', () => {
    expect(countSyllables('Al')).toBe(1);
    expect(countSyllables('Ed')).toBe(1);
    expect(countSyllables('Jo')).toBe(1);
  });

  it('handles empty and single char', () => {
    expect(countSyllables('')).toBe(0);
    expect(countSyllables('a')).toBe(1);
  });
});

describe('splitIntoSyllables', () => {
  it('splits simple names', () => {
    const syllables = splitIntoSyllables('Mary');
    expect(syllables.length).toBeGreaterThanOrEqual(1);
    // Function preserves original casing
    expect(syllables.join('').toLowerCase()).toBe('mary');
  });

  it('handles single syllable', () => {
    const syllables = splitIntoSyllables('Brad');
    expect(syllables.length).toBe(1);
    expect(syllables[0].toLowerCase()).toBe('brad');
  });

  it('reconstructs original name', () => {
    const names = ['Angelina', 'Jennifer', 'Elizabeth', 'Mary', 'Tony'];
    for (const name of names) {
      const syllables = splitIntoSyllables(name);
      expect(syllables.join('').toLowerCase()).toBe(name.toLowerCase());
    }
  });
});

describe('findFirstVowel', () => {
  it('finds first vowel in names', () => {
    expect(findFirstVowel('Brad')).toBe(2); // 'a'
    expect(findFirstVowel('Emma')).toBe(0); // 'E'
    expect(findFirstVowel('John')).toBe(1); // 'o'
  });

  it('returns -1 for no vowels', () => {
    // Note: 'y' can act as a vowel in some words (gym, myth, xyz)
    // so we test with strings that have no possible vowels
    expect(findFirstVowel('bcd')).toBe(-1);
    expect(findFirstVowel('fgh')).toBe(-1);
    expect(findFirstVowel('jkl')).toBe(-1);
  });

  it('treats y as vowel in words without other vowels', () => {
    // In "xyz", "gym", "myth" - y is the vowel sound
    expect(findFirstVowel('gym')).toBe(1); // y is vowel
    expect(findFirstVowel('myth')).toBe(1); // y is vowel
  });
});

describe('findLastVowel', () => {
  it('finds last vowel in names', () => {
    expect(findLastVowel('Brad')).toBe(2); // 'a'
    expect(findLastVowel('Emma')).toBe(3); // last 'a'
    expect(findLastVowel('Angelina')).toBe(7); // last 'a'
  });
});

describe('findBestSplitPoint', () => {
  it('returns reasonable split points', () => {
    const split1 = findBestSplitPoint('Brad');
    expect(split1).toBeGreaterThan(0);
    expect(split1).toBeLessThanOrEqual(4);

    const split2 = findBestSplitPoint('Angelina');
    expect(split2).toBeGreaterThan(0);
    expect(split2).toBeLessThanOrEqual(8);
  });

  it('splits near middle for long names', () => {
    const split = findBestSplitPoint('Elizabeth');
    // Should be somewhere near the middle
    expect(split).toBeGreaterThanOrEqual(3);
    expect(split).toBeLessThanOrEqual(6);
  });
});

describe('normalizeToAscii', () => {
  it('normalizes accented characters', () => {
    expect(normalizeToAscii('Beyoncé')).toBe('Beyonce');
    expect(normalizeToAscii('José')).toBe('Jose');
    expect(normalizeToAscii('Müller')).toBe('Muller');
    expect(normalizeToAscii('Señor')).toBe('Senor');
  });

  it('preserves ASCII characters', () => {
    expect(normalizeToAscii('John')).toBe('John');
    expect(normalizeToAscii('Mary')).toBe('Mary');
  });

  it('handles mixed text', () => {
    expect(normalizeToAscii('Renée')).toBe('Renee');
    expect(normalizeToAscii('Zoë')).toBe('Zoe');
  });
});
