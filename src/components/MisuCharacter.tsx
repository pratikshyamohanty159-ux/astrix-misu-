import React, { useState } from 'react';
import type { MisuExpression } from '../types/index.ts';

interface MisuCharacterProps {
  expression?: MisuExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  holdingItem?: 'star' | 'jar' | 'notebook' | 'none';
  showCloud?: boolean;
  badge?: boolean;
  use3DRender?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

export const MisuCharacter: React.FC<MisuCharacterProps> = ({
  expression = 'default',
  size = 'lg',
  className = '',
  animate = true,
  holdingItem = 'star',
  showCloud = true,
  badge = false,
  use3DRender = false,
  onClick,
  interactive = false,
}) => {
  const [internalExp, setInternalExp] = useState<MisuExpression | null>(null);
  const activeExp = internalExp || expression;

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-44 h-44',
    lg: 'w-72 h-72 sm:w-80 sm:h-80',
    xl: 'w-80 h-80 sm:w-96 sm:h-96',
  };

  const handlePointerDown = () => {
    if (interactive) {
      const allExpressions: MisuExpression[] = [
        'happy',
        'curious',
        'excited',
        'sleepy',
        'surprised',
        'sad',
        'silly',
        'blushing',
        'thinking',
        'love',
      ];
      const next = allExpressions[Math.floor(Math.random() * allExpressions.length)];
      setInternalExp(next);
      setTimeout(() => setInternalExp(null), 1800);
    }
    if (onClick) onClick();
  };

