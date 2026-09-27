import React, { useState, useEffect, useRef } from 'react';
import { 
  Tv, 
  X, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Sliders, 
  Sparkles,
  Rocket,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Users,
  FileText,
  Layers,
  MessageSquare,
  RefreshCw,
  UploadCloud,
  FileCheck,
  AlertCircle,
  File
} from 'lucide-react';
import MathVisualizer from './ConceptLab/MathVisualizer';
import PhysicsVisualizer from './ConceptLab/PhysicsVisualizer';
import ChemistryVisualizer from './ConceptLab/ChemistryVisualizer';
import BiologyVisualizer from './ConceptLab/BiologyVisualizer';
import EconomyVisualizer from './ConceptLab/EconomyVisualizer';
import InformaticsVisualizer from './ConceptLab/InformaticsVisualizer';
import { EXPERIMENTS_DATA, SUBJECT_CLUSTERS } from '../data/conceptLabData';

const MOCK_BUILTIN_SLIDES = [
  {
    id: 1,
    title: 'Slide 1: Judul Bab & Tujuan Pembelajaran Hari Ini',
    subtitle: 'Modul TKA Fisika & Kalkulus Trajektori Parabola',
    content: 'Tujuan Pembelajaran: Memahami penerapan turunan fungsi f\'(t) = dv/dt untuk menentukan posisi instan, laju puncak, dan jangkauan maksimum benda yang bergerak dalam kurva parabola.',
    formula: 'y(t) = v_{0y} \\cdot t - \\frac{1}{2} g t^2',
    bulletPoints: [
      'Membedakan komponen vektor gerak GLB (sumbu X) dan GLBB (sumbu Y).',
      'Menghitung waktu puncak t_peak saat vy = 0.',
      'Menganalisis pengaruh sudut elevasi θ terhadap jangkauan X_max.'
    ]
  },
  {
    id: 2,
    title: 'Slide 2: Studi Kasus Konsep Nyata (Kalkulus & Aerodinamika)',
    subtitle: 'Peluncuran Roket & Satelit LEO di Industri Kedirgantaraan',
    content: 'Insinyur kedirgantaraan menggunakan kalkulus diferensial untuk mengatur sudut peluncuran roket agar mendapatkan dorongan lepas tanpa membakar struktur pesawat saat menembus atmosfer tebal.',
    formula: 'f\'(t) = \\frac{dv}{dt} = \\frac{F_{dorong} - m(t) \\cdot g - F_{hambat}}{m(t)}',
    bulletPoints: [
      'Massa roket m(t) berkurang drastis seiring pembakaran bahan bakar.',
      'Sudut elevasi optimal 45° - 75° meminimalkan hambatan gesek udara.',
      'Grafik laju perubahan instan menentukan titik orbit stabil.'
    ]
  },
  {
    id: 3,
    title: 'Slide 3: Pertanyaan Pemantik Diskusi Nalar Siswa',
    subtitle: 'Uji Pemahaman Konsep Trajektori & Turunan',
    content: 'Sebuah roket uji diluncurkan dengan kecepatan awal v0 = 20 m/s. Jika sudut elevasi dinaikkan dari 30° ke 45°, apa yang terjadi pada ketinggian maksimum dan waktu terbangnya?',
    formula: 'h_{max} = \\frac{v_0^2 \\sin^2\\theta}{2g}',
    bulletPoints: [
      'Apakah ketinggian maksimum bertambah? (Diskusi sin^2(45°) vs sin^2(30°))',
      'Apakah waktu terbang bertambah panjang?',
      'Ketuk tombol "Ajukan Pertanyaan Nalar ✋" pada HP Anda jika ingin berdiskusi!'
    ]
  }
];

