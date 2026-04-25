import type { Metadata } from 'next';
import { Heart, Sparkles } from 'lucide-react';
import FaqSection, { type FaqItem } from '@/components/FaqSection';
import RelatedTools from '@/components/RelatedTools';
import ShipNameGeneratorTool from '@/components/ShipNameGeneratorTool';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { faqJsonLd, pageUrl, webApplicationJsonLd } from '@/utils/seo';

const coupleFaqs: FaqItem[] = [
  {
    question: 'What is a couple ship name?',
    answer: 'A couple ship name is a cute blended nickname made from two partners names, often used for couples, crushes, anniversaries, and social profiles.',
  },
  {
    question: 'Can I use this for a crush name?',
    answer: 'Yes. Enter your name and your crush name to get playful crush names and relationship nickname ideas.',
  },
  {
    question: 'Can this make OTP names?',
    answer: 'Yes. The same tool works for OTP names, fandom couples, fictional characters, and favorite pairings.',
  },
  {
    question: 'Should both names be first names?',
    answer: 'First names usually work best, but nicknames and short display names can also create fun results.',
  },
];

export const metadata: Metadata = {
  title: 'Couple Ship Name Generator - Cute Couple Names & Crush Names',
  description: 'Generate cute couple ship names, crush names, relationship nicknames, and OTP names by combining two names instantly.',
  alternates: {
    canonical: pageUrl('/couple-ship-name-generator'),
  },
  openGraph: {
    title: 'Couple Ship Name Generator',
    description: 'Create cute couple names, crush names, relationship nicknames, and OTP names.',
    url: pageUrl('/couple-ship-name-generator'),
  },
};

export default function CoupleShipNameGeneratorPage() {
  const jsonLd = [
    webApplicationJsonLd('/couple-ship-name-generator', 'Couple Ship Name Generator', 'Create cute couple ship names, crush names, and OTP nicknames.'),
    faqJsonLd(coupleFaqs),
  ];

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav activePath="/couple-ship-name-generator" />

      <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-coral-100 shadow-sm mb-6">
            <Heart className="w-4 h-4 text-coral-500" fill="currentColor" />
            <span className="text-sm font-medium text-gray-600">Couple names, crush names, and OTP names</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-display leading-tight">
            <span className="text-gray-800">Couple Ship Name</span>
            <br />
            <span className="text-gradient">Generator</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Make a cute relationship nickname from two names. Use it for your partner, your crush,
            a favorite fictional couple, or a private joke that deserves a better name.
          </p>

          <ShipNameGeneratorTool
            quickExamples={[
              ['Emma', 'Noah'],
              ['Maya', 'Kai'],
              ['Olivia', 'Ethan'],
            ]}
            resultsIntro="Your couple ship names"
          />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <article>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-display">
              Cute Couple Name Ideas
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Couple ship names work best when they keep a recognizable sound from both people.
              Short names often blend cleanly, while longer names can create softer, more romantic
              nicknames.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Emma + Noah = Emah, Noemma, Emnoa',
                'Maya + Kai = Makai, Mayai, Kaiya',
                'Olivia + Ethan = Olithan, Evia, Olith',
                'Luna + Milo = Lulo, Miloona, Lumilo',
              ].map((example) => (
                <div key={example} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <Sparkles className="w-4 h-4 text-coral-500 mb-2" />
                  <p className="text-gray-700 font-medium">{example}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <RelatedTools currentPath="/couple-ship-name-generator" />
      <FaqSection faqs={coupleFaqs} />
      <SiteFooter />
    </main>
  );
}
