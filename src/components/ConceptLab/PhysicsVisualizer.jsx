import React from 'react';
import { Gauge, ShieldCheck, Flame, Zap, Wind, Atom } from 'lucide-react';

export default function PhysicsVisualizer({ 
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

  // 2A: Supercar & Fluid Dynamics (Bernoulli)
  if (experimentId === '2A') {
    const { velocity = 250, wingAngle = 12, airDensity = 1.2 } = sliderValues;

    const isStall = consequence?.status === 'danger';
    const isDragExcess = consequence?.status === 'warning';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
              <Wind className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Supercar & Aerodinamika Fluid Dynamics
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Persamaan Bernoulli P + ½ρv² + ρgh = konstan
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            P + ½ρv² = konstan
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR DOWNFORCE AERODINAMIKA:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/3 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Stall Hydroplaning
            </div>
            <div className="w-1/3 h-full bg-amber-400 flex items-center justify-center text-[8px] font-bold text-slate-900">
              Drag Lambat
            </div>
            <div className="w-1/3 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Downforce Ideal
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isStall ? '16.5%' : (isDragExcess ? '50%' : '83.5%')
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid2a" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid2a)" />

            {/* Air Streamlines (Royal Indigo #2563EB & Soft Teal #0D9488) */}
            {[60, 90, 120, 150, 180, 210].map((y, i) => (
              <path
                key={i}
                d={`M 0 ${y} Q 200 ${y - (i < 3 ? 30 : -10)} 500 ${y}`}
                fill="none"
                stroke={i < 3 ? '#2563EB' : '#0D9488'}
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            ))}

            {/* Wing Airfoil Blade */}
            <g transform={`translate(220, 130) rotate(${-wingAngle})`}>
              <path d="M -60 0 Q 0 -35 80 0 Q 0 10 -60 0 Z" fill="#475569" stroke="#334155" strokeWidth="2" />
            </g>

            <text x="140" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Kecepatan v = {velocity} km/h | Sudut Sayap θ = {wingAngle}° | Kerapatan Udara ρ = {airDensity} kg/m³
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // 2B: Energy Reactor Carnot
  if (experimentId === '2B') {
    const { tempHot = 800, tempCold = 300, compressionRatio = 10 } = sliderValues;
    const isMelt = consequence?.status === 'danger';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
              <Flame className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Reaktor Energi & Termodinamika Carnot
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Efisiensi Maksimal η = 1 - (T_dingin / T_panas)
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            η = 1 - (Tc/Th)
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR EFISIENSI TERMAL TERMODINAMIKA:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Overheat Piston Melumer
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Efisiensi Ideal Carnot
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isMelt ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid2b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid2b)" />

            {/* Carnot Piston Chamber */}
            <rect x="180" y="40" width="140" height="180" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" rx="8" />
            <rect x="186" y="80" width="128" height="30" fill="#2563EB" rx="4" />

            <text x="140" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Reservoir Panas Th = {tempHot} K | Cold Tc = {tempCold} K
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // 2C: 5G & EM Waves
  if (experimentId === '2C') {
    const { frequencyGHz = 3.5, wallThicknessCm = 15 } = sliderValues;

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
              <Zap className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Telekomunikasi 5G & Gelombang Elektromagnetik
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Resonansi & Atenuasi Sinyal I = I₀ · e^(-αx)
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            c = f · λ
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR PENETRASI SINYAL 5G:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Sinyal Terblokir (Dead Zone)
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Sinyal Transmisi Jelas
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: consequence?.status === 'danger' ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid2c" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid2c)" />

            {/* EM Wave Sine Path (Royal Indigo #2563EB) */}
            <path
              d="M 20 140 Q 60 70 100 140 T 180 140 T 260 140 T 340 140 T 420 140 T 480 140"
              fill="none"
              stroke="#2563EB"
              strokeWidth="3"
            />

            {/* Concrete Wall Obstacle */}
            <rect x="230" y="40" width={wallThicknessCm * 2} height="200" fill="#94A3B8" opacity="0.8" rx="4" />

            <text x="140" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Frekuensi f = {frequencyGHz} GHz | Ketebalan Dinding = {wallThicknessCm} cm
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
