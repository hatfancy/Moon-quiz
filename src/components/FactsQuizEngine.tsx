import React, { useState } from 'react';
import { QUIZ_QUESTIONS, MOON_FACTS } from '../data/moonData';
import type { QuizQuestion } from '../data/moonData';
import { Icon } from './Icon';

interface FactsQuizProps {
  onBack?: () => void;
}

export const FactsQuizEngine: React.FC<FactsQuizProps> = () => {
  const [activeTab, setActiveTab] = useState<'facts' | 'quiz'>('facts');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [activeFactFilter, setActiveFactFilter] = useState<string>('All');

  // Filtered Quiz Questions
  const activeQuestions = QUIZ_QUESTIONS.filter(
    (q) => selectedDifficulty === 'All' || q.difficulty === selectedDifficulty
  );

  const currentQ: QuizQuestion | undefined = activeQuestions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswerIndex === null || !currentQ) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswerIndex === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const filteredFacts = MOON_FACTS.filter(
    (f) => activeFactFilter === 'All' || f.category === activeFactFilter
  );

  return (
    <div className="facts-quiz-module">
      {/* Sub Header Navigation */}
      <div className="module-nav-bar">
        <div className="tab-pill-container">
          <button
            className={`tab-pill ${activeTab === 'facts' ? 'active' : ''}`}
            onClick={() => setActiveTab('facts')}
          >
            <Icon name="Sparkles" size={16} /> Curated Moon Facts
          </button>
          <button
            className={`tab-pill ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            <Icon name="HelpCircle" size={16} /> Interactive Quiz Engine
          </button>
        </div>

        {activeTab === 'quiz' && !quizFinished && (
          <div className="difficulty-pill-container">
            <span className="diff-label">Difficulty:</span>
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                className={`diff-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                onClick={() => {
                  setSelectedDifficulty(diff);
                  handleRestartQuiz();
                }}
              >
                {diff}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Facts Showcase Tab */}
      {activeTab === 'facts' && (
        <div className="facts-showcase-section">
          {/* Fact Filter Tags */}
          <div className="fact-filters-list">
            {['All', 'Orbit & Size', 'Surface & Geology', 'Water & Atmosphere', 'Human Footprint'].map((cat) => (
              <button
                key={cat}
                className={`fact-tag-btn ${activeFactFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFactFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="facts-cards-grid">
            {filteredFacts.map((fact) => (
              <div key={fact.id} className="lunar-fact-card">
                <div className="fact-top">
                  <span className="fact-category-pill">{fact.category}</span>
                  <div className="fact-icon-round">
                    <Icon name={fact.icon} size={20} />
                  </div>
                </div>
                <div className="fact-metric-box">
                  <span className="metric-number">{fact.metric}</span>
                  <h4 className="fact-title">{fact.title}</h4>
                </div>
                <p className="fact-desc">{fact.description}</p>
                <div className="fact-footer-verified">
                  <Icon name="CheckCircle" size={14} /> Verified Astronomical Data
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="quiz-engine-section">
          {!quizFinished && currentQ ? (
            <div className="quiz-card-frame">
              {/* Progress Bar */}
              <div className="quiz-progress-bar-container">
                <div className="progress-metrics">
                  <span className="question-counter">
                    Question <strong>{currentQuestionIndex + 1}</strong> of {activeQuestions.length}
                  </span>
                  <span className="category-badge">{currentQ.category}</span>
                  <span className={`diff-badge diff-${currentQ.difficulty.toLowerCase()}`}>
                    {currentQ.difficulty}
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="quiz-question-title">{currentQ.question}</h3>

              {/* Multiple Choice Options */}
              <div className="quiz-options-list">
                {currentQ.options.map((option, idx) => {
                  let statusClass = '';
                  if (selectedAnswerIndex === idx) {
                    statusClass = 'selected';
                  }
                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctAnswer) {
                      statusClass = 'correct';
                    } else if (selectedAnswerIndex === idx) {
                      statusClass = 'incorrect';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      className={`option-btn ${statusClass}`}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="option-text">{option}</span>
                      {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                        <Icon name="CheckCircle" size={18} className="option-status-icon success" />
                      )}
                      {isAnswerSubmitted && selectedAnswerIndex === idx && idx !== currentQ.correctAnswer && (
                        <Icon name="X" size={18} className="option-status-icon error" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {isAnswerSubmitted && (
                <div
                  className={`quiz-feedback-box ${
                    selectedAnswerIndex === currentQ.correctAnswer ? 'correct-box' : 'incorrect-box'
                  }`}
                >
                  <div className="feedback-heading">
                    {selectedAnswerIndex === currentQ.correctAnswer ? (
                      <>
                        <Icon name="CheckCircle" size={18} /> Correct! Phenomenal lunar science!
                      </>
                    ) : (
                      <>
                        <Icon name="X" size={18} /> Not quite right. Keep exploring!
                      </>
                    )}
                  </div>
                  <p className="feedback-explanation">{currentQ.explanation}</p>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="quiz-footer-actions">
                <span className="current-score-tag">
                  Current Score: <strong>{score}</strong>
                </span>

                {!isAnswerSubmitted ? (
                  <button
                    className="btn-accent"
                    onClick={handleConfirmAnswer}
                    disabled={selectedAnswerIndex === null}
                    style={{ opacity: selectedAnswerIndex === null ? 0.5 : 1 }}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button className="btn-primary" onClick={handleNextQuestion}>
                    {currentQuestionIndex + 1 < activeQuestions.length ? (
                      <>
                        Next Question <Icon name="ArrowRight" size={16} />
                      </>
                    ) : (
                      'View Final Results'
                    )}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Results Finished Screen */
            <div className="quiz-results-card">
              <div className="results-badge-circle">
                <Icon name="Sparkles" size={42} />
              </div>
              <h3>Mission Quiz Completed!</h3>
              <p className="results-subtitle">
                You tested your knowledge against the frontiers of lunar exploration.
              </p>

              <div className="score-tally-box">
                <div className="score-huge">
                  {score} / {activeQuestions.length}
                </div>
                <div className="score-percentage">
                  {Math.round((score / activeQuestions.length) * 100)}% Accuracy
                </div>
                <p className="evaluation-text">
                  {score === activeQuestions.length
                    ? '🏆 Master Lunar Astronaut! You possess top-tier Moon mastery.'
                    : score >= activeQuestions.length * 0.7
                    ? '🚀 Senior Mission Flight Controller! Great command of lunar history.'
                    : '🛰️ Junior Explorer! Review the mission timeline and try again!'}
                </p>
              </div>

              <div className="results-btn-row">
                <button className="btn-primary" onClick={handleRestartQuiz}>
                  <Icon name="RotateCcw" size={16} /> Restart Quiz
                </button>
                <button className="btn-accent" onClick={() => setActiveTab('facts')}>
                  <Icon name="Sparkles" size={16} /> Review Facts
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .facts-quiz-module {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .module-nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          padding-bottom: 12px;
          border-bottom: 1.5px solid #edf1f7;
        }

        .tab-pill-container {
          display: flex;
          gap: 8px;
          background: #f1f4fa;
          padding: 5px;
          border-radius: 16px;
        }

        .tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          background: transparent;
          padding: 8px 18px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 700;
          color: #4a5568;
          cursor: pointer;
        }

        .tab-pill.active {
          background: #3b1d73;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(59, 29, 115, 0.2);
        }

        .difficulty-pill-container {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .diff-label {
          font-size: 12.5px;
          font-weight: 700;
          color: #64748b;
        }

        .diff-btn {
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
          padding: 5px 12px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          color: #334155;
          cursor: pointer;
        }

        .diff-btn.active {
          background: #ffb800;
          color: #1b1633;
          border-color: #ffb800;
        }

        /* Facts Showcase */
        .fact-filters-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .fact-tag-btn {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          padding: 7px 16px;
          border-radius: 14px;
          font-size: 12.5px;
          font-weight: 700;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .fact-tag-btn:hover {
          border-color: #3b1d73;
        }

        .fact-tag-btn.active {
          background: #3b1d73;
          color: #ffffff;
          border-color: #3b1d73;
        }

        .facts-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 20px;
        }

        .lunar-fact-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1.5px solid #e2e8f0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.03);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .lunar-fact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(59, 29, 115, 0.1);
          border-color: #ffb800;
        }

        .fact-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .fact-category-pill {
          font-size: 11px;
          font-weight: 800;
          color: #582ca8;
          background: #f3f0fa;
          padding: 3px 10px;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .fact-icon-round {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff8e6;
          color: #ff9d00;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-number {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #26164d;
          line-height: 1.2;
        }

        .fact-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #4a5568;
          margin: 4px 0 10px;
        }

        .fact-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .fact-footer-verified {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 700;
          color: #10b981;
        }

        /* Quiz Card */
        .quiz-card-frame {
          background: #ffffff;
          border-radius: 22px;
          border: 1.5px solid #e2e8f0;
          padding: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        .quiz-progress-bar-container {
          margin-bottom: 24px;
        }

        .progress-metrics {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 12.5px;
          color: #64748b;
        }

        .category-badge {
          font-weight: 700;
          color: #582ca8;
        }

        .diff-badge {
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 11px;
        }
        .diff-easy { background: #dcfce7; color: #166534; }
        .diff-medium { background: #fef3c7; color: #92400e; }
        .diff-hard { background: #fee2e2; color: #991b1b; }

        .progress-track {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffb800 0%, #3b1d73 100%);
          transition: width 0.3s ease;
        }

        .quiz-question-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #26164d;
          line-height: 1.35;
          margin-bottom: 24px;
        }

        .quiz-options-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .option-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          padding: 14px 18px;
          border-radius: 14px;
          font-size: 14.5px;
          font-weight: 600;
          color: #1e293b;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .option-btn:hover:not(:disabled) {
          border-color: #ffb800;
          background: #fffdf5;
        }

        .option-btn.selected {
          border-color: #3b1d73;
          background: #f5f3ff;
          color: #3b1d73;
        }

        .option-btn.correct {
          border-color: #10b981;
          background: #ecfdf5;
          color: #065f46;
        }

        .option-btn.incorrect {
          border-color: #ef4444;
          background: #fef2f2;
          color: #991b1b;
        }

        .option-letter {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #e2e8f0;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
          flex-shrink: 0;
        }

        .option-btn.selected .option-letter {
          background: #3b1d73;
          color: #ffffff;
        }

        .option-btn.correct .option-letter {
          background: #10b981;
          color: #ffffff;
        }

        .option-btn.incorrect .option-letter {
          background: #ef4444;
          color: #ffffff;
        }

        .option-text {
          flex: 1;
        }

        .option-status-icon.success { color: #10b981; }
        .option-status-icon.error { color: #ef4444; }

        /* Feedback box */
        .quiz-feedback-box {
          padding: 16px 20px;
          border-radius: 14px;
          margin-bottom: 24px;
        }

        .correct-box {
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          color: #166534;
        }

        .incorrect-box {
          background: #fef2f2;
          border: 1.5px solid #fecaca;
          color: #991b1b;
        }

        .feedback-heading {
          font-size: 14px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .feedback-explanation {
          font-size: 13px;
          line-height: 1.5;
        }

        .quiz-footer-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1.5px solid #edf1f7;
        }

        .current-score-tag {
          font-size: 14px;
          color: #64748b;
        }

        .current-score-tag strong {
          color: #3b1d73;
          font-size: 16px;
        }

        /* Results Screen */
        .quiz-results-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1.5px solid #e2e8f0;
          padding: 44px 30px;
          text-align: center;
          max-width: 540px;
          margin: 0 auto;
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
        }

        .results-badge-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffc820 0%, #ff9d00 100%);
          color: #1b1633;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          box-shadow: 0 8px 24px rgba(255, 184, 0, 0.4);
        }

        .quiz-results-card h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #26164d;
        }

        .results-subtitle {
          font-size: 14px;
          color: #64748b;
          margin: 8px 0 24px;
        }

        .score-tally-box {
          background: #faf8ff;
          border: 1.5px solid #e9d5ff;
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 26px;
        }

        .score-huge {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 46px;
          font-weight: 900;
          color: #3b1d73;
          line-height: 1;
        }

        .score-percentage {
          font-size: 14px;
          font-weight: 800;
          color: #ff9d00;
          margin: 6px 0 12px;
        }

        .evaluation-text {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          line-height: 1.45;
        }

        .results-btn-row {
          display: flex;
          justify-content: center;
          gap: 14px;
        }
      `}</style>
    </div>
  );
};
