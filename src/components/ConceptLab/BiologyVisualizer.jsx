import React from 'react';
import { Dna, Bug, Activity, Scissors } from 'lucide-react';

export default function BiologyVisualizer({ 
  experimentId, 
  sliderValues, 
  consequence, 
  isSimulating, 
  simulationProgress = 0, 
  simulationTime = 0, 
  hasRun = false 
}) {
  const currentPct = isSimulating ? simulationProgress : (hasRun ? 100 : 70);

  const getStatusZone = (status) => {
    if (status === 'optimal') return { color: '#10B981', label: 'RENTANG AMAN (OPTIMAL)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (status === 'warning') return { color: '#F59E0B', label: 'MENDEKATI BATAS KRITIS (WARNING)', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { color: '#EF4444', label: 'AMBANG GAGAL / HANCUR (DANGER)', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  const statusZone = getStatusZone(consequence?.status);

  // 4A: Lotka-Volterra Predator Prey
  if (experimentId === '4A') {
    const { preyPop = 100, predatorPop = 20 } = sliderValues;
    const isExtinct = consequence?.status === 'danger';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Bug className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Ekologi & Model Lotka-Volterra
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Dinamika Populasi Predator vs Mangsa dx/dt = αx - βxy
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            dx/dt = αx - βxy
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR KESEIMBANGAN EKOSISTEM:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Pest Outbreak / Kepunahan
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Ekosistem Stabil
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isExtinct ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid4a" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid4a)" />

            <text x="160" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Populasi Mangsa = {preyPop} | Populasi Predator = {predatorPop}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // 4B: Nerves Action Potential
  if (experimentId === '4B') {
    const { stimVoltage = 50 } = sliderValues;

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Bio-Medis & Impuls Saraf Potensial Aksi
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Depolarisasi Membran & Pompa Na+/K+
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Threshold -55mV
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR TRANSMISI IMPULS SARAF:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-amber-400 rounded-l-full flex items-center justify-center text-[8px] font-bold text-slate-900">
              Sub-Threshold Gagal
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Potensial Aksi Terembus
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: stimVoltage < 55 ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid4b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid4b)" />

            <text x="160" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Stimulus Voltase = {stimVoltage} mV
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // 4C: CRISPR Mendel
  if (experimentId === '4C') {
    const { dominantAlleleRatio = 50 } = sliderValues;

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Dna className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                CRISPR Gene Editing & Pewarisan Sifat
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Peluang Genotipe Mendel & Persamaan Hardy-Weinberg
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            p² + 2pq + q² = 1
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR EKSPRESI FENOTIPE:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-emerald-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Fenotip Dominan
            </div>
            <div className="w-1/2 h-full bg-teal-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Resesif Carrier
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: '50%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid4c" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid4c)" />

            <text x="160" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Rasio Alel Dominan = {dominantAlleleRatio}%
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
