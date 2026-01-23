import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { wines, categories, foodPairings } from '../data/wines';
import { normalizeText } from '../lib/utils';

const WineContext = createContext();

// Local storage key for favorites
const FAVORITES_KEY = 'wine-guide-favorites';
const COMPARE_KEY = 'wine-guide-compare';

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

  // Compare state - wines to compare
  const [compareWines, setCompareWines] = useState(() => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);
      return stored ? JSON.parse(stored) : [null, null];
    } catch {
      return [null, null];
    }
  });
  const [compareOpen, setCompareOpen] = useState(false);

  // Persist compare wines to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(compareWines));
    } catch (e) {
      console.warn('Could not save compare wines to localStorage');
    }
  }, [compareWines]);

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
        const normalizedQuery = normalizeText(searchQuery);
        const matchesSearch = 
          normalizeText(wine.name).includes(normalizedQuery) ||
          normalizeText(wine.region).includes(normalizedQuery) ||
          normalizeText(wine.grape).includes(normalizedQuery) ||
          normalizeText(wine.winery).includes(normalizedQuery) ||
          normalizeText(wine.description).includes(normalizedQuery);
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

  // Add wine to compare
  const addToCompare = useCallback((wineSlug) => {
    const wine = wines.find(w => w.slug === wineSlug);
    if (!wine) return;
    
    setCompareWines(prev => {
      // If already in compare, don't add
      if (prev.some(w => w?.slug === wineSlug)) return prev;
      // Add to first empty slot
      if (!prev[0]) return [wine, prev[1]];
      if (!prev[1]) return [prev[0], wine];
      // Replace second slot if both full
      return [prev[0], wine];
    });
    setCompareOpen(true);
  }, []);

  // Remove wine from compare
  const removeFromCompare = useCallback((slot) => {
    setCompareWines(prev => {
      const newCompare = [...prev];
      newCompare[slot] = null;
      return newCompare;
    });
  }, []);

  // Check if wine is in compare
  const isInCompare = useCallback((wineSlug) => {
    return compareWines.some(w => w?.slug === wineSlug);
  }, [compareWines]);

  // Clear compare
  const clearCompare = useCallback(() => {
    setCompareWines([null, null]);
  }, []);

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
    getFavoriteWines,
    compareWines,
    setCompareWines,
    compareOpen,
    setCompareOpen,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare
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
