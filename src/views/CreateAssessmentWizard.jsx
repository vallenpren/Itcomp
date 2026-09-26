import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  Award, 
  BookOpen, 
  Sparkles, 
  Check, 
  Send, 
  Save, 
  Info,
  Calendar,
  Layers,
  HelpCircle,
  FileText
} from 'lucide-react';
import { BANK_SOAL } from '../data/mockData';

export default function CreateAssessmentWizard({ onCancel, onPublishAssessment }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 Form state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Matematika Saintek');
  const [targetClass, setTargetClass] = useState('XII MIPA 1');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [passingScore, setPassingScore] = useState(75);
  const [description, setDescription] = useState('');

  // Step 2 Question selection state (default select first 3 questions)
  const [selectedQuestionIds, setSelectedQuestionIds] = useState(['bs-01', 'bs-02', 'bs-03']);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Step 3 Options state
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [showInstantResult, setShowInstantResult] = useState(true);
  const [deadlineDate, setDeadlineDate] = useState('30 Sep 2026, 23:59 WIB');

  // Filter bank questions
  const filteredBank = BANK_SOAL.filter(q => {
    const matchesDiff = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    const matchesSearch = q.questionText.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          q.topic.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  const toggleQuestionSelection = (qId) => {
    if (selectedQuestionIds.includes(qId)) {
      setSelectedQuestionIds(prev => prev.filter(id => id !== qId));
    } else {
      setSelectedQuestionIds(prev => [...prev, qId]);
    }
  };

  const handleStep1Next = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Mohon isi judul asesmen terlebih dahulu.');
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (selectedQuestionIds.length === 0) {
      alert('Pilih setidaknya 1 soal dari Bank Soal.');
      return;
    }
    setCurrentStep(3);
  };

  const handleSaveDraft = () => {
    const newAsm = {
      id: `asm-custom-${Date.now()}`,
      title: title || 'Asesmen Draf Baru',
      category: 'Tes Kemampuan Akademik',
      subject,
      targetClass,
      totalQuestions: selectedQuestionIds.length,
      durationMinutes: Number(durationMinutes),
      deadline: 'Belum Diterbitkan',
      status: 'Draf',
      studentProgress: `0/32 Siswa`,
      submittedCount: 0,
      totalStudents: 32,
      difficulty: 'Sedang - HOTS',
      passingScore: Number(passingScore),
      description: description || 'Draf asesmen baru.',
      badgeText: 'Draf Guru',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300'
    };
    onPublishAssessment(newAsm);
  };

  const handlePublishNow = () => {
    const newAsm = {
      id: `asm-custom-${Date.now()}`,
      title,
      category: 'Tes Kemampuan Akademik',
      subject,
      targetClass,
      totalQuestions: selectedQuestionIds.length,
      durationMinutes: Number(durationMinutes),
      deadline: deadlineDate,
      status: 'Berlangsung',
      studentProgress: `0/32 Siswa`,
      submittedCount: 0,
      totalStudents: 32,
      difficulty: 'Sedang - HOTS',
      passingScore: Number(passingScore),
      description: description || 'Asesmen baru yang siap dikerjakan siswa.',
      badgeText: 'Baru Diterbitkan',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200'
    };
    onPublishAssessment(newAsm);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-8">
      
      {/* Top Header & Cancel Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Batal & Kembali ke Dashboard</span>
        </button>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Wizard Buat Asesmen (Step {currentStep} dari 3)
        </span>
      </div>

      {/* Wizard Progress Stepper Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="grid grid-cols-3 gap-2 relative">
          
          {/* Step 1 Indicator */}
          <div className={`flex flex-col items-center text-center p-2 rounded-2xl transition-all ${
            currentStep === 1 ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold' : 'text-slate-500'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs mb-1 ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              1
            </div>
            <span className="text-xs font-bold">1. Info Asesmen</span>
          </div>

          {/* Step 2 Indicator */}
          <div className={`flex flex-col items-center text-center p-2 rounded-2xl transition-all ${
            currentStep === 2 ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold' : 'text-slate-500'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs mb-1 ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              2
            </div>
            <span className="text-xs font-bold">2. Pilih & Kelola Soal</span>
          </div>

          {/* Step 3 Indicator */}
          <div className={`flex flex-col items-center text-center p-2 rounded-2xl transition-all ${
            currentStep === 3 ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold' : 'text-slate-500'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs mb-1 ${
              currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              3
            </div>
            <span className="text-xs font-bold">3. Review & Publikasi</span>
          </div>

        </div>
      </div>

      {/* STEP 1: INFO ASESMEN */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Next} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Langkah 1: Informasi Asesmen Akademik</h2>
            <p className="text-xs text-slate-500 mt-1">
              Lengkapi identitas modul ujian, alokasi waktu, dan KKM kelas.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Judul Asesmen *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Tryout UTBK 2026 - Matematika Saintek Bab Kalkulus"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mata Pelajaran / Topik
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                >
                  <option value="Matematika Saintek">Matematika Saintek</option>
                  <option value="TPS Penalaran">TPS Penalaran Umum</option>
                  <option value="Fisika Saintek">Fisika Saintek</option>
                  <option value="Bahasa Indonesia">Literasi Bahasa Indonesia</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Kelas
                </label>
                <select
                  value={targetClass}
                  onChange={(e) => setTargetClass(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                >
                  <option value="XII MIPA 1">XII MIPA 1 (32 Siswa)</option>
                  <option value="XII MIPA 2">XII MIPA 2 (35 Siswa)</option>
                  <option value="XII MIPA 3">XII MIPA 3 (30 Siswa)</option>
                  <option value="XII IPS 1">XII IPS 1 (30 Siswa)</option>
                  <option value="Semua Kelas XII">Semua Kelas XII (127 Siswa)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alokasi Waktu Ujian (Menit)
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Batas Nilai KKM Kelulusan
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={passingScore}
                    onChange={(e) => setPassingScore(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Petunjuk / Deskripsi Singkat
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tuliskan instruksi pengerjaan untuk siswa..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
            >
              <span>Lanjut ke Pilih Soal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: PILIH & KELOLA SOAL */}
      {currentStep === 2 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Langkah 2: Pilih Soal dari Bank Soal</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Centang soal yang ingin dimasukkan ke dalam paket ujian.
              </p>
            </div>

            {/* Counter Badge */}
            <div className="px-4 py-2 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 font-extrabold text-xs flex items-center gap-2 self-start sm:self-auto">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Total Soal Terpilih: <strong>{selectedQuestionIds.length} Soal</strong></span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari topik atau kata kunci..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 shrink-0">Kesulitan:</span>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
              >
                <option value="all">Semua Tingkat</option>
                <option value="Mudah">Mudah</option>
                <option value="Sedang">Sedang</option>
                <option value="HOTS">HOTS / Tinggi</option>
              </select>
            </div>
          </div>

          {/* Question List Cards */}
          <div className="space-y-3">
            {filteredBank.map((q) => {
              const isSelected = selectedQuestionIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  onClick={() => toggleQuestionSelection(q.id)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected 
                      ? 'bg-blue-50/60 border-blue-600 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Custom Checkbox */}
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                    isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {q.subject}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${q.difficultyBadge}`}>
                        {q.difficulty}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        Topik: <strong className="text-slate-800">{q.topic}</strong>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                      {q.questionText}
                    </p>

                    <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Pilar: {q.competencyLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs"
            >
              Kembali
            </button>

            <button
              onClick={handleStep2Next}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
            >
              <span>Lanjut ke Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 3: REVIEW & PUBLIKASI */}
      {currentStep === 3 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Langkah 3: Review & Publikasi Asesmen</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Periksa kembali konfigurasi sebelum menerbitkan ke siswa.
            </p>
          </div>

          {/* Summary Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Ringkasan Konfigurasi Asesmen</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Judul</span>
                <p className="font-bold text-slate-900 truncate mt-0.5">{title}</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Soal</span>
                <p className="font-bold text-blue-600 text-base mt-0.5">{selectedQuestionIds.length} Soal</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Alokasi Waktu</span>
                <p className="font-bold text-slate-900 text-base mt-0.5">{durationMinutes} Menit</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Target Kelas</span>
                <p className="font-bold text-teal-700 text-base mt-0.5">{targetClass}</p>
              </div>
            </div>
          </div>

          {/* Checklist Settings Options */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Pengaturan Pelaksanaan & Akses</h3>
            
            <label className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between cursor-pointer hover:bg-slate-50">
              <div>
                <p className="font-bold text-xs text-slate-900">Acak Urutan Soal & Pilihan Ganda</p>
                <p className="text-[11px] text-slate-500">Mencegah kebocoran urutan soal antar siswa di dalam kelas.</p>
              </div>
              <input
                type="checkbox"
                checked={shuffleQuestions}
                onChange={(e) => setShuffleQuestions(e.target.checked)}
                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between cursor-pointer hover:bg-slate-50">
              <div>
                <p className="font-bold text-xs text-slate-900">Tampilkan Skor & Diagnostik Langsung ke Siswa</p>
                <p className="text-[11px] text-slate-500">Siswa dapat langsung melihat skor KKM & Grafik Radar 5 Pilar saat selesai.</p>
              </div>
              <input
                type="checkbox"
                checked={showInstantResult}
                onChange={(e) => setShowInstantResult(e.target.checked)}
                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>

          {/* Deadline Schedule Setting */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Jadwal Tenggat Waktu Pengumpulan
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs"
            >
              Kembali
            </button>

            <div className="w-full sm:w-auto flex items-center gap-3">
              <button
                onClick={handleSaveDraft}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4 text-slate-500" />
                <span>Simpan Draf</span>
              </button>

              <button
                onClick={handlePublishNow}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Terbitkan Asesmen Sekarang</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
