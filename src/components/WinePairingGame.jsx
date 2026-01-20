import { useState, useEffect, useCallback } from 'react';
import { wines, foodPairings } from '../data/wines';

const allFoods = [
  { name: 'Steak', emoji: '🥩', types: ['red'] },
  { name: 'Grilled Salmon', emoji: '🐟', types: ['white', 'rose'] },
  { name: 'Pasta Carbonara', emoji: '🍝', types: ['white'] },
  { name: 'BBQ Ribs', emoji: '🍖', types: ['red'] },
  { name: 'Sushi', emoji: '🍣', types: ['white', 'sparkling'] },
  { name: 'Cheese Board', emoji: '🧀', types: ['red', 'white'] },
  { name: 'Chocolate Cake', emoji: '🍫', types: ['red'] },
  { name: 'Lobster', emoji: '🦞', types: ['white', 'sparkling'] },
  { name: 'Pizza Margherita', emoji: '🍕', types: ['red'] },
  { name: 'Thai Curry', emoji: '🍛', types: ['white', 'rose'] },
  { name: 'Oysters', emoji: '🦪', types: ['white', 'sparkling'] },
  { name: 'Lamb Chops', emoji: '🍖', types: ['red'] },
  { name: 'Caesar Salad', emoji: '🥗', types: ['white', 'rose'] },
  { name: 'Roast Chicken', emoji: '🍗', types: ['white', 'red'] },
  { name: 'Tacos', emoji: '🌮', types: ['rose', 'white'] }
];

