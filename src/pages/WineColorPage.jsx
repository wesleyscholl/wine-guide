import React, { useState } from 'react';
import './WineColorPage.css';

const WineColorPage = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Wine colors organized by type and intensity
  const wineColors = {
    white: [
      // Straw colors
      { name: 'Pale Straw', hex: '#F5F5DC', intensity: 'pale', hue: 'straw', wines: ['Pinot Grigio', 'Muscadet', 'Vinho Verde'], meaning: 'Very young, light white wine with minimal skin contact', age: 'Under 1 year' },
      { name: 'Medium Straw', hex: '#EEE8AA', intensity: 'medium', hue: 'straw', wines: ['Young Riesling', 'Torrontés', 'Albariño'], meaning: 'Young white wine, typically unoaked', age: '1-2 years' },
      { name: 'Deep Straw', hex: '#DAA520', intensity: 'deep', hue: 'straw', wines: ['Albariño', 'Verdelho', 'Muscadet'], meaning: 'White wine with some age or riper grapes', age: '2-3 years' },
      // Yellow colors
      { name: 'Pale Yellow', hex: '#FFFACD', intensity: 'pale', hue: 'yellow', wines: ['Grüner Veltliner', 'Young Chardonnay'], meaning: 'Young, fresh white wine', age: 'Under 1 year' },
      { name: 'Medium Yellow', hex: '#F0E68C', intensity: 'medium', hue: 'yellow', wines: ['Sauvignon Blanc', 'Sémillon', 'Trebbiano'], meaning: 'Classic white wine color, some complexity', age: '1-3 years' },
      { name: 'Deep Yellow', hex: '#FFD700', intensity: 'deep', hue: 'yellow', wines: ['Sauternes', 'Aged Riesling'], meaning: 'Richer white, possibly aged or sweet', age: '3-5 years' },
      // Gold colors
      { name: 'Pale Gold', hex: '#FFE4B5', intensity: 'pale', hue: 'gold', wines: ['Chenin Blanc', 'Pinot Gris'], meaning: 'White wine with some oak or lees aging', age: '1-2 years' },
      { name: 'Medium Gold', hex: '#DAA520', intensity: 'medium', hue: 'gold', wines: ['Oaked Chardonnay', 'Viognier'], meaning: 'Oak-aged white or naturally rich variety', age: '2-4 years' },
      { name: 'Deep Gold', hex: '#B8860B', intensity: 'deep', hue: 'gold', wines: ['Aged Chardonnay', 'White Rioja'], meaning: 'Extended oak aging or older wine', age: '4+ years' },
      // Brown colors (oxidative whites)
      { name: 'Pale Brown', hex: '#D2B48C', intensity: 'pale', hue: 'brown', wines: ['Aged White Burgundy', 'Sherry (Fino)'], meaning: 'Aged white showing oxidative notes', age: '5-10 years' },
      { name: 'Medium Brown', hex: '#BC8F8F', intensity: 'medium', hue: 'brown', wines: ['Oloroso Sherry', 'White Rioja Reserva'], meaning: 'Significantly aged or intentionally oxidized', age: '10-20 years' },
      { name: 'Deep Brown', hex: '#8B7355', intensity: 'deep', hue: 'brown', wines: ['Madeira', 'Vin Jaune'], meaning: 'Highly oxidized style, intentional winemaking', age: '20+ years' },
    ],
    rose: [
      // Salmon colors
      { name: 'Pale Salmon', hex: '#FFA07A', intensity: 'pale', hue: 'salmon', wines: ['Provence Rosé', 'White Zinfandel'], meaning: 'Very light rosé, minimal skin contact', age: 'Current vintage' },
      { name: 'Medium Salmon', hex: '#FA8072', intensity: 'medium', hue: 'salmon', wines: ['Sancerre Rosé', 'Bandol Rosé'], meaning: 'Classic Provence-style rosé', age: 'Current vintage' },
      { name: 'Deep Salmon', hex: '#E9967A', intensity: 'deep', hue: 'salmon', wines: ['Syrah Rosé', 'Tavel'], meaning: 'Richer rosé with more extraction', age: 'Current vintage' },
      // Pink colors
      { name: 'Pale Pink', hex: '#FFB6C1', intensity: 'pale', hue: 'pink', wines: ['Moscato Rosa', 'Blush wines'], meaning: 'Very delicate rosé, often off-dry', age: 'Current vintage' },
      { name: 'Medium Pink', hex: '#FF69B4', intensity: 'medium', hue: 'pink', wines: ['Grenache Rosé', 'Sangiovese Rosé'], meaning: 'Vibrant rosé with berry character', age: 'Current vintage' },
      { name: 'Deep Pink', hex: '#DB7093', intensity: 'deep', hue: 'pink', wines: ['Tavel', 'Cerasuolo'], meaning: 'Full-bodied rosé, almost light red', age: 'Current vintage' },
      // Copper colors
      { name: 'Pale Copper', hex: '#FFDAB9', intensity: 'pale', hue: 'copper', wines: ['Pinot Noir Rosé', 'Provence Rosé'], meaning: 'Rosé with slight orange/copper hue', age: 'Current vintage' },
      { name: 'Medium Copper', hex: '#CD853F', intensity: 'medium', hue: 'copper', wines: ['Orange Wine (light)', 'Ramato'], meaning: 'Skin-contact white or darker rosé', age: 'Varies' },
      { name: 'Deep Copper', hex: '#B87333', intensity: 'deep', hue: 'copper', wines: ['Orange Wine', 'Amber Wine'], meaning: 'Extended skin-contact white wine', age: 'Varies' },
    ],
    red: [
      // Ruby colors
      { name: 'Pale Ruby', hex: '#E0115F', intensity: 'pale', hue: 'ruby', wines: ['Pinot Noir', 'Gamay'], meaning: 'Light-bodied red, thin-skinned grapes', age: '1-3 years' },
      { name: 'Medium Ruby', hex: '#9B111E', intensity: 'medium', hue: 'ruby', wines: ['Tempranillo', 'Côtes du Rhône', 'Merlot'], meaning: 'Classic medium-bodied red wine', age: '2-5 years' },
      { name: 'Deep Ruby', hex: '#722F37', intensity: 'deep', hue: 'ruby', wines: ['Merlot', 'Cabernet Sauvignon', 'Syrah'], meaning: 'Full-bodied, concentrated red', age: '3-8 years' },
      // Purple colors
      { name: 'Pale Purple', hex: '#8B008B', intensity: 'pale', hue: 'purple', wines: ['Beaujolais Nouveau', 'Primitivo'], meaning: 'Very young red, carbonic maceration', age: 'Under 1 year' },
      { name: 'Medium Purple', hex: '#800080', intensity: 'medium', hue: 'purple', wines: ['Malbec', 'Syrah', 'Touriga Nacional'], meaning: 'Young, intensely colored red', age: '1-3 years' },
      { name: 'Deep Purple', hex: '#4B0082', intensity: 'deep', hue: 'purple', wines: ['Aglianico', 'Mourvèdre', 'Petite Sirah'], meaning: 'Thick-skinned, high-anthocyanin grapes', age: '2-5 years' },
      // Garnet colors
      { name: 'Pale Garnet', hex: '#733635', intensity: 'pale', hue: 'garnet', wines: ['Nebbiolo', 'Sangiovese'], meaning: 'Lighter red beginning to age', age: '5-10 years' },
      { name: 'Medium Garnet', hex: '#8B0000', intensity: 'medium', hue: 'garnet', wines: ['Aged Rioja', 'Aged Bordeaux'], meaning: 'Mature red wine, evolved color', age: '8-15 years' },
      { name: 'Deep Garnet', hex: '#660000', intensity: 'deep', hue: 'garnet', wines: ['Aged Amarone', 'Barolo'], meaning: 'Well-aged, concentrated red', age: '10-20 years' },
      // Tawny colors
      { name: 'Pale Tawny', hex: '#D2691E', intensity: 'pale', hue: 'tawny', wines: ['Tawny Port', 'Aged Nebbiolo'], meaning: 'Red wine showing oxidative aging', age: '10-20 years' },
      { name: 'Medium Tawny', hex: '#A0522D', intensity: 'medium', hue: 'tawny', wines: ['Aged Tawny Port', 'Bual Madeira'], meaning: 'Significantly aged fortified or red', age: '20-40 years' },
      { name: 'Deep Tawny', hex: '#8B4513', intensity: 'deep', hue: 'tawny', wines: ['Very Old Tawny Port', 'Aged Sercial'], meaning: 'Very old wine, brown rim visible', age: '40+ years' },
    ],
  };

  const colorTips = [
    { icon: '👁️', title: 'Visual Inspection', tip: 'Tilt your glass at 45° against a white background. Look at the core (center) and rim (edge) separately.' },
    { icon: '💡', title: 'Lighting Matters', tip: 'Use natural daylight or bright, diffused indoor lighting. Avoid colored lights that can alter perception.' },
    { icon: '🍷', title: 'Hue vs. Intensity', tip: 'Hue is the actual color (ruby, garnet). Intensity is how deep or pale that color appears.' },
    { icon: '⏰', title: 'Age Indicators', tip: 'Reds lose color with age (ruby → garnet → tawny). Whites gain color (straw → gold → brown).' },
    { icon: '🔬', title: 'The Rim Test', tip: 'The rim (meniscus) shows true age. A watery, brownish rim on reds indicates maturity.' },
    { icon: '🌈', title: 'What Color Tells You', tip: 'Color hints at grape variety, age, winemaking style, and potential faults before you even smell or taste.' },
  ];

  const allColors = [...wineColors.white, ...wineColors.rose, ...wineColors.red];
  
  const filteredColors = filterType === 'all' 
    ? allColors 
    : wineColors[filterType] || [];

  const getTypeForColor = (color) => {
    if (wineColors.white.includes(color)) return 'white';
    if (wineColors.rose.includes(color)) return 'rosé';
    return 'red';
  };

  return (
    <div className="wine-color-page">
      <div className="color-hero">
        <h1>🎨 Wine Color Guide</h1>
        <p>Learn to read a wine before you even taste it</p>
      </div>

      {/* Tips Section */}
      <section className="color-tips-section">
        <h2>👁️ Visual Analysis Tips</h2>
        <div className="tips-grid">
          {colorTips.map((tip, index) => (
            <div key={index} className="tip-card">
              <span className="tip-icon">{tip.icon}</span>
              <h3>{tip.title}</h3>
              <p>{tip.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="color-chart-section">
        <h2>🍷 Wine Color Chart</h2>
        <p className="section-subtitle">Click any color to learn more about what it indicates</p>
        
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Colors
          </button>
          <button 
            className={`filter-btn white ${filterType === 'white' ? 'active' : ''}`}
            onClick={() => setFilterType('white')}
          >
            🥂 White
          </button>
          <button 
            className={`filter-btn rose ${filterType === 'rose' ? 'active' : ''}`}
            onClick={() => setFilterType('rose')}
          >
            🌸 Rosé
          </button>
          <button 
            className={`filter-btn red ${filterType === 'red' ? 'active' : ''}`}
            onClick={() => setFilterType('red')}
          >
            🍷 Red
          </button>
        </div>

        {/* Color Grid */}
        <div className="color-grid">
          {filteredColors.map((color, index) => (
            <div 
              key={index}
              className={`color-card ${selectedColor === color ? 'selected' : ''}`}
              onClick={() => setSelectedColor(selectedColor === color ? null : color)}
            >
              <div className="wine-glass-container">
                <svg viewBox="0 0 80 120" className="wine-glass-svg">
                  {/* Glass bowl */}
                  <ellipse cx="40" cy="45" rx="30" ry="35" fill="none" stroke="#ddd" strokeWidth="1.5" />
                  {/* Wine fill */}
                  <ellipse cx="40" cy="50" rx="26" ry="28" fill={color.hex} opacity="0.9" />
                  {/* Wine surface highlight */}
                  <ellipse cx="40" cy="35" rx="20" ry="8" fill="rgba(255,255,255,0.3)" />
                  {/* Stem */}
                  <line x1="40" y1="80" x2="40" y2="105" stroke="#ddd" strokeWidth="2" />
                  {/* Base */}
                  <ellipse cx="40" cy="108" rx="18" ry="5" fill="none" stroke="#ddd" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="color-info">
                <h4>{color.name}</h4>
                <span className="color-hue">{color.hue}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Color Detail */}
        {selectedColor && (
          <div className="color-detail-panel">
            <div className="detail-header">
              <div 
                className="color-swatch-large" 
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div className="detail-title">
                <h3>{selectedColor.name}</h3>
                <span className="detail-type">{getTypeForColor(selectedColor)} wine • {selectedColor.hue} • {selectedColor.intensity}</span>
              </div>
              <button className="close-detail" onClick={() => setSelectedColor(null)}>×</button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <h4>📝 What It Means</h4>
                <p>{selectedColor.meaning}</p>
              </div>
              
              <div className="detail-section">
                <h4>⏰ Typical Age</h4>
                <p>{selectedColor.age}</p>
              </div>
              
              <div className="detail-section">
                <h4>🍇 Example Wines</h4>
                <div className="wine-tags">
                  {selectedColor.wines.map((wine, i) => (
                    <span key={i} className="wine-tag">{wine}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Color Evolution Section */}
      <section className="color-evolution-section">
        <h2>⏳ How Wine Color Evolves</h2>
        
        <div className="evolution-cards">
          <div className="evolution-card white-evolution">
            <h3>🥂 White Wine Aging</h3>
            <div className="evolution-spectrum">
              <div className="evolution-stage">
                <div className="evolution-color" style={{ backgroundColor: '#FFFACD' }} />
                <span>Young</span>
                <small>Pale straw/yellow</small>
              </div>
              <div className="evolution-arrow">→</div>
              <div className="evolution-stage">
                <div className="evolution-color" style={{ backgroundColor: '#DAA520' }} />
                <span>Mature</span>
                <small>Gold/amber</small>
              </div>
              <div className="evolution-arrow">→</div>
              <div className="evolution-stage">
                <div className="evolution-color" style={{ backgroundColor: '#8B7355' }} />
                <span>Old</span>
                <small>Brown/oxidized</small>
              </div>
            </div>
            <p>White wines <strong>gain</strong> color as they age due to oxidation and phenolic development.</p>
          </div>

          <div className="evolution-card red-evolution">
            <h3>🍷 Red Wine Aging</h3>
            <div className="evolution-spectrum">
              <div className="evolution-stage">
                <div className="evolution-color" style={{ backgroundColor: '#800080' }} />
                <span>Young</span>
                <small>Purple/ruby</small>
              </div>
              <div className="evolution-arrow">→</div>
              <div className="evolution-stage">
                <div className="evolution-color" style={{ backgroundColor: '#8B0000' }} />
                <span>Mature</span>
                <small>Garnet/brick</small>
              </div>
              <div className="evolution-arrow">→</div>
              <div className="evolution-stage">
                <div className="evolution-color" style={{ backgroundColor: '#8B4513' }} />
                <span>Old</span>
                <small>Tawny/brown</small>
              </div>
            </div>
            <p>Red wines <strong>lose</strong> color as anthocyanins polymerize and precipitate as sediment.</p>
          </div>
        </div>
      </section>

      {/* Color by Grape Section */}
      <section className="grape-color-section">
        <h2>🍇 Color by Grape Variety</h2>
        <p className="section-subtitle">Some grapes naturally produce lighter or deeper colors</p>
        
        <div className="grape-spectrum">
          <div className="spectrum-row">
            <h4>Lighter Reds</h4>
            <div className="grape-items">
              <div className="grape-item">
                <div className="grape-color" style={{ backgroundColor: '#E0115F' }} />
                <span>Pinot Noir</span>
              </div>
              <div className="grape-item">
                <div className="grape-color" style={{ backgroundColor: '#DC143C' }} />
                <span>Gamay</span>
              </div>
              <div className="grape-item">
                <div className="grape-color" style={{ backgroundColor: '#733635' }} />
                <span>Nebbiolo</span>
              </div>
              <div className="grape-item">
                <div className="grape-color" style={{ backgroundColor: '#A52A2A' }} />
                <span>Sangiovese</span>
              </div>
            </div>
          </div>
          
          <div className="spectrum-row">
            <h4>Deeper Reds</h4>
            <div className="grape-items">
              <div className="grape-item">
                <div className="grape-color" style={{ backgroundColor: '#722F37' }} />
                <span>Cabernet Sauvignon</span>
              </div>
              <div className="grape-item">
                <div className="grape-color" style={{ backgroundColor: '#4B0082' }} />
                <span>Malbec</span>
              </div>
              <div className="grape-item">
                <div className="grape-color" style={{ backgroundColor: '#2F0F3D' }} />
                <span>Petite Sirah</span>
              </div>
              <div className="grape-item">
                <div className="grape-color" style={{ backgroundColor: '#1C1C3C' }} />
                <span>Tannat</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WineColorPage;
