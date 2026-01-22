import { useState } from 'react';
import { Link } from 'react-router-dom';
import { wines } from '../data/wines';
import { useCellar } from '../contexts/CellarContext';

const MyCellar = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const { 
    favorites, 
    tasted, 
    wishlist, 
    getWineRating, 
    getWineNotes,
    getCellarStats,
    clearAllData
  } = useCellar();

  const stats = getCellarStats();

  const getWinesByIds = (ids) => {
    return wines.filter(wine => ids.includes(wine.id));
  };

  const favoriteWines = getWinesByIds(favorites);
  const tastedWines = getWinesByIds(tasted);
  const wishlistWines = getWinesByIds(wishlist);

  const tabs = [
    { id: 'favorites', label: 'Favorites', emoji: '❤️', count: stats.favoritesCount },
    { id: 'tasted', label: 'Tasted', emoji: '✅', count: stats.tastedCount },
    { id: 'wishlist', label: 'Wishlist', emoji: '🎁', count: stats.wishlistCount }
  ];

  const getCurrentWines = () => {
    switch (activeTab) {
      case 'favorites': return favoriteWines;
      case 'tasted': return tastedWines;
      case 'wishlist': return wishlistWines;
      default: return [];
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'favorites': 
        return { icon: '❤️', title: 'No favorites yet', text: 'Start exploring wines and tap the heart to save your favorites!' };
      case 'tasted': 
        return { icon: '🍷', title: 'No wines tasted', text: 'Mark wines as tasted to build your personal wine journey!' };
      case 'wishlist': 
        return { icon: '🎁', title: 'Wishlist empty', text: 'Add wines you want to try to your wishlist!' };
      default:
        return { icon: '🍷', title: 'Nothing here', text: 'Start exploring!' };
    }
  };

  const currentWines = getCurrentWines();
  const emptyMessage = getEmptyMessage();

  // Calculate stats
  const totalValue = [...favoriteWines, ...wishlistWines].reduce((sum, w) => sum + w.price, 0);
  const avgRating = tastedWines.length > 0 
    ? (tastedWines.reduce((sum, w) => sum + w.rating, 0) / tastedWines.length).toFixed(1)
    : 0;
  const topRegions = [...new Set([...favoriteWines, ...tastedWines].map(w => w.region.split(',')[0].trim()))]
    .slice(0, 3);

  return (
    <div className="cellar-page">
      <div className="cellar-header">
        <div className="cellar-title-section">
          <span className="cellar-icon">🏰</span>
          <div>
            <h1>My Wine Cellar</h1>
            <p>Your personal collection, tracked wines, and wishlist</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="cellar-stats">
        <div className="stat-card">
          <span className="stat-icon">🍷</span>
          <div className="stat-content">
            <span className="stat-number">{stats.tastedCount}</span>
            <span className="stat-label">Wines Tasted</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div className="stat-content">
            <span className="stat-number">{avgRating}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div className="stat-content">
            <span className="stat-number">${totalValue}</span>
            <span className="stat-label">Collection Value</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🌍</span>
          <div className="stat-content">
            <span className="stat-number">{topRegions.length}</span>
            <span className="stat-label">Regions Explored</span>
          </div>
        </div>
      </div>

      {/* Top Regions */}
      {topRegions.length > 0 && (
        <div className="top-regions">
          <span className="regions-label">Your favorite regions:</span>
          <div className="region-tags">
            {topRegions.map(region => (
              <span key={region} className="region-tag">{region}</span>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="cellar-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`cellar-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-emoji">{tab.emoji}</span>
            <span className="tab-label">{tab.label}</span>
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Wine Grid */}
      <div className="cellar-content">
        {currentWines.length > 0 ? (
          <div className="cellar-grid">
            {currentWines.map(wine => {
              const userRating = getWineRating(wine.id);
              const userNotes = getWineNotes(wine.id);
              
              return (
                <Link 
                  to={`/wine/${wine.slug}`} 
                  key={wine.id}
                  className="cellar-wine-card"
                >
                  <div className={`wine-type-stripe ${wine.type}`}></div>
                  
                  <div className="cellar-wine-content">
                    <div className="cellar-wine-header">
                      <h3>{wine.name}</h3>
                      {wine.isRare && <span className="rare-indicator">✨</span>}
                    </div>
                    
                    <p className="cellar-wine-region">{wine.region}</p>
                    <p className="cellar-wine-grape">{wine.grape?.split(',')[0]}</p>
                    
                    <div className="cellar-wine-meta">
                      <span className="cellar-wine-price">${wine.price}</span>
                      <span className="cellar-wine-rating">★ {wine.rating}</span>
                    </div>

                    {userRating > 0 && (
                      <div className="user-rating">
                        Your rating: {'★'.repeat(userRating)}{'☆'.repeat(5 - userRating)}
                      </div>
                    )}

                    {userNotes && (
                      <div className="user-notes">
                        <span className="notes-icon">📝</span>
                        <span className="notes-preview">{userNotes.slice(0, 50)}...</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="cellar-empty">
            <span className="empty-icon">{emptyMessage.icon}</span>
            <h3>{emptyMessage.title}</h3>
            <p>{emptyMessage.text}</p>
            <Link to="/search" className="explore-btn">
              Explore Wines →
            </Link>
          </div>
        )}
      </div>

      {/* Actions */}
      {(stats.favoritesCount > 0 || stats.tastedCount > 0 || stats.wishlistCount > 0) && (
        <div className="cellar-actions">
          <button 
            className="clear-data-btn"
            onClick={() => {
              if (confirm('Are you sure you want to clear all your cellar data?')) {
                clearAllData();
              }
            }}
          >
            🗑️ Clear All Data
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCellar;
