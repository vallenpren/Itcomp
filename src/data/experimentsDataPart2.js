// Experiments Data Part 2: FISIKA (2A, 2B, 2C) & KIMIA (3A, 3B, 3C)

export const PHYSICS_CHEMISTRY_EXPERIMENTS = {
  // 2A: Supercar & Fluid Dynamics (Bernoulli)
  '2A': {
    id: '2A',
    subjectId: 'physics',
    subjectName: 'Fisika',
    title: 'Desain Supercar & Fluid Dynamics: Persamaan Bernoulli & Aerodinamika',
    formula: "P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g h_1 = P_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g h_2, \\quad F_{down} = \\frac{1}{2} C_d \\cdot \\rho \\cdot A \\cdot v^2",
    story: [
      {
        title: 'Asal-Usul: Prinsip Daniel Bernoulli (1738)',
        content: 'Bernoulli menemukan bahwa ketika fluida (udara) bergerak lebih cepat di atas permukaan, tekanan udaranya justru menurun. Prinsip ini menjadi rahasia sayap pesawat terbang terangkat dan mobil Formula 1 menempel ketat di lintasan.'
      },
      {
        title: 'Masalah Dunia Nyata: Downforce F1 vs Konsumsi Bahan Bakar',
        content: 'Pada kecepatan 300 km/jam, angin dapat membuat supercar terlempar melayang jika tidak memiliki gaya tekan ke bawah (downforce) yang presisi dari sayap belakang.'
      }
    ],
    industryDomains: [
      { name: 'Desain Mobil Balap Formula 1 & Hypercar', desc: 'Optimasi efek tanah (ground effect) dan sayap spoiler belakang.' },
      { name: 'Industri Penerbangan Commercial Jet', desc: 'Rancangan bilah turbin jet dan aerofoil sayap Boeing/Airbus.' },
      { name: 'Sistem Kipas Pendingin Data Center AI', desc: 'Aliran udara tekanan tinggi untuk mendinginkan server GPU.' }
    ],
    controls: [
      { id: 'dragCoeff', label: 'Koefisien Hambat Cd', min: 0.2, max: 0.9, defaultVal: 0.35, unit: '' },
      { id: 'wingAngle', label: 'Sudut Kemiringan Sayap', min: 0, max: 40, defaultVal: 15, unit: '°' },
      { id: 'speed', label: 'Kecepatan Supercar', min: 100, max: 380, defaultVal: 240, unit: 'km/h' }
    ],
    presets: [
      { name: '🏎️ Kasus F1 Cornering Optimal', values: { dragCoeff: 0.45, wingAngle: 25, speed: 280 } },
      { name: '💨 Kasus Straight Line High Speed', values: { dragCoeff: 0.25, wingAngle: 5, speed: 350 } },
      { name: '⚠️ Kasus Lift-off Terlempar', values: { dragCoeff: 0.8, wingAngle: 38, speed: 360 } }
    ],
    calculateConsequence: ({ dragCoeff = 0.35, wingAngle = 15, speed = 240 } = {}) => {
      try {
        const safeDrag = Number(dragCoeff) > 0 ? Number(dragCoeff) : 0.35;
        const safeAngle = Number(wingAngle) >= 0 ? Number(wingAngle) : 15;
        const safeSpeed = Number(speed) >= 0 ? Number(speed) : 240;

        const vMS = safeSpeed / 3.6;
        const downforce = 0.5 * safeDrag * 1.225 * Math.sin((safeAngle * Math.PI) / 180) * Math.pow(vMS, 2);
        const fuelPenalty = (safeDrag * Math.pow(safeSpeed, 2)) / 1000;

        if (safeAngle > 30 && safeSpeed > 320) {
          return {
            status: 'danger',
            badge: 'TERLEMPAR / STALL AERODINAMIS',
            title: 'Drag Udara Ekstrem Memicu Turbulensi Terpisah',
            description: `Sudut sayap (${safeAngle}°) terlalu curam pada kecepatan ${safeSpeed} km/h menciptakan drag luar biasa yang merusak cengkraman.`,
            bagianA: `Sudut sayap belakang (${safeAngle}°) yang terlalu tegak pada kecepatan ${safeSpeed} km/h memicu hambatan udara (drag) ekstrim. Aliran udara terlepas dari bodi mobil, menciptakan pusaran turbulensi besar.`,
            bagianB: `Berdasarkan Hukum Bernoulli P + 0.5ρv² = Konstan, perbedaan kecepatan udara atas dan bawah memicu boundary layer separation, menyebabkan stall aerodinamis.`,
            bagianC: `Geser Sudut Kemiringan Sayap di bawah 25° (saat ini ${safeAngle}°) dan kurangi Koefisien Drag Cd di bawah 0.4 (saat ini ${safeDrag}) agar aliran udara kembali laminar!`,
            metrics: { Downforce: `${Math.round(downforce)} N`, FuelConsumption: `${fuelPenalty.toFixed(1)} L/100km`, State: 'Stall' }
          };
        } else if (downforce < 500 && safeSpeed > 200) {
          return {
            status: 'warning',
            badge: 'BAHAYA TERGELINCIR',
            title: 'Downforce Terlalu Minis di Tikungan',
            description: `Cengkraman ban kurang karena Downforce (${Math.round(downforce)} N) terlalu kecil pada kecepatan ${safeSpeed} km/h.`,
            bagianA: `Mobil melaju kencang (${safeSpeed} km/h) tetapi gaya tekan Downforce (${Math.round(downforce)} N) kurang menekan permukaan aspal. Saat bermanuver di tikungan tajam, mobil berisiko mengalami understeer.`,
            bagianB: `Kecepatan aliran udara di bawah mobil tidak cukup tinggi dibanding udara atas, sehingga beda tekanan ΔP kecil dan gaya tekan Downforce berada di bawah ambang batas cengkram ban.`,
            bagianC: `Geser Sudut Sayap ke kisaran 15° - 25° (saat ini ${safeAngle}°) untuk meningkatkan Downforce hingga di atas 1,000 N tanpa mengorbankan kecepatan puncak!`,
            metrics: { Downforce: `${Math.round(downforce)} N`, FuelConsumption: `${fuelPenalty.toFixed(1)} L/100km`, State: 'Understeer' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'AERODINAMIS PRESISI TINGGI',
            title: 'Efek Bernoulli Memangkas Resistansi Udara',
            description: `Supercar menempel sempurna pada kecepatan ${safeSpeed} km/h dengan Downforce ${Math.round(downforce)} N dan konsumsi ${fuelPenalty.toFixed(1)} L/100km.`,
            bagianA: `Aliran angin menyapu bodi mobil dengan sangat lancar pada kecepatan ${safeSpeed} km/h. Beda tekanan udara atas dan bawah menghasilkan Downforce ${Math.round(downforce)} N yang merekatkan ban ke aspal.`,
            bagianB: `Persamaan Bernoulli bekerja presisi: udara bawah melaju cepat, udara atas lambat, menghasilkan Downforce ideal tanpa memicu hambatan drag berlebih.`,
            bagianC: `Konfigurasi aerodinamis berada di titik puncak efisiensi! Anda dapat mencoba mengubah kecepatan untuk menguji batas cengkram ban.`,
            metrics: { Downforce: `${Math.round(downforce)} N`, FuelConsumption: `${fuelPenalty.toFixed(1)} L/100km`, State: 'Optimal' }
          };
        }
      } catch (err) {
        console.error("Error calculating 2A consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Aerodinamika Diproses',
          description: 'Sistem memperbarui gaya downforce dan drag.',
          bagianA: 'Kalkulasi aerodinamis sedang disesuaikan.',
          bagianB: 'Persamaan Bernoulli diperbarui secara dinamis.',
          bagianC: 'Geser slider parameter ke rentang optimal.',
          metrics: { Status: 'Active' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa sayap mobil F1 bentuknya terbalik dibanding sayap pesawat terbang?', hint: 'Sayap pesawat didesain menghasilkan gaya angkat ke atas (upward lift), sedangkan mobil F1 butuh gaya dorong ke bawah (downforce).' }
    ]
  },

  // 2B: Energy Reactor & Carnot Efficiency
  '2B': {
    id: '2B',
    subjectId: 'physics',
    subjectName: 'Fisika',
    title: 'Desain Reaktor Energi & Termodinamika: Efisiensi Siklus Carnot',
    formula: "\\eta_{Carnot} = 1 - \\frac{T_c}{T_h}, \\quad W = Q_h - Q_c",
    story: [
      {
        title: 'Asal-Usul: Inovasi Nicolas Sadi Carnot (1824)',
        content: 'Carnot membuktikan secara matematis bahwa tidak ada mesin kalor di alam semesta yang dapat mengubah 100% energi panas menjadi energi gerak tanpa ada kalor terbuang (Hukum Termodinamika 2).'
      },
      {
        title: 'Masalah Dunia Nyata: Pembangkit Listrik Geotermal & Nuklir',
        content: 'Berapa persen panas bumi atau reaktor nuklir yang benar-benar menjadi daya listrik kW, dan berapa yang terbuang membakar atmosfer?'
      }
    ],
    industryDomains: [
      { name: 'Pembangkit Listrik Nuklir & Geotermal', desc: 'Meningkatkan persentase watt listrik per megajoule bahan bakar.' },
      { name: 'Mesin Pembakaran Dalam & Hibrida', desc: 'Pengembangan turbocharger untuk memanfaatkan kalor gas buang.' },
      { name: 'Sistem Pendingin HVAC Industri', desc: 'Chiller pendingin ruangan efisiensi tinggi.' }
    ],
    controls: [
      { id: 'tempHot', label: 'Suhu Reservoir Panas Th (°C)', min: 300, max: 1200, defaultVal: 650, unit: '°C' },
      { id: 'tempCold', label: 'Suhu Reservoir Dingin Tc (°C)', min: 10, max: 150, defaultVal: 30, unit: '°C' },
      { id: 'gasPressure', label: 'Tekanan Gas Piston (atm)', min: 1, max: 100, defaultVal: 40, unit: 'atm' }
    ],
    presets: [
      { name: '⚡ Kasus Efisiensi Tinggi', values: { tempHot: 950, tempCold: 25, gasPressure: 60 } },
      { name: '🌡️ Kasus Terbuang Banyak Panas', values: { tempHot: 400, tempCold: 110, gasPressure: 20 } },
      { name: '💥 Kasus Overpressure Reaktor', values: { tempHot: 1150, tempCold: 20, gasPressure: 95 } }
    ],
    calculateConsequence: ({ tempHot = 650, tempCold = 30, gasPressure = 40 } = {}) => {
      try {
        const safeTh = Number(tempHot) > 0 ? Number(tempHot) : 650;
        const safeTc = Number(tempCold) >= 0 ? Number(tempCold) : 30;
        const safeP = Number(gasPressure) > 0 ? Number(gasPressure) : 40;

        const thK = Math.max(1, safeTh + 273.15);
        const tcK = Math.max(1, safeTc + 273.15);
        const validThK = thK > tcK ? thK : tcK + 1;
        const efficiency = Math.max(0, Math.min(100, (1 - (tcK / validThK)) * 100));
        const powerOutput = Math.round((efficiency / 100) * safeP * 150);

        if (safeP > 85 && safeTh > 1000) {
          return {
            status: 'danger',
            badge: 'MELEDAK / OVERPRESSURE',
            title: 'Tekanan Piston Melebihi Batas Material Metal',
            description: `Tekanan gas (${safeP} atm) dan suhu Th (${safeTh}°C) memicu ekspansi termal ekstrem yang merusak reaktor!`,
            bagianA: `Suhu pembakaran (${safeTh}°C) dan tekanan gas (${safeP} atm) melampaui kekuatan mekanis piston. Risiko retak termal dapat memicu ledakan reaktor.`,
            bagianB: `Menurut Hukum Gas Ideal P·V = n·R·T dan Termodinamika, kenaikan T (${safeTh}°C) memompa tekanan P (${safeP} atm) melebihi yield strength paduan logam.`,
            bagianC: `Geser Tekanan Gas turun di bawah 70 atm (saat ini ${safeP} atm) atau turunkan Suhu Hot Reservoir Th ke 800°C - 900°C (saat ini ${safeTh}°C)!`,
            metrics: { Efficiency: `${efficiency.toFixed(1)}%`, Output: `${powerOutput} MW`, Risk: 'Critical' }
          };
        } else if (efficiency < 45) {
          return {
            status: 'warning',
            badge: 'PEMBOROSAN ENERGI TINGGI',
            title: 'Selisih Suhu Terlalu Sempit',
            description: `Efisiensi Carnot (${efficiency.toFixed(1)}%) terlalu rendah karena selisih Th (${safeTh}°C) & Tc (${safeTc}°C) terlalu dekat.`,
            bagianA: `Perbedaan suhu ruang bakar Th (${safeTh}°C) dan pendingin Tc (${safeTc}°C) terlalu kecil, menyebabkan mayoritas energi panas terbuang sia-sia.`,
            bagianB: `Formula Carnot η = 1 - (Tc/Th) menunjukkan bahwa rasio suhu ${tcK.toFixed(0)}K / ${thK.toFixed(0)}K yang tinggi memangkas efisiensi konversi termal.`,
            bagianC: `Naikkan Suhu Hot Reservoir Th (saat ini ${safeTh}°C) atau turunkan Suhu Cold Reservoir Tc (saat ini ${safeTc}°C) agar efisiensi melonjak di atas 60%!`,
            metrics: { Efficiency: `${efficiency.toFixed(1)}%`, Output: `${powerOutput} MW`, Risk: 'Low Efficiency' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'EFISIENSI CARNOT MAX',
            title: 'Konversi Panas Menjadi Daya Listrik Sangat Optimal',
            description: `Siklus Carnot bekerja optimal pada efisiensi ${efficiency.toFixed(1)}% menghasilkan daya ${powerOutput} MW pada tekanan ${safeP} atm.`,
            bagianA: `Reaktor beroperasi sangat efisien! Panas Th (${safeTh}°C) dan Tc (${safeTc}°C) dikonversi secara maksimal menjadi daya listrik ${powerOutput} MW.`,
            bagianB: `Siklus 4 tahap Carnot beroperasi presisi pada efisiensi ${efficiency.toFixed(1)}%, mengonversi energi panas Qh menjadi usaha mekanis W.`,
            bagianC: `Sistem termodinamika berada dalam performa puncak! Uji variasi tekanan piston untuk mensimulasikan perubahan daya MW.`,
            metrics: { Efficiency: `${efficiency.toFixed(1)}%`, Output: `${powerOutput} MW`, Risk: 'Optimal' }
          };
        }
      } catch (err) {
        console.error("Error calculating 2B consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Termodinamika Diproses',
          description: 'Sistem memperbarui efisiensi Carnot.',
          bagianA: 'Parameter termodinamika sedang dihitung.',
          bagianB: 'Persamaan Carnot η = 1 - (Tc/Th) diperbarui.',
          bagianC: 'Geser slider parameter ke rentang aman.',
          metrics: { Status: 'Active' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa efisiensi Siklus Carnot tidak pernah bisa mencapai 100%?', hint: 'Karena agar efisiensi 100%, suhu dingin Tc harus 0 Kelvin (-273°C) yang secara fisik mustahil dicapai.' }
    ]
  },

  // 2C: 5G Telecom & EM Waves
  '2C': {
    id: '2C',
    subjectId: 'physics',
    subjectName: 'Fisika',
    title: 'Telekomunikasi 5G & Gelombang Elektromagnetik: Resonansi & Atenuasi',
    formula: "c = f \\cdot \\lambda, \\quad I = I_0 \\cdot e^{-\\alpha \\cdot d}",
    story: [
      {
        title: 'Asal-Usul: Persamaan Maxwell (1865)',
        content: 'James Clerk Maxwell menyatukan listrik dan magnet menjadi konsep gelombang elektromagnetik yang merambat secepat cahaya. Penemuan ini menjadi fondasi radio, wifi, hingga jaringan seluler 5G modern.'
      },
      {
        title: 'Masalah Dunia Nyata: Mengapa Sinyal 5G Terhalang Tembok?',
        content: 'Frekuensi 5G millimeter wave (28 GHz) sangat cepat membawa data Gbps, namun gelombangnya sangat pendek sehingga mudah diserap dinding beton.'
      }
    ],
    industryDomains: [
      { name: 'Operator Seluler 5G & Jaringan Fiber', desc: 'Penempatan menara pemancar microcell di pemukiman padat.' },
      { name: 'Sistem Radar Militer & Penerbangan', desc: 'Resonansi antena phased array deteksi stealth.' },
      { name: 'Koneksi Satelit Starlink & IoT', desc: 'Antena pita lebar nirkabel ultra-low latency.' }
    ],
    controls: [
      { id: 'frequency', label: 'Frekuensi Gelombang (GHz)', min: 1, max: 40, defaultVal: 28, unit: 'GHz' },
      { id: 'power', label: 'Daya Pancar Antena', min: 10, max: 100, defaultVal: 60, unit: 'Watt' },
      { id: 'wallThickness', label: 'Ketebalan Dinding Beton', min: 5, max: 50, defaultVal: 20, unit: 'cm' }
    ],
    presets: [
      { name: '📡 Kasus 5G mmWave Langsung (Cepat)', values: { frequency: 28, power: 70, wallThickness: 5 } },
      { name: '🧱 Kasus Atenuasi Dinding Tebal', values: { frequency: 35, power: 30, wallThickness: 45 } },
      { name: '🌐 Kasus 4G Jangkauan Luas', values: { frequency: 2.4, power: 50, wallThickness: 25 } }
    ],
    calculateConsequence: ({ frequency = 28, power = 60, wallThickness = 20 } = {}) => {
      try {
        const safeFreq = Number(frequency) > 0 ? Number(frequency) : 28;
        const safePower = Number(power) > 0 ? Number(power) : 60;
        const safeWall = Number(wallThickness) >= 0 ? Number(wallThickness) : 20;

        const alpha = 0.05 * safeFreq;
        const intensity = safePower * Math.exp(-alpha * (safeWall / 10));
        const safeDenominator = safePower + 1;
        const speedGbps = Math.max(0, Math.round((safeFreq / 4) * (intensity / safeDenominator) * 10) / 10);

        if (intensity < 5) {
          return {
            status: 'danger',
            badge: 'SINYAL PUTUS / DEAD ZONE',
            title: 'Atenuasi Penyerapan Dinding Sangat Tinggi',
            description: `Frekuensi tinggi (${safeFreq} GHz) terserap total oleh dinding beton ${safeWall} cm. Intensitas sinyal drop ke ${intensity.toFixed(1)} W.`,
            bagianA: `Gelombang 5G (${safeFreq} GHz) terserap habis saat menembus dinding beton ${safeWall} cm. Perangkat penerima kehilangan koneksi sinyal (dead zone).`,
            bagianB: `Persamaan Peluruhan I = I0 · e^(-αd) menunjukkan frekuensi ${safeFreq} GHz memperbesar atenuasi α, mengikis intensitas sinyal menembus dinding ${safeWall} cm.`,
            bagianC: `Gunakan frekuensi lebih rendah (misal 2.4 GHz - 6 GHz) untuk penetrasi dinding ${safeWall} cm, atau naikkan Daya Pancar Antena di atas ${safePower} W!`,
            metrics: { Intensity: `${intensity.toFixed(1)} W`, Speed: '0 Gbps', State: 'Disconnected' }
          };
        } else if (speedGbps < 1.5) {
          return {
            status: 'warning',
            badge: 'KECEPATAN DROPDOWN',
            title: 'Gelombang Mengalami Difraksi & Redaman',
            description: `Kecepatan sinyal drop ke ${speedGbps} Gbps dengan intensitas ${intensity.toFixed(1)} W akibat redaman dinding ${safeWall} cm.`,
            bagianA: `Sinyal menembus halangan dinding ${safeWall} cm, namun daya pancar ${safePower} W mengalami redaman sehingga kecepatan transfer data berkurang (${speedGbps} Gbps).`,
            bagianB: `Intensitas sinyal I (${intensity.toFixed(1)} W) menurunkan rasio SNR (Signal to Noise Ratio), menahan throughput maksimum data pada frekuensi ${safeFreq} GHz.`,
            bagianC: `Naikkan Daya Pancar Antena (Power) ke atas 70 W (saat ini ${safePower} W) atau kurangi sekat dinding fisik untuk mendongkrak kecepatan Gbps!`,
            metrics: { Intensity: `${intensity.toFixed(1)} W`, Speed: `${speedGbps} Gbps`, State: 'Laggy' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'KONEKSI 5G ULTRA FAST',
            title: 'Resonansi Gelombang EM Sangat Presisi',
            description: `Transmisi ${safeFreq} GHz pada daya ${safePower} W menghasilkan koneksi super cepat ${speedGbps} Gbps!`,
            bagianA: `Sinyal 5G (${safeFreq} GHz) merambat jernih menembus sekat ${safeWall} cm dengan intensitas ${intensity.toFixed(1)} W. Kecepatan mencapai ${speedGbps} Gbps.`,
            bagianB: `Panjang gelombang λ = c/f dan daya I0 berada pada rasio penetrasi optimal, menjaga keutuhan data berkecepatan tinggi.`,
            bagianC: `Koneksi elektromagnetik berada pada kondisi paling ideal! Uji perbedaan frekuensi 4G vs 5G untuk mengamati daya tembus.`,
            metrics: { Intensity: `${intensity.toFixed(1)} W`, Speed: `${speedGbps} Gbps`, State: 'Connected' }
          };
        }
      } catch (err) {
        console.error("Error calculating 2C consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Gelombang Diproses',
          description: 'Sistem memperbarui intensitas sinyal 5G.',
          bagianA: 'Perhitungan atenuasi sinyal sedang diperbarui.',
          bagianB: 'Persamaan I = I0 · e^(-αd) disesuaikan dinamis.',
          bagianC: 'Geser slider parameter sinyal.',
          metrics: { Status: 'Active' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa sinyal radio FM (88-108 MHz) bisa menembus gedung tinggi sedangkan 5G (28 GHz) butuh pemancar di mana-mana?', hint: 'Semakin tinggi frekuensi, semakin pendek panjang gelombangnya (λ = c/f), sehingga daya tembus fisiknya terhadap benda padat makin lemah.' }
    ]
  },

  // 3A: Pharma Kinetics & Reaction Rates
  '3A': {
    id: '3A',
    subjectId: 'chemistry',
    subjectName: 'Kimia',
    title: 'Industri Farmasi & Kinetika Reaksi: Desain Kapsul Obat & Laju Kelarutan',
    formula: "v = k \\cdot [A]^n, \\quad C(t) = \\frac{D \\cdot k_a}{V (k_a - k_e)} (e^{-k_e t} - e^{-k_a t})",
    story: [
      {
        title: 'Asal-Usul: Persamaan Kinetika Wilhelmy (1850)',
        content: 'Ludwig Wilhelmy pertama kali mengukur laju reaksi kimia peluruhan gula. Di bidang kedokteran, kinetika kimia menjadi fondasi dosis obat agar konsentrasi senyawa bioaktif di pembuluh darah tetap di jendela terapi aman.'
      },
      {
        title: 'Masalah Dunia Nyata: Obat Efek Cepat vs Keracunan Ginjal',
        content: 'Jika kapsul obat larut terlalu cepat di asam lambung, pasien bisa overdosis mendadak. Jika terlalu lambat, obat terbuang tanpa menyembuhkan.'
      }
    ],
    industryDomains: [
      { name: 'Industri Farmasi & Tablet Time-Release', desc: 'Merancang obat lepas lambat (extended release) untuk pasien kronis.' },
      { name: 'Bioteknologi Vaksin MRNA', desc: 'Laju degradasi partikel lipid nano di suhu tubuh.' },
      { name: 'Uji Klinis Toksikologi Kedokteran', desc: 'Pemodelan farmakokinetik metabolisme hati dan ginjal.' }
    ],
    controls: [
      { id: 'stomachPH', label: 'pH Asam Lambung', min: 1, max: 7, defaultVal: 2, unit: 'pH' },
      { id: 'particleSurface', label: 'Luas Permukaan Partikel', min: 10, max: 100, defaultVal: 60, unit: 'cm²/g' },
      { id: 'rateConstK', label: 'Konstanta Laju k', min: 0.1, max: 2, defaultVal: 0.8, unit: '/h' }
    ],
    presets: [
      { name: '💊 Kasus Jendela Terapi Optimal', values: { stomachPH: 2, particleSurface: 50, rateConstK: 0.7 } },
      { name: '☣️ Kasus Overdosis Toksik', values: { stomachPH: 1, particleSurface: 95, rateConstK: 1.8 } },
      { name: '🐌 Kasus Gagal Larut (Terapis Lambat)', values: { stomachPH: 5, particleSurface: 15, rateConstK: 0.2 } }
    ],
    calculateConsequence: ({ stomachPH = 2, particleSurface = 60, rateConstK = 0.8 } = {}) => {
      try {
        const safePH = Number(stomachPH) > 0 ? Number(stomachPH) : 2;
        const safeSurface = Number(particleSurface) > 0 ? Number(particleSurface) : 60;
        const safeK = Number(rateConstK) > 0 ? Number(rateConstK) : 0.8;

        const dissolveRate = (safeK * safeSurface) / safePH;

        if (dissolveRate > 45) {
          return {
            status: 'danger',
            badge: 'KONSENTRASI TOKSIK / OVERDOSIS',
            title: 'Laju Pelarutan Obat Terlalu Eksplosif',
            description: `Laju pelarutan v (${dissolveRate.toFixed(1)} mg/L/h) terlalu cepat di pH ${safePH} dengan permukaan ${safeSurface} cm²/g!`,
            bagianA: `Partikel obat halus dengan luas permukaan ${safeSurface} cm²/g larut berlebihan pada pH ${safePH}. Lonjakan zat aktif berisiko meracuni organ ginjal.`,
            bagianB: `Menurut Hukum Laju Reaksi v = k·[A]^n, luas sentuh A (${safeSurface} cm²/g) dan k (${safeK}) melonjakkan frekuensi tumbukan di atas jendela terapi aman.`,
            bagianC: `Gunakan selaput polimer pelapis kapsul (Extended Release) untuk memperkecil luas permukaan kontak A (saat ini ${safeSurface} cm²/g), atau kurangi konstanta k!`,
            metrics: { Rate: `${dissolveRate.toFixed(1)} mg/L/h`, PeakTime: '0.2 Jam', Risk: 'Toxic' }
          };
        } else if (dissolveRate < 10) {
          return {
            status: 'warning',
            badge: 'OBAT TIDAK EFEKTIF',
            title: 'Partikel Terlalu Kasar / Kurang Terbuka',
            description: `Laju pelarutan v (${dissolveRate.toFixed(1)} mg/L/h) terlalu lambat untuk mencapai tingkat penyembuhan efektif.`,
            bagianA: `Obat dengan luas permukaan ${safeSurface} cm²/g lambat melarut pada pH ${safePH}. Pasien tidak merasakan efek penyembuhan karena obat terbuang via ekskresi.`,
            bagianB: `Luas sentuh A (${safeSurface} cm²/g) minim membuat tumbukan molekul asam lambung rendah, sehingga reaksi pelarutan v = k·[A]^n di bawah dosis efektif.`,
            bagianC: `Haluskan partikel obat (perbesar Luas Permukaan A dari ${safeSurface} cm²/g) atau minum obat saat derajat asam lambung ideal (pH 1.5 - 2.5)!`,
            metrics: { Rate: `${dissolveRate.toFixed(1)} mg/L/h`, PeakTime: '6.0 Jam', Risk: 'Ineffective' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'DOSIS PRESISI AMAN',
            title: 'Kurva Kinetika Farmakokinetik Ideal',
            description: `Kinetika pelarutan v = ${dissolveRate.toFixed(1)} mg/L/h berada pada jendela terapi terapeutik sempurna.`,
            bagianA: `Kapsul obat melarut secara berkala dengan laju ${dissolveRate.toFixed(1)} mg/L/h pada pH ${safePH}. Zat aktif diserap bertahap dalam batas aman.`,
            bagianB: `Keseimbangan kinetika reaksi v = k·[A] (${safeK} · ${safeSurface}) menghasilkan kurva konsentrasi darah C(t) ideal tanpa menyentuh batas toksik.`,
            bagianC: `Formulasi kinetika obat berada di kondisi paling ideal! Uji perubahan keasaman pH untuk mensimulasikan kondisi lambung pasien.`,
            metrics: { Rate: `${dissolveRate.toFixed(1)} mg/L/h`, PeakTime: '2.5 Jam', Risk: 'Safe' }
          };
        }
      } catch (err) {
        console.error("Error calculating 3A consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Kinetika Obat Diproses',
          description: 'Sistem memperbarui laju kelarutan obat.',
          bagianA: 'Parameter pelarutan sedang dihitung.',
          bagianB: 'Persamaan kinetika v = k·[A]^n disesuaikan.',
          bagianC: 'Geser slider parameter ke rentang terapeutik.',
          metrics: { Status: 'Active' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa obat puyer serbuk bekerja jauh lebih cepat daripada kapsul berkulit tebal?', hint: 'Karena serbuk memiliki luas permukaan total jauh lebih besar, meningkatkan frekuensi tumbukan partikel per detik.' }
    ]
  },

  // 3B: EV Battery & Electrochemistry
  '3B': {
    id: '3B',
    subjectId: 'chemistry',
    subjectName: 'Kimia',
    title: 'Baterai Mobil Listrik & Elektrokimia: Potensial Sel Volta & Nernst',
    formula: "E_{sel} = E^0_{sel} - \\frac{RT}{nF} \\ln Q, \\quad \\Delta G = -n F E_{sel}",
    story: [
      {
        title: 'Asal-Usul: Sel Volta Alessandro Volta (1800)',
        content: 'Alessandro Volta memicu revolusi energi dengan tumpukan seng dan tembaga. Persamaan Nernst menyempurnakannya dengan menghitung voltase aktual baterai berdasarkan konsentrasi ion Litium dan temperatur.'
      },
      {
        title: 'Masalah Dunia Nyata: Daya Tahan Baterai EV Saat Cuaca Dingin/Panas',
        content: 'Mengapa jarak tempuh Tesla/Hyundai turun 30% saat musim dingin salju? Temperatur mempengaruhi potensial Nernst dan hambatan dalam sel elektrokimia.'
      }
    ],
    industryDomains: [
      { name: 'Pabrik Gigafactory Baterai EV (CATL & LG)', desc: 'Pengembangan katoda Litium Nickel Manganese Cobalt (NMC).' },
      { name: 'Penyimpanan Energi Surya Powerwall', desc: 'Baterai jaringan listrik stasioner siklus panjang.' },
      { name: 'Daya Ponsel Smart Electronics', desc: 'Algoritma fast-charging berbasis pemantauan voltase Nernst.' }
    ],
    controls: [
      { id: 'electrolyteConc', label: 'Konsentrasi Ion Elektrolit', min: 0.1, max: 3, defaultVal: 1.2, unit: 'M' },
      { id: 'temperature', label: 'Suhu Baterai T', min: -10, max: 65, defaultVal: 25, unit: '°C' },
      { id: 'metalPair', label: 'Komposisi Katoda (Litium = 1, Nikel = 2, Kobalt = 3)', min: 1, max: 3, defaultVal: 1, unit: 'type' }
    ],
    presets: [
      { name: '🔋 Kasus Fast Charge Optimal', values: { electrolyteConc: 1.5, temperature: 28, metalPair: 1 } },
      { name: '❄️ Kasus Suhu Salju Extreme', values: { electrolyteConc: 0.5, temperature: -8, metalPair: 1 } },
      { name: '🔥 Kasus Thermal Runaway (Panas)', values: { electrolyteConc: 2.8, temperature: 62, metalPair: 3 } }
    ],
    calculateConsequence: ({ electrolyteConc = 1.2, temperature = 25, metalPair = 1 } = {}) => {
      try {
        const safeConc = Number(electrolyteConc) > 0 ? Number(electrolyteConc) : 1.2;
        const safeTemp = !isNaN(Number(temperature)) ? Number(temperature) : 25;
        const safePair = [1, 2, 3].includes(Number(metalPair)) ? Number(metalPair) : 1;

        const tempK = safeTemp + 273.15;
        const baseE0 = safePair === 1 ? 3.7 : safePair === 2 ? 3.2 : 3.9;
        const voltage = baseE0 - ((8.314 * tempK) / (2 * 96485)) * Math.log(1 / (safeConc + 0.1));
        const batteryHealth = Math.max(0, 100 - (safeTemp > 45 ? (safeTemp - 45) * 2 : 0));

        if (safeTemp > 55) {
          return {
            status: 'danger',
            badge: 'THERMAL RUNAWAY / FIRE RISK',
            title: 'Resiko Kebakaran akibat Degenerasi Elektrolit',
            description: `Suhu baterai (${safeTemp}°C) berisiko merusak membran SEI dan memicu korsleting internal sel Volta.`,
            bagianA: `Suhu baterai yang panas (${safeTemp}°C) mempercepat degradasi sel. Cairan elektrolit (${safeConc} M) berisiko menguap memicu kebakaran thermal runaway.`,
            bagianB: `Menurut Persamaan Nernst E = E° - (RT/nF)ln(Q), suhu T (${safeTemp}°C) meningkatkan energi kinetik tetapi merusak struktur elektroda.`,
            bagianC: `Turunkan Suhu Baterai (T) ke kisaran 25°C - 35°C (saat ini ${safeTemp}°C) dan jaga konsentrasi ion elektrolit di 1.5 M!`,
            metrics: { Voltage: `${voltage.toFixed(2)} V`, Health: `${batteryHealth}%`, Risk: 'Hazardous' }
          };
        } else if (safeTemp < 0) {
          return {
            status: 'warning',
            badge: 'PERFORMA DROPDOWN',
            title: 'Mobil Listrik Kehilangan Daya di Suhu Dingin',
            description: `Suhu sub-zero (${safeTemp}°C) meningkatkan viskositas elektrolit (${safeConc} M), memangkas jangkauan EV.`,
            bagianA: `Pada suhu sub-zero (${safeTemp}°C), gerakan ion litium melambat. Voltase terukur ${voltage.toFixed(2)} V memangkas daya jangkau mobil listrik.`,
            bagianB: `Kecepatan difusi ion berbanding lurus dengan T Kelvin. Resistansi internal sel melonjak saat T berada di ${safeTemp}°C (${tempK.toFixed(1)} K).`,
            bagianC: `Aktifkan pemanas baterai (Pre-conditioning) untuk menaikkan suhu T ke atas 15°C sebelum berkendara!`,
            metrics: { Voltage: `${voltage.toFixed(2)} V`, Health: `${batteryHealth}%`, Risk: 'Low Range' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'KAPASITAS DAYA OPTIMAL',
            title: 'Transfer Elektron Berlangsung Efisien',
            description: `Voltase ${voltage.toFixed(2)} V stabil pada suhu ${safeTemp}°C dengan kesehatan sel ${batteryHealth}%.`,
            bagianA: `Suhu (${safeTemp}°C) dan konsentrasi elektrolit (${safeConc} M) berada pada kondisi ideal. Ion litium berpindah lancar menghasilkan voltase ${voltage.toFixed(2)} V.`,
            bagianB: `Potensial sel Volta E_sel (${voltage.toFixed(2)} V) menghasilkan Energi Bebas Gibbs ΔG = -nFE_sel negatif maksimal untuk daya tahan tinggi.`,
            bagianC: `Pengaturan baterai berada di kondisi paling ideal! Uji komposisi katoda yang berbeda untuk mengamati voltase dasar.`,
            metrics: { Voltage: `${voltage.toFixed(2)} V`, Health: `${batteryHealth}%`, Risk: 'Healthy' }
          };
        }
      } catch (err) {
        console.error("Error calculating 3B consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Baterai Diproses',
          description: 'Sistem memperbarui voltase sel Nernst.',
          bagianA: 'Parameter voltase sel sedang dihitung.',
          bagianB: 'Persamaan Nernst E = E° - (RT/nF)ln(Q) diperbarui.',
          bagianC: 'Geser slider parameter baterai.',
          metrics: { Status: 'Active' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa baterai litium-ion tidak boleh diisi hingga 100% dan didiamkan di bawah terik matahari?', hint: 'Karena voltase tinggi gabungan temperatur panas mempercepat reaksi samping oksidasi elektrolit.' }
    ]
  },

  // 3C: Fertilizer Plant & Haber-Bosch Equilibrium
  '3C': {
    id: '3C',
    subjectId: 'chemistry',
    subjectName: 'Kimia',
    title: 'Pabrik Pupuk & Kesetimbangan Kimia: Sintesis Amonia (Haber-Bosch)',
    formula: "N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g) \\quad (\\Delta H = -92.4 \\text{ kJ/mol}), \\quad K_p = \\frac{P_{NH_3}^2}{P_{N_2} \\cdot P_{H_2}^3}",
    story: [
      {
        title: 'Asal-Usul: Penemuan Fritz Haber & Carl Bosch (1909)',
        content: 'Penemuan reaksi kesetimbangan Haber-Bosch menyelamatkan dunia dari kelaparan massal dengan mengubah gas nitrogen udara menjadi pupuk amonia. Reaksi ini bertanggung jawab memberi makan 40% populasi bumi hari ini.'
      },
      {
        title: 'Masalah Dunia Nyata: Dilema Industri Antara Kecepatan vs Hasil',
        content: 'Reaksi eksotermik ini menciptakan dilema: Suhu tinggi mempercepat reaksi tetapi menggeser kesetimbangan ke kiri (hasil sedikit), sedangkan suhu rendah memperbanyak amonia tapi reaksi sangat lambat.'
      }
    ],
    industryDomains: [
      { name: 'Pabrik Pupuk Nasional (Pupuk Kaltim/Sriwidjaja)', desc: 'Produksi urea skala jutaan ton per tahun.' },
      { name: 'Petrokimia Bahan Peledak Industri', desc: 'Sintesis asam nitrat dari senyawa amonia.' },
      { name: 'Teknologi Amonia Hijau (Green Hydrogen)', desc: 'Penyimpanan bahan bakar hidrogen bersih masa depan.' }
    ],
    controls: [
      { id: 'reactorPressure', label: 'Tekanan Tabung (atm)', min: 50, max: 400, defaultVal: 200, unit: 'atm' },
      { id: 'reactionTemp', label: 'Suhu Reaksi T (°C)', min: 200, max: 700, defaultVal: 450, unit: '°C' },
      { id: 'catalystPresent', label: 'Katalis Serbuk Besi (Fe)', min: 0, max: 1, defaultVal: 1, unit: 'active' }
    ],
    presets: [
      { name: '🌱 Kasus Industri Optimal', values: { reactorPressure: 200, reactionTemp: 450, catalystPresent: 1 } },
      { name: '📉 Kasus Suhu Sangat Panas (Rugi)', values: { reactorPressure: 80, reactionTemp: 650, catalystPresent: 1 } },
      { name: '🛑 Kasus Tanpa Katalis (Sangat Lambat)', values: { reactorPressure: 150, reactionTemp: 250, catalystPresent: 0 } }
    ],
    calculateConsequence: ({ reactorPressure = 200, reactionTemp = 450, catalystPresent = 1 } = {}) => {
      try {
        const safeP = Number(reactorPressure) > 0 ? Number(reactorPressure) : 200;
        const safeT = Number(reactionTemp) > 0 ? Number(reactionTemp) : 450;
        const safeCat = Number(catalystPresent) === 1 ? 1 : 0;

        const yieldPct = Math.max(0, Math.min(100, Math.round((safeP / 400) * (1 - safeT / 800) * 100)));

        if (safeCat === 0 && safeT < 350) {
          return {
            status: 'danger',
            badge: 'REAKSI MACET / TANPA PRODUKSI',
            title: 'Energi Aktivasi Terlalu Tinggi Tanpa Katalis',
            description: `Tanpa katalis Fe pada suhu ${safeT}°C & tekanan ${safeP} atm, ikatan rangkap tiga N≡N tidak terputus.`,
            bagianA: `Reaktor tidak menghasilkan molekul amonia. Ikatan kovalen N≡N gagal terputus karena energi aktivasi tinggi tanpa katalis Fe pada ${safeT}°C.`,
            bagianB: `Katalis besi (Fe) menyediakan rute energi aktivasi Ea lebih rendah. Tanpa katalis pada ${safeT}°C, laju reaksi pembentukan NH3 mendekati 0.`,
            bagianC: `Aktifkan Katalis Serbuk Besi (Fe = 1) dan naikkan Suhu Reaksi hingga 450°C (saat ini ${safeT}°C) untuk memutus ikatan N≡N!`,
            metrics: { Yield: `${yieldPct}%`, Speed: 'Macet', AmoniaOutput: '0 Ton' }
          };
        } else if (safeT > 550) {
          return {
            status: 'warning',
            badge: 'AZAS LE CHATELIER BERGESER KIRI',
            title: 'Hasil Kesetimbangan Menguap Kembali',
            description: `Suhu tinggi (${safeT}°C) menggeser kesetimbangan eksotermik ke kiri, menurunkan rendemen ke ${yieldPct}%.`,
            bagianA: `Reaksi berjalan cepat tetapi amonia yang terbentuk terurai kembali pada suhu ${safeT}°C. Rendemen produk pupuk drop drastis.`,
            bagianB: `Azas Le Chatelier menunjukkan reaksi eksotermik (ΔH < 0) bergeser ke kiri saat T naik (${safeT}°C), mengganggu kesetimbangan Kp.`,
            bagianC: `Turunkan Suhu Reaksi ke 450°C (saat ini ${safeT}°C) dan tingkatkan Tekanan P ke 200 - 300 atm (saat ini ${safeP} atm) untuk mendorong pembentukan NH3!`,
            metrics: { Yield: `${Math.max(5, yieldPct)}%`, Speed: 'Sangat Cepat', AmoniaOutput: 'Low Yield' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'SINTESIS AMONIA OPTIMAL',
            title: 'Kompromi Tekanan-Suhu Sempurna',
            description: `Tekanan ${safeP} atm dan suhu ${safeT}°C dengan katalis Fe menghasilkan rendemen amonia ideal ${yieldPct}%.`,
            bagianA: `Pabrik pupuk beroperasi pada efisiensi maksimal! Gas N2 dan H2 bereaksi efektif pada ${safeP} atm & ${safeT}°C membentuk NH3 cair berlimpah.`,
            bagianB: `Kompromi Azas Le Chatelier tercapai: Tekanan ${safeP} atm menggeser reaksi ke produk gas (2 mol NH3), sementara katalis Fe menurunkan Energi Aktivasi Ea.`,
            bagianC: `Kondisi reaktor industri berada dalam efisiensi tertinggi! Uji variasi tekanan P untuk melihat dinamika rendemen.`,
            metrics: { Yield: `${yieldPct}%`, Speed: 'Optimal', AmoniaOutput: '1,200 Ton/Hari' }
          };
        }
      } catch (err) {
        console.error("Error calculating 3C consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Kesetimbangan Diproses',
          description: 'Sistem memperbarui rendemen amonia.',
          bagianA: 'Parameter reaktor sintetis sedang dihitung.',
          bagianB: 'Azas Le Chatelier dan pergeseran Kp diperbarui.',
          bagianC: 'Geser slider parameter reaktor.',
          metrics: { Status: 'Active' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa peningkatan tekanan gas menggeser kesetimbangan ke arah kanan pembentukan NH3?', hint: 'Berdasarkan azas Le Chatelier, peningkatan tekanan menggeser kesetimbangan ke sisi dengan jumlah koefisien molekul gas lebih sedikit (4 mol N2+H2 -> 2 mol NH3).' }
    ]
  }
};
