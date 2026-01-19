import { useWines } from '../context/WineContext';
import WineCard from '../components/WineCard';
import { Link } from 'react-router-dom';
import { Sparkles } from '../components/FloatingElements';

export default function FavoritesPage() {
  const { getFavoriteWines, favorites } = useWines();
  const favoriteWines = getFavoriteWines();

  return (
    <div className="favorites-page">
      <section className="favorites-hero">
        <Sparkles count={10} />
        <div className="container">
          <h1>
            <span className="favorites-icon">❤️</span>
            My Favorites
          </h1>
          <p className="favorites-subtitle">
            {favorites.length > 0 
              ? `You have ${favorites.length} wine${favorites.length > 1 ? 's' : ''} saved`
              : 'Start building your collection!'
            }
          </p>
        </div>
      </section>

      <section className="favorites-content">
        <div className="container">
          {favoriteWines.length > 0 ? (
            <div className="wines-grid stagger-children">
              {favoriteWines.map(wine => (
                <WineCard key={wine.id} wine={wine} />
              ))}
            </div>
          ) : (
            <div className="favorites-empty">
              <span className="empty-icon">💔</span>
              <h2>No favorites yet</h2>
              <p>Explore our wine collection and tap the heart to save your favorites!</p>
              <Link to="/search" className="btn btn-primary btn-glow">
                Discover Wines
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
