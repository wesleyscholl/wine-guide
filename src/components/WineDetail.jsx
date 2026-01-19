import { useWines } from '../context/WineContext';
import WineCard from './WineCard';
import { WineBottle } from './WineBottle';
import FavoriteButton from './FavoriteButton';

export default function WineDetail({ wine }) {
  const { getRelatedWines } = useWines();
  const relatedWines = getRelatedWines(wine);

  return (
    <article className={`wine-detail wine-detail--${wine.type}`}>
      {/* Hero Section */}
      <header className={`wine-detail-hero wine-detail-hero--${wine.type}`}>
        <div className="wine-detail-favorite">
          <FavoriteButton wineSlug={wine.slug} size="large" />
        </div>
        <div className="wine-detail-bottle">
          <WineBottle type={wine.type} size={140} name={wine.name} vintage={wine.vintage} />
        </div>
        <h1 className="wine-detail-title">{wine.name}</h1>
        <p className="wine-detail-subtitle">{wine.winery} • {wine.region}</p>
        <div className="wine-detail-meta">
          <span className="wine-detail-price">${wine.price}</span>
          <span className="wine-detail-rating">★ {wine.rating}</span>
          <span className="wine-detail-vintage">{wine.vintage}</span>
        </div>
      </header>

      {/* Quick Facts */}
      <section className="wine-detail-section">
        <h2>Quick Facts</h2>
        <div className="wine-detail-facts">
          <div className="fact">
            <span className="fact-label">Grape</span>
            <span className="fact-value">{wine.grape}</span>
          </div>
          <div className="fact">
            <span className="fact-label">Alcohol</span>
            <span className="fact-value">{wine.alcohol}%</span>
          </div>
          <div className="fact">
            <span className="fact-label">Closure</span>
            <span className="fact-value">{wine.closure}</span>
          </div>
          <div className="fact">
            <span className="fact-label">Drinking Window</span>
            <span className="fact-value">{wine.drinkingWindow?.start}-{wine.drinkingWindow?.end}</span>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="wine-detail-section">
        <h2>About This Wine</h2>
        <p className="wine-detail-description">{wine.description}</p>
      </section>

      {/* Tasting Notes */}
      {wine.tastingNotes && (
        <section className="wine-detail-section">
          <h2>Tasting Notes</h2>
          <div className="tasting-notes">
            <div className="tasting-note">
              <span className="tasting-label">👁️ Color</span>
              <p>{wine.tastingNotes.color}</p>
            </div>
            <div className="tasting-note">
              <span className="tasting-label">👃 Aroma</span>
              <p>{wine.tastingNotes.aroma}</p>
            </div>
            <div className="tasting-note">
              <span className="tasting-label">👅 Palate</span>
              <p>{wine.tastingNotes.palate}</p>
            </div>
            <div className="tasting-note">
              <span className="tasting-label">🍷 Finish</span>
              <p>{wine.tastingNotes.finish}</p>
            </div>
          </div>
        </section>
      )}

      {/* Food Pairings */}
      {wine.pairings && wine.pairings.length > 0 && (
        <section className="wine-detail-section">
          <h2>🍽️ Food Pairings</h2>
          <div className="pairings-grid">
            {wine.pairings.map((pairing, index) => (
              <span key={index} className="pairing-tag">{pairing}</span>
            ))}
          </div>
        </section>
      )}

      {/* Region Info */}
      {wine.regionInfo && (
        <section className="wine-detail-section">
          <h2>🌍 About the Region</h2>
          <p>{wine.regionInfo}</p>
        </section>
      )}

      {/* Pro Tips */}
      {wine.proTips && wine.proTips.length > 0 && (
        <section className="wine-detail-section">
          <h2>💡 Pro Tips</h2>
          <ul className="pro-tips">
            {wine.proTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Where to Buy */}
      {wine.whereToBuy && wine.whereToBuy.length > 0 && (
        <section className="wine-detail-section">
          <h2>🛒 Where to Buy</h2>
          <div className="where-to-buy">
            {wine.whereToBuy.map((store, index) => (
              <span key={index} className="store-tag">{store}</span>
            ))}
          </div>
        </section>
      )}

      {/* Related Wines */}
      {relatedWines.length > 0 && (
        <section className="wine-detail-section">
          <h2>Similar Wines You Might Like</h2>
          <div className="related-wines-grid">
            {relatedWines.map(relatedWine => (
              <WineCard key={relatedWine.id} wine={relatedWine} compact />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
