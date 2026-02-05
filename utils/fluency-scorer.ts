/**
 * Fluency Scorer Module
 * Evaluates pronunciation fluency of generated ship names
 * Based on phonetic principles and sonority hierarchy
 */

import { isVowel, countSyllables, normalizeToAscii } from './phonetics';

export interface FluencyScore {
  score: number;           // 0-100
  difficulty: 'easy' | 'medium' | 'hard';
  issues: string[];        // List of identified issues
}

/**
 * Sonority hierarchy values
 * Higher values = more sonorous (vowel-like)
 * Used to evaluate consonant clusters
 */
const SONORITY: Record<string, number> = {
  // Vowels (most sonorous)
  'a': 10, 'e': 10, 'i': 10, 'o': 10, 'u': 10, 'y': 9,
  // Glides
  'w': 8,
  // Liquids
  'l': 7, 'r': 7,
  // Nasals
  'm': 6, 'n': 6,
  // Fricatives
  'f': 4, 'v': 4, 's': 4, 'z': 4, 'h': 4,
  // Affricates
  'j': 3,
  // Stops (least sonorous)
  'p': 2, 'b': 2, 't': 2, 'd': 2, 'k': 2, 'g': 2, 'c': 2, 'q': 2, 'x': 2,
};

/**
 * Common illegal/difficult consonant clusters in English
 * These combinations are hard to pronounce and should be penalized
 */
const DIFFICULT_CLUSTERS = new Set([
  // Stop + Stop combinations (very difficult)
  'bd', 'bk', 'bp', 'bt', 'db', 'dk', 'dp', 'dt',
  'gb', 'gd', 'gk', 'gp', 'gt', 'kb', 'kd', 'kg', 'kp', 'kt',
  'pb', 'pd', 'pk', 'pt', 'tb', 'td', 'tg', 'tk', 'tp',
  // Fricative + Stop reversed (unusual)
  'fb', 'fd', 'fg', 'fk', 'fp', 'ft',
  'vb', 'vd', 'vg', 'vk', 'vp', 'vt',
  'zb', 'zd', 'zg', 'zk', 'zp', 'zt',
  // Other difficult combinations
  'hb', 'hd', 'hg', 'hk', 'hp', 'ht', 'hz',
  'lr', 'rl', 'mn', 'nm',
  // Triple consonants at boundaries
  'btr', 'dtr', 'gtr', 'ktr', 'ptr', 'ttr',
]);

/**
 * Valid onset clusters (can start a syllable)
 */
const VALID_ONSETS = new Set([
  // Single consonants (all valid)
  'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z',
  // Common two-consonant onsets
  'bl', 'br', 'ch', 'cl', 'cr', 'dr', 'dw', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr',
  'sc', 'sh', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 'th', 'tr', 'tw', 'wh', 'wr',
  // Three-consonant onsets
  'scr', 'spl', 'spr', 'str', 'squ', 'thr',
]);

/**
 * Score the pronunciation fluency of a name
 * Returns a score from 0-100 with difficulty rating and issues
 */
