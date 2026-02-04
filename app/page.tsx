'use client';

import { useState, useEffect } from 'react';
import { Heart, Sparkles, Hash, Info, Award, Share2, ArrowRight } from 'lucide-react';
import NameInput from '@/components/NameInput';
import ResultCard from '@/components/ResultCard';
import LoveMeter from '@/components/LoveMeter';
import ShipCertificate from '@/components/ShipCertificate';
import { generateShipNames, calculateLoveScore, type ShipResult, type LoveScore } from '@/utils/ship-algorithm';

export default function Home() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [results, setResults] = useState<ShipResult | null>(null);
  const [scoreData, setScoreData] = useState<LoveScore>({ score: 0, message: '', emoji: '💝' });
  const [showCertificate, setShowCertificate] = useState(false);
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

  const handleGenerate = () => {
    if (!name1.trim() || !name2.trim()) return;
    
    const shipResults = generateShipNames(name1, name2);
    setResults(shipResults);
    setHasGenerated(true);
    
    // Scroll to results on mobile
    setTimeout(() => {
      const resultsSection = document.getElementById('results');
      if (resultsSection && window.innerWidth < 768) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const bestShipName = results?.best[0] || '';

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
            <div className="flex items-center gap-4">
              <a
                href="/wedding-hashtag-generator"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-coral-500 transition-colors"
              >
                <Hash className="w-4 h-4" />
                <span className="hidden sm:inline">Wedding Hashtags</span>
                <span className="sm:hidden">Hashtags</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-coral-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-coral-100 shadow-sm mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-coral-500" />
            <span className="text-sm font-medium text-gray-600">#1 Couple Name Generator</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 font-display leading-tight">
            <span className="text-gray-800">Create Your Perfect</span>
            <br />
            <span className="text-gradient">Ship Name</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Combine two names into one adorable nickname! Whether you&apos;re a couple, 
            best friends, or creating the next big OTP, find your perfect ship name.
          </p>

          {/* Input Section */}
          <div className="mb-8">
            <NameInput
              name1={name1}
              name2={name2}
              onName1Change={setName1}
              onName2Change={setName2}
              onSubmit={handleGenerate}
            />
          </div>

          {/* Quick examples */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
            <span>Try:</span>
            {[
              ['Brad', 'Angelina'],
              ['Beyoncé', 'Jay-Z'],
              ['Romeo', 'Juliet'],
            ].map(([n1, n2]) => (
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
        </div>
      </section>

      {/* Results Section */}
      {hasGenerated && results && (
        <section id="results" className="py-12 px-4 sm:px-6 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Love Score */}
              <div className="lg:col-span-1">
                <LoveMeter scoreData={scoreData} />
                
                {/* Certificate Button */}
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

              {/* Right: Generated Names */}
              <div className="lg:col-span-2">
                {/* Best Results */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-coral-500" />
                    <h2 className="text-xl font-bold text-gray-800">Best Ship Names</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.best.map((name, idx) => (
                      <ResultCard key={`best-${idx}`} name={name} type="best" index={idx} />
                    ))}
                  </div>
                </div>

                {/* Funny Results */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <h2 className="text-xl font-bold text-gray-800">Fun & Playful</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.funny.map((name, idx) => (
                      <ResultCard key={`funny-${idx}`} name={name} type="funny" index={idx} />
                    ))}
                  </div>
                </div>

                {/* Wedding Hashtags */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Hash className="w-5 h-5 text-amber-500" />
                    <h2 className="text-xl font-bold text-gray-800">Wedding Hashtags</h2>
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
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEO Content Section */}
      <section className="py-16 px-4 sm:px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-display">
              How to Use the Ship Name Generator
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Creating the perfect couple name is easy! Simply enter two names in the input fields 
              above and click &quot;Generate Ship Names.&quot; Our algorithm uses advanced linguistic 
              techniques including vowel pivoting and portmanteau creation to blend names naturally 
              and create adorable combinations.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 font-display">
              What is a Ship Name?
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              A ship name (or relationship name) is a cute nickname created by combining two 
              people&apos;s names. Famous examples include &quot;Brangelina&quot; (Brad Pitt + Angelina Jolie), 
              &quot;Bennifer&quot; (Ben Affleck + Jennifer Lopez), and &quot;Kimye&quot; (Kim Kardashian + Kanye West). 
              These names are popular in celebrity culture and among fans who &quot;ship&quot; (support) 
              relationships.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 font-display">
              What Does OTP Mean?
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              OTP stands for &quot;One True Pairing.&quot; It&apos;s a term used in fandom culture to describe 
              a person&apos;s favorite romantic relationship, whether from TV shows, movies, books, 
              or real life. When you find your OTP, you might want to create a special ship name 
              to celebrate your favorite couple!
            </p>

            <div className="bg-gradient-to-r from-coral-50 to-purple-50 rounded-2xl p-6 my-8 border border-coral-100">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  <Info className="w-6 h-6 text-coral-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Did You Know?</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The practice of creating couple names dates back centuries! In the 1800s, 
                    people used terms like &quot;Tommy Atkins&quot; for British soldiers. The modern 
                    celebrity ship name trend gained popularity in the early 2000s with the rise 
                    of tabloid culture and internet fandoms.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 font-display">
              Wedding Hashtag Ideas
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Planning a wedding? Our generator also creates perfect wedding hashtags! From 
              classic formats like <strong>#JohnAndJane2024</strong> to creative blends like 
              <strong> #TheSmithsTieTheKnot</strong>, find the perfect tag for your special day. 
              A unique wedding hashtag helps guests share photos and memories from your 
              celebration on social media.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 font-display">
              Love Calculator Explained
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our Love Calculator uses a special algorithm based on the characters in both names 
              to generate a compatibility score. While it&apos;s just for fun, the calculation is 
              consistent—so the same two names will always give the same score! Try it with 
              your crush, your partner, or even celebrity couples.
            </p>
          </article>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-display">
            Why Use Our Ship Name Generator?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Smart Algorithm',
                description: 'Uses vowel pivoting and portmanteau techniques for natural-sounding names.',
                color: 'text-coral-500',
                bgColor: 'bg-coral-50',
              },
              {
                icon: Heart,
                title: 'Love Calculator',
                description: 'Get a fun compatibility score based on your names with cute animations.',
                color: 'text-rose-500',
                bgColor: 'bg-rose-50',
              },
              {
                icon: Share2,
                title: 'Easy Sharing',
                description: 'Copy names instantly or download a beautiful ship certificate to share.',
                color: 'text-purple-500',
                bgColor: 'bg-purple-50',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-soft card-hover"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl ${feature.bgColor} flex items-center justify-center`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-coral-400" fill="currentColor" />
                <span className="font-bold text-xl">Ship Name Generator</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                The cutest way to create couple names and wedding hashtags. 
                Perfect for celebrating love, friendships, and your favorite OTPs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/wedding-hashtag-generator" className="hover:text-white transition-colors">Wedding Hashtags</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Popular Ships</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Brangelina</li>
                <li>Bennifer</li>
                <li>Kimye</li>
                <li>TomKat</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Ship Name Generator. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Made with <Heart className="w-4 h-4 inline text-coral-400" fill="currentColor" /> for couples everywhere
            </p>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      {showCertificate && bestShipName && (
        <ShipCertificate
          name1={name1}
          name2={name2}
          shipName={bestShipName}
          scoreData={scoreData}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </main>
  );
}
