import type { LoveScore } from '@/utils/ship-algorithm';

interface ShipCertificateCardProps {
  name1: string;
  name2: string;
  shipName: string;
  scoreData: Pick<LoveScore, 'score' | 'emoji'>;
  issuedDate: string;
  className?: string;
}

export default function ShipCertificateCard({
  name1,
  name2,
  shipName,
  scoreData,
  issuedDate,
  className = '',
}: ShipCertificateCardProps) {
  return (
    <div
      data-certificate="true"
      className={`relative rounded-2xl p-8 text-center border-4 border-double border-coral-200 overflow-hidden ${className}`.trim()}
      style={{
        background: 'linear-gradient(135deg, #FFF1F2 0%, #F3E8FF 50%, #FDF2F8 100%)',
      }}
    >
      <div
        className="absolute top-4 left-4 w-8 h-8 rounded-tl-lg"
        style={{ borderTop: '4px solid #FCA5A5', borderLeft: '4px solid #FCA5A5' }}
      />
      <div
        className="absolute top-4 right-4 w-8 h-8 rounded-tr-lg"
        style={{ borderTop: '4px solid #FCA5A5', borderRight: '4px solid #FCA5A5' }}
      />
      <div
        className="absolute bottom-4 left-4 w-8 h-8 rounded-bl-lg"
        style={{ borderBottom: '4px solid #FCA5A5', borderLeft: '4px solid #FCA5A5' }}
      />
      <div
        className="absolute bottom-4 right-4 w-8 h-8 rounded-br-lg"
        style={{ borderBottom: '4px solid #FCA5A5', borderRight: '4px solid #FCA5A5' }}
      />

      <div className="mb-6">
        <div
          className="mx-auto mb-2 flex items-center justify-center"
          style={{ width: '48px', height: '48px' }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF6B6B" />
          </svg>
        </div>
        <p className="text-sm uppercase tracking-widest text-gray-500">Certificate of Shipping</p>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 mb-2">This certifies that</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-xl font-semibold text-gray-800 break-words">{name1}</span>
          <div
            style={{
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF8787" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-gray-800 break-words">{name2}</span>
        </div>
      </div>

      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
      >
        <p className="text-sm text-gray-500 mb-1">Officially Known As</p>
        <div className="flex justify-center">
          <div
            className="inline-block px-6 py-2 rounded-lg max-w-full"
            style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #6C5CE7 100%)' }}
          >
            <h2
              className="text-3xl font-bold break-words"
              style={{
                color: '#FFFFFF',
                fontFamily: 'Poppins, sans-serif',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {shipName}
            </h2>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Compatibility Score</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-4xl font-bold" style={{ color: '#FF6B6B' }}>
            {scoreData.score}%
          </span>
          <span className="text-2xl">{scoreData.emoji}</span>
        </div>
      </div>

      <div className="text-xs" style={{ color: '#9CA3AF' }}>
        <p>Issued on {issuedDate}</p>
        <p className="font-medium mt-1" style={{ color: '#FCA5A5' }}>
          ship-name-generator.com
        </p>
      </div>
    </div>
  );
}
