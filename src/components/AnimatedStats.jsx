import { useState, useEffect, useRef } from 'react';
import { wines } from '../data/wines';

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    wines: 0,
    regions: 0,
    avgPrice: 0,
    avgRating: 0
  });
  const sectionRef = useRef(null);

  // Calculate actual stats
  const stats = {
    wines: wines.length,
    regions: new Set(wines.map(w => w.region.split(',')[0].trim())).size,
    avgPrice: Math.round(wines.reduce((sum, w) => sum + w.price, 0) / wines.length),
    avgRating: (wines.reduce((sum, w) => sum + (w.rating || 4), 0) / wines.length).toFixed(1)
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        wines: Math.round(stats.wines * easeOut),
        regions: Math.round(stats.regions * easeOut),
        avgPrice: Math.round(stats.avgPrice * easeOut),
        avgRating: (stats.avgRating * easeOut).toFixed(1)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          wines: stats.wines,
          regions: stats.regions,
          avgPrice: stats.avgPrice,
          avgRating: stats.avgRating
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, stats.wines, stats.regions, stats.avgPrice, stats.avgRating]);

  const statItems = [
    {
      icon: '🍷',
      value: counts.wines,
      suffix: '+',
      label: 'Curated Wines',
      color: 'red',
      description: 'Hand-selected bottles under $40'
    },
    {
      icon: '🌍',
      value: counts.regions,
      suffix: '+',
      label: 'Wine Regions',
      color: 'blue',
      description: 'From around the world'
    },
    {
      icon: '💰',
      value: counts.avgPrice,
      prefix: '$',
      label: 'Average Price',
      color: 'green',
      description: 'Quality without breaking the bank'
    },
    {
      icon: '⭐',
      value: counts.avgRating,
      suffix: '/5',
      label: 'Average Rating',
      color: 'gold',
      description: 'Highly rated selections'
    }
  ];

  return (
    <section className="animated-stats-section" ref={sectionRef}>
      <div className="stats-background">
        <div className="stats-gradient"></div>
        <div className="stats-pattern"></div>
        <div className="floating-stat-element el-1">🍇</div>
        <div className="floating-stat-element el-2">🍾</div>
        <div className="floating-stat-element el-3">🥂</div>
      </div>

      <div className="stats-container">
        <div className="stats-header">
          <span className="stats-badge">📊 BY THE NUMBERS</span>
          <h2 className="stats-title">
            Our Collection at a Glance
          </h2>
          <p className="stats-subtitle">
            Every bottle carefully selected to bring you exceptional value
          </p>
        </div>

        <div className={`stats-grid ${isVisible ? 'animate' : ''}`}>
          {statItems.map((stat, index) => (
            <div 
              key={stat.label}
              className={`stat-card stat-${stat.color}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="stat-icon-wrapper">
                <div className="stat-icon-bg"></div>
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <div className="stat-content">
                <div className="stat-value">
                  {stat.prefix && <span className="stat-prefix">{stat.prefix}</span>}
                  <span className="stat-number">{stat.value}</span>
                  {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
                </div>
                <h3 className="stat-label">{stat.label}</h3>
                <p className="stat-description">{stat.description}</p>
              </div>
              <div className="stat-glow"></div>
            </div>
          ))}
        </div>

        <div className="stats-cta">
          <p className="stats-cta-text">Ready to explore?</p>
          <a href="#categories" className="stats-cta-btn">
            <span>Start Browsing</span>
            <span className="cta-icon">🔍</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
