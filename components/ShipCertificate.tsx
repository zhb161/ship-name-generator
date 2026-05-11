'use client';

import { useState } from 'react';
import { Download, Share2, Sparkles, X } from 'lucide-react';
import ShipCertificateCard from '@/components/ShipCertificateCard';
import type { LoveScore } from '@/utils/ship-algorithm';
import { buildXIntentUrl } from '@/utils/share';

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
  const [isGenerating, setIsGenerating] = useState(false);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const drawHeart = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string
  ) => {
    const scale = size / 24;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.moveTo(12, 21.35);
    ctx.lineTo(10.55, 20.03);
    ctx.bezierCurveTo(5.4, 15.36, 2, 12.28, 2, 8.5);
    ctx.bezierCurveTo(2, 5.42, 4.42, 3, 7.5, 3);
    ctx.bezierCurveTo(9.24, 3, 10.91, 3.81, 12, 5.09);
    ctx.bezierCurveTo(13.09, 3.81, 14.76, 3, 16.5, 3);
    ctx.bezierCurveTo(19.58, 3, 22, 5.42, 22, 8.5);
    ctx.bezierCurveTo(22, 12.28, 18.6, 15.36, 13.45, 20.04);
    ctx.lineTo(12, 21.35);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  };

  const fitText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    initialSize: number,
    weight = '700',
    family = 'Poppins, Arial, sans-serif'
  ) => {
    let fontSize = initialSize;

    do {
      ctx.font = `${weight} ${fontSize}px ${family}`;
      fontSize -= 2;
    } while (ctx.measureText(text).width > maxWidth && fontSize > 24);
  };

  const createCertificateCanvas = () => {
    const width = 1000;
    const height = 1200;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas is not supported in this browser.');
    }

    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    const background = ctx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, '#FFF1F2');
    background.addColorStop(0.5, '#F3E8FF');
    background.addColorStop(1, '#FDF2F8');
    ctx.fillStyle = background;
    drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 36);
    ctx.fill();

    ctx.strokeStyle = '#FCA5A5';
    ctx.lineWidth = 8;
    drawRoundedRect(ctx, 60, 60, width - 120, height - 120, 28);
    ctx.stroke();
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, 78, 78, width - 156, height - 156, 22);
    ctx.stroke();

    ctx.strokeStyle = '#FCA5A5';
    ctx.lineWidth = 8;
    [
      [105, 105, 60, 60],
      [835, 105, -60, 60],
      [105, 1035, 60, -60],
      [835, 1035, -60, -60],
    ].forEach(([x, y, lineX, lineY]) => {
      ctx.beginPath();
      ctx.moveTo(x, y + lineY);
      ctx.lineTo(x, y);
      ctx.lineTo(x + lineX, y);
      ctx.stroke();
    });

    drawHeart(ctx, width / 2 - 42, 155, 84, '#FF6B6B');

    ctx.textAlign = 'center';
    ctx.fillStyle = '#6B7280';
    ctx.font = '500 28px Inter, Arial, sans-serif';
    ctx.fillText('CERTIFICATE OF SHIPPING', width / 2, 285);

    ctx.fillStyle = '#4B5563';
    ctx.font = '400 30px Inter, Arial, sans-serif';
    ctx.fillText('This certifies that', width / 2, 380);

    fitText(ctx, `${name1}  +  ${name2}`, 760, 46, '600', 'Inter, Arial, sans-serif');
    ctx.fillStyle = '#1F2937';
    ctx.fillText(`${name1}  +  ${name2}`, width / 2, 455);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    drawRoundedRect(ctx, 160, 530, 680, 210, 28);
    ctx.fill();

    ctx.fillStyle = '#6B7280';
    ctx.font = '400 26px Inter, Arial, sans-serif';
    ctx.fillText('Officially Known As', width / 2, 592);

    const badgeGradient = ctx.createLinearGradient(250, 625, 750, 705);
    badgeGradient.addColorStop(0, '#FF6B6B');
    badgeGradient.addColorStop(1, '#6C5CE7');
    ctx.fillStyle = badgeGradient;
    drawRoundedRect(ctx, 240, 625, 520, 90, 18);
    ctx.fill();

    fitText(ctx, shipName, 460, 58);
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.14)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY = 2;
    ctx.fillText(shipName, width / 2, 685);
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#6B7280';
    ctx.font = '400 26px Inter, Arial, sans-serif';
    ctx.fillText('Compatibility Score', width / 2, 835);

    ctx.fillStyle = '#FF6B6B';
    ctx.font = '800 76px Inter, Arial, sans-serif';
    ctx.fillText(`${scoreData.score}%`, width / 2 - 24, 925);
    ctx.font = '700 44px Inter, Arial, sans-serif';
    ctx.fillText(scoreData.emoji, width / 2 + 145, 918);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '400 22px Inter, Arial, sans-serif';
    ctx.fillText(`Issued on ${formattedDate}`, width / 2, 1040);

    ctx.fillStyle = '#FCA5A5';
    ctx.font = '600 22px Inter, Arial, sans-serif';
    ctx.fillText('ship-name-generator.com', width / 2, 1082);

    return canvas;
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      await document.fonts?.ready;
      const canvas = createCertificateCanvas();

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

  const handleShareOnX = () => {
    const shareUrl = buildXIntentUrl({
      name1,
      name2,
      shipName,
      score: scoreData.score,
    });
    const shareWindow = window.open(shareUrl, '_blank');

    if (shareWindow) {
      shareWindow.opener = null;
      return;
    }

    window.location.href = shareUrl;
  };

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
          <ShipCertificateCard
            name1={name1}
            name2={name2}
            shipName={shipName}
            scoreData={scoreData}
            issuedDate={formattedDate}
          />
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 space-y-3">
          <button
            onClick={handleShareOnX}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-coral-500 to-purple-soft text-white font-semibold shadow-lg shadow-coral-200 hover:shadow-xl hover:shadow-coral-300 transition-all duration-300 btn-romantic disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Share2 className="w-5 h-5" />
            <span>Share on X</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-coral-100 text-coral-600 font-semibold hover:bg-coral-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-coral-200 border-t-coral-500 rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Image</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
