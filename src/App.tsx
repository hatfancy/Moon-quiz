import { useState } from 'react';
import { Icon } from './components/Icon';
import { MissionsTimeline } from './components/MissionsTimeline';
import { SpaceLab } from './components/SpaceLab';
import { FactsQuizEngine } from './components/FactsQuizEngine';
import { VoiceLuna } from './components/VoiceLuna';
import {
  TimelineIllustration,
  SpaceDesignIllustration,
  FactsQuizIllustration,
  LunaAIIllustration
} from './components/FeatureIllustrations';

type ActiveView = 'home' | 'missions' | 'spacelab' | 'quiz' | 'luna';

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view: ActiveView) => {
    setActiveView(view);
    scrollToTop();
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
            <MissionsTimeline onBack={() => navigateTo('home')} />
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
            <SpaceLab onBack={() => navigateTo('home')} />
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
            <FactsQuizEngine onBack={() => navigateTo('home')} />
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
            <VoiceLuna />
          </section>
        )}

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
