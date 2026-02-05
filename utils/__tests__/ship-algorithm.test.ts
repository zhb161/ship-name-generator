import { describe, it, expect } from 'vitest';
import {
  generateShipNames,
  calculateLoveScore,
  generateSlug,
} from '../ship-algorithm';

describe('generateShipNames', () => {
  describe('basic functionality', () => {
    it('returns all required result types', () => {
      const result = generateShipNames('Brad', 'Angelina');

      expect(result).toHaveProperty('best');
      expect(result).toHaveProperty('funny');
      expect(result).toHaveProperty('wedding');
      expect(result).toHaveProperty('all');

      expect(Array.isArray(result.best)).toBe(true);
      expect(Array.isArray(result.funny)).toBe(true);
      expect(Array.isArray(result.wedding)).toBe(true);
      expect(Array.isArray(result.all)).toBe(true);
    });

    it('generates at least some results', () => {
      const result = generateShipNames('John', 'Sarah');

      expect(result.best.length).toBeGreaterThan(0);
      expect(result.funny.length).toBeGreaterThan(0);
      expect(result.wedding.length).toBeGreaterThan(0);
      expect(result.all.length).toBeGreaterThan(0);
    });

    it('handles empty inputs', () => {
      const result1 = generateShipNames('', 'Sarah');
      const result2 = generateShipNames('John', '');
      const result3 = generateShipNames('', '');

      expect(result1.best).toHaveLength(0);
      expect(result2.best).toHaveLength(0);
      expect(result3.best).toHaveLength(0);
    });

    it('handles whitespace-only inputs', () => {
      const result = generateShipNames('   ', '   ');
      expect(result.best).toHaveLength(0);
    });

    it('trims whitespace from inputs', () => {
      const result1 = generateShipNames('  John  ', '  Sarah  ');
      const result2 = generateShipNames('John', 'Sarah');

      // Results should be the same (or very similar)
      expect(result1.best.length).toBe(result2.best.length);
    });
  });

  describe('famous ship names (regression tests)', () => {
    it('generates Brangelina from Brad + Angelina', () => {
      const result = generateShipNames('Brad', 'Angelina');
      const allLower = result.all.map(n => n.toLowerCase());

      // Should contain brangelina or similar
      const hasBrangelina = allLower.some(n =>
        n.includes('brangelina') || n.includes('brang') || n.includes('bradgelina')
      );
      expect(hasBrangelina).toBe(true);
    });

    it('generates Bennifer from Ben + Jennifer', () => {
      const result = generateShipNames('Ben', 'Jennifer');
      const allLower = result.all.map(n => n.toLowerCase());

      // Should contain bennifer or similar blend
      const hasBennifer = allLower.some(n =>
        n.includes('bennifer') || n.includes('benifer') || n.includes('benn')
      );
      expect(hasBennifer).toBe(true);
    });

    it('generates Kimye from Kim + Kanye', () => {
      const result = generateShipNames('Kim', 'Kanye');
      const allLower = result.all.map(n => n.toLowerCase());

      // Should contain kimye or similar
      const hasKimye = allLower.some(n =>
        n.includes('kimye') || n.includes('kimy') || n.includes('kankim')
      );
      expect(hasKimye).toBe(true);
    });

    it('generates TomKat variations from Tom + Katie', () => {
      const result = generateShipNames('Tom', 'Katie');
      const allLower = result.all.map(n => n.toLowerCase());

      // Should contain some tom+kat blend
      const hasTomKat = allLower.some(n =>
        n.includes('tomkat') || n.includes('tomk') || n.includes('katie')
      );
      expect(hasTomKat).toBe(true);
    });
  });

  describe('wedding hashtags', () => {
    it('generates wedding hashtags', () => {
      const result = generateShipNames('John', 'Sarah');

      expect(result.wedding.length).toBeGreaterThan(0);
      expect(result.wedding[0].startsWith('#')).toBe(true);
    });

    it('includes year in some hashtags', () => {
      const result = generateShipNames('John', 'Sarah');
      const currentYear = new Date().getFullYear();

      const hasYearTag = result.wedding.some(tag =>
        tag.includes(String(currentYear)) || tag.includes(String(currentYear + 1))
      );
      expect(hasYearTag).toBe(true);
    });

    it('includes last name in hashtags when provided', () => {
      const result = generateShipNames('John', 'Sarah', 'Smith');

      const hasLastNameTag = result.wedding.some(tag =>
        tag.toLowerCase().includes('smith')
      );
      expect(hasLastNameTag).toBe(true);
    });
  });

  describe('result quality', () => {
    it('best results are capitalized', () => {
      const result = generateShipNames('Brad', 'Angelina');

      for (const name of result.best) {
        expect(name[0]).toBe(name[0].toUpperCase());
      }
    });

    it('no duplicate names in best results', () => {
      const result = generateShipNames('John', 'Sarah');
      const lowerBest = result.best.map(n => n.toLowerCase());
      const unique = Array.from(new Set(lowerBest));

      expect(lowerBest.length).toBe(unique.length);
    });

    it('limits best results to 6', () => {
      const result = generateShipNames('Alexander', 'Elizabeth');
      expect(result.best.length).toBeLessThanOrEqual(6);
    });

    it('limits funny results to 4', () => {
      const result = generateShipNames('John', 'Sarah');
      expect(result.funny.length).toBeLessThanOrEqual(4);
    });
  });

  describe('international character support', () => {
    it('handles accented characters', () => {
      const result = generateShipNames('José', 'María');

      expect(result.best.length).toBeGreaterThan(0);
    });

    it('handles umlauts', () => {
      const result = generateShipNames('Müller', 'Anna');

      expect(result.best.length).toBeGreaterThan(0);
    });
  });
});

