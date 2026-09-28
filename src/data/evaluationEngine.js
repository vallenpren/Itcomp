import { EXPERIMENTS_DATA } from './conceptLabData';

/**
 * Universal dynamic calculation engine for LestTry experiments (1A to 6C).
 * Accepts experimentId and parameters object, returning structured reactive evaluation data.
 */
export function evaluateExperiment(experimentId, params = {}) {
  const expData = EXPERIMENTS_DATA[experimentId];

  switch (experimentId) {
    // ----------------------------------------------------
    // RUMPUN MATEMATIKA (1A, 1B, 1C)
    // ----------------------------------------------------
    case '1A': {
      const burnRate = Number(params.fuelBurnRate ?? params.burnRate) >= 0 ? Number(params.fuelBurnRate ?? params.burnRate) : 150;
      const payloadMass = Number(params.payloadMass) >= 0 ? Number(params.payloadMass) : 4000;
      const launchAngle = Number(params.launchAngle) >= 0 ? Number(params.launchAngle) : 75;

      const fuelMass = 5000;
      const totalMass = payloadMass + fuelMass;
      const thrust = burnRate * 800; // F = m_dot * v_exhaust
      const gravityForce = totalMass * 9.8;
      const acceleration = totalMass > 0 ? (thrust - gravityForce) / totalMass : 0;

      const isThrustOk = acceleration > 0.2;
      const isAngleOk = launchAngle >= 50;
      const isSuccess = isThrustOk && isAngleOk;

      let statusTitle = 'STATUS HASIL: Target Berhasil Dicapai (Orbit LEO Optimal)';
      let badge = 'ORBIT OPTIMAL';
      let status = 'optimal';

      if (!isThrustOk) {
        status = 'failed';
        badge = 'GAGAL LUNCUR';
        statusTitle = 'STATUS HASIL: Roket Kehilangan Gaya Dorong (Gravitasi Dominate)';
      } else if (!isAngleOk) {
        status = 'failed';
        badge = 'TERBAKAR ATMOSFER';
        statusTitle = 'STATUS HASIL: Sudut Luncur Terlalu Landai (Gesekan Udara Ekstrem)';
      }

      return {
        status,
        statusTitle,
        whyText: `Gaya dorong mesin roket (${Math.round(thrust).toLocaleString()} N) ${isThrustOk ? 'berhasil melampaui' : 'kalah kuat dibanding'} tarikan gaya gravitasi bumi (${Math.round(gravityForce).toLocaleString()} N). Laju pembakaran (${burnRate} kg/s) pada massa total roket (${totalMass.toLocaleString()} kg) menghasilkan percepatan instan ${acceleration.toFixed(1)} m/s². Sudut elevasi saat ini ${launchAngle}°.`,
        conceptText: `Sesuai f'(t) = dv/dt, percepatan bernilai ${acceleration > 0 ? 'positif (+)' : 'negatif (-)'}. ${isSuccess ? 'Momentum dan elevasi cukup untuk menembus atmosfer menuju orbit LEO.' : (!isThrustOk ? 'Gaya dorong tidak mampu mengangkat berat total roket.' : 'Komponen gaya vertikal terlalu lemah karena sudut landai.')}`,
        solutionText: isSuccess 
          ? 'Konfigurasi parameter ideal! Roket berhasil meluncur dan bertahan di orbit secara stabil.'
          : (!isThrustOk 
            ? `Geser slider Laju Pembakaran ke atas ${Math.ceil(gravityForce / 800)} kg/s (saat ini ${burnRate} kg/s) atau kurangi Massa Payload agar percepatan bernilai positif!` 
            : `Geser Sudut Luncur (θ) naik mendekati 75° (saat ini ${launchAngle}°) agar roket cepat menembus atmosfer tipis!`),
        formulaKatex: "f'(t) = \\frac{dv}{dt} = \\frac{F_{\\text{dorong}} - m(t)g}{m(t)}",
        badge,
        metrics: { Thrust: `${Math.round(thrust)}N`, Acc: `${acceleration.toFixed(1)}m/s²`, Status: status === 'optimal' ? 'Success' : 'Failed' }
      };
    }

    case '1B': {
      const spanLength = Number(params.archSpan ?? params.spanLength) > 0 ? Number(params.archSpan ?? params.spanLength) : 500;
      const cableThickness = Number(params.cableThickness ?? params.cableSag) > 0 ? Number(params.cableThickness ?? params.cableSag) : 45;
      const totalLoad = Number(params.trafficLoad ?? params.totalLoad) > 0 ? Number(params.trafficLoad ?? params.totalLoad) : 180;

      const tension = (totalLoad * Math.pow(spanLength, 2)) / (8 * cableThickness * 10);
      const isSafe = tension <= 1200;

      return {
        status: isSafe ? 'optimal' : 'failed',
        statusTitle: isSafe 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Distribusi Tegangan Kabel Aman)' 
          : 'STATUS HASIL: Struktur Retak / Putus (Tegangan Melebihi Batas Critical)',
        whyText: `Hasil kalkulasi integral regangan busur mencatat gaya tegangan puncak kabel sebesar ${Math.round(tension).toLocaleString()} kN (batas izin 1.200 kN). Ketebalan kabel (${cableThickness} cm) pada bentang jembatan (${spanLength} m) dengan beban (${totalLoad} ton/m) berada dalam kondisi ${isSafe ? 'kokoh & aman' : 'berisiko roboh'}.`,
        conceptText: `Mengacu pada integral tegangan busur T = \\frac{w \\cdot L^2}{8 \\cdot d} = \\frac{${totalLoad} \\cdot ${spanLength}^2}{8 \\cdot ${cableThickness}0} = ${Math.round(tension)} \\text{ kN}.`,
        solutionText: isSafe 
          ? 'Desain jembatan gantung stabil dan memenuhi standar keamanan teknik sipil!' 
          : `Tingkatkan ketebalan kabel di atas ${Math.ceil((totalLoad * Math.pow(spanLength, 2)) / (8 * 1200 * 10))} cm atau kurangi beban lalu lintas di bawah 150 ton/m!`,
        formulaKatex: "T = \\frac{w \\cdot L^2}{8 \\cdot d}",
        badge: isSafe ? 'STRUKTUR STABIL' : 'RISIKO AMBRUK',
        metrics: { Tension: `${Math.round(tension)}kN`, Thickness: `${cableThickness}cm`, Status: isSafe ? 'Safe' : 'Critical' }
      };
    }

    case '1C': {
      const angle = Number(params.rotationAngle) >= 0 ? Number(params.rotationAngle) : 45;
      const scale = Number(params.scale3d ?? params.scaleFactor) > 0 ? Number(params.scale3d ?? params.scaleFactor) : 1.0;

      const det = Math.pow(scale, 3);
      const isNonSingular = scale >= 0.6 && scale <= 2.5;

      return {
        status: isNonSingular ? 'optimal' : 'failed',
        statusTitle: isNonSingular 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Render 60 FPS Mulus)' 
          : 'STATUS HASIL: Glitch Skala Singular (Karakter Gepeng / Hilang)',
        whyText: `Matriks 3D dengan skala S = ${scale}x dan rotasi ${angle}° menghasilkan determinan det(M) = ${det.toFixed(3)}. ${isNonSingular ? 'Objek ter-render sempurna tanpa distorsi geometri.' : 'Skala di luar rentang aman memicu distorsi ruang 3D.'}`,
        conceptText: `Berdasarkan transformasi V' = M · V, determinan matriks volume \\det(M) = S^3 = ${det.toFixed(3)}. ${isNonSingular ? 'Matriks invers terdefinisi dengan presisi.' : 'Determinan ekstrem merusak transformasi invers GPU.'}`,
        solutionText: isNonSingular 
          ? 'Transformasi matriks grafik 3D stabil dan bebas dari bug singularitas!' 
          : 'Atur Skala Vektor 3D ke rentang 0.6x - 2.5x (saat ini ' + scale + 'x) untuk menstabilkan render GPU!',
        formulaKatex: "V' = M \\cdot V, \\quad \\det(M) = S^3",
        badge: isNonSingular ? 'RENDER OPTIMAL' : 'GLITCH SINGULAR',
        metrics: { Det: det.toFixed(3), Angle: `${Math.round(angle)}°`, Scale: `${scale}x` }
      };
    }

    // ----------------------------------------------------
    // RUMPUN FISIKA (2A, 2B, 2C)
    // ----------------------------------------------------
    case '2A': {
      const dragCoeff = Number(params.dragCoeff) || 0.35;
      const wingAngle = Number(params.wingAngle) >= 0 ? Number(params.wingAngle) : 15;
      const speed = Number(params.speed) || 240;

      const vMS = speed / 3.6;
      const downforce = 0.5 * dragCoeff * 1.225 * Math.sin((wingAngle * Math.PI) / 180) * Math.pow(vMS, 2);

      const isStall = wingAngle > 28 || speed > 330;
      const isUndersteer = downforce < 350 && speed > 200;
      const isSuccess = !isStall && !isUndersteer;

      let statusTitle = 'STATUS HASIL: Target Berhasil Dicapai (Aerodinamis Presisi F1)';
      let badge = 'AERODINAMIS AMAN';
      let status = 'optimal';

      if (isStall) {
        status = 'failed';
        badge = 'STALL AERODINAMIS';
        statusTitle = 'STATUS HASIL: Mobil Terlempar / Drag Ekstrem (Boundary Layer Separation)';
      } else if (isUndersteer) {
        status = 'failed';
        badge = 'RISIKO TERGELINCIR';
        statusTitle = 'STATUS HASIL: Downforce Terlalu Kecil (Cengkraman Ban Lemah)';
      }

      return {
        status,
        statusTitle,
        whyText: `Pada kecepatan ${speed} km/h dengan sudut sayap ${wingAngle}°, supercar menghasilkan downforce ${Math.round(downforce)} N. ${isSuccess ? 'Mobil menempel ketat di lintasan.' : (isStall ? 'Drag udara ekstrem memicu turbulensi dan hilang cengkraman.' : 'Gaya tekan kurang menekan bodi ke aspal.')}`,
        conceptText: `Mengacu Hukum Bernoulli P + \\frac{1}{2}\\rho v^2 = C. Beda tekanan udara atas-bawah menghasilkan downforce ${Math.round(downforce)} N.`,
        solutionText: isSuccess 
          ? 'Aerodinamika supercar dalam kondisi paling ideal untuk tikungan tajam!' 
          : (isStall ? 'Kurangi Sudut Sayap di bawah 25° dan turunkan kecepatan!' : 'Naikkan Sudut Sayap ke 15°-25° untuk menambah gaya downforce!'),
        formulaKatex: "F_{\\text{down}} = \\frac{1}{2} C_d \\cdot \\rho \\cdot A \\cdot v^2",
        badge,
        metrics: { Downforce: `${Math.round(downforce)}N`, Speed: `${speed}km/h` }
      };
    }

    case '2B': {
      const tempHot = Number(params.tempHot) || 650;
      const tempCold = Number(params.tempCold) || 30;
      const gasPressure = Number(params.gasPressure) || 40;

      const thK = tempHot + 273.15;
      const tcK = tempCold + 273.15;
      const efficiency = (1 - (tcK / thK)) * 100;

      const isOverpressure = gasPressure > 75 || tempHot > 1000;
      const isLowEfficiency = efficiency < 35;
      const isSuccess = !isOverpressure && !isLowEfficiency;

      let statusTitle = 'STATUS HASIL: Target Berhasil Dicapai (Efisiensi Reaktor Carnot Optimal)';
      let badge = 'REAKTOR STABIL';
      let status = 'optimal';

      if (isOverpressure) {
        status = 'failed';
        badge = 'OVERPRESSURE / MELEDAK';
        statusTitle = 'STATUS HASIL: Reaktor Meledak (Tekanan Piston Melebihi Yield Strength)';
      } else if (isLowEfficiency) {
        status = 'failed';
        badge = 'PEMBOROSAN KALOR';
        statusTitle = 'STATUS HASIL: Efisiensi Terlalu Rendah (Terlalu Banyak Kalor Terbuang)';
      }

      return {
        status,
        statusTitle,
        whyText: `Suhu Th (${tempHot}°C) dan Tc (${tempCold}°C) menghasilkan efisiensi Carnot ${efficiency.toFixed(1)}% pada tekanan ${gasPressure} atm. ${isSuccess ? 'Reaktor mengubah panas menjadi daya listrik secara efisien.' : (isOverpressure ? 'Tekanan memicu risiko retak termal mendadak.' : 'Perbedaan suhu terlalu rendah.')}`,
        conceptText: `Berdasarkan Hukum Termodinamika 2, \\eta_{\\text{Carnot}} = 1 - \\frac{T_c}{T_h} = ${efficiency.toFixed(1)}\\%.`,
        solutionText: isSuccess 
          ? 'Reaktor beroperasi pada efisiensi maksimum aman!' 
          : (isOverpressure ? 'Turunkan Tekanan Piston di bawah 70 atm dan kurangi suhu Th!' : 'Naikkan Suhu Reservoir Th di atas 600°C!'),
        formulaKatex: "\\eta_{\\text{Carnot}} = 1 - \\frac{T_c}{T_h}",
        badge,
        metrics: { Efficiency: `${efficiency.toFixed(1)}%`, Pressure: `${gasPressure}atm` }
      };
    }

    case '2C': {
      const sourceFreq = Number(params.sourceFreq) || 440;
      const sourceSpeed = Number(params.sourceSpeed) || 120;
      const mediumTemp = Number(params.mediumTemp) || 25;

      const speedOfSound = 331 + 0.6 * mediumTemp;
      const isSonicBoom = sourceSpeed >= speedOfSound;
      const isDangerSpeed = sourceSpeed > 280;
      const isSuccess = !isSonicBoom && !isDangerSpeed;

      const observedFreq = isSonicBoom 
        ? 0 
        : Math.round(sourceFreq * (speedOfSound / (speedOfSound - sourceSpeed)));

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Gelombang Doppler Presisi)' 
          : 'STATUS HASIL: Mach 1 Shockwave (Dentuman Sonic Boom Kritis)',
        whyText: `Sumber bunyi melaju ${sourceSpeed} m/s (kecepatan suara ${Math.round(speedOfSound)} m/s). Frekuensi terdeteksi pengamat ${isSonicBoom ? 'Terdistorsi Mach Boom' : observedFreq + ' Hz'}.`,
        conceptText: `Efek Doppler f' = f \\cdot \\frac{v}{v - v_s}. ${isSuccess ? 'Pergeseran frekuensi stabil.' : 'Kecepatan mendekati Mach 1 memicu penumpukan gelombang shockwave.'}`,
        solutionText: isSuccess 
          ? 'Deteksi spektrum Efek Doppler akurat!' 
          : 'Kurangi kecepatan sumber di bawah ' + Math.round(speedOfSound * 0.8) + ' m/s agar gelombang suara tidak menumpuk!',
        formulaKatex: "f' = f \\left( \\frac{v}{v - v_s} \\right)",
        badge: isSuccess ? 'DOPPLER STABIL' : 'SONIC BOOM',
        metrics: { Freq: `${observedFreq}Hz`, Mach: (sourceSpeed / speedOfSound).toFixed(2) }
      };
    }

    // ----------------------------------------------------
    // RUMPUN KIMIA (3A, 3B, 3C)
    // ----------------------------------------------------
    case '3A': {
      const tempKelvin = Number(params.tempKelvin) || 350;
      const activationEnergy = Number(params.activationEnergy) || 45;
      const catalystConc = Number(params.catalystConc) || 1.5;

      const R = 8.314;
      const k = Math.exp(-(activationEnergy * 1000) / (R * tempKelvin)) * (1 + catalystConc);

      const isTooSlow = tempKelvin < 300 || k < 1e-8;
      const isRunaway = tempKelvin > 460;
      const isSuccess = !isTooSlow && !isRunaway;

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Laju Reaksi Arrhenius Ideal)' 
          : (isRunaway ? 'STATUS HASIL: Thermal Runaway (Reaktor Overheat)' : 'STATUS HASIL: Reaksi Stagnan (Energi Aktivasi Kurang)'),
        whyText: `Konstanta laju reaksi k = ${k.toExponential(2)} pada suhu ${tempKelvin} K dengan katalis ${catalystConc} M. ${isSuccess ? 'Produksi molekul berlangsung cepat & terkendali.' : (isRunaway ? 'Suhu tinggi memicu reaksi eksoterm tak terkontrol.' : 'Molekul tidak memiliki energi kinetik cukup untuk bertabrakan.')}`,
        conceptText: `Persamaan Arrhenius k = A \\cdot e^{-E_a / RT}. Katalis memotong energi aktivasi Ea.`,
        solutionText: isSuccess 
          ? 'Laju reaksi dan efisiensi produk kimia optimal!' 
          : (isRunaway ? 'Turunkan suhu reaktor di bawah 420 K!' : 'Naikkan suhu di atas 330 K atau tambah konsentrasi katalis!'),
        formulaKatex: "k = A \\cdot e^{-\\frac{E_a}{RT}}",
        badge: isSuccess ? 'REAKSI OPTIMAL' : 'REAKSI STAGNAN/OVERHEAT',
        metrics: { RateK: k.toExponential(2), Temp: `${tempKelvin}K` }
      };
    }

    case '3B': {
      const reactPressure = Number(params.reactPressure) || 25;
      const reactTemp = Number(params.reactTemp) || 450;

      const isHighPressureDanger = reactPressure > 40;
      const isLowYield = reactTemp > 650;
      const isSuccess = !isHighPressureDanger && !isLowYield;

      const yieldPct = Math.max(10, Math.min(95, Math.round(90 - (reactTemp - 300) * 0.12 + reactPressure * 0.5)));

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Hasil Produk Haber-Bosch Optimal)' 
          : (isHighPressureDanger ? 'STATUS HASIL: Risiko Kebocoran Tangki Tekanan Tinggi' : 'STATUS HASIL: Pergeseran Kesetimbangan Ke Kiri (Hasil Rendah)'),
        whyText: `Prinsip Le Chatelier pada ${reactPressure} atm dan ${reactTemp}°C menghasilkan produk amonia ${yieldPct}%. ${isSuccess ? 'Kesetimbangan bergeser optimal ke arah produk.' : 'Kondisi merugikan pembentukan amonia.'}`,
        conceptText: `Prinsip Le Chatelier: Kenaikan P menggeser kesetimbangan ke koefisien gas terkecil.`,
        solutionText: isSuccess 
          ? 'Kondisi industri Haber-Bosch berada pada efisiensi maksimal!' 
          : 'Atur tekanan di bawah 35 atm dan jaga suhu di kisaran 400°C - 450°C!',
        formulaKatex: "N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)",
        badge: isSuccess ? 'YIELD TINGGI' : 'YIELD RENDAH',
        metrics: { Yield: `${yieldPct}%`, Pressure: `${reactPressure}atm` }
      };
    }

    case '3C': {
      const zincConc = Number(params.zincConc) || 0.1;
      const copperConc = Number(params.copperConc) || 1.0;

      const Q = zincConc / copperConc;
      const E0 = 1.10;
      const voltage = E0 - (0.0592 / 2) * Math.log10(Q);
      const isSuccess = voltage >= 0.95;

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Tegangan Sel Volta Maksimal)' 
          : 'STATUS HASIL: Baterai Dropping / Mati (Potensial Sel Rendah)',
        whyText: `Tegangan sel volta terukur ${voltage.toFixed(2)} V pada rasio konsentrasi [Zn²⁺]/[Cu²⁺] = ${Q.toFixed(2)}. ${isSuccess ? 'Aliran elektron kuat memicu arus listrik tinggi.' : 'Akumulasi ion Zn²⁺ menurunkan beda potensial sel.'}`,
        conceptText: `Persamaan Nernst E = E^0 - \\frac{0.0592}{n} \\log Q = 1.10 - 0.0296 \\log(${Q.toFixed(2)}) = ${voltage.toFixed(2)} \\text{ V}.`,
        solutionText: isSuccess 
          ? 'Kapasitas dan tegangan baterai sel volta sangat stabil!' 
          : 'Kurangi konsentrasi ion Zn²⁺ atau tingkatkan konsentrasi larutan Cu²⁺!',
        formulaKatex: "E = E^0 - \\frac{RT}{nF} \\ln Q",
        badge: isSuccess ? 'VOLTA STABIL' : 'VOLTAGE DROP',
        metrics: { Voltage: `${voltage.toFixed(2)}V`, Q: Q.toFixed(2) }
      };
    }

    // ----------------------------------------------------
    // RUMPUN BIOLOGI (4A, 4B, 4C)
    // ----------------------------------------------------
    case '4A': {
      const tempC = Number(params.tempC) || 37;
      const phLevel = Number(params.phLevel) || 7.4;

      const isDenatured = tempC > 52 || phLevel < 4 || phLevel > 10;
      const isInactive = tempC < 15;
      const isSuccess = !isDenatured && !isInactive;

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Aktivitas Enzim Michaelis-Menten Peak)' 
          : (isDenatured ? 'STATUS HASIL: Enzim Terdenaturasi (Struktur Protein Rusak)' : 'STATUS HASIL: Enzim Inaktif (Energi Kinetik Terlalu Rendah)'),
        whyText: `Enzim pada suhu ${tempC}°C dan pH ${phLevel}. ${isSuccess ? 'Laju reaksi enzimatis bekerja pada kecepatan maksimum Vmax.' : (isDenatured ? 'Suhu/pH ekstrem merusak ikatan hidrogen struktur tersier enzim.' : 'Inaktivasi akibat suhu dingin.')}`,
        conceptText: `Persamaan Michaelis-Menten v = \\frac{V_{\\max} [S]}{K_m + [S]}. Kerja enzim membutuhkan konformasi situs aktif presisi.`,
        solutionText: isSuccess 
          ? 'Kondisi fisiologis substrat-enzim berada dalam zona puncak biologis!' 
          : 'Kembalikan suhu ke 37°C dan atur pH pada rentang netral 6.8 - 7.6!',
        formulaKatex: "v = \\frac{V_{\\max} [S]}{K_m + [S]}",
        badge: isSuccess ? 'ENZIM AKTIF' : 'DENATURASI',
        metrics: { Temp: `${tempC}°C`, pH: phLevel }
      };
    }

    case '4B': {
      const predatorPop = Number(params.predatorPop) || 25;
      const preyPop = Number(params.preyPop) || 300;

      const ratio = preyPop / (predatorPop || 1);
      const isCollapse = ratio < 3 || preyPop < 50;
      const isOverpop = ratio > 35;
      const isSuccess = !isCollapse && !isOverpop;

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Ekosistem Lotka-Volterra Seimbang)' 
          : (isCollapse ? 'STATUS HASIL: Kepunahan Mangsa & Kolaps Rantai Makanan' : 'STATUS HASIL: Ledakan Hama Mangsa (Predator Terlalu Sedikit)'),
        whyText: `Populasi ${predatorPop} predator dan ${preyPop} mangsa (Rasio 1:${Math.round(ratio)}). ${isSuccess ? 'Siklus populasi berosilasi stabil.' : (isCollapse ? 'Predator memangsa habis populasi mangsa.' : 'Kurangnya kontrol pemangsa memicu overpopulasi hama.')}`,
        conceptText: `Persamaan Diferensial Lotka-Volterra \\frac{dx}{dt} = \\alpha x - \\beta x y.`,
        solutionText: isSuccess 
          ? 'Keseimbangan jaring-jaring makanan dalam cagar alam terjaga ideal!' 
          : 'Jaga rasio predator:mangsa pada kisaran 1:10 hingga 1:20!',
        formulaKatex: "\\frac{dx}{dt} = \\alpha x - \\beta x y",
        badge: isSuccess ? 'EKOSISTEM STABIL' : 'KOLAPS EKOLOGI',
        metrics: { Ratio: `1:${Math.round(ratio)}`, Status: isSuccess ? 'Balanced' : 'Unbalanced' }
      };
    }

    case '4C': {
      const mutationRate = Number(params.mutationRate) || 0.01;
      const popSize = Number(params.popSize) || 1000;

      const isDriftDanger = popSize < 150;
      const isHighMutation = mutationRate > 0.04;
      const isSuccess = !isDriftDanger && !isHighMutation;

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Kesetimbangan Genetik Hardy-Weinberg)' 
          : (isDriftDanger ? 'STATUS HASIL: Genetic Drift & Inbreeding (Kepunahan Keanekaragaman Gen)' : 'STATUS HASIL: Mutasi Ekstrem Merusak Kolam Genetik'),
        whyText: `Populasi ${popSize} individu dengan tingkat mutasi ${(mutationRate * 100).toFixed(1)}%. ${isSuccess ? 'Frekuensi alel p² + 2pq + q² = 1 stabil antargenerasi.' : (isDriftDanger ? 'Ukuran populasi terlalu kecil memicu erosi variasi genetik.' : 'Mutasi tinggi mengganggu populasi ideal.')}`,
        conceptText: `Hukum Hardy-Weinberg p^2 + 2pq + q^2 = 1. Populasi besar tanpa seleksi/mutasi berada dalam kesetimbangan.`,
        solutionText: isSuccess 
          ? 'Genetika populasi memenuhi syarat hukum Hardy-Weinberg!' 
          : 'Tingkatkan populasi sampel di atas 500 individu dan tekan angka mutasi!',
        formulaKatex: "p^2 + 2pq + q^2 = 1",
        badge: isSuccess ? 'GENETIK STABIL' : 'GENETIC DRIFT',
        metrics: { Pop: popSize, MutRate: `${(mutationRate * 100).toFixed(1)}%` }
      };
    }

    // ----------------------------------------------------
    // RUMPUN EKONOMI (5A, 5B, 5C)
    // ----------------------------------------------------
    case '5A': {
      const price = Number(params.price) || 100;
      const substitutePrice = Number(params.substitutePrice) || 100;

      const elasticity = Number((price / (substitutePrice || 1)).toFixed(2));
      const isInefficient = price > substitutePrice * 2.2;
      const isSuccess = !isInefficient && elasticity <= 1.8;

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Harga Elastisitas Pasar Optimal)' 
          : 'STATUS HASIL: Konsumen Kabur Ke Barang Substitusi (Harga Terlalu Mahal)',
        whyText: `Harga produk Rp${price} vs substitusi Rp${substitutePrice} (Elastisitas ${elasticity}). ${isSuccess ? 'Permintaan barang stabil dan memaksimalkan pendapatan (TR).' : 'Kenaikan harga berlebih menurunkan permintaan secara drastis.'}`,
        conceptText: `Elastisitas Permintaan E_d = \\frac{\\% \\Delta Q}{\\% \\Delta P}. ${isSuccess ? 'Kombinasi P & Q mencapai Revenue Maksimum.' : 'Pasar bersifat sangat elastis.'}`,
        solutionText: isSuccess 
          ? 'Strategi penetapan harga pasar memodelkan surplus konsumen yang ideal!' 
          : 'Turunkan harga jual mendekati harga kompetitor substitusi!',
        formulaKatex: "E_d = \\frac{\\% \\Delta Q}{\\% \\Delta P}",
        badge: isSuccess ? 'REVENUE MAKSIMAL' : 'PENJUALAN ANJLOK',
        metrics: { Elasticity: elasticity, Price: `Rp${price}` }
      };
    }

    case '5B': {
      const taxRate = Number(params.taxRate) || 0.15;
      const govSpending = Number(params.govSpending) || 2000;

      const isStagflation = taxRate > 0.35;
      const isDeficitDanger = govSpending > 4500 && taxRate < 0.10;
      const isSuccess = !isStagflation && !isDeficitDanger;

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Keseimbangan Pasar IS-LM Makro)' 
          : (isStagflation ? 'STATUS HASIL: Resesi & Stagflasi Ekonomi (Pajak Terlalu Ditinggikan)' : 'STATUS HASIL: Defisit Fiskal Kritis (Pengeluaran Negara Pembengkakan)'),
        whyText: `Pajak ${(taxRate * 100).toFixed(0)}% dan Pengeluaran Pemerintah Rp${govSpending}M. ${isSuccess ? 'Pertumbuhan GDP dan inflasi berada pada kurva keseimbangan IS-LM.' : (isStagflation ? 'Pajak tinggi mematikan konsumsi rumah tangga.' : 'Defisit merusak stabilitas moneter.')}`,
        conceptText: `Kurva IS-LM Y = C(Y-T) + I(r) + G. Kebijakan fiskal memengaruhi output nasional.`,
        solutionText: isSuccess 
          ? 'Kebijakan fiskal makroekonomi berhasil menjaga daya beli masyarakat!' 
          : 'Jaga tarif pajak di kisaran 15%-25% dan kendalikan anggaran belanja negara!',
        formulaKatex: "Y = C(Y-T) + I(r) + G",
        badge: isSuccess ? 'IS-LM BALANCED' : 'RESESI / DEFISIT',
        metrics: { Tax: `${(taxRate * 100).toFixed(0)}%`, Spending: `Rp${govSpending}M` }
      };
    }

    case '5C': {
      const assetWeightA = Number(params.assetWeightA) ?? 0.6;
      const riskTolerance = Number(params.riskTolerance) || 5;

      const returnPct = assetWeightA * 12 + (1 - assetWeightA) * 6;
      const riskScore = Math.abs(assetWeightA * 8 - (1 - assetWeightA) * 3);

      const isHighRisk = riskScore > riskTolerance + 2;
      const isSuccess = !isHighRisk;

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Portofolio Markowitz Efficient Frontier)' 
          : 'STATUS HASIL: Risiko Portofolio Melampaui Batas Toleransi Investor',
        whyText: `Alokasi Aset ${(assetWeightA * 100).toFixed(0)}% : ${((1 - assetWeightA) * 100).toFixed(0)}% menghasilkan imbal hasil ${returnPct.toFixed(1)}% dengan skor risiko ${riskScore.toFixed(1)} (Batas toleransi ${riskTolerance}).`,
        conceptText: `Model Portofolio Markowitz \\min \\sigma_p^2 \\text{ subject to } E(R_p) \\ge R_{\\text{target}}.`,
        solutionText: isSuccess 
          ? 'Diversifikasi aset investasi berada pada kurva Efficient Frontier!' 
          : 'Rebalancing bobot portofolio dengan menambah porsi aset obligasi aman!',
        formulaKatex: "E(R_p) = \\sum w_i E(R_i)",
        badge: isSuccess ? 'EFFICIENT FRONTIER' : 'RISK OVERLIMIT',
        metrics: { Return: `${returnPct.toFixed(1)}%`, Risk: riskScore.toFixed(1) }
      };
    }

    // ----------------------------------------------------
    // RUMPUN INFORMATIKA (6A, 6B, 6C)
    // ----------------------------------------------------
    case '6A': {
      const warehouseNodes = Number(params.warehouseNodes || params.nodeCount) || 12;
      const trafficJam = Number(params.trafficJam || params.trafficFactor) || 4;
      const fuelWeight = Number(params.fuelWeight || params.heuristicWeight) || 2;

      const isTrafficJamHigh = trafficJam > 6;
      const isSuccess = !isTrafficJamHigh && fuelWeight >= 1.0;

      const totalCost = warehouseNodes * 12 * (trafficJam / 3);

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Rute Terpendek Dijkstra/A* Efisien)' 
          : 'STATUS HASIL: Bottleneck Logistik (Kemacetan Rute Parah)',
        whyText: `Rute logistik pada ${warehouseNodes} titik gudang dengan faktor kemacetan ${trafficJam}x menghasilkan estimasi waktu tempuh ${Math.round(totalCost)} menit. ${isSuccess ? 'Algoritma A* berhasil menemukan rute terpendek.' : 'Kemacetan memicu keterlambatan pengiriman armada kurir.'}`,
        conceptText: `Fungsi Heuristik A* f(n) = g(n) + h(n). Heuristik berbobot memangkas pencarian simpul berputar.`,
        solutionText: isSuccess 
          ? 'Navigasi algoritma logistik e-commerce siap dialokasikan ke armada kurir!' 
          : 'Pilih jalur alternatif untuk menurunkan faktor kemacetan di bawah 5x!',
        formulaKatex: "f(n) = g(n) + h(n)",
        badge: isSuccess ? 'RUTE OPTIMAL' : 'BOTTLENECK',
        metrics: { TravelTime: `${Math.round(totalCost)} mnt`, Nodes: warehouseNodes }
      };
    }

    case '6B': {
      const primeP = Number(params.primeP) || 61;
      const primeQ = Number(params.primeQ) || 53;
      const publicExpE = Number(params.publicExpE) || 17;

      const n = primeP * primeQ;
      const phi = (primeP - 1) * (primeQ - 1);

      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const isValidRSA = primeP !== primeQ && gcd(publicExpE, phi) === 1;

      return {
        status: isValidRSA ? 'optimal' : 'failed',
        statusTitle: isValidRSA 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Kunci Kriptografi RSA Aman Presisi)' 
          : 'STATUS HASIL: Kunci RSA Tidak Valid / Rentan Diretas (GCD(e, φ) ≠ 1)',
        whyText: `Kunci RSA n = p × q = ${n}, φ(n) = ${phi} dengan eksponen publik e = ${publicExpE}. ${isValidRSA ? 'Kunci memenuhi syarat relatif prima (aman dari kejahatan siber).' : 'Eksponen publik e bukan relatif prima terhadap φ(n), enkripsi gagal!' }`,
        conceptText: `Enkripsi RSA c = m^e \\pmod n, d = e^{-1} \\pmod{\\phi(n)}. Persyaratan mutlak: \\gcd(e, \\phi(n)) = 1.`,
        solutionText: isValidRSA 
          ? 'Enkripsi data perbankan aman dari peretasan komputer!' 
          : 'Pilih eksponen publik e yang relatif prima terhadap φ(n) = ' + phi + '!',
        formulaKatex: "c = m^e \\pmod n",
        badge: isValidRSA ? 'RSA AMAN' : 'KUNCI INVALID',
        metrics: { ModulusN: n, Phi: phi, Valid: isValidRSA ? 'Yes' : 'No' }
      };
    }

    case '6C': {
      const learningRate = Number(params.learningRate) || 0.05;
      const iterations = Number(params.iterations) || 200;

      const isExploding = learningRate > 0.25;
      const isUnderfitting = learningRate < 0.001;
      const isSuccess = !isExploding && !isUnderfitting;

      const finalLoss = isExploding ? 999.9 : Math.max(0.001, 2.5 * Math.exp(-learningRate * iterations * 0.1));

      return {
        status: isSuccess ? 'optimal' : 'failed',
        statusTitle: isSuccess 
          ? 'STATUS HASIL: Target Berhasil Dicapai (Model AI Gradient Descent Konvergen)' 
          : (isExploding ? 'STATUS HASIL: Exploding Gradient (Learning Rate Terlalu Besar)' : 'STATUS HASIL: Slow Convergence / Underfitting (Learning Rate Terlalu Kecil)'),
        whyText: `Pelatihan model Machine Learning (${iterations} iterasi, alpha = ${learningRate}) menghasilkan nilai Loss ${finalLoss.toFixed(4)}. ${isSuccess ? 'Bobot model konvergen sempurna mendekati error minimum.' : (isExploding ? 'Langkah optimasi melompati titik minimum lokal (divergen).' : 'Proses pelatihan terlalu lambat.')}`,
        conceptText: `Optimasi Gradient Descent \\theta_{j} := \\theta_{j} - \\alpha \\frac{\\partial}{\\partial \\theta_j} J(\\theta).`,
        solutionText: isSuccess 
          ? 'Model AI teroptimasi sempurna untuk prediksi akurat!' 
          : (isExploding ? 'Turunkan Learning Rate (α) ke kisaran 0.01 - 0.1!' : 'Naikkan Learning Rate (α) agar bobot cepat konvergen!'),
        formulaKatex: "\\theta := \\theta - \\alpha \\nabla J(\\theta)",
        badge: isSuccess ? 'AI KONVERGEN' : 'DIVERGEN / SLOW',
        metrics: { Loss: finalLoss.toFixed(4), Alpha: learningRate }
      };
    }

    // FALLBACK UNTUK SETIAP EKSPERIMEN LAINNYA
    default: {
      if (expData && typeof expData.calculateConsequence === 'function') {
        try {
          const res = expData.calculateConsequence(params);
          if (res) {
            const isOpt = res.status === 'optimal' || res.status === 'safe' || res.status === 'success';
            return {
              status: isOpt ? 'optimal' : 'failed',
              statusTitle: res.title 
                ? (isOpt ? `STATUS HASIL: Target Berhasil Dicapai (${res.title})` : `STATUS HASIL: Target Belum Dicapai (${res.title})`)
                : (isOpt ? 'STATUS HASIL: Target Berhasil Dicapai' : 'STATUS HASIL: Target Belum Dicapai / Perlu Penyesuaian'),
              whyText: res.bagianA || res.description || '',
              conceptText: res.bagianB || '',
              solutionText: res.bagianC || '',
              formulaKatex: res.formulaKatex || expData.formula || '',
              badge: res.badge || '',
              metrics: res.metrics || {}
            };
          }
        } catch (err) {
          console.error(`Error in calculateConsequence fallback for ${experimentId}:`, err);
        }
      }

      return {
        status: 'optimal',
        statusTitle: 'STATUS HASIL: Target Berhasil Dicapai (Simulasi Normal)',
        whyText: 'Parameter eksperimen berada dalam rentang toleransi standar.',
        conceptText: `Mengacu pada persamaan ${expData?.formula || ''}.`,
        solutionText: 'Geser slider variabel untuk mengamati hasil responsif.',
        formulaKatex: expData?.formula || '',
        badge: 'STABIL',
        metrics: {}
      };
    }
  }
}

