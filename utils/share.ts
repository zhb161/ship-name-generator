import { siteUrl } from './seo';

const MAX_SHARE_NAME_LENGTH = 60;
const MAX_SHARE_SHIP_NAME_LENGTH = 80;

export type ShareParamValue = string | string[] | null | undefined;

export interface CertificateShareData {
  name1: string;
  name2: string;
}

export interface XShareData extends CertificateShareData {
  shipName: string;
  score: number;
}

export interface ShareUrlOptions {
  origin?: string;
}

export function sanitizeShareName(value: ShareParamValue): string {
  const rawValue = Array.isArray(value) ? value[0] ?? '' : value ?? '';

  return rawValue
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_SHARE_NAME_LENGTH);
}

export function getCertificateShareData(
  name1: ShareParamValue,
  name2: ShareParamValue
): CertificateShareData | null {
  const sanitizedName1 = sanitizeShareName(name1);
  const sanitizedName2 = sanitizeShareName(name2);

  if (!sanitizedName1 || !sanitizedName2) {
    return null;
  }

  return {
    name1: sanitizedName1,
    name2: sanitizedName2,
  };
}

export function buildCertificateSharePath(data: CertificateShareData): string {
  const params = new URLSearchParams({
    name1: sanitizeShareName(data.name1),
    name2: sanitizeShareName(data.name2),
  });

  return `/certificate?${params.toString()}`;
}

export function buildShipOgImagePath(data: CertificateShareData): string {
  const params = new URLSearchParams({
    name1: sanitizeShareName(data.name1),
    name2: sanitizeShareName(data.name2),
  });

  return `/api/ship-og?${params.toString()}`;
}

export function buildAbsoluteShareUrl(path: string, options: ShareUrlOptions = {}): string {
  const origin = (options.origin ?? siteUrl).replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${origin}${normalizedPath}`;
}

export function buildCertificateShareUrl(
  data: CertificateShareData,
  options: ShareUrlOptions = {}
): string {
  return buildAbsoluteShareUrl(buildCertificateSharePath(data), options);
}

export function buildShipOgImageUrl(
  data: CertificateShareData,
  options: ShareUrlOptions = {}
): string {
  return buildAbsoluteShareUrl(buildShipOgImagePath(data), options);
}

export function buildXIntentUrl(data: XShareData, options: ShareUrlOptions = {}): string {
  const name1 = sanitizeShareName(data.name1);
  const name2 = sanitizeShareName(data.name2);
  const shipName = sanitizeShareName(data.shipName).slice(0, MAX_SHARE_SHIP_NAME_LENGTH);
  const score = Number.isFinite(data.score) ? Math.max(0, Math.min(100, Math.round(data.score))) : 0;
  const shareUrl = buildCertificateShareUrl({ name1, name2 }, options);
  const text = `${name1} + ${name2} got ${score}% compatibility as ${shipName}! Create your own ship name:`;
  const params = new URLSearchParams({ text, url: shareUrl });

  return `https://twitter.com/intent/tweet?${params.toString()}`;
}
