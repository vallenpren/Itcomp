// Data Mock LestTry - Platform Asesmen Kemampuan Akademik

export const MOCK_USERS = {
  student: {
    id: "std-001",
    name: "Ahmad Dani",
    role: "student",
    roleLabel: "Siswa",
    studentClassId: "MIPA-1",
    class: "XII MIPA 1",
    school: "SMA Negeri 1 Jakarta",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    email: "ahmad.dani@siswa.lesttry.id",
    targetUniv: "Teknik Informatika - Universitas Indonesia",
    nisn: "0054819203"
  },
  teacher: {
    id: "tch-101",
    name: "Pak Budi Hartono",
    title: "Pak Budi Hartono",
    role: "teacher",
    roleLabel: "Guru / Penguji",
    subject: "Fisika & Matematika Saintek",
    school: "SMA Negeri 1 Jakarta",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    email: "budi.hartono@lesttry.id",
    nip: "198803152012011002"
  }
};

export const COMPETENCY_PILLARS = [
  { key: "pemahaman", label: "Pemahaman Konsep", icon: "BookOpen", color: "#2563EB" },
  { key: "analisis", label: "Analisis Kritis", icon: "Brain", color: "#7C3AED" },
  { key: "logika", label: "Logika Penalaran", icon: "Cpu", color: "#0D9488" },
  { key: "pemecahan", label: "Pemecahan Masalah", icon: "Target", color: "#059669" },
  { key: "ketelitian", label: "Ketelitian Hitung", icon: "CheckCircle2", color: "#D97706" }
];

export const MOCK_ASSESSMENTS = [
  {
    id: "asm-tka-01",
    title: "Simulasi TKA Matematika Saintek 2026",
    category: "Tes Kemampuan Akademik",
    subject: "Matematika Saintek",
    targetClass: "XII MIPA 1",
    totalQuestions: 5,
    durationMinutes: 30,
    deadline: "28 Sep 2026, 23:59 WIB",
    status: "Berlangsung", // Berlangsung, Selesai, Draf
    studentProgress: "28/32 Siswa",
    submittedCount: 28,
    totalStudents: 32,
    difficulty: "Sedang - Tinggi",
    passingScore: 75,
    description: "Evaluasi mendalam mencakup Kalkulus, Trigonometri, Matrix, dan Analisis Statistika untuk persiapan SNBT/UTBK 2026.",
    badgeText: "Wajib UTBK",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "asm-tps-02",
    title: "Tryout TPS - Penalaran Umum & Kuantitatif",
    category: "Tes Potensi Skolastik",
    subject: "TPS Penalaran",
    targetClass: "XII MIPA 2",
    totalQuestions: 10,
    durationMinutes: 45,
    deadline: "30 Sep 2026, 18:00 WIB",
    status: "Berlangsung",
    studentProgress: "31/35 Siswa",
    submittedCount: 31,
    totalStudents: 35,
    difficulty: "Sedang",
    passingScore: 70,
    description: "Menguji daya nalar deduktif, induktif, serta pemahaman tabel & grafik data kuantitatif.",
    badgeText: "Favorit",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "asm-fis-03",
    title: "Diagnostik Fisika - Gelombang & Optik",
    category: "Diagnostik Topik",
    subject: "Fisika Saintek",
    targetClass: "XII MIPA 3",
    totalQuestions: 8,
    durationMinutes: 40,
    deadline: "02 Okt 2026, 20:00 WIB",
    status: "Berlangsung",
    studentProgress: "18/30 Siswa",
    submittedCount: 18,
    totalStudents: 30,
    difficulty: "Tinggi",
    passingScore: 75,
    description: "Pemetaan kompetensi gelombang elektromagnetik, interferensi, dan pembiasan cahaya.",
    badgeText: "Diagnostik Baru",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: "asm-hist-01",
    title: "Simulasi TPS - Literasi Bahasa Indonesia",
    category: "Tes Potensi Skolastik",
    subject: "Bahasa Indonesia",
    targetClass: "XII MIPA 1",
    totalQuestions: 20,
    durationMinutes: 30,
    completedAt: "20 Sep 2026",
    status: "Selesai",
    studentProgress: "32/32 Siswa",
    submittedCount: 32,
    totalStudents: 32,
    score: 88,
    passingScore: 75,
    passed: true,
    gradeLabel: "Sangat Baik (A)",
    competencyScores: {
      pemahaman: 90,
      analisis: 85,
      logika: 92,
      pemecahan: 80,
      ketelitian: 85
    }
  },
  {
    id: "asm-draf-01",
    title: "Asesmen Sumatif Matriks & Vektor Lanjut",
    category: "Tes Kemampuan Akademik",
    subject: "Matematika Saintek",
    targetClass: "XII IPS 1",
    totalQuestions: 15,
    durationMinutes: 60,
    deadline: "Belum Diterbitkan",
    status: "Draf",
    studentProgress: "0/30 Siswa",
    submittedCount: 0,
    totalStudents: 30,
    difficulty: "HOTS",
    passingScore: 75,
    description: "Draf soal sumatif bab Matriks, Vektor 3D, dan Transformasi Geometri.",
    badgeText: "Draf",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-300"
  }
];

