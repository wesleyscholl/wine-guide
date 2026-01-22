import { useState } from 'react';

const flavorCategories = [
  {
    name: 'Fruity',
    color: '#E74C3C',
    subcategories: [
      { name: 'Citrus', flavors: ['Lemon', 'Lime', 'Grapefruit', 'Orange'] },
      { name: 'Tree Fruit', flavors: ['Apple', 'Pear', 'Peach', 'Apricot'] },
      { name: 'Tropical', flavors: ['Pineapple', 'Mango', 'Passion Fruit', 'Lychee'] },
      { name: 'Red Fruit', flavors: ['Cherry', 'Strawberry', 'Raspberry', 'Cranberry'] },
      { name: 'Black Fruit', flavors: ['Blackberry', 'Plum', 'Black Cherry', 'Cassis'] },
      { name: 'Dried Fruit', flavors: ['Fig', 'Raisin', 'Prune', 'Date'] }
    ]
  },
  {
    name: 'Floral',
    color: '#9B59B6',
    subcategories: [
      { name: 'White Flowers', flavors: ['Jasmine', 'Orange Blossom', 'Honeysuckle', 'Acacia'] },
      { name: 'Red Flowers', flavors: ['Rose', 'Violet', 'Lavender', 'Hibiscus'] }
    ]
  },
  {
    name: 'Herbal',
    color: '#27AE60',
    subcategories: [
      { name: 'Fresh Herbs', flavors: ['Mint', 'Basil', 'Thyme', 'Oregano'] },
      { name: 'Dried Herbs', flavors: ['Sage', 'Rosemary', 'Bay Leaf', 'Tea'] },
      { name: 'Vegetal', flavors: ['Green Bell Pepper', 'Grass', 'Eucalyptus', 'Tomato Leaf'] }
    ]
  },
  {
    name: 'Spicy',
    color: '#E67E22',
    subcategories: [
      { name: 'Sweet Spices', flavors: ['Vanilla', 'Cinnamon', 'Clove', 'Nutmeg'] },
      { name: 'Savory Spices', flavors: ['Black Pepper', 'White Pepper', 'Licorice', 'Anise'] }
    ]
  },
  {
    name: 'Earthy',
    color: '#8B4513',
    subcategories: [
      { name: 'Mineral', flavors: ['Wet Stone', 'Chalk', 'Flint', 'Salt'] },
      { name: 'Organic', flavors: ['Mushroom', 'Truffle', 'Forest Floor', 'Leather'] },
      { name: 'Woody', flavors: ['Oak', 'Cedar', 'Tobacco', 'Coffee'] }
    ]
  },
  {
    name: 'Other',
    color: '#34495E',
    subcategories: [
      { name: 'Sweet', flavors: ['Honey', 'Caramel', 'Butterscotch', 'Chocolate'] },
      { name: 'Savory', flavors: ['Olive', 'Meat', 'Smoke', 'Bacon'] },
      { name: 'Dairy', flavors: ['Butter', 'Cream', 'Cheese', 'Yogurt'] }
    ]
  }
];

