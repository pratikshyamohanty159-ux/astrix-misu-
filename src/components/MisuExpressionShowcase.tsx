import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { MisuCharacter } from './MisuCharacter.tsx';
import { soundManager } from '../utils/audio.ts';
import type { MisuExpression } from '../types/index.ts';

interface MisuExpressionShowcaseProps {
  onSelectExpression?: (exp: MisuExpression) => void;
}

const EXPRESSIONS: { id: MisuExpression; label: string; icon: string; quote: string }[] = [
  { id: 'happy', label: 'Happy', icon: '😄', quote: '“Yay! I found a shiny new star!”' },
  { id: 'curious', label: 'Curious', icon: '❓', quote: '“I wonder which constellation you came from?”' },
  { id: 'excited', label: 'Excited', icon: '🤩', quote: '“Look look! The sky is full of glitter!”' },
  { id: 'sleepy', label: 'Sleepy', icon: '💤', quote: '“Just... five more minutes under the cloud...”' },
  { id: 'surprised', label: 'Surprised', icon: '✨', quote: '“Whoa! A shooting star zoomed right by!”' },
  { id: 'sad', label: 'Sad', icon: '💧', quote: '“Don’t worry, little star. I will guide you home.”' },
  { id: 'silly', label: 'Silly', icon: '😜', quote: '“I put my nightcap on backwards again!”' },
  { id: 'blushing', label: 'Blushing', icon: '🌸', quote: '“Aww, thank you for visiting my sky office!”' },
  { id: 'angry', label: 'Angry', icon: '😤', quote: '“Hey! Clouds shouldn’t hide my stars!”' },
  { id: 'scared', label: 'Scared', icon: '😨', quote: '“Is that thunder or just a noisy star?”' },
  { id: 'thinking', label: 'Thinking', icon: '🤔', quote: '“Which star jar goes on which shelf?”' },
  { id: 'love', label: 'Love', icon: '💖', quote: '“Every star in the universe has a little heart.”' },
];

export const MisuExpressionShowcase: React.FC<MisuExpressionShowcaseProps> = ({
  onSelectExpression,
}) => {
  const [selectedExp, setSelectedExp] = useState<MisuExpression>('happy');

  const handleSelect = (exp: MisuExpression) => {
    setSelectedExp(exp);
    soundManager.playStarChime('common');
    if (onSelectExpression) onSelectExpression(exp);
  };

  const activeItem = EXPRESSIONS.find((e) => e.id === selectedExp) || EXPRESSIONS[0];

  return (
    <div className="bg-[#211E3E] border-2 border-[#6F61A8]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#6F61A8]/40">
        <div>
          <h3 className="font-heading font-extrabold text-2xl text-[#FFF7ED] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFE5A3]" />
            <span>Misu’s 12 Celestial Expressions</span>
          </h3>
          <p className="text-xs text-[#CDB7F3]">
            Official mood sheet from the Midnight Sky Department
          </p>
        </div>

        <div className="bg-[#19182F] px-4 py-1.5 rounded-2xl border border-[#FFE5A3]/40 text-xs font-heading font-bold text-[#FFE5A3]">
          Active Expression: <span className="capitalize">{activeItem.label} {activeItem.icon}</span>
        </div>
      </div>

      {/* Main Feature: Big Interactive Misu Preview + Quote */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Big Preview */}
        <div className="md:col-span-5 flex flex-col items-center justify-center bg-[#19182F]/70 border border-[#6F61A8]/40 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-2 right-3 text-xs text-[#FFE5A3] font-bold uppercase tracking-wider">
            Live Expression
          </div>

          <MisuCharacter expression={selectedExp} size="lg" animate={false} interactive={false} />

          <p className="font-handwriting text-xl text-[#FFE5A3] text-center mt-3 px-2 leading-relaxed">
            {activeItem.quote}
          </p>
        </div>

        {/* Right: 12 Expression Buttons Grid */}
        <div className="md:col-span-7 grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {EXPRESSIONS.map((item) => {
            const isSelected = selectedExp === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-[#3A3366] border-[#FFE5A3] ring-2 ring-[#FFE5A3]/50 scale-105 shadow-lg'
                    : 'bg-[#28244D]/70 border-[#6F61A8]/30 hover:bg-[#342E5E] hover:border-[#CDB7F3]/60'
                }`}
                aria-label={`Select ${item.label} expression`}
              >
                <div className="w-12 h-12 flex items-center justify-center pointer-events-none">
                  <MisuCharacter expression={item.id} size="sm" animate={false} showCloud={false} />
                </div>
                <span className="font-heading text-xs font-bold text-[#FFF7ED]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
