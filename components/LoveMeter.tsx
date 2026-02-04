'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import type { LoveScore } from '@/utils/ship-algorithm';

interface LoveMeterProps {
  scoreData: LoveScore;
}

export default function LoveMeter({ scoreData }: LoveMeterProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const { score, message, emoji } = scoreData;

  useEffect(() => {
    if (score === 0) {
      setAnimatedScore(0);
      return;
    }

    // Animate the score counting up
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  // Determine color based on score
  const getColor = (s: number) => {
    if (s >= 85) return 'from-rose-400 via-pink-500 to-purple-500';
    if (s >= 70) return 'from-coral-400 to-rose-400';
    if (s >= 50) return 'from-amber-400 to-orange-400';
    return 'from-blue-400 to-indigo-400';
  };

  // Calculate heart fill percentage
  const heartFill = animatedScore;

  if (score === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/50 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Heart className="w-10 h-10 text-gray-300" />
        </div>
        <p className="text-gray-500">Enter two names to calculate your love compatibility!</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-soft border border-white/50">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-4xl mb-2 block">{emoji}</span>
        <h3 className="text-lg font-semibold text-gray-700">Love Compatibility</h3>
      </div>

      {/* Score Circle */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#FFE1E1"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 70}`}
            strokeDashoffset={`${2 * Math.PI * 70 * (1 - animatedScore / 100)}`}
            className="transition-all duration-300 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#6C5CE7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gradient font-display">
            {animatedScore}%
          </span>
        </div>

        {/* Floating hearts */}
        {animatedScore > 50 && (
          <>
            <Heart 
              className="absolute -top-2 -right-2 w-6 h-6 text-coral-400 animate-heart-beat" 
              fill="currentColor"
            />
            <Heart 
              className="absolute -bottom-1 -left-1 w-5 h-5 text-purple-soft animate-heart-beat" 
              style={{ animationDelay: '0.5s' }}
              fill="currentColor"
            />
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getColor(score)} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${animatedScore}%` }}
          />
        </div>
      </div>

      {/* Message */}
      <p className="text-center text-gray-600 font-medium leading-relaxed">
        {message}
      </p>
    </div>
  );
}