export function scoreFluency(name: string): FluencyScore {
  const n = normalizeToAscii(name).toLowerCase();
  let score = 100;
  const issues: string[] = [];

  // 1. Syllable count check (2-4 syllables ideal for ship names)
  const syllables = countSyllables(n);
  if (syllables === 1) {
    score -= 5; // Slightly too short
  } else if (syllables > 4 && syllables <= 5) {
    score -= 10;
    issues.push('略长');
  } else if (syllables > 5) {
    score -= 20;
    issues.push('音节过多');
  }

  // 2. Length check (4-12 characters ideal)
  if (n.length < 3) {
    score -= 15;
    issues.push('太短');
  } else if (n.length < 4) {
    score -= 5;
  } else if (n.length > 12 && n.length <= 15) {
    score -= 10;
    issues.push('较长');
  } else if (n.length > 15) {
    score -= 20;
    issues.push('过长');
  }

  // 3. Consonant cluster analysis
  let consonantRun = '';
  for (let i = 0; i < n.length; i++) {
    const char = n[i];
    if (!isVowel(char, i, n)) {
      consonantRun += char;

      // Check for difficult clusters
      if (consonantRun.length >= 2) {
        const lastTwo = consonantRun.slice(-2);
        if (DIFFICULT_CLUSTERS.has(lastTwo)) {
          score -= 15;
          issues.push(`难发音组合: ${lastTwo}`);
        }
      }

      // Penalize long consonant runs
      if (consonantRun.length > 3) {
        score -= 10;
        issues.push('辅音过多');
      }
    } else {
      consonantRun = '';
    }
  }

  // 4. Check for awkward vowel combinations (hiatus)
  for (let i = 0; i < n.length - 1; i++) {
    if (isVowel(n[i], i, n) && isVowel(n[i + 1], i + 1, n)) {
      // Some vowel combinations are natural (ai, ea, ou)
      const pair = n.slice(i, i + 2);
      const naturalDiphthongs = new Set(['ai', 'ay', 'ea', 'ee', 'ei', 'ey', 'ie', 'oa', 'oo', 'ou', 'oy', 'ue', 'ui']);
      if (!naturalDiphthongs.has(pair)) {
        score -= 5;
        // Only report if it's particularly awkward
        const awkwardHiatus = new Set(['ao', 'eo', 'io', 'uo', 'ae', 'oe']);
        if (awkwardHiatus.has(pair)) {
          issues.push(`元音间断: ${pair}`);
        }
      }
    }
  }

  // 5. Check sonority sequencing in clusters
  const clusterScore = checkSonoritySequencing(n);
  if (clusterScore < 0) {
    score += clusterScore; // clusterScore is negative
    if (clusterScore <= -10) {
      issues.push('发音不流畅');
    }
  }

  // 6. Check for repeated letters/sounds (mild penalty)
  for (let i = 0; i < n.length - 2; i++) {
    if (n[i] === n[i + 1] && n[i] === n[i + 2]) {
      score -= 10;
      issues.push('重复字母');
      break;
    }
  }

  // 7. Bonus for ending in common suffixes
  const niceEndings = ['a', 'e', 'i', 'o', 'y', 'er', 'or', 'ar', 'en', 'an', 'on', 'ia', 'ie', 'ey', 'ly'];
  for (const ending of niceEndings) {
    if (n.endsWith(ending)) {
      score += 3;
      break;
    }
  }

  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score));

  // Determine difficulty
  let difficulty: 'easy' | 'medium' | 'hard';
  if (score >= 75) {
    difficulty = 'easy';
  } else if (score >= 50) {
    difficulty = 'medium';
  } else {
    difficulty = 'hard';
  }

  return {
    score,
    difficulty,
    issues: Array.from(new Set(issues)), // Remove duplicates
  };
}

/**
 * Check sonority sequencing principle in consonant clusters
 * Returns penalty score (0 or negative)
 */
function checkSonoritySequencing(word: string): number {
  let penalty = 0;
  let inCluster = false;
  let clusterStart = -1;

  for (let i = 0; i < word.length; i++) {
    const isCurrentVowel = isVowel(word[i], i, word);

    if (!isCurrentVowel) {
      if (!inCluster) {
        inCluster = true;
        clusterStart = i;
      }
    } else {
      if (inCluster && i - clusterStart >= 2) {
        // Analyze the cluster
        const cluster = word.slice(clusterStart, i);
        penalty += analyzeCluster(cluster, clusterStart === 0 ? 'onset' : 'medial');
      }
      inCluster = false;
    }
  }

  // Check final cluster
  if (inCluster && word.length - clusterStart >= 2) {
    const cluster = word.slice(clusterStart);
    penalty += analyzeCluster(cluster, 'coda');
  }

  return penalty;
}

/**
 * Analyze a consonant cluster for sonority violations
 */
function analyzeCluster(cluster: string, position: 'onset' | 'coda' | 'medial'): number {
  if (cluster.length < 2) return 0;

  let penalty = 0;

  // Check for sonority violations
  for (let i = 0; i < cluster.length - 1; i++) {
    const current = SONORITY[cluster[i]] || 2;
    const next = SONORITY[cluster[i + 1]] || 2;

    if (position === 'onset') {
      // Onset should rise in sonority
      if (current > next) {
        penalty -= 5;
      }
    } else if (position === 'coda') {
      // Coda should fall in sonority
      if (current < next) {
        penalty -= 5;
      }
    }
  }

  return penalty;
}

/**
 * Compare two names and return the one with better fluency
 */
export function getBetterName(name1: string, name2: string): string {
  const score1 = scoreFluency(name1);
  const score2 = scoreFluency(name2);
  return score1.score >= score2.score ? name1 : name2;
}

/**
 * Sort an array of names by fluency score (highest first)
 */
export function sortByFluency(names: string[]): string[] {
  return names.slice().sort((a, b) => {
    const scoreA = scoreFluency(a).score;
    const scoreB = scoreFluency(b).score;
    return scoreB - scoreA;
  });
}

/**
 * Filter names that meet a minimum fluency threshold
 */
export function filterByFluency(names: string[], minScore: number = 50): string[] {
  return names.filter(name => scoreFluency(name).score >= minScore);
}
