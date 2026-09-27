import React, { useEffect, useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Brain, 
  Sparkles, 
  BookOpen, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  BarChart3,
  Check,
  RotateCcw,
  Download,
  Share2,
  FileText,
  Rocket,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import RadarChart from '../components/RadarChart';
import { COMPETENCY_PILLARS, MOCK_QUESTIONS, SMART_DIAGNOSTICS_DB } from '../data/mockData';

export default function DiagnosticView({ testResult, assessment, onBackToDashboard, onRetakeTest, onOpenSandbox }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const score = testResult?.score ?? 85;
  const passingScore = assessment?.passingScore ?? 75;
  const isPassed = score >= passingScore;

  // Calculate score breakdowns per 5 competency pillars
  const competencyScores = testResult?.details ? {
    pemahaman: calculatePillarScore(testResult.details, 'pemahaman'),
    analisis: calculatePillarScore(testResult.details, 'analisis'),
    logika: calculatePillarScore(testResult.details, 'logika'),
    pemecahan: calculatePillarScore(testResult.details, 'pemecahan'),
    ketelitian: calculatePillarScore(testResult.details, 'ketelitian'),
  } : {
    pemahaman: 90,
    analisis: 75,
    logika: 90,
    pemecahan: 80,
    ketelitian: 70
  };

  function calculatePillarScore(details, key) {
    const matched = details.filter(d => d.competency === key);
    if (matched.length === 0) return 80;
    const correct = matched.filter(d => d.isCorrect).length;
    return Math.round((correct / matched.length) * 100);
  }

  // Trigger confetti if passed
  useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isPassed]);

  // Determine smart diagnostic feedback box
  let diagnosticFeedback = SMART_DIAGNOSTICS_DB.high;
  if (score < 60) {
    diagnosticFeedback = SMART_DIAGNOSTICS_DB.low;
  } else if (score < 80) {
    diagnosticFeedback = SMART_DIAGNOSTICS_DB.medium;
  }

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-6xl mx-auto">
      
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Asesmen Saya</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onRetakeTest}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors border border-slate-200 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Coba Ulang Ujian</span>
          </button>
        </div>
      </div>

      {/* 1. SCORE CARD & KKM STATUS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md relative overflow-hidden">
        
        {/* Background glow gradient */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isPassed ? 'bg-teal-400' : 'bg-red-400'
        }`} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Score Circle & Pass Badge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-blue-50/30 border border-slate-200/80 text-center">
            
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Hasil Diagnostik Akhir
            </span>

            <div className="relative my-2 flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center ${
                isPassed ? 'border-teal-500 text-teal-700 bg-teal-50/50' : 'border-amber-500 text-amber-700 bg-amber-50/50'
              }`}>
                <span className="text-4xl font-extrabold leading-none">{score}</span>
                <span className="text-[11px] font-bold text-slate-500">SKOR TOTAL</span>
              </div>
            </div>

            {/* Passing Status Pill */}
            <div className="mt-3">
              {isPassed ? (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-600 text-white font-extrabold text-xs shadow-md shadow-teal-600/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>LULUS DENGAN PUJIAN (KKM {passingScore})</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-600/20">
                  <AlertCircle className="w-4 h-4" />
                  <span>BELUM MENCAPAI KKM ({passingScore})</span>
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 mt-2 font-medium">
              {assessment?.title || 'Simulasi TKA Matematika Saintek 2026'}
            </p>
          </div>

          {/* Detailed Stat Breakdown */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                {diagnosticFeedback.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {diagnosticFeedback.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Jawaban Benar</span>
                <p className="text-lg font-extrabold text-teal-600">
                  {testResult?.correctCount ?? 4} <span className="text-xs text-slate-400">/ {testResult?.totalQuestions ?? 5}</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Akurasi Hitung</span>
                <p className="text-lg font-extrabold text-blue-600">{score}%</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Tingkat Penguasaan</span>
                <p className="text-sm font-extrabold text-slate-800 mt-1">{diagnosticFeedback.badge}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 2. RADAR CHART & COMPETENCY PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: 5-Pillar Spider / Radar Chart */}
        <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Brain className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Grafik Radar 5 Pilar Kompetensi
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                Spider Visual
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Pemetaan keseimbangan 5 dimensi kemampuan akademik siswa secara holistik.
            </p>

            {/* Render Canvas Radar Chart */}
            <RadarChart scores={competencyScores} />
          </div>

          <p className="text-[11px] text-slate-400 text-center mt-2 italic">
            *Skor ideal untuk lolos jurusan Saintek unggulan adalah &gt; 80% pada seluruh pilar.
          </p>
        </div>

        {/* Right Column: Smart Diagnostic Recommendation Box */}
        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Kotak Diagnosis Cerdas AI
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Rekomendasi otomatis berbasis kelemahan yang terdeteksi pada hasil pengerjaan:
            </p>

            {/* List of Smart Actionable Recommendations */}
            <div className="space-y-3">
              {diagnosticFeedback.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/40 border border-slate-200 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-800 font-medium leading-snug">
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Learning Action Button */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Buka Modul Penguatan Materi</span>
            </button>
          </div>

        </div>

      </div>

      {/* 3. ITEMIZED QUESTION SOLUTION REVIEW */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Pembahasan & Analisis Soal
              </h3>
              <p className="text-xs text-slate-500">
                Klik pada nomor soal untuk melihat kunci jawaban dan rumus penyelesaian detail.
              </p>
            </div>
          </div>
        </div>

        {/* Questions Accordion List */}
        <div className="space-y-3 pt-2">
          {MOCK_QUESTIONS.map((q) => {
            const userChoice = testResult?.userAnswers?.[q.id] || 'B'; // default fallback for preview
            const correctChoice = q.options.find(o => o.isCorrect)?.id;
            const isUserCorrect = userChoice === correctChoice;
            const isExpanded = expandedQuestion === q.id;

            return (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-150"
              >
                {/* Header item */}
                <button
                  onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                  className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                    isExpanded ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 ${
                      isUserCorrect ? 'bg-teal-100 text-teal-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {q.number}
                    </span>

                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                        {q.questionText}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Pilar: <strong className="text-slate-700">{q.competencyLabel}</strong> • Topik: {q.topic}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      isUserCorrect ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {isUserCorrect ? 'BENAR' : 'SALAH'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {/* Body expanded */}
                {isExpanded && (
                  <div className="p-5 bg-slate-50/50 border-t border-slate-200 space-y-4">
                    
                    <p className="text-xs text-slate-800 font-medium">
                      {q.questionText}
                    </p>

                    {/* Options status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt) => {
                        const isThisUserAnswer = userChoice === opt.id;
                        const isThisCorrect = opt.isCorrect;

                        let style = 'bg-white border-slate-200 text-slate-700';
                        if (isThisCorrect) {
                          style = 'bg-teal-50 border-teal-300 text-teal-900 font-bold';
                        } else if (isThisUserAnswer && !isThisCorrect) {
                          style = 'bg-red-50 border-red-300 text-red-900 font-bold';
                        }

                        return (
                          <div key={opt.id} className={`p-2.5 rounded-xl border flex items-center justify-between ${style}`}>
                            <span><strong>{opt.id}.</strong> {opt.text}</span>
                            {isThisCorrect && <span className="text-[10px] text-teal-700 font-extrabold uppercase">✓ Kunci</span>}
                            {isThisUserAnswer && !isThisCorrect && <span className="text-[10px] text-red-700 font-extrabold uppercase">✗ Jawaban Anda</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Step-by-step resolution box */}
                    <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-blue-800">
                        <Brain className="w-4 h-4" />
                        <span>Langkah Pembahasan Presisi:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* 4. SMART RECOMMENDATION ACTION CARD (CTA FOR LAB KONSEP NYATA) */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-indigo-500/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/30">
            <Rocket className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase">
                Visual Lab Simulation
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-black text-white">
              Perlu latihan nalar visual pada bab ini?
            </h3>
            <p className="text-xs text-slate-300 font-medium max-w-lg">
              Eksplorasi simulasi interaktif multi-mata pelajaran (Kalkulus, Fisika, Kimia, dll.) untuk memahami konsep rumus secara kontekstual.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSandbox}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          <span>Buka Lab Konsep Nyata 🧪</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
