import React from 'react';
import { FlaskConical, Battery, Factory, ShieldCheck } from 'lucide-react';

export default function ChemistryVisualizer({ 
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

  // 3A: Pharmacy & Reaction Kinetics
  if (experimentId === '3A') {
    const { tempC = 37, surfaceArea = 5 } = sliderValues;
    const isOverheat = consequence?.status === 'danger';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <FlaskConical className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Industri Farmasi & Kinetika Reaksi
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Persamaan Arrhenius k = A · e^(-Ea / RT)
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            k = A · e^(-Ea/RT)
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR LAJU KELARUTAN OBAT:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Denaturasi Molekul
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Kelarautan Optimal
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isOverheat ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid3a" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid3a)" />

            {/* Beaker & Molecules (Royal Indigo #2563EB) */}
            <rect x="200" y="80" width="100" height="140" fill="rgba(37, 99, 235, 0.1)" stroke="#2563EB" strokeWidth="3" rx="8" />

            <text x="160" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Suhu T = {tempC}°C | Luas Permukaan A = {surfaceArea} cm²
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // 3B: EV Battery Nernst
  if (experimentId === '3B') {
    const { concIon = 1, tempK = 298 } = sliderValues;
    const isDegraded = consequence?.status === 'danger';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Battery className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Baterai Mobil Listrik & Elektrokimia Nernst
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Potensial Sel E = E° - (RT/nF) · ln Q
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            E = E° - (RT/nF)ln Q
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR TEGANGAN SEL BATERAI EV:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Tegangan Anjlok
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Tegangan Sel Stable
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isDegraded ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid3b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid3b)" />

            <text x="160" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Konsentrasi Ion = {concIon} M | Suhu T = {tempK} K
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // 3C: Haber-Bosch Ammonia
  if (experimentId === '3C') {
    const { pressureAtm = 200, tempC = 450 } = sliderValues;
    const isLowYield = consequence?.status === 'warning';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Factory className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Sintesis Amonia Haber-Bosch & Kesetimbangan
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Prinsip Le Chatelier N₂ + 3H₂ ⇌ 2NH₃ (ΔH {'<'} 0)
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Kp = P(NH₃)² / (P_N2 · P_H2³)
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR HASIL RENDEMEN AMONIA:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-amber-400 rounded-l-full flex items-center justify-center text-[8px] font-bold text-slate-900">
              Rendemen Rendah
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Sintesis Optimal 95%
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isLowYield ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid3c" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid3c)" />

            <text x="160" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Tekanan P = {pressureAtm} atm | Suhu T = {tempC}°C
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
