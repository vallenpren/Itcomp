import React, { useState, useEffect, useRef } from 'react';
import { 
  Tv, 
  X, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Sliders, 
  Sparkles,
  Rocket,
  Maximize2
} from 'lucide-react';
import PhysicsVisualizer from './ConceptLab/PhysicsVisualizer';
import { EXPERIMENTS_DATA } from '../data/conceptLabData';

export default function ProjectorView({ onExit, initialPreset = null }) {
  // Parabola experiment (1A)
  const expData = EXPERIMENTS_DATA['1A'];

  // Slider state for angle & velocity
  const [sliderValues, setSliderValues] = useState({
    angle: initialPreset === 'fail' ? 15 : 45,
    v0: initialPreset === 'fail' ? 10 : 20,
  });

  const [activePreset, setActivePreset] = useState(initialPreset || 'success'); // 'success' | 'fail' | 'custom'
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(100);
  const [simulationTime, setSimulationTime] = useState(4.8);
  const [hasRun, setHasRun] = useState(true);

  const timerRef = useRef(null);

  const handleApplyPresetSuccess = () => {
    setActivePreset('success');
    setSliderValues({ angle: 45, v0: 20 });
    triggerRun();
  };

  const handleApplyPresetFail = () => {
    setActivePreset('fail');
    setSliderValues({ angle: 15, v0: 10 });
    triggerRun();
  };

  const triggerRun = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSimulating(true);
    setHasRun(true);
    setSimulationProgress(0);
    setSimulationTime(0);

    const totalDurationSec = 4;
    const intervalMs = 50;
    const totalSteps = (totalDurationSec * 1000) / intervalMs;
    let step = 0;

    timerRef.current = setInterval(() => {
      step++;
      const pct = Math.min(100, (step / totalSteps) * 100);
      const timeSec = Math.min(totalDurationSec, (step / totalSteps) * totalDurationSec);
      setSimulationProgress(pct);
      setSimulationTime(timeSec);

      if (step >= totalSteps) {
        clearInterval(timerRef.current);
        setIsSimulating(false);
      }
    }, intervalMs);
  };

  useEffect(() => {
    triggerRun();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const consequence = expData?.calculateConsequence
    ? expData.calculateConsequence(sliderValues)
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col font-sans overflow-y-auto">
      
      {/* TOP HEADER PROYECTOR BAR */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
            <Tv className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Layar Proyektor Kelas — Simulasi Visual Hari Ini
              </h1>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
                Mode Presentasi Lapang
              </span>
            </div>
            <p className="text-sm text-slate-400 font-medium">
              Tampilan khusus untuk diproyeksikan ke papan tulis / layar proyektor kelas tanpa menu yang mengganggu.
            </p>
          </div>
        </div>

        {/* TOMBOL KELUAR LAPANG */}
        <button
          onClick={onExit}
          className="px-6 py-3 rounded-2xl bg-red-600/90 hover:bg-red-600 text-white font-extrabold text-base transition-all shadow-lg flex items-center gap-2.5 active:scale-95 shrink-0"
        >
          <X className="w-6 h-6" />
          <span>Keluar dari Proyektor</span>
        </button>
      </header>

      {/* PRESET BAR 1-KLIK (BESAR & TOUCH-FRIENDLY) */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-base font-extrabold text-white uppercase tracking-wider">
            Preset Skenario Otomatis (1 Klik):
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          {/* TOMBOL PRESET SUKSES */}
          <button
            onClick={handleApplyPresetSuccess}
            className={`flex-1 sm:flex-none px-6 py-3.5 rounded-2xl font-black text-base transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95 ${
              activePreset === 'success'
                ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/30 scale-105'
                : 'bg-slate-800 text-emerald-300 hover:bg-emerald-950/50 border border-emerald-500/40'
            }`}
          >
            <CheckCircle2 className="w-6 h-6 text-white" />
            <span>🟢 Contoh Sukses (Sudut 45°)</span>
          </button>

          {/* TOMBOL PRESET GAGAL */}
          <button
            onClick={handleApplyPresetFail}
            className={`flex-1 sm:flex-none px-6 py-3.5 rounded-2xl font-black text-base transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95 ${
              activePreset === 'fail'
                ? 'bg-red-500 text-white ring-4 ring-red-500/30 scale-105'
                : 'bg-slate-800 text-red-300 hover:bg-red-950/50 border border-red-500/40'
            }`}
          >
            <AlertTriangle className="w-6 h-6 text-white" />
            <span>🔴 Contoh Gagal (Sudut 15°)</span>
          </button>
        </div>
      </div>

      {/* STATUS BANNER HIGHLIGHT FOR CLASS PRESENTATION */}
      {activePreset === 'success' && (
        <div className="bg-emerald-900/60 border-b border-emerald-500/40 px-6 py-3 text-center">
          <p className="text-lg font-black text-emerald-300 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span>CONTOH SUKSES: Sudut 45° memberikan jarak jangkauan paling jauh (Maksimum)!</span>
          </p>
        </div>
      )}

      {activePreset === 'fail' && (
        <div className="bg-red-900/60 border-b border-red-500/40 px-6 py-3 text-center">
          <p className="text-lg font-black text-red-300 flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span>CONTOH GAGAL: Sudut 15° terlalu landai sehingga jatuh jauh sebelum mencapai target!</span>
          </p>
        </div>
      )}

      {/* MAIN PROJECTOR SIMULATION CANVAS AREA */}
      <main className="flex-1 p-6 max-w-6xl w-full mx-auto space-y-6 flex flex-col justify-center">
        
        {/* PARABOLA VISUALIZER CANVAS */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <PhysicsVisualizer
            experimentId="1A"
            sliderValues={sliderValues}
            consequence={consequence}
            isSimulating={isSimulating}
            simulationProgress={simulationProgress}
            simulationTime={simulationTime}
            hasRun={hasRun}
          />
        </div>

        {/* QUICK CONTROL SLIDERS & RE-RUN BUTTON FOR TEACHER */}
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sudut Slider */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex justify-between items-center text-base font-bold">
                <span className="text-slate-300">Sudut Elevasi (θ):</span>
                <span className="text-emerald-400 font-extrabold text-xl">{sliderValues.angle}°</span>
              </div>
              <input
                type="range"
                min="5"
                max="85"
                step="5"
                value={sliderValues.angle}
                onChange={(e) => {
                  setActivePreset('custom');
                  setSliderValues(prev => ({ ...prev, angle: Number(e.target.value) }));
                }}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Kecepatan Awal Slider */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex justify-between items-center text-base font-bold">
                <span className="text-slate-300">Kecepatan Awal (v₀):</span>
                <span className="text-blue-400 font-extrabold text-xl">{sliderValues.v0} m/s</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={sliderValues.v0}
                onChange={(e) => {
                  setActivePreset('custom');
                  setSliderValues(prev => ({ ...prev, v0: Number(e.target.value) }));
                }}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={triggerRun}
              disabled={isSimulating}
              className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-base transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
            >
              <Play className="w-6 h-6 fill-white" />
              <span>{isSimulating ? 'Simulasi Berjalan...' : 'Jalankan Ulang'}</span>
            </button>
          </div>

        </div>

      </main>

    </div>
  );
}
