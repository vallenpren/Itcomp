import React, { useState } from 'react';
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
import QuickPracticeModal from './components/QuickPracticeModal';
import TeacherCheatSheet from './components/TeacherCheatSheet';
import { MOCK_USERS, MOCK_ASSESSMENTS } from './data/mockData';

export default function App() {
  // Current active logged in user
  const [currentUser, setCurrentUser] = useState(MOCK_USERS.teacher); // Default teacher view to demonstrate teacher UI
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Active view: 'dashboard' | 'teacher_dashboard' | 'projector' | 'quick_practice' | 'teacher_cheat_sheet' | 'test' | 'diagnostic' | 'login' | 'history' | 'create_assessment' | 'teacher_analytics' | 'sandbox'
  const [currentView, setCurrentView] = useState('teacher_dashboard');
  
  // Projector initial preset state
  const [projectorPreset, setProjectorPreset] = useState('success');

  // Assessments list state (supports dynamically created ones)
  const [assessmentsList, setAssessmentsList] = useState(MOCK_ASSESSMENTS);

  // Active selected assessment for testing or analytics view
  const [selectedAssessment, setSelectedAssessment] = useState(MOCK_ASSESSMENTS[0]);
  const [testResult, setTestResult] = useState(null);

  // Switch role between Student and Teacher instantly for demo
  const handleSwitchUserRole = () => {
    if (currentUser.role === 'student') {
      setCurrentUser(MOCK_USERS.teacher);
      if (currentView !== 'test') {
        setCurrentView('teacher_dashboard');
      }
    } else {
      setCurrentUser(MOCK_USERS.student);
      if (currentView !== 'test') {
        setCurrentView('dashboard');
      }
    }
  };

  const handleLogin = (userObj) => {
    setCurrentUser(userObj);
    setIsLoggedIn(true);
    setCurrentView(userObj.role === 'student' ? 'dashboard' : 'teacher_dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  const handleStartTest = (assessment) => {
    setSelectedAssessment(assessment);
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
    setCurrentView('teacher_dashboard');
  };

  const handleViewTeacherAnalytics = (assessmentObj) => {
    setSelectedAssessment(assessmentObj);
    setCurrentView('teacher_analytics');
  };

  const handleOpenProjector = (preset = 'success') => {
    setProjectorPreset(preset);
    setCurrentView('projector');
  };

  const handleOpenCheatSheet = () => {
    setCurrentView('teacher_cheat_sheet');
  };

  const handleRetakeTest = () => {
    setCurrentView('test');
  };

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
      />
    );
  }

  // 3. If in full screen Layar Proyektor mode, show dedicated ProjectorView
  if (currentView === 'projector') {
    return (
      <ProjectorView
        initialPreset={projectorPreset}
        onExit={() => setCurrentView('teacher_dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans relative">
      
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
            <div className="space-y-6">
              <DiagnosticView
                testResult={testResult}
                assessment={selectedAssessment}
                onBackToDashboard={() => setCurrentView(currentUser.role === 'student' ? 'dashboard' : 'teacher_dashboard')}
                onRetakeTest={handleRetakeTest}
              />

              <RealWorldSandbox />
            </div>
          )}

          {currentView === 'history' && (
            <div className="space-y-6 font-sans">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h2 className="text-2xl font-black text-slate-900 mb-1">Daftar Rekap Nilai Siswa</h2>
                <p className="text-sm text-slate-500 mb-6 font-medium">Catatan lengkap evaluasi pengerjaan siswa per kelas.</p>

                <div className="space-y-3">
                  {assessmentsList.map((asm) => (
                    <div key={asm.id} className="p-4 sm:p-5 rounded-2xl border border-slate-200 flex items-center justify-between bg-slate-50/70">
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">{asm.title}</h4>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">{asm.subject} • {asm.targetClass || 'Kelas 12 IPA 1'}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-lg text-emerald-700">{asm.studentProgress || '28/32 Siswa'}</span>
                        <button
                          onClick={() => handleViewTeacherAnalytics(asm)}
                          className="px-4 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-xs hover:bg-slate-800"
                        >
                          Lihat Analisis
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
