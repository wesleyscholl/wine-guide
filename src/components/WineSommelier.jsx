import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { wines } from '../data/wines';

const quizQuestions = [
  {
    id: 'occasion',
    question: "What's the occasion?",
    icon: '🎯',
    options: [
      { id: 'everyday', label: 'Casual weeknight', emoji: '🏠', weight: { priceMax: 25 } },
      { id: 'dinner-party', label: 'Hosting friends', emoji: '🎉', weight: { priceMin: 25, priceMax: 60 } },
      { id: 'celebration', label: 'Special celebration', emoji: '✨', weight: { priceMin: 40 } },
      { id: 'romance', label: 'Date night', emoji: '💕', weight: { priceMin: 30, priceMax: 80 } },
      { id: 'discovery', label: 'Wine exploration', emoji: '🧭', weight: { isRare: true } }
    ]
  },
  {
    id: 'style',
    question: 'What style speaks to you?',
    icon: '🎨',
    options: [
      { id: 'bold', label: 'Bold & powerful', emoji: '💪', weight: { types: ['red'], grapes: ['Cabernet', 'Syrah', 'Malbec', 'Sagrantino'] } },
      { id: 'elegant', label: 'Elegant & refined', emoji: '👔', weight: { types: ['red', 'white'], grapes: ['Pinot Noir', 'Riesling', 'Chardonnay'] } },
      { id: 'fresh', label: 'Fresh & crisp', emoji: '🌊', weight: { types: ['white', 'sparkling'], grapes: ['Sauvignon Blanc', 'Albariño', 'Vinho Verde'] } },
      { id: 'aromatic', label: 'Aromatic & expressive', emoji: '🌸', weight: { types: ['white'], grapes: ['Riesling', 'Gewürztraminer', 'Moscato'] } },
      { id: 'bubbly', label: 'Bubbly & fun', emoji: '🫧', weight: { types: ['sparkling'] } }
    ]
  },
  {
    id: 'food',
    question: "What are you eating?",
    icon: '🍽️',
    options: [
      { id: 'red-meat', label: 'Steak or lamb', emoji: '🥩', weight: { types: ['red'], grapes: ['Cabernet', 'Malbec', 'Syrah'] } },
      { id: 'poultry', label: 'Chicken or turkey', emoji: '🍗', weight: { grapes: ['Chardonnay', 'Pinot Noir'] } },
      { id: 'seafood', label: 'Fish or shellfish', emoji: '🦐', weight: { types: ['white', 'sparkling'] } },
      { id: 'pasta', label: 'Pasta or pizza', emoji: '🍝', weight: { regions: ['Italy', 'France'] } },
      { id: 'cheese', label: 'Cheese board', emoji: '🧀', weight: { types: ['red', 'white'] } },
      { id: 'no-food', label: 'Just sipping', emoji: '🍷', weight: {} }
    ]
  },
  {
    id: 'adventure',
    question: 'How adventurous are you feeling?',
    icon: '🎲',
    options: [
      { id: 'classic', label: 'Stick to classics', emoji: '📚', weight: { regions: ['France', 'Italy', 'California'] } },
      { id: 'curious', label: 'Slightly curious', emoji: '🤔', weight: { regions: ['Spain', 'Portugal', 'Oregon'] } },
      { id: 'adventurous', label: 'Show me something new', emoji: '🌍', weight: { regions: ['Lebanon', 'Germany', 'New Zealand', 'South Africa'] } },
      { id: 'wild', label: 'Surprise me completely', emoji: '🎰', weight: { isRare: true } }
    ]
  },
  {
    id: 'budget',
    question: "What's your budget?",
    icon: '💰',
    options: [
      { id: 'value', label: 'Under $20', emoji: '💵', weight: { priceMax: 20 } },
      { id: 'moderate', label: '$20 - $40', emoji: '💳', weight: { priceMin: 20, priceMax: 40 } },
      { id: 'premium', label: '$40 - $100', emoji: '💎', weight: { priceMin: 40, priceMax: 100 } },
      { id: 'splurge', label: 'Price is no object', emoji: '👑', weight: { priceMin: 80 } }
    ]
  }
];

