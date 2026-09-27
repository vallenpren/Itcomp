import React, { useState, useEffect } from 'react';
import { BookOpenCheck, Sparkles, ShieldCheck } from 'lucide-react';

export default function LoginLoadingScreen({ onComplete, targetRole = 'student' }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const statusMessages = [
    "Memverifikasi sesi akun...",
    "Menghubungkan ke ruang data kelas...",
    "Menyiapkan modul Real-World Concept Lab...",
    "Selamat datang kembali! Mengalihkan ke dashboard..."
  ];

  useEffect(() => {
    // Smooth progress timer (0% to 100% over ~2000ms)
    const startTime = Date.now();
    const totalDuration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(calculatedProgress);

      // Update status text based on elapsed time thresholds
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
    <div className={`fixed inset-0 z-50 bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-sans transition-all duration-300 ${
      isFadingOut ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      
      {/* Soft Radial Glow Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-100/60 via-slate-50 to-slate-50 pointer-events-none" />
      
      {/* Decorative Blur Circles */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* CENTER HERO ANIMATION BOX */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
        
        {/* HERO ICON BOX WITH DUAL ROTATING ORBIT RINGS */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          
          {/* Outer Orbit Ring 1 (Royal Indigo) */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/40 animate-[spin_8s_linear_infinite]" />
          
          {/* Inner Orbit Ring 2 (Soft Teal - Counter Rotate) */}
          <div className="absolute inset-2 rounded-full border border-teal-400/50 animate-[spin_12s_linear_infinite_reverse]" />
          
          {/* Pulse Glow Effect */}
          <div className="absolute inset-4 rounded-3xl bg-indigo-600/10 animate-pulse" />

          {/* Orbiting Particle 1 */}
          <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-md shadow-indigo-600/50 animate-[spin_4s_linear_infinite] origin-[68px_68px] top-0 left-0" />
          
          {/* Orbiting Particle 2 */}
          <div className="absolute w-2 h-2 rounded-full bg-teal-500 shadow-md shadow-teal-500/50 animate-[spin_6s_linear_infinite_reverse] origin-[56px_56px] bottom-1 right-1" />

          {/* Central Logo Box (White Rounded-3xl Card) */}
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-indigo-600/15 border border-slate-100 flex items-center justify-center relative z-10 transform transition-transform hover:scale-105">
            <BookOpenCheck className="w-10 h-10 text-indigo-600 stroke-[2.2]" />
          </div>

        </div>

        {/* BRANDING TITLE & SLOGAN */}
        <div className="space-y-1 mb-8">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-xl font-black tracking-tight text-slate-900">
              SmartTKA
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-black uppercase">
              Pro V1.0
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Platform Asesmen Kemampuan Akademik Presisi
          </p>
        </div>

        {/* DYNAMIC STATUS TEXT WITH SMOOTH FADE TRANSITION */}
        <div className="h-8 flex items-center justify-center mb-4 px-4">
          <p className="text-xs sm:text-sm font-extrabold text-slate-700 transition-all duration-300 animate-fade-in flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow shrink-0" />
            <span>{statusMessages[statusIndex]}</span>
          </p>
        </div>

        {/* PROGRESS BAR (HEIGHT 4px / H-1.5, WIDTH 240px / W-60) */}
        <div className="w-60 bg-slate-200 h-1.5 rounded-full overflow-hidden mb-2 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* PERCENTAGE TEXT BELOW PROGRESS BAR */}
        <div className="flex items-center justify-between w-60 text-[11px] font-bold text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Keamanan Terverifikasi</span>
          </span>
          <span className="font-mono text-indigo-600 font-black">{progress}%</span>
        </div>

      </div>

    </div>
  );
}
