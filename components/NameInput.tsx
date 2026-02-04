'use client';

import { Heart } from 'lucide-react';

interface NameInputProps {
  name1: string;
  name2: string;
  onName1Change: (value: string) => void;
  onName2Change: (value: string) => void;
  onSubmit: () => void;
}

export default function NameInput({
  name1,
  name2,
  onName1Change,
  onName2Change,
  onSubmit,
}: NameInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name1.trim() && name2.trim()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Name 1 Input */}
        <div className="flex-1 w-full">
          <label htmlFor="name1" className="sr-only">
            First Name
          </label>
          <input
            id="name1"
            type="text"
            value={name1}
            onChange={(e) => onName1Change(e.target.value)}
            placeholder="Enter first name..."
            className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-100 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-400 input-romantic focus:border-coral-300 focus:outline-none transition-all"
            maxLength={30}
            autoComplete="given-name"
          />
        </div>

        {/* Heart Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral-400 to-purple-soft flex items-center justify-center shadow-lg shadow-coral-200">
            <Heart className="w-6 h-6 text-white animate-heart-beat" fill="currentColor" />
          </div>
        </div>

        {/* Name 2 Input */}
        <div className="flex-1 w-full">
          <label htmlFor="name2" className="sr-only">
            Second Name
          </label>
          <input
            id="name2"
            type="text"
            value={name2}
            onChange={(e) => onName2Change(e.target.value)}
            placeholder="Enter second name..."
            className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-100 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-400 input-romantic focus:border-coral-300 focus:outline-none transition-all"
            maxLength={30}
            autoComplete="given-name"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!name1.trim() || !name2.trim()}
        className="w-full mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-coral-500 to-purple-soft text-white font-bold text-lg shadow-lg shadow-coral-200 hover:shadow-xl hover:shadow-coral-300 transition-all duration-300 btn-romantic disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:-translate-y-0.5 active:translate-y-0"
      >
        <span className="flex items-center justify-center gap-2">
          <Heart className="w-5 h-5" fill="currentColor" />
          Generate Ship Names
        </span>
      </button>
    </form>
  );
}