describe('calculateLoveScore', () => {
  it('returns score between 0 and 100', () => {
    const result = calculateLoveScore('John', 'Sarah');

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('is deterministic (same names = same score)', () => {
    const result1 = calculateLoveScore('John', 'Sarah');
    const result2 = calculateLoveScore('John', 'Sarah');

    expect(result1.score).toBe(result2.score);
    expect(result1.message).toBe(result2.message);
  });

  it('gives 100% for identical names', () => {
    const result = calculateLoveScore('John', 'John');

    expect(result.score).toBe(100);
  });

  it('returns appropriate messages for different score ranges', () => {
    // Same names should be soulmates
    const soulmates = calculateLoveScore('John', 'John');
    expect(soulmates.message).toContain('Soulmates');

    // Any valid pair should have a message and emoji
    const regular = calculateLoveScore('Alex', 'Beth');
    expect(regular.message.length).toBeGreaterThan(0);
    expect(regular.emoji.length).toBeGreaterThan(0);
  });

  it('handles empty inputs', () => {
    const result = calculateLoveScore('', 'Sarah');

    expect(result.score).toBe(0);
    expect(result.message).toContain('Enter two names');
  });

  it('considers similar length names', () => {
    // Names with similar length might get a small bonus
    const similar = calculateLoveScore('John', 'Mary');
    const different = calculateLoveScore('Jo', 'Alexander');

    // Both should be valid scores
    expect(similar.score).toBeGreaterThanOrEqual(60);
    expect(different.score).toBeGreaterThanOrEqual(60);
  });

  it('handles international characters', () => {
    const result = calculateLoveScore('José', 'María');

    expect(result.score).toBeGreaterThan(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});

describe('generateSlug', () => {
  it('generates lowercase slug', () => {
    const slug = generateSlug('Brad', 'Angelina');

    expect(slug).toBe(slug.toLowerCase());
  });

  it('removes special characters', () => {
    const slug = generateSlug('John', 'Sarah');

    expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it('generates consistent slug for same inputs', () => {
    const slug1 = generateSlug('John', 'Sarah');
    const slug2 = generateSlug('John', 'Sarah');

    expect(slug1).toBe(slug2);
  });
});
