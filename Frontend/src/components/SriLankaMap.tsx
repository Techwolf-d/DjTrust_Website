import React, { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';

export const SriLankaMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    name: string;
    province: string;
    active: boolean;
    x: number;
    y: number;
  }>({
    show: false,
    name: '',
    province: '',
    active: false,
    x: 0,
    y: 0
  });

  // Load interactive SVG map
  useEffect(() => {
    fetch('/assets/img/sri-lanka-interactive-eng.svg')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load map SVG');
        return res.text();
      })
      .then((data) => {
        setSvgContent(data);
      })
      .catch((err) => {
        console.error('Error fetching Sri Lanka SVG map:', err);
      });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const target = (e.target as HTMLElement).closest('.district-path');
    if (target) {
      const name = target.getAttribute('data-name') || '';
      const province = target.getAttribute('data-province') || '';
      const active = target.getAttribute('data-active') === 'true';

      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      setTooltip({
        show: true,
        name,
        province,
        active,
        x: relX,
        y: relY - 14
      });
    } else {
      setTooltip((prev) => (prev.show ? { ...prev, show: false } : prev));
    }
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, show: false }));
  };

  return (
    <div className="map-card-wrapper">
      <style>{`
        .map-card-wrapper {
          border-radius: 24px;
          box-shadow: 0 15px 45px rgba(0, 31, 74, 0.07);
          border: 1px solid rgba(226, 236, 249, 0.8);
          overflow: hidden;
          position: relative;
          z-index: 1;
          margin-bottom: 40px;
          background: #fff;
        }
        #map.lk-map-standalone {
          min-height: 580px;
          height: 600px;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 50%, #f4f8fd 0%, #e8f1fc 65%, #dbeaf7 100%);
          overflow: hidden;
          padding: 30px 20px 45px 20px;
        }
        .lk-sri-lanka-svg-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding-top: 10px;
          padding-bottom: 25px;
        }
        .lk-sri-lanka-svg {
          height: 500px;
          max-height: 82%;
          width: auto;
          max-width: 90%;
          filter: drop-shadow(0 14px 30px rgba(0, 31, 74, 0.14));
          transition: all 0.3s ease;
        }
        .district-path {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .district-path.active-district {
          fill: url(#activeDistrictGrad);
          stroke: #ffffff;
          stroke-width: 1.1;
        }
        .district-path.active-district:hover {
          fill: url(#hoverDistrictGrad) !important;
          stroke: #93c5fd !important;
          stroke-width: 2.2 !important;
          filter: drop-shadow(0 4px 14px rgba(37, 99, 235, 0.5));
        }
        .district-path.inactive-district {
          fill: url(#inactiveDistrictGrad);
          stroke: #ffffff;
          stroke-width: 1.4;
          cursor: pointer;
          opacity: 0.95;
        }
        .district-path.inactive-district:hover {
          fill: url(#inactiveHoverGrad) !important;
          stroke: #ffffff !important;
          stroke-width: 2.2 !important;
          opacity: 1;
          filter: drop-shadow(0 4px 14px rgba(71, 85, 105, 0.45));
        }
        .beacon-wave {
          fill: rgba(56, 189, 248, 0.35);
          animation: beaconPulse 2.8s infinite ease-out;
          pointer-events: none;
        }
        .beacon-point {
          fill: #38bdf8;
          filter: drop-shadow(0 0 4px #0284c7);
          pointer-events: none;
        }
        @keyframes beaconPulse {
          0% { r: 3.2; opacity: 0.95; }
          65% { r: 12; opacity: 0.18; }
          100% { r: 15; opacity: 0; }
        }
        .lk-map-floating-badge {
          position: absolute;
          top: 20px;
          left: 24px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid #bfdbfe;
          border-radius: 50px;
          padding: 8px 18px;
          font-size: 0.8rem;
          font-weight: 800;
          color: #003d8f;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(0, 61, 143, 0.08);
          z-index: 10;
        }
        .lk-map-floating-badge .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
        }
        .lk-map-floating-legend {
          position: absolute;
          top: 20px;
          right: 24px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid #e2ecf9;
          border-radius: 50px;
          padding: 8px 18px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          z-index: 10;
        }
        .lk-map-floating-legend .lg-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .lk-map-floating-legend .lg-box {
          width: 11px;
          height: 11px;
          border-radius: 3px;
          display: inline-block;
        }
        .lk-map-floating-legend .lg-box.active {
          background: linear-gradient(135deg, #0047ab, #001f4a);
        }
        .lk-map-floating-legend .lg-box.inactive {
          background: linear-gradient(135deg, #94a3b8, #64748b);
          border: 1px solid rgba(255, 255, 255, 0.7);
        }
        .lk-map-bottom-hint {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.76rem;
          color: #475569;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(6px);
          padding: 5px 16px;
          border-radius: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(226, 236, 249, 0.9);
          pointer-events: none;
          z-index: 10;
        }
        .lk-map-tooltip {
          position: absolute;
          z-index: 1000;
          pointer-events: none;
          background: rgba(0, 31, 74, 0.94);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 0.82rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transform: translate(-50%, -125%);
          white-space: nowrap;
        }
        .lk-map-tooltip::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 6px 6px 0;
          border-style: solid;
          border-color: rgba(0, 31, 74, 0.94) transparent transparent transparent;
        }
        .lk-map-tooltip .tt-name {
          font-weight: 800;
          font-size: 0.9rem;
          color: #ffffff;
          display: block;
          margin-bottom: 2px;
        }
        .lk-map-tooltip .tt-prov {
          color: #93c5fd;
          font-size: 0.74rem;
          font-weight: 600;
          display: block;
        }
        .lk-map-tooltip .tt-badge {
          display: inline-block;
          margin-top: 4px;
          padding: 2px 7px;
          border-radius: 6px;
          font-size: 0.68rem;
          font-weight: 700;
        }
        .lk-map-tooltip .tt-badge.active {
          background: #10b981;
          color: #ffffff;
        }
        .lk-map-tooltip .tt-badge.inactive {
          background: #64748b;
          color: #ffffff;
        }
        @media (max-width: 768px) {
          .lk-map-floating-badge {
            top: 12px;
            left: 12px;
            padding: 6px 12px;
            font-size: 0.72rem;
          }
          .lk-map-floating-legend {
            top: auto;
            bottom: 40px;
            right: 12px;
            padding: 6px 12px;
            font-size: 0.7rem;
          }
          #map.lk-map-standalone {
            height: 480px;
            min-height: 480px;
            padding: 20px 10px;
          }
          .lk-sri-lanka-svg {
            height: 390px;
            max-height: 80%;
          }
        }
      `}</style>

      <div
        id="map"
        ref={containerRef}
        className="lk-map-standalone"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top-left Floating Badge */}
        <div className="lk-map-floating-badge">
          <span className="live-dot"></span>
          <span>23 Districts Covered (500+ Dealers)</span>
        </div>

        {/* Top-right Floating Legend */}
        <div className="lk-map-floating-legend">
          <span className="lg-item">
            <span className="lg-box active"></span> Authorized Dealers
          </span>
          <span className="lg-item">
            <span className="lg-box inactive"></span> Not Covered
          </span>
        </div>

        {/* SVG Container */}
        <div
          id="sriLankaSvgWrapper"
          className="lk-sri-lanka-svg-wrapper"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        {/* Bottom Hint Pill */}
        <div className="lk-map-bottom-hint flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>Hover over any district to view coverage details</span>
        </div>

        {/* Dynamic Follow Tooltip */}
        {tooltip.show && (
          <div
            id="lkMapTooltip"
            className="lk-map-tooltip"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              display: 'block'
            }}
          >
            <span className="tt-name">{tooltip.name} District</span>
            <span className="tt-prov">{tooltip.province}</span>
            <span className={`tt-badge ${tooltip.active ? 'active' : 'inactive'}`}>
              {tooltip.active ? 'Active Dealer Network' : 'Coverage Unavailable'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
