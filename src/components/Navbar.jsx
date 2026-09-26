import React from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  Bell, 
  LogOut, 
  Sparkles,
  ChevronDown,
  BookOpenCheck
} from 'lucide-react';

export default function Navbar({ currentUser, onSwitchUser, currentView, onViewChange, onLogout }) {
  const isStudent = currentUser.role === 'student';

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

        {/* Quick Role Switcher & User Control */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Switch Role Button */}
          <button
            onClick={onSwitchUser}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200/80"
            title="Ganti Peran Demo (Siswa <-> Guru)"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Ganti Peran:</span>
            <span className="font-bold text-blue-700">
              {isStudent ? 'Siswa' : 'Guru'}
            </span>
          </button>

          {/* Notifications pill */}
          <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors">
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
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
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
