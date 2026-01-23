import { useState } from 'react';
import { Link } from 'react-router-dom';
import { wines } from '../data/wines';

const budgetTiers = [
  {
    id: 'under15',
    name: 'Under $15',
    emoji: '💵',
    range: [0, 15],
    tagline: 'Everyday Essentials',
    description: 'Reliable daily drinkers that won\'t break the bank',
    tips: [
      'Look for Spanish Garnacha and Portuguese reds',
      'South American Malbec offers incredible value',
      'Don\'t overlook boxed wines from quality producers'
    ]
  },
  {
    id: '15to25',
    name: '$15 - $25',
    emoji: '🍷',
    range: [15, 25],
    tagline: 'Sweet Spot Sippers',
    description: 'The quality-to-price sweet spot for most occasions',
    tips: [
      'This is where real quality begins',
      'Great for dinner parties without overspending',
      'Many award-winning wines live here'
    ]
  },
  {
    id: '25to35',
    name: '$25 - $35',
    emoji: '⭐',
    range: [25, 35],
    tagline: 'Premium Quality',
    description: 'Serious wines for discerning palates',
    tips: [
      'Complex wines with aging potential',
      'Perfect for special occasions',
      'Often competes with $50+ wines'
    ]
  },
  {
    id: '35to40',
    name: '$35 - $40',
    emoji: '💎',
    range: [35, 40],
    tagline: 'Top of Our Range',
    description: 'The best we recommend—still accessible',
    tips: [
      'World-class quality at accessible prices',
      'Cellar-worthy selections',
      'Gift-worthy bottles'
    ]
  }
];

const BudgetGuide = () => {
  const [selectedTier, setSelectedTier] = useState(budgetTiers[1]);

  const tierWines = wines.filter(wine => 
    wine.price >= selectedTier.range[0] && wine.price < selectedTier.range[1]
  );

  const getWinesByType = (type) => tierWines.filter(w => w.type === type).slice(0, 2);

  const redWines = getWinesByType('red');
  const whiteWines = getWinesByType('white');
  const otherWines = tierWines.filter(w => !['red', 'white'].includes(w.type)).slice(0, 2);

  const stats = {
    total: tierWines.length,
    avgPrice: tierWines.length ? (tierWines.reduce((acc, w) => acc + w.price, 0) / tierWines.length).toFixed(0) : 0,
    regions: [...new Set(tierWines.map(w => w.region.split(',')[0].trim()))].length
  };

  return (
    <section className="budget-guide-section">
      <div className="budget-container">
        <div className="budget-header">
          <span className="budget-badge">💰 BUDGET GUIDE</span>
          <h2>Great Wine at Every Price Point</h2>
          <p>Find the perfect bottle for your budget</p>
        </div>

        <div className="tier-selector">
          {budgetTiers.map(tier => (
            <button
              key={tier.id}
              className={`tier-btn ${selectedTier.id === tier.id ? 'active' : ''}`}
              onClick={() => setSelectedTier(tier)}
            >
              <span className="tier-emoji">{tier.emoji}</span>
              <span className="tier-name">{tier.name}</span>
            </button>
          ))}
        </div>

        <div className="tier-content">
          <div className="tier-header-info">
            <h3>{selectedTier.emoji} {selectedTier.tagline}</h3>
            <p>{selectedTier.description}</p>
          </div>

          <div className="tier-stats">
            <div className="stat-box">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Wines</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">${stats.avgPrice}</span>
              <span className="stat-label">Avg Price</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{stats.regions}</span>
              <span className="stat-label">Regions</span>
            </div>
          </div>

          <div className="tier-wines-grid">
            <div className="wine-category">
              <h4>🍷 Top Reds</h4>
              <div className="category-wines">
                {redWines.map(wine => (
                  <Link to={`/wine/${wine.slug}`} key={wine.id} className="tier-wine-card">
                    <span className="tier-wine-name">{wine.name}</span>
                    <span className="tier-wine-price">${wine.price}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="wine-category">
              <h4>🥂 Top Whites</h4>
              <div className="category-wines">
                {whiteWines.map(wine => (
                  <Link to={`/wine/${wine.slug}`} key={wine.id} className="tier-wine-card">
                    <span className="tier-wine-name">{wine.name}</span>
                    <span className="tier-wine-price">${wine.price}</span>
                  </Link>
                ))}
              </div>
            </div>

            {otherWines.length > 0 && (
              <div className="wine-category">
                <h4>🌟 Other Picks</h4>
                <div className="category-wines">
                  {otherWines.map(wine => (
                    <Link to={`/wine/${wine.slug}`} key={wine.id} className="tier-wine-card">
                      <span className="tier-wine-name">{wine.name}</span>
                      <span className="tier-wine-price">${wine.price}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="tier-tips">
            <h4>💡 Pro Tips for {selectedTier.name}</h4>
            <ul>
              {selectedTier.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="budget-cta">
          <Link to="/search" className="btn btn-budget">
            Browse All {selectedTier.name} Wines →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BudgetGuide;
