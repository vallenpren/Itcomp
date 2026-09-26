import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Eye, 
  AlertCircle, 
  Lightbulb, 
  Users, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function TeacherCheatSheet({ onOpenProjector }) {
  const studentGroups = [
    {
      id: 'group-visual',
      title: 'Kelompok 1: Pembelajar Visual & Gambar',
      studentCount: 12,
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      bgColor: 'bg-teal-50/90 border-teal-200',
      studentsList: ['Budi Pratama', 'Dewi Lestari', 'Ahmad Dahlan', 'Rani Wijaya', 'Doni Saputra', '+7 Siswa'],
      practicalTip: 'Tunjukkan simulasi gambar atau video di proyektor sebelum menuliskan rumus aljabar di papan tulis.'
    },
    {
      id: 'group-procedural',
      title: 'Kelompok 2: Pembelajar Hitungan & Langkah',
      studentCount: 14,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      bgColor: 'bg-amber-50/90 border-amber-200',
      studentsList: ['Rizky Febian', 'Nabila Syakieb', 'Andi Wijaya', 'Siti Rahma', 'Fajar Utama', '+9 Siswa'],
      practicalTip: 'Berikan contoh pengerjaan soal secara berurutan langkah demi langkah dari yang paling mudah ke yang rumit.'
    },
    {
      id: 'group-critical',
      title: 'Kelompok 3: Pembelajar Cepat & Tantangan',
      studentCount: 6,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      bgColor: 'bg-purple-50/90 border-purple-200',
      studentsList: ['Farhan Kurniadi', 'Maya Putri', 'Kevin Sanjaya', 'Aurel Hermansyah', '+2 Siswa'],
      practicalTip: 'Berikan soal teka-teki tantangan lebih dan ajak mereka membantu teman kelompok lain.'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-sans">
      
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2.5 text-amber-100 font-extrabold text-xs uppercase tracking-wider">
          <Sparkles className="w-5 h-5 text-amber-200 fill-amber-200" />
          <span>Panduan Tatap Muka Bebas Istilah Rumit</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Contekan Mengajar Hari Ini & Kelompok Siswa
        </h1>

        <p className="text-base text-amber-50 leading-relaxed font-medium max-w-3xl">
          Halaman sederhana khusus guru berisi teks rekomendasi ringkas mengajar di kelas hari ini tanpa jargon statistik yang membingungkan.
        </p>
      </div>

      {/* 3 RINGKASAN REKOMENDASI MENGAJAR (BESAR & JELAS MIN 16PX) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: SIAPA SISWA BUTUH DIBANTU VISUAL */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 hover:border-teal-300 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <Eye className="w-7 h-7" />
          </div>

          <span className="text-xs font-black uppercase text-teal-700 tracking-wider">Rekomendasi 1</span>
          <h3 className="text-lg font-black text-slate-900 leading-snug">
            Siswa yang Butuh Dibantu Visual
          </h3>

          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-1">
            <p className="text-sm font-extrabold text-teal-900">
              Budi Pratama, Dewi Lestari, Ahmad Dahlan, Doni, Rani (5 Siswa)
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            💡 <strong>Catatan Mengajar:</strong> Siswa ini mengerti 3x lebih cepat jika diperlihatkan gambar/animasi di proyektor sebelum melihat rumus matematika.
          </p>
        </div>

        {/* CARD 2: MATERI APA YANG PALING BANYAK SALAH */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 hover:border-red-300 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-7 h-7" />
          </div>

          <span className="text-xs font-black uppercase text-red-700 tracking-wider">Rekomendasi 2</span>
          <h3 className="text-lg font-black text-slate-900 leading-snug">
            Materi Paling Banyak Salah
          </h3>

          <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-100 space-y-1">
            <p className="text-sm font-extrabold text-red-900">
              Menghitung Ketinggian Maksimum (h_max)
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            ⚠️ <strong>Catatan Mengajar:</strong> 75% siswa di kelas terkecoh lupa bahwa pada titik tertinggi, kecepatan vertikal (v_y) bernilai nol.
          </p>
        </div>

        {/* CARD 3: IDE KEGIATAN KELAS HARI INI */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 hover:border-indigo-300 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Lightbulb className="w-7 h-7" />
          </div>

          <span className="text-xs font-black uppercase text-indigo-700 tracking-wider">Rekomendasi 3</span>
          <h3 className="text-lg font-black text-slate-900 leading-snug">
            Ide Kegiatan Kelas Hari Ini
          </h3>

          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1">
            <p className="text-sm font-extrabold text-indigo-900">
              Tantangan Tebak Sudut Lemparan Bola
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            🎯 <strong>Catatan Mengajar:</strong> Buka simulasi proyektor, lalu minta siswa menebak sudut berapa yang membuat bola meluncur paling jauh sebelum menunjukkannya di layar.
          </p>

          {onOpenProjector && (
            <button
              onClick={onOpenProjector}
              className="w-full mt-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Buka Proyektor Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* FITUR KELOMPOK SISWA (SIMPLIFIED WITH PASTEL COLOR BOXES) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Kelompok Belajar Siswa (Simplified)
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Pembagian kelompok belajar siswa dengan warna pastel yang lembut dilengkapi 1 kalimat tips praktis mengajar.
          </p>
        </div>

        {/* 3 PASTEL BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentGroups.map((group) => (
            <div
              key={group.id}
              className={`p-6 rounded-3xl border ${group.bgColor} shadow-xs space-y-4 flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${group.badgeColor}`}>
                    {group.studentCount} Siswa
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                  {group.title}
                </h3>

                {/* STUDENT NAME CARDS IN PASTEL CONTAINER */}
                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/60 space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kartu Nama Siswa:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {group.studentsList.map((name, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 1 KALIMAT TIPS PRAKTIS UNTUK GURU */}
              <div className="pt-3 border-t border-slate-200/60 space-y-1">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>1 Kalimat Tips Praktis Guru:</span>
                </span>
                <p className="text-sm font-bold text-slate-900 leading-snug italic">
                  "{group.practicalTip}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
