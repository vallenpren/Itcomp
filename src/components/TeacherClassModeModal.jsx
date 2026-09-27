import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Rocket, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ArrowRight,
  FileCheck,
  Check,
  AlertCircle,
  ArrowUpRight,
  Users
} from 'lucide-react';
import { SUBJECT_CLUSTERS, EXPERIMENTS_DATA, generateCustomSlidesDeck } from '../data/conceptLabData';

export default function TeacherClassModeModal({ 
  onClose, 
  onStartLiveSession 
}) {
  const [selectedMode, setSelectedMode] = useState(null); // 'lab' | 'ppt'
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedExperiment, setSelectedExperiment] = useState('1A');

  // Target Class Selector State
  const targetClasses = [
    { id: 'MIPA-1', name: 'XII MIPA 1' },
    { id: 'MIPA-2', name: 'XII MIPA 2' },
    { id: 'MIPA-3', name: 'XII MIPA 3' }
  ];
  const [selectedClassId, setSelectedClassId] = useState('MIPA-1');

  // PPT Upload & Sample State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [activeSamplePpt, setActiveSamplePpt] = useState('sample_1');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    // Sync default selection based on current active experiment
    const firstExp = Object.values(EXPERIMENTS_DATA)[0];
    if (firstExp) {
      setSelectedSubject(firstExp.subjectId || 'math');
      setSelectedExperiment(firstExp.id || '1A');
    }
  }, []);

  const sampleDecks = [
    {
      id: 'sample_1',
      title: 'Modul TKA Fisika & Kalkulus Trajektori.pptx',
      slidesCount: 4,
      subject: 'Fisika & Matematika',
      desc: 'Konsep gerak parabola, kecepatan awal, dan turunan laju pergerakan.'
    },
    {
      id: 'sample_2',
      title: 'Presentasi Reaktor & Termodinamika.pdf',
      slidesCount: 5,
      subject: 'Fisika Terpadu',
      desc: 'Siklus piston Carnot, efisiensi termal reaktor, dan kerja gas.'
    },
    {
      id: 'sample_3',
      title: 'Simulasi Baterai EV & Elektrokimia.pptx',
      slidesCount: 4,
      subject: 'Kimia & Elektro',
      desc: 'Potensial sel Volta, migrasi ion litium, dan persamaan Nernst.'
    }
  ];

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImg = file.type.startsWith('image/') || /\.(png|jpg|jpeg|webp)$/i.test(file.name);
    const isPptx = file.name.toLowerCase().endsWith('.pptx') || file.name.toLowerCase().endsWith('.ppt');

    let fileType = 'pdf';
    if (isImg) fileType = 'image';
    if (isPptx) fileType = 'pptx';

    const fileUrl = URL.createObjectURL(file);
    setUploadedFile({
      name: file.name,
      type: fileType,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      url: fileUrl
    });
  };

  const handleStartSession = () => {
    if (!selectedMode) return;

    const chosenClass = targetClasses.find(c => c.id === selectedClassId) || targetClasses[0];

    let sessionConfig = {};
    if (selectedMode === 'lab') {
      const exp = EXPERIMENTS_DATA[selectedExperiment];
      const initialSliders = {};
      if (exp && exp.controls) {
        exp.controls.forEach(ctrl => {
          initialSliders[ctrl.id] = ctrl.defaultVal;
        });
      }
      sessionConfig = {
        mode: 'lab',
        subjectId: selectedSubject,
        experimentId: selectedExperiment,
        topicTitle: exp?.title || 'Simulasi Konsep Nyata',
        sliderValues: initialSliders,
        targetClassId: chosenClass.id || 'ALL',
        targetClassName: chosenClass.name || 'XII MIPA 1',
        totalSlides: 1
      };
    } else if (selectedMode === 'ppt') {
      const chosenSample = sampleDecks.find(s => s.id === activeSamplePpt);
      let customSlides = [];
      if (uploadedFile) {
        customSlides = generateCustomSlidesDeck(uploadedFile.name, uploadedFile.url, uploadedFile.type);
      }
      const realTotalSlides = uploadedFile ? (customSlides.length || 1) : (chosenSample?.slidesCount || 1);
      sessionConfig = {
        mode: 'ppt',
        pptFileName: uploadedFile ? uploadedFile.name : (chosenSample?.title || 'Modul_TKA_Fisika_Kalkulus_Socratix.pptx'),
        fileUrl: uploadedFile ? uploadedFile.url : null,
        fileType: uploadedFile ? uploadedFile.type : (chosenSample?.title?.endsWith('.pdf') ? 'pdf' : 'mock'),
        isUploadedFile: !!uploadedFile,
        isCustomUpload: !!uploadedFile,
        slides: customSlides,
        slidesData: customSlides,
        currentSlideIndex: 0,
        totalSlides: realTotalSlides,
        targetClassId: chosenClass.id || 'ALL',
        targetClassName: chosenClass.name || 'XII MIPA 1'
      };
    }

    const payload = {
      type: 'LESTTRY_SLIDE_UPDATE',
      isLive: true,
      currentSlideIndex: sessionConfig.currentSlideIndex || 0,
      totalSlides: sessionConfig.totalSlides || 1,
      fileUrl: sessionConfig.fileUrl || null,
      fileType: sessionConfig.fileType || 'mock',
      topicTitle: sessionConfig.pptFileName || 'Analisis Konsep Nyata & Perumusan',
      slidesData: sessionConfig.slidesData || [],
      isCustomUpload: sessionConfig.isCustomUpload || false,
      targetClassId: sessionConfig.targetClassId || 'ALL',
      targetClassName: sessionConfig.targetClassName || 'XII MIPA 1',
      mode: sessionConfig.mode || 'ppt',
      experimentId: sessionConfig.experimentId || '1A',
      sliderValues: sessionConfig.sliderValues || {},
      timestamp: Date.now()
    };

    try {
      const channel = new BroadcastChannel('lesttry_presentation_sync');
      channel.postMessage(payload);
      channel.close();
    } catch (e) {}

    try {
      const liveChannel = new BroadcastChannel('smarttka_live_stream');
      liveChannel.postMessage({
        ...payload,
        type: 'SYNC_PRESENTATION_STATE',
        currentSlide: sessionConfig.currentSlideIndex || 0
      });
      liveChannel.close();
    } catch (e) {}

    try {
      localStorage.setItem('lesttry_live_presentation_state', JSON.stringify(payload));
      localStorage.setItem('smarttka_active_live_payload', JSON.stringify(payload));
    } catch (e) {}

    onStartLiveSession(sessionConfig);
  };

  const currentClassObj = targetClasses.find(c => c.id === selectedClassId) || targetClasses[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* STICKY HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Layar Proyektor Kelas</h3>
            <p className="text-xs text-slate-500">Tayangkan simulasi atau materi langsung ke layar kelas &amp; HP siswa</p>
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
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          
          {/* TARGET CLASS SELECTOR IN MODAL */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-950">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Pilih Target Ruang Kelas Siaran:</span>
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-200 text-indigo-800 border border-indigo-300">
                {currentClassObj.name}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {targetClasses.map((cls) => (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => setSelectedClassId(cls.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    selectedClassId === cls.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cls.name}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 1: SELECT MODE */}
          {!selectedMode && (
            <div className="space-y-4">
              <div className="text-center max-w-sm mx-auto">
                <h4 className="text-sm font-extrabold text-slate-900">Bagaimana Anda ingin mengajar hari ini?</h4>
                <p className="text-xs text-slate-500 mt-0.5">Pilih salah satu metode tayangan di bawah.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* MODE 1: LAB SIMULATOR */}
                <button
                  type="button"
                  onClick={() => setSelectedMode('lab')}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/30 transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        Simulasi Interaktif
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-1.5 group-hover:text-indigo-600">
                        🚀 Laboratorium Visual
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Tampilkan simulasi interaktif multi-mapel (Kalkulus, Fisika, Baterai) untuk demo visual.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-indigo-600 font-bold text-xs pt-2">
                    <span>Pilih Topik</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>

                {/* MODE 2: PPT / PDF DOCUMENT */}
                <button
                  type="button"
                  onClick={() => setSelectedMode('ppt')}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/30 transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Presentasi Dokumen
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-1.5 group-hover:text-emerald-600">
                        📑 Materi Saya (PPT/PDF)
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Unggah slide presentasi guru agar bisa disimak langsung di HP siswa.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-emerald-600 font-bold text-xs pt-2">
                    <span>Unggah Slide</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>

              </div>
            </div>
          )}

          {/* STEP 2A: LAB SIMULATOR SELECTION */}
          {selectedMode === 'lab' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Pilih Topik Laboratorium Simulasi</h4>
                  <p className="text-xs text-slate-500">Pilih mata pelajaran &amp; modul eksperimen visual</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMode(null)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  ← Kembali
                </button>
              </div>

              {/* SUBJECT CLUSTER TABS */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {SUBJECT_CLUSTERS.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setSelectedSubject(sub.id);
                      setSelectedExperiment(sub.experiments[0].id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                      selectedSubject === sub.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>

              {/* EXPERIMENTS LIST */}
              <div className="space-y-2">
                {SUBJECT_CLUSTERS.find(s => s.id === selectedSubject)?.experiments.map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => setSelectedExperiment(exp.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedExperiment === exp.id
                        ? 'bg-blue-50/80 border-blue-600 font-bold'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-blue-700 px-2 py-0.2 rounded bg-blue-100">
                          {exp.id}
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs">{exp.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{exp.desc}</p>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                      selectedExperiment === exp.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'
                    }`}>
                      {selectedExperiment === exp.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2B: PPT / PDF UPLOAD */}
          {selectedMode === 'ppt' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Unggah Dokumen Presentasi</h4>
                  <p className="text-xs text-slate-500">Mendukung format PDF, PNG/JPG, dan PPTX</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMode(null)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  ← Kembali
                </button>
              </div>

              {/* DRAG AND DROP BOX */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                className={`p-6 rounded-2xl border-2 border-dashed text-center transition-all flex flex-col items-center justify-center space-y-2 relative cursor-pointer ${
                  isDragging
                    ? 'border-blue-600 bg-blue-50/70'
                    : (uploadedFile ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-300 hover:border-blue-500 bg-slate-50')
                }`}
              >
                <input
                  type="file"
                  accept=".pptx, .pdf, .png, .jpg, .jpeg"
                  onChange={handleFileInput}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />

                {uploadedFile ? (
                  <div className="space-y-1">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{uploadedFile.name}</h4>
                    <p className="text-[11px] text-emerald-700 font-semibold">
                      ✓ File Siap Ditayangkan ({uploadedFile.size})
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Tarik &amp; Lepas File Presentasi di Sini
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        atau <span className="text-blue-600 font-bold underline">Pilih File dari Komputer</span>
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* SAMPLE DECKS */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Atau Gunakan Template Presentasi Siap Pakai:
                </span>

                <div className="space-y-2">
                  {sampleDecks.map((deck) => (
                    <div
                      key={deck.id}
                      onClick={() => {
                        setActiveSamplePpt(deck.id);
                        setUploadedFile(null);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        activeSamplePpt === deck.id && !uploadedFile
                          ? 'bg-blue-50/80 border-blue-600 font-bold'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{deck.title}</h4>
                        <p className="text-[11px] text-slate-500">{deck.desc}</p>
                      </div>

                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                        activeSamplePpt === deck.id && !uploadedFile ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'
                      }`}>
                        {activeSamplePpt === deck.id && !uploadedFile && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* STICKY FOOTER */}
        <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-slate-100 bg-slate-50 shrink-0">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-200/60 rounded-xl font-medium cursor-pointer"
          >
            Batal
          </button>
          
          {selectedMode && (
            <button 
              onClick={handleConfirmStart} 
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-xs transition-all group cursor-pointer"
            >
              <span>Mulai Tayangan Live ke {currentClassObj.name}</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
