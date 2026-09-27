import React, { useState, useEffect, useRef } from 'react';
import { Wind, Flame, Zap, Play, Pause, RotateCcw, Brain, Gauge, Signal, AlertTriangle } from 'lucide-react';
import SimulationErrorBoundary from './SimulationErrorBoundary';

function PhysicsVisualizerContent({ 
  experimentId, 
  sliderValues = {}, 
  consequence, 
  isSimulating, 
  simulationProgress = 0, 
  simulationTime = 0, 
  hasRun = false 
}) {
  // Status Zone Helper
  const getStatusZone = (status) => {
    if (status === 'optimal') return { color: '#10B981', label: 'RENTANG AMAN (OPTIMAL)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (status === 'warning') return { color: '#F59E0B', label: 'MENDEKATI BATAS KRITIS (WARNING)', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { color: '#EF4444', label: 'AMBANG GAGAL / HANCUR (DANGER)', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  const statusZone = getStatusZone(consequence?.status);

  // ==========================================
  // SHARED ANIMATION CONTROL STATES
  // ==========================================
  const [isPlaying, setIsPlaying] = useState(true);

  // 2A Wind Tunnel Offset
  const [windOffset, setWindOffset] = useState(0);
  const anim2ARef = useRef(null);

  // 2B Crankshaft Angle
  const [crankAngle, setCrankAngle] = useState(0);
  const anim2BRef = useRef(null);

  // 2C Wave Phase Offset
  const [wavePhase, setWavePhase] = useState(0);
  const anim2CRef = useRef(null);

  // 2A Aerodynamics Loop
  useEffect(() => {
    if (experimentId !== '2A') return;

    if (isPlaying) {
      let lastTime = performance.now();
      const velocity = Number(sliderValues.velocity) || 250;
      const speedFactor = (velocity / 200) * 1.5;

      const animate2A = (time) => {
        const delta = time - lastTime;
        lastTime = time;

        setWindOffset((prev) => (prev + speedFactor * (delta / 16)) % 100);
        anim2ARef.current = requestAnimationFrame(animate2A);
      };

      anim2ARef.current = requestAnimationFrame(animate2A);
    } else {
      if (anim2ARef.current) cancelAnimationFrame(anim2ARef.current);
    }

    return () => {
      if (anim2ARef.current) cancelAnimationFrame(anim2ARef.current);
    };
  }, [experimentId, isPlaying, sliderValues.velocity]);

  // 2B Engine Carnot Loop
  useEffect(() => {
    if (experimentId !== '2B') return;

    if (isPlaying) {
      let lastTime = performance.now();
      const tempHot = Number(sliderValues.tempHot) || 800;
      const rpmSpeed = (tempHot / 500) * 3;

      const animate2B = (time) => {
        const delta = time - lastTime;
        lastTime = time;

        setCrankAngle((prev) => (prev + rpmSpeed * (delta / 16)) % 360);
        anim2BRef.current = requestAnimationFrame(animate2B);
      };

      anim2BRef.current = requestAnimationFrame(animate2B);
    } else {
      if (anim2BRef.current) cancelAnimationFrame(anim2BRef.current);
    }

    return () => {
      if (anim2BRef.current) cancelAnimationFrame(anim2BRef.current);
    };
  }, [experimentId, isPlaying, sliderValues.tempHot]);

  // 2C 5G EM Wave Loop
  useEffect(() => {
    if (experimentId !== '2C') return;

    if (isPlaying) {
      let lastTime = performance.now();
      const freq = Number(sliderValues.frequencyGHz) || 3.5;
      const waveSpeed = freq * 0.8;

      const animate2C = (time) => {
        const delta = time - lastTime;
        lastTime = time;

        setWavePhase((prev) => (prev + waveSpeed * (delta / 16)) % 100);
        anim2CRef.current = requestAnimationFrame(animate2C);
      };

      anim2CRef.current = requestAnimationFrame(animate2C);
    } else {
      if (anim2CRef.current) cancelAnimationFrame(anim2CRef.current);
    }

    return () => {
      if (anim2CRef.current) cancelAnimationFrame(anim2CRef.current);
    };
  }, [experimentId, isPlaying, sliderValues.frequencyGHz]);


  // Reset handler
  const handleReset = () => {
    setWindOffset(0);
    setCrankAngle(0);
    setWavePhase(0);
  };


  // ==========================================
  // 2A: SUPERCAR AERODYNAMICS & FLUID DYNAMICS (BERNOULLI)
  // ==========================================
  if (experimentId === '2A') {
    const velocity = Number(sliderValues.velocity) || 250;
    const wingAngle = Number(sliderValues.wingAngle) || 12;
    const airDensity = Number(sliderValues.airDensity) || 1.2;

    const isStall = consequence?.status === 'danger';
    const isDragExcess = consequence?.status === 'warning';

    // Downforce press offset (steeper wing -> car presses down up to 5px)
    const downforcePress = Math.min(6, (wingAngle / 25) * 6);

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
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

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs border ${
                isPlaying 
                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Jeda Simulasi' : 'Jalankan Simulasi'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Wind Tunnel"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR DOWNFORCE AERODINAMIKA:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/3 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Stall Turbulensi
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

        {/* Canvas Wind Tunnel & Supercar */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid2a" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid2a)" />

            {/* Asphalt Ground */}
            <rect x="0" y="210" width="500" height="70" fill="#1E293B" />
            <line x1="0" y1="215" x2="500" y2="215" stroke="#FACC15" strokeWidth="2" strokeDasharray="15 10" />

            {/* ANIMATED STREAMLINE WIND PARTICLES */}
            {[50, 80, 110, 135, 160, 185].map((y, i) => {
              const dashOffset = (windOffset * 6) % 30;
              const isTurbulent = i >= 3 && wingAngle > 18;
              return (
                <path
                  key={i}
                  d={
                    i < 3 
                      ? `M -20 ${y} Q 200 ${y - 25} 520 ${y}` 
                      : (isTurbulent 
                          ? `M -20 ${y} L 180 ${y} Q 240 ${y + 20} 300 ${y - 15} T 360 ${y + 25} T 520 ${y}` 
                          : `M -20 ${y} Q 220 ${y + 10} 520 ${y}`)
                  }
                  fill="none"
                  stroke={isTurbulent ? '#EF4444' : (i < 3 ? '#2563EB' : '#0D9488')}
                  strokeWidth={isTurbulent ? 3 : 2}
                  strokeDasharray="16 12"
                  strokeDashoffset={-dashOffset}
                />
              );
            })}

            {/* SUPERCAR VECTOR CAR BODY */}
            <g transform={`translate(140, ${150 + downforcePress})`}>
              
              {/* Front Friction Glow on Nose if high velocity & Drag */}
              {velocity > 280 && (
                <ellipse cx="195" cy="40" rx="15" ry="10" fill="#EF4444" opacity="0.35" className="animate-ping" />
              )}

              {/* Main Low-Slung Aerodynamic Car Body */}
              <path 
                d="M 10 40 L 40 25 L 80 10 L 130 10 L 165 28 L 200 38 L 205 45 L 5 45 Z" 
                fill="#2563EB" 
                stroke="#1D4ED8" 
                strokeWidth="2" 
              />
              
              {/* Tinted Glass Canopy */}
              <path d="M 60 22 L 85 12 L 125 12 L 142 25 Z" fill="#38BDF8" opacity="0.85" stroke="#0284C7" strokeWidth="1" />

              {/* Headlight LED */}
              <ellipse cx="198" cy="39" rx="4" ry="2" fill="#FDE047" />

              {/* Wheels */}
              <circle cx="45" cy="45" r="14" fill="#0F172A" stroke="#475569" strokeWidth="3" />
              <circle cx="45" cy="45" r="6" fill="#94A3B8" />

              <circle cx="165" cy="45" r="14" fill="#0F172A" stroke="#475569" strokeWidth="3" />
              <circle cx="165" cy="45" r="6" fill="#94A3B8" />

              {/* REAR ADJUSTABLE SPOILER WING */}
              <g transform={`translate(15, 20) rotate(${-wingAngle})`}>
                <rect x="-15" y="-6" width="30" height="6" fill="#0F172A" rx="2" stroke="#334155" strokeWidth="1" />
                <rect x="-2" y="0" width="4" height="12" fill="#475569" />
              </g>

              {/* Downforce Press Vector Arrow */}
              {wingAngle > 10 && (
                <g transform="translate(100, -10)">
                  <line x1="0" y1="0" x2="0" y2="18" stroke="#10B981" strokeWidth="2.5" />
                  <polygon points="0,24 -4,16 4,16" fill="#10B981" />
                  <text x="8" y="15" fill="#10B981" fontSize="9" fontWeight="bold">Downforce</text>
                </g>
              )}
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Kecepatan v = {velocity} km/h | Sudut Spoiler θ = {wingAngle}° | Kerapatan Udara ρ = {airDensity} kg/m³
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-teal-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Prinsip Bernoulli di Lintasan Balap</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Udara di atas sayap spoiler melaju lebih cepat dibanding di bawah sayap, menciptakan perbedaan tekanan udara yang menekan mobil ke aspal (<strong>Downforce</strong>) agar tidak tergelincir atau terbang saat melaju pada kecepatan tinggi di tikungan tajam.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2B: THERMODYNAMICS & CARNOT ENGINE EFFICIENCY
  // ==========================================
  if (experimentId === '2B') {
    const tempHot = Number(sliderValues.tempHot) || 800;
    const tempCold = Number(sliderValues.tempCold) || 300;

    const isMelt = consequence?.status === 'danger';

    // Calculate Carnot Efficiency %: η = 1 - Tc / Th
    const carnotEfficiency = Math.max(0, Math.min(99, Math.round((1 - tempCold / tempHot) * 100)));

    // Reciprocating piston height offset (sine wave based on crankAngle)
    const rad = (crankAngle * Math.PI) / 180;
    const pistonYOffset = Math.sin(rad) * 30; // moves up and down 30px

    // Color shift based on compression: near top (compression) -> Hot Red/Amber, bottom -> Teal/Blue
    const isCompressed = Math.sin(rad) > 0.3;
    const gasColor = isCompressed ? '#EF4444' : '#0D9488';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
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

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs border ${
                isPlaying 
                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Jeda Mesin' : 'Jalankan Mesin'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Mesin"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Bar */}
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

        {/* SVG Canvas Reciprocating Piston Engine */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid2b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid2b)" />

            {/* TRANSPARENT PISTON CYLINDER CHAMBER */}
            <g transform="translate(180, 30)">
              {/* Outer Wall */}
              <rect x="0" y="0" width="140" height="180" fill="#F8FAFC" stroke="#475569" strokeWidth="4" rx="8" />

              {/* Spark Plug / Heat Valve Top */}
              <rect x="55" y="-12" width="30" height="12" fill="#64748B" rx="2" />
              <line x1="70" y1="-12" x2="70" y2="0" stroke="#F59E0B" strokeWidth="3" />

              {/* DYNAMIC GAS MOLECULES IN CHAMBER */}
              <rect 
                x="4" 
                y="4" 
                width="132" 
                height={65 + pistonYOffset} 
                fill={gasColor} 
                opacity="0.25" 
                rx="4"
              />

              {/* Animated Bouncing Gas Dots */}
              {[15, 35, 55, 75, 95, 115].map((xDot, i) => (
                <circle 
                  key={i} 
                  cx={xDot} 
                  cy={15 + ((crankAngle * (i + 1) * 3) % Math.max(10, 50 + pistonYOffset))} 
                  r="3.5" 
                  fill={gasColor} 
                />
              ))}

              {/* OVERHEAT SMOKE PARTICLES IF EXTREME */}
              {isMelt && (
                <g className="animate-bounce">
                  <circle cx="50" cy="-20" r="8" fill="#64748B" opacity="0.6" />
                  <circle cx="70" cy="-30" r="12" fill="#94A3B8" opacity="0.5" />
                  <circle cx="90" cy="-22" r="7" fill="#64748B" opacity="0.6" />
                </g>
              )}

              {/* RECIPROCATING METALLIC PISTON HEAD */}
              <rect 
                x="4" 
                y={65 + pistonYOffset} 
                width="132" 
                height="32" 
                fill="#334155" 
                stroke="#1E293B" 
                strokeWidth="2" 
                rx="4" 
              />
              <line x1="4" y1={75 + pistonYOffset} x2="136" y2={75 + pistonYOffset} stroke="#94A3B8" strokeWidth="2" />
              <line x1="4" y1={85 + pistonYOffset} x2="136" y2={85 + pistonYOffset} stroke="#94A3B8" strokeWidth="2" />

              {/* CONNECTING ROD (STANG SEHER) */}
              <line 
                x1="70" 
                y1={97 + pistonYOffset} 
                x2={70 + Math.sin(rad) * 20} 
                y2="155" 
                stroke="#64748B" 
                strokeWidth="8" 
                strokeLinecap="round" 
              />

              {/* ROTATING CRANKSHAFT FLYWHEEL */}
              <circle cx="70" cy="155" r="22" fill="#E2E8F0" stroke="#475569" strokeWidth="3" />
              <circle cx={70 + Math.sin(rad) * 15} cy={155 + Math.cos(rad) * 15} r="6" fill="#2563EB" />
            </g>

            {/* REAL-TIME CARNOT EFFICIENCY SPEEDOMETER GAUGE */}
            <g transform="translate(380, 45)">
              <rect x="0" y="0" width="105" height="100" fill="#FFFFFF" stroke="#CBD5E1" rx="12" />
              <text x="52.5" y="20" fill="#1E293B" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Efisiensi Carnot
              </text>

              {/* Circular Arc */}
              <circle cx="52.5" cy="55" r="28" fill="none" stroke="#E2E8F0" strokeWidth="6" />
              <circle 
                cx="52.5" 
                cy="55" 
                r="28" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="6" 
                strokeDasharray="175"
                strokeDashoffset={175 - (carnotEfficiency / 100) * 175}
                transform="rotate(-90 52.5 55)"
              />

              <text x="52.5" y="60" fill="#2563EB" fontSize="14" fontWeight="extrabold" textAnchor="middle" fontFamily="monospace">
                {carnotEfficiency}%
              </text>
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Suhu Panas Th = {tempHot} K | Suhu Cold Tc = {tempCold} K | Efisiensi Carnot η = {carnotEfficiency}%
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2C: 5G TELECOMMUNICATION & ELECTROMAGNETIC WAVES
  // ==========================================
  if (experimentId === '2C') {
    const frequencyGHz = Number(sliderValues.frequencyGHz) || 3.5;
    const wallThicknessCm = Number(sliderValues.wallThicknessCm) || 15;

    const isDanger = consequence?.status === 'danger';
    const isWarning = consequence?.status === 'warning';

    // Signal bars count based on attenuation (15cm wall -> 3 bars, 50cm wall -> 1 bar)
    const signalBars = Math.max(0, Math.min(5, Math.round(5 - (wallThicknessCm / 40) * 4)));

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
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

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs border ${
                isPlaying 
                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Jeda Gelombang' : 'Jalankan Gelombang'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Gelombang"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Bar */}
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
                left: isDanger ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        {/* SVG Simulation Canvas */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid2c" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid2c)" />

            {/* 5G TOWER ANTENNA (LEFT) */}
            <g transform="translate(40, 70)">
              {/* Lattice Tower Frame */}
              <line x1="20" y1="0" x2="0" y2="150" stroke="#475569" strokeWidth="3" />
              <line x1="20" y1="0" x2="40" y2="150" stroke="#475569" strokeWidth="3" />
              <line x1="5" y1="40" x2="35" y2="40" stroke="#64748B" strokeWidth="2" />
              <line x1="10" y1="80" x2="30" y2="80" stroke="#64748B" strokeWidth="2" />
              <line x1="12" y1="120" x2="28" y2="120" stroke="#64748B" strokeWidth="2" />

              {/* Antenna Top Arrays */}
              <rect x="12" y="-15" width="16" height="20" fill="#2563EB" rx="2" />
              <circle cx="20" cy="-15" r="4" fill="#0D9488" className="animate-ping" />
            </g>

            {/* CONCRETE WALL BARRIER (MIDDLE) */}
            <g transform={`translate(220, 50)`}>
              <rect 
                x="0" 
                y="0" 
                width={Math.min(100, Math.max(12, wallThicknessCm * 1.6))} 
                height="170" 
                fill="#94A3B8" 
                stroke="#64748B" 
                strokeWidth="2" 
                rx="4" 
              />
              <text 
                x={Math.min(100, Math.max(12, wallThicknessCm * 1.6)) / 2} 
                y="90" 
                fill="#FFFFFF" 
                fontSize="9" 
                fontWeight="extrabold" 
                textAnchor="middle" 
                fontFamily="sans-serif"
              >
                Beton {wallThicknessCm} cm
              </text>
            </g>

            {/* SMARTPHONE / RECEIVER (RIGHT) */}
            <g transform="translate(420, 110)">
              {/* Phone Body */}
              <rect x="0" y="0" width="42" height="85" fill="#0F172A" rx="8" stroke="#334155" strokeWidth="2" />
              <rect x="3" y="4" width="36" height="77" fill="#F8FAFC" rx="5" />

              {/* Signal Bar Indicator on Screen */}
              <g transform="translate(10, 15)">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <rect 
                    key={bar} 
                    x={(bar - 1) * 5} 
                    y={16 - bar * 3} 
                    width="3.5" 
                    height={bar * 3} 
                    fill={bar <= signalBars ? (signalBars <= 2 ? '#EF4444' : '#10B981') : '#CBD5E1'} 
                  />
                ))}
              </g>

              {/* Signal Status Label */}
              <text x="21" y="55" fill={signalBars <= 1 ? '#EF4444' : '#0F172A'} fontSize="8" fontWeight="extrabold" textAnchor="middle" fontFamily="sans-serif">
                {signalBars <= 1 ? 'NO SIGNAL' : `${signalBars} BARS`}
              </text>
            </g>

            {/* DYNAMIC SINE WAVE PROPAGATION ANIMATION */}
            {/* Wave 1: Tower to Wall */}
            <path
              d={Array.from({ length: 25 }, (_, i) => {
                const x = 60 + i * 6.5;
                const waveLength = 40 / frequencyGHz;
                const y = 80 + Math.sin((x + wavePhase * 4) / waveLength) * 22;
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#0D9488"
              strokeWidth="3"
            />

            {/* Wave 2: Inside & After Wall (Attenuated Amplitude) */}
            <path
              d={Array.from({ length: 30 }, (_, i) => {
                const wallWidth = Math.min(100, Math.max(12, wallThicknessCm * 1.6));
                const x = 220 + wallWidth + i * 5;
                if (x > 420) return '';
                const waveLength = 40 / frequencyGHz;
                const attFactor = Math.max(0.1, 1 - (wallThicknessCm / 45));
                const y = 140 + Math.sin((x + wavePhase * 4) / waveLength) * (22 * attFactor);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke={signalBars <= 1 ? '#EF4444' : '#2563EB'}
              strokeWidth={signalBars <= 1 ? 1.5 : 2.5}
              strokeDasharray={signalBars <= 1 ? '4 4' : 'none'}
            />

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Frekuensi f = {frequencyGHz} GHz | Ketebalan Tembok = {wallThicknessCm} cm | Sinyal: {signalBars}/5 Bar
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-teal-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Mengapa Sinyal 5G Gampang Hilang di Dalam Kamar?</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Frekuensi tinggi (mmWave) membawa kecepatan data gigabit yang sangat cepat, namun panjang gelombangnya yang sangat pendek ($c = f \cdot \lambda$) mudah terhalang dan mengalami <strong>atenuasi drastis</strong> saat menembus material padat seperti dinding beton bertulang.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default function PhysicsVisualizer(props) {
  return (
    <SimulationErrorBoundary onReset={props.onReset}>
      <PhysicsVisualizerContent {...props} />
    </SimulationErrorBoundary>
  );
}
