import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Tv,
  Rocket,
  Lightbulb,
  Users,
  Target
} from 'lucide-react';

export default function Sidebar({ currentView, onViewChange, currentUser }) {
  const isStudent = currentUser.role === 'student';

  const studentNavItems = [
    { id: 'dashboard', label: 'Asesmen Saya', icon: LayoutDashboard },
    { id: 'student_live', label: 'Simak Presentasi', icon: Tv, badge: '🔴 Live' },
    { id: 'sandbox', label: 'Lab Konsep Nyata', icon: Rocket, badge: 'Interaktif' },
    { id: 'history', label: 'Riwayat & Hasil', icon: FileText },
    { id: 'diagnostic', label: 'Diagnostik Pintar', icon: Target, badge: 'Analisis' },
  ];

  const teacherNavItems = [
    { id: 'teacher_dashboard', label: 'Menu Utama Guru', icon: LayoutDashboard },
    { id: 'quick_practice', label: 'Mulai Latihan Siswa', icon: Rocket, badge: 'Praktis' },
    { id: 'teacher_cheat_sheet', label: 'Contekan & Kelompok', icon: Lightbulb, badge: 'Kelompok' },
    { id: 'history', label: 'Daftar Nilai Siswa', icon: FileText },
  ];

  const navItems = isStudent ? studentNavItems : teacherNavItems;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border border-slate-200/80 p-4 shrink-0 rounded-2xl h-fit sticky top-20 shadow-xs space-y-4 font-sans">
      
      {/* User Role Card */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-2.5 h-2.5 rounded-full ${isStudent ? 'bg-blue-600' : 'bg-emerald-600'}`}></div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {isStudent ? 'Akun Siswa' : 'Akun Guru'}
          </span>
        </div>
        <p className="text-xs text-slate-900 font-bold truncate">{currentUser.name}</p>
        <p className="text-[11px] text-slate-500 font-medium truncate">{currentUser.school}</p>
      </div>

      {/* Primary Navigation Menu */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Navigasi Utama
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 active:scale-98 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm font-extrabold'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 px-2 text-center text-xs text-slate-400">
        <p className="font-bold text-slate-700">SmartTKA</p>
        <p className="text-[11px] text-slate-400">Platform Asesmen Kemampuan Akademik</p>
      </div>

    </aside>
  );
}
