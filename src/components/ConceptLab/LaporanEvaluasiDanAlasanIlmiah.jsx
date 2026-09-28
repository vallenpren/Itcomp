import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Brain, 
  Target
} from 'lucide-react';
import FormattedFormula from '../FormattedFormula';
import { evaluateExperiment } from '../../data/evaluationEngine';

export default function LaporanEvaluasi({ 
  burnRate,
  fuelBurnRate, 
  payloadMass, 
  experimentId = '1A',
  sliderValues = {},
  result = null,
  experiment = null,
  onReset
}) {
  const activeExpId = experimentId || experiment?.id || '1A';

  // Ensure active sliderValues override any static fallback props
  const activeParams = {
    ...sliderValues,
    burnRate: sliderValues?.fuelBurnRate ?? sliderValues?.burnRate ?? fuelBurnRate ?? burnRate ?? 150,
    fuelBurnRate: sliderValues?.fuelBurnRate ?? sliderValues?.burnRate ?? fuelBurnRate ?? burnRate ?? 150,
    payloadMass: sliderValues?.payloadMass ?? payloadMass ?? 4000
  };

  // Direct dynamic re-evaluation on EVERY render using current active parameters
  const evalData = evaluateExperiment(activeExpId, activeParams);
  const isSuccess = evalData.status === 'optimal';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* HEADER REPORT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Laporan Evaluasi & Alasan Ilmiah</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
              Eksperimen {activeExpId}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Hasil Diagnosis Simulasi Eksperimen
          </h2>
        </div>
      </div>

      {/* BOX STATUS */}
      <div className={`p-4 rounded-2xl border ${isSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'} flex items-start sm:items-center gap-3.5 shadow-xs`}>
        <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 border border-slate-200/60">
          {isSuccess ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          ) : (
            <XCircle className="w-6 h-6 text-rose-600" />
          )}
        </div>
        <div className="space-y-0.5 flex-1">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${isSuccess ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
              STATUS HASIL
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              Kalkulasi Live Slider
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
            {evalData.statusTitle}
          </h3>
        </div>
      </div>

      {/* THREE-PART STRUCTURED REPORT (BOX A, BOX B, BOX C) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* BOX A: Mengapa Hasilnya Seperti Ini? */}
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
              {evalData.whyText}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-blue-600 font-semibold flex items-center gap-1">
            <Brain className="w-3.5 h-3.5 text-blue-500" />
            <span>Visual sains ramah & santai</span>
          </div>
        </div>

        {/* BOX B: Kaitan Konsep Sains/Matematika */}
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
              {evalData.conceptText}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <FormattedFormula
              math={evalData.formulaKatex || experiment?.formula || "f'(t) = \\frac{dv}{dt}"}
              inline={true}
            />
          </div>
        </div>

        {/* BOX C: Langkah Agar Eksperimen Optimal */}
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
              {evalData.solutionText}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-emerald-500" />
            <span>Rekomendasi Presisi Siap Uji</span>
          </div>
        </div>
      </div>
    </div>
  );
}
