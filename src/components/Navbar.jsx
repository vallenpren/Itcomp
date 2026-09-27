import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  Bell, 
  LogOut, 
  Sparkles,
  ChevronDown,
  BookOpenCheck,
  Globe,
  Wifi,
  Info
} from 'lucide-react';

export default function Navbar({ currentUser, onSwitchUser, currentView, onViewChange, onLogout }) {
  const isStudent = currentUser.role === 'student';

  // Network Dual-Engine mode state: 'cloud' | 'hotspot'
  const [networkMode, setNetworkMode] = useState(() => {
    try {
      return localStorage.getItem('smarttka_network_mode') || 'cloud';
    } catch (e) {
      return 'cloud';
    }
  });

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let channel;
    try {
      channel = new BroadcastChannel('smarttka_network_channel');
      channel.onmessage = (e) => {
        if (e.data?.type === 'NETWORK_MODE_CHANGE' && e.data?.mode) {
          setNetworkMode(e.data.mode);
        }
      };
    } catch (err) {}

    const handleStorage = (e) => {
      if (e.key === 'smarttka_network_mode' && e.newValue) {
        setNetworkMode(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleToggleNetwork = (mode) => {
    setNetworkMode(mode);
    try {
      localStorage.setItem('smarttka_network_mode', mode);
    } catch (e) {}

    try {
      const channel = new BroadcastChannel('smarttka_network_channel');
      channel.postMessage({ type: 'NETWORK_MODE_CHANGE', mode });
      channel.close();
    } catch (e) {}
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <BookOpenCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                LestTry
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                PROTOTIPE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Platform Asesmen Kemampuan Akademik</p>
          </div>
        </div>

        {/* DUAL-ENGINE NETWORK MODE TOGGLE & STATUS INDICATOR */}
        <div className="hidden lg:flex items-center gap-3 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => handleToggleNetwork('cloud')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                networkMode === 'cloud'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Cloud Server</span>
            </button>

            <button
              type="button"
              onClick={() => handleToggleNetwork('hotspot')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                networkMode === 'hotspot'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>Local Hotspot (Offline)</span>
            </button>
          </div>

          {/* Network Status Badge / Indicator */}
          {networkMode === 'hotspot' ? (
            <div 
              className="relative flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="truncate max-w-[280px]">
                ● Mode Offline Kelas Aktif — Latensi 4ms (0 MB Kuota Internet)
              </span>
              <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />

              {/* Tooltip Hover Explanation */}
              {showTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-3 bg-slate-900 text-white text-[11px] rounded-xl shadow-xl z-50 leading-relaxed space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <Wifi className="w-3.5 h-3.5" /> Tersambung via Local Hotspot Laptop Guru
                  </div>
                  <p className="text-slate-300 font-normal">
                    Seluruh slide, lab, dan kuis tetap berjalan 100% tanpa internet.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <span className="text-[11px] font-semibold text-slate-500 px-2">
              Terhubung ke Server Cloud (AWS Jakarta)
            </span>
          )}
        </div>

        {/* Quick Role Switcher & User Control */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Switch Role Button */}
          <button
            onClick={onSwitchUser}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200/80 cursor-pointer"
            title="Ganti Peran Demo (Siswa <-> Guru)"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Ganti Peran:</span>
            <span className="font-bold text-blue-700">
              {isStudent ? 'Siswa' : 'Guru'}
            </span>
          </button>

          {/* Notifications pill */}
          <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white"></span>
          </button>

          {/* User Profile Badge */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20"
            />
            <div className="hidden md:block text-left">
              <h4 className="text-xs font-bold text-slate-800 truncate max-w-[130px] leading-tight">
                {currentUser.name}
              </h4>
              <p className="text-[10px] text-slate-500 font-medium">
                {isStudent ? currentUser.class : currentUser.subject}
              </p>
            </div>

            <button 
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1 cursor-pointer"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
