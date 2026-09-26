import React, { useState } from 'react';
import { Building2, CheckCircle2, Factory } from 'lucide-react';

export default function IndustryDomainSwitcher({ domains = [] }) {
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);

  if (!domains || domains.length === 0) return null;

  const activeDomain = domains[activeDomainIndex];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-blue-700 font-extrabold text-xs uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span>Layer 2: Industry Domain Switcher (Aplikasi Sektor Industri)</span>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Minimal 2-3 Sektor Nyata
        </span>
      </div>

      {/* Domain Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {domains.map((domain, idx) => {
          const isActive = idx === activeDomainIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveDomainIndex(idx)}
              className={`p-3 rounded-2xl text-left transition-all border flex items-start gap-2.5 ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-white text-blue-600 border border-slate-200'}`}>
                <Factory className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <h5 className="text-xs font-bold truncate leading-tight">{domain.name}</h5>
                <p className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  Klik untuk penjelasan
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Domain Detail Card */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
            Penerapan di {activeDomain.name}
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {activeDomain.desc}
          </p>
        </div>
      </div>

    </div>
  );
}
