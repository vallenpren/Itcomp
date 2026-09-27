import React, { useState, useEffect } from 'react';
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

  const [sessionTargetClass, setSessionTargetClass] = useState({ id: 'MIPA-1', name: 'XII MIPA 1' });

  // 1. PERSISTENT & REACTIVE LIVE PRESENTATION STATE FOR STUDENT
  const [isLiveSession, setIsLiveSession] = useState(() => {
    if (liveSession?.isActive === true || liveSession?.isLive === true) return true;
    try {
      const savedSession = localStorage.getItem('smarttka_live_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed.targetClassId) {
          setSessionTargetClass({ id: parsed.targetClassId, name: parsed.targetClassName || 'XII MIPA 1' });
        }
        if (parsed.isLive === true) return true;
      }
      const savedState = localStorage.getItem('smarttka_live_session_state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        if (parsedState.targetClassId) {
          setSessionTargetClass({ id: parsedState.targetClassId, name: parsedState.targetClassName || 'XII MIPA 1' });
        }
        if (parsedState.isActive === true) return true;
      }
    } catch (e) {}
    return false;
  });

  // 2. REAKTIF DUAL LISTENER IN EFFECT
  useEffect(() => {
    // A. Initial Mount Check
    const checkActiveLive = () => {
      try {
        const cached = localStorage.getItem('lesttry_live_presentation_state') || localStorage.getItem('smarttka_active_live_payload');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.targetClassId) {
            setSessionTargetClass({ id: parsed.targetClassId, name: parsed.targetClassName || 'XII MIPA 1' });
          }
          if (parsed.isLive !== false) {
            setIsLiveSession(true);
            return;
          }
        }
        const savedSession = localStorage.getItem('smarttka_live_session_state');
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          if (parsed.targetClassId) {
            setSessionTargetClass({ id: parsed.targetClassId, name: parsed.targetClassName || 'XII MIPA 1' });
          }
          if (parsed.isActive === true || parsed.isLive === true) {
            setIsLiveSession(true);
            return;
          }
        }
      } catch (e) {}
    };

    checkActiveLive();

    // B. BroadcastChannel Listeners
    let lesttryChannel, streamChannel, classroomChannel;
    try {
      lesttryChannel = new BroadcastChannel('lesttry_presentation_sync');
      lesttryChannel.onmessage = (event) => {
        const data = event.data;
        if (!data) return;
        if (data.targetClassId) {
          setSessionTargetClass({ id: data.targetClassId, name: data.targetClassName || 'XII MIPA 1' });
        }
        if (data.type === 'LESTTRY_SLIDE_UPDATE' || data.isLive === true) {
          setIsLiveSession(true);
        }
        if (data.type === 'LESTTRY_STOP_PRESENTATION' || data.isLive === false) {
          setIsLiveSession(false);
        }
      };

      streamChannel = new BroadcastChannel('smarttka_live_stream');
      streamChannel.onmessage = (event) => {
        const data = event.data;
        if (!data) return;
        const targetId = data.targetClassId;
        const targetName = data.targetClassName;
        if (targetId) {
          setSessionTargetClass({ id: targetId, name: targetName || 'XII MIPA 1' });
        }

        if (data.type === 'LESTTRY_SLIDE_UPDATE' || data.type === 'SYNC_PRESENTATION_STATE' || data.type === 'SLIDE_CHANGE' || data.isLive === true) {
          setIsLiveSession(true);
        }
        if (data.type === 'LESTTRY_STOP_PRESENTATION' || data.type === 'END_PRESENTATION' || data.isLive === false) {
          setIsLiveSession(false);
        }
      };

      classroomChannel = new BroadcastChannel('smarttka_live_classroom');
      classroomChannel.onmessage = (event) => {
        if (event.data?.type === 'TEACHER_START_PRESENTATION' || event.data?.isLive === true) {
          setIsLiveSession(true);
        }
        if (event.data?.type === 'TEACHER_STOP_PRESENTATION' || event.data?.isLive === false) {
          setIsLiveSession(false);
        }
      };
    } catch (e) {}

    // C. Window Storage Listener
    const handleStorageChange = (e) => {
      if (e.key === 'lesttry_live_presentation_state' || e.key === 'smarttka_active_live_payload' || e.key === 'smarttka_live_session_state') {
        checkActiveLive();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (lesttryChannel) lesttryChannel.close();
      if (streamChannel) streamChannel.close();
      if (classroomChannel) classroomChannel.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Sync prop changes if available
  useEffect(() => {
    if (liveSession?.isActive !== undefined || liveSession?.isLive !== undefined) {
      setIsLiveSession(liveSession.isActive === true || liveSession.isLive === true);
    }
  }, [liveSession?.isActive, liveSession?.isLive]);

  const activeAssessments = MOCK_ASSESSMENTS.filter(a => a.status === 'active');
  const completedAssessments = MOCK_ASSESSMENTS.filter(a => a.status === 'completed');

  const filteredAssessments = MOCK_ASSESSMENTS.filter(a => {
    const matchesTab = activeTab === 'all' || a.status === activeTab;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const liveTargetClassName = liveSession?.targetClassName || sessionTargetClass.name || 'XII MIPA 1';

  return (
    <div className="space-y-6 pb-20 md:pb-6 font-sans">
      
      {/* 3. TAMPILAN BANNER / TOMBOL DI LAYAR SISWA */}
      {isLiveSession && (
        <div className="mb-6 p-4.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 border-2 border-blue-500/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md animate-fade-in">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
              <Tv className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  SIARAN GURU AKTIF
                </span>
                <span className="text-xs font-bold text-blue-900 bg-white/80 px-2 py-0.5 rounded-md border border-blue-200">
                  Ruang: {liveTargetClassName}
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                Pak Budi Hartono Sedang Mempresentasikan Materi Live
              </h4>
              <p className="text-xs text-slate-600 font-medium">Layar proyektor simulasi aktif secara real-time. Ketuk untuk menyimak bersama.</p>
            </div>
          </div>
          <button 
            onClick={onJoinLiveSession}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-600/25 transition-all cursor-pointer shrink-0"
          >
            <Tv className="w-4 h-4" />
            <span>Simak Presentasi Proyektor ↗</span>
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
              className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-blue-700" />
              <span>Mulai Simulasi Utama (TKA Matematika)</span>
            </button>

            <button
              onClick={() => onViewDiagnostic(completedAssessments[0])}
              className="px-4 py-2.5 rounded-xl bg-blue-600/60 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
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
          <p className="text-2xl font-black text-slate-900 tabular-nums">{activeAssessments.length}</p>
          <p className="text-[11px] text-teal-600 font-semibold mt-1">Siap dikerjakan</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telah Selesai</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">{completedAssessments.length}</p>
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
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'all' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Semua Asesmen ({MOCK_ASSESSMENTS.length})
            {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'active' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Ujian Aktif ({activeAssessments.length})
            {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 transition-colors relative cursor-pointer ${
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
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 group-hover:scale-[1.01] cursor-pointer"
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
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] rounded-xl shadow-xs transition-all group cursor-pointer"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-teal-400 mr-1.5" />
                      <span>Lihat Diagnostik</span>
                      <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
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
