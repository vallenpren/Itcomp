import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3, 
  BarChart2,
  BookOpen, 
  Award, 
  Search, 
  TrendingUp, 
  Radio, 
  Cast,
  Users, 
  User,
  Download, 
  FileText, 
  UserCheck, 
  Filter,
  Check
} from 'lucide-react';
import { MOCK_ASSESSMENTS } from '../data/mockData';
import { INITIAL_GROUP_MODULES } from '../components/TeacherClassroomGroups';
import { StudentHeroIllustration, ModuleReadyIllustration } from '../components/VectorIllustrations';
import studentHeroImg from '../assets/student-hero.jpg';

export default function StudentDashboard({ 
  currentUser, 
  onStartTest, 
  onViewDiagnostic,
  liveSession,
  onJoinLiveSession
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  
  // Student's assigned group state
  const [assignedGroupKey, setAssignedGroupKey] = useState('GROUP_A'); // 'GROUP_A' | 'GROUP_B' | 'GROUP_C'
  
  // Dynamic Group Modules State from Storage
  const [groupModules, setGroupModules] = useState(() => {
    try {
      const saved = localStorage.getItem('lesttry_group_modules');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_GROUP_MODULES;
  });

  const [sessionTargetClass, setSessionTargetClass] = useState({ id: 'MIPA-1', name: 'XII MIPA 1' });

  // Listen for real-time updates from teacher module upload
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('lesttry_group_modules');
        if (saved) setGroupModules(JSON.parse(saved));
      } catch (e) {}
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Live session check
  const [isLiveSession, setIsLiveSession] = useState(() => {
    if (liveSession?.isActive === true || liveSession?.isLive === true) return true;
    try {
      const savedSession = localStorage.getItem('smarttka_live_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed.targetClassId) setSessionTargetClass({ id: parsed.targetClassId, name: parsed.targetClassName || 'XII MIPA 1' });
        if (parsed.isLive === true) return true;
      }
    } catch (e) {}
    return false;
  });

  useEffect(() => {
    let lesttryChannel, streamChannel;
    try {
      lesttryChannel = new BroadcastChannel('lesttry_presentation_sync');
      lesttryChannel.onmessage = (event) => {
        if (event.data?.isLive === true) setIsLiveSession(true);
        if (event.data?.isLive === false) setIsLiveSession(false);
      };

      streamChannel = new BroadcastChannel('smarttka_live_stream');
      streamChannel.onmessage = (event) => {
        if (event.data?.isLive === true) setIsLiveSession(true);
        if (event.data?.isLive === false) setIsLiveSession(false);
      };
    } catch (e) {}

    return () => {
      if (lesttryChannel) lesttryChannel.close();
      if (streamChannel) streamChannel.close();
    };
  }, []);

  const safeAssessments = MOCK_ASSESSMENTS || [];
  const activeAssessments = safeAssessments.filter(a => a && (a.status === 'active' || a.status === 'Berlangsung'));
  const completedAssessments = safeAssessments.filter(a => a && (a.status === 'completed' || a.status === 'Selesai'));

  const filteredAssessments = safeAssessments.filter(a => {
    if (!a) return false;
    const isAct = a.status === 'active' || a.status === 'Berlangsung';
    const isComp = a.status === 'completed' || a.status === 'Selesai';
    const matchesTab = activeTab === 'all' || (activeTab === 'active' && isAct) || (activeTab === 'completed' && isComp);
    const matchesSearch = (a.title || '').toLowerCase().includes((searchQuery || '').toLowerCase()) || 
                          (a.subject || '').toLowerCase().includes((searchQuery || '').toLowerCase());
    return matchesTab && matchesSearch;
  });

  const activeModuleForStudent = groupModules[assignedGroupKey] || INITIAL_GROUP_MODULES.GROUP_A;

  const handleDownloadModule = () => {
    triggerToast(`File "${activeModuleForStudent.fileName}" berhasil diunduh ke perangkat Anda.`);
  };

  const getApproachLabel = (key) => {
    if (key === 'GROUP_A') return 'Visual';
    if (key === 'GROUP_B') return 'Teori & Analitis';
    return 'Praktik Langsung';
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 font-sans text-slate-800">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* SIARAN LIVE GURU BANNER */}
      {isLiveSession && (
        <div className="mb-6 bg-white border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Radio className="w-5 h-5 text-blue-600 animate-pulse" strokeWidth={1.75} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Siaran Guru Aktif
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {sessionTargetClass.name}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900">
                Pak Budi Hartono Sedang Mempresentasikan Materi Live
              </h4>
            </div>
          </div>
          <button 
            onClick={onJoinLiveSession}
            className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer shrink-0 w-full sm:w-auto"
          >
            <Cast className="w-4 h-4 stroke-[1.75]" />
            <span>Simak Presentasi Proyektor</span>
          </button>
        </div>
      )}
      
      {/* BANNER UTAMA SISWA ELEGAN & CLEAN */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 md:p-8 text-white shadow-lg border border-blue-500/20">
        {/* Efek Cahaya Halus di Latar Belakang */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/15 border border-white/20 backdrop-blur-sm">
              <User className="w-3.5 h-3.5"/>
              Siswa: {currentUser?.name || 'Ahmad Dani'} ({currentUser?.class || 'XII MIPA 1'})
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
              Status Pengelompokan Aktif
            </span>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
              Halo, {currentUser?.name || 'Ahmad Dani'}! Ayo pelajari konsep materi hari ini lewat simulasi seru!
            </h1>
            <p className="mt-1.5 text-blue-100 text-xs sm:text-sm font-medium">
              Kelompok Belajar: {activeModuleForStudent.groupName} (Fokus Cara Belajar: {getApproachLabel(assignedGroupKey)})
            </p>
          </div>

          {/* Kotak Info Kelompok */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm text-xs sm:text-sm text-blue-50 leading-relaxed">
            <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-200"/>
              Informasi Kelompok Belajar:
            </p>
            Kelompok ini adalah wadah diskusi cara belajar. Materi pokok sama dengan teman sekelas lainnya, namun modul ajar disajikan lewat panduan visual. Asesmen dan kuis tetap dikerjakan mandiri.
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button 
              onClick={() => onStartTest(safeAssessments[0])}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-700 font-semibold text-sm hover:bg-blue-50 active:scale-95 shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-blue-700"/>
              Mulai Latihan Mandiri
            </button>
            <button 
              onClick={() => onViewDiagnostic(completedAssessments[0] || safeAssessments[0])}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm active:scale-95 transition-all cursor-pointer"
            >
              <BarChart2 className="w-4 h-4"/>
              Lihat Hasil Pemahaman
            </button>
          </div>
        </div>
      </div>

      {/* KARTU MODUL BELAJAR SISWA */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-slate-700 stroke-[1.75]" />
              <span>Modul Belajar Sesuai Gaya Belajar Siswa</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Menampilkan modul ajar spesifik yang diunggah guru untuk kelompok belajar Anda.
            </p>
          </div>

          {/* Group Switcher Preview */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
            <button
              onClick={() => setAssignedGroupKey('GROUP_A')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                assignedGroupKey === 'GROUP_A' ? 'bg-white text-blue-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kelompok A (Visual)
            </button>
            <button
              onClick={() => setAssignedGroupKey('GROUP_B')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                assignedGroupKey === 'GROUP_B' ? 'bg-white text-purple-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kelompok B (Teori)
            </button>
            <button
              onClick={() => setAssignedGroupKey('GROUP_C')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                assignedGroupKey === 'GROUP_C' ? 'bg-white text-teal-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kelompok C (Praktik)
            </button>
          </div>
        </div>

        {/* Friendly Ready State Banner */}
        <div className="bg-sky-50/60 border border-sky-150 rounded-2xl p-4 flex items-center gap-4 text-xs">
          <ModuleReadyIllustration className="w-24 h-24 shrink-0 opacity-90 object-contain hidden sm:block" />
          <div className="space-y-1">
            <h4 className="font-bold text-sky-900 text-sm">
              Semua modul untuk kelompok belajarmu sudah siap dipelajari!
            </h4>
            <p className="text-sky-700 font-medium leading-relaxed">
              Materi ini disesuaikan dengan pendekatan pilihanmu ({getApproachLabel(assignedGroupKey)}). Klik tombol unduh di bawah ini untuk memulai membaca.
            </p>
          </div>
        </div>

        {/* MAIN BALANCED MODULE CARD */}
        <div className="bg-slate-50/70 border border-slate-200/80 hover:border-blue-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all">
          {/* Left Side */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-md font-semibold">
                {activeModuleForStudent.groupName} • Fokus Cara Belajar: {getApproachLabel(assignedGroupKey)}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Terbit: {activeModuleForStudent.uploadDate}
              </span>
            </div>

            <h4 className="text-base font-semibold text-slate-900">
              {activeModuleForStudent.activeModuleTitle}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {activeModuleForStudent.description}
            </p>

            <div className="pt-1 flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400 stroke-[1.75]" />
                <span>{activeModuleForStudent.fileName}</span>
              </span>
              <span>•</span>
              <span>Ukuran: {activeModuleForStudent.fileSize || '2.4 MB'}</span>
            </div>
          </div>

          {/* Right Side Action Button */}
          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={handleDownloadModule}
              className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 w-full md:w-auto"
            >
              <Download className="w-4 h-4 stroke-[1.75]" />
              <span>Unduh Modul (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* OVERVIEW STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Asesmen Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">{(activeAssessments || []).length}</p>
          <p className="text-[11px] text-teal-600 font-semibold mt-1">Dikerjakan mandiri</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telah Selesai</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">{(completedAssessments || []).length}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Evaluasi mandiri</p>
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

      {/* LIST ASESMEN AKADEMIK INDIVIDU */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Daftar Latihan &amp; Asesmen Mandiri</h2>
            <p className="text-xs text-slate-500 font-medium">Soal diujikan seragam, dikerjakan secara individu/mandiri.</p>
          </div>

          <div className="flex items-center gap-2">
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
            Semua Asesmen ({(safeAssessments || []).length})
            {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'active' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Latihan Aktif ({(activeAssessments || []).length})
            {activeTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'completed' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Hasil Pemahaman ({(completedAssessments || []).length})
            {activeTab === 'completed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
          </button>
        </div>

        {/* Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(filteredAssessments || []).map((assessment) => {
            if (!assessment) return null;
            const isActive = assessment.status === 'active' || assessment.status === 'Berlangsung';

            return (
              <div
                key={assessment.id}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 space-y-4"
              >
                <div>
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

                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug mb-2">
                    {assessment.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {assessment.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] text-slate-600 mb-3 space-y-0.5">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-blue-600" />
                      <span>Pelaksanaan Asesmen Mandiri</span>
                    </span>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      Soal diujikan seragam, dikerjakan secara individu, dan skor dihitung per siswa.
                    </p>
                  </div>
                </div>

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
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Mulai Latihan Mandiri</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-teal-50/60 border border-teal-100 mb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Skor Individu</span>
                        <div className="text-lg font-extrabold text-teal-700">{assessment.score || 88} / 100</div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        assessment.passed !== false ? 'bg-teal-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {assessment.passed !== false ? 'LULUS KKM' : 'REMEDIAL'}
                      </span>
                    </div>

                    <button
                      onClick={() => onViewDiagnostic(assessment)}
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-teal-400 mr-1.5" />
                      <span>Lihat Hasil Pemahaman</span>
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
