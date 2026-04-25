import type { Metadata } from 'next';
import { Info, Sparkles } from 'lucide-react';
import FaqSection, { type FaqItem } from '@/components/FaqSection';
import RelatedTools from '@/components/RelatedTools';
import ShipNameGeneratorTool from '@/components/ShipNameGeneratorTool';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import { faqJsonLd, pageUrl, webApplicationJsonLd } from '@/utils/seo';

const homeFaqs: FaqItem[] = [
  {
    question: 'What is a ship name generator?',
    answer: 'A ship name generator combines two names into one nickname for a couple, friendship, celebrity pairing, or favorite fictional relationship.',
  },
  {
    question: 'How does this ship names generator work?',
    answer: 'The generator uses vowel pivots, syllable splitting, portmanteau matching, and fluency scoring to create names that sound natural.',
  },
  {
    question: 'Can I generate ship names for friends or fictional characters?',
    answer: 'Yes. You can use it for couples, best friends, crush names, OTPs, fanfiction pairings, or character relationships.',
  },
  {
    question: 'What makes a good ship name?',
    answer: 'A good ship name is short, easy to say, recognizable from both names, and memorable enough to use as a nickname or hashtag.',
  },
  {
    question: 'Is the love calculator serious?',
    answer: 'No. The love score is a fun, consistent score based on the names you enter. It is meant for entertainment.',
  },
];

export const metadata: Metadata = {
  title: 'Ship Name Generator - Create Cute Couple Names & Ship Names',
  description: 'Free ship name generator to combine two names into cute couple names, relationship nicknames, OTP names, and wedding hashtag ideas.',
  alternates: {
    canonical: pageUrl('/'),
  },
  openGraph: {
    title: 'Ship Name Generator - Create Cute Couple Names',
    description: 'Generate ship names, couple names, OTP nicknames, and wedding hashtag ideas instantly.',
    url: pageUrl('/'),
  },
};

export default function Home() {
  const jsonLd = [
    webApplicationJsonLd('/', 'Ship Name Generator', 'Generate cute ship names, couple names, and wedding hashtag ideas.'),
    faqJsonLd(homeFaqs),
  ];

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav activePath="/" />

      <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-coral-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-coral-100 shadow-sm mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-coral-500" />
            <span className="text-sm font-medium text-gray-600">Free ship names generator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-display leading-tight">
            <span className="text-gray-800">Ship Name Generator</span>
            <br />
            <span className="text-gradient">Create Cute Couple Names</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Combine two names into one adorable nickname. Generate ship names for couples, crushes,
            best friends, celebrity pairings, OTPs, and wedding hashtag ideas.
          </p>

          <ShipNameGeneratorTool
            quickExamples={[
              ['Brad', 'Angelina'],
              ['Taylor', 'Travis'],
              ['Romeo', 'Juliet'],
            ]}
          />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-display">
              How to Use the Ship Name Generator
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Enter two names, click generate, and choose from the best ship names, funny blends,
              and wedding hashtag ideas. The tool works as a ship name generator, couple name
              generator, relationship name generator, and name combiner in one place.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              A ship name is usually a portmanteau, which means parts of two names are blended into
              one new word. Famous examples include Brangelina, Bennifer, Kimye, and TomKat.
            </p>

            <div className="bg-gradient-to-r from-coral-50 to-purple-50 rounded-2xl p-6 my-8 border border-coral-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  <Info className="w-6 h-6 text-coral-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Ship name examples</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Try Emma + Noah, Maya + Kai, or Taylor + Travis to see how different vowels,
                    syllables, and endings change the generated names.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6 font-display">
              Why This Generator Creates Better Ship Names
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Instead of only cutting names in half, the algorithm checks vowels, syllable breaks,
              shared sounds, classic blends, and pronunciation fluency. That helps the results feel
              closer to natural couple nicknames.
            </p>
          </article>
        </div>
      </section>

      <RelatedTools currentPath="/" />
      <FaqSection faqs={homeFaqs} />
      <SiteFooter />
    </main>
  );
}
