import React, { useState, useEffect, Component } from 'react';
import { 
  Users, 
  UploadCloud, 
  Search, 
  RefreshCw, 
  Eye, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  RotateCcw, 
  FileText, 
  Download, 
  Check, 
  Sliders, 
  Brain, 
  UserCheck, 
  FileUp, 
  ArrowRight,
  Plus
} from 'lucide-react';

export const INITIAL_GROUP_MODULES = {
  GROUP_A: {
    groupId: 'GROUP_A',
    groupName: 'Kelompok A',
    approachType: 'Visual',
    topic: 'Fisika Saintek - Dinamika Gerak & Trajektori',
    activeModuleTitle: 'Modul 1: Panduan Visual & Grafik Dinamika Gerak',
    fileName: 'Modul_Pendekatan_Visual_Dinamika_Gerak.pdf',
    fileSize: '2.4 MB',
    description: 'Fokus pada grafik trajektori kurva, pembacaan diagram alir, dan representasi visual KaTeX.',
    uploadDate: '29 Sep 2026',
    members: [
      { name: 'Ahmad Dani', role: 'Ketua Tim' },
      { name: 'Siti Rahma', role: 'Anggota' },
      { name: 'Lukman Hakim', role: 'Anggota' },
      { name: 'Gita Gutawa', role: 'Anggota' }
    ]
  },
  GROUP_B: {
    groupId: 'GROUP_B',
    groupName: 'Kelompok B',
    approachType: 'Teori & Analitis',
    topic: 'Fisika Saintek - Dinamika Gerak & Trajektori',
    activeModuleTitle: 'Modul 1: Dekonstruksi Rumus & Kalkulus Diferensial',
    fileName: 'Modul_Teori_Analitis_Dinamika_Gerak.pdf',
    fileSize: '3.1 MB',
    description: 'Fokus pada dekonstruksi persamaan diferensial, pembuktian rumus, dan tabel relasi variabel.',
    uploadDate: '29 Sep 2026',
    members: [
      { name: 'Dewi Lestari', role: 'Ketua Tim' },
      { name: 'Fajar Ramadhan', role: 'Anggota' },
      { name: 'Budi Santoso', role: 'Anggota' },
      { name: 'Maya Putri', role: 'Anggota' }
    ]
  },
  GROUP_C: {
    groupId: 'GROUP_C',
    groupName: 'Kelompok C',
    approachType: 'Praktik Langsung',
    topic: 'Fisika Saintek - Dinamika Gerak & Trajektori',
    activeModuleTitle: 'Modul 1: Panduan Eksplorasi Slider & Data Simulasi',
    fileName: 'Modul_Praktik_Eksperimen_Dinamika_Gerak.pdf',
    fileSize: '2.8 MB',
    description: 'Fokus pada manipulasi parameter slider ekstrim, uji batas kritis, dan eliminasi galat.',
    uploadDate: '29 Sep 2026',
    members: [
      { name: 'Indra Kusuma', role: 'Ketua Tim' },
      { name: 'Karin Novilda', role: 'Anggota' },
      { name: 'Hendra Wijaya', role: 'Anggota' },
      { name: 'Rian Pratama', role: 'Anggota' }
    ]
  }
};

export const RECOMMENDATION_STUDENTS = [
  { id: 's-1', name: 'Ahmad Dani', recommendedGroup: 'Kelompok A', approach: 'Visual', scoreEff: '84% Efektif Visual', currentGroup: 'Kelompok A' },
  { id: 's-2', name: 'Dewi Lestari', recommendedGroup: 'Kelompok B', approach: 'Teori & Analitis', scoreEff: '85% Efektif Rumus', currentGroup: 'Kelompok B' },
  { id: 's-3', name: 'Indra Kusuma', recommendedGroup: 'Kelompok C', approach: 'Praktik Langsung', scoreEff: '88% Efektif Sandbox', currentGroup: 'Kelompok C' },
  { id: 's-4', name: 'Siti Rahma', recommendedGroup: 'Kelompok A', approach: 'Visual', scoreEff: '88% Efektif Visual', currentGroup: 'Kelompok A' },
  { id: 's-5', name: 'Fajar Ramadhan', recommendedGroup: 'Kelompok B', approach: 'Teori & Analitis', scoreEff: '82% Efektif Rumus', currentGroup: 'Kelompok B' }
];

class GroupErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("GroupErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white p-8 rounded-3xl border border-red-200 shadow-sm text-center space-y-4 max-w-xl mx-auto my-10 font-sans">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Terjadi Kendala Memuat Data</h3>
          <p className="text-xs text-slate-600 font-medium">Data kelompok mengalami pembaruan state. Silakan muat ulang.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            Muat Ulang Halaman
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function TeacherClassroomGroupsContent() {
  const [groupModules, setGroupModules] = useState(() => {
    try {
      const saved = localStorage.getItem('lesttry_group_modules');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_GROUP_MODULES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [activeUploadModal, setActiveUploadModal] = useState(null); // 'GROUP_A' | 'GROUP_B' | 'GROUP_C'
  const [uploadTitleInput, setUploadTitleInput] = useState('');
  const [uploadDescInput, setUploadDescInput] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const syncStateToStorage = (updated) => {
    setGroupModules(updated);
    try {
      localStorage.setItem('lesttry_group_modules', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  const handleApplyGroupRecommendations = () => {
    triggerToast('Pengelompokan berhasil diterapkan. Seluruh siswa telah ditempatkan sesuai rekomendasi gaya belajar.');
  };

  const handleUploadModuleForGroup = (groupKey) => {
    if (!uploadTitleInput.trim()) {
      triggerToast('Mohon isi judul modul belajar.');
      return;
    }

    const currentG = groupModules[groupKey] || INITIAL_GROUP_MODULES[groupKey];
    const newFileName = selectedFileName || `Modul_${(currentG.approachType || 'Terbaru').replace(/\s+/g, '_')}.pdf`;

    const updatedGroup = {
      ...currentG,
      activeModuleTitle: uploadTitleInput.trim(),
      fileName: newFileName,
      description: uploadDescInput.trim() || currentG.description,
      uploadDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const newAllGroups = {
      ...groupModules,
      [groupKey]: updatedGroup
    };

    syncStateToStorage(newAllGroups);
    setActiveUploadModal(null);
    setUploadTitleInput('');
    setUploadDescInput('');
    setSelectedFileName('');
    triggerToast(`Modul untuk ${currentG.groupName} (${currentG.approachType}) berhasil diunggah!`);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      if (!uploadTitleInput) {
        setUploadTitleInput(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const safeRecommendationStudents = RECOMMENDATION_STUDENTS || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans text-slate-800">

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* HEADER & KONSEP UTAMA */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Manajemen Kelompok Belajar &amp; Distribusi Modul
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Satu Topik Utama, Tiga Pendekatan Belajar
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-1">
              Materi Pokok Seluruh Kelas: <strong className="text-slate-900">Fisika Saintek - Dinamika Gerak &amp; Trajektori</strong>. 
              Siswa dikelompokkan berdasarkan fokus cara belajar.
            </p>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 shrink-0 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Status Pengelompokan:</span>
            <span className="text-xs font-extrabold text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              3 Kelompok Pendekatan Aktif
            </span>
          </div>
        </div>

        {/* THREE LEARNING APPROACHES EXPLANATION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
            <span className="text-[11px] font-black text-blue-800 uppercase tracking-wider block">
              Kelompok A (Fokus Cara Belajar: Visual)
            </span>
            <p className="text-xs text-slate-600 font-medium">
              Dominan grafik trajektori, diagram alir proses, dan kurva visual interaktif.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1">
            <span className="text-[11px] font-black text-purple-800 uppercase tracking-wider block">
              Kelompok B (Fokus Cara Belajar: Teori &amp; Analitis)
            </span>
            <p className="text-xs text-slate-600 font-medium">
              Dominan dekonstruksi rumus diferensial, konsep fundamental, dan teks nalar.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-1">
            <span className="text-[11px] font-black text-teal-800 uppercase tracking-wider block">
              Kelompok C (Fokus Cara Belajar: Praktik Langsung)
            </span>
            <p className="text-xs text-slate-600 font-medium">
              Dominan panduan manipulasi alat simulasi sandbox, uji batas, dan eliminasi galat.
            </p>
          </div>
        </div>
      </div>

      {/* BAGIAN REKOMENDASI PENEMPATAN */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>Rekomendasi Berdasarkan Kebiasaan Belajar</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Sistem mencocokkan siswa ke kelompok belajar berdasarkan interaksi pengerjaan latihan harian.
            </p>
          </div>

          <button
            onClick={handleApplyGroupRecommendations}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <Check className="w-4 h-4" />
            <span>Terapkan Pengelompokan</span>
          </button>
        </div>

        {/* Student Recommendation Table / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(safeRecommendationStudents || []).map((st) => (
            <div key={st.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">{st.name}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{st.scoreEff}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-black text-blue-700 block">
                  {st.recommendedGroup}
                </span>
                <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">
                  Fokus: {st.approach}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BAGIAN DAFTAR KELOMPOK & DISTRIBUSI MODUL */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Daftar Kelompok &amp; Slot Modul Belajar Siswa</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">
            Modul terkirim terpisah sesuai slot kelompok
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(groupModules || {}).map(([key, group]) => {
            if (!group) return null;
            const membersList = group.members || [];

            return (
              <div key={key} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-5">
                
                <div className="space-y-4">
                  {/* Header Kartu */}
                  <div className="pb-3 border-b border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-black uppercase">
                        {group.groupId}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {membersList.length} Siswa
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900">
                      Kelompok Belajar: {group.groupName} (Fokus Cara Belajar: {group.approachType})
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Topik: {group.topic}
                    </p>
                  </div>

                  {/* Daftar Siswa */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Anggota Kelompok:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(membersList || []).map((m, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-bold">
                          {m.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Area Modul Aktif */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Modul Aktif Saat Ini:
                    </span>
                    <h5 className="font-extrabold text-xs text-slate-900 leading-snug">
                      "{group.activeModuleTitle}"
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      {group.description}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[10px] font-bold text-slate-500 border-t border-slate-200">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-blue-600" />
                        {group.fileName}
                      </span>
                      <span>{group.uploadDate}</span>
                    </div>
                  </div>
                </div>

                {/* Area Unggah Modul (Dedicated Slot) */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => {
                      setActiveUploadModal(key);
                      setUploadTitleInput(group.activeModuleTitle);
                      setUploadDescInput(group.description);
                      setSelectedFileName('');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Unggah Modul {group.groupName} (PDF)</span>
                  </button>
                  <p className="text-[10px] text-slate-400 font-medium text-center">
                    Hanya terkirim khusus ke siswa di {group.groupName}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* UPLOAD MODAL PER GROUP */}
      {activeUploadModal && groupModules[activeUploadModal] && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Unggah Modul Khusus {groupModules[activeUploadModal].groupName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Fokus Cara Belajar: {groupModules[activeUploadModal].approachType}
                </p>
              </div>
              <button
                onClick={() => setActiveUploadModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Judul Modul Belajar Siswa:
                </label>
                <input
                  type="text"
                  placeholder="Misal: Modul 1: Panduan Visual & Grafik Dinamika Gerak"
                  value={uploadTitleInput}
                  onChange={(e) => setUploadTitleInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Deskripsi / Petunjuk Memahami Modul:
                </label>
                <textarea
                  rows={3}
                  placeholder="Petunjuk ringkas untuk siswa dalam memahami materi ini..."
                  value={uploadDescInput}
                  onChange={(e) => setUploadDescInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Pilih File Dokumen (PDF / PPTX):
                </label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-blue-500 bg-slate-50 cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf, .pptx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <FileUp className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <span className="text-xs font-bold text-slate-800 block">
                    {selectedFileName || 'Klik untuk memilih file PDF dari komputer'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Hanya terdistribusi ke siswa {groupModules[activeUploadModal].groupName}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setActiveUploadModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleUploadModuleForGroup(activeUploadModal)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs cursor-pointer"
              >
                Unggah &amp; Distribusikan Modul
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function TeacherClassroomGroups(props) {
  return (
    <GroupErrorBoundary>
      <TeacherClassroomGroupsContent {...props} />
    </GroupErrorBoundary>
  );
}
