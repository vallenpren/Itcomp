import React from 'react';
import { Maximize2, Minimize2, Sparkles, Play } from 'lucide-react';

export default function TeacherPresetBar({ 
  presets = [], 
  onApplyPreset, 
  isPresentationMode, 
  onTogglePresentationMode 
}) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      
      {/* Left: Presets Selection */}
      <div className="space-y-1.5 flex-1 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
            Preset Skenario Instan (Guru & Siswa)
          </span>
        </div>
        <p className="text-[11px] text-slate-500 font-medium">
          Satu klik untuk mensimulasikan fenomena ekstrem tanpa perlu menggeser slider manual.
        </p>

        {/* Preset Buttons Grid */}
        <div className="flex flex-wrap gap-2 pt-1">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => onApplyPreset(preset.values)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-xs"
            >
              <Play className="w-3 h-3 text-blue-600 fill-blue-600" />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Presentation / Projector Mode Toggle */}
      <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex items-center justify-end">
        <button
          onClick={onTogglePresentationMode}
          className={`w-full sm:w-auto px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
            isPresentationMode
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          title="Mode Presentasi Kelas tanpa gangguan menu"
        >
          {isPresentationMode ? (
            <>
              <Minimize2 className="w-4 h-4" />
              <span>Keluar Mode Layar Lebar Proyektor</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4 text-white" />
              <span>Mode Presentasi Proyektor Kelas</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
