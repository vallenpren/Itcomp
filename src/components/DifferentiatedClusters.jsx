import React from 'react';
import { 
  Users, 
  Brain, 
  Lightbulb, 
  Target, 
  Compass, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  BookOpen, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function DifferentiatedClusters() {
  const clustersData = [
    {
      id: 'cluster-a',
      title: 'Klaster A: Pemikir Visual & Kontekstual',
      studentCount: 12,
      percentage: '37.5%',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      iconColor: 'bg-blue-600 text-white',
      trait: 'Memahami konsep terbaik lewat diagram, grafik parabola, dan skenario dunia nyata.',
      tacticalAdvice: 'Gunakan Simulasi "Real-World Sandbox" (lintasan roket/basket) sebelum memperkenalkan rumus aljabar murni.',
      studentsList: ['Budi Pratama', 'Ahmad Dahlan', 'Dewi Lestari', '+9 Siswa']
    },
    {
      id: 'cluster-b',
      title: 'Klaster B: Pemikir Prosedural & Langkah',
      studentCount: 14,
      percentage: '43.8%',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      iconColor: 'bg-teal-600 text-white',
      trait: 'Sangat kuat dan rapi dalam pengerjaan langkah aljabar, namun rawan kaku saat soal cerita diubah.',
      tacticalAdvice: 'Berikan variasi soal cerita dengan pola kalimat berbeda agar tidak terjebak hafalan urutan langkah.',
      studentsList: ['Rizky Febian', 'Nabila Syakieb', 'Andi Wijaya', '+11 Siswa']
    },
    {
      id: 'cluster-c',
      title: 'Klaster C: Penalar Kritis & Eksploratif',
      studentCount: 6,
      percentage: '18.7%',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      iconColor: 'bg-purple-600 text-white',
      trait: 'Kecepatan pemahaman sangat tinggi. Cepat bosan dengan soal rutin tingkat dasar.',
      tacticalAdvice: 'Berikan peran sebagai fasilitator kelompok atau beri soal tantangan tingkat HOTS & Olympiad.',
      studentsList: ['Siti Nurhaliza', 'Farhan Kurniadi', '+4 Siswa']
    }
  ];

  const aiTopDiscussions = [
    {
      topic: 'Perbedaan Kecepatan vs Kelajuan Vektor',
      percentage: '70% Siswa',
      note: 'Siswa sering keliru menghitung perpindahan total dibanding jarak tempuh.',
      badge: 'Banyak Ditanyakan'
    },
    {
      topic: 'Makna Fisik Determinan Matriks (det = 0)',
      percentage: '45% Siswa',
      note: 'Siswa bertanya ke Socratic AI mengapa det = 0 menyebabkan matriks tak punya invers.',
      badge: 'Konseptual'
    },
    {
      topic: 'Titik Puncak Parabola Turunan f\'(x) = 0',
      percentage: '35% Siswa',
      note: 'Siswa meminta analogi garis singgung horizontal.',
      badge: 'Kalkulus'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. REKOMENDASI TAKTIS TATAP MUKA UNTUK GURU */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-teal-400 font-extrabold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 fill-teal-400" />
          <span>Rekomendasi Tatap Muka Guru Hari Ini (Classroom Teaching Tips)</span>
        </div>

        <h3 className="text-xl font-extrabold text-white leading-tight">
          Saran Strategi Pembelajaran Berdiferensiasi di Kelas
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed font-medium max-w-3xl">
          💡 <strong>Tips Mengajar Hari Ini:</strong> Saat membahas materi <em>Vektor & Trigonometri</em>, gunakan <strong>analogi kapal menyeberangi sungai dengan arus</strong> untuk <span className="text-blue-300 font-bold">Klaster A</span>, dan berikan <strong>soal analisis sudut rute penerbangan pesawat terbang</strong> untuk <span className="text-purple-300 font-bold">Klaster C</span>!
        </p>

        <div className="pt-2 flex items-center gap-2 text-[11px] text-teal-300 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>Diperbarui otomatis dari hasil analisis pengerjaan & gaya nalar 32 siswa.</span>
        </div>
      </div>

      {/* 2. 3 KLASTER PEMBELAJARAN BERDIFERENSIASI */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-extrabold text-slate-900">Differentiated Learning Clusters (3 Klaster Gaya Nalar)</h3>
          <p className="text-xs text-slate-500">Pengelompokan otomatis berdasarkan kebiasaan berpikir siswa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {clustersData.map((cluster) => (
            <div
              key={cluster.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl ${cluster.iconColor} flex items-center justify-center font-extrabold text-xs`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${cluster.badgeColor}`}>
                    {cluster.studentCount} Siswa ({cluster.percentage})
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-sm">{cluster.title}</h4>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {cluster.trait}
                </p>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Saran Pendekatan Guru:</span>
                  <p className="font-bold text-slate-800 leading-snug">{cluster.tacticalAdvice}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span>Anggota: {cluster.studentsList.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PANTAUAN AKTIVITAS DISKUSI AI (TOPIC MONITOR) */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Pantauan Aktivitas Diskusi Socratic AI</h3>
              <p className="text-xs text-slate-500">Ringkasan topik apa yang paling sering ditanyakan siswa ke AI.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">Total Diskusi: 142 Sesi</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {aiTopDiscussions.map((disc, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                  {disc.badge}
                </span>
                <span className="font-extrabold text-xs text-purple-700">{disc.percentage}</span>
              </div>

              <h4 className="font-bold text-xs text-slate-900 leading-tight">{disc.topic}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">{disc.note}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
