import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { wines, categories, foodPairings } from '../data/wines';

const WineContext = createContext();

// Local storage key for favorites
const FAVORITES_KEY = 'wine-guide-favorites';

export function WineProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  
  // Favorites state - initialize from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not save favorites to localStorage');
    }
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = useCallback((wineSlug) => {
    setFavorites(prev => {
      if (prev.includes(wineSlug)) {
        return prev.filter(slug => slug !== wineSlug);
      }
      return [...prev, wineSlug];
    });
  }, []);

  // Check if wine is favorited
  const isFavorite = useCallback((wineSlug) => {
    return favorites.includes(wineSlug);
  }, [favorites]);

  // Get favorite wines
  const getFavoriteWines = useCallback(() => {
    return wines.filter(wine => favorites.includes(wine.slug));
  }, [favorites]);

  // Filter wines based on current filters
  const filteredWines = useMemo(() => {
    return wines.filter(wine => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          wine.name.toLowerCase().includes(query) ||
          wine.region.toLowerCase().includes(query) ||
          wine.grape.toLowerCase().includes(query) ||
          wine.winery.toLowerCase().includes(query) ||
          wine.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && wine.category !== selectedCategory) {
        return false;
      }

      // Type filter
      if (selectedType && wine.type !== selectedType) {
        return false;
      }

      // Price range filter
      if (wine.price < priceRange[0] || wine.price > priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedType, priceRange]);

  // Get wines by category
  const getWinesByCategory = (categoryId) => {
    return wines.filter(wine => wine.category === categoryId);
  };

  // Get wine by slug
  const getWineBySlug = (slug) => {
    return wines.find(wine => wine.slug === slug);
  };

  // Get related wines (same category, excluding current)
  const getRelatedWines = (currentWine, limit = 4) => {
    return wines
      .filter(wine => wine.category === currentWine.category && wine.slug !== currentWine.slug)
      .slice(0, limit);
  };

  // Get wines by type
  const getWinesByType = (type) => {
    return wines.filter(wine => wine.type === type);
  };

  // Get food pairing recommendations
  const getFoodPairing = (food) => {
    return foodPairings[food.toLowerCase()] || null;
  };

  const value = {
    wines,
    categories,
    filteredWines,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    priceRange,
    setPriceRange,
    getWinesByCategory,
    getWineBySlug,
    getRelatedWines,
    getWinesByType,
    getFoodPairing,
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteWines
  };

  return (
    <WineContext.Provider value={value}>
      {children}
    </WineContext.Provider>
  );
}

export function useWines() {
  const context = useContext(WineContext);
  if (!context) {
    throw new Error('useWines must be used within a WineProvider');
  }
  return context;
}
