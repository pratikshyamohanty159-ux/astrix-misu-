/**
 * Types for Misu's Little Star Office
 */

export type PageId =
  | 'home'
  | 'story'
  | 'collector'
  | 'game'
  | 'adventures'
  | 'secret'
  | 'dream-room';

export type MisuExpression =
  | 'default'
  | 'happy'
  | 'curious'
  | 'excited'
  | 'sleepy'
  | 'surprised'
  | 'sad'
  | 'silly'
  | 'blushing'
  | 'angry'
  | 'scared'
  | 'thinking'
  | 'love';

export type StarRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface StarBookEntry {
  id: string;
  name: string;
  rarity: StarRarity;
  points: number;
  description: string;
  color: string;
  count: number;
  unlockedAt?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  detailedStory: string;
  badgeName: string;
  badgeIcon: string;
  badgeColor: string;
  rewardText: string;
  requiredStars: number;
  completed: boolean;
}

export interface GameReward {
  id: string;
  title: string;
  tier: string;
  description: string;
  icon: string;
  requiredScore: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserGameState {
  totalStarsCollected: number;
  soundEnabled: boolean;
  nightlightOn: boolean;
  secretUnlocked: boolean;
  easterEggBadgeEarned: boolean;
  discoveredStars: Record<string, number>;
  completedMissionIds: string[];
  unlockedRewardIds: string[];
  lastSessionScore: number;
}