  // If use3DRender is requested and expression is default/holding star, we can show the gorgeous 3D render with glowing effects!
  if (use3DRender && (activeExp === 'default' || activeExp === 'happy')) {
    return (
      <div
        onClick={handlePointerDown}
        className={`relative inline-flex items-center justify-center select-none ${
          sizeClasses[size]
        } ${className} ${animate ? 'animate-gentle-float' : ''} ${
          interactive ? 'cursor-pointer hover:scale-105 transition-transform' : ''
        }`}
        role={interactive ? 'button' : 'img'}
        aria-label="Misu 3D Plush Starlight Collector"
        tabIndex={interactive ? 0 : undefined}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Ambient Golden Glow behind 3D Misu */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-t from-[#FFE5A3]/30 via-[#CDB7F3]/25 to-transparent blur-2xl pointer-events-none" />

          {/* 3D Plush Image with Rounded Organic Celestial Mask */}
          <img
            src="/misu_3d_hero.jpg"
            alt="Misu - 3D Junior Starlight Collector"
            className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(255,229,163,0.35)] relative z-10"
            onError={(e) => {
              // Fallback to SVG if image not loaded
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Subtle Starlight Sparkles */}
          <div className="absolute -top-2 -right-2 text-xl animate-bounce z-20">⭐</div>
          <div className="absolute bottom-8 left-4 text-sm animate-pulse z-20">✨</div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handlePointerDown}
      className={`relative inline-flex items-center justify-center select-none ${
        sizeClasses[size]
      } ${className} ${animate ? 'animate-gentle-float' : ''} ${
        interactive ? 'cursor-pointer hover:scale-105 transition-transform' : ''
      }`}
      role={interactive ? 'button' : 'img'}
      aria-label={`Misu, the Junior Starlight Collector looking ${activeExp}`}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          handlePointerDown();
        }
      }}
    >
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* Fluffy Lavender & White Body Gradient (3D Plush Fur Feel) */}
          <linearGradient id="plushBodyGrad" x1="160" y1="90" x2="160" y2="275" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#F5EEFD" />
            <stop offset="70%" stopColor="#DDD0F7" />
            <stop offset="100%" stopColor="#C4B0ED" />
          </linearGradient>

          {/* Sherpa Fleece Brim Gradient */}
          <linearGradient id="sherpaFleeceGrad" x1="100" y1="100" x2="230" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="50%" stopColor="#F8F2EB" />
            <stop offset="100%" stopColor="#EADBCC" />
          </linearGradient>

          {/* Navy Velvet Nightcap Gradient */}
          <linearGradient id="velvetCapGrad" x1="150" y1="15" x2="260" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3F397B" />
            <stop offset="50%" stopColor="#282358" />
            <stop offset="100%" stopColor="#1C1840" />
          </linearGradient>

          {/* 3D Star Glow */}
          <filter id="starGlow3D" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Cloud base gradient */}
          <linearGradient id="plushCloudGrad" x1="160" y1="250" x2="160" y2="310" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F4EDFD" />
            <stop offset="100%" stopColor="#D9CBF7" />
          </linearGradient>
        </defs>

        {/* --- FLOATING 3D PLUSH CLOUD BASE --- */}
        {showCloud && (
          <g className="transition-opacity duration-300">
            <ellipse cx="160" cy="295" rx="90" ry="14" fill="#131225" opacity="0.4" filter="blur(7px)" />
            <path
              d="M75 282 C60 282 46 268 50 252 C54 238 72 234 88 238 C96 220 122 210 144 218 C158 208 182 206 198 218 C215 210 238 218 244 236 C256 234 270 242 270 258 C270 272 254 282 238 282 Z"
              fill="url(#plushCloudGrad)"
            />
            {/* Golden Star Sparkles on Cloud */}
            <circle cx="70" cy="260" r="2.5" fill="#FFE5A3" />
            <circle cx="250" cy="250" r="3" fill="#FFE5A3" />
            <path d="M110 268 L112 263 L114 268 L119 270 L114 272 L112 277 L110 272 L105 270 Z" fill="#FFE5A3" />
          </g>
        )}

        {/* --- MISU FLUFFY BODY --- */}
        <g id="misu-character">
          {/* Feet */}
          <ellipse cx="134" cy="268" rx="15" ry="11" fill="#C4B0ED" />
          <ellipse cx="186" cy="268" rx="15" ry="11" fill="#C4B0ED" />

          {/* Plush Chubby Body */}
          <ellipse cx="160" cy="222" rx="58" ry="46" fill="url(#plushBodyGrad)" />

          {/* Round Fluffy Head */}
          <circle cx="160" cy="148" r="56" fill="url(#plushBodyGrad)" />

          {/* Soft Plush Cheeks (Warm Coral/Pink Blush) */}
          <ellipse
            cx="118"
            cy="166"
            rx={activeExp === 'blushing' ? '15' : '12'}
            ry={activeExp === 'blushing' ? '11' : '8'}
            fill="#F7C8D9"
            opacity={activeExp === 'blushing' ? '0.98' : '0.85'}
          />
          <ellipse
            cx="202"
            cy="166"
            rx={activeExp === 'blushing' ? '15' : '12'}
            ry={activeExp === 'blushing' ? '11' : '8'}
            fill="#F7C8D9"
            opacity={activeExp === 'blushing' ? '0.98' : '0.85'}
          />

          {/* --- 12 DETAILED EXPRESSIONS (ACCURATE TO 3D CONCEPT SHEET) --- */}

          {/* 1. DEFAULT / CURIOUS GLOW */}
          {activeExp === 'default' && (
            <g id="exp-default">
              <ellipse cx="134" cy="146" rx="9" ry="12" fill="#1C1838" />
              <circle cx="131" cy="141" r="4.2" fill="#FFFFFF" />
              <circle cx="137" cy="151" r="2.2" fill="#FFFFFF" />

              <ellipse cx="186" cy="146" rx="9" ry="12" fill="#1C1838" />
              <circle cx="183" cy="141" r="4.2" fill="#FFFFFF" />
              <circle cx="189" cy="151" r="2.2" fill="#FFFFFF" />

              {/* Tiny sweet ω mouth */}
              <path
                d="M152 161 C154 164 158 164 160 161 C162 164 166 164 168 161"
                stroke="#4C3D6E"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* 2. HAPPY */}
          {activeExp === 'happy' && (
            <g id="exp-happy">
              <path d="M124 148 Q134 135 144 148" stroke="#1C1838" strokeWidth="3.8" strokeLinecap="round" fill="none" />
              <path d="M176 148 Q186 135 196 148" stroke="#1C1838" strokeWidth="3.8" strokeLinecap="round" fill="none" />
              <path d="M152 159 Q160 171 168 159 Z" fill="#F7C8D9" stroke="#4C3D6E" strokeWidth="2" />
            </g>
          )}

          {/* 3. CURIOUS */}
          {activeExp === 'curious' && (
            <g id="exp-curious">
              <ellipse cx="133" cy="145" rx="9.5" ry="12.5" fill="#1C1838" />
              <circle cx="130" cy="140" r="4.5" fill="#FFFFFF" />
              <ellipse cx="187" cy="145" rx="9.5" ry="12.5" fill="#1C1838" />
              <circle cx="184" cy="140" r="4.5" fill="#FFFFFF" />
              <ellipse cx="160" cy="162" rx="4" ry="5.5" fill="#F7C8D9" stroke="#4C3D6E" strokeWidth="2" />
              <text x="210" y="122" fill="#FFE5A3" fontSize="24" fontWeight="bold" fontFamily="Fredoka">?</text>
            </g>
          )}

          {/* 4. EXCITED */}
          {activeExp === 'excited' && (
            <g id="exp-excited">
              <path d="M122 147 Q134 132 146 147" stroke="#1C1838" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M174 147 Q186 132 198 147" stroke="#1C1838" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M150 157 Q160 174 170 157 Z" fill="#F472B6" stroke="#4C3D6E" strokeWidth="2.2" />
              <text x="212" y="125" fill="#FFE5A3" fontSize="20" fontWeight="bold">✨</text>
            </g>
          )}

          {/* 5. SLEEPY */}
          {activeExp === 'sleepy' && (
            <g id="exp-sleepy">
              <path d="M125 148 Q134 156 143 148" stroke="#1C1838" strokeWidth="3.6" strokeLinecap="round" fill="none" />
              <path d="M177 148 Q186 156 195 148" stroke="#1C1838" strokeWidth="3.6" strokeLinecap="round" fill="none" />
              <path d="M155 161 Q160 164 165 161" stroke="#4C3D6E" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <text x="212" y="120" fill="#CDB7F3" fontSize="16" fontWeight="bold">z</text>
              <text x="226" y="104" fill="#FFE5A3" fontSize="22" fontWeight="bold">Z</text>
            </g>
          )}

          {/* 6. SURPRISED */}
          {activeExp === 'surprised' && (
            <g id="exp-surprised">
              <ellipse cx="134" cy="145" rx="10" ry="13" fill="#1C1838" />
              <circle cx="131" cy="140" r="5" fill="#FFFFFF" />
              <ellipse cx="186" cy="145" rx="10" ry="13" fill="#1C1838" />
              <circle cx="183" cy="140" r="5" fill="#FFFFFF" />
              <circle cx="160" cy="164" r="5.5" fill="#4C3D6E" />
              <text x="208" y="122" fill="#FFE5A3" fontSize="22" fontWeight="bold">!</text>
            </g>
          )}

          {/* 7. SAD */}
          {activeExp === 'sad' && (
            <g id="exp-sad">
              <ellipse cx="134" cy="147" rx="8.5" ry="11" fill="#1C1838" />
              <circle cx="132" cy="143" r="3.5" fill="#FFFFFF" />
              <ellipse cx="186" cy="147" rx="8.5" ry="11" fill="#1C1838" />
              <circle cx="184" cy="143" r="3.5" fill="#FFFFFF" />
              {/* Drooping mouth */}
              <path d="M154 165 Q160 160 166 165" stroke="#4C3D6E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Little teardrops */}
              <path d="M125 158 C123 162 127 166 129 162 C129 160 126 156 125 158 Z" fill="#BFD7F4" />
              <path d="M195 158 C193 162 197 166 199 162 C199 160 196 156 195 158 Z" fill="#BFD7F4" />
            </g>
          )}

          {/* 8. SILLY */}
          {activeExp === 'silly' && (
            <g id="exp-silly">
              <path d="M124 148 Q134 136 144 148" stroke="#1C1838" strokeWidth="3.6" strokeLinecap="round" fill="none" />
              <ellipse cx="185" cy="146" rx="8.5" ry="11" fill="#1C1838" />
              <circle cx="182" cy="142" r="3.8" fill="#FFFFFF" />
              <path d="M154 159 Q160 162 166 159" stroke="#4C3D6E" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M157 160 C157 167 163 167 163 160 Z" fill="#F472B6" />
            </g>
          )}

          {/* 9. BLUSHING */}
          {activeExp === 'blushing' && (
            <g id="exp-blushing">
              <ellipse cx="134" cy="147" rx="8.5" ry="11" fill="#1C1838" />
              <circle cx="132" cy="143" r="3.5" fill="#FFFFFF" />
              <ellipse cx="186" cy="147" rx="8.5" ry="11" fill="#1C1838" />
              <circle cx="184" cy="143" r="3.5" fill="#FFFFFF" />
              <path d="M156 161 Q160 164 164 161" stroke="#4C3D6E" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path
                d="M160 102 C158 98 152 98 150 102 C148 106 154 111 160 115 C166 111 172 106 170 102 C168 98 162 98 160 102 Z"
                fill="#F7C8D9"
              />
            </g>
          )}

          {/* 10. ANGRY (TINY POUT) */}
          {activeExp === 'angry' && (
            <g id="exp-angry">
              <path d="M126 142 L142 148" stroke="#1C1838" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M194 142 L178 148" stroke="#1C1838" strokeWidth="3.5" strokeLinecap="round" />
              <ellipse cx="136" cy="149" rx="7" ry="9" fill="#1C1838" />
              <ellipse cx="184" cy="149" rx="7" ry="9" fill="#1C1838" />
              <path d="M155 163 Q160 158 165 163" stroke="#4C3D6E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Cute anger vein */}
              <path d="M210 118 L216 118 M213 115 L213 121" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {/* 11. SCARED */}
          {activeExp === 'scared' && (
            <g id="exp-scared">
              <ellipse cx="134" cy="146" rx="9" ry="12" fill="#1C1838" />
              <circle cx="131" cy="141" r="3" fill="#FFFFFF" />
              <ellipse cx="186" cy="146" rx="9" ry="12" fill="#1C1838" />
              <circle cx="183" cy="141" r="3" fill="#FFFFFF" />
              {/* Wavy mouth */}
              <path d="M153 162 Q156 166 160 162 Q164 166 167 162" stroke="#4C3D6E" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <text x="210" y="124" fill="#BFD7F4" fontSize="18">💧</text>
            </g>
          )}

          {/* 12. LOVE / THINKING */}
          {(activeExp === 'love' || activeExp === 'thinking') && (
            <g id="exp-love">
              <ellipse cx="134" cy="146" rx="9" ry="11.5" fill="#1C1838" />
              <circle cx="131" cy="142" r="4" fill="#FFFFFF" />
              <ellipse cx="186" cy="146" rx="9" ry="11.5" fill="#1C1838" />
              <circle cx="183" cy="142" r="4" fill="#FFFFFF" />
              <path d="M154 160 Q160 167 166 160" stroke="#4C3D6E" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <text x="208" y="120" fill="#F472B6" fontSize="20">💖</text>
            </g>
          )}

          {/* --- SATCHEL WITH GOLD BUCKLE & STARS --- */}
          <g id="satchel">
            {/* Strap */}
            <path
              d="M126 178 C144 192 176 216 196 236"
              stroke="#211E48"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Bag Body */}
            <rect
              x="178"
              y="214"
              width="40"
              height="34"
              rx="9"
              fill="#211E48"
              stroke="#6F61A8"
              strokeWidth="2.2"
            />
            {/* Gold Buckle */}
            <rect x="188" y="218" width="10" height="8" rx="2" fill="none" stroke="#FFE5A3" strokeWidth="2" />
            {/* Stars peeking out of bag */}
            <path
              d="M199 224 L200.5 229 L205 229.5 L201.5 232.5 L202.5 237 L199 234.5 L195.5 237 L196.5 232.5 L193 229.5 L197.5 229 Z"
              fill="#FFE5A3"
            />
          </g>

          {/* --- HOLDING 3D GLOWING STAR --- */}
          {holdingItem === 'star' && (
            <g id="holding-star" className="animate-pulse-glow">
              <circle cx="160" cy="202" r="30" fill="#FFE5A3" opacity="0.4" filter="url(#starGlow3D)" />
              <path
                d="M160 176 L166.5 194.5 L185.5 195.5 L170 207.5 L175.5 225.5 L160 214.5 L144.5 225.5 L150 207.5 L134.5 195.5 L153.5 194.5 Z"
                fill="#FFE5A3"
                stroke="#FCD34D"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="156" cy="201" r="1.6" fill="#6B4B1B" />
              <circle cx="164" cy="201" r="1.6" fill="#6B4B1B" />
              <path d="M158 205 Q160 207 162 205" stroke="#6B4B1B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {holdingItem === 'jar' && (
            <g id="holding-jar">
              <rect x="140" y="186" width="40" height="46" rx="8" fill="#BFD7F4" fillOpacity="0.4" stroke="#CDB7F3" strokeWidth="2.5" />
              <rect x="145" y="180" width="30" height="7" rx="2" fill="#6F61A8" />
              <circle cx="154" cy="208" r="4.5" fill="#FFE5A3" filter="drop-shadow(0 0 5px #FFE5A3)" />
              <circle cx="168" cy="216" r="3.5" fill="#FFE5A3" filter="drop-shadow(0 0 5px #FFE5A3)" />
              <circle cx="162" cy="198" r="2.8" fill="#F7C8D9" />
            </g>
          )}

          {/* Chubby Plush Paws */}
          <ellipse cx="140" cy="210" rx="9.5" ry="7.5" fill="#FFFFFF" stroke="#DDD0F7" strokeWidth="1.5" />
          <ellipse cx="180" cy="210" rx="9.5" ry="7.5" fill="#FFFFFF" stroke="#DDD0F7" strokeWidth="1.5" />

          {/* Badge Pin */}
          {badge && (
            <g id="badge-pin">
              <rect x="122" y="222" width="22" height="15" rx="3" fill="#FFF7ED" stroke="#6F61A8" strokeWidth="1.5" />
              <rect x="125" y="224" width="6" height="6" rx="1" fill="#CDB7F3" />
              <line x1="133" y1="226" x2="141" y2="226" stroke="#6F61A8" strokeWidth="1.2" />
            </g>
          )}

          {/* --- 3D NIGHTCAP WITH SHERPA FLEECE TRIM & GOLD STAR PIN --- */}
          <g id="nightcap">
            {/* The main velvet cap cone droops to the right side */}
            <path
              d="M110 114 C108 64 148 18 202 18 C236 18 274 44 274 88 C274 126 240 136 236 162 C234 174 242 184 248 190 C254 196 250 208 240 206 C228 204 224 186 226 172 C228 152 256 138 256 100 C256 58 222 36 190 36 C144 36 122 72 122 112 Z"
              fill="url(#velvetCapGrad)"
            />

            {/* Thick Plush Sherpa Fleece Brim */}
            <path
              d="M102 122 C118 100 156 94 194 100 C216 104 230 114 234 126 C228 136 202 140 166 138 C130 136 108 132 102 122 Z"
              fill="url(#sherpaFleeceGrad)"
              stroke="#D4C2B0"
              strokeWidth="2"
            />

            {/* Golden Star Pattern on Velvet Cap */}
            <path d="M152 44 L154 49 L159 49.5 L155 53 L156.5 58 L152 55 L147.5 58 L149 53 L145 49.5 L150 49 Z" fill="#FFE5A3" />
            <path d="M196 50 L197.5 54 L202 54.5 L198.5 57.5 L199.5 62 L196 59.5 L192.5 62 L193.5 57.5 L190 54.5 L194.5 54 Z" fill="#FFE5A3" />
            <path d="M240 76 L241.5 80 L246 80.5 L242.5 83.5 L243.5 88 L240 85.5 L236.5 88 L237.5 83.5 L234 80.5 L238.5 80 Z" fill="#FFE5A3" />
            <path d="M250 116 L251 119 L254 119.5 L251.5 121.5 L252.5 125 L250 123 L247.5 125 L248.5 121.5 L246 119.5 L249 119 Z" fill="#FFE5A3" opacity="0.9" />

            {/* Golden Star Pin on Left Brim with Hanging Beads */}
            <g filter="drop-shadow(0 0 6px rgba(255, 229, 163, 0.9))">
              <path
                d="M108 104 L111 113 L120 114 L113 120 L115 129 L108 124 L101 129 L103 120 L96 114 L105 113 Z"
                fill="#FFE5A3"
                stroke="#FCD34D"
                strokeWidth="1.8"
              />
              {/* Hanging golden bead charm */}
              <line x1="108" y1="125" x2="108" y2="134" stroke="#FCD34D" strokeWidth="1.5" />
              <circle cx="108" cy="135" r="2.5" fill="#FFE5A3" stroke="#FCD34D" strokeWidth="1" />
            </g>

            {/* Fluffy White Plush Pom-Pom at tip */}
            <g id="pom-pom">
              <circle cx="236" cy="210" r="17" fill="#FFFFFF" />
              <circle cx="248" cy="206" r="13" fill="#FBF8FE" />
              <circle cx="226" cy="214" r="12" fill="#EFE8FA" />
              <circle cx="244" cy="220" r="11" fill="#FFFFFF" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
