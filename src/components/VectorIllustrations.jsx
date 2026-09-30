import React from 'react';

/**
 * 1. Hero Student Reading & Laptop Illustration
 * Flat vector art style with vibrant royal blue, soft cyan, warm amber, and pastel accents.
 */
export function StudentHeroIllustration({ className = "h-48 md:h-56 w-auto object-contain drop-shadow-md" }) {
  return (
    <svg 
      viewBox="0 0 320 260" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Ilustrasi Siswa Belajar"
    >
      <defs>
        <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="bookGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="bookGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4338CA" />
        </linearGradient>
      </defs>

      {/* Floating Sparkles & Science Orbitals */}
      <circle cx="50" cy="40" r="4" fill="#FDE047" opacity="0.8" />
      <circle cx="280" cy="50" r="6" fill="#67E8F9" opacity="0.8" />
      <circle cx="295" cy="180" r="5" fill="#F472B6" opacity="0.7" />
      <path d="M 260 30 L 265 40 L 275 45 L 265 50 L 260 60 L 255 50 L 245 45 L 255 40 Z" fill="#FDE047" opacity="0.9" />
      <path d="M 30 140 L 33 147 L 40 150 L 33 153 L 30 160 L 27 153 L 20 150 L 27 147 Z" fill="#38BDF8" opacity="0.8" />

      {/* Atom Orbit Accent */}
      <ellipse cx="260" cy="110" rx="35" ry="12" fill="none" stroke="#93C5FD" strokeWidth="2" opacity="0.5" transform="rotate(-25 260 110)" />
      <ellipse cx="260" cy="110" rx="35" ry="12" fill="none" stroke="#FDE047" strokeWidth="2" opacity="0.5" transform="rotate(35 260 110)" />
      <circle cx="275" cy="100" r="4" fill="#60A5FA" />

      {/* Stack of Modules / Books (Base) */}
      <rect x="70" y="215" width="180" height="22" rx="6" fill="url(#bookGrad1)" />
      <rect x="75" y="219" width="170" height="4" fill="#FEF3C7" opacity="0.8" />
      
      <rect x="85" y="195" width="150" height="20" rx="5" fill="url(#bookGrad2)" />
      <rect x="90" y="199" width="140" height="4" fill="#D1FAE5" opacity="0.8" />

      <rect x="95" y="177" width="130" height="18" rx="4" fill="#818CF8" />
      <rect x="100" y="181" width="120" height="3" fill="#E0E7FF" opacity="0.8" />

      {/* Desk Surface */}
      <rect x="40" y="235" width="240" height="10" rx="5" fill="#E2E8F0" opacity="0.9" />

      {/* Student Body & Shirt */}
      <path d="M 125 150 Q 160 135 195 150 L 205 210 L 115 210 Z" fill="url(#shirtGrad)" />

      {/* Student Head & Hair */}
      <circle cx="160" cy="95" r="28" fill="#FDBA74" />
      {/* Hair */}
      <path d="M 132 90 C 132 62 188 62 188 90 C 188 80 175 70 160 70 C 145 70 132 80 132 90 Z" fill="#1E293B" />
      <path d="M 135 85 C 145 78 175 78 185 85 C 185 75 172 65 160 65 C 148 65 135 75 135 85 Z" fill="#334155" />
      
      {/* Smiling Face details */}
      <circle cx="150" cy="95" r="3" fill="#0F172A" />
      <circle cx="170" cy="95" r="3" fill="#0F172A" />
      <path d="M 154 105 Q 160 112 166 105" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="144" cy="101" r="3" fill="#F87171" opacity="0.5" />
      <circle cx="176" cy="101" r="3" fill="#F87171" opacity="0.5" />

      {/* Laptop Screen & Glowing Screen Content */}
      <polygon points="110,175 210,175 200,120 120,120" fill="#0F172A" />
      <polygon points="114,171 206,171 197,124 123,124" fill="url(#laptopGrad)" />
      {/* Laptop UI Glow lines */}
      <rect x="135" y="132" width="50" height="6" rx="3" fill="#FFFFFF" opacity="0.9" />
      <rect x="135" y="144" width="35" height="4" rx="2" fill="#E0F2FE" opacity="0.8" />
      <rect x="135" y="152" width="42" height="4" rx="2" fill="#FEF08A" opacity="0.8" />
      <circle cx="188" cy="148" r="8" fill="#F59E0B" opacity="0.9" />

      {/* Laptop Keyboard Base */}
      <polygon points="90,185 230,185 210,175 110,175" fill="#94A3B8" />
      <polygon points="95,183 225,183 208,177 112,177" fill="#CBD5E1" />

      {/* Hands on Keyboard */}
      <circle cx="130" cy="176" r="7" fill="#FDBA74" />
      <circle cx="190" cy="176" r="7" fill="#FDBA74" />
    </svg>
  );
}

