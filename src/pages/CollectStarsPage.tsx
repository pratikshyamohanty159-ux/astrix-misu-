import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Star as StarIcon,
  Trophy,
  Sparkles,
  Clock,
  ArrowRight,
  Heart,
  Gift,
  Award,
  Check,
  Zap,
} from 'lucide-react';
import { MisuCharacter } from '../components/MisuCharacter.tsx';
import { Star } from '../components/Star.tsx';
import { StarCollectionBook } from '../components/StarCollectionBook.tsx';
import { STAR_DEFINITIONS, calculateNewScore } from '../utils/logic.ts';
import { soundManager } from '../utils/audio.ts';
import type { PageId, StarRarity, GameReward } from '../types/index.ts';

interface CollectStarsPageProps {
  onNavigate: (page: PageId) => void;
  inventory: Record<string, number>;
  totalStars: number;
  onStarCaught: (rarity: StarRarity, points: number) => void;
  onResetCollection: () => void;
  unlockedRewards: string[];
  onUnlockReward: (rewardId: string) => void;
}

interface GameFallingStar {
  id: number;
  x: number;
  y: number;
  speed: number;
  rarity: StarRarity;
  points: number;
  size: 'sm' | 'md' | 'lg' | 'xl';
  isCaught?: boolean;
}

interface FloatingSparkle {
  id: number;
  x: number;
  y: number;
  text: string;
}

export const GAME_REWARDS_CATALOG: GameReward[] = [
  {
    id: 'reward-starlight-charm',
    title: 'Starlight Novice Charm',
    tier: 'Bronze Tier',
    description: 'A glowing star charm for your night-shift satchel. Awarded for collecting 3+ stars.',
    icon: '🌟',
    requiredScore: 3,
    unlocked: false,
  },
  {
    id: 'reward-honey-biscuit',
    title: 'Starlight Honey Biscuit',
    tier: 'Silver Tier',
    description: 'A warm honey-baked biscuit shaped like a little star. Feed it to Misu for a happy giggle!',
    icon: '🧁',
    requiredScore: 7,
    unlocked: false,
  },
  {
    id: 'reward-golden-crown',
    title: 'Golden Moon Crown',
    tier: 'Gold Tier',
    description: 'A royal constellation crown hand-crafted by the Sky Keepers. Equips on Misu!',
    icon: '👑',
    requiredScore: 12,
    unlocked: false,
  },
  {
    id: 'reward-cosmic-trophy',
    title: 'Cosmic Nightlight Trophy',
    tier: 'Master Tier',
    description: 'The highest honor in the Midnight Sky Department. Awarded for 18+ stars in a single shift!',
    icon: '🏆',
    requiredScore: 18,
    unlocked: false,
  },
];

const SESSION_TIME = 22;

