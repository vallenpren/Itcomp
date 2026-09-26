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
    { id: 'sandbox', label: 'Real-World Sandbox', icon: Rocket, badge: 'Kontekstual' },
    { id: 'history', label: 'Riwayat & Hasil', icon: FileText },
    { id: 'diagnostic', label: 'Diagnostik Pintar', icon: Target, badge: '5 Pilar' },
  ];

  const teacherNavItems = [
    { id: 'teacher_dashboard', label: 'Menu Utama Guru', icon: LayoutDashboard },
    { id: 'projector', label: 'Layar Proyektor Kelas', icon: Tv, badge: '1-Klik' },
    { id: 'quick_practice', label: 'Mulai Latihan Siswa', icon: Rocket, badge: '3-Langkah' },
    { id: 'teacher_cheat_sheet', label: 'Contekan & Kelompok', icon: Lightbulb, badge: 'Pastel' },
    { id: 'history', label: 'Daftar Nilai Siswa', icon: FileText },
  ];

  const navItems = isStudent ? studentNavItems : teacherNavItems;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border border-slate-200 p-4 shrink-0 rounded-3xl h-fit sticky top-20 shadow-xs space-y-4 font-sans">
      
      {/* Role Banner Card */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-2.5 h-2.5 rounded-full ${isStudent ? 'bg-blue-600' : 'bg-emerald-600'}`}></div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-600">
            {isStudent ? 'Siswa' : 'Peran Guru (Senior Friendly)'}
          </span>
        </div>
        <p className="text-xs text-slate-800 font-extrabold truncate">{currentUser.school}</p>
      </div>

      {/* Primary Navigation Menu */}
      <div className="space-y-1.5">
        <p className="px-3 text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
          Navigasi Utama
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-extrabold transition-all duration-150 active:scale-98 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md font-black'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-slate-100 px-2 text-center text-xs text-slate-400">
        <p className="font-extrabold text-slate-600">LestTry EdTech v1.0</p>
        <p className="text-[10px] text-slate-400">Mode Guru Anti-Gaptek</p>
      </div>

    </aside>
  );
}
