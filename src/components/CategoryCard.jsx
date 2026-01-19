import { Link } from 'react-router-dom';

export default function CategoryCard({ category, wineCount }) {
  return (
    <Link 
      to={`/search?category=${category.id}`} 
      className={`category-card category-card--${category.id}`}
    >
      <span className="category-card-icon">{category.icon}</span>
      <h3 className="category-card-title">{category.name}</h3>
      <p className="category-card-description">{category.description}</p>
      <div className="category-card-footer">
        <span className="category-card-count">{wineCount} wines</span>
        <span className="category-card-price">{category.priceRange}</span>
      </div>
    </Link>
  );
}
