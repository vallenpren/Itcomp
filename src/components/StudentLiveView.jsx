import React, { useState, useEffect, useRef } from 'react';
import { 
  Tv, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  MessageSquare,
  AlertCircle,
  Eye,
  Maximize2,
  Lock,
  MonitorOff,
  Presentation
} from 'lucide-react';
import MathVisualizer from './ConceptLab/MathVisualizer';
import PhysicsVisualizer from './ConceptLab/PhysicsVisualizer';
import ChemistryVisualizer from './ConceptLab/ChemistryVisualizer';
import BiologyVisualizer from './ConceptLab/BiologyVisualizer';
import EconomyVisualizer from './ConceptLab/EconomyVisualizer';
import InformaticsVisualizer from './ConceptLab/InformaticsVisualizer';
import { EXPERIMENTS_DATA } from '../data/conceptLabData';

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

export default function StudentLiveView({ 
  liveSession, 
  onExit, 
  onSubmitQuestion 
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [showEndedToast, setShowEndedToast] = useState(false);

  const studentScrollContainerRef = useRef(null);

  // Check if live session is currently active
  const isSessionLive = (liveSession?.isActive ?? true) && (liveSession?.isLive !== false);

  // Toast notification if session was active then ended
  useEffect(() => {
    if (!isSessionLive) {
      setShowEndedToast(true);
      const timer = setTimeout(() => setShowEndedToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isSessionLive]);

  // Active experiment data if lab mode
  const activeExpId = liveSession?.experimentId || '1A';
  const expData = EXPERIMENTS_DATA[activeExpId] || EXPERIMENTS_DATA['1A'];

  // Current Slide if PPT mode
  const slides = (liveSession?.slides && liveSession.slides.length > 0) ? liveSession.slides : MOCK_BUILTIN_SLIDES;
  const currentSlideIndex = liveSession?.currentSlideIndex ?? 0;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handleZoomIn = () => setZoomLevel(prev => Math.min(2.5, prev + 0.25));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(0.75, prev - 0.25));
  const handleZoomReset = () => setZoomLevel(1);

  // PREVENT MANUAL SCROLL & KEYBOARD NAV ON STUDENT SIDE (STRICT MIRRORING)
  useEffect(() => {
    if (!isSessionLive) return;
    const handleStudentKeyDown = (e) => {
      const keysToBlock = ['ArrowDown', 'ArrowUp', ' ', 'PageDown', 'PageUp'];
      if (keysToBlock.includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleStudentKeyDown);
    return () => window.removeEventListener('keydown', handleStudentKeyDown);
  }, [isSessionLive]);

  // AUTO-SCROLL FOLLOWING TEACHER SCROLL PERCENTAGE
  useEffect(() => {
    if (isSessionLive && liveSession?.scrollPercentage !== undefined && studentScrollContainerRef.current) {
      const el = studentScrollContainerRef.current;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll > 0) {
        el.scrollTo({
          top: liveSession.scrollPercentage * maxScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [isSessionLive, liveSession?.scrollPercentage, currentSlideIndex]);

  // LISTEN FOR DIRECT BROADCASTCHANNEL SCROLL EVENTS
  useEffect(() => {
    let channel;
    try {
      channel = new BroadcastChannel('smarttka_live_classroom');
      channel.onmessage = (e) => {
        if (e.data?.type === 'SYNC_SCROLL' && e.data?.scrollPercentage !== undefined) {
          if (studentScrollContainerRef.current) {
            const el = studentScrollContainerRef.current;
            const maxScroll = el.scrollHeight - el.clientHeight;
            if (maxScroll > 0) {
              el.scrollTo({
                top: e.data.scrollPercentage * maxScroll,
                behavior: 'smooth'
              });
            }
          }
        }
      };
    } catch (err) {}
    return () => {
      if (channel) channel.close();
    };
  }, []);

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    onSubmitQuestion(questionText);
    setQuestionText('');
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsQuestionModalOpen(false);
    }, 1800);
  };

  const handleQuickQuestionSelect = (presetText) => {
    setQuestionText(presetText);
  };

  // Render Visualizer based on subject
  const renderLabVisualizer = () => {
    const subjectId = expData?.subjectId || 'math';
    const consequence = expData?.calculateConsequence
      ? expData.calculateConsequence(liveSession.sliderValues)
      : null;

    const commonProps = {
      experimentId: activeExpId,
      sliderValues: liveSession.sliderValues,
      consequence,
      isSimulating: liveSession.isSimulating,
      simulationProgress: liveSession.simulationProgress,
      simulationTime: 4.0,
      hasRun: true
    };

    if (subjectId === 'math') return <MathVisualizer {...commonProps} />;
    if (subjectId === 'physics') return <PhysicsVisualizer {...commonProps} />;
    if (subjectId === 'chemistry') return <ChemistryVisualizer {...commonProps} />;
    if (subjectId === 'biology') return <BiologyVisualizer {...commonProps} />;
    if (subjectId === 'economy') return <EconomyVisualizer {...commonProps} />;
    if (subjectId === 'informatics') return <InformaticsVisualizer {...commonProps} />;
    return <PhysicsVisualizer {...commonProps} />;
  };

  // EMPTY STATE VIEW (IF ISLIVE === FALSE OR SESSION ENDED)
  if (!isSessionLive) {
    return (
      <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6 font-sans animate-fade-in">
        
        {/* TOAST NOTIFICATION FOR ENDED SESSION */}
        {showEndedToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-3 animate-bounce-slow">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Sesi presentasi kelas telah diakhiri oleh Guru.</span>
          </div>
        )}

        {/* CLEAN WHITE CARD CONTAINER (#FFFFFF) */}
        <div className="bg-white max-w-lg w-full rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 text-center space-y-6">
          
          <div className="w-20 h-20 rounded-3xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto shadow-inner">
            <MonitorOff className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Tidak Ada Presentasi Berlangsung
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-md mx-auto">
              Bapak/Ibu Guru belum memulai presentasi atau telah mengakhiri sesi tayang kelas. Layar materi akan muncul otomatis saat guru mulai menayangkan materi.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onExit}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs sm:text-sm border border-slate-200 transition-all shadow-xs active:scale-98"
            >
              Kembali ke Dashboard Siswa
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-900 flex flex-col font-sans overflow-y-auto">
      
      {/* 1. TOP LIVE HEADER (STUDENT MIRROR BAR) */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 text-[10px] font-black uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                LIVE MENYIMAK
              </span>
              <span className="text-xs font-black text-slate-900 hidden sm:inline">
                Kode Kelas: <span className="text-indigo-600 font-mono">{liveSession.classCode || 'TKA-882'}</span>
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 leading-none">
              Menyimak Presentasi Guru Real-Time 📱
            </h1>
          </div>
        </div>

        {/* EXIT BUTTON & ZOOM CONTROLS FOR STUDENT */}
        <div className="flex items-center gap-2">
          {liveSession.mode === 'ppt' && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-xl hover:bg-white text-slate-700 text-xs font-bold transition-all"
                title="Perkecil Slide"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold px-2 text-slate-700">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-xl hover:bg-white text-slate-700 text-xs font-bold transition-all"
                title="Perbesar Slide (Zoom In)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomReset}
                className="p-1.5 rounded-xl hover:bg-white text-slate-500 text-xs font-bold transition-all"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={onExit}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all border border-slate-200"
          >
            Tutup
          </button>
        </div>
      </header>

      {/* 2. SUB HEADER / LIVE STATUS BAR */}
      <div className="bg-emerald-50 border-b border-emerald-200 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs font-semibold text-emerald-950">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-700" />
          <span>Layar Guru Terhubung • Transmisi Real-time Tanpa Delay</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-700">
            Guru: <strong>Pak Budi, S.Pd.</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-[11px] flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            ● Terhubung Real-Time ke Layar Guru
          </span>
        </div>
      </div>

      {/* 3. MAIN MIRROR CANVAS CONTAINER (RESPONSIVE 16:9 SCREEN RATIO) */}
      <main className="flex-1 p-4 sm:p-6 bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* MOBILE ZOOM FLOATING TOOLBAR */}
        {liveSession.mode === 'ppt' && (
          <div className="sm:hidden absolute top-6 right-6 z-20 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700 flex items-center gap-1 shadow-lg text-white">
            <button onClick={handleZoomOut} className="p-2 hover:bg-slate-800 rounded-xl">
              <ZoomOut className="w-4 h-4 text-slate-300" />
            </button>
            <span className="text-xs font-mono font-extrabold px-1 text-white">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button onClick={handleZoomIn} className="p-2 hover:bg-slate-800 rounded-xl">
              <ZoomIn className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        )}

        {/* CONTAINER FOR PPT OR LAB SIMULATOR */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
          
          {/* MODE A: PPT SLIDES MIRROR */}
          {liveSession.mode === 'ppt' && (
            <div className="w-full space-y-4">
              
              {/* IF UPLOADED FILE IS PDF: RENDER REAL PDF IFRAME */}
              {liveSession?.fileType === 'pdf' && liveSession?.fileUrl ? (
                <div className="w-full bg-white rounded-3xl border border-slate-800 shadow-2xl p-2 sm:p-4">
                  <iframe
                    src={`${liveSession.fileUrl}#toolbar=0`}
                    className="w-full h-[500px] rounded-2xl border border-slate-200 bg-white"
                    title="Slide Presentasi Guru PDF"
                  />
                </div>
              ) : liveSession?.fileType === 'image' && liveSession?.fileUrl ? (
                /* IF UPLOADED FILE IS IMAGE: RENDER IMAGE */
                <div className="w-full bg-white rounded-3xl border border-slate-800 shadow-2xl p-2 sm:p-4 flex justify-center">
                  <img
                    src={liveSession.fileUrl}
                    alt="Slide Presentasi Guru"
                    className="max-h-[500px] w-auto object-contain rounded-2xl border border-slate-200"
                  />
                </div>
              ) : (
                /* SLIDE ASPECT RATIO 16:9 CARD WITH STRICT SCROLL LOCK & AUTO-SCROLL MIRROR */
                <div className="w-full bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden p-2 sm:p-4 relative">
                  <div 
                    ref={studentScrollContainerRef}
                    className="w-full aspect-video max-h-[500px] overflow-y-auto bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl border border-slate-700/80 p-6 sm:p-10 text-white flex flex-col justify-between shadow-inner relative transition-transform duration-200 origin-center select-none"
                    style={{ 
                      transform: `scale(${zoomLevel})`,
                      touchAction: 'none'
                    }}
                  >
                    {/* Top Slide Header */}
                    <div className="flex justify-between items-start shrink-0">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-extrabold uppercase">
                          {currentSlide?.subtitle || 'Materi Kelas Live'}
                        </span>
                        <h2 className="text-xl sm:text-3xl font-black text-white mt-3 tracking-tight">
                          {currentSlide?.title || 'Slide Materi Guru'}
                        </h2>
                      </div>

                      <div className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                        Slide {currentSlideIndex + 1} / {slides.length}
                      </div>
                    </div>

                    {/* Main Slide Body */}
                    <div className="my-4 space-y-4">
                      <p className="text-sm sm:text-lg text-slate-200 leading-relaxed font-medium">
                        {currentSlide?.content}
                      </p>

                      {currentSlide?.formula && (
                        <div className="p-4 rounded-2xl bg-indigo-900/40 border border-indigo-500/30 font-mono text-sm sm:text-xl font-bold text-indigo-300 text-center shadow-inner">
                          {currentSlide.formula}
                        </div>
                      )}

                      {currentSlide?.bulletPoints && (
                        <div className="space-y-2">
                          {currentSlide.bulletPoints.map((pt, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-base text-slate-300 font-medium">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Slide Footer Info */}
                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-semibold shrink-0">
                      <span>SmartTKA Live Synchronized Presentation</span>
                      <span>Diperbarui Oleh Guru</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE NAVIGATION MIRROR INDICATOR */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-2">
                <span>Gunakan tombol zoom jika teks slide terasa kecil di Layar HP Anda</span>
                <span className="font-mono text-indigo-400 font-bold">
                  ● Halaman {currentSlideIndex + 1} dari {slides.length}
                </span>
              </div>

            </div>
          )}

          {/* MODE B: LAB SIMULATOR MIRROR */}
          {liveSession.mode === 'lab' && (
            <div className="w-full space-y-4">
              
              <div className="bg-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-black uppercase text-emerald-400 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800">
                      Live Mirror Simulator
                    </span>
                    <h2 className="text-lg font-bold text-white mt-1">{expData.title}</h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                    ID Modul: {expData.id}
                  </span>
                </div>

                {renderLabVisualizer()}
              </div>

            </div>
          )}

        </div>
      </main>

      {/* FLOATING STATUS BADGE (BOTTOM LEFT): LAYAR TERKUNCI — MENGIKUTI TAMPILAN GURU SECARA OTOMATIS */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="bg-slate-900/80 text-white text-xs px-3.5 py-2 rounded-full shadow-lg backdrop-blur-md border border-slate-700/80 flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-medium">🔒 Layar Terkunci — Mengikuti Tampilan Guru Secara Otomatis</span>
        </div>
      </div>

      {/* 4. FLOATING BUTTON: AJUKAN PERTANYAAN NALAR ✋ (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsQuestionModalOpen(true)}
          className="px-5 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-2xl shadow-amber-500/40 border-2 border-amber-300 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 animate-bounce-slow"
        >
          <span className="text-xl">✋</span>
          <span>Ajukan Pertanyaan Nalar</span>
        </button>
      </div>

      {/* 5. QUESTION MODAL / DRAWER FOR STUDENT */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 font-sans animate-fade-in">
          <div className="bg-white max-w-lg w-full rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-5 relative">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Ajukan Pertanyaan Nalar</h3>
                  <p className="text-xs text-slate-500">Tanda bingung akan terkirim langsung ke layar laptop Guru.</p>
                </div>
              </div>

              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-black text-emerald-900 text-base">Pertanyaan Berhasil Terkirim!</h4>
                <p className="text-xs text-emerald-700 font-semibold">
                  Tanda bingung Anda sudah masuk ke notifikasi layar Ibu/Bapak Guru.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuestion} className="space-y-4">
                
                {/* PRESET QUICK QUESTIONS */}
                <div>
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2">
                    Pilih Pertanyaan Cepat:
                  </span>
                  <div className="space-y-2">
                    {[
                      "Saya belum paham turunan f'(t) pada kecepatan roket.",
                      "Mengapa sudut 45° memberikan jarak jangkauan paling jauh?",
                      "Mohon ulangi penjelasan poin kedua pada slide ini."
                    ].map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleQuickQuestionSelect(preset)}
                        className="w-full p-3 rounded-xl bg-slate-50 hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 text-left text-xs font-semibold text-slate-700 transition-all"
                      >
                        ✋ "{preset}"
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 block mb-1.5">
                    Atau Ketik Pertanyaan Anda:
                  </label>
                  <textarea
                    rows={3}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Tuliskan bagian materi yang membuat Anda bingung..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 fill-slate-950" />
                    <span>Kirim ke Guru</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
