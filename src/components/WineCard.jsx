import { Link } from 'react-router-dom';
import { WineBottleSimple } from './WineBottle';
import FavoriteButton from './FavoriteButton';

export default function WineCard({ wine, compact = false }) {
  const typeEmoji = {
    red: '🍷',
    white: '🥂',
    rose: '🌸',
    sparkling: '✨'
  };

  if (compact) {
    return (
      <Link to={`/wine/${wine.slug}`} className={`wine-card compact wine-card--${wine.type}`}>
        <div className="wine-card-bottle">
          <WineBottleSimple type={wine.type} size={40} name={wine.name} vintage={wine.vintage} />
        </div>
        <h4 className="wine-card-title">{wine.name}</h4>
        <p className="wine-card-price">${wine.price}</p>
      </Link>
    );
  }

  return (
    <Link to={`/wine/${wine.slug}`} className={`wine-card wine-card--${wine.type}`}>
      <div className="wine-card-content">
        <div className="wine-card-header">
          <span className="wine-card-type">{typeEmoji[wine.type] || '🍷'} {wine.type}</span>
          <div className="wine-card-actions">
            <FavoriteButton wineSlug={wine.slug} size="small" />
            <span className="wine-card-price">${wine.price}</span>
          </div>
        </div>
        
        <h3 className="wine-card-title">{wine.name}</h3>
        
        <p className="wine-card-region">{wine.region}</p>
        <p className="wine-card-grape">{wine.grape}</p>
        
        <p className="wine-card-description">{wine.description}</p>
        
        <div className="wine-card-footer">
          <span className="wine-card-rating">★ {wine.rating}</span>
          <span className="wine-card-cta">View Details →</span>
        </div>
      </div>
      <div className="wine-card-bottle">
        <WineBottleSimple type={wine.type} size={50} name={wine.name} vintage={wine.vintage} />
      </div>
    </Link>
  );
}
