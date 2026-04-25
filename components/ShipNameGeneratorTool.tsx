'use client';

import { useEffect, useState } from 'react';
import { Award, Hash, Heart, Sparkles, ArrowRight } from 'lucide-react';
import NameInput from '@/components/NameInput';
import ResultCard from '@/components/ResultCard';
import LoveMeter from '@/components/LoveMeter';
import ShipCertificate from '@/components/ShipCertificate';
import { calculateLoveScore, generateShipNames, type LoveScore, type ShipResult } from '@/utils/ship-algorithm';

interface ShipNameGeneratorToolProps {
  quickExamples: [string, string][];
  showWeddingResults?: boolean;
  resultsIntro?: string;
}

export default function ShipNameGeneratorTool({
  quickExamples,
  showWeddingResults = true,
  resultsIntro = 'Your generated ship names',
}: ShipNameGeneratorToolProps) {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [results, setResults] = useState<ShipResult | null>(null);
  const [scoreData, setScoreData] = useState<LoveScore>({ score: 0, message: '', emoji: '💝' });
  const [showCertificate, setShowCertificate] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    if (name1.trim() && name2.trim()) {
      setScoreData(calculateLoveScore(name1, name2));
    } else {
      setScoreData({ score: 0, message: '', emoji: '💝' });
    }
  }, [name1, name2]);

  const handleGenerate = () => {
    if (!name1.trim() || !name2.trim()) return;

    setResults(generateShipNames(name1, name2));
    setHasGenerated(true);

    setTimeout(() => {
      const resultsSection = document.getElementById('results');
      if (resultsSection && window.innerWidth < 768) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const bestShipName = results?.best[0] || '';

  return (
    <>
      <div className="mb-8">
        <NameInput
          name1={name1}
          name2={name2}
          onName1Change={setName1}
          onName2Change={setName2}
          onSubmit={handleGenerate}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
        <span>Try:</span>
        {quickExamples.map(([n1, n2]) => (
          <button
            key={`${n1}-${n2}`}
            onClick={() => {
              setName1(n1);
              setName2(n2);
            }}
            className="px-3 py-1 rounded-full bg-white/60 hover:bg-white border border-gray-200 hover:border-coral-200 transition-all text-gray-600 hover:text-coral-600"
          >
            {n1} + {n2}
          </button>
        ))}
      </div>

      {hasGenerated && results && (
        <section id="results" className="py-12 scroll-mt-20 text-left">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 font-display">
              {resultsIntro}
            </h2>
            <p className="text-gray-600">Copy your favorite result or download a ship certificate.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <LoveMeter scoreData={scoreData} />

              {bestShipName && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-coral-100 text-coral-600 font-semibold hover:bg-coral-50 transition-all duration-300"
                >
                  <Award className="w-5 h-5" />
                  Get Ship Certificate
                </button>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-coral-500" />
                  <h3 className="text-xl font-bold text-gray-800">Best Ship Names</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.best.map((name, idx) => (
                    <ResultCard key={`best-${idx}`} name={name} type="best" index={idx} />
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-pink-500" fill="currentColor" />
                  <h3 className="text-xl font-bold text-gray-800">Fun & Playful</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.funny.map((name, idx) => (
                    <ResultCard key={`funny-${idx}`} name={name} type="funny" index={idx} />
                  ))}
                </div>
              </div>

              {showWeddingResults && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Hash className="w-5 h-5 text-amber-500" />
                    <h3 className="text-xl font-bold text-gray-800">Wedding Hashtags</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.wedding.slice(0, 6).map((name, idx) => (
                      <ResultCard key={`wedding-${idx}`} name={name} type="wedding" index={idx} />
                    ))}
                  </div>
                  <a
                    href="/wedding-hashtag-generator"
                    className="inline-flex items-center gap-2 mt-4 text-coral-600 font-medium hover:text-coral-700 transition-colors"
                  >
                    See more wedding hashtags
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {showCertificate && bestShipName && (
        <ShipCertificate
          name1={name1}
          name2={name2}
          shipName={bestShipName}
          scoreData={scoreData}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </>
  );
}
