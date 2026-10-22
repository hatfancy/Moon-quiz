import React, { useState } from 'react';
import { Icon } from './Icon';

interface SpaceLabProps {
  onBack?: () => void;
}

export const SpaceLab: React.FC<SpaceLabProps> = () => {
  const [activeOrbitSpeed, setActiveOrbitSpeed] = useState<'normal' | 'fast' | 'frozen'>('normal');
  const [selectedCelestial, setSelectedCelestial] = useState<'moon' | 'earth' | 'apollo' | 'satellite'>('moon');
  const [lunarPhase, setLunarPhase] = useState<'crescent' | 'half' | 'full' | 'new'>('full');
  const [showRays, setShowRays] = useState(true);

  const getOrbitDuration = () => {
    if (activeOrbitSpeed === 'frozen') return '0s';
    if (activeOrbitSpeed === 'fast') return '8s';
    return '24s';
  };

  return (
    <div className="spacelab-module">
      <div className="spacelab-top-bar">
        <div className="top-title">
          <h4>Interactive Lunar Orbit Sandbox</h4>
          <p>Experiment with real-time celestial simulations, spacecraft trajectories, and lunar phases.</p>
        </div>

        {/* Control toolbar */}
        <div className="simulation-toolbar">
          <div className="tool-chip-group">
            <span className="tool-chip-label">Simulation Speed:</span>
            <button
              className={`tool-pill ${activeOrbitSpeed === 'normal' ? 'active' : ''}`}
              onClick={() => setActiveOrbitSpeed('normal')}
            >
              1x Real
            </button>
            <button
              className={`tool-pill ${activeOrbitSpeed === 'fast' ? 'active' : ''}`}
              onClick={() => setActiveOrbitSpeed('fast')}
            >
              4x Warp
            </button>
            <button
              className={`tool-pill ${activeOrbitSpeed === 'frozen' ? 'active' : ''}`}
              onClick={() => setActiveOrbitSpeed('frozen')}
            >
              Pause
            </button>
          </div>

          <div className="tool-chip-group">
            <span className="tool-chip-label">Lunar Phase:</span>
            <select
              value={lunarPhase}
              onChange={(e) => setLunarPhase(e.target.value as any)}
              className="phase-selector"
            >
              <option value="full">Full Moon</option>
              <option value="half">First Quarter</option>
              <option value="crescent">Waxing Crescent</option>
              <option value="new">New Moon</option>
            </select>
          </div>

          <button
            className={`toggle-rays-btn ${showRays ? 'on' : ''}`}
            onClick={() => setShowRays(!showRays)}
          >
            <Icon name="Sparkles" size={14} /> Solar Wind {showRays ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="space-canvas-container">
        {/* Deep space nebula & stars */}
        <div className="space-nebula-glow"></div>
        {showRays && <div className="solar-wind-particles"></div>}

        {/* Earth in Center */}
        <div
          className={`earth-sphere ${selectedCelestial === 'earth' ? 'highlighted' : ''}`}
          onClick={() => setSelectedCelestial('earth')}
          title="Earth - Click to inspect"
        >
          <div className="earth-glow"></div>
          <div className="earth-continents"></div>
          <div className="earth-clouds"></div>
          <span className="planet-tag">Earth</span>
        </div>

        {/* Orbit Track Ring */}
        <div className="orbit-track-ring"></div>

        {/* Orbiting Moon Arm */}
        <div
          className="orbit-arm-moon"
          style={{
            animationDuration: getOrbitDuration(),
            animationPlayState: activeOrbitSpeed === 'frozen' ? 'paused' : 'running'
          }}
        >
          <div
            className={`moon-sphere phase-${lunarPhase} ${selectedCelestial === 'moon' ? 'highlighted' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCelestial('moon');
            }}
            title="The Moon - Click to inspect"
          >
            <div className="moon-craters-pattern">
              <span className="crater cr-1"></span>
              <span className="crater cr-2"></span>
              <span className="crater cr-3"></span>
              <span className="crater cr-4"></span>
            </div>
            <div className="lunar-exosphere-glow"></div>
            <span className="celestial-tag">Moon</span>
          </div>

          {/* Apollo Spacecraft Orbiting the Moon */}
          <div className="apollo-craft-orbit">
            <div
              className={`apollo-capsule ${selectedCelestial === 'apollo' ? 'highlighted' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCelestial('apollo');
              }}
              title="Apollo CSM - Click to inspect"
            >
              🚀
              <span className="capsule-exhaust"></span>
            </div>
          </div>
        </div>

        {/* Artificial Communications Satellite */}
        <div
          className="satellite-orbit-arm"
          style={{
            animationDuration: activeOrbitSpeed === 'fast' ? '6s' : '15s',
            animationPlayState: activeOrbitSpeed === 'frozen' ? 'paused' : 'running'
          }}
        >
          <div
            className={`satellite-craft ${selectedCelestial === 'satellite' ? 'highlighted' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCelestial('satellite');
            }}
            title="Lunar Orbiter Satellite - Click to inspect"
          >
            🛰️
          </div>
        </div>

        {/* Floating Space Data Card overlay */}
        <div className="space-telemetry-overlay">
          <div className="telemetry-badge">
            <span className="telemetry-pulse"></span>
            <span>LIVE TELEMETRY</span>
          </div>

          {selectedCelestial === 'moon' && (
            <div className="telemetry-content">
              <h5>The Moon (Luna)</h5>
              <div className="data-row">
                <span>Mean Radius:</span>
                <strong>1,737.4 km (0.272 Earth)</strong>
              </div>
              <div className="data-row">
                <span>Surface Gravity:</span>
                <strong>1.62 m/s² (16.6% Earth)</strong>
              </div>
              <div className="data-row">
                <span>Orbital Period:</span>
                <strong>27.32 Earth Days</strong>
              </div>
              <div className="data-row">
                <span>Surface Temp:</span>
                <strong>-130°C to +120°C</strong>
              </div>
              <p className="tip-text">Click on Earth or the Apollo spacecraft to switch focus.</p>
            </div>
          )}

          {selectedCelestial === 'earth' && (
            <div className="telemetry-content">
              <h5>Planet Earth (Terra)</h5>
              <div className="data-row">
                <span>Distance to Moon:</span>
                <strong>384,400 km</strong>
              </div>
              <div className="data-row">
                <span>Surface Gravity:</span>
                <strong>9.807 m/s² (1.00 g)</strong>
              </div>
              <div className="data-row">
                <span>Atmospheric Pressure:</span>
                <strong>101.3 kPa (1 atm)</strong>
              </div>
              <p className="tip-text">Tidal forces between Earth & Moon stabilize Earth's axial tilt!</p>
            </div>
          )}

          {selectedCelestial === 'apollo' && (
            <div className="telemetry-content">
              <h5>Apollo Command & Service Module</h5>
              <div className="data-row">
                <span>Perilune Altitude:</span>
                <strong>110 km (Lunar Orbit)</strong>
              </div>
              <div className="data-row">
                <span>Orbital Velocity:</span>
                <strong>1.63 km/s (5,870 km/h)</strong>
              </div>
              <div className="data-row">
                <span>Delta-V Capability:</span>
                <strong>2,800 m/s (SPS Engine)</strong>
              </div>
              <p className="tip-text">Performs Trans-Earth Injection (TEI) burn to return home safely.</p>
            </div>
          )}

          {selectedCelestial === 'satellite' && (
            <div className="telemetry-content">
              <h5>Relay & Mapping Orbiter</h5>
              <div className="data-row">
                <span>Altitude:</span>
                <strong>50 km Polar Orbit</strong>
              </div>
              <div className="data-row">
                <span>Sensors:</span>
                <strong>LIDAR, SAR, Hyperspectral</strong>
              </div>
              <div className="data-row">
                <span>Comms Link:</span>
                <strong>Ka-band Deep Space Network</strong>
              </div>
              <p className="tip-text">Scouts prospective landing sites for Artemis astronaut bases.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .spacelab-module {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .spacelab-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .top-title h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #26164d;
        }

        .top-title p {
          font-size: 13.5px;
          color: #64748b;
        }

        .simulation-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .tool-chip-group {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f1f4fa;
          padding: 4px 10px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .tool-chip-label {
          font-size: 12px;
          font-weight: 700;
          color: #4a5568;
        }

        .tool-pill {
          background: #ffffff;
          border: 1px solid #dbe2ef;
          border-radius: 8px;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 700;
          color: #26164d;
          cursor: pointer;
        }

        .tool-pill.active {
          background: #3b1d73;
          color: #ffffff;
          border-color: #3b1d73;
        }

        .phase-selector {
          border: 1px solid #dbe2ef;
          border-radius: 8px;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 700;
          background: #ffffff;
          color: #26164d;
          cursor: pointer;
        }

        .toggle-rays-btn {
          border: 1px solid #ffb800;
          background: #fffbeb;
          color: #92400e;
          padding: 6px 14px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .toggle-rays-btn.on {
          background: #ffb800;
          color: #1b1633;
        }

        /* 3D-feeling Space Stage */
        .space-canvas-container {
          position: relative;
          height: 520px;
          width: 100%;
          background: radial-gradient(circle at 50% 50%, #1e1038 0%, #0d061c 100%);
          border-radius: 26px;
          overflow: hidden;
          box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #321d5a;
        }

        .space-nebula-glow {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 25% 30%, rgba(139, 92, 246, 0.22) 0, transparent 40%),
            radial-gradient(circle at 75% 70%, rgba(255, 184, 0, 0.15) 0, transparent 40%);
          pointer-events: none;
        }

        .solar-wind-particles {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.03) 0px,
            rgba(255, 255, 255, 0.03) 2px,
            transparent 2px,
            transparent 20px
          );
          opacity: 0.6;
          pointer-events: none;
          animation: windFlow 12s linear infinite;
        }

        @keyframes windFlow {
          0% { background-position: 0 0; }
          100% { background-position: 200px 200px; }
        }

        /* Earth */
        .earth-sphere {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #4299e1 0%, #1a365d 80%, #0f172a 100%);
          position: absolute;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 0 35px rgba(66, 153, 225, 0.45);
          transition: transform 0.3s ease;
        }

        .earth-sphere:hover {
          transform: scale(1.08);
        }

        .earth-sphere.highlighted {
          outline: 3px solid #ffb800;
          outline-offset: 4px;
        }

        .earth-continents {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 40%, rgba(52, 211, 153, 0.6) 0, transparent 50%);
        }

        .earth-clouds {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 60% 30%, rgba(255, 255, 255, 0.5) 0, transparent 45%);
        }

        .planet-tag {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          font-weight: 800;
          color: #93c5fd;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        /* Orbit Track */
        .orbit-track-ring {
          width: 360px;
          height: 360px;
          border-radius: 50%;
          border: 1.5px dashed rgba(255, 255, 255, 0.15);
          position: absolute;
          pointer-events: none;
        }

        /* Moon Orbit Arm */
        .orbit-arm-moon {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          animation: rotateOrbit 24s linear infinite;
        }

        @keyframes rotateOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Moon Sphere */
        .moon-sphere {
          position: absolute;
          top: -26px;
          left: 50%;
          margin-left: -26px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #f1f5f9 0%, #94a3b8 70%, #475569 100%);
          cursor: pointer;
          box-shadow: 0 0 24px rgba(241, 245, 249, 0.6);
          transition: transform 0.25s ease;
        }

        .moon-sphere:hover {
          transform: scale(1.15);
        }

        .moon-sphere.highlighted {
          outline: 3px solid #ffb800;
          outline-offset: 4px;
        }

        .moon-sphere.phase-half {
          background: linear-gradient(90deg, #f1f5f9 50%, #1e293b 50%);
        }

        .moon-sphere.phase-crescent {
          background: radial-gradient(circle at 15% 50%, #f1f5f9 0%, #f1f5f9 40%, #1e293b 45%);
        }

        .moon-sphere.phase-new {
          background: #1e293b;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .crater {
          position: absolute;
          border-radius: 50%;
          background: rgba(100, 116, 139, 0.5);
          box-shadow: inset 1px 1px 2px rgba(0,0,0,0.4);
        }
        .cr-1 { width: 10px; height: 10px; top: 12px; left: 14px; }
        .cr-2 { width: 7px; height: 7px; top: 28px; left: 24px; }
        .cr-3 { width: 5px; height: 5px; top: 18px; left: 32px; }
        .cr-4 { width: 12px; height: 12px; bottom: 8px; left: 10px; }

        .celestial-tag {
          position: absolute;
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          font-weight: 800;
          color: #ffb800;
          text-transform: uppercase;
        }

        /* Apollo Craft Orbiting Moon */
        .apollo-craft-orbit {
          position: absolute;
          top: -38px;
          left: 50%;
          margin-left: -38px;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          border: 1px dashed rgba(255, 184, 0, 0.35);
          animation: apolloCirc 4s linear infinite;
        }

        @keyframes apolloCirc {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .apollo-capsule {
          position: absolute;
          top: -8px;
          left: 50%;
          margin-left: -8px;
          font-size: 16px;
          cursor: pointer;
          filter: drop-shadow(0 0 6px #ffb800);
        }

        .apollo-capsule.highlighted {
          transform: scale(1.4);
        }

        /* Satellite */
        .satellite-orbit-arm {
          position: absolute;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          border: 1px dotted rgba(168, 85, 247, 0.3);
          animation: rotateOrbit 15s linear infinite reverse;
        }

        .satellite-craft {
          position: absolute;
          top: -10px;
          left: 50%;
          margin-left: -10px;
          font-size: 18px;
          cursor: pointer;
        }

        /* Telemetry Card */
        .space-telemetry-overlay {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: rgba(18, 10, 38, 0.88);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(139, 92, 246, 0.4);
          border-radius: 18px;
          padding: 16px 20px;
          color: #ffffff;
          width: 290px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          z-index: 20;
        }

        .telemetry-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.8px;
          color: #34d399;
          margin-bottom: 8px;
        }

        .telemetry-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 8px #34d399;
        }

        .telemetry-content h5 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          color: #ffb800;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .data-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 4px;
          color: #cbd5e1;
        }

        .data-row strong {
          color: #ffffff;
        }

        .tip-text {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 10px;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};
