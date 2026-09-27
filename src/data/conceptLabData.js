import { PHYSICS_CHEMISTRY_EXPERIMENTS } from './experimentsDataPart2';
import { BIOLOGY_ECONOMY_INFORMATICS_EXPERIMENTS } from './experimentsDataPart3';
import { FORMULA_TRICKS_DATA } from './formulaTricksData';

export const SUBJECT_CLUSTERS = [
  {
    id: 'math',
    name: 'Matematika',
    subtitle: 'Kalkulus, Matriks, & Geometri Vektor',
    color: 'from-blue-600 to-indigo-600',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    experiments: [
      { id: '1A', title: '1A: Aerospace & Kalkulus Diferensial', desc: 'Trajektori Roket & Kecepatan Lolos Orbit' },
      { id: '1B', title: '1B: Arsitektur Sipil & Kalkulus Integral', desc: 'Distribusi Beban Jembatan Gantung' },
      { id: '1C', title: '1C: Computer Graphics & Matriks', desc: 'Transformasi Matriks 3D Game Engine' }
    ]
  },
  {
    id: 'physics',
    name: 'Fisika',
    subtitle: 'Mekanika, Termodinamika, & Gelombang',
    color: 'from-teal-600 to-emerald-600',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    experiments: [
      { id: '2A', title: '2A: Supercar & Fluid Dynamics', desc: 'Persamaan Bernoulli & Aerodinamika' },
      { id: '2B', title: '2B: Reaktor Energi & Termodinamika', desc: 'Efisiensi Siklus Piston Carnot' },
      { id: '2C', title: '2C: Telekomunikasi 5G & Gelombang EM', desc: 'Resonansi & Atenuasi Dinding' }
    ]
  },
  {
    id: 'chemistry',
    name: 'Kimia',
    subtitle: 'Termokimia, Elektrokimia, & Kinetika Reaksi',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    experiments: [
      { id: '3A', title: '3A: Industri Farmasi & Kinetika', desc: 'Desain Kapsul Obat & Laju Kelarutan' },
      { id: '3B', title: '3B: Baterai Mobil Listrik & Elektrokimia', desc: 'Potensial Sel Volta & Persamaan Nernst' },
      { id: '3C', title: '3C: Pabrik Pupuk & Kesetimbangan', desc: 'Sintesis Amonia Haber-Bosch' }
    ]
  },
  {
    id: 'biology',
    name: 'Biologi & Kesehatan',
    subtitle: 'Genetika, Ekologi, & Sistem Saraf',
    color: 'from-emerald-600 to-teal-700',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    experiments: [
      { id: '4A', title: '4A: Pengendalian Hama & Ekologi', desc: 'Model Dinamika Lotka-Volterra' },
      { id: '4B', title: '4B: Bio-Medis & Impuls Saraf', desc: 'Potensial Aksi & Pompa Na+/K+' },
      { id: '4C', title: '4C: CRISPR & Pewarisan Sifat', desc: 'Hukum Mendel & Peluang Genotipe' }
    ]
  },
  {
    id: 'economy',
    name: 'Ekonomi & Soshum',
    subtitle: 'Elastisitas Pasar, Moneter, & Portofolio',
    color: 'from-indigo-600 to-violet-600',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    experiments: [
      { id: '5A', title: '5A: Pricing E-Commerce & Elastisitas', desc: 'Permintaan & Penawaran (PED)' },
      { id: '5B', title: '5B: Bank Sentral & Inflasi Moneter', desc: 'Kebijakan Suku Bunga BI-Rate' },
      { id: '5C', title: '5C: Manajemen Investasi Portofolio', desc: 'Efficient Frontier Markowitz' }
    ]
  },
  {
    id: 'informatics',
    name: 'Informatika & Logika',
    subtitle: 'Algoritma Graf, Kriptografi, & Neural Network',
    color: 'from-cyan-600 to-blue-700',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    experiments: [
      { id: '6A', title: '6A: Logistik & Algoritma Graf', desc: 'Rute Terpendek Dijkstra / A*' },
      { id: '6B', title: '6B: Keamanan Perbankan & RSA', desc: 'Kriptografi Kunci Publik Prima' },
      { id: '6C', title: '6C: Kecerdasan Buatan (AI)', desc: 'Neural Network & Gradient Descent' }
    ]
  }
];

