import { ImageResponse } from 'next/og';
import { calculateLoveScore, generateShipNames } from '@/utils/ship-algorithm';
import { getCertificateShareData } from '@/utils/share';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const size = {
  width: 1200,
  height: 630,
};

function getResponsiveFontSize(text: string, max: number, min: number, ratio: number): number {
  return Math.max(min, Math.min(max, Math.floor(ratio / Math.max(text.length, 1))));
}

export async function GET(request: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(request.url);
  const shareData = getCertificateShareData(searchParams.get('name1'), searchParams.get('name2'));

  if (!shareData) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FFF1F2 0%, #F3E8FF 52%, #FDF2F8 100%)',
            color: '#1F2937',
            padding: 80,
          }}
        >
          <div style={{ display: 'flex', fontSize: 74, fontWeight: 800, marginBottom: 28 }}>
            Ship Name Generator
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#6B7280' }}>
            Create a shareable ship certificate
          </div>
        </div>
      ),
      size
    );
  }

  const results = generateShipNames(shareData.name1, shareData.name2);
  const shipName = results.best[0] ?? `${shareData.name1}${shareData.name2}`;
  const scoreData = calculateLoveScore(shareData.name1, shareData.name2);
  const names = `${shareData.name1} + ${shareData.name2}`;
  const namesFontSize = getResponsiveFontSize(names, 48, 32, 1100);
  const shipNameFontSize = getResponsiveFontSize(shipName, 86, 50, 1040);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFF1F2 0%, #F3E8FF 52%, #FDF2F8 100%)',
          color: '#1F2937',
          padding: 52,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 8,
            borderStyle: 'solid',
            borderColor: '#FCA5A5',
            borderRadius: 36,
            backgroundColor: 'rgba(255, 255, 255, 0.58)',
            padding: '56px 76px',
            boxShadow: '0 24px 70px rgba(255, 107, 107, 0.18)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                color: '#6B7280',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 6,
                marginBottom: 28,
              }}
            >
              CERTIFICATE OF SHIPPING
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: namesFontSize,
                fontWeight: 700,
                color: '#374151',
                marginBottom: 30,
                maxWidth: 930,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {names}
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 26,
                color: '#6B7280',
                marginBottom: 16,
              }}
            >
              Officially known as
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: 860,
                padding: '18px 50px',
                borderRadius: 22,
                background: 'linear-gradient(135deg, #FF6B6B 0%, #6C5CE7 100%)',
                color: '#FFFFFF',
                boxShadow: '0 18px 32px rgba(108, 92, 231, 0.22)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: shipNameFontSize,
                  fontWeight: 900,
                  lineHeight: 1.05,
                  maxWidth: 760,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {shipName}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 30,
            }}
          >
            <div
              style={{
                display: 'flex',
                color: '#6B7280',
                fontSize: 30,
                fontWeight: 600,
              }}
            >
              Compatibility Score
            </div>
            <div
              style={{
                display: 'flex',
                color: '#FF6B6B',
                fontSize: 82,
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              {scoreData.score}%
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              color: '#F87171',
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            ship-name-generator.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
