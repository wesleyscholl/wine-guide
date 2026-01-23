import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { wines } from '../data/wines';

const seasons = [
  {
    id: 'spring',
    name: 'Spring',
    emoji: '🌸',
    months: [2, 3, 4],
    description: 'Fresh and floral wines for awakening palates',
    keywords: ['crisp', 'fresh', 'light', 'floral', 'citrus', 'green apple'],
    types: ['white', 'rose', 'sparkling'],
    color: '#C8E6C9',
    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #F3E5F5 100%)'
  },
  {
    id: 'summer',
    name: 'Summer',
    emoji: '☀️',
    months: [5, 6, 7],
    description: 'Refreshing sippers for warm days and outdoor gatherings',
    keywords: ['refreshing', 'tropical', 'light', 'crisp', 'citrus'],
    types: ['white', 'rose', 'sparkling'],
    color: '#FFE082',
    bgGradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)'
  },
  {
    id: 'fall',
    name: 'Fall',
    emoji: '🍂',
    months: [8, 9, 10],
    description: 'Medium-bodied wines for harvest season and cozy dinners',
    keywords: ['earthy', 'spice', 'apple', 'mushroom', 'leather'],
    types: ['red', 'white'],
    color: '#FFAB91',
    bgGradient: 'linear-gradient(135deg, #FBE9E7 0%, #FFCCBC 100%)'
  },
  {
    id: 'winter',
    name: 'Winter',
    emoji: '❄️',
    months: [11, 0, 1],
    description: 'Bold and warming wines for fireside evenings',
    keywords: ['bold', 'rich', 'spice', 'dark fruit', 'chocolate', 'warming'],
    types: ['red', 'sparkling'],
    color: '#B39DDB',
    bgGradient: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)'
  }
];

const SeasonalPicks = () => {
  const currentMonth = new Date().getMonth();
  const currentSeasonData = seasons.find(s => s.months.includes(currentMonth)) || seasons[0];
  const [selectedSeason, setSelectedSeason] = useState(currentSeasonData);

  const seasonalWines = useMemo(() => {
    return wines.filter(wine => {
      // Match by type
      const typeMatch = selectedSeason.types.includes(wine.type);
      
      // Match by keywords in description or tasting notes
      const textToSearch = `${wine.description || ''} ${wine.tastingNotes?.aroma || ''} ${wine.tastingNotes?.palate || ''}`.toLowerCase();
      const keywordMatch = selectedSeason.keywords.some(kw => textToSearch.includes(kw.toLowerCase()));
      
      return typeMatch || keywordMatch;
    }).slice(0, 6);
  }, [selectedSeason]);

  const pairingIdeas = {
    spring: [
      { dish: 'Grilled Asparagus', wine: 'Sauvignon Blanc', emoji: '🥬' },
      { dish: 'Spring Lamb', wine: 'Rosé', emoji: '🐑' },
      { dish: 'Fresh Oysters', wine: 'Champagne', emoji: '🦪' }
    ],
    summer: [
      { dish: 'Grilled Seafood', wine: 'Albariño', emoji: '🦐' },
      { dish: 'Summer Salads', wine: 'Vinho Verde', emoji: '🥗' },
      { dish: 'BBQ Chicken', wine: 'Rosé', emoji: '🍗' }
    ],
    fall: [
      { dish: 'Roast Turkey', wine: 'Pinot Noir', emoji: '🦃' },
      { dish: 'Mushroom Risotto', wine: 'Chardonnay', emoji: '🍄' },
      { dish: 'Pumpkin Soup', wine: 'Viognier', emoji: '🎃' }
    ],
    winter: [
      { dish: 'Beef Stew', wine: 'Cabernet Sauvignon', emoji: '🍖' },
      { dish: 'Roast Duck', wine: 'Côtes du Rhône', emoji: '🦆' },
      { dish: 'Chocolate Desserts', wine: 'Port', emoji: '🍫' }
    ]
  };

  return (
    <section className="seasonal-picks-section" style={{ background: selectedSeason.bgGradient }}>
      <div className="seasonal-container">
        <div className="seasonal-header">
          <span className="seasonal-badge">🗓️ SEASONAL SELECTIONS</span>
          <h2>What to Drink Right Now</h2>
          <p>Perfectly matched wines for the current season</p>
        </div>

        <div className="season-selector">
          {seasons.map(season => (
            <button
              key={season.id}
              className={`season-btn ${selectedSeason.id === season.id ? 'active' : ''}`}
              onClick={() => setSelectedSeason(season)}
              style={{ 
                '--season-color': season.color,
                borderColor: selectedSeason.id === season.id ? season.color : 'transparent'
              }}
            >
              <span className="season-emoji">{season.emoji}</span>
              <span className="season-name">{season.name}</span>
            </button>
          ))}
        </div>

        <div className="seasonal-content">
          <div className="seasonal-description">
            <h3>{selectedSeason.emoji} {selectedSeason.name} Wines</h3>
            <p>{selectedSeason.description}</p>
          </div>

          <div className="seasonal-wines-grid">
            {seasonalWines.map(wine => (
              <Link to={`/wine/${wine.slug}`} key={wine.id} className="seasonal-wine-card">
                <div className={`wine-type-badge ${wine.type}`}>
                  {wine.type}
                </div>
                <h4>{wine.name}</h4>
                <p className="wine-grape">{wine.grape?.split(',')[0]}</p>
                <span className="wine-price">${wine.price}</span>
              </Link>
            ))}
          </div>

          <div className="seasonal-pairings">
            <h4>Perfect {selectedSeason.name} Pairings</h4>
            <div className="pairings-list">
              {pairingIdeas[selectedSeason.id].map((pairing, idx) => (
                <div key={idx} className="pairing-item">
                  <span className="pairing-emoji">{pairing.emoji}</span>
                  <div className="pairing-text">
                    <span className="pairing-dish">{pairing.dish}</span>
                    <span className="pairing-wine">→ {pairing.wine}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="seasonal-cta">
          <Link to="/search" className="btn btn-seasonal">
            Explore All Seasonal Picks →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeasonalPicks;