/**
 * 2. Sidebar Mini Rocket & Motivation Illustration
 * Compact 3D flat style rocket illustration.
 */
export function SidebarRocketIllustration({ className = "w-16 h-16 mx-auto mb-2 object-contain" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ilustrasi Roket Belajar"
    >
      <defs>
        <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      {/* Soft Cloud Base */}
      <ellipse cx="50" cy="85" rx="35" ry="10" fill="#E2E8F0" opacity="0.7" />
      <circle cx="35" cy="82" r="10" fill="#F1F5F9" />
      <circle cx="65" cy="82" r="10" fill="#F1F5F9" />
      <circle cx="50" cy="80" r="14" fill="#FFFFFF" />

      {/* Thrust Flames */}
      <path d="M 43 65 Q 50 88 57 65 Z" fill="url(#flameGrad)" />
      <path d="M 46 65 Q 50 78 54 65 Z" fill="#FDE047" />

      {/* Rocket Fins */}
      <path d="M 36 48 L 22 62 L 38 60 Z" fill="#1E40AF" />
      <path d="M 64 48 L 78 62 L 62 60 Z" fill="#1E40AF" />

      {/* Rocket Main Body */}
      <path d="M 50 10 Q 66 30 64 58 L 36 58 Q 34 30 50 10 Z" fill="url(#rocketBody)" />

      {/* Nose Cone Accent */}
      <path d="M 50 10 Q 60 22 58 30 L 42 30 Q 40 22 50 10 Z" fill="#EF4444" />

      {/* Porthole Window */}
      <circle cx="50" cy="40" r="9" fill="#0F172A" />
      <circle cx="50" cy="40" r="7" fill="#67E8F9" />
      <circle cx="48" cy="38" r="2.5" fill="#FFFFFF" opacity="0.9" />

      {/* Stars Accent */}
      <path d="M 20 20 L 22 25 L 27 27 L 22 29 L 20 34 L 18 29 L 13 27 L 18 25 Z" fill="#FBBF24" />
      <circle cx="82" cy="25" r="3" fill="#38BDF8" />
    </svg>
  );
}

/**
 * 3. Module Ready & Telescope Character Illustration
 * Flat vector artwork showing a curious student exploring modules with a telescope.
 */
