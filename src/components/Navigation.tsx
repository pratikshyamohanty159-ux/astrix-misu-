import React, { useState } from 'react';
import { Menu, X, Sparkles, Star as StarIcon, Heart } from 'lucide-react';
import { AudioControls } from './AudioControls.tsx';
import type { PageId } from '../types/index.ts';

interface NavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  totalStars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  secretUnlocked: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  totalStars,
  soundEnabled,
  onToggleSound,
  secretUnlocked,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon?: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Her Story' },
    { id: 'collector', label: 'Her Job' },
    { id: 'game', label: 'Collect Stars', badge: 'Play' },
    { id: 'adventures', label: 'Adventures' },
    {
      id: 'secret',
      label: 'Secret',
      badge: secretUnlocked ? 'Unlocked!' : 'Hidden',
    },
    { id: 'dream-room', label: 'Dream Room', icon: '🌙' },
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#19182F]/85 border-b border-[#6F61A8]/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group transition-transform hover:scale-105"
          aria-label="Return to Homepage"
        >
          {/* Mini Misu Avatar Icon */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CDB7F3] to-[#6F61A8] p-0.5 shadow-md flex items-center justify-center overflow-hidden border border-[#FFE5A3]/50">
            <span className="text-xl select-none" role="img" aria-label="Misu Moon">
              🌙
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-semibold text-base sm:text-lg text-[#FFF7ED] group-hover:text-[#FFE5A3] transition-colors">
                Misu’s Little Star Office
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FFE5A3] animate-pulse" />
            </div>
            <p className="text-[10px] sm:text-xs text-[#CDB7F3] font-medium tracking-wide">
              Midnight Sky Department · MS-008
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                type="button"
                className={`relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-[#19182F] bg-[#FFE5A3] shadow-md shadow-[#FFE5A3]/20 font-bold'
                    : 'text-[#E9DDFB] hover:text-[#FFF7ED] hover:bg-[#CDB7F3]/15'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-extrabold ${
                      item.id === 'secret' && secretUnlocked
                        ? 'bg-[#F472B6] text-white'
                        : isActive
                        ? 'bg-[#6F61A8] text-[#FFE5A3]'
                        : 'bg-[#6F61A8]/50 text-[#CDB7F3]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right HUD: Star Counter + Sound Toggle + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star Counter */}
          <button
            onClick={() => handleNavClick('game')}
            className="flex items-center gap-1.5 bg-[#292552] border border-[#FFE5A3]/40 px-3 py-1 rounded-full text-xs font-bold text-[#FFE5A3] shadow-sm hover:border-[#FFE5A3] hover:scale-105 transition-all group"
            title="Total stars collected. Click to play or view Star Book!"
            aria-label={`${totalStars} stars collected. Go to Star Collection`}
          >
            <StarIcon className="w-4 h-4 fill-[#FFE5A3] text-[#FFE5A3] group-hover:rotate-12 transition-transform" />
            <span className="tabular-nums font-heading text-sm">{totalStars}</span>
            <span className="hidden sm:inline text-[10px] text-[#CDB7F3] font-normal">collected</span>
          </button>

          {/* Sound Toggle */}
          <div className="hidden sm:block">
            <AudioControls soundEnabled={soundEnabled} onToggleSound={onToggleSound} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#292552] border border-[#6F61A8]/50 text-[#CDB7F3] hover:text-[#FFF7ED]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1E1C38] border-b border-[#6F61A8]/40 px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#6F61A8]/30">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#FFE5A3] text-[#19182F] font-bold shadow-md'
                      : 'bg-[#292552]/80 text-[#E9DDFB] hover:bg-[#CDB7F3]/20 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-[#6F61A8] text-white' : 'bg-[#6F61A8]/40 text-[#CDB7F3]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Sound Control & Status */}
          <div className="flex items-center justify-between pt-1">
            <AudioControls soundEnabled={soundEnabled} onToggleSound={onToggleSound} />
            <span className="text-[11px] text-[#CDB7F3] flex items-center gap-1">
              Sleepy but working <Heart className="w-3 h-3 text-[#F7C8D9] fill-[#F7C8D9]" />
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
