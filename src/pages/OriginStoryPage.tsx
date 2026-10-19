import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, ArrowRight, Sparkles, Award, Heart } from 'lucide-react';
import { MisuCharacter } from '../components/MisuCharacter.tsx';
import { Star } from '../components/Star.tsx';
import type { PageId, MisuExpression } from '../types/index.ts';

interface OriginStoryPageProps {
  onNavigate: (page: PageId) => void;
  onSceneChange: () => void;
}

interface StorySceneData {
  title: string;
  subtitle: string;
  body: string;
  expression: MisuExpression;
  holdingItem: 'star' | 'jar' | 'notebook' | 'none';
  badgeAward?: string;
  visualTheme: string;
}

const SCENES: StorySceneData[] = [
  {
    title: 'A little baby beneath a very big sky',
    subtitle: 'Scene 1 of 6',
    body: 'Once upon a sleepy evening, Misu lived on a tiny lavender cloud near the edge of the moon. She loved watching the stars twinkle above her, but she had never met one up close.',
    expression: 'curious',
    holdingItem: 'none',
    visualTheme: 'from-[#19182F] via-[#2A244D] to-[#19182F]',
  },
  {
    title: 'Something sparkled in the dark',
    subtitle: 'Scene 2 of 6',
    body: 'One quiet night, a little golden star slipped away from its constellation and tumbled through the sky. While everyone else slept, Misu noticed its tiny glow falling through the clouds.',
    expression: 'surprised',
    holdingItem: 'none',
    visualTheme: 'from-[#1B1939] via-[#3B2D61] to-[#19182F]',
  },
  {
    title: 'A tiny hand and a tiny light',
    subtitle: 'Scene 3 of 6',
    body: 'Misu carefully picked up the lost star. It was frightened and dim, so she wrapped it in her little scarf and stayed beside it until its glow returned.',
    expression: 'blushing',
    holdingItem: 'star',
    visualTheme: 'from-[#231A3E] via-[#482F6A] to-[#19182F]',
  },
  {
    title: 'Following the trail of starlight',
    subtitle: 'Scene 4 of 6',
    body: 'Misu followed the star’s sparkling trail across sleepy clouds, past the moon’s quiet gardens, and toward a tiny observatory at the edge of the sky.',
    expression: 'happy',
    holdingItem: 'star',
    visualTheme: 'from-[#19182F] via-[#2F325E] to-[#19182F]',
  },
  {
    title: 'A very important little job',
    subtitle: 'Scene 5 of 6',
    body: 'At the observatory, the sky keepers discovered that Misu had a special gift: she could find lost starlight and make it glow again. They gave her a tiny satchel, an official employee badge, and her very first assignment.',
    expression: 'happy',
    holdingItem: 'notebook',
    badgeAward: 'Officially appointed: Junior Starlight Collector',
    visualTheme: 'from-[#251F4A] via-[#4E397B] to-[#19182F]',
  },
  {
    title: 'And so, her little adventure began',
    subtitle: 'Scene 6 of 6',
    body: 'From that night on, Misu collected fallen starlight, stored it in glowing jars, and used it to make gentle nightlights for those who needed a little comfort. She was small, sometimes sleepy, and occasionally a little clumsy—but she never forgot a lonely star.',
    expression: 'default',
    holdingItem: 'jar',
    visualTheme: 'from-[#241F48] via-[#3C2D63] to-[#19182F]',
  },
];

