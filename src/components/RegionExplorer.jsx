import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { wines } from '../data/wines';

const regions = [
  { id: 'france', name: 'France', emoji: '🇫🇷', color: '#722F37', x: 48, y: 25 },
  { id: 'italy', name: 'Italy', emoji: '🇮🇹', color: '#8B4513', x: 52, y: 28 },
  { id: 'spain', name: 'Spain', emoji: '🇪🇸', color: '#C41E3A', x: 45, y: 30 },
  { id: 'california', name: 'California', emoji: '🇺🇸', x: 15, y: 28, color: '#DAA520' },
  { id: 'oregon', name: 'Oregon', emoji: '🌲', x: 14, y: 22, color: '#228B22' },
  { id: 'washington', name: 'Washington', emoji: '🍎', x: 14, y: 20, color: '#4169E1' },
  { id: 'argentina', name: 'Argentina', emoji: '🇦🇷', x: 28, y: 72, color: '#75AADB' },
  { id: 'chile', name: 'Chile', emoji: '🇨🇱', x: 26, y: 68, color: '#D52B1E' },
  { id: 'australia', name: 'Australia', emoji: '🇦🇺', x: 82, y: 68, color: '#FFCD00' },
  { id: 'newzealand', name: 'New Zealand', emoji: '🇳🇿', x: 92, y: 75, color: '#00247D' },
  { id: 'southafrica', name: 'South Africa', emoji: '🇿🇦', x: 55, y: 72, color: '#007749' },
  { id: 'germany', name: 'Germany', emoji: '🇩🇪', x: 50, y: 22, color: '#FFCE00' },
  { id: 'portugal', name: 'Portugal', emoji: '🇵🇹', x: 43, y: 30, color: '#006600' },
  { id: 'newmexico', name: 'New Mexico', emoji: '🌵', x: 18, y: 32, color: '#C41E3A' }
];

const RegionExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const regionWineCounts = useMemo(() => {
    const counts = {};
    regions.forEach(region => {
      counts[region.id] = wines.filter(wine => 
        wine.region.toLowerCase().includes(region.name.toLowerCase()) ||
        (region.id === 'california' && wine.region.toLowerCase().includes('california')) ||
        (region.id === 'oregon' && wine.region.toLowerCase().includes('oregon')) ||
        (region.id === 'washington' && wine.region.toLowerCase().includes('washington')) ||
        (region.id === 'argentina' && wine.region.toLowerCase().includes('argentina')) ||
        (region.id === 'australia' && wine.region.toLowerCase().includes('australia')) ||
        (region.id === 'newzealand' && wine.region.toLowerCase().includes('new zealand')) ||
        (region.id === 'southafrica' && wine.region.toLowerCase().includes('south africa')) ||
        (region.id === 'newmexico' && wine.region.toLowerCase().includes('new mexico'))
      ).length;
    });
    return counts;
  }, []);

  const getRegionWines = (regionName) => {
    return wines.filter(wine => 
      wine.region.toLowerCase().includes(regionName.toLowerCase())
    ).slice(0, 4);
  };

  const activeRegion = selectedRegion || hoveredRegion;
  const regionWines = activeRegion ? getRegionWines(activeRegion.name) : [];

  return (
    <section className="region-explorer-section">
      <div className="region-explorer-container">
        <div className="region-header">
          <span className="region-badge">🌍 EXPLORE BY REGION</span>
          <h2 className="region-title">World Wine Map</h2>
          <p className="region-subtitle">
            Click on any region to discover wines from around the globe
          </p>
        </div>

        <div className="region-content">
          <div className="world-map-container">
            <svg 
              viewBox="0 0 100 80" 
              className="world-map"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified world background */}
              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e6f3ff" />
                  <stop offset="100%" stopColor="#b8d4e8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <rect width="100" height="80" fill="url(#oceanGradient)" />
              
              {/* Simplified continents */}
              <path 
                d="M5,15 Q15,10 25,15 L30,20 L25,35 Q20,45 15,40 L8,30 Z" 
                fill="#d4c5a9" 
                opacity="0.6"
              />
              <path 
                d="M22,40 L30,35 Q35,50 28,70 L22,75 Q18,65 22,55 Z" 
                fill="#d4c5a9" 
                opacity="0.6"
              />
              <path 
                d="M40,10 Q50,8 60,15 L62,25 Q58,35 50,35 L42,30 Q38,20 40,10 Z" 
                fill="#d4c5a9" 
                opacity="0.6"
              />
              <path 
                d="M45,38 L60,35 Q65,50 55,60 L48,65 Q42,55 45,45 Z" 
                fill="#d4c5a9" 
                opacity="0.6"
              />
              <path 
                d="M70,55 Q85,50 92,60 L90,72 Q82,78 75,70 L70,60 Z" 
                fill="#d4c5a9" 
                opacity="0.6"
              />

              {/* Region markers */}
              {regions.map(region => {
                const isActive = activeRegion?.id === region.id;
                const count = regionWineCounts[region.id];
                
                return (
                  <g 
                    key={region.id}
                    className={`region-marker ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedRegion(region)}
                    onMouseEnter={() => setHoveredRegion(region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Pulse effect */}
                    {count > 0 && (
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r={isActive ? 4 : 2.5}
                        fill={region.color}
                        opacity={0.3}
                        className="pulse-ring"
                      />
                    )}
                    
                    {/* Main dot */}
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={isActive ? 2.5 : 1.8}
                      fill={count > 0 ? region.color : '#999'}
                      stroke="#fff"
                      strokeWidth="0.3"
                      filter={isActive ? 'url(#glow)' : 'none'}
                    />
                    
                    {/* Count badge */}
                    {count > 0 && isActive && (
                      <g>
                        <circle
                          cx={region.x + 3}
                          cy={region.y - 3}
                          r="2"
                          fill="#fff"
                          stroke={region.color}
                          strokeWidth="0.3"
                        />
                        <text
                          x={region.x + 3}
                          y={region.y - 2}
                          fontSize="1.8"
                          textAnchor="middle"
                          fill={region.color}
                          fontWeight="bold"
                        >
                          {count}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Region labels */}
            <div className="region-labels">
              {regions.filter(r => regionWineCounts[r.id] > 0).map(region => (
                <button
                  key={region.id}
                  className={`region-label-btn ${activeRegion?.id === region.id ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(region)}
                  onMouseEnter={() => setHoveredRegion(region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  style={{ '--region-color': region.color }}
                >
                  <span className="label-emoji">{region.emoji}</span>
                  <span className="label-name">{region.name}</span>
                  <span className="label-count">{regionWineCounts[region.id]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Region detail panel */}
          <div className={`region-detail-panel ${activeRegion ? 'active' : ''}`}>
            {activeRegion ? (
              <>
                <div className="panel-header" style={{ '--region-color': activeRegion.color }}>
                  <span className="panel-emoji">{activeRegion.emoji}</span>
                  <h3 className="panel-title">{activeRegion.name}</h3>
                  <span className="panel-count">
                    {regionWineCounts[activeRegion.id]} wines
                  </span>
                </div>

                <div className="panel-wines">
                  {regionWines.length > 0 ? (
                    regionWines.map(wine => (
                      <Link 
                        to={`/wine/${wine.slug}`} 
                        key={wine.id}
                        className="panel-wine-card"
                      >
                        <div className={`wine-type-dot ${wine.type}`}></div>
                        <div className="wine-info">
                          <h4>{wine.name}</h4>
                          <p>{wine.grape?.split(',')[0] || 'Blend'}</p>
                        </div>
                        <span className="wine-price">${wine.price}</span>
                      </Link>
                    ))
                  ) : (
                    <p className="no-wines">No wines from this region yet</p>
                  )}
                </div>

                {regionWines.length > 0 && (
                  <Link 
                    to={`/search?region=${activeRegion.name}`}
                    className="panel-view-all"
                  >
                    View All {activeRegion.name} Wines →
                  </Link>
                )}
              </>
            ) : (
              <div className="panel-placeholder">
                <span className="placeholder-icon">🗺️</span>
                <p>Click a region to explore its wines</p>
              </div>
            )}
          </div>
        </div>

        <div className="region-fun-facts">
          <h4>🍇 Did You Know?</h4>
          <div className="facts-grid">
            <div className="fact-card">
              <span className="fact-icon">🏆</span>
              <p>France & Italy produce over <strong>40%</strong> of the world's wine</p>
            </div>
            <div className="fact-card">
              <span className="fact-icon">🌡️</span>
              <p>The best wines grow between <strong>30-50°</strong> latitude</p>
            </div>
            <div className="fact-card">
              <span className="fact-icon">🍷</span>
              <p>There are over <strong>10,000</strong> grape varieties worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionExplorer;
