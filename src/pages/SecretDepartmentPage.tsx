import React, { useState } from 'react';
import {
  Sparkles,
  Key,
  Lock,
  ArrowRight,
  Award,
  Heart,
  CheckCircle2,
  Gift,
  RotateCcw,
  Moon,
  Star as StarIcon,
  Smile,
  Zap,
} from 'lucide-react';
import { MisuCharacter } from '../components/MisuCharacter.tsx';
import { soundManager } from '../utils/audio.ts';
import type { PageId } from '../types/index.ts';

interface SecretDepartmentPageProps {
  onNavigate: (page: PageId) => void;
  secretUnlocked: boolean;
  onUnlockSecretManually: () => void;
}

export const SecretDepartmentPage: React.FC<SecretDepartmentPageProps> = ({
  onNavigate,
  secretUnlocked,
  onUnlockSecretManually,
}) => {
  const [activeTab, setActiveTab] = useState<'hug' | 'satchel' | 'dream' | 'birth'>('hug');
  const [visitorName, setVisitorName] = useState('Dreamer');
  const [isCertified, setIsCertified] = useState(false);

  // Interactive states for each secret
  const [starHugged, setStarHugged] = useState(false);
  const [satchelOpen, setSatchelOpen] = useState(false);
  const [satchelStars, setSatchelStars] = useState([
    { id: 1, x: 25, y: 35, color: '#FFE5A3', name: 'Twinkle', scale: 1 },
    { id: 2, x: 60, y: 25, color: '#F7C8D9', name: 'Rosy', scale: 1 },
    { id: 3, x: 45, y: 65, color: '#BFD7F4', name: 'Breezy', scale: 1 },
    { id: 4, x: 75, y: 70, color: '#FFE5A3', name: 'Pip', scale: 1 },
  ]);
  const [starlightDelivered, setStarlightDelivered] = useState(false);
  const [alchemyStep, setAlchemyStep] = useState<0 | 1 | 2>(0); // 0=start, 1=star added, 2=misu born!

  // Secret 1: Hug action
  const handleHugStar = () => {
    setStarHugged(!starHugged);
    soundManager.playStarChime(starHugged ? 'common' : 'legendary');
  };

  // Secret 2: Tap star inside satchel
  const handleTapPocketStar = (id: number) => {
    soundManager.playStarChime('uncommon');
    setSatchelStars((prev) =>
      prev.map((s) => (s.id === id ? { ...s, scale: 1.4 } : s))
    );
    setTimeout(() => {
      setSatchelStars((prev) =>
        prev.map((s) => (s.id === id ? { ...s, scale: 1 } : s))
      );
    }, 400);
  };

  // Secret 3: Deliver starlight
  const handleDeliverStarlight = () => {
    setStarlightDelivered(!starlightDelivered);
    soundManager.playRewardFanfare();
  };

  // Secret 4: Alchemy recipe
  const handleAlchemyNext = () => {
    if (alchemyStep === 0) {
      setAlchemyStep(1);
      soundManager.playStarChime('rare');
    } else if (alchemyStep === 1) {
      setAlchemyStep(2);
      soundManager.playRewardFanfare();
    } else {
      setAlchemyStep(0);
      soundManager.playSceneChime();
    }
  };

  const handlePrintCertificate = () => {
    setIsCertified(true);
    soundManager.playRewardFanfare();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25234D] border border-[#FFE5A3]/50 text-xs font-semibold text-[#FFE5A3] shadow-inner">
          <Key className="w-3.5 h-3.5" />
          <span>DEPARTMENT RESTRICTED ARCHIVE #MS-008</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#FFF7ED]">
          The Secret Department 🗝️✨
        </h1>
        <p className="text-sm sm:text-base text-[#CDB7F3] max-w-xl mx-auto">
          Ever wondered how Misu really works? Step inside the secret archives to discover 4 eye-catching, interactive secrets!
        </p>
      </div>

      {secretUnlocked ? (
        /* --- UNLOCKED SECRET VAULT --- */
        <div className="relative bg-gradient-to-b from-[#261E45] via-[#352554] to-[#18132B] border-3 border-[#FFE5A3] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-500 overflow-hidden">
          {/* Ambient Starlight Halo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFE5A3]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Unlocked Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#FFE5A3]/30 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE5A3] text-[#19182F] font-heading font-bold text-xs uppercase tracking-wider shadow">
              <Sparkles className="w-4 h-4 text-[#19182F]" />
              <span>Restricted Vault Opened • Interactive Secrets Active</span>
            </div>

            <div className="inline-flex items-center gap-2 text-xs text-[#FFE5A3] bg-[#19182F]/70 px-3 py-1 rounded-full border border-[#FFE5A3]/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFE5A3]" />
              <span>Full Clearance Granted</span>
            </div>
          </div>

          {/* 4 Interactive Secret Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative z-10">
            <button
              onClick={() => {
                setActiveTab('hug');
                soundManager.playStarChime('common');
              }}
              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                activeTab === 'hug'
                  ? 'bg-[#FFE5A3] text-[#19182F] border-[#FFE5A3] font-bold shadow-lg scale-105'
                  : 'bg-[#1F1938] text-[#E9DDFB] border-[#6F61A8]/40 hover:bg-[#2A224D]'
              }`}
            >
              <span className="text-2xl">💖</span>
              <span className="text-xs font-heading">1. The Warm Hug</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('satchel');
                soundManager.playStarChime('common');
              }}
              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                activeTab === 'satchel'
                  ? 'bg-[#FFE5A3] text-[#19182F] border-[#FFE5A3] font-bold shadow-lg scale-105'
                  : 'bg-[#1F1938] text-[#E9DDFB] border-[#6F61A8]/40 hover:bg-[#2A224D]'
              }`}
            >
              <span className="text-2xl">🎒</span>
              <span className="text-xs font-heading">2. Pocket Galaxy</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('dream');
                soundManager.playStarChime('common');
              }}
              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                activeTab === 'dream'
                  ? 'bg-[#FFE5A3] text-[#19182F] border-[#FFE5A3] font-bold shadow-lg scale-105'
                  : 'bg-[#1F1938] text-[#E9DDFB] border-[#6F61A8]/40 hover:bg-[#2A224D]'
              }`}
            >
              <span className="text-2xl">🌙</span>
              <span className="text-xs font-heading">3. Bedtime Mission</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('birth');
                soundManager.playStarChime('common');
              }}
              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                activeTab === 'birth'
                  ? 'bg-[#FFE5A3] text-[#19182F] border-[#FFE5A3] font-bold shadow-lg scale-105'
                  : 'bg-[#1F1938] text-[#E9DDFB] border-[#6F61A8]/40 hover:bg-[#2A224D]'
              }`}
            >
              <span className="text-2xl">✨</span>
              <span className="text-xs font-heading">4. How Misu Was Born</span>
            </button>
          </div>

          {/* --- TAB CONTENT AREA --- */}
          <div className="relative z-10 bg-[#1C1733]/90 border-2 border-[#6F61A8]/60 rounded-3xl p-6 sm:p-8 min-h-[360px] flex flex-col justify-between shadow-inner">
            {/* SECRET 1: THE WARM HUG */}
            {activeTab === 'hug' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center space-y-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#F7C8D9]/20 text-[#F7C8D9] text-xs font-bold uppercase tracking-wider">
                    Secret Fact #1
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-[#FFE5A3]">
                    Why Do Cold Fallen Stars Glow Again?
                  </h3>
                  <p className="text-sm text-[#E9DDFB] max-w-lg mx-auto">
                    When stars fall to the ground, they lose their spark and turn cold. Only Misu’s gentle warm hug can reignite their stardust heartbeat!
                  </p>
                </div>

                {/* Interactive Hug Stage */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
                  {/* Misu */}
                  <div className="relative flex flex-col items-center">
                    <MisuCharacter
                      expression={starHugged ? 'love' : 'curious'}
                      size="md"
                      animate={starHugged}
                      interactive={false}
                    />
                    <span className="text-xs font-bold text-[#CDB7F3] mt-2">Baby Misu</span>
                  </div>

                  {/* Hug Action Button & Arrow */}
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={handleHugStar}
                      className={`px-6 py-3 rounded-full font-heading font-bold text-sm flex items-center gap-2 cursor-pointer transition-all transform hover:scale-105 shadow-xl ${
                        starHugged
                          ? 'bg-[#F7C8D9] text-[#19182F] ring-4 ring-[#F7C8D9]/50 animate-pulse'
                          : 'bg-[#FFE5A3] text-[#19182F] hover:bg-[#FFF7ED]'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${starHugged ? 'fill-[#19182F]' : ''}`} />
                      <span>{starHugged ? 'Hugging! (Star is Glowing! ❤️)' : 'Tap to Give Misu’s Warm Hug ✨'}</span>
                    </button>
                    <span className="text-[11px] text-[#CDB7F3]">Tap to test the starlight heartbeat</span>
                  </div>

                  {/* The Fallen Star (changes when hugged) */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-32 h-32 rounded-3xl flex items-center justify-center transition-all duration-700 relative ${
                        starHugged
                          ? 'bg-gradient-to-tr from-[#FFE5A3] to-[#FFF7ED] shadow-[0_0_50px_rgba(255,229,163,0.8)] scale-110'
                          : 'bg-[#2B234A] border-2 border-dashed border-[#6F61A8]/50'
                      }`}
                    >
                      {starHugged ? (
                        <>
                          <span className="text-6xl animate-bounce">⭐</span>
                          <div className="absolute -top-2 -right-2 text-xl animate-ping">✨</div>
                          <div className="absolute -bottom-2 -left-2 text-xl animate-pulse">💖</div>
                        </>
                      ) : (
                        <div className="text-center p-3 space-y-1">
                          <span className="text-4xl opacity-40">🌑</span>
                          <p className="text-[10px] text-[#CDB7F3]/70 font-semibold">Cold & Dimmed</p>
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#FFE5A3] mt-2">
                      {starHugged ? 'Reignited Celestial Star!' : 'Cold Fallen Star'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#251D42] rounded-2xl border border-[#6F61A8]/40 text-center text-xs text-[#E9DDFB]">
                  💡 <span className="font-bold text-[#FFE5A3]">Simple Secret:</span> Misu’s tummy has a tiny piece of the original Moon’s core, so anything she hugs with love instantly warms back up!
                </div>
              </div>
            )}

            {/* SECRET 2: THE SATCHEL POCKET GALAXY */}
            {activeTab === 'satchel' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center space-y-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#BFD7F4]/20 text-[#BFD7F4] text-xs font-bold uppercase tracking-wider">
                    Secret Fact #2
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-[#FFE5A3]">
                    How Can a Tiny Bag Hold Hundreds of Stars?
                  </h3>
                  <p className="text-sm text-[#E9DDFB] max-w-lg mx-auto">
                    Misu’s little satchel isn’t made of ordinary cloth. Inside is a real doorway to a zero-gravity mini galaxy!
                  </p>
                </div>

                {/* Interactive Satchel View */}
                <div className="flex flex-col items-center justify-center gap-4 py-2">
                  <button
                    onClick={() => {
                      setSatchelOpen(!satchelOpen);
                      soundManager.playStarChime(satchelOpen ? 'common' : 'rare');
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#FFE5A3] hover:bg-[#FFF7ED] text-[#19182F] font-heading font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-105"
                  >
                    <span>{satchelOpen ? 'Close Satchel Flap 🎒' : 'Unzip Misu’s Satchel 🌟'}</span>
                  </button>

                  {satchelOpen ? (
                    <div className="w-full max-w-md h-64 bg-radial from-[#3B2C6E] via-[#20183B] to-[#140F24] border-3 border-[#FFE5A3] rounded-3xl relative overflow-hidden shadow-2xl p-4 flex flex-col justify-between">
                      {/* Swirling Galaxy Background */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#CDB7F3]/20 via-[#6F61A8]/10 to-transparent animate-spin-slow pointer-events-none" />

                      <div className="relative z-10 flex items-center justify-between text-xs text-[#FFE5A3] font-bold">
                        <span>🌌 Mini-Galaxy Pouch Active</span>
                        <span className="text-[10px] text-[#CDB7F3]">Tap any star to play!</span>
                      </div>

                      {/* Interactive Floating Stars inside */}
                      <div className="relative w-full h-44">
                        {satchelStars.map((star) => (
                          <button
                            key={star.id}
                            onClick={() => handleTapPocketStar(star.id)}
                            style={{
                              position: 'absolute',
                              left: `${star.x}%`,
                              top: `${star.y}%`,
                              transform: `translate(-50%, -50%) scale(${star.scale})`,
                              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                            className="cursor-pointer group flex flex-col items-center"
                          >
                            <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,229,163,0.8)] animate-bounce">
                              ⭐
                            </span>
                            <span className="text-[10px] font-bold text-[#FFF7ED] bg-[#19182F]/80 px-2 py-0.5 rounded-full mt-1 opacity-80 group-hover:opacity-100">
                              {star.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="relative z-10 text-center text-[11px] text-[#E9DDFB]">
                        Stars inside float weightlessly like bubbles and tell bedtime stories to each other!
                      </div>
                    </div>
                  ) : (
                    /* Closed Satchel Graphic */
                    <div
                      onClick={() => {
                        setSatchelOpen(true);
                        soundManager.playStarChime('rare');
                      }}
                      className="w-56 h-48 bg-gradient-to-b from-[#8C6F4B] to-[#543F29] border-3 border-[#FFE5A3] rounded-3xl flex flex-col items-center justify-center p-4 cursor-pointer hover:scale-105 transition-transform shadow-2xl relative"
                    >
                      <div className="w-12 h-6 bg-[#D8B46C] rounded-b-xl border-2 border-[#FFE5A3] absolute top-0" />
                      <span className="text-5xl mt-4">🎒</span>
                      <span className="font-heading font-bold text-sm text-[#FFE5A3] mt-2">
                        Misu’s Little Satchel
                      </span>
                      <span className="text-[11px] text-[#E9DDFB]/80 text-center mt-1">
                        (Tap to peek inside the galaxy)
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 bg-[#251D42] rounded-2xl border border-[#6F61A8]/40 text-center text-xs text-[#E9DDFB]">
                  💡 <span className="font-bold text-[#FFE5A3]">Simple Secret:</span> Gravity is turned OFF inside the bag, so 500 stars feel lighter than a single dandelion seed.
                </div>
              </div>
            )}

            {/* SECRET 3: THE BEDTIME MISSION */}
            {activeTab === 'dream' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center space-y-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#FFE5A3]/20 text-[#FFE5A3] text-xs font-bold uppercase tracking-wider">
                    Secret Fact #3
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-[#FFE5A3]">
                    Misu’s True Secret Job: The Bedtime Guardian
                  </h3>
                  <p className="text-sm text-[#E9DDFB] max-w-lg mx-auto">
                    The office says Misu just collects stars for storage. But the real secret? She delivers nightlights to kids who are having scary dreams!
                  </p>
                </div>

                {/* Interactive Kid Bedroom Window */}
                <div className="max-w-md mx-auto bg-[#171429] border-3 border-[#6F61A8]/60 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-[#6F61A8]/40">
                    <span className="text-xs font-bold text-[#FFE5A3]">Window at 3:00 AM 🌙</span>
                    <span className="text-[11px] text-[#CDB7F3]">
                      Status: {starlightDelivered ? 'Sweet Dreams 💕' : 'Scary Nightmare 🌧️'}
                    </span>
                  </div>

                  <div className="py-6 flex flex-col items-center justify-center relative min-h-[160px]">
                    {starlightDelivered ? (
                      /* Sweet Dream State */
                      <div className="text-center space-y-2 animate-in zoom-in duration-500">
                        <div className="text-5xl animate-bounce">🌈😴🌙</div>
                        <div className="bg-[#2D2152] border border-[#FFE5A3]/50 px-4 py-2 rounded-2xl text-xs text-[#FFE5A3] font-bold">
                          “The bedroom is glowing with soft starlight. No bad dreams tonight!”
                        </div>
                        <div className="text-xs text-[#CDB7F3]">
                          Misu left a glowing star jar on the bedside table.
                        </div>
                      </div>
                    ) : (
                      /* Nightmare State */
                      <div className="text-center space-y-2 animate-in fade-in duration-300">
                        <div className="text-5xl opacity-60">🌧️😣🧸</div>
                        <div className="bg-[#211B35] border border-red-400/40 px-4 py-2 rounded-2xl text-xs text-red-200">
                          “It’s too dark in here... a bad dream is sneaking in!”
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action button */}
                  <div className="pt-2">
                    <button
                      onClick={handleDeliverStarlight}
                      className={`w-full py-3 rounded-2xl font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg ${
                        starlightDelivered
                          ? 'bg-[#6F61A8] hover:bg-[#8374C2] text-[#FFF7ED]'
                          : 'bg-[#FFE5A3] hover:bg-[#FFF7ED] text-[#19182F] hover:scale-[1.02]'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{starlightDelivered ? 'Reset Nightmare (Try Again)' : 'Sprinkle Misu’s Bedtime Starlight ✨'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-[#251D42] rounded-2xl border border-[#6F61A8]/40 text-center text-xs text-[#E9DDFB]">
                  💡 <span className="font-bold text-[#FFE5A3]">Simple Secret:</span> Whenever anyone in the world feels lonely or scared in the dark, Misu gently floats down to leave a soft glimmer of hope.
                </div>
              </div>
            )}

            {/* SECRET 4: HOW MISU WAS BORN */}
            {activeTab === 'birth' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center space-y-1">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#CDB7F3]/20 text-[#CDB7F3] text-xs font-bold uppercase tracking-wider">
                    Secret Fact #4
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-[#FFE5A3]">
                    The Secret Recipe of Baby Misu
                  </h3>
                  <p className="text-sm text-[#E9DDFB] max-w-lg mx-auto">
                    Misu wasn’t born in a hospital! She was created in the clouds. Try the celestial recipe to see how she appeared!
                  </p>
                </div>

                {/* Interactive Recipe Sandbox */}
                <div className="max-w-md mx-auto bg-[#1C1736] border-2 border-[#FFE5A3]/50 rounded-3xl p-6 text-center space-y-5">
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${
                        alchemyStep >= 1 ? 'bg-[#FFE5A3] border-[#FFE5A3]' : 'bg-[#29224A] border-[#6F61A8]/40'
                      }`}
                    >
                      ⭐
                    </div>
                    <span className="text-xl font-bold text-[#FFE5A3]">+</span>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${
                        alchemyStep >= 2 ? 'bg-[#CDB7F3] border-[#CDB7F3]' : 'bg-[#29224A] border-[#6F61A8]/40'
                      }`}
                    >
                      ☁️
                    </div>
                    <span className="text-xl font-bold text-[#FFE5A3]">=</span>
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 ${
                        alchemyStep === 2
                          ? 'bg-gradient-to-tr from-[#FFE5A3] to-[#F7C8D9] border-[#FFE5A3] animate-bounce shadow-xl'
                          : 'bg-[#20183B] border-dashed border-[#6F61A8]/40'
                      }`}
                    >
                      {alchemyStep === 2 ? '🌙👶' : '❓'}
                    </div>
                  </div>

                  <div className="min-h-[60px] flex items-center justify-center">
                    {alchemyStep === 0 && (
                      <p className="text-xs text-[#E9DDFB]">
                        Step 1: Take one sleepy wishing star from the northern sky.
                      </p>
                    )}
                    {alchemyStep === 1 && (
                      <p className="text-xs text-[#FFE5A3] font-bold">
                        Step 2: Gently wrap the star inside a fluffy lavender moon-cloud!
                      </p>
                    )}
                    {alchemyStep === 2 && (
                      <p className="text-xs text-[#F7C8D9] font-bold">
                        Poof! ✨ Baby Misu wakes up with her starry nightcap and sleepy smile!
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleAlchemyNext}
                    className="px-6 py-2.5 rounded-full bg-[#FFE5A3] hover:bg-[#FFF7ED] text-[#19182F] font-heading font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg transition-transform hover:scale-105"
                  >
                    {alchemyStep === 0 && 'Step 1: Gather Wishing Star ⭐'}
                    {alchemyStep === 1 && 'Step 2: Mix in Lavender Cloud ☁️'}
                    {alchemyStep === 2 && 'Celebrate & Reset Recipe 🔄'}
                  </button>
                </div>

                <div className="p-3.5 bg-[#251D42] rounded-2xl border border-[#6F61A8]/40 text-center text-xs text-[#E9DDFB]">
                  💡 <span className="font-bold text-[#FFE5A3]">Simple Secret:</span> That’s why Misu is always sleepy when the sun rises—she belongs entirely to the soft nighttime clouds!
                </div>
              </div>
            )}
          </div>

          {/* --- HONORARY STAMP & ID CERTIFICATE --- */}
          <div className="relative z-10 bg-[#281F47] border-2 border-[#FFE5A3]/60 rounded-3xl p-6 sm:p-8 space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5A3]/20 text-[#FFE5A3] text-xs font-bold uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Secret Keeper Recognition</span>
            </div>

            <h3 className="font-heading font-bold text-xl text-[#FFF7ED]">
              Official Midnight Secret Keeper Certificate
            </h3>

            <p className="text-xs text-[#E9DDFB] max-w-md mx-auto">
              Now that you understand Misu’s true secrets, print your official department credentials!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
              <input
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-2xl bg-[#19182F] border border-[#6F61A8] text-sm text-[#FFF7ED] focus:outline-none focus:border-[#FFE5A3] text-center"
              />
              <button
                onClick={handlePrintCertificate}
                className="w-full sm:w-auto px-5 py-2 rounded-2xl bg-[#FFE5A3] text-[#19182F] font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#FFF7ED] cursor-pointer shadow-lg transition-transform hover:scale-105 shrink-0"
              >
                Claim ID
              </button>
            </div>

            {isCertified && (
              <div className="mt-4 p-4 bg-[#19182F] border-2 border-[#FFE5A3] rounded-2xl max-w-md mx-auto text-center space-y-2 animate-in zoom-in-95 duration-300">
                <div className="text-2xl">🎖️✨</div>
                <div className="font-heading font-bold text-sm text-[#FFE5A3]">
                  CERTIFIED SECRET KEEPER: {visitorName.toUpperCase()}
                </div>
                <p className="text-[11px] text-[#CDB7F3]">
                  Authorized by Misu & The Midnight Sky Department. You are trusted with the secrets of the bottomless satchel, the starlight hugs, and the bedtime nightlights!
                </p>
                <div className="text-[10px] text-[#F7C8D9] font-bold">
                  ★ Gold Clearance Badge MS-SECRET-UNLOCKED ★
                </div>
              </div>
            )}
          </div>

          {/* Quick navigation to other pages */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 relative z-10">
            <button
              onClick={() => onNavigate('game')}
              className="px-5 py-2 rounded-full bg-[#6F61A8] hover:bg-[#8374C2] text-[#FFF7ED] font-heading font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow transition-transform hover:scale-105"
            >
              <span>Play Star Collector Game</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('dream-room')}
              className="px-5 py-2 rounded-full bg-[#FFE5A3] hover:bg-[#FFF7ED] text-[#19182F] font-heading font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow transition-transform hover:scale-105"
            >
              <span>Visit Misu’s Dream Room</span>
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* --- LOCKED STATE WITH HINTS --- */
        <div className="bg-[#211B3D] border-2 border-[#6F61A8]/50 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#19182F] border-2 border-[#FFE5A3]/40 flex items-center justify-center text-3xl shadow-inner">
            <Lock className="w-8 h-8 text-[#FFE5A3]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#FFF7ED]">
              The Secret Archive is Locked 🔒
            </h2>
            <p className="text-sm text-[#CDB7F3] leading-relaxed">
              This department holds Misu’s most private records: her infinite satchel, her bedtime nightlight deliveries, and how she was created!
            </p>
          </div>

          {/* How to unlock hints */}
          <div className="bg-[#19182F]/80 border border-[#6F61A8]/40 rounded-2xl p-5 max-w-lg mx-auto text-left space-y-3">
            <div className="font-heading font-bold text-xs text-[#FFE5A3] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>How to find the Secret Key:</span>
            </div>
            <ul className="text-xs text-[#E9DDFB] space-y-2 list-disc list-inside">
              <li>
                <span className="font-bold text-[#FFF7ED]">Clue 1:</span> Look on the{' '}
                <button
                  onClick={() => onNavigate('home')}
                  className="text-[#FFE5A3] underline hover:text-[#FFF7ED] cursor-pointer"
                >
                  Homepage
                </button>{' '}
                for Misu’s tiny golden employee badge <span className="font-mono text-[#FFE5A3]">[MS-008]</span> and tap it!
              </li>
              <li>
                <span className="font-bold text-[#FFF7ED]">Clue 2:</span> Tap the sparkling Easter Egg star floating above Misu on the home screen.
              </li>
            </ul>
          </div>

          {/* Quick unlock button for curious visitors */}
          <div className="pt-2">
            <button
              onClick={onUnlockSecretManually}
              className="px-6 py-3 rounded-full bg-[#FFE5A3] hover:bg-[#FFF7ED] text-[#19182F] font-heading font-bold text-xs uppercase tracking-wider cursor-pointer shadow-xl transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Key className="w-4 h-4" />
              <span>Enter With Guest Starlight Key ✨</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