const WineSommelier = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (questionId, option) => {
    setIsAnimating(true);
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setShowResults(true);
      }
      setIsAnimating(false);
    }, 400);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendations = useMemo(() => {
    if (!showResults) return [];

    // Score each wine based on answers
    const scoredWines = wines.map(wine => {
      let score = 0;
      let matchReasons = [];

      Object.values(answers).forEach(answer => {
        const weight = answer.weight;

        // Price matching
        if (weight.priceMin !== undefined && wine.price >= weight.priceMin) {
          score += 2;
        }
        if (weight.priceMax !== undefined && wine.price <= weight.priceMax) {
          score += 2;
        }

        // Type matching
        if (weight.types && weight.types.includes(wine.type)) {
          score += 3;
          matchReasons.push(`${wine.type} wine`);
        }

        // Grape matching
        if (weight.grapes) {
          const grapeMatch = weight.grapes.some(g => 
            wine.grape?.toLowerCase().includes(g.toLowerCase())
          );
          if (grapeMatch) {
            score += 4;
            matchReasons.push('grape variety');
          }
        }

        // Region matching
        if (weight.regions) {
          const regionMatch = weight.regions.some(r => 
            wine.region?.toLowerCase().includes(r.toLowerCase())
          );
          if (regionMatch) {
            score += 3;
            matchReasons.push('region');
          }
        }

        // Rare/collectible preference
        if (weight.isRare && wine.isRare) {
          score += 5;
          matchReasons.push('rare find');
        }
      });

      // Bonus for highly rated wines
      if (wine.rating >= 4.8) score += 2;
      if (wine.rating >= 4.9) score += 2;

      return { ...wine, score, matchReasons: [...new Set(matchReasons)] };
    });

    // Sort by score and return top 5
    return scoredWines
      .filter(w => w.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [answers, showResults]);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  if (showResults) {
    return (
      <section className="sommelier-section">
        <div className="sommelier-container">
          <div className="results-header">
            <span className="results-icon">🍷</span>
            <h2>Your Personal Wine Selection</h2>
            <p>Based on your preferences, our sommelier recommends:</p>
          </div>

          <div className="recommendations-grid">
            {recommendations.length > 0 ? (
              recommendations.map((wine, index) => (
                <Link 
                  to={`/wine/${wine.slug}`} 
                  key={wine.id}
                  className={`recommendation-card ${index === 0 ? 'featured' : ''}`}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  {index === 0 && <span className="top-pick-badge">🏆 Top Pick</span>}
                  {wine.isRare && <span className="rare-badge">✨ Rare</span>}
                  
                  <div className="rec-content">
                    <div className={`wine-type-indicator ${wine.type}`}></div>
                    <h3>{wine.name}</h3>
                    <p className="rec-region">{wine.region}</p>
                    <p className="rec-description">{wine.description}</p>
                    
                    <div className="rec-meta">
                      <span className="rec-price">${wine.price}</span>
                      <span className="rec-rating">★ {wine.rating}</span>
                    </div>

                    {wine.matchReasons.length > 0 && (
                      <div className="match-reasons">
                        {wine.matchReasons.slice(0, 3).map((reason, i) => (
                          <span key={i} className="reason-tag">{reason}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-results">
                <span className="no-results-icon">🤔</span>
                <p>Hmm, that's a unique combination! Try the quiz again with different preferences.</p>
              </div>
            )}
          </div>

          <div className="results-actions">
            <button onClick={resetQuiz} className="retake-btn">
              <span>🔄</span> Take Quiz Again
            </button>
            <Link to="/search" className="browse-btn">
              <span>🔍</span> Browse All Wines
            </Link>
          </div>

          <div className="your-preferences">
            <h4>Your Preferences</h4>
            <div className="pref-tags">
              {Object.entries(answers).map(([qId, answer]) => (
                <span key={qId} className="pref-tag">
                  {answer.emoji} {answer.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sommelier-section">
      <div className="sommelier-container">
        <div className="quiz-header">
          <span className="quiz-icon">🧑‍🍳</span>
          <h2>Personal Wine Sommelier</h2>
          <p>Answer 5 quick questions and we'll find your perfect wine</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{currentQuestion + 1} of {quizQuestions.length}</span>
        </div>

        <div className={`question-card ${isAnimating ? 'slide-out' : 'slide-in'}`}>
          <span className="question-icon">{question.icon}</span>
          <h3>{question.question}</h3>
          
          <div className="options-grid">
            {question.options.map(option => (
              <button
                key={option.id}
                className="option-btn"
                onClick={() => handleAnswer(question.id, option)}
              >
                <span className="option-emoji">{option.emoji}</span>
                <span className="option-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {currentQuestion > 0 && (
          <button 
            className="back-btn"
            onClick={() => setCurrentQuestion(prev => prev - 1)}
          >
            ← Previous Question
          </button>
        )}
      </div>
    </section>
  );
};

export default WineSommelier;
