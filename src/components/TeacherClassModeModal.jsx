import React, { useState } from 'react';
import { 
  Tv, 
  Rocket, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  Sliders,
  Layers,
  FileCheck,
  Check,
  AlertCircle
} from 'lucide-react';
import { SUBJECT_CLUSTERS } from '../data/conceptLabData';

export default function TeacherClassModeModal({ 
  onClose, 
  onStartLiveSession 
}) {
  const [selectedMode, setSelectedMode] = useState(null); // 'lab' | 'ppt'
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedExperiment, setSelectedExperiment] = useState('1A');

  // PPT Upload & Sample State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [activeSamplePpt, setActiveSamplePpt] = useState('sample_1');
  const [isDragging, setIsDragging] = useState(false);

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
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const processFile = (file) => {
    // Revoke previous object URL if existing to free memory
    if (uploadedFile?.url) {
      URL.revokeObjectURL(uploadedFile.url);
    }

    const fileUrl = URL.createObjectURL(file);
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImg = file.type.startsWith('image/') || /\.(png|jpg|jpeg|webp)$/i.test(file.name);
    const isPptx = file.name.toLowerCase().endsWith('.pptx') || file.name.toLowerCase().endsWith('.ppt');

    let fileType = 'pdf';
    if (isImg) fileType = 'image';
    if (isPptx) fileType = 'pptx';

    setUploadedFile({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: fileType,
      url: fileUrl,
      rawFile: file
    });
  };

  const handleConfirmStart = () => {
    if (selectedMode === 'lab') {
      onStartLiveSession({
        mode: 'lab',
        subjectId: selectedSubject,
        experimentId: selectedExperiment
      });
    } else if (selectedMode === 'ppt') {
      const chosenSample = sampleDecks.find(s => s.id === activeSamplePpt);
      onStartLiveSession({
        mode: 'ppt',
        pptFileName: uploadedFile ? uploadedFile.name : (chosenSample?.title || 'Modul_TKA_Fisika_Kalkulus_Socratix.pptx'),
        fileUrl: uploadedFile ? uploadedFile.url : null,
        fileType: uploadedFile ? uploadedFile.type : (chosenSample?.title?.endsWith('.pdf') ? 'pdf' : 'mock'),
        isUploadedFile: !!uploadedFile,
        currentSlideIndex: 0
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans animate-fade-in">
      <div className="bg-white max-w-4xl w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        
        {/* MODAL HEADER */}
        <div className="bg-slate-50 px-6 sm:px-8 py-5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Pilih Mode Layar Proyektor Kelas
                </h2>
                <span className="px-3 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-black uppercase">
                  Clean Light Minimalist
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Pilih format media penayangan langsung ke proyektor kelas dan HP masing-masing siswa.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* STEP 1: 2 BIG MODE CARDS */}
          {!selectedMode && (
            <div className="space-y-4">
              <div className="text-center max-w-md mx-auto mb-2">
                <h3 className="text-lg font-extrabold text-slate-900">Bagaimana Anda ingin mengajar hari ini?</h3>
                <p className="text-xs text-slate-500">Pilih salah satu dari dua metode tayangan interaktif di bawah.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* KARTU 1: BUKA LAB SIMULASI NYATA */}
                <button
                  onClick={() => setSelectedMode('lab')}
                  className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-indigo-600 hover:shadow-xl transition-all group text-left flex flex-col justify-between space-y-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                      <Rocket className="w-7 h-7" />
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase mb-2 border border-indigo-200">
                        <span>Mode Simulasi Interaktif</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        🚀 Buka Laboratorium Simulasi Nyata
                      </h4>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                        Tampilkan simulasi interaktif multi-mata pelajaran (Kalkulus Roket, Jembatan, Baterai, DNA, dll.) untuk demonstrasi visual konsep di kelas.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 font-semibold space-y-1">
                      <p className="text-indigo-700 font-bold">✨ Fitur Unggulan:</p>
                      <p>• Kontrol Slider & Preset Skenario Otomatis (Sukses/Gagal)</p>
                      <p>• Visualisasi Animasi Bergerak Real-time tanpa Delay</p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-indigo-600 font-extrabold text-sm group-hover:translate-x-1 transition-transform">
                    <span>Pilih Topik Simulasi</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>

                {/* KARTU 2: TAYANGKAN MATERI SAYA SENDIRI (PPT / PDF) */}
                <button
                  onClick={() => setSelectedMode('ppt')}
                  className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-emerald-600 hover:shadow-xl transition-all group text-left flex flex-col justify-between space-y-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                      <FileText className="w-7 h-7" />
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase mb-2 border border-emerald-200">
                        <span>Mode Presentasi Dokumen</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                        📑 Tayangkan Materi Saya Sendiri (PPT / PDF)
                      </h4>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                        Unggah dokumen presentasi guru agar bisa disimak langsung di layar HP masing-masing siswa yang duduk jauh.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 font-semibold space-y-1">
                      <p className="text-emerald-700 font-bold">✨ Fitur Unggulan:</p>
                      <p>• Drag-and-drop file picker (.PDF, .PNG, .JPG, .PPTX)</p>
                      <p>• Navigasi slide ramah jari & Pinch-to-zoom di HP siswa</p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-emerald-600 font-extrabold text-sm group-hover:translate-x-1 transition-transform">
                    <span>Unggah / Pilih Slide Presentasi</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>

              </div>
            </div>
          )}

          {/* STEP 2A: LAB SIMULATOR SELECTION */}
          {selectedMode === 'lab' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Pilih Topik Laboratorium Simulasi</h3>
                  <p className="text-xs text-slate-500">Pilih mata pelajaran & modul eksperimen visual yang ingin ditayangkan.</p>
                </div>
                <button
                  onClick={() => setSelectedMode(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold"
                >
                  ← Kembali ke Pilihan Mode
                </button>
              </div>

              {/* SUBJECT CLUSTER TABS */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {SUBJECT_CLUSTERS.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubject(sub.id);
                      setSelectedExperiment(sub.experiments[0].id);
                    }}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold shrink-0 transition-all ${
                      selectedSubject === sub.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>

              {/* EXPERIMENTS GRID FOR SELECTED SUBJECT */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SUBJECT_CLUSTERS.find(s => s.id === selectedSubject)?.experiments.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedExperiment(exp.id)}
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                      selectedExperiment === exp.id
                        ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-600/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-indigo-700 px-2 py-0.5 rounded-full bg-indigo-100">
                        {exp.id}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-2">{exp.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">{exp.desc}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-bold">
                      <span className={selectedExperiment === exp.id ? 'text-indigo-700' : 'text-slate-400'}>
                        {selectedExperiment === exp.id ? '✓ Terpilih' : 'Klik untuk Pilih'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2B: PPT / PDF FILE UPLOAD & SLIDE SELECTION */}
          {selectedMode === 'ppt' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Unggah Dokumen Presentasi Saya</h3>
                  <p className="text-xs text-slate-500">Mendukung format file PDF (.PDF), Gambar (.PNG, .JPG), dan PowerPoint (.PPTX).</p>
                </div>
                <button
                  onClick={() => setSelectedMode(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold"
                >
                  ← Kembali ke Pilihan Mode
                </button>
              </div>

              {/* DRAG AND DROP FILE PICKER */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                className={`p-8 rounded-3xl border-2 border-dashed text-center transition-all flex flex-col items-center justify-center space-y-3 relative cursor-pointer ${
                  isDragging
                    ? 'border-indigo-600 bg-indigo-50/70 scale-[1.01]'
                    : (uploadedFile ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-300 hover:border-indigo-500 bg-slate-50/70')
                }`}
              >
                <input
                  type="file"
                  accept=".pdf,.pptx,.ppt,.png,.jpg,.jpeg,.webp"
                  onChange={handleFileInput}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />

                {uploadedFile ? (
                  <div className="space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <FileCheck className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900">{uploadedFile.name}</h4>
                    <p className="text-xs text-emerald-700 font-bold">
                      ✓ File Siap Ditayangkan • Ukuran: {uploadedFile.size} ({uploadedFile.type.toUpperCase()})
                    </p>
                    
                    {uploadedFile.type === 'pptx' && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium max-w-md mx-auto flex items-start gap-2 text-left">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Tips Guru:</strong> Untuk tampilan terbaik tanpa lag di HP siswa, simpan/ekspor PPT Anda ke format PDF terlebih dahulu. Mode pratinjau slide otomatis siap digunakan.
                        </span>
                      </div>
                    )}

                    <p className="text-[11px] text-slate-400 font-semibold pt-1">Klik atau drop file lain untuk mengganti.</p>
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                      <UploadCloud className="w-8 h-8 text-[#2563EB]" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        Tarik & Lepas File Presentasi di Sini
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        atau <span className="text-indigo-600 font-bold underline">Pilih File dari Komputer</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                      Mendukung .PDF, .PNG, .JPG, .PPTX (Maks 50 MB)
                    </span>
                  </>
                )}
              </div>

              {/* OR CHOOSE FROM READY SAMPLE PRESENTATION DECKS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Atau Gunakan Template Presentasi Siap Pakai Hari Ini:
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {sampleDecks.map((deck) => (
                    <button
                      key={deck.id}
                      onClick={() => {
                        setActiveSamplePpt(deck.id);
                        setUploadedFile(null);
                      }}
                      className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                        activeSamplePpt === deck.id && !uploadedFile
                          ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-600/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {deck.slidesCount} Slide
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700">{deck.subject}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1">{deck.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{deck.desc}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                        <span>{activeSamplePpt === deck.id && !uploadedFile ? '✓ Terpilih' : 'Gunakan'}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="bg-slate-50 px-6 sm:px-8 py-5 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-extrabold text-sm border border-slate-200 transition-all"
          >
            Batal
          </button>

          {selectedMode && (
            <button
              onClick={handleConfirmStart}
              className={`px-8 py-3.5 rounded-2xl font-black text-base text-white transition-all shadow-lg flex items-center gap-3 active:scale-98 ${
                selectedMode === 'lab'
                  ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
              }`}
            >
              <Tv className="w-5 h-5" />
              <span>Mulai Menyiarkan Live ke Kelas</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