const FlavorWheel = ({ wine, interactive = true }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [highlightedFlavors, setHighlightedFlavors] = useState([]);

  // Extract flavors from wine's tasting notes
  const wineFlavorText = wine ? 
    `${wine.tastingNotes?.aroma || ''} ${wine.tastingNotes?.palate || ''} ${wine.tastingNotes?.finish || ''}`.toLowerCase() 
    : '';

  const checkFlavorMatch = (flavor) => {
    if (!wine) return false;
    return wineFlavorText.includes(flavor.toLowerCase());
  };

  const handleCategoryClick = (category) => {
    if (!interactive) return;
    if (selectedCategory?.name === category.name) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    if (!interactive) return;
    if (selectedSubcategory?.name === subcategory.name) {
      setSelectedSubcategory(null);
    } else {
      setSelectedSubcategory(subcategory);
    }
  };

  const totalCategories = flavorCategories.length;
  const anglePerCategory = 360 / totalCategories;

  return (
    <div className="flavor-wheel-container">
      <div className="flavor-wheel-header">
        <h3>🎨 Wine Flavor Wheel</h3>
        <p>Explore the aromas and flavors found in wine</p>
      </div>

      <div className="wheel-wrapper">
        <svg viewBox="-150 -150 300 300" className="flavor-wheel-svg">
          {/* Background circle */}
          <circle cx="0" cy="0" r="140" fill="rgba(255,255,255,0.05)" />
          
          {/* Category segments */}
          {flavorCategories.map((category, catIndex) => {
            const startAngle = catIndex * anglePerCategory - 90;
            const endAngle = startAngle + anglePerCategory;
            const isSelected = selectedCategory?.name === category.name;
            
            // Calculate arc path
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            const innerRadius = 30;
            const outerRadius = isSelected ? 145 : 140;
            
            const x1 = Math.cos(startRad) * outerRadius;
            const y1 = Math.sin(startRad) * outerRadius;
            const x2 = Math.cos(endRad) * outerRadius;
            const y2 = Math.sin(endRad) * outerRadius;
            const x3 = Math.cos(endRad) * innerRadius;
            const y3 = Math.sin(endRad) * innerRadius;
            const x4 = Math.cos(startRad) * innerRadius;
            const y4 = Math.sin(startRad) * innerRadius;
            
            const largeArc = anglePerCategory > 180 ? 1 : 0;
            
            const path = `
              M ${x1} ${y1}
              A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
              L ${x3} ${y3}
              A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
              Z
            `;

            // Label position
            const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
            const labelRadius = 90;
            const labelX = Math.cos(midAngle) * labelRadius;
            const labelY = Math.sin(midAngle) * labelRadius;
            
            return (
              <g key={category.name} className="category-segment">
                <path
                  d={path}
                  fill={category.color}
                  opacity={isSelected ? 1 : 0.7}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  style={{ cursor: interactive ? 'pointer' : 'default', transition: 'opacity 0.3s' }}
                  onClick={() => handleCategoryClick(category)}
                  onMouseEnter={() => !selectedCategory && setHighlightedFlavors(
                    category.subcategories.flatMap(s => s.flavors)
                  )}
                  onMouseLeave={() => !selectedCategory && setHighlightedFlavors([])}
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="600"
                  style={{ pointerEvents: 'none', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {category.name}
                </text>
              </g>
            );
          })}
          
          {/* Center circle */}
          <circle cx="0" cy="0" r="28" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.3)" />
          <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="8">
            FLAVORS
          </text>
        </svg>

        {/* Selected Category Details */}
        {selectedCategory && (
          <div className="category-details" style={{ '--category-color': selectedCategory.color }}>
            <h4>{selectedCategory.name} Flavors</h4>
            <div className="subcategory-list">
              {selectedCategory.subcategories.map(sub => (
                <div 
                  key={sub.name}
                  className={`subcategory-item ${selectedSubcategory?.name === sub.name ? 'active' : ''}`}
                  onClick={() => handleSubcategoryClick(sub)}
                >
                  <span className="subcategory-name">{sub.name}</span>
                  <div className="flavor-chips">
                    {sub.flavors.map(flavor => {
                      const isMatch = checkFlavorMatch(flavor);
                      return (
                        <span 
                          key={flavor}
                          className={`flavor-chip ${isMatch ? 'match' : ''}`}
                        >
                          {flavor}
                          {isMatch && <span className="match-indicator">✓</span>}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button className="close-details" onClick={() => setSelectedCategory(null)}>
              ✕ Close
            </button>
          </div>
        )}
      </div>

      {/* Wine Flavor Matches */}
      {wine && (
        <div className="wine-flavor-matches">
          <h4>Flavors in {wine.name}</h4>
          <div className="matched-flavors">
            {flavorCategories.flatMap(cat => 
              cat.subcategories.flatMap(sub => 
                sub.flavors.filter(f => checkFlavorMatch(f)).map(f => ({
                  flavor: f,
                  category: cat.name,
                  color: cat.color
                }))
              )
            ).slice(0, 12).map((match, i) => (
              <span 
                key={i} 
                className="matched-flavor-tag"
                style={{ '--tag-color': match.color }}
              >
                {match.flavor}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flavor-wheel-legend">
        <p>💡 Click on a category to explore its flavors</p>
      </div>
    </div>
  );
};

export default FlavorWheel;
