import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWines } from '../context/WineContext';
import { WineBottleSimple } from './WineBottle';
import { normalizeText } from '../lib/utils';

// Search input component for wine selection
const WineSearchInput = ({ onSelect, excludeIds, placeholder }) => {
  const { wines } = useWines();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const filteredWines = useMemo(() => {
    if (!query.trim()) return [];
    const normalizedQuery = normalizeText(query);
    return wines
      .filter(w => !excludeIds.includes(w.id))
      .filter(w => 
        normalizeText(w.name).includes(normalizedQuery) ||
        normalizeText(w.region).includes(normalizedQuery) ||
        normalizeText(w.grape).includes(normalizedQuery) ||
        normalizeText(w.winery).includes(normalizedQuery)
      )
      .slice(0, 8);
  }, [wines, query, excludeIds]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
          inputRef.current && !inputRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (wine) => {
    onSelect(wine);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="wine-search-input">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => query && setIsOpen(true)}
        placeholder={placeholder || "Type to search wines..."}
        className="compare-search"
      />
      {isOpen && filteredWines.length > 0 && (
        <div ref={dropdownRef} className="wine-search-dropdown">
          {filteredWines.map(wine => (
            <button
              key={wine.id}
              className="wine-search-option"
              onClick={() => handleSelect(wine)}
            >
              <span className="search-option-type" data-type={wine.type}>●</span>
              <span className="search-option-name">{wine.name}</span>
              <span className="search-option-price">${wine.price}</span>
            </button>
          ))}
        </div>
      )}
      {isOpen && query && filteredWines.length === 0 && (
        <div className="wine-search-dropdown">
          <div className="wine-search-empty">No wines found</div>
        </div>
      )}
    </div>
  );
};

export default function WineCompare() {
  const { 
    wines, 
    compareWines, 
    setCompareWines, 
    compareOpen, 
    setCompareOpen,
    removeFromCompare,
    clearCompare 
  } = useWines();

  const addWine = (wine, slot) => {
    const newSelected = [...compareWines];
    newSelected[slot] = wine;
    setCompareWines(newSelected);
  };

  const swapWines = () => {
    setCompareWines([compareWines[1], compareWines[0]]);
  };

  const excludeIds = useMemo(() => {
    return compareWines.filter(w => w).map(w => w.id);
  }, [compareWines]);

  const comparisonAttributes = [
    { key: 'type', label: 'Type', format: (v) => v?.charAt(0).toUpperCase() + v?.slice(1) },
    { key: 'price', label: 'Price', format: (v) => `$${v}` },
    { key: 'rating', label: 'Rating', format: (v) => `★ ${v}` },
    { key: 'region', label: 'Region', format: (v) => v },
    { key: 'grape', label: 'Grape', format: (v) => v },
    { key: 'alcohol', label: 'Alcohol', format: (v) => `${v}%` },
    { key: 'vintage', label: 'Vintage', format: (v) => v },
    { key: 'closure', label: 'Closure', format: (v) => v },
  ];

  if (!compareOpen) {
    return (
      <button 
        className="compare-toggle-btn btn-glow"
        onClick={() => setCompareOpen(true)}
        aria-label="Open wine comparison"
      >
        <span className="compare-icon">⚖️</span>
        <span>Compare Wines</span>
        {(compareWines[0] || compareWines[1]) && (
          <span className="compare-badge">{compareWines.filter(w => w).length}</span>
        )}
      </button>
    );
  }

  return (
    <div className="wine-compare-overlay">
      <div className="wine-compare-modal">
        <button 
          className="compare-close-btn"
          onClick={() => setCompareOpen(false)}
          aria-label="Close comparison"
        >
          ✕
        </button>
        
        <h2 className="compare-title">
          <span className="compare-emoji">⚖️</span>
          Compare Wines
        </h2>
        <p className="compare-subtitle">Type to search and select wines to compare</p>

        <div className="compare-container">
          {/* Wine Selection Slots */}
          <div className="compare-slots">
            {[0, 1].map((slot) => (
              <div key={slot} className="compare-slot">
                {compareWines[slot] ? (
                  <div className="compare-wine-card">
                    <button 
                      className="compare-remove-btn"
                      onClick={() => removeFromCompare(slot)}
                      aria-label="Remove wine"
                    >
                      ✕
                    </button>
                    <div className="compare-bottle">
                      <WineBottleSimple 
                        type={compareWines[slot].type} 
                        size={60}
                        name={compareWines[slot].name}
                        vintage={compareWines[slot].vintage}
                      />
                    </div>
                    <h3 className="compare-wine-name">{compareWines[slot].name}</h3>
                    <p className="compare-wine-region">{compareWines[slot].region}</p>
                  </div>
                ) : (
                  <div className="compare-empty-slot">
                    <span className="empty-slot-icon">🍷</span>
                    <p>Select a wine</p>
                    <WineSearchInput 
                      onSelect={(wine) => addWine(wine, slot)}
                      excludeIds={excludeIds}
                      placeholder="Type wine name..."
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Swap Button */}
          {compareWines[0] && compareWines[1] && (
            <button className="compare-swap-btn" onClick={swapWines} aria-label="Swap wines">
              ⇄
            </button>
          )}

          {/* Comparison Table */}
          {compareWines[0] && compareWines[1] && (
            <div className="compare-table">
              {comparisonAttributes.map(attr => (
                <div key={attr.key} className="compare-row">
                  <span className="compare-label">{attr.label}</span>
                  <span className="compare-value compare-value--left">
                    {attr.format(compareWines[0][attr.key])}
                  </span>
                  <span className="compare-value compare-value--right">
                    {attr.format(compareWines[1][attr.key])}
                  </span>
                </div>
              ))}
              
              {/* Tasting Notes Comparison */}
              <div className="compare-section-header">Tasting Notes</div>
              {['aroma', 'palate', 'finish'].map(note => (
                <div key={note} className="compare-row compare-row--tall">
                  <span className="compare-label">{note.charAt(0).toUpperCase() + note.slice(1)}</span>
                  <span className="compare-value compare-value--left">
                    {compareWines[0].tastingNotes?.[note] || '-'}
                  </span>
                  <span className="compare-value compare-value--right">
                    {compareWines[1].tastingNotes?.[note] || '-'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="compare-actions">
            {(compareWines[0] || compareWines[1]) && (
              <button className="btn btn-secondary" onClick={clearCompare}>
                Clear All
              </button>
            )}
            {compareWines[0] && (
              <Link to={`/wine/${compareWines[0].slug}`} className="btn btn-primary">
                View {compareWines[0].name}
              </Link>
            )}
            {compareWines[1] && (
              <Link to={`/wine/${compareWines[1].slug}`} className="btn btn-primary">
                View {compareWines[1].name}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
