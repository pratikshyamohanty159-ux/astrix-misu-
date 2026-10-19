import React from 'react';
import { Sparkles, Moon, Star, Heart } from 'lucide-react';
import { AudioControls } from './AudioControls.tsx';
import type { PageId } from '../types/index.ts';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <footer className="w-full bg-[#131225] border-t border-[#6F61A8]/30 py-10 px-4 sm:px-6 lg:px-8 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#6F61A8]/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Department Info & Tagline */}
        <div className="text-center md:text-left space-y-1.5">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-xl">🌙</span>
            <span className="font-heading font-bold text-lg text-[#FFF7ED]">
              Misu’s Little Star Office
            </span>
          </div>
          <p className="text-xs text-[#CDB7F3] flex items-center justify-center md:justify-start gap-1">
            <span>“one little star at a time”</span>
            <Heart className="w-3 h-3 text-[#F7C8D9] fill-[#F7C8D9] inline" />
          </p>
          <p className="text-[11px] text-[#A795DC]">
            Midnight Sky Department · Junior Collector Unit · ID: MS-008
          </p>
        </div>

        {/* Center: Quick navigation pills */}
        <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Footer Navigation">
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs px-3 py-1.5 rounded-full bg-[#25234D]/70 text-[#E9DDFB] hover:text-[#FFE5A3] hover:bg-[#25234D] transition-colors border border-[#6F61A8]/30"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('story');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs px-3 py-1.5 rounded-full bg-[#25234D]/70 text-[#E9DDFB] hover:text-[#FFE5A3] hover:bg-[#25234D] transition-colors border border-[#6F61A8]/30"
          >
            Her Story
          </button>
          <button
            onClick={() => {
              onNavigate('adventures');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs px-3 py-1.5 rounded-full bg-[#25234D]/70 text-[#E9DDFB] hover:text-[#FFE5A3] hover:bg-[#25234D] transition-colors border border-[#6F61A8]/30"
          >
            Star Inventory
          </button>
          <button
            onClick={() => {
              onNavigate('dream-room');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs px-3 py-1.5 rounded-full bg-[#25234D]/70 text-[#E9DDFB] hover:text-[#FFE5A3] hover:bg-[#25234D] transition-colors border border-[#6F61A8]/30"
          >
            Dream Room
          </button>
        </nav>

        {/* Right: Sound toggle and stamp */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <AudioControls soundEnabled={soundEnabled} onToggleSound={onToggleSound} />
          <div className="text-[10px] text-[#A795DC] border border-[#6F61A8]/30 px-2.5 py-0.5 rounded-full bg-[#1B1939]">
            Midnight Sky Department · Est. under the moon
          </div>
        </div>
      </div>

      {/* Signature comforting quote */}
      <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-[#6F61A8]/20 text-center">
        <p className="text-xs sm:text-sm text-[#CDB7F3] font-handwriting tracking-wide flex items-center justify-center gap-1">
          <span>Made with stardust, sleepy thoughts, and a little bit of magic.</span>
          <Heart className="w-3.5 h-3.5 text-[#F7C8D9] fill-[#F7C8D9] inline" />
        </p>
      </div>
    </footer>
  );
};
