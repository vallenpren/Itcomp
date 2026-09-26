import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Send, 
  BookOpen, 
  Users, 
  FileText, 
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Atom,
  Calculator,
  FlaskConical,
  Dna,
  TrendingUp
} from 'lucide-react';

export default function QuickPracticeModal({ onClose, onPublishAssessment }) {
  const [selectedSubject, setSelectedSubject] = useState('Fisika');
  const [selectedClass, setSelectedClass] = useState('Kelas 12 IPA 1');
  const [selectedTemplate, setSelectedTemplate] = useState('template-1');
  const [isSuccess, setIsSuccess] = useState(false);

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
      title: 'Package 1: Latihan Harian Gerak Parabola (5 Soal Visual)',
      desc: 'Paket template soal pilihan ganda siap pakai tentang sudut elevasi & tinggi maksimum. Cocok untuk latihan harian.',
      duration: '15 Menit',
      questionCount: '5 Soal'
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
      title: 'Package 3: Kuis Ringkas Pemahaman Konsep (3 Soal Cepat)',
      desc: 'Kuis 5 menit di akhir kelas untuk mengecek apakah siswa sudah paham materi hari ini.',
      duration: '5 Menit',
      questionCount: '3 Soal'
    }
  ];

  const handleShareNow = () => {
    const templateObj = templates.find(t => t.id === selectedTemplate);
    const newAsm = {
      id: `asm-quick-${Date.now()}`,
      title: `${templateObj.title.split(':')[1].trim()} — ${selectedSubject}`,
      category: 'Latihan Cepat Kelas',
      subject: selectedSubject,
      targetClass: selectedClass,
      totalQuestions: 5,
      durationMinutes: 20,
      deadline: 'Hari Ini, 23:59 WIB',
      status: 'Berlangsung',
      studentProgress: '0/32 Siswa',
      submittedCount: 0,
      totalStudents: 32,
      passingScore: 75,
      description: templateObj.desc,
      badgeText: 'Siap Pakai',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };

    onPublishAssessment(newAsm);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 relative my-8">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">
              3 Langkah Cepat Mulai Latihan Siswa
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-0.5">
              Mulai Latihan Siswa (Tanpa Buat Soal dari Nol)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* SUCCESS BANNER WHEN PUBLISHED */}
        {isSuccess ? (
          <div className="py-8 space-y-6 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center ring-8 ring-emerald-50">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">
                🎉 Ujian Berhasil Dibagikan ke Siswa!
              </h3>
              <p className="text-base text-slate-600 max-w-md mx-auto">
                Paket soal telah dikirim ke <strong>{selectedClass}</strong> untuk mata pelajaran <strong>{selectedSubject}</strong>. Siswa sudah bisa langsung mengerjakan.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base transition-all shadow-lg shadow-emerald-600/30 active:scale-95"
            >
              Selesai & Kembali ke Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* LANGKAH 1: PILIH MAPEL */}
            <div className="space-y-3">
              <label className="block text-base font-extrabold text-slate-900">
                Langkah 1: Pilih Mata Pelajaran
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {subjects.map((sub) => {
                  const Icon = sub.icon;
                  const isSelected = selectedSubject === sub.id;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubject(sub.id)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 active:scale-95 ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md font-extrabold scale-105'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                      <span className="text-sm font-extrabold">{sub.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LANGKAH 2: PILIH KELAS */}
            <div className="space-y-3">
              <label className="block text-base font-extrabold text-slate-900">
                Langkah 2: Pilih Target Kelas Siswa
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {classes.map((cls) => {
                  const isSelected = selectedClass === cls.id;

                  return (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClass(cls.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between active:scale-95 ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-extrabold scale-105'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Users className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                        {isSelected && <Check className="w-5 h-5 text-white stroke-[3]" />}
                      </div>
                      <span className="text-sm font-extrabold">{cls.name}</span>
                      <span className={`text-xs ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {cls.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LANGKAH 3: PILIH TEMPLATE SOAL READY */}
            <div className="space-y-3">
              <label className="block text-base font-extrabold text-slate-900">
                Langkah 3: Pilih Paket Template Soal Siap Pakai
              </label>

              <div className="space-y-3">
                {templates.map((tpl) => {
                  const isSelected = selectedTemplate === tpl.id;

                  return (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplate(tpl.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 active:scale-98 ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-600 shadow-md'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 border ${
                        isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-base text-slate-900">{tpl.title}</h4>
                          <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {tpl.questionCount} • {tpl.duration}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {tpl.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOMBOL AKSI UTAMA "BAGIKAN UJIAN SEKARANG" */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-extrabold text-sm"
              >
                Batal
              </button>

              <button
                onClick={handleShareNow}
                className="flex-1 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base sm:text-lg transition-all shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-3 active:scale-98"
              >
                <Send className="w-6 h-6" />
                <span>BAGIKAN UJIAN SEKARANG (1-KLIK)</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
