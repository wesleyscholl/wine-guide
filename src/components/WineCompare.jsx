import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useWines } from '../context/WineContext';
import { WineBottleSimple } from './WineBottle';

export default function WineCompare() {
  const { wines } = useWines();
  const [selectedWines, setSelectedWines] = useState([null, null]);
  const [isOpen, setIsOpen] = useState(false);

  const addWine = (wine, slot) => {
    const newSelected = [...selectedWines];
    newSelected[slot] = wine;
    setSelectedWines(newSelected);
  };

  const removeWine = (slot) => {
    const newSelected = [...selectedWines];
    newSelected[slot] = null;
    setSelectedWines(newSelected);
  };

  const swapWines = () => {
    setSelectedWines([selectedWines[1], selectedWines[0]]);
  };

  const clearAll = () => {
    setSelectedWines([null, null]);
  };

  const availableWines = useMemo(() => {
    return wines.filter(w => 
      !selectedWines.some(selected => selected?.id === w.id)
    );
  }, [wines, selectedWines]);

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

  if (!isOpen) {
    return (
      <button 
        className="compare-toggle-btn btn-glow"
        onClick={() => setIsOpen(true)}
        aria-label="Open wine comparison"
      >
        <span className="compare-icon">⚖️</span>
        <span>Compare Wines</span>
      </button>
    );
  }

  return (
    <div className="wine-compare-overlay">
      <div className="wine-compare-modal">
        <button 
          className="compare-close-btn"
          onClick={() => setIsOpen(false)}
          aria-label="Close comparison"
        >
          ✕
        </button>
        
        <h2 className="compare-title">
          <span className="compare-emoji">⚖️</span>
          Compare Wines
        </h2>
        <p className="compare-subtitle">Select two wines to compare side by side</p>

        <div className="compare-container">
          {/* Wine Selection Slots */}
          <div className="compare-slots">
            {[0, 1].map((slot) => (
              <div key={slot} className="compare-slot">
                {selectedWines[slot] ? (
                  <div className="compare-wine-card">
                    <button 
                      className="compare-remove-btn"
                      onClick={() => removeWine(slot)}
                      aria-label="Remove wine"
                    >
                      ✕
                    </button>
                    <div className="compare-bottle">
                      <WineBottleSimple 
                        type={selectedWines[slot].type} 
                        size={60}
                        name={selectedWines[slot].name}
                        vintage={selectedWines[slot].vintage}
                      />
                    </div>
                    <h3 className="compare-wine-name">{selectedWines[slot].name}</h3>
                    <p className="compare-wine-region">{selectedWines[slot].region}</p>
                  </div>
                ) : (
                  <div className="compare-empty-slot">
                    <span className="empty-slot-icon">🍷</span>
                    <p>Select a wine</p>
                    <select 
                      onChange={(e) => {
                        const wine = wines.find(w => w.id === parseInt(e.target.value));
                        if (wine) addWine(wine, slot);
                      }}
                      value=""
                      className="compare-select"
                    >
                      <option value="">Choose wine...</option>
                      {availableWines.map(wine => (
                        <option key={wine.id} value={wine.id}>
                          {wine.name} - ${wine.price}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Swap Button */}
          {selectedWines[0] && selectedWines[1] && (
            <button className="compare-swap-btn" onClick={swapWines} aria-label="Swap wines">
              ⇄
            </button>
          )}

          {/* Comparison Table */}
          {selectedWines[0] && selectedWines[1] && (
            <div className="compare-table">
              {comparisonAttributes.map(attr => (
                <div key={attr.key} className="compare-row">
                  <span className="compare-label">{attr.label}</span>
                  <span className="compare-value compare-value--left">
                    {attr.format(selectedWines[0][attr.key])}
                  </span>
                  <span className="compare-value compare-value--right">
                    {attr.format(selectedWines[1][attr.key])}
                  </span>
                </div>
              ))}
              
              {/* Tasting Notes Comparison */}
              <div className="compare-section-header">Tasting Notes</div>
              {['aroma', 'palate', 'finish'].map(note => (
                <div key={note} className="compare-row compare-row--tall">
                  <span className="compare-label">{note.charAt(0).toUpperCase() + note.slice(1)}</span>
                  <span className="compare-value compare-value--left">
                    {selectedWines[0].tastingNotes?.[note] || '-'}
                  </span>
                  <span className="compare-value compare-value--right">
                    {selectedWines[1].tastingNotes?.[note] || '-'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="compare-actions">
            {(selectedWines[0] || selectedWines[1]) && (
              <button className="btn btn-secondary" onClick={clearAll}>
                Clear All
              </button>
            )}
            {selectedWines[0] && (
              <Link to={`/wine/${selectedWines[0].slug}`} className="btn btn-primary">
                View {selectedWines[0].name}
              </Link>
            )}
            {selectedWines[1] && (
              <Link to={`/wine/${selectedWines[1].slug}`} className="btn btn-primary">
                View {selectedWines[1].name}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
