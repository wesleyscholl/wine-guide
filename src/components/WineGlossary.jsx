import { useState, useMemo } from 'react';

const glossaryTerms = [
  // Wine Types & Styles
  { term: 'Tannins', category: 'Tasting', definition: 'Compounds from grape skins, seeds, and oak that create a dry, astringent sensation in red wines. They provide structure and aging potential.', example: 'A young Cabernet Sauvignon may have firm, grippy tannins that soften with age.' },
  { term: 'Acidity', category: 'Tasting', definition: 'The tartness or sourness in wine that provides freshness and balance. High acidity makes wines feel crisp and lively.', example: 'Sauvignon Blanc is known for its bright, citrusy acidity.' },
  { term: 'Body', category: 'Tasting', definition: 'The weight and texture of wine in your mouth, ranging from light to full. Influenced by alcohol, tannins, and extract.', example: 'Pinot Noir is typically light-bodied, while Syrah is full-bodied.' },
  { term: 'Finish', category: 'Tasting', definition: 'The flavors and sensations that linger after swallowing. A long finish is generally considered a sign of quality.', example: 'Great wines may have a finish lasting 30+ seconds.' },
  { term: 'Terroir', category: 'Viticulture', definition: 'The complete natural environment where grapes grow—soil, climate, topography—and how it influences wine character.', example: 'Burgundy\'s limestone terroir gives its wines distinctive minerality.' },
  { term: 'Vintage', category: 'Production', definition: 'The year the grapes were harvested. Vintage variation matters more in cooler climates where conditions vary yearly.', example: '2010 was an exceptional vintage in Bordeaux.' },
  { term: 'Appellation', category: 'Classification', definition: 'A legally defined wine-growing region with specific rules about grape varieties, yields, and winemaking practices.', example: 'Champagne can only come from the Champagne appellation in France.' },
  { term: 'Decanting', category: 'Serving', definition: 'Pouring wine into a separate vessel to expose it to oxygen or separate it from sediment.', example: 'Young tannic reds benefit from 1-2 hours of decanting.' },
  { term: 'Sommelier', category: 'Service', definition: 'A trained wine professional who specializes in wine service, pairing, and cellar management.', example: 'A Master Sommelier has passed one of the world\'s most difficult exams.' },
  { term: 'Cru', category: 'Classification', definition: 'French term meaning "growth," used to classify vineyards by quality. Grand Cru is the highest classification.', example: 'Château Margaux is a Premier Grand Cru Classé.' },
  { term: 'Malolactic Fermentation', category: 'Production', definition: 'A secondary fermentation converting sharp malic acid to softer lactic acid, creating creamier, buttery wines.', example: 'Most red wines and oaked Chardonnays undergo malolactic fermentation.' },
  { term: 'Legs', category: 'Tasting', definition: 'The droplets that form on the inside of a wine glass, indicating alcohol and glycerol content—not quality.', example: 'A high-alcohol wine like Amarone will have pronounced, slow-moving legs.' },
  { term: 'Bouquet', category: 'Tasting', definition: 'The complex aromas that develop in wine through aging, as opposed to primary fruit aromas.', example: 'An aged Burgundy may develop bouquet notes of leather and truffle.' },
  { term: 'Varietal', category: 'Classification', definition: 'A wine named after its grape variety, rather than its region of origin.', example: 'California wines are typically labeled by varietal (Chardonnay, Cabernet).' },
  { term: 'Brix', category: 'Viticulture', definition: 'A measurement of sugar content in grapes, used to determine optimal harvest time.', example: 'Grapes are typically harvested at 22-26 Brix for dry wines.' },
  { term: 'Lees', category: 'Production', definition: 'Dead yeast cells that settle after fermentation. Aging on lees adds complexity and creamy texture.', example: 'Muscadet Sur Lie is aged on its lees for added richness.' },
  { term: 'Reserve', category: 'Classification', definition: 'A term suggesting higher quality, though its meaning varies by country. Legally defined in Spain and Italy.', example: 'Rioja Reserva must age 3 years with 1 year in barrel.' },
  { term: 'Oxidation', category: 'Production', definition: 'Wine\'s exposure to oxygen. Controlled oxidation adds complexity; too much causes spoilage.', example: 'Sherry\'s nutty flavors come from intentional oxidation.' },
  { term: 'Vertical Tasting', category: 'Service', definition: 'Tasting different vintages of the same wine to understand vintage variation and aging.', example: 'A vertical of Opus One from 2010-2020 shows the estate\'s evolution.' },
  { term: 'Horizontal Tasting', category: 'Service', definition: 'Tasting different wines from the same vintage or region for comparison.', example: 'A horizontal of 2019 Napa Cabernets compares different producers.' },
  { term: 'Corked', category: 'Faults', definition: 'Wine contaminated by TCA (trichloroanisole), causing musty, wet cardboard aromas. Affects ~2-3% of cork-sealed wines.', example: 'If your wine smells like wet newspaper, it may be corked.' },
  { term: 'Bretty', category: 'Faults', definition: 'Aromas from Brettanomyces yeast—barnyard, band-aid, or horse stable. Low levels can add complexity; high levels are faulty.', example: 'Some Rhône and Burgundy wines have detectable brett character.' },
  { term: 'Négociant', category: 'Production', definition: 'A wine merchant who buys grapes or wine from growers and bottles under their own label.', example: 'Louis Jadot is a famous Burgundy négociant.' },
  { term: 'Grand Vin', category: 'Classification', definition: 'The primary or flagship wine of an estate, made from the best vineyard selections.', example: 'Château Latour\'s Grand Vin is separate from Les Forts de Latour.' },
  { term: 'Micro-oxygenation', category: 'Production', definition: 'Controlled introduction of tiny oxygen amounts during winemaking to soften tannins.', example: 'Many modern wineries use micro-ox to make wines approachable younger.' },
  { term: 'Phenolics', category: 'Tasting', definition: 'Compounds including tannins and anthocyanins that contribute to color, flavor, and mouthfeel.', example: 'Thick-skinned grapes like Cabernet have high phenolic content.' },
  { term: 'Old Vines', category: 'Viticulture', definition: 'Grapevines typically 35+ years old. They produce fewer but more concentrated grapes.', example: '"Vieilles Vignes" on French labels indicates old vine wine.' },
  { term: 'Residual Sugar', category: 'Production', definition: 'Grape sugar remaining after fermentation. Dry wines have less than 4g/L; sweet wines much more.', example: 'Most Rieslings have some residual sugar for balance.' },
  { term: 'Volatile Acidity', category: 'Faults', definition: 'Acetic acid in wine. Low levels add complexity; high levels smell like vinegar.', example: 'VA above 1.2 g/L is generally considered faulty.' },
  { term: 'Extraction', category: 'Production', definition: 'The process of drawing color, tannins, and flavor from grape skins during winemaking.', example: 'Extended maceration increases extraction in red wines.' }
];

