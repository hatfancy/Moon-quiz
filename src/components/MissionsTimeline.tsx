import React, { useState, useMemo } from 'react';
import { MOON_MISSIONS } from '../data/moonData';
import type { MoonMission } from '../data/moonData';
import { Icon } from './Icon';

interface MissionsProps {
  onBack?: () => void;
  onMissionClick?: (missionId: string) => void;
}

export const MissionsTimeline: React.FC<MissionsProps> = ({ onMissionClick }) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedAgency, setSelectedAgency] = useState<string>('All');
  const [activeMission, setActiveMission] = useState<MoonMission>(MOON_MISSIONS[2]); // Apollo 11 default
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');

  const agencyList = ['All', 'NASA', 'Soviet Space Program', 'ISRO', 'JAXA', 'CNSA'];
  const typeList = ['All', 'Crewed', 'Lander', 'Rover', 'Orbiter', 'Impactor'];

  const filteredMissions = useMemo(() => {
    return MOON_MISSIONS.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.country.toLowerCase().includes(search.toLowerCase()) ||
        m.objective.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase());

      const matchType = selectedType === 'All' || m.type === selectedType;
      const matchAgency = selectedAgency === 'All' || m.agency.toLowerCase().includes(selectedAgency.toLowerCase());

      return matchSearch && matchType && matchAgency;
    });
  }, [search, selectedType, selectedAgency]);

  return (
    <div className="missions-module">
      {/* Top Controls Bar */}
      <div className="missions-controls-bar">
        <div className="search-input-wrapper">
          <Icon name="Search" size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search missions, agencies, key discoveries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="missions-search-input"
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch('')}>
              <Icon name="X" size={14} />
            </button>
          )}
        </div>

        {/* Agency Filter */}
        <div className="filter-group">
          <label className="filter-label">Agency:</label>
          <select
            value={selectedAgency}
            onChange={(e) => setSelectedAgency(e.target.value)}
            className="filter-select"
          >
            {agencyList.map((ag) => (
              <option key={ag} value={ag}>
                {ag}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="filter-group">
          <label className="filter-label">Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            {typeList.map((tp) => (
              <option key={tp} value={tp}>
                {tp}
              </option>
            ))}
          </select>
        </div>

        {/* Switch View */}
        <div className="view-switch-tabs">
          <button
            className={`tab-btn ${viewMode === 'timeline' ? 'active' : ''}`}
            onClick={() => setViewMode('timeline')}
          >
            Timeline
          </button>
          <button
            className={`tab-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Cards
          </button>
        </div>
      </div>

      {/* Main Content Layout: Interactive Timeline List + Mission Detail Inspector */}
      <div className="missions-layout-split">
        {/* Left Side: Timeline / Grid */}
        <div className="missions-stream-area">
          <div className="results-count-banner">
            <span>Showing <strong>{filteredMissions.length}</strong> landmark lunar missions (1959 - Present)</span>
            {search || selectedAgency !== 'All' || selectedType !== 'All' ? (
              <button
                className="reset-filters-link"
                onClick={() => {
                  setSearch('');
                  setSelectedAgency('All');
                  setSelectedType('All');
                }}
              >
                Reset filters
              </button>
            ) : null}
          </div>

          {filteredMissions.length === 0 ? (
            <div className="empty-missions-state">
              <Icon name="Moon" size={48} className="empty-icon" />
              <h4>No Moon missions found</h4>
              <p>Try clearing your search query or choosing another agency filter.</p>
            </div>
          ) : viewMode === 'timeline' ? (
            <div className="chronological-timeline">
              <div className="timeline-spine"></div>
              {filteredMissions.map((mission) => {
                const isSelected = activeMission.id === mission.id;
                return (
                  <div
                    key={mission.id}
                    className={`timeline-node-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setActiveMission(mission);
                      onMissionClick?.(mission.id);
                    }}
                  >
                    <div className="timeline-node-dot">
                      <span>{mission.flag}</span>
                    </div>

                    <div className="timeline-card-inner">
                      <div className="card-top-header">
                        <span className="mission-year-pill">{mission.year}</span>
                        <span className="mission-type-tag">{mission.type}</span>
                      </div>

                      <h4 className="mission-title">{mission.name}</h4>
                      <p className="mission-agency-info">
                        {mission.agency} • {mission.country}
                      </p>
                      <p className="mission-snippet">{mission.objective}</p>

                      <div className="card-bottom-tags">
                        <span className="mission-status-indicator">
                          <Icon name="CheckCircle" size={13} /> {mission.outcome}
                        </span>
                        <span className="inspect-callout">View mission details →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="missions-grid-view">
              {filteredMissions.map((mission) => {
                const isSelected = activeMission.id === mission.id;
                return (
                  <div
                    key={mission.id}
                    className={`mission-compact-card ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setActiveMission(mission);
                      onMissionClick?.(mission.id);
                    }}
                  >
                    <div className="compact-card-header">
                      <span className="flag-circle">{mission.flag}</span>
                      <span className="year-text">{mission.year}</span>
                    </div>
                    <h4>{mission.name}</h4>
                    <p className="meta-text">{mission.agency}</p>
                    <span className="type-badge">{mission.type}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Active Mission Detail Dossier */}
        <div className="mission-detail-dossier">
          <div className="dossier-card">
            <div className="dossier-header">
              <div className="dossier-flag-box">
                <span className="big-flag">{activeMission.flag}</span>
                <div>
                  <span className="mission-date-badge">
                    <Icon name="Calendar" size={12} /> {activeMission.date}
                  </span>
                  <h3 className="dossier-title">{activeMission.name}</h3>
                  <div className="dossier-badges">
                    <span className="badge-agency">{activeMission.agency}</span>
                    <span className="badge-country">{activeMission.country}</span>
                    <span className="badge-type">{activeMission.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="dossier-section">
              <h5 className="section-title">Mission Overview</h5>
              <p className="section-text">{activeMission.description}</p>
            </div>

            {/* Objective */}
            <div className="dossier-section">
              <h5 className="section-title">Primary Objective</h5>
              <p className="section-text-highlight">{activeMission.objective}</p>
            </div>

            {/* Key Achievements */}
            <div className="dossier-section">
              <h5 className="section-title">Major Achievements</h5>
              <ul className="achievement-list">
                {activeMission.achievements.map((ach, idx) => (
                  <li key={idx}>
                    <Icon name="Check" size={16} className="ach-check" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Scientific Fact callout */}
            <div className="dossier-fact-callout">
              <div className="callout-icon">
                <Icon name="Sparkles" size={20} />
              </div>
              <div className="callout-body">
                <strong>Historical Lunar Fact</strong>
                <p>{activeMission.keyFact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .missions-module {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .missions-controls-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          background: #f7f9fd;
          padding: 16px 20px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
        }

        .search-input-wrapper {
          flex: 1;
          min-width: 240px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: #718096;
          pointer-events: none;
        }

        .missions-search-input {
          width: 100%;
          padding: 10px 38px 10px 42px;
          border-radius: 14px;
          border: 1.5px solid #dbe2ef;
          background: #ffffff;
          font-size: 14px;
          color: #1b1633;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .missions-search-input:focus {
          border-color: #582ca8;
          box-shadow: 0 0 0 3px rgba(88, 44, 168, 0.1);
        }

        .clear-btn {
          position: absolute;
          right: 12px;
          background: #edf2f7;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #4a5568;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-label {
          font-size: 13px;
          font-weight: 700;
          color: #4a5568;
        }

        .filter-select {
          padding: 8px 14px;
          border-radius: 12px;
          border: 1.5px solid #dbe2ef;
          background: #ffffff;
          font-size: 13px;
          font-weight: 600;
          color: #2d3748;
          outline: none;
          cursor: pointer;
        }

        .view-switch-tabs {
          display: flex;
          background: #e2e8f0;
          border-radius: 12px;
          padding: 3px;
          gap: 2px;
        }

        .tab-btn {
          border: none;
          background: transparent;
          padding: 6px 14px;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 700;
          color: #4a5568;
          cursor: pointer;
        }

        .tab-btn.active {
          background: #ffffff;
          color: #26164d;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }

        .missions-layout-split {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 26px;
        }

        @media (max-width: 960px) {
          .missions-layout-split {
            grid-template-columns: 1fr;
          }
        }

        .results-count-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #64748b;
          margin-bottom: 16px;
          padding: 0 4px;
        }

        .reset-filters-link {
          background: none;
          border: none;
          color: #582ca8;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }

        /* Timeline Nodes */
        .chronological-timeline {
          position: relative;
          padding-left: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 640px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .timeline-spine {
          position: absolute;
          left: 11px;
          top: 10px;
          bottom: 20px;
          width: 3px;
          background: linear-gradient(180deg, #ffb800 0%, #582ca8 100%);
          border-radius: 3px;
        }

        .timeline-node-card {
          position: relative;
          background: #ffffff;
          border-radius: 18px;
          border: 1.5px solid #e2e8f0;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.22s ease;
        }

        .timeline-node-card:hover {
          border-color: #582ca8;
          transform: translateX(4px);
          box-shadow: 0 8px 20px rgba(88, 44, 168, 0.08);
        }

        .timeline-node-card.selected {
          border-color: #3b1d73;
          background: #faf8ff;
          box-shadow: 0 8px 24px rgba(59, 29, 115, 0.12);
        }

        .timeline-node-dot {
          position: absolute;
          left: -32px;
          top: 18px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #582ca8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .timeline-node-card.selected .timeline-node-dot {
          background: #ffb800;
          border-color: #ffffff;
          transform: scale(1.15);
        }

        .card-top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .mission-year-pill {
          background: #ffb800;
          color: #1b1633;
          font-weight: 800;
          font-size: 12px;
          padding: 2px 10px;
          border-radius: 12px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .mission-type-tag {
          font-size: 11.5px;
          font-weight: 700;
          color: #6366f1;
          background: #eef2ff;
          padding: 2px 8px;
          border-radius: 8px;
        }

        .mission-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 17px;
          font-weight: 800;
          color: #26164d;
          margin-bottom: 2px;
        }

        .mission-agency-info {
          font-size: 12.5px;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .mission-snippet {
          font-size: 13px;
          color: #334155;
          line-height: 1.45;
          margin-bottom: 10px;
        }

        .card-bottom-tags {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
        }

        .mission-status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #10b981;
          font-weight: 700;
        }

        .inspect-callout {
          color: #582ca8;
          font-weight: 700;
        }

        /* Missions Grid */
        .missions-grid-view {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 14px;
          max-height: 640px;
          overflow-y: auto;
          padding: 4px;
        }

        .mission-compact-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1.5px solid #e2e8f0;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mission-compact-card:hover {
          border-color: #582ca8;
          transform: translateY(-3px);
        }

        .mission-compact-card.active {
          border-color: #3b1d73;
          background: #faf8ff;
          box-shadow: 0 6px 18px rgba(59, 29, 115, 0.12);
        }

        .compact-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .flag-circle {
          font-size: 18px;
        }

        .year-text {
          font-weight: 800;
          font-size: 12px;
          color: #ff9d00;
          font-family: 'Space Grotesk', sans-serif;
        }

        .mission-compact-card h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #26164d;
        }

        .meta-text {
          font-size: 11.5px;
          color: #64748b;
          margin: 3px 0 8px;
        }

        .type-badge {
          display: inline-block;
          font-size: 11px;
          background: #f1f4fa;
          color: #475569;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
        }

        /* Dossier Detail Card */
        .mission-detail-dossier {
          position: sticky;
          top: 20px;
        }

        .dossier-card {
          background: #ffffff;
          border-radius: 22px;
          border: 1.5px solid #dbe2ef;
          padding: 26px;
          box-shadow: 0 10px 30px rgba(38, 22, 77, 0.06);
        }

        .dossier-header {
          border-bottom: 1.5px solid #edf1f7;
          padding-bottom: 18px;
          margin-bottom: 20px;
        }

        .dossier-flag-box {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .big-flag {
          font-size: 38px;
          background: #f8fafc;
          padding: 10px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .mission-date-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #582ca8;
          margin-bottom: 4px;
        }

        .dossier-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #26164d;
          margin-bottom: 6px;
        }

        .dossier-badges {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .badge-agency, .badge-country, .badge-type {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 8px;
        }

        .badge-agency {
          background: #ffb800;
          color: #1b1633;
        }

        .badge-country {
          background: #f1f5f9;
          color: #334155;
        }

        .badge-type {
          background: #ede9fe;
          color: #5b21b6;
        }

        .dossier-section {
          margin-bottom: 18px;
        }

        .section-title {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #94a3b8;
          margin-bottom: 6px;
        }

        .section-text {
          font-size: 14px;
          color: #334155;
          line-height: 1.55;
        }

        .section-text-highlight {
          font-size: 13.5px;
          color: #1e1b4b;
          background: #f5f3ff;
          padding: 10px 14px;
          border-radius: 12px;
          border-left: 3px solid #6366f1;
          font-weight: 600;
          line-height: 1.5;
        }

        .achievement-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .achievement-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: #1e293b;
          line-height: 1.45;
        }

        .ach-check {
          color: #10b981;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .dossier-fact-callout {
          display: flex;
          gap: 12px;
          background: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: 14px;
          padding: 14px;
          margin-top: 14px;
        }

        .callout-icon {
          color: #d97706;
          flex-shrink: 0;
        }

        .callout-body strong {
          display: block;
          font-size: 12px;
          color: #92400e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .callout-body p {
          font-size: 12.5px;
          color: #78350f;
          line-height: 1.45;
          margin: 0;
        }
      `}</style>
    </div>
  );
};
