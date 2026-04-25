import { Gem, Hash, Sparkles } from 'lucide-react';
import FaqSection, { type FaqItem } from '@/components/FaqSection';
import RelatedTools from '@/components/RelatedTools';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';
import WeddingHashtagTool from '@/components/WeddingHashtagTool';
import { faqJsonLd, webApplicationJsonLd } from '@/utils/seo';

const weddingFaqs: FaqItem[] = [
  {
    question: 'What is a wedding hashtag generator?',
    answer: 'A wedding hashtag generator combines names, dates, last names, and wedding phrases to create hashtags for social media posts and guest photos.',
  },
  {
    question: 'Should I include the wedding year?',
    answer: 'Including the year can make your hashtag more unique and easier to separate from similar names online.',
  },
  {
    question: 'Can I use my new last name?',
    answer: 'Yes. Add a shared last name to generate options like TheSmiths2026 or TheSmithWedding.',
  },
  {
    question: 'How do I choose the best wedding hashtag?',
    answer: 'Choose one that is short, easy to spell, easy to read, and not already crowded with unrelated posts.',
  },
];

export default function WeddingHashtagGenerator() {
  const jsonLd = [
    webApplicationJsonLd('/wedding-hashtag-generator', 'Wedding Hashtag Generator', 'Generate custom wedding hashtags from names, years, and last names.'),
    faqJsonLd(weddingFaqs),
  ];

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav activePath="/wedding-hashtag-generator" />

      <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-amber-100 shadow-sm mb-6">
            <Gem className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-600">Wedding hashtag ideas for social photos</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-display leading-tight">
            <span className="text-gray-800">Wedding Hashtag</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create custom wedding hashtags from your names, wedding year, and shared last name.
            Copy your favorites for invitations, signs, Instagram, TikTok, and wedding websites.
          </p>

          <WeddingHashtagTool />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <article>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-display">
              Wedding Hashtag Ideas and Examples
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A wedding hashtag acts like a shared album for guest photos and videos. The best
              options are easy to spell, personal to the couple, and simple enough for guests to
              remember during the celebration.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: 'Combine Your Names',
                  description: 'Mix your first names, nicknames, or last names for a personal hashtag.',
                },
                {
                  title: 'Add the Year',
                  description: 'Include the wedding year to make common names easier to distinguish.',
                },
                {
                  title: 'Use Wedding Words',
                  description: 'Phrases like SayIDo, TieTheKnot, Forever, and Hitched add context.',
                },
                {
                  title: 'Check Before Printing',
                  description: 'Search your final hashtag before using it on invitations or venue signs.',
                },
              ].map((tip) => (
                <div key={tip.title} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <Hash className="w-4 h-4 text-amber-500 mb-2" />
                  <h3 className="font-bold text-gray-800 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6 font-display">
              Popular Wedding Hashtag Formats
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                '#EmmaAndJamesSayIDo',
                '#TheJohnsons2026',
                '#FinallySmith',
                '#MayaAndKaiTieTheKnot',
                '#HappilyEverGarcia',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <RelatedTools currentPath="/wedding-hashtag-generator" />
      <FaqSection faqs={weddingFaqs} />
      <SiteFooter />
    </main>
  );
}
