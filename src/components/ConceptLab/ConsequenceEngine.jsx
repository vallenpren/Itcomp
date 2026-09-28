import React, { useState } from 'react';
import { Lightbulb, RotateCcw } from 'lucide-react';
import FormulaTrickModal from './FormulaTrickModal';
import LaporanEvaluasiDanAlasanIlmiah from './LaporanEvaluasiDanAlasanIlmiah';
import { computeSimulationResult } from '../../data/evaluationEngine';

export default function ConsequenceEngine({ consequence, experiment, sliderValues = {}, latestSimulationResult, onReset }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine active simulation result
  const activeResult = latestSimulationResult || (experiment ? computeSimulationResult(experiment.id, sliderValues) : null);

  const burnRate = sliderValues?.burnRate ?? sliderValues?.fuelBurnRate ?? 150;
  const payloadMass = sliderValues?.payloadMass ?? 4000;
  const experimentId = experiment?.id || '1A';

  return (
    <div className="space-y-4">
      {/* Top Bar Action Items */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Reset Slider"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Parameter</span>
            </button>
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all shadow-sm flex items-center gap-2 active:scale-95"
        >
          <Lightbulb className="w-4 h-4 text-slate-950 fill-current" />
          <span>Pelajari Trik Rumus Ini 💡</span>
        </button>
      </div>

      {/* Render Dynamic Evaluation Report */}
      <LaporanEvaluasiDanAlasanIlmiah
        burnRate={burnRate}
        fuelBurnRate={burnRate}
        payloadMass={payloadMass}
        experimentId={experimentId}
        sliderValues={sliderValues}
        result={activeResult}
        experiment={experiment}
        onReset={onReset}
      />

      {/* Formula Trick Popup Modal */}
      {experiment && (
        <FormulaTrickModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          experiment={experiment}
        />
      )}
    </div>
  );
}