export const BANK_SOAL = [
  {
    id: "bs-01",
    number: 1,
    subject: "Matematika Saintek",
    topic: "Turunan & Vektor Kalkulus",
    difficulty: "Sedang",
    difficultyBadge: "bg-blue-50 text-blue-700 border-blue-200",
    questionText: "Diketahui fungsi f(x) = x³ - 3x² + 9x - 5. Jika g(x) adalah turunan pertama dari f(x), maka nilai minimum dari fungsi g(x) pada interval [-1, 4] adalah...",
    competency: "pemahaman",
    competencyLabel: "Pemahaman Konsep"
  },
  {
    id: "bs-02",
    number: 2,
    subject: "Matematika Saintek",
    topic: "Limit & Kontinuitas Fungsi",
    difficulty: "HOTS",
    difficultyBadge: "bg-purple-50 text-purple-700 border-purple-200",
    questionText: "Suatu pabrik obat memformulasi dosis obat dalam darah pasien (dalam mg/L) mengikuti model kuantitatif: C(t) = (8t) / (t² + 4). Manakah dari pernyataan berikut yang PALING TEPAT mengenai konsentrasi maksimum obat dalam darah?",
    competency: "analisis",
    competencyLabel: "Analisis Kritis"
  },
  {
    id: "bs-03",
    number: 3,
    subject: "Matematika Saintek",
    topic: "Matriks & Determinasi",
    difficulty: "Sedang",
    difficultyBadge: "bg-blue-50 text-blue-700 border-blue-200",
    questionText: "Diketahui matriks A = [[2, 1], [4, 3]] dan B = [[1, 0], [2, 5]]. Jika matriks X memenuhi hubungan A · X = B, maka nilai dari determinan matriks X (det(X)) adalah...",
    competency: "logika",
    competencyLabel: "Logika Penalaran"
  },
  {
    id: "bs-04",
    number: 4,
    subject: "Matematika Saintek",
    topic: "Barisan & Deret Tak Hingga",
    difficulty: "Mudah",
    difficultyBadge: "bg-teal-50 text-teal-700 border-teal-200",
    questionText: "Sebuah bola jatuh dari ketinggian 12 meter dan memantul kembali dengan ketinggian 2/3 dari tinggi sebelumnya. Panjang seluruh lintasan bola hingga bola berhenti bergerak adalah...",
    competency: "pemecahan",
    competencyLabel: "Pemecahan Masalah"
  },
  {
    id: "bs-05",
    number: 5,
    subject: "Matematika Saintek",
    topic: "Trigonometri Analitis",
    difficulty: "HOTS",
    difficultyBadge: "bg-purple-50 text-purple-700 border-purple-200",
    questionText: "Jika sin(x) + cos(x) = 1/2, maka nilai dari sin(2x) adalah...",
    competency: "ketelitian",
    competencyLabel: "Ketelitian Hitung"
  },
  {
    id: "bs-06",
    number: 6,
    subject: "TPS Penalaran",
    topic: "Penalaran Logis Syarat Cukup",
    difficulty: "Sedang",
    difficultyBadge: "bg-blue-50 text-blue-700 border-blue-200",
    questionText: "Semua siswa yang lulus SNBT belajar minimal 4 jam sehari. Sebagian siswa SMA 1 tidak belajar 4 jam sehari. Kesimpulan yang paling tepat adalah...",
    competency: "logika",
    competencyLabel: "Logika Penalaran"
  },
  {
    id: "bs-07",
    number: 7,
    subject: "TPS Penalaran",
    topic: "Penalaran Kuantitatif Grafik",
    difficulty: "HOTS",
    difficultyBadge: "bg-purple-50 text-purple-700 border-purple-200",
    questionText: "Tabel penjualan smartphone merek X meningkat 15% pada kuartal 1, turun 10% pada kuartal 2. Persentase total perubahan penjualan dibanding awal tahun adalah...",
    competency: "analisis",
    competencyLabel: "Analisis Kritis"
  },
  {
    id: "bs-08",
    number: 8,
    subject: "Fisika Saintek",
    topic: "Optik Fisis & Interferensi Celah",
    difficulty: "HOTS",
    difficultyBadge: "bg-purple-50 text-purple-700 border-purple-200",
    questionText: "Dua celah sempit disinari cahaya monokromatik dengan panjang gelombang 600 nm. Jika jarak layar 1 meter dan pola gelap terang orde 2 berjarak 6 mm, tentukan lebar celah...",
    competency: "pemecahan",
    competencyLabel: "Pemecahan Masalah"
  }
];

