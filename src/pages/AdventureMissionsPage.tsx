import React, { useState } from 'react';
import { Sparkles, Trophy, Star, Moon, Package, Sunrise, ShieldCheck, ArrowRight, X, Heart, CheckCircle2 } from 'lucide-react';
import { MisuCharacter } from '../components/MisuCharacter.tsx';
import { STAR_DEFINITIONS, getDiscoveredTypesCount } from '../utils/logic.ts';
import type { PageId, Mission } from '../types/index.ts';

interface AdventureMissionsPageProps {
  onNavigate: (page: PageId) => void;
  totalStars: number;
  inventory: Record<string, number>;
  secretUnlocked: boolean;
}

const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'The Lost Little Star',
    description: 'A tiny star fell behind a sleepy cloud and could not find its way home. Misu followed its fading glow and gently guided it back to its constellation.',
    detailedStory: 'The night was quiet and foggy. While checking Sector 4 near the moon ridge, Misu heard a soft tinkling whimper. Behind a thick lavender fog cloud sat a newborn star that had lost its orbit. With her lantern in hand, Misu held its warm point and sang a quiet lullaby until they reached the Little Dipper.',
    badgeName: 'First Rescue',
    badgeIcon: 'Star',
    badgeColor: '#FFE5A3',
    rewardText: 'A tiny golden star',
    requiredStars: 1,
    completed: false,
  },
  {
    id: 'm2',
    title: 'The Jar of Forgotten Sparkles',
    description: 'A collection jar became cloudy, and its stars started losing their glow. Misu carefully cleaned the jar, sorted every sparkle, and helped the stars shine again.',
    detailedStory: 'In the deep shelves of the Midnight Sky Department archive, an old jar of starlight had been untouched for months. Misu wiped each starlight grain with cloud cotton, gave them fresh moonlight nectar, and watched them sparkle brighter than ever.',
    badgeName: 'Careful Keeper',
    badgeIcon: 'Package',
    badgeColor: '#BFD7F4',
    rewardText: 'A glowing jar badge',
    requiredStars: 5,
    completed: false,
  },
  {
    id: 'm3',
    title: 'The Longest Night',
    description: 'One night, the clouds were unusually dark, and Misu felt a little frightened. She took a deep breath, followed her lantern, and carried a comforting light to a lonely corner of the sky.',
    detailedStory: 'Even celestial collectors get scared in the pitch dark! But Misu remembered that somewhere down below, a child was having a scary dream. She held her star satchel tightly, put on her brave face, and delivered warmth to the darkest horizon.',
    badgeName: 'Little Light of Courage',
    badgeIcon: 'Moon',
    badgeColor: '#CDB7F3',
    rewardText: 'A lavender moon badge',
    requiredStars: 12,
    completed: false,
  },
  {
    id: 'm4',
    title: 'The Sunrise Delivery',
    description: 'Just before sunrise, Misu discovered one last star that had not made it home. Even though she was very sleepy, she completed her final delivery and watched the sky brighten.',
    detailedStory: 'The dawn was already painting the sky in pastel orange and peach. Her nightcap was slipping over her eyes and she yawned three times, but Misu made sure the last wandering star was safely tucked into the morning glow before taking her daytime nap.',
    badgeName: 'Sunrise Hero',
    badgeIcon: 'Sunrise',
    badgeColor: '#F7C8D9',
    rewardText: 'A sunrise-star badge',
    requiredStars: 20,
    completed: false,
  },
];

