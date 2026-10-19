import React from 'react';
import type { StarRarity } from '../types/index.ts';

interface StarProps {
  rarity?: StarRarity;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  glowing?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

export const Star: React.FC<StarProps> = ({
  rarity = 'common',
  size = 'md',
  color,
  className = '',
  glowing = true,
  onClick,
  interactive = false,
}) => {
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorMap = {
    common: '#FFE5A3',
    uncommon: '#BFD7F4',
    rare: '#FCD34D',
    legendary: '#F472B6',
  };

  const starColor = color || colorMap[rarity];

  return (
    <div
      onClick={onClick}
      role={interactive ? 'button' : 'presentation'}
      aria-label={interactive ? `${rarity} star` : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          if (onClick) onClick();
        }
      }}
      className={`inline-flex items-center justify-center select-none ${sizeMap[size]} ${className} ${
        interactive ? 'cursor-pointer hover:scale-125 active:scale-95 transition-transform' : ''
      } ${glowing ? 'filter drop-shadow-[0_0_8px_rgba(255,229,163,0.7)]' : ''}`}
    >
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M20 2 L25 14 L38 15 L28 24 L31 37 L20 30 L9 37 L12 24 L2 15 L15 14 Z"
          fill={starColor}
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Sparkle face/center shine */}
        <circle cx="20" cy="20" r="3.5" fill="#FFFFFF" opacity="0.6" />
      </svg>
    </div>
  );
};
