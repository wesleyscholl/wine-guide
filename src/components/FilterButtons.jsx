import { useWines } from '../context/WineContext';

export default function FilterButtons() {
  const { selectedType, setSelectedType, priceRange, setPriceRange } = useWines();

  const types = [
    { id: null, label: 'All Types', emoji: '🍷' },
    { id: 'red', label: 'Red', emoji: '🍷' },
    { id: 'white', label: 'White', emoji: '🥂' },
    { id: 'rose', label: 'Rosé', emoji: '🌸' },
    { id: 'sparkling', label: 'Sparkling', emoji: '✨' }
  ];

  const priceRanges = [
    { label: 'All Prices', range: [0, 100] },
    { label: 'Under $15', range: [0, 15] },
    { label: '$15-$25', range: [15, 25] },
    { label: '$25-$40', range: [25, 40] }
  ];

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  return (
    <div className="filter-buttons">
      <div className="filter-group">
        <span className="filter-label">Type:</span>
        <div className="filter-options">
          {types.map(type => (
            <button
              key={type.id || 'all'}
              className={`filter-btn ${selectedType === type.id ? 'active' : ''}`}
              onClick={() => setSelectedType(type.id)}
            >
              {type.emoji} {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Price:</span>
        <div className="filter-options">
          {priceRanges.map((price, index) => (
            <button
              key={index}
              className={`filter-btn ${priceRange[0] === price.range[0] && priceRange[1] === price.range[1] ? 'active' : ''}`}
              onClick={() => handlePriceChange(price.range)}
            >
              {price.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
