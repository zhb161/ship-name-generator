'use client';

import { useState, useEffect } from 'react';
import { Heart, Hash, Sparkles, ArrowLeft, Copy, Check, Calendar, Gem } from 'lucide-react';
import { generateShipNames, calculateLoveScore, type ShipResult, type LoveScore } from '@/utils/ship-algorithm';

export default function WeddingHashtagGenerator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [lastName, setLastName] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [results, setResults] = useState<ShipResult | null>(null);
  const [scoreData, setScoreData] = useState<LoveScore>({ score: 0, message: '', emoji: '💝' });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Update love score as user types
  useEffect(() => {
    if (name1.trim() && name2.trim()) {
      const score = calculateLoveScore(name1, name2);
      setScoreData(score);
    } else {
      setScoreData({ score: 0, message: '', emoji: '💝' });
    }
  }, [name1, name2]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;

    const shipResults = generateShipNames(name1, name2, lastName || undefined);
    
    // Add custom year-based hashtags
    const customHashtags: string[] = [];
    const n1 = capitalize(name1);
    const n2 = capitalize(name2);
    const yr = year;
    
    customHashtags.push(`#${n1}And${n2}Wedding${yr}`);
    customHashtags.push(`#${n1}And${n2}SayIDo${yr}`);
    customHashtags.push(`#${n1}${n2}Wedding${yr.slice(-2)}`);
    customHashtags.push(`#Wedding${yr}${n1}And${n2}`);
    
    if (lastName) {
      const ln = capitalize(lastName);
      customHashtags.push(`#The${ln}s${yr}`);
      customHashtags.push(`#The${ln}Wedding${yr}`);
    }

    setResults({
      ...shipResults,
      wedding: [...customHashtags, ...shipResults.wedding],
    });
    setHasGenerated(true);

    setTimeout(() => {
      const resultsSection = document.getElementById('hashtag-results');
      if (resultsSection && window.innerWidth < 768) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() + i).toString());

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral-400 to-purple-soft flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="font-bold text-xl text-gray-800 hidden sm:block">
                Ship Name Generator
              </span>
            </a>
            <a
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-coral-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Ship Names
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-amber-100 shadow-sm mb-6">
            <Gem className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-600">Wedding Planning Tool</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-display leading-tight">
            <span className="text-gray-800">Wedding Hashtag</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create the perfect hashtag for your special day! Help your guests share 
            memories with a unique, memorable wedding hashtag.
          </p>

          {/* Input Form */}
          <form onSubmit={handleGenerate} className="w-full max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-soft border border-white/50">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {/* Name 1 */}
                <div>
                  <label htmlFor="name1" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    First Name
                  </label>
                  <input
                    id="name1"
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="e.g., Emma"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-800 placeholder-gray-400 input-romantic focus:border-amber-300 focus:outline-none transition-all"
                    maxLength={30}
                  />
                </div>

                {/* Name 2 */}
                <div>
                  <label htmlFor="name2" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Partner&apos;s Name
                  </label>
                  <input
                    id="name2"
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="e.g., James"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-800 placeholder-gray-400 input-romantic focus:border-amber-300 focus:outline-none transition-all"
                    maxLength={30}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Shared Last Name (Optional)
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g., Johnson"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-800 placeholder-gray-400 input-romantic focus:border-amber-300 focus:outline-none transition-all"
                    maxLength={30}
                  />
                </div>

                {/* Year */}
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Wedding Year
                    </span>
                  </label>
                  <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-800 focus:border-amber-300 focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!name1.trim() || !name2.trim()}
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 transition-all duration-300 btn-romantic disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <span className="flex items-center justify-center gap-2">
                  <Hash className="w-5 h-5" />
                  Generate Wedding Hashtags
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      {hasGenerated && results && (
        <section id="hashtag-results" className="py-12 px-4 sm:px-6 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 font-display">
                Your Wedding Hashtags
              </h2>
              <p className="text-gray-600">
                {scoreData.score > 0 && (
                  <span className="flex items-center justify-center gap-2">
                    Love Score: <span className="text-coral-500 font-bold">{scoreData.score}%</span>
                    <span>{scoreData.emoji}</span>
                  </span>
                )}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {results.wedding.map((hashtag, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-amber-100 shadow-soft card-hover animate-slide-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0">
                      <Hash className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800 truncate">{hashtag}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(hashtag, idx)}
                    className="p-2 rounded-lg hover:bg-amber-50 transition-colors flex-shrink-0"
                    aria-label="Copy hashtag"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Tips for Choosing Your Hashtag</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Keep it short and easy to spell</li>
                    <li>• Check if it&apos;s already being used on Instagram</li>
                    <li>• Share it on your wedding website and invitations</li>
                    <li>• Consider creating a custom sign for the venue</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <article>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-display">
              Why You Need a Wedding Hashtag
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              A wedding hashtag is more than just a social media trend—it&apos;s a digital scrapbook 
              of your special day! When guests use your unique hashtag on Instagram, TikTok, or 
              other platforms, all the photos and videos from your wedding are collected in one 
              easy-to-find place.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 font-display">
              How to Create the Perfect Wedding Hashtag
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: 'Combine Your Names',
                  description: 'Mix your first names, last names, or nicknames for a personal touch.',
                },
                {
                  title: 'Add the Year',
                  description: 'Include your wedding year to make it unique and time-specific.',
                },
                {
                  title: 'Use Wedding Words',
                  description: 'Words like &quot;Forever,&quot; &quot;Hitched,&quot; or &quot;TieTheKnot&quot; add romance.',
                },
                {
                  title: 'Keep It Simple',
                  description: 'Avoid numbers and special characters that are hard to remember.',
                },
              ].map((tip, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-1">{tip.title}</h4>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 font-display">
              Popular Wedding Hashtag Examples
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                '#TheSmiths2024',
                '#EmmaAndJamesSayIDo',
                '#FinallyTheJohnsonWedding',
                '#LoveLaughterAndHappilyEverAfter',
                '#TwoBecomeOne2024',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Ship Name Generator. 
            <a href="/" className="text-coral-400 hover:text-coral-300 ml-1">Back to Ship Names</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
