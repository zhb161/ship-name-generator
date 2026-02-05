'use client';

import { useRef, useState } from 'react';
import { Download, Sparkles, X } from 'lucide-react';
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
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default || html2canvasModule;
      
      // Wait a moment for any animations to settle
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.body.querySelector('[data-certificate]') as HTMLElement;
          if (clonedElement) {
            // Ensure proper background
            clonedElement.style.background = 'linear-gradient(135deg, #FFF1F2 0%, #F3E8FF 50%, #FDF2F8 100%)';
            
            // Fix all text to ensure visibility
            const allText = clonedElement.querySelectorAll('h2, span, p');
            allText.forEach((el) => {
              const element = el as HTMLElement;
              const computedColor = window.getComputedStyle(element).color;
              if (computedColor.includes('transparent') || computedColor === 'rgba(0, 0, 0, 0)') {
                element.style.color = '#1F2937';
              }
            });
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
            className="relative rounded-2xl p-8 text-center border-4 border-double border-coral-200 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FFF1F2 0%, #F3E8FF 50%, #FDF2F8 100%)',
            }}
          >
            {/* Decorative corners - using borders instead of pseudo elements */}
            <div 
              className="absolute top-4 left-4 w-8 h-8 rounded-tl-lg" 
              style={{ borderTop: '4px solid #FCA5A5', borderLeft: '4px solid #FCA5A5' }} 
            />
            <div 
              className="absolute top-4 right-4 w-8 h-8 rounded-tr-lg" 
              style={{ borderTop: '4px solid #FCA5A5', borderRight: '4px solid #FCA5A5' }} 
            />
            <div 
              className="absolute bottom-4 left-4 w-8 h-8 rounded-bl-lg" 
              style={{ borderBottom: '4px solid #FCA5A5', borderLeft: '4px solid #FCA5A5' }} 
            />
            <div 
              className="absolute bottom-4 right-4 w-8 h-8 rounded-br-lg" 
              style={{ borderBottom: '4px solid #FCA5A5', borderRight: '4px solid #FCA5A5' }} 
            />

            {/* Header Heart Icon */}
            <div className="mb-6">
              <div 
                className="mx-auto mb-2 flex items-center justify-center"
                style={{ width: '48px', height: '48px' }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF6B6B"/>
                </svg>
              </div>
              <p className="text-sm uppercase tracking-widest text-gray-500">Certificate of Shipping</p>
            </div>

            {/* Names */}
            <div className="mb-6">
              <p className="text-gray-600 mb-2">This certifies that</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className="text-xl font-semibold text-gray-800">{name1}</span>
                <div style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF8787"/>
                  </svg>
                </div>
                <span className="text-xl font-semibold text-gray-800">{name2}</span>
              </div>
            </div>

            {/* Ship Name */}
            <div 
              className="rounded-xl p-4 mb-6"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
            >
              <p className="text-sm text-gray-500 mb-1">Officially Known As</p>
              <div className="flex justify-center">
                <div 
                  className="inline-block px-6 py-2 rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #6C5CE7 100%)' }}
                >
                  <h2 
                    className="text-3xl font-bold"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Poppins, sans-serif',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    {shipName}
                  </h2>
                </div>
              </div>
            </div>

            {/* Love Score */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Compatibility Score</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-bold" style={{ color: '#FF6B6B' }}>{scoreData.score}%</span>
                <span className="text-2xl">{scoreData.emoji}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs" style={{ color: '#9CA3AF' }}>
              <p>Issued on {formattedDate}</p>
              <p className="font-medium mt-1" style={{ color: '#FCA5A5' }}>ship-name-generator.com</p>
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
