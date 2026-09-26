import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BarChart3, 
  AlertTriangle, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Download, 
  Brain, 
  X, 
  Sparkles,
  FileSpreadsheet,
  TrendingUp,
  Award,
  Compass,
  Layers
} from 'lucide-react';
import RadarChart from '../components/RadarChart';
import DifferentiatedClusters from '../components/DifferentiatedClusters';
import { MOCK_STUDENT_RECAP, ITEM_ANALYSIS_MOCK } from '../data/mockData';

export default function TeacherAnalyticsView({ assessment, onBack }) {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'differentiated'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState(null);

  const filteredStudents = MOCK_STUDENT_RECAP.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nisn.includes(searchQuery)
  );

  // Score distribution buckets for bar chart visual
  const scoreBuckets = [
    { label: '< 60 (Remedial)', count: 2, percentage: 7, color: 'bg-red-500' },
    { label: '60 - 75 (Cukup)', count: 4, percentage: 14, color: 'bg-amber-500' },
    { label: '76 - 85 (Baik)', count: 14, percentage: 50, color: 'bg-blue-600' },
    { label: '86 - 100 (Sangat Baik)', count: 8, percentage: 29, color: 'bg-teal-600' }
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-6xl mx-auto">
      
      {/* Top Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Teacher Hub</span>
        </button>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-teal-400" />
            <span>Unduh Laporan Excel</span>
          </button>
        </div>
      </div>

      {/* Assessment Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Analitik Diagnostik Asesmen Kelas
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              {assessment?.title || 'Simulasi TKA Matematika Saintek 2026'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Mata Pelajaran: <strong>{assessment?.subject || 'Matematika Saintek'}</strong> • Target: <strong>{assessment?.targetClass || 'XII MIPA 1'}</strong> • Pengumpulan: <strong>28/32 Siswa</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 self-start">
            <div className="text-center px-3 border-r border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Rata-rata</span>
              <p className="text-xl font-extrabold text-blue-600">82.4</p>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Kelulusan</span>
              <p className="text-xl font-extrabold text-teal-600">88%</p>
            </div>
          </div>
        </div>

        {/* View Tab Switcher */}
        <div className="flex gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analitik Nilai & Item Soal</span>
          </button>

          <button
            onClick={() => setActiveTab('differentiated')}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              activeTab === 'differentiated'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-300" />
            <span>Profil Pendekatan Kelas & Klaster Diferensiasi</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: ANALYTICS & ITEM ANALYSIS */}
      {activeTab === 'analytics' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left: Diagram Batang Sebaran Nilai */}
            <div className="md:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Sebaran Distribusi Nilai Kelas</h3>
                  <p className="text-xs text-slate-500">Visualisasi sebaran skor 28 siswa.</p>
                </div>
              </div>

              {/* Bar Chart Visual */}
              <div className="space-y-4 pt-2">
                {scoreBuckets.map((bucket, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700">{bucket.label}</span>
                      <span className="text-slate-900 font-bold">{bucket.count} Siswa ({bucket.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`${bucket.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${bucket.percentage * 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-400 text-center">
                *Batas KKM Kelulusan: <strong className="text-slate-700">75 Poin</strong>
              </div>
            </div>

            {/* Right: Analisis Butir Soal (Item Analysis Ringkas) */}
            <div className="md:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Analisis Butir Soal Dinding Kritis</h3>
                  <p className="text-xs text-slate-500">3 nomor dengan rasio kesalahan tertinggi di kelas.</p>
                </div>
              </div>

              {/* List of 3 Problematic Questions */}
              <div className="space-y-3">
                {ITEM_ANALYSIS_MOCK.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-red-100 text-red-700 font-extrabold text-xs flex items-center justify-center">
                          #{item.number}
                        </span>
                        <span className="font-bold text-xs text-slate-900">{item.topic}</span>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                        Salah: {item.errorRate}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-snug">
                      {item.analysisNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* TABEL REKAP SISWA & DIAGNOSTIK MODAL TRIGGER */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Tabel Rekapitulasi Siswa</h3>
                <p className="text-xs text-slate-500">Klik "Lihat Diagnostik" untuk membuka Spider Radar & rekomendasi individu.</p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari siswa / NISN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Table List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="p-3">Nama Siswa</th>
                    <th className="p-3">NISN</th>
                    <th className="p-3">Skor Akhir</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Waktu Pengerjaan</th>
                    <th className="p-3 text-right">Aksi Diagnostik</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{std.name}</td>
                      <td className="p-3 text-slate-500">{std.nisn}</td>
                      <td className="p-3 font-extrabold text-blue-700">{std.score} / 100</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          std.status === 'Tuntas' 
                            ? 'bg-teal-50 text-teal-700 border border-teal-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {std.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{std.duration}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedStudentForModal(std)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
                        >
                          Lihat Diagnostik
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </>
      )}

      {/* TAB CONTENT 2: DIFFERENTIATED LEARNING CLUSTERS */}
      {activeTab === 'differentiated' && (
        <DifferentiatedClusters />
      )}

      {/* POP-UP MODAL DIAGNOSTIK SISWA INDIVIDU */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 relative my-8">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center">
                  {selectedStudentForModal.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {selectedStudentForModal.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    NISN: {selectedStudentForModal.nisn} • Waktu: {selectedStudentForModal.timeSpent}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Pill */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Skor Akhir Siswa</span>
                <p className="text-2xl font-extrabold text-blue-700">{selectedStudentForModal.score} / 100</p>
              </div>

              <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                selectedStudentForModal.status === 'Tuntas' ? 'bg-teal-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {selectedStudentForModal.status} (KKM 75)
              </span>
            </div>

            {/* Spider Radar Chart */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-extrabold text-xs text-slate-700 text-center uppercase tracking-wider mb-2">
                Pemetaan Radar 5 Pilar Kompetensi Individu
              </h4>
              <RadarChart scores={selectedStudentForModal.competencyScores} />
            </div>

            {/* Actionable Follow Up Recommendation */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-800 font-bold text-xs">
                <Brain className="w-4 h-4 text-blue-600" />
                <span>Rekomendasi Tindak Lanjut Guru:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedStudentForModal.recommendation}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
              >
                Tutup Diagnostik
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
