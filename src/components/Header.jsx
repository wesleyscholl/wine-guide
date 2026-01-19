import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useWines } from '../context/WineContext';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const { setSearchQuery, favorites } = useWines();
  const navigate = useNavigate();

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

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">All Wines</Link>
          <Link to="/favorites" className="nav-link nav-link--favorites">
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
