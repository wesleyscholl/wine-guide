import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wines } from '../data/wines';

const WineOfTheDay = () => {
  const [todaysWine, setTodaysWine] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Use date as seed for consistent daily wine
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const seed = dateString.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const wineIndex = seed % wines.length;
    setTodaysWine(wines[wineIndex]);

    // Countdown to next day
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diff = tomorrow - now;
      
      setCountdown({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  if (!todaysWine) return null;

  return (
    <section className="wine-of-day-section">
      <div className="wotd-container">
        <div className="wotd-header">
          <div className="wotd-badge">
            <span className="wotd-badge-icon">🏆</span>
            <span className="wotd-badge-text">WINE OF THE DAY</span>
          </div>
          <h2 className="wotd-title">
            <span className="sparkle-left">✨</span>
            Today's Featured Selection
            <span className="sparkle-right">✨</span>
          </h2>
          <p className="wotd-subtitle">A new wine discovery every 24 hours</p>
        </div>

        <div className={`wotd-card ${isRevealed ? 'revealed' : ''}`}>
          {!isRevealed ? (
            <div className="wotd-mystery" onClick={handleReveal}>
              <div className="mystery-bottle">
                <div className="mystery-glow"></div>
                <span className="mystery-icon">🍷</span>
                <div className="mystery-sparkles">
                  <span className="sparkle s1">✦</span>
                  <span className="sparkle s2">✧</span>
                  <span className="sparkle s3">✦</span>
                  <span className="sparkle s4">✧</span>
                </div>
              </div>
              <div className="mystery-text">
                <h3>Click to Reveal</h3>
                <p>Discover today's handpicked wine</p>
              </div>
              <button className="reveal-btn">
                <span className="btn-text">Reveal Wine</span>
                <span className="btn-icon">🎁</span>
              </button>
            </div>
          ) : (
            <div className="wotd-content">
              <div className="wotd-wine-visual">
                <div className="wine-glow-ring"></div>
                <div className={`wine-bottle-display ${todaysWine.type}`}>
                  <span className="bottle-icon">🍾</span>
                </div>
                <div className="wine-type-badge" data-type={todaysWine.type}>
                  {todaysWine.type.toUpperCase()}
                </div>
              </div>
              
              <div className="wotd-wine-info">
                <h3 className="wotd-wine-name">{todaysWine.name}</h3>
                <p className="wotd-wine-region">
                  <span className="region-icon">📍</span>
                  {todaysWine.region}
                </p>
                
                <div className="wotd-highlights">
                  <div className="highlight-item">
                    <span className="highlight-label">Price</span>
                    <span className="highlight-value price">${todaysWine.price}</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-label">Rating</span>
                    <span className="highlight-value rating">⭐ {todaysWine.rating}</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-label">Grape</span>
                    <span className="highlight-value grape">{todaysWine.grape?.split(',')[0] || 'Blend'}</span>
                  </div>
                </div>

                <p className="wotd-description">{todaysWine.description}</p>

                <div className="wotd-tasting">
                  {todaysWine.tastingNotes && (
                    <div className="tasting-preview">
                      <span className="tasting-label">Aroma:</span>
                      <span className="tasting-text">{todaysWine.tastingNotes.aroma}</span>
                    </div>
                  )}
                </div>

                <Link to={`/wine/${todaysWine.slug}`} className="wotd-cta">
                  <span>View Full Details</span>
                  <span className="cta-arrow">→</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="wotd-countdown">
          <p className="countdown-label">Next wine in:</p>
          <div className="countdown-timer">
            <div className="countdown-unit">
              <span className="countdown-value">{String(countdown.hours).padStart(2, '0')}</span>
              <span className="countdown-name">Hours</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="countdown-name">Minutes</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</span>
              <span className="countdown-name">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineOfTheDay;
