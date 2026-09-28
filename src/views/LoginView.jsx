import React, { useState } from 'react';
import { 
  Wifi, 
  FlaskConical, 
  BarChart3, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  User,
  KeyRound,
  Layers,
  Compass
} from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';

export default function LoginView({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('teacher'); // Default 'teacher' or 'student'
  const [email, setEmail] = useState(MOCK_USERS.teacher.email);
  const [sessionCode, setSessionCode] = useState('TRY-882');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === 'teacher') {
      setEmail(MOCK_USERS.teacher.email);
    } else {
      setEmail(MOCK_USERS.student.email);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(selectedRole === 'student' ? MOCK_USERS.student : MOCK_USERS.teacher);
  };

  const handleQuickDemo = (userObj) => {
    onLogin(userObj);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      
      {/* BACKGROUND DECORATIVE GLOW & GRID ACCENTS */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Grid SVG Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* SPLIT LAYOUT MAIN CONTAINER */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* =================================================== */}
        {/* SISI KIRI: VISUAL BRANDING & VALUE PROPOSITION */}
        {/* =================================================== */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/50 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/60 relative overflow-hidden">
          
          {/* Subtle Accent Radial Shape */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
                <Compass className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] text-slate-900">
                    Lest<span className="text-blue-600">Try</span>
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider">
                    PRO 2026
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500">
                  Interactive Classroom Projection &amp; Concept Lab
                </p>
              </div>
            </div>

            {/* Inspiring Headline */}
            <div className="pt-6 space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                Tingkatkan Pemahaman Konsep Kelas Melalui Eksperimen Nyata &amp; Proyektor Interaktif.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Platform laboratorium visual dan proyeksi kelas terpadu untuk sains, kalkulus, dan logika nalar siswa.
              </p>
            </div>

            {/* 3 Main Value Propositions */}
            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white text-blue-600 border border-blue-200 flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    📡 Dual-Engine Connectivity
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-normal">
                    Sinkronisasi proyektor lancar (Cloud Server &amp; Offline Local Hotspot 0 MB kuota).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white text-teal-600 border border-teal-200 flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    🧪 Real-World Concept Lab
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-normal">
                    18 Eksperimen sains, kalkulus diferensial, dan logika komputasi interaktif.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white text-indigo-600 border border-indigo-200 flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    📊 Smart Diagnostic Assessment
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-normal">
                    Diagnosis kelemahan konsep otomatis berbasis radar kemampuan siswa.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Badge Proof */}
          <div className="pt-8 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Digunakan oleh 50+ Sekolah &amp; Kelas Interaktif</span>
            </span>
            <span className="font-mono text-[10px] text-slate-400">v2.4.0</span>
          </div>

        </div>

        {/* =================================================== */}
        {/* SISI KANAN: FORMULIR MASUK CEPAT & ROLE SELECTOR */}
        {/* =================================================== */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center bg-white space-y-6">
          
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Selamat Datang
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Pilih peran Anda dan masukkan akun institusi untuk memulai.
            </p>
          </div>

          {/* TAB PEMILIH PERAN (ROLE SWITCHER MODERN) */}
          <div className="p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleRoleChange('teacher')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedRole === 'teacher'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-base">👨‍🏫</span>
              <span>Masuk sebagai Guru</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedRole === 'student'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-base">📱</span>
              <span>Masuk sebagai Siswa</span>
            </button>
          </div>

          {/* FORMULIR INPUT ELEGAN */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Nama / Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {selectedRole === 'teacher' ? 'Email / ID Institusi Guru' : 'Nama Lengkap / Email Siswa'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder={selectedRole === 'teacher' ? 'budi.hartono@lesttry.sch.id' : 'ahmad.dani@siswa.lesttry.id'}
                />
              </div>
            </div>

            {/* Input Kode Kelas / Kode Sesi */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Kode Kelas / Ruang Sesi Proyektor
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Layers className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={sessionCode}
                  onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-mono font-bold text-blue-700 uppercase focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder="TRY-882"
                />
              </div>
            </div>

            {/* Input Password / PIN */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Kata Sandi / PIN Kelas
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Tombol Masuk Utama */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-md shadow-blue-500/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Masuk Aplikasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* DEMO SHORTCUT BAR (UNTUK VIDEO LOMBA) */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
              <span>Pintas Akses Demo Instant 1-Klik</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo(MOCK_USERS.teacher)}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-between cursor-pointer active:scale-95 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <span>👨‍🏫</span>
                  <div className="text-left leading-tight">
                    <div>Akun Guru (Demo)</div>
                    <div className="text-[9px] text-teal-400 font-normal">Pak Budi Hartono</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo(MOCK_USERS.student)}
                className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs transition-all flex items-center justify-between cursor-pointer active:scale-95 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <div className="text-left leading-tight">
                    <div>Akun Siswa (Demo)</div>
                    <div className="text-[9px] text-blue-600 font-normal">Ahmad Dani</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
