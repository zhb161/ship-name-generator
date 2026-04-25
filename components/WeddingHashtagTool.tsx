'use client';

import { useEffect, useState } from 'react';
import { Calendar, Check, Copy, Hash, Sparkles } from 'lucide-react';
import { calculateLoveScore, generateShipNames, type LoveScore, type ShipResult } from '@/utils/ship-algorithm';

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function WeddingHashtagTool() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [lastName, setLastName] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [results, setResults] = useState<ShipResult | null>(null);
  const [scoreData, setScoreData] = useState<LoveScore>({ score: 0, message: '', emoji: '💝' });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    if (name1.trim() && name2.trim()) {
      setScoreData(calculateLoveScore(name1, name2));
    } else {
      setScoreData({ score: 0, message: '', emoji: '💝' });
    }
  }, [name1, name2]);

  const handleGenerate = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name1.trim() || !name2.trim()) return;

    const shipResults = generateShipNames(name1, name2, lastName || undefined);
    const n1 = capitalize(name1);
    const n2 = capitalize(name2);
    const customHashtags = [
      `#${n1}And${n2}Wedding${year}`,
      `#${n1}And${n2}SayIDo${year}`,
      `#${n1}${n2}Wedding${year.slice(-2)}`,
      `#Wedding${year}${n1}And${n2}`,
    ];

    if (lastName) {
      const ln = capitalize(lastName);
      customHashtags.push(`#The${ln}s${year}`);
      customHashtags.push(`#The${ln}Wedding${year}`);
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

  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() + i).toString());

  return (
    <>
      <form onSubmit={handleGenerate} className="w-full max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-soft border border-white/50">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name1" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                First Name
              </label>
              <input
                id="name1"
                type="text"
                value={name1}
                onChange={(event) => setName1(event.target.value)}
                placeholder="e.g., Emma"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-800 placeholder-gray-400 input-romantic focus:border-amber-300 focus:outline-none transition-all"
                maxLength={30}
              />
            </div>

            <div>
              <label htmlFor="name2" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Partner&apos;s Name
              </label>
              <input
                id="name2"
                type="text"
                value={name2}
                onChange={(event) => setName2(event.target.value)}
                placeholder="e.g., James"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-800 placeholder-gray-400 input-romantic focus:border-amber-300 focus:outline-none transition-all"
                maxLength={30}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Shared Last Name (Optional)
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="e.g., Johnson"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-800 placeholder-gray-400 input-romantic focus:border-amber-300 focus:outline-none transition-all"
                maxLength={30}
              />
            </div>

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
                onChange={(event) => setYear(event.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-800 focus:border-amber-300 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

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
                  key={`${hashtag}-${idx}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-amber-100 shadow-soft card-hover animate-slide-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
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

            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Tips for Choosing Your Hashtag</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Keep it short and easy to spell</li>
                    <li>Check if it is already being used on Instagram</li>
                    <li>Share it on your wedding website and invitations</li>
                    <li>Consider creating a custom sign for the venue</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
