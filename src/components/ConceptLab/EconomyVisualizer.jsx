import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Landmark, PieChart, Play, Pause, RotateCcw, ShoppingBag, ShieldAlert, Sparkles, Brain, AlertTriangle } from 'lucide-react';
import SimulationErrorBoundary from './SimulationErrorBoundary';

function EconomyVisualizerContent({ 
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

  // 5C Market Crash Trigger State
  const [isCrashing, setIsCrashing] = useState(false);
  const [crashProgress, setCrashProgress] = useState(0);

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

  // Market Crash Animation Loop for 5C
  const handleMarketCrashTrigger = () => {
    setIsCrashing(true);
    setCrashProgress(0);
  };

  useEffect(() => {
    if (experimentId !== '5C') return;

    if (isCrashing) {
      const timer = setInterval(() => {
        setCrashProgress((prev) => {
          if (prev >= 100) {
            setIsCrashing(false);
            return 100;
          }
          return prev + 4;
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [experimentId, isCrashing]);

  const handleReset = () => {
    setAnimTick(0);
    setIsCrashing(false);
    setCrashProgress(0);
  };

  // SAFELY EXTRACT SLIDER PARAMETERS WITH STRICT FALLBACKS
  // 5A: priceRp, consumerIncome, competitorPrice
  const priceRp = Math.max(10000, Math.min(200000, Number(sliderValues?.priceRp ?? 50000) || 50000));
  const consumerIncome = Math.max(50, Math.min(200, Number(sliderValues?.consumerIncome ?? 100) || 100));
  const competitorPrice = Math.max(10000, Math.min(200000, Number(sliderValues?.competitorPrice ?? 45000) || 45000));

  // 5B: biRate, reserveReq, fiscalSpending
  const biRate = Math.max(2, Math.min(15, Number(sliderValues?.biRate ?? 6) || 6));
  const reserveReq = Math.max(1, Math.min(15, Number(sliderValues?.reserveReq ?? 5) || 5));
  const fiscalSpending = Math.max(50, Math.min(500, Number(sliderValues?.fiscalSpending ?? 200) || 200));

  // 5C: stocksWeight, bondsWeight, marketVolatility
  const stocksWeight = Math.max(0, Math.min(100, Number(sliderValues?.stocksWeight ?? 60) || 60));
  const bondsWeight = Math.max(0, Math.min(100, Number(sliderValues?.bondsWeight ?? 40) || 40));
  const marketVolatility = Math.max(10, Math.min(60, Number(sliderValues?.marketVolatility ?? 20) || 20));

  // ==========================================
  // 5A: E-COMMERCE PRICING & PED ELASTICITY
  // ==========================================
  if (experimentId === '5A') {
    const baseDemand = 1000 * (consumerIncome / 100);
    const priceRatio = priceRp / competitorPrice;
    const quantity = Math.max(50, Math.round(baseDemand / Math.pow(priceRatio, 2)));
    const totalRevenue = priceRp * quantity;
    const ped = Math.abs((1 - quantity / baseDemand) / (1 - priceRatio || 0.01));

    const isOverpriced = priceRatio > 2.5;
    const isUnderpriced = priceRp < competitorPrice * 0.4;

    // Cart unit count for animation
    const cartCount = Math.max(1, Math.min(12, Math.round(quantity / 80)));
    const cartUnits = Array.from({ length: cartCount });

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Pricing E-Commerce & Elastisitas Permintaan (PED)
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Optimasi Total Revenue (TR = P · Q) & Koefisien Elastisitas Ed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs border ${
                isPlaying 
                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' 
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Jeda Simulasi' : 'Mulai Simulasi'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Simulasi"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR PENDAPATAN MAKSIMAL (TR):</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Pembeli Kabur / Overpriced
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Optimum Revenue (Unitari)
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{ left: (isOverpriced || isUnderpriced) ? '25%' : '75%' }}
            />
          </div>
        </div>

        {/* SVG E-COMMERCE SHOWCASE & DEMAND CURVE */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid5a" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid5a)" />

            {/* E-COMMERCE STORE SHOWCASE (LEFT) */}
            <g transform="translate(20, 25)">
              <rect x="0" y="0" width="220" height="195" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" rx="12" />
              
              {/* Product Header Tag */}
              <rect x="15" y="15" width="190" height="30" fill="#EEF2FF" rx="6" />
              <text x="25" y="34" fill="#3730A3" fontSize="10" fontWeight="extrabold">SNEAKER EDITION PRO</text>
              
              {/* Price Tag */}
              <rect x="115" y="20" width="85" height="20" fill="#2563EB" rx="4" />
              <text x="157" y="34" fill="#FFFFFF" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                Rp {priceRp.toLocaleString('id-ID')}
              </text>

              {/* Sneaker Graphic Vector */}
              <g transform="translate(55, 60)">
                <path d="M 10 35 L 25 10 L 65 10 L 95 30 L 100 45 L 5 45 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" rx="4" />
                <path d="M 20 45 L 95 45 L 95 52 L 20 52 Z" fill="#1E293B" />
                <circle cx="40" cy="25" r="4" fill="#FFFFFF" />
                <circle cx="60" cy="25" r="4" fill="#FFFFFF" />
              </g>

              {/* Shopping Cart & Customer Flow Animation */}
              <g transform="translate(15, 130)">
                <rect x="0" y="0" width="190" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="8" />
                <text x="10" y="18" fill="#475569" fontSize="8" fontWeight="bold">KERANJANG BELANJA (&nbsp;{quantity}&nbsp;unit terjual&nbsp;)</text>

                {/* Flowing Cart Icons */}
                {!isOverpriced ? (
                  cartUnits.map((_, idx) => {
                    const cx = 20 + ((idx * 22 + animTick * 2) % 150);
                    return (
                      <g key={`cart-${idx}`} transform={`translate(${cx}, 25)`}>
                        <circle r="7" fill="#10B981" opacity="0.9" />
                        <text x="0" y="2.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">🛒</text>
                      </g>
                    );
                  })
                ) : (
                  <g transform="translate(60, 22)">
                    <text x="35" y="10" fill="#EF4444" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                      ❌ PEMBELI KABUR!
                    </text>
                  </g>
                )}
              </g>
            </g>

            {/* DEMAND CURVE GRAPH (RIGHT) */}
            <g transform="translate(260, 25)">
              <rect x="0" y="0" width="220" height="195" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" rx="12" />
              <text x="15" y="20" fill="#1E293B" fontSize="9" fontWeight="bold">Kurva Permintaan (P vs Q)</text>

              <line x1="30" y1="165" x2="200" y2="165" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="30" y1="35" x2="30" y2="165" stroke="#94A3B8" strokeWidth="1.5" />
              <text x="198" y="177" fill="#64748B" fontSize="8" fontWeight="bold">Kuantitas Q</text>
              <text x="15" y="32" fill="#64748B" fontSize="8" fontWeight="bold">Harga P</text>

              {/* Demand Curve Line */}
              <path d="M 40 45 Q 90 120, 190 155" fill="none" stroke="#2563EB" strokeWidth="2.5" />

              {/* Dynamic Equilibrium Point Dot */}
              {(() => {
                const normP = Math.max(0, Math.min(1, (priceRp - 10000) / 190000));
                const eqX = 40 + (1 - normP) * 140;
                const eqY = 45 + normP * 105;

                return (
                  <g transform={`translate(${eqX}, ${eqY})`}>
                    {/* Revenue Shaded Area */}
                    <rect x={30 - eqX} y="0" width={eqX - 30} height={165 - eqY} fill="#2563EB" opacity="0.15" />
                    <circle r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="10" y="-5" fill="#047857" fontSize="8" fontWeight="extrabold">Ekuilibrium</text>
                  </g>
                );
              })()}
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Harga = Rp {priceRp.toLocaleString('id-ID')} | Omset Total Revenue = Rp {(totalRevenue / 1000000).toFixed(2)} Juta | PED = {ped.toFixed(2)}
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-indigo-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Hukum Elastisitas Permintaan & Omset Maksimal</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Pada barang non-pokok, menaikkan harga tidak selalu melipatgandakan keuntungan. Ada titik optimum elastisitas unitari di mana persentase penurunan jumlah pembeli seimbang sempurna dengan kenaikan margin profit per produk.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 5B: CENTRAL BANK & INFLATION CONTROL
  // ==========================================
  if (experimentId === '5B') {
    const moneySupply = fiscalSpending * (10 / reserveReq);
    const inflation = Math.max(0.5, Math.round((moneySupply / (biRate * 40)) * 10) / 10);
    const unemployment = Math.round(biRate * 0.9 + 3);

    const isHyperinflation = inflation > 10;
    const isRecession = biRate > 11;

    // Coin flow animation speed
    const coinSpeed = Math.max(0.5, 12 - biRate);
    const coins = Array.from({ length: 6 });

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Landmark className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Bank Sentral & Pengendalian Inflasi (BI-Rate)
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Kebijakan Moneter & Persamaan Fisher M · V = P · Y
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs border ${
                isPlaying 
                  ? 'bg-amber-50 text-amber-700 border-amber-200' 
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Jeda Simulasi' : 'Mulai Simulasi'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Moneter"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR STABILITAS MONETER:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Hiperinflasi / Resesi Macet
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Target Inflasi Sehat 2-3%
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{ left: (isHyperinflation || isRecession) ? '25%' : '75%' }}
            />
          </div>
        </div>

        {/* SVG CENTRAL BANK & INFLATION GAUGE */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid5b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid5b)" />

            {/* CENTRAL BANK BUILDING (LEFT) */}
            <g transform="translate(30, 30)">
              <rect x="0" y="0" width="210" height="190" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" rx="10" />
              <text x="105" y="20" fill="#1E293B" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                BANK SENTRAL INDONESIA
              </text>

              {/* Bank Pillars Graphic */}
              <g transform="translate(45, 35)">
                <polygon points="0,20 60,0 120,20" fill="#1E293B" />
                <rect x="10" y="20" width="15" height="50" fill="#3B82F6" />
                <rect x="40" y="20" width="15" height="50" fill="#3B82F6" />
                <rect x="65" y="20" width="15" height="50" fill="#3B82F6" />
                <rect x="95" y="20" width="15" height="50" fill="#3B82F6" />
                <rect x="0" y="70" width="120" height="10" fill="#1E293B" />
              </g>

              {/* Gold Coins Flow Animation */}
              <g transform="translate(15, 125)">
                <rect x="0" y="0" width="180" height="50" fill="#F8FAFC" stroke="#E2E8F0" rx="8" />
                <text x="10" y="16" fill="#64748B" fontSize="8" fontWeight="bold">ALIRAN UANG BEREDAR M</text>

                {coins.map((_, idx) => {
                  const cx = 20 + ((idx * 28 + animTick * coinSpeed) % 145);
                  return (
                    <g key={`coin-${idx}`} transform={`translate(${cx}, 30)`}>
                      <circle r="7" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
                      <text x="0" y="2.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">💰</text>
                    </g>
                  );
                })}
              </g>
            </g>

            {/* INFLATION SPEEDOMETER GAUGE (RIGHT) */}
            <g transform="translate(265, 30)">
              <rect x="0" y="0" width="205" height="190" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" rx="10" />
              <text x="102" y="20" fill="#1E293B" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                INDIKATOR SPEEDOMETER INFLASI
              </text>

              {/* Gauge Semi-Circle Arc */}
              <g transform="translate(102, 115)">
                {/* Deflation Zone */}
                <path d="M -65 0 A 65 65 0 0 1 -35 -55" fill="none" stroke="#60A5FA" strokeWidth="16" />
                {/* Optimal Zone */}
                <path d="M -35 -55 A 65 65 0 0 1 35 -55" fill="none" stroke="#10B981" strokeWidth="16" />
                {/* Hyperinflation Zone */}
                <path d="M 35 -55 A 65 65 0 0 1 65 0" fill="none" stroke="#EF4444" strokeWidth="16" />

                {/* Gauge Needle */}
                {(() => {
                  const angleDeg = -120 + Math.min(15, inflation) * 16;
                  const rad = (angleDeg * Math.PI) / 180;
                  const nx = Math.cos(rad) * 50;
                  const ny = Math.sin(rad) * 50;

                  return (
                    <g>
                      <line x1="0" y1="0" x2={nx} y2={ny} stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
                      <circle cx="0" cy="0" r="6" fill="#0F172A" />
                    </g>
                  );
                })()}

                <text x="0" y="25" fill="#0F172A" fontSize="14" fontWeight="extrabold" textAnchor="middle">
                  {inflation}%
                </text>
                <text x="0" y="38" fill="#64748B" fontSize="7" fontWeight="bold" textAnchor="middle">
                  INFLASI TAHUNAN
                </text>
              </g>

              {/* Stats Bar */}
              <g transform="translate(15, 145)">
                <rect x="0" y="0" width="175" height="32" fill="#F1F5F9" rx="6" />
                <text x="10" y="15" fill="#334155" fontSize="8" fontWeight="bold">
                  Suku Bunga BI: {biRate}%
                </text>
                <text x="10" y="25" fill="#334155" fontSize="8" fontWeight="bold">
                  Pengangguran: {unemployment}%
                </text>
              </g>
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              BI-Rate = {biRate}% | Giro Wajib = {reserveReq}% | Inflasi = {inflation}% | Uang M = {Math.round(moneySupply)}T
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-indigo-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Dilema Kebijakan Moneter Bank Sentral</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Bank Sentral menaikkan suku bunga acuan seperti menginjak rem mobil. Tujuannya adalah meredam laju kenaikan harga sembako saat inflasi panas, meskipun risikonya ekspansi usaha dan pertumbuhan ekonomi ikut melambat sementara.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 5C: INVESTMENT PORTFOLIO MARKOWITZ
  // ==========================================
  if (experimentId === '5C') {
    const totalAlloc = stocksWeight + bondsWeight;
    const expectedReturn = (stocksWeight * 0.15 + bondsWeight * 0.06).toFixed(1);
    const portfolioRisk = Math.round((stocksWeight / 100) * marketVolatility + (bondsWeight / 100) * 4);
    const sharpeRatio = ((expectedReturn - 4) / (portfolioRisk + 1)).toFixed(2);

    const isHighRisk = stocksWeight > 90 && marketVolatility > 40;
    const isInvalidAlloc = totalAlloc !== 100;

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <PieChart className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Manajemen Portofolio Efficient Frontier Markowitz
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Alokasi Diversifikasi Aset Saham vs Obligasi (Markowitz Risk vs Return)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleMarketCrashTrigger}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <AlertTriangle className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Uji Kejutan Pasar / Crash! 📉</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Portofolio"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR KINERJA PORTOFOLIO:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Risiko Kejatuhan Tinggi
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Efficient Frontier Optimal
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{ left: (isHighRisk || isInvalidAlloc) ? '25%' : '75%' }}
            />
          </div>
        </div>

        {/* SVG DONUT CHART & MARKET CRASH GRAPH */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid5c" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid5c)" />

            {/* DONUT CHART ALOKASI ASET (LEFT) */}
            <g transform="translate(30, 25)">
              <rect x="0" y="0" width="210" height="195" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" rx="10" />
              <text x="105" y="20" fill="#1E293B" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                ALOKASI DIVERSIFIKASI ASET
              </text>

              {/* Donut Chart SVG */}
              <g transform="translate(105, 95)">
                {/* Stock Arc (Blue) */}
                <circle r="45" fill="none" stroke="#2563EB" strokeWidth="20" 
                  strokeDasharray={`${(stocksWeight / 100) * 283} 283`}
                  transform="rotate(-90)"
                />
                {/* Bond Arc (Purple) */}
                <circle r="45" fill="none" stroke="#9333EA" strokeWidth="20" 
                  strokeDasharray={`${(bondsWeight / 100) * 283} 283`}
                  strokeDashoffset={`-${(stocksWeight / 100) * 283}`}
                  transform="rotate(-90)"
                />
                <circle r="30" fill="#FFFFFF" />
                <text x="0" y="2" fill="#0F172A" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                  {expectedReturn}%
                </text>
                <text x="0" y="12" fill="#64748B" fontSize="6" fontWeight="bold" textAnchor="middle">RETURN</text>
              </g>

              {/* Legend */}
              <g transform="translate(15, 160)">
                <circle cx="10" cy="10" r="4" fill="#2563EB" />
                <text x="20" y="13" fill="#1E293B" fontSize="8" fontWeight="bold">Saham (Tech): {stocksWeight}%</text>

                <circle cx="110" cy="10" r="4" fill="#9333EA" />
                <text x="120" y="13" fill="#1E293B" fontSize="8" fontWeight="bold">Obligasi: {bondsWeight}%</text>
              </g>
            </g>

            {/* 12-MONTH PORTFOLIO PERFORMANCE GRAPH (RIGHT) */}
            <g transform="translate(260, 25)">
              <rect x="0" y="0" width="210" height="195" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" rx="10" />
              <text x="105" y="20" fill="#1E293B" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                SIMULASI HARGA PORTOFOLIO 12 BULAN
              </text>

              <line x1="25" y1="165" x2="190" y2="165" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="25" y1="35" x2="25" y2="165" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Portfolio Value Path */}
              <path
                d={(() => {
                  const dropAmount = isHighRisk ? 65 : 20;
                  return Array.from({ length: 12 }, (_, i) => {
                    const x = 25 + i * 14;
                    let y = 120 - (i * 4);
                    // Crash drop at month 6
                    if (i >= 5 && isCrashing) {
                      y += (dropAmount * (crashProgress / 100));
                    }
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ');
                })()}
                fill="none"
                stroke={isHighRisk ? "#EF4444" : "#10B981"}
                strokeWidth="2.5"
              />

              {/* Market Crash Indicator Overlay */}
              {isCrashing && (
                <g transform="translate(70, 45)">
                  <rect x="0" y="0" width="100" height="30" fill="#FEF2F2" stroke="#FCA5A5" rx="6" />
                  <text x="50" y="18" fill="#991B1B" fontSize="8" fontWeight="extrabold" textAnchor="middle">
                    📉 MARKET CRASH!
                  </text>
                </g>
              )}
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Saham = {stocksWeight}% | Obligasi = {bondsWeight}% | Risk = {portfolioRisk}% | Sharpe = {sharpeRatio}
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-indigo-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Prinsip Diversifikasi Efficient Frontier Markowitz</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Menggabungkan instrumen investasi dengan korelasi berlawanan memangkas risiko kejatuhan modal (volatilitas) secara drastis tanpa harus mengorbankan seluruh potensi keuntungan jangka panjang.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default function EconomyVisualizer(props) {
  return (
    <SimulationErrorBoundary onReset={props.onReset}>
      <EconomyVisualizerContent {...props} />
    </SimulationErrorBoundary>
  );
}