export const MOCK_QUESTIONS = [
  {
    id: 1,
    number: 1,
    competency: "pemahaman",
    competencyLabel: "Pemahaman Konsep",
    topic: "Turunan & Vektor Kalkulus",
    questionText: "Diketahui fungsi f(x) = x³ - 3x² + 9x - 5. Jika g(x) adalah turunan pertama dari f(x), maka nilai minimum dari fungsi g(x) pada interval [-1, 4] adalah...",
    hasCodeOrFormula: true,
    formulaSnippet: "f'(x) = 3x² - 6x + 9",
    options: [
      { id: "A", text: "3", isCorrect: false },
      { id: "B", text: "6", isCorrect: true },
      { id: "C", text: "9", isCorrect: false },
      { id: "D", text: "12", isCorrect: false },
      { id: "E", text: "18", isCorrect: false }
    ],
    explanation: "Turunan pertama f(x) adalah g(x) = f'(x) = 3x² - 6x + 9. Ini merupakan persamaan kuadrat parabola terbuka ke atas. Nilai minimum parabola y = ax² + bx + c dicapai di sumbu simetri x = -b / 2a = -(-6) / (2·3) = 1. Substitusi x = 1 ke g(x): g(1) = 3(1)² - 6(1) + 9 = 3 - 6 + 9 = 6."
  },
  {
    id: 2,
    number: 2,
    competency: "analisis",
    competencyLabel: "Analisis Kritis",
    topic: "Limit & Kontinuitas Fungsi",
    questionText: "Suatu pabrik obat memformulasi dosis obat dalam darah pasien (dalam mg/L) mengikuti model kuantitatif: C(t) = (8t) / (t² + 4), di mana t menyatakan jam setelah konsumsi. Manakah dari pernyataan berikut yang PALING TEPAT mengenai konsentrasi maksimum obat dalam darah?",
    hasCodeOrFormula: false,
    options: [
      { id: "A", text: "Konsentrasi maksimum dicapai pada jam ke-1 sebesar 2.5 mg/L.", isCorrect: false },
      { id: "B", text: "Konsentrasi maksimum dicapai pada jam ke-2 sebesar 2.0 mg/L.", isCorrect: true },
      { id: "C", text: "Konsentrasi maksimum terus meningkat seiring bertambahnya t tanpa batas.", isCorrect: false },
      { id: "D", text: "Konsentrasi obat turun menjadi 0 tepat pada jam ke-4.", isCorrect: false },
      { id: "E", text: "Konsentrasi puncak adalah 4 mg/L yang terjadi pada jam ke-3.", isCorrect: false }
    ],
    explanation: "C'(t) = [8(t² + 4) - 8t(2t)] / (t² + 4)² = (32 - 8t²) / (t² + 4)². C'(t) = 0 saat 32 - 8t² = 0 → t² = 4 → t = 2 jam. Nilai C(2) = (8 · 2) / (2² + 4) = 16 / 8 = 2.0 mg/L. Jadi konsentrasi maksimum adalah 2.0 mg/L pada t = 2 jam."
  },
  {
    id: 3,
    number: 3,
    competency: "logika",
    competencyLabel: "Logika Penalaran",
    topic: "Matriks & Sistem Persamaan",
    questionText: "Diketahui matriks A = [[2, 1], [4, 3]] dan B = [[1, 0], [2, 5]]. Jika matriks X memenuhi hubungan A · X = B, maka nilai dari determinan matriks X (det(X)) adalah...",
    hasCodeOrFormula: true,
    formulaSnippet: "det(A · X) = det(A) · det(X) = det(B)",
    options: [
      { id: "A", text: "1.0", isCorrect: false },
      { id: "B", text: "2.5", isCorrect: true },
      { id: "C", text: "5.0", isCorrect: false },
      { id: "D", text: "7.5", isCorrect: false },
      { id: "E", text: "10.0", isCorrect: false }
    ],
    explanation: "Menggunakan sifat determinan: det(A · X) = det(A) · det(X) = det(B). Hitung det(A) = (2)(3) - (1)(4) = 6 - 4 = 2. Hitung det(B) = (1)(5) - (0)(2) = 5. Maka 2 · det(X) = 5 → det(X) = 5 / 2 = 2.5."
  },
  {
    id: 4,
    number: 4,
    competency: "pemecahan",
    competencyLabel: "Pemecahan Masalah",
    topic: "Barisan & Deret Geometri",
    questionText: "Sebuah bola jatuh dari ketinggian 12 meter dan memantul kembali dengan ketinggian 2/3 dari tinggi sebelumnya. Panjang seluruh lintasan bola hingga bola berhenti bergerak adalah...",
    hasCodeOrFormula: false,
    options: [
      { id: "A", text: "36 meter", isCorrect: false },
      { id: "B", text: "48 meter", isCorrect: false },
      { id: "C", text: "60 meter", isCorrect: true },
      { id: "D", text: "72 meter", isCorrect: false },
      { id: "E", text: "84 meter", isCorrect: false }
    ],
    explanation: "Lintasan total S = h0 + 2 · (h1 + h2 + h3 + ...). Deret memantul: h1 = 12 × 2/3 = 8. Jumlah deret tak hingga memantul S_pantul = a / (1 - r) = 8 / (1 - 2/3) = 8 / (1/3) = 24. Lintasan total bola = 12 + 2(24) = 12 + 48 = 60 meter. (Atau rumus cepat S = h0 × (b + a)/(b - a) = 12 × (3 + 2)/(3 - 2) = 12 × 5 = 60 meter)."
  },
  {
    id: 5,
    number: 5,
    competency: "ketelitian",
    competencyLabel: "Ketelitian Hitung",
    topic: "Trigonometri & Persamaan Geometri",
    questionText: "Jika sin(x) + cos(x) = 1/2, maka nilai dari sin(2x) adalah...",
    hasCodeOrFormula: true,
    formulaSnippet: "(sin(x) + cos(x))² = sin²(x) + cos²(x) + 2sin(x)cos(x)",
    options: [
      { id: "A", text: "-3/4", isCorrect: true },
      { id: "B", text: "-1/2", isCorrect: false },
      { id: "C", text: "1/4", isCorrect: false },
      { id: "D", text: "3/4", isCorrect: false },
      { id: "E", text: "5/4", isCorrect: false }
    ],
    explanation: "Kuadratkan kedua ruas: (sin(x) + cos(x))² = (1/2)² → sin²(x) + cos²(x) + 2sin(x)cos(x) = 1/4. Karena sin²(x) + cos²(x) = 1 dan 2sin(x)cos(x) = sin(2x), maka: 1 + sin(2x) = 1/4 → sin(2x) = 1/4 - 1 = -3/4."
  }
];

