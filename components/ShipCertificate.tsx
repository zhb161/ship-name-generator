'use client';

import { useRef, useState } from 'react';
import { Download, Heart, Sparkles, X } from 'lucide-react';
import type { LoveScore } from '@/utils/ship-algorithm';

interface ShipCertificateProps {
  name1: string;
  name2: string;
  shipName: string;
  scoreData: LoveScore;
  onClose: () => void;
}

export default function ShipCertificate({
  name1,
  name2,
  shipName,
  scoreData,
  onClose,
}: ShipCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    setIsGenerating(true);
    
    try {
      // Dynamically import html2canvas to avoid SSR issues
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default || html2canvasModule;
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Ensure the cloned element has proper styles for rendering
          const clonedElement = clonedDoc.body.querySelector('[data-certificate]');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.transform = 'none';
          }
        },
      });

      const link = document.createElement('a');
      link.download = `${shipName}-ship-certificate.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate certificate:', error);
      alert('Failed to generate certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-coral-500" />
            <h3 className="text-lg font-bold text-gray-800">Your Ship Certificate</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Certificate Preview */}
        <div className="p-6">
          <div
            ref={certificateRef}
            data-certificate="true"
            className="relative bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 rounded-2xl p-8 text-center border-4 border-double border-coral-200"
          >
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-coral-300 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-coral-300 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-coral-300 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-coral-300 rounded-br-lg" />

            {/* Header */}
            <div className="mb-6">
              <Heart className="w-12 h-12 text-coral-500 mx-auto mb-2 animate-heart-beat" fill="currentColor" />
              <p className="text-sm uppercase tracking-widest text-gray-500">Certificate of Shipping</p>
            </div>

            {/* Names */}
            <div className="mb-6">
              <p className="text-gray-600 mb-2">This certifies that</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className="text-xl font-semibold text-gray-800">{name1}</span>
                <Heart className="w-5 h-5 text-coral-400" fill="currentColor" />
                <span className="text-xl font-semibold text-gray-800">{name2}</span>
              </div>
            </div>

            {/* Ship Name */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Officially Known As</p>
              <h2 className="text-3xl font-bold text-gradient font-display">
                {shipName}
              </h2>
            </div>

            {/* Love Score */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Compatibility Score</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-bold text-coral-500">{scoreData.score}%</span>
                <span className="text-2xl">{scoreData.emoji}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-400">
              <p>Issued on {formattedDate}</p>
              <p className="font-medium text-coral-400 mt-1">ship-name-generator.com</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0">
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-coral-500 to-purple-soft text-white font-semibold shadow-lg shadow-coral-200 hover:shadow-xl hover:shadow-coral-300 transition-all duration-300 btn-romantic disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Certificate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
