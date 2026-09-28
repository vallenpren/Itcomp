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
    calculateConsequence: ({ predatorPop = 30, preyPop = 800, foodResource = 70 } = {}) => {
      try {
        const safePred = Number(predatorPop) >= 0 ? Number(predatorPop) : 30;
        const safePrey = Number(preyPop) >= 0 ? Number(preyPop) : 800;
        const safeFood = Number(foodResource) >= 0 ? Number(foodResource) : 70;

        const ratio = safePrey / (safePred * 15 + 1);

        if (safePred > 75 && safePrey < 300) {
          return {
            status: 'danger',
            badge: 'EXTINCTION CYCLE / KEPUNAHAN GANDA',
            title: 'Predator Memangsa Seluruh Hama Sampai Habis',
            description: `Predator (${safePred} ekor) memangsa mangsa (${safePrey} ekor) secara masif, memicu siklus kepunahan.`,
            bagianA: `Populasi predator (${safePred} ekor) terlalu tinggi memusnahkan mangsa (${safePrey} ekor). Tanpa ketersediaan mangsa, predator akan mengalami krisis kelaparan.`,
            bagianB: `Persamaan Lotka-Volterra dx/dt = αx - βxy menunjukkan laju kematian mangsa βxy melampaui laju pembiakan αx saat y (${safePred}) sangat besar.`,
            bagianC: `Kurangi Populasi Predator ke rentang 20-40 ekor (saat ini ${safePred} ekor) dan jaga Pangan Tanaman di ${safeFood}% agar ekosistem seimbang!`,
            metrics: { Ratio: ratio.toFixed(2), Ecosystem: 'Collapsed', PredatorState: 'Starving' }
          };
        } else if (safePred < 10 && safePrey > 1200) {
          return {
            status: 'warning',
            badge: 'LEDAKAN HAMA PERTANIAN',
            title: 'Hilangnya Predator Alami Memicu Wabah Hama',
            description: `Populasi hama (${safePrey} ekor) melampaui kapasitas lingkungan karena predator hanya ${safePred} ekor.`,
            bagianA: `Predator alami yang sangat sedikit (${safePred} ekor) membuat populasi hama (${safePrey} ekor) melonjak tak terkendali merusak vegetasi pangan (${safeFood}%).`,
            bagianB: `Hilangnya faktor pembatas dy/dt = δxy - γy menyebabkan pertumbuhan mangsa x (${safePrey} ekor) bersifat eksponensial tak terbatas (J-curve).`,
            bagianC: `Lepaskan Predator Alami hingga ~30 ekor (saat ini ${safePred} ekor) untuk mengaktifkan Biological Pest Control!`,
            metrics: { Ratio: ratio.toFixed(2), Ecosystem: 'Outbreak', PredatorState: 'Extinct' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'FLUKTUASI EKOLOGI SEIMBANG',
            title: 'Siklus Rantai Makanan Lotka-Volterra Harmonism',
            description: `Siklus populasi predator (${safePred}) dan mangsa (${safePrey}) berosilasi seimbang pada daya dukung pangan ${safeFood}%.`,
            bagianA: `Rantai makanan seimbang! Fluktuasi populasi predator (${safePred} ekor) dan mangsa (${safePrey} ekor) berjalan teratur sesuai siklus alami.`,
            bagianB: `Model Lotka-Volterra berada pada fase orbit tertutup di mana turunan dx/dt dan dy/dt berada pada kesetimbangan dinamis.`,
            bagianC: `Ekosistem berada dalam kondisi sehat! Uji variasi ketersediaan pangan tanaman untuk melihat respon osilasi populasi.`,
            metrics: { Ratio: ratio.toFixed(2), Ecosystem: 'Balanced', PredatorState: 'Stable' }
          };
        }
      } catch (err) {
        console.error("Error calculating 4A consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Ekosistem Diproses',
          description: 'Sistem memperbarui dinamika Lotka-Volterra.',
          bagianA: 'Parameter populasi sedang dihitung.',
          bagianB: 'Model Lotka-Volterra disesuaikan dinamis.',
          bagianC: 'Geser slider parameter ekosistem.',
          metrics: { Status: 'Active' }
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
    calculateConsequence: ({ sodiumConc = 120, myelinSheath = 8, stimulusVoltage = 15 } = {}) => {
      try {
        const safeNa = Number(sodiumConc) >= 0 ? Number(sodiumConc) : 120;
        const safeMyelin = Number(myelinSheath) >= 0 ? Number(myelinSheath) : 8;
        const safeStim = !isNaN(Number(stimulusVoltage)) ? Number(stimulusVoltage) : 15;

        const speed = Math.round((safeMyelin * 12) + (safeNa / 10));
        const peakVoltage = safeStim > 10 ? 30 : -70;

        if (safeNa < 30) {
          return {
            status: 'danger',
            badge: 'IMPULS TERBLOKIR / ANESTESI',
            title: 'Depolarisasi Membran Gagal Terjadi',
            description: `Konsentrasi ion Na+ (${safeNa} mM) terlalu rendah untuk melewati threshold -55mV. Sinyal terputus.`,
            bagianA: `Ion Na+ (${safeNa} mM) tidak mencukupi memicu arus depolarisasi. Impuls sinyal sakit/gerak terhenti total sebelum sampai ke otak (efek bius).`,
            bagianB: `Persamaan Goldman-Hodgkin-Katz membuktikan tanpa gradien [Na+]o (${safeNa} mM) mencukupi, voltase gagal membuka Voltage-Gated Na+ Channels.`,
            bagianC: `Naikkan Konsentrasi Ion Na+ di atas 80 mM (saat ini ${safeNa} mM) untuk memulihkan penghantaran sinyal saraf!`,
            metrics: { Speed: '0 m/s', PeakVolt: '-70 mV', Conduction: 'Blocked' }
          };
        } else if (safeMyelin < 3) {
          return {
            status: 'warning',
            badge: 'SANGAT LAMBAT / DE-MYELINATED',
            title: 'Kebocoran Listrik Saraf Tanpa Mielin',
            description: `Isolator mielin tipis (${safeMyelin} μm) menurunkan kecepatan hantar saraf ke ${speed} m/s.`,
            bagianA: `Mielin setebal ${safeMyelin} μm menyebabkan arus listrik bocor menembus akson, memangkas kecepatan hantar saraf menjadi ${speed} m/s (Multiple Sclerosis).`,
            bagianB: `Tanpa isolasi mielin (${safeMyelin} μm), hambatan membran Rm turun sehingga impuls tidak dapat melakukan konduksi saltatori antar Nodus Ranvier.`,
            bagianC: `Tingkatkan Ketebalan Lapisan Mielin di atas 6 μm (saat ini ${safeMyelin} μm) untuk mengaktifkan loncatan saltatori cepat!`,
            metrics: { Speed: `${speed} m/s`, PeakVolt: `${peakVoltage} mV`, Conduction: 'Slow' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'TRANSMISI IMPULS PRESISI',
            title: 'Konduksi Saltatori Super Cepat',
            description: `Impuls saraf terkonduksi secepat ${speed} m/s dengan puncak depolarisasi ${peakVoltage} mV.`,
            bagianA: `Saraf menghantarkan impuls listrik secepat ${speed} m/s! Depolarisasi melompat efisien antar Nodus Ranvier dengan lapisan mielin ${safeMyelin} μm.`,
            bagianB: `Gradien ion Na+ (${safeNa} mM) dan resistansi isolasi mielin ${safeMyelin} μm mendukung Saltatory Conduction berdaya efisien.`,
            bagianC: `Transmisi impuls berada pada puncak kesehatan! Uji penurun konsentrasi ion Natrium untuk mensimulasikan efek anestesi.`,
            metrics: { Speed: `${speed} m/s`, PeakVolt: `${peakVoltage} mV`, Conduction: 'Saltatory Fast' }
          };
        }
      } catch (err) {
        console.error("Error calculating 4B consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Impuls Saraf Diproses',
          description: 'Sistem memperbarui konduksi impuls akson.',
          bagianA: 'Parameter bio-listrik sedang dihitung.',
          bagianB: 'Persamaan Goldman Vm disesuaikan dinamis.',
          bagianC: 'Geser slider parameter saraf.',
          metrics: { Status: 'Active' }
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
    calculateConsequence: ({ dominantFreqP = 0.7, naturalSelection = 20, generations = 3 } = {}) => {
      try {
        const safeP = Math.max(0.01, Math.min(0.99, Number(dominantFreqP) || 0.7));
        const safeGen = Math.max(1, Math.min(5, Number(generations) || 3));

        const q = 1 - safeP;
        const p2 = Math.round(Math.pow(safeP, 2) * 100);
        const pq2 = Math.round(2 * safeP * q * 100);
        const q2 = Math.max(0, 100 - p2 - pq2);

        if (q2 > 35) {
          return {
            status: 'danger',
            badge: 'RISIKO FENOTIPE HOMOZIGOT RESESIF TINGGI',
            title: 'Frekuensi Alel Pembawa Sifat Penyakit Tinggi',
            description: `${q2}% keturunan generasi F${safeGen} berisiko mengekspresikan penyakit resesif (aa) karena p=${safeP}.`,
            bagianA: `Frekuensi alel resesif q (${q.toFixed(2)}) terlalu tinggi. Sebesar ${q2}% keturunan generasi F${safeGen} bergenotipe homozigot resesif aa.`,
            bagianB: `Sesuai Hardy-Weinberg p² + 2pq + q² = 1, saat frekuensi p=${safeP}, proporsi mutasi resesif q²=${q2}% melonjak melebihi ambang batas aman populasi.`,
            bagianC: `Gunakan terapi rekayasa genetik CRISPR Cas-9 atau tingkatkan frekuensi alel dominan p di atas 0.7 (saat ini ${safeP})!`,
            metrics: { AA: `${p2}%`, Aa: `${pq2}%`, aa: `${q2}%` }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'VARIASI GENETIK SEHAT OPTIMAL',
            title: 'Distribusi Genotipe Terkontrol Sempurna',
            description: `Distribusi keturunan F${safeGen}: AA=${p2}%, Aa=${pq2}%, aa=${q2}% berada pada rasio genetik aman.`,
            bagianA: `Populasi memiliki ketahanan genetik prima pada generasi F${safeGen}. ${p2}% bergenotipe AA dominan sehat dan ${pq2}% heterozigot carrier Aa.`,
            bagianB: `Hukum Segregasi Bebas Mendel dan kesetimbangan Hardy-Weinberg p² + 2pq + q² = 1 terdistribusi seimbang pada p=${safeP}.`,
            bagianC: `Kombinasi genetik berada pada titik paling ideal! Uji simulasi persilangan hingga generasi F5.`,
            metrics: { AA: `${p2}%`, Aa: `${pq2}%`, aa: `${q2}%` }
          };
        }
      } catch (err) {
        console.error("Error calculating 4C consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Genotipe Diproses',
          description: 'Sistem memperbarui frekuensi alel Hardy-Weinberg.',
          bagianA: 'Parameter persilangan genetik sedang dihitung.',
          bagianB: 'Persamaan p² + 2pq + q² = 1 diperbarui dinamis.',
          bagianC: 'Geser slider frekuensi alel p.',
          metrics: { Status: 'Active' }
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
    calculateConsequence: ({ priceRp = 50000, consumerIncome = 100, competitorPrice = 45000 } = {}) => {
      try {
        const safePrice = Number(priceRp) > 0 ? Number(priceRp) : 50000;
        const safeIncome = Number(consumerIncome) > 0 ? Number(consumerIncome) : 100;
        const safeComp = Number(competitorPrice) > 0 ? Number(competitorPrice) : 45000;

        const baseDemand = 1000 * (safeIncome / 100);
        const priceRatio = safePrice / safeComp;
        const quantity = Math.max(50, Math.round(baseDemand / Math.pow(priceRatio, 2)));
        const totalRevenue = safePrice * quantity;
        const ped = Math.abs((1 - quantity / Math.max(1, baseDemand)) / (1 - priceRatio || 0.001));

        if (priceRatio > 2.5) {
          return {
            status: 'danger',
            badge: 'PEMBELI KABUR / ELASTIS EKSTREM',
            title: 'Harga Terlalu Mahal Dibanding Kompetitor',
            description: `Harga Rp ${safePrice.toLocaleString()} (2.5x kompetitor Rp ${safeComp.toLocaleString()}) membuat permintaan anjlok ke ${quantity} pcs!`,
            bagianA: `Harga produk (Rp ${safePrice.toLocaleString()}) terlalu mahal dibanding kompetitor (Rp ${safeComp.toLocaleString()}). Konsumen beralih ke toko sebelah.`,
            bagianB: `Nilai Elastisitas PED |Ep| = ${ped.toFixed(2)} > 1 menunjukkan barang bersifat elastis. Kenaikan harga %ΔP menurunkan kuantitas %ΔQ secara drastis.`,
            bagianC: `Turunkan harga jual ke kisaran Rp ${Math.round(safeComp * 1.1).toLocaleString()} agar omset Total Revenue (P x Q) naik!`,
            metrics: { PED: ped.toFixed(2), Quantity: `${quantity} pcs`, Revenue: `Rp ${(totalRevenue / 1000000).toFixed(1)}Jt` }
          };
        } else if (safePrice < safeComp * 0.4) {
          return {
            status: 'warning',
            badge: 'MARGIN UNTUNG NIPIS',
            title: 'Perang Harga Terlalu Murah',
            description: `Harga Rp ${safePrice.toLocaleString()} terlalu murah dibanding kompetitor (Rp ${safeComp.toLocaleString()}).`,
            bagianA: `Toko kehabisan stok (${quantity} pcs terjual) karena harga Rp ${safePrice.toLocaleString()} terlalu murah. Omset tidak menutup biaya operasional!`,
            bagianB: `Penetapan harga jauh di bawah ekuilibrium pasar menyebabkan kerugian potensi pendapatan (Producer Surplus Loss).`,
            bagianC: `Naikkan harga secara bertahap mendekati Rp ${Math.round(safeComp * 0.9).toLocaleString()} untuk amankan margin!`,
            metrics: { PED: ped.toFixed(2), Quantity: `${quantity} pcs`, Revenue: `Rp ${(totalRevenue / 1000000).toFixed(1)}Jt` }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'TOTAL REVENUE MAKSIMAL',
            title: 'Titik Ekuilibrium Harga Optimal',
            description: `Penjualan ${quantity} pcs pada harga Rp ${safePrice.toLocaleString()} menghasilkan Total Revenue Rp ${(totalRevenue / 1000000).toFixed(1)}Jt!`,
            bagianA: `Produk berada pada titik manis pendapatan tertinggi! Harga Rp ${safePrice.toLocaleString()} seimbang sempurna dengan permintaan ${quantity} pcs.`,
            bagianB: `Elastisitas berada pada titik Unitari (Ep ≈ -1), di mana turunan pertama Total Revenue d(TR)/dP ≈ 0 mencapai puncak imbalan.`,
            bagianC: `Strategi penetapan harga e-commerce sangat presisi! Uji perubahan harga kompetitor untuk mengamati pergeseran kurva.`,
            metrics: { PED: ped.toFixed(2), Quantity: `${quantity} pcs`, Revenue: `Rp ${(totalRevenue / 1000000).toFixed(1)}Jt` }
          };
        }
      } catch (err) {
        console.error("Error calculating 5A consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi E-Commerce Diproses',
          description: 'Sistem memperbarui elastisitas harga.',
          bagianA: 'Parameter penetapan harga sedang dihitung.',
          bagianB: 'Persamaan PED Ep = (dQ/dP)·(P/Q) disesuaikan.',
          bagianC: 'Geser slider harga jual produk.',
          metrics: { Status: 'Active' }
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
    calculateConsequence: ({ biRate = 6, reserveReq = 5, fiscalSpending = 200 } = {}) => {
      try {
        const safeRate = Number(biRate) > 0 ? Number(biRate) : 6;
        const safeGwm = Number(reserveReq) > 0 ? Number(reserveReq) : 5;
        const safeFiscal = Number(fiscalSpending) > 0 ? Number(fiscalSpending) : 200;

        const moneySupply = safeFiscal * (10 / safeGwm);
        const inflation = Math.max(0.5, Math.round((moneySupply / (safeRate * 40)) * 10) / 10);
        const unemployment = Math.round(safeRate * 0.9 + 3);

        if (inflation > 10) {
          return {
            status: 'danger',
            badge: 'HIPERINFLASI / DAYA BELI COLLAPSE',
            title: 'Uang Beredar Melimpah Ruah',
            description: `BI-Rate ${safeRate}% terlalu rendah & fiskal ${safeFiscal}T memicu inflasi ${inflation}%!`,
            bagianA: `Jumlah uang beredar melimpah di pasar melebihi barang riil. Inflasi melonjak ke ${inflation}%, mengikis daya beli masyarakat secara drastis.`,
            bagianB: `Menurut Persamaan Kuantitas Uang Irving Fisher MV = PY, Uang Beredar M yang berlebih tanpa diimbangi Output Y mendorong harga P naik ke ${inflation}%.`,
            bagianC: `Naikkan Suku Bunga BI-Rate di atas 7% (saat ini ${safeRate}%) atau tingkatkan GWM (saat ini ${safeGwm}%) untuk menyerap likuiditas!`,
            metrics: { Inflation: `${inflation}%`, Unemployment: `${unemployment}%`, Growth: 'Stagflation' }
          };
        } else if (safeRate > 11) {
          return {
            status: 'warning',
            badge: 'RESESI / KREDIT MACET',
            title: 'Suku Bunga Terlalu Mencekik Pengusaha',
            description: `BI-Rate ${safeRate}% terlalu tinggi. Bunga pinjaman mahal menaikkan pengangguran ke ${unemployment}%.`,
            bagianA: `Kebijakan uang sangat ketat (BI-Rate ${safeRate}%). Pengusaha enggan mengambil kredit ekspansi sehingga tingkat pengangguran naik ke ${unemployment}%.`,
            bagianB: `Mengacu pada Kurva Phillips, penekanan inflasi ekstrem (${inflation}%) lewat suku bunga tinggi ${safeRate}% mengorbankan tingkat kesempatan kerja.`,
            bagianC: `Turunkan BI-Rate ke level moderat 5.5% - 7% (saat ini ${safeRate}%) agar dunia usaha kembali melakukan investasi!`,
            metrics: { Inflation: `${inflation}%`, Unemployment: `${unemployment}%`, Growth: 'Slowdown' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'STABILITAS MONETER PRESISI',
            title: 'Keseimbangan Kurva Phillips & Fisher',
            description: `Inflasi terkendali di ${inflation}% dan pengangguran di ${unemployment}% dengan BI-Rate ${safeRate}%.`,
            bagianA: `Kondisi moneter sangat stabil! BI-Rate ${safeRate}% dan GWM ${safeGwm}% menjaga inflasi tetap di target ${inflation}% dan ekonomi tumbuh sehat.`,
            bagianB: `Harmonisasi suku bunga acuan BI-Rate dan Giro Wajib Minimum menjaga tingkat inflasi inti πe pada koridor target Bank Indonesia.`,
            bagianC: `Stabilitas moneter berada di titik ideal! Uji respon kebijakan dengan mengubah belanja fiskal pemerintah.`,
            metrics: { Inflation: `${inflation}%`, Unemployment: `${unemployment}%`, Growth: 'Healthy +5.2%' }
          };
        }
      } catch (err) {
        console.error("Error calculating 5B consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Moneter Diproses',
          description: 'Sistem memperbarui indikator inflasi.',
          bagianA: 'Parameter moneter sedang dihitung.',
          bagianB: 'Persamaan Fisher MV = PY disesuaikan dinamis.',
          bagianC: 'Geser slider BI-Rate.',
          metrics: { Status: 'Active' }
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
    calculateConsequence: ({ stocksWeight = 60, bondsWeight = 40, marketVolatility = 20 } = {}) => {
      try {
        const safeStocks = !isNaN(Number(stocksWeight)) ? Number(stocksWeight) : 60;
        const safeBonds = !isNaN(Number(bondsWeight)) ? Number(bondsWeight) : 40;
        const safeVix = Number(marketVolatility) > 0 ? Number(marketVolatility) : 20;

        const totalAlloc = safeStocks + safeBonds;
        const expectedReturn = (safeStocks * 0.15 + safeBonds * 0.06).toFixed(1);
        const portfolioRisk = Math.round((safeStocks / 100) * safeVix + (safeBonds / 100) * 4);
        const sharpeRatio = ((parseFloat(expectedReturn) - 4) / (portfolioRisk + 1)).toFixed(2);

        if (totalAlloc !== 100) {
          return {
            status: 'warning',
            badge: 'ALOKASI HARUS 100%',
            title: 'Total Alokasi Aset Tidak Genap 100%',
            description: `Total persentase saat ini adalah ${totalAlloc}%. Sesuaikan slider agar jumlah saham + obligasi = 100%.`,
            bagianA: `Alokasi saat ini (${safeStocks}% saham + ${safeBonds}% obligasi = ${totalAlloc}%) tidak genap 100% dari total modal.`,
            bagianB: 'Bobot alokasi w_A + w_B harus bernilai 1.0 (100%) agar kalkulasi return E(Rp) dan risiko σp² valid.',
            bagianC: 'Geser slider saham atau obligasi agar total alokasi tepat 100%!',
            metrics: { Return: `${expectedReturn}%`, Risk: `${portfolioRisk}%`, Sharpe: sharpeRatio }
          };
        } else if (safeStocks > 90 && safeVix > 40) {
          return {
            status: 'danger',
            badge: 'RISIKO KEJATUHAN MODAL EXTREME',
            title: 'Portofolio Terlalu Rentan Badai Pasar',
            description: `Volatilitas VIX ${safeVix} pts dengan alokasi saham ${safeStocks}% berisiko memangkas modal portofolio!`,
            bagianA: `Portofolio berisiko tinggi karena ${safeStocks}% dana terkonsentrasi pada saham di tengah volatilitas pasar VIX ${safeVix} pts.`,
            bagianB: `Tanpa kovarians negatif σAB dari obligasi, varians portofolio σp² melonjak mengikuti volatilitas VIX (${safeVix} pts).`,
            bagianC: `Tambahkan alokasi Obligasi minimal 30% - 40% (saat ini ${safeBonds}%) untuk meredam risiko penurunan modal!`,
            metrics: { Return: `${expectedReturn}%`, Risk: `${portfolioRisk}%`, Sharpe: sharpeRatio }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'EFFICIENT FRONTIER OPTIMAL',
            title: 'Rasio Sharpe Tinggi (Risk-Adjusted Return)',
            description: `Portofolio (${safeStocks}% saham / ${safeBonds}% obligasi) mencapai Sharpe Ratio ${sharpeRatio} pada return ${expectedReturn}%.`,
            bagianA: `Alokasi portofolio sangat ideal! Perpaduan ${safeStocks}% saham dan ${safeBonds}% obligasi menghasilkan return ${expectedReturn}% dengan risiko terukur ${portfolioRisk}%.`,
            bagianB: `Alokasi berada pada Efficient Frontier Markowitz dengan Sharpe Ratio optimal (${sharpeRatio}), memaksimalkan Risk-Adjusted Return.`,
            bagianC: `Portofolio investasi berada dalam kondisi terbaik! Uji tingkat volatilitas pasar VIX untuk melihat daya tahan portofolio.`,
            metrics: { Return: `${expectedReturn}%`, Risk: `${portfolioRisk}%`, Sharpe: sharpeRatio }
          };
        }
      } catch (err) {
        console.error("Error calculating 5C consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Portofolio Diproses',
          description: 'Sistem memperbarui return & risiko Markowitz.',
          bagianA: 'Parameter alokasi aset sedang dihitung.',
          bagianB: 'Persamaan Modern Portfolio Theory disesuaikan dinamis.',
          bagianC: 'Geser slider bobot saham dan obligasi.',
          metrics: { Status: 'Active' }
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
    calculateConsequence: ({ warehouseNodes = 12, trafficJam = 4, fuelWeight = 2 } = {}) => {
      try {
        const safeNodes = Number(warehouseNodes) >= 0 ? Number(warehouseNodes) : 12;
        const safeJam = Number(trafficJam) >= 0 ? Number(trafficJam) : 4;
        const safeFuel = Number(fuelWeight) >= 0 ? Number(fuelWeight) : 2;

        const evaluatedNodes = safeNodes * 3;
        const totalTimeMin = Math.round(safeNodes * 4 * safeJam);
        const fuelCost = Math.round(totalTimeMin * 1.5 * safeFuel);

        if (safeJam > 8) {
          return {
            status: 'warning',
            badge: 'BOBOT KEMACETAN TINGGI',
            title: 'Algoritma Melakukan Rerouting Jalur Alternatif',
            description: `Kemacetan ${safeJam}x memicu rerouting di ${safeNodes} gudang, waktu tempuh ${totalTimeMin} mnt.`,
            bagianA: `Kemacetan parah (${safeJam}x) memicu algoritma Dijkstra/A* menghitung ulang bobot edge d(u,v) untuk mengarahkan kurir melalui rute alternatif.`,
            bagianB: `Algoritma Dijkstra d(v) = min(d(u) + w(u,v)) merevisi lintasan terpendek akibat lonjakan bobot hambatan w(u,v) di ${safeNodes} node gudang.`,
            bagianC: `Kurangi Tingkat Kemacetan Jalan (saat ini ${safeJam}x) untuk mengembalikan kurir ke jalur utama tercepat!`,
            metrics: { TravelTime: `${totalTimeMin} Mnt`, NodesEvaluated: evaluatedNodes, FuelCost: `Rp ${fuelCost}K` }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'JALUR SHORTEST PATH DITEMUKAN',
            title: 'Evaluasi Node Graf Himpunan Terbuka Sempurna',
            description: `Dijkstra/A* menemukan rute optimal melalui ${safeNodes} gudang dalam ${totalTimeMin} mnt (BBM Rp ${fuelCost}K).`,
            bagianA: `Navigasi logistik berhasil menemukan rute tercepat melewati ${safeNodes} titik gudang dengan total waktu ${totalTimeMin} menit.`,
            bagianB: `Algoritma Dijkstra & A* mengabaikan cabang simpul berbobot f(n) tinggi, menghasilkan rute paling hemat biaya bensin (faktor ${safeFuel}).`,
            bagianC: `Rute pengiriman logistik berada pada lintasan paling efisien! Uji tingkat kemacetan tinggi untuk mensimulasikan rerouting instan.`,
            metrics: { TravelTime: `${totalTimeMin} Mnt`, NodesEvaluated: evaluatedNodes, FuelCost: `Rp ${fuelCost}K` }
          };
        }
      } catch (err) {
        console.error("Error calculating 6A consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Logistik Diproses',
          description: 'Sistem memperbarui rute terpendek Dijkstra.',
          bagianA: 'Parameter bobot graf sedang dihitung.',
          bagianB: 'Persamaan Dijkstra d(v) disesuaikan dinamis.',
          bagianC: 'Geser slider tingkat kemacetan.',
          metrics: { Status: 'Active' }
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
    calculateConsequence: ({ primeP = 61, primeQ = 53, publicKeyE = 17 } = {}) => {
      try {
        const safeP = Number(primeP) > 0 ? Number(primeP) : 61;
        const safeQ = Number(primeQ) > 0 ? Number(primeQ) : 53;
        const safeE = Number(publicKeyE) > 0 ? Number(publicKeyE) : 17;

        const n = safeP * safeQ;
        const phi = (safeP - 1) * (safeQ - 1);
        const isWeak = n < 1000;

        if (isWeak) {
          return {
            status: 'danger',
            badge: 'MUDAH DI-HACK / KERENTANAN TINGGI',
            title: 'Modulus n Terlalu Kecil (Faktorisasi Super Cepat)',
            description: `Modulus n=${n} (p=${safeP}, q=${safeQ}) sangat kecil. Hacker memfaktorkan n dalam 0.001 detik!`,
            bagianA: `Ukuran kunci terlalu kecil (n=${n}). Penetas dapat dengan mudah memfaktorkan n menjadi p=${safeP} dan q=${safeQ} untuk menghitung kunci privat d.`,
            bagianB: `Kerentanan n = p · q (${n}) memungkinkan peretas menghitung φ(n) = ${phi} dan membalikkan eksponen e=${safeE} dalam seketika.`,
            bagianC: `Perbesar bilangan prima p dan q (saat ini p=${safeP}, q=${safeQ}) untuk menaikkan modulus n ke level RSA-2048 bit!`,
            metrics: { ModulusN: n, PhiN: phi, SecurityBit: 'Weak (12-bit)' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'ENKRIPSI MILITER RASA AMAN',
            title: 'Modular Arithmetic Masking Sempurna',
            description: `Modulus RSA n=${n} (p=${safeP}, q=${safeQ}) dengan e=${safeE} memberikan enkripsi asimetris yang kuat.`,
            bagianA: `Transaksi perbankan terenkripsi aman! Pesan acak c = m^e mod ${n} tidak dapat didekripsi tanpa kunci privat privat d.`,
            bagianB: `Keamanan RSA bertumpu pada kesukaran memfaktorkan n=${n} menjadi p=${safeP} dan q=${safeQ} (Prime Factorization Problem).`,
            bagianC: `Kunci publik e=${safeE} dan modulus n=${n} berada dalam kondisi aman! Uji penurunan nilai prima untuk melihat kerapuhan sistem.`,
            metrics: { ModulusN: n, PhiN: phi, SecurityBit: 'Strong RSA' }
          };
        }
      } catch (err) {
        console.error("Error calculating 6B consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Kriptografi Diproses',
          description: 'Sistem memperbarui modul n dan φ(n).',
          bagianA: 'Parameter bilangan prima sedang dihitung.',
          bagianB: 'Persamaan RSA c = m^e mod n disesuaikan.',
          bagianC: 'Geser slider bilangan prima p dan q.',
          metrics: { Status: 'Active' }
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
    calculateConsequence: ({ learningRate = 0.05, hiddenLayers = 4, noiseInput = 10 } = {}) => {
      try {
        const safeLr = !isNaN(Number(learningRate)) ? Number(learningRate) : 0.05;
        const safeLayers = Number(hiddenLayers) >= 1 ? Number(hiddenLayers) : 4;
        const safeNoise = Number(noiseInput) >= 0 ? Number(noiseInput) : 10;

        let accuracy = 99 - safeNoise * 0.5 - (safeLr > 0.3 ? (safeLr - 0.3) * 100 : 0);
        accuracy = Math.max(10, Math.min(99, Math.round(accuracy)));
        const loss = (100 - accuracy) / 100;

        if (safeLr > 0.4) {
          return {
            status: 'danger',
            badge: 'OVERSHOOTING / LOSS DIVERGEN',
            title: 'Learning Rate Terlalu Tinggi',
            description: `Learning Rate α=${safeLr} melompati minimum lokal loss function, akurasi drop ke ${accuracy}%!`,
            bagianA: `Pelatihan AI meleset karena Learning Rate α=${safeLr} terlampau besar. Pergeseran bobot w = w - α(∂L/∂w) melompati titik minimum loss.`,
            bagianB: `Rumus Gradient Descent dengan α=${safeLr} memicu loncatan overshooting (Exploding Gradient) pada ${safeLayers} hidden layers.`,
            bagianC: `Turunkan Learning Rate α ke kisaran 0.01 - 0.08 (saat ini ${safeLr}) agar pembaruan bobot berjalan konvergen!`,
            metrics: { Accuracy: `${accuracy}%`, Loss: loss.toFixed(3), Convergence: 'Diverged' }
          };
        } else if (accuracy < 60) {
          return {
            status: 'warning',
            badge: 'UNDERFITTING / DATA NOISY',
            title: 'Model Kurang Lapisan & Terlalu Banyak Noise',
            description: `Akurasi AI hanya ${accuracy}% akibat noise ${safeNoise}% dengan ${safeLayers} hidden layers.`,
            bagianA: `Model AI underfit (akurasi ${accuracy}%). Arsitektur ${safeLayers} hidden layers tidak memadai memisahkan data dengan noise ${safeNoise}%.`,
            bagianB: `Underfitting terjadi ketika kapasitas parameter bobot W pada ${safeLayers} layer tidak cukup menangkap pola non-linear.`,
            bagianC: `Tambah jumlah Hidden Layers di atas 3 (saat ini ${safeLayers}) dan kurangi Noise Data (saat ini ${safeNoise}%)!`,
            metrics: { Accuracy: `${accuracy}%`, Loss: loss.toFixed(3), Convergence: 'Underfit' }
          };
        } else {
          return {
            status: 'optimal',
            badge: 'KONVERGENSI MODEL OPTIMAL 99%',
            title: 'Gradient Descent Berhasil Menemukan Minimum Global',
            description: `Model AI mencapai akurasi ${accuracy}% (Loss ${loss.toFixed(3)}) pada α=${safeLr} dengan ${safeLayers} layers!`,
            bagianA: `Jaringan saraf tiruan berhasil dilatih sempurna! Akurasi ${accuracy}% dicapai secara efisien pada ${safeLayers} hidden layers.`,
            bagianB: `Fungsi aktivasi non-linear dan Learning Rate α=${safeLr} mengarahkan turunan loss ∂L/∂w mendekati titik minimum 0.`,
            bagianC: `Performa jaringan saraf tiruan berada di kondisi puncak! Uji penambahan noise data untuk mensimulasikan gangguan real-world.`,
            metrics: { Accuracy: `${accuracy}%`, Loss: loss.toFixed(3), Convergence: 'Converged (99%)' }
          };
        }
      } catch (err) {
        console.error("Error calculating 6C consequence:", err);
        return {
          status: 'warning',
          badge: 'EVALUASI DIPERBARUI',
          title: 'Kalkulasi Neural Network Diproses',
          description: 'Sistem memperbarui akurasi Gradient Descent.',
          bagianA: 'Parameter jaring saraf sedang dihitung.',
          bagianB: 'Persamaan w = w - α(∂L/∂w) disesuaikan dinamis.',
          bagianC: 'Geser slider Learning Rate dan Hidden Layers.',
          metrics: { Status: 'Active' }
        };
      }
    },
    socraticQuestions: [
      { q: 'Apa yang terjadi jika Learning Rate diisi 0.000001 saat melatih AI?', hint: 'Proses pelatihan AI akan membutuhkan waktu berbulan-bulan bahkan bertahun-tahun karena pergeseran bobotnya sangat kecil!' }
    ]
  }
};
