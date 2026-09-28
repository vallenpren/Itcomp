import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { evaluateExperiment, computeSimulationResult } from '../data/evaluationEngine';
import { 
  Compass, 
  Sliders, 
  RotateCcw, 
  Bot, 
  Layers, 
  Atom,
  Calculator,
  FlaskConical,
  Dna,
  TrendingUp,
  Cpu,
  Play,
  Rocket,
  RefreshCw,
  Plus,
  Minus,
  Flame,
  ShieldCheck
} from 'lucide-react';

import { SUBJECT_CLUSTERS, EXPERIMENTS_DATA } from '../data/conceptLabData';
import StoryCardSlider from './ConceptLab/StoryCardSlider';
import IndustryDomainSwitcher from './ConceptLab/IndustryDomainSwitcher';
import ConsequenceEngine from './ConceptLab/ConsequenceEngine';
import SocraticMentorDrawer from './ConceptLab/SocraticMentorDrawer';
import TeacherPresetBar from './ConceptLab/TeacherPresetBar';

import MathVisualizer from './ConceptLab/MathVisualizer';
import PhysicsVisualizer from './ConceptLab/PhysicsVisualizer';
import ChemistryVisualizer from './ConceptLab/ChemistryVisualizer';
import BiologyVisualizer from './ConceptLab/BiologyVisualizer';
import EconomyVisualizer from './ConceptLab/EconomyVisualizer';
import InformaticsVisualizer from './ConceptLab/InformaticsVisualizer';

