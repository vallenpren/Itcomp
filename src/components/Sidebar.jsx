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
import { SidebarRocketIllustration } from './VectorIllustrations';

export default function Sidebar({ currentView, onViewChange, currentUser }) {
  const isStudent = currentUser.role === 'student';

  const studentNavItems = [
    { id: 'dashboard', label: 'Asesmen Saya', icon: LayoutDashboard },
    { id: 'student_live', label: 'Simak Presentasi', icon: Tv },
    { id: 'sandbox', label: 'Lab Konsep Nyata', icon: Rocket },
    { id: 'history', label: 'Riwayat & Hasil', icon: FileText },
    { id: 'diagnostic', label: 'Diagnostik Pintar', icon: Target },
  ];

  const teacherNavItems = [
    { id: 'teacher_dashboard', label: 'Menu Utama Guru', icon: LayoutDashboard },
    { id: 'quick_practice', label: 'Mulai Latihan Siswa', icon: Rocket },
    { id: 'teacher_cheat_sheet', label: 'Contekan Guru', icon: Lightbulb },
    { id: 'teacher_groups', label: 'Manajemen Kelompok', icon: Users },
    { id: 'history', label: 'Daftar Nilai Siswa', icon: FileText },
  ];

  const navItems = isStudent ? studentNavItems : teacherNavItems;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border border-slate-200/80 p-4 shrink-0 rounded-3xl h-fit sticky top-20 shadow-xs space-y-4 font-sans">
      
      {/* User Role Card */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
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
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-150 active:scale-98 cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <Icon className={`w-4 h-4 stroke-[1.75] ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Motivation Widget with Mini Vector Rocket */}
      <div className="bg-blue-50/70 border border-blue-150 rounded-2xl p-3.5 text-center relative overflow-hidden mt-4">
        <SidebarRocketIllustration className="w-16 h-16 mx-auto mb-2 object-contain" />
        <h4 className="text-xs font-extrabold text-blue-900 leading-tight">
          Belajar Sains Jadi Mudah!
        </h4>
        <p className="text-[10px] text-blue-600 font-medium mt-0.5">
          Mode Luring Aktif Tanpa Kuota
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 px-2 text-center text-xs text-slate-400 font-sans">
        <p className="font-extrabold text-slate-900 text-sm tracking-tight font-['Plus_Jakarta_Sans']">
          Lest<span className="text-blue-600">Try</span>
        </p>
        <p className="text-[10px] text-slate-400 font-medium mt-0.5">Interactive Classroom Projection & Concept Lab</p>
      </div>

    </aside>
  );
}