const WinePairingGame = () => {
  const [gameState, setGameState] = useState('start'); // start, playing, result
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentFood, setCurrentFood] = useState(null);
  const [wineOptions, setWineOptions] = useState([]);
  const [selectedWine, setSelectedWine] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalRounds] = useState(10);
  const [combo, setCombo] = useState(1);

  const getRandomWines = useCallback((correctTypes, count = 4) => {
    const correctWine = wines.find(w => correctTypes.includes(w.type)) || wines[0];
    const incorrectWines = wines
      .filter(w => !correctTypes.includes(w.type))
      .sort(() => Math.random() - 0.5)
      .slice(0, count - 1);
    
    return [correctWine, ...incorrectWines].sort(() => Math.random() - 0.5);
  }, []);

  const startGame = () => {
    setGameState('playing');
    setCurrentRound(0);
    setScore(0);
    setStreak(0);
    setCombo(1);
    nextRound();
  };

  const nextRound = useCallback(() => {
    if (currentRound >= totalRounds) {
      setGameState('result');
      return;
    }

    const food = allFoods[Math.floor(Math.random() * allFoods.length)];
    setCurrentFood(food);
    setWineOptions(getRandomWines(food.types));
    setSelectedWine(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setTimeLeft(15);
    setCurrentRound(prev => prev + 1);
  }, [currentRound, totalRounds, getRandomWines]);

  useEffect(() => {
    if (gameState !== 'playing' || showExplanation) return;
    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameState, showExplanation]);

  const handleAnswer = (wine) => {
    setSelectedWine(wine);
    const correct = wine && currentFood.types.includes(wine.type);
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      const points = Math.max(50, 100 + timeLeft * 5) * combo;
      setScore(prev => prev + points);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) setBestStreak(newStreak);
        return newStreak;
      });
      setCombo(prev => Math.min(prev + 0.5, 3));
    } else {
      setStreak(0);
      setCombo(1);
    }

    setTimeout(() => {
      if (currentRound >= totalRounds) {
        setGameState('result');
      } else {
        nextRound();
      }
    }, 2500);
  };

  const getGrade = () => {
    const percentage = (score / (totalRounds * 150)) * 100;
    if (percentage >= 90) return { grade: 'A+', emoji: '🏆', title: 'Sommelier Master!' };
    if (percentage >= 80) return { grade: 'A', emoji: '🥇', title: 'Wine Expert!' };
    if (percentage >= 70) return { grade: 'B', emoji: '🥈', title: 'Wine Enthusiast!' };
    if (percentage >= 60) return { grade: 'C', emoji: '🥉', title: 'Getting There!' };
    return { grade: 'D', emoji: '📚', title: 'Keep Learning!' };
  };

  if (gameState === 'start') {
    return (
      <div className="pairing-game">
        <div className="game-intro">
          <div className="game-logo">
            <span className="logo-wine">🍷</span>
            <span className="logo-plus">+</span>
            <span className="logo-food">🍽️</span>
          </div>
          <h2 className="game-title">Wine Pairing Challenge</h2>
          <p className="game-description">
            Test your wine pairing knowledge! Match the perfect wine type to each dish.
            Earn bonus points for speed and streaks!
          </p>
          
          <div className="game-rules">
            <div className="rule">
              <span className="rule-icon">⏱️</span>
              <span>15 seconds per round</span>
            </div>
            <div className="rule">
              <span className="rule-icon">🔥</span>
              <span>Build streaks for multipliers</span>
            </div>
            <div className="rule">
              <span className="rule-icon">🎯</span>
              <span>10 rounds total</span>
            </div>
          </div>

          <button className="game-start-btn" onClick={startGame}>
            <span className="btn-text">Start Game</span>
            <span className="btn-icon">🎮</span>
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const result = getGrade();
    return (
      <div className="pairing-game">
        <div className="game-results">
          <div className="result-trophy">{result.emoji}</div>
          <h2 className="result-title">{result.title}</h2>
          <div className="result-grade">Grade: {result.grade}</div>
          
          <div className="result-stats">
            <div className="result-stat">
              <span className="stat-value">{score}</span>
              <span className="stat-label">Total Score</span>
            </div>
            <div className="result-stat">
              <span className="stat-value">{bestStreak}</span>
              <span className="stat-label">Best Streak</span>
            </div>
          </div>

          <div className="result-actions">
            <button className="play-again-btn" onClick={startGame}>
              <span>Play Again</span>
              <span>🔄</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pairing-game playing">
      <div className="game-hud">
        <div className="hud-item score">
          <span className="hud-label">Score</span>
          <span className="hud-value">{score}</span>
        </div>
        <div className="hud-item round">
          <span className="hud-label">Round</span>
          <span className="hud-value">{currentRound}/{totalRounds}</span>
        </div>
        <div className="hud-item streak">
          <span className="hud-label">Streak</span>
          <span className="hud-value">🔥 {streak}</span>
        </div>
        <div className="hud-item combo">
          <span className="hud-label">Combo</span>
          <span className="hud-value">x{combo.toFixed(1)}</span>
        </div>
      </div>

      <div className={`timer-bar ${timeLeft <= 5 ? 'urgent' : ''}`}>
        <div className="timer-fill" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
        <span className="timer-text">{timeLeft}s</span>
      </div>

      <div className="game-content">
        <div className="food-display">
          <span className="food-emoji">{currentFood?.emoji}</span>
          <h3 className="food-name">{currentFood?.name}</h3>
          <p className="food-prompt">Which wine pairs best?</p>
        </div>

        <div className={`wine-options ${showExplanation ? 'revealed' : ''}`}>
          {wineOptions.map((wine, index) => (
            <button
              key={wine.id}
              className={`wine-option ${selectedWine?.id === wine.id ? 'selected' : ''} 
                ${showExplanation && currentFood?.types.includes(wine.type) ? 'correct' : ''}
                ${showExplanation && selectedWine?.id === wine.id && !currentFood?.types.includes(wine.type) ? 'incorrect' : ''}`}
              onClick={() => !showExplanation && handleAnswer(wine)}
              disabled={showExplanation}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`wine-type-indicator ${wine.type}`}></div>
              <span className="wine-name">{wine.name}</span>
              <span className="wine-type-label">{wine.type}</span>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <span className="feedback-icon">{isCorrect ? '✅' : '❌'}</span>
            <span className="feedback-text">
              {isCorrect 
                ? `Perfect! ${selectedWine?.type} wines pair beautifully with ${currentFood?.name}!`
                : `${currentFood?.types.join(' or ')} wines work better with ${currentFood?.name}.`
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinePairingGame;