export const AdventureMissionsPage: React.FC<AdventureMissionsPageProps> = ({
  onNavigate,
  totalStars,
  inventory,
  secretUnlocked,
}) => {
  const [activeModalMission, setActiveModalMission] = useState<Mission | null>(null);

  const missionsWithStatus = MISSIONS.map((m) => ({
    ...m,
    completed: totalStars >= m.requiredStars,
  }));

  const completedCount = missionsWithStatus.filter((m) => m.completed).length;
  const discoveredTypes = getDiscoveredTypesCount(inventory);
  const rareStarsFound = (inventory['golden-star'] || 0) + (inventory['wish-star'] || 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25234D] border border-[#CDB7F3]/40 text-xs font-semibold text-[#FFE5A3]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>HEROIC CHRONICLES</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#FFF7ED]">
          Misu’s Midnight Adventures 🌙
        </h1>
        <p className="text-sm sm:text-base text-[#CDB7F3] max-w-xl mx-auto">
          Every night brings a new little challenge. Here are the missions Misu is proud of.
        </p>
      </div>

      {/* 4 Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missionsWithStatus.map((mission, idx) => (
          <div
            key={mission.id}
            className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              mission.completed
                ? 'bg-[#241F48] border-[#FFE5A3]/50 shadow-xl'
                : 'bg-[#1E1B38]/70 border-[#6F61A8]/30 opacity-85'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                    mission.completed
                      ? 'bg-[#FFE5A3] text-[#19182F]'
                      : 'bg-[#19182F] text-[#A795DC] border border-[#6F61A8]/30'
                  }`}
                >
                  {mission.completed ? (
                    <>
                      <span>Mission Completed</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    </>
                  ) : (
                    `Needs ${mission.requiredStars} Stars`
                  )}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#FFE5A3]">
                  {mission.completed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  <span className="font-heading font-semibold">Badge: {mission.badgeName}</span>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-[#FFF7ED]">
                  {mission.title}
                </h3>
                <p className="text-sm text-[#E9DDFB] mt-2 leading-relaxed">
                  {mission.description}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#6F61A8]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow"
                  style={{ backgroundColor: `${mission.badgeColor}25`, border: `1px solid ${mission.badgeColor}` }}
                >
                  {mission.id === 'm1' && '⭐'}
                  {mission.id === 'm2' && '🏺'}
                  {mission.id === 'm3' && '🌙'}
                  {mission.id === 'm4' && '🌅'}
                </div>
                <span className="text-xs text-[#CDB7F3]">Reward: {mission.rewardText}</span>
              </div>

              <button
                onClick={() => setActiveModalMission(mission)}
                className="px-3.5 py-1.5 rounded-xl bg-[#2D2A54] hover:bg-[#3D3870] text-xs font-semibold text-[#FFE5A3] border border-[#FFE5A3]/30 transition-all hover:scale-105"
              >
                View Mission
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Official Star Inventory Section */}
      <div className="bg-[#211E3E] border-2 border-[#6F61A8]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#6F61A8]/40">
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-[#FFF7ED] flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#FFE5A3]" />
              <span>Official Star Inventory</span>
            </h2>
            <p className="text-xs text-[#CDB7F3]">
              Department-verified audit of collected celestial assets
            </p>
          </div>

          <div className="bg-[#19182F] px-4 py-2 rounded-2xl border border-[#FFE5A3]/30 text-right">
            <span className="text-[10px] text-[#CDB7F3] uppercase tracking-wider block">Collection Status</span>
            <span className="font-heading font-bold text-sm text-[#FFE5A3]">
              {totalStars >= 20 ? 'Senior Apprentice ⭐⭐⭐' : totalStars >= 5 ? 'Active Collector ⭐' : 'Junior Recruit'}
            </span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#19182F]/70 border border-[#6F61A8]/40 rounded-2xl p-4 text-center">
            <span className="text-xs text-[#CDB7F3] block">Total Collected</span>
            <span className="font-heading text-2xl font-bold text-[#FFE5A3] mt-1 block tabular-nums">
              {totalStars}
            </span>
          </div>

          <div className="bg-[#19182F]/70 border border-[#6F61A8]/40 rounded-2xl p-4 text-center">
            <span className="text-xs text-[#CDB7F3] block">Star Varieties</span>
            <span className="font-heading text-2xl font-bold text-[#BFD7F4] mt-1 block tabular-nums">
              {discoveredTypes} / 4
            </span>
          </div>

          <div className="bg-[#19182F]/70 border border-[#6F61A8]/40 rounded-2xl p-4 text-center">
            <span className="text-xs text-[#CDB7F3] block">Mission Badges</span>
            <span className="font-heading text-2xl font-bold text-[#F7C8D9] mt-1 block tabular-nums">
              {completedCount} / 4
            </span>
          </div>

          <div className="bg-[#19182F]/70 border border-[#6F61A8]/40 rounded-2xl p-4 text-center">
            <span className="text-xs text-[#CDB7F3] block">Rare Stars Found</span>
            <span className="font-heading text-2xl font-bold text-[#FCD34D] mt-1 block tabular-nums">
              {rareStarsFound}
            </span>
          </div>
        </div>

        {/* Official Night Shift Employee Report */}
        <div className="bg-[#19182F]/80 border border-[#6F61A8]/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="text-2xl mt-0.5">📜</div>
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-sm text-[#FFE5A3]">
              Department Log · Supervisor Notes
            </h4>
            <p className="font-handwriting text-xl text-[#FFF7ED] leading-snug">
              “Night-shift report: Misu did her best, helped a few stars, and only fell asleep once. Probably.”
            </p>
            <p className="text-[10px] text-[#A795DC]">
              Signed: Celestial Constellation Inspector #01
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action to Secret Department */}
      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('secret')}
          className="px-8 py-3.5 rounded-2xl bg-[#6F61A8] hover:bg-[#8374C2] text-white font-heading font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Visit the Secret Department</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Detailed Mission Modal */}
      {activeModalMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#241F48] border-2 border-[#FFE5A3] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setActiveModalMission(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#19182F] text-[#CDB7F3] hover:text-white"
              aria-label="Close mission modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow"
                  style={{ backgroundColor: `${activeModalMission.badgeColor}30`, border: `1.5px solid ${activeModalMission.badgeColor}` }}
                >
                  {activeModalMission.id === 'm1' && '⭐'}
                  {activeModalMission.id === 'm2' && '🏺'}
                  {activeModalMission.id === 'm3' && '🌙'}
                  {activeModalMission.id === 'm4' && '🌅'}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFE5A3]">
                    Archived Sky Mission
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#FFF7ED]">
                    {activeModalMission.title}
                  </h3>
                </div>
              </div>

              <div className="bg-[#19182F] p-4 rounded-2xl border border-[#6F61A8]/40">
                <p className="text-sm sm:text-base text-[#E9DDFB] leading-relaxed">
                  {activeModalMission.detailedStory}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#CDB7F3]">
                <span>Badge Reward: <strong className="text-[#FFE5A3]">{activeModalMission.badgeName}</strong></span>
                <span className={activeModalMission.completed ? 'text-emerald-400 font-bold' : 'text-amber-400 font-medium'}>
                  {activeModalMission.completed ? 'Unlocked ✓' : `Collect ${activeModalMission.requiredStars} stars to earn`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
