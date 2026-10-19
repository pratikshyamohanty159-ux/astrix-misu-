import React, { useState, useEffect } from 'react';
import { Star } from './Star.tsx';
import type { StarRarity } from '../types/index.ts';

interface FallingStarItem {
  id: number;
  x: number; // percentage 5% to 92%
  y: number; // percentage -10% to 110%
  speed: number;
  size: 'sm' | 'md' | 'lg';
  rarity: StarRarity;
  swayOffset: number;
}

interface FloatingFeedback {
  id: number;
  x: number;
  y: number;
  text: string;
}

interface FallingStarsProps {
  onCollect: (rarity: StarRarity) => void;
  count?: number;
}

export const FallingStars: React.FC<FallingStarsProps> = ({ onCollect, count = 7 }) => {
  const [stars, setStars] = useState<FallingStarItem[]>([]);
  const [feedbacks, setFeedbacks] = useState<FloatingFeedback[]>([]);

  useEffect(() => {
    // Generate initial falling stars
    const initialStars: FallingStarItem[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      x: 5 + Math.random() * 88,
      y: Math.random() * 90,
      speed: 0.15 + Math.random() * 0.25,
      size: Math.random() > 0.75 ? 'lg' : Math.random() > 0.4 ? 'md' : 'sm',
      rarity: Math.random() > 0.85 ? 'rare' : Math.random() > 0.6 ? 'uncommon' : 'common',
      swayOffset: Math.random() * 10,
    }));
    setStars(initialStars);
  }, [count]);

  useEffect(() => {
    let animId: number;
    const interval = setInterval(() => {
      setStars((prev) =>
        prev.map((star) => {
          let newY = star.y + star.speed;
          let newX = star.x + Math.sin((newY + star.swayOffset) * 0.05) * 0.15;
          if (newY > 105) {
            newY = -8;
            newX = 5 + Math.random() * 88;
          }
          return { ...star, y: newY, x: newX };
        })
      );
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleCollect = (star: FallingStarItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onCollect(star.rarity);

    // Add floating feedback at click position
    const feedback: FloatingFeedback = {
      id: Date.now() + Math.random(),
      x: star.x,
      y: star.y,
      text: star.rarity === 'rare' ? '+3 Golden Sparkle! ⭐' : 'a little star for you! ✨',
    };
    setFeedbacks((prev) => [...prev, feedback]);
    setTimeout(() => {
      setFeedbacks((prev) => prev.filter((f) => f.id !== feedback.id));
    }, 1200);

    // Reset star to top with new properties
    setStars((prev) =>
      prev.map((s) =>
        s.id === star.id
          ? {
              ...s,
              y: -10,
              x: 5 + Math.random() * 88,
              rarity: Math.random() > 0.8 ? 'rare' : Math.random() > 0.5 ? 'uncommon' : 'common',
            }
          : s
      )
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          className="pointer-events-auto cursor-pointer p-2 hover:scale-125 transition-transform duration-150"
          onClick={(e) => handleCollect(star, e)}
          role="button"
          aria-label="Collect falling star"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleCollect(star, e as unknown as React.MouseEvent);
            }
          }}
        >
          <Star rarity={star.rarity} size={star.size} glowing />
        </div>
      ))}

      {/* Floating Sparkle Messages */}
      {feedbacks.map((fb) => (
        <div
          key={fb.id}
          style={{
            left: `${fb.x}%`,
            top: `${fb.y}%`,
          }}
          className="absolute -translate-x-1/2 -translate-y-8 animate-bounce text-xs sm:text-sm font-semibold text-[#FFE5A3] bg-[#292552]/90 border border-[#CDB7F3]/40 px-3 py-1 rounded-full shadow-lg backdrop-blur-sm pointer-events-none select-none z-50 whitespace-nowrap"
        >
          {fb.text}
        </div>
      ))}
    </div>
  );
};
