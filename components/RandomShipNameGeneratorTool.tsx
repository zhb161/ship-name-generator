'use client';

import { useMemo, useState } from 'react';
import { Copy, Heart, RefreshCw, Shuffle, Sparkles } from 'lucide-react';
import ResultCard from '@/components/ResultCard';
import { generateShipNames, type ShipResult } from '@/utils/ship-algorithm';

const samplePairs: [string, string][] = [
  ['Avery', 'Jordan'],
  ['Luna', 'Milo'],
  ['Sofia', 'Leo'],
  ['Harper', 'Rowan'],
  ['Emma', 'Noah'],
  ['Maya', 'Kai'],
  ['Ivy', 'Theo'],
  ['Riley', 'Quinn'],
  ['Chloe', 'Ezra'],
  ['Nora', 'Jude'],
];

function randomPair(): [string, string] {
  return samplePairs[Math.floor(Math.random() * samplePairs.length)];
}

export default function RandomShipNameGeneratorTool() {
  const initialPair = useMemo(() => samplePairs[0], []);
  const [name1, setName1] = useState(initialPair[0]);
  const [name2, setName2] = useState(initialPair[1]);
  const [results, setResults] = useState<ShipResult>(() => generateShipNames(initialPair[0], initialPair[1]));

  const generateFromPair = (pair: [string, string]) => {
    setName1(pair[0]);
    setName2(pair[1]);
    setResults(generateShipNames(pair[0], pair[1]));
  };

  const handleRandom = () => {
    generateFromPair(randomPair());
  };

  const handleCustom = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name1.trim() || !name2.trim()) return;
    setResults(generateShipNames(name1, name2));
  };

  const allNames = [...results.best, ...results.funny].slice(0, 8);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-soft border border-white/50 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Shuffle className="w-5 h-5 text-coral-500" />
            <h2 className="text-2xl font-bold text-gray-800 font-display">Random ship name ideas</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            Click once for random couple name ideas, or enter two names to generate a fresh set.
          </p>

          <button
            onClick={handleRandom}
            className="w-full mb-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-coral-500 to-purple-soft text-white font-bold text-lg shadow-lg shadow-coral-200 hover:shadow-xl hover:shadow-coral-300 transition-all duration-300 btn-romantic"
          >
            <span className="flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Generate Random Ship Names
            </span>
          </button>

          <form onSubmit={handleCustom} className="space-y-4">
            <div>
              <label htmlFor="random-name-1" className="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                id="random-name-1"
                type="text"
                value={name1}
                onChange={(event) => setName1(event.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-800 placeholder-gray-400 input-romantic focus:border-coral-300 focus:outline-none transition-all"
                maxLength={30}
              />
            </div>
            <div>
              <label htmlFor="random-name-2" className="block text-sm font-medium text-gray-700 mb-2">
                Second name
              </label>
              <input
                id="random-name-2"
                type="text"
                value={name2}
                onChange={(event) => setName2(event.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-800 placeholder-gray-400 input-romantic focus:border-coral-300 focus:outline-none transition-all"
                maxLength={30}
              />
            </div>
            <button
              type="submit"
              disabled={!name1.trim() || !name2.trim()}
              className="w-full px-6 py-3 rounded-xl bg-white border-2 border-coral-100 text-coral-600 font-semibold hover:bg-coral-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" fill="currentColor" />
                Generate From These Names
              </span>
            </button>
          </form>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-coral-500" />
            <h2 className="text-2xl font-bold text-gray-800 font-display">
              {name1} + {name2}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {allNames.map((name, index) => (
              <ResultCard key={`${name}-${index}`} name={name} type={index < 4 ? 'best' : 'funny'} index={index} />
            ))}
          </div>
          <div className="mt-6 p-5 rounded-2xl bg-white/70 border border-white/50 text-left">
            <div className="flex items-start gap-3">
              <Copy className="w-5 h-5 text-purple-soft mt-1" />
              <p className="text-sm text-gray-600 leading-relaxed">
                Use random names for brainstorming, usernames, fanfiction pairings, or playful couple nickname ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
