import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNewScore,
  registerStarCollection,
  getDiscoveredTypesCount,
  checkMissionProgress,
  getSleepinessLevel,
  STAR_DEFINITIONS,
} from './logic.ts';

test('calculateNewScore correctly adds star points', () => {
  assert.equal(calculateNewScore(0, 1), 1);
  assert.equal(calculateNewScore(10, 5), 15);
  assert.equal(calculateNewScore(5, 0), 6); // min points 1
});

test('registerStarCollection updates inventory count for star', () => {
  const initial = { 'sleepy-star': 2 };
  const updated = registerStarCollection(initial, 'sleepy-star');
  assert.equal(updated['sleepy-star'], 3);

  const newType = registerStarCollection(updated, 'wish-star');
  assert.equal(newType['wish-star'], 1);
  assert.equal(newType['sleepy-star'], 3);
});

test('getDiscoveredTypesCount returns number of unlocked star varieties', () => {
  const inventory = {
    'sleepy-star': 4,
    'moonbeam-star': 0,
    'golden-star': 1,
  };
  assert.equal(getDiscoveredTypesCount(inventory), 2);
});

test('checkMissionProgress evaluates completion based on total stars', () => {
  const mockMissions = [
    {
      id: 'm1',
      title: 'First Rescue',
      description: 'Find 1 star',
      detailedStory: '...',
      badgeName: 'First Rescue',
      badgeIcon: 'Star',
      badgeColor: '#FFE5A3',
      rewardText: 'A tiny golden star',
      requiredStars: 1,
      completed: false,
    },
    {
      id: 'm2',
      title: 'Jar of Forgotten Sparkles',
      description: 'Collect 10 stars',
      detailedStory: '...',
      badgeName: 'Careful Keeper',
      badgeIcon: 'Sparkles',
      badgeColor: '#BFD7F4',
      rewardText: 'Glowing Jar',
      requiredStars: 10,
      completed: false,
    },
  ];

  const progressAt5 = checkMissionProgress(5, mockMissions);
  assert.equal(progressAt5[0].completed, true);
  assert.equal(progressAt5[1].completed, false);

  const progressAt12 = checkMissionProgress(12, mockMissions);
  assert.equal(progressAt12[0].completed, true);
  assert.equal(progressAt12[1].completed, true);
});

test('getSleepinessLevel stays within cute range', () => {
  const level0 = getSleepinessLevel(0);
  const level5 = getSleepinessLevel(5);
  assert.ok(level0 >= 85 && level0 <= 99);
  assert.ok(level5 >= 85 && level5 <= 99);
});

test('STAR_DEFINITIONS has valid catalog', () => {
  assert.ok(STAR_DEFINITIONS.length >= 4);
  assert.equal(STAR_DEFINITIONS[0].id, 'sleepy-star');
});
