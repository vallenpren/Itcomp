import React, { useState, useEffect, useRef } from 'react';
import { Cpu, ShieldCheck, Network, Brain, Play, Pause, RotateCcw, AlertTriangle, Lock, Unlock, Zap, Shuffle } from 'lucide-react';
import SimulationErrorBoundary from './SimulationErrorBoundary';

function InformaticsVisualizerContent({ 
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

  // 6A Obstacle state
  const [roadBlocked, setRoadBlocked] = useState(false);

  // 6C Sorting state
  const [sortAlgo, setSortAlgo] = useState('bubble'); // 'bubble' | 'quick'
  const [sortArray, setSortArray] = useState([45, 12, 85, 32, 89, 39, 69, 44, 42, 15, 68]);
  const [activeCompareIndices, setActiveCompareIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const sortTimerRef = useRef(null);

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

  // Handle Sort Reset & Shuffle
  const handleShuffleData = () => {
    if (sortTimerRef.current) clearInterval(sortTimerRef.current);
    setIsSorting(false);
    setActiveCompareIndices([]);
    setSortedIndices([]);
    setStepCount(0);

    const initial = [45, 12, 85, 32, 89, 39, 69, 44, 42, 15, 68];
    const shuffled = [...initial].sort(() => Math.random() - 0.5);
    setSortArray(shuffled);
  };

  // Live Animated Sorting Loop (Protected against crashes)
  const handleStartSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    setStepCount(0);
    setSortedIndices([]);

    let arr = [...sortArray];
    let steps = 0;

    if (sortAlgo === 'bubble') {
      let i = 0, j = 0;
      sortTimerRef.current = setInterval(() => {
        if (i >= arr.length) {
          clearInterval(sortTimerRef.current);
          setIsSorting(false);
          setActiveCompareIndices([]);
          setSortedIndices(arr.map((_, idx) => idx));
          return;
        }

        if (j < arr.length - i - 1) {
          steps++;
          setActiveCompareIndices([j, j + 1]);
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            setSortArray([...arr]);
          }
          j++;
        } else {
          setSortedIndices((prev) => [...prev, arr.length - 1 - i]);
          j = 0;
          i++;
        }
        setStepCount(steps);
      }, 100);
    } else {
      // Quick / Merge Sort Simulation (Simulated Fast Step Progression)
      let sortedArr = [...arr].sort((a, b) => a - b);
      let quickStep = 0;
      sortTimerRef.current = setInterval(() => {
        quickStep++;
        steps += 2;
        setStepCount(steps);

        if (quickStep <= 6) {
          const idx1 = Math.floor(Math.random() * arr.length);
          const idx2 = Math.floor(Math.random() * arr.length);
          setActiveCompareIndices([idx1, idx2]);
        } else {
          clearInterval(sortTimerRef.current);
          setIsSorting(false);
          setSortArray(sortedArr);
          setActiveCompareIndices([]);
          setSortedIndices(sortedArr.map((_, idx) => idx));
        }
      }, 150);
    }
  };

  const handleReset = () => {
    setAnimTick(0);
    setRoadBlocked(false);
    handleShuffleData();
  };

  // SAFELY EXTRACT SLIDER PARAMETERS WITH STRICT FALLBACKS
  // 6A: warehouseNodes, trafficJam, fuelWeight
  const warehouseNodes = Math.max(5, Math.min(30, Number(sliderValues?.warehouseNodes ?? 12) || 12));
  const trafficJam = Math.max(1, Math.min(10, Number(sliderValues?.trafficJam ?? 4) || 4));
  const fuelWeight = Math.max(1, Math.min(5, Number(sliderValues?.fuelWeight ?? 2) || 2));

  // 6B: primeP, primeQ, publicKeyE
  const primeP = Math.max(11, Math.min(101, Number(sliderValues?.primeP ?? 61) || 61));
  const primeQ = Math.max(13, Math.min(103, Number(sliderValues?.primeQ ?? 53) || 53));
  const publicKeyE = Math.max(3, Math.min(65537, Number(sliderValues?.publicKeyE ?? 17) || 17));

  // 6C: learningRate, hiddenLayers, noiseInput
  const learningRate = Math.max(0.001, Math.min(1, Number(sliderValues?.learningRate ?? 0.05) || 0.05));
  const hiddenLayers = Math.max(1, Math.min(10, Number(sliderValues?.hiddenLayers ?? 4) || 4));
  const noiseInput = Math.max(0, Math.min(50, Number(sliderValues?.noiseInput ?? 10) || 10));

  // ==========================================
  // 6A: DIJKSTRA GPS NAVIGATION & SHORTEST PATH
  // ==========================================
  if (experimentId === '6A') {
    const isHeavyTraffic = trafficJam > 7 || roadBlocked;

    // Node coordinates for graph
    const nodes = [
      { id: 'A', name: 'Start (Kurir)', x: 50, y: 110, color: '#3B82F6' },
      { id: 'B', name: 'Node Utama B', x: 170, y: 45, color: '#64748B' },
      { id: 'C', name: 'Node Ring C', x: 170, y: 175, color: '#64748B' },
      { id: 'D', name: 'Node Utama D', x: 310, y: 45, color: '#64748B' },
      { id: 'E', name: 'Node Ring E', x: 310, y: 175, color: '#64748B' },
      { id: 'F', name: 'Tujuan (Rumah)', x: 440, y: 110, color: '#10B981' }
    ];

    // Car path animation
    // If heavy traffic or blocked, car takes lower route A -> C -> E -> F
    const carPathNodes = isHeavyTraffic ? [nodes[0], nodes[2], nodes[4], nodes[5]] : [nodes[0], nodes[1], nodes[3], nodes[5]];
    const carProgress = (animTick % 120) / 120;
    const segCount = carPathNodes.length - 1;
    const currentSeg = Math.min(segCount - 1, Math.floor(carProgress * segCount));
    const segT = (carProgress * segCount) - currentSeg;

    const startN = carPathNodes[currentSeg];
    const endN = carPathNodes[currentSeg + 1];
    const carX = startN.x + (endN.x - startN.x) * segT;
    const carY = startN.y + (endN.y - startN.y) * segT;

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
              <Network className="w-4 h-4 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Logistik E-Commerce & Algoritma Graf Dijkstra / A*
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Pencarian Rute Terpendek Peta Navigasi f(n) = g(n) + h(n)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setRoadBlocked(!roadBlocked)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs border ${
                roadBlocked 
                  ? 'bg-rose-500 text-white border-rose-600 hover:bg-rose-600' 
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{roadBlocked ? 'Buka Penutupan Jalan' : 'Tambah Rintangan Jalan Ditutup'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Reset Navigasi"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR EFISIENSI RUTE GRAF:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-amber-400 rounded-l-full flex items-center justify-center text-[8px] font-bold text-slate-900">
              Macet / Rerouting Alternatif
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Shortest Path Dijkstra
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{ left: isHeavyTraffic ? '25%' : '75%' }}
            />
          </div>
        </div>

        {/* SVG CITY GRAPH NETWORK */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid6a" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid6a)" />

            {/* EDGES / ROADS */}
            {/* Top Main Road A -> B -> D -> F */}
            <line x1="50" y1="110" x2="170" y2="45" stroke={isHeavyTraffic ? "#EF4444" : "#2563EB"} strokeWidth={isHeavyTraffic ? "4" : "3"} strokeDasharray={isHeavyTraffic ? "4 4" : "none"} />
            <line x1="170" y1="45" x2="310" y2="45" stroke={isHeavyTraffic ? "#EF4444" : "#2563EB"} strokeWidth={isHeavyTraffic ? "4" : "3"} strokeDasharray={isHeavyTraffic ? "4 4" : "none"} />
            <line x1="310" y1="45" x2="440" y2="110" stroke={isHeavyTraffic ? "#EF4444" : "#2563EB"} strokeWidth={isHeavyTraffic ? "4" : "3"} strokeDasharray={isHeavyTraffic ? "4 4" : "none"} />

            {/* Bottom Ring Road A -> C -> E -> F */}
            <line x1="50" y1="110" x2="170" y2="175" stroke={isHeavyTraffic ? "#2563EB" : "#94A3B8"} strokeWidth={isHeavyTraffic ? "4" : "2"} />
            <line x1="170" y1="175" x2="310" y2="175" stroke={isHeavyTraffic ? "#2563EB" : "#94A3B8"} strokeWidth={isHeavyTraffic ? "4" : "2"} />
            <line x1="310" y1="175" x2="440" y2="110" stroke={isHeavyTraffic ? "#2563EB" : "#94A3B8"} strokeWidth={isHeavyTraffic ? "4" : "2"} />

            {/* Traffic Weight Labels */}
            <text x="100" y="70" fill="#334155" fontSize="8" fontWeight="bold">w = {trafficJam}</text>
            <text x="240" y="38" fill="#334155" fontSize="8" fontWeight="bold">w = {trafficJam * 2}</text>
            <text x="100" y="155" fill="#334155" fontSize="8" fontWeight="bold">w = 2 (Lancar)</text>

            {/* Blocked Road Warning Sign */}
            {roadBlocked && (
              <g transform="translate(240, 20)">
                <rect x="0" y="0" width="80" height="24" fill="#FEF2F2" stroke="#EF4444" rx="4" />
                <text x="40" y="15" fill="#991B1B" fontSize="8" fontWeight="extrabold" textAnchor="middle">
                  ⛔ JALAN DITUTUP
                </text>
              </g>
            )}

            {/* GRAPH NODES */}
            {nodes.map((n) => (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                <circle r="16" fill="#FFFFFF" stroke={n.color} strokeWidth="3" />
                <text x="0" y="4" fill="#0F172A" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                  {n.id}
                </text>
                <text x="0" y="26" fill="#64748B" fontSize="7" fontWeight="bold" textAnchor="middle">
                  {n.name}
                </text>
              </g>
            ))}

            {/* COURIER NAVIGATING CAR ICON */}
            <g transform={`translate(${carX}, ${carY})`}>
              <circle r="12" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
              <text x="0" y="4" fill="#FFFFFF" fontSize="8" textAnchor="middle">🚗</text>
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Titik Gudang = {warehouseNodes} | Kemacetan = {trafficJam}x | Rute Aktif: {isHeavyTraffic ? 'A ➔ C ➔ E ➔ F (Rerouting)' : 'A ➔ B ➔ D ➔ F (Shortest Path)'}
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-indigo-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Prinsip Algoritma Graf Dijkstra & Navigation Rerouting</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Cara kerja Google Maps: Algoritma graf menghitung total akumulasi jarak dan hambatan terkecil d(v) = min(d(u) + w(u,v)) dari simpul ke simpul lain secara bertahap, memastikan rute tercepat yang dipilih bukan sekadar rute dengan jarak fisik terpendek.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 6B: BANKING SECURITY & RSA CRYPTOGRAPHY
  // ==========================================
  if (experimentId === '6B') {
    const modulusN = primeP * primeQ;
    const isWeak = modulusN < 1000;

    // Envelope sliding animation
    const envProgress = (animTick % 100) / 100;
    const envX = 80 + envProgress * 320;
    const isEncryptedInMiddle = envX > 180 && envX < 360;

    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
              <ShieldCheck className="w-4 h-4 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Keamanan Perbankan & Kriptografi Kunci Publik RSA
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Enkripsi Asimetris Bilangan Prima (n = p · q) & Decryption Lock
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
              title="Reset Kriptografi"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">INDIKATOR KEAMANAN ENKRIPSI RSA:</span>
            <span className={`px-2 py-0.5 rounded-full border font-bold ${statusZone.bg}`}>
              ● {statusZone.label}
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-rose-500 rounded-l-full flex items-center justify-center text-[8px] font-bold text-white">
              Mudah Di-Hack (Prima Kecil)
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Kunci RSA Militer Aman
            </div>

            <div 
              className="absolute top-0 bottom-0 w-2.5 bg-slate-900 rounded-full shadow-md border-2 border-white transition-all duration-300 transform -translate-x-1/2"
              style={{ left: isWeak ? '25%' : '75%' }}
            />
          </div>
        </div>

        {/* SVG TRANSACTION ENCRYPTION FLOW */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid6b" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid6b)" />

            {/* SMARTPHONE SENDER (LEFT) */}
            <g transform="translate(25, 45)">
              <rect x="0" y="0" width="90" height="150" fill="#1E293B" rx="12" />
              <rect x="5" y="15" width="80" height="120" fill="#FFFFFF" rx="4" />
              <text x="45" y="35" fill="#3B82F6" fontSize="9" fontWeight="extrabold" textAnchor="middle">M-BANKING</text>
              <rect x="15" y="50" width="60" height="25" fill="#EEF2FF" border="1" rx="4" />
              <text x="45" y="66" fill="#3730A3" fontSize="8" fontWeight="bold" textAnchor="middle">PIN: 8921</text>
              <text x="45" y="110" fill="#64748B" fontSize="7" fontWeight="bold" textAnchor="middle">Kirim Pesan ➔</text>
            </g>

            {/* INTERNET CHANNEL & HACKER (MIDDLE) */}
            <g transform="translate(145, 60)">
              <rect x="0" y="0" width="200" height="120" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" rx="10" />
              <text x="100" y="20" fill="#64748B" fontSize="8" fontWeight="bold" textAnchor="middle">SALURAN INTERNET PUBLIK</text>

              {/* Hacker Icon */}
              <g transform="translate(100, 45)">
                <circle r="16" fill={isWeak ? "#FEF2F2" : "#F1F5F9"} stroke={isWeak ? "#EF4444" : "#94A3B8"} strokeWidth="2" />
                <text x="0" y="5" fill="#0F172A" fontSize="12" textAnchor="middle">🕵️‍♂️</text>
                <text x="0" y="28" fill={isWeak ? "#DC2626" : "#64748B"} fontSize="7" fontWeight="extrabold" textAnchor="middle">
                  {isWeak ? 'Hacker: DATA BOCOR! (0.001s)' : 'Hacker: Gagal (Butuh 1.000 Thn)'}
                </text>
              </g>
            </g>

            {/* BANK SERVER VAULT (RIGHT) */}
            <g transform="translate(375, 45)">
              <rect x="0" y="0" width="100" height="150" fill="#0F172A" rx="12" />
              <rect x="10" y="15" width="80" height="120" fill="#1E293B" rx="6" />
              <text x="50" y="35" fill="#10B981" fontSize="9" fontWeight="extrabold" textAnchor="middle">SERVER BANK</text>
              <circle cx="50" cy="75" r="22" fill="none" stroke="#10B981" strokeWidth="3" />
              <text x="50" y="80" fill="#FFFFFF" fontSize="12" textAnchor="middle">🏦</text>
              <text x="50" y="120" fill="#94A3B8" fontSize="7" fontWeight="bold" textAnchor="middle">Kunci Privat (d)</text>
            </g>

            {/* SLIDING ENVELOPE / CIPHERTEXT PACKET */}
            <g transform={`translate(${envX}, 115)`}>
              <rect x="-25" y="-15" width="50" height="30" fill={isEncryptedInMiddle ? "#1E293B" : "#2563EB"} rx="6" />
              <text x="0" y="3" fill="#FFFFFF" fontSize="8" fontWeight="extrabold" textAnchor="middle">
                {isEncryptedInMiddle ? '🔒 #x9!' : '✉️ 8921'}
              </text>
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Prima p = {primeP} | Prima q = {primeQ} | Modulus RSA n = {modulusN} | Keamanan = {isWeak ? 'LEMAH (12-bit)' : 'SANGAT KUAT (2048-bit)'}
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-indigo-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Fondasi Kriptografi Kunci Publik RSA Transaksi Digital</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Kriptografi modern memanfaatkan kesukaran komputasi memfaktorkan perkalian dua bilangan prima raksasa n = p · q. Tanpa kunci privat d yang cocok, peretas membutuhkan waktu ribuan tahun hanya untuk menebak isi satu pesan terenkripsi.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 6C: SORTING ALGORITHM SHOWDOWN
  // ==========================================
  if (experimentId === '6C') {
    return (
      <div className="bg-white rounded-3xl p-5 text-slate-900 space-y-4 border border-slate-200 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
              <Brain className="w-4 h-4 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Efisiensi Pengurutan Data: Sorting Algorithm Showdown
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Kompleksitas Waktu O(n²) Bubble Sort vs O(n log n) Quick Sort
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Algorithm Selector Switch */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => { setSortAlgo('bubble'); handleShuffleData(); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all ${
                  sortAlgo === 'bubble' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bubble O(n²)
              </button>
              <button
                onClick={() => { setSortAlgo('quick'); handleShuffleData(); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition-all ${
                  sortAlgo === 'quick' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Quick O(n log n)
              </button>
            </div>

            <button
              onClick={handleStartSort}
              disabled={isSorting}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Mulai Urutkan</span>
            </button>

            <button
              onClick={handleShuffleData}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition-all"
              title="Acak Ulang Data"
            >
              <Shuffle className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Status Zone Indicator */}
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold font-mono">
            <span className="text-slate-500">COUNTER OPERASI PEMBANDINGAN:</span>
            <span className="px-2 py-0.5 rounded-full border border-indigo-200 bg-indigo-50 font-bold text-indigo-700">
              ● {stepCount} Langkah Operasi
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 relative">
            <div className="w-1/2 h-full bg-amber-400 rounded-l-full flex items-center justify-center text-[8px] font-bold text-slate-900">
              Bubble Sort ~120 Langkah
            </div>
            <div className="w-1/2 h-full bg-emerald-500 rounded-r-full flex items-center justify-center text-[8px] font-bold text-white">
              Quick Sort ~25 Langkah
            </div>
          </div>
        </div>

        {/* SVG VERTICAL BAR CHART SORTING SHOWDOWN */}
        <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-2 relative overflow-hidden">
          <svg className="w-full h-full overflow-hidden" viewBox="0 0 500 280">
            <defs>
              <pattern id="grid6c" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid6c)" />

            {/* BARS */}
            <g transform="translate(30, 20)">
              {sortArray.map((val, idx) => {
                const barWidth = 32;
                const gap = 8;
                const x = idx * (barWidth + gap);
                const barHeight = (val / 100) * 190;
                const y = 210 - barHeight;

                const isComparing = activeCompareIndices.includes(idx);
                const isSorted = sortedIndices.includes(idx);

                let barColor = "#3B82F6"; // Default Blue
                if (isComparing) barColor = "#F59E0B"; // Active Amber
                if (isSorted) barColor = "#10B981"; // Sorted Green

                return (
                  <g key={`bar-${idx}`} transform={`translate(${x}, 0)`}>
                    <rect
                      x="0"
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={barColor}
                      rx="6"
                      className="transition-all duration-150"
                    />
                    <text
                      x={barWidth / 2}
                      y={y - 6}
                      fill="#0F172A"
                      fontSize="9"
                      fontWeight="extrabold"
                      textAnchor="middle"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* TELEMETRY */}
            <text x="15" y="270" fill="#334155" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Metode = {sortAlgo === 'bubble' ? 'Bubble Sort O(n²)' : 'Quick Sort O(n log n)'} | Total Perbandingan = {stepCount} langkah
            </text>
          </svg>
        </div>

        {/* SCIENTIFIC EXPLANATION BOX */}
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-slate-800 space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 font-extrabold text-indigo-800 uppercase tracking-wider text-[11px]">
            <Brain className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Kompleksitas Waktu O(n log n) & Efisiensi Algoritma</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium text-[11px]">
            Algoritma pengurutan yang efisien tidak membandingkan elemen satu per satu secara linear. Strategi membagi data menjadi bagian-bagian kecil (Divide and Conquer) pada Quick Sort menghemat jutaan operasi komputasi server.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

export default function InformaticsVisualizer(props) {
  return (
    <SimulationErrorBoundary onReset={props.onReset}>
      <InformaticsVisualizerContent {...props} />
    </SimulationErrorBoundary>
  );
}
