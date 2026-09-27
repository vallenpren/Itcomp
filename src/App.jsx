import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BottomBar from './components/BottomBar';
import LoginView from './views/LoginView';
import StudentDashboard from './views/StudentDashboard';
import TestRoom from './views/TestRoom';
import DiagnosticView from './views/DiagnosticView';
import TeacherDashboard from './views/TeacherDashboard';
import CreateAssessmentWizard from './views/CreateAssessmentWizard';
import TeacherAnalyticsView from './views/TeacherAnalyticsView';
import RealWorldSandbox from './components/RealWorldSandbox';
import ProjectorView from './components/ProjectorView';
import StudentLiveView from './components/StudentLiveView';
import QuickPracticeModal from './components/QuickPracticeModal';
import TeacherCheatSheet from './components/TeacherCheatSheet';
import LoginLoadingScreen from './components/LoginLoadingScreen';
import { MOCK_USERS, MOCK_ASSESSMENTS } from './data/mockData';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  // Current active logged in user
  const [currentUser, setCurrentUser] = useState(MOCK_USERS.teacher); // Default teacher view to demonstrate teacher UI
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Transition Loading state on Login
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  // Active view: 'dashboard' | 'teacher_dashboard' | 'projector' | 'student_live' | 'quick_practice' | 'teacher_cheat_sheet' | 'test' | 'diagnostic' | 'login' | 'history' | 'create_assessment' | 'teacher_analytics' | 'sandbox'
  const [currentView, setCurrentView] = useState('teacher_dashboard');
  
  // Projector initial preset state
  const [projectorPreset, setProjectorPreset] = useState('success');

  // Incoming Quiz Notification alert for Student
  const [incomingQuizAlert, setIncomingQuizAlert] = useState({ isOpen: false, quizTitle: '' });

  // Shared Live Presentation Session State (Teacher Broadcast & Student Mirror Sync)
  const [liveSessionState, setLiveSessionState] = useState(() => {
    try {
      const saved = localStorage.getItem('smarttka_live_session_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}

    return {
      isActive: true, // Active by default for quick demo
      mode: 'lab', // 'lab' | 'ppt'
      subjectId: 'math',
      experimentId: '1A',
      sliderValues: { angle: 45, v0: 20, fuelBurnRate: 150, payloadMass: 4000, launchAngle: 75 },
      activePreset: 'success',
      isSimulating: false,
      simulationProgress: 100,
      pptFileName: 'Modul_TKA_Fisika_Kalkulus_Socratix.pptx',
      currentSlideIndex: 0,
      scrollPercentage: 0,
      fileType: 'mock',
      fileUrl: null,
      slides: [
        {
          title: 'Slide 1: Pengenalan Trajektori Parabola & Kalkulus',
          subtitle: 'Konsep Laju Perubahan Instan f\'(t) = dv/dt',
          content: 'Parabola terbentuk dari dua komponen gerak yang saling bebas: Gerak Lurus Beraturan (GLB) pada sumbu X dan Gerak Lurus Berubah Beraturan (GLBB) pada sumbu Y akibat gravitasi bumi.',
          formula: 'y(t) = v_{0y} \\cdot t - \\frac{1}{2} g t^2',
          bulletPoints: [
            'Vektor kecepatan awal membelah menjadi v0x = v0 cos(θ) dan v0y = v0 sin(θ).',
            'Titik tertinggi dicapai saat vy = 0, yaitu t_peak = (v0 sin θ) / g.',
            'Jarak jangkauan maksimum X_max terjadi pada sudut elevasi θ = 45°.'
          ]
        },
        {
          title: 'Slide 2: Aplikasi Industri — Peluncuran Roket & Satelit LEO',
          subtitle: 'Penerapan Diferensial pada Kecepatan Lolos Orbit',
          content: 'Satelit Starlink dan Roket Falcon 9 memicu pembakaran tingkat dua untuk mencapai kecepatan lepas 11.2 km/s tanpa terbakar di atmosfer padat.',
          formula: 'f\'(t) = \\frac{dv}{dt} = \\frac{F_{dorong} - m(t) \\cdot g - F_{hambat}}{m(t)}',
          bulletPoints: [
            'Massa m(t) terus berkurang drastis karena konsumsi bahan bakar.',
            'Sudut luncur optimal (75°) meminimalkan gesekan udara di atmosfer rendah.',
            'Kegagalan laju pembakaran f\'(t) memicu roket jatuh kembali ke bumi.'
          ]
        },
        {
          title: 'Slide 3: Analisis Momen Beban — Jembatan Gantung',
          subtitle: 'Kalkulus Integral pada Kurva Katenari Insinyur Sipil',
          content: 'Integrasi beban w(x) menghasilkan momen gaya M = ∫ w(x)·(L - x) dx yang menentukan ketebalan kabel baja penopang jembatan.',
          formula: 'M = \\int_0^L w(x) \\cdot (L - x) \\, dx',
          bulletPoints: [
            'Span jembatan yang semakin panjang meningkatkan momen beban secara kuadratik.',
            'Distribusi beban merata membentuk kurva parabola katenari alami.',
            'Micro-crack pada kabel terjadi saat rasio keamanan di bawah 1.0.'
          ]
        },
        {
          title: 'Slide 4: Latihan Soal Nalar TKA & Diskusi Kelas',
          subtitle: 'Uji Pemahaman Konsep Trajektori & Sudut Elevasi',
          content: 'Sebuah roket uji diluncurkan pada kecepatan awal 20 m/s. Manakah sudut elevasi yang memberikan jangkauan terjauh?',
          formula: 'R_{max} = \\frac{v_0^2 \\sin(2\\theta)}{g}',
          bulletPoints: [
            'A. Sudut 15° (Terlalu landai, jatuh prematur)',
            'B. Sudut 45° (Optimal sin(90°) = 1)',
            'C. Sudut 75° (Terlalu curam, melesat tinggi tapi pendek)',
            'Ketuk "Ajukan Pertanyaan Nalar ✋" pada HP Anda jika ragu!'
          ]
        }
      ],
      questions: [
        { id: 1, studentName: 'Ahmad Dani', text: 'Pak, mengapa sin(90°) memberikan nilai maksimum 1 pada sudut 45°?', time: '09:42' },
        { id: 2, studentName: 'Siti Nurhaliza', text: 'Pak, apakah massa payload mempengaruhi sudut luncur roket?', time: '09:44' }
      ],
      classCode: 'TKA-882',
      connectedCount: 32,
      lastUpdated: Date.now()
    };
  });

  // REAL-TIME BROADCASTCHANNEL & LOCALSTORAGE SYNCRONIZATION LISTENER
  useEffect(() => {
    let channel;
    let quizChannel;
    let streamChannel;

    try {
      streamChannel = new BroadcastChannel('smarttka_live_stream');
      streamChannel.onmessage = (event) => {
        if (event.data?.type === 'STUDENT_REQUEST_STATE') {
          // Re-broadcast state upon student request
          try {
            const cached = localStorage.getItem('smarttka_active_live_payload');
            if (cached) {
              streamChannel.postMessage(JSON.parse(cached));
            }
          } catch (e) {}
        }
      };
    } catch (e) {}

    try {
      channel = new BroadcastChannel('smarttka_live_classroom');
      channel.onmessage = (event) => {
        if (event.data?.type === 'SYNC_SESSION' && event.data?.payload) {
          setLiveSessionState(event.data.payload);
        } else if (event.data?.type === 'STUDENT_QUESTION' && event.data?.question) {
          setLiveSessionState(prev => {
            const exists = prev.questions.some(q => q.id === event.data.question.id);
            if (exists) return prev;
            const updatedQuestions = [event.data.question, ...prev.questions];
            const newState = { ...prev, questions: updatedQuestions, lastUpdated: Date.now() };
            try {
              localStorage.setItem('smarttka_live_session_state', JSON.stringify(newState));
            } catch (e) {}
            return newState;
          });
        }
      };
    } catch (e) {}

    try {
      quizChannel = new BroadcastChannel('smarttka_classroom_quiz');
      quizChannel.onmessage = (event) => {
        if (event.data?.type === 'START_QUIZ') {
          setIncomingQuizAlert({
            isOpen: true,
            quizTitle: event.data.quizTitle || 'Kalkulus Trajektori & Nalar Turunan'
          });
        }
      };
    } catch (e) {}

    const handleStorageChange = (e) => {
      if (e.key === 'smarttka_live_session_state' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setLiveSessionState(parsed);
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (channel) channel.close();
      if (quizChannel) quizChannel.close();
      if (streamChannel) streamChannel.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Helper function to broadcast state changes across tabs/windows
  const broadcastState = (newState) => {
    setLiveSessionState(newState);
    const isLive = newState.isActive !== false && newState.isLive !== false;

    const payload = {
      type: isLive ? 'SYNC_PRESENTATION_STATE' : 'END_PRESENTATION',
      isLive: isLive,
      currentSlide: newState.currentSlideIndex || 0,
      totalSlides: (newState.slides && newState.slides.length > 0) ? newState.slides.length : (newState.totalSlides || 1),
      fileUrl: newState.fileUrl || null,
      fileType: newState.fileType || 'mock',
      topicTitle: newState.pptFileName || 'Analisis Konsep Nyata & Perumusan',
      slidesData: newState.slides || [],
      targetClassId: newState.targetClassId || 'ALL',
      targetClassName: newState.targetClassName || 'XII MIPA 1',
      mode: newState.mode || 'ppt',
      experimentId: newState.experimentId || '1A',
      sliderValues: newState.sliderValues || {},
      scrollPercentage: newState.scrollPercentage || 0,
      timestamp: Date.now()
    };

    try {
      localStorage.setItem('smarttka_active_live_payload', JSON.stringify(payload));
      localStorage.setItem('smarttka_live_session_state', JSON.stringify(newState));
      localStorage.setItem('smarttka_live_session', JSON.stringify({
        isLive: isLive,
        roomCode: newState.classCode || 'TKA-882',
        teacherName: 'Pak Budi Hartono',
        currentSlide: (newState.currentSlideIndex || 0) + 1,
        lastUpdated: Date.now()
      }));
    } catch (e) {}

    try {
      const streamChannel = new BroadcastChannel('smarttka_live_stream');
      streamChannel.postMessage(payload);
      streamChannel.close();
    } catch (e) {}

    try {
      const channel = new BroadcastChannel('smarttka_live_classroom');
      channel.postMessage({
        type: isLive ? 'TEACHER_START_PRESENTATION' : 'TEACHER_STOP_PRESENTATION',
        isLive: isLive,
        roomCode: newState.classCode || 'TKA-882',
        teacherName: 'Pak Budi Hartono',
        payload: newState,
        timestamp: Date.now()
      });
      channel.close();
    } catch (e) {}
  };

  // Assessments list state (supports dynamically created ones)
  const [assessmentsList, setAssessmentsList] = useState(MOCK_ASSESSMENTS);

  // Active selected assessment for testing or analytics view
  const [selectedAssessment, setSelectedAssessment] = useState(MOCK_ASSESSMENTS[0]);
  const [testResult, setTestResult] = useState(null);

  // Switch role between Student and Teacher instantly for demo
  const handleSwitchUserRole = () => {
    if (currentUser.role === 'student') {
      setCurrentUser(MOCK_USERS.teacher);
      if (currentView !== 'test' && currentView !== 'student_live') {
        setCurrentView('teacher_dashboard');
      }
    } else {
      setCurrentUser(MOCK_USERS.student);
      if (currentView !== 'test' && currentView !== 'projector') {
        setCurrentView('dashboard');
      }
    }
  };

  const handleLogin = (userObj) => {
    setPendingUser(userObj);
    setIsLoggingIn(true);
  };

  const handleFinishLoginLoading = () => {
    if (pendingUser) {
      setCurrentUser(pendingUser);
      setIsLoggedIn(true);
      setCurrentView(pendingUser.role === 'student' ? 'dashboard' : 'teacher_dashboard');
    }
    setIsLoggingIn(false);
    setPendingUser(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  const handleStartTest = (assessment) => {
    setSelectedAssessment(assessment || MOCK_ASSESSMENTS[0]);
    setCurrentView('test');
  };

  const handleFinishTest = (resultData) => {
    setTestResult(resultData);
    setCurrentView('diagnostic');
  };

  const handleViewDiagnostic = (assessmentObj) => {
    setSelectedAssessment(assessmentObj);
    setCurrentView('diagnostic');
  };

  const handleStartCreateAssessment = () => {
    setCurrentView('create_assessment');
  };

  const handlePublishAssessment = (newAssessmentObj) => {
    setAssessmentsList(prev => [newAssessmentObj, ...prev]);
    // Stay in teacher_dashboard or quick_practice
  };

  const handleViewTeacherAnalytics = (assessmentObj) => {
    setSelectedAssessment(assessmentObj);
    setCurrentView('teacher_analytics');
  };

  const handleOpenProjector = (preset = 'success') => {
    setProjectorPreset(preset);
    const newState = {
      ...liveSessionState,
      isActive: true,
      activePreset: preset,
      lastUpdated: Date.now()
    };
    broadcastState(newState);
    setCurrentView('projector');
  };

  const handleStartLiveSession = (config) => {
    const newState = {
      ...liveSessionState,
      isActive: true,
      lastUpdated: Date.now(),
      ...config
    };
    broadcastState(newState);
    setCurrentView('projector');
  };

  const handleUpdateLiveSession = (updates) => {
    const newState = {
      ...liveSessionState,
      ...updates,
      lastUpdated: Date.now()
    };
    broadcastState(newState);
  };

  const handleStopLiveSession = () => {
    const newState = {
      ...liveSessionState,
      isActive: false,
      isLive: false,
      lastUpdated: Date.now()
    };
    broadcastState(newState);
    setCurrentView('teacher_dashboard');
  };

  const handleSubmitStudentQuestion = (questionText) => {
    const newQuestion = {
      id: Date.now(),
      studentName: currentUser.name || 'Ahmad Dani',
      text: questionText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedQuestions = [newQuestion, ...liveSessionState.questions];
    const newState = {
      ...liveSessionState,
      questions: updatedQuestions,
      lastUpdated: Date.now()
    };
    
    setLiveSessionState(newState);
    try {
      localStorage.setItem('smarttka_live_session_state', JSON.stringify(newState));
    } catch (e) {}

    try {
      const channel = new BroadcastChannel('smarttka_live_classroom');
      channel.postMessage({
        type: 'STUDENT_QUESTION',
        question: newQuestion,
        timestamp: Date.now()
      });
      channel.postMessage({
        type: 'SYNC_SESSION',
        payload: newState,
        timestamp: Date.now()
      });
      channel.close();
    } catch (e) {}
  };

  const handleOpenCheatSheet = () => {
    setCurrentView('teacher_cheat_sheet');
  };

  const handleRetakeTest = () => {
    setCurrentView('test');
  };

  // 0. If in loading transition after login, show LoginLoadingScreen
  if (isLoggingIn) {
    return (
      <LoginLoadingScreen
        onComplete={handleFinishLoginLoading}
        targetRole={pendingUser?.role || 'student'}
      />
    );
  }

  // 1. If not logged in or in login view, show Login Screen
  if (!isLoggedIn || currentView === 'login') {
    return <LoginView onLogin={handleLogin} />;
  }

  // 2. If in test taking mode, show distraction-free Full Screen Test Room
  if (currentView === 'test') {
    return (
      <TestRoom
        assessment={selectedAssessment}
        onFinishTest={handleFinishTest}
        onCancelTest={() => setCurrentView(currentUser.role === 'student' ? 'dashboard' : 'teacher_dashboard')}
        currentUser={currentUser}
      />
    );
  }

  // 3. If in full screen Layar Proyektor mode, show dedicated ProjectorView (Teacher side)
  if (currentView === 'projector') {
    return (
      <ProjectorView
        liveSession={liveSessionState}
        onUpdateLiveSession={handleUpdateLiveSession}
        onExit={handleStopLiveSession}
      />
    );
  }

  // 4. If in full screen Menyimak Presentasi Live mode (Student side)
  if (currentView === 'student_live') {
    return (
      <StudentLiveView
        liveSession={liveSessionState}
        onExit={() => setCurrentView('dashboard')}
        onSubmitQuestion={handleSubmitStudentQuestion}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans relative">
      
      {/* REAL-TIME INCOMING QUIZ MODAL NOTIFICATION FOR STUDENT */}
      {incomingQuizAlert.isOpen && currentUser.role === 'student' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center ring-8 ring-amber-50">
              <Sparkles className="w-8 h-8 fill-amber-500 animate-pulse" />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
                🚨 Latihan Baru Dimulai oleh Guru
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2">
                {incomingQuizAlert.quizTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Pak Budi Hartono baru saja membagikan kuis penalaran live untuk kelas Anda (Room: TKA-882).
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setIncomingQuizAlert({ isOpen: false, quizTitle: '' })}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Nanti Saja
              </button>
              <button
                onClick={() => {
                  setIncomingQuizAlert({ isOpen: false, quizTitle: '' });
                  handleStartTest(MOCK_ASSESSMENTS[0]);
                }}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 cursor-pointer"
              >
                Kerjakan Sekarang ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navbar Header */}
      <Navbar
        currentUser={currentUser}
        onSwitchUser={handleSwitchUserRole}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        
        {/* Desktop Sidebar Navigation */}
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          currentUser={currentUser}
        />

        {/* Dynamic Main View Canvas */}
        <main className="flex-1 overflow-x-hidden">
          {currentView === 'dashboard' && (
            <StudentDashboard
              currentUser={currentUser}
              onStartTest={handleStartTest}
              onViewDiagnostic={handleViewDiagnostic}
              liveSession={liveSessionState}
              onJoinLiveSession={() => setCurrentView('student_live')}
            />
          )}

          {currentView === 'sandbox' && (
            <RealWorldSandbox />
          )}

          {currentView === 'teacher_dashboard' && (
            <TeacherDashboard
              currentUser={currentUser}
              onStartCreateAssessment={handleStartCreateAssessment}
              onViewAnalytics={handleViewTeacherAnalytics}
              onOpenProjector={handleOpenProjector}
              onStartLiveSession={handleStartLiveSession}
              onOpenCheatSheet={handleOpenCheatSheet}
              onPublishAssessment={handlePublishAssessment}
              assessmentsList={assessmentsList}
            />
          )}

          {currentView === 'quick_practice' && (
            <QuickPracticeModal
              onClose={() => setCurrentView('teacher_dashboard')}
              onPublishAssessment={handlePublishAssessment}
            />
          )}

          {currentView === 'teacher_cheat_sheet' && (
            <TeacherCheatSheet
              onOpenProjector={() => handleOpenProjector('success')}
            />
          )}

          {currentView === 'create_assessment' && (
            <CreateAssessmentWizard
              onCancel={() => setCurrentView('teacher_dashboard')}
              onPublishAssessment={handlePublishAssessment}
            />
          )}

          {currentView === 'teacher_analytics' && (
            <TeacherAnalyticsView
              assessment={selectedAssessment}
              onBack={() => setCurrentView('teacher_dashboard')}
            />
          )}

          {currentView === 'diagnostic' && (
            <DiagnosticView
              testResult={testResult}
              assessment={selectedAssessment}
              onBackToDashboard={() => setCurrentView(currentUser.role === 'student' ? 'dashboard' : 'teacher_dashboard')}
              onRetakeTest={handleRetakeTest}
              onOpenSandbox={() => setCurrentView('sandbox')}
            />
          )}

          {currentView === 'history' && (
            <div className="space-y-6 font-sans">
              {currentUser.role === 'student' ? (
                /* STUDENT PERSONAL HISTORY VIEW */
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black uppercase">
                        Progres Belajar Pribadi
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mt-1">Riwayat &amp; Hasil Asesmen Saya</h2>
                    <p className="text-sm text-slate-500 font-medium">Catatan evaluasi nilai mandiri, skor KKM, dan grafik diagnosa kompetensi Anda.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        id: 'asm-tka-01',
                        title: 'Simulasi TKA Matematika Saintek 2026',
                        subject: 'Matematika Saintek',
                        date: '24 Sep 2026',
                        score: 85,
                        passingScore: 75,
                        duration: '22 Menit',
                        badge: 'Tuntas KKM'
                      },
                      {
                        id: 'asm-tps-02',
                        title: 'Tryout TPS - Penalaran Umum & Kuantitatif',
                        subject: 'TPS Penalaran',
                        date: '21 Sep 2026',
                        score: 92,
                        passingScore: 70,
                        duration: '18 Menit',
                        badge: 'Istimewa (A)'
                      },
                      {
                        id: 'asm-hist-01',
                        title: 'Simulasi TPS - Literasi Bahasa Indonesia',
                        subject: 'Bahasa Indonesia',
                        date: '18 Sep 2026',
                        score: 88,
                        passingScore: 75,
                        duration: '25 Menit',
                        badge: 'Tuntas KKM'
                      }
                    ].map((item) => (
                      <div key={item.id} className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                              {item.subject}
                            </span>
                            <span className="text-xs font-semibold text-slate-400">
                              Selesai: {item.date} • Durasi: {item.duration}
                            </span>
                          </div>
                          <h4 className="font-black text-lg text-slate-900">{item.title}</h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Target KKM: {item.passingScore} • Status: <strong className="text-emerald-700">{item.badge}</strong>
                          </p>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                          <div className="text-left sm:text-right">
                            <div className="text-2xl font-black text-slate-900">
                              {item.score} <span className="text-xs font-medium text-slate-400">/ 100</span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                              ✓ Lulus Diagnostik
                            </span>
                          </div>

                          <button
                            onClick={() => handleViewDiagnostic(assessmentsList[0])}
                            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                          >
                            Lihat Diagnostik Saya 📊
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* TEACHER CLASS-WIDE REKAP VIEW */
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-1">Daftar Rekap Nilai Siswa Per Kelas</h2>
                    <p className="text-sm text-slate-500 font-medium">Catatan lengkap evaluasi dan progres pengerjaan seluruh siswa per kelas.</p>
                  </div>

                  <div className="space-y-3">
                    {assessmentsList.map((asm) => (
                      <div key={asm.id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 flex items-center justify-between bg-slate-50/70 hover:bg-white transition-all">
                        <div>
                          <h4 className="font-extrabold text-base text-slate-900">{asm.title}</h4>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">{asm.subject} • {asm.targetClass || 'Kelas 12 IPA 1'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-lg text-emerald-700">{asm.studentProgress || '28/32 Siswa'}</span>
                          <button
                            onClick={() => handleViewTeacherAnalytics(asm)}
                            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-xs hover:bg-slate-800 cursor-pointer"
                          >
                            Lihat Analisis Ujian
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

      </div>

      {/* Mobile Bottom Bar Navigation */}
      <BottomBar
        currentView={currentView}
        onViewChange={setCurrentView}
        currentUser={currentUser}
      />

    </div>
  );
}
