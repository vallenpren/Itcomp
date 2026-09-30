import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Layers, TrendingUp, Brain, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import SimulationErrorBoundary from './SimulationErrorBoundary';

function MathVisualizerContent({ 
  experimentId, 
  sliderValues = {}, 
  consequence, 
  isSimulating, 
  simulationProgress = 0, 
  simulationTime = 0, 
  hasRun = false 
}) {
  const currentPct = isSimulating ? simulationProgress : (hasRun ? 100 : 70);

  // Status Zone Helper
  const getStatusZone = (status) => {
    if (status === 'optimal') return { color: '#10B981', label: 'RENTANG AMAN (OPTIMAL)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (status === 'warning') return { color: '#F59E0B', label: 'MENDEKATI BATAS KRITIS (WARNING)', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { color: '#EF4444', label: 'AMBANG GAGAL / HANCUR (DANGER)', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  const statusZone = getStatusZone(consequence?.status);

  // ==========================================
  // STATE & ANIMATION LOOPS FOR 1B & 1C
  // ==========================================
  
  // 1B TRUCK ANIMATION STATE
  const [truckPos, setTruckPos] = useState(0); // 0 to 100%
  const [truckPlaying, setTruckPlaying] = useState(true);
  const truckAnimRef = useRef(null);

  // 1C AUTO DEMO 360 DEGREE ROTATION STATE
  const [autoDemo, setAutoDemo] = useState(false);
  const [demoAngle, setDemoAngle] = useState(0);
  const demoAnimRef = useRef(null);

  // 1B Animation Loop
  useEffect(() => {
    if (experimentId !== '1B') return;

    const isDanger = consequence?.status === 'danger';
    const isWarning = consequence?.status === 'warning';

    // Speed multiplier based on load status
    const speed = isDanger ? 0 : (isWarning ? 0.25 : 0.45);

    if (truckPlaying && !isDanger) {
      let lastTime = performance.now();

      const animateTruck = (time) => {
        const delta = time - lastTime;
        lastTime = time;

        setTruckPos((prev) => {
          const next = prev + speed * (delta / 16);
          return next > 100 ? 0 : next;
        });

        truckAnimRef.current = requestAnimationFrame(animateTruck);
      };

      truckAnimRef.current = requestAnimationFrame(animateTruck);
    } else {
      if (truckAnimRef.current) cancelAnimationFrame(truckAnimRef.current);
    }

    return () => {
      if (truckAnimRef.current) cancelAnimationFrame(truckAnimRef.current);
    };
  }, [experimentId, truckPlaying, consequence?.status]);

  // 1C Auto Demo Loop
  useEffect(() => {
    if (experimentId !== '1C') return;

    if (autoDemo) {
      let lastTime = performance.now();

      const animateDemo = (time) => {
        const delta = time - lastTime;
        lastTime = time;

        setDemoAngle((prev) => (prev + 0.8 * (delta / 16)) % 360);

        demoAnimRef.current = requestAnimationFrame(animateDemo);
      };

      demoAnimRef.current = requestAnimationFrame(animateDemo);
    } else {
      if (demoAnimRef.current) cancelAnimationFrame(demoAnimRef.current);
    }

    return () => {
      if (demoAnimRef.current) cancelAnimationFrame(demoAnimRef.current);
    };
  }, [experimentId, autoDemo]);


  // ==========================================
  // 1A: AEROSPACE & DIFFERENTIAL CALCULUS
  // ==========================================
  if (experimentId === '1A') {
    const fuelBurnRate = Number(sliderValues.fuelBurnRate) || 150;
    const payloadMass = Number(sliderValues.payloadMass) || 4000;
    const launchAngle = Number(sliderValues.launchAngle) || 75;

    const rad = (launchAngle * Math.PI) / 180;
    const maxProgress = currentPct / 100;
    
    const startX = 60;
    const startY = 240;
    const peakX = startX + 220 * maxProgress * Math.cos(rad);
    const peakY = startY - 200 * maxProgress * Math.sin(rad);

    const isOverheat = consequence?.status === 'warning';
    const isCrash = consequence?.status === 'danger';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header */}
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

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR STATUS ZONA KEAMANAN:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

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

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isCrash ? '16.5%' : (isOverheat ? '50%' : '83.5%')
              }}
            />
          </div>
        </div>

        {/* Canvas Area */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />

            <line x1="0" y1="90" x2="500" y2="90" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="15" y="82" fill="#0D9488" fontSize="9" fontWeight="bold" fontFamily="monospace">
              ZONA ORBIT AMAN (LEO) - Ketinggian {'>'} 200 km
            </text>

            <line x1="0" y1="180" x2="500" y2="180" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="15" y="172" fill="#D97706" fontSize="9" fontWeight="bold" fontFamily="monospace">
              ZONA GESEKAN ATMOSFER TEBAL
            </text>

            <path
              d={`M ${startX} ${startY} Q ${startX + 100 * Math.cos(rad)} ${startY - 180 * Math.sin(rad)} ${peakX} ${peakY}`}
              fill="none"
              stroke="#2563EB"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            <g transform={`translate(${peakX}, ${peakY}) rotate(${90 - launchAngle})`}>
              <circle r="16" fill="#2563EB" opacity="0.15" />
              <g transform="translate(-10, -10)">
                <Rocket className="w-5 h-5 text-blue-600 fill-blue-600" />
              </g>
            </g>

            <path d="M 0 260 Q 250 240 500 260 L 500 280 L 0 280 Z" fill="#E2E8F0" stroke="#CBD5E1" />
            <text x="220" y="274" fill="#64748B" fontSize="10" fontWeight="bold">Bumi (R = 6,371 km)</text>
          </svg>

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

  // ==========================================
  // 1B: CIVIL ARCHITECTURE & INTEGRAL CALCULUS (JEMBATAN INTEGRAL + ANIMASI TRUK)
  // ==========================================
  if (experimentId === '1B') {
    const archSpan = Number(sliderValues.archSpan) || 500;
    const cableThickness = Number(sliderValues.cableThickness) || 45;
    const trafficLoad = Number(sliderValues.trafficLoad) || 200;

    const isBroke = consequence?.status === 'danger';
    const isWarning = consequence?.status === 'warning';

    // Dynamic cable sag based on trafficLoad
    const cableSag = 170 + Math.min(50, (trafficLoad / 400) * 50);

    // Calculate Truck X & Y position dynamically on the bridge
    // Left tower x = 110, Right tower x = 370. Active span x from 40 to 450
    const truckX = isBroke ? 240 : (40 + (truckPos / 100) * 410);

    // Parabolic Y calculation for truck on deck: y = 190 + sag offset under weight
    const normDist = (truckX - 240) / 200; // -1 to +1
    const deckSagOffset = Math.max(0, (cableSag - 170) * (1 - normDist * normDist));
    const truckY = 175 + deckSagOffset;

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
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

          {/* Interactive Animation Control Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setTruckPlaying(!truckPlaying)}
              disabled={isBroke}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs border ${
                isBroke
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : (truckPlaying 
                      ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' 
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100')
              }`}
            >
              {truckPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                  <span>Pause Truk</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Jalankan Truk</span>
                </>
              )}
            </button>

            <button
              onClick={() => setTruckPos(0)}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Posisi Truk ke Ujung Kiri"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Bar */}
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

        {/* SVG Simulation Canvas */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid1b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>

              <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid1b)" />

            {/* River Water & Wave */}
            <rect x="0" y="225" width="500" height="55" fill="url(#riverGrad)" />
            <path d="M 0 230 Q 125 224 250 230 T 500 230 L 500 280 L 0 280 Z" fill="#0284C7" opacity="0.15" />

            {/* Foundations */}
            <rect x="110" y="195" width="24" height="60" fill="#64748B" rx="2" />
            <rect x="366" y="195" width="24" height="60" fill="#64748B" rx="2" />

            {/* Main Concrete Towers */}
            <rect x="108" y="45" width="28" height="155" fill="#475569" rx="4" />
            <rect x="114" y="55" width="16" height="35" fill="#334155" rx="2" />
            <rect x="114" y="105" width="16" height="45" fill="#334155" rx="2" />

            <rect x="364" y="45" width="28" height="155" fill="#475569" rx="4" />
            <rect x="370" y="55" width="16" height="35" fill="#334155" rx="2" />
            <rect x="370" y="105" width="16" height="45" fill="#334155" rx="2" />

            {/* Real Asphalt Deck (Curving dynamic path) */}
            <path
              d={`M 10 190 Q 240 ${190 + (cableSag - 170) * 0.6} 490 190`}
              fill="none"
              stroke="#1E293B"
              strokeWidth="14"
            />
            
            {/* Yellow Dashed Lane Center Line */}
            <path
              d={`M 10 190 Q 240 ${190 + (cableSag - 170) * 0.6} 490 190`}
              fill="none"
              stroke="#FACC15"
              strokeWidth="1.5"
              strokeDasharray="10 8"
            />

            {/* CATENARY SUSPENSION MAIN CABLE (PARABOLA INTEGRAL) */}
            <path
              d={`M 15 190 L 122 55 Q 240 ${cableSag} 378 55 L 485 190`}
              fill="none"
              stroke={isBroke ? '#EF4444' : (isWarning ? '#F59E0B' : '#2563EB')}
              strokeWidth={Math.max(2.5, cableThickness / 12)}
              strokeDasharray={isBroke ? '8 4' : 'none'}
              className={isWarning || isBroke ? 'animate-pulse' : ''}
            />

            {/* VERTICAL HANGER STEEL CABLES */}
            {[140, 165, 190, 215, 240, 265, 290, 315, 340, 360].map((x, i) => {
              const normX = (x - 240) / 128;
              const cableY = 55 + (cableSag - 55) * Math.pow(normX, 2);
              const deckY = 190 + (cableSag - 170) * 0.6 * (1 - normX * normX);
              return (
                <line 
                  key={i} 
                  x1={x} 
                  y1={deckY} 
                  x2={x} 
                  y2={cableY} 
                  stroke={isBroke ? '#FCA5A5' : '#94A3B8'} 
                  strokeWidth="1.5" 
                />
              );
            })}

            {/* HEAVY TRUCK / CAR OBJECT CONTINUOUSLY MOVING ON THE BRIDGE */}
            <g transform={`translate(${truckX}, ${truckY})`}>
              <rect x="-35" y="-18" width="45" height="22" fill="#2563EB" rx="3" stroke="#1D4ED8" strokeWidth="1" />
              <rect x="10" y="-10" width="16" height="14" fill="#0284C7" rx="2" stroke="#0369A1" strokeWidth="1" />
              <rect x="16" y="-8" width="8" height="6" fill="#E0F2FE" rx="1" />
              <circle cx="25" cy="-2" r="1.5" fill="#FDE047" />
              <circle cx="-25" cy="5" r="4.5" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
              <circle cx="-10" cy="5" r="4.5" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
              <circle cx="18" cy="5" r="4.5" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
              <text x="-24" y="-4" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">TRUK MUATAN</text>
            </g>

            {/* MICRO-CRACK EFFECT IF DANGER/WARNING */}
            {(isBroke || isWarning) && (
              <g transform="translate(220, 192)">
                <path d="M 0 0 L 12 5 L 20 2 L 35 6 L 45 1 L 60 7" fill="none" stroke="#EF4444" strokeWidth="2" />
                <path d="M 15 3 L 22 10 L 28 7" fill="none" stroke="#EF4444" strokeWidth="1.5" />
              </g>
            )}

            {/* DANGER OVERLOAD BANNER OVERLAY */}
            {isBroke && (
              <g transform="translate(130, 20)">
                <rect x="0" y="0" width="240" height="26" fill="#FEF2F2" stroke="#FCA5A5" rx="13" />
                <text x="120" y="17" fill="#991B1B" fontSize="9" fontWeight="extrabold" textAnchor="middle" fontFamily="sans-serif">
                  ⚠️ RETAKAN STRUKTUR PADA ASPAL (OVERLOAD)!
                </text>
              </g>
            )}

            {/* TELEMETRY TEXT (CORRECTED TYPO: PANJANG BENTANG) */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Panjang Bentang (Span Length) L = {archSpan} m | Beban Muatan w(x) = {trafficLoad} ton/m
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // ==========================================
  // 1C: COMPUTER GRAPHICS & MATRIX TRANSFORMATIONS (3D DRONE + DEMO 360° + MATRIX 2x2)
  // ==========================================
  if (experimentId === '1C') {
    const rawAngle = Number(sliderValues.rotationAngle);
    const sliderAngle = isNaN(rawAngle) ? 45 : rawAngle;
    const effectiveAngle = autoDemo ? demoAngle : sliderAngle;

    const scale3d = Math.max(0.2, Number(sliderValues.scale3d) || 1);
    const translateX = Number(sliderValues.translateX) || 0;

    const isGlitch = consequence?.status === 'warning';

    // Matrix calculation elements (cos theta & sin theta)
    const rad = (effectiveAngle * Math.PI) / 180;
    const cosVal = Math.cos(rad);
    const sinVal = Math.sin(rad);

    // Formatted 2x2 Matrix entries (scaled)
    const m00 = (scale3d * cosVal).toFixed(2);
    const m01 = (scale3d * -sinVal).toFixed(2);
    const m10 = (scale3d * sinVal).toFixed(2);
    const m11 = (scale3d * cosVal).toFixed(2);

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Auto Demo Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Computer Graphics & Transformasi Matriks
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Transformasi Vektor 3D V' = M · V (Rotasi, Skala & Translasi)
              </p>
            </div>
          </div>

          {/* AUTO DEMO 360 DEGREE ROTATION BUTTON */}
          <button
            onClick={() => setAutoDemo(!autoDemo)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs border ${
              autoDemo
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{autoDemo ? 'Stop Auto Demo 360°' : 'Auto Demo Putar 360°'}</span>
          </button>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR DETERMINAN MATRIKS RENDER:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-amber-400 rounded-l-full flex items-center justify-center text-[8px] font-bold text-slate-900">
              Determinan ~ 0 (Singular Glitch)
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Render 60 FPS Mulus
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isGlitch ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        {/* SVG Simulation Canvas */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid1c" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid1c)" />

            {/* Axes */}
            <line x1="250" y1="0" x2="250" y2="280" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="0" y1="140" x2="500" y2="140" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
            
            <text x="255" y="18" fill="#94A3B8" fontSize="10" fontWeight="bold" fontFamily="monospace">+Y (Atas)</text>
            <text x="440" y="135" fill="#94A3B8" fontSize="10" fontWeight="bold" fontFamily="monospace">+X (Kanan)</text>

            {/* REAL 3D FIGHTER JET / DRONE VECTOR MODEL WITH MATRIX TRANSFORM APPLIED INLINE */}
            <g transform={`translate(${250 + translateX}, 140) rotate(${effectiveAngle}) scale(${scale3d})`}>
              
              {/* Shadow effect on grid */}
              <ellipse cx="0" cy="25" rx="35" ry="12" fill="#000000" opacity="0.1" />

              {/* Main Fuselage Body */}
              <path d="M 0 -45 L 9 -10 L 14 25 L 8 40 L -8 40 L -14 25 L -9 -10 Z" fill="#2563EB" stroke="#1E40AF" strokeWidth="2" />

              {/* Swept Main Wings */}
              <path d="M 9 -5 L 48 20 L 40 28 L 10 15 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
              <path d="M -9 -5 L -48 20 L -40 28 L -10 15 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />

              {/* Wingtip Missiles / Sensors */}
              <rect x="46" y="10" width="3" height="15" fill="#EF4444" rx="1" />
              <rect x="-49" y="10" width="3" height="15" fill="#EF4444" rx="1" />

              {/* Twin Tail Fins */}
              <path d="M 6 25 L 18 38 L 10 40 L 4 30 Z" fill="#1D4ED8" />
              <path d="M -6 25 L -18 38 L -10 40 L -4 30 Z" fill="#1D4ED8" />

              {/* Glass Cockpit Canopy */}
              <ellipse cx="0" cy="-15" rx="5" ry="12" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
              <ellipse cx="-1" cy="-18" rx="2" ry="5" fill="#FFFFFF" opacity="0.6" />

              {/* Jet Engine Thruster Flame */}
              <path d="M -5 40 L 0 52 L 5 40 Z" fill="#F59E0B" className="animate-pulse" />
              <path d="M -3 40 L 0 47 L 3 40 Z" fill="#FDE047" />

              {/* Directional Front Heading Arrow */}
              <line x1="0" y1="-45" x2="0" y2="-65" stroke="#0D9488" strokeWidth="2" strokeDasharray="2 2" />
              <polygon points="0,-72 -4,-63 4,-63" fill="#0D9488" />
            </g>

            {/* LIVE MATRIX 2x2 DISPLAY BOX OVERLAY */}
            <g transform="translate(15, 15)">
              <rect x="0" y="0" width="195" height="56" fill="#FFFFFF" opacity="0.95" stroke="#CBD5E1" rx="10" />
              <text x="10" y="17" fill="#1E293B" fontSize="9" fontWeight="bold" fontFamily="monospace">
                Matriks Transformasi M (2x2):
              </text>
              <text x="12" y="35" fill="#2563EB" fontSize="11" fontWeight="extrabold" fontFamily="monospace">
                [ {m00}   {m01} ]
              </text>
              <text x="12" y="49" fill="#2563EB" fontSize="11" fontWeight="extrabold" fontFamily="monospace">
                [ {m10}   {m11} ]
              </text>
            </g>

            {/* TELEMETRY READOUT */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Sudut Rotasi θ = {Math.round(effectiveAngle)}° | Skala S = {scale3d}x | Shift X = {translateX}px
            </text>
          </svg>
        </div>

        {/* EDUCATIONAL EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-blue-700 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Kenapa Harus Pakai Matriks di Game & Animasi 3D?</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Di game 3D (seperti <strong>Mobile Legends</strong> atau <strong>GTA</strong>), karakter dan kendaraan tidak digambar ulang satu per satu saat berbelok. Komputer hanya mengalikan titik koordinat objek dengan <strong>Matriks Transformasi (V' = M · V)</strong> agar kendaraan bisa berputar, mendekat, dan bergeser secara mulus pada 60 frame per detik!
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default function MathVisualizer(props) {
  return (
    <SimulationErrorBoundary onReset={props.onReset}>
      <MathVisualizerContent {...props} />
    </SimulationErrorBoundary>
  );
}
