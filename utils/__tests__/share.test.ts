import { describe, expect, it } from 'vitest';
import {
  buildCertificateSharePath,
  buildCertificateShareUrl,
  buildShipOgImagePath,
  buildXIntentUrl,
  getCertificateShareData,
  sanitizeShareName,
} from '../share';

describe('share utilities', () => {
  it('sanitizes names for share URLs', () => {
    expect(sanitizeShareName('  Taylor   Alison  ')).toBe('Taylor Alison');
    expect(sanitizeShareName([' Travis ', 'Ignored'])).toBe('Travis');
    expect(sanitizeShareName('A'.repeat(80))).toHaveLength(60);
  });

  it('returns null when certificate share data is incomplete', () => {
    expect(getCertificateShareData('', 'Travis')).toBeNull();
    expect(getCertificateShareData('Taylor', '   ')).toBeNull();
  });

  it('builds encoded certificate and OG paths', () => {
    const data = { name1: 'Taylor Swift', name2: 'Travis Kelce' };

    expect(buildCertificateSharePath(data)).toBe(
      '/certificate?name1=Taylor+Swift&name2=Travis+Kelce'
    );
    expect(buildShipOgImagePath(data)).toBe(
      '/api/ship-og?name1=Taylor+Swift&name2=Travis+Kelce'
    );
  });

  it('builds absolute certificate URLs with a custom origin', () => {
    const data = { name1: 'Taylor', name2: 'Travis' };

    expect(buildCertificateShareUrl(data, { origin: 'https://example.com/' })).toBe(
      'https://example.com/certificate?name1=Taylor&name2=Travis'
    );
  });

  it('builds X intent URLs with encoded tweet text and certificate URL', () => {
    const shareUrl = buildXIntentUrl(
      {
        name1: 'Taylor',
        name2: 'Travis',
        shipName: 'Traylor',
        score: 94,
      },
      { origin: 'https://example.com' }
    );
    const url = new URL(shareUrl);

    expect(url.origin).toBe('https://twitter.com');
    expect(url.pathname).toBe('/intent/tweet');
    expect(url.searchParams.get('url')).toBe(
      'https://example.com/certificate?name1=Taylor&name2=Travis'
    );
    expect(url.searchParams.get('text')).toBe(
      'Taylor + Travis got 94% compatibility as Traylor! Create your own ship name:'
    );
  });
});
