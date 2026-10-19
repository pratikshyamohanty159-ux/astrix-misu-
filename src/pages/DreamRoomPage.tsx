import React, { useState, useEffect } from 'react';
import { Moon, Sun, Music, Play, Square, Sparkles, Heart, Book, RotateCcw, Volume2, VolumeX, Eye, Info, X } from 'lucide-react';
import { MisuCharacter } from '../components/MisuCharacter.tsx';
import { Star } from '../components/Star.tsx';
import { soundManager } from '../utils/audio.ts';
import type { PageId } from '../types/index.ts';

interface DreamRoomPageProps {
  onNavigate: (page: PageId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  nightlightOn: boolean;
  onToggleNightlight: (newState: boolean) => void;
  totalStars: number;
}

interface RoomHotspot {
  id: string;
  name: string;
  icon: string;
  description: string;
  tagline: string;
  x: number; // percentage coordinates on 3D room view
  y: number;
}

const ROOM_HOTSPOTS: RoomHotspot[] = [
  {
    id: 'star-jar',
    name: 'The Big Star Jar',
    icon: '🏺',
    description: 'Stores collected starlight safe and sound until morning. It radiates a warm fairy-light glow that keeps away scary dreams.',
    tagline: '“Stores collected starlight”',
    x: 22,
    y: 60,
  },
  {
    id: 'dream-bed',
    name: 'Fluffy Dream Bed',
    icon: '🛏️',
    description: 'Where Misu rests and dreams after her long night shift. It’s shaped like a soft lavender cloud mattress with starry blankets.',
    tagline: '“Where Misu rests and dreams”',
    x: 48,
    y: 75,
  },
  {
    id: 'telescope',
    name: 'Celestial Telescope',
    icon: '🔭',
    description: 'A miniature brass telescope on a wooden tripod. Misu uses it to scan constellations and spot wandering lost stars.',
    tagline: '“Finds fallen stars”',
    x: 65,
    y: 54,
  },
  {
    id: 'bookshelf',
    name: 'Sky Archive Bookshelf',
    icon: '📖',
    description: 'Stacked with ancient constellation scrolls, star maps, field guides, and Misu’s handwritten notes about every rescued sparkle.',
    tagline: '“Maps, notes & star stories”',
    x: 8,
    y: 50,
  },
  {
    id: 'work-desk',
    name: 'Night Shift Work Desk',
    icon: '🖥️',
    description: 'Where Misu plots starlight routes, polishes starry nightlights, and files shift reports to the Midnight Sky Department.',
    tagline: '“Plan, collect, create”',
    x: 84,
    y: 68,
  },
  {
    id: 'window',
    name: 'The Moon Window',
    icon: '🌙',
    description: 'A giant circular timber frame looking out toward the never-ending sky, floating cloud castles, and the gentle crescent moon.',
    tagline: '“A view of the never-ending sky”',
    x: 44,
    y: 30,
  },
];

export const DreamRoomPage: React.FC<DreamRoomPageProps> = ({
  onNavigate,
  soundEnabled,
  onToggleSound,
  nightlightOn,
  onToggleNightlight,
  totalStars,
}) => {
  const [isLullabyPlaying, setIsLullabyPlaying] = useState(false);
  const [hasSaidGoodnight, setHasSaidGoodnight] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<RoomHotspot | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'illustrated'>('3d');

  useEffect(() => {
    return () => {
      soundManager.stopLullaby();
    };
  }, []);

  const handleToggleLullaby = () => {
    if (!soundEnabled) {
      onToggleSound();
    }
    if (isLullabyPlaying) {
      soundManager.stopLullaby();
      setIsLullabyPlaying(false);
    } else {
      soundManager.startLullaby();
      setIsLullabyPlaying(true);
    }
  };

  const handleStopLullaby = () => {
    soundManager.stopLullaby();
    setIsLullabyPlaying(false);
  };

  const handleNightlightClick = () => {
    const next = !nightlightOn;
    onToggleNightlight(next);
    if (soundEnabled) {
      soundManager.playNightlightClick(next);
    }
  };

  const handleGoodnight = () => {
    setHasSaidGoodnight(true);
    onToggleNightlight(false);
  };

  const handleOpenHotspot = (spot: RoomHotspot) => {
    setActiveHotspot(spot);
    soundManager.playStarChime('common');
  };

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] transition-colors duration-1000 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${
        nightlightOn ? 'bg-[#1E1A3A]' : 'bg-[#111022]'
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25234D] border border-[#CDB7F3]/40 text-xs font-semibold text-[#FFE5A3] shadow-inner">
            <Moon className="w-3.5 h-3.5" />
            <span>MISU’S 3D DREAM ROOM</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#FFF7ED]">
            Goodnight, little star. 🌙
          </h1>
          <p className="text-sm sm:text-base text-[#CDB7F3] max-w-xl mx-auto font-handwriting text-xl sm:text-2xl">
            “Same sky... Different dreams... ♡”
          </p>
        </div>

        {/* Room Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#211E3E] border border-[#6F61A8]/50 p-4 rounded-2xl shadow-xl">
          {/* Nightlight Switch */}
          <button
            onClick={handleNightlightClick}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
              nightlightOn
                ? 'bg-[#FFE5A3] text-[#19182F] hover:bg-[#FCD34D] scale-102 ring-2 ring-[#FFE5A3]/50'
                : 'bg-[#292552] text-[#CDB7F3] border border-[#6F61A8]/50 hover:bg-[#342F69]'
            }`}
            aria-pressed={nightlightOn}
            aria-label={`Nightlight is ${nightlightOn ? 'ON' : 'OFF'}. Click to toggle`}
          >
            {nightlightOn ? (
              <>
                <Sun className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>Nightlight ON (Warm Glow)</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#BFD7F4]" />
                <span>Nightlight OFF (Deep Moonlight)</span>
              </>
            )}
          </button>

          {/* View Mode Toggle (3D Room vs Illustrated) */}
          <div className="flex items-center gap-1.5 bg-[#19182F] p-1 rounded-xl border border-[#6F61A8]/30">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all ${
                viewMode === '3d'
                  ? 'bg-[#6F61A8] text-white shadow'
                  : 'text-[#CDB7F3] hover:text-white'
              }`}
            >
              3D Cozy Loft View
            </button>
            <button
              onClick={() => setViewMode('illustrated')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all ${
                viewMode === 'illustrated'
                  ? 'bg-[#6F61A8] text-white shadow'
                  : 'text-[#CDB7F3] hover:text-white'
              }`}
            >
              Bedside View
            </button>
          </div>

          {/* Bedtime Lullaby Controller */}
          <div className="flex items-center gap-2 bg-[#19182F]/80 border border-[#6F61A8]/40 px-3 py-1.5 rounded-xl">
            <Music className={`w-4 h-4 ${isLullabyPlaying ? 'text-[#FFE5A3] animate-bounce' : 'text-[#CDB7F3]'}`} />
            <span className="text-xs text-[#CDB7F3] font-semibold">Lullaby:</span>

            <button
              onClick={handleToggleLullaby}
              className={`p-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isLullabyPlaying
                  ? 'bg-[#6F61A8] text-white hover:bg-[#8374C2]'
                  : 'bg-[#2D2A54] text-[#FFE5A3] hover:bg-[#3E3A70]'
              }`}
              aria-label={isLullabyPlaying ? 'Pause synthesized lullaby' : 'Play synthesized lullaby'}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isLullabyPlaying ? 'Playing' : 'Play'}</span>
            </button>

            {isLullabyPlaying && (
              <button
                onClick={handleStopLullaby}
                className="p-1.5 rounded-lg bg-[#2D2A54] text-rose-300 hover:text-white text-xs cursor-pointer"
                aria-label="Stop lullaby"
              >
                <Square className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* --- MAIN 3D DREAM ROOM ENVIRONMENT WITH INTERACTIVE HOTSPOTS --- */}
        {viewMode === '3d' ? (
          <div
            className={`relative rounded-3xl border-3 overflow-hidden shadow-2xl transition-all duration-1000 ${
              nightlightOn
                ? 'border-[#FFE5A3]/60 shadow-[0_20px_60px_rgba(255,229,163,0.2)]'
                : 'border-[#4A3D73]/60 shadow-[0_20px_60px_rgba(30,20,60,0.5)]'
            }`}
          >
            {/* 3D Render Image */}
            <div className="relative w-full aspect-video sm:h-[540px] bg-[#0E0C1C] overflow-hidden">
              <img
                src="/misu_dream_room_3d.jpg"
                alt="Misu's 3D Dream Room - Cozy Celestial Loft"
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  nightlightOn ? 'brightness-105 contrast-105' : 'brightness-75 contrast-115'
                }`}
              />

              {/* Nightlight Warm Atmosphere Tint Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
                  nightlightOn
                    ? 'bg-gradient-to-t from-amber-500/10 via-transparent to-transparent opacity-100'
                    : 'bg-gradient-to-t from-indigo-950/40 via-transparent to-blue-950/30 opacity-100'
                }`}
              />

              {/* Interactive Hotspot Buttons (From Concept Sheet) */}
              {ROOM_HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => handleOpenHotspot(spot)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer focus:outline-none"
                  aria-label={`Inspect ${spot.name}`}
                >
                  <span className="relative flex h-8 w-8 sm:h-10 sm:w-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFE5A3] opacity-75"></span>
                    <span className="relative inline-flex items-center justify-center rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-[#19182F]/90 border-2 border-[#FFE5A3] text-sm sm:text-base shadow-xl group-hover:scale-125 transition-transform">
                      {spot.icon}
                    </span>
                  </span>

                  {/* Tooltip on hover */}
                  <span className="absolute left-1/2 -translate-x-1/2 -top-8 hidden group-hover:block bg-[#19182F]/95 text-[#FFE5A3] text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap border border-[#CDB7F3]/40 shadow-lg pointer-events-none">
                    {spot.name}
                  </span>
                </button>
              ))}

              {/* Little hint pill at bottom */}
              <div className="absolute bottom-4 left-4 z-20 bg-[#19182F]/85 backdrop-blur-sm border border-[#CDB7F3]/40 px-3.5 py-1.5 rounded-full text-xs text-[#E9DDFB] flex items-center gap-1.5 shadow">
                <Sparkles className="w-3.5 h-3.5 text-[#FFE5A3]" />
                <span>Tap the glowing icons to inspect room details</span>
              </div>
            </div>
          </div>
        ) : (
          /* --- ILLUSTRATED BEDSIDE VIEW --- */
          <div
            className={`relative rounded-3xl border-2 transition-all duration-1000 p-8 sm:p-12 shadow-2xl overflow-hidden ${
              nightlightOn
                ? 'border-[#FFE5A3]/50 bg-gradient-to-b from-[#2B2352] to-[#201B40]'
                : 'border-[#433B6A]/50 bg-gradient-to-b from-[#141226] to-[#0E0D1B]'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-56 h-56 rounded-full border-4 border-[#6F61A8] bg-[#0E0C1C] overflow-hidden shadow-2xl flex items-center justify-center p-4">
                  <div className="text-5xl select-none z-10 animate-gentle-float">🌙</div>
                  <span className="absolute top-8 left-10 animate-twinkle">
                    <Star size="xs" color="#FFE5A3" />
                  </span>
                  <span className="absolute bottom-12 right-12 animate-twinkle">
                    <Star size="xs" color="#F7C8D9" />
                  </span>
                  <span className="absolute top-16 right-10 animate-twinkle">
                    <Star size="xs" color="#BFD7F4" />
                  </span>
                  <div className="absolute inset-0 border-t-2 border-b-2 border-[#6F61A8]/40 my-auto h-0" />
                  <div className="absolute inset-0 border-l-2 border-r-2 border-[#6F61A8]/40 mx-auto w-0" />
                </div>
                <span className="text-[11px] text-[#A795DC] mt-3">Window overlooking the Milky Way</span>
              </div>

              <div className="md:col-span-7 flex flex-col items-center md:items-start space-y-4">
                <MisuCharacter
                  expression={hasSaidGoodnight ? 'sleepy' : 'happy'}
                  size="xl"
                  holdingItem={hasSaidGoodnight ? 'none' : 'star'}
                  animate={!hasSaidGoodnight}
                />
              </div>
            </div>
          </div>
        )}

        {/* Room Details Grid (All 6 Features from Concept Sheet) */}
        <div className="bg-[#211E3E] border-2 border-[#6F61A8]/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#6F61A8]/30">
            <h3 className="font-heading font-bold text-lg text-[#FFF7ED] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFE5A3]" />
              <span>Room Architecture & Celestial Amenities</span>
            </h3>
            <span className="text-xs text-[#CDB7F3]">From Misu’s Dream Room Sheet</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ROOM_HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => handleOpenHotspot(spot)}
                className="p-3.5 rounded-2xl bg-[#19182F]/70 border border-[#6F61A8]/30 hover:border-[#FFE5A3] hover:bg-[#252047] text-left transition-all cursor-pointer flex items-start gap-3 group"
              >
                <span className="text-2xl group-hover:scale-125 transition-transform">{spot.icon}</span>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[#FFF7ED] group-hover:text-[#FFE5A3]">
                    {spot.name}
                  </h4>
                  <p className="text-[11px] text-[#CDB7F3] font-handwriting text-sm">{spot.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Goodnight Action Button & Farewell Card */}
        <div className="text-center pt-2 space-y-6">
          {!hasSaidGoodnight ? (
            <button
              onClick={handleGoodnight}
              className="px-9 py-4 rounded-2xl bg-gradient-to-r from-[#CDB7F3] to-[#B69EE3] hover:from-[#DDD1F9] hover:to-[#CDB7F3] text-[#19182F] font-heading font-extrabold text-base sm:text-lg shadow-xl shadow-[#6F61A8]/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 cursor-pointer"
            >
              <span>Goodnight, Misu</span>
              <Heart className="w-5 h-5 text-rose-600 fill-rose-500" />
            </button>
          ) : (
            <div className="max-w-xl mx-auto bg-[#19182F]/90 border-2 border-[#CDB7F3]/50 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-500">
              <div className="text-3xl animate-pulse">💤</div>
              <div className="font-handwriting text-2xl sm:text-3xl text-[#FFE5A3] leading-relaxed space-y-2">
                <p>all the little stars are home now.</p>
                <p>thank you for helping me tonight.</p>
                <p>sleep well, little dreamer.</p>
                <p className="flex items-center justify-center gap-1.5">
                  <span>see you under the stars tomorrow.</span>
                  <Heart className="w-5 h-5 text-[#F7C8D9] fill-[#F7C8D9] inline" />
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => onNavigate('home')}
                  className="px-7 py-3 rounded-xl bg-[#FFE5A3] hover:bg-[#FCD34D] text-[#19182F] font-heading font-bold text-sm shadow hover:scale-105 transition-all cursor-pointer"
                >
                  Return to the Beginning
                </button>
                <button
                  onClick={() => setHasSaidGoodnight(false)}
                  className="px-4 py-3 rounded-xl bg-[#2D2A54] text-[#CDB7F3] hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Wake Misu up gently ☀️
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hotspot Inspection Modal */}
        {activeHotspot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#241F48] border-2 border-[#FFE5A3] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 text-left relative">
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#19182F] text-[#CDB7F3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="text-3xl p-2.5 rounded-2xl bg-[#19182F] border border-[#6F61A8]/40">
                  {activeHotspot.icon}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFE5A3]">
                    Dream Room Inspection
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#FFF7ED]">
                    {activeHotspot.name}
                  </h3>
                </div>
              </div>

              <p className="font-handwriting text-xl text-[#FFE5A3] italic">
                {activeHotspot.tagline}
              </p>

              <div className="bg-[#19182F] p-4 rounded-2xl border border-[#6F61A8]/30">
                <p className="text-sm text-[#E9DDFB] leading-relaxed">
                  {activeHotspot.description}
                </p>
                {activeHotspot.id === 'star-jar' && (
                  <p className="text-xs text-[#FFE5A3] mt-2 pt-2 border-t border-white/10 font-bold">
                    Currently shining with {totalStars} collected celestial stars!
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveHotspot(null)}
                className="w-full py-2.5 rounded-xl bg-[#FFE5A3] text-[#19182F] font-heading font-bold text-xs"
              >
                Back to Dream Room
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
