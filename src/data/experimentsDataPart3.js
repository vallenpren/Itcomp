// Experiments Data Part 3: BIOLOGI (4A, 4B, 4C), EKONOMI (5A, 5B, 5C), & INFORMATIKA (6A, 6B, 6C)

export const BIOLOGY_ECONOMY_INFORMATICS_EXPERIMENTS = {
  // 4A: Forest Pest Control & Lotka-Volterra
  '4A': {
    id: '4A',
    subjectId: 'biology',
    subjectName: 'Biologi & Kesehatan',
    title: 'Pengendalian Hama Hutan & Ekologi: Model Dinamika Populasi Lotka-Volterra',
    formula: "\\frac{dx}{dt} = \\alpha x - \\beta x y, \\quad \\frac{dy}{dt} = \\delta x y - \\gamma y",
    story: [
      {
        title: 'Asal-Usul: Pemodelan Alfred Lotka & Vito Volterra (1925)',
        content: 'Volterra meneliti mengapa populasi ikan pemangsa berfluktuasi tajam di Laut Adria selama Perang Dunia I. Ia merumuskan diferensial interaksi mangsa (x) dan pemangsa (y).'
      },
      {
        title: 'Masalah Dunia Nyata: Keseimbangan Ekosistem Pertanian',
        content: 'Jika petani menyemprot pestisida berlebih membunuh semua elang/burung hantu, populasi tikus meledak dan menghancurkan seluruh panen padi nasional.'
      }
    ],
    industryDomains: [
      { name: 'Kementerian Kehutanan & Lingkungan', desc: 'Konservasi satwa langka dan pencegahan hama belalang.' },
      { name: 'Agribisnis Kelapa Sawit & Pangan', desc: 'Pengendalian hama biologis (biological pest control).' },
      { name: 'Epidemiologi Kesehatan Masyarakat', desc: 'Pemodelan penyebaran nyamuk demam berdarah.' }
    ],
    controls: [
      { id: 'predatorPop', label: 'Populasi Awal Predator (Elang/Ular)', min: 5, max: 100, defaultVal: 30, unit: 'ekor' },
      { id: 'preyPop', label: 'Populasi Mangsa (Tikus/Hama)', min: 100, max: 2000, defaultVal: 800, unit: 'ekor' },
      { id: 'foodResource', label: 'Ketersediaan Pangan Tanaman', min: 10, max: 100, defaultVal: 70, unit: '%' }
    ],
    presets: [
      { name: '🌿 Kasus Ekosistem Seimbang', values: { predatorPop: 30, preyPop: 800, foodResource: 70 } },
      { name: '💀 Kasus Predator Terlalu Dominan', values: { predatorPop: 90, preyPop: 200, foodResource: 50 } },
      { name: '🌾 Kasus Ledakan Hama (Pestisida)', values: { predatorPop: 5, preyPop: 1800, foodResource: 95 } }
    ],
    calculateConsequence: ({ predatorPop, preyPop, foodResource }) => {
      const ratio = preyPop / (predatorPop * 15 + 1);

      if (predatorPop > 75 && preyPop < 300) {
        return {
          status: 'danger',
          badge: 'EXTINCTION CYCLE / KEPUNAHAN GANDA',
          title: 'Predator Memangsa Seluruh Hama Sampai Habis',
          description: 'Predator yang terlalu banyak memusnahkan mangsa secara total, lalu disusuli kepunahan predator itu sendiri karena kelaparan!',
          bagianA: 'Populasi predator yang terlalu dominan mengonsumsi seluruh mangsa hingga habis. Ketika ketersediaan mangsa jatuh ke nol, populasi predator mengalami krisis pangan masif dan punah secara massal.',
          bagianB: 'Menurut Persamaan Lotka-Volterra dx/dt = αx - βxy, ketika populasi predator y sangat besar, laju kematian mangsa βxy melampaui laju perkembangbiakan αx sehingga x mendadak menyusut ke titik 0.',
          bagianC: 'Kurangi Populasi Predator ke batas aman (20 - 40 ekor) dan tingkatkan Ketersediaan Pangan Rumput agar daya dukung lingkungan (Carrying Capacity K) tetap terjaga!',
          metrics: { Ratio: ratio.toFixed(2), Ecosystem: 'Collapsed', PredatorState: 'Starving' }
        };
      } else if (predatorPop < 10 && preyPop > 1200) {
        return {
          status: 'warning',
          badge: 'LEDAKAN HAMA PERTANIAN',
          title: 'Hilangnya Predator Alami Memicu Wabah Hama',
          description: 'Populasi mangsa melampaui daya dukung lingkungan (carrying capacity), menghancurkan seluruh vegetasi pertanian.',
          bagianA: 'Ekosistem kehilangan pemangsa alami. Populasi mangsa/tikus melonjak tanpa kendali, mengosongkan seluruh cadangan makanan vegetasi pertanian.',
          bagianB: 'Hilangnya faktor pembatas dy/dt = δxy - γy menyebabkan pertumbuhan mangsa menjadi eksponensial tak terbatas (J-curve), melampaui ambang batas kestabilan ekologi.',
          bagianC: 'Lepaskan Predator Alami di kisaran 30 ekor untuk mengembalikan mekanisme kontrol biologis (Biological Pest Control) secara alami!',
          metrics: { Ratio: ratio.toFixed(2), Ecosystem: 'Outbreak', PredatorState: 'Extinct' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'FLUKTUASI EKOLOGI SEIMBANG',
          title: 'Siklus Rantai Makanan Lotka-Volterra Harmonism',
          description: 'Grafik populasi mangsa dan pemangsa membentuk gelombang sinus konstan yang menjaga keseimbangan hayati.',
          bagianA: 'Rantai makanan beroperasi dalam siklus alami yang harmonis. Puncak populasi mangsa akan disusul kenaikan predator, yang kemudian menekan kembali populasi mangsa secara teratur.',
          bagianB: 'Model Lotka-Volterra berada pada lintasan siklus tertutup (Phase Orbit) di mana turunan dx/dt dan dy/dt berada pada titik kesetimbangan dinamis.',
          bagianC: 'Ekosistem padang rumput berada dalam kondisi sangat sehat. Anda dapat menguji perubahan daya dukung pangan untuk mengamati respon siklus populasi!',
          metrics: { Ratio: ratio.toFixed(2), Ecosystem: 'Balanced', PredatorState: 'Stable' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa puncak populasi predator selalu terjadi sedikit tertinggal setelah puncak populasi mangsa?', hint: 'Karena butuh waktu bagi predator untuk berkembang biak menyusul melimpahnya makanan!' }
    ]
  },

  // 4B: Bio-Med Tech & Action Potential
  '4B': {
    id: '4B',
    subjectId: 'biology',
    subjectName: 'Biologi & Kesehatan',
    title: 'Teknologi Bio-Medis & Impuls Saraf: Potensial Aksi & Pompa Na+/K+',
    formula: "V_m = \\frac{RT}{F} \\ln \\left( \\frac{P_{K}[K]_o + P_{Na}[Na]_o}{P_{K}[K]_i + P_{Na}[Na]_i} \\right)",
    story: [
      {
        title: 'Asal-Usul: Penemuan Hodgkin & Huxley (1952)',
        content: 'Alan Hodgkin dan Andrew Huxley memenangkan Hadiah Nobel setelah meneliti impuls listrik pada akson cumi-cumi raksasa. Mereka membuktikan bahwa pikiran dan gerakan manusia dikendalikan oleh voltase listrik mikro pompa Na+/K+.'
      },
      {
        title: 'Masalah Dunia Nyata: Penyakit Multiple Sclerosis & Anestesi Lokal',
        content: 'Bagaimana obat bius suntik gigi memblokir rasa sakit? Obat bius menyumbat saluran Natrium sehingga voltase sinyal sakit tidak sampai ke otak.'
      }
    ],
    industryDomains: [
      { name: 'Industri Peralatan Medis ECG & EEG', desc: 'Pemantauan gelombang listrik jantung dan otak.' },
      { name: 'Pengembangan Neuroteknologi Neuralink', desc: 'Antarmuka otak-komputer (Brain-Computer Interface).' },
      { name: 'Farmasi Anestesi & Obat Penenang', desc: 'Penghambat transmisi impuls saraf sinaptik.' }
    ],
    controls: [
      { id: 'sodiumConc', label: 'Konsentrasi Ion Natrium Na+', min: 10, max: 150, defaultVal: 120, unit: 'mM' },
      { id: 'myelinSheath', label: 'Ketebalan Lapisan Mielin', min: 0, max: 10, defaultVal: 8, unit: 'μm' },
      { id: 'stimulusVoltage', label: 'Stimulus Voltase Masukan', min: -70, max: 40, defaultVal: 15, unit: 'mV' }
    ],
    presets: [
      { name: '⚡ Kasus Transmisi Saltatori Cepat', values: { sodiumConc: 120, myelinSheath: 9, stimulusVoltage: 20 } },
      { name: '🐌 Kasus Mielin Rusak (Multiple Sclerosis)', values: { sodiumConc: 100, myelinSheath: 1, stimulusVoltage: 15 } },
      { name: '💉 Kasus Bius Lokal Blocked', values: { sodiumConc: 15, myelinSheath: 7, stimulusVoltage: 10 } }
    ],
    calculateConsequence: ({ sodiumConc, myelinSheath, stimulusVoltage }) => {
      const speed = Math.round((myelinSheath * 12) + (sodiumConc / 10));
      const peakVoltage = stimulusVoltage > 10 ? 30 : -70;

      if (sodiumConc < 30) {
        return {
          status: 'danger',
          badge: 'IMPULS TERBLOKIR / ANESTESI',
          title: 'Depolarisasi Membran Gagal Terjadi',
          description: 'Konsentrasi ion Natrium luar terlalu rendah. Voltase tidak dapat menembus ambang batas (threshold -55mV) sehingga sinyal saraf terputus.',
          bagianA: 'Konsentrasi ion Na+ ekstraseluler tidak mencukupi untuk memicu masuknya muatan positif ke dalam akson. Impuls sinyal sakit/gerak terhenti total sebelum sampai ke otak.',
          bagianB: 'Persamaan Nernst/Goldman membuktikan tanpa gradien konsentrasi [Na+]_o yang cukup, voltase membran gagal melewati ambang depolarisasi -55 mV untuk membuka Voltage-Gated Sodium Channels.',
          bagianC: 'Naiikkan Konsentrasi Ion Na+ di atas 80 mM untuk mengembalikan fungsi penghantaran sinyal listrik saraf secara normal!',
          metrics: { Speed: '0 m/s', PeakVolt: '-70 mV', Conduction: 'Blocked' }
        };
      } else if (myelinSheath < 3) {
        return {
          status: 'warning',
          badge: 'SANGAT LAMBAT / DE-MYELINATED',
          title: 'Kebocoran Listrik Saraf Tanpa Mielin',
          description: 'Lapisan isolator mielin terdegradasi. Impuls tidak bisa melompat (konduksi saltatori) di Nodus Ranvier.',
          bagianA: 'Mielin yang tipis/rusak menyebabkan muatan listrik bocor keluar menembus membran akson. Kecepatan hantar saraf drop dari 120 m/s menjadi di bawah 10 m/s (gejala Multiple Sclerosis).',
          bagianB: 'Tanpa isolasi mielin, hambatan membran Rm turun drastis sehingga konstanta jarak λ menyusut. Sinyal harus merambat titik-demi-titik tanpa loncatan saltatori.',
          bagianC: 'Tingkatkan Ketebalan Lapisan Mielin di atas 6 μm untuk mengaktifkan loncatan saltatori antar Nodus Ranvier!',
          metrics: { Speed: `${speed} m/s`, PeakVolt: `${peakVoltage} mV`, Conduction: 'Slow' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'TRANSMISI IMPULS PRESISI',
          title: 'Konduksi Saltatori Super Cepat',
          description: 'Pompa Na+/K+ ATP-ase dan lapisan mielin bekerja sempurna mengirimkan impuls saraf secepat 120 meter/detik!',
          bagianA: 'Saraf menghantarkan sinyal refleks dengan kecepatan luar biasa tinggi. Arus depolarisasi melompat efisien dari satu Nodus Ranvier ke Nodus Ranvier berikutnya.',
          bagianB: 'Gradien ionik Na+/K+ dan resistansi isolasi mielin tinggi memaksa impuls meloncat (Saltatory Conduction) dengan efisiensi energi ATP maksimum.',
          bagianC: 'Transmisi impuls saraf berada pada kondisi kesehatan puncak. Anda bisa menguji efek bius lokal dengan menurunkan konsentrasi ion Natrium.',
          metrics: { Speed: `${speed} m/s`, PeakVolt: `${peakVoltage} mV`, Conduction: 'Saltatory Fast' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa lapisan mielin membuat aliran listrik saraf jauh lebih cepat?', hint: 'Mielin bertindak seperti isolator kabel listrik yang memaksa ion meloncat dari nodus ke nodus (konduksi saltatori).' }
    ]
  },

  // 4C: CRISPR Biotech & Mendel Genetics
  '4C': {
    id: '4C',
    subjectId: 'biology',
    subjectName: 'Biologi & Kesehatan',
    title: 'Bioteknologi CRISPR & Pewarisan Sifat: Hukum Mendel & Peluang Genotipe',
    formula: "p^2 + 2pq + q^2 = 1, \\quad P(Aa) = 2 \\cdot p \\cdot q",
    story: [
      {
        title: 'Asal-Usul: Eksperimen Kacang Ercis Gregor Mendel (1866)',
        content: 'Mendel meletakkan dasar genetika modern dengan menghitung rasio persilangan 3:1. Di era bioteknologi modern, prinsip Hardy-Weinberg dan CRISPR Cas-9 digunakan untuk mengedit alel pembawa penyakit genetis.'
      },
      {
        title: 'Masalah Dunia Nyata: Eliminasi Penyakit Anemia Sel Sabit & Thalassemia',
        content: 'Berapa persen peluang keturunan F2 menderita penyakit resesif jika kedua orang tua adalah pembawa sifat (carrier)?'
      }
    ],
    industryDomains: [
      { name: 'Bioteknologi Rekayasa Genetik (Editas Medicine)', desc: 'Pengeditan gen tanaman tahan kering & terapi gen manusia.' },
      { name: 'Pengembangbiakan Ternak Unggul (Breeding)', desc: 'Seleksi keturunan unggul varietas padi & sapi perah.' },
      { name: 'Konseling Genetik Pernikahan Medis', desc: 'Skrining risiko penyakit keturunan resesif autosom.' }
    ],
    controls: [
      { id: 'dominantFreqP', label: 'Frekuensi Alel Dominan (p)', min: 0.1, max: 0.9, defaultVal: 0.7, unit: 'freq' },
      { id: 'naturalSelection', label: 'Tekanan Seleksi Alam', min: 0, max: 100, defaultVal: 20, unit: '%' },
      { id: 'generations', label: 'Jumlah Generasi (F1 - F5)', min: 1, max: 5, defaultVal: 3, unit: 'gen' }
    ],
    presets: [
      { name: '🧬 Kasus Kesetimbangan Hardy-Weinberg', values: { dominantFreqP: 0.7, naturalSelection: 0, generations: 3 } },
      { name: '✂️ Kasus CRISPR Editing Success', values: { dominantFreqP: 0.9, naturalSelection: 10, generations: 5 } },
      { name: '⚠️ Kasus Mutasi Dominan Tertekan', values: { dominantFreqP: 0.2, naturalSelection: 80, generations: 4 } }
    ],
    calculateConsequence: ({ dominantFreqP, naturalSelection, generations }) => {
      const q = 1 - dominantFreqP;
      const p2 = Math.round(Math.pow(dominantFreqP, 2) * 100);
      const pq2 = Math.round(2 * dominantFreqP * q * 100);
      const q2 = 100 - p2 - pq2;

      if (q2 > 35) {
        return {
          status: 'danger',
          badge: 'RISIKO FENOTIPE HOMOZIGOT RESESIF TINGGI',
          title: 'Frekuensi Alel Pembawa Sifat Penyakit Tinggi',
          description: `Tanpa seleksi atau pengeditan genetik CRISPR, ${q2}% keturunan generasi F${generations} berisiko mengekspresikan penyakit resesif.`,
          bagianA: 'Frekuensi alel mutasi resesif q di dalam populasi terlalu dominan. Persentase keturunan bergenotipe homozigot resesif (aa) membengkak, memicu manifestasi penyakit genetik.',
          bagianB: 'Sesuai Hukum Hardy-Weinberg p² + 2pq + q² = 1, saat frekuensi p rendah (p < 0.4), proporsi q² = (1-p)² melonjak secara kuadratik melebihi ambang batas toleransi populasi.',
          bagianC: 'Gunakan terapi rekayasa genetik CRISPR Cas-9 untuk memperbaiki alel resesif atau tingkatkan frekuensi alel dominan p di atas 0.7!',
          metrics: { AA: `${p2}%`, Aa: `${pq2}%`, aa: `${q2}%` }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'VARIASI GENETIK SEHAT OPTIMAL',
          title: 'Distribusi Genotipe Terkontrol Sempurna',
          description: `Kombinasi alel dominan dan perbaikan CRISPR mempertahankan ${p2}% dominan sehat dengan persentase fenotipe unggul.`,
          bagianA: 'Populasi memiliki ketahanan genetik yang sangat baik. Sebagian besar individu mengekspresikan fenotipe unggul dominan, sedangkan alel resesif tetap berada pada ambang aman.',
          bagianB: 'Hukum Segregasi Bebas Mendel dan kesetimbangan alel p & q terdistribusi secara seimbang sesuai ekspansi polinomial kuadrat (p + q)²',
          bagianC: 'Kombinasi genetik berada pada titik paling ideal! Anda dapat mensimulasikan persilangan generasi berikutnya F1 - F5.',
          metrics: { AA: `${p2}%`, Aa: `${pq2}%`, aa: `${q2}%` }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa individu pembawa sifat (carrier Aa) tidak menunjukkan gejala sakit?', hint: 'Karena satu alel dominan A sudah cukup memproduksi protein fungsional untuk menutupi cacat alel a.' }
    ]
  },

  // 5A: E-Commerce Pricing & PED Elasticity
  '5A': {
    id: '5A',
    subjectId: 'economy',
    subjectName: 'Ekonomi & Soshum',
    title: 'Strategi Penetapan Harga E-Commerce & Elastisitas Harga Permintaan (PED)',
    formula: "E_p = \\frac{\\% \\Delta Q}{\\% \\Delta P} = \\frac{dQ}{dP} \\cdot \\frac{P}{Q}, \\quad TR = P \\cdot Q",
    story: [
      {
        title: 'Asal-Usul: Teori Elastisitas Alfred Marshall (1890)',
        content: 'Marshall merumuskan bahwa pembeli bereaksi berbeda terhadap perubahan harga. Ada barang yang jika harganya naik 10% pembelinya kabur 50% (elastis), dan ada barang yang naik 50% pembelinya tetap membeli (inelastis).'
      },
      {
        title: 'Masalah Dunia Nyata: Algoritma Dynamic Pricing Tokopedia & Amazon',
        content: 'Kapan e-commerce harus memberi diskon flash sale untuk memaksimalkan Total Revenue (TR), dan kapan menaikkan harga tanpa kehilangan pembeli?'
      }
    ],
    industryDomains: [
      { name: 'Platform E-Commerce & Marketplace', desc: 'Algoritma flash sale dan rekomendasi harga optimal produk.' },
      { name: 'Maskapai Penerbangan & Transportasi Ride-Hailing', desc: 'Dynamic surge pricing tiket saat jam sibuk.' },
      { name: 'Strategi Ritel Fast-Moving Consumer Goods', desc: 'Analisis kepekaan konsumen terhadap kenaikan BBM/Pajak.' }
    ],
    controls: [
      { id: 'priceRp', label: 'Harga Jual Produk (Rp)', min: 10000, max: 200000, defaultVal: 50000, unit: 'Rp' },
      { id: 'consumerIncome', label: 'Indeks Pendapatan Konsumen', min: 50, max: 200, defaultVal: 100, unit: 'index' },
      { id: 'competitorPrice', label: 'Harga Produk Kompetitor', min: 10000, max: 200000, defaultVal: 45000, unit: 'Rp' }
    ],
    presets: [
      { name: '💰 Kasus Revenue Maksimum (Optimal)', values: { priceRp: 50000, consumerIncome: 100, competitorPrice: 55000 } },
      { name: '📉 Kasus Overpriced Pembeli Kabur', values: { priceRp: 150000, consumerIncome: 90, competitorPrice: 40000 } },
      { name: '🏷️ Kasus Diskon Hancur Harga', values: { priceRp: 12000, consumerIncome: 110, competitorPrice: 50000 } }
    ],
    calculateConsequence: ({ priceRp, consumerIncome, competitorPrice }) => {
      const baseDemand = 1000 * (consumerIncome / 100);
      const priceRatio = priceRp / competitorPrice;
      const quantity = Math.max(50, Math.round(baseDemand / Math.pow(priceRatio, 2)));
      const totalRevenue = priceRp * quantity;
      const ped = Math.abs((1 - quantity / baseDemand) / (1 - priceRatio));

      if (priceRatio > 2.5) {
        return {
          status: 'danger',
          badge: 'PEMBELI KABUR / ELASTIS EKSTREM',
          title: 'Harga Terlalu Mahal Dibanding Kompetitor',
          description: 'Konsentrasi pembeli beralih total ke barang substitusi. Total Revenue anjlok drastis!',
          bagianA: 'Harga produk dipatok terlalu tinggi dibanding produk pesaing. Konsumen secara masif beralih ke toko sebelah yang menawarkan fungsi serupa dengan harga jauh lebih rasional.',
          bagianB: 'Nilai Elastisitas Harga Permintaan PED |Ep| > 1 menunjukkan barang bersifat elastis. Kenaikan harga %ΔP memicu penurunan jumlah unit yang diminta %ΔQ dalam persentase yang jauh lebih besar.',
          bagianC: 'Turunkan Harga Jual ke kisaran Rp 450.000 - Rp 550.000 untuk menemukan titik keseimbangan optimum yang memaksimalkan Total Revenue (P x Q)!',
          metrics: { PED: ped.toFixed(2), Quantity: `${quantity} pcs`, Revenue: `Rp ${(totalRevenue / 1000000).toFixed(1)}Jt` }
        };
      } else if (priceRp < competitorPrice * 0.4) {
        return {
          status: 'warning',
          badge: 'MARGIN UNTUNG NIPIS',
          title: 'Perang Harga Terlalu Murah',
          description: 'Barang laku keras namun Total Revenue tidak menutup biaya operasional dan iklan.',
          bagianA: 'Toko mengalami kelangkaan stok barang (shortage) karena harga terlalu murah. Walau kuantitas terjual sangat tinggi, margin profit per unit sangat tipis.',
          bagianB: 'Penetapan harga jauh di bawah harga ekuilibrium pasar menyebabkan kerugian potensi pendapatan (Producer Surplus Loss) akibat marjin yang tak mampu menutup Fixed Cost.',
          bagianC: 'Naikkan harga secara bertahap menuju harga pesaing untuk mengamankan margin keuntungan yang sehat!',
          metrics: { PED: ped.toFixed(2), Quantity: `${quantity} pcs`, Revenue: `Rp ${(totalRevenue / 1000000).toFixed(1)}Jt` }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'TOTAL REVENUE MAKSIMAL',
          title: 'Titik Ekuilibrium Harga Optimal',
          description: 'Poin harga pas pada kurva elastisitas unitari memaksimalkan omset keuntungan e-commerce.',
          bagianA: 'Produk berada pada titik manis pendapatan tertinggi. Kenaikan marjin keuntungan per unit seimbang sempurna dengan jumlah permintaan keranjang belanja pembeli.',
          bagianB: 'Elastisitas berada pada titik Unitari (Ep = -1), di mana turunan pertama fungsi Total Revenue d(TR)/dP = 0 mencapai titik puncak matematis (Revenue Maximization).',
          bagianC: 'Strategi harga toko online Anda sangat presisi! Uji harga toko pesaing untuk mengamati pergeseran kurva permintaan.',
          metrics: { PED: ped.toFixed(2), Quantity: `${quantity} pcs`, Revenue: `Rp ${(totalRevenue / 1000000).toFixed(1)}Jt` }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa menaikkan harga pada barang ber-PED elastis (>1) justru meruntuhkan total pendapatan perusahaan?', hint: 'Karena persentase penurunan jumlah unit barang yang dibeli jauh lebih besar daripada persentase kenaikan harganya!' }
    ]
  },

  // 5B: Central Bank & Monetary Policy
  '5B': {
    id: '5B',
    subjectId: 'economy',
    subjectName: 'Ekonomi & Soshum',
    title: 'Bank Sentral & Pengendalian Inflasi: Kebijakan Moneter & Suku Bunga BI-Rate',
    formula: "MV = PY, \\quad i = r + \\pi^e + \\text{Risk Premium}",
    story: [
      {
        title: 'Asal-Usul: Persamaan Kuantitas Uang Irving Fisher (1911)',
        content: 'Fisher membuktikan bahwa jika jumlah uang beredar (M) ditambah terlalu banyak tanpa diimbangi jumlah barang nyata (Y), hasilnya adalah lonjakan harga sembako (Inflasi P).'
      },
      {
        title: 'Masalah Dunia Nyata: Krisis Moneter & Suku Bunga Bank Indonesia',
        content: 'Bank sentral menaikkan suku bunga acuan untuk menyedot uang beredar saat inflasi melonjak, namun risiko sampingannya adalah pertumbuhan ekonomi melambat.'
      }
    ],
    industryDomains: [
      { name: 'Bank Sentral (Bank Indonesia & US Fed)', desc: 'Penetapan BI-7 Day Reverse Repo Rate.' },
      { name: 'Perbankan Komersial & Industri KPR', desc: 'Penyesuaian bunga pinjaman kredit usaha & perumahan.' },
      { name: 'Analisis Ekonomi Makro & Pasar Modal', desc: 'Prediksi nilai tukar Rupiah terhadap Dolar US.' }
    ],
    controls: [
      { id: 'biRate', label: 'Suku Bunga Acuan BI-Rate', min: 2, max: 15, defaultVal: 6, unit: '%' },
      { id: 'reserveReq', label: 'Giro Wajib Minimum (GWM)', min: 1, max: 15, defaultVal: 5, unit: '%' },
      { id: 'fiscalSpending', label: 'Belanja Fiskal Pemerintah', min: 50, max: 500, defaultVal: 200, unit: 'T' }
    ],
    presets: [
      { name: '⚖️ Kasus Inflasi Terkendali 3%', values: { biRate: 6, reserveReq: 5, fiscalSpending: 200 } },
      { name: '🔥 Kasus Hipereflasi (Uang Banjir)', values: { biRate: 2, reserveReq: 2, fiscalSpending: 480 } },
      { name: '🧊 Kasus Resesi Ekonomi (Kredit Macet)', values: { biRate: 14, reserveReq: 12, fiscalSpending: 80 } }
    ],
    calculateConsequence: ({ biRate, reserveReq, fiscalSpending }) => {
      const moneySupply = fiscalSpending * (10 / reserveReq);
      const inflation = Math.max(0.5, Math.round((moneySupply / (biRate * 40)) * 10) / 10);
      const unemployment = Math.round(biRate * 0.9 + 3);

      if (inflation > 10) {
        return {
          status: 'danger',
          badge: 'HIPERINFLASI / DAYA BELI COLLAPSE',
          title: 'Uang Beredar Melimpah Ruah',
          description: 'Suku bunga terlalu rendah dan belanja fiskal tinggi menyebabkan harga kebutuhan pokok melambung gila-gilaan!',
          bagianA: 'Jumlah uang beredar melimpah di pasar melebihi pertumbuhan barang riil. Konsumen memegang banyak uang tetapi daya beli merosot tajam karena harga sembako melambung.',
          bagianB: 'Menurut Persamaan Kuantitas Uang Irving Fisher MV = PY, jika M (Uang Beredar) naik drastis tanpa diimbangi kenaikan Y (Output Riil), tingkat harga P akan terdorong ke zona hiperinflasi.',
          bagianC: 'Naikkan Suku Bunga Acuan BI-Rate ke kisaran 6% - 8% untuk menyedot kelebihan uang beredar kembali ke perbankan!',
          metrics: { Inflation: `${inflation}%`, Unemployment: `${unemployment}%`, Growth: 'Stagflation' }
        };
      } else if (biRate > 11) {
        return {
          status: 'warning',
          badge: 'RESESI / KREDIT MACET',
          title: 'Suku Bunga Terlalu Mencekik Pengusaha',
          description: 'Dunia usaha berhenti ekspansi karena bunga pinjaman bank mahal, memicu pengangguran naik.',
          bagianA: 'Kebijakan uang sangat ketat (Tight Money Policy). Bunga pinjaman yang terlampau tinggi menyebabkan pengusaha enggan mengambil kredit usaha, memicu gelombang PHK.',
          bagianB: 'Mengacu pada Kurva Phillips jangka pendek, penekanan inflasi ekstrem lewat peningkatan suku bunga i akan mengorbankan tingkat kesempatan kerja (Unemployment melonjak).',
          bagianC: 'Turunkan BI-Rate ke level moderat (5.5% - 7%) agar bisnis dapat kembali melakukan investasi ekspansi!',
          metrics: { Inflation: `${inflation}%`, Unemployment: `${unemployment}%`, Growth: 'Slowdown' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'STABILITAS MONETER PRESISI',
          title: 'Keseimbangan Kurva Phillips & Fisher',
          description: 'Inflasi terkendali di kisaran target 2-3% dengan laju pertumbuhan ekonomi yang sehat.',
          bagianA: 'Neraca moneter berada pada titik kestabilan ideal. Harga kebutuhan pokok terjangkau, daya beli terjaga, dan penciptaan lapangan kerja terus bertumbuh.',
          bagianB: 'Harmonisasi suku bunga acuan BI-Rate dan Giro Wajib Minimum menjaga tingkat inflasi inti πe pada koridor target Bank Indonesia.',
          bagianC: 'Kondisi ekonomi makro sangat stabil! Uji kejutan fiskal dengan menaikkan Belanja Pemerintah.',
          metrics: { Inflation: `${inflation}%`, Unemployment: `${unemployment}%`, Growth: 'Healthy +5.2%' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa menaikkan suku bunga bank bisa menekan laju inflasi?', hint: 'Karena suku bunga tinggi mendorong masyarakat menabung di bank dan mengurangi pinjaman, sehingga jumlah uang beredar berkurang.' }
    ]
  },

  // 5C: Investment Management & Markowitz Portfolio
  '5C': {
    id: '5C',
    subjectId: 'economy',
    subjectName: 'Ekonomi & Soshum',
    title: 'Manajemen Investasi & Teori Portofolio Efisien: Markowitz Risk vs Return',
    formula: "E(R_p) = w_A E(R_A) + w_B E(R_B), \\quad \\sigma_p^2 = w_A^2 \\sigma_A^2 + w_B^2 \\sigma_B^2 + 2 w_A w_B \\sigma_{AB}",
    story: [
      {
        title: 'Asal-Usul: Modern Portfolio Theory Harry Markowitz (1952)',
        content: 'Markowitz memenangkan Hadiah Nobel Ekonomi atas filosofinya: "Jangan taruh semua telur dalam satu keranjang". Ia membuktikan secara matematis bahwa diversifikasi aset mengurangi risiko tanpa mengorbankan imbal hasil.'
      },
      {
        title: 'Masalah Dunia Nyata: Pengelolaan Dana Pensiun & Mutual Funds',
        content: 'Bagaimana mengombinasikan saham teknologi berisiko tinggi dengan obligasi negara yang aman agar portofolio tetap untung di saat pasar jatuh?'
      }
    ],
    industryDomains: [
      { name: 'Manajer Investasi (BlackRock & Fidelity)', desc: 'Pengelolaan dana kelolaan triliunan dolar.' },
      { name: 'Aplikasi Robo-Advisor Investment (Bibit/A bareksa)', desc: 'Rebalancing otomatis aset sesuai profil risiko pengguna.' },
      { name: 'Perusahaan Asuransi & Dana Pensiun', desc: 'Alokasi lindung nilai risiko (hedging).' }
    ],
    controls: [
      { id: 'stocksWeight', label: 'Alokasi Saham Bertumbuh (Tech/Equity)', min: 0, max: 100, defaultVal: 60, unit: '%' },
      { id: 'bondsWeight', label: 'Alokasi Surat Utang/Obligasi', min: 0, max: 100, defaultVal: 40, unit: '%' },
      { id: 'marketVolatility', label: 'Indeks Volatilitas Pasar (VIX)', min: 10, max: 60, defaultVal: 20, unit: 'pts' }
    ],
    presets: [
      { name: '📈 Kasus Efficient Frontier Markowitz', values: { stocksWeight: 70, bondsWeight: 30, marketVolatility: 18 } },
      { name: '💣 Kasus Spekulatif Volatilitas Tinggi', values: { stocksWeight: 100, bondsWeight: 0, marketVolatility: 55 } },
      { name: '🛡️ Kasus Konservatif Aman Rendah', values: { stocksWeight: 10, bondsWeight: 90, marketVolatility: 15 } }
    ],
    calculateConsequence: ({ stocksWeight, bondsWeight, marketVolatility }) => {
      const totalAlloc = stocksWeight + bondsWeight;
      const expectedReturn = (stocksWeight * 0.15 + bondsWeight * 0.06).toFixed(1);
      const portfolioRisk = Math.round((stocksWeight / 100) * marketVolatility + (bondsWeight / 100) * 4);
      const sharpeRatio = ((expectedReturn - 4) / (portfolioRisk + 1)).toFixed(2);

      if (totalAlloc !== 100) {
        return {
          status: 'warning',
          badge: 'ALOKASI HARUS 100%',
          title: 'Total Alokasi Aset Tidak Genap 100%',
          description: `Total persentase saat ini adalah ${totalAlloc}%. Sesuaikan slider agar jumlah saham + obligasi = 100%.`,
          bagianA: 'Portofolio investasi tidak valid karena alokasi dana melebihi atau kurang dari 100% dari total modal modal kerja.',
          bagianB: 'Bobot alokasi w_A + w_B harus selalu bernilai 1.0 agar penghitungan return E(Rp) dan varians σp² valid.',
          bagianC: 'Sesuaikan slider alokasi saham dan obligasi hingga totalnya tepat 100%!',
          metrics: { Return: `${expectedReturn}%`, Risk: `${portfolioRisk}%`, Sharpe: sharpeRatio }
        };
      } else if (stocksWeight > 90 && marketVolatility > 40) {
        return {
          status: 'danger',
          badge: 'RISIKO KEJATUHAN MODAL EXTREME',
          title: 'Portofolio Terlalu Rentan Badai Pasar',
          description: 'Tanpa diversifikasi obligasi, kejatuhan pasar saham akan memangkas modal portofolio hingga 50%!',
          bagianA: 'Portofolio mengalami kerugian besar saat krisis pasar tiba karena 100% dana terkonsentrasi di aset saham berisiko tinggi tanpa perisai obligasi.',
          bagianB: 'Tanpa kovarians negatif σAB dari aset berisiko rendah, varians portofolio σp² melonjak tinggi mengikuti volatilitas pasar VIX.',
          bagianC: 'Tambahkan alokasi Obligasi/Surat Utang Negara minimal 30% - 40% untuk meredam potensi kejatuhan nilai portofolio!',
          metrics: { Return: `${expectedReturn}%`, Risk: `${portfolioRisk}%`, Sharpe: sharpeRatio }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'EFFICIENT FRONTIER OPTIMAL',
          title: 'Rasio Sharpe Tinggi (Risk-Adjusted Return)',
          description: 'Kombinasi aset meminimalkan varians kovarians sesuai kurva efisien Harry Markowitz.',
          bagianA: 'Portofolio memiliki daya tahan tinggi terhadap guncangan pasar. Imbal hasil optimal dengan tingkat risiko yang sangat terukur.',
          bagianB: 'Alokasi berada pada Efficient Frontier Harry Markowitz dengan Sharpe Ratio maksimal (Risk-Adjusted Return tertinggi).',
          bagianC: 'Struktur portofolio investasi Anda sangat ideal! Tekan tombol Uji Kejutan Pasar untuk menguji ketahanan finansial.',
          metrics: { Return: `${expectedReturn}%`, Risk: `${portfolioRisk}%`, Sharpe: sharpeRatio }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa menggabungkan dua aset yang memiliki korelasi negatif justru menghilangkan risiko total portofolio?', hint: 'Karena ketika aset A harganya turun, aset B harganya naik sehingga meredam kerugian secara sempurna!' }
    ]
  },

  // 6A: E-Commerce Logistics & Dijkstra Algorithm
  '6A': {
    id: '6A',
    subjectId: 'informatics',
    subjectName: 'Informatika & Logika',
    title: 'Logistik E-Commerce & Pencarian Rute Terpendek: Algoritma Graf Dijkstra / A*',
    formula: "d(v) = \\min_{u \\in N(v)} (d(u) + w(u, v)), \\quad f(n) = g(n) + h(n)",
    story: [
      {
        title: 'Asal-Usul: Algoritma Edsger W. Dijkstra (1956)',
        content: 'Dijkstra merumuskan algoritma pencarian rute terpendek di atas serbet kopi dalam waktu 20 menit! Algoritma graf ini kini menjadi mesin utama navigasi Google Maps dan pengiriman paket J&T/Gojek.'
      },
      {
        title: 'Masalah Dunia Nyata: Pengiriman Jutaan Paket Si Sicepat & Shopee',
        content: 'Bagaimana sistem menentukan rute jalan kurir yang melewati 10 titik gudang transit dengan hambatan kemacetan lalu lintas dalam hitungan milidetik?'
      }
    ],
    industryDomains: [
      { name: 'Navigasi Peta Digital (Google Maps & Waze)', desc: 'Kalkulasi rute tercepat real-time berdasar kemacetan.' },
      { name: 'Sistem Operasional Logistik Kurir', desc: 'Rute efisien pengiriman paket multi-drop.' },
      { name: 'Jaringan Router Internet IP Routing', desc: 'Algoritma OSPF pengiriman paket data jaringan.' }
    ],
    controls: [
      { id: 'warehouseNodes', label: 'Jumlah Titik Gudang (Nodes)', min: 5, max: 30, defaultVal: 12, unit: 'nodes' },
      { id: 'trafficJam', label: 'Tingkat Kemacetan Jalan (Weight)', min: 1, max: 10, defaultVal: 4, unit: 'x' },
      { id: 'fuelWeight', label: 'Bobot Konsumsi Bensin', min: 1, max: 5, defaultVal: 2, unit: 'factor' }
    ],
    presets: [
      { name: '🗺️ Kasus Rute Terpendek Dijkstra (Optimal)', values: { warehouseNodes: 10, trafficJam: 2, fuelWeight: 2 } },
      { name: '🚗 Kasus Kemacetan Horor (Weight Tinggi)', values: { warehouseNodes: 20, trafficJam: 9, fuelWeight: 4 } },
      { name: '⚡ Kasus Jaringan Micro Node', values: { warehouseNodes: 5, trafficJam: 1, fuelWeight: 1 } }
    ],
    calculateConsequence: ({ warehouseNodes, trafficJam, fuelWeight }) => {
      const evaluatedNodes = warehouseNodes * 3;
      const totalTimeMin = Math.round(warehouseNodes * 4 * trafficJam);
      const fuelCost = Math.round(totalTimeMin * 1.5 * fuelWeight);

      if (trafficJam > 8) {
        return {
          status: 'warning',
          badge: 'BOBOT KEMACETAN TINGGI',
          title: 'Algoritma Melakukan Rerouting Jalur Alternatif',
          description: 'Bobot edge graf melambung tinggi. Dijkstra memilih rute melingkar yang lebih panjang tetapi bebas macet.',
          bagianA: 'Lalu lintas pada ruas jalan utama mengalami kemacetan parah. Algoritma navigasi secara otomatis menghitung ulang bobot edge graf d(u,v) dan mengarahkan kurrier ke rute alternatif yang lebih lancar.',
          bagianB: 'Algoritma Graf Dijkstra d(v) = min(d(u) + w(u,v)) mengevaluasi ulang matriks tetangga ketika nilai bobot hambatan w(u,v) melonjak akibat kemacetan.',
          bagianC: 'Kurangi Tingkat Kemacetan Jalan atau aktifkan Rintangan Jalan Ditutup untuk menguji respon algoritma rerouting real-time!',
          metrics: { TravelTime: `${totalTimeMin} Mnt`, NodesEvaluated: evaluatedNodes, FuelCost: `Rp ${fuelCost}K` }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'JALUR SHORTEST PATH DITEMUKAN',
          title: 'Evaluasi Node Graf Himpunan Terbuka Sempurna',
          description: 'Algoritma Dijkstra/A* berhasil menemukan rute dengan nilai f(n) paling minimal untuk efisiensi BBM kurir!',
          bagianA: 'Sistem navigasi berhasil menemukan rute efisien dengan waktu tempuh paling minimum dan konsumsi bahan bakar yang sangat terukur.',
          bagianB: 'Algoritma pencarian rute terpendek Dijkstra & A* mengabaikan cabang simpul yang memiliki akumulasi bobot f(n) tinggi, menghasilkan lintasan paling efisien.',
          bagianC: 'Navigasi rute pengiriman berada pada jalur paling optimal! Anda dapat menguji tingkat kemacetan untuk mengamati rerouting instan.',
          metrics: { TravelTime: `${totalTimeMin} Mnt`, NodesEvaluated: evaluatedNodes, FuelCost: `Rp ${fuelCost}K` }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa Algoritma A* jauh lebih cepat daripada Dijkstra untuk navigasi peta?', hint: 'Karena A* menggunakan fungsi heuristik h(n) yang memperkirakan jarak garis lurus ke tujuan, sehingga tidak perlu mengevaluasi node ke arah yang salah.' }
    ]
  },

  // 6B: Banking Security & RSA Cryptography
  '6B': {
    id: '6B',
    subjectId: 'informatics',
    subjectName: 'Informatika & Logika',
    title: 'Keamanan Perbankan & Kriptografi Kunci Publik: Logika Bilangan Prima RSA',
    formula: "n = p \\cdot q, \\quad c = m^e \\pmod{n}, \\quad m = c^d \\pmod{n}",
    story: [
      {
        title: 'Asal-Usul: Penemuan Rivest, Shamir, & Adleman (1977)',
        content: 'Penemu RSA memanfaatkan fakta matematika sederhana: Sangat mudah mengalikan dua bilangan prima raksasa p dan q, namun sangat sulit memfaktorkan kembali n menjadi p dan q jika angkanya sepanjang 2048-bit.'
      },
      {
        title: 'Masalah Dunia Nyata: Keamanan Transaksi Kartu Kredit & M-Banking',
        content: 'Bagaimana aplikasi M-Banking mengirimkan PIN rahasia melalui internet publik tanpa bisa diintip hacker di jalan?'
      }
    ],
    industryDomains: [
      { name: 'Sistem Keamanan Perbankan & HTTPS SSL', desc: 'Enkripsi transaksi finansial online.' },
      { name: 'Teknologi Blockchain & Smart Contract', desc: 'Verifikasi tanda tangan digital kunci publik/privat.' },
      { name: 'Komunikasi Terenkripsi End-to-End (WhatsApp)', desc: 'Pengamanan pesan pribadi dari penyadapan.' }
    ],
    controls: [
      { id: 'primeP', label: 'Ukuran Bilangan Prima p', min: 11, max: 101, defaultVal: 61, unit: 'prime' },
      { id: 'primeQ', label: 'Ukuran Bilangan Prima q', min: 13, max: 103, defaultVal: 53, unit: 'prime' },
      { id: 'publicKeyE', label: 'Kunci Enkripsi Publik (e)', min: 3, max: 65537, defaultVal: 17, unit: 'exp' }
    ],
    presets: [
      { name: '🔒 Kasus Enkripsi RSA 2048-bit Amati', values: { primeP: 61, primeQ: 53, publicKeyE: 17 } },
      { name: '🔓 Kasus Prima Terlalu Kecil (Mudah Di-hack)', values: { primeP: 11, primeQ: 13, publicKeyE: 3 } }
    ],
    calculateConsequence: ({ primeP, primeQ, publicKeyE }) => {
      const n = primeP * primeQ;
      const phi = (primeP - 1) * (primeQ - 1);
      const isWeak = n < 1000;

      if (isWeak) {
        return {
          status: 'danger',
          badge: 'MUDAH DI-HACK / KERENTANAN TINGGI',
          title: 'Modulus n Terlalu Kecil (Faktorisasi Super Cepat)',
          description: 'Komputer hacker dapat memfaktorkan n menjadi p dan q dalam 0.001 detik dan membobol kunci privat!',
          bagianA: 'Ukuran kunci enkripsi terlalu kecil. Penetas dapat dengan mudah memfaktorkan perkalian n menjadi p dan q dalam hitungan detik untuk mendekripsi data rahasia.',
          bagianB: 'Kerentanan matematis faktorisasi prima sederhana n = p · q memungkinkan hacker menghitung nilai φ(n) dan mencari invers eksponen d = e^-1 mod φ(n) dalam waktu singkat.',
          bagianC: 'Tingkatkan ukuran bilangan prima p dan q untuk memperbesar modulus n hingga level keamanan enkripsi 2048-bit!',
          metrics: { ModulusN: n, PhiN: phi, SecurityBit: 'Weak (12-bit)' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'ENKRIPSI MILITER RASA AMAN',
          title: 'Modular Arithmetic Masking Sempurna',
          description: 'Pesan asli diacak menjadi Ciphertext rumit c = m^e mod n yang tidak bisa didekripsi tanpa d privat.',
          bagianA: 'Data transaksi perbankan dan PIN terenkripsi dengan sangat aman. Pihak ketiga di saluran internet tidak mampu membaca pesan tanpa kunci privat rahasia.',
          bagianB: 'Keamanan RSA bergantung pada kesukaran komputasi memfaktorkan n menjadi perkalian dua bilangan prima raksasa (Asymmetric Prime Factorization Problem).',
          bagianC: 'Kunci enkripsi publik & privat berada dalam tingkat keamanan sangat tinggi! Uji simulasi peretasan data.',
          metrics: { ModulusN: n, PhiN: phi, SecurityBit: 'Strong RSA' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Mengapa Kunci Publik e boleh disebarkan bebas ke seluruh dunia tanpa takut rahasia terkuak?', hint: 'Karena untuk menghitung kunci dekripsi privat d, hacker wajib tahu nilai φ(n) = (p-1)(q-1) yang hanya bisa dihitung jika tahu p dan q.' }
    ]
  },

  // 6C: Artificial Intelligence & Neural Networks
  '6C': {
    id: '6C',
    subjectId: 'informatics',
    subjectName: 'Informatika & Logika',
    title: 'Kecerdasan Buatan (AI) & Neural Network: Fungsi Aktivasi & Gradient Descent',
    formula: "w_{baru} = w_{lama} - \\alpha \\frac{\\partial L}{\\partial w}, \\quad \\sigma(z) = \\frac{1}{1 + e^{-z}}",
    story: [
      {
        title: 'Asal-Usul: Perseptron Frank Rosenblatt (1958)',
        content: 'Rosenblatt terinspirasi oleh sel neuron otak manusia untuk membuat jaring saraf tiruan. Algoritma Backpropagation & Gradient Descent kini menjadi penggerak utama ChatGPT dan AI pembuat gambar.'
      },
      {
        title: 'Masalah Dunia Nyata: Pelatihan ChatGPT & Pengenalan Wajah',
        content: 'Bagaimana AI belajar membedakan foto kucing dan anjing? AI terus menggeser bobot w searah dengan kecurunan turunan turunan parsial ∂L/∂w hingga error mendekati nol.'
      }
    ],
    industryDomains: [
      { name: 'Kecerdasan Buatan Generatif (OpenAI & Gemini)', desc: 'Pelatihan Large Language Models (LLM).' },
      { name: 'Computer Vision & Pengenalan Wajah FaceID', desc: 'Klasifikasi objek citra medis dan keamanan.' },
      { name: 'Sistem Rekomendasi Streaming (Netflix & Spotify)', desc: 'Prediksi minat pengguna berbasis bobot neural.' }
    ],
    controls: [
      { id: 'learningRate', label: 'Learning Rate (α)', min: 0.001, max: 1, defaultVal: 0.05, step: 0.005, unit: 'α' },
      { id: 'hiddenLayers', label: 'Jumlah Hidden Layers', min: 1, max: 10, defaultVal: 4, unit: 'layers' },
      { id: 'noiseInput', label: 'Noise Data Masukan', min: 0, max: 50, defaultVal: 10, unit: '%' }
    ],
    presets: [
      { name: '🤖 Kasus Pelatihan AI Akurasi 99% (Optimal)', values: { learningRate: 0.05, hiddenLayers: 4, noiseInput: 10 } },
      { name: '💥 Kasus Overshooting (Learning Rate Terlalu Besar)', values: { learningRate: 0.9, hiddenLayers: 2, noiseInput: 20 } },
      { name: '🐌 Kasus Underfitting (Terlalu Lambat)', values: { learningRate: 0.001, hiddenLayers: 1, noiseInput: 40 } }
    ],
    calculateConsequence: ({ learningRate, hiddenLayers, noiseInput }) => {
      let accuracy = 99 - noiseInput * 0.5 - (learningRate > 0.3 ? (learningRate - 0.3) * 100 : 0);
      accuracy = Math.max(10, Math.min(99, Math.round(accuracy)));
      const loss = (100 - accuracy) / 100;

      if (learningRate > 0.4) {
        return {
          status: 'danger',
          badge: 'OVERSHOOTING / LOSS DIVERGEN',
          title: 'Learning Rate Terlalu Tinggi',
          description: 'Langkah gradient descent meloncat melompati titik minimum lokal loss function, menyebabkan model AI tidak pernah konvergen!',
          bagianA: 'Pelatihan model AI gagal karena laju pembelajar α terlampau tinggi. Pergeseran bobot melonjak ekstrem melompati nilai minimum fungsi kerugian (Loss Function).',
          bagianB: 'Menurut rumus Gradient Descent w = w - α(∂L/∂w), nilai α yang terlalu besar memicu loncatan overshooting yang membuat gradien membesar (Exploding Gradient).',
          bagianC: 'Turunkan nilai Learning Rate ke kisaran 0.01 - 0.08 untuk memungkinkan konvergensi yang mulus!',
          metrics: { Accuracy: `${accuracy}%`, Loss: loss.toFixed(3), Convergence: 'Diverged' }
        };
      } else if (accuracy < 60) {
        return {
          status: 'warning',
          badge: 'UNDERFITTING / DATA NOISY',
          title: 'Model Kurang Lapisan & Terlalu Banyak Noise',
          description: 'Garis keputusan (decision boundary) AI terlalu sederhana untuk memisahkan pola data yang kompleks.',
          bagianA: 'Akurasi model AI rendah karena arsitektur jaringan terlampau sederhana untuk menangkap kompleksitas pola data masukan yang bising.',
          bagianB: 'Fenomena Underfitting terjadi ketika jumlah parameter bobot W tidak memadai untuk membentuk pemetaan non-linear (Capacity Deficit).',
          bagianC: 'Tambah jumlah Hidden Layers dan kurangi Noise Data untuk meningkatkan akurasi hingga 99%!',
          metrics: { Accuracy: `${accuracy}%`, Loss: loss.toFixed(3), Convergence: 'Underfit' }
        };
      } else {
        return {
          status: 'optimal',
          badge: 'KONVERGENSI MODEL OPTIMAL 99%',
          title: 'Gradient Descent Berhasil Menemukan Minimum Global',
          description: 'Fungsi aktivasi Sigmoid/ReLU memetakan non-linearitas data dengan presisi tinggi!',
          bagianA: 'Model kecerdasan buatan berhasil dilatih dengan sempurna! Pembelajaran Gradient Descent mencapai tingkat konvergensi dan akurasi tinggi.',
          bagianB: 'Penggabungan fungsi aktivasi non-linear dan nilai Learning Rate yang ideal membawa turunan loss ∂L/∂w tepat mendekati titik minimum 0.',
          bagianC: 'Model AI berada pada performa terbaik! Anda dapat mensimulasikan penambahan noise data untuk menguji ketahanan model.',
          metrics: { Accuracy: `${accuracy}%`, Loss: loss.toFixed(3), Convergence: 'Converged (99%)' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Apa yang terjadi jika Learning Rate diisi 0.000001 saat melatih AI?', hint: 'Proses pelatihan AI akan membutuhkan waktu berbulan-bulan bahkan bertahun-tahun karena pergeseran bobotnya sangat kecil!' }
    ]
  }
};
