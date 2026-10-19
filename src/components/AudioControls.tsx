import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControlsProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  className?: string;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  soundEnabled,
  onToggleSound,
  className = '',
}) => {
  return (
    <button
      onClick={onToggleSound}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        soundEnabled
          ? 'bg-[#CDB7F3]/25 text-[#FFE5A3] border border-[#CDB7F3]/60 hover:bg-[#CDB7F3]/35'
          : 'bg-[#292552]/80 text-[#CDB7F3]/70 border border-[#6F61A8]/40 hover:text-[#FFF7ED] hover:bg-[#292552]'
      } ${className}`}
      aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
      title={soundEnabled ? 'Sound is on (Click to mute)' : 'Sound is muted (Click to enable)'}
    >
      {soundEnabled ? (
        <>
          <Volume2 className="w-4 h-4 text-[#FFE5A3]" />
          <span>Sound ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-[#CDB7F3]/70" />
          <span>Sound Muted</span>
        </>
      )}
    </button>
  );
};