export default function RealWorldSandbox() {
  // Active Selected Experiment ID (Default: '1A')
  const [activeExpId, setActiveExpId] = useState('1A');

  // Active Subject Cluster filter tab (Default: 'all')
  const [activeSubjectFilter, setActiveSubjectFilter] = useState('all');

  // Interactive Sliders state for current active experiment
  const currentExpData = EXPERIMENTS_DATA[activeExpId] || EXPERIMENTS_DATA['1A'];

  // Initialize sliders with defaults
  const getInitialSliderValues = (expObj) => {
    const initial = {};
    if (expObj && expObj.controls) {
      expObj.controls.forEach((ctrl) => {
        initial[ctrl.id] = ctrl.defaultVal;
      });
    }
    return initial;
  };

  const [sliderValues, setSliderValues] = useState(() => getInitialSliderValues(currentExpData));

  // State for latest simulation result (Lifting state up for dynamic calculation report)
  const [latestSimulationResult, setLatestSimulationResult] = useState(() => computeSimulationResult(activeExpId, sliderValues));

  // Automatically sync latestSimulationResult whenever active experiment or slider values change
  useEffect(() => {
    setLatestSimulationResult(computeSimulationResult(activeExpId, sliderValues));
  }, [activeExpId, sliderValues]);

  // Simulation Runner State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0); // 0 to 100
  const [simulationTime, setSimulationTime] = useState(0); // in seconds
  const [hasRun, setHasRun] = useState(false);

  const timerRef = useRef(null);

  // Toggle Presentation / Fullscreen Mode
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  // Toggle AI Socratic Mentor Drawer
  const [isSocraticDrawerOpen, setIsSocraticDrawerOpen] = useState(false);

  // Switch experiment handler
  const handleSelectExperiment = (expId) => {
    setActiveExpId(expId);
    const newExp = EXPERIMENTS_DATA[expId];
    if (newExp) {
      setSliderValues(getInitialSliderValues(newExp));
    }
    setIsSimulating(false);
    setSimulationProgress(0);
    setSimulationTime(0);
    setHasRun(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Slider change handler
  const handleSliderChange = (ctrlId, val) => {
    setSliderValues((prev) => ({ ...prev, [ctrlId]: Number(val) }));
  };

  // Step adjust handler (+ and - buttons for touch accuracy on mobile)
  const handleStepValue = (ctrl, delta) => {
    const step = ctrl.step || 1;
    const currentVal = sliderValues[ctrl.id] ?? ctrl.defaultVal;
    const newVal = Math.min(ctrl.max, Math.max(ctrl.min, currentVal + delta * step));
    const roundedVal = Number(newVal.toFixed(2));
    setSliderValues((prev) => ({ ...prev, [ctrl.id]: roundedVal }));
  };

  // Reset sliders to default
  const handleResetSliders = () => {
    setSliderValues(getInitialSliderValues(currentExpData));
    setIsSimulating(false);
    setSimulationProgress(0);
    setSimulationTime(0);
  };

  // Apply preset scenario
  const handleApplyPreset = (presetValues) => {
    setSliderValues((prev) => ({ ...prev, ...presetValues }));
  };

  // Quick Preset Shortcuts (Kondisi Standar, Kondisi Ekstrem, Kondisi Optimal)
  const handleQuickScenario = (scenarioType) => {
    if (!currentExpData) return;
    
    if (scenarioType === 'standard') {
      handleResetSliders();
    } else if (scenarioType === 'extreme') {
      const extremeVals = {};
      currentExpData.controls.forEach(ctrl => {
        extremeVals[ctrl.id] = ctrl.max;
      });
      setSliderValues(extremeVals);
    } else if (scenarioType === 'optimal') {
      const optimalPreset = currentExpData.presets?.find(p => 
        p.name.toLowerCase().includes('optimal') || p.name.toLowerCase().includes('aman') || p.name.toLowerCase().includes('standar')
      );
      if (optimalPreset && optimalPreset.values) {
        setSliderValues(optimalPreset.values);
      } else {
        handleResetSliders();
      }
    }
  };

  // Run Experiment Handler
  const handleRunExperiment = () => {
    if (isSimulating) return;

    if (timerRef.current) clearInterval(timerRef.current);

    setIsSimulating(true);
    setHasRun(true);
    setSimulationProgress(0);
    setSimulationTime(0);

    // Compute live simulation execution metrics
    setLatestSimulationResult(computeSimulationResult(activeExpId, sliderValues));

    const totalDurationSec = 4.8;
    const intervalMs = 50;
    const totalSteps = (totalDurationSec * 1000) / intervalMs;
    let step = 0;

    timerRef.current = setInterval(() => {
      step++;
      const currentPct = Math.min(100, (step / totalSteps) * 100);
      const currentTime = Math.min(totalDurationSec, (step / totalSteps) * totalDurationSec);

      setSimulationProgress(currentPct);
      setSimulationTime(currentTime);

      if (step >= totalSteps) {
        clearInterval(timerRef.current);
        setIsSimulating(false);
        setLatestSimulationResult(computeSimulationResult(activeExpId, sliderValues));
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 }
          });
        } catch (e) {
          // ignore if confetti fails
        }
      }
    }, intervalMs);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Calculate real-time consequence reactively
  const consequence = useMemo(() => {
    return evaluateExperiment(activeExpId, sliderValues);
  }, [activeExpId, sliderValues]);

  return (
    <div className={`min-h-screen bg-[#F8FAFC] transition-all duration-300 font-sans ${isPresentationMode ? 'p-4 sm:p-8 bg-slate-900 text-white' : 'space-y-6 p-3 sm:p-6'}`}>
      
      {/* HEADER BAR */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
        isPresentationMode 
          ? 'bg-slate-900 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Real-World Concept Lab
                </h1>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
                  Laboratorium Visual Multidisiplin
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium leading-relaxed">
                Laboratorium visual interaktif 6 Rumpun Mapel Utama (Matematika, Fisika, Kimia, Biologi, Ekonomi, & Informatika)
              </p>
            </div>
          </div>

          {/* Quick Mentor Trigger Button */}
          <button
            onClick={() => setIsSocraticDrawerOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 shrink-0 self-start md:self-auto"
          >
            <Bot className="w-4 h-4 text-teal-300" />
            <span>Tanya Mentor AI Sokratik</span>
          </button>
        </div>

        {/* SUBJECT CLUSTERS GRID CATALOG & TAB SWITCHER */}
        {!isPresentationMode && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Katalog 6 Rumpun Mata Pelajaran (18 Eksperimen Utama):
              </span>

              {/* Filter Pills */}
              <div className="flex gap-1 overflow-x-auto p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setActiveSubjectFilter('all')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    activeSubjectFilter === 'all' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua Mapel (6)
                </button>
                {SUBJECT_CLUSTERS.map((cluster) => (
                  <button
                    key={cluster.id}
                    onClick={() => setActiveSubjectFilter(cluster.id)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      activeSubjectFilter === cluster.id ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cluster.name}
                  </button>
                ))}
              </div>
            </div>

            {/* EXPERIMENTS GRID SELECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SUBJECT_CLUSTERS
                .filter((c) => activeSubjectFilter === 'all' || activeSubjectFilter === c.id)
                .flatMap((c) => c.experiments)
                .map((exp) => {
                  const isSelected = exp.id === activeExpId;
                  const expData = EXPERIMENTS_DATA[exp.id];

                  return (
                    <button
                      key={exp.id}
                      onClick={() => handleSelectExperiment(exp.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-600 border border-slate-200'}`}>
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`text-[9px] font-extrabold px-2 py-0.2 rounded-full uppercase ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {expData?.subjectName || 'Mapel'}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold truncate leading-tight">{exp.title}</h4>
                        <p className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                          {exp.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        )}

      </div>

      {/* TEACHER PRESET & PRESENTATION MODE BAR */}
      <TeacherPresetBar
        presets={currentExpData?.presets || []}
        onApplyPreset={handleApplyPreset}
        isPresentationMode={isPresentationMode}
        onTogglePresentationMode={() => setIsPresentationMode(!isPresentationMode)}
      />

      {/* MAIN EXPERIMENT CANVAS: 4-LAYER INTERACTIVE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: LAYER 3 INTERACTIVE PLAYGROUND (SLIDERS + CANVAS VISUALIZER) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* VISUALIZER CANVAS CONTAINER */}
          <div className="space-y-4">
            {currentExpData?.subjectId === 'math' && (
              <MathVisualizer 
                experimentId={activeExpId} 
                sliderValues={sliderValues} 
                consequence={consequence} 
                isSimulating={isSimulating}
                simulationProgress={simulationProgress}
                simulationTime={simulationTime}
                hasRun={hasRun}
              />
            )}
            {currentExpData?.subjectId === 'physics' && (
              <PhysicsVisualizer 
                experimentId={activeExpId} 
                sliderValues={sliderValues} 
                consequence={consequence}
                isSimulating={isSimulating}
                simulationProgress={simulationProgress}
                simulationTime={simulationTime}
                hasRun={hasRun}
              />
            )}
            {currentExpData?.subjectId === 'chemistry' && (
              <ChemistryVisualizer 
                experimentId={activeExpId} 
                sliderValues={sliderValues} 
                consequence={consequence}
                isSimulating={isSimulating}
                simulationProgress={simulationProgress}
                simulationTime={simulationTime}
                hasRun={hasRun}
              />
            )}
            {currentExpData?.subjectId === 'biology' && (
              <BiologyVisualizer 
                experimentId={activeExpId} 
                sliderValues={sliderValues} 
                consequence={consequence}
                isSimulating={isSimulating}
                simulationProgress={simulationProgress}
                simulationTime={simulationTime}
                hasRun={hasRun}
              />
            )}
            {currentExpData?.subjectId === 'economy' && (
              <EconomyVisualizer 
                experimentId={activeExpId} 
                sliderValues={sliderValues} 
                consequence={consequence}
                isSimulating={isSimulating}
                simulationProgress={simulationProgress}
                simulationTime={simulationTime}
                hasRun={hasRun}
              />
            )}
            {currentExpData?.subjectId === 'informatics' && (
              <InformaticsVisualizer 
                experimentId={activeExpId} 
                sliderValues={sliderValues} 
                consequence={consequence}
                isSimulating={isSimulating}
                simulationProgress={simulationProgress}
                simulationTime={simulationTime}
                hasRun={hasRun}
              />
            )}
          </div>

          {/* SIMULATION RUNNER ACTION BAR */}
          <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
                <Rocket className={`w-5 h-5 ${isSimulating ? 'animate-bounce text-amber-500' : 'text-blue-600'}`} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isSimulating ? 'Simulasi Berjalan...' : 'Eksekusi Simulasi Real-Time'}
                </h4>
                <p className="text-xs text-slate-600 font-medium">
                  {isSimulating ? `Mengkalkulasi parameter (${Math.round(simulationProgress)}%)` : 'Tekan tombol di kanan untuk menjalankan eksperimen.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleRunExperiment}
              disabled={isSimulating}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 shrink-0 ${
                isSimulating 
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
              }`}
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                  <span>Simulasi ({Math.round(simulationProgress)}%)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-white fill-white" />
                  <span>🚀 JALANKAN EKSPERIMEN</span>
                </>
              )}
            </button>
          </div>

          {/* LAYER 3: VARIABLE CONTROL SLIDERS CARD */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5 text-slate-900">
            
            {/* Header & Quick Scenario Shortcuts */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2 text-blue-700 font-extrabold text-xs uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>Layer 3: Kontrol Presisi & Skenario Pintas</span>
              </div>

              {/* Quick Scenario Shortcut Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                <button
                  onClick={() => handleQuickScenario('standard')}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-all flex items-center gap-1 border border-slate-200"
                  title="Kembalikan ke Kondisi Standar"
                >
                  <RotateCcw className="w-3 h-3 text-slate-500" />
                  <span>[Kondisi Standar]</span>
                </button>

                <button
                  onClick={() => handleQuickScenario('extreme')}
                  className="px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold transition-all flex items-center gap-1 border border-rose-200"
                  title="Uji Nilai Maksimum Ekstrem"
                >
                  <Flame className="w-3 h-3 text-rose-500" />
                  <span>[Kondisi Ekstrem]</span>
                </button>

                <button
                  onClick={() => handleQuickScenario('optimal')}
                  className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold transition-all flex items-center gap-1 border border-emerald-200"
                  title="Atur ke Nilai Paling Optimal Aman"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>[Kondisi Optimal]</span>
                </button>
              </div>
            </div>

            {/* Sliders Grid with Plus (+) and Minus (-) Precision Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentExpData?.controls?.map((ctrl) => {
                const val = sliderValues[ctrl.id] ?? ctrl.defaultVal;
                return (
                  <div key={ctrl.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span className="truncate pr-2">{ctrl.label}:</span>
                      <span className="text-blue-700 font-mono font-extrabold bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 shadow-xs shrink-0">
                        {val} {ctrl.unit}
                      </span>
                    </div>

                    {/* Precision Slider Row with (+) and (-) Touch Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStepValue(ctrl, -1)}
                        className="w-8 h-8 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-black text-sm flex items-center justify-center border border-slate-200 shadow-xs active:scale-90 transition-transform shrink-0"
                        title="Kurangi Precision (-)"
                      >
                        <Minus className="w-3.5 h-3.5 text-slate-600" />
                      </button>

                      <input
                        type="range"
                        min={ctrl.min}
                        max={ctrl.max}
                        step={ctrl.step || 1}
                        value={val}
                        onChange={(e) => handleSliderChange(ctrl.id, e.target.value)}
                        className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                      />

                      <button
                        onClick={() => handleStepValue(ctrl, 1)}
                        className="w-8 h-8 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-black text-sm flex items-center justify-center border border-slate-200 shadow-xs active:scale-90 transition-transform shrink-0"
                        title="Tambah Precision (+)"
                      >
                        <Plus className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: LAYER 1 STORY + LAYER 2 DOMAIN */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* LAYER 1: STORY OF THE FORMULA SLIDER */}
          <StoryCardSlider stories={currentExpData?.story || []} />

          {/* LAYER 2: INDUSTRY DOMAIN SWITCHER */}
          <IndustryDomainSwitcher domains={currentExpData?.industryDomains || []} />

        </div>

      </div>

      {/* LAYER 4: LIVE CONSEQUENCE ENGINE & OUTPUT REPORT BOXES */}
      <ConsequenceEngine 
        consequence={consequence} 
        experiment={currentExpData}
        sliderValues={sliderValues}
        latestSimulationResult={latestSimulationResult}
        onReset={handleResetSliders}
      />

      {/* LAYER 5: AI SOCRATIC MENTOR DRAWER */}
      <SocraticMentorDrawer
        isOpen={isSocraticDrawerOpen}
        onClose={() => setIsSocraticDrawerOpen(false)}
        activeExperiment={currentExpData}
      />

    </div>
  );
}
