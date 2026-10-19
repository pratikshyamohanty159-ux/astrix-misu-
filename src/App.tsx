/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation.tsx';
import { Footer } from './components/Footer.tsx';
import { FallingStars } from './components/FallingStars.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { OriginStoryPage } from './pages/OriginStoryPage.tsx';
import { StarlightCollectorPage } from './pages/StarlightCollectorPage.tsx';
import { CollectStarsPage } from './pages/CollectStarsPage.tsx';
import { AdventureMissionsPage } from './pages/AdventureMissionsPage.tsx';
import { SecretDepartmentPage } from './pages/SecretDepartmentPage.tsx';
import { DreamRoomPage } from './pages/DreamRoomPage.tsx';

import { loadGameState, saveGameState, clearGameCollection } from './utils/storage.ts';
import { soundManager } from './utils/audio.ts';
import { registerStarCollection, STAR_DEFINITIONS } from './utils/logic.ts';
import type { PageId, StarRarity } from './types/index.ts';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [totalStars, setTotalStars] = useState<number>(0);
  const [inventory, setInventory] = useState<Record<string, number>>({
    'sleepy-star': 0,
    'moonbeam-star': 0,
    'golden-star': 0,
    'wish-star': 0,
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [nightlightOn, setNightlightOn] = useState<boolean>(true);
  const [secretUnlocked, setSecretUnlocked] = useState<boolean>(false);
  const [unlockedRewards, setUnlockedRewards] = useState<string[]>([]);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  // Load persistent user state on mount
  useEffect(() => {
    const saved = loadGameState();
    setTotalStars(saved.totalStarsCollected);
    setInventory(saved.discoveredStars);
    setSoundEnabled(saved.soundEnabled);
    setNightlightOn(saved.nightlightOn);
    setSecretUnlocked(saved.secretUnlocked);
    setUnlockedRewards(saved.unlockedRewardIds || []);
    setHasLoadedStorage(true);
  }, []);

  // Save changes to localStorage when state updates
  useEffect(() => {
    if (!hasLoadedStorage) return;
    saveGameState({
      totalStarsCollected: totalStars,
      discoveredStars: inventory,
      soundEnabled,
      nightlightOn,
      secretUnlocked,
      unlockedRewardIds: unlockedRewards,
    });
  }, [totalStars, inventory, soundEnabled, nightlightOn, secretUnlocked, unlockedRewards, hasLoadedStorage]);

  // Audio sound toggle
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (!next) {
      soundManager.stopLullaby();
    } else {
      soundManager.playStarChime('common');
    }
  };

  // Star collection handler
  const handleStarCaught = (rarity: StarRarity, points: number = 1) => {
    const starDef =
      STAR_DEFINITIONS.find((s) => s.rarity === rarity) || STAR_DEFINITIONS[0];

    setTotalStars((prev) => prev + points);
    setInventory((prev) => registerStarCollection(prev, starDef.id));

    if (soundEnabled) {
      soundManager.playStarChime(rarity);
    }
  };

  // Reset entire collection
  const handleResetCollection = () => {
    const resetState = clearGameCollection();
    setTotalStars(resetState.totalStarsCollected);
    setInventory(resetState.discoveredStars);
  };

  // Secret room unlock trigger
  const handleUnlockSecret = () => {
    setSecretUnlocked(true);
    if (soundEnabled) {
      soundManager.playSecretUnlock();
    }
    setCurrentPage('secret');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Story scene change chime
  const handleSceneChange = () => {
    if (soundEnabled) {
      soundManager.playSceneChime();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#19182F] text-[#FFF7ED] relative selection:bg-[#CDB7F3]/30">
      {/* Global Interactive Falling Stars (Gentle Background Ambiance) */}
      <FallingStars onCollect={(rarity) => handleStarCaught(rarity, rarity === 'rare' ? 3 : 1)} />

      {/* Top Header Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        totalStars={totalStars}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        secretUnlocked={secretUnlocked}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full" id="main-content">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={(page) => setCurrentPage(page)}
            totalStars={totalStars}
            onSecretClueClick={handleUnlockSecret}
            onEasterEggStarFound={handleUnlockSecret}
            secretUnlocked={secretUnlocked}
          />
        )}

        {currentPage === 'story' && (
          <OriginStoryPage
            onNavigate={(page) => setCurrentPage(page)}
            onSceneChange={handleSceneChange}
          />
        )}

        {currentPage === 'collector' && (
          <StarlightCollectorPage
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {currentPage === 'game' && (
          <CollectStarsPage
            onNavigate={(page) => setCurrentPage(page)}
            inventory={inventory}
            totalStars={totalStars}
            onStarCaught={handleStarCaught}
            onResetCollection={handleResetCollection}
            unlockedRewards={unlockedRewards}
            onUnlockReward={(rewardId) => {
              if (!unlockedRewards.includes(rewardId)) {
                setUnlockedRewards((prev) => [...prev, rewardId]);
              }
            }}
          />
        )}

        {currentPage === 'adventures' && (
          <AdventureMissionsPage
            onNavigate={(page) => setCurrentPage(page)}
            totalStars={totalStars}
            inventory={inventory}
            secretUnlocked={secretUnlocked}
          />
        )}

        {currentPage === 'secret' && (
          <SecretDepartmentPage
            onNavigate={(page) => setCurrentPage(page)}
            secretUnlocked={secretUnlocked}
            onUnlockSecretManually={handleUnlockSecret}
          />
        )}

        {currentPage === 'dream-room' && (
          <DreamRoomPage
            onNavigate={(page) => setCurrentPage(page)}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            nightlightOn={nightlightOn}
            onToggleNightlight={(newState) => setNightlightOn(newState)}
            totalStars={totalStars}
          />
        )}
      </main>

      {/* Shared Footer */}
      <Footer
        onNavigate={(page) => setCurrentPage(page)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />
    </div>
  );
}
