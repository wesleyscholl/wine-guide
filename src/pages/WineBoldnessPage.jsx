import React, { useState } from 'react';
import './WineBoldnessPage.css';

const WineBoldnessPage = () => {
  const [hoveredRedWine, setHoveredRedWine] = useState(null);
  const [hoveredWhiteWine, setHoveredWhiteWine] = useState(null);
  const [hoveredRedSweetness, setHoveredRedSweetness] = useState(null);
  const [hoveredWhiteSweetness, setHoveredWhiteSweetness] = useState(null);

  const redWines = [
    { name: 'Gamay', boldness: 1, color: '#F4C2C2' },
    { name: 'Pinot Noir', boldness: 1.5, color: '#E9967A' },
    { name: 'Grenache/\nGarnacha', boldness: 2, color: '#CD5C5C' },
    { name: 'Cabernet Franc', boldness: 2.5, color: '#DC143C' },
    { name: 'Merlot', boldness: 3, color: '#B22222' },
    { name: 'Cabernet Sauvignon', boldness: 3.5, color: '#A52A2A' },
    { name: 'Syrah/Shiraz', boldness: 4, color: '#8B0000' },
    { name: 'Tannat', boldness: 4.5, color: '#661100' },
  ];

  const whiteWines = [
    { name: 'Riesling', boldness: 1, color: '#FFFACD' },
    { name: 'Pinot Grigio', boldness: 1.5, color: '#FAFAD2' },
    { name: 'Sauvignon Blanc', boldness: 2, color: '#FFE4B5' },
    { name: 'Chardonnay\n(Unoaked)', boldness: 2.5, color: '#FFD700' },
    { name: 'Viognier', boldness: 3, color: '#FFA500' },
    { name: 'Chardonnay\n(Oaked)', boldness: 3.5, color: '#FF8C00' },
    { name: 'Gewürztraminer', boldness: 4, color: '#FF6347' },
  ];

  // Sweetness data based on Wine Folly charts
  const redSweetness = [
    { name: 'Sangiovese', level: 'Bone Dry', sweetness: 0, color: '#8B0000', description: 'Bold, bitter finish with dried cherry and herbs' },
    { name: 'Tempranillo', level: 'Bone Dry', sweetness: 0.5, color: '#A52A2A', description: 'Savory with leather and tobacco notes' },
    { name: 'Cabernet Sauvignon', level: 'Dry', sweetness: 1, color: '#B22222', description: 'Dry with cassis, cedar, and firm tannins' },
    { name: 'Pinot Noir', level: 'Dry', sweetness: 1.5, color: '#CD5C5C', description: 'Dry with red fruit and earthy notes' },
    { name: 'Syrah', level: 'Dry', sweetness: 2, color: '#8B4513', description: 'Dry with dark fruit and pepper spice' },
    { name: 'Merlot', level: 'Dry', sweetness: 2.5, color: '#B22222', description: 'Soft and plummy, slightly riper fruit' },
    { name: 'Malbec', level: 'Medium-Dry', sweetness: 3, color: '#4B0082', description: 'Ripe fruit with velvety tannins' },
    { name: 'Garnacha', level: 'Medium-Dry', sweetness: 3.5, color: '#DC143C', description: 'Warm with ripe berry sweetness' },
    { name: 'Zinfandel', level: 'Medium', sweetness: 4, color: '#B22222', description: 'Jammy fruit, can have residual sugar' },
    { name: 'Lambrusco Dolce', level: 'Sweet', sweetness: 5, color: '#8B0000', description: 'Sparkling and fruity with noticeable sweetness' },
    { name: 'Port', level: 'Sweet', sweetness: 6, color: '#4B0000', description: 'Fortified, rich, and intensely sweet' },
    { name: 'Tawny Port', level: 'Very Sweet', sweetness: 7, color: '#8B4513', description: 'Nutty, caramel sweetness from barrel aging' },
  ];

  const whiteSweetness = [
    { name: 'Muscadet', level: 'Bone Dry', sweetness: 0, color: '#98FB98', description: 'Crisp, mineral, with lemon and saline notes' },
    { name: 'Sauvignon Blanc', level: 'Bone Dry', sweetness: 0.5, color: '#9ACD32', description: 'Zesty with grapefruit and herbs' },
    { name: 'Pinot Gris', level: 'Off-Dry', sweetness: 1.5, color: '#BDB76B', description: 'Honeycomb and lemon with subtle sweetness' },
    { name: 'Chardonnay', level: 'Dry', sweetness: 1, color: '#DAA520', description: 'Green apple to tropical, depending on style' },
    { name: 'Chenin Blanc', level: 'Off-Dry', sweetness: 2, color: '#FFD700', description: 'Versatile from dry to sweet with honey notes' },
    { name: 'Viognier', level: 'Off-Dry', sweetness: 2.5, color: '#FFA500', description: 'Aromatic with peach and floral richness' },
    { name: 'Torrontés', level: 'Off-Dry', sweetness: 3, color: '#FAFAD2', description: 'Floral and aromatic with tropical fruit' },
    { name: 'Gewürztraminer', level: 'Semi-Sweet', sweetness: 3.5, color: '#FFB6C1', description: 'Lychee and rose with noticeable sweetness' },
    { name: 'Riesling', level: 'Sweet', sweetness: 4.5, color: '#98FB98', description: 'Ranges widely; sweet styles have honey and petrol' },
    { name: 'Moscato', level: 'Sweet', sweetness: 5.5, color: '#FFFACD', description: 'Light, fizzy, with orange blossom and peach' },
    { name: 'White Port', level: 'Sweet', sweetness: 6, color: '#FFD700', description: 'Fortified with honey and citrus sweetness' },
    { name: 'Ice Wine', level: 'Very Sweet', sweetness: 7, color: '#FFA500', description: 'Intensely sweet with concentrated fruit' },
  ];

  const ChartSection = ({ title, wines, isRed, hoveredWine, setHoveredWine }) => (
    <div className="chart-section">
      <h2>{title}</h2>
      <div className="chart-description">
        {isRed 
          ? 'Red wines range from light and fruity to deep and structured, reflecting factors like grape variety, climate, and aging.'
          : 'White wines range from crisp and refreshing to full-bodied and rich, influenced by grape, winemaking style, and oak aging.'}
      </div>
      
      <div className="boldness-spectrum">
        <div className="spectrum-header">
          <span className="lighter">Lighter</span>
          <span className="bolder">Bolder</span>
        </div>
        
        <div className="wine-chart">
          {wines.map((wine, index) => (
            <div
              key={index}
              className={`wine-box ${hoveredWine === index ? 'highlighted' : ''} ${hoveredWine !== null && hoveredWine !== index ? 'dimmed' : ''}`}
              style={{ backgroundColor: wine.color }}
              title={wine.name}
              onMouseEnter={() => setHoveredWine(index)}
              onMouseLeave={() => setHoveredWine(null)}
            >
              <span className="wine-name">{wine.name}</span>
              {hoveredWine === index && (
                <div className="wine-box-pointer"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="wine-details">
        <h3>Varietals Explained</h3>
        <div className="details-grid">
          {wines.map((wine, index) => (
            <div 
              key={index} 
              className={`detail-card ${hoveredWine === index ? 'highlighted' : ''}`}
              onMouseEnter={() => setHoveredWine(index)}
              onMouseLeave={() => setHoveredWine(null)}
            >
              <div
                className="detail-color"
                style={{ backgroundColor: wine.color }}
              ></div>
              <h4>{wine.name}</h4>
              <p>
                {isRed
                  ? getRedDescription(wine.name)
                  : getWhiteDescription(wine.name)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SweetnessChart = ({ title, wines, isRed, hoveredWine, setHoveredWine }) => {
    const maxSweetness = 7;
    
    return (
      <div className="chart-section sweetness-section">
        <h2>{title}</h2>
        <div className="chart-description">
          {isRed 
            ? 'Red wine sweetness is determined by residual sugar left after fermentation. Most red wines are dry, but styles like Port and Lambrusco offer sweeter options.'
            : 'White wines span the full sweetness spectrum. The same grape (like Riesling) can produce bone-dry to dessert-sweet wines depending on winemaking choices.'}
        </div>
        
        <div className="sweetness-spectrum">
          <div className="spectrum-header">
            <span className="lighter">Bone Dry (0% RS)</span>
            <span className="bolder">Very Sweet (20%+ RS)</span>
          </div>
          
          <div className="sweetness-scale">
            <div className="scale-gradient" style={{ background: isRed 
              ? 'linear-gradient(to right, #f4a460, #dc143c, #8b0000, #4b0000)' 
              : 'linear-gradient(to right, #98fb98, #ffd700, #ffa500, #ff8c00)' 
            }}>
              {hoveredWine !== null && (
                <div 
                  className="scale-position-marker"
                  style={{ 
                    left: `${(wines[hoveredWine].sweetness / maxSweetness) * 100}%`,
                    backgroundColor: wines[hoveredWine].color,
                    borderColor: isRed ? '#fff' : '#333'
                  }}
                >
                  <div className="marker-label" style={{ color: isRed ? '#fff' : '#333' }}>
                    {wines[hoveredWine].name}
                  </div>
                </div>
              )}
            </div>
            <div className="scale-labels">
              <span>Dry</span>
              <span>Off-Dry</span>
              <span>Medium</span>
              <span>Sweet</span>
            </div>
          </div>

          <div className="sweetness-wines-grid">
            {wines.map((wine, index) => (
              <div 
                key={index} 
                className={`sweetness-wine-card ${hoveredWine === index ? 'highlighted' : ''} ${hoveredWine !== null && hoveredWine !== index ? 'dimmed' : ''}`}
                style={{ '--wine-color': wine.color }}
                onMouseEnter={() => setHoveredWine(index)}
                onMouseLeave={() => setHoveredWine(null)}
              >
                <div className="sweetness-indicator" style={{ backgroundColor: wine.color }}>
                  <span className="sweetness-level">{wine.level}</span>
                </div>
                <h4>{wine.name}</h4>
                <p>{wine.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="wine-boldness-page">
      <div className="page-header">
        <h1>🍷 Wine Body & Sweetness Guide</h1>
        <p>Master the spectrum of wine styles from light to bold, dry to sweet</p>
      </div>

      {/* Body / Boldness Section */}
          <div className="charts-container">
            <ChartSection 
              title="Red Wine Body Spectrum" 
              wines={redWines}
              isRed={true}
              hoveredWine={hoveredRedWine}
              setHoveredWine={setHoveredRedWine}
            />
            <ChartSection 
              title="White Wine Body Spectrum" 
              wines={whiteWines}
              isRed={false}
              hoveredWine={hoveredWhiteWine}
              setHoveredWine={setHoveredWhiteWine}
            />
          </div>

          <div className="guide-section">
            <h2>Understanding Wine Body</h2>
            <div className="guide-content">
              <div className="guide-card">
                <h3>🍃 Light-Bodied Wines</h3>
                <p>Delicate, refreshing, with subtle flavors. Best served chilled and paired with light dishes, seafood, or salads.</p>
                <div className="guide-examples">
                  <strong>Examples:</strong> Pinot Noir, Gamay, Riesling, Pinot Grigio
                </div>
                <div className="guide-tip">
                  <strong>Serving:</strong> Reds at 55-60°F, Whites at 45-50°F
                </div>
              </div>
              <div className="guide-card">
                <h3>⚖️ Medium-Bodied Wines</h3>
                <p>Balanced body and flavor. Versatile with food pairings, suitable for appetizers, poultry, and lighter meat dishes.</p>
                <div className="guide-examples">
                  <strong>Examples:</strong> Merlot, Grenache, Chardonnay, Sauvignon Blanc
                </div>
                <div className="guide-tip">
                  <strong>Serving:</strong> Reds at 60-65°F, Whites at 50-55°F
                </div>
              </div>
              <div className="guide-card">
                <h3>🔥 Full-Bodied Wines</h3>
                <p>Rich and complex with bold flavors, tannins (in reds), or richness (in whites). Pair with hearty dishes, aged cheeses, and grilled meats.</p>
                <div className="guide-examples">
                  <strong>Examples:</strong> Cabernet Sauvignon, Syrah, Oaked Chardonnay
                </div>
                <div className="guide-tip">
                  <strong>Serving:</strong> Reds at 62-68°F, Whites at 55-60°F
                </div>
              </div>
            </div>
          </div>

          <div className="factors-section">
            <h2>What Affects Wine Body?</h2>
            <div className="factors-grid">
              <div className="factor-card">
                <span className="factor-icon">🍇</span>
                <h4>Grape Variety</h4>
                <p>Thick-skinned grapes like Cabernet produce fuller wines. Thin-skinned grapes like Pinot Noir are lighter.</p>
              </div>
              <div className="factor-card">
                <span className="factor-icon">☀️</span>
                <h4>Climate</h4>
                <p>Warmer climates produce riper grapes with higher sugar, leading to higher alcohol and fuller body.</p>
              </div>
              <div className="factor-card">
                <span className="factor-icon">🪵</span>
                <h4>Oak Aging</h4>
                <p>Oak adds tannins, vanilla, and body. New oak has stronger impact than neutral or no oak.</p>
              </div>
              <div className="factor-card">
                <span className="factor-icon">🔬</span>
                <h4>Alcohol Level</h4>
                <p>Higher alcohol (14%+) creates a fuller mouthfeel. Lower alcohol wines (11-12%) feel lighter.</p>
              </div>
              <div className="factor-card">
                <span className="factor-icon">⏳</span>
                <h4>Skin Contact</h4>
                <p>Longer maceration extracts more color, tannin, and body from grape skins (mainly reds).</p>
              </div>
              <div className="factor-card">
                <span className="factor-icon">🧈</span>
                <h4>Malolactic Fermentation</h4>
                <p>Converts sharp malic acid to softer lactic acid, creating a creamier, rounder mouthfeel.</p>
              </div>
            </div>
          </div>

      {/* Sweetness / Dryness Section */}
          <div className="sweetness-intro">
            <div className="intro-card">
              <h3>📊 Understanding Residual Sugar (RS)</h3>
              <p>
                Sweetness in wine comes from residual sugar—grape sugar left after fermentation stops. 
                Measured in grams per liter (g/L), here's how to interpret it:
              </p>
              <div className="rs-scale">
                <div className="rs-level">
                  <span className="rs-label">Bone Dry</span>
                  <span className="rs-value">0-1 g/L</span>
                </div>
                <div className="rs-level">
                  <span className="rs-label">Dry</span>
                  <span className="rs-value">1-10 g/L</span>
                </div>
                <div className="rs-level">
                  <span className="rs-label">Off-Dry</span>
                  <span className="rs-value">10-35 g/L</span>
                </div>
                <div className="rs-level">
                  <span className="rs-label">Medium-Sweet</span>
                  <span className="rs-value">35-120 g/L</span>
                </div>
                <div className="rs-level">
                  <span className="rs-label">Sweet</span>
                  <span className="rs-value">120-220 g/L</span>
                </div>
                <div className="rs-level">
                  <span className="rs-label">Very Sweet</span>
                  <span className="rs-value">220+ g/L</span>
                </div>
              </div>
              <p className="rs-note">
                <strong>💡 Pro Tip:</strong> High acidity can balance sweetness, making wines taste drier than their RS suggests. 
                A Riesling with 30g/L sugar can taste quite dry due to its high acidity!
              </p>
            </div>
          </div>

          <div className="charts-container">
            <SweetnessChart 
              title="Red Wine Sweetness Spectrum" 
              wines={redSweetness}
              isRed={true}
              hoveredWine={hoveredRedSweetness}
              setHoveredWine={setHoveredRedSweetness}
            />
            <SweetnessChart 
              title="White Wine Sweetness Spectrum" 
              wines={whiteSweetness}
              isRed={false}
              hoveredWine={hoveredWhiteSweetness}
              setHoveredWine={setHoveredWhiteSweetness}
            />
          </div>

          <div className="guide-section">
            <h2>Sweetness Categories Explained</h2>
            <div className="guide-content sweetness-guide">
              <div className="guide-card">
                <h3>🏜️ Bone Dry to Dry</h3>
                <p>Little to no perceptible sweetness. Crisp, refreshing, food-friendly. Most table wines fall here.</p>
                <div className="guide-examples">
                  <strong>Reds:</strong> Sangiovese, Cabernet, Tempranillo<br/>
                  <strong>Whites:</strong> Muscadet, Chablis, Sauvignon Blanc
                </div>
              </div>
              <div className="guide-card">
                <h3>🍑 Off-Dry</h3>
                <p>Hint of sweetness that enhances fruit flavors. Great with spicy foods and Asian cuisine.</p>
                <div className="guide-examples">
                  <strong>Reds:</strong> Some Zinfandels, Grenache<br/>
                  <strong>Whites:</strong> German Kabinett, Chenin Blanc, Gewürztraminer
                </div>
              </div>
              <div className="guide-card">
                <h3>🍯 Sweet to Dessert</h3>
                <p>Noticeable sweetness, rich and luscious. Perfect for desserts or as dessert itself.</p>
                <div className="guide-examples">
                  <strong>Reds:</strong> Port, Lambrusco Dolce, Banyuls<br/>
                  <strong>Whites:</strong> Sauternes, Ice Wine, Moscato, Tokaji
                </div>
              </div>
            </div>
          </div>

          <div className="sweetness-tips-section">
            <h2>💡 Sweetness Pro Tips</h2>
            <div className="tips-grid">
              <div className="sweet-tip">
                <span className="tip-number">1</span>
                <div className="tip-content">
                  <h4>Reading Labels</h4>
                  <p>Look for terms like "Brut" (dry sparkling), "Sec/Secco" (dry), "Demi-Sec" (off-dry), or "Doux/Dolce" (sweet).</p>
                </div>
              </div>
              <div className="sweet-tip">
                <span className="tip-number">2</span>
                <div className="tip-content">
                  <h4>German Classifications</h4>
                  <p>Kabinett → Spätlese → Auslese → Beerenauslese → Trockenbeerenauslese (driest to sweetest by ripeness).</p>
                </div>
              </div>
              <div className="sweet-tip">
                <span className="tip-number">3</span>
                <div className="tip-content">
                  <h4>Pairing Sweet Wines</h4>
                  <p>Match sweetness levels—wine should be as sweet or sweeter than the food. Contrast with salty or spicy dishes.</p>
                </div>
              </div>
              <div className="sweet-tip">
                <span className="tip-number">4</span>
                <div className="tip-content">
                  <h4>Temperature Matters</h4>
                  <p>Serve sweet wines well-chilled (42-50°F). Cold temperatures balance sweetness and enhance refreshment.</p>
                </div>
              </div>
            </div>
          </div>

      <div className="page-footer">
        <div className="footer-tip">
          <span className="footer-icon">🎯</span>
          <div>
            <h4>Finding Your Style</h4>
            <p>
              The best way to understand body and sweetness is to taste! Try wines at different points on each spectrum 
              and note what you enjoy. There's no right or wrong—only personal preference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const getRedDescription = (name) => {
  const descriptions = {
    'Gamay': 'Light-bodied and pale ruby with fresh, juicy fruit. Very low tannins, high acidity, and fruit-forward style (like Beaujolais).',
    'Pinot Noir': 'Light to light-medium bodied with red cherry and strawberry flavors. Low to moderate tannins, more structure and complexity.',
    'Grenache/Garnacha': 'Medium-bodied with ripe berry flavors and warmth. Often blended, great value wines.',
    'Cabernet Franc': 'Medium-bodied with herbaceous and berry notes. Less tannin than Cabernet Sauvignon, earlier drinking.',
    'Merlot': 'Smooth and plummy, medium to full-bodied. Approachable with softer tannins than Cabernet Sauvignon.',
    'Cabernet Sauvignon': 'Full-bodied with black currant and cassis. High tannins, excellent aging potential.',
    'Syrah/Shiraz': 'Bold, full-bodied with dark fruit and peppery spice. Can be age-worthy with firm tannins.',
    'Tannat': 'Intensely structured with high tannins and dark fruit. Best with hearty foods, improves with age.',
  };
  return descriptions[name] || 'A distinctive red wine varietal with unique characteristics.';
};

const getWhiteDescription = (name) => {
  const descriptions = {
    'Riesling': 'Aromatic and crisp with citrus and floral notes. Can range from dry to sweet, versatile with food.',
    'Pinot Grigio': 'Light, refreshing with green apple and citrus. Perfect as an aperitif or with light seafood.',
    'Sauvignon Blanc': 'Vibrant and zesty with herbaceous and tropical notes. Excellent acidity, food-friendly.',
    'Chardonnay (Unoaked)': 'Fresh and mineral-driven. Highlights the pure fruit character without oak influence.',
    'Viognier': 'Aromatic and floral with stone fruit flavors. Medium-bodied, developing richness.',
    'Chardonnay (Oaked)': 'Rich and buttery with vanilla and toasted notes. Full-bodied, classic aging potential.',
    'Gewürztraminer': 'Aromatic with floral, spice, and tropical fruit notes. Bold and distinctive flavor profile.',
  };
  return descriptions[name] || 'A distinctive white wine varietal with unique characteristics.';
};

export default WineBoldnessPage;