export default function ProjectorView({ 
  liveSession,
  onUpdateLiveSession,
  onExit
}) {
  const isPptMode = liveSession?.mode === 'ppt';
  const isLabMode = liveSession?.mode === 'lab';

  // Active lab experiment ID & data
  const [activeExpId, setActiveExpId] = useState(liveSession?.experimentId || '1A');
  const expData = EXPERIMENTS_DATA[activeExpId] || EXPERIMENTS_DATA['1A'];

  // Slider state for experiment
  const [sliderValues, setSliderValues] = useState(
    liveSession?.sliderValues || { angle: 45, v0: 20, fuelBurnRate: 150, payloadMass: 4000, launchAngle: 75 }
  );

  const [activePreset, setActivePreset] = useState(liveSession?.activePreset || 'success');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(100);
  const [simulationTime, setSimulationTime] = useState(4.0);
  const [hasRun, setHasRun] = useState(true);

  // Questions drawer state
  const [isQuestionsDrawerOpen, setIsQuestionsDrawerOpen] = useState(false);

  // File Upload State in Projector
  const [isDragging, setIsDragging] = useState(false);

  const timerRef = useRef(null);
  const teacherScrollContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // PPT Navigation state
  const slides = (liveSession?.slides && liveSession.slides.length > 0) ? liveSession.slides : MOCK_BUILTIN_SLIDES;
  const currentSlideIndex = liveSession?.currentSlideIndex ?? 0;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      const nextIdx = currentSlideIndex - 1;
      onUpdateLiveSession({ currentSlideIndex: nextIdx, scrollPercentage: 0 });
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      const nextIdx = currentSlideIndex + 1;
      onUpdateLiveSession({ currentSlideIndex: nextIdx, scrollPercentage: 0 });
    }
  };

  // Keyboard navigation listener (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isPptMode) {
        if (e.key === 'ArrowLeft') {
          handlePrevSlide();
        } else if (e.key === 'ArrowRight') {
          handleNextSlide();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPptMode, currentSlideIndex, slides.length]);

  // LIVE SCROLL MIRRORING SENDER HANDLER (TEACHER SIDE)
  const handleTeacherContainerScroll = () => {
    if (!teacherScrollContainerRef.current) return;
    const el = teacherScrollContainerRef.current;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) return;
    const scrollPct = el.scrollTop / maxScroll;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      onUpdateLiveSession({ scrollPercentage: scrollPct });
      try {
        const channel = new BroadcastChannel('smarttka_live_classroom');
        channel.postMessage({
          type: 'SYNC_SCROLL',
          scrollPercentage: scrollPct,
          currentSlide: currentSlideIndex
        });
        channel.close();
      } catch (e) {}
    }, 20);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleApplyPresetSuccess = () => {
    setActivePreset('success');
    const newVals = { ...sliderValues, angle: 45, v0: 20, fuelBurnRate: 180, payloadMass: 3500, launchAngle: 75 };
    setSliderValues(newVals);
    onUpdateLiveSession({ sliderValues: newVals, activePreset: 'success' });
    triggerRun();
  };

  const handleApplyPresetFail = () => {
    setActivePreset('fail');
    const newVals = { ...sliderValues, angle: 15, v0: 10, fuelBurnRate: 60, payloadMass: 9000, launchAngle: 30 };
    setSliderValues(newVals);
    onUpdateLiveSession({ sliderValues: newVals, activePreset: 'fail' });
    triggerRun();
  };

  const triggerRun = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSimulating(true);
    setHasRun(true);
    setSimulationProgress(0);
    setSimulationTime(0);

    onUpdateLiveSession({ isSimulating: true, simulationProgress: 0 });

    const totalDurationSec = 4;
    const intervalMs = 50;
    const totalSteps = (totalDurationSec * 1000) / intervalMs;
    let step = 0;

    timerRef.current = setInterval(() => {
      step++;
      const pct = Math.min(100, (step / totalSteps) * 100);
      const timeSec = Math.min(totalDurationSec, (step / totalSteps) * totalDurationSec);
      setSimulationProgress(pct);
      setSimulationTime(timeSec);

      if (step >= totalSteps) {
        clearInterval(timerRef.current);
        setIsSimulating(false);
        onUpdateLiveSession({ isSimulating: false, simulationProgress: 100 });
      }
    }, intervalMs);
  };

  useEffect(() => {
    if (isLabMode) {
      triggerRun();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeExpId, isLabMode]);

  // Handle direct file upload from projector view
  const handleFileUpload = (file) => {
    if (liveSession?.fileUrl) {
      URL.revokeObjectURL(liveSession.fileUrl);
    }
    const fileUrl = URL.createObjectURL(file);
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImg = file.type.startsWith('image/') || /\.(png|jpg|jpeg|webp)$/i.test(file.name);
    const isPptx = file.name.toLowerCase().endsWith('.pptx') || file.name.toLowerCase().endsWith('.ppt');

    let fileType = 'pdf';
    if (isImg) fileType = 'image';
    if (isPptx) fileType = 'pptx';

    onUpdateLiveSession({
      pptFileName: file.name,
      fileUrl: fileUrl,
      fileType: fileType,
      isUploadedFile: true,
      currentSlideIndex: 0,
      scrollPercentage: 0
    });
  };

  const consequence = expData?.calculateConsequence
    ? expData.calculateConsequence(sliderValues)
    : null;

  // Render Visualizer based on subject
  const renderLabVisualizer = () => {
    const subjectId = expData?.subjectId || 'math';
    const commonProps = {
      experimentId: activeExpId,
      sliderValues,
      consequence,
      isSimulating,
      simulationProgress,
      simulationTime,
      hasRun
    };

    if (subjectId === 'math') return <MathVisualizer {...commonProps} />;
    if (subjectId === 'physics') return <PhysicsVisualizer {...commonProps} />;
    if (subjectId === 'chemistry') return <ChemistryVisualizer {...commonProps} />;
    if (subjectId === 'biology') return <BiologyVisualizer {...commonProps} />;
    if (subjectId === 'economy') return <EconomyVisualizer {...commonProps} />;
    if (subjectId === 'informatics') return <InformaticsVisualizer {...commonProps} />;
    return <PhysicsVisualizer {...commonProps} />;
  };

  const questions = liveSession?.questions || [];
  const unreadQuestions = questions.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col font-sans overflow-y-auto">
      
      {/* 1. BROADCAST STATUS BAR (TEACHER SIDE) */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4 shrink-0 shadow-xl">
        
        {/* LEFT: TITLE & LIVE BADGE */}
        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Tv className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-black uppercase flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  🔴 LIVE MENYIARKAN KE KELAS
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hidden sm:inline">
                  Siswa Otomatis Terhubung ({liveSession?.connectedCount || 32}/32)
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white mt-1">
                Layar Proyektor Kelas — {isLabMode ? 'Laboratorium Simulasi Nyata' : 'Tayangan Slide Materi'}
              </h1>
            </div>
          </div>
        </div>

        {/* MIDDLE: SLIDE NAVIGATION CONTROLS (FINGER-FRIENDLY & RESPONSIVE TO KEYBOARD) */}
        {isPptMode && (
          <div className="flex items-center gap-3 bg-slate-800/90 p-2 rounded-2xl border border-slate-700 shadow-inner">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
              className={`px-5 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all active:scale-95 ${
                currentSlideIndex === 0
                  ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>&lt; Slide Sebelumnya</span>
            </button>

            <span className="px-3 text-xs font-mono font-extrabold text-slate-300">
              {currentSlideIndex + 1} / {slides.length}
            </span>

            <button
              onClick={handleNextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className={`px-5 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all active:scale-95 ${
                currentSlideIndex === slides.length - 1
                  ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
              }`}
            >
              <span>Slide Berikutnya &gt;</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* RIGHT: STUDENT QUESTION BADGE & EXIT BUTTON */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          
          {/* QUESTION INDICATOR BADGE */}
          <button
            onClick={() => setIsQuestionsDrawerOpen(true)}
            className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95 relative"
          >
            <span className="text-base">✋</span>
            <span>Pertanyaan Siswa</span>
            {unreadQuestions > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-xs font-black">
                {unreadQuestions}
              </span>
            )}
          </button>

          {/* EXIT BUTTON */}
          <button
            onClick={onExit}
            className="px-5 py-3 rounded-2xl bg-red-600/90 hover:bg-red-600 text-white font-extrabold text-sm transition-all shadow-lg flex items-center gap-2 active:scale-95"
          >
            <X className="w-5 h-5" />
            <span>Selesai Siaran</span>
          </button>
        </div>

      </header>

      {/* 2. MODE SWITCHER & QUICK PRESETS BAR */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* MODE TOGGLE (LAB vs PPT) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateLiveSession({ mode: 'lab' })}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              isLabMode
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>🚀 Mode Lab Simulasi</span>
          </button>

          <button
            onClick={() => onUpdateLiveSession({ mode: 'ppt' })}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              isPptMode
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>📑 Mode Slide PPT / PDF</span>
          </button>
        </div>

        {/* LAB PRESET BUTTONS (IF LAB MODE) */}
        {isLabMode && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase hidden sm:inline">Preset Skenario:</span>
            <button
              onClick={handleApplyPresetSuccess}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 ${
                activePreset === 'success'
                  ? 'bg-emerald-500 text-white ring-2 ring-emerald-400/40'
                  : 'bg-slate-800 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>🟢 Sukses (Optimal)</span>
            </button>

            <button
              onClick={handleApplyPresetFail}
              className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 ${
                activePreset === 'fail'
                  ? 'bg-red-500 text-white ring-2 ring-red-400/40'
                  : 'bg-slate-800 text-red-300 border border-red-500/30'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>🔴 Gagal (Krisis)</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. MAIN BROADCAST CANVAS AREA */}
      <main className="flex-1 p-6 max-w-6xl w-full mx-auto flex flex-col justify-center space-y-6">
        
        {/* MODE A: LAB SIMULATION */}
        {isLabMode && (
          <div className="space-y-6">
            
            {/* TOPIC PICKER FOR TEACHER */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {Object.values(EXPERIMENTS_DATA).slice(0, 6).map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => {
                    setActiveExpId(exp.id);
                    onUpdateLiveSession({ experimentId: exp.id });
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    activeExpId === exp.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {exp.id}: {exp.subjectName}
                </button>
              ))}
            </div>

            {/* VISUALIZER CANVAS */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl">
              {renderLabVisualizer()}
            </div>

            {/* SLIDERS & RE-RUN CONTROL FOR TEACHER */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-medium">
                Setiap perubahan slider pada laptop guru langsung tersinkronkan ke HP seluruh siswa di kelas.
              </div>

              <button
                onClick={triggerRun}
                disabled={isSimulating}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm transition-all shadow-xl flex items-center gap-2 shrink-0 active:scale-95"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>{isSimulating ? 'Simulasi Berjalan...' : 'Jalankan Ulang Simulasi'}</span>
              </button>
            </div>

          </div>
        )}

        {/* MODE B: PPT / PDF SLIDES */}
        {isPptMode && (
          <div className="space-y-6">

            {/* IF UPLOADED FILE IS PDF: RENDER REAL PDF IFRAME */}
            {liveSession?.fileType === 'pdf' && liveSession?.fileUrl ? (
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xl space-y-4">
                <iframe
                  src={`${liveSession.fileUrl}#toolbar=0`}
                  className="w-full h-[540px] rounded-2xl border border-slate-200 bg-white"
                  title="Slide Presentasi Guru PDF"
                />
              </div>
            ) : liveSession?.fileType === 'image' && liveSession?.fileUrl ? (
              /* IF UPLOADED FILE IS IMAGE: RENDER IMAGE CANVAS */
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xl space-y-4 flex flex-col items-center justify-center min-h-[500px]">
                <img
                  src={liveSession.fileUrl}
                  alt="Slide Presentasi Guru"
                  className="max-h-[520px] w-auto object-contain rounded-2xl border border-slate-200"
                />
              </div>
            ) : (
              /* OTHERWISE (PPTX FALLBACK OR BUILT-IN MOCK SLIDES): RENDER CLEAN LIGHT SLIDE CANVAS */
              <div className="space-y-4">
                
                {liveSession?.fileType === 'pptx' && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>
                        <strong>Tips Guru:</strong> Untuk tampilan paling mulus tanpa delay di HP siswa, ekspor PPT Anda ke format <strong>PDF</strong>. Pratinjau slide otomatis siap digunakan di bawah.
                      </span>
                    </div>
                  </div>
                )}

                {/* CLEAN LIGHT 16:9 SLIDE CONTAINER WITH LIVE SCROLL MIRRORING */}
                <div 
                  ref={teacherScrollContainerRef}
                  onScroll={handleTeacherContainerScroll}
                  className="w-full bg-white text-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6 min-h-[460px] max-h-[520px] overflow-y-auto flex flex-col justify-between aspect-video relative transition-all"
                >
                  
                  <div className="flex items-start justify-between border-b border-slate-100 pb-4 shrink-0">
                    <div>
                      <span className="px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-black uppercase">
                        {currentSlide?.subtitle || 'Materi Pembelajaran Hari Ini'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
                        {currentSlide?.title}
                      </h2>
                    </div>

                    <span className="px-4 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-extrabold text-slate-700">
                      Slide {currentSlideIndex + 1} dari {slides.length}
                    </span>
                  </div>

                  <div className="my-4 space-y-4 flex-1 flex flex-col justify-center">
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                      {currentSlide?.content}
                    </p>

                    {currentSlide?.formula && (
                      <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 font-mono text-xl sm:text-2xl font-bold text-indigo-900 text-center shadow-inner">
                        {currentSlide.formula}
                      </div>
                    )}

                    {currentSlide?.bulletPoints && (
                      <div className="space-y-2 pt-2">
                        {currentSlide.bulletPoints.map((pt, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-medium">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SLIDE NAVIGATION CONTROLS */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between shrink-0">
                    <button
                      onClick={handlePrevSlide}
                      disabled={currentSlideIndex === 0}
                      className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-black text-xs sm:text-sm flex items-center gap-2 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>&lt; Slide Sebelumnya</span>
                    </button>

                    <div className="flex gap-2">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => onUpdateLiveSession({ currentSlideIndex: i, scrollPercentage: 0 })}
                          className={`w-3 h-3 rounded-full transition-all ${
                            currentSlideIndex === i ? 'bg-indigo-600 w-8' : 'bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNextSlide}
                      disabled={currentSlideIndex === slides.length - 1}
                      className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 text-white font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
                    >
                      <span>Slide Berikutnya &gt;</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* STATUS BAR & DRAG-AND-DROP FILE PICKER IN PROJECTOR */}
            <div className="bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                      ✓ File Berhasil Dimuat
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Slide {currentSlideIndex + 1} / {slides.length}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {liveSession?.pptFileName || 'Modul_TKA_Fisika_Kalkulus_Socratix.pptx'}
                  </p>
                </div>
              </div>

              {/* UPLOAD ACTION BOX: REPLACEMENT FILE PICKER */}
              <label className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 shrink-0">
                <UploadCloud className="w-4 h-4" />
                <span>Unggah File Lain (.PDF / Gambar / PPTX)</span>
                <input
                  type="file"
                  accept=".pdf,.pptx,.ppt,.png,.jpg,.jpeg,.webp"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </label>

            </div>

          </div>
        )}

      </main>

      {/* 4. STUDENT QUESTIONS DRAWER / MODAL */}
      {isQuestionsDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end font-sans">
          <div className="bg-white text-slate-900 w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between border-l border-slate-200 animate-slide-left">
            
            <div className="space-y-4 overflow-y-auto flex-1">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    ✋
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Pertanyaan Nalar Siswa</h3>
                    <p className="text-xs text-slate-500">{questions.length} siswa mengajukan tanda bingung.</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsQuestionsDrawerOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {questions.length === 0 ? (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <MessageSquare className="w-10 h-10 mx-auto opacity-50" />
                  <p className="text-sm font-semibold">Belum ada pertanyaan dari siswa.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {questions.map((q) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-amber-900 font-extrabold">{q.studentName}</span>
                        <span className="text-amber-700 text-[10px]">{q.time}</span>
                      </div>
                      <p className="text-xs text-slate-800 font-medium leading-relaxed">
                        "{q.text}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsQuestionsDrawerOpen(false)}
                className="w-full py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-xs"
              >
                Tutup Panel Pertanyaan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
