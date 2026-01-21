import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { wines } from '../data/wines';

const regions = [
  { id: 'france', name: 'France', emoji: '🇫🇷', color: '#722F37', x: 492, y: 135 },
  { id: 'italy', name: 'Italy', emoji: '🇮🇹', color: '#8B4513', x: 510, y: 150 },
  { id: 'spain', name: 'Spain', emoji: '🇪🇸', color: '#C41E3A', x: 470, y: 155 },
  { id: 'california', name: 'California', emoji: '🇺🇸', x: 115, y: 160, color: '#DAA520' },
  { id: 'oregon', name: 'Oregon', emoji: '🌲', x: 110, y: 135, color: '#228B22' },
  { id: 'washington', name: 'Washington', emoji: '🍎', x: 115, y: 120, color: '#4169E1' },
  { id: 'argentina', name: 'Argentina', emoji: '🇦🇷', x: 260, y: 340, color: '#75AADB' },
  { id: 'chile', name: 'Chile', emoji: '🇨🇱', x: 245, y: 320, color: '#D52B1E' },
  { id: 'australia', name: 'Australia', emoji: '🇦🇺', x: 780, y: 320, color: '#FFCD00' },
  { id: 'newzealand', name: 'New Zealand', emoji: '🇳🇿', x: 850, y: 360, color: '#00247D' },
  { id: 'southafrica', name: 'South Africa', emoji: '🇿🇦', x: 530, y: 340, color: '#007749' },
  { id: 'germany', name: 'Germany', emoji: '🇩🇪', x: 505, y: 120, color: '#FFCE00' },
  { id: 'portugal', name: 'Portugal', emoji: '🇵🇹', x: 458, y: 155, color: '#006600' },
  { id: 'newmexico', name: 'New Mexico', emoji: '🌵', x: 145, y: 175, color: '#C41E3A' }
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
              viewBox="0 0 900 450" 
              className="world-map"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1a3a52" />
                  <stop offset="50%" stopColor="#1e4a6d" />
                  <stop offset="100%" stopColor="#1a3a52" />
                </linearGradient>
                <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3d5c4a" />
                  <stop offset="100%" stopColor="#2d4a3a" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="landShadow">
                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                </filter>
              </defs>
              
              {/* Ocean background */}
              <rect width="900" height="450" fill="url(#oceanGradient)" />
              
              {/* Grid lines for style */}
              {[...Array(9)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 50} x2="900" y2={i * 50} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              {[...Array(18)].map((_, i) => (
                <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="450" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}

              {/* North America */}
              <path 
                d="M50,50 L120,35 L180,30 L220,45 L240,60 L220,80 L200,90 L185,95 L175,110 
                   L165,130 L150,145 L130,160 L120,180 L100,200 L85,210 L75,230 L90,250 
                   L110,260 L130,270 L160,265 L180,250 L200,235 L210,220 L220,200 L235,190 
                   L245,200 L235,220 L220,240 L200,260 L180,280 L160,290 L140,300 L120,310 
                   L100,300 L80,280 L65,260 L55,240 L50,220 L40,200 L35,180 L30,160 L25,140 
                   L30,120 L35,100 L40,80 L45,60 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />
              
              {/* Central America & Mexico */}
              <path 
                d="M130,270 L145,275 L160,280 L175,290 L180,305 L175,315 L160,320 L150,310 
                   L140,305 L130,295 L125,285 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />

              {/* South America */}
              <path 
                d="M200,300 L230,290 L260,285 L290,295 L310,310 L315,340 L305,370 L290,395 
                   L270,415 L250,425 L235,420 L225,400 L230,375 L240,350 L245,320 L230,310 
                   L210,305 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />

              {/* Europe */}
              <path 
                d="M430,85 L460,75 L490,70 L520,75 L550,85 L565,100 L560,120 L545,135 
                   L530,150 L510,160 L490,165 L470,170 L455,165 L445,155 L435,140 L440,120 
                   L445,100 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />
              
              {/* UK & Ireland */}
              <path 
                d="M455,90 L465,85 L475,90 L480,100 L475,110 L465,115 L455,110 L450,100 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />
              
              {/* Scandinavia */}
              <path 
                d="M490,45 L510,40 L530,50 L545,65 L550,80 L540,90 L525,85 L510,75 L500,60 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />

              {/* Africa */}
              <path 
                d="M440,175 L480,170 L520,180 L560,195 L590,220 L600,260 L595,300 L580,340 
                   L555,370 L520,385 L485,380 L455,360 L435,330 L425,290 L420,250 L425,210 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />

              {/* Asia (simplified) */}
              <path 
                d="M560,70 L620,55 L680,50 L740,60 L790,80 L820,110 L830,150 L820,190 
                   L800,220 L770,240 L730,250 L690,245 L650,235 L620,215 L595,190 L575,160 
                   L560,130 L555,100 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />
              
              {/* India */}
              <path 
                d="M640,200 L670,195 L695,210 L700,240 L690,270 L665,290 L640,280 L630,255 
                   L635,225 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />
              
              {/* Southeast Asia */}
              <path 
                d="M720,240 L750,235 L780,250 L790,280 L780,310 L755,320 L730,310 L720,280 
                   L715,255 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />

              {/* Australia */}
              <path 
                d="M720,290 L770,280 L820,290 L850,315 L855,350 L840,380 L805,395 L760,390 
                   L725,370 L710,340 L715,310 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />
              
              {/* New Zealand */}
              <path 
                d="M855,355 L870,350 L880,365 L875,385 L860,395 L845,385 L850,365 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
              />

              {/* Japan */}
              <path 
                d="M810,130 L825,125 L835,140 L830,160 L815,170 L800,165 L805,145 Z"
                fill="url(#landGradient)"
                filter="url(#landShadow)"
                opacity="0.9"
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
                    {/* Outer pulse ring */}
                    {count > 0 && (
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r={isActive ? 20 : 12}
                        fill={region.color}
                        opacity={0.3}
                        className="pulse-ring"
                      />
                    )}
                    
                    {/* Inner glow */}
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={isActive ? 14 : 8}
                      fill={region.color}
                      opacity={0.5}
                    />
                    
                    {/* Main marker */}
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={isActive ? 10 : 6}
                      fill={count > 0 ? region.color : '#666'}
                      stroke="#fff"
                      strokeWidth="2"
                      filter={isActive ? 'url(#glow)' : 'none'}
                    />
                    
                    {/* Wine count badge */}
                    {count > 0 && isActive && (
                      <g>
                        <circle
                          cx={region.x + 15}
                          cy={region.y - 15}
                          r="12"
                          fill="#fff"
                          stroke={region.color}
                          strokeWidth="2"
                        />
                        <text
                          x={region.x + 15}
                          y={region.y - 11}
                          fontSize="10"
                          textAnchor="middle"
                          fill={region.color}
                          fontWeight="bold"
                        >
                          {count}
                        </text>
                      </g>
                    )}
                    
                    {/* Region label on hover */}
                    {isActive && (
                      <text
                        x={region.x}
                        y={region.y + 28}
                        fontSize="11"
                        textAnchor="middle"
                        fill="#fff"
                        fontWeight="600"
                        className="region-label-text"
                      >
                        {region.name}
                      </text>
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
