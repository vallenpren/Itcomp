import React, { useState, useEffect } from 'react';
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

import FormattedFormula from '../FormattedFormula';

export default function FormulaTrickModal({ isOpen, onClose, experiment }) {
  const [activeTab, setActiveTab] = useState('logika'); // 'logika' | 'langkah' | 'tips'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !experiment) return null;

  const tricks = experiment.formulaTricks || getFallbackTricks(experiment);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* STICKY HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Bongkar Rahasia Rumus &amp; Trik 💡</h3>
            <p className="text-xs text-slate-500">Eksperimen {experiment.id}: {experiment.title}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SINGLE SCROLL CONTAINER (Box Rumus + Tab Nav + Content All Flow Naturally) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 pb-6 text-slate-800">
          
          {/* 1. FORMULA CARD BANNER */}
          <FormattedFormula
            math={experiment.formula}
            label={`Formula Utama Eksperimen ${experiment.id}`}
            explanation={experiment.title}
            variables={tricks.symbolBreakdown?.map(item => ({
              symbol: item.symbol,
              label: item.name || item.meaning
            })) || []}
            accentColor="indigo"
          />

          {/* 2. TAB NAVIGATION BAR (Static inside Scroll Container) */}
          <div className="flex border border-slate-200 bg-slate-100 p-1.5 gap-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('logika')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'logika'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Brain className="w-4 h-4 text-blue-600" />
              <span>Tab 1: Logika Rumus</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('langkah')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'langkah'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-4 h-4 text-teal-600" />
              <span>Tab 2: 3 Langkah</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tips')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'tips'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Tab 3: Tips &amp; Trik</span>
            </button>
          </div>

          {/* 3. TAB EXPLANATION CONTENTS */}
          {activeTab === 'logika' && (
            <div className="space-y-4">
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

          {activeTab === 'langkah' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">{tricks.step1Title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tricks.step1Desc}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">{tricks.step2Title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tricks.step2Desc}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">{tricks.step3Title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tricks.step3Desc}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-800 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Jebakan Batman Yang Sering Bikin Salah:</span>
                </div>
                <p className="text-xs text-amber-900 font-medium leading-relaxed">
                  {tricks.jebakanBatman}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-800 uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span>Trik Menalar Cepat Tanpa Hitung Rumit:</span>
                </div>
                <p className="text-xs text-indigo-900 font-medium leading-relaxed">
                  {tricks.trikMenalar}
                </p>
              </div>

              {tricks.contohSoal && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    Contoh Soal TKA &amp; Solusi Logis:
                  </h4>
                  <p className="text-xs text-slate-800 font-medium">
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

        {/* STICKY FOOTER */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-white shrink-0 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs cursor-pointer"
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
