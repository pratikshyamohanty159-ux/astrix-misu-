import React, { useState } from 'react';
import { BookOpen, Sparkles, Star as StarIcon, RotateCcw, AlertTriangle, X, Check, Heart } from 'lucide-react';
import { Star } from './Star.tsx';
import { STAR_DEFINITIONS } from '../utils/logic.ts';
import type { StarRarity } from '../types/index.ts';

interface StarCollectionBookProps {
  inventory: Record<string, number>;
  totalStars: number;
  onResetCollection: () => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const StarCollectionBook: React.FC<StarCollectionBookProps> = ({
  inventory,
  totalStars,
  onResetCollection,
  onClose,
  isModal = false,
}) => {
  const [selectedStarId, setSelectedStarId] = useState<string>(STAR_DEFINITIONS[0].id);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const selectedStar = STAR_DEFINITIONS.find((s) => s.id === selectedStarId) || STAR_DEFINITIONS[0];
  const count = inventory[selectedStar.id] || 0;
  const isDiscovered = count > 0;

  const content = (
    <div className="bg-[#211E3E] border-2 border-[#6F61A8] rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative Book Spine & Stitching */}
      <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-[#4A3D73] to-[#2E2850] border-r border-[#6F61A8]/50" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#6F61A8]/40 pl-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#6F61A8]/30 rounded-xl text-[#FFE5A3] border border-[#FFE5A3]/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#FFF7ED]">
              Misu’s Celestial Star Book
            </h3>
            <p className="text-xs text-[#CDB7F3]">
              Official field notes from the Midnight Sky Department
            </p>
          </div>
        </div>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#2D2A54] hover:bg-[#3E3A70] text-[#CDB7F3] hover:text-white"
            aria-label="Close Star Book"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 pl-3">
        <div className="bg-[#19182F]/70 border border-[#6F61A8]/40 rounded-xl p-2.5 text-center">
          <span className="text-[10px] text-[#CDB7F3] uppercase tracking-wider block">Total Gathered</span>
          <span className="font-heading text-xl font-bold text-[#FFE5A3] tabular-nums">{totalStars}</span>
        </div>
        <div className="bg-[#19182F]/70 border border-[#6F61A8]/40 rounded-xl p-2.5 text-center">
          <span className="text-[10px] text-[#CDB7F3] uppercase tracking-wider block">Varieties Found</span>
          <span className="font-heading text-xl font-bold text-[#CDB7F3] tabular-nums">
            {Object.values(inventory).filter((c) => c > 0).length} / {STAR_DEFINITIONS.length}
          </span>
        </div>
        <div className="hidden sm:block bg-[#19182F]/70 border border-[#6F61A8]/40 rounded-xl p-2.5 text-center">
          <span className="text-[10px] text-[#CDB7F3] uppercase tracking-wider block">Department Rank</span>
          <span className="font-heading text-sm font-semibold text-[#F7C8D9] mt-1 block">Junior Collector ⭐</span>
        </div>
      </div>

      {/* Main Book Content: Star Grid + Selected Star Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pl-3 mt-4">
        {/* Left: Star Cards Grid */}
        <div className="md:col-span-7 grid grid-cols-2 gap-2.5">
          {STAR_DEFINITIONS.map((starDef) => {
            const starCount = inventory[starDef.id] || 0;
            const discovered = starCount > 0;
            const isSelected = selectedStarId === starDef.id;

            return (
              <button
                key={starDef.id}
                onClick={() => setSelectedStarId(starDef.id)}
                className={`relative p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#FFE5A3] bg-[#322C5C] shadow-lg ring-2 ring-[#FFE5A3]/40'
                    : 'border-[#6F61A8]/30 bg-[#252247]/60 hover:border-[#CDB7F3]/60 hover:bg-[#2C2755]'
                }`}
                aria-label={`View details for ${starDef.name}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${discovered ? 'bg-[#19182F]' : 'bg-[#19182F]/40'}`}>
                    {discovered ? (
                      <Star rarity={starDef.rarity} size="md" glowing />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center opacity-30">
                        <StarIcon className="w-6 h-6 text-slate-500" />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      discovered
                        ? 'bg-[#6F61A8] text-[#FFE5A3]'
                        : 'bg-[#19182F] text-slate-500'
                    }`}
                  >
                    {starDef.rarity}
                  </span>
                </div>

                <div className="mt-2">
                  <p className="font-heading font-semibold text-xs sm:text-sm text-[#FFF7ED]">
                    {discovered ? starDef.name : '??? (Unfound)'}
                  </p>
                  <p className="text-[11px] text-[#CDB7F3] mt-0.5">
                    {discovered ? `${starCount} collected` : 'Tap stars to reveal'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Field Note Inspection Panel */}
        <div className="md:col-span-5 bg-[#1B1836] border border-[#6F61A8]/40 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#6F61A8]/30">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#CDB7F3]">
                Collector Field Note
              </span>
              <span className="text-xs text-[#FFE5A3] font-bold font-heading">
                +{selectedStar.points} pts
              </span>
            </div>

            <div className="py-4 text-center">
              <div className="inline-block p-4 rounded-2xl bg-[#26224B] border border-[#6F61A8]/40 mb-3 shadow-inner">
                {isDiscovered ? (
                  <Star rarity={selectedStar.rarity} size="xl" glowing />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center opacity-30">
                    <StarIcon className="w-12 h-12 text-slate-500" />
                  </div>
                )}
              </div>
              <h4 className="font-heading font-bold text-base text-[#FFF7ED]">
                {isDiscovered ? selectedStar.name : 'Unknown Mystery Star'}
              </h4>
              <p className="text-xs text-[#FFE5A3] mt-0.5">
                Rarity: <span className="capitalize font-semibold">{selectedStar.rarity}</span>
              </p>
            </div>

            <p className="text-xs text-[#E9DDFB] italic leading-relaxed bg-[#252247]/60 p-3 rounded-lg border border-[#6F61A8]/30 font-handwriting text-sm">
              {isDiscovered
                ? `“${selectedStar.description}”`
                : '“Misu hasn’t spotted this sparkle yet! Keep collecting falling stars during the night shift to log its entry.”'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#6F61A8]/30 flex items-center justify-between text-xs text-[#CDB7F3]">
            <span>In Satchel: <strong className="text-[#FFE5A3]">{count}</strong></span>
            {isDiscovered && <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Discovered</span>}
          </div>
        </div>
      </div>

      {/* Footer controls: Reset collection */}
      <div className="mt-5 pt-3 border-t border-[#6F61A8]/40 flex items-center justify-between pl-3">
        <span className="text-[11px] text-[#A795DC] flex items-center gap-1">
          <span>Auto-saved to your personal sky desk</span>
          <Heart className="w-3 h-3 text-[#F7C8D9] fill-[#F7C8D9] inline" />
        </span>

        {!showConfirmReset ? (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center gap-1.5 text-xs text-[#F7C8D9]/80 hover:text-[#F7C8D9] px-2.5 py-1 rounded-lg hover:bg-[#F7C8D9]/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Collection</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-[#2D1B2D] border border-rose-500/50 px-3 py-1.5 rounded-xl animate-in fade-in duration-150">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span className="text-xs text-rose-200">Reset all stars?</span>
            <button
              onClick={() => {
                onResetCollection();
                setShowConfirmReset(false);
              }}
              className="text-xs bg-rose-600 hover:bg-rose-500 text-white font-bold px-2 py-0.5 rounded shadow"
            >
              Yes, reset
            </button>
            <button
              onClick={() => setShowConfirmReset(false)}
              className="text-xs bg-[#403B6B] hover:bg-[#504A85] text-white px-2 py-0.5 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