/**
 * Computes the real execution simulation result object (latestSimulationResult)
 */
export function computeSimulationResult(experimentId, inputs = {}) {
  const evalData = evaluateExperiment(experimentId, inputs);
  const isSuccess = evalData.status === 'optimal';

  let metrics = {};

  if (experimentId === '1A') {
    const burnRate = Number(inputs.fuelBurnRate ?? inputs.burnRate) >= 0 ? Number(inputs.fuelBurnRate ?? inputs.burnRate) : 150;
    const payloadMass = Number(inputs.payloadMass) >= 0 ? Number(inputs.payloadMass) : 4000;
    const fuelMass = 5000;
    const totalMass = payloadMass + fuelMass;
    const thrust = burnRate * 800;
    const gravity = totalMass * 9.8;
    const acceleration = totalMass > 0 ? (thrust - gravity) / totalMass : 0;
    const finalVelocity = Math.max(0, acceleration * 30 * 3.6);
    const finalAltitude = Math.max(0, 0.5 * Math.max(0, acceleration) * 900);

    metrics = {
      thrust,
      gravity,
      acceleration,
      finalVelocity,
      finalAltitude,
      success: isSuccess
    };
  } else {
    metrics = {
      thrust: evalData.metrics?.Thrust ? parseFloat(evalData.metrics.Thrust) : 0,
      gravity: evalData.metrics?.Gravity ? parseFloat(evalData.metrics.Gravity) : 0,
      acceleration: evalData.metrics?.Acc ? parseFloat(evalData.metrics.Acc) : (isSuccess ? 2.5 : -0.8),
      finalVelocity: evalData.metrics?.Speed ? parseFloat(evalData.metrics.Speed) : (isSuccess ? 11200 : 0),
      finalAltitude: evalData.metrics?.Altitude ? parseFloat(evalData.metrics.Altitude) : (isSuccess ? 450000 : 0),
      success: isSuccess,
      ...evalData.metrics
    };
  }

  return {
    experimentId,
    timestamp: Date.now(),
    metrics,
    inputs: { ...inputs },
    evalData
  };
}
