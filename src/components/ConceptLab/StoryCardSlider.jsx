import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, History, Sparkles } from 'lucide-react';

export default function StoryCardSlider({ stories = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!stories || stories.length === 0) return null;

  const currentStory = stories[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <div className="bg-white text-slate-900 rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-blue-700 font-extrabold text-xs uppercase tracking-wider">
          <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <History className="w-4 h-4 text-blue-600" />
          </div>
          <span>Layer 1: Story of The Formula (Asal-Usul & Sejarah Dunia Nyata)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            {currentIndex + 1} / {stories.length}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="space-y-2 min-h-[110px] flex flex-col justify-center">
        <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          {currentStory.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          {currentStory.content}
        </p>
      </div>

      {/* Footer Navigation Dots & Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex gap-1.5">
          {stories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
            title="Kartu Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
