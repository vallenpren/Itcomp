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
      const vMS = speed / 3.6;
      const downforce = 0.5 * dragCoeff * 1.225 * Math.sin((wingAngle * Math.PI) / 180) * Math.pow(vMS, 2);
      const fuelPenalty = (dragCoeff * Math.pow(speed, 2)) / 1000;

      if (wingAngle > 30 && speed > 320) {
        return {
          status: 'danger',
          badge: 'TERLEMPAR / STALL AERODINAMIS',
          title: 'Drag Udara Ekstrem Memicu Turbulensi Terpisah',
          description: 'Sudut sayap terlalu curam pada kecepatan tinggi menciptakan drag luar biasa yang menghambat laju dan merusak stabilitas cengkraman ban.',
          bagianA: 'Sudut sayap belakang yang terlalu tegak menciptakan turbulensi angin berputar di belakang bodi mobil. Udara gagal mengalir mulus sehingga hambatan angin (drag) membengkak ekstrem.',
          bagianB: 'Berdasarkan Hukum Bernoulli P + ½ρv² = Konstan, perbedaan kecepatan udara atas dan bawah memicu pelepasan aliran (boundary layer separation), memicu efek stall aerodinamis.',
          bagianC: 'Turunkan Sudut Kemiringan Sayap di bawah 25° dan kurangi Koefisien Drag Cd agar aliran udara kembali melekat mulus (laminar flow)!',
          metrics: { Downforce: `${Math.round(downforce)} N`, FuelConsumption: `${fuelPenalty.toFixed(1)} L/100km`, State: 'Stall' }
        };
      } else if (downforce < 500 && speed > 200) {
        return {
          status: 'warning',
          badge: 'BAHAYA TERGELINCIR',
          title: 'Downforce Terlalu Minis di Tikungan',
          description: 'Cengkraman ban kurang karena aliran udara di atas mobil tidak menghasilkan beda tekanan Bernoulli yang cukup.',
          bagianA: 'Mobil melaju kencang tetapi ban kurang menekan permukaan aspal. Saat bermanuver di tikungan tajam, mobil berisiko mengalami understeer dan tergelincir ke luar lintasan.',
          bagianB: 'Kecepatan aliran udara di bawah mobil tidak cukup tinggi dibanding udara atas, sehingga beda tekanan ΔP kecil dan gaya tekan Downforce F_down = ½Cd·ρ·A·v² berada di bawah ambang batas cengkram.',
          bagianC: 'Naikkan Sudut Sayap ke kisaran 15° - 25° untuk meningkatkan Downforce hingga di atas 1,000 N tanpa mengorbankan kecepatan puncak!',
          metrics: { Downforce: `${Math.round(downforce)} N`, FuelConsumption: `${fuelPenalty.toFixed(1)} L/100km`, State: 'Understeer' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'AERODINAMIS PRESISI TINGGI',
          title: 'Efek Bernoulli Memangkas Resitansi Udara',
          description: 'Supercar menempel sempurna di lintasan tikungan tajam dengan efisiensi bahan bakar yang terjaga!',
          bagianA: 'Aliran angin menyapu bodi mobil dengan sangat lancar. Perbedaan tekanan udara atas dan bawah menciptakan Downforce kuat yang merekatkan ban ke aspal.',
          bagianB: 'Persamaan Bernoulli bekerja presisi: udara bawah melaju kencang (tekanan rendah), udara atas melaju lambat (tekanan tinggi), menghasilkan Downforce ideal tanpa memicu hambatan drag berlebih.',
          bagianC: 'Konfigurasi aerodinamis berada di titik puncak efisiensi! Anda bisa mencoba mengubah kecepatan untuk menguji batas cengkraman ban.',
          metrics: { Downforce: `${Math.round(downforce)} N`, FuelConsumption: `${fuelPenalty.toFixed(1)} L/100km`, State: 'Optimal' }
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
      const thK = tempHot + 273.15;
      const tcK = tempCold + 273.15;
      const efficiency = (1 - (tcK / thK)) * 100;
      const powerOutput = Math.round((efficiency / 100) * gasPressure * 150);

      if (gasPressure > 85 && tempHot > 1000) {
        return {
          status: 'danger',
          badge: 'MELEDAK / OVERPRESSURE',
          title: 'Tekanan Piston Melebihi Batas Material Metal',
          description: 'Suhu tinggi ekstrem memicu ekspansi thermal berlebihan yang berisiko merusak dinding reaktor!',
          bagianA: 'Suhu pembakaran dan tekanan gas berada di atas ambang kekuatan mekanis material piston. Risiko retak termal dan kelelahan bahan dapat menyebabkan ledakan reaktor.',
          bagianB: 'Menurut Hukum Gas Ideal P·V = n·R·T dan Termodinamika, peningkatan T berlebihan memompa tekanan P melebihi yield strength paduan logam reaktor.',
          bagianC: 'Turunkan Tekanan Gas di bawah 70 atm atau kecilkan Suhu Reservoir Panas Th ke batas aman 800°C - 900°C!',
          metrics: { Efficiency: `${efficiency.toFixed(1)}%`, Output: `${powerOutput} MW`, Risk: 'Critical' }
        };
      } else if (efficiency < 45) {
        return {
          status: 'warning',
          badge: 'PEMBOROSAN ENERGI TINGGI',
          title: 'Selisih Suhu Terlalu Sempit',
          description: 'Lebih dari 55% energi panas terbuang sia-sia ke lingkungan tanpa terkonversi menjadi energi mekanik.',
          bagianA: 'Perbedaan suhu antara ruang bakar (Th) dan pendingin (Tc) terlalu dekat. Akibatnya, sebagian besar panas terbuang sia-sia melalui gas buang.',
          bagianB: 'Sesuai Formula Carnot η = 1 - (Tc/Th), semakin kecil rasio selisih (Th - Tc), semakin rendah persentase panas yang dapat dikonversi menjadi usaha bersih W = Qh - Qc.',
          bagianC: 'Naiikkan Suhu Reservoir Panas (Th) atau Dinginkan Reservoir Dingin (Tc) menggunakan radiator pendingin cair agar efisiensi meloncat ke atas 60%!',
          metrics: { Efficiency: `${efficiency.toFixed(1)}%`, Output: `${powerOutput} MW`, Risk: 'Low Efficiency' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'EFISIENSI CARNOT MAX',
          title: 'Konversi Panas Menjadi Daya Listrik Sangat Optimal',
          description: 'Siklus kompresi dan ekspansi isothermal-adiabatic bekerja pada efisiensi maksimum Hukum II Termodinamika.',
          bagianA: 'Reaktor bekerja dengan sangat efisien! Panas dari pembakaran dikonversi secara maksimal menjadi usaha mekanik putaran turbin generator listrik.',
          bagianB: 'Siklus 4 tahap Carnot (Ekspansi Isotermal, Ekspansi Adiabatik, Kompresi Isotermal, Kompresi Adiabatik) beroperasi pada rentang rentang temperatur Kelvin presisi tinggi.',
          bagianC: 'Sistem termodinamika berada dalam performa puncak. Anda dapat menguji berbagai kombinasi tekanan untuk mengamati daya output megawatt.',
          metrics: { Efficiency: `${efficiency.toFixed(1)}%`, Output: `${powerOutput} MW`, Risk: 'Optimal' }
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
      const alpha = 0.05 * frequency;
      const intensity = power * Math.exp(-alpha * (wallThickness / 10));
      const speedGbps = Math.round((frequency / 4) * (intensity / (power + 1)) * 10) / 10;

      if (intensity < 5) {
        return {
          status: 'danger',
          badge: 'SINYAL PUTUS / DEAD ZONE',
          title: 'Atenuasi Penyerapan Dinding Sangat Tinggi',
          description: 'Gelombang frekuensi tinggi diserap total oleh kisi-kisi beton tebal. Sinyal penerima jatuh ke titik nol dBm.',
          bagianA: 'Gelombang elektromagnetik frekuensi milimeter (5G) terserap habis saat berusaha menembus halangan dinding beton tebal. Pengguna mengalami keterputusan sinyal total (dead zone).',
          bagianB: 'Menurut Persamaan Eksponensial Peluruhan I = I₀ · e^(-αd), semakin tinggi frekuensi f, koefisien atenuasi α meloncat tinggi sehingga sinyal I menipis mendekati nol.',
          bagianC: 'Gunakan frekuensi lebih rendah (misal 2.4 GHz - 6 GHz) untuk penetrasi dinding tebal, atau pasang penguat sinyal mikro (Small Cell / Repeater) di dalam ruangan!',
          metrics: { Intensity: `${intensity.toFixed(1)} W`, Speed: '0 Gbps', State: 'Disconnected' }
        };
      } else if (speedGbps < 1.5) {
        return {
          status: 'warning',
          badge: 'KECEPATAN DROPDOWN',
          title: 'Gelombang Mengalami Difraksi & Redaman',
          description: 'Sinyal terhubung namun ping latency tinggi akibat transmisi daya lemah menembus halangan.',
          bagianA: 'Sinyal masih dapat menembus halangan, namun kekuatannya sudah jauh melemah. Kecepatan transfer data drop dan ping jaringan menjadi tinggi (laggy).',
          bagianB: 'Intensitas sinyal I berada di rentang marginal di mana rasio Sinyal terhadap Derau (SNR - Signal to Noise Ratio) rendah, menahan throughput maksimum data.',
          bagianC: 'Naiikkan Daya Pancar Antena (Power) ke atas 70 Watt atau posisikan router di area tanpa sekat fisik tebal!',
          metrics: { Intensity: `${intensity.toFixed(1)} W`, Speed: `${speedGbps} Gbps`, State: 'Laggy' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'KONEKSI 5G ULTRA FAST',
          title: 'Resonansi Gelombang EM Sangat Presisi',
          description: 'Daya pancar dan penetrasi frekuensi menghasilkan pita bandwidth gigabit per detik tanpa lag!',
          bagianA: 'Sinyal 5G merambat jernih sampai ke perangkat penerima. Kecepatan transfer data mencapai skala Gigabit per detik (Gbps) dengan ketersediaan jaringan sempurna.',
          bagianB: 'Panjang gelombang λ = c/f dan daya pancar I₀ berada dalam rasio penetrasi optimal, menjaga keutuhan paket data berkecepatan tinggi.',
          bagianC: 'Koneksi jaringan elektromagnetik berada pada titik paling ideal. Cobalah menguji perbedaan frekuensi 4G vs 5G untuk membandingkan daya tembusnya!',
          metrics: { Intensity: `${intensity.toFixed(1)} W`, Speed: `${speedGbps} Gbps`, State: 'Connected' }
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
      const dissolveRate = (rateConstK * particleSurface) / stomachPH;

      if (dissolveRate > 45) {
        return {
          status: 'danger',
          badge: 'KONSENTRASI TOKSIK / OVERDOSIS',
          title: 'Laju Pelarutan Obat Terlalu Eksplosif',
          description: 'Partikel senyawa obat terurai sekaligus di lambung. Lonjakan kadar obat dalam darah melebihi ambang batas aman ginjal!',
          bagianA: 'Partikel obat yang terlalu halus dengan luas permukaan sangat besar larut seketika begitu menyentuh asam lambung. Lonjakan kadar zat aktif menembus dinding usus secara drastis, berisiko meracuni organ ginjal.',
          bagianB: 'Menurut Hukum Laju Reaksi v = k·[A]^n, semakin luas bidang sentuh [A], frekuensi tumbukan efektif partikel pelarut melonjak eksponensial sehingga laju v melampaui jendela terapi aman (Therapeutic Window).',
          bagianC: 'Gunakan selaput polimer pelapis kapsul (Extended Release) untuk memperkecil luas permukaan kontak A, atau kurangi konstanta laju k agar kelarutan berlangsung bertahap!',
          metrics: { Rate: `${dissolveRate.toFixed(1)} mg/L/h`, PeakTime: '0.2 Jam', Risk: 'Toxic' }
        };
      } else if (dissolveRate < 10) {
        return {
          status: 'warning',
          badge: 'OBAT TIDAK EFEKTIF',
          title: 'Partikel Terlalu Kasar / Kurang Terbuka',
          description: 'Kelarutan obat terlalu lambat sehingga obat terbuang melalui ekskresi sebelum sempat diserap pembuluh darah.',
          bagianA: 'Obat sulit melarut di dalam cairan pencernaan karena bentuk partikelnya yang terlalu padat/kasar. Pasien tidak merasakan efek penyembuhan karena zat aktif terbuang lewat sistem ekskresi.',
          bagianB: 'Luas permukaan sentuh partikel A yang minim membuat frekuensi tumbukan molekul asam lambung rendah, sehingga reaksi pelarutan v = k·[A]^n berjalan sangat lambat di bawah dosis minimum efektif.',
          bagianC: 'Hancurkan partikel obat menjadi serbuk lebih halus (perbesar Luas Permukaan A) atau minum obat saat kondisi pH lambung berada pada derajat keasaman ideal (pH 1.5 - 2.5)!',
          metrics: { Rate: `${dissolveRate.toFixed(1)} mg/L/h`, PeakTime: '6.0 Jam', Risk: 'Ineffective' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'DOSIS PRESISI AMAN',
          title: 'Kurva Kinetika Farmakokinetik Ideal',
          description: 'Senyawa aktif diserap secara konstan selama 12 jam pada jendela terapi terapeutik sempurna.',
          bagianA: 'Kapsul obat melarut secara berkala dengan laju yang sangat stabil di cairan lambung. Zat aktif diserap pembuluh darah secara bertahap menjaga kadar penyembuhan di tingkat optimal.',
          bagianB: 'Keseimbangan kinetika laju reaksi v = k·[A] dan konstanta pelepasan k_a menghasilkan kurva konsentrasi darah C(t) yang berada di tengah rentang terapeutik tanpa menyentuh batas toksik.',
          bagianC: 'Formulasi kinetika obat berada di kondisi paling ideal. Anda dapat menguji perubahan keasaman pH untuk mensimulasikan pencernaan pasien!',
          metrics: { Rate: `${dissolveRate.toFixed(1)} mg/L/h`, PeakTime: '2.5 Jam', Risk: 'Safe' }
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
      const tempK = temperature + 273.15;
      const baseE0 = metalPair === 1 ? 3.7 : metalPair === 2 ? 3.2 : 3.9;
      const voltage = baseE0 - ((8.314 * tempK) / (2 * 96485)) * Math.log(1 / (electrolyteConc + 0.1));
      const batteryHealth = 100 - (temperature > 45 ? (temperature - 45) * 2 : 0);

      if (temperature > 55) {
        return {
          status: 'danger',
          badge: 'THERMAL RUNAWAY / FIRE RISK',
          title: 'Resiko Kebakaran akibat Degenerasi Elektrolit',
          description: 'Suhu di atas 55°C merusak lapisan SEI (Solid Electrolyte Interphase) memicu korsleting internal anode-katode.',
          bagianA: 'Suhu baterai yang terlalu panas meningkatkan laju degradasi material sel secara ekstrem. Cairan elektrolit menguap dan menciptakan gas yang berisiko memicu ledakan thermal runaway.',
          bagianB: 'Menurut Persamaan Nernst E = E° - (RT/nF)ln(Q), suhu T yang sangat tinggi meningkatkan energi kinetik partikel tetapi merusak struktur kisi kristal elektroda.',
          bagianC: 'Turunkan Suhu Baterai (T) hingga kisaran 25°C - 35°C dan jaga Konsentrasi Ion Elektrolit di 1.5 M agar voltase sel berada di titik paling stabil!',
          metrics: { Voltage: `${voltage.toFixed(2)} V`, Health: `${batteryHealth}%`, Risk: 'Hazardous' }
        };
      } else if (temperature < 0) {
        return {
          status: 'warning',
          badge: 'PERFORMA DROPDOWN',
          title: 'Mobil Listrik Kehilangan Daya di Suhu Dingin',
          description: 'Ion Litium lambat bergerak di cairan elektrolit beku, meningkatkan resistansi dalam baterai.',
          bagianA: 'Di suhu sub-zero / salju, viskositas cairan elektrolit meningkat drastis. Ion litium kesulitan berpindah dari anoda ke katoda sehingga jangkauan jarak tempuh mobil turun tajam.',
          bagianB: 'Kecepatan difusi ion berbanding lurus dengan temperatur T. Hambatan dalam sel (Internal Resistance) melonjak sehingga drop tegangan menjadi besar.',
          bagianC: 'Aktifkan sistem pemanas baterai (Pre-conditioning) untuk menaikkan suhu T ke atas 15°C sebelum mengendarai mobil listrik!',
          metrics: { Voltage: `${voltage.toFixed(2)} V`, Health: `${batteryHealth}%`, Risk: 'Low Range' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'KAPASITAS DAYA OPTIMAL',
          title: 'Transfer Elektron Berlangsung Efisien',
          description: 'Output voltase sel Volta stabil dengan efisiensi energi delta G maksimum untuk daya tempuh jauh.',
          bagianA: 'Suhu dan konsentrasi elektrolit berada pada kesetimbangan ideal. Ion litium berpindah lancar menembus membran separator, menghasilkan aliran arus listrik yang deras dan stabil.',
          bagianB: 'Potensial sel Volta E_sel menghasilkan Energi Bebas Gibbs ΔG = -nF E_sel bernilai negatif maksimal, menjamin reaksi redoks spontan berdaya tinggi.',
          bagianC: 'Pengaturan baterai berada di kondisi paling optimal. Anda bisa mencoba memilih komposisi katoda yang berbeda untuk membandingkan output voltase dasar!',
          metrics: { Voltage: `${voltage.toFixed(2)} V`, Health: `${batteryHealth}%`, Risk: 'Healthy' }
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
      const yieldPct = Math.round((reactorPressure / 400) * (1 - reactionTemp / 800) * 100);
      const speedFactor = (reactionTemp / 400) * (catalystPresent ? 5 : 1);

      if (catalystPresent === 0 && reactionTemp < 350) {
        return {
          status: 'danger',
          badge: 'REAKSI MACET / TANPA PRODUKSI',
          title: 'Energi Aktivasi Terlalu Tinggi Tanpa Katalis',
          description: 'Tanpa katalis Fe, ikatan rangkap tiga N≡N sangat sulit putus. Pabrik pupuk tidak menghasilkan molekul NH3.',
          bagianA: 'Reaktor tidak menghasilkan molekul amonia sama sekali. Ikatan kovalen rangkap tiga N≡N yang amat kuat gagal terputus karena energi aktivasi awal yang terlalu besar.',
          bagianB: 'Katalis besi (Fe) berfungsi menyediakan mekanisme rute alternatif dengan Energi Aktivasi (Ea) lebih rendah. Tanpa katalis dan suhu rendah, laju pembentukan NH3 mendekati nol.',
          bagianC: 'Aktifkan Katalis Serbuk Besi (Fe = 1) dan naikkan Suhu Reaksi hingga 450°C untuk memutus ikatan N≡N dengan cepat!',
          metrics: { Yield: `${yieldPct}%`, Speed: 'Macet', AmoniaOutput: '0 Ton' }
        };
      } else if (reactionTemp > 550) {
        return {
          status: 'warning',
          badge: 'AZAS LE CHATELIER BERGESER KIRI',
          title: 'Hasil Kesetimbangan Menguap Kembali',
          description: 'Karena reaksi eksotermik, peningkatan suhu tinggi menggeser reaksi kembali membentuk gas N2 dan H2.',
          bagianA: 'Reaksi berlangsung cepat namun molekul amonia yang terbentuk kembali terurai menjadi gas N2 dan H2. Hasil rendemen pupuk drop drastis.',
          bagianB: 'Berdasarkan Azas Le Chatelier pada reaksi eksotermik (ΔH < 0), peningkatan suhu merangsang reaksi bergeser ke arah endotermik (ke kiri), merusak tingkat kesetimbangan Kp.',
          bagianC: 'Turunkan Suhu Reaksi ke kompromi ideal 450°C dan tingkatkan Tekanan Tabung P hingga 200 - 300 atm untuk mendorong kesetimbangan ke arah pembentukan produk amonia (ke kanan)!',
          metrics: { Yield: `${Math.max(5, yieldPct)}%`, Speed: 'Sangat Cepat', AmoniaOutput: 'Low Yield' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'SINTESIS AMONIA OPTIMAL',
          title: 'Kompromi Tekanan-Suhu Sempurna',
          description: 'Tekanan tinggi perbanyak molekul produk, suhu 450°C + katalis Fe menghasilkan amonia berlimpah!',
          bagianA: 'Pabrik pupuk beroperasi pada kapasitas produksi maksimal! Molekul gas N2 dan H2 bereaksi efektif membentuk amonia NH3 cair berlimpah.',
          bagianB: 'Kompromi Azas Le Chatelier tercapai sempurna: Tekanan tinggi (200 atm) menggeser reaksi ke sisi molekul gas lebih sedikit (2 mol NH3), sementara katalis Fe melompati batas energi aktivasi.',
          bagianC: 'Kondisi reaktor industri berada dalam efisiensi tertinggi. Anda dapat menguji perubahan tekanan untuk melihat pergeseran rendemen produk!',
          metrics: { Yield: `${yieldPct}%`, Speed: 'Optimal', AmoniaOutput: '1,200 Ton/Hari' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa peningkatan tekanan gas menggeser kesetimbangan ke arah kanan pembentukan NH3?', hint: 'Berdasarkan azas Le Chatelier, peningkatan tekanan menggeser kesetimbangan ke sisi dengan jumlah koefisien molekul gas lebih sedikit (4 mol N2+H2 -> 2 mol NH3).' }
    ]
  }
};
