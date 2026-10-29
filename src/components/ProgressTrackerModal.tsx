import React from 'react';
import { Icon } from './Icon';
import { type ProgressMilestone, getAstronautRank } from '../utils/progressTracker';
import { soundManager } from '../utils/soundEngine';

interface ProgressTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  milestones: ProgressMilestone[];
  percentage: number;
  onNavigate: (module: 'missions' | 'spacelab' | 'quiz' | 'luna') => void;
  onResetProgress: () => void;
}

export const ProgressTrackerModal: React.FC<ProgressTrackerModalProps> = ({
  isOpen,
  onClose,
  milestones,
  percentage,
  onNavigate,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  const rank = getAstronautRank(percentage);
  const completedCount = milestones.filter((m) => m.isCompleted).length;

  return (
    <div className="progress-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="progress-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="progress-modal-header">
          <div className="modal-title-wrap">
            <div className="rank-avatar" style={{ borderColor: rank.color }}>
              <Icon name="Trophy" size={24} className="trophy-gold" />
            </div>
            <div>
              <h3>Cadet Exploration Passport</h3>
              <p className="rank-tagline">
                Current Rank: <span style={{ color: rank.color, fontWeight: 800 }}>{rank.title}</span>
              </p>
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => {
              soundManager.playNavClick();
              onClose();
            }}
            aria-label="Close modal"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Global Progress Bar */}
        <div className="progress-card-hero">
          <div className="progress-hero-top">
            <span className="hero-progress-label">Mission Curriculum Mastery</span>
            <span className="hero-progress-pct">{percentage}% Complete</span>
          </div>

          <div className="progress-big-track">
            <div
              className="progress-big-fill"
              style={{ width: `${percentage}%`, background: `linear-gradient(90deg, #6366f1, ${rank.color})` }}
            ></div>
          </div>

          <div className="hero-stats-row">
            <div className="stat-pill">
              <span className="stat-number">{completedCount} / {milestones.length}</span>
              <span className="stat-desc">Milestones Cleared</span>
            </div>
            <div className="stat-pill">
              <span className="stat-number">{rank.badge}</span>
              <span className="stat-desc">Astronaut Clearance</span>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="milestones-checklist">
          <h4 className="checklist-heading">Exploration Objectives</h4>
          <div className="milestone-cards-stack">
            {milestones.map((m) => (
              <div
                key={m.id}
                className={`milestone-item-row ${m.isCompleted ? 'completed' : 'pending'}`}
                onClick={() => {
                  soundManager.playNavClick();
                  onNavigate(m.module);
                  onClose();
                }}
              >
                <div className={`milestone-status-box ${m.isCompleted ? 'done' : ''}`}>
                  {m.isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="bullet-dot" />
                  )}
                </div>

                <div className="milestone-text">
                  <h5>{m.label}</h5>
                  <p>{m.description}</p>
                </div>

                <button className="milestone-jump-btn">
                  <span>{m.isCompleted ? 'Review' : 'Start'}</span>
                  <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="progress-modal-footer">
          <button
            className="reset-progress-link"
            onClick={() => {
              if (window.confirm('Reset your exploration tracker progress?')) {
                onResetProgress();
              }
            }}
          >
            <Icon name="RotateCcw" size={13} /> Reset My Progress
          </button>

          <button
            className="btn-primary"
            onClick={() => {
              soundManager.playNavClick();
              onClose();
            }}
          >
            Continue Journey
          </button>
        </div>
      </div>
    </div>
  );
};
