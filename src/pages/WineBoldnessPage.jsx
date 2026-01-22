import React from 'react';
import './WineBoldnessPage.css';

const WineBoldnessPage = () => {
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

  const ChartSection = ({ title, wines, isRed }) => (
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
              className="wine-box"
              style={{ backgroundColor: wine.color }}
              title={wine.name}
            >
              <span className="wine-name">{wine.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="wine-details">
        <h3>Varietals Explained</h3>
        <div className="details-grid">
          {wines.map((wine, index) => (
            <div key={index} className="detail-card">
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

  return (
    <div className="wine-boldness-page">
      <div className="page-header">
        <h1>Wine Boldness & Flavor Profile Guide</h1>
        <p>Explore the spectrum of red and white wines from light to bold</p>
      </div>

      <div className="charts-container">
        <ChartSection 
          title="Red Wine Boldness Spectrum" 
          wines={redWines}
          isRed={true}
        />
        <ChartSection 
          title="White Wine Boldness Spectrum" 
          wines={whiteWines}
          isRed={false}
        />
      </div>

      <div className="guide-section">
        <h2>Understanding Wine Boldness</h2>
        <div className="guide-content">
          <div className="guide-card">
            <h3>Light Wines</h3>
            <p>Delicate, refreshing, with subtle flavors. Best served chilled and paired with light dishes, seafood, or salads.</p>
          </div>
          <div className="guide-card">
            <h3>Medium Wines</h3>
            <p>Balanced body and flavor. Versatile with food pairings, suitable for appetizers, poultry, and lighter meat dishes.</p>
          </div>
          <div className="guide-card">
            <h3>Bold Wines</h3>
            <p>Full-bodied with complex flavors, tannins (in reds), or richness (in whites). Pair with hearty dishes, aged cheeses, and grilled meats.</p>
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
