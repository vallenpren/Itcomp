import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Send, 
  BookOpen, 
  Users, 
  FileText, 
  Sparkles,
  CheckCircle2,
  Atom,
  Calculator,
  FlaskConical,
  Dna,
  TrendingUp,
  ArrowUpRight,
  Radio,
  Clock,
  Award
} from 'lucide-react';

export default function QuickPracticeModal({ onClose, onPublishAssessment }) {
  const [selectedSubject, setSelectedSubject] = useState('Fisika');
  const [selectedClass, setSelectedClass] = useState('Kelas 12 IPA 1');
  const [selectedTemplate, setSelectedTemplate] = useState('template-1');
  const [isLiveRadarMode, setIsLiveRadarMode] = useState(false);

  // Live Student Monitoring Radar State
  const [studentRadarList, setStudentRadarList] = useState([
    { id: 1, name: 'Ahmad Dani', status: 'progress', progressText: 'Mengerjakan Soal 2/3', score: null, badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
    { id: 2, name: 'Siti Nurhaliza', status: 'completed', progressText: 'Selesai (Skor: 85)', score: 85, badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    { id: 3, name: 'Budi Santoso', status: 'completed', progressText: 'Selesai (Skor: 80)', score: 80, badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Listen to real-time student quiz progress / submissions via BroadcastChannel
    let channel;
    try {
      channel = new BroadcastChannel('smarttka_classroom_quiz');
      channel.onmessage = (event) => {
        const data = event.data;
        if (data?.type === 'QUIZ_PROGRESS') {
          setStudentRadarList(prev => prev.map(s => {
            if (s.name.toLowerCase().includes(data.studentName?.toLowerCase() || 'ahmad')) {
              return {
                ...s,
                status: 'progress',
                progressText: `Mengerjakan Soal ${data.currentQuestion}/${data.totalQuestions}`,
                badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
              };
            }
            return s;
          }));
        } else if (data?.type === 'QUIZ_SUBMITTED') {
          setStudentRadarList(prev => prev.map(s => {
            if (s.name.toLowerCase().includes(data.studentName?.toLowerCase() || 'ahmad')) {
              return {
                ...s,
                status: 'completed',
                score: data.score || 90,
                progressText: `Selesai (Skor: ${data.score || 90})`,
                badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
              };
            }
            return s;
          }));
        }
      };
    } catch (e) {}

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (channel) channel.close();
    };
  }, [onClose]);

  const subjects = [
    { id: 'Fisika', name: 'Fisika', icon: Atom, color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
    { id: 'Matematika', name: 'Matematika', icon: Calculator, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' },
    { id: 'Kimia', name: 'Kimia', icon: FlaskConical, color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
    { id: 'Biologi', name: 'Biologi', icon: Dna, color: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100' },
    { id: 'Ekonomi', name: 'Ekonomi', icon: TrendingUp, color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },
  ];

  const classes = [
    { id: 'Kelas 12 IPA 1', name: 'Kelas 12 IPA 1', count: '32 Siswa' },
    { id: 'Kelas 12 IPA 2', name: 'Kelas 12 IPA 2', count: '35 Siswa' },
    { id: 'Kelas 11 IPA 1', name: 'Kelas 11 IPA 1', count: '30 Siswa' },
    { id: 'Semua Kelas', name: 'Semua Kelas Ampuan', count: '127 Siswa' },
  ];

  const templates = [
    {
      id: 'template-1',
      title: 'Package 1: Kalkulus Trajektori & Nalar Turunan (3 Soal Cepat)',
      desc: 'Paket template latihan cepat nalar visual trajektori & turunan laju perubahan instan. Cocok untuk evaluasi kuis live.',
      duration: '5 Menit',
      questionCount: '3 Soal'
    },
    {
      id: 'template-2',
      title: 'Package 2: Ulangan Bab Hukum Newton & Vektor (10 Soal)',
      desc: 'Paket soal standar evaluasi bab konsep gaya dan vektor. Sudah dilengkapi pembahasan otomatis.',
      duration: '30 Menit',
      questionCount: '10 Soal'
    },
    {
      id: 'template-3',
      title: 'Package 3: Latihan Harian Gerak Parabola (5 Soal Visual)',
      desc: 'Paket template soal pilihan ganda tentang sudut elevasi & tinggi maksimum.',
      duration: '15 Menit',
      questionCount: '5 Soal'
    }
  ];

  const handleShareNow = () => {
    const templateObj = templates.find(t => t.id === selectedTemplate);
    const newAsm = {
      id: `asm-quick-${Date.now()}`,
      title: `Kalkulus Trajektori & Nalar Turunan — ${selectedSubject}`,
      category: 'Latihan Cepat Kelas',
      subject: selectedSubject,
      targetClass: selectedClass,
      totalQuestions: 3,
      durationMinutes: 10,
      deadline: 'Hari Ini, Live Classroom',
      status: 'Berlangsung',
      studentProgress: '3/32 Siswa Aktif',
      submittedCount: 2,
      totalStudents: 32,
      passingScore: 75,
      description: templateObj.desc,
      badgeText: 'Live Quiz Active',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };

    onPublishAssessment(newAsm);

    // BROADCAST EVENT TO ALL STUDENT WINDOWS
    try {
      const channel = new BroadcastChannel('smarttka_classroom_quiz');
      channel.postMessage({
        type: 'START_QUIZ',
        quizTitle: 'Kalkulus Trajektori & Nalar Turunan',
        duration: 300,
        totalQuestions: 3,
        timestamp: Date.now()
      });
      channel.close();
    } catch (e) {}

    // Switch to live monitoring radar
    setIsLiveRadarMode(true);
  };

  const calculateAverageScore = () => {
    const completedScores = studentRadarList.map(s => s.score).filter(Boolean);
    if (completedScores.length === 0) return 85;
    const sum = completedScores.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / completedScores.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* STICKY HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isLiveRadarMode ? 'Radar Pemantauan Nilai Live 📊' : 'Mulai Latihan Siswa'}
            </h3>
            <p className="text-xs text-slate-500">
              {isLiveRadarMode ? 'Memantau pengerjaan siswa secara langsung (Real-Time)' : 'Bagikan paket soal siap pakai tanpa mengetik dari nol'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {isLiveRadarMode ? (
            <div className="space-y-5">
              
              {/* TOP LIVE SUMMARY BADGES */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Siswa Aktif</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">3 Orang</p>
                  <p className="text-[11px] text-teal-600 font-bold">Terhubung via Room TKA-882</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Rata-Rata Sementara</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">{calculateAverageScore()}</p>
                  <p className="text-[11px] text-emerald-700 font-bold">Di atas KKM Target (75)</p>
                </div>
              </div>

              {/* REAL-TIME STUDENT PROGRESS CARDS */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span>Tabel Status Pengerjaan Real-Time:</span>
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live Updates Active
                  </span>
                </div>

                <div className="space-y-2">
                  {studentRadarList.map((student) => (
                    <div 
                      key={student.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 font-extrabold text-xs text-slate-800 flex items-center justify-center shadow-2xs">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{student.name}</h5>
                          <p className="text-[11px] text-slate-500 font-medium">Kelas XII IPA 1</p>
                        </div>
                      </div>

                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${student.badgeColor}`}>
                        {student.progressText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-5">
              
              {/* LANGKAH 1: PILIH MAPEL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Langkah 1: Pilih Mata Pelajaran
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {subjects.map((sub) => {
                    const Icon = sub.icon;
                    const isSelected = selectedSubject === sub.id;

                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setSelectedSubject(sub.id)}
                        className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                        <span className="text-xs font-bold">{sub.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LANGKAH 2: PILIH KELAS */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Langkah 2: Pilih Target Kelas Siswa
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {classes.map((cls) => {
                    const isSelected = selectedClass === cls.id;

                    return (
                      <button
                        key={cls.id}
                        type="button"
                        onClick={() => setSelectedClass(cls.id)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Users className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                          <div>
                            <div className="text-xs font-bold">{cls.name}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                              {cls.count}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LANGKAH 3: PILIH TEMPLATE SOAL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Langkah 3: Pilih Paket Template Soal Siap Pakai
                </label>

                <div className="space-y-2">
                  {templates.map((tpl) => {
                    const isSelected = selectedTemplate === tpl.id;

                    return (
                      <div
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-600 shadow-xs'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                          isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-xs text-slate-900">{tpl.title}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 shrink-0">
                              {tpl.questionCount} • {tpl.duration}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {tpl.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* STICKY FOOTER */}
        <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-slate-100 bg-slate-50 shrink-0">
          {isLiveRadarMode ? (
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs cursor-pointer"
            >
              Tutup Pemantauan
            </button>
          ) : (
            <>
              <button 
                onClick={onClose} 
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-200/60 rounded-xl font-medium cursor-pointer"
              >
                Batal
              </button>
              <button 
                onClick={handleShareNow} 
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-xs transition-all group cursor-pointer"
              >
                <span>Bagikan Latihan Sekarang</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
