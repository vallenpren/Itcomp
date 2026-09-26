import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Lightbulb, 
  Target,
  Brain,
  BookOpen,
  RotateCcw
} from 'lucide-react';
import FormulaTrickModal from './FormulaTrickModal';

export default function ConsequenceEngine({ consequence, experiment, sliderValues, onReset }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!consequence || !experiment) return null;

  // Determine Banner colors & icons based on consequence status (Clean Light EdTech Theme)
  const getStatusBadgeConfig = () => {
    switch (consequence.status) {
      case 'optimal':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          badgeBg: 'bg-emerald-600 text-white',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600',
          title: consequence.title || 'BERHASIL: SIMULASI PADA RENTANG AMAN & OPTIMAL'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          badgeBg: 'bg-amber-500 text-slate-950',
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
          title: consequence.title || 'PERINGATAN: MENDEKATI BATAS KRITIS SISTEM'
        };
      case 'danger':
      default:
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          badgeBg: 'bg-rose-600 text-white',
          icon: XCircle,
          iconColor: 'text-rose-600',
          title: consequence.title || 'GAGAL: MELEBIHI AMBANG TOLERANSI MAKSIMAL'
        };
    }
  };

  const badgeConfig = getStatusBadgeConfig();
  const IconComponent = badgeConfig.icon;

  const getSectionA = () => {
    if (consequence.bagianA) return consequence.bagianA;
    if (consequence.explanation) return consequence.explanation;
    return "Hasil eksperimen ini ditentukan oleh interaksi linier/eksponensial antar variabel input yang dimasukkan lewat slider.";
  };

  const getSectionB = () => {
    if (consequence.bagianB) return consequence.bagianB;
    if (consequence.scientificReason) return consequence.scientificReason;
    return `Kaitan Hukum Sains/Matematika: Mengikuti formula dasar ${experiment.formula || ''}, di mana variabel pengontrol mempengaruhi besaran output secara langsung.`;
  };

  const getSectionC = () => {
    if (consequence.bagianC) return consequence.bagianC;
    if (consequence.recommendation) return consequence.recommendation;
    return "Sesuaikan slider kontrol menuju nilai preset [Kondisi Paling Optimal] untuk menjaga parameter tetap di rentang hijau aman.";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* HEADER REPORT & STATUS BADGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Laporan Evaluasi & Alasan Ilmiah</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
              Eksperimen {experiment.id}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Hasil Diagnosis Simulasi Eksperimen
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <Lightbulb className="w-4 h-4 text-slate-950 fill-current" />
            <span>Pelajari Trik Rumus Ini 💡</span>
          </button>

          <button
            onClick={onReset}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            title="Reset Slider"
          >
            <RotateCcw className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* PROMINENT ALERT BANNER */}
      <div className={`p-4 rounded-2xl border ${badgeConfig.bg} flex items-start sm:items-center gap-3.5 shadow-xs`}>
        <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 border border-slate-200/60">
          <IconComponent className={`w-6 h-6 ${badgeConfig.iconColor}`} />
        </div>
        <div className="space-y-0.5 flex-1">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${badgeConfig.badgeBg}`}>
              STATUS HASIL
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              Evaluasi Otomatis Engine
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
            {badgeConfig.title}
          </h3>
        </div>
      </div>

      {/* THREE-PART STRUCTURED REPORT (BAGIAN A, BAGIAN B, BAGIAN C) - CLEAN WHITE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* BAGIAN A: Mengapa Hasilnya Seperti Ini? */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 flex flex-col justify-between shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-700">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center font-mono text-blue-600 font-extrabold">
                A
              </div>
              <span>Mengapa Hasilnya Seperti Ini?</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              Penjelasan Fenomena Real-World
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {getSectionA()}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-blue-600 font-semibold flex items-center gap-1">
            <Brain className="w-3.5 h-3.5 text-blue-500" />
            <span>Visual sains ramah & santai</span>
          </div>
        </div>

        {/* BAGIAN B: Kaitan Konsep Sains/Matematika */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 flex flex-col justify-between shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-teal-700">
              <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center font-mono text-teal-600 font-extrabold">
                B
              </div>
              <span>Kaitan Konsep Sains/Matematika</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              Persamaan & Hukum Fundamental
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {getSectionB()}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-teal-600 font-semibold font-mono flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-teal-500" />
            <span className="truncate">Formula: {experiment.formula}</span>
          </div>
        </div>

        {/* BAGIAN C: Langkah Agar Eksperimen Optimal (Tindakan Nyata) */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 flex flex-col justify-between shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center font-mono text-emerald-600 font-extrabold">
                C
              </div>
              <span>Langkah Agar Eksperimen Optimal</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900">
              Tindakan Nyata Solutif
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {getSectionC()}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-emerald-500" />
            <span>Rekomendasi Presisi Siap Uji</span>
          </div>
        </div>

      </div>

      {/* POPUP MODAL: BONGKAR RAHASIA RUMUS & TRIK */}
      <FormulaTrickModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        experiment={experiment}
      />
    </div>
  );
}
