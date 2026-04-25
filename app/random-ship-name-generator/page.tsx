import type { Metadata } from 'next';
import { Shuffle, Sparkles } from 'lucide-react';
import FaqSection, { type FaqItem } from '@/components/FaqSection';
import RandomShipNameGeneratorTool from '@/components/RandomShipNameGeneratorTool';
import RelatedTools from '@/components/RelatedTools';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { faqJsonLd, pageUrl, webApplicationJsonLd } from '@/utils/seo';

const randomFaqs: FaqItem[] = [
  {
    question: 'What is a random ship name generator?',
    answer: 'A random ship name generator creates instant ship name ideas from sample name pairs or from two custom names you enter.',
  },
  {
    question: 'Can I use random ship names for usernames?',
    answer: 'Yes. Random ship names can be useful for usernames, fan accounts, private jokes, stories, and brainstorming.',
  },
  {
    question: 'Are the random ship names completely random?',
    answer: 'The name pairs are randomized, then the generator uses the same blending algorithm to create pronounceable results.',
  },
  {
    question: 'Can I enter my own names?',
    answer: 'Yes. Use the custom name fields if you want random-style results based on two specific names.',
  },
];

export const metadata: Metadata = {
  title: 'Random Ship Name Generator - Generate Random Ship Names',
  description: 'Generate random ship names instantly. Get cute, funny, and creative ship name ideas from random pairs or your own custom names.',
  alternates: {
    canonical: pageUrl('/random-ship-name-generator'),
  },
  openGraph: {
    title: 'Random Ship Name Generator',
    description: 'Get instant random ship name ideas from random pairs or your own names.',
    url: pageUrl('/random-ship-name-generator'),
  },
};

export default function RandomShipNameGeneratorPage() {
  const jsonLd = [
    webApplicationJsonLd('/random-ship-name-generator', 'Random Ship Name Generator', 'Generate random ship names and creative couple nickname ideas.'),
    faqJsonLd(randomFaqs),
  ];

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav activePath="/random-ship-name-generator" />

      <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-coral-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-coral-100 shadow-sm mb-6">
            <Shuffle className="w-4 h-4 text-coral-500" />
            <span className="text-sm font-medium text-gray-600">One-click random ship name ideas</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-display leading-tight">
            <span className="text-gray-800">Random Ship Name</span>
            <br />
            <span className="text-gradient">Generator</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Generate random ship names for brainstorming, stories, social handles, or fun couple
            nickname ideas. Use random sample pairs or enter your own names.
          </p>

          <RandomShipNameGeneratorTool />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <article>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-display">
              Random Ship Name Examples
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Random ship names are useful when you want inspiration before choosing exact names.
              Each result still comes from a real blend, so the ideas feel more like nicknames than
              random letters.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Avery + Jordan can create Avdan, Averan, or Javery',
                'Luna + Milo can create Lulo, Lumilo, or Miluna',
                'Sofia + Leo can create Soleo, Sofeo, or Lesofia',
                'Harper + Rowan can create Harwan, Roper, or Harrow',
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

      <RelatedTools currentPath="/random-ship-name-generator" />
      <FaqSection faqs={randomFaqs} />
      <SiteFooter />
    </main>
  );
}
