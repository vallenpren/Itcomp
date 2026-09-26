import React from 'react';
import { Cpu, ShieldCheck, Network, Brain } from 'lucide-react';

export default function InformaticsVisualizer({ 
  experimentId, 
  sliderValues, 
  consequence, 
  isSimulating, 
  simulationProgress = 0, 
  simulationTime = 0, 
  hasRun = false 
}) {
  const currentPct = isSimulating ? simulationProgress : (hasRun ? 100 : 70);

  const getStatusZone = (status) => {
    if (status === 'optimal') return { color: '#10B981', label: 'RENTANG AMAN (OPTIMAL)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (status === 'warning') return { color: '#F59E0B', label: 'MENDEKATI BATAS KRITIS (WARNING)', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { color: '#EF4444', label: 'AMBANG GAGAL / HANCUR (DANGER)', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  const statusZone = getStatusZone(consequence?.status);

  // 6A: Dijkstra Logistics
  if (experimentId === '6A') {
    const { warehouseNodes = 12, trafficJam = 4 } = sliderValues;
    const isHeavyTraffic = consequence?.status === 'warning';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
              <Network className="w-4 h-4 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Logistik E-Commerce & Algoritma Graf Dijkstra / A*
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Pencarian Rute Kurir Terpendek f(n) = g(n) + h(n)
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            f(n) = g(n) + h(n)
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR EFISIENSI RUTE GRAF:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-amber-400 rounded-l-full flex items-center justify-center text-[8px] font-bold text-slate-900">
              Macet / Rerouting
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Shortest Path
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isHeavyTraffic ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid6a" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid6a)" />

            <text x="160" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Titik Gudang (Nodes) = {warehouseNodes} | Kemacetan = {trafficJam}x
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // 6B: RSA Cryptography
  if (experimentId === '6B') {
    const { primeP = 61, primeQ = 53 } = sliderValues;
    const isWeak = consequence?.status === 'danger';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
              <ShieldCheck className="w-4 h-4 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Keamanan Perbankan & Kriptografi Kunci Publik RSA
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Enkripsi Modulus Bilangan Prima (n = p · q)
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            c = m^e mod n
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR KEKUATAN ENKRIPSI RSA:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Mudah Di-Hack
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              RSA Militer Amati
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isWeak ? '25%' : '75%'
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid6b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid6b)" />

            <text x="160" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Modulus RSA n = {primeP * primeQ} (p = {primeP}, q = {primeQ})
            </text>
          </svg>
        </div>
      </div>
    );
  }

  // 6C: AI Neural Networks
  if (experimentId === '6C') {
    const { learningRate = 0.05, hiddenLayers = 4 } = sliderValues;
    const isOvershoot = consequence?.status === 'danger';
    const isUnderfit = consequence?.status === 'warning';

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
              <Brain className="w-4 h-4 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Kecerdasan Buatan (AI) & Gradient Descent Neural Network
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Laju Pembelajaran (α) vs Konvergensi Loss Function
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            w = w - α(∂L/∂w)
          </span>
        </div>

        {/* STATUS ZONE BOUNDARY BAR */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR KONVERGENSI PELATIHAN AI:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/3 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Overshooting Divergen
            </div>
            <div className="w-1/3 h-full bg-amber-400 flex items-center justify-center text-[8px] font-bold text-slate-900">
              Underfitting
            </div>
            <div className="w-1/3 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Konvergen 99%
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{
                left: isOvershoot ? '16.5%' : (isUnderfit ? '50%' : '83.5%')
              }}
            />
          </div>
        </div>

        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid6c" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid6c)" />

            <text x="160" y="250" fill="#334155" fontSize="10" fontWait="bold" fontFamily="monospace">
              Learning Rate α = {learningRate} | Hidden Layers = {hiddenLayers}
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
