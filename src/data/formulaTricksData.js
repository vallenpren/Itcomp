// Detailed Formula Tricks Data for all 18 experiments (1A-6C)

export const FORMULA_TRICKS_DATA = {
  '1A': {
    logikaOverview: "Rumus turunan f'(t) = dv/dt ini menggambarkan percepatan instan roket. Gaya dorong (F_dorong) harus lebih besar daripada gaya berat (m·g) dan gaya gesek atmosfer (F_hambat). Karena massa roket m(t) terus berkurang akibat pembakaran bahan bakar, percepatan roket justru makin lama makin melesat!",
    symbolBreakdown: [
      { symbol: "f'(t)", name: "Turunan Pertama Kecepatan (dv/dt)", unit: "m/s²", meaning: "Percepatan instan roket pada detik ke-t." },
      { symbol: "F_dorong", name: "Gaya Dorong Semprotan Mesin", unit: "N (Newton)", meaning: "Gaya angkat hasil dorongan pembakaran bahan bakar roket." },
      { symbol: "m(t)", name: "Massa Total Roket Saat t", unit: "kg", meaning: "Massa roket yang makin berkurang seiring habisnya bahan bakar." },
      { symbol: "g", name: "Percepatan Gravitasi Bumi", unit: "9.8 m/s²", meaning: "Gaya tarik bumi yang menahan roket jatuh." }
    ],
    step1Title: "1. Separasi Variabel (Gaya vs Massa)",
    step1Desc: "Identifikasi dulu Gaya Dorong total (F_dorong = laju_bakar × gaya_spesifik) dan Hitung Beban Total (Payload + Struktur + Bahan Bakar tersisa).",
    step2Title: "2. Substitusi ke Formula Percepatan Bersih (a = F_net / m)",
    step2Desc: "Kurangi Gaya Dorong dengan Gaya Berat (m·g). Bagi hasilnya dengan massa m(t) saat itu untuk mendapatkan nilai percepatan f'(t).",
    step3Title: "3. Uji Syarat Lepas Orbit (v ≥ 11.2 km/s)",
    step3Desc: "Pastikan percepatan f'(t) bernilai positif (> 0 m/s²). Jika f'(t) ≤ 0, roket dipastikan akan kehabisan tenaga dan jatuh kembali ke bumi.",
    jebakanBatman: "⚠️ Hati-hati Konversi Satuan! Laju pembakaran sering diberikan dalam kg/detik, tapi massa payload dalam Ton (1 Ton = 1.000 kg). Jangan sampai lupa mengalikan dengan 1.000!",
    trikMenalar: "⚡ Trik Kilat: Karena massa roket m(t) ada di penyebut (pembagi), ketika m(t) berkurang separuhnya (50%), maka percepatan a secara otomatis meloncat 2 kali lipat!",
    contohSoal: {
      q: "Jika laju pembakaran f'(t) konstan tetapi massa roket berkurang dari 10.000 kg menjadi 5.000 kg, berapa kali lipat percepatannya meningkat?",
      a: "Massa berkurang 1/2 kali, maka percepatan a naik 2 kali lipat (berbanding terbalik!)."
    }
  },

  '1B': {
    logikaOverview: "Integral Momen M = ∫ w(x)·(L-x) dx menjumlahkan seluruh beban kecil kendaraan w(x) di setiap titik sepanjang span jembatan L. Karena kabel jembatan melengkung membentuk parabola y(x) = (w0 / 2T0) x², tegangan terbesar selalu menumpuk di bagian tengah kabel!",
    symbolBreakdown: [
      { symbol: "M", name: "Integral Momen Bending Total", unit: "N·m / MPa", meaning: "Akumulasi total gaya lentur yang ditahan kabel jembatan." },
      { symbol: "w(x)", name: "Beban Lalu Lintas Per Meter", unit: "ton/m", meaning: "Distribusi kendaraan berat yang melintasi jembatan." },
      { symbol: "L", name: "Panjang Bentang Jembatan (Span)", unit: "meter", meaning: "Jarak antara dua tiang penyangga utama jembatan." },
      { symbol: "T0", name: "Tegangan Horizontal Kabel Utama", unit: "kN", meaning: "Gaya tarik kabel baja penopang jembatan." }
    ],
    step1Title: "1. Tentukan Fungsi Beban w(x) & Panjang Span L",
    step1Desc: "Catat beban kendaraan rata-rata w(x) per meter dan panjang bentangan jembatan L dari soal.",
    step2Title: "2. Hitung Hasil Integrasi Parabola (M = w·L² / 8)",
    step2Desc: "Untuk beban merata konstan, hasil integral ∫ w(x)·(L-x) dx menyederhanakan menjadi rumus praktis M = (w · L²) / 8.",
    step3Title: "3. Bandingkan dengan Ketebalan Kabel (Batas Aman > 1.3)",
    step3Desc: "Bagi kekuatan batas putus kabel baja dengan Momen M. Jika Safety Ratio < 1.0, kabel jembatan dipastikan retak dan putus!",
    jebakanBatman: "⚠️ Panjang Span Kuadrat (L²)! Jika panjang jembatan dibuat 2 kali lebih panjang, momen beban lenturnya tidak naik 2x, melainkan naik 4x lipat (2² = 4)!",
    trikMenalar: "⚡ Trik Kilat Momen Parabola: Selalu ingat bahwa batas tegangan kabel kritis terletak tepat di titik tengah (x = L/2).",
    contohSoal: {
      q: "Jika bentang jembatan dinaikkan dari 200m menjadi 400m, berapa kali lipat ketebalan kabel yang dibutuhkan?",
      a: "Karena L naik 2x, momen M naik 4x (2²). Ketebalan kabel harus ditingkatkan minimal 4x lipat agar aman."
    }
  },

  '1C': {
    logikaOverview: "Matriks 4x4 V' = M · V digunakan di game engine 3D (Unreal/Unity) untuk memutar (rotasi θ), menggeser (translasi t), dan memperbesar (skala S) koordinat karakter 3D. Matriks memungkinkan jutaan koordinat titik (x,y,z,1) diproses sekaligus oleh GPU secara simultan!",
    symbolBreakdown: [
      { symbol: "V'", name: "Koordinat Baru (x', y', z', 1)", unit: "piksel 3D", meaning: "Posisi akhir karakter setelah diputar/digeser." },
      { symbol: "M", name: "Matriks Transformasi 4x4", unit: "matriks", meaning: "Matriks gabungan Rotasi (cos/sin), Translasi, dan Skala." },
      { symbol: "θ", name: "Sudut Rotasi Yaw/Pitch", unit: "derajat (°)", meaning: "Kemiringan putaran kamera atau karakter." },
      { symbol: "S", name: "Faktor Skala (Scale)", unit: "x (kali)", meaning: "Ukuran pembesaran/pengecilan objek." }
    ],
    step1Title: "1. Identifikasi Jenis Transformasi (Rotasi, Skala, atau Translasi)",
    step1Desc: "Pisahkan komponen sudut putar θ, vektor translasi (tx, ty, tz), dan rasio skala S dari soal.",
    step2Title: "2. Susun Matriks Transformasi M",
    step2Desc: "Isi baris rotasi dengan cos(θ) dan sin(θ), serta kolom translasi dengan tx, ty, tz pada baris/kolom ke-4.",
    step3Title: "3. Lakukan Perkalian Baris × Kolom (V' = M · V)",
    step3Desc: "Kalikan matriks M dengan vektor koordinat awal [x, y, z, 1]^T untuk mendapatkan koordinat tampilan baru.",
    jebakanBatman: "⚠️ Urutan Perkalian Matriks Tidak Komutatif! Perkalian Rotasi dulu lalu Translasi (R · T) menghasilkan posisi yang berbeda total dibanding Translasi dulu baru Rotasi (T · R)!",
    trikMenalar: "⚡ Trik Cepat Skala: Jika determinan matriks det(M) = 0 (singular), objek 3D akan gepeng menjadi 2D atau lenyap total dari layar!",
    contohSoal: {
      q: "Apa yang terjadi jika faktor skala S diisi 0 pada matriks transformasi 3D?",
      a: "Determinan matriks menjadi 0 (singular), objek menguncup dan menghilang (clipping error)."
    }
  },

  '2A': {
    logikaOverview: "Persamaan Bernoulli P + ½ρv² = Konstan membuktikan bahwa ketika udara bergerak lebih cepat (v naik) di bawah bodi supercar, tekanannya (P) anjlok. Beda tekanan atas-bawah ini menciptakan Gaya Tekan ke Bawah (Downforce) yang merekatkan ban ke aspal tikungan tajam!",
    symbolBreakdown: [
      { symbol: "F_down", name: "Downforce (Gaya Tekan Bawah)", unit: "N (Newton)", meaning: "Gaya tekan angin yang merekatkan supercar ke lintasan." },
      { symbol: "Cd", name: "Koefisien Drag Hambat", unit: "tanpa satuan", meaning: "Tingkat kearsitekturan aerodinamik bentuk bodi mobil." },
      { symbol: "ρ", name: "Massa Jenis Udara", unit: "1.225 kg/m³", meaning: "Kerapatan molekul udara di sekitar lintasan." },
      { symbol: "v", name: "Kecepatan Mobil Supercar", unit: "m/s (bukan km/h)", meaning: "Laju laju kendaraan melintasi angin." }
    ],
    step1Title: "1. Ubah Satuan Kecepatan (km/h ke m/s)",
    step1Desc: "Bagi nilai kecepatan km/h dengan 3.6 (Contoh: 360 km/h ÷ 3.6 = 100 m/s). Jangan gunakan km/h langsung!",
    step2Title: "2. Hitung Kuadrat Kecepatan (v²)",
    step2Desc: "Kuadratkan nilai v (100² = 10.000). Masukkan ke rumus F_down = ½ · Cd · ρ · A · v².",
    step3Title: "3. Cek Keseimbangan Downforce vs Drag",
    step3Desc: "Sudut sayap terlalu curam (>30°) memang menaikkan Downforce, tapi memicu 'Stall' (hambatan Drag ekstrem yang memperlambat mobil).",
    jebakanBatman: "⚠️ Jebakan Satuan v²! Kecepatan harus diubah dulu ke m/s sebelum dikuadratkan. Jika Anda memasukkan 360 km/h langsung, hasilnya salah 13 kali lipat!",
    trikMenalar: "⚡ Trik Kuadrat Kecepatan: Kenaikan kecepatan 2x lipat (misal dari 100 km/h ke 200 km/h) akan melipatgandakan Downforce sebesar 4x lipat (2² = 4)!",
    contohSoal: {
      q: "Jika kecepatan supercar naik dari 150 km/h menjadi 300 km/h, berapa kali lipat gaya Downforce-nya bertambah?",
      a: "Kecepatan naik 2x, maka Downforce bertambah 2² = 4 kali lipat!"
    }
  },

  '2B': {
    logikaOverview: "Efisiensi Carnot η = 1 - (Tc / Th) adalah batas efisiensi tertinggi yang bisa dicapai oleh mesin kalor di alam semesta. Semakin jauh selisih antara suhu reservoir panas (Th) dan suhu dingin (Tc), semakin banyak panas yang terkonversi menjadi energi listrik/gerak!",
    symbolBreakdown: [
      { symbol: "η", name: "Efisiensi Siklus Carnot", unit: "% (Persentase)", meaning: "Persentase energi panas yang sukses diubah jadi listrik." },
      { symbol: "Th", name: "Suhu Reservoir Panas", unit: "Kelvin (K)", meaning: "Suhu pembakaran reaktor / ruang bakar." },
      { symbol: "Tc", name: "Suhu Reservoir Dingin", unit: "Kelvin (K)", meaning: "Suhu lingkungan / pendingin radiator." },
      { symbol: "W", name: "Usaha / Daya Kerja Mekanik", unit: "Joule / Watt", meaning: "Daya listrik bersih yang dihasilkan." }
    ],
    step1Title: "1. Wajib Konversi Suhu Celcius ke Kelvin (+ 273.15)",
    step1Desc: "Tambahkan 273 pada suhu °C (Contoh: Th = 650°C + 273 = 923 K; Tc = 30°C + 273 = 303 K).",
    step2Title: "2. Hitung Rasio Suhu (Tc / Th)",
    step2Desc: "Bagi Tc dengan Th (303 / 923 = 0.328).",
    step3Title: "3. Kurangi dari Angka 1 (η = 1 - 0.328 = 0.672 atau 67.2%)",
    step3Desc: "Kalikan 100% untuk mendapatkan persentase efisiensi maksimum mesin.",
    jebakanBatman: "⚠️ Lupa Konversi ke Kelvin! Menghitung 1 - (30/650) dalam Celcius adalah DOSA BESAR dalam Fisika Termodinamika! Wajib pakai Kelvin!",
    trikMenalar: "⚡ Trik Efisiensi 100%: Efisiensi Carnot 100% hanya bisa dicapai jika Suhu Cold (Tc) berada di titik Nol Mutlak (0 Kelvin = -273°C), yang secara fisik mustahil!",
    contohSoal: {
      q: "Mesin bekerja antara 27°C dan 327°C. Berapa efisiensi maksimum Carnot-nya?",
      a: "Tc = 27 + 273 = 300K; Th = 327 + 273 = 600K. η = 1 - (300/600) = 50%!"
    }
  },

  '2C': {
    logikaOverview: "Atenuasi gelombang I = I₀ · e^(-α·d) menjelaskan mengapa sinyal 5G frekuensi tinggi (28 GHz) sangat cepat tapi mudah terhalang dinding beton. Semakin tinggi frekuensi (f), panjang gelombang (λ) makin pendek, membuat koefisien serapan α meloncat drastis!",
    symbolBreakdown: [
      { symbol: "I", name: "Intensitas Sinyal Penerima", unit: "Watt / dBm", meaning: "Sisa kekuatan sinyal HP setelah menembus dinding." },
      { symbol: "I₀", name: "Daya Pancar Antena BTS", unit: "Watt", meaning: "Daya transmisi awal dari menara 5G." },
      { symbol: "α", name: "Koefisien Atenuasi Serapan", unit: "1/cm", meaning: "Tingkat kegelapan serapan bahan (beton/kaca)." },
      { symbol: "d", name: "Ketebalan Dinding", unit: "cm", meaning: "Jarak halangan fisik yang harus ditembus gelombang." }
    ],
    step1Title: "1. Hitung Koefisien Serapan α Dari Frekuensi (f)",
    step1Desc: "Frekuensi tinggi 5G (28 GHz) memiliki α jauh lebih besar daripada 4G (2.4 GHz).",
    step2Title: "2. Hitung Faktor Eksponensial Peluruhan e^(-α·d)",
    step2Desc: "Kalikan α dengan tebal dinding d. Hitung e^(-α·d) untuk mendapatkan sisa persentase sinyal.",
    step3Title: "3. Evaluasi Ambang Batas Koneksi Putus (I < 5W)",
    step3Desc: "Jika daya sinyal penerima I < 5W, sinyal dianggap 'Dead Zone' (terputus total).",
    jebakanBatman: "⚠️ Panjang Gelombang Berbanding Terbalik! f naik = λ turun (c = f·λ). Jangan tertukar: frekuensi 5G besar tapi panjang gelombangnya justru sangat KECIL (milimeter)!",
    trikMenalar: "⚡ Trik Penetrasi: Kenapa radio FM bisa nembus gedung? Karena frekuensinya kecil (100 MHz), panjang gelombangnya panjang (3 meter), sehingga gampang membelok (difraksi)!",
    contohSoal: {
      q: "Mengapa sinyal WiFi 2.4 GHz lebih kuat menembus tembok dibanding WiFi 5 GHz?",
      a: "Frekuensi 2.4 GHz lebih rendah, sehingga koefisien atenuasi α lebih kecil dan panjang gelombang lebih panjang."
    }
  },

  '3A': {
    logikaOverview: "Kinetika farmakokinetik v = k·[A]^n dan C(t) menentukan seberapa cepat kapsul obat larut dalam asam lambung. Dosis harus dijaga di dalam 'Jendela Terapi': Jika terlalu cepat larut -> Overdosis/Toksik; Jika terlalu lambat -> Tidak ngefek (terbuang)!",
    symbolBreakdown: [
      { symbol: "v", name: "Laju Pelarutan Obat", unit: "mg/L/jam", meaning: "Kecepatan senyawa obat masuk ke pembuluh darah." },
      { symbol: "k", name: "Konstanta Laju Reaksi", unit: "1/jam", meaning: "Kemudahan obat larut berdasarkan suhu & formula." },
      { symbol: "A", name: "Luas Permukaan Partikel Obat", unit: "cm²/g", meaning: "Tingkat kehalusan serbuk obat." },
      { symbol: "pH", name: "Derajat Keasaman Lambung", unit: "pH", meaning: "Tingkat keasaman cairan pencernaan." }
    ],
    step1Title: "1. Identifikasi Luas Permukaan A & Keasaman pH",
    step1Desc: "Serbuk puyer halus memiliki A sangat besar, sedangkan tablet utuh memiliki A kecil.",
    step2Title: "2. Hitung Laju Kelarutan v = (k · A) / pH",
    step2Desc: "Bagi hasil kali konstanta k dan luas A dengan nilai pH lambung.",
    step3Title: "3. Cocokkan dengan Jendela Terapi (Aman 10 - 45 mg/L/h)",
    step3Desc: "Jika v > 45 -> Toksik; Jika v < 10 -> Tidak efektif.",
    jebakanBatman: "⚠️ Luas Permukaan Total! Obat puyer ditumbuk halus bukan berarti massanya bertambah, melainkan Luas Permukaan Kontak (A) yang meloncat jutaan kali lipat!",
    trikMenalar: "⚡ Trik Laju Reaksi: Menaikkan suhu atau menghancurkan zat padat menjadi serbuk SELALU mempercepat laju reaksi karena frekuensi tumbukan efektif naik!",
    contohSoal: {
      q: "Mengapa obat cair sirup diminum saat sakit kepala bekerja lebih cepat dari tablet padat?",
      a: "Karena obat sirup sudah dalam bentuk molekul terlarut (Luas Permukaan A maksimal), sehingga laju pelepasan v seketika!"
    }
  },

  '3B': {
    logikaOverview: "Persamaan Nernst E_sel = E⁰_sel - (RT / nF) ln Q menghitung voltase nyata baterai mobil listrik (EV). Voltase baterai tergantung pada konsentrasi ion Litium dan Temperatur (T). Itu sebabnya mobil listrik kehilangan daya tempuh saat musim dingin salju!",
    symbolBreakdown: [
      { symbol: "E_sel", name: "Voltase Aktual Sel Baterai", unit: "Volt (V)", meaning: "Tegangan listrik nyata yang menggerakkan motor EV." },
      { symbol: "E⁰_sel", name: "Potensial Sel Standar (25°C, 1M)", unit: "Volt (V)", meaning: "Voltase ideal bawaan pabrik baterai." },
      { symbol: "T", name: "Suhu Baterai", unit: "Kelvin (K)", meaning: "Temperatur kerja sel elektrokimia." },
      { symbol: "Q", name: "Kuosien Reaksi ([Hasil]/[Pereaksi])", unit: "rasio", meaning: "Tingkat kehabisan daya isi baterai." }
    ],
    step1Title: "1. Hitung Potensial Sel Standar (E⁰_sel = E⁰_katoda - E⁰_anoda)",
    step1Desc: "Kurangi potensial reduksi katoda dengan anoda. Nilai E⁰_sel wajib bernilai POSITIF agar reaksi spontan!",
    step2Title: "2. Masukkan Suhu T (Kelvin) ke Faktor Nernst (RT / nF)",
    step2Desc: "Pada suhu 25°C (298K), faktor (RT/nF)·ln disederhanakan menjadi (0.0592 / n) · log Q.",
    step3Title: "3. Cek Bahaya Suhu Tinggi (>55°C = Thermal Runaway)",
    step3Desc: "Suhu ekstrem merusak lapisan SEI dan berisiko memicu kebakaran elektrokimia.",
    jebakanBatman: "⚠️ Tanda Minus Nernst! Ingat rumus Nernst dikurangi (-)! Jika suhu T naik atau baterai makin habis (Q besar), voltase E_sel justru akan TURUN!",
    trikMenalar: "⚡ Trik Spontanitas (ΔG = -nFE): Reaksi baterai menghasilkan listrik jika E_sel bernilai POSITIF (+) dan Energi Bebas Gibbs ΔG bernilai NEGATIF (-)!",
    contohSoal: {
      q: "Jika sel volta memiliki E⁰_sel = +1.10V, apakah reaksi berlangsung secara spontan?",
      a: "Ya! Karena E⁰_sel bernilai positif (+), reaksi elektrokimia menghasilkan arus listrik alami tanpa bantuan luar."
    }
  },

  '3C': {
    logikaOverview: "Reaksi Haber-Bosch N2 + 3H2 ⇌ 2NH3 (ΔH = -92.4 kJ/mol) adalah reaksi eksotermik pembentukan amonia pupuk. Menurut Azas Le Chatelier: Tekanan tinggi menggeser reaksi ke KANAN (produk banyak), tapi Suhu tinggi justru menggeser reaksi ke KIRI (produk berkurang)! Katalis Fe dipakai untuk mempercepat tanpa mengubah kesetimbangan.",
    symbolBreakdown: [
      { symbol: "K_p", name: "Konstanta Kesetimbangan Tekanan", unit: "atm font", meaning: "Rasio produk amonia dibanding pereaksi saat setimbang." },
      { symbol: "ΔH", name: "Entalpi Reaksi (-92.4 kJ)", unit: "kJ/mol", meaning: "Tanda minus (-) berarti reaksi melepas panas (Eksotermik)." },
      { symbol: "P", name: "Tekanan Reaktor", unit: "atm", meaning: "Tekanan pemampatan gas N2 dan H2." },
      { symbol: "Fe", name: "Katalis Serbuk Besi", unit: "katalis", meaning: "Penyedia rute alternatif menurunkan Energi Aktivasi (Ea)." }
    ],
    step1Title: "1. Analisis Jumlah Koefisien Molekul Gas (4 mol vs 2 mol)",
    step1Desc: "Sisi kiri = 1 N2 + 3 H2 = 4 molekul. Sisi kanan = 2 NH3 = 2 molekul.",
    step2Title: "2. Terapkan Azas Le Chatelier Tekanan (P Naik -> Geser ke Koefisien Kecil)",
    step2Desc: "Naikkan tekanan P reaktor ke 200 atm agar kesetimbangan bergeser ke kanan (sisi 2 molekul NH3).",
    step3Title: "3. Pilih Suhu Kompromi Optimal (450°C + Katalis Fe)",
    step3Desc: "Suhu tidak boleh terlalu dingin (reaksi macet) dan tidak boleh terlalu panas (amonia terurai lagi). Gunakan 450°C + Fe!",
    jebakanBatman: "⚠️ Peran Katalis! Katalis TIDAK MENAMBAH jumlah pupuk NH3, katalis hanya MEMPERCEPAT waktu mencapainya! Jangan salah menjawab di soal pilihan ganda!",
    trikMenalar: "⚡ Trik Geser Kesetimbangan: Tekanan Naik -> Geser ke Koefisien Kecil; Suhu Naik -> Geser ke Reaksi Endotermik!",
    contohSoal: {
      q: "Ke arah manakah kesetimbangan bergeser jika volume tabung reaktor Haber-Bosch diperkecil (tekanan dinaikkan)?",
      a: "Bergeser ke KANAN (pembentukan NH3) karena koefisien kanan (2) lebih kecil dibanding kiri (4)."
    }
  },

  '4A': {
    logikaOverview: "Model Lotka-Volterra dx/dt = αx - βxy merumuskan dinamika siklus pemangsa (predator y) dan mangsa (tikus/hama x). Puncak populasi pemangsa selalu terjadi menyusul sedikit di belakang puncak populasi mangsa. Jika predator dibasmi total, hama meledak dan merusak seluruh panen!",
    symbolBreakdown: [
      { symbol: "dx/dt", name: "Laju Perubahan Populasi Mangsa", unit: "ekor/bulan", meaning: "Pertumbuhan hama dikurangi jumlah yang dimangsa." },
      { symbol: "dy/dt", name: "Laju Perubahan Populasi Predator", unit: "ekor/bulan", meaning: "Pertumbuhan pemangsa dari hasil berburu mangsa." },
      { symbol: "α", name: "Laju Kelahiran Alami Mangsa", unit: "1/bulan", meaning: "Kecepatan reproduksi tikus/hama tanpa pemangsa." },
      { symbol: "β", name: "Tingkat Keberhasilan Berburu", unit: "faktor", meaning: "Kemampuan elang/burung hantu menangkap hama." }
    ],
    step1Title: "1. Cek Keseimbangan Awal Mangsa vs Pemangsa",
    step1Desc: "Hitung rasio mangsa per pemangsa. Rasio ideal adalah 20 - 30 mangsa per 1 pemangsa.",
    step2Title: "2. Evaluasi Titik Kritis Kepunahan (Predator > 75 ekor)",
    step2Desc: "Jika predator terlalu banyak, seluruh mangsa habis dimakan. Setelah mangsa punah, predator disusuli mati kelaparan!",
    step3Title: "3. Terapkan Pengendalian Hayati (Biological Control)",
    step3Desc: "Jaga populasi predator alami tanpa menggunakan pestisida kimia berlebih yang merusak lingkungan.",
    jebakanBatman: "⚠️ Fasa Tertinggal Sinusoidal! Grafik populasi mangsa dan pemangsa TIDAK Pernah Sejajar bersamaan. Puncak predator selalu TERTINGGAL di belakang puncak mangsa!",
    trikMenalar: "⚡ Trik Ekosistem: Membasmi 100% predator alami SELALU memicu ledakan wabah hama yang jauh lebih parah di musim panen berikutnya!",
    contohSoal: {
      q: "Mengapa puncak populasi burung hantu terjadi 2 bulan setelah puncak populasi tikus sawah?",
      a: "Karena butuh waktu fasa reproduksi bagi burung hantu untuk menetaskan anak menyusul melimpahnya makanan."
    }
  },

  '4B': {
    logikaOverview: "Impuls listrik saraf dikendalikan oleh voltase membran Vm (Persamaan Goldman) dan Pompa Na+/K+. Ketika sinyal datang, saluran Natrium terbuka memicu Depolarisasi (voltase meloncat dari -70mV ke +30mV). Lapisan Mielin bertindak sebagai isolator yang membuat sinyal melompat secepat 120 m/s!",
    symbolBreakdown: [
      { symbol: "Vm", name: "Voltase Membran Saraf", unit: "mV (milliVolt)", meaning: "Beda potensial listrik antara dalam dan luar sel saraf." },
      { symbol: "[Na+]o", name: "Konsentrasi Natrium di Luar Sel", unit: "mM", meaning: "Pendorong utama terjadinya depolarisasi positif." },
      { symbol: "Mielin", name: "Lapisan Isolator Lemak Akson", unit: "μm", meaning: "Pembungkus akson penyerap kebocoran listrik." },
      { symbol: "Nodus Ranvier", name: "Celah Tanpa Mielin", unit: "celah", meaning: "Titik loncatan loncatan sinyal listrik saltatori." }
    ],
    step1Title: "1. Cek Ambang Batas Depolarisasi (Threshold -55 mV)",
    step1Desc: "Stimulus harus cukup kuat menaikkan voltase dari istirahat (-70 mV) hingga melewati batas (-55 mV). Jika tidak sampai -55 mV, tidak ada sinyal!",
    step2Title: "2. Evaluasi Efek Obat Bius (Blocking Na+ Channels)",
    step2Desc: "Obat bius lokal (seperti novokain) menyumbat saluran Na+. Voltase gagal naik, sinyal sakit tidak sampai ke otak!",
    step3Title: "3. Hitung Kecepatan Konduksi Saltatori (v ∝ Ketebalan Mielin)",
    step3Desc: "Semakin tebal mielin, sinyal melompat makin jauh antar Nodus Ranvier (Kecepatan hingga 120 m/s).",
    jebakanBatman: "⚠️ Hukum All-or-None! Sinyal saraf bekerja mirip tombol saklar lampu: Jika stimulus melewati ambang (-55mV), impuls memancar 100% penuh. Tidak ada istilah sinyal 'setengah kuat'!",
    trikMenalar: "⚡ Trik Mielin: Saraf bertutup mielin (seperti otot lurik) 10x lebih cepat daripada saraf tanpa mielin (seperti usus organ dalam)!",
    contohSoal: {
      q: "Mengapa rasa sakit akibat suntikan bius lokal di dokter gigi langsung hilang?",
      a: "Karena obat bius menyumbat saluran Na+, mencegah depolarisasi membran sehingga voltase sinyal sakit terputus!"
    }
  },

  '4C': {
    logikaOverview: "Hukum Mendel dan Persamaan Hardy-Weinberg p² + 2pq + q² = 1 menghitung distribusi genotipe populasi keturunan. p adalah frekuensi alel dominan sehat (A), q adalah alel resesif penyakit (a). Individu heterozigot (Aa = 2pq) bertindak sebagai 'carrier' pembawa sifat tanpa gejala.",
    symbolBreakdown: [
      { symbol: "p²", name: "Persentase Homozigot Dominan (AA)", unit: "%", meaning: "Individu sehat sempurna dengan dua alel dominan." },
      { symbol: "2pq", name: "Persentase Heterozigot Carrier (Aa)", unit: "%", meaning: "Individu pembawa gen penyakit tanpa gejala sakit." },
      { symbol: "q²", name: "Persentase Homozigot Resesif (aa)", unit: "%", meaning: "Individu yang mengekspresikan penyakit genetik." },
      { symbol: "CRISPR", name: "Gunting Genom Cas-9", unit: "teknologi", meaning: "Alat pemotong dan pengedit alel mutasi resesif q." }
    ],
    step1Title: "1. Pastikan Rumus Dasar p + q = 1",
    step1Desc: "Jika alel dominan p = 0.7, maka alel resesif q wajib 1 - 0.7 = 0.3.",
    step2Title: "2. Kuadratkan Untuk Mencari Rasio Keturunan (p² + 2pq + q²)",
    step2Desc: "AA = 0.7² = 0.49 (49%); Aa = 2(0.7)(0.3) = 0.42 (42%); aa = 0.3² = 0.09 (9%).",
    step3Title: "3. Hitung Efek CRISPR Pada Keturunan F2 - F5",
    step3Desc: "CRISPR menurunkan frekuensi alel cacat q, sehingga persentase p² meningkat pesat di generasi mendatang.",
    jebakanBatman: "⚠️ Bedakan Frekuensi Alel (p, q) dengan Frekuensi Genotipe (p², 2pq, q²)! Jika soal menyebut 'frekuensi gen a', itu q. Jika menyebut 'persentase penderita', itu q²!",
    trikMenalar: "⚡ Trik Persilangan Monohibrid (Aa × Aa): Hasil genotipe selalu 1 AA : 2 Aa : 1 aa (25% Sehat : 50% Carrier : 25% Sakit)!",
    contohSoal: {
      q: "Jika 16% populasi menderita albino (aa), berapa persentase populasi yang merupakan carrier (Aa)?",
      a: "q² = 0.16 -> q = 0.4 -> p = 0.6. Maka Carrier 2pq = 2(0.6)(0.4) = 0.48 (48%)!"
    }
  },

  '5A': {
    logikaOverview: "Elastisitas Permintaan (PED = %ΔQ / %ΔP) mengukur kepekaan pembeli terhadap perubahan harga. Jika barang elastis (PED > 1), menaikkan harga 10% justru meruntuhkan penjualan 30% sehingga Total Revenue (TR = P·Q) anjlok! Sebaliknya, diskon flash sale memaksimalkan omset pada barang elastis.",
    symbolBreakdown: [
      { symbol: "PED", name: "Koefisien Elastisitas Harga", unit: "tanpa satuan", meaning: "Tingkat kepekaan pembeli bereaksi terhadap harga." },
      { symbol: "TR", name: "Total Revenue (Omset Keuntungan)", unit: "Rupiah (Rp)", meaning: "Total penerimaan hasil kali Harga (P) × Jumlah (Q)." },
      { symbol: "P", name: "Harga Jual Produk (Price)", unit: "Rp", meaning: "Banderol harga yang ditetapkan e-commerce." },
      { symbol: "Q", name: "Jumlah Unit Terjual (Quantity)", unit: "pcs", meaning: "Volume pesanan yang dibeli konsumen." }
    ],
    step1Title: "1. Hitung Persentase Perubahan Harga (%ΔP) & Jumlah (%ΔQ)",
    step1Desc: "%ΔP = (P_baru - P_lama) / P_lama; %ΔQ = (Q_baru - Q_lama) / Q_lama.",
    step2Title: "2. Bagi %ΔQ dengan %ΔP untuk Mencari Nilai PED",
    step2Desc: "Abaikan tanda minus (-). Jika PED > 1 = Elastis; PED < 1 = Inelastis; PED = 1 = Unitari.",
    step3Title: "3. Tentukan Strategi Harga Memaksimalkan Total Revenue (TR)",
    step3Desc: "Barang Elastis (PED > 1) -> TURUNKAN HARGA (Diskon); Barang Inelastis (PED < 1) -> NAIKKAN HARGA!",
    jebakanBatman: "⚠️ Tanda Absolute Pada PED! Koefisien PED selalu bernilai negatif karena hukum permintaan (P naik, Q turun). Namun dalam analisis elastisitas, ambil nilai Mutlak Positifnya!",
    trikMenalar: "⚡ Trik E-Commerce: Kenapa beras harganya naik pembeli tetap beli? Karena beras barang Inelastis (PED < 1, tidak ada substitusi). Kenapa baju branded diskon laku parah? Karena Elastis (PED > 1)!",
    contohSoal: {
      q: "Harga produk naik 10%, penjualan turun 30%. Berapa PED dan apa strategi harga terbaik?",
      a: "PED = 30% / 10% = 3 (Elastis > 1). Turunkan harga kembali untuk melejitkan Total Revenue!"
    }
  },

  '5B': {
    logikaOverview: "Persamaan Kuantitas Uang MV = PY (Irving Fisher) menjelaskan bahwa jika Bank Sentral membiarkan Jumlah Uang Beredar (M) melimpah ruah tanpa diimbangi Produksi Barang (Y), harga-harga sembako (P) akan mengalami Inflasi hebat! BI menaikkan suku bunga BI-Rate untuk menyedot uang beredar kembali ke bank.",
    symbolBreakdown: [
      { symbol: "M", name: "Jumlah Uang Beredar (Money Supply)", unit: "Triliun Rp", meaning: "Volume uang kartal & giral yang beredar di masyarakat." },
      { symbol: "V", name: "Kecepatan Perputaran Uang (Velocity)", unit: "kali", meaning: "Berapa kali selembar uang berpindah tangan per tahun." },
      { symbol: "P", name: "Tingkat Harga Umum (Price Level)", unit: "Indeks Inflasi", meaning: "Harga rata-rata barang dan jasa kebutuhan pokok." },
      { symbol: "Y", name: "Output Produk Nyata (Real GDP)", unit: "Unit / barang", meaning: "Jumlah riil barang & jasa yang diproduksi nasional." }
    ],
    step1Title: "1. Pahami Keseimbangan Sisi Kiri & Kanan (M · V = P · Y)",
    step1Desc: "Jumlah uang dikali kecepatan perputaran sama dengan nilai nominal perekonomian.",
    step2Title: "2. Evaluasi Dampak Penurunan Suku Bunga BI-Rate",
    step2Desc: "Suku bunga turun -> Pinjaman kredit murah -> M naik -> Jika Y tetap, P (Inflasi) melonjak drastis!",
    step3Title: "3. Tentukan Kebijakan Moneter Kontraktif (Pengereman)",
    step3Desc: "Naikkan BI-Rate dan Giro Wajib Minimum (GWM) untuk menekan inflasi ke kisaran sehat 2-3%.",
    jebakanBatman: "⚠️ Dilema Moneter (Stagflasi)! Menaikkan suku bunga memang sukses menurunkan inflasi, namun risiko sampingannya adalah pertumbuhan ekonomi melambat & pengangguran naik!",
    trikMenalar: "⚡ Trik Fisher: Jika Kecepatan Uang (V) dan Output Barang (Y) konstan, pencetakan uang (M) 2x lipat akan langsung membuat Inflasi (P) naik tepat 2x lipat!",
    contohSoal: {
      q: "Apa yang dilakukan Bank Indonesia saat inflasi melonjak hingga 8%?",
      a: "Menaikkan suku bunga BI-Rate agar masyarakat menabung dan uang beredar M berkurang kembali."
    }
  },

  '5C': {
    logikaOverview: "Modern Portfolio Theory (Harry Markowitz) membuktikan bahwa mengombinasikan Saham Bertumbuh (High Risk) dengan Obligasi Pemerintah (Low Risk) dapat menekan Risiko Total (σp²) tanpa memangkas Imbal Hasil E(Rp). Ini tercapai karena kedua aset memiliki korelasi kovarians negatif!",
    symbolBreakdown: [
      { symbol: "E(Rp)", name: "Expected Return Portofolio", unit: "% (Persentase)", meaning: "Perkiraan keuntungan tahunan gabungan aset." },
      { symbol: "σp²", name: "Varians Risiko Total Portofolio", unit: "% (Volatilitas)", meaning: "Tingkat ketidakpastian / risiko kejatuhan modal." },
      { symbol: "wA, wB", name: "Bobot Alokasi Aset A & B", unit: "% (Wajib 100%)", meaning: "Persentase porsi modal di saham dan obligasi." },
      { symbol: "Sharpe", name: "Rasio Sharpe (Risk-Adjusted Return)", unit: "rasio", meaning: "Kualitas keuntungan per 1 unit risiko yang ditanggung." }
    ],
    step1Title: "1. Pastikan Total Bobot Alokasi (wA + wB = 100%)",
    step1Desc: "Jika porsi Saham wA = 70%, maka porsi Obligasi wB wajib 30%.",
    step2Title: "2. Hitung Imbal Hasil Gabungan E(Rp) = wA·E(RA) + wB·E(RB)",
    step2Desc: "Contoh: (0.70 × 15%) + (0.30 × 6%) = 10.5% + 1.8% = 12.3%.",
    step3Title: "3. Maksimalkan Rasio Sharpe (Sharpe = [E(Rp) - Rf] / σp)",
    step3Desc: "Cari titik 'Efficient Frontier' di mana Rasio Sharpe mencapai nilai paling tinggi!",
    jebakanBatman: "⚠️ Jangan Taruh Semua Telur di 1 Keranjang! Portofolio 100% Saham memang memberi return tinggi saat pasar naik, tapi membuat modal musnah 50% saat krisis pasar melanda!",
    trikMenalar: "⚡ Trik Diversifikasi: Korelasi Negatif (ρ < 0) antara Saham dan Obligasi berarti ketika harga saham jatuh, harga obligasi justru naik merebut modal aman!",
    contohSoal: {
      q: "Mengapa investor profesional menggabungkan emas/obligasi dengan saham?",
      a: "Untuk memanfaatkan efek kovarians Markowitz yang meredam volatilitas kejatuhan modal saat krisis."
    }
  },

  '6A': {
    logikaOverview: "Algoritma Dijkstra & A* mencari rute terpendek dengan mengevaluasi bobot edge (kemacetan/jarak) antar node gudang logistik. Algoritma A* menambahkan fungsi heuristik f(n) = g(n) + h(n) yang memperkirakan jarak garis lurus ke tujuan, sehingga 3x lebih cepat dibanding Dijkstra biasa!",
    symbolBreakdown: [
      { symbol: "f(n)", name: "Total Bobot Evaluasi Node n", unit: "bobot rute", meaning: "Nilai prioritas node mana yang akan dibuka kurir." },
      { symbol: "g(n)", name: "Biaya Riil Dari Titik Awal ke Node n", unit: "menit / km", meaning: "Jarak & waktu kemacetan nyata yang telah ditempuh." },
      { symbol: "h(n)", name: "Fungsi Heuristik Perkiraan ke Tujuan", unit: "jarak lurus", meaning: "Tebakan cerdas jarak sisa ke alamat penerima." },
      { symbol: "Node", name: "Titik Gudang / Persimpangan", unit: "titik graf", meaning: "Lokasi transit paket logistik." }
    ],
    step1Title: "1. Inisialisasi Jarak Seluruh Node = Tak Hingga (∞)",
    step1Desc: "Setel jarak titik awal gudang = 0, dan seluruh node lain = ∞.",
    step2Title: "2. Pilih Node dengan Nilai f(n) Terkecil dalam Himpunan Terbuka",
    step2Desc: "Buka tetangga node terpilih dan perbarui jarak g(n) jika ditemukan rute baru yang lebih murah.",
    step3Title: "3. Hentikan Algoritma Begitu Node Tujuan Tercapai",
    step3Desc: "Lacak balik (backtrack) rute dari tujuan ke titik awal untuk mendapatkan urutan jalan Kurir tercepat.",
    jebakanBatman: "⚠️ Bobot Kemacetan Negatif! Algoritma Dijkstra standar TIDAK BISA menangani bobot edge bernilai negatif! Gunakan Algoritma Bellman-Ford jika ada bobot negatif.",
    trikMenalar: "⚡ Trik A* vs Dijkstra: Dijkstra memeriksa ke segala arah melingkar (boros), sedangkan A* hanya memeriksa node yang mengarah ke tujuan (hemat 70% memori)!",
    contohSoal: {
      q: "Mengapa aplikasi Google Maps bisa merender rute tercepat hanya dalam 0.05 detik?",
      a: "Karena menggunakan Algoritma A* dengan fungsi heuristik h(n) mendeteksi kemacetan lalu lintas real-time."
    }
  },

  '6B': {
    logikaOverview: "Kriptografi RSA n = p·q dan c = m^e mod n memanfaatkan sifat sulitnya memfaktorkan dua bilangan prima raksasa p dan q. Siapa pun boleh tahu Kunci Publik (n, e) untuk mengunci pesan, tapi hanya pemilik Kunci Privat d = e⁻¹ mod φ(n) yang bisa membukanya!",
    symbolBreakdown: [
      { symbol: "n", name: "Modulus Kunci Publik (p · q)", unit: "bit angka", meaning: "Hasil kali dua bilangan prima raksasa p dan q." },
      { symbol: "e", name: "Eksponen Enkripsi Publik", unit: "angka relatif prima", meaning: "Angka kunci publik pengacak pesan." },
      { symbol: "d", name: "Eksponen Dekripsi Privat", unit: "kunci rahasia", meaning: "Kunci privat rahasia untuk membuka pesan asli." },
      { symbol: "φ(n)", name: "Fungsi Totient Euler (p-1)(q-1)", unit: "angka rahasia", meaning: "Tulang punggung pembentuk kunci privat d." }
    ],
    step1Title: "1. Pilih Dua Bilangan Prima p dan q Lalu Hitung Modulus n = p · q",
    step1Desc: "Contoh sederhana: p = 61, q = 53 -> n = 3233.",
    step2Title: "2. Hitung Totient Euler φ(n) = (p - 1) · (q - 1)",
    step2Desc: "φ(3233) = (60) · (52) = 3120.",
    step3Title: "3. Cari Kunci Privat d Menggunakan Invers Modular (d · e ≡ 1 mod φ(n))",
    step3Desc: "Pesan asli m dienkripsi menjadi c = m^e mod n dan didekripsi kembali m = c^d mod n.",
    jebakanBatman: "⚠️ Kerentanan Prima Kecil! Jika bilangan prima p dan q terlalu kecil (kurang dari 2048-bit), komputer hacker bisa memfaktorkan n dalam 0.001 detik dan mencuri PIN bank!",
    trikMenalar: "⚡ Trik Keamanan RSA: Kunci Publik e bebas disebar ke internet publik karena hacker TIDAK BISA menghitung d tanpa tahu φ(n), dan φ(n) hanya bisa diketahui jika tahu p & q!",
    contohSoal: {
      q: "Jika p = 3 dan q = 11, berapa nilai modulus n dan totient φ(n)?",
      a: "n = 3 × 11 = 33; φ(n) = (3-1)(11-1) = 2 × 10 = 20!"
    }
  },

  '6C': {
    logikaOverview: "Algoritma Gradient Descent w_baru = w_lama - α · (∂L/∂w) melatih Neural Network AI (seperti ChatGPT) dengan menggeser bobot w searah turunan parsial tercuram hingga Loss Error mendekati 0. Learning Rate (α) menentukan ukuran langkah pergeseran!",
    symbolBreakdown: [
      { symbol: "w", name: "Bobot Synaptic (Weights)", unit: "parameter AI", meaning: "Kekuatan hubungan antar neuron tiruan." },
      { symbol: "α", name: "Learning Rate (Laju Pembelajaran)", unit: "skalar (0.01 - 0.1)", meaning: "Ukuran langkah AI mengoreksi kesalahan bobot." },
      { symbol: "∂L/∂w", name: "Gradient Turunan Parsial Loss", unit: "vektor kemiringan", meaning: "Arah kecuraman tingkat kesalahan model AI." },
      { symbol: "σ(z)", name: "Fungsi Aktivasi Sigmoid/ReLU", unit: "non-linearitas", meaning: "Pemeta nilai neuron agar bisa mempelajari pola rumit." }
    ],
    step1Title: "1. Hitung Nilai Loss / Error Prediksi AI",
    step1Desc: "Bandingkan hasil tebakan AI dengan jawaban asli untuk mendapatkan tingkat kesalahan L.",
    step2Title: "2. Hitung Turunan Parsial Gradient (∂L/∂w) Lewat Backpropagation",
    step2Desc: "Gunakan aturan rantai turunan (Chain Rule) dari layer output mundur ke layer input.",
    step3Title: "3. Perbarui Bobot w_baru = w_lama - α · (∂L/∂w)",
    step3Desc: "Jika α terlalu besar (Overshooting) -> Model Divergen; Jika α terlalu kecil -> Pelatihan AI sangat lambat!",
    jebakanBatman: "⚠️ Overshooting Learning Rate! Mengisi Learning Rate α = 0.9 akan membuat langkah AI loncat-melompati titik terendah (minimum lokal), menyebabkan AI tidak pernah pinter!",
    trikMenalar: "⚡ Trik Konvergensi: Nilai α yang ideal (sekitar 0.01 - 0.05) membuat grafik Loss perlahan meluncur mulus ke bawah seperti bola menggelinding ke dasar lembah!",
    contohSoal: {
      q: "Apa yang terjadi jika Learning Rate AI diisi 0.000001 saat melatih model ChatGPT?",
      a: "Proses pelatihan akan sangat lambat (Underfitting) dan membutuhkan waktu berbulan-bulan untuk konvergen."
    }
  }
};
