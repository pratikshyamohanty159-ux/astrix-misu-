import React, { useState } from 'react';
import { Sparkles, Star, Package, Lamp, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { MisuCharacter } from '../components/MisuCharacter.tsx';
import type { PageId } from '../types/index.ts';

interface StarlightCollectorPageProps {
  onNavigate: (page: PageId) => void;
}

const QUOTES = [
  '“I collect the sparkliest ones! ✨”',
  '“This jar is my favorite. Don’t tell the others!”',
  '“Sometimes I count the same star twice. Oopsie.”',
  '“My satchel is bigger than I am!”',
  '“Officially tiny. Professionally sparkly. ⭐”',
  '“Night-shift status: sleepy but determined!”',
];

export const StarlightCollectorPage: React.FC<StarlightCollectorPageProps> = ({ onNavigate }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isQuoting, setIsQuoting] = useState(false);

  const handleAskMisu = () => {
    setIsQuoting(true);
    setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    setTimeout(() => setIsQuoting(false), 400);
  };

  const responsibilities = [
    {
      title: 'Collects Fallen Starlight',
      icon: <Star className="w-6 h-6 text-[#FFE5A3] fill-[#FFE5A3]" />,
      desc: 'Some stars get lost on their way across the sky. Misu finds their tiny sparkling pieces and carefully gathers them before sunrise.',
      label: 'Mission: Find the fallen stars.',
      accent: 'border-[#FFE5A3]/40 bg-[#252147]',
    },
    {
      title: 'Stores Stars in Tiny Jars',
      icon: <Package className="w-6 h-6 text-[#BFD7F4]" />,
      desc: 'Every little star gets a safe place in Misu’s collection. She keeps each glowing treasure in a tiny jar until it is ready for something magical.',
      label: 'Mission: Keep every sparkle safe.',
      accent: 'border-[#BFD7F4]/40 bg-[#1F2347]',
    },
    {
      title: 'Makes Magical Nightlights',
      icon: <Lamp className="w-6 h-6 text-[#FCD34D]" />,
      desc: 'Misu transforms collected starlight into gentle nightlights that brighten dark corners and help sleepy rooms feel cozy.',
      label: 'Mission: Turn starlight into comfort.',
      accent: 'border-[#FCD34D]/40 bg-[#282142]',
    },
    {
      title: 'Helps People Through Difficult Nights',
      icon: <Heart className="w-6 h-6 text-[#F7C8D9] fill-[#F7C8D9]" />,
      desc: 'Sometimes someone needs a little extra light. Misu shares a tiny piece of starlight to remind them that even the longest night can hold a little hope.',
      label: 'Mission: Share a little warmth.',
      accent: 'border-[#F7C8D9]/40 bg-[#291F38]',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Page Heading */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25234D] border border-[#CDB7F3]/40 text-xs font-semibold text-[#FFE5A3]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OFFICIAL DUTIES</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#FFF7ED]">
          Meet your friendly neighborhood Starlight Collector ⭐
        </h1>
        <p className="text-base sm:text-lg text-[#CDB7F3] max-w-2xl mx-auto">
          Misu collects tiny pieces of starlight and turns them into bedtime magic.
        </p>
      </div>

      {/* 4 Responsibilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {responsibilities.map((item, index) => (
          <div
            key={index}
            className={`p-6 sm:p-7 rounded-3xl border ${item.accent} shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
          >
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-[#19182F]/70 border border-[#6F61A8]/40 shadow-inner group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#19182F] border border-[#6F61A8]/40 text-[#CDB7F3] uppercase tracking-wider">
                  Duty 0{index + 1}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-[#FFF7ED] group-hover:text-[#FFE5A3] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#E9DDFB] mt-2 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#FFE5A3] font-heading">
                {item.label}
              </span>
              <span className="text-xs text-[#CDB7F3] opacity-0 group-hover:opacity-100 transition-opacity">
                Shift Verified ✓
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Character Quote Interaction Box */}
      <div className="bg-[#211E3E] border-2 border-[#6F61A8]/50 rounded-3xl p-6 sm:p-8 shadow-xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6">
        <div className="shrink-0">
          <MisuCharacter expression="happy" size="md" holdingItem="star" animate />
        </div>

        <div className="space-y-4 text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-[#CDB7F3]">
            <MessageCircle className="w-4 h-4 text-[#FFE5A3]" />
            <span>Radio Chatter from the Midnight Sky</span>
          </div>

          <div className="bg-[#19182F]/80 border border-[#6F61A8]/40 rounded-2xl p-4 shadow-inner min-h-[72px] flex items-center justify-center sm:justify-start">
            <p className={`font-handwriting text-2xl text-[#FFE5A3] transition-all duration-300 ${isQuoting ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}`}>
              {QUOTES[currentQuoteIndex]}
            </p>
          </div>

          <button
            onClick={handleAskMisu}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-[#6F61A8] hover:bg-[#8374C2] text-[#FFF7ED] font-heading font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#FFE5A3]" />
            <span>Ask Misu about her job</span>
          </button>
        </div>
      </div>

      {/* Primary Call to Action */}
      <div className="text-center pt-4 pb-6 space-y-3">
        <button
          onClick={() => onNavigate('game')}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FFE5A3] to-[#FCD34D] hover:from-[#FFF1CC] hover:to-[#FFE5A3] text-[#19182F] font-heading font-extrabold text-lg shadow-xl shadow-[#FFE5A3]/20 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 cursor-pointer"
        >
          <span>Wanna collect stars with Misu? ✨</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-xs sm:text-sm text-[#CDB7F3]">
          Your first little night-shift mission is waiting.
        </p>
      </div>
    </div>
  );
};
