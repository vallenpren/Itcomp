import React, { useState, useEffect, useRef } from 'react';
import { FlaskConical, Battery, Factory, Play, Pause, RotateCcw, Brain } from 'lucide-react';
import SimulationErrorBoundary from './SimulationErrorBoundary';

function ChemistryVisualizerContent({ 
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

  // 3A Dissolution Progress
  const [dissolvePct, setDissolvePct] = useState(0);
  const anim3ARef = useRef(null);

  // 3B Electron Flow Phase
  const [electronPhase, setElectronPhase] = useState(0);
  const anim3BRef = useRef(null);

  // 3C Molecule Bouncing Tick
  const [molTick, setMolTick] = useState(0);
  const anim3CRef = useRef(null);

  // SAFELY EXTRACT SLIDER VALUES WITH STRICT NUMERIC GUARDS & FALLBACKS
  // 3A: stomachPH, particleSurface, rateConstK
  const phAcidity = Math.max(1, Math.min(7, Number(sliderValues?.stomachPH ?? sliderValues?.phAcidity ?? 2) || 2));
  const surfaceArea = Math.max(10, Math.min(100, Number(sliderValues?.particleSurface ?? sliderValues?.surfaceArea ?? 50) || 50));
  const rateConstK = Math.max(0.1, Math.min(2, Number(sliderValues?.rateConstK ?? 0.8) || 0.8));

  // 3B: electrolyteConc, temperature, metalPair
  const concIon = Math.max(0.1, Math.min(3, Number(sliderValues?.electrolyteConc ?? sliderValues?.concIon ?? 1.2) || 1.2));
  const tempC = Number(sliderValues?.temperature ?? sliderValues?.tempC ?? 25);
  const safeTempC = isNaN(tempC) ? 25 : tempC;
  const metalPair = Number(sliderValues?.metalPair ?? 1) || 1;

  // 3C: reactorPressure, reactionTemp, catalystPresent
  const reactorPressure = Math.max(50, Math.min(400, Number(sliderValues?.reactorPressure ?? sliderValues?.pressureAtm ?? 200) || 200));
  const reactionTemp = Math.max(200, Math.min(700, Number(sliderValues?.reactionTemp ?? sliderValues?.tempC ?? 450) || 450));
  const catalystPresent = Number(sliderValues?.catalystPresent ?? 1);

  // 3A Kinetics Loop
  useEffect(() => {
    if (experimentId !== '3A') return;

    if (isPlaying) {
      let lastTime = performance.now();
      const speed = (surfaceArea / 40) * rateConstK * 0.8 + 0.3;

      const animate3A = (time) => {
        const delta = time - lastTime;
        lastTime = time;

        setDissolvePct((prev) => {
          const next = prev + speed * (delta / 16);
          return next > 100 ? 0 : next;
        });

        anim3ARef.current = requestAnimationFrame(animate3A);
      };

      anim3ARef.current = requestAnimationFrame(animate3A);
    } else {
      if (anim3ARef.current) cancelAnimationFrame(anim3ARef.current);
    }

    return () => {
      if (anim3ARef.current) cancelAnimationFrame(anim3ARef.current);
    };
  }, [experimentId, isPlaying, surfaceArea, rateConstK]);

  // 3B EV Battery Electrochemistry Loop
  useEffect(() => {
    if (experimentId !== '3B') return;

    if (isPlaying) {
      let lastTime = performance.now();
      const isOverheat = safeTempC > 50;
      const speed = isOverheat ? 0.3 : (concIon * 1.5);

      const animate3B = (time) => {
        const delta = time - lastTime;
        lastTime = time;

        setElectronPhase((prev) => (prev + speed * (delta / 16)) % 100);
        anim3BRef.current = requestAnimationFrame(animate3B);
      };

      anim3BRef.current = requestAnimationFrame(animate3B);
    } else {
      if (anim3BRef.current) cancelAnimationFrame(anim3BRef.current);
    }

    return () => {
      if (anim3BRef.current) cancelAnimationFrame(anim3BRef.current);
    };
  }, [experimentId, isPlaying, safeTempC, concIon]);

  // 3C Haber-Bosch Loop
  useEffect(() => {
    if (experimentId !== '3C') return;

    if (isPlaying) {
      let lastTime = performance.now();

      const animate3C = (time) => {
        const delta = time - lastTime;
        lastTime = time;

        setMolTick((prev) => (prev + 1.2 * (delta / 16)) % 360);
        anim3CRef.current = requestAnimationFrame(animate3C);
      };

      anim3CRef.current = requestAnimationFrame(animate3C);
    } else {
      if (anim3CRef.current) cancelAnimationFrame(anim3CRef.current);
    }

    return () => {
      if (anim3CRef.current) cancelAnimationFrame(anim3CRef.current);
    };
  }, [experimentId, isPlaying]);

  const handleReset = () => {
    setDissolvePct(0);
    setElectronPhase(0);
    setMolTick(0);
  };

  // ==========================================
  // 3A: PHARMACEUTICAL KINETICS & CAPSULE DISSOLUTION
  // ==========================================
  if (experimentId === '3A') {
    const isOverheat = consequence?.status === 'danger';
    const fluidColor = phAcidity <= 2 ? '#FDA4AF' : (phAcidity <= 4 ? '#FEF08A' : '#E2E8F0');
    const particleCount = Math.max(6, Math.min(24, Math.round(surfaceArea / 4)));
    const particleList = Array.from({ length: particleCount });

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <FlaskConical className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Industri Farmasi & Kinetika Reaksi
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Persamaan Arrhenius k = A · e^(-Ea / RT) & Kinetika Pelarutan
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
              <span>{isPlaying ? 'Jeda Reaksi' : 'Mulai Reaksi'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Pelarutan"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR LAJU KELARUTAN OBAT:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Toksik Overdosis
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Dosis Terapeutik Presisi
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{ left: isOverheat ? '25%' : '75%' }}
            />
          </div>
        </div>

        {/* SVG Canvas Gastric Vessel & Absorption Graph */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid3a" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid3a)" />

            {/* GASTRIC FLUID BEAKER (LEFT) */}
            <g transform="translate(25, 35)">
              <rect x="0" y="0" width="185" height="175" fill="#FFFFFF" stroke="#475569" strokeWidth="3" rx="8" />
              <rect x="4" y="25" width="177" height="146" fill={fluidColor} opacity="0.6" rx="4" />

              <rect x="10" y="32" width="100" height="24" fill="#FFFFFF" stroke="#CBD5E1" rx="6" />
              <text x="60" y="48" fill="#BE123C" fontSize="9" fontWeight="extrabold" textAnchor="middle" fontFamily="sans-serif">
                pH = {phAcidity} ({phAcidity <= 2.5 ? 'Asam Kuat' : 'Asam Lemah'})
              </text>

              {/* DRUG CAPSULE */}
              <g transform={`translate(90, ${110 + (surfaceArea < 30 ? 25 : 0)})`}>
                <rect x="-24" y="-12" width="24" height="24" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" rx="12" />
                <rect x="0" y="-12" width="24" height="24" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" rx="12" />
                <text x="0" y="3" fill="#64748B" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">KAPSUL</text>
              </g>

              {/* DISSOLVED MICRO DRUG PARTICLES */}
              {Array.isArray(particleList) && particleList.length > 0 ? (
                particleList.map((_, idx) => {
                  const spreadX = 90 + ((idx * 23 + dissolvePct * 2) % 80) - 40;
                  const spreadY = 110 - ((dissolvePct * 1.2 + idx * 14) % 65);
                  return (
                    <circle 
                      key={idx} 
                      cx={isNaN(spreadX) ? 90 : spreadX} 
                      cy={isNaN(spreadY) ? 110 : spreadY} 
                      r={surfaceArea < 30 ? "4.5" : "2.5"} 
                      fill="#2563EB" 
                      opacity="0.8" 
                    />
                  );
                })
              ) : null}
            </g>

            {/* BLOOD ABSORPTION MEMBRANE WALL */}
            <g transform="translate(222, 35)">
              <rect x="0" y="0" width="14" height="175" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2" rx="4" />
              <circle cx="7" cy="40" r="3" fill="#FFFFFF" />
              <circle cx="7" cy="85" r="3" fill="#FFFFFF" />
              <circle cx="7" cy="130" r="3" fill="#FFFFFF" />
              <text x="-5" y="90" fill="#BE123C" fontSize="8" fontWeight="bold" transform="rotate(-90 -5 90)">MEMBRAN DARAH</text>
            </g>

            {/* REAL-TIME ABSORPTION GRAPH C(t) */}
            <g transform="translate(255, 40)">
              <rect x="0" y="0" width="230" height="165" fill="#FFFFFF" stroke="#CBD5E1" rx="10" />
              <text x="15" y="20" fill="#1E293B" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                Kurva Penyerapan Darah C(t)
              </text>
              <line x1="25" y1="138" x2="215" y2="138" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="25" y1="30" x2="25" y2="138" stroke="#94A3B8" strokeWidth="1.5" />
              <text x="215" y="152" fill="#64748B" fontSize="8" fontWeight="bold">Waktu t</text>
              <text x="10" y="28" fill="#64748B" fontSize="8" fontWeight="bold">C(t)</text>

              <path
                d={Array.from({ length: 30 }, (_, i) => {
                  const x = 25 + i * 6.3;
                  const maxVal = (dissolvePct / 100) * 85;
                  const y = 138 - (1 - Math.exp(-i / 5)) * maxVal;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
              />
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              pH Lambung = {phAcidity} | Luas Permukaan = {surfaceArea} cm²/g | Konstanta k = {rateConstK}/jam
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-amber-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Kinetika Reaksi & Luas Permukaan Obat</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Mengapa obat puyer/kapsul bekerja lebih cepat daripada obat tablet padat? Luas permukaan sentuh yang lebih besar (A) membuat frekuensi tumbukan partikel zat pelarut berlangsung eksponensial lebih sering, sehingga laju kelarutan v = k · [A]^n melonjak drastis.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3B: EV ELECTRIC VEHICLE BATTERY & ELECTROCHEMISTRY (NERNST)
  // ==========================================
  if (experimentId === '3B') {
    const isOverheat = safeTempC > 50;
    const baseE0 = metalPair === 1 ? 3.7 : (metalPair === 2 ? 3.2 : 3.9);
    
    // SAFE DIVISION & LOGARITHM PROTECTION
    const safeConc = Math.max(0.01, concIon + 0.1);
    const rawCalcV = baseE0 + Math.log(safeConc) * 0.15;
    const voltageVal = isOverheat ? "2.10" : (isNaN(rawCalcV) ? "3.70" : rawCalcV.toFixed(2));

    const ionBases = [40, 75, 110, 145, 180, 215, 250, 285];
    const wireElectrons = [20, 60, 100, 140, 180, 220, 260, 300];

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Battery className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Baterai Mobil Listrik & Elektrokimia Nernst
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Potensial Sel E = E° - (RT/nF) · ln Q & Arus Redoks
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
              <span>{isPlaying ? 'Jeda Arus' : 'Mulai Arus'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Baterai"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Bar */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR TEGANGAN SEL BATERAI EV:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Tegangan Anjlok / Thermal Runaway
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Tegangan Sel Stable
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{ left: isOverheat ? '25%' : '75%' }}
            />
          </div>
        </div>

        {/* SVG Canvas EV Battery Cell */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid3b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid3b)" />

            {/* TWO-CHAMBER BATTERY CONTAINER */}
            <g transform="translate(60, 60)">
              <rect x="0" y="0" width="380" height="150" fill="#FFFFFF" stroke="#334155" strokeWidth="3" rx="8" />
              <rect x="4" y="20" width="372" height="126" fill={isOverheat ? '#FECDD3' : '#BAE6FD'} opacity="0.4" rx="4" />

              {/* Anode Electrode (-) Left */}
              <rect x="35" y="-15" width="22" height="145" fill="#475569" rx="3" stroke="#1E293B" strokeWidth="1.5" />
              <text x="46" y="-20" fill="#475569" fontSize="10" fontWeight="extrabold" textAnchor="middle">ANODA (-)</text>

              {/* Cathode Electrode (+) Right */}
              <rect x="323" y="-15" width="22" height="145" fill="#0284C7" rx="3" stroke="#0369A1" strokeWidth="1.5" />
              <text x="334" y="-20" fill="#0284C7" fontSize="10" fontWeight="extrabold" textAnchor="middle">KATODA (+)</text>

              {/* Separator Membrane in Middle */}
              <line x1="190" y1="20" x2="190" y2="146" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 4" />
              <text x="190" y="14" fill="#64748B" fontSize="8" fontWeight="bold" textAnchor="middle">MEMBRAN SEPARATOR</text>

              {/* LITHIUM ION PARTICLES (Li+) MIGRATING */}
              {Array.isArray(ionBases) && ionBases.length > 0 ? (
                ionBases.map((xBase, i) => {
                  const rawX = 60 + ((xBase + electronPhase * 2.5) % 260);
                  const ionX = isNaN(rawX) ? 100 : rawX;
                  return (
                    <g key={i} transform={`translate(${ionX}, ${50 + (i % 3) * 30})`}>
                      <circle r="5.5" fill="#10B981" />
                      <text x="0" y="2" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">Li+</text>
                    </g>
                  );
                })
              ) : null}

              {/* TOP WIRE CIRCUIT & CONSUMER LED LOAD */}
              <path d="M 46 -15 L 46 -40 L 334 -40 L 334 -15" fill="none" stroke="#F59E0B" strokeWidth="3" />

              {/* Motor / LED Bulb in Middle */}
              <g transform="translate(190, -40)">
                <circle r="14" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
                <path 
                  d="M -6 0 L 6 0 M 0 -6 L 0 6" 
                  stroke="#2563EB" 
                  strokeWidth="2" 
                  transform={`rotate(${(electronPhase * 10) % 360})`} 
                />
                <text x="0" y="-18" fill="#D97706" fontSize="8" fontWeight="bold" textAnchor="middle">MOTOR EV</text>
              </g>

              {/* CONTINUOUS ELECTRON PARTICLES (e-) */}
              {Array.isArray(wireElectrons) && wireElectrons.length > 0 ? (
                wireElectrons.map((eX, i) => {
                  const posOnWire = (eX + electronPhase * 3) % 280;
                  const px = 46 + (isNaN(posOnWire) ? 0 : posOnWire);
                  return (
                    <circle key={i} cx={px} cy={-40} r="3.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1" />
                  );
                })
              ) : null}
            </g>

            {/* DIGITAL VOLTMETER */}
            <g transform="translate(370, 20)">
              <rect x="0" y="0" width="115" height="42" fill="#FFFFFF" stroke={isOverheat ? '#EF4444' : '#10B981'} strokeWidth="2" rx="8" />
              <text x="57.5" y="15" fill="#64748B" fontSize="8" fontWeight="bold" textAnchor="middle">TEGANGAN SEL (VOLT)</text>
              <text x="57.5" y="32" fill={isOverheat ? '#EF4444' : '#10B981'} fontSize="13" fontWeight="extrabold" textAnchor="middle" fontFamily="monospace">
                {voltageVal} V
              </text>
            </g>

            {/* OVERHEAT WARNING BADGE */}
            {isOverheat && (
              <g transform="translate(130, 240)">
                <rect x="0" y="0" width="240" height="24" fill="#FEF2F2" stroke="#FCA5A5" rx="12" />
                <text x="120" y="16" fill="#991B1B" fontSize="9" fontWeight="extrabold" textAnchor="middle" fontFamily="sans-serif">
                  ⚠️ THERMAL RUNAWAY! SUHU BATERAI {safeTempC}°C EKSTREM!
                </text>
              </g>
            )}

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Konsentrasi Ion = {concIon} M | Suhu Baterai = {safeTempC}°C | Tegangan Sel = {voltageVal}V
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-amber-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Reaksi Redoks Spontan di Baterai Mobil Listrik</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Baterai EV menghasilkan arus listrik karena perbedaan potensial reduksi standar (E°) antara anoda dan katoda yang memicu perpindahan elektron bebas (e-) melalui sirkuit luar, sementara ion Li+ bermigrasi menembus membran separator untuk menjaga netralitas muatan.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3C: HABER-BOSCH AMMONIA SYNTHESIS & LE CHATELIER
  // ==========================================
  if (experimentId === '3C') {
    const isLowYield = consequence?.status === 'warning';

    // SAFE YIELD & COMPRESSION CALCULATIONS WITH DIVISION PROTECTIONS
    const safeP = Math.max(50, reactorPressure);
    const safeT = Math.max(200, reactionTemp);
    const rawYield = Math.round((safeP / 400) * 85 - (safeT - 350) * 0.15 + (catalystPresent ? 25 : 0));
    const ammoniaYield = isNaN(rawYield) ? 45 : Math.max(10, Math.min(98, rawYield));

    const pistonCompressY = Math.min(40, (safeP / 400) * 40);
    const safeHeight = Math.max(20, 130 - (isNaN(pistonCompressY) ? 0 : pistonCompressY));

    const moleculeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
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
              <span>{isPlaying ? 'Jeda Reaktor' : 'Mulai Reaktor'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Reaktor"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Bar */}
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
              style={{ left: isLowYield ? '25%' : '75%' }}
            />
          </div>
        </div>

        {/* SVG Canvas Industrial Steel Reactor */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid3c" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid3c)" />

            {/* INDUSTRIAL STEEL REACTOR VESSEL */}
            <g transform="translate(130, 30)">
              <rect x="0" y="0" width="240" height="190" fill="#F8FAFC" stroke="#475569" strokeWidth="4" rx="10" />

              {/* COMPRESSION PISTON */}
              <rect x="4" y={4 + pistonCompressY} width="232" height="22" fill="#334155" stroke="#1E293B" strokeWidth="2" rx="4" />
              <rect x="110" y="-15" width="20" height={20 + pistonCompressY} fill="#64748B" />

              {/* REACTION CHAMBER GAS SPACE */}
              <rect 
                x="4" 
                y={26 + pistonCompressY} 
                width="232" 
                height={Math.max(20, 160 - pistonCompressY)} 
                fill={safeT > 500 ? '#FFEDD5' : '#E0F2FE'} 
                opacity="0.3" 
                rx="4" 
              />

              {/* MOLECULES N2, H2, NH3 */}
              {Array.isArray(moleculeList) && moleculeList.length > 0 ? (
                moleculeList.map((i) => {
                  const isAmmonia = i <= Math.round((ammoniaYield / 100) * 10);
                  const rawRx = 30 + ((i * 37 + molTick * 2) % 180);
                  const rawRy = 40 + pistonCompressY + ((i * 23 + molTick * 1.5) % safeHeight);

                  const rx = isNaN(rawRx) ? 50 : rawRx;
                  const ry = isNaN(rawRy) ? 50 : rawRy;

                  if (isAmmonia) {
                    return (
                      <g key={i} transform={`translate(${rx}, ${ry})`}>
                        <circle r="7" fill="#2563EB" />
                        <circle cx="-6" cy="6" r="3.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
                        <circle cx="6" cy="6" r="3.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
                        <circle cx="0" cy="-7" r="3.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
                      </g>
                    );
                  } else {
                    const isN2 = i % 2 === 0;
                    return (
                      <g key={i} transform={`translate(${rx}, ${ry})`}>
                        <circle cx="-4" cy="0" r={isN2 ? "6" : "4"} fill={isN2 ? "#2563EB" : "#FFFFFF"} stroke="#64748B" strokeWidth="1" />
                        <circle cx="4" cy="0" r={isN2 ? "6" : "4"} fill={isN2 ? "#2563EB" : "#FFFFFF"} stroke="#64748B" strokeWidth="1" />
                      </g>
                    );
                  }
                })
              ) : null}
            </g>

            {/* RENDEMEN AMMONIA YIELD BADGE OVERLAY */}
            <g transform="translate(390, 40)">
              <rect x="0" y="0" width="95" height="80" fill="#FFFFFF" stroke="#CBD5E1" rx="10" />
              <text x="47.5" y="18" fill="#1E293B" fontSize="9" fontWeight="bold" textAnchor="middle">
                Rendemen NH₃
              </text>
              <text x="47.5" y="48" fill="#2563EB" fontSize="18" fontWeight="extrabold" textAnchor="middle" fontFamily="monospace">
                {ammoniaYield}%
              </text>
              <text x="47.5" y="68" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle">
                Le Chatelier
              </text>
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Tekanan P = {safeP} atm | Suhu T = {safeT}°C | Katalis Fe = {catalystPresent ? 'Aktif' : 'Non-Aktif'}
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-amber-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Asas Le Chatelier di Industri Amonia Haber-Bosch</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Sistem reaktor akan selalu membalas perlakuan luar. Menekan volume tabung (memperbesar Tekanan P) memaksa molekul gas merapat dan membentuk amonia (NH₃) lebih banyak demi mengurangi tekanan ruang (bergeser ke jumlah koefisien molekul yang lebih kecil).
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default function ChemistryVisualizer(props) {
  return (
    <SimulationErrorBoundary onReset={props.onReset}>
      <ChemistryVisualizerContent {...props} />
    </SimulationErrorBoundary>
  );
}
