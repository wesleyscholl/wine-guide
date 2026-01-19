import { useState } from 'react';
import { useWines } from '../context/WineContext';

export default function FavoriteButton({ wineSlug, size = 'medium' }) {
  const { isFavorite, toggleFavorite } = useWines();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const favorited = isFavorite(wineSlug);
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    toggleFavorite(wineSlug);
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  const sizeClasses = {
    small: 'favorite-btn--small',
    medium: 'favorite-btn--medium',
    large: 'favorite-btn--large'
  };

  return (
    <button
      className={`favorite-btn ${sizeClasses[size]} ${favorited ? 'active' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={handleClick}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="favorite-icon">
        {favorited ? '❤️' : '🤍'}
      </span>
      {isAnimating && favorited && (
        <span className="favorite-burst">✨</span>
      )}
    </button>
  );
}
