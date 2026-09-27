import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  UserCheck, 
  ArrowRight, 
  ShieldCheck, 
  Brain, 
  CheckCircle2,
  Sparkles,
  Lock
} from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('budi.pratama@siswa.lesttry.id');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(selectedRole === 'student' ? MOCK_USERS.student : MOCK_USERS.teacher);
  };

  const handleQuickDemo = (userObj) => {
    onLogin(userObj);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      
      {/* Background Decor Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/30 mb-3">
            <BookOpenCheck className="w-8 h-8 stroke-[2.2]" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            LestTry
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Platform Asesmen Kemampuan Akademik Presisi
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Masuk Akun</h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
              Akses Masuk
            </span>
          </div>

          {/* Quick Demo Access Box */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Akses Instan Demo Hackathon (Split-Screen)</span>
            </div>
            <p className="text-xs text-slate-600 mb-3 font-medium">
              Satu klik untuk uji coba sinkronisasi dua layar (Guru &amp; Siswa) tanpa mengetik:
            </p>
            
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo(MOCK_USERS.teacher)}
                className="w-full inline-flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md shadow-slate-900/20 active:scale-[0.98] group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">👨‍🏫</span>
                  <div className="text-left">
                    <div className="font-extrabold text-white">Masuk Instan Mode Guru</div>
                    <div className="text-[10px] text-teal-400 font-medium">Pak Budi Hartono • Room Active: TKA-882</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-teal-400 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo(MOCK_USERS.student)}
                className="w-full inline-flex items-center justify-between p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20 active:scale-[0.98] group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">📱</span>
                  <div className="text-left">
                    <div className="font-extrabold text-white">Masuk Instan Mode Siswa</div>
                    <div className="text-[10px] text-blue-100 font-medium">Ahmad Dani • Connect: TKA-882</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">atau gunakan form</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Radio selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Peran Pengguna
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('student');
                    setEmail(MOCK_USERS.student.email);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    selectedRole === 'student'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Siswa
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('teacher');
                    setEmail(MOCK_USERS.teacher.email);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    selectedRole === 'teacher'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Guru / Penguji
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                placeholder="nama@lesttry.id"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <span>Masuk Aplikasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Feature Pill Footer */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-slate-500 text-xs font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-teal-600" /> Mode Anti-Distraksi
          </span>
          <span className="flex items-center gap-1">
            <Brain className="w-4 h-4 text-blue-600" /> Diagnostik 5 Pilar
          </span>
        </div>

      </div>
    </div>
  );
}
