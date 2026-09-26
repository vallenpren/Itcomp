import React from 'react';
import { Rocket, ShieldCheck, AlertTriangle, XCircle, TrendingUp, Layers } from 'lucide-react';

export default function MathVisualizer({ 
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

  // 1A: Aerospace & Differential Calculus
  if (experimentId === '1A') {
    const { fuelBurnRate = 150, payloadMass = 4000, launchAngle = 75 } = sliderValues;

    const rad = (launchAngle * Math.PI) / 180;
    const maxProgress = currentPct / 100;
    
    const startX = 60;
    const startY = 240;
    const peakX = startX + 220 * maxProgress * Math.cos(rad);
    const peakY = startY - 200 * maxProgress * Math.sin(rad);

    const isOrbitSuccessful = consequence?.status === 'optimal';
    const isOverheat = consequence?.status === 'warning';
    const isCrash = consequence?.status === 'danger';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Visualizer Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Rocket className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Aerospace & Kalkulus Diferensial
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Trajektori Roket & Turunan Laju Dorong f'(t) = dv/dt
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            f'(t) = dv/dt
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR STATUS ZONA KEAMANAN:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          {/* Color Boundary Range Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/3 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Atmosfer Jatuh
            </div>
            <div className="w-1/3 h-full bg-amber-400 flex items-center justify-center text-[8px] font-bold text-slate-900">
              Gesekan Panas
            </div>
            <div className="w-1/3 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Orbit LEO Safe
            </div>

            {/* Indicator Pin */}
            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isCrash ? '16.5%' : (isOverheat ? '50%' : '83.5%')
              }}
            />
          </div>
        </div>

        {/* Canvas Simulation Area (Clean Light Slate-100) */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Zone Lines */}
            <line x1="0" y1="90" x2="500" y2="90" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="15" y="82" fill="#0D9488" fontSize="9" fontWeight="bold" fontFamily="monospace">
              ZONA ORBIT AMAN (LEO) - Ketinggian {'>'} 200 km
            </text>

            <line x1="0" y1="180" x2="500" y2="180" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="15" y="172" fill="#D97706" fontSize="9" fontWeight="bold" fontFamily="monospace">
              ZONA GESEKAN ATMOSFER TEBAL
            </text>

            {/* Trajectory Curve (Royal Indigo #2563EB) */}
            <path
              d={`M ${startX} ${startY} Q ${startX + 100 * Math.cos(rad)} ${startY - 180 * Math.sin(rad)} ${peakX} ${peakY}`}
              fill="none"
              stroke="#2563EB"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Rocket Icon Container */}
            <g transform={`translate(${peakX}, ${peakY}) rotate(${90 - launchAngle})`}>
              <circle r="16" fill="#2563EB" opacity="0.15" />
              <g transform="translate(-10, -10)">
                <Rocket className="w-5 h-5 text-blue-600 fill-blue-600" />
              </g>
            </g>

            {/* Earth Horizon */}
            <path d="M 0 260 Q 250 240 500 260 L 500 280 L 0 280 Z" fill="#E2E8F0" stroke="#CBD5E1" />
            <text x="220" y="274" fill="#64748B" fontSize="10" fontWait="bold">Bumi (R = 6,371 km)</text>
          </svg>

          {/* Telemetry Overlay */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 shadow-sm text-[10px] font-mono space-y-1 text-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Laju Bakar f'(t):</span>
              <span className="font-bold text-blue-600">{fuelBurnRate} kg/s</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Massa Payload:</span>
              <span className="font-bold text-blue-600">{payloadMass} kg</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Sudut Luncur (θ):</span>
              <span className="font-bold text-blue-600">{launchAngle}°</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 1B: Civil Architecture & Integral Calculus
  if (experimentId === '1B') {
    const { archSpan = 500, cableThickness = 45, trafficLoad = 200 } = sliderValues;
    const isBroke = consequence?.status === 'danger';
    const isWarning = consequence?.status === 'warning';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Arsitektur Sipil & Kalkulus Integral
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Distribusi Momen Beban Jembatan Gantung M = ∫ w(x)·(L - x) dx
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            M = ∫ w(x) dx
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR INTEGRAL REGANGAN KABEL:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/3 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Kabel Putus
            </div>
            <div className="w-1/3 h-full bg-amber-400 flex items-center justify-center text-[8px] font-bold text-slate-900">
              Micro-Crack
            </div>
            <div className="w-1/3 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Struktur Safe
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isBroke ? '16.5%' : (isWarning ? '50%' : '83.5%')
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid1b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid1b)" />

            {/* Bridge Towers */}
            <rect x="100" y="50" width="20" height="170" fill="#64748B" rx="4" />
            <rect x="380" y="50" width="20" height="170" fill="#64748B" rx="4" />

            {/* Deck */}
            <rect x="60" y="210" width="380" height="12" fill="#475569" rx="2" />

            {/* Catenary Cable Parabola (Royal Indigo #2563EB) */}
            <path
              d="M 110 50 Q 250 200 390 50"
              fill="none"
              stroke={isBroke ? '#EF4444' : (isWarning ? '#F59E0B' : '#2563EB')}
              strokeWidth={Math.max(2, cableThickness / 10)}
              strokeDasharray={isBroke ? '8 4' : 'none'}
            />

            {/* Vertical Hanger Cables */}
            {[140, 180, 220, 250, 280, 320, 360].map((x, i) => (
              <line key={i} x1={x} y1="210" x2={x} y2={50 + Math.pow((x - 250)/10, 2) * 0.75} stroke="#94A3B8" strokeWidth="1.5" />
            ))}

            <text x="180" y="240" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Panas Span L = {archSpan} m | Beban w(x) = {trafficLoad} ton/m
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // 1C: Matrix Transformations
  if (experimentId === '1C') {
    const { rotationAngle = 45, scale3d = 1, translateX = 10 } = sliderValues;
    const isGlitch = consequence?.status === 'warning';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Computer Graphics & Matriks
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Transformasi Vektor 3D V' = M · V
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            V' = M · V
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR DETERMINAN MATRIKS:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-amber-400 rounded-l-full flex items-center justify-center text-[8px] font-bold text-slate-900">
              Determinan ~ 0 (Singular)
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Render 60 FPS Presisi
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isGlitch ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid1c" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid1c)" />

            {/* 3D Cube transformed (Royal Indigo #2563EB) */}
            <g transform={`translate(${250 + translateX}, 140) rotate(${rotationAngle}) scale(${scale3d})`}>
              <rect x="-40" y="-40" width="80" height="80" fill="rgba(37, 99, 235, 0.2)" stroke="#2563EB" strokeWidth="2.5" rx="8" />
              <line x1="-40" y1="-40" x2="-20" y2="-60" stroke="#2563EB" strokeWidth="2" />
              <line x1="40" y1="-40" x2="60" y2="-60" stroke="#2563EB" strokeWidth="2" />
              <line x1="40" y1="40" x2="60" y2="20" stroke="#2563EB" strokeWidth="2" />
              <line x1="-40" y1="40" x2="-20" y2="20" stroke="#2563EB" strokeWidth="2" />
              <rect x="-20" y="-60" width="80" height="80" fill="none" stroke="#0D9488" strokeWidth="2" strokeDasharray="4 4" rx="8" />
            </g>

            <text x="160" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Rotasi Yaw θ = {rotationAngle}° | Skala S = {scale3d}x | Shift X = {translateX}px
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
