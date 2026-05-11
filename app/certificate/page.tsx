import type { Metadata } from 'next';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import ShipCertificateCard from '@/components/ShipCertificateCard';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { calculateLoveScore, generateShipNames, type LoveScore } from '@/utils/ship-algorithm';
import {
  buildCertificateShareUrl,
  buildShipOgImageUrl,
  getCertificateShareData,
  type CertificateShareData,
} from '@/utils/share';

export const dynamic = 'force-dynamic';

type CertificateSearchParams = Record<string, string | string[] | undefined>;

interface CertificatePageProps {
  searchParams: CertificateSearchParams;
}

interface CertificateResult {
  shareData: CertificateShareData;
  shipName: string;
  scoreData: LoveScore;
}

function getCertificateResult(searchParams: CertificateSearchParams): CertificateResult | null {
  const shareData = getCertificateShareData(searchParams.name1, searchParams.name2);

  if (!shareData) {
    return null;
  }

  const results = generateShipNames(shareData.name1, shareData.name2);
  const shipName = results.best[0] ?? `${shareData.name1}${shareData.name2}`;
  const scoreData = calculateLoveScore(shareData.name1, shareData.name2);

  return {
    shareData,
    shipName,
    scoreData,
  };
}

function getIssuedDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateMetadata({ searchParams }: CertificatePageProps): Metadata {
  const result = getCertificateResult(searchParams);

  if (!result) {
    return {
      title: 'Create Your Ship Certificate',
      description: 'Create a shareable ship certificate with a couple name and compatibility score.',
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const { shareData, shipName, scoreData } = result;
  const title = `${shareData.name1} + ${shareData.name2}: ${shipName} Ship Certificate`;
  const description = `${shareData.name1} and ${shareData.name2} got ${scoreData.score}% compatibility as ${shipName}. Create your own ship name.`;
  const certificateUrl = buildCertificateShareUrl(shareData);
  const imageUrl = buildShipOgImageUrl(shareData);

  return {
    title,
    description,
    alternates: {
      canonical: certificateUrl,
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      type: 'website',
      url: certificateUrl,
      siteName: 'Ship Name Generator',
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${shipName} ship certificate`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: `${shipName} ship certificate`,
        },
      ],
    },
  };
}

export default function CertificatePage({ searchParams }: CertificatePageProps) {
  const result = getCertificateResult(searchParams);

  if (!result) {
    return (
      <main className="min-h-screen">
        <SiteNav />
        <section className="px-4 sm:px-6 py-20 min-h-[70vh] flex items-center">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-coral-400 to-purple-soft flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 font-display mb-4">
              Create Your Ship Certificate
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Generate a couple name and compatibility score, then share the certificate with friends.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-coral-500 to-purple-soft text-white font-semibold shadow-lg shadow-coral-200 hover:shadow-xl hover:shadow-coral-300 transition-all duration-300 btn-romantic"
            >
              Create your own ship name
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const { shareData, shipName, scoreData } = result;

  return (
    <main className="min-h-screen">
      <SiteNav />

      <section className="px-4 sm:px-6 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
          <ShipCertificateCard
            name1={shareData.name1}
            name2={shareData.name2}
            shipName={shipName}
            scoreData={scoreData}
            issuedDate={getIssuedDate()}
            className="shadow-soft-lg"
          />

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-coral-100 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-coral-500" />
              <span className="text-sm font-medium text-gray-600">Official ship certificate</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 font-display leading-tight mb-5">
              {shareData.name1} + {shareData.name2} are{' '}
              <span className="text-gradient">{shipName}</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Their compatibility score is{' '}
              <span className="font-bold text-coral-600">{scoreData.score}%</span>. Try your own
              names and make a certificate to share.
            </p>

            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-coral-500 to-purple-soft text-white font-semibold shadow-lg shadow-coral-200 hover:shadow-xl hover:shadow-coral-300 transition-all duration-300 btn-romantic"
            >
              Create your own ship name
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
