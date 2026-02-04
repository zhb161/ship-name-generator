'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles, Heart, Hash } from 'lucide-react';

interface ResultCardProps {
  name: string;
  type: 'best' | 'funny' | 'wedding';
  index: number;
}

const typeConfig = {
  best: {
    icon: Sparkles,
    gradient: 'from-coral-400 to-purple-soft',
    bgGradient: 'from-coral-50 to-purple-50',
    label: 'Best Match',
  },
  funny: {
    icon: Heart,
    gradient: 'from-pink-400 to-rose-400',
    bgGradient: 'from-pink-50 to-rose-50',
    label: 'Fun Mix',
  },
  wedding: {
    icon: Hash,
    gradient: 'from-amber-400 to-orange-400',
    bgGradient: 'from-amber-50 to-orange-50',
    label: 'Wedding Tag',
  },
};

export default function ResultCard({ name, type, index }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const config = typeConfig[type];
  const Icon = config.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-5 
        bg-gradient-to-br ${config.bgGradient}
        border border-white/50 shadow-soft
        card-hover animate-slide-up
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background decoration */}
      <div className={`
        absolute -top-4 -right-4 w-20 h-20 
        bg-gradient-to-br ${config.gradient} 
        opacity-10 rounded-full blur-xl
      `} />
      
      {/* Type badge */}
      <div className="flex items-center gap-1.5 mb-3">
        <div className={`
          p-1.5 rounded-lg bg-gradient-to-br ${config.gradient}
        `}>
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {config.label}
        </span>
      </div>
      
      {/* Ship name */}
      <h3 className={`
        text-2xl font-bold mb-3
        bg-gradient-to-r ${config.gradient}
        bg-clip-text text-transparent
        font-display
      `}>
        {name}
      </h3>
      
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl
          bg-white/80 hover:bg-white
          border border-gray-100
          text-sm font-medium text-gray-600
          transition-all duration-200
          hover:shadow-md active:scale-95
          w-full justify-center
        `}
        aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
