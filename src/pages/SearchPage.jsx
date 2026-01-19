import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useWines } from '../context/WineContext';
import SearchBar from '../components/SearchBar';
import CategoryNav from '../components/CategoryNav';
import FilterButtons from '../components/FilterButtons';
import WineCard from '../components/WineCard';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { 
    filteredWines, 
    setSelectedCategory, 
    setSelectedType,
    selectedCategory,
    selectedType,
    searchQuery,
    setSearchQuery
  } = useWines();

  // Handle URL query parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const query = searchParams.get('q');

    if (category) setSelectedCategory(category);
    if (type) setSelectedType(type);
    if (query) setSearchQuery(query);
  }, [searchParams, setSelectedCategory, setSelectedType, setSearchQuery]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedType(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory || selectedType || searchQuery;

  return (
    <div className="search-page">
      <div className="container">
        <header className="search-header">
          <h1>All Wines</h1>
          <p className="search-subtitle">
            {filteredWines.length} wine{filteredWines.length !== 1 ? 's' : ''} found
            {hasActiveFilters && (
              <button className="clear-filters" onClick={clearFilters}>
                Clear all filters
              </button>
            )}
          </p>
        </header>

        <SearchBar onSearch={(q) => setSearchQuery(q)} />
        
        <div className="search-filters">
          <CategoryNav />
          <FilterButtons />
        </div>

        {filteredWines.length > 0 ? (
          <div className="wines-grid">
            {filteredWines.map(wine => (
              <WineCard key={wine.id} wine={wine} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h2>No wines found</h2>
            <p>Try adjusting your filters or search terms.</p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
