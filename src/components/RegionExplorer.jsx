import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { wines } from '../data/wines';

// Coordinates updated for amCharts world map (viewBox ~0-1010 x ~250-650)
const regions = [
  // Western Europe
  { id: 'france', name: 'France', emoji: '🇫🇷', color: '#722F37', x: 481, y: 322, countryCode: 'FR', description: 'The birthplace of fine wine, renowned for Bordeaux, Burgundy, and Champagne regions producing world-class wines for centuries.' },
  { id: 'italy', name: 'Italy', emoji: '🇮🇹', color: '#8B4513', x: 513, y: 340, countryCode: 'IT', description: 'Home to over 350 grape varieties, from bold Tuscan reds to crisp Prosecco, with winemaking traditions dating back to ancient Rome.' },
  { id: 'spain', name: 'Spain', emoji: '🇪🇸', color: '#C41E3A', x: 467, y: 345, countryCode: 'ES', description: 'The world\'s largest vineyard area, famous for Rioja, Tempranillo, and refreshing Albariño from diverse terroirs.' },
  { id: 'portugal', name: 'Portugal', emoji: '🇵🇹', x: 455, y: 348, countryCode: 'PT', color: '#006600', description: 'Home of Port wine and increasingly exciting dry reds from indigenous grapes like Touriga Nacional.' },
  { id: 'germany', name: 'Germany', emoji: '🇩🇪', x: 504, y: 310, color: '#FFCE00', countryCode: 'DE', description: 'Master of Riesling in all styles, from bone-dry to lusciously sweet, grown on steep riverside slopes.' },
  { id: 'austria', name: 'Austria', emoji: '🇦🇹', x: 515, y: 318, color: '#ED2939', countryCode: 'AT', description: 'Elegant Grüner Veltliner and spicy Blaufränkisch from alpine vineyards, blending Germanic and Eastern European influences.' },
  { id: 'switzerland', name: 'Switzerland', emoji: '🇨🇭', x: 495, y: 322, color: '#FF0000', countryCode: 'CH', description: 'Alpine wines from Chasselas and Pinot Noir, with stunning Lake Geneva and Valais terroirs.' },
  { id: 'england', name: 'England', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', x: 475, y: 295, color: '#C8102E', countryCode: 'GB', description: 'World-class sparkling wines from Sussex and Kent challenging Champagne\'s dominance.' },
  { id: 'luxembourg', name: 'Luxembourg', emoji: '🇱🇺', x: 488, y: 302, color: '#00A1DE', countryCode: 'LU', description: 'Moselle Valley Riesling and Crémant from Europe\'s smallest quality wine regions.' },
  // Eastern Europe & Caucasus
  { id: 'hungary', name: 'Hungary', emoji: '🇭🇺', x: 525, y: 322, color: '#477050', countryCode: 'HU', description: 'Home of Tokaji\'s legendary sweet wines and crisp Furmint, with 400+ years of winemaking excellence.' },
  { id: 'romania', name: 'Romania', emoji: '🇷🇴', x: 537, y: 323, color: '#002B7F', countryCode: 'RO', description: 'Ancient winemaking traditions with indigenous grapes like Fetească Neagră, producing unique and affordable wines.' },
  { id: 'bulgaria', name: 'Bulgaria', emoji: '🇧🇬', x: 540, y: 338, color: '#00966E', countryCode: 'BG', description: 'Thracian Valley wines with 4,000 years of history, featuring bold Mavrud and international varieties.' },
  { id: 'croatia', name: 'Croatia', emoji: '🇭🇷', x: 515, y: 332, color: '#0093DD', countryCode: 'HR', description: 'Mediterranean and continental wines from Istria\'s Teran and Refošk, plus Žlahtina whites from coastal vineyards.' },
  { id: 'slovenia', name: 'Slovenia', emoji: '🇸🇮', x: 510, y: 328, color: '#0052B4', countryCode: 'SI', description: 'Diverse microclimates producing unique Cviček blends and premium wines from Slovenia\'s varied terroirs.' },
  { id: 'northmacedonia', name: 'North Macedonia', emoji: '🇲🇰', x: 528, y: 345, color: '#D20000', countryCode: 'MK', description: 'Tikveš region produces bold Vranec reds, the Balkans\' signature indigenous grape.' },
  { id: 'moldova', name: 'Moldova', emoji: '🇲🇩', x: 548, y: 318, color: '#FFD200', countryCode: 'MD', description: 'World\'s highest vineyard density, with historic Purcari wines once served to royalty.' },
  { id: 'georgia', name: 'Georgia', emoji: '🇬🇪', x: 580, y: 330, color: '#FF0000', countryCode: 'GE', description: 'Cradle of winemaking with 8,000-year-old traditions, producing Saperavi and Rkatsiteli using ancient qvevri methods.' },
  { id: 'armenia', name: 'Armenia', emoji: '🇦🇲', x: 588, y: 340, color: '#FF7B00', countryCode: 'AM', description: 'Birthplace of wine with the world\'s oldest winery (6,100 years), featuring indigenous Areni Noir.' },
  // Mediterranean & Middle East
  { id: 'greece', name: 'Greece', emoji: '🇬🇷', x: 530, y: 350, color: '#0D5EAF', countryCode: 'GR', description: 'Ancient birthplace of wine with volcanic Santorini Assyrtiko and structured Naoussa Xinomavro from millennia-old traditions.' },
  { id: 'turkey', name: 'Turkey', emoji: '🇹🇷', x: 555, y: 348, color: '#E30A17', countryCode: 'TR', description: 'Ancient Anatolian winemaking with unique indigenous varieties like Öküzgözü and Boğazkere.' },
  { id: 'cyprus', name: 'Cyprus', emoji: '🇨🇾', x: 558, y: 360, color: '#D57800', countryCode: 'CY', description: 'Diarizos Valley and Commandaria\'s 5,000+ years of winemaking with unique Xynisteri grape.' },
  { id: 'lebanon', name: 'Lebanon', emoji: '🇱🇧', x: 568, y: 362, color: '#ED1C24', countryCode: 'LB', description: 'Ancient wine region in the Bekaa Valley with 5,000 years of history, producing distinctive blends from Chateau Musar and others.' },
  { id: 'israel', name: 'Israel', emoji: '🇮🇱', x: 565, y: 368, color: '#0038B8', countryCode: 'IL', description: 'Golan Heights and Galilee produce world-class Cabernet from volcanic terroir.' },
  { id: 'malta', name: 'Malta', emoji: '🇲🇹', x: 515, y: 355, color: '#C01C28', countryCode: 'MT', description: 'Mediterranean island with 5,000 years of winemaking, producing unique wines from limestone terroir.' },
  // Americas
  { id: 'california', name: 'California', emoji: '🇺🇸', x: 138, y: 355, color: '#DAA520', countryCode: 'US', description: 'America\'s premier wine region, known for bold Napa Cabernets, elegant Sonoma Pinots, and innovative winemaking.' },
  { id: 'oregon', name: 'Oregon', emoji: '🌲', x: 140, y: 338, color: '#228B22', countryCode: 'US', description: 'Cool-climate paradise producing exceptional Pinot Noir in the Willamette Valley, rivaling Burgundy\'s finest.' },
  { id: 'washington', name: 'Washington', emoji: '🍎', x: 140, y: 322, color: '#4169E1', countryCode: 'US', description: 'The second-largest US wine producer, excelling in Cabernet, Merlot, and Syrah from the Columbia Valley.' },
  { id: 'newyork', name: 'New York', emoji: '🗽', x: 258, y: 332, color: '#27251F', countryCode: 'US', description: 'Finger Lakes Riesling rivals Germany\'s best, with pioneering Dr. Frank estate leading the way.' },
  { id: 'virginia', name: 'Virginia', emoji: '🌸', x: 255, y: 348, color: '#1C2D5C', countryCode: 'US', description: 'East Coast wine destination with Viognier as its signature grape and Jefferson\'s winemaking legacy.' },
  { id: 'newmexico', name: 'New Mexico', emoji: '🌵', x: 172, y: 365, color: '#C41E3A', countryCode: 'US', description: 'America\'s oldest wine region with high-desert vineyards producing distinctive wines since 1629.' },
  { id: 'michigan', name: 'Michigan', emoji: '🍒', x: 230, y: 332, color: '#003366', countryCode: 'US', description: 'Old Mission Peninsula on the 45th parallel produces exceptional Riesling and cool-climate varietals.' },
  { id: 'texas', name: 'Texas', emoji: '🤠', x: 198, y: 368, color: '#BF5700', countryCode: 'US', description: 'Texas Hill Country\'s limestone soils and warm climate make it ideal for Tannat, Tempranillo, and bold reds.' },
  { id: 'arizona', name: 'Arizona', emoji: '🏜️', x: 158, y: 360, color: '#BE3A34', countryCode: 'US', description: 'High-desert vineyards at 4,500+ feet produce elegant Rhône-style wines with intense concentration.' },
  { id: 'idaho', name: 'Idaho', emoji: '🥔', x: 152, y: 325, color: '#C41230', countryCode: 'US', description: 'Snake River Valley\'s volcanic soils and extreme temperature swings create aromatic, balanced wines.' },
  { id: 'canada', name: 'Canada', emoji: '🇨🇦', x: 255, y: 320, color: '#FF0000', countryCode: 'CA', description: 'Niagara Peninsula icewine and Okanagan Valley reds define Canada\'s cool-climate excellence.' },
  { id: 'mexico', name: 'Mexico', emoji: '🇲🇽', x: 180, y: 388, color: '#006341', countryCode: 'MX', description: 'Valle de Guadalupe is Mexico\'s Napa, producing bold reds and attracting global attention.' },
  { id: 'argentina', name: 'Argentina', emoji: '🇦🇷', x: 290, y: 545, color: '#75AADB', countryCode: 'AR', description: 'High-altitude vineyards in Mendoza produce world-famous Malbec with intense fruit and velvety tannins.' },
  { id: 'chile', name: 'Chile', emoji: '🇨🇱', x: 278, y: 555, color: '#D52B1E', countryCode: 'CL', description: 'Diverse microclimates from coast to Andes, known for exceptional Carménère and value-driven Cabernets.' },
{ id: 'uruguay', name: 'Uruguay', emoji: '🇺🇾', x: 318, y: 560, color: '#001489', countryCode: 'UY', description: 'Tannat is Uruguay\'s signature grape, with Bodega Garzón leading sustainable winemaking.' },
  { id: 'brazil', name: 'Brazil', emoji: '🇧🇷', x: 328, y: 510, color: '#009739', countryCode: 'BR', description: 'Serra Gaúcha sparkling wines from Italian immigrant traditions rival quality Champagne.' },
  { id: 'bolivia', name: 'Bolivia', emoji: '🇧🇴', x: 300, y: 510, color: '#F9E300', countryCode: 'BO', description: 'Tarija\'s extreme altitude vineyards (6,000+ feet) produce intensely concentrated wines.' },
  // Oceania
  { id: 'australia', name: 'Australia', emoji: '🇦🇺', x: 885, y: 570, color: '#FFCD00', countryCode: 'AU', description: 'Bold Barossa Shiraz, elegant Margaret River Cabernets, and crisp Hunter Valley Semillons define this diverse wine nation.' },
  { id: 'tasmania', name: 'Tasmania', emoji: '🏝️', x: 885, y: 590, color: '#005A9C', countryCode: 'AU', description: 'Cool-climate island producing Australia\'s finest sparkling wines and elegant Pinot Noir.' },
  { id: 'newzealand', name: 'New Zealand', emoji: '🇳🇿', x: 965, y: 595, color: '#00247D', countryCode: 'NZ', description: 'World-renowned for vibrant Marlborough Sauvignon Blanc and elegant Central Otago Pinot Noir.' },
  // Asia
  { id: 'japan', name: 'Japan', emoji: '🇯🇵', x: 862, y: 358, color: '#BC002D', countryCode: 'JP', description: 'Yamanashi\'s Koshu grape produces delicate whites perfect with Japanese cuisine.' },
  { id: 'china', name: 'China', emoji: '🇨🇳', x: 800, y: 365, color: '#DE2910', countryCode: 'CN', description: 'Ningxia region wins international awards with Bordeaux-style Cabernets from desert terroir.' },
  { id: 'india', name: 'India', emoji: '🇮🇳', x: 690, y: 395, color: '#FF9933', countryCode: 'IN', description: 'Emerging wine nation with premium vineyards in Nashik Valley producing award-winning Cabernets and Shiraz.' },
  // Africa
  { id: 'southafrica', name: 'South Africa', emoji: '🇿🇦', x: 535, y: 560, color: '#007749', countryCode: 'ZA', description: 'Stunning Stellenbosch wines and unique Pinotage grape showcase 350+ years of winemaking heritage.' }
];

const RegionExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [worldMapPaths, setWorldMapPaths] = useState('');
  const svgContainerRef = useRef(null);

  // Load world map SVG content
  useEffect(() => {
    fetch(new URL('../assets/world-map.svg', import.meta.url).href)
      .then(res => res.text())
      .then(svgContent => {
        // Extract paths from SVG - get content between <g> and </g>
        const pathMatch = svgContent.match(/<g>([\s\S]*?)<\/g>/);
        if (pathMatch) {
          setWorldMapPaths(pathMatch[1]);
        }
      })
      .catch(err => console.error('Failed to load world map:', err));
  }, []);

  const regionWineCounts = useMemo(() => {
    const counts = {};
    regions.forEach(region => {
      counts[region.id] = wines.filter(wine => {
        const regionLower = wine.region.toLowerCase();
        return (
          regionLower.includes(region.name.toLowerCase()) ||
          // USA regions
          (region.id === 'california' && regionLower.includes('california')) ||
          (region.id === 'oregon' && regionLower.includes('oregon')) ||
          (region.id === 'washington' && regionLower.includes('washington')) ||
          (region.id === 'newyork' && (regionLower.includes('new york') || regionLower.includes('finger lakes'))) ||
          (region.id === 'virginia' && regionLower.includes('virginia')) ||
          (region.id === 'newmexico' && regionLower.includes('new mexico')) ||
          (region.id === 'michigan' && regionLower.includes('michigan')) ||
          (region.id === 'texas' && (regionLower.includes('texas') || regionLower.includes('hill country'))) ||
          (region.id === 'arizona' && regionLower.includes('arizona')) ||
          (region.id === 'idaho' && (regionLower.includes('idaho') || regionLower.includes('snake river'))) ||
          // South America
          (region.id === 'argentina' && regionLower.includes('argentina')) ||
          (region.id === 'chile' && regionLower.includes('chile')) ||
          (region.id === 'uruguay' && regionLower.includes('uruguay')) ||
          (region.id === 'brazil' && regionLower.includes('brazil')) ||
          (region.id === 'bolivia' && regionLower.includes('bolivia')) ||
          // Oceania
          (region.id === 'australia' && regionLower.includes('australia') && !regionLower.includes('tasmania')) ||
          (region.id === 'tasmania' && regionLower.includes('tasmania')) ||
          (region.id === 'newzealand' && regionLower.includes('new zealand')) ||
          // Africa
          (region.id === 'southafrica' && regionLower.includes('south africa')) ||
          // Eastern Europe & Caucasus
          (region.id === 'greece' && regionLower.includes('greece')) ||
          (region.id === 'austria' && regionLower.includes('austria')) ||
          (region.id === 'hungary' && regionLower.includes('hungary')) ||
          (region.id === 'georgia' && regionLower.includes('georgia')) ||
          (region.id === 'croatia' && regionLower.includes('croatia')) ||
          (region.id === 'slovenia' && regionLower.includes('slovenia')) ||
          (region.id === 'romania' && regionLower.includes('romania')) ||
          (region.id === 'bulgaria' && regionLower.includes('bulgaria')) ||
          (region.id === 'moldova' && regionLower.includes('moldova')) ||
          (region.id === 'armenia' && regionLower.includes('armenia')) ||
          (region.id === 'northmacedonia' && (regionLower.includes('macedonia') || regionLower.includes('tikve'))) ||
          // Mediterranean & Middle East
          (region.id === 'turkey' && regionLower.includes('turkey')) ||
          (region.id === 'cyprus' && regionLower.includes('cyprus')) ||
          (region.id === 'lebanon' && regionLower.includes('lebanon')) ||
          (region.id === 'israel' && regionLower.includes('israel')) ||
          (region.id === 'malta' && regionLower.includes('malta')) ||
          // Western Europe
          (region.id === 'switzerland' && regionLower.includes('switzerland')) ||
          (region.id === 'england' && (regionLower.includes('england') || regionLower.includes('sussex') || regionLower.includes('kent'))) ||
          (region.id === 'luxembourg' && regionLower.includes('luxembourg')) ||
          // Americas
          (region.id === 'canada' && regionLower.includes('canada')) ||
          (region.id === 'mexico' && regionLower.includes('mexico')) ||
          // Asia
          (region.id === 'japan' && regionLower.includes('japan')) ||
          (region.id === 'china' && regionLower.includes('china')) ||
          (region.id === 'india' && regionLower.includes('india'))
        );
      }).length;
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
              viewBox="0 250 1010 400" 
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
                <style type="text/css">{`
                  .land { 
                    fill: url(#landGradient); 
                    stroke: #1a3a52; 
                    stroke-width: 0.5; 
                    stroke-opacity: 0.5;
                    transition: fill 0.3s ease;
                  }
                  .land:hover { 
                    fill: #4a7c5e; 
                  }
                `}</style>
              </defs>
              
              {/* Ocean background */}
              <rect x="0" y="250" width="1010" height="400" fill="url(#oceanGradient)" />
              
              {/* Grid lines for style */}
              {[...Array(9)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={250 + i * 50} x2="1010" y2={250 + i * 50} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              {[...Array(21)].map((_, i) => (
                <line key={`v${i}`} x1={i * 50} y1="250" x2={i * 50} y2="650" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}

              {/* Embedded world map countries */}
              <g 
                ref={svgContainerRef}
                dangerouslySetInnerHTML={{ __html: worldMapPaths }}
              />

              {/* Region markers - render inactive first, then active on top */}
              {regions.filter(region => activeRegion?.id !== region.id).map(region => {
                const count = regionWineCounts[region.id];
                
                return (
                  <g 
                    key={region.id}
                    className="region-marker"
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
                        r={10}
                        fill={region.color}
                        opacity={0.3}
                        className="pulse-ring"
                      />
                    )}
                    
                    {/* Inner glow */}
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={7}
                      fill={region.color}
                      opacity={0.5}
                    />
                    
                    {/* Main marker */}
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={5}
                      fill={count > 0 ? region.color : '#666'}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
              
              {/* Active marker rendered last to appear on top */}
              {activeRegion && (() => {
                const region = activeRegion;
                const count = regionWineCounts[region.id];
                return (
                  <g 
                    key={region.id}
                    className="region-marker active"
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
                        r={16}
                        fill={region.color}
                        opacity={0.3}
                        className="pulse-ring"
                      />
                    )}
                    
                    {/* Middle ring */}
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={12}
                      fill={region.color}
                      opacity={0.5}
                    />
                    
                    {/* Main marker */}
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={8}
                      fill={count > 0 ? region.color : '#666'}
                      stroke="#fff"
                      strokeWidth="2"
                      filter="url(#glow)"
                    />
                    
                    {/* Wine count badge */}
                    {count > 0 && (
                      <g>
                        <circle
                          cx={region.x + 22}
                          cy={region.y}
                          r="12"
                          fill="#fff"
                          stroke={region.color}
                          strokeWidth="2"
                        />
                        <text
                          x={region.x + 22}
                          y={region.y + 4}
                          fontSize="12"
                          textAnchor="middle"
                          fill={region.color}
                          fontWeight="bold"
                        >
                          {count}
                        </text>
                      </g>
                    )}
                    
                    {/* Region tooltip - positioned above the dot */}
                    <g className="region-tooltip-group">
                      {/* Tooltip box */}
                      <rect
                        x={region.x - Math.max(region.name.length * 5, 35)}
                        y={region.y - 50}
                        width={Math.max(region.name.length * 10, 70)}
                        height="28"
                        rx="4"
                        fill="rgba(255, 255, 255, 0.95)"
                        stroke={region.color}
                        strokeWidth="1.5"
                      />
                      {/* Pointer triangle */}
                      <polygon
                        points={`${region.x - 6},${region.y - 22} ${region.x + 6},${region.y - 22} ${region.x},${region.y - 12}`}
                        fill="rgba(255, 255, 255, 0.95)"
                        stroke={region.color}
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      {/* Cover the stroke where box meets pointer */}
                      <rect
                        x={region.x - 5}
                        y={region.y - 24}
                        width="10"
                        height="4"
                        fill="rgba(255, 255, 255, 0.95)"
                      />
                      {/* Tooltip text */}
                      <text
                        x={region.x}
                        y={region.y - 31}
                        fontSize="14"
                        textAnchor="middle"
                        fill="#1a1a1a"
                        fontWeight="700"
                      >
                        {region.name}
                      </text>
                    </g>
                  </g>
                );
              })()}
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

                {activeRegion.description && (
                  <p className="panel-description">{activeRegion.description}</p>
                )}

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
