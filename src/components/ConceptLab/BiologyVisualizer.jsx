import React, { useState, useEffect, useRef } from 'react';
import { Dna, Bug, Activity, Play, Pause, RotateCcw, Zap, Sparkles, Brain } from 'lucide-react';
import SimulationErrorBoundary from './SimulationErrorBoundary';

function BiologyVisualizerContent({ 
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
  // SHARED ANIMATION CONTROLS
  // ==========================================
  const [isPlaying, setIsPlaying] = useState(true);
  const [animTick, setAnimTick] = useState(0);
  const animRef = useRef(null);

  // 4B Stimulus Trigger State
  const [pulsePos, setPulsePos] = useState(0);
  const [isStimulating, setIsStimulating] = useState(false);

  // 4C Punnett Cross State
  const [parent1, setParent1] = useState('Mm'); // 'MM', 'Mm', 'mm'
  const [parent2, setParent2] = useState('Mm');
  const [isIntermediate, setIsIntermediate] = useState(false);
  const [isCrossed, setIsCrossed] = useState(true);

  // Global Animation Loop
  useEffect(() => {
    if (isPlaying) {
      let lastTime = performance.now();
      const animate = (time) => {
        const delta = time - lastTime;
        lastTime = time;

        setAnimTick((prev) => (prev + (delta / 16)) % 360);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying]);

  // Handle Stimulus Trigger for 4B
  const handleTriggerStimulus = () => {
    setIsStimulating(true);
    setPulsePos(0);
  };

  // 4B Impulse Animation Loop
  useEffect(() => {
    if (experimentId !== '4B') return;

    if (isStimulating || isPlaying) {
      const myelin = Number(sliderValues?.myelinSheath ?? 8) || 8;
      const speed = Math.max(1, myelin * 1.5 + 2);

      const timer = setInterval(() => {
        setPulsePos((prev) => {
          if (prev >= 100) {
            if (!isStimulating) return 0;
            setIsStimulating(false);
            return 100;
          }
          return prev + speed;
        });
      }, 30);

      return () => clearInterval(timer);
    }
  }, [experimentId, isStimulating, isPlaying, sliderValues?.myelinSheath]);

  const handleReset = () => {
    setAnimTick(0);
    setPulsePos(0);
    setIsStimulating(false);
  };

  // SAFELY EXTRACT SLIDER PARAMETERS
  // 4A: predatorPop, preyPop, foodResource
  const predatorPop = Math.max(5, Math.min(100, Number(sliderValues?.predatorPop ?? 30) || 30));
  const preyPop = Math.max(100, Math.min(2000, Number(sliderValues?.preyPop ?? 800) || 800));
  const foodResource = Math.max(10, Math.min(100, Number(sliderValues?.foodResource ?? 70) || 70));

  // 4B: sodiumConc, myelinSheath, stimulusVoltage
  const sodiumConc = Math.max(10, Math.min(150, Number(sliderValues?.sodiumConc ?? 120) || 120));
  const myelinSheath = Math.max(0, Math.min(10, Number(sliderValues?.myelinSheath ?? 8) || 8));
  const stimulusVoltage = Number(sliderValues?.stimulusVoltage ?? 15);
  const safeStimVoltage = isNaN(stimulusVoltage) ? 15 : stimulusVoltage;

  // 4C: dominantFreqP, naturalSelection, generations
  const dominantFreqP = Math.max(0.1, Math.min(0.9, Number(sliderValues?.dominantFreqP ?? 0.7) || 0.7));

  // ==========================================
  // 4A: LOTKA-VOLTERRA PREDATOR-PREY ECOLOGY
  // ==========================================
  if (experimentId === '4A') {
    const isExtinct = predatorPop > 75 && preyPop < 300;
    const isOutbreak = predatorPop < 10 && preyPop > 1200;

    // Render scaled count of icon units
    const preyIconCount = Math.max(3, Math.min(18, Math.round(preyPop / 90)));
    const predatorIconCount = Math.max(1, Math.min(10, Math.round(predatorPop / 8)));

    const preyIcons = Array.from({ length: preyIconCount });
    const predatorIcons = Array.from({ length: predatorIconCount });

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Bug className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Ekologi & Model Dinamika Lotka-Volterra
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Persamaan Mangsa (dx/dt = αx - βxy) & Predator (dy/dt = δxy - γy)
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
              <span>{isPlaying ? 'Jeda Simulasi' : 'Mulai Simulasi'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Ekosistem"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR KESEIMBANGAN HABITAT:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Kepunahan Ganda / Outbreak
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Harmoni Lotka-Volterra
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{ left: (isExtinct || isOutbreak) ? '25%' : '75%' }}
            />
          </div>
        </div>

        {/* SVG HABITAT CANVAS & POPULATION GRAPH */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid4a" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid4a)" />

            {/* GRASSLAND ECOSYSTEM FIELD (LEFT) */}
            <g transform="translate(15, 30)">
              <rect x="0" y="0" width="230" height="185" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="2" rx="10" />

              {/* Decorative Bushes / Grass */}
              <circle cx="30" cy="160" r="14" fill="#6EE7B7" opacity="0.6" />
              <circle cx="190" cy="155" r="18" fill="#6EE7B7" opacity="0.6" />
              <circle cx="110" cy="30" r="12" fill="#A7F3D0" opacity="0.5" />

              <text x="115" y="20" fill="#047857" fontSize="9" fontWeight="extrabold" textAnchor="middle" fontFamily="sans-serif">
                HABITAT PADANG RUMPUL (PANGAN = {foodResource}%)
              </text>

              {/* PREY ICONS (RABBITS) MOVING */}
              {Array.isArray(preyIcons) && preyIcons.length > 0 ? (
                preyIcons.map((_, idx) => {
                  const rx = 25 + ((idx * 37 + animTick * 1.5) % 180);
                  const ry = 40 + ((idx * 29 + Math.sin(animTick * 0.1 + idx) * 15) % 125);
                  return (
                    <g key={`prey-${idx}`} transform={`translate(${rx}, ${ry})`}>
                      <circle r="7" fill="#2563EB" opacity="0.85" />
                      <circle cx="-3" cy="-3" r="2" fill="#FFFFFF" />
                      <text x="0" y="2.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">🐇</text>
                    </g>
                  );
                })
              ) : null}

              {/* PREDATOR ICONS (EAGLES) HOVERING */}
              {Array.isArray(predatorIcons) && predatorIcons.length > 0 ? (
                predatorIcons.map((_, idx) => {
                  const ex = 30 + ((idx * 53 + animTick * 2.2) % 170);
                  const ey = 35 + ((idx * 31 + Math.cos(animTick * 0.12 + idx) * 20) % 120);
                  return (
                    <g key={`predator-${idx}`} transform={`translate(${ex}, ${ey})`}>
                      <circle r="9" fill="#D97706" opacity="0.9" />
                      <text x="0" y="3" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">🦅</text>
                    </g>
                  );
                })
              ) : null}

              {/* EXTINCTION OVERLAY */}
              {isExtinct && (
                <g transform="translate(15, 60)">
                  <rect x="0" y="0" width="200" height="65" fill="#FEF2F2" stroke="#FCA5A5" rx="8" />
                  <text x="100" y="25" fill="#991B1B" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                    ⚠️ KEPUNAHAN GANDA!
                  </text>
                  <text x="100" y="42" fill="#7F1D1D" fontSize="8" fontWeight="medium" textAnchor="middle">
                    Predator kehabisan mangsa & mati kelaparan.
                  </text>
                </g>
              )}
            </g>

            {/* REAL-TIME DUAL OSCILLATION GRAPH (RIGHT) */}
            <g transform="translate(260, 35)">
              <rect x="0" y="0" width="225" height="180" fill="#FFFFFF" stroke="#CBD5E1" rx="10" />
              <text x="15" y="20" fill="#1E293B" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                Grafik Pasang-Surut Populasi
              </text>

              <line x1="25" y1="150" x2="210" y2="150" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="25" y1="30" x2="25" y2="150" stroke="#94A3B8" strokeWidth="1.5" />
              <text x="210" y="164" fill="#64748B" fontSize="8" fontWeight="bold">Waktu t</text>
              <text x="10" y="26" fill="#64748B" fontSize="8" fontWeight="bold">N</text>

              {/* Legend */}
              <circle cx="120" cy="16" r="4" fill="#2563EB" />
              <text x="127" y="19" fill="#1E293B" fontSize="7" fontWeight="bold">Mangsa (x)</text>
              <circle cx="170" cy="16" r="4" fill="#D97706" />
              <text x="177" y="19" fill="#1E293B" fontSize="7" fontWeight="bold">Predator (y)</text>

              {/* Prey Curve (Blue) */}
              <path
                d={Array.from({ length: 28 }, (_, i) => {
                  const x = 25 + i * 6.5;
                  const y = 90 - Math.sin((i / 4) + (animTick * 0.05)) * 45;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
              />

              {/* Predator Curve (Teal/Amber) */}
              <path
                d={Array.from({ length: 28 }, (_, i) => {
                  const x = 25 + i * 6.5;
                  const y = 90 - Math.sin((i / 4) + (animTick * 0.05) - 1.2) * (predatorPop / 100 * 40);
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#D97706"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Mangsa (Kelinci) = {preyPop} ekor | Pemangsa (Elang) = {predatorPop} ekor | Daya Dukung Pangan = {foodResource}%
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-emerald-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Keseimbangan Ekosistem Lotka-Volterra</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Predator tidak pernah menghabiskan seluruh mangsanya dalam kondisi alami. Penurunan populasi mangsa otomatis membatasi jumlah predator karena kelaparan, memberikan kesempatan bagi populasi mangsa untuk pulih kembali dalam fluktuasi siklus harmonis.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 4B: BIO-MED TECH NEURON ACTION POTENTIAL
  // ==========================================
  if (experimentId === '4B') {
    const isDeMyelinated = myelinSheath < 3;
    const isBlocked = sodiumConc < 30;

    const speedMs = Math.round((myelinSheath * 12) + (sodiumConc / 10));

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Bio-Medis & Impuls Saraf Potensial Aksi
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Konduksi Saltatori Nodus Ranvier & Pompa Na+/K+
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleTriggerStimulus}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Beri Stimulus Rangsangan ⚡</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-1.5 rounded-xl border text-xs font-bold transition-all ${
                isPlaying ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR TRANSMISI IMPULS SARAF:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-amber-400 rounded-l-full flex items-center justify-center text-[8px] font-bold text-slate-900">
              Imbuhan Bius / MS Kebocoran
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Transmisi Saltatori Cepat 120m/s
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{ left: (isBlocked || isDeMyelinated) ? '25%' : '75%' }}
            />
          </div>
        </div>

        {/* SVG NEURON DIAGRAM CANVAS */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid4b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid4b)" />

            {/* SOMA CELL BODY (LEFT) */}
            <g transform="translate(45, 110)">
              <polygon points="0,-25 25,-10 35,20 10,35 -20,20 -25,-10" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2" />
              <circle cx="2" cy="3" r="10" fill="#E11D48" />
              <text x="2" y="6" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">NUKLEUS</text>
              <text x="2" y="-32" fill="#BE123C" fontSize="8" fontWeight="bold" textAnchor="middle">SOMA / DENDRIT</text>
            </g>

            {/* LONG AXON WIRE */}
            <line x1="75" y1="113" x2="385" y2="113" stroke="#CBD5E1" strokeWidth="10" strokeLinecap="round" />

            {/* MYELIN SHEATH SEGMENTS (YELLOW CYLINDERS) */}
            {[90, 160, 230, 300].map((mx, idx) => {
              const heightY = isDeMyelinated ? 14 : Math.min(32, 16 + myelinSheath * 1.8);
              return (
                <g key={`myelin-${idx}`} transform={`translate(${mx}, 113)`}>
                  <rect 
                    x="0" 
                    y={-heightY / 2} 
                    width="55" 
                    height={heightY} 
                    fill={isDeMyelinated ? "#FEF08A" : "#FACC15"} 
                    stroke="#D97706" 
                    strokeWidth="1.5" 
                    rx="6" 
                  />
                  {!isDeMyelinated && (
                    <text x="27.5" y="3" fill="#78350F" fontSize="7" fontWeight="extrabold" textAnchor="middle">
                      MIELIN
                    </text>
                  )}
                </g>
              );
            })}

            {/* NODES OF RANVIER GAPS */}
            {[147, 217, 287].map((nx, idx) => (
              <text key={`node-${idx}`} x={nx} y="132" fill="#64748B" fontSize="6" fontWeight="bold" textAnchor="middle">
                Nodus
              </text>
            ))}

            {/* SYNAPTIC TERMINAL (RIGHT) */}
            <g transform="translate(385, 113)">
              <path d="M 0 0 C 20 -20, 30 -25, 45 -20 M 0 0 C 20 0, 35 0, 45 5 M 0 0 C 20 20, 30 25, 45 20" stroke="#CBD5E1" strokeWidth="4" fill="none" />
              <circle cx="45" cy="-20" r="5" fill="#2563EB" />
              <circle cx="45" cy="5" r="5" fill="#2563EB" />
              <circle cx="45" cy="20" r="5" fill="#2563EB" />
              <text x="35" y="-30" fill="#1D4ED8" fontSize="8" fontWeight="extrabold">SINAPSIS</text>
            </g>

            {/* SALTATORY ACTION POTENTIAL ELECTRICAL PULSE */}
            {!isBlocked && (
              <g transform={`translate(${75 + (pulsePos / 100) * 310}, 113)`}>
                <circle r="9" fill="#06B6D4" opacity="0.4" className="animate-ping" />
                <circle r="6" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="0" y="2.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">⚡</text>
              </g>
            )}

            {/* OSCILLOSCOPE GRAPH (BOTTOM RIGHT) */}
            <g transform="translate(300, 175)">
              <rect x="0" y="0" width="180" height="75" fill="#FFFFFF" stroke="#CBD5E1" rx="8" />
              <text x="10" y="15" fill="#1E293B" fontSize="8" fontWeight="bold">OSILOSKOP (+30 mV)</text>

              <line x1="20" y1="60" x2="165" y2="60" stroke="#E2E8F0" strokeWidth="1" />
              <line x1="20" y1="45" x2="165" y2="45" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="2 2" />
              <text x="167" y="47" fill="#64748B" fontSize="6">-55mV</text>

              {/* Action Potential Waveform */}
              <path
                d={isBlocked 
                  ? "M 20 60 L 165 60" 
                  : "M 20 60 L 50 60 L 75 22 L 95 68 L 120 60 L 165 60"
                }
                fill="none"
                stroke={isBlocked ? "#EF4444" : "#2563EB"}
                strokeWidth="2"
              />
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Na+ = {sodiumConc} mM | Mielin = {myelinSheath} μm | Kecepatan Impuls = {speedMs} m/s
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-emerald-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Konduksi Saltatori & Peran Lapisan Mielin</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Mengapa tangan langsung menarik diri saat kena panas? Lapisan mielin bertindak sebagai isolator listrik tebal yang memaksa impuls voltase (+30 mV) melompat dengan sangat cepat antar Nodus Ranvier hingga mencapai kecepatan 120 meter per detik.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 4C: CRISPR BIOTECH & MENDEL GENETICS
  // ==========================================
  if (experimentId === '4C') {
    const q = 1 - dominantFreqP;
    const p2 = Math.round(Math.pow(dominantFreqP, 2) * 100);
    const pq2 = Math.round(2 * dominantFreqP * q * 100);
    const q2 = Math.max(0, 100 - p2 - pq2);

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Dna className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                CRISPR & Pewarisan Sifat Hukum Mendel
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Peluang Genotipe Punnett Square & Hardy-Weinberg (p² + 2pq + q² = 1)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsIntermediate(!isIntermediate)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                isIntermediate 
                  ? 'bg-purple-50 text-purple-700 border-purple-200' 
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              <span>{isIntermediate ? 'Sifat Intermediet (Merah Muda)' : 'Dominansi Penuh (3:1)'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Genetiika"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">DISTRIBUSI RASIO FENOTIPE KETURUNAN:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          {/* Real-time Percentage Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="h-full bg-rose-500 rounded-l-full" style={{ width: `${p2}%` }} title={`Dominan AA (${p2}%)`} />
            <div className="h-full bg-purple-400" style={{ width: `${pq2}%` }} title={`Heterozigot Aa (${pq2}%)`} />
            <div className="h-full bg-slate-400 rounded-r-full" style={{ width: `${q2}%` }} title={`Resesif aa (${q2}%)`} />
          </div>

          <div className="flex justify-between text-[9px] font-bold font-mono text-slate-600 px-1">
            <span>AA (Dominan Sehat): {p2}%</span>
            <span>Aa (Carrier Pembawa): {pq2}%</span>
            <span>aa (Resesif Penyakit): {q2}%</span>
          </div>
        </div>

        {/* SVG PUNNETT SQUARE & FLOWER OFFSPRING CANVAS */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid4c" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid4c)" />

            {/* PUNNETT SQUARE 2x2 GRID (LEFT) */}
            <g transform="translate(45, 30)">
              <text x="110" y="-10" fill="#1E293B" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                PAPAN PUNNETT SQUARE 2x2 (PERSILANGAN Mm x Mm)
              </text>

              {/* Top Gametes */}
              <text x="70" y="15" fill="#2563EB" fontSize="12" fontWeight="extrabold" textAnchor="middle">A</text>
              <text x="150" y="15" fill="#9333EA" fontSize="12" fontWeight="extrabold" textAnchor="middle">a</text>

              {/* Left Gametes */}
              <text x="15" y="60" fill="#2563EB" fontSize="12" fontWeight="extrabold" textAnchor="middle">A</text>
              <text x="15" y="130" fill="#9333EA" fontSize="12" fontWeight="extrabold" textAnchor="middle">a</text>

              {/* Cell 1 (Top-Left: AA) */}
              <rect x="35" y="25" width="75" height="65" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" rx="6" />
              <text x="72.5" y="48" fill="#1E293B" fontSize="11" fontWeight="extrabold" textAnchor="middle">AA</text>
              <text x="72.5" y="70" fill="#E11D48" fontSize="16" textAnchor="middle">🌸</text>

              {/* Cell 2 (Top-Right: Aa) */}
              <rect x="115" y="25" width="75" height="65" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" rx="6" />
              <text x="152.5" y="48" fill="#1E293B" fontSize="11" fontWeight="extrabold" textAnchor="middle">Aa</text>
              <text x="152.5" y="70" fill={isIntermediate ? "#C084FC" : "#E11D48"} fontSize="16" textAnchor="middle">🌸</text>

              {/* Cell 3 (Bottom-Left: Aa) */}
              <rect x="35" y="95" width="75" height="65" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" rx="6" />
              <text x="72.5" y="118" fill="#1E293B" fontSize="11" fontWeight="extrabold" textAnchor="middle">Aa</text>
              <text x="72.5" y="140" fill={isIntermediate ? "#C084FC" : "#E11D48"} fontSize="16" textAnchor="middle">🌸</text>

              {/* Cell 4 (Bottom-Right: aa) */}
              <rect x="115" y="95" width="75" height="65" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" rx="6" />
              <text x="152.5" y="118" fill="#1E293B" fontSize="11" fontWeight="extrabold" textAnchor="middle">aa</text>
              <text x="152.5" y="140" fill="#94A3B8" fontSize="16" textAnchor="middle">💮</text>
            </g>

            {/* FENOTIPE RATIO DIAGRAM (RIGHT) */}
            <g transform="translate(280, 40)">
              <rect x="0" y="0" width="195" height="170" fill="#FFFFFF" stroke="#CBD5E1" rx="10" />
              <text x="15" y="20" fill="#1E293B" fontSize="9" fontWeight="bold">
                Peluang Keturunan F2
              </text>

              <rect x="15" y="35" width="165" height="32" fill="#FFF1F2" stroke="#FECDD3" rx="6" />
              <text x="25" y="55" fill="#BE123C" fontSize="9" fontWeight="bold">
                {isIntermediate ? '🌸 Bunga Merah (AA): 25%' : '🌸 Bunga Merah (AA/Aa): 75%'}
              </text>

              <rect x="15" y="75" width="165" height="32" fill={isIntermediate ? "#F3E8FF" : "#F8FAFC"} stroke="#E2E8F0" rx="6" />
              <text x="25" y="95" fill={isIntermediate ? "#7E22CE" : "#475569"} fontSize="9" fontWeight="bold">
                {isIntermediate ? '🌸 Merah Muda (Aa): 50%' : '💮 Bunga Putih (aa): 25%'}
              </text>

              <rect x="15" y="115" width="165" height="38" fill="#ECFDF5" stroke="#A7F3D0" rx="6" />
              <text x="25" y="130" fill="#047857" fontSize="8" fontWeight="bold">
                Rasio Mendel: {isIntermediate ? '1 : 2 : 1' : '3 : 1'}
              </text>
              <text x="25" y="144" fill="#059669" fontSize="7" fontWeight="medium">
                Prinsip Segregasi Bebas Mendel
              </text>
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Frekuensi Alel p = {dominantFreqP} | Alel q = {q.toFixed(2)} | Mode = {isIntermediate ? 'Intermediet' : 'Dominansi Penuh'}
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-emerald-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Hukum Segregasi Bebas Mendel & Keseimbangan Hardy-Weinberg</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Pasangan gen pembawa sifat memisah secara independen saat pembentukan gamet. Dalam populasi besar tanpa seleksi buatan, rasio alel dominan p dan resesif q tetap berada dalam persamaan kuadrat seimbang p² + 2pq + q² = 1.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default function BiologyVisualizer(props) {
  return (
    <SimulationErrorBoundary onReset={props.onReset}>
      <BiologyVisualizerContent {...props} />
    </SimulationErrorBoundary>
  );
}
