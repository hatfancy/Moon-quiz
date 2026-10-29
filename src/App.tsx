import { useState, useEffect } from 'react';
import { Icon } from './components/Icon';
import { MissionsTimeline } from './components/MissionsTimeline';
import { SpaceLab } from './components/SpaceLab';
import { FactsQuizEngine } from './components/FactsQuizEngine';
import { VoiceLuna } from './components/VoiceLuna';
import { ProgressTrackerModal } from './components/ProgressTrackerModal';
import { soundManager } from './utils/soundEngine';
import {
  loadUserProgress,
  saveUserProgress,
  calculateMilestones,
  getCompletionPercentage,
  defaultProgress,
  type UserLunarProgress
} from './utils/progressTracker';
import {
  TimelineIllustration,
  SpaceDesignIllustration,
  FactsQuizIllustration,
  LunaAIIllustration
} from './components/FeatureIllustrations';

type ActiveView = 'home' | 'missions' | 'spacelab' | 'quiz' | 'luna';

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');

  // Interactive Feature 1: Dark / Light Mode with localStorage persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moon_explorer_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Interactive Feature 2: Audio & Sound Effects Toggle with Web Audio API synthesizer
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => soundManager.isEnabled());

  // Interactive Feature 3: Visual Progress Tracker with dynamic milestone checklist
  const [progress, setProgress] = useState<UserLunarProgress>(() => loadUserProgress());
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  // Sync theme attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('moon_explorer_theme', theme);
  }, [theme]);

  // Sync progress updates to LocalStorage
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  const milestones = calculateMilestones(progress);
  const percentage = getCompletionPercentage(milestones);

  const toggleTheme = () => {
    soundManager.playThemeToggle();
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    soundManager.setEnabled(next);
    setSoundEnabled(next);
    if (next) {
      soundManager.playNavClick();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view: ActiveView) => {
    soundManager.playNavClick();
    setActiveView(view);
    scrollToTop();
  };

  // Progress update actions
  const recordMissionVisit = (missionId: string) => {
    setProgress((prev) => {
      if (prev.visitedMissions.includes(missionId)) return prev;
      soundManager.playNavClick();
      return { ...prev, visitedMissions: [...prev.visitedMissions, missionId] };
    });
  };

  const recordSimulationInteract = (action: string) => {
    setProgress((prev) => {
      if (prev.exploredSimulations.includes(action)) return prev;
      return { ...prev, exploredSimulations: [...prev.exploredSimulations, action] };
    });
  };

  const recordQuizFinished = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizCompleted: true,
      quizScore: Math.max(prev.quizScore, score)
    }));
  };

  const recordFactExplored = (category: string) => {
    setProgress((prev) => {
      if (prev.factsRead.includes(category)) return prev;
      return { ...prev, factsRead: [...prev.factsRead, category] };
    });
  };

  const recordLunaQuestion = () => {
    setProgress((prev) => ({
      ...prev,
      lunaConversations: prev.lunaConversations + 1
    }));
  };

  const handleResetProgress = () => {
    setProgress(defaultProgress);
    setIsProgressModalOpen(false);
  };

  return (
    <div className="lunar-app-root">
      {/* Background Lunar Textures & Ambient Stars */}
      <div className="lunar-bg-pattern" aria-hidden="true"></div>
      <div className="space-stars-layer" aria-hidden="true"></div>
      <div className="lunar-ambient-orbit" aria-hidden="true"></div>

      <div className="app-viewport">
        {/* Navigation Header */}
        <header className="site-header">
          <div className="brand-wrapper" onClick={() => navigateTo('home')}>
            <div className="logo-badge" title="JET Learn: Moon Missions Explorer">
              <span className="logo-text-top">JET</span>
              <span className="logo-text-bottom">LEARN</span>
            </div>
            <div className="brand-text">
              <h1>Moon Missions Explorer</h1>
              <span className="brand-tag">Lunar Education & Science Lab</span>
            </div>
          </div>

          {/* Navigation Pill Bar */}
          <nav className="nav-pill-bar" aria-label="Main Navigation">
            <button
              className={`nav-pill-btn ${activeView === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              <Icon name="Compass" size={15} /> Overview
            </button>
            <button
              className={`nav-pill-btn ${activeView === 'missions' ? 'active' : ''}`}
              onClick={() => navigateTo('missions')}
            >
              <Icon name="Rocket" size={15} /> Missions
            </button>
            <button
              className={`nav-pill-btn ${activeView === 'spacelab' ? 'active' : ''}`}
              onClick={() => navigateTo('spacelab')}
            >
              <Icon name="Orbit" size={15} /> Space Lab
            </button>
            <button
              className={`nav-pill-btn ${activeView === 'quiz' ? 'active' : ''}`}
              onClick={() => navigateTo('quiz')}
            >
              <Icon name="HelpCircle" size={15} /> Facts & Quiz
            </button>
            <button
              className={`nav-pill-btn ${activeView === 'luna' ? 'active' : ''}`}
              onClick={() => navigateTo('luna')}
            >
              <Icon name="Bot" size={15} /> Ask L.U.N.A.
            </button>
          </nav>

          {/* Interactive Feature Cluster: Progress Tracker, Sound FX, Dark/Light Mode */}
          <div className="header-action-cluster">
            {/* Progress Tracker Quick Pill */}
            <button
              type="button"
              className="progress-quick-pill"
              onClick={() => {
                soundManager.playNavClick();
                setIsProgressModalOpen(true);
              }}
              title="Click to view your Exploration Progress & Astronaut Rank"
            >
              <div className="pill-trophy-icon">
                <Icon name="Trophy" size={16} />
              </div>
              <div className="pill-progress-info">
                <div className="pill-label-row">
                  <span>Progress</span>
                  <span className="pill-pct">{percentage}%</span>
                </div>
                <div className="pill-track">
                  <div className="pill-fill" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            </button>

            {/* Sound Effects Toggle */}
            <button
              type="button"
              className={`tool-icon-btn ${soundEnabled ? 'active-glow' : ''}`}
              onClick={toggleSound}
              title={soundEnabled ? 'Sound Effects Enabled (Click to Mute)' : 'Sound Effects Muted (Click to Unmute)'}
              aria-label="Toggle Sound Effects"
            >
              <Icon name={soundEnabled ? 'Volume2' : 'VolumeX'} size={18} />
              {soundEnabled && <span className="sound-pulse-dot" />}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              className="tool-icon-btn"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Lunar Daylight Mode' : 'Switch to Cosmic Dark Mode'}
              aria-label="Toggle Dark / Light Mode"
            >
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={18} />
            </button>
          </div>
        </header>

        {/* Dynamic Main Body Content */}
        {activeView === 'home' && (
          <main>
            {/* Hero Statement matching reference prompt */}
            <section className="hero-statement">
              <div className="hero-subtitle-badge">
                <Icon name="Sparkles" size={14} /> Comprehensive Lunar Exploration Curriculum
              </div>
              <h2>What are we building?</h2>
              <p>
                A high-fidelity space science portal uncovering lunar history from the first 1959 impacts to the next Artemis footsteps. Select any module below to begin.
              </p>
            </section>

            {/* 2x2 Feature Grid directly inspired by reference image */}
            <section className="feature-grid-2x2">
              {/* Card 1: Timeline & Missions */}
              <article className="feature-card" onClick={() => navigateTo('missions')}>
                <div className="card-top-row">
                  <span className="card-num-badge">01</span>
                  <div className="card-action-icon">
                    <Icon name="Rocket" size={22} />
                  </div>
                </div>

                <h3>TIMELINE AND MISSIONS</h3>
                <p className="card-lead">
                  Explore Moon missions from 1959 to today. Searchable archive of Apollo, Luna, Chandrayaan, Chang'e, and Artemis with complete flight parameters.
                </p>

                <div className="card-illustration-box">
                  <TimelineIllustration />
                </div>

                <button
                  type="button"
                  className="card-footer-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('missions');
                  }}
                >
                  <span>Launch Timeline Explorer</span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              </article>

              {/* Card 2: Interactive Space Designs */}
              <article className="feature-card" onClick={() => navigateTo('spacelab')}>
                <div className="card-top-row">
                  <span className="card-num-badge">02</span>
                  <div className="card-action-icon">
                    <Icon name="Orbit" size={22} />
                  </div>
                </div>

                <h3>INTERACTIVE DESIGNS</h3>
                <p className="card-lead">
                  Deep space colours and animations. Real-time dynamic orbital mechanics sandbox, variable simulation speeds, solar wind, and lunar phase illumination.
                </p>

                <div className="card-illustration-box">
                  <SpaceDesignIllustration />
                </div>

                <button
                  type="button"
                  className="card-footer-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('spacelab');
                  }}
                >
                  <span>Open Space Sandbox</span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              </article>

              {/* Card 3: Facts & Quiz Engine */}
              <article className="feature-card" onClick={() => navigateTo('quiz')}>
                <div className="card-top-row">
                  <span className="card-num-badge">03</span>
                  <div className="card-action-icon">
                    <Icon name="HelpCircle" size={22} />
                  </div>
                </div>

                <h3>FACTS AND QUIZ ENGINE</h3>
                <p className="card-lead">
                  Collect facts and showcase them, and add an interactive quiz with scoring. Easy, Medium, and Hard tests with explanations and mastery ratings.
                </p>

                <div className="card-illustration-box">
                  <FactsQuizIllustration />
                </div>

                <button
                  type="button"
                  className="card-footer-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('quiz');
                  }}
                >
                  <span>Start Lunar Quiz</span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              </article>

              {/* Card 4: Voice AI - L.U.N.A. */}
              <article className="feature-card" onClick={() => navigateTo('luna')}>
                <div className="card-top-row">
                  <span className="card-num-badge">04</span>
                  <div className="card-action-icon">
                    <Icon name="Bot" size={22} />
                  </div>
                </div>

                <h3>VOICE AI — L.U.N.A</h3>
                <p className="card-lead">
                  Ask the AI assistant any Moon questions. Real-time microphone speech recognition and text-to-speech audio answers for immersive learning.
                </p>

                <div className="card-illustration-box">
                  <LunaAIIllustration />
                </div>

                <button
                  type="button"
                  className="card-footer-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('luna');
                  }}
                >
                  <span>Talk with L.U.N.A.</span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              </article>
            </section>
          </main>
        )}

        {/* Deep Dive Views */}
        {activeView === 'missions' && (
          <section className="feature-view-panel">
            <div className="panel-header-bar">
              <div className="panel-header-title">
                <button className="panel-back-btn" onClick={() => navigateTo('home')}>
                  ← Back to Grid
                </button>
                <h2>01. Timeline & Lunar Missions</h2>
              </div>
              <span className="hero-subtitle-badge">Searchable Archive 1959–2026+</span>
            </div>
            <MissionsTimeline
              onBack={() => navigateTo('home')}
              onMissionClick={(id) => recordMissionVisit(id)}
            />
          </section>
        )}

        {activeView === 'spacelab' && (
          <section className="feature-view-panel">
            <div className="panel-header-bar">
              <div className="panel-header-title">
                <button className="panel-back-btn" onClick={() => navigateTo('home')}>
                  ← Back to Grid
                </button>
                <h2>02. Interactive Space Lab</h2>
              </div>
              <span className="hero-subtitle-badge">Live Orbital Physics</span>
            </div>
            <SpaceLab
              onBack={() => navigateTo('home')}
              onSimInteract={(action) => recordSimulationInteract(action)}
            />
          </section>
        )}

        {activeView === 'quiz' && (
          <section className="feature-view-panel">
            <div className="panel-header-bar">
              <div className="panel-header-title">
                <button className="panel-back-btn" onClick={() => navigateTo('home')}>
                  ← Back to Grid
                </button>
                <h2>03. Facts & Interactive Quiz Engine</h2>
              </div>
              <span className="hero-subtitle-badge">Multiple Difficulty Tiers</span>
            </div>
            <FactsQuizEngine
              onBack={() => navigateTo('home')}
              onQuizComplete={(score) => recordQuizFinished(score)}
              onFactExplored={(cat) => recordFactExplored(cat)}
            />
          </section>
        )}

        {activeView === 'luna' && (
          <section className="feature-view-panel">
            <div className="panel-header-bar">
              <div className="panel-header-title">
                <button className="panel-back-btn" onClick={() => navigateTo('home')}>
                  ← Back to Grid
                </button>
                <h2>04. Voice AI Assistant — L.U.N.A.</h2>
              </div>
              <span className="hero-subtitle-badge">Speech & Audio Enabled</span>
            </div>
            <VoiceLuna
              onBack={() => navigateTo('home')}
              onUserQuestion={() => recordLunaQuestion()}
            />
          </section>
        )}

        {/* Progress Tracker Modal */}
        <ProgressTrackerModal
          isOpen={isProgressModalOpen}
          onClose={() => setIsProgressModalOpen(false)}
          milestones={milestones}
          percentage={percentage}
          onNavigate={(module) => navigateTo(module)}
          onResetProgress={handleResetProgress}
        />

        {/* Site Footer */}
        <footer className="site-footer">
          <div className="footer-top">
            <span>JET Learn Moon Missions Explorer</span>
            <span>•</span>
            <button className="footer-link" onClick={() => navigateTo('missions')}>
              Missions (1959–Today)
            </button>
            <span>•</span>
            <button className="footer-link" onClick={() => navigateTo('spacelab')}>
              Orbital Space Lab
            </button>
            <span>•</span>
            <button className="footer-link" onClick={() => navigateTo('quiz')}>
              Facts & Quiz
            </button>
            <span>•</span>
            <button className="footer-link" onClick={() => navigateTo('luna')}>
              Ask L.U.N.A.
            </button>
          </div>
          <p>
            Curated astronomical knowledge synthesized from NASA, ESA, ISRO, CNSA, and JAXA public mission archives.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
