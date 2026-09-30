import React, { useState } from 'react';
import { 
  AlertCircle, 
  Lightbulb, 
  Users, 
  HelpCircle as QuestionMarkIcon 
} from 'lucide-react';

export default function TeacherCheatSheet({ onOpenProjector, onNavigateToGroups }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'misconceptions' | 'prompts'

  const misconceptionList = [
    {
      id: 'm1',
      title: 'Miskonsepsi Kecepatan vs Percepatan di Puncak',
      isRequired: true,
      text: 'Siswa sering mengira bahwa kecepatan bernilai nol di titik puncak berarti percepatan juga nol (padahal a = -g).',
      remedy: 'Tegaskan ke siswa bahwa gravitasi bumi konstan menarik benda ke bawah (a = -9.8 m/s²). Kecepatan vertikal vy bertukar arah dari positif menjadi negatif, sehingga tepat di puncak nilainya melewatin titik nol sekilas.',
      quickQuestion: 'Tanya ke kelas: Jika percepatan di puncak adalah nol, apakah benda akan melayang selamanya?'
    },
    {
      id: 'm2',
      title: 'Miskonsepsi Sudut Peluncuran Optimal',
      isRequired: false,
      text: 'Siswa beranggapan sudut 90° selalu menghasilkan jangkauan paling jauh karena paling tinggi.',
      remedy: 'Jelaskan perbedaan ketinggian maksimum (h_max) dengan jangkauan horizontal (R_max). Sudut 90° hanya menghasilkan gerak vertikal tanpa perpindahan X.',
      quickQuestion: 'Bandingkan sudut 30° vs 60°: Mengapa keduanya menghasilkan jangkauan horizontal yang sama persis?'
    },
    {
      id: 'm3',
      title: 'Miskonsepsi Kecepatan Sumbu X Bertambah',
      isRequired: false,
      text: 'Siswa mengira dorongan awal terus mempercepat sumbu X saat benda terbang.',
      remedy: 'Jika hambatan udara diabaikan, tidak ada gaya horizontal yang bekerja (Fx = 0). Maka percepatan ax = 0, sehingga vx bernilai konstan sepanjang lintasan.',
      quickQuestion: 'Apa yang terjadi pada lintasan roket jika terdapat gaya gesek udara yang membesar kuadratik terhadap laju?'
    }
  ];

  const socraticPromptList = [
    {
      id: 'p1',
      isRequired: true,
      prompt: 'Tanyakan ke siswa: Apa yang terjadi pada trajektori jika sudut dinaikkan dari 45° ke 70° tanpa mengubah gaya dorong?',
      expectedInsight: 'Siswa dapat menganalisis bahwa ketinggian puncak h_max akan naik drastis, tetapi jangkauan horizontal R_max berkurang karena waktu di udara tidak dimanfaatkan secara optimal untuk pergerakan sumbu X.',
      level: 'Penalaran Konseptual',
      tag: 'Sudut vs Jangkauan'
    },
    {
      id: 'p2',
      isRequired: false,
      prompt: 'Tanyakan ke siswa: Mengapa komponen kecepatan horizontal (vx) bernilai konstan jika hambatan udara diabaikan?',
      expectedInsight: 'Siswa menyadari bahwa Hukum I Newton berlaku pada sumbu X karena tidak ada gaya luar yang bekerja pada arah horizontal.',
      level: 'Hukum Newton & Vektor',
      tag: 'Kinematika Dasar'
    },
    {
      id: 'p3',
      isRequired: false,
      prompt: 'Tanyakan ke siswa: Manakah yang lebih dahulu menyentuh tanah: peluru yang ditembakkan mendatar atau peluru yang dijatuhkan dari ketinggian yang sama pada detik bersamaan?',
      expectedInsight: 'Siswa memahami independensi gerak sumbu X dan Y: keduanya jatuh dalam waktu t = √(2h/g) yang sama persis!',
      level: 'Intuisi Fisika HOTS',
      tag: 'Teka-teki Parabola'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">

      {/* 1. HEADER SECTION (CLEAN LIGHT DESIGN SYSTEM) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Sedang Diajarkan: Parabola &amp; Kalkulus Vektor</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                Kelas XII IPA 1
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Catatan Pengajar &amp; Panduan Konsep</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
              Panel asisten mengajar modern untuk tatap muka kelas. Berisi poin kunci pengajaran, peringatan miskonsepsi umum siswa, dan pertanyaan pemantik penalaran Socratic.
            </p>
          </div>

          {/* HEADER ACTIONS */}
          {onNavigateToGroups && (
            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
              <button
                onClick={onNavigateToGroups}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Users className="w-4 h-4 text-white" />
                <span>Manajemen Kelompok ↗</span>
              </button>
            </div>
          )}
        </div>

        {/* 2. TAB FILTER CEPAT */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filter Tampilan:</span>
          {[
            { id: 'all', label: 'Semua Catatan', count: 6 },
            { id: 'misconceptions', label: 'Miskonsepsi Umum', count: 3 },
            { id: 'prompts', label: 'Pertanyaan Pemantik', count: 3 },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CONTENT GRID CARDS */}
      <div className="space-y-8">
        
        {/* SECTION A: MISKONSEPSI SISWA YANG PERLU DIANTISIPASI */}
        {(activeTab === 'all' || activeTab === 'misconceptions') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Miskonsepsi Siswa yang Perlu Diantisipasi
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Perhatian khusus untuk guru sebelum memberikan pembahasan soal.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-black">
                Prioritas Mengajar
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {misconceptionList.map((m) => (
                <div
                  key={m.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                    m.isRequired
                      ? 'border-amber-300 bg-amber-50/60 shadow-xs hover:shadow-md'
                      : 'border-slate-200 bg-white hover:border-amber-300 shadow-2xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-black uppercase">
                        {m.isRequired ? 'Miskonsepsi Utama' : 'Peringatan Konsep'}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {m.title}
                    </h3>

                    {/* FORMULA / RUMUS WADAH KARTU PUTIH ELEGAN (CLEAN LIGHT MODE) */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs">
                      <p className="text-xs font-bold text-slate-800 leading-relaxed">
                        {m.text}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>Solusi Pelurusan Konsep:</span>
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {m.remedy}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-xs font-bold text-slate-700 italic">
                      Catatan Pertanyaan: "{m.quickQuestion}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION B: PERTANYAAN PEMANTIK NALAR (SOCRATIC PROMPTS) */}
        {(activeTab === 'all' || activeTab === 'prompts') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <QuestionMarkIcon className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Pertanyaan Pemantik Nalar (Metode Socratic)
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Lontarkan pertanyaan ini ke kelas untuk memicu diskusi nalar aktif.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-black">
                Metode Socratic
              </span>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-4">
                {socraticPromptList.map((p, idx) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200 hover:border-blue-400 hover:bg-white transition-all space-y-3"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <QuestionMarkIcon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                            Pertanyaan Pemantik #{idx + 1} • {p.tag}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[10px] font-bold">
                            {p.level}
                          </span>
                        </div>

                        <p className="text-base font-extrabold text-slate-900 leading-relaxed">
                          "{p.prompt}"
                        </p>

                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-medium space-y-1">
                          <span className="font-extrabold text-blue-900 uppercase tracking-wider text-[10px] block">
                            Jawaban / Kesimpulan Nalar Diharapkan dari Siswa:
                          </span>
                          <p className="leading-relaxed">{p.expectedInsight}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
