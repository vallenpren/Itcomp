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
  ChevronDown,
  Monitor,
  Send,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { MOCK_ASSESSMENTS } from '../data/mockData';
import QuickPracticeModal from '../components/QuickPracticeModal';
import TeacherClassModeModal from '../components/TeacherClassModeModal';

export default function TeacherDashboard({ 
  currentUser, 
  onStartCreateAssessment, 
  onViewAnalytics, 
  onOpenProjector,
  onStartLiveSession,
  onOpenCheatSheet,
  onPublishAssessment,
  assessmentsList = [] 
}) {
  const [isQuickModalOpen, setIsQuickModalOpen] = useState(false);
  const [isClassModeModalOpen, setIsClassModeModalOpen] = useState(false);
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
          <div className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-800 text-sm font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span className="tabular-nums">5 Kelas Aktif • 127 Siswa Terdaftar</span>
          </div>
        </div>
      </div>

      {/* 2. TAMPILAN DASHBOARD GURU - 3 KARTU AKSI UTAMA (CLEAN LIGHT MODE) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            3 Akses Utama Hari Ini
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-0.5 font-medium">
            Pilih salah satu aktivitas di bawah untuk memulai kegiatan belajar mengajar dengan cepat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* KARTU 1: LAYAR PROYEKTOR KELAS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all group">
            
            <div className="space-y-4">
              {/* Top Header: 48x48px Pastel Icon Circle & Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black">
                  ⚡ 1-Klik Siap Tayang
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Layar Proyektor Kelas
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                  Buka simulator visual interaktif atau tayangkan slide presentasi langsung ke layar proyektor kelas dan HP siswa.
                </p>
              </div>
            </div>

            {/* Tombol Aksi Bawah: Solid Royal Indigo (#2563EB) */}
            <button
              onClick={() => setIsClassModeModalOpen(true)}
              className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98"
            >
              <span>Buka Layar Kelas ↗</span>
            </button>

          </div>

          {/* KARTU 2: MULAI LATIHAN SISWA */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all group">
            
            <div className="space-y-4">
              {/* Top Header: 48x48px Pastel Icon Circle & Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                  <Send className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-black">
                  ⏱ 3 Langkah Mudah
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                  Mulai Latihan Siswa
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                  Pilih mata pelajaran, tentukan kelas, dan bagikan paket latihan bernalar siap pakai tanpa perlu mengetik soal dari nol.
                </p>
              </div>
            </div>

            {/* Tombol Aksi Bawah: Solid Teal (#0D9488) */}
            <button
              onClick={() => setIsQuickModalOpen(true)}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98"
            >
              <span>Bagikan Latihan ↗</span>
            </button>

          </div>

          {/* KARTU 3: CONTEKAN MENGAJAR */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all group">
            
            <div className="space-y-4">
              {/* Top Header: 48x48px Pastel Icon Circle & Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-black">
                  💡 Panduan Tatap Muka
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Contekan Mengajar
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                  Rangkuman praktis kelompok belajar siswa (visual vs hitungan) dan materi yang paling banyak membingungkan untuk kelas hari ini.
                </p>
              </div>
            </div>

            {/* Tombol Aksi Bawah: Solid Slate-800 (#1E293B) */}
            <button
              onClick={onOpenCheatSheet}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1E293B] hover:bg-slate-900 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98"
            >
              <span>Lihat Panduan Kelas ↗</span>
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
                  <span className="text-blue-700 font-bold tabular-nums">{asm.studentProgress || '28/32 Siswa'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  Tenggat: {asm.deadline}
                </span>

                <button
                  onClick={() => onViewAnalytics(asm)}
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] rounded-xl shadow-xs transition-all group cursor-pointer"
                >
                  <span>Lihat Rekap Nilai</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5 text-emerald-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
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

      {/* POPUP MODAL PILIHAN MODE KELAS GURU */}
      {isClassModeModalOpen && (
        <TeacherClassModeModal
          onClose={() => setIsClassModeModalOpen(false)}
          onStartLiveSession={(sessionConfig) => {
            setIsClassModeModalOpen(false);
            if (onStartLiveSession) {
              onStartLiveSession(sessionConfig);
            } else {
              onOpenProjector('success');
            }
          }}
        />
      )}

    </div>
  );
}
