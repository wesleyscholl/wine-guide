import { Link } from 'react-router-dom';
import { wines } from '../data/wines';

const GrapeSpotlight = () => {
  const featuredGrapes = [
    {
      name: 'Cabernet Sauvignon',
      nickname: 'The King of Reds',
      emoji: '👑',
      color: '#722F37',
      origin: 'Bordeaux, France',
      character: 'Bold, tannic, age-worthy',
      flavors: ['Blackcurrant', 'Cedar', 'Green Pepper', 'Tobacco'],
      pairings: ['Ribeye Steak', 'Lamb Chops', 'Aged Cheddar'],
      funFact: 'A natural cross of Cabernet Franc and Sauvignon Blanc that happened by accident in the 17th century.',
      searchTerm: 'Cabernet'
    },
    {
      name: 'Pinot Noir',
      nickname: 'The Heartbreak Grape',
      emoji: '💔',
      color: '#B22222',
      origin: 'Burgundy, France',
      character: 'Elegant, silky, expressive of terroir',
      flavors: ['Cherry', 'Raspberry', 'Mushroom', 'Spice'],
      pairings: ['Duck', 'Salmon', 'Mushroom Dishes'],
      funFact: 'Called the "heartbreak grape" because it\'s notoriously difficult to grow but produces some of the world\'s most expensive wines.',
      searchTerm: 'Pinot Noir'
    },
    {
      name: 'Chardonnay',
      nickname: 'The Winemaker\'s Canvas',
      emoji: '🎨',
      color: '#DAA520',
      origin: 'Burgundy, France',
      character: 'Versatile, from crisp to rich',
      flavors: ['Apple', 'Citrus', 'Butter', 'Vanilla'],
      pairings: ['Lobster', 'Roast Chicken', 'Creamy Pasta'],
      funFact: 'Chardonnay is one of the most widely planted white grapes and is the only grape allowed in white Burgundy.',
      searchTerm: 'Chardonnay'
    },
    {
      name: 'Sauvignon Blanc',
      nickname: 'The Refresher',
      emoji: '🌿',
      color: '#9ACD32',
      origin: 'Loire Valley, France',
      character: 'Crisp, herbaceous, zesty',
      flavors: ['Grapefruit', 'Grass', 'Gooseberry', 'Jalapeño'],
      pairings: ['Goat Cheese', 'Sushi', 'Green Vegetables'],
      funFact: 'New Zealand Sauvignon Blanc put the country on the wine map and changed global expectations for the grape.',
      searchTerm: 'Sauvignon Blanc'
    },
    {
      name: 'Malbec',
      nickname: 'Argentina\'s Pride',
      emoji: '🇦🇷',
      color: '#4B0082',
      origin: 'Cahors, France (now Argentina)',
      character: 'Plush, fruity, approachable',
      flavors: ['Plum', 'Blackberry', 'Chocolate', 'Violet'],
      pairings: ['Grilled Meats', 'BBQ', 'Empanadas'],
      funFact: 'While originally from France, Argentina saved Malbec from obscurity and made it world-famous.',
      searchTerm: 'Malbec'
    },
    {
      name: 'Riesling',
      nickname: 'The Sommelier\'s Darling',
      emoji: '💎',
      color: '#98FB98',
      origin: 'Rhine, Germany',
      character: 'Aromatic, high acidity, versatile sweetness',
      flavors: ['Lime', 'Peach', 'Petrol', 'Honey'],
      pairings: ['Spicy Food', 'Asian Cuisine', 'Pork'],
      funFact: 'Riesling is considered by many sommeliers to be the world\'s greatest white grape for its ability to express terroir and age beautifully.',
      searchTerm: 'Riesling'
    }
  ];

  const getGrapeWines = (searchTerm) => {
    return wines.filter(w => 
      w.grape?.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 3);
  };

  return (
    <section className="grape-spotlight-section">
      <div className="grape-container">
        <div className="grape-header">
          <span className="grape-badge">🍇 GRAPE VARIETIES</span>
          <h2>Know Your Grapes</h2>
          <p>Master the major varieties and what makes each special</p>
        </div>

        <div className="grapes-grid">
          {featuredGrapes.map(grape => {
            const grapeWines = getGrapeWines(grape.searchTerm);
            
            return (
              <div 
                key={grape.name} 
                className="grape-card"
                style={{ '--grape-color': grape.color }}
              >
                <div className="grape-card-header">
                  <span className="grape-emoji">{grape.emoji}</span>
                  <div className="grape-titles">
                    <h3>{grape.name}</h3>
                    <span className="grape-nickname">{grape.nickname}</span>
                  </div>
                </div>

                <div className="grape-origin">
                  📍 Origin: {grape.origin}
                </div>

                <p className="grape-character">{grape.character}</p>

                <div className="grape-flavors">
                  <strong>Key Flavors:</strong>
                  <div className="flavor-tags">
                    {grape.flavors.map(flavor => (
                      <span key={flavor} className="flavor-tag">{flavor}</span>
                    ))}
                  </div>
                </div>

                <div className="grape-pairings">
                  <strong>Pairs With:</strong>
                  <span>{grape.pairings.join(' • ')}</span>
                </div>

                <div className="grape-funfact">
                  <span className="funfact-icon">💡</span>
                  <p>{grape.funFact}</p>
                </div>

                {grapeWines.length > 0 && (
                  <div className="grape-wines">
                    <strong>Try These:</strong>
                    <div className="grape-wine-list">
                      {grapeWines.map(wine => (
                        <Link to={`/wine/${wine.slug}`} key={wine.id} className="grape-wine-link">
                          {wine.name} <span className="grape-wine-price">${wine.price}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grape-cta">
          <Link to="/learn" className="btn btn-grape">
            Explore All Grape Varieties →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GrapeSpotlight;
