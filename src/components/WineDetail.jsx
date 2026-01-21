import { useState, useEffect, useRef } from 'react';
import { useWines } from '../context/WineContext';
import WineCard from './WineCard';
import { WineBottle } from './WineBottle';
import FavoriteButton from './FavoriteButton';

// Animated counter hook
const useCountUp = (end, duration = 1500, start = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start, isVisible]);
  
  return { count, setIsVisible };
};

// Section animation hook
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  
  return { ref, isInView };
};

// Flavor Profile Component
const FlavorProfile = ({ wine }) => {
  const flavors = {
    red: { 'Body': 80, 'Tannins': 70, 'Acidity': 60, 'Fruit': 85, 'Oak': 50 },
    white: { 'Body': 50, 'Sweetness': 30, 'Acidity': 80, 'Fruit': 75, 'Mineral': 60 },
    rosé: { 'Body': 45, 'Sweetness': 40, 'Acidity': 70, 'Fruit': 90, 'Freshness': 85 },
    sparkling: { 'Bubbles': 95, 'Body': 40, 'Acidity': 85, 'Sweetness': 35, 'Complexity': 70 }
  };
  
  const profile = flavors[wine.type] || flavors.red;
  const { ref, isInView } = useInView();
  
  return (
    <div className="flavor-profile" ref={ref}>
      <h3>Flavor Profile</h3>
      <div className="flavor-bars">
        {Object.entries(profile).map(([label, value], i) => (
          <div key={label} className="flavor-bar-container" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flavor-bar-label">{label}</div>
            <div className="flavor-bar-track">
              <div 
                className={`flavor-bar-fill wine-type-${wine.type}`}
                style={{ 
                  width: isInView ? `${value}%` : '0%',
                  transitionDelay: `${i * 0.15}s`
                }}
              />
            </div>
            <div className="flavor-bar-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Serving Temperature Component
const ServingTemp = ({ wine }) => {
  const temps = {
    red: { min: 60, max: 68, ideal: 64, label: 'Room Temperature' },
    white: { min: 45, max: 55, ideal: 50, label: 'Chilled' },
    rosé: { min: 45, max: 55, ideal: 50, label: 'Chilled' },
    sparkling: { min: 38, max: 45, ideal: 42, label: 'Well Chilled' }
  };
  
  const temp = temps[wine.type] || temps.red;
  const { ref, isInView } = useInView();
  
  return (
    <div className="serving-temp" ref={ref}>
      <div className="temp-thermometer">
        <div className="temp-scale">
          <div 
            className={`temp-indicator wine-bg-${wine.type}`}
            style={{ 
              height: isInView ? `${((temp.ideal - 32) / 50) * 100}%` : '0%'
            }}
          />
        </div>
        <div className="temp-bulb">
          <span className={`temp-value ${isInView ? 'visible' : ''}`}>{temp.ideal}°F</span>
        </div>
      </div>
      <div className="temp-info">
        <h4>Serving Temperature</h4>
        <p className="temp-range">{temp.min}°F - {temp.max}°F</p>
        <span className="temp-label">{temp.label}</span>
      </div>
    </div>
  );
};

// Wine Score Breakdown
const ScoreBreakdown = ({ rating }) => {
  const { ref, isInView } = useInView();
  const scores = [
    { label: 'Appearance', score: Math.min(20, (rating / 5) * 20), max: 20 },
    { label: 'Aroma', score: Math.min(25, (rating / 5) * 25), max: 25 },
    { label: 'Palate', score: Math.min(30, (rating / 5) * 30), max: 30 },
    { label: 'Finish', score: Math.min(25, (rating / 5) * 25), max: 25 }
  ];
  
  return (
    <div className="score-breakdown" ref={ref}>
      <h3>Score Breakdown</h3>
      <div className="score-wheel">
        <svg viewBox="0 0 200 200" className="score-svg">
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#722F37" />
              <stop offset="100%" stopColor="#A04050" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(114,47,55,0.15)" strokeWidth="15" />
          <circle 
            cx="100" 
            cy="100" 
            r="85" 
            fill="none" 
            stroke="url(#scoreGrad)" 
            strokeWidth="15"
            strokeDasharray={`${isInView ? (rating / 5) * 534 : 0} 534`}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            className="score-arc"
          />
          <text x="100" y="95" textAnchor="middle" className="score-text-large">{rating}</text>
          <text x="100" y="120" textAnchor="middle" className="score-text-small">out of 5</text>
        </svg>
      </div>
      <div className="score-details">
        {scores.map((s, i) => (
          <div key={s.label} className="score-detail" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="detail-label">{s.label}</span>
            <div className="detail-bar">
              <div 
                className="detail-fill"
                style={{ width: isInView ? `${(s.score / s.max) * 100}%` : '0%' }}
              />
            </div>
            <span className="detail-score">{s.score.toFixed(0)}/{s.max}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Decanting Recommendation
const DecantingGuide = ({ wine }) => {
  const guides = {
    red: { time: '1-2 hours', needed: true, tip: 'Pour into a wide-bottom decanter to maximize oxygen exposure' },
    white: { time: '15-30 min', needed: false, tip: 'Optional - older whites may benefit from brief decanting' },
    rosé: { time: 'Not needed', needed: false, tip: 'Serve directly from the bottle, well chilled' },
    sparkling: { time: 'Never', needed: false, tip: 'Decanting will cause loss of precious bubbles!' }
  };
  
  const guide = guides[wine.type] || guides.red;
  
  return (
    <div className={`decanting-guide ${guide.needed ? 'needed' : ''}`}>
      <div className="decanting-icon">
        {guide.needed ? '⏰' : '✓'}
      </div>
      <div className="decanting-info">
        <h4>Decanting</h4>
        <p className="decanting-time">{guide.time}</p>
        <span className="decanting-tip">{guide.tip}</span>
      </div>
    </div>
  );
};

// Interactive Tasting Note with expand
const TastingNoteCard = ({ icon, label, content, delay = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const { ref, isInView } = useInView();
  
  return (
    <div 
      ref={ref}
      className={`tasting-note-card ${expanded ? 'expanded' : ''} ${isInView ? 'in-view' : ''}`}
      style={{ animationDelay: `${delay}s` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="tasting-note-header">
        <span className="tasting-icon">{icon}</span>
        <span className="tasting-label">{label}</span>
        <span className="expand-indicator">{expanded ? '−' : '+'}</span>
      </div>
      <div className="tasting-note-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

// Share buttons
const ShareButtons = ({ wine }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="share-buttons">
      <button className="share-btn copy" onClick={handleCopy} title="Copy Link">
        {copied ? '✓ Copied!' : '🔗 Share'}
      </button>
    </div>
  );
};

export default function WineDetail({ wine }) {
  const { getRelatedWines } = useWines();
  const relatedWines = getRelatedWines(wine);
  const [activeSection, setActiveSection] = useState('overview');
  const { ref: heroRef, isInView: heroInView } = useInView();

  const tabs = ['overview', 'tasting', 'details', 'pairings'];
  
  const typeColors = {
    red: { primary: '#722F37', secondary: '#A04050', gradient: 'linear-gradient(135deg, #722F37 0%, #A04050 100%)' },
    white: { primary: '#F5DEB3', secondary: '#FFFACD', gradient: 'linear-gradient(135deg, #DAA520 0%, #F5DEB3 100%)' },
    rosé: { primary: '#FFB6C1', secondary: '#FFC0CB', gradient: 'linear-gradient(135deg, #DB7093 0%, #FFB6C1 100%)' },
    sparkling: { primary: '#FFD700', secondary: '#FFF8DC', gradient: 'linear-gradient(135deg, #FFD700 0%, #FFF8DC 100%)' }
  };
  
  const colors = typeColors[wine.type] || typeColors.red;

  return (
    <article className={`wine-detail-enhanced wine-type-${wine.type}`}>
      {/* Animated Hero Section */}
      <header 
        ref={heroRef}
        className={`wine-hero ${heroInView ? 'in-view' : ''}`}
        style={{ '--primary': colors.primary, '--gradient': colors.gradient }}
      >
        <div className="hero-bg-pattern" />
        <div className="hero-glow" />
        
        <div className="hero-actions">
          <FavoriteButton wineSlug={wine.slug} size="large" />
          <ShareButtons wine={wine} />
        </div>
        
        <div className="hero-bottle-container">
          <div className="bottle-glow" />
          <div className="bottle-wrapper">
            <WineBottle type={wine.type} size={180} name={wine.name} vintage={wine.vintage} />
          </div>
          <div className="bottle-shadow" />
        </div>
        
        <div className="hero-info">
          <span className={`wine-type-badge badge-${wine.type}`}>{wine.type}</span>
          <h1 className="hero-title">{wine.name}</h1>
          <p className="hero-winery">{wine.winery}</p>
          <p className="hero-region">📍 {wine.region}</p>
          
          <div className="hero-stats">
            <div className="stat-pill price">
              <span className="stat-value">${wine.price}</span>
            </div>
            <div className="stat-pill rating">
              <span className="stat-icon">★</span>
              <span className="stat-value">{wine.rating}</span>
            </div>
            <div className="stat-pill vintage">
              <span className="stat-value">{wine.vintage}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="wine-tabs">
        {tabs.map(tab => (
          <button 
            key={tab}
            className={`tab-btn ${activeSection === tab ? 'active' : ''}`}
            onClick={() => setActiveSection(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="tab-content overview-content">
          {/* Quick Facts Grid */}
          <section className="info-section facts-section">
            <h2 className="section-title">
              <span className="title-icon">📊</span> Quick Facts
            </h2>
            <div className="facts-grid animated">
              {[
                { icon: '🍇', label: 'Grape', value: wine.grape },
                { icon: '🥂', label: 'Alcohol', value: `${wine.alcohol}%` },
                { icon: '🍾', label: 'Closure', value: wine.closure },
                { icon: '📅', label: 'Best Before', value: wine.drinkingWindow?.end || 'Now' }
              ].map((fact, i) => (
                <div key={fact.label} className="fact-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="fact-icon">{fact.icon}</span>
                  <span className="fact-label">{fact.label}</span>
                  <span className="fact-value">{fact.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Description with animated reveal */}
          <section className="info-section description-section">
            <h2 className="section-title">
              <span className="title-icon">📜</span> About This Wine
            </h2>
            <div className="description-card">
              <p className="wine-description">{wine.description}</p>
            </div>
          </section>

          {/* Visual Stats Row */}
          <div className="visual-stats-row">
            <FlavorProfile wine={wine} />
            <ScoreBreakdown rating={wine.rating} />
          </div>
        </div>
      )}

      {/* Tasting Section */}
      {activeSection === 'tasting' && (
        <div className="tab-content tasting-content">
          {wine.tastingNotes && (
            <section className="info-section">
              <h2 className="section-title">
                <span className="title-icon">🍷</span> Tasting Notes
              </h2>
              <p className="section-hint">Click each card for more details</p>
              <div className="tasting-notes-grid">
                <TastingNoteCard icon="👁️" label="Color" content={wine.tastingNotes.color} delay={0} />
                <TastingNoteCard icon="👃" label="Aroma" content={wine.tastingNotes.aroma} delay={0.1} />
                <TastingNoteCard icon="👅" label="Palate" content={wine.tastingNotes.palate} delay={0.2} />
                <TastingNoteCard icon="✨" label="Finish" content={wine.tastingNotes.finish} delay={0.3} />
              </div>
            </section>
          )}

          <div className="serving-row">
            <ServingTemp wine={wine} />
            <DecantingGuide wine={wine} />
          </div>
        </div>
      )}

      {/* Details Section */}
      {activeSection === 'details' && (
        <div className="tab-content details-content">
          {/* Region Info */}
          {wine.regionInfo && (
            <section className="info-section region-section">
              <h2 className="section-title">
                <span className="title-icon">🌍</span> About the Region
              </h2>
              <div className="region-card">
                <div className="region-map-preview">
                  <span className="region-emoji">🗺️</span>
                </div>
                <div className="region-text">
                  <h3>{wine.region}</h3>
                  <p>{wine.regionInfo}</p>
                </div>
              </div>
            </section>
          )}

          {/* Pro Tips */}
          {wine.proTips && wine.proTips.length > 0 && (
            <section className="info-section tips-section">
              <h2 className="section-title">
                <span className="title-icon">💡</span> Pro Tips
              </h2>
              <div className="tips-list">
                {wine.proTips.map((tip, index) => (
                  <div key={index} className="tip-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="tip-number">{index + 1}</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Where to Buy */}
          {wine.whereToBuy && wine.whereToBuy.length > 0 && (
            <section className="info-section buy-section">
              <h2 className="section-title">
                <span className="title-icon">🛒</span> Where to Buy
              </h2>
              <div className="store-tags">
                {wine.whereToBuy.map((store, index) => (
                  <span key={index} className="store-tag animated" style={{ animationDelay: `${index * 0.05}s` }}>
                    {store}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Pairings Section */}
      {activeSection === 'pairings' && (
        <div className="tab-content pairings-content">
          {wine.pairings && wine.pairings.length > 0 && (
            <section className="info-section">
              <h2 className="section-title">
                <span className="title-icon">🍽️</span> Perfect Pairings
              </h2>
              <div className="pairings-showcase">
                {wine.pairings.map((pairing, index) => (
                  <div key={index} className="pairing-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="pairing-emoji">
                      {pairing.toLowerCase().includes('beef') ? '🥩' :
                       pairing.toLowerCase().includes('chicken') ? '🍗' :
                       pairing.toLowerCase().includes('fish') ? '🐟' :
                       pairing.toLowerCase().includes('cheese') ? '🧀' :
                       pairing.toLowerCase().includes('pasta') ? '🍝' :
                       pairing.toLowerCase().includes('salad') ? '🥗' :
                       pairing.toLowerCase().includes('seafood') ? '🦐' :
                       pairing.toLowerCase().includes('lamb') ? '🍖' :
                       pairing.toLowerCase().includes('pork') ? '🥓' :
                       pairing.toLowerCase().includes('dessert') || pairing.toLowerCase().includes('chocolate') ? '🍫' :
                       '🍴'}
                    </span>
                    <span className="pairing-name">{pairing}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pairing Tips */}
          <section className="info-section pairing-tips-section">
            <h2 className="section-title">
              <span className="title-icon">🎯</span> Pairing Philosophy
            </h2>
            <div className="philosophy-cards">
              <div className="philosophy-card">
                <span className="phil-icon">⚖️</span>
                <h4>Match Weight</h4>
                <p>Pair light wines with light dishes, bold wines with rich foods</p>
              </div>
              <div className="philosophy-card">
                <span className="phil-icon">🌿</span>
                <h4>Regional Pairing</h4>
                <p>What grows together, goes together - think local cuisine</p>
              </div>
              <div className="philosophy-card">
                <span className="phil-icon">🔄</span>
                <h4>Complement or Contrast</h4>
                <p>Either echo flavors or create exciting contrasts</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Related Wines - Always visible */}
      {relatedWines.length > 0 && (
        <section className="info-section related-section">
          <h2 className="section-title">
            <span className="title-icon">🍷</span> You Might Also Like
          </h2>
          <div className="related-wines-scroll">
            {relatedWines.map((relatedWine, index) => (
              <div key={relatedWine.id} className="related-wine-wrapper" style={{ animationDelay: `${index * 0.1}s` }}>
                <WineCard wine={relatedWine} compact />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
