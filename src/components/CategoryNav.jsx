import { useWines } from '../context/WineContext';

export default function CategoryNav() {
  const { categories, selectedCategory, setSelectedCategory } = useWines();

  return (
    <nav className="category-nav">
      <button
        className={`category-btn ${!selectedCategory ? 'active' : ''}`}
        onClick={() => setSelectedCategory(null)}
      >
        All Wines
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category.id)}
        >
          <span className="category-icon">{category.icon}</span>
          <span className="category-name">{category.name}</span>
        </button>
      ))}
    </nav>
  );
}