// Combine 1A-1C with 2A-3C and 4A-6C
export const EXPERIMENTS_DATA = {
  // 1A: Aerospace & Kalkulus Diferensial
  '1A': {
    id: '1A',
    subjectId: 'math',
    subjectName: 'Matematika',
    title: 'Aerospace & Kalkulus Diferensial: Trajektori Roket & Kecepatan Lolos Orbit',
    formula: "f'(t) = \\frac{dv}{dt} = \\frac{F_{dorong} - m(t) \\cdot g - F_{hambat}}{m(t)}",
    story: [
      {
        title: 'Asal-Usul: Dilema Gravitasi Newton (1687)',
        content: 'Isaac Newton menemukan kalkulus diferensial ketika mencoba menjawab pertanyaan: Mengapa apel jatuh ke bumi, tetapi bulan tidak jatuh? Turunan pertama f\'(t) menunjukkan laju perubahan instan kecepatan yang memungkinkan manusia menghitung laju dorong agar objek lolos gravitasi.'
      },
      {
        title: 'Masalah Dunia Nyata: Peluncuran Apollo 11 (1969)',
        content: 'Massa roket terus berkurang saat bahan bakar terbakar m(t). Jika laju pembakaran turunan massa tidak seimbang dengan perubahan dorongan, dorongan awal tidak akan cukup untuk mencapai Kecepatan Lolos Orbit (11.2 km/detik).'
      }
    ],
    industryDomains: [
      { name: 'Industri Kedirgantaraan (SpaceX & NASA)', desc: 'Menghitung waktu ideal pembakaran tingkat ke-2 Falcon 9 agar satelit memasuki orbit geosinkron.' },
      { name: 'Pertahanan Navigasi Rudal Presisi', desc: 'Trajektori dorong balistik terpandu menyesuaikan turunan gaya dorong di atmosfer tipis.' },
      { name: 'Satelit Komunikasi Starlink', desc: 'Pencegahan de-orbit dini menggunakan koreksi vektor dorong halus.' }
    ],
    controls: [
      { id: 'fuelBurnRate', label: 'Laju Bakar Bahan Bakar f\'(t)', min: 50, max: 250, defaultVal: 150, unit: 'kg/s' },
      { id: 'payloadMass', label: 'Massa Payload (Beban)', min: 1000, max: 10000, defaultVal: 4000, unit: 'kg' },
      { id: 'launchAngle', label: 'Sudut Luncur (θ)', min: 30, max: 90, defaultVal: 75, unit: '°' }
    ],
    presets: [
      { name: '🚀 Kasus Ideal (Lolos Orbit)', values: { fuelBurnRate: 180, payloadMass: 3500, launchAngle: 75 } },
      { name: '🔥 Kasus Krisis (Atmosfer Jatuh)', values: { fuelBurnRate: 60, payloadMass: 9000, launchAngle: 45 } },
      { name: '💥 Kasus Ekstrem (Terbakar Atmosfer)', values: { fuelBurnRate: 240, payloadMass: 1500, launchAngle: 30 } }
    ],
    calculateConsequence: ({ fuelBurnRate = 150, payloadMass = 4000, launchAngle = 75 } = {}) => {
      const thrust = fuelBurnRate * 120;
      const weight = (payloadMass + 5000) * 9.8;
      const netAccel = (thrust - weight) / payloadMass;
      const targetSpeed = Math.round(netAccel * 60);
      
      if (netAccel <= 0 || fuelBurnRate < 90) {
        return {
          status: 'danger',
          badge: 'GAGAL JATUH KE BUMI',
          title: 'Roket Kehilangan Gaya Dorong (Gravitasi Dominate)',
          description: 'Turunan pertama laju bakar terlalu rendah dibanding massa payload! Roket gagal mencapai kecepatan lepas dan jatuh bebas ke lautan.',
          bagianA: 'Gaya dorong mesin roket kalah kuat dibanding tarikan gaya gravitasi bumi. Karena bahan bakar lambat terbakar, massa roket tetap berat sehingga percepatan bernilai minus atau nol.',
          bagianB: 'Sesuai Kalkulus Diferensial f\'(t) = dv/dt, jika F_dorong < m·g, percepatan f\'(t) ≤ 0 m/s². Kecepatan instan roket tidak pernah melewati batas Kecepatan Lolos Orbit (11.2 km/s).',
          bagianC: 'Naikkan Laju Bakar f\'(t) ke atas 160 kg/s atau kurangi Massa Payload hingga di bawah 4.000 kg agar percepatan roket bertanda positif (+)!',
          metrics: { Accel: `${netAccel.toFixed(1)} m/s²`, Speed: `${targetSpeed} km/h`, Status: 'Gagal' }
        };
      } else if (launchAngle < 50) {
        return {
          status: 'warning',
          badge: 'TERBAKAR DI ATMOSFER',
          title: 'Sudut Terlalu Landai (Gaya Gesek Geser Ekstrem)',
          description: 'Gaya dorong cukup, tetapi sudut peluncuran terlalu rendah memicu friksi atmosfer tebal yang membakar pelindung panas roket.',
          bagianA: 'Roket meluncur terlalu mendatar sehingga harus menembus lapisan atmosfer tebal dalam jarak lebih panjang. Gesekan molekul udara menghasilkan panas gesekan yang membahayakan badan roket.',
          bagianB: 'Komponen gaya dorong vertikal F·sin(θ) terlalu kecil dibanding komponen horizontal F·cos(θ), menyebabkan trajektori lintasan tetap berada di ketinggian atmosfer padat (Zone 2).',
          bagianC: 'Ubah Sudut Luncur (θ) mendekati 75° agar roket dengan cepat keluar menembus atmosfer tipis menuju ketinggian ruang hampa!',
          metrics: { Accel: `${netAccel.toFixed(1)} m/s²`, Speed: `${targetSpeed} km/h`, Status: 'Overheat' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'BERHASIL MENCAPAI ORBIT',
          title: 'Berhasil Masuk Orbit Bumi Rendah (LEO)',
          description: 'Kombinasi laju bakar f\'(t), massa payload, dan sudut luncur tepat seimbang! Satelit berhasil mengorbit pada kecepatan presisi.',
          bagianA: 'Laju pembakaran bahan bakar menghasilkan dorongan yang melesatkan roket melewati gaya tarik bumi tanpa overheating berlebihan. Satelit masuk ke orbit dengan mulus!',
          bagianB: 'Percepatan f\'(t) konstan positif dan sudut luncur optimal memenuhi persamaan gaya sentripetal v²/r = g, menjaga roket melingkari bumi secara stabil.',
          bagianC: 'Eksperimen berada dalam kondisi paling optimal. Anda bisa mencoba mengubah massa payload untuk melihat fleksibilitas margin keamanan roket!',
          metrics: { Accel: `${netAccel.toFixed(1)} m/s²`, Speed: `${targetSpeed} km/h`, Status: 'Orbit Stable' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Apa yang terjadi pada turunan laju percepatan saat bahan bakar berkurang drastis?', hint: 'Ingat hukum Newton F = m·a, di mana m terus mengecil sehingga percepatan a melesat naik!' },
      { q: 'Mengapa peluncuran roket tidak pernah dibuat tegak lurus 90 derajat secara terus-menerus?', hint: 'Karena roket membutuhkan kecepatan tangensial mendatar untuk melingkari bumi agar tidak jatuh kembali.' }
    ]
  },

  // 1B: Civil Architecture & Integral Calculus
  '1B': {
    id: '1B',
    subjectId: 'math',
    subjectName: 'Matematika',
    title: 'Arsitektur Sipil & Kalkulus Integral: Distribusi Beban Jembatan Gantung',
    formula: "M = \\int_0^L w(x) \\cdot (L - x) \\, dx, \\quad y(x) = \\frac{w_0}{2T_0} x^2",
    story: [
      {
        title: 'Asal-Usul: Tragedi Jembatan Tacoma Narrows (1940)',
        content: 'Kegagalan jembatan gantung pertama mengajarkan bahwa perhitungan beban tidak cukup hanya aritmatika biasa. Kalkulus integral akumulasi momen gaya ∫w(x)dx diperlukan untuk menghitung total tegangan kabel baja kurva katenari.'
      },
      {
        title: 'Masalah Dunia Nyata: Jembatan Golden Gate & Suramadu',
        content: 'Beban lalu lintas tidak merata di seluruh panjang span (L). Integral memungkinkan insinyur menjumlahkan ketebalan kabel di titik-titik kritis agar tidak terjadi fatigue material.'
      }
    ],
    industryDomains: [
      { name: 'Arsitektur & Teknik Sipil Megastruktur', desc: 'Perancangan jembatan gantung, gedung pencakar langit resisten gempa.' },
      { name: 'Manufaktur Kabel Baja Tugas Berat', desc: 'Uji batas lentur kabel suspensi dan pasak angkur.' },
      { name: 'Audit Keamanan Infrastruktur Publik', desc: 'Pemantauan sensor regangan digital berbasis integral beban.' }
    ],
    controls: [
      { id: 'archSpan', label: 'Rentang Lengkungan Parabola (m)', min: 100, max: 1000, defaultVal: 500, unit: 'm' },
      { id: 'cableThickness', label: 'Ketebalan Kabel Baja', min: 10, max: 100, defaultVal: 45, unit: 'cm' },
      { id: 'trafficLoad', label: 'Beban Lalu Lintas Khusus', min: 50, max: 500, defaultVal: 200, unit: 'ton/m' }
    ],
    presets: [
      { name: '🌉 Kasus Standar Aman', values: { archSpan: 500, cableThickness: 50, trafficLoad: 180 } },
      { name: '💥 Kasus Kolaps Kabel Putus', values: { archSpan: 850, cableThickness: 20, trafficLoad: 420 } },
      { name: '🛡️ Kasus Arsitektur Super Kokoh', values: { archSpan: 300, cableThickness: 80, trafficLoad: 150 } }
    ],
    calculateConsequence: ({ archSpan = 500, cableThickness = 45, trafficLoad = 200 } = {}) => {
      const integralMoment = (trafficLoad * Math.pow(archSpan, 2)) / (8 * (cableThickness * 10));
      const safetyRatio = (cableThickness * 150) / (integralMoment + 1);

      if (safetyRatio < 0.8) {
        return {
          status: 'danger',
          badge: 'STRUKTUR JEMBATAN RETAK / PUTUS',
          title: 'Integral Momen Gaya Melebihi Threshold Baja',
          description: 'Akumulasi beban total ∫w(x)dx jauh melampaui kekuatan kabel baja. Struktur kabel jembatan memerah dan patah di bagian tengah span!',
          bagianA: 'Beban berat kendaraan terkumpul di tengah jembatan sementara kabel penopang terlalu tipis. Akumulasi momen gaya memutus ikatan kabel baja utama!',
          bagianB: 'Integrasi M = ∫ w(x)·(L-x) dx menghasilkan momen bending kuadratik terhadap panjang span L². Kenaikan panjang jembatan melipatgandakan beban secara eksponensial.',
          bagianC: 'Tebalkan Kabel Baja menjadi di atas 60 cm atau persingkat rentang span (L) agar rasio keamanan jembatan kembali di atas 1.3!',
          metrics: { SafetyRatio: safetyRatio.toFixed(2), MaxStress: `${Math.round(integralMoment)} MPa`, State: 'Broke' }
        };
      } else if (safetyRatio < 1.3) {
        return {
          status: 'warning',
          badge: 'REGANGAN KABEL TINGGI',
          title: 'Beban Mendekati Batas Elastisitas',
          description: 'Jembatan masih berdiri namun mengalami micro-crack berbahaya jika angin kencang menerpa.',
          bagianA: 'Kabel jembatan tertarik sangat kencang mendekati batas regangan maksimalnya. Keretakan kecil (micro-crack) mulai terjadi di area gantungan tengah.',
          bagianB: 'Tegangan katenari y(x) = (w0 / 2T0) x² menunjukkan bahwa kelengkungan kabel berada di ambang deformasi plastis material baja.',
          bagianC: 'Kurangi Batas Beban Lalu Lintas (trafficLoad) atau tambahkan kabel pendukung sekunder untuk membagi akumulasi integral momen.',
          metrics: { SafetyRatio: safetyRatio.toFixed(2), MaxStress: `${Math.round(integralMoment)} MPa`, State: 'Warning' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'STRUKTUR OPTIMAL AMAN',
          title: 'Distribusi Beban Integral Sangat Seimbang',
          description: 'Lengkungan kurva katenari dan ketebalan kabel mampu menahan lonjakan beban kendaraan berat secara ideal.',
          bagianA: 'Seluruh beban truk dan mobil di atas jembatan berhasil disalurkan secara merata oleh kurva kabel baja ke dua tiang penyangga utama.',
          bagianB: 'Hasil integrasi momen gaya ∫w(x)dx menghasilkan angka tegangan yang jauh di bawah batas luluh (yield strength) baja suspensi.',
          bagianC: 'Kondisi struktur sangat ideal dan mampu menahan gempa serta terpaan angin kencang secara sempurna!',
          metrics: { SafetyRatio: safetyRatio.toFixed(2), MaxStress: `${Math.round(integralMoment)} MPa`, State: 'Safe' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa bentuk kabel jembatan gantung membentuk parabola katenari dan bukan garis lurus segitiga?', hint: 'Karena integral distribusi beban merata menyebabkan kurva alami yang meminimalkan tegangan geser.' }
    ]
  },

  // 1C: Matrix Transformations & Game Engine
  '1C': {
    id: '1C',
    subjectId: 'math',
    subjectName: 'Matematika',
    title: 'Computer Graphics & Matriks: Transformasi 3D Game Engine',
    formula: "\\begin{bmatrix} x' \\\\ y' \\\\ z' \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta & 0 & t_x \\\\ \\sin\\theta & \\cos\\theta & 0 & t_y \\\\ 0 & 0 & 1 & t_z \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\\\ 1 \\end{bmatrix}",
    story: [
      {
        title: 'Asal-Usul: Aljabar Linier Arthur Cayley (1857)',
        content: 'Matriks diciptakan sebagai alat ringkas untuk menyelesaikan persamaan simultan. 140 tahun kemudian, matriks menjadi tulang punggung dari seluruh industri grafik komputer dan kecerdasan buatan.'
      },
      {
        title: 'Masalah Dunia Nyata: 60 FPS pada GPU Nvidia & Unreal Engine',
        content: 'Setiap piksel karakter game 3D (seperti PUBG/Genshin) memiliki ribuan koordinat titik (x,y,z). Matriks transformasi perkalian linier memungkinkan jutaan titik diputar dan diperbesar simultan hanya dalam 0.016 detik.'
      }
    ],
    industryDomains: [
      { name: 'Pengembangan Game (Unreal & Unity Engine)', desc: 'Kalkulasi rotasi kamera yaw/pitch/roll dan efek kamera cinematic.' },
      { name: 'Kamera Robotik & Mobil Otonom Tesla', desc: 'Transformasi koordinat kamera 2D menjadi peta rintangan 3D.' },
      { name: 'VFX Film Animasi Pixar & Marvel', desc: 'Rendering karakter rigging 3D dinamis.' }
    ],
    controls: [
      { id: 'rotationAngle', label: 'Rotasi Sudut (Yaw θ)', min: 0, max: 360, defaultVal: 45, unit: '°' },
      { id: 'scale3d', label: 'Skala Vektor 3D (S)', min: 0.2, max: 3, defaultVal: 1, unit: 'x' },
      { id: 'translateX', label: 'Translasi Posisi X', min: -50, max: 50, defaultVal: 10, unit: 'px' }
    ],
    presets: [
      { name: '🎮 Kasus Isometric View', values: { rotationAngle: 45, scale3d: 1, translateX: 0 } },
      { name: '🔍 Kasus Zoom In Distorsi', values: { rotationAngle: 180, scale3d: 2.5, translateX: 30 } },
      { name: '⚠️ Kasus Glitch Skala Nol', values: { rotationAngle: 90, scale3d: 0.2, translateX: -40 } }
    ],
    calculateConsequence: ({ rotationAngle = 45, scale3d = 1.0, translateX = 10 } = {}) => {
      if (scale3d < 0.3) {
        return {
          status: 'warning',
          badge: 'GLITCH SKALA SINGULAR',
          title: 'Determinan Matriks Mendekati Singular',
          description: 'Skala vektor terlalu kecil membuat koordinat piksel mengalami clipping rendering pada viewport 3D.',
          bagianA: 'Karakter 3D menguncup menjadi sangat tipis hingga tampak gepeng atau menghilang dari layar permainan.',
          bagianB: 'Determinan matriks skala det(M) = S³ mendekati angka 0. Dalam aljabar linier, matriks dengan determinan 0 tidak memiliki invers dan kehilangan informasi ruang 3D.',
          bagianC: 'Naikkan Skala Vektor 3D (S) di atas 0.8x untuk mengembalikan determinan matriks ke nilai stabil!',
          metrics: { Det: scale3d.toFixed(2), FPS: '60 FPS', Status: 'Clipping' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'RENDER 60 FPS PRESISI',
          title: 'Transformasi Matriks Linear Sempurna',
          description: 'Perkalian matriks rotasi R(θ) dan translasi T berhasil merender posisi karakter 3D tanpa deformasi tekstur.',
          bagianA: 'Objek 3D berputar dan bergeser secara mulus di layar layar tanpa ada tekstur yang pecah atau terdistorsi.',
          bagianB: 'Perkalian vektor titik V\' = M · V memetakan setiap simpul (vertex) objek ke layar 2D monitor dengan transformasi linier persis.',
          bagianC: 'Transformasi matriks berada di kondisi sempurna. Cobalah memutar sudut rotasi θ untuk melihat animasi 3D real-time!',
          metrics: { Det: scale3d.toFixed(2), FPS: '60 FPS', Status: 'Rendered' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa industri game menggunakan matriks 4x4 homogen bukannya matriks 3x3 untuk koordinat 3D?', hint: 'Karena matriks 3x3 hanya bisa menangani rotasi dan skala, sedangkan matriks 4x4 bisa menangani translasi (pergeseran) sekaligus!' }
    ]
  },

  ...PHYSICS_CHEMISTRY_EXPERIMENTS,
  ...BIOLOGY_ECONOMY_INFORMATICS_EXPERIMENTS
};

// Attach Formula Tricks Data to all experiments dynamically
Object.keys(EXPERIMENTS_DATA).forEach((id) => {
  if (FORMULA_TRICKS_DATA[id]) {
    EXPERIMENTS_DATA[id].formulaTricks = FORMULA_TRICKS_DATA[id];
  }
});
