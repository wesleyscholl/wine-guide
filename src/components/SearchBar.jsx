import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWines } from '../context/WineContext';
import { normalizeText } from '../lib/utils';

export default function SearchBar({ onSearch, showSuggestions = true }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { wines, searchQuery, setSearchQuery } = useWines();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Initialize with existing search query
  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchQuery]);

  // Generate suggestions as user types
  useEffect(() => {
    if (!showSuggestions || query.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const normalizedQuery = normalizeText(query);
    const matches = wines
      .filter(wine => 
        normalizeText(wine.name).includes(normalizedQuery) ||
        normalizeText(wine.region).includes(normalizedQuery) ||
        normalizeText(wine.grape).includes(normalizedQuery)
      )
      .slice(0, 6);

    setSuggestions(matches);
    setShowDropdown(matches.length > 0);
  }, [query, wines, showSuggestions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
          inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    setShowDropdown(false);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSuggestionClick = (wine) => {
    setShowDropdown(false);
    navigate(`/wine/${wine.slug}`);
  };

  const handleClear = () => {
    setQuery('');
    setSearchQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <span className="search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search wines, regions, grapes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          className="search-bar-input"
        />
        {query && (
          <button type="button" className="search-clear" onClick={handleClear}>
            ✕
          </button>
        )}
        <button type="submit" className="search-bar-btn">Search</button>
      </form>

      {showDropdown && (
        <div ref={dropdownRef} className="search-suggestions">
          {suggestions.map(wine => (
            <button
              key={wine.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(wine)}
            >
              <span className="suggestion-name">{wine.name}</span>
              <span className="suggestion-meta">{wine.region} • ${wine.price}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
