import React, { useState } from 'react';
import { 
  X, 
  Lightbulb, 
  BookOpen, 
  AlertTriangle, 
  Zap, 
  Target, 
  Brain,
  Sparkles
} from 'lucide-react';

export default function FormulaTrickModal({ isOpen, onClose, experiment }) {
  const [activeTab, setActiveTab] = useState('logika'); // 'logika' | 'langkah' | 'tips'

  if (!isOpen || !experiment) return null;

  const tricks = experiment.formulaTricks || getFallbackTricks(experiment);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white border border-slate-200 rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 text-white flex items-start justify-between relative overflow-hidden shrink-0">
          <div className="space-y-1 z-10 pr-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-300" />
                <span>Rahasia Rumus & Trik Soal</span>
              </span>
              <span className="text-[10px] font-mono text-blue-100 uppercase font-bold">
                Eksperimen {experiment.id}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
              Bongkar Rahasia Rumus & Trik Mengerjakan 💡
            </h2>
            <p className="text-xs text-blue-100 font-medium line-clamp-1">
              {experiment.title}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 z-10"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORMULA CARD BANNER */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-slate-800 font-mono text-xs flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider shrink-0 font-sans">Formula Utama:</span>
            <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl font-extrabold text-blue-700 tracking-wide text-xs sm:text-sm shadow-xs">
              {experiment.formula}
            </span>
          </div>
        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="flex border-b border-slate-200 bg-slate-100 p-1.5 gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('logika')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'logika'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Brain className="w-4 h-4 text-blue-600" />
            <span>Tab 1: Logika Rumus</span>
          </button>

          <button
            onClick={() => setActiveTab('langkah')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'langkah'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4 text-teal-600" />
            <span>Tab 2: 3 Langkah Mudah</span>
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'tips'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Tab 3: Tips & Trik Ujian</span>
          </button>
        </div>

        {/* MODAL CONTENT BODY */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-800 flex-1">
          
          {/* TAB 1: LOGIKA RUMUS */}
          {activeTab === 'logika' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-blue-700 tracking-wider">
                  <Brain className="w-4.5 h-4.5 text-blue-600" />
                  <span>Kenapa Rumus Ini Tercipta? (Tanpa Istilah Kaku)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {tricks.logikaOverview}
                </p>
              </div>

              {/* Symbol breakdowns */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Arti Logis di Balik Simbol Rumus:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tricks.symbolBreakdown?.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-extrabold text-xs text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{item.unit}</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900">{item.name}</h5>
                      <p className="text-[11px] text-slate-600 leading-normal">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 3 LANGKAH MUDAH MENGERJAKAN */}
          {activeTab === 'langkah' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-800 font-medium">
                🎯 <strong>Prinsip 3 Langkah Anti-Gagal:</strong> Selalu ikuti urutan ini saat mengerjakan soal ujian agar tidak terjebak kebingungan rumus!
              </div>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {tricks.step1Title || "Identifikasi Diketahui & Ditanya (Pisahkan Variabel)"}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {tricks.step1Desc}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {tricks.step2Title || "Masukkan Angka ke Rumus Dasar Sederhana"}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {tricks.step2Desc}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {tricks.step3Title || "Cek Ke-Logisan Hasil Secara Sains/Matematika"}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {tricks.step3Desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TIPS & TRIK KILAT UJIAN */}
          {activeTab === 'tips' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Jebakan Batman Box */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-rose-700 tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>🦇 Jebakan Batman Soal Ujian (Hati-hati!)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {tricks.jebakanBatman}
                </p>
              </div>

              {/* Trik Cepat Menalar Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-amber-800 tracking-wider">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>⚡ Trik Cepat Menalar (Tanpa Hitung Panjang)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {tricks.trikMenalar}
                </p>
              </div>

              {/* Contoh Soal Singkat */}
              {tricks.contohSoal && (
                <div className="p-4 rounded-2xl bg-slate-50 text-slate-900 space-y-2 font-mono border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider font-sans">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>Contoh Penerapan Kilat:</span>
                  </div>
                  <p className="text-xs text-slate-700 font-sans">
                    <strong>Soal:</strong> {tricks.contohSoal.q}
                  </p>
                  <div className="p-2.5 rounded-xl bg-white text-blue-700 text-xs border border-slate-200 font-sans">
                    💡 <strong>Solusi Kilat:</strong> {tricks.contohSoal.a}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-medium">
            SmartTKA EdTech Lab • Rumus Presisi
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-all shadow-sm active:scale-95"
          >
            Paham, Siap Praktikkan! 👍
          </button>
        </div>
      </div>
    </div>
  );
}

function getFallbackTricks(experiment) {
  return {
    logikaOverview: `Rumus ${experiment?.formula || ''} diciptakan untuk mengukur perubahan atau reaksi variabel output akibat perubahan parameter masukan. Semakin besar variabel pengontrol, semakin signifikan perubahan sistem yang terjadi secara eksponensial maupun linier.`,
    symbolBreakdown: [
      { symbol: "F / Y", name: "Output Utama", unit: "Satuan Output", meaning: "Nilai hasil akhir sistem yang diukur." },
      { symbol: "x / t", name: "Variabel Masukan", unit: "Satuan Input", meaning: "Parameter kontrol yang kita ubah lewat slider." }
    ],
    step1Title: "1. Tuliskan Variabel yang Diketahui & Ditanya",
    step1Desc: "Pisahkan mana nilai input slider (seperti massa, suhu, frekuensi, atau sudut) dan tentukan besaran fisik/matematika yang ingin dicari.",
    step2Title: "2. Masukkan Angka ke Rumus Yang Disederhanakan",
    step2Desc: "Substitusikan nilai variabel yang sudah dipisahkan ke dalam rumus dasar. Sederhanakan bentuk perkalian atau pembagian sebelum menghitung angka rumit.",
    step3Title: "3. Evaluasi Kelogisan Fisik Hasil Akhir",
    step3Desc: "Periksa apakah hasilnya masuk akal. Contoh: percepatan harus bertanda positif jika objek bertambah cepat, dan efisiensi tidak pernah boleh melebihi 100%.",
    jebakanBatman: "⚠️ Hati-hati Konversi Satuan! Jangan pernah mencampur satuan gram dengan kilogram, jam dengan detik, atau Celcius dengan Kelvin!",
    trikMenalar: "⚡ Jika salah satu variabel masukan naik 2x lipat dan variabel tersebut memiliki pangkat kuadrat (x²), maka hasil akhir Y akan meloncat 4x lipat (2² = 4).",
    contohSoal: {
      q: "Berapa perubahan hasil jika salah satu variabel kontrol dinaikkan dua kali lipat?",
      a: "Gunakan analisis proporsionalitas tanpa menghitung ulang seluruh nilai rumit!"
    }
  };
}