export const CollectStarsPage: React.FC<CollectStarsPageProps> = ({
  onNavigate,
  inventory,
  totalStars,
  onStarCaught,
  onResetCollection,
  unlockedRewards,
  onUnlockReward,
}) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'ended'>('idle');
  const [timeLeft, setTimeLeft] = useState(SESSION_TIME);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionStarsCaught, setSessionStarsCaught] = useState(0);
  const [gameStars, setGameStars] = useState<GameFallingStar[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingSparkle[]>([]);
  const [showStarBook, setShowStarBook] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [newlyUnlockedReward, setNewlyUnlockedReward] = useState<GameReward | null>(null);
  const [misuExp, setMisuExp] = useState<'default' | 'happy' | 'curious' | 'surprised' | 'excited' | 'love'>('default');
  const [hasCrownEquipped, setHasCrownEquipped] = useState(false);
  const [feedMessage, setFeedMessage] = useState<string | null>(null);

  const gameAreaRef = useRef<HTMLDivElement>(null);

  const spawnStar = (id: number): GameFallingStar => {
    const rand = Math.random();
    let rarity: StarRarity = 'common';
    let points = 1;
    let size: 'sm' | 'md' | 'lg' | 'xl' = 'sm';

    if (rand > 0.9) {
      rarity = 'legendary';
      points = 5;
      size = 'xl';
    } else if (rand > 0.72) {
      rarity = 'rare';
      points = 3;
      size = 'lg';
    } else if (rand > 0.45) {
      rarity = 'uncommon';
      points = 2;
      size = 'md';
    }

    return {
      id,
      x: 8 + Math.random() * 75,
      y: -5 - Math.random() * 20,
      speed: 0.38 + Math.random() * 0.45,
      rarity,
      points,
      size,
    };
  };

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(SESSION_TIME);
    setSessionScore(0);
    setSessionStarsCaught(0);
    setMisuExp('happy');
    setNewlyUnlockedReward(null);

    const initial = Array.from({ length: 7 }).map((_, i) => spawnStar(Date.now() + i));
    setGameStars(initial);
  };

  const handlePauseResume = () => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  };

  const handleRestart = () => {
    handleStartGame();
  };

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('ended');
          setMisuExp('happy');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Star physics loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setGameStars((prev) => {
        return prev.map((s) => {
          if (s.isCaught) return s;
          const nextY = s.y + s.speed;
          if (nextY > 100) {
            return spawnStar(Date.now() + Math.random());
          }
          return { ...s, y: nextY };
        });
      });
    }, 35);

    return () => clearInterval(interval);
  }, [gameState]);

  // Catch star handler
  const handleCatchStar = (star: GameFallingStar) => {
    if (gameState !== 'playing' || star.isCaught) return;

    // Trigger crystal chime sound with combo scaling
    soundManager.playStarChime(star.rarity);

    // Mark star caught
    setGameStars((prev) =>
      prev.map((s) => (s.id === star.id ? { ...s, isCaught: true } : s))
    );

    const nextScore = calculateNewScore(sessionScore, star.points);
    const nextCaught = sessionStarsCaught + 1;

    setSessionScore(nextScore);
    setSessionStarsCaught(nextCaught);
    onStarCaught(star.rarity, star.points);

    // Floating text indicator
    const newSparkleId = Date.now();
    setFloatingTexts((prev) => [
      ...prev,
      {
        id: newSparkleId,
        x: star.x,
        y: Math.max(10, star.y),
        text: `+${star.points} ⭐`,
      },
    ]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((p) => p.id !== newSparkleId));
    }, 800);

    // Real-time reward unlocking!
    const newlyEarned = GAME_REWARDS_CATALOG.find(
      (r) => nextCaught >= r.requiredScore && !unlockedRewards.includes(r.id)
    );
    if (newlyEarned) {
      onUnlockReward(newlyEarned.id);
      setNewlyUnlockedReward(newlyEarned);
      soundManager.playRewardFanfare();
      setTimeout(() => setNewlyUnlockedReward(null), 3000);
    }

    setMisuExp(star.rarity === 'legendary' || star.rarity === 'rare' ? 'surprised' : 'excited');
    setTimeout(() => setMisuExp('default'), 1200);

    // Respawn after short delay
    setTimeout(() => {
      setGameStars((prev) => [
        ...prev.filter((s) => s.id !== star.id),
        spawnStar(Date.now() + Math.random()),
      ]);
    }, 350);
  };

  // Find next reward for the HUD progress bar
  const nextUpcomingReward = GAME_REWARDS_CATALOG.find(
    (r) => sessionStarsCaught < r.requiredScore
  );
  const remainingForNext = nextUpcomingReward
    ? nextUpcomingReward.requiredScore - sessionStarsCaught
    : 0;

  // Treat action: Feed Misu
  const handleFeedMisu = () => {
    soundManager.playStarChime('legendary');
    setMisuExp('love');
    setFeedMessage('“nom nom nom! ♡ super yummy starlight honey! thank you!”');
    setTimeout(() => {
      setFeedMessage(null);
      setMisuExp('happy');
    }, 2800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25234D] border border-[#CDB7F3]/40 text-xs font-semibold text-[#FFE5A3]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MINI-GAME SHIFT & REWARDS</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#FFF7ED]">
          Let's collect some starlight! ⭐
        </h1>
        <p className="text-sm sm:text-base text-[#CDB7F3] max-w-xl mx-auto">
          Tap the falling stars before they disappear into the sleepy clouds. Catch stars to unlock delicious honey biscuits, golden crowns, and medals!
        </p>
      </div>

      {/* Real-time Reward Notification Banner */}
      {newlyUnlockedReward && (
        <div className="bg-gradient-to-r from-[#FFE5A3] via-[#F7C8D9] to-[#CDB7F3] text-[#19182F] p-4 rounded-2xl shadow-2xl border-2 border-white flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{newlyUnlockedReward.icon}</span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#19182F] text-[#FFE5A3] px-2 py-0.5 rounded-full">
                🎉 REWARD UNLOCKED!
              </span>
              <h4 className="font-heading font-bold text-base mt-0.5">
                {newlyUnlockedReward.title} ({newlyUnlockedReward.tier})
              </h4>
              <p className="text-xs font-medium">{newlyUnlockedReward.description}</p>
            </div>
          </div>
          <button
            onClick={() => setShowRewardsModal(true)}
            className="px-4 py-2 rounded-xl bg-[#19182F] text-[#FFE5A3] text-xs font-heading font-bold hover:scale-105 cursor-pointer shrink-0"
          >
            Claim & Inspect
          </button>
        </div>
      )}

      {/* Game HUD Bar: Timer, Score, Rewards, Controls */}
      <div className="bg-[#211E3E] border-2 border-[#6F61A8]/50 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-[#19182F] px-3.5 py-1.5 rounded-xl border border-[#6F61A8]/40">
            <Clock className="w-4 h-4 text-[#FFE5A3]" />
            <span className="text-xs text-[#CDB7F3]">Time:</span>
            <span className="font-heading font-bold text-base text-[#FFE5A3] tabular-nums">
              {timeLeft}s
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#19182F] px-3.5 py-1.5 rounded-xl border border-[#6F61A8]/40">
            <Trophy className="w-4 h-4 text-[#FCD34D]" />
            <span className="text-xs text-[#CDB7F3]">Score:</span>
            <span className="font-heading font-bold text-base text-[#FFF7ED] tabular-nums">
              {sessionScore} pts
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#19182F] px-3.5 py-1.5 rounded-xl border border-[#6F61A8]/40">
            <StarIcon className="w-4 h-4 text-[#CDB7F3]" />
            <span className="text-xs text-[#CDB7F3]">Caught:</span>
            <span className="font-heading font-bold text-base text-[#FFE5A3] tabular-nums">
              {sessionStarsCaught}
            </span>
          </div>

          {/* Next Reward Live Indicator */}
          {nextUpcomingReward && gameState === 'playing' && (
            <div className="flex items-center gap-2 bg-[#2D2452] px-3 py-1.5 rounded-xl border border-[#FFE5A3]/40 text-xs">
              <span>{nextUpcomingReward.icon}</span>
              <span className="text-[#CDB7F3]">Next reward:</span>
              <span className="font-bold text-[#FFE5A3]">
                {remainingForNext} more {remainingForNext === 1 ? 'star' : 'stars'}!
              </span>
            </div>
          )}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-2">
          {gameState === 'idle' ? (
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE5A3] to-[#FCD34D] hover:from-[#FFF1CC] hover:to-[#FFE5A3] text-[#19182F] font-heading font-bold text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-[#19182F]" />
              <span>Start Collecting</span>
            </button>
          ) : (
            <>
              {gameState !== 'ended' && (
                <button
                  onClick={handlePauseResume}
                  className="px-4 py-2 rounded-xl bg-[#292552] text-[#E9DDFB] border border-[#6F61A8]/40 hover:bg-[#37326E] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  aria-label={gameState === 'playing' ? 'Pause session' : 'Resume session'}
                >
                  {gameState === 'playing' ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Resume</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={handleRestart}
                className="px-3.5 py-2 rounded-xl bg-[#292552] text-[#CDB7F3] border border-[#6F61A8]/40 hover:text-white hover:bg-[#37326E] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Restart Session"
                aria-label="Restart collecting session"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restart</span>
              </button>
            </>
          )}

          <button
            onClick={() => setShowRewardsModal(true)}
            className="px-3.5 py-2 rounded-xl bg-[#6F61A8]/40 text-[#F7C8D9] border border-[#F7C8D9]/40 hover:bg-[#6F61A8] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer relative"
          >
            <Gift className="w-4 h-4" />
            <span>Rewards ({unlockedRewards.length}/{GAME_REWARDS_CATALOG.length})</span>
            {unlockedRewards.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-1 -right-1 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setShowStarBook(!showStarBook)}
            className="px-3.5 py-2 rounded-xl bg-[#6F61A8]/40 text-[#FFE5A3] border border-[#FFE5A3]/40 hover:bg-[#6F61A8] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            aria-label="Open Star Collection Book"
          >
            <BookOpen className="w-4 h-4" />
            <span>Star Book</span>
          </button>
        </div>
      </div>

      {/* Main Sky Play Area */}
      <div
        ref={gameAreaRef}
        className="relative w-full h-[440px] sm:h-[480px] bg-gradient-to-b from-[#141328] via-[#1E1B3E] to-[#2B2352] rounded-3xl border-2 border-[#6F61A8]/60 overflow-hidden shadow-2xl select-none"
      >
        <div className="absolute top-6 right-10 text-5xl opacity-40 select-none animate-pulse">
          🌙
        </div>
        <div className="absolute top-16 left-12 opacity-60 animate-twinkle pointer-events-none">
          <Star size="xs" color="#FFE5A3" />
        </div>
        <div className="absolute top-28 right-36 opacity-50 animate-twinkle pointer-events-none">
          <Star size="xs" color="#BFD7F4" />
        </div>

        {/* Fluffy Lavender Cloud Layer */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#2E2854] to-transparent pointer-events-none opacity-80" />
        <div className="absolute -bottom-8 left-0 right-0 flex justify-around opacity-40 pointer-events-none text-6xl">
          <span>☁️</span>
          <span>☁️</span>
          <span>☁️</span>
          <span>☁️</span>
        </div>

        {/* Idle Start Prompt Overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#19182F]/75 backdrop-blur-xs p-6 text-center space-y-4">
            <div className="p-4 rounded-3xl bg-[#292552] border border-[#FFE5A3]/40 shadow-xl animate-gentle-float">
              <StarIcon className="w-12 h-12 text-[#FFE5A3] fill-[#FFE5A3] mx-auto animate-pulse" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#FFF7ED]">
              Ready for your night shift?
            </h3>
            <p className="text-sm text-[#CDB7F3] max-w-md">
              Tap stars as they fall. Every catch chimes musically! Unlock the Starlight Charm, Honey Biscuit, and Moon Crown!
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FFE5A3] to-[#FCD34D] hover:scale-105 text-[#19182F] font-heading font-bold text-base shadow-xl transition-all cursor-pointer"
            >
              Start Collecting Stars ✨
            </button>
          </div>
        )}

        {/* Paused Overlay */}
        {gameState === 'paused' && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#19182F]/80 backdrop-blur-xs p-6 text-center space-y-3">
            <h3 className="font-heading font-bold text-2xl text-[#FFE5A3]">
              Night Shift Paused ⏸️
            </h3>
            <p className="text-xs text-[#CDB7F3]">
              The stars are patiently waiting for your return.
            </p>
            <button
              onClick={handlePauseResume}
              className="px-6 py-2.5 rounded-xl bg-[#6F61A8] hover:bg-[#8374C2] text-white font-heading font-bold text-sm shadow transition-all cursor-pointer"
            >
              Resume Shift
            </button>
          </div>
        )}

        {/* Session Finished Results Overlay */}
        {gameState === 'ended' && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#19182F]/90 backdrop-blur-sm p-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="p-3 bg-[#FFE5A3]/20 border border-[#FFE5A3] rounded-full">
              <Trophy className="w-10 h-10 text-[#FFE5A3]" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#FFF7ED] flex items-center justify-center gap-2">
              <span>YAY! Misu collected {sessionStarsCaught} little stars!</span>
              <Heart className="w-6 h-6 text-[#F7C8D9] fill-[#F7C8D9] inline" />
            </h3>
            <p className="text-sm text-[#CDB7F3]">
              Shift complete! You earned <strong className="text-[#FFE5A3] font-bold">{sessionScore} points</strong>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartGame}
                className="px-6 py-3 rounded-xl bg-[#FFE5A3] hover:bg-[#FCD34D] text-[#19182F] font-heading font-bold text-sm shadow hover:scale-105 transition-all cursor-pointer"
              >
                Collect Again 🔄
              </button>
              <button
                onClick={() => setShowRewardsModal(true)}
                className="px-5 py-3 rounded-xl bg-[#F7C8D9] hover:bg-[#F472B6] text-[#19182F] font-heading font-bold text-sm shadow hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Gift className="w-4 h-4 text-[#19182F]" />
                <span>Open Rewards Chest ({unlockedRewards.length})</span>
              </button>
              <button
                onClick={() => setShowStarBook(true)}
                className="px-5 py-3 rounded-xl bg-[#6F61A8] hover:bg-[#8374C2] text-white font-heading font-bold text-sm shadow hover:scale-105 transition-all cursor-pointer"
              >
                Open My Star Book 📖
              </button>
            </div>
          </div>
        )}

        {/* Floating Sparkle/Score Popups */}
        {floatingTexts.map((item) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-none z-30 font-heading font-extrabold text-base text-[#FFE5A3] drop-shadow-[0_2px_8px_rgba(255,229,163,0.8)] animate-bounce"
          >
            {item.text}
          </div>
        ))}

        {/* Falling Game Stars */}
        {gameState === 'playing' &&
          gameStars.map((star) => (
            <div
              key={star.id}
              style={{
                position: 'absolute',
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleCatchStar(star)}
              className={`cursor-pointer p-2 z-20 transition-transform ${
                star.isCaught
                  ? 'scale-150 opacity-0 duration-300 pointer-events-none'
                  : 'hover:scale-130 active:scale-95 duration-100'
              }`}
              role="button"
              aria-label={`Catch falling ${star.rarity} star for ${star.points} points`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCatchStar(star);
              }}
            >
              <Star rarity={star.rarity} size={star.size} glowing />
            </div>
          ))}

        {/* Misu Character standing at bottom right */}
        <div className="absolute bottom-2 right-4 sm:right-10 z-20 pointer-events-auto flex flex-col items-center">
          {hasCrownEquipped && (
            <div className="text-3xl -mb-4 z-30 animate-bounce">👑</div>
          )}
          <MisuCharacter
            expression={misuExp}
            size="md"
            holdingItem="star"
            animate={gameState !== 'paused'}
            interactive
          />
        </div>
      </div>

      {/* Embedded Celestial Star Collection Book */}
      <div className="mt-8">
        <StarCollectionBook
          inventory={inventory}
          totalStars={totalStars}
          onResetCollection={onResetCollection}
        />
      </div>

      {/* Modal for Star Book */}
      {showStarBook && (
        <StarCollectionBook
          isModal
          inventory={inventory}
          totalStars={totalStars}
          onResetCollection={onResetCollection}
          onClose={() => setShowStarBook(false)}
        />
      )}

      {/* Interactive Rewards Chest Modal */}
      {showRewardsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#241F48] border-2 border-[#FFE5A3] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#6F61A8]/40">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#FFE5A3]" />
                <h3 className="font-heading font-bold text-lg text-[#FFF7ED]">
                  Shift Rewards & Collectibles Vault
                </h3>
              </div>
              <button
                onClick={() => setShowRewardsModal(false)}
                className="text-xs text-[#CDB7F3] hover:text-white px-2.5 py-1 rounded-lg bg-[#19182F] cursor-pointer"
              >
                Close
              </button>
            </div>

            {feedMessage && (
              <div className="p-3 bg-[#FFE5A3] text-[#19182F] font-heading font-bold text-xs rounded-2xl text-center animate-in zoom-in-95 duration-200">
                {feedMessage}
              </div>
            )}

            <div className="space-y-3">
              {GAME_REWARDS_CATALOG.map((reward) => {
                const isEarned = unlockedRewards.includes(reward.id);
                return (
                  <div
                    key={reward.id}
                    className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                      isEarned
                        ? 'bg-[#312754] border-[#FFE5A3] shadow-md'
                        : 'bg-[#19182F]/70 border-[#6F61A8]/30 opacity-70'
                    }`}
                  >
                    <span className="text-3xl">{reward.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFE5A3]">
                          {reward.tier}
                        </span>
                        {isEarned ? (
                          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Claimed
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-300">
                            Catch {reward.requiredScore}+ stars in shift
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#FFF7ED] mt-0.5">
                        {reward.title}
                      </h4>
                      <p className="text-xs text-[#CDB7F3] mt-1">{reward.description}</p>

                      {/* Interactive Reward Buttons */}
                      {isEarned && (
                        <div className="mt-2.5 pt-2 border-t border-[#6F61A8]/40 flex gap-2">
                          {reward.id === 'reward-honey-biscuit' && (
                            <button
                              onClick={handleFeedMisu}
                              className="px-3 py-1 rounded-lg bg-[#FFE5A3] text-[#19182F] font-heading font-bold text-xs hover:bg-[#FFF7ED] transition-transform hover:scale-105 cursor-pointer flex items-center gap-1"
                            >
                              <span>Feed Biscuit to Misu 🧁</span>
                            </button>
                          )}

                          {reward.id === 'reward-golden-crown' && (
                            <button
                              onClick={() => {
                                setHasCrownEquipped(!hasCrownEquipped);
                                soundManager.playStarChime('legendary');
                              }}
                              className="px-3 py-1 rounded-lg bg-[#6F61A8] text-white font-heading font-bold text-xs hover:bg-[#8374C2] transition-transform hover:scale-105 cursor-pointer flex items-center gap-1"
                            >
                              <span>{hasCrownEquipped ? 'Unequip Crown 👑' : 'Wear Golden Crown 👑'}</span>
                            </button>
                          )}

                          {reward.id === 'reward-starlight-charm' && (
                            <button
                              onClick={() => soundManager.playStarChime('rare')}
                              className="px-3 py-1 rounded-lg bg-[#2B2352] text-[#FFE5A3] font-heading font-bold text-xs hover:bg-[#392E6E] cursor-pointer"
                            >
                              <span>Jingle Charm 🔔</span>
                            </button>
                          )}

                          {reward.id === 'reward-cosmic-trophy' && (
                            <button
                              onClick={() => soundManager.playRewardFanfare()}
                              className="px-3 py-1 rounded-lg bg-[#D4AF37] text-[#19182F] font-heading font-bold text-xs hover:scale-105 cursor-pointer"
                            >
                              <span>Play Victory Fanfare 🎺</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowRewardsModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#FFE5A3] text-[#19182F] font-heading font-bold text-xs cursor-pointer hover:bg-[#FFF7ED]"
            >
              Back to Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