export const OriginStoryPage: React.FC<OriginStoryPageProps> = ({
  onNavigate,
  onSceneChange,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scene = SCENES[currentSceneIndex];

  // Auto-play timer
  useEffect(() => {
    let timer: number | null = null;
    if (isPlaying) {
      timer = window.setTimeout(() => {
        if (currentSceneIndex < SCENES.length - 1) {
          setCurrentSceneIndex((prev) => prev + 1);
          onSceneChange();
        } else {
          setIsPlaying(false);
        }
      }, 7000); // comfortable reading pacing
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentSceneIndex, onSceneChange]);

  const handleNext = () => {
    if (currentSceneIndex < SCENES.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
      onSceneChange();
    }
  };

  const handlePrev = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1);
      onSceneChange();
    }
  };

  const handleReplay = () => {
    setCurrentSceneIndex(0);
    setIsPlaying(true);
    onSceneChange();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25234D] border border-[#CDB7F3]/40 text-xs font-semibold text-[#FFE5A3]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ORIGIN STORY</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#FFF7ED]">
          How did Misu find her very first star? ✨
        </h1>
        <p className="text-sm sm:text-base text-[#CDB7F3] max-w-xl mx-auto">
          Every little star has a story. This is where Misu’s began.
        </p>
      </div>

      {/* Main Interactive Story Scene Container */}
      <div className={`relative bg-gradient-to-b ${scene.visualTheme} border-2 border-[#6F61A8]/50 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden transition-all duration-700`}>
        {/* Sky Background Accents */}
        <div className="absolute top-4 right-8 text-4xl opacity-30 select-none">🌙</div>
        <div className="absolute bottom-6 left-6 text-2xl opacity-20 select-none">☁️</div>

        {/* Scene progress dots */}
        <div className="flex items-center justify-between pb-6 border-b border-[#6F61A8]/30">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#FFE5A3]">
            {scene.subtitle}
          </span>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Story scenes">
            {SCENES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentSceneIndex(i);
                  onSceneChange();
                }}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentSceneIndex
                    ? 'w-8 bg-[#FFE5A3]'
                    : i < currentSceneIndex
                    ? 'w-3 bg-[#CDB7F3]'
                    : 'w-2 bg-[#6F61A8]/40'
                }`}
                aria-label={`Go to scene ${i + 1}`}
                aria-selected={i === currentSceneIndex}
              />
            ))}
          </div>
        </div>

        {/* Visual Scene + Illustrated Misu */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-6 sm:my-10">
          {/* Left: Illustrated Character Moment */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative">
              <MisuCharacter
                expression={scene.expression}
                holdingItem={scene.holdingItem}
                size="lg"
                className="transition-all duration-500"
              />

              {/* Extra Scene 2 Falling Star Animation */}
              {currentSceneIndex === 1 && (
                <div className="absolute -top-4 -right-2 animate-bounce">
                  <Star rarity="rare" size="md" glowing />
                </div>
              )}

              {/* Certificate badge for scene 5 */}
              {scene.badgeAward && (
                <div className="mt-3 bg-[#FFF7ED] text-[#19182F] border-2 border-[#FFE5A3] px-3 py-2 rounded-xl text-center shadow-lg animate-in zoom-in-90 duration-300">
                  <Award className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                  <span className="text-[10px] font-bold block uppercase tracking-wider text-[#6F61A8]">Official Appointment</span>
                  <p className="font-heading font-bold text-xs text-[#19182F]">{scene.badgeAward}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Story narrative block */}
          <div className="md:col-span-7 space-y-4 text-left">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#FFE5A3] leading-snug">
              {scene.title}
            </h2>

            <div className="bg-[#19182F]/70 border border-[#6F61A8]/40 rounded-2xl p-5 sm:p-6 backdrop-blur-sm shadow-inner">
              <p className="text-base sm:text-lg text-[#FFF7ED] leading-relaxed font-normal">
                {scene.body}
              </p>
            </div>

            {currentSceneIndex === SCENES.length - 1 && (
              <div className="pt-2">
                <p className="font-handwriting text-2xl text-[#F7C8D9] italic flex items-center gap-1.5">
                  <span>“One little star at a time.”</span>
                  <Heart className="w-5 h-5 text-[#F7C8D9] fill-[#F7C8D9] inline" />
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Story Playback Navigation Controls */}
        <div className="pt-6 border-t border-[#6F61A8]/30 flex flex-wrap items-center justify-between gap-4">
          {/* Controls: Prev / Play-Pause / Next / Replay */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrev}
              disabled={currentSceneIndex === 0}
              className="p-2 sm:px-4 sm:py-2 rounded-xl bg-[#292552] text-[#E9DDFB] border border-[#6F61A8]/40 hover:bg-[#37326E] disabled:opacity-30 disabled:cursor-not-allowed font-heading text-xs sm:text-sm font-semibold flex items-center gap-1 transition-all"
              aria-label="Previous scene"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-[#6F61A8] hover:bg-[#8374C2] text-[#FFF7ED] font-heading text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow transition-all"
              aria-label={isPlaying ? 'Pause auto-story progression' : 'Play auto-story progression'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Story</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Play Story</span>
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={currentSceneIndex === SCENES.length - 1}
              className="p-2 sm:px-4 sm:py-2 rounded-xl bg-[#292552] text-[#E9DDFB] border border-[#6F61A8]/40 hover:bg-[#37326E] disabled:opacity-30 disabled:cursor-not-allowed font-heading text-xs sm:text-sm font-semibold flex items-center gap-1 transition-all"
              aria-label="Next scene"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReplay}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#292552] text-[#CDB7F3] border border-[#6F61A8]/40 hover:text-white hover:bg-[#37326E] text-xs font-semibold flex items-center gap-1 transition-all"
              title="Replay from Beginning"
              aria-label="Replay story from scene 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Replay</span>
            </button>
          </div>

          {/* Scene counter or CTA to Page 3 */}
          <div>
            {currentSceneIndex === SCENES.length - 1 ? (
              <button
                onClick={() => onNavigate('collector')}
                className="px-5 py-2.5 rounded-xl bg-[#FFE5A3] hover:bg-[#FCD34D] text-[#19182F] font-heading font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
              >
                <span>Discover what Misu does</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs text-[#CDB7F3]">
                Scene {currentSceneIndex + 1} of {SCENES.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
