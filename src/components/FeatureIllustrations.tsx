import React from 'react';

// Card 1: Timeline & Missions Illustration (Lunar Surface + Lander + Orbital Arc)
export const TimelineIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#190e38" />
          <stop offset="100%" stopColor="#2c145e" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb800" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffb800" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky background */}
      <rect width="320" height="160" fill="url(#skyGrad)" />

      {/* Distant Earth */}
      <circle cx="270" cy="35" r="14" fill="#3b82f6" />
      <circle cx="267" cy="32" r="9" fill="#10b981" opacity="0.6" />
      <circle cx="270" cy="35" r="16" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Trajectory dotted line */}
      <path
        d="M 40 130 C 100 20, 200 20, 260 35"
        fill="none"
        stroke="#ffb800"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Lunar Terrain Horizon */}
      <path
        d="M 0 120 Q 80 105, 160 115 T 320 110 L 320 160 L 0 160 Z"
        fill="#8a9ab0"
      />
      <path
        d="M 0 132 Q 90 125, 180 130 T 320 125 L 320 160 L 0 160 Z"
        fill="#64748b"
      />

      {/* Craters */}
      <ellipse cx="60" cy="142" rx="16" ry="6" fill="#475569" opacity="0.7" />
      <ellipse cx="220" cy="140" rx="22" ry="7" fill="#475569" opacity="0.8" />
      <ellipse cx="140" cy="148" rx="10" ry="4" fill="#334155" opacity="0.6" />

      {/* Lunar Lander Craft */}
      <g transform="translate(100, 82)">
        {/* Lander Legs */}
        <line x1="8" y1="28" x2="-6" y2="44" stroke="#e2e8f0" strokeWidth="2.5" />
        <line x1="28" y1="28" x2="42" y2="44" stroke="#e2e8f0" strokeWidth="2.5" />
        <circle cx="-6" cy="44" r="3" fill="#cbd5e1" />
        <circle cx="42" cy="44" r="3" fill="#cbd5e1" />
        
        {/* Gold Descent Stage */}
        <polygon points="4,28 32,28 28,14 8,14" fill="#ffb800" />
        
        {/* Ascent Stage Cabin */}
        <rect x="8" y="0" width="20" height="15" rx="3" fill="#f8fafc" />
        <circle cx="18" cy="7" r="3.5" fill="#1e1b4b" />
        
        {/* Antenna */}
        <line x1="18" y1="0" x2="18" y2="-8" stroke="#f8fafc" strokeWidth="1.5" />
        <circle cx="18" cy="-8" r="2" fill="#ffb800" />

        {/* Thruster Plume */}
        <polygon points="14,28 22,28 18,36" fill="#f59e0b" opacity="0.7" />
      </g>

      {/* Timeline Nodes Markers */}
      <circle cx="50" cy="100" r="5" fill="#ffb800" />
      <circle cx="50" cy="100" r="9" fill="none" stroke="#ffb800" strokeWidth="1.5" opacity="0.6" />
      <text x="44" y="90" fill="#ffffff" fontSize="9" fontWeight="bold">1959</text>

      <circle cx="170" cy="45" r="5" fill="#ffb800" />
      <circle cx="170" cy="45" r="9" fill="none" stroke="#ffb800" strokeWidth="1.5" opacity="0.6" />
      <text x="160" y="36" fill="#ffffff" fontSize="9" fontWeight="bold">1969</text>

      <circle cx="270" cy="80" r="5" fill="#ffb800" />
      <circle cx="270" cy="80" r="9" fill="none" stroke="#ffb800" strokeWidth="1.5" opacity="0.6" />
      <text x="260" y="72" fill="#ffffff" fontSize="9" fontWeight="bold">2024+</text>
    </svg>
  );
};

// Card 2: Interactive Space Designs Illustration (Deep space, glowing orbital mechanics)
export const SpaceDesignIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="deepSpace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#11052c" />
          <stop offset="50%" stopColor="#240b54" />
          <stop offset="100%" stopColor="#431487" />
        </linearGradient>
        <radialGradient id="glowPurp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="160" fill="url(#deepSpace)" />

      {/* Nebula aura */}
      <circle cx="160" cy="80" r="70" fill="url(#glowPurp)" />

      {/* Orbit Rings */}
      <ellipse cx="160" cy="80" rx="120" ry="42" fill="none" stroke="rgba(255, 184, 0, 0.4)" strokeWidth="1.5" strokeDasharray="6 4" />
      <ellipse cx="160" cy="80" rx="75" ry="26" fill="none" stroke="rgba(192, 132, 252, 0.5)" strokeWidth="1" />

      {/* Center Stylized Moon */}
      <circle cx="160" cy="80" r="28" fill="#f8fafc" />
      <circle cx="152" cy="74" r="6" fill="#cbd5e1" />
      <circle cx="168" cy="86" r="8" fill="#cbd5e1" />
      <circle cx="162" cy="94" r="4" fill="#cbd5e1" />

      {/* Orbiting Colorful Satellite */}
      <g transform="translate(62, 54)">
        <rect x="0" y="0" width="14" height="8" rx="2" fill="#ffb800" />
        <line x1="-8" y1="4" x2="22" y2="4" stroke="#38bdf8" strokeWidth="2" />
        <rect x="-10" y="1" width="5" height="6" fill="#0284c7" />
        <rect x="19" y="1" width="5" height="6" fill="#0284c7" />
      </g>

      {/* Floating Space Capsule */}
      <g transform="translate(242, 94)">
        <polygon points="0,6 14,0 14,12" fill="#ec4899" />
        <circle cx="6" cy="6" r="2" fill="#ffffff" />
      </g>

      {/* Twinkling star sparkles */}
      <path d="M 40 30 L 42 36 L 48 38 L 42 40 L 40 46 L 38 40 L 32 38 L 38 36 Z" fill="#ffb800" />
      <path d="M 280 40 L 281 44 L 285 45 L 281 46 L 280 50 L 279 46 L 275 45 L 279 44 Z" fill="#ffffff" />
      <path d="M 220 130 L 221 133 L 224 134 L 221 135 L 220 138 L 219 135 L 216 134 L 219 133 Z" fill="#ffb800" />
    </svg>
  );
};