export const MOCK_STUDENT_RECAP = [
  { 
    id: 's-1',
    name: 'Budi Pratama', 
    nisn: '0054819203', 
    score: 85, 
    status: 'Tuntas', 
    duration: '22 Menit',
    timeSpent: '22:15',
    competencyScores: { pemahaman: 90, analisis: 75, logika: 90, pemecahan: 80, ketelitian: 70 },
    recommendation: 'Tingkatkan ketelitian manipulasi bentuk aljabar dan trigonometri dasar.'
  },
  { 
    id: 's-2',
    name: 'Siti Nurhaliza', 
    nisn: '0054819204', 
    score: 92, 
    status: 'Tuntas', 
    duration: '18 Menit',
    timeSpent: '18:40',
    competencyScores: { pemahaman: 95, analisis: 90, logika: 95, pemecahan: 85, ketelitian: 95 },
    recommendation: 'Sangat baik! Direkomendasikan mengikuti pengayaan soal HOTS UTBK tingkat lanjut.'
  },
  { 
    id: 's-3',
    name: 'Ahmad Dahlan', 
    nisn: '0054819205', 
    score: 68, 
    status: 'Remedial', 
    duration: '29 Menit',
    timeSpent: '29:05',
    competencyScores: { pemahaman: 60, analisis: 65, logika: 70, pemecahan: 65, ketelitian: 60 },
    recommendation: 'Perlu bimbingan remediasi pada materi Turunan Pertama dan Turunan Parabola.'
  },
  { 
    id: 's-4',
    name: 'Dewi Lestari', 
    nisn: '0054819206', 
    score: 78, 
    status: 'Tuntas', 
    duration: '25 Menit',
    timeSpent: '25:30',
    competencyScores: { pemahaman: 80, analisis: 70, logika: 80, pemecahan: 80, ketelitian: 80 },
    recommendation: 'Sudah memenuhi KKM. Fokus penguatan pada analisis cerita berbasis aplikasi.'
  },
  { 
    id: 's-5',
    name: 'Rizky Febian', 
    nisn: '0054819207', 
    score: 88, 
    status: 'Tuntas', 
    duration: '21 Menit',
    timeSpent: '21:10',
    competencyScores: { pemahaman: 90, analisis: 85, logika: 90, pemecahan: 85, ketelitian: 90 },
    recommendation: 'Penguasaan konsep sangat baik, pertahankan konsistensi latihan.'
  },
  { 
    id: 's-6',
    name: 'Nabila Syakieb', 
    nisn: '0054819208', 
    score: 58, 
    status: 'Remedial', 
    duration: '30 Menit',
    timeSpent: '30:00',
    competencyScores: { pemahaman: 55, analisis: 50, logika: 60, pemecahan: 55, ketelitian: 50 },
    recommendation: 'Perlu bantuan modul penguatan dasar fungsi kalkulus dan sistem persamaan.'
  }
];

