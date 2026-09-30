import React from 'react';
import { 
  LayoutDashboard, 
  Tv, 
  Rocket, 
  Lightbulb, 
  Users,
  FileText
} from 'lucide-react';

export default function BottomBar({ currentView, onViewChange, currentUser }) {
  const isStudent = currentUser.role === 'student';

  const navItems = isStudent ? [
    { id: 'dashboard', label: 'Asesmen', icon: LayoutDashboard },
    { id: 'student_live', label: 'Simak Live', icon: Tv },
    { id: 'history', label: 'Riwayat', icon: FileText },
  ] : [
    { id: 'teacher_dashboard', label: 'Menu Utama', icon: LayoutDashboard },
    { id: 'teacher_cheat_sheet', label: 'Contekan', icon: Lightbulb },
    { id: 'teacher_groups', label: 'Kelompok', icon: Users },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg font-sans">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
              isActive ? 'text-blue-600 font-extrabold bg-blue-50' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 scale-110' : 'text-slate-400'}`} />
            <span className="text-[11px]">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