// Card 3: Facts & Quiz Engine Illustration (Question mark, score trophy, radar facts)
export const FactsQuizIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="quizGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1040" />
          <stop offset="100%" stopColor="#3c1878" />
        </linearGradient>
      </defs>

      <rect width="320" height="160" fill="url(#quizGrad)" />

      {/* Central Radar Target Circles */}
      <circle cx="160" cy="80" r="55" fill="none" stroke="rgba(255, 184, 0, 0.2)" strokeWidth="1.5" />
      <circle cx="160" cy="80" r="38" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1.5" />
      <circle cx="160" cy="80" r="22" fill="#ffb800" opacity="0.15" />

      {/* Large Glowing Question Mark */}
      <text x="146" y="98" fill="#ffb800" fontSize="52" fontWeight="900" fontFamily="sans-serif">?</text>

      {/* Floating Fact Cards left & right */}
      <g transform="translate(30, 45)">
        <rect width="70" height="65" rx="10" fill="#ffffff" opacity="0.12" stroke="rgba(255,255,255,0.3)" />
        <rect x="8" y="12" width="54" height="6" rx="3" fill="#ffb800" />
        <rect x="8" y="24" width="40" height="4" rx="2" fill="#cbd5e1" />
        <rect x="8" y="32" width="48" height="4" rx="2" fill="#cbd5e1" />
        <circle cx="54" cy="48" r="6" fill="#10b981" />
      </g>

      <g transform="translate(220, 50)">
        <rect width="70" height="65" rx="10" fill="#ffffff" opacity="0.12" stroke="rgba(255,255,255,0.3)" />
        <text x="14" y="32" fill="#38bdf8" fontSize="18" fontWeight="bold">1/6g</text>
        <rect x="14" y="42" width="42" height="4" rx="2" fill="#cbd5e1" />
        <rect x="14" y="50" width="30" height="4" rx="2" fill="#cbd5e1" />
      </g>

      {/* Floating Checkmarks */}
      <circle cx="108" cy="38" r="10" fill="#10b981" />
      <polyline points="104,38 107,41 113,34" fill="none" stroke="#ffffff" strokeWidth="2" />

      <circle cx="212" cy="120" r="10" fill="#ffb800" />
      <polyline points="208,120 211,123 217,116" fill="none" stroke="#1b1633" strokeWidth="2" />
    </svg>
  );
};

// Card 4: Voice AI L.U.N.A. Illustration (Futuristic Voice AI waveforms + Hologram Robot)
export const LunaAIIllustration: React.FC = () => {
  return (
    <svg viewBox="0 0 320 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#150833" />
          <stop offset="100%" stopColor="#2b1158" />
        </linearGradient>
      </defs>

      <rect width="320" height="160" fill="url(#aiGrad)" />

      {/* Sound Waves Behind */}
      <g opacity="0.4">
        <line x1="50" y1="80" x2="50" y2="80" stroke="#ffb800" strokeWidth="3" strokeLinecap="round" />
        <line x1="65" y1="65" x2="65" y2="95" stroke="#ffb800" strokeWidth="3" strokeLinecap="round" />
        <line x1="80" y1="50" x2="80" y2="110" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <line x1="95" y1="40" x2="95" y2="120" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" />

        <line x1="225" y1="40" x2="225" y2="120" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" />
        <line x1="240" y1="50" x2="240" y2="110" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <line x1="255" y1="65" x2="255" y2="95" stroke="#ffb800" strokeWidth="3" strokeLinecap="round" />
        <line x1="270" y1="80" x2="270" y2="80" stroke="#ffb800" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Hologram AI Orb in Center */}
      <circle cx="160" cy="80" r="38" fill="none" stroke="#ffb800" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="160" cy="80" r="30" fill="linear-gradient(135deg, #431487, #7c3aed)" />
      
      {/* Bot Face Visor */}
      <rect x="142" y="68" width="36" height="20" rx="8" fill="#180b33" stroke="#38bdf8" strokeWidth="1.5" />
      
      {/* Glowing AI Eyes */}
      <circle cx="152" cy="78" r="3" fill="#ffb800" />
      <circle cx="168" cy="78" r="3" fill="#ffb800" />

      {/* Antenna */}
      <line x1="160" y1="50" x2="160" y2="40" stroke="#ffb800" strokeWidth="2" />
      <circle cx="160" cy="38" r="3" fill="#ffb800" />

      {/* Voice ripple lines below */}
      <path d="M 120 135 Q 160 148 200 135" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M 135 142 Q 160 152 185 142" fill="none" stroke="#ffb800" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
};
