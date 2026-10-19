import React, { useState } from 'react';
import { Sparkles, ArrowRight, Star, Moon, Compass, ShieldCheck, Heart, Award, Eye, Sparkle } from 'lucide-react';
import { MisuCharacter } from '../components/MisuCharacter.tsx';
import { MisuExpressionShowcase } from '../components/MisuExpressionShowcase.tsx';
import { getSleepinessLevel } from '../utils/logic.ts';
import type { PageId } from '../types/index.ts';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  totalStars: number;
  onSecretClueClick: () => void;
  onEasterEggStarFound: () => void;
  secretUnlocked: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  totalStars,
  onSecretClueClick,
  onEasterEggStarFound,
  secretUnlocked,
}) => {
  const [badgeClicks, setBadgeClicks] = useState(0);
  const [badgeFeedback, setBadgeFeedback] = useState<string | null>(null);
  const [use3DMisu, setUse3DMisu] = useState(true);

  const handleBadgeClick = () => {
    const next = badgeClicks + 1;
    setBadgeClicks(next);

    if (next < 5) {
      setBadgeFeedback(`Clue tapped (${next}/5)...`);
      setTimeout(() => setBadgeFeedback(null), 1200);
    } else {
      setBadgeFeedback('Secret room coordinate decoded! 🗝️✨');
      onSecretClueClick();
      setTimeout(() => setBadgeFeedback(null), 2000);
    }
  };

  const sleepiness = getSleepinessLevel(totalStars);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Background Decorative Cosmic Glows & Crescent Moon */}
      <div className="absolute top-10 right-10 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#FFE5A3]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-[#6F61A8]/15 blur-3xl pointer-events-none" />

      {/* Tiny Hidden Secret Star (Easter Egg Route 1) */}
      <button
        onClick={onEasterEggStarFound}
        className="absolute top-28 left-6 sm:left-12 opacity-50 hover:opacity-100 hover:scale-150 transition-all p-1 text-[#FFE5A3] cursor-pointer z-20 group"
        aria-label="A tiny shimmering speck in the sky"
        title="What is this tiny sparkling speck? Tap to inspect!"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F472B6] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFE5A3]"></span>
        </span>
      </button>

      {/* Main Hero Container */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Department info, Intro, Actions */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-20">
          {/* Department Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25234D]/80 border border-[#CDB7F3]/40 text-xs sm:text-sm font-semibold tracking-wider text-[#CDB7F3] shadow-inner backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#FFE5A3]" />
            <span>MIDNIGHT SKY DEPARTMENT</span>
            <Sparkles className="w-4 h-4 text-[#FFE5A3]" />
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#FFF7ED] tracking-tight leading-tight">
              hiii, i'm misu! <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#F7C8D9] fill-[#F7C8D9] inline-block hover:scale-125 transition-transform" />
            </h1>
            <p className="font-heading text-xl sm:text-2xl text-[#FFE5A3] font-semibold flex items-center justify-center lg:justify-start gap-2">
              <span>Junior Starlight Collector</span>
              <span className="text-sm font-normal text-[#CDB7F3]">⭐</span>
            </p>
          </div>

          {/* Introduction */}
          <p className="text-base sm:text-lg text-[#E9DDFB] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
            I'm a tiny celestial baby with a very important night-shift job! I collect fallen starlight,
            keep lost stars safe, and turn little pieces of the night sky into bedtime magic.
          </p>

          {/* Tagline */}
          <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-[#F7C8D9] font-handwriting text-xl sm:text-2xl">
            <span>“One little star at a time.”</span>
            <Heart className="w-5 h-5 text-[#F7C8D9] fill-[#F7C8D9] inline" />
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => onNavigate('story')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#CDB7F3] to-[#B69EE3] hover:from-[#DDD1F9] hover:to-[#CDB7F3] text-[#19182F] font-heading font-bold text-base shadow-lg shadow-[#6F61A8]/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Meet Misu’s World</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('game')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#25234D] hover:bg-[#322E63] text-[#FFE5A3] border border-[#FFE5A3]/40 hover:border-[#FFE5A3] font-heading font-bold text-base shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Star className="w-4 h-4 fill-[#FFE5A3]" />
              <span>Start the Night Shift</span>
            </button>
          </div>

          {/* Feature Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#CDB7F3]">
            <span className="flex items-center gap-1.5 bg-[#201D3D]/60 px-3 py-1.5 rounded-full border border-[#6F61A8]/30">
              <Moon className="w-3.5 h-3.5 text-[#FFE5A3]" /> 100% Lavender Moon Baby
            </span>
            <span className="flex items-center gap-1.5 bg-[#201D3D]/60 px-3 py-1.5 rounded-full border border-[#6F61A8]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Official Sky Employee
            </span>
            <span className="flex items-center gap-1.5 bg-[#201D3D]/60 px-3 py-1.5 rounded-full border border-[#6F61A8]/30">
              <Compass className="w-3.5 h-3.5 text-[#BFD7F4]" /> Fallen Stars Rescued
            </span>
          </div>
        </div>

        {/* Right Column: Character Showcase + Official ID Badge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative z-20 space-y-4">
          {/* 3D vs Vector Toggle */}
          <div className="flex items-center gap-1 bg-[#19182F] p-1 rounded-xl border border-[#6F61A8]/40 shadow text-xs">
            <button
              onClick={() => setUse3DMisu(true)}
              className={`px-3 py-1 rounded-lg font-heading font-bold transition-all ${
                use3DMisu ? 'bg-[#FFE5A3] text-[#19182F] shadow' : 'text-[#CDB7F3] hover:text-white'
              }`}
            >
              ✨ 3D Plush View
            </button>
            <button
              onClick={() => setUse3DMisu(false)}
              className={`px-3 py-1 rounded-lg font-heading font-bold transition-all ${
                !use3DMisu ? 'bg-[#FFE5A3] text-[#19182F] shadow' : 'text-[#CDB7F3] hover:text-white'
              }`}
            >
              🎨 Vector Expressions
            </button>
          </div>

          {/* Misu Main Illustration */}
          <div className="relative w-72 sm:w-84 md:w-96 flex items-center justify-center">
            <MisuCharacter
              expression="default"
              size="xl"
              interactive
              holdingItem="star"
              use3DRender={use3DMisu}
              className="drop-shadow-2xl"
            />
          </div>

          {/* Official Employee ID Badge (Easter Egg Route 2 clue) */}
          <div
            onClick={handleBadgeClick}
            className="w-full max-w-sm bg-[#FFF7ED] text-[#19182F] rounded-2xl p-4 shadow-xl border-2 border-[#CDB7F3] relative cursor-pointer hover:scale-102 hover:shadow-2xl transition-all group"
            role="button"
            tabIndex={0}
            aria-label="Misu's official employee badge. Click for details."
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleBadgeClick();
            }}
          >
            {/* Lanyard Clip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#6F61A8] rounded-full shadow" />

            <div className="flex items-center justify-between pb-2 border-b border-[#CDB7F3]/60">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🌙</span>
                <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#6F61A8]">
                  Midnight Sky ID Badge
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#E9DDFB] text-[#51436F] px-2 py-0.5 rounded-full">
                MS-008
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
              <div>
                <span className="text-[10px] text-[#6F61A8] block font-semibold">Employee</span>
                <span className="font-heading font-bold text-sm text-[#19182F] flex items-center gap-1">
                  Misu <Heart className="w-3 h-3 text-[#F7C8D9] fill-[#F7C8D9] inline" />
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#6F61A8] block font-semibold">Department</span>
                <span className="font-semibold text-xs text-[#19182F]">Midnight Sky</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6F61A8] block font-semibold">Role</span>
                <span className="font-semibold text-xs text-[#51436F]">Junior Starlight Collector</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6F61A8] block font-semibold">Current Status</span>
                <span className="font-bold text-xs text-rose-600 flex items-center gap-1">
                  Sleepy but working! 💤
                </span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[#CDB7F3]/40 flex items-center justify-between text-[10px] text-[#6F61A8]">
              <span>ID: MS-008</span>
              <span className="font-medium text-[#51436F] italic">
                {badgeFeedback || '(Click badge 5 times for secret clue)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 12 Expressions Interactive Moodboard (From Uploaded Sheet) */}
      <div className="max-w-6xl mx-auto w-full z-20">
        <MisuExpressionShowcase />
      </div>

      {/* Bottom Status Bar & CTA */}
      <div className="max-w-4xl mx-auto w-full z-20">
        <div className="bg-[#211E3E]/90 border border-[#6F61A8]/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#FFE5A3]/20 flex items-center justify-center text-lg">
              ⭐
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#FFF7ED] flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
                <span>Currently collecting: <strong className="text-[#FFE5A3]">tiny stars</strong> · Sleepiness level: {sleepiness}%</span>
                <Heart className="w-3.5 h-3.5 text-[#F7C8D9] fill-[#F7C8D9] inline" />
              </p>
              <p className="text-[11px] text-[#CDB7F3]">
                Total starlight gathered so far: {totalStars} stars
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('story')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FFE5A3] hover:bg-[#FCD34D] text-[#19182F] font-heading font-bold text-xs sm:text-sm shadow flex items-center justify-center gap-2 group transition-all hover:scale-105 cursor-pointer"
          >
            <span>Continue to Misu’s Story</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
