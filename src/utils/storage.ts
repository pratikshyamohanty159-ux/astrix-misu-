/**
 * Local storage manager for Misu's Little Star Office
 */

import type { UserGameState } from '../types/index.ts';

const STORAGE_KEY = 'misu_star_office_save_v1';

const DEFAULT_STATE: UserGameState = {
  totalStarsCollected: 0,
  soundEnabled: false, // Default muted per requirements
  nightlightOn: true,
  secretUnlocked: false,
  easterEggBadgeEarned: false,
  discoveredStars: {
    'sleepy-star': 0,
    'moonbeam-star': 0,
    'golden-star': 0,
    'wish-star': 0,
  },
  completedMissionIds: [],
  unlockedRewardIds: [],
  lastSessionScore: 0,
};

export function loadGameState(): UserGameState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      discoveredStars: {
        ...DEFAULT_STATE.discoveredStars,
        ...(parsed.discoveredStars || {}),
      },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveGameState(state: Partial<UserGameState>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = loadGameState();
    const updated = { ...current, ...state };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Storage quota or private browsing fallback
  }
}

export function clearGameCollection(): UserGameState {
  if (typeof window !== 'undefined') {
    try {
      const current = loadGameState();
      const resetState: UserGameState = {
        ...current,
        totalStarsCollected: 0,
        discoveredStars: {
          'sleepy-star': 0,
          'moonbeam-star': 0,
          'golden-star': 0,
          'wish-star': 0,
        },
        completedMissionIds: [],
        unlockedRewardIds: [],
        lastSessionScore: 0,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
      return resetState;
    } catch {
      // fallback
    }
  }
  return DEFAULT_STATE;
}
