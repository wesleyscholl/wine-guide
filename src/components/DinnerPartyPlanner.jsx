import { useState } from 'react';
import { Link } from 'react-router-dom';
import { wines } from '../data/wines';

const dinnerScenarios = [
  {
    id: 'italian',
    name: 'Italian Night',
    emoji: '🇮🇹',
    description: 'Pasta, pizza, and Italian classics',
    courses: [
      { 
        name: 'Antipasti', 
        dish: 'Bruschetta & Prosciutto',
        wineType: 'sparkling',
        wineStyle: 'Prosecco or light white'
      },
      { 
        name: 'Primo', 
        dish: 'Spaghetti Carbonara',
        wineType: 'white',
        wineStyle: 'Unoaked Chardonnay'
      },
      { 
        name: 'Secondo', 
        dish: 'Osso Buco',
        wineType: 'red',
        wineStyle: 'Barolo or Chianti'
      }
    ],
    keywords: ['Italy', 'Italian', 'Chianti', 'Barolo', 'Prosecco']
  },
  {
    id: 'steakhouse',
    name: 'Steakhouse Dinner',
    emoji: '🥩',
    description: 'Classic American steakhouse experience',
    courses: [
      { 
        name: 'Starter', 
        dish: 'Shrimp Cocktail',
        wineType: 'sparkling',
        wineStyle: 'Champagne or Cava'
      },
      { 
        name: 'Main', 
        dish: 'Ribeye Steak',
        wineType: 'red',
        wineStyle: 'Bold Cabernet Sauvignon'
      },
      { 
        name: 'Dessert', 
        dish: 'Chocolate Cake',
        wineType: 'red',
        wineStyle: 'Port or late-harvest'
      }
    ],
    keywords: ['Cabernet', 'Malbec', 'Napa', 'bold']
  },
  {
    id: 'seafood',
    name: 'Seafood Feast',
    emoji: '🦞',
    description: 'Fresh from the ocean',
    courses: [
      { 
        name: 'Raw Bar', 
        dish: 'Oysters & Clams',
        wineType: 'white',
        wineStyle: 'Muscadet or Chablis'
      },
      { 
        name: 'Main', 
        dish: 'Grilled Lobster',
        wineType: 'white',
        wineStyle: 'Rich Chardonnay'
      },
      { 
        name: 'Light Main', 
        dish: 'Grilled Fish',
        wineType: 'white',
        wineStyle: 'Sauvignon Blanc or Albariño'
      }
    ],
    keywords: ['Albariño', 'Muscadet', 'Chablis', 'Sauvignon', 'crisp']
  },
  {
    id: 'french',
    name: 'French Bistro',
    emoji: '🇫🇷',
    description: 'Classic French comfort food',
    courses: [
      { 
        name: 'Entrée', 
        dish: 'French Onion Soup',
        wineType: 'white',
        wineStyle: 'White Burgundy'
      },
      { 
        name: 'Plat', 
        dish: 'Coq au Vin',
        wineType: 'red',
        wineStyle: 'Burgundy Pinot Noir'
      },
      { 
        name: 'Fromage', 
        dish: 'Cheese Plate',
        wineType: 'red',
        wineStyle: 'Côtes du Rhône'
      }
    ],
    keywords: ['France', 'French', 'Burgundy', 'Rhône', 'Bordeaux']
  },
  {
    id: 'asian',
    name: 'Asian Fusion',
    emoji: '🥢',
    description: 'Spicy, umami-rich flavors',
    courses: [
      { 
        name: 'Appetizer', 
        dish: 'Dumplings & Spring Rolls',
        wineType: 'sparkling',
        wineStyle: 'Sparkling or off-dry Riesling'
      },
      { 
        name: 'Main', 
        dish: 'Thai Curry',
        wineType: 'white',
        wineStyle: 'Off-dry Riesling or Gewürztraminer'
      },
      { 
        name: 'Sushi', 
        dish: 'Sashimi Platter',
        wineType: 'white',
        wineStyle: 'Dry Riesling or Grüner Veltliner'
      }
    ],
    keywords: ['Riesling', 'Gewürz', 'aromatic', 'Germany', 'Austria']
  },
  {
    id: 'bbq',
    name: 'Backyard BBQ',
    emoji: '🍖',
    description: 'Smoky, charred, and delicious',
    courses: [
      { 
        name: 'Starter', 
        dish: 'Wings & Ribs',
        wineType: 'red',
        wineStyle: 'Zinfandel or GSM blend'
      },
      { 
        name: 'Main', 
        dish: 'Brisket or Pulled Pork',
        wineType: 'red',
        wineStyle: 'Malbec or Syrah'
      },
      { 
        name: 'Sides', 
        dish: 'Corn & Coleslaw',
        wineType: 'rose',
        wineStyle: 'Dry Rosé'
      }
    ],
    keywords: ['Zinfandel', 'Malbec', 'Syrah', 'smoky', 'bold']
  }
];

