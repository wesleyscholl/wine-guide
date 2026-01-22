import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useWines } from '../context/WineContext';
import { useCellar } from '../contexts/CellarContext';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setSearchQuery, favorites } = useWines();
  const { getCellarStats } = useCellar();
  const navigate = useNavigate();

  const cellarStats = getCellarStats();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate('/search');
    setIsSearchOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🍷</span>
          <span className="logo-text">Wine Guide</span>
        </Link>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav ${isMobileMenuOpen ? 'nav--open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/search" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>All Wines</Link>
          <Link to="/boldness-chart" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            📊 Boldness Chart
          </Link>
          <Link to="/sommelier" className="nav-link nav-link--special" onClick={() => setIsMobileMenuOpen(false)}>
            🧑‍🍳 Sommelier
          </Link>
          <Link to="/learn" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            🎓 Learn
          </Link>
          <Link to="/cellar" className="nav-link nav-link--cellar" onClick={() => setIsMobileMenuOpen(false)}>
            🏰 My Cellar
            {cellarStats.favoritesCount > 0 && (
              <span className="cellar-badge">{cellarStats.favoritesCount}</span>
            )}
          </Link>
          <Link to="/favorites" className="nav-link nav-link--favorites" onClick={() => setIsMobileMenuOpen(false)}>
            ❤️
            {favorites.length > 0 && (
              <span className="favorites-badge">{favorites.length}</span>
            )}
          </Link>
          <button 
            className="nav-link search-toggle"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search"
          >
            🔍
          </button>
        </nav>

        {isSearchOpen && (
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search wines..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="search-input"
              autoFocus
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        )}
      </div>
    </header>
  );
}
