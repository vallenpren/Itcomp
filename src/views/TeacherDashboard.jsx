import React, { useState } from 'react';
import { 
  Tv, 
  Rocket, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  PlusCircle,
  FileText,
  Play,
  Lightbulb,
  Search,
  ChevronDown
} from 'lucide-react';
import { MOCK_ASSESSMENTS } from '../data/mockData';
import QuickPracticeModal from '../components/QuickPracticeModal';

export default function TeacherDashboard({ 
  currentUser, 
  onStartCreateAssessment, 
  onViewAnalytics, 
  onOpenProjector,
  onOpenCheatSheet,
  onPublishAssessment,
  assessmentsList = [] 
}) {
  const [isQuickModalOpen, setIsQuickModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const assessmentsToRender = assessmentsList.length > 0 ? assessmentsList : MOCK_ASSESSMENTS;

  const filteredAssessments = assessmentsToRender.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20 md:pb-8 font-sans">
      
      {/* 1. PROFILE & WELCOME BANNER FOR SENIOR TEACHER (ANTI-GAPTEK FRIENDLY) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={currentUser.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Selamat Datang, {currentUser.name || 'Budi, S.Pd.'}
              </h1>
            </div>
            <p className="text-base text-slate-600 mt-1 font-semibold">
              {currentUser.subject || 'Fisika & IPA Terpadu'} • {currentUser.school || 'SMA Negeri 1 Jakarta'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-5 py-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-sm font-extrabold flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            <span>5 Kelas Aktif • 127 Siswa Terdaftar</span>
          </div>
        </div>
      </div>

      {/* 2. TAMPILAN DASHBOARD GURU HANYA BERISI 3 AKSI UTAMA (BESAR, JELAS, MIN 16PX) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            3 Akses Utama Hari Ini
          </h2>
          <p className="text-base text-slate-600 mt-0.5">
            Pilih salah satu tombol di bawah untuk memulai kegiatan belajar mengajar dengan cepat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* TOMBOL 1 [LAYAR PROYEKTOR KELAS] */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl transition-all border border-indigo-800/80 group">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Tv className="w-8 h-8" />
                </div>
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  1 Klik Siap Tayang
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-indigo-300 transition-colors">
                  Tombol 1: Layar Proyektor Kelas
                </h3>
                <p className="text-base text-slate-300 mt-2 leading-relaxed font-medium">
                  1 klik untuk langsung menampilkan simulasi visual materi hari ini ke layar proyektor tanpa menu yang mengganggu.
                </p>
              </div>

              {/* PRESET TOMBOL 1-KLIK LANGSUNG DI KARTU */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preset Otomatis Siap Pakai:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenProjector('success')}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>🟢 Contoh Sukses</span>
                  </button>

                  <button
                    onClick={() => onOpenProjector('fail')}
                    className="flex-1 py-2 px-3 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>🔴 Contoh Gagal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* TOMBOL UTAMA BUKAI LAYAR PROYEKTOR */}
            <button
              onClick={() => onOpenProjector('success')}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-3 active:scale-98"
            >
              <Tv className="w-6 h-6" />
              <span>Buka Layar Proyektor</span>
            </button>

          </div>

          {/* TOMBOL 2 [MULAI LATIHAN SISWA] */}
          <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl transition-all border border-emerald-800/80 group">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Rocket className="w-8 h-8" />
                </div>
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  3 Langkah Cepat
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                  Tombol 2: Mulai Latihan Siswa
                </h3>
                <p className="text-base text-slate-300 mt-2 leading-relaxed font-medium">
                  Cukup 3 langkah cepat: Pilih Mapel ➔ Pilih Kelas ➔ Klik "Bagikan Ujian". Paket template soal sudah siap pakai tanpa buat soal dari nol.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-1">
                <span className="font-extrabold text-emerald-400">⚡ Alur Praktis Senior:</span>
                <p className="font-semibold">Paket soal siap pakai langsung terkirim ke HP siswa tanpa ribet mengetik.</p>
              </div>
            </div>

            {/* TOMBOL UTAMA MULAI LATIHAN SISWA */}
            <button
              onClick={() => setIsQuickModalOpen(true)}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-3 active:scale-98"
            >
              <Rocket className="w-6 h-6" />
              <span>Bagikan Ujian Cepat</span>
            </button>

          </div>

          {/* TOMBOL 3 [CONTEKAN MENGAJAR HARI INI] */}
          <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-orange-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl transition-all border border-amber-800/80 group">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Panduan Kelas
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                  Tombol 3: Contekan Mengajar
                </h3>
                <p className="text-base text-slate-300 mt-2 leading-relaxed font-medium">
                  Halaman sederhana berisi teks ringkas rekomendasi mengajar (siapa siswa butuh visual, materi paling banyak salah, & ide kegiatan kelas).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-1">
                <span className="font-extrabold text-amber-400">💡 Bebas Istilah Rumit:</span>
                <p className="font-semibold">Dilengkapi kartu nama kelompok siswa pastel yang praktis untuk guru.</p>
              </div>
            </div>

            {/* TOMBOL UTAMA LIHAT CONTEKAN MENGAJAR */}
            <button
              onClick={onOpenCheatSheet}
              className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-lg transition-all shadow-lg shadow-amber-600/30 flex items-center justify-center gap-3 active:scale-98"
            >
              <BookOpen className="w-6 h-6" />
              <span>Buka Contekan Mengajar</span>
            </button>

          </div>

        </div>
      </div>

      {/* 3. DAFTAR ASESMEN TERBARU & MANAJEMEN PAKET SOAL */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Daftar Paket Ujian Kelas</h3>
            <p className="text-base text-slate-600 mt-0.5">Pantau status pengerjaan siswa dan lihat rekap nilai.</p>
          </div>

          <button
            onClick={onStartCreateAssessment}
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 self-start sm:self-auto"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            <span>+ Buat Ujian Custom</span>
          </button>
        </div>

        {/* LIST KARTU ASESMEN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAssessments.map((asm) => (
            <div
              key={asm.id}
              className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                    {asm.subject} • {asm.targetClass || 'Kelas 12 IPA 1'}
                  </span>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {asm.status}
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-lg mb-1">
                  {asm.title}
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {asm.description}
                </p>

                <div className="mt-4 p-3 rounded-2xl bg-white border border-slate-200 flex justify-between text-xs font-bold">
                  <span className="text-slate-600">Siswa Sudah Mengumpulkan:</span>
                  <span className="text-blue-700 font-extrabold">{asm.studentProgress || '28/32 Siswa'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Tenggat: {asm.deadline}
                </span>

                <button
                  onClick={() => onViewAnalytics(asm)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-2"
                >
                  <span>Lihat Rekap Nilai</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* POPUP MODAL 3-LANGKAH CEPAT MULAI LATIHAN SISWA */}
      {isQuickModalOpen && (
        <QuickPracticeModal
          onClose={() => setIsQuickModalOpen(false)}
          onPublishAssessment={onPublishAssessment}
        />
      )}

    </div>
  );
}
