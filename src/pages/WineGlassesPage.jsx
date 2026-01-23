import React, { useState } from 'react';
import './WineGlassesPage.css';

const WineGlassesPage = () => {
  const [selectedGlass, setSelectedGlass] = useState(null);

  const glasses = [
    {
      id: 'full-red',
      name: 'Full-Bodied Red',
      aka: 'Bordeaux Glass',
      icon: '🍷',
      bowlSize: 'Large & Tall',
      color: '#722F37',
      wines: ['Cabernet Sauvignon', 'Merlot', 'Syrah/Shiraz', 'Malbec', 'Bordeaux Blends'],
      why: 'The large bowl allows bold wines to breathe and open up. The tall shape directs wine to the back of the mouth, softening tannins and emphasizing fruit.',
      science: 'More surface area = more oxidation = smoother tannins. The wide opening lets your nose get close to the wine for maximum aroma detection.',
      history: 'The Bordeaux glass was designed in the 18th century to complement the region\'s structured, tannic wines. Riedel refined the modern design in the 1950s.',
      funFact: 'The shape of a wine glass can affect flavor perception by up to 20%, according to a study by the Riedel family.',
      source: 'Riedel Glass Company research',
      essential: true
    },
    {
      id: 'light-red',
      name: 'Light-Bodied Red',
      aka: 'Burgundy Glass',
      icon: '🍷',
      bowlSize: 'Wide & Round',
      color: '#B22222',
      wines: ['Pinot Noir', 'Gamay (Beaujolais)', 'Nebbiolo', 'Grenache', 'Barbera'],
      why: 'The wide, balloon-shaped bowl captures delicate aromas. The larger opening delivers wine to the tip of the tongue, emphasizing the fruit-forward nature.',
      science: 'Light reds have subtle aromatics that need a bigger "collection zone." The shape also helps the wine warm slightly in hand, releasing more aromatics.',
      history: 'The Burgundy glass evolved alongside Pinot Noir, which requires a different approach than tannic Bordeaux wines. Its fish-bowl shape became standard by the mid-20th century.',
      funFact: 'In blind taste tests, the same Pinot Noir was rated 15% higher when served in a Burgundy glass versus a standard wine glass.',
      source: 'Journal of Sensory Studies, 2015',
      essential: false
    },
    {
      id: 'rose-spicy',
      name: 'Rosé / Spicy Red',
      aka: 'Flared Lip Glass',
      icon: '🌸',
      bowlSize: 'Medium with Flared Rim',
      color: '#FFB6C1',
      wines: ['Rosé', 'Zinfandel', 'Tempranillo', 'Côtes du Rhône', 'Chianti'],
      why: 'The flared rim directs wine to the tip of the tongue where sweetness is perceived, balancing the spice and acidity in these wines.',
      science: 'The slight flare counteracts the natural tendency to perceive spicy wines as harsh. It\'s all about where the wine lands on your palate.',
      history: 'This style emerged more recently as winemakers and sommeliers sought ways to better showcase rosé and medium-bodied spicy reds.',
      funFact: 'Rosé consumption in the US increased by 53% between 2017-2022, finally giving this "in-between" glass its moment!',
      source: 'Nielsen Wine Data, 2022',
      essential: false
    },
    {
      id: 'sparkling',
      name: 'Sparkling Wine',
      aka: 'Flute or Tulip',
      icon: '🥂',
      bowlSize: 'Tall & Narrow',
      color: '#F5F5DC',
      wines: ['Champagne', 'Prosecco', 'Cava', 'Crémant', 'Sparkling Rosé'],
      why: 'The narrow shape preserves carbonation longer. Bubbles have less surface area to escape, keeping your sparkle sparkling.',
      science: 'A flute can keep champagne fizzy for up to 20 minutes longer than a regular glass. The tall shape creates a beautiful bubble stream called a "mousse."',
      history: 'The champagne flute replaced the coupe (that shallow glass supposedly molded from Marie Antoinette\'s breast—not true!) in the 1970s as producers wanted to showcase bubbles.',
      funFact: 'The coupe glass myth about Marie Antoinette is 100% false. Coupes were designed in England in the 1660s, well before she was born!',
      source: 'The Oxford Companion to Wine',
      essential: true
    },
    {
      id: 'white',
      name: 'White Wine',
      aka: 'Standard White Glass',
      icon: '🥂',
      bowlSize: 'Medium & U-Shaped',
      color: '#F0E68C',
      wines: ['Chardonnay', 'Sauvignon Blanc', 'Pinot Grigio', 'Riesling', 'Viognier'],
      why: 'Smaller bowl keeps white wine chilled longer since there\'s less surface area exposed to air. The U-shape concentrates floral and citrus aromatics.',
      science: 'White wines are served cold, and a smaller bowl means less wine warming up at once. Think of it as temperature management in a glass.',
      history: 'White wine glasses evolved to be smaller than reds as understanding of temperature\'s role in white wine enjoyment grew through the 20th century.',
      funFact: 'The average white wine glass has increased in size by 70% since the 1970s, mirroring our cultural shift toward bigger portion sizes!',
      source: 'BMJ Study on Wine Glass Sizes, 2017',
      essential: true
    },
    {
      id: 'fortified',
      name: 'Fortified / Dessert',
      aka: 'Port Glass or Copita',
      icon: '🍯',
      bowlSize: 'Small & Narrow',
      color: '#CD853F',
      wines: ['Port', 'Sherry', 'Madeira', 'Ice Wine', 'Sauternes', 'Vin Santo'],
      why: 'Small size for appropriate portions (fortified wines are 17-22% alcohol!). Narrow opening concentrates intense sweet aromatics without overwhelming.',
      science: 'The tapered shape funnels concentrated aromas while the small bowl encourages sipping rather than gulping these potent wines.',
      history: 'The copita (sherry glass) originated in Jerez, Spain. Port glasses developed in Portugal and England where Port was hugely popular in the 18th-19th centuries.',
      funFact: 'Traditional Port etiquette says you should always pass the decanter to the left. Breaking this rule at formal dinners is considered very bad form!',
      source: 'The Port Wine Institute',
      essential: false
    }
  ];

  const essentialGlasses = glasses.filter(g => g.essential);

  return (
    <div className="wine-glasses-page">
      <div className="page-header">
        <h1>🍷 Wine Glass Guide</h1>
        <p>Everything you need to know (and don't need to buy)</p>
      </div>

      <div className="reality-check">
        <div className="reality-check-content">
          <span className="reality-icon">💡</span>
          <div>
            <h2>Let's Be Real...</h2>
            <p>
              Do you <em>need</em> six different wine glasses? <strong>Absolutely not.</strong> Most people can get by perfectly well with 
              <strong> two glasses</strong> (one red, one white) or even <strong>one universal glass</strong>. 
              The wine industry loves selling specialty glassware, but the truth is: a good wine will taste good in any clean glass.
            </p>
            <p className="reality-note">
              That said, the right glass <em>can</em> enhance your experience—just don't let anyone make you feel bad about drinking Champagne from a mug. 🤷‍♀️
            </p>
          </div>
        </div>
      </div>

      <div className="glasses-showcase">
        <h2>The Main Six Wine Glasses</h2>
        <p className="showcase-subtitle">Click any glass to learn more</p>
        
        <div className="glasses-grid">
          {glasses.map((glass) => (
            <div 
              key={glass.id}
              className={`glass-card ${selectedGlass?.id === glass.id ? 'selected' : ''} ${glass.essential ? 'essential' : ''}`}
              onClick={() => setSelectedGlass(selectedGlass?.id === glass.id ? null : glass)}
            >
              <div className="glass-visual">
                <GlassIllustration type={glass.id} color={glass.color} />
                {glass.essential && <span className="essential-badge">Essential</span>}
              </div>
              <h3>{glass.name}</h3>
              <p className="glass-aka">({glass.aka})</p>
              <p className="glass-bowl">{glass.bowlSize}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedGlass && (
        <div className="glass-details">
          <div className="details-header">
            <GlassIllustration type={selectedGlass.id} color={selectedGlass.color} size="large" />
            <div>
              <h2>{selectedGlass.name}</h2>
              <p className="details-aka">{selectedGlass.aka}</p>
            </div>
          </div>

          <div className="details-content">
            <div className="detail-section wines-section">
              <h3>🍇 Best For These Wines</h3>
              <div className="wines-list">
                {selectedGlass.wines.map((wine, i) => (
                  <span key={i} className="wine-tag">{wine}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>🤔 Why This Shape?</h3>
              <p>{selectedGlass.why}</p>
            </div>

            <div className="detail-section">
              <h3>🔬 The Science</h3>
              <p>{selectedGlass.science}</p>
            </div>

            <div className="detail-section">
              <h3>📜 History</h3>
              <p>{selectedGlass.history}</p>
            </div>

            <div className="detail-section fun-fact">
              <h3>🎉 Fun Fact</h3>
              <p>{selectedGlass.funFact}</p>
              <cite>Source: {selectedGlass.source}</cite>
            </div>
          </div>

          <button className="close-details" onClick={() => setSelectedGlass(null)}>
            ✕ Close
          </button>
        </div>
      )}

      <div className="practical-guide">
        <h2>🎯 The Practical Buying Guide</h2>
        
        <div className="buying-tiers">
          <div className="tier tier-minimal">
            <div className="tier-header">
              <span className="tier-icon">1️⃣</span>
              <h3>The Minimalist</h3>
              <span className="tier-count">1 Glass</span>
            </div>
            <div className="tier-content">
              <p>Get a <strong>universal wine glass</strong>—medium bowl, works for everything. Perfect for apartments, beginners, or anyone who hates clutter.</p>
              <div className="tier-recommendation">
                <strong>Recommended:</strong> Any glass with a medium-sized bowl and stem. Zalto Universal or Gabriel-Glas are popular, but any restaurant-quality glass works.
              </div>
            </div>
          </div>

          <div className="tier tier-practical">
            <div className="tier-header">
              <span className="tier-icon">2️⃣</span>
              <h3>The Practical Wine Lover</h3>
              <span className="tier-count">2-3 Glasses</span>
            </div>
            <div className="tier-content">
              <p>One <strong>larger red wine glass</strong> + one <strong>white wine glass</strong>. Add a <strong>flute for sparkling</strong> if you celebrate often.</p>
              <div className="tier-recommendation">
                <strong>This covers 95% of wines.</strong> Most sommeliers agree this is the sweet spot for home entertaining.
              </div>
            </div>
          </div>

          <div className="tier tier-enthusiast">
            <div className="tier-header">
              <span className="tier-icon">3️⃣</span>
              <h3>The Enthusiast</h3>
              <span className="tier-count">4-6 Glasses</span>
            </div>
            <div className="tier-content">
              <p>Add a <strong>Burgundy glass</strong> for Pinot Noir lovers and a <strong>Port glass</strong> for dessert wines. The full set for those who want to optimize every pour.</p>
              <div className="tier-recommendation">
                <strong>Only if:</strong> You regularly drink different wine styles and genuinely enjoy the ritual of proper glassware.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tips-section">
        <h2>🧠 Pro Tips (That Actually Matter)</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">🧼</span>
            <h4>Keep Them Clean</h4>
            <p>A clean glass matters more than shape. Residual soap or odors will ruin any wine. Rinse with hot water and air dry.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🤏</span>
            <h4>Hold By The Stem</h4>
            <p>Your hand warms the wine. Hold the stem to keep whites cold and prevent fingerprints on the bowl (you want to see the color!).</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📏</span>
            <h4>Don't Overfill</h4>
            <p>Fill to the widest part of the bowl (about ⅓ full). This leaves room for swirling and concentrating aromas.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">💰</span>
            <h4>Price ≠ Quality</h4>
            <p>You don't need $50 glasses. Mid-range ($10-20/glass) restaurant-quality stemware works perfectly for most people.</p>
          </div>
        </div>
      </div>

      <div className="page-footer">
        <div className="footer-message">
          <span className="footer-icon">🍷</span>
          <div>
            <h4>The Bottom Line</h4>
            <p>
              The best glass is the one you'll actually use. Don't let glassware snobbery stop you from enjoying wine. 
              Grandma's favorite mug? A mason jar? Totally valid. Wine is about pleasure, not performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// SVG Wine Glass Illustrations
const GlassIllustration = ({ type, color, size = 'normal' }) => {
  const scale = size === 'large' ? 1.5 : 1;
  const width = 80 * scale;
  const height = 120 * scale;
  
  const glassShapes = {
    'full-red': (
      <svg viewBox="0 0 80 120" width={width} height={height}>
        {/* Stem */}
        <rect x="37" y="75" width="6" height="35" fill="#e8e8e8" />
        {/* Base */}
        <ellipse cx="40" cy="112" rx="20" ry="5" fill="#d0d0d0" />
        {/* Bowl */}
        <path d="M15 10 Q10 40 20 65 Q30 75 40 75 Q50 75 60 65 Q70 40 65 10 Z" 
              fill="rgba(200,200,220,0.3)" stroke="#ccc" strokeWidth="1"/>
        {/* Wine */}
        <path d="M20 35 Q18 50 25 62 Q32 70 40 70 Q48 70 55 62 Q62 50 60 35 Z" 
              fill={color} opacity="0.85"/>
        {/* Shine */}
        <ellipse cx="28" cy="45" rx="5" ry="8" fill="rgba(255,255,255,0.3)" />
      </svg>
    ),
    'light-red': (
      <svg viewBox="0 0 80 120" width={width} height={height}>
        <rect x="37" y="75" width="6" height="35" fill="#e8e8e8" />
        <ellipse cx="40" cy="112" rx="20" ry="5" fill="#d0d0d0" />
        {/* Wider, rounder bowl */}
        <path d="M10 15 Q5 50 25 70 Q35 78 40 78 Q45 78 55 70 Q75 50 70 15 Z" 
              fill="rgba(200,200,220,0.3)" stroke="#ccc" strokeWidth="1"/>
        <path d="M18 40 Q15 55 30 68 Q38 73 40 73 Q42 73 50 68 Q65 55 62 40 Z" 
              fill={color} opacity="0.8"/>
        <ellipse cx="28" cy="50" rx="6" ry="10" fill="rgba(255,255,255,0.3)" />
      </svg>
    ),
    'rose-spicy': (
      <svg viewBox="0 0 80 120" width={width} height={height}>
        <rect x="37" y="72" width="6" height="38" fill="#e8e8e8" />
        <ellipse cx="40" cy="112" rx="18" ry="5" fill="#d0d0d0" />
        {/* Flared rim */}
        <path d="M12 8 Q15 45 25 65 Q32 72 40 72 Q48 72 55 65 Q65 45 68 8 Z" 
              fill="rgba(200,200,220,0.3)" stroke="#ccc" strokeWidth="1"/>
        <path d="M22 35 Q23 50 30 62 Q36 68 40 68 Q44 68 50 62 Q57 50 58 35 Z" 
              fill={color} opacity="0.7"/>
        <ellipse cx="30" cy="45" rx="5" ry="8" fill="rgba(255,255,255,0.4)" />
      </svg>
    ),
    'sparkling': (
      <svg viewBox="0 0 80 120" width={width} height={height}>
        <rect x="38" y="70" width="4" height="40" fill="#e8e8e8" />
        <ellipse cx="40" cy="112" rx="15" ry="4" fill="#d0d0d0" />
        {/* Tall narrow flute */}
        <path d="M30 5 Q28 40 32 60 Q36 70 40 70 Q44 70 48 60 Q52 40 50 5 Z" 
              fill="rgba(200,200,220,0.3)" stroke="#ccc" strokeWidth="1"/>
        <path d="M33 25 Q32 45 35 58 Q38 65 40 65 Q42 65 45 58 Q48 45 47 25 Z" 
              fill={color} opacity="0.6"/>
        {/* Bubbles */}
        <circle cx="38" cy="55" r="1.5" fill="rgba(255,255,255,0.8)" />
        <circle cx="42" cy="48" r="1" fill="rgba(255,255,255,0.8)" />
        <circle cx="40" cy="40" r="1.5" fill="rgba(255,255,255,0.8)" />
        <circle cx="37" cy="33" r="1" fill="rgba(255,255,255,0.8)" />
        <ellipse cx="36" cy="35" rx="3" ry="6" fill="rgba(255,255,255,0.3)" />
      </svg>
    ),
    'white': (
      <svg viewBox="0 0 80 120" width={width} height={height}>
        <rect x="37" y="72" width="6" height="38" fill="#e8e8e8" />
        <ellipse cx="40" cy="112" rx="18" ry="5" fill="#d0d0d0" />
        {/* U-shaped medium bowl */}
        <path d="M20 8 Q18 35 25 55 Q32 72 40 72 Q48 72 55 55 Q62 35 60 8 Z" 
              fill="rgba(200,200,220,0.3)" stroke="#ccc" strokeWidth="1"/>
        <path d="M26 30 Q25 45 32 55 Q37 62 40 62 Q43 62 48 55 Q55 45 54 30 Z" 
              fill={color} opacity="0.7"/>
        <ellipse cx="32" cy="40" rx="4" ry="7" fill="rgba(255,255,255,0.4)" />
      </svg>
    ),
    'fortified': (
      <svg viewBox="0 0 80 120" width={width} height={height}>
        <rect x="38" y="68" width="4" height="42" fill="#e8e8e8" />
        <ellipse cx="40" cy="112" rx="14" ry="4" fill="#d0d0d0" />
        {/* Small, narrow Port glass */}
        <path d="M28 15 Q26 40 32 58 Q36 68 40 68 Q44 68 48 58 Q54 40 52 15 Z" 
              fill="rgba(200,200,220,0.3)" stroke="#ccc" strokeWidth="1"/>
        <path d="M32 35 Q31 48 36 56 Q39 60 40 60 Q41 60 44 56 Q49 48 48 35 Z" 
              fill={color} opacity="0.9"/>
        <ellipse cx="35" cy="42" rx="3" ry="5" fill="rgba(255,255,255,0.3)" />
      </svg>
    ),
  };

  return (
    <div className="glass-illustration">
      {glassShapes[type]}
    </div>
  );
};

export default WineGlassesPage;