const categories = [...new Set(glossaryTerms.map(t => t.category))];

const WineGlossary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedTerm, setExpandedTerm] = useState(null);

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = searchQuery === '' || 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || 
        term.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory]);

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Tasting': '👅',
      'Viticulture': '🍇',
      'Production': '🏭',
      'Classification': '🏷️',
      'Serving': '🍷',
      'Service': '🧑‍🍳',
      'Faults': '⚠️'
    };
    return emojis[category] || '📚';
  };

  return (
    <section className="glossary-section">
      <div className="glossary-container">
        <div className="glossary-header">
          <span className="glossary-icon">📖</span>
          <h2>Wine Glossary</h2>
          <p>Master the language of wine with our comprehensive guide</p>
        </div>

        <div className="glossary-controls">
          <div className="glossary-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>

          <div className="category-filters">
            <button
              className={`category-filter ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-filter ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {getCategoryEmoji(cat)} {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="glossary-stats">
          <span>{filteredTerms.length} terms</span>
          {searchQuery && <span>matching "{searchQuery}"</span>}
        </div>

        <div className="glossary-grid">
          {filteredTerms.map(item => (
            <div 
              key={item.term}
              className={`glossary-card ${expandedTerm === item.term ? 'expanded' : ''}`}
              onClick={() => setExpandedTerm(expandedTerm === item.term ? null : item.term)}
            >
              <div className="card-header">
                <span className="term-category-emoji">{getCategoryEmoji(item.category)}</span>
                <h3 className="term-name">{item.term}</h3>
                <span className="term-category">{item.category}</span>
              </div>
              
              <p className="term-definition">{item.definition}</p>
              
              {expandedTerm === item.term && item.example && (
                <div className="term-example">
                  <span className="example-label">Example:</span>
                  <p>{item.example}</p>
                </div>
              )}

              <span className="expand-indicator">
                {expandedTerm === item.term ? '−' : '+'}
              </span>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🤔</span>
            <p>No terms found matching your search</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
              Clear filters
            </button>
          </div>
        )}

        <div className="glossary-tip">
          <span className="tip-icon">💡</span>
          <p><strong>Pro Tip:</strong> Understanding these terms will help you read wine labels, 
          communicate with sommeliers, and make better buying decisions!</p>
        </div>
      </div>
    </section>
  );
};

export default WineGlossary;