const DinnerPartyPlanner = () => {
  const [selectedScenario, setSelectedScenario] = useState(dinnerScenarios[0]);

  const getRecommendedWines = (keywords, type) => {
    return wines.filter(wine => {
      const typeMatch = wine.type === type;
      const keywordMatch = keywords.some(kw => 
        wine.region?.toLowerCase().includes(kw.toLowerCase()) ||
        wine.grape?.toLowerCase().includes(kw.toLowerCase()) ||
        wine.description?.toLowerCase().includes(kw.toLowerCase())
      );
      return typeMatch && keywordMatch;
    }).slice(0, 2);
  };

  return (
    <section className="dinner-planner-section">
      <div className="dinner-container">
        <div className="dinner-header">
          <span className="dinner-badge">🍽️ DINNER PARTY PLANNER</span>
          <h2>Wine for Every Course</h2>
          <p>Perfect pairings for your next dinner party</p>
        </div>

        <div className="scenario-selector">
          {dinnerScenarios.map(scenario => (
            <button
              key={scenario.id}
              className={`scenario-btn ${selectedScenario.id === scenario.id ? 'active' : ''}`}
              onClick={() => setSelectedScenario(scenario)}
            >
              <span className="scenario-emoji">{scenario.emoji}</span>
              <span className="scenario-name">{scenario.name}</span>
            </button>
          ))}
        </div>

        <div className="scenario-content">
          <div className="scenario-intro">
            <h3>{selectedScenario.emoji} {selectedScenario.name}</h3>
            <p>{selectedScenario.description}</p>
          </div>

          <div className="courses-grid">
            {selectedScenario.courses.map((course, idx) => {
              const recommendedWines = getRecommendedWines(
                selectedScenario.keywords, 
                course.wineType
              );

              return (
                <div key={idx} className="course-card">
                  <div className="course-header">
                    <span className="course-number">{idx + 1}</span>
                    <div className="course-info">
                      <h4>{course.name}</h4>
                      <p className="course-dish">{course.dish}</p>
                    </div>
                  </div>

                  <div className="course-pairing">
                    <span className="pairing-label">Pair with:</span>
                    <span className="pairing-style">{course.wineStyle}</span>
                  </div>

                  {recommendedWines.length > 0 && (
                    <div className="course-recommendations">
                      <span className="reco-label">Our picks:</span>
                      {recommendedWines.map(wine => (
                        <Link 
                          to={`/wine/${wine.slug}`} 
                          key={wine.id}
                          className="reco-wine"
                        >
                          <span className={`wine-dot ${wine.type}`}></span>
                          <span className="wine-name">{wine.name}</span>
                          <span className="wine-price">${wine.price}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="planning-tips">
            <h4>🎯 Party Planning Tips</h4>
            <div className="tips-grid">
              <div className="plan-tip">
                <span>🍷</span>
                <p>Plan 1 bottle per 2-3 guests for dinner</p>
              </div>
              <div className="plan-tip">
                <span>❄️</span>
                <p>Chill whites 2 hours before; reds 15 minutes</p>
              </div>
              <div className="plan-tip">
                <span>📝</span>
                <p>Write down what you served—you'll want to remember!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dinner-cta">
          <Link to="/sommelier" className="btn btn-dinner">
            Get Personalized Recommendations →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DinnerPartyPlanner;
