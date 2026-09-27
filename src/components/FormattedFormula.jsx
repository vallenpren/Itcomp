import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Info } from 'lucide-react';

export default function FormattedFormula({ 
  math = "", 
  label = "", 
  explanation = "", 
  variables = [], 
  accentColor = "indigo", // "indigo" | "teal" | "amber" | "blue"
  inline = false
}) {
  const containerRef = useRef(null);
  const [activeHoverVar, setActiveHoverVar] = useState(null);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    let timer;

    const renderKaTeX = () => {
      if (containerRef.current && window.katex && math) {
        try {
          window.katex.render(math, containerRef.current, {
            displayMode: !inline,
            throwOnError: false,
            errorColor: '#ef4444',
          });
          setRenderError(false);
        } catch (err) {
          console.error("KaTeX Render Error:", err);
          setRenderError(true);
        }
      } else if (math && !window.katex) {
        // Retry shortly if KaTeX CDN script is still loading asynchronously
        timer = setTimeout(renderKaTeX, 100);
      }
    };

    renderKaTeX();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [math, inline]);

  const accentStyles = {
    indigo: {
      border: 'border-l-indigo-600',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      hoverChip: 'hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200',
      activeChip: 'bg-indigo-100 text-indigo-800 border-indigo-300 font-bold'
    },
    teal: {
      border: 'border-l-teal-600',
      badge: 'bg-teal-50 text-teal-700 border-teal-200/80',
      hoverChip: 'hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200',
      activeChip: 'bg-teal-100 text-teal-800 border-teal-300 font-bold'
    },
    amber: {
      border: 'border-l-amber-500',
      badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
      hoverChip: 'hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200',
      activeChip: 'bg-amber-100 text-amber-800 border-amber-300 font-bold'
    },
    blue: {
      border: 'border-l-blue-600',
      badge: 'bg-blue-50 text-blue-700 border-blue-200/80',
      hoverChip: 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200',
      activeChip: 'bg-blue-100 text-blue-800 border-blue-300 font-bold'
    }
  };

  const currentAccent = accentStyles[accentColor] || accentStyles.indigo;

  if (inline) {
    return (
      <span className="inline-flex items-center gap-1 font-serif px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-900 font-medium">
        <span ref={containerRef}>
          {renderError || !window.katex ? math : null}
        </span>
      </span>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 border-l-4 ${currentAccent.border} hover:shadow-md transition-all`}>
      
      {/* Formula Title Header */}
      {(label || explanation) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {label && (
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${currentAccent.badge}`}>
                {label}
              </span>
            </div>
          )}
          {explanation && (
            <p className="text-xs text-slate-500 font-medium">
              {explanation}
            </p>
          )}
        </div>
      )}

      {/* Main KaTeX Rendered Mathematics Box */}
      <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl overflow-x-auto text-center flex items-center justify-center min-h-[56px]">
        {renderError || !window.katex ? (
          <div className="font-serif text-lg sm:text-xl text-slate-900 tracking-wide font-medium">
            {math}
          </div>
        ) : (
          <div 
            ref={containerRef} 
            className="text-lg sm:text-2xl text-slate-900 font-serif tracking-tight selection:bg-indigo-100"
          />
        )}
      </div>

      {/* Interactive Variable Glossary Chips */}
      {variables && variables.length > 0 && (
        <div className="pt-3 border-t border-slate-100/80">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Glosarium Variabel Rumus:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {variables.map((item, idx) => {
              const isHovered = activeHoverVar === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveHoverVar(idx)}
                  onMouseLeave={() => setActiveHoverVar(null)}
                  className={`px-2.5 py-1 rounded-lg border text-xs transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isHovered 
                      ? currentAccent.activeChip 
                      : `bg-slate-100/70 text-slate-700 border-slate-200/70 ${currentAccent.hoverChip}`
                  }`}
                >
                  <span className="font-bold font-serif text-slate-900">{item.symbol}</span>
                  <span className="text-slate-400 font-normal">=</span>
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
