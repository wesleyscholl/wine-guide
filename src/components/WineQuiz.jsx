import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWines } from '../context/WineContext';
import { WineBottleSimple } from './WineBottle';

const questions = [
  {
    id: 1,
    question: "What's the occasion?",
    icon: "🎯",
    options: [
      { value: 'dinner', label: 'Dinner party', icon: '🍽️' },
      { value: 'casual', label: 'Casual hangout', icon: '🛋️' },
      { value: 'celebration', label: 'Celebration', icon: '🎉' },
      { value: 'relaxing', label: 'Just relaxing', icon: '😌' }
    ]
  },
  {
    id: 2,
    question: "What's on the menu?",
    icon: "🍴",
    options: [
      { value: 'meat', label: 'Red meat / BBQ', icon: '🥩' },
      { value: 'seafood', label: 'Seafood / Fish', icon: '🦐' },
      { value: 'chicken', label: 'Chicken / Pork', icon: '🍗' },
      { value: 'vegetarian', label: 'Vegetarian / Pasta', icon: '🥗' },
      { value: 'nothing', label: 'No food, just wine', icon: '🍷' }
    ]
  },
  {
    id: 3,
    question: "Sweet or dry?",
    icon: "🍬",
    options: [
      { value: 'dry', label: 'Bone dry', icon: '🏜️' },
      { value: 'off-dry', label: 'Hint of sweetness', icon: '🍯' },
      { value: 'sweet', label: 'Sweet please!', icon: '🍰' },
      { value: 'any', label: 'Surprise me', icon: '🎲' }
    ]
  },
  {
    id: 4,
    question: "How adventurous are you feeling?",
    icon: "🧭",
    options: [
      { value: 'safe', label: 'Stick to classics', icon: '🏛️' },
      { value: 'curious', label: 'Open to suggestions', icon: '🤔' },
      { value: 'adventurous', label: 'Surprise me!', icon: '🚀' }
    ]
  },
  {
    id: 5,
    question: "What's your budget?",
    icon: "💰",
    options: [
      { value: 'budget', label: 'Under $15', icon: '💵' },
      { value: 'mid', label: '$15 - $25', icon: '💳' },
      { value: 'premium', label: '$25 - $40', icon: '💎' },
      { value: 'any', label: 'Whatever it takes', icon: '🤑' }
    ]
  }
];

function getWineRecommendations(answers, wines) {
  let filtered = [...wines];
  
  // Filter by food pairing
  if (answers.food) {
    const foodFilters = {
      meat: ['red'],
      seafood: ['white', 'sparkling'],
      chicken: ['white', 'rose'],
      vegetarian: ['white', 'rose'],
      nothing: [] // No filter
    };
    
    const allowedTypes = foodFilters[answers.food];
    if (allowedTypes && allowedTypes.length > 0) {
      filtered = filtered.filter(w => allowedTypes.includes(w.type));
    }
  }
  
  // Filter by sweetness preference
  if (answers.sweetness && answers.sweetness !== 'any') {
    // This is a simplified filter - in reality you'd want sweetness data on wines
    if (answers.sweetness === 'dry') {
      filtered = filtered.filter(w => !w.description?.toLowerCase().includes('sweet'));
    }
  }
  
  // Filter by budget
  if (answers.budget && answers.budget !== 'any') {
    const budgetRanges = {
      budget: [0, 15],
      mid: [15, 25],
      premium: [25, 40]
    };
    
    const range = budgetRanges[answers.budget];
    if (range) {
      filtered = filtered.filter(w => {
        const price = typeof w.price === 'number' ? w.price : parseFloat(String(w.price).replace('$', '') || 0);
        return price >= range[0] && price <= range[1];
      });
    }
  }
  
  // If no wines match filters, return random selection from all wines
  if (filtered.length === 0) {
    filtered = [...wines];
  }
  
  // Sort by some criteria and return top 3
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default function WineQuiz() {
  const { wines } = useWines();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (questionId, value) => {
    setIsAnimating(true);
    
    // Map question IDs to answer keys
    const keyMap = {
      1: 'occasion',
      2: 'food',
      3: 'sweetness',
      4: 'adventure',
      5: 'budget'
    };
    
    const answerKey = keyMap[questionId] || `q${questionId}`;
    const newAnswers = { ...answers, [answerKey]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        // Use newAnswers directly since state update is async
        const recs = getWineRecommendations(newAnswers, wines);
        setRecommendations(recs);
        setShowResults(true);
      }
      setIsAnimating(false);
    }, 300);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRecommendations([]);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="wine-quiz-results">
        <div className="quiz-results-header">
          <span className="results-icon">🎉</span>
          <h2>Your Perfect Wines!</h2>
          <p>Based on your preferences, we think you'll love these:</p>
        </div>
        
        <div className="quiz-recommendations">
          {recommendations.length > 0 ? (
            recommendations.map((wine, index) => (
              <Link 
                to={`/wine/${wine.slug}`} 
                key={wine.id} 
                className={`quiz-recommendation-card quiz-recommendation-card--${wine.type}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="rec-rank">#{index + 1}</div>
                <div className="rec-content">
                  <h3>{wine.name}</h3>
                  <p className="rec-region">{wine.region}</p>
                  <p className="rec-price">${wine.price}</p>
                </div>
                <div className="rec-bottle">
                  <WineBottleSimple type={wine.type} size={50} name={wine.name} vintage={wine.vintage} />
                </div>
              </Link>
            ))
          ) : (
            <div className="no-recommendations">
              <span>🤔</span>
              <p>We couldn't find a perfect match, but check out our full collection!</p>
              <Link to="/search" className="btn btn-primary">Browse All Wines</Link>
            </div>
          )}
        </div>
        
        <div className="quiz-actions">
          <button onClick={resetQuiz} className="btn btn-secondary">
            Take Quiz Again
          </button>
          <Link to="/search" className="btn btn-primary btn-glow">
            Browse All Wines
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="wine-quiz">
      <div className="quiz-header">
        <h2>Find Your Perfect Wine</h2>
        <p>Answer a few quick questions and we'll recommend the perfect bottle.</p>
      </div>
      
      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="progress-text">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <div className={`quiz-question ${isAnimating ? 'animating' : ''}`}>
        <div className="question-icon">{question.icon}</div>
        <h3>{question.question}</h3>
        
        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={option.value}
              className="quiz-option"
              onClick={() => handleAnswer(question.id, option.value)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="option-icon">{option.icon}</span>
              <span className="option-label">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {currentQuestion > 0 && (
        <button 
          className="quiz-back"
          onClick={() => setCurrentQuestion(prev => prev - 1)}
        >
          ← Back
        </button>
      )}
    </div>
  );
}