export const ITEM_ANALYSIS_MOCK = [
  {
    number: 5,
    topic: "Trigonometri & Identitas Ganda",
    errorRate: "46.4%",
    errorBadge: "Tingkat Kesalahan Tertinggi",
    incorrectCount: 13,
    correctCount: 15,
    analysisNote: "Mayoritas siswa lupa mengkuadratkan (sin x + cos x) secara utuh."
  },
  {
    number: 2,
    topic: "Limit & Kontinuitas Dosis Obat",
    errorRate: "39.3%",
    errorBadge: "Kesalahan Analisis",
    incorrectCount: 11,
    correctCount: 17,
    analysisNote: "Siswa keliru membedakan waktu t saat konsentrasi puncak vs nilai konsentrasi puncak."
  },
  {
    number: 3,
    topic: "Matriks & Sifat Determinan",
    errorRate: "32.1%",
    errorBadge: "Kesalahan Konsep",
    incorrectCount: 9,
    correctCount: 19,
    analysisNote: "Terjadi kesalahan perhitungan det(A·X) = det(A)·det(X)."
  }
];

export const SMART_DIAGNOSTICS_DB = {
  high: {
    title: "Kemampuan Pemahaman Sangat Kuat",
    badge: "Mastery Level A",
    summary: "Selamat! Anda menunjukkan penguasaan konsep dasar dan analisis lanjutan yang sangat tajam di atas rata-rata KKM.",
    recommendations: [
      "Pertahankan konsistensi dengan latihan soal UTBK tipe HOTS (Higher Order Thinking Skills).",
      "Perdalam topik Kalkulus Lanjut dan Integrasi Vektor untuk mengunci nilai sempurna.",
      "Ikuti Tryout Nasional LestTry minggu depan untuk menguji peringkat skala nasional."
    ]
  },
  medium: {
    title: "Pemahaman Cukup Baik, Butuh Presisi Lebih Tinggi",
    badge: "Mastery Level B",
    summary: "Anda memiliki fondasi matematika yang solid, namun masih ada celah pada ketelitian hitungan algebra dan alur logika berantai.",
    recommendations: [
      "Review ulang materi Trigonometri Analitis dan Rumus Identitas ganda sin(2x).",
      "Latih kecepatan manipulasi bentuk aljabar matriks dan limit trigonometri.",
      "Gunakan fiturnya LestTry 'Mode Latihan Fokus: Ketelitian Hitung'."
    ]
  },
  low: {
    title: "Perlu Penguatan Konsep Dasar",
    badge: "Perlu Pendampingan",
    summary: "Skor berada di bawah target KKM (75). Terdapat kendala pemahaman pada penyelesaian soal cerita dan transformasi rumus.",
    recommendations: [
      "Pelajari kembali Modul Dasar: Turunan Pertama & Nilai Ekstrem Parabola.",
      "Kerjakan ulang 5 soal dalam ujian ini dengan memperhatikan pembahasan detail step-by-step.",
      "Jadwalkan sesi konsultasi 1-on-1 bersama Guru Pengampu."
    ]
  }
};
