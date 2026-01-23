import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { wines } from '../data/wines';

const ValueWines = () => {
  // Calculate value score: rating / price * 100
  const topValueWines = useMemo(() => {
    return wines
      .filter(w => w.rating && w.price)
      .map(w => ({
        ...w,
        valueScore: ((w.rating / w.price) * 100).toFixed(1)
      }))
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 8);
  }, []);

  // Get top value by type
  const topByType = useMemo(() => {
    const types = ['red', 'white', 'sparkling', 'rose'];
    return types.map(type => {
      const typeWines = wines
        .filter(w => w.type === type && w.rating && w.price)
        .map(w => ({
          ...w,
          valueScore: ((w.rating / w.price) * 100).toFixed(1)
        }))
        .sort((a, b) => b.valueScore - a.valueScore);
      
      return {
        type,
        wine: typeWines[0]
      };
    }).filter(t => t.wine);
  }, []);

  const typeEmoji = {
    red: '🍷',
    white: '🥂',
    sparkling: '🍾',
    rose: '🌸'
  };

  return (
    <section className="value-wines-section">
      <div className="value-container">
        <div className="value-header">
          <span className="value-badge">🏆 BEST VALUE</span>
          <h2>Maximum Quality, Minimum Spend</h2>
          <p>Our highest-rated wines relative to their price</p>
        </div>

        <div className="value-methodology">
          <div className="methodology-card">
            <span className="methodology-icon">📊</span>
            <h4>How We Calculate Value</h4>
            <p>
              Value Score = (Rating ÷ Price) × 100. 
              Higher scores mean better quality for your dollar.
            </p>
          </div>
        </div>

        <div className="value-champions">
          <h3>🏅 Value Champions by Type</h3>
          <div className="champions-grid">
            {topByType.map(({ type, wine }) => (
              <Link to={`/wine/${wine.slug}`} key={type} className="champion-card">
                <div className="champion-type">
                  <span className="type-emoji">{typeEmoji[type]}</span>
                  <span className="type-name">Best Value {type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
                <h4 className="champion-name">{wine.name}</h4>
                <div className="champion-stats">
                  <span className="champion-price">${wine.price}</span>
                  <span className="champion-rating">★ {wine.rating}</span>
                  <span className="champion-score">Value: {wine.valueScore}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="value-leaderboard">
          <h3>📈 Top 8 Value Wines Overall</h3>
          <div className="leaderboard-grid">
            {topValueWines.map((wine, idx) => (
              <Link to={`/wine/${wine.slug}`} key={wine.id} className="leaderboard-card">
                <span className="rank-badge">#{idx + 1}</span>
                <div className="leaderboard-info">
                  <div className={`wine-type-indicator ${wine.type}`}></div>
                  <div className="wine-details">
                    <h4>{wine.name}</h4>
                    <p>{wine.region.split(',')[0]}</p>
                  </div>
                </div>
                <div className="leaderboard-stats">
                  <span className="stat-price">${wine.price}</span>
                  <span className="stat-rating">★ {wine.rating}</span>
                  <span className="stat-value">Value: {wine.valueScore}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="value-tips">
          <h3>💡 Smart Shopping Tips</h3>
          <div className="tips-row">
            <div className="value-tip">
              <span className="tip-icon">🌍</span>
              <p><strong>Go Off the Beaten Path:</strong> Portugal, Spain, and South America offer incredible value.</p>
            </div>
            <div className="value-tip">
              <span className="tip-icon">📅</span>
              <p><strong>Consider Younger Vintages:</strong> Most wines under $40 are made to drink now.</p>
            </div>
            <div className="value-tip">
              <span className="tip-icon">🏪</span>
              <p><strong>Shop Sales:</strong> Quality wines often go on 20-30% discount seasonally.</p>
            </div>
          </div>
        </div>

        <div className="value-cta">
          <Link to="/search" className="btn btn-value">
            Find More Great Values →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ValueWines;
