import React, { useState, useEffect } from 'react';
import { Sparkles, Wifi, ShieldCheck, Compass } from 'lucide-react';

export default function LoginLoadingScreen({ onComplete, targetRole = 'student' }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const statusMessages = [
    "Menghubungkan ke Saluran Kelas LestTry...",
    "Memuat Kanvas Eksperimen & Mesin KaTeX...",
    "Menyiapkan Sinkronisasi Live Proyektor...",
    "Selesai! Mengalihkan ke Dashboard..."
  ];

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(calculatedProgress);

      if (elapsed >= 1800) {
        setStatusIndex(3);
      } else if (elapsed >= 1200) {
        setStatusIndex(2);
      } else if (elapsed >= 600) {
        setStatusIndex(1);
      } else {
        setStatusIndex(0);
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setIsFadingOut(true);
        const exitTimer = setTimeout(() => {
          onComplete();
        }, 300);
        return () => clearTimeout(exitTimer);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 font-sans transition-all duration-300 ${
      isFadingOut ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      
      {/* SOFT GRADIENT GLOW LAYERS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-white pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* CENTER HERO CONCEPT ANIMATION */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full space-y-6">
        
        {/* HERO ICON WITH ATOM / RADAR PULSE RINGS */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          
          {/* Outer Ring (Royal Blue #2563EB) */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/40 animate-[spin_8s_linear_infinite]" />
          
          {/* Inner Ring (Emerald Green #10B981) */}
          <div className="absolute inset-2 rounded-full border-2 border-emerald-400/50 animate-[spin_10s_linear_infinite_reverse]" />
          
          {/* Soft Central Pulse Glow */}
          <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-teal-400/20 animate-pulse" />

          {/* Orbiting Particle 1 (Blue) */}
          <div className="absolute w-3 h-3 rounded-full bg-blue-600 shadow-lg shadow-blue-600/50 animate-[spin_3.5s_linear_infinite] origin-[68px_68px] top-0 left-0" />
          
          {/* Orbiting Particle 2 (Emerald) */}
          <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-[spin_5s_linear_infinite_reverse] origin-[58px_58px] bottom-1 right-1" />

          {/* Central Card with Compass Icon */}
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-blue-500/20 border border-slate-100 flex items-center justify-center relative z-10 transform transition-transform hover:scale-105">
            <Compass className="w-10 h-10 text-blue-600 stroke-[2.2] animate-pulse" />
          </div>

        </div>

        {/* BRANDING TITLE & TYPOGRAPHY */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] text-slate-900">
            Lest<span className="text-blue-600">Try</span>
          </h2>
          <p className="text-xs text-slate-500 font-semibold">
            Interactive Classroom Projection &amp; Concept Lab
          </p>
        </div>

        {/* DYNAMIC PROGRESS STATUS TEXT */}
        <div className="h-8 flex items-center justify-center px-4">
          <p className="text-xs sm:text-sm font-extrabold text-slate-800 transition-all duration-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin shrink-0" />
            <span>{statusMessages[statusIndex]}</span>
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-64 bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* DUAL-ENGINE CONNECTIVITY NETWORK BADGE BELOW */}
        <div className="pt-2 flex flex-col items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
            <Wifi className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>⚡ Dual-Engine Connectivity Ready (Latensi: 4ms)</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-400">
            {progress}% Progres Sinkronisasi
          </span>
        </div>

      </div>

    </div>
  );
}
