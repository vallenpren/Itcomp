import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3, 
  Calendar, 
  BookOpen, 
  Award, 
  ChevronRight, 
  Filter, 
  Search,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  GraduationCap,
  Tv,
  ArrowRight
} from 'lucide-react';
import { MOCK_ASSESSMENTS } from '../data/mockData';

export default function StudentDashboard({ 
  currentUser, 
  onStartTest, 
  onViewDiagnostic,
  liveSession,
  onJoinLiveSession
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  const activeAssessments = MOCK_ASSESSMENTS.filter(a => a.status === 'active');
  const completedAssessments = MOCK_ASSESSMENTS.filter(a => a.status === 'completed');

  const filteredAssessments = MOCK_ASSESSMENTS.filter(a => {
    const matchesTab = activeTab === 'all' || a.status === activeTab;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-6 font-sans">
      
      {/* ACTIVE LIVE PRESENTATION BANNER FOR STUDENT SIDE */}
      {(liveSession?.isActive ?? false) && (liveSession?.isLive !== false) && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white border-2 border-indigo-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/30">
              <Tv className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-black uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  🔴 SESI MENGAJAR AKTIF
                </span>
                <span className="text-xs font-bold text-slate-300">
                  Kode Kelas: <strong className="text-emerald-400 font-mono">TKA-12IPA1</strong>
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-1">
                Ibu/Bapak Guru sedang menayangkan materi kelas.
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                Cerminan layar proyektor real-time dapat disimak langsung di layar HP Anda.
              </p>
            </div>
          </div>

          <button
            onClick={onJoinLiveSession}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <span>Ketuk untuk Menyimak Live 📱</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 p-6 sm:p-8 text-white shadow-lg shadow-blue-600/15">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Selamat Datang Kembali, {currentUser.name}!</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Asesmen Saya & Pemetaan Kemampuan
          </h1>
          <p className="mt-2 text-sm text-blue-100 leading-relaxed">
            Siapkan diri Anda untuk ujian akademik dengan simulasi anti-distraksi dan analisis diagnostik presisi 5 pilar kompetensi.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => onStartTest(MOCK_ASSESSMENTS[0])}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-blue-700" />
              <span>Mulai Simulasi Utama (TKA Matematika)</span>
            </button>

            <button
              onClick={() => onViewDiagnostic(completedAssessments[0])}
              className="px-4 py-2.5 rounded-xl bg-blue-600/60 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Lihat Diagnostik Terakhir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Asesmen Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{activeAssessments.length}</p>
          <p className="text-[11px] text-teal-600 font-semibold mt-1">Siap dikerjakan</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telah Selesai</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{completedAssessments.length}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Total evaluasi</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rata-rata Skor</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">80.0</p>
          <p className="text-[11px] text-teal-600 font-bold mt-1">Di atas KKM (75)</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Peringkat Kelas</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">3 <span className="text-xs text-slate-400 font-medium">/ 36</span></p>
          <p className="text-[11px] text-amber-600 font-bold mt-1">Top 10% Kelas</p>
        </div>

      </div>

      {/* Main Section Header with Tabs & Search */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Daftar Asesmen Akademik</h2>
            <p className="text-xs text-slate-500">Pilih ujian untuk mulai dikerjakan atau lihat riwayat diagnostik.</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari mata pelajaran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'all' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Semua Asesmen ({MOCK_ASSESSMENTS.length})
            {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'active' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Ujian Aktif ({activeAssessments.length})
            {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'completed' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Riwayat Nilai ({completedAssessments.length})
            {activeTab === 'completed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
          </button>
        </div>

        {/* Assessment Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssessments.map((assessment) => {
            const isActive = assessment.status === 'active';

            return (
              <div
                key={assessment.id}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Top Badge & Subject */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      {assessment.subject}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-teal-50 text-teal-700 border-teal-200'
                    }`}>
                      {isActive ? 'Aktif' : 'Selesai'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug mb-2">
                    {assessment.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {assessment.description}
                  </p>

                  {/* Meta Specs */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span><strong>{assessment.totalQuestions}</strong> Soal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span><strong>{assessment.durationMinutes}</strong> Menit</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                {isActive ? (
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-amber-600 font-semibold mb-3">
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Tenggat Waktu:
                      </span>
                      <span>{assessment.deadline}</span>
                    </div>

                    <button
                      onClick={() => onStartTest(assessment)}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Mulai Ujian</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-teal-50/60 border border-teal-100 mb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Skor Akhir</span>
                        <div className="text-lg font-extrabold text-teal-700">{assessment.score} / 100</div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        assessment.passed ? 'bg-teal-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {assessment.passed ? 'LULUS KKM' : 'REMEDIAL'}
                      </span>
                    </div>

                    <button
                      onClick={() => onViewDiagnostic(assessment)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-teal-400" />
                      <span>Lihat Diagnostik</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
