/**
 * Pure game rules, scoring math, and progression logic
 */

import type { StarBookEntry, Mission } from '../types/index.ts';

export const STAR_DEFINITIONS: Omit<StarBookEntry, 'count'>[] = [
  {
    id: 'sleepy-star',
    name: 'Sleepy Star',
    rarity: 'common',
    points: 1,
    description: 'Small, soft, and shy. Loves dozing off in fluffy lavender clouds.',
    color: '#FFE5A3',
  },
  {
    id: 'moonbeam-star',
    name: 'Moonbeam Star',
    rarity: 'uncommon',
    points: 2,
    description: 'Found near the crescent moon. Radiates a soothing silver-lavender warmth.',
    color: '#BFD7F4',
  },
  {
    id: 'golden-star',
    name: 'Golden Star',
    rarity: 'rare',
    points: 3,
    description: 'A rare little sparkle that sings a faint bedtime chime when held.',
    color: '#FCD34D',
  },
  {
    id: 'wish-star',
    name: 'Wish Star',
    rarity: 'legendary',
    points: 5,
    description: 'Carries a tiny hopeful wish whispered by someone under the night sky.',
    color: '#F472B6',
  },
];

export function calculateNewScore(currentScore: number, starPoints: number): number {
  return Math.max(0, currentScore + Math.max(1, starPoints));
}

export function registerStarCollection(
  inventory: Record<string, number>,
  starId: string
): Record<string, number> {
  const currentCount = inventory[starId] || 0;
  return {
    ...inventory,
    [starId]: currentCount + 1,
  };
}

export function getDiscoveredTypesCount(inventory: Record<string, number>): number {
  return Object.values(inventory).filter((count) => count > 0).length;
}

export function checkMissionProgress(
  totalStars: number,
  missions: Mission[]
): Mission[] {
  return missions.map((mission) => ({
    ...mission,
    completed: totalStars >= mission.requiredStars,
  }));
}

export function getSleepinessLevel(starsCollected: number): number {
  // Sleepiness increases or hovers cutely between 85% and 99%
  const base = 98;
  const variation = (starsCollected % 15);
  return Math.min(99, Math.max(85, base - variation));
}
