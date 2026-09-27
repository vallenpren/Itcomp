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
  File,
  Pencil,
  Eraser,
  Trash2,
  MousePointer
} from 'lucide-react';
import MathVisualizer from './ConceptLab/MathVisualizer';
import PhysicsVisualizer from './ConceptLab/PhysicsVisualizer';
import ChemistryVisualizer from './ConceptLab/ChemistryVisualizer';
import BiologyVisualizer from './ConceptLab/BiologyVisualizer';
import EconomyVisualizer from './ConceptLab/EconomyVisualizer';
import InformaticsVisualizer from './ConceptLab/InformaticsVisualizer';
import SimulationErrorBoundary from './ConceptLab/SimulationErrorBoundary';
import { EXPERIMENTS_DATA, SUBJECT_CLUSTERS, generateCustomSlidesDeck } from '../data/conceptLabData';

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

  // Helper to extract default slider values for an experiment
  const getExperimentDefaultSliders = (expId) => {
    const exp = EXPERIMENTS_DATA[expId] || EXPERIMENTS_DATA['1A'];
    const defaults = {};
    if (exp && exp.controls) {
      exp.controls.forEach(ctrl => {
        defaults[ctrl.id] = ctrl.defaultVal;
      });
    }
    return defaults;
  };

  // Active lab experiment ID & data
  const [activeExpId, setActiveExpId] = useState(liveSession?.experimentId || '1A');

  useEffect(() => {
    if (liveSession?.experimentId && liveSession.experimentId !== activeExpId) {
      setActiveExpId(liveSession.experimentId);
    }
  }, [liveSession?.experimentId]);

  const expData = EXPERIMENTS_DATA[activeExpId] || EXPERIMENTS_DATA['1A'];

  // Slider state for experiment
  const [sliderValues, setSliderValues] = useState(() => {
    return liveSession?.sliderValues || getExperimentDefaultSliders(activeExpId);
  });

  useEffect(() => {
    if (liveSession?.sliderValues) {
      setSliderValues(liveSession.sliderValues);
    } else {
      setSliderValues(getExperimentDefaultSliders(activeExpId));
    }
  }, [activeExpId, liveSession?.sliderValues]);

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
  // PPT Navigation state & Dynamic Slide Count
  const hasUploadedFile = !!(liveSession?.isUploadedFile || liveSession?.fileUrl);
  const slides = (liveSession?.slides && liveSession.slides.length > 0) 
    ? liveSession.slides 
    : (hasUploadedFile || liveSession?.totalSlides !== undefined)
      ? Array.from({ length: liveSession?.totalSlides || 1 }, (_, i) => ({
          title: liveSession?.topicTitle || liveSession?.pptFileName || `Slide Halaman ${i + 1}`,
          subtitle: 'Materi Kelas Live',
          content: 'Materi presentasi yang diunggah oleh Guru.'
        }))
      : MOCK_BUILTIN_SLIDES;

  const realTotalSlides = liveSession?.totalSlides || slides.length || 1;
  const currentSlideIndex = liveSession?.currentSlideIndex ?? 0;
  const currentSlide = slides[currentSlideIndex] || slides[0];

  // Live Annotation Canvas State (Feature 2)
  const teacherCanvasRef = useRef(null);
  const [activeTool, setActiveTool] = useState('cursor'); // 'cursor' | 'pen' | 'eraser'
  const [penColor, setPenColor] = useState('#EF4444');
  const [penWidth, setPenWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [slideDrawings, setSlideDrawings] = useState({}); // { [slideIndex]: dataUrl }

  // Resize and redraw canvas
  const resizeAndRedrawCanvas = () => {
    const canvas = teacherCanvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      const stored = slideDrawings[currentSlideIndex];
      const ctx = canvas.getContext('2d');
      if (stored) {
        const img = new Image();
        img.src = stored;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  useEffect(() => {
    resizeAndRedrawCanvas();
    window.addEventListener('resize', resizeAndRedrawCanvas);
    return () => window.removeEventListener('resize', resizeAndRedrawCanvas);
  }, [currentSlideIndex, slideDrawings]);

  const getCanvasPos = (e) => {
    const canvas = teacherCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    if (activeTool === 'cursor') return;
    const canvas = teacherCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pos = getCanvasPos(e);
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing || activeTool === 'cursor') return;
    const canvas = teacherCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pos = getCanvasPos(e);

    if (activeTool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      if (penColor === '#EAB308') {
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.5)';
        ctx.lineWidth = 12;
      } else {
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penWidth;
      }
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 24;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const broadcastDrawingStroke = (dataUrl) => {
    const payload = {
      type: 'LESTTRY_DRAW_STROKE',
      slideIndex: currentSlideIndex,
      drawingData: dataUrl,
      timestamp: Date.now()
    };
    try {
      const channel = new BroadcastChannel('lesttry_presentation_sync');
      channel.postMessage(payload);
      channel.close();
    } catch (e) {}
    try {
      const liveChannel = new BroadcastChannel('smarttka_live_stream');
      liveChannel.postMessage(payload);
      liveChannel.close();
    } catch (e) {}
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = teacherCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.closePath();
    const dataUrl = canvas.toDataURL();
    setSlideDrawings(prev => ({ ...prev, [currentSlideIndex]: dataUrl }));
    broadcastDrawingStroke(dataUrl);
  };

  const handleClearCanvas = () => {
    const canvas = teacherCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setSlideDrawings(prev => ({ ...prev, [currentSlideIndex]: null }));

    const payload = {
      type: 'LESTTRY_CLEAR_DRAWING',
      slideIndex: currentSlideIndex,
      timestamp: Date.now()
    };
    try {
      const channel = new BroadcastChannel('lesttry_presentation_sync');
      channel.postMessage(payload);
      channel.close();
    } catch (e) {}
    try {
      const liveChannel = new BroadcastChannel('smarttka_live_stream');
      liveChannel.postMessage(payload);
      liveChannel.close();
    } catch (e) {}
  };

  // Single Source of Truth Broadcast Helper (Requirement 2A)
  const broadcastFullState = (updates = {}) => {
    const currentSession = { ...liveSession, ...updates };
    const hasUpload = !!(currentSession?.isUploadedFile || currentSession?.fileUrl);
    const slidesList = (currentSession?.slides && currentSession.slides.length > 0) 
      ? currentSession.slides 
      : (hasUpload || currentSession?.totalSlides !== undefined)
        ? Array.from({ length: currentSession?.totalSlides || 1 }, (_, i) => ({
            title: currentSession?.topicTitle || currentSession?.pptFileName || `Slide Halaman ${i + 1}`,
            subtitle: 'Materi Kelas Live',
            content: 'Materi presentasi yang diunggah oleh Guru.'
          }))
        : MOCK_BUILTIN_SLIDES;

    const slideIdx = updates.currentSlideIndex ?? currentSession?.currentSlideIndex ?? 0;
    const currentSlideObj = slidesList[slideIdx] || slidesList[0];
    const totalSlideCount = updates.totalSlides ?? currentSession?.totalSlides ?? slidesList.length ?? 1;

    const updatePayload = {
      type: 'LESTTRY_SLIDE_UPDATE',
      isLive: currentSession?.isActive !== false && currentSession?.isLive !== false,
      currentSlideIndex: slideIdx,
      totalSlides: totalSlideCount,
      slideData: currentSlideObj,
      topicTitle: updates.topicTitle || currentSlideObj?.title || currentSession?.pptFileName || 'Analisis Konsep Nyata & Perumusan',
      slidesData: slidesList,
      targetClassId: currentSession?.targetClassId || 'ALL',
      targetClassName: currentSession?.targetClassName || 'XII MIPA 1',
      mode: updates.mode || currentSession?.mode || 'ppt',
      fileUrl: updates.fileUrl !== undefined ? updates.fileUrl : (currentSession?.fileUrl || null),
      fileType: updates.fileType || currentSession?.fileType || 'mock',
      experimentId: updates.experimentId || currentSession?.experimentId || '1A',
      sliderValues: updates.sliderValues || currentSession?.sliderValues || {},
      scrollPercentage: updates.scrollPercentage ?? currentSession?.scrollPercentage ?? 0,
      timestamp: Date.now()
    };

    // 1. Post via lesttry_presentation_sync channel
    try {
      const channel = new BroadcastChannel('lesttry_presentation_sync');
      channel.postMessage(updatePayload);
      channel.close();
    } catch (e) {}

    // 2. Post via smarttka_live_stream channel
    try {
      const liveChannel = new BroadcastChannel('smarttka_live_stream');
      liveChannel.postMessage({
        ...updatePayload,
        type: updates.type || 'SYNC_PRESENTATION_STATE',
        currentSlide: slideIdx
      });
      liveChannel.close();
    } catch (e) {}

    // 3. Save to localStorage for instant tab refresh sync
    try {
      localStorage.setItem('lesttry_live_presentation_state', JSON.stringify(updatePayload));
      localStorage.setItem('smarttka_active_live_payload', JSON.stringify(updatePayload));
    } catch (e) {}

    if (onUpdateLiveSession) {
      onUpdateLiveSession(updates);
    }
  };

  // Handshake listener for STUDENT_REQUEST_STATE from joining students (Requirement 2)
  useEffect(() => {
    broadcastFullState({ type: 'LESTTRY_SLIDE_UPDATE' });

    let channel, liveChannel;
    try {
      channel = new BroadcastChannel('lesttry_presentation_sync');
      liveChannel = new BroadcastChannel('smarttka_live_stream');

      const handleStudentReq = (event) => {
        if (event.data?.type === 'STUDENT_REQUEST_STATE') {
          const hasUpload = !!(liveSession?.isUploadedFile || liveSession?.fileUrl);
          const slidesList = (liveSession?.slides && liveSession.slides.length > 0)
            ? liveSession.slides
            : (hasUpload || liveSession?.totalSlides !== undefined)
              ? Array.from({ length: liveSession?.totalSlides || 1 }, (_, i) => ({
                  title: liveSession?.topicTitle || liveSession?.pptFileName || `Slide Halaman ${i + 1}`,
                  subtitle: 'Materi Kelas Live',
                  content: 'Materi presentasi yang diunggah oleh Guru.'
                }))
              : MOCK_BUILTIN_SLIDES;

          const slideIdx = liveSession?.currentSlideIndex ?? 0;
          const currentSlideObj = slidesList[slideIdx] || slidesList[0];
          const totalSlideCount = liveSession?.totalSlides ?? slidesList.length ?? 1;

          const payload = {
            type: 'LESTTRY_SLIDE_UPDATE',
            isLive: liveSession?.isActive !== false && liveSession?.isLive !== false,
            currentSlideIndex: slideIdx,
            totalSlides: totalSlideCount,
            slideData: currentSlideObj,
            topicTitle: currentSlideObj?.title || liveSession?.pptFileName || 'Analisis Konsep Nyata & Perumusan',
            slidesData: slidesList,
            targetClassId: liveSession?.targetClassId || 'ALL',
            targetClassName: liveSession?.targetClassName || 'XII MIPA 1',
            mode: liveSession?.mode || 'ppt',
            fileUrl: liveSession?.fileUrl || null,
            fileType: liveSession?.fileType || 'mock',
            experimentId: liveSession?.experimentId || '1A',
            sliderValues: liveSession?.sliderValues || {},
            scrollPercentage: liveSession?.scrollPercentage || 0,
            timestamp: Date.now()
          };

          channel.postMessage(payload);
          liveChannel.postMessage(payload);
          try {
            localStorage.setItem('lesttry_live_presentation_state', JSON.stringify(payload));
            localStorage.setItem('smarttka_active_live_payload', JSON.stringify(payload));
          } catch (e) {}
        }
      };

      channel.onmessage = handleStudentReq;
      liveChannel.onmessage = handleStudentReq;
    } catch (e) {}

    return () => {
      if (channel) channel.close();
      if (liveChannel) liveChannel.close();
    };
  }, []);

  const handlePrevSlide = () => {
    if (realTotalSlides <= 1) return;
    if (currentSlideIndex > 0) {
      const nextIdx = currentSlideIndex - 1;
      broadcastFullState({ type: 'LESTTRY_SLIDE_UPDATE', currentSlideIndex: nextIdx, scrollPercentage: 0 });
    }
  };

  const handleNextSlide = () => {
    if (realTotalSlides <= 1) return;
    if (currentSlideIndex < realTotalSlides - 1) {
      const nextIdx = currentSlideIndex + 1;
      broadcastFullState({ type: 'LESTTRY_SLIDE_UPDATE', currentSlideIndex: nextIdx, scrollPercentage: 0 });
    }
  };

  const handleExitSession = () => {
    const stopPayload = {
      type: 'LESTTRY_STOP_PRESENTATION',
      isLive: false,
      timestamp: Date.now()
    };

    try {
      const channel = new BroadcastChannel('lesttry_presentation_sync');
      channel.postMessage(stopPayload);
      channel.close();
    } catch (e) {}

    try {
      const liveChannel = new BroadcastChannel('smarttka_live_stream');
      liveChannel.postMessage({ type: 'END_PRESENTATION', isLive: false, timestamp: Date.now() });
      liveChannel.close();
    } catch (e) {}

    try {
      localStorage.setItem('lesttry_live_presentation_state', JSON.stringify(stopPayload));
      localStorage.setItem('smarttka_active_live_payload', JSON.stringify(stopPayload));
    } catch (e) {}

    if (onExit) onExit();
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
        const channel = new BroadcastChannel('smarttka_live_stream');
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
    let newVals;
    if (expData?.presets && expData.presets[0]) {
      newVals = expData.presets[0].values;
    } else {
      newVals = getExperimentDefaultSliders(activeExpId);
    }
    setSliderValues(newVals);
    onUpdateLiveSession({ sliderValues: newVals, activePreset: 'success' });
    triggerRun();
  };

  const handleApplyPresetFail = () => {
    setActivePreset('fail');
    let newVals;
    if (expData?.presets && expData.presets[1]) {
      newVals = expData.presets[1].values;
    } else {
      newVals = getExperimentDefaultSliders(activeExpId);
    }
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
    if (!file) return;
    if (liveSession?.fileUrl) {
      URL.revokeObjectURL(liveSession.fileUrl);
    }
    const fileUrl = URL.createObjectURL(file);
    const isImg = file.type.startsWith('image/') || /\.(png|jpg|jpeg|webp)$/i.test(file.name);
    const isPptx = file.name.toLowerCase().endsWith('.pptx') || file.name.toLowerCase().endsWith('.ppt');

    let fileType = 'pdf';
    if (isImg) fileType = 'image';
    if (isPptx) fileType = 'pptx';

    const customSlides = generateCustomSlidesDeck(file.name, fileUrl, fileType);

    broadcastFullState({
      mode: 'ppt',
      pptFileName: file.name,
      fileUrl: fileUrl,
      fileType: fileType,
      isUploadedFile: true,
      isCustomUpload: true,
      slides: customSlides,
      slidesData: customSlides,
      totalSlides: customSlides.length,
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

    return (
      <SimulationErrorBoundary onReset={() => setSliderValues(getExperimentDefaultSliders(activeExpId))}>
        {subjectId === 'math' && <MathVisualizer {...commonProps} />}
        {subjectId === 'physics' && <PhysicsVisualizer {...commonProps} />}
        {subjectId === 'chemistry' && <ChemistryVisualizer {...commonProps} />}
        {subjectId === 'biology' && <BiologyVisualizer {...commonProps} />}
        {subjectId === 'economy' && <EconomyVisualizer {...commonProps} />}
        {subjectId === 'informatics' && <InformaticsVisualizer {...commonProps} />}
      </SimulationErrorBoundary>
    );
  };

  const questions = liveSession?.questions || [];
  const unreadQuestions = questions.length;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans select-none relative pb-24">
      {/* 1. HEADER BRANDING & CONTROLS */}
      <header className="px-6 py-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-teal-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Tv className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-black uppercase tracking-wider animate-pulse">
                ● Live Streaming Presentasi
              </span>
              <span className="text-xs font-mono text-slate-400 font-bold">
                [{liveSession?.targetClassName || 'XII MIPA 1'}]
              </span>
            </div>
            <h1 className="text-lg font-black text-white tracking-tight">
              LestTry Presenter Studio
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Socratic Questions Button */}
          <button
            onClick={() => setIsQuestionsDrawerOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-black text-xs transition-all flex items-center gap-2 relative shadow-md"
          >
            <span className="text-base">✋</span>
            <span>Pertanyaan Nalar ({questions.length})</span>
            {questions.length > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping absolute -top-1 -right-1" />
            )}
          </button>

          {/* Exit Studio Button */}
          <button
            onClick={onExit}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all border border-slate-700 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            <span>Akhiri Sesi Proyektor</span>
          </button>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">

        {/* MODE A: LAB EXPERIMENTS */}
        {isLabMode && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <h2 className="text-xl font-black text-white">
                  Laboratorium Konsep Nyata: {expData?.title || 'Trajektori Parabola'}
                </h2>
              </div>
            </div>

            <div className="relative bg-slate-900 rounded-3xl border border-slate-800 p-6 min-h-[500px] flex items-center justify-center">
              <SimulationErrorBoundary>
                {activeExpId === '1A' && <PhysicsVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '1B' && <PhysicsVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '1C' && <PhysicsVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '2A' && <MathVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '2B' && <MathVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '2C' && <MathVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '3A' && <ChemistryVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '3B' && <ChemistryVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '3C' && <ChemistryVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '4A' && <BiologyVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '4B' && <BiologyVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '4C' && <BiologyVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '5A' && <EconomyVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '5B' && <EconomyVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '5C' && <EconomyVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '6A' && <InformaticsVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '6B' && <InformaticsVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
                {activeExpId === '6C' && <InformaticsVisualizer sliders={sliderValues} progress={simulationProgress} time={simulationTime} />}
              </SimulationErrorBoundary>
            </div>

            {/* CONTROLS BAR */}
            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <div className="text-xs text-slate-400">
                  Parameter simulasi langsung disinkronkan ke seluruh perangkat siswa.
                </div>
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

        {/* MODE B: PPT / PDF SLIDES WITH LIVE ANNOTATION CANVAS */}
        {isPptMode && (
          <div className="space-y-6">

            {/* RELATIVE SLIDE & CANVAS CONTAINER */}
            <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white text-slate-900">
              
              {/* CANVAS OVERLAY FOR SPIDOL & ANNOTATIONS (FEATURE 2) */}
              <canvas
                ref={teacherCanvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className={`absolute inset-0 w-full h-full z-20 ${
                  activeTool === 'cursor' ? 'pointer-events-none' : 'pointer-events-auto cursor-crosshair'
                }`}
              />

              {/* IF UPLOADED FILE IS PDF: RENDER REAL PDF IFRAME */}
              {liveSession?.fileType === 'pdf' && liveSession?.fileUrl ? (
                <div className="bg-white p-4 space-y-4">
                  <iframe
                    src={`${liveSession.fileUrl}#toolbar=0`}
                    className="w-full h-[540px] rounded-2xl border border-slate-200 bg-white"
                    title="Slide Presentasi Guru PDF"
                  />
                </div>
              ) : liveSession?.fileType === 'image' && liveSession?.fileUrl ? (
                /* IF UPLOADED FILE IS IMAGE: RENDER IMAGE CANVAS */
                <div className="bg-white p-4 flex flex-col items-center justify-center min-h-[500px]">
                  <img
                    src={liveSession.fileUrl}
                    alt="Slide Presentasi Guru"
                    className="max-h-[520px] w-auto object-contain rounded-2xl border border-slate-200"
                  />
                </div>
              ) : (
                /* OTHERWISE (PPTX OR BUILT-IN SLIDES): RENDER CLEAN LIGHT SLIDE CANVAS */
                <div className="space-y-4">
                  {liveSession?.fileType === 'pptx' && (
                    <div className="p-4 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>
                          <strong>Materi PowerPoint Terunggah (.PPTX):</strong> Slide {currentSlideIndex + 1} dari {realTotalSlides}. Tampilan slide kustom siap diproyeksikan secara live.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* CLEAN LIGHT 16:9 SLIDE CONTAINER WITH LIVE SCROLL MIRRORING */}
                  <div 
                    ref={teacherScrollContainerRef}
                    onScroll={handleTeacherContainerScroll}
                    className="w-full bg-white text-slate-900 p-8 sm:p-12 space-y-6 min-h-[460px] max-h-[520px] overflow-y-auto flex flex-col justify-between aspect-video relative transition-all"
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
                        Slide {currentSlideIndex + 1} dari {realTotalSlides}
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
                        disabled={currentSlideIndex === 0 || realTotalSlides <= 1}
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
                        disabled={currentSlideIndex >= realTotalSlides - 1 || realTotalSlides <= 1}
                        className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 text-white font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
                      >
                        <span>Slide Berikutnya &gt;</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>

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
                      Slide {currentSlideIndex + 1} dari {realTotalSlides}
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
                  accept=".pptx, .pdf, .png, .jpg, .jpeg"
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

      {/* FLOATING ANNOTATION TOOLBAR (FITUR 2: FLOATING BOTTOM BAR) */}
      {isPptMode && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl px-5 py-2.5 flex items-center gap-3 animate-fade-in text-slate-800">
          
          {/* Kursor biasa */}
          <button
            onClick={() => setActiveTool('cursor')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-black ${
              activeTool === 'cursor'
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Mode Navigasi Kursor"
          >
            <MousePointer className="w-4 h-4" />
            <span className="hidden sm:inline">Kursor</span>
          </button>

          <div className="w-px h-6 bg-slate-200" />

          {/* Spidol */}
          <button
            onClick={() => setActiveTool('pen')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-black ${
              activeTool === 'pen'
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Mode Spidol Coretan"
          >
            <Pencil className="w-4 h-4" />
            <span className="hidden sm:inline">Spidol</span>
          </button>

          {/* Quick Colors */}
          {activeTool === 'pen' && (
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => { setPenColor('#EF4444'); setPenWidth(3); }}
                className={`w-6 h-6 rounded-full bg-red-500 transition-transform ${
                  penColor === '#EF4444' ? 'ring-2 ring-offset-2 ring-red-500 scale-110' : 'hover:scale-105'
                }`}
                title="Warna Merah (Pen 3px)"
              />
              <button
                onClick={() => { setPenColor('#2563EB'); setPenWidth(3); }}
                className={`w-6 h-6 rounded-full bg-blue-600 transition-transform ${
                  penColor === '#2563EB' ? 'ring-2 ring-offset-2 ring-blue-600 scale-110' : 'hover:scale-105'
                }`}
                title="Warna Biru (Pen 3px)"
              />
              <button
                onClick={() => { setPenColor('#EAB308'); setPenWidth(6); }}
                className={`w-6 h-6 rounded-full bg-amber-400 transition-transform ${
                  penColor === '#EAB308' ? 'ring-2 ring-offset-2 ring-amber-400 scale-110' : 'hover:scale-105'
                }`}
                title="Highlighter Kuning / Stabilo (Pen 6px)"
              />
            </div>
          )}

          <div className="w-px h-6 bg-slate-200" />

          {/* Penghapus */}
          <button
            onClick={() => setActiveTool('eraser')}
            className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-black ${
              activeTool === 'eraser'
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title="Mode Penghapus"
          >
            <Eraser className="w-4 h-4" />
            <span className="hidden sm:inline">Penghapus</span>
          </button>

          <div className="w-px h-6 bg-slate-200" />

          {/* Hapus Coretan */}
          <button
            onClick={handleClearCanvas}
            className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs transition-all flex items-center gap-1.5 border border-red-200 active:scale-95"
            title="Hapus Semua Coretan di Slide Ini"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hapus Coretan</span>
          </button>
        </div>
      )}

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