export function ModuleReadyIllustration({ className = "w-28 h-28 mx-auto mb-2 opacity-90 object-contain" }) {
  return (
    <svg 
      viewBox="0 0 160 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ilustrasi Modul Siap"
    >
      <defs>
        <linearGradient id="modCircleBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id="scopeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      {/* Soft Background Circle */}
      <circle cx="80" cy="80" r="68" fill="url(#modCircleBg)" />

      {/* Floating Sparkles & Formula Symbols */}
      <circle cx="35" cy="40" r="4" fill="#F59E0B" />
      <circle cx="125" cy="45" r="5" fill="#10B981" />
      <path d="M 135 105 L 138 111 L 144 114 L 138 117 L 135 123 L 132 117 L 126 114 L 132 111 Z" fill="#6366F1" />

      {/* Book / Module Stack Base */}
      <rect x="40" y="115" width="80" height="14" rx="4" fill="#F59E0B" />
      <rect x="45" y="118" width="70" height="3" fill="#FEF3C7" />

      <rect x="46" y="103" width="68" height="12" rx="3" fill="#10B981" />
      <rect x="50" y="106" width="60" height="2.5" fill="#D1FAE5" />

      {/* Character Head */}
      <circle cx="70" cy="62" r="18" fill="#FDBA74" />
      {/* Hair */}
      <path d="M 52 58 C 52 38 88 38 88 58 C 88 50 78 44 70 44 C 62 44 52 50 52 58 Z" fill="#1E293B" />
      <circle cx="64" cy="62" r="2.5" fill="#0F172A" />
      <path d="M 66 69 Q 70 73 74 69" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />

      {/* Telescope Body */}
      <path d="M 75 60 L 120 40 L 126 48 L 81 68 Z" fill="url(#scopeGrad)" />
      <ellipse cx="123" cy="44" rx="4" ry="5.5" fill="#67E8F9" />
      <ellipse cx="78" cy="64" rx="3" ry="4.5" fill="#1E40AF" />

      {/* Stand / Tripod Legs */}
      <line x1="82" y1="67" x2="65" y2="103" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
      <line x1="82" y1="67" x2="95" y2="103" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
      <line x1="82" y1="67" x2="80" y2="103" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

      {/* Sparkle from Telescope tip */}
      <path d="M 132 30 L 135 36 L 141 39 L 135 42 L 132 48 L 129 42 L 123 39 L 129 36 Z" fill="#FDE047" />
    </svg>
  );
}

/**
 * 4. Trophy & Science Gold Badge Illustration
 * Gamified reward badge for diagnostic performance.
 */
export function TrophyBadgeIllustration({ className = "w-24 h-24 object-contain drop-shadow-sm" }) {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lencana Prestasi Sains"
    >
      <defs>
        <linearGradient id="goldTrophy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      {/* Ribbons */}
      <polygon points="45,75 30,110 48,102 60,110 52,75" fill="url(#ribbonGrad)" />
      <polygon points="75,75 68,110 80,102 98,110 83,75" fill="#2563EB" />

      {/* Starburst Outer Glow */}
      <circle cx="60" cy="50" r="40" fill="#FEF3C7" />
      <circle cx="60" cy="50" r="34" fill="url(#goldTrophy)" />
      <circle cx="60" cy="50" r="28" fill="#FFFBEB" />

      {/* Science Beaker / Cup Symbol inside Badge */}
      <path d="M 52 40 L 52 45 L 56 53 L 56 62 L 64 62 L 64 53 L 68 45 L 68 40 Z" fill="#3B82F6" />
      <path d="M 54 55 L 66 55 L 64 62 L 56 62 Z" fill="#60A5FA" />
      <circle cx="58" cy="58" r="1.5" fill="#FFFFFF" />
      <circle cx="62" cy="52" r="1.2" fill="#FFFFFF" />

      {/* Gold Star Top Decor */}
      <path d="M 60 25 L 62.5 31 L 69 31.5 L 64 35.5 L 65.5 42 L 60 38.5 L 54.5 42 L 56 35.5 L 51 31.5 L 57.5 31 Z" fill="#FBBF24" />

      {/* Celebration Sparkles */}
      <path d="M 15 25 L 18 30 L 23 32 L 18 34 L 15 39 L 13 34 L 8 32 L 13 30 Z" fill="#F59E0B" />
      <path d="M 95 20 L 97 24 L 102 26 L 97 28 L 95 32 L 93 28 L 88 26 L 93 24 Z" fill="#10B981" />
      <circle cx="100" cy="70" r="3.5" fill="#F472B6" />
      <circle cx="20" cy="75" r="4" fill="#60A5FA" />
    </svg>
  );
}
