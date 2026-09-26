import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Grid, 
  X, 
  Send,
  Shield,
  BookOpen,
  Maximize2,
  Minimize2,
  Info
} from 'lucide-react';
import { MOCK_QUESTIONS } from '../data/mockData';

export default function TestRoom({ assessment, onFinishTest, onCancelTest }) {
  const questions = MOCK_QUESTIONS;
  const totalQuestions = questions.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: 'A' | 'B' | ... }
  const [hesitantFlags, setHesitantFlags] = useState({}); // { [questionId]: boolean }
  
  // Timer setup: 30 minutes in seconds = 1800
  const [timeLeft, setTimeLeft] = useState(assessment.durationMinutes * 60 || 1800);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const currentQuestion = questions[currentIndex];

  // Live Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const toggleHesitant = () => {
    setHesitantFlags(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinalSubmit = () => {
    // Calculate final scores
    let correctCount = 0;
    const details = questions.map(q => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.options.find(o => o.isCorrect)?.id;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect,
        isHesitant: !!hesitantFlags[q.id],
        competency: q.competency
      };
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    onFinishTest({
      assessmentId: assessment.id,
      score: scorePercentage,
      correctCount,
      totalQuestions,
      details,
      userAnswers,
      timeSpentSeconds: (assessment.durationMinutes * 60) - timeLeft
    });
  };

  // Stats for submission confirmation
  const answeredCount = Object.keys(userAnswers).length;
  const hesitantCount = Object.values(hesitantFlags).filter(Boolean).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex flex-col overflow-hidden">
      
      {/* 1. TOP HEADER (DISTRACTION FREE) */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-xs z-20">
        
        {/* Left: Test Title & Mode Info */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Mode Anti-Distraksi</span>
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight truncate max-w-[200px] sm:max-w-md">
              {assessment.title}
            </h2>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Soal {currentIndex + 1} dari {totalQuestions} • {currentQuestion.topic}
            </p>
          </div>
        </div>

        {/* Center/Right: Timer & Question Drawer Trigger */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Live Countdown Timer */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-extrabold font-mono transition-colors ${
            timeLeft < 300 
              ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
              : 'bg-slate-100 text-slate-800 border-slate-200'
          }`}>
            <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-red-600' : 'text-blue-600'}`} />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Drawer Grid Toggle Button */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors border border-slate-200"
            title="Buka Grid Nomor Soal"
          >
            <Grid className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Nomor Soal</span>
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-extrabold">
              {currentIndex + 1}
            </span>
          </button>

          {/* Cancel / Exit Ujian */}
          <button
            onClick={onCancelTest}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            title="Keluar dari Ujian"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </header>

      {/* 2. MAIN QUESTION CANVAS AREA */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Question & Options Column */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-4xl mx-auto w-full flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Question Indicator Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-extrabold">
                  SOAL NO. {currentIndex + 1}
                </span>
                <span className="text-xs font-semibold text-slate-500 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
                  {currentQuestion.competencyLabel}
                </span>
              </div>

              {hesitantFlags[currentQuestion.id] && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold animate-bounce">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  Status: Ragu-ragu
                </span>
              )}
            </div>

            {/* Question Text Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
                {currentQuestion.questionText}
              </p>

              {/* Code/Formula box if available */}
              {currentQuestion.hasCodeOrFormula && (
                <div className="p-4 rounded-xl bg-slate-900 text-teal-300 font-mono text-xs sm:text-sm border border-slate-800 shadow-inner">
                  <span className="text-slate-500 select-none">// Persamaan Matematis:</span>
                  <p className="mt-1 font-bold text-white">{currentQuestion.formulaSnippet}</p>
                </div>
              )}
            </div>

            {/* Options List (A, B, C, D, E) */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Pilih Jawaban Yang Paling Tepat:
              </p>

              {currentQuestion.options.map((option) => {
                const isSelected = userAnswers[currentQuestion.id] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-150 flex items-start gap-4 ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-600 shadow-md shadow-blue-500/10'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    {/* Option Badge A-E */}
                    <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-extrabold text-sm transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}>
                      {option.id}
                    </div>

                    {/* Option Text */}
                    <div className="flex-1 pt-1">
                      <p className={`text-sm sm:text-base font-semibold transition-colors ${
                        isSelected ? 'text-blue-900 font-bold' : 'text-slate-800'
                      }`}>
                        {option.text}
                      </p>
                    </div>

                    {/* Selected Check Pill */}
                    {isSelected && (
                      <div className="shrink-0 text-blue-600 pt-1">
                        <CheckCircle2 className="w-5 h-5 fill-blue-600 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

          </div>

          {/* 3. CONTROL FOOTER BUTTONS */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                currentIndex === 0
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {/* Middle: Hesitant Button */}
            <button
              onClick={toggleHesitant}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all border ${
                hesitantFlags[currentQuestion.id]
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{hesitantFlags[currentQuestion.id] ? 'Ragu-ragu (Aktif)' : 'Tandai Ragu-ragu'}</span>
            </button>

            {/* Right: Next or Submit */}
            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Selesaikan Ujian</span>
              </button>
            )}

          </div>

        </main>

        {/* 4. QUESTION NUMBER DRAWER / GRID SIDEBAR */}
        <aside className={`fixed md:relative right-0 top-0 bottom-0 w-80 bg-white border-l border-slate-200 z-30 flex flex-col transition-transform duration-300 shadow-2xl md:shadow-none ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}>
          
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Grid className="w-4 h-4 text-blue-600" />
              <h3 className="font-extrabold text-slate-900 text-sm">Navigasi Nomor Soal</h3>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Color Legend Info */}
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 grid grid-cols-3 gap-2 text-[10px] font-bold text-center">
            <div className="flex items-center justify-center gap-1.5 p-1 rounded bg-teal-50 border border-teal-200 text-teal-700">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
              <span>Terisi</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-1 rounded bg-amber-50 border border-amber-200 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Ragu-ragu</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-1 rounded bg-slate-100 border border-slate-200 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span>Belum</span>
            </div>
          </div>

          {/* Interactive Question Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const isAnswered = !!userAnswers[q.id];
                const isHesitant = !!hesitantFlags[q.id];
                const isCurrent = idx === currentIndex;

                let btnStyles = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                if (isHesitant) {
                  btnStyles = 'bg-amber-500 text-white border-amber-600 font-bold shadow-sm';
                } else if (isAnswered) {
                  btnStyles = 'bg-teal-600 text-white border-teal-700 font-bold shadow-sm';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsDrawerOpen(false);
                    }}
                    className={`h-11 rounded-xl border flex flex-col items-center justify-center transition-all text-xs relative ${btnStyles} ${
                      isCurrent ? 'ring-4 ring-blue-500/30 font-extrabold scale-105 z-10' : ''
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {userAnswers[q.id] && (
                      <span className="text-[9px] opacity-90 leading-none">
                        ({userAnswers[q.id]})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer Submit */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
              <span>Terjawab:</span>
              <span className="font-bold text-slate-900">{answeredCount} / {totalQuestions}</span>
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Selesaikan Ujian Sekarang</span>
            </button>
          </div>

        </aside>

      </div>

      {/* 5. CONFIRMATION SUBMISSION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <Send className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              Konfirmasi Selesai Ujian
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Apakah Anda yakin ingin mengakhiri dan mengirim jawaban asesmen ini?
            </p>

            {/* Stat Summary Box */}
            <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Soal Terjawab:</span>
                <span className="font-bold text-teal-700">{answeredCount} Soal</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Status Ragu-ragu:</span>
                <span className="font-bold text-amber-600">{hesitantCount} Soal</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Belum Dikerjakan:</span>
                <span className="font-bold text-red-600">{unansweredCount} Soal</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors"
              >
                Kembali Periksa
              </button>

              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-md shadow-teal-600/20"
              >
                Ya, Kirim Jawaban
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
