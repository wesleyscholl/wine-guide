import { createContext, useContext, useState, useEffect } from 'react';

const CellarContext = createContext();

export const useCellar = () => {
  const context = useContext(CellarContext);
  if (!context) {
    throw new Error('useCellar must be used within a CellarProvider');
  }
  return context;
};

export const CellarProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [tasted, setTasted] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [ratings, setRatings] = useState({});
  const [notes, setNotes] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('wine-cellar-favorites');
      const savedTasted = localStorage.getItem('wine-cellar-tasted');
      const savedWishlist = localStorage.getItem('wine-cellar-wishlist');
      const savedRatings = localStorage.getItem('wine-cellar-ratings');
      const savedNotes = localStorage.getItem('wine-cellar-notes');

      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      if (savedTasted) setTasted(JSON.parse(savedTasted));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedRatings) setRatings(JSON.parse(savedRatings));
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    } catch (e) {
      console.error('Error loading cellar data:', e);
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('wine-cellar-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('wine-cellar-tasted', JSON.stringify(tasted));
  }, [tasted]);

  useEffect(() => {
    localStorage.setItem('wine-cellar-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('wine-cellar-ratings', JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    localStorage.setItem('wine-cellar-notes', JSON.stringify(notes));
  }, [notes]);

  const toggleFavorite = (wineId) => {
    setFavorites(prev => 
      prev.includes(wineId) 
        ? prev.filter(id => id !== wineId)
        : [...prev, wineId]
    );
  };

  const toggleTasted = (wineId) => {
    setTasted(prev => 
      prev.includes(wineId)
        ? prev.filter(id => id !== wineId)
        : [...prev, wineId]
    );
  };

  const toggleWishlist = (wineId) => {
    setWishlist(prev => 
      prev.includes(wineId)
        ? prev.filter(id => id !== wineId)
        : [...prev, wineId]
    );
  };

  const setWineRating = (wineId, rating) => {
    setRatings(prev => ({ ...prev, [wineId]: rating }));
  };

  const setWineNotes = (wineId, note) => {
    setNotes(prev => ({ ...prev, [wineId]: note }));
  };

  const isFavorite = (wineId) => favorites.includes(wineId);
  const hasTasted = (wineId) => tasted.includes(wineId);
  const isWishlisted = (wineId) => wishlist.includes(wineId);
  const getWineRating = (wineId) => ratings[wineId] || 0;
  const getWineNotes = (wineId) => notes[wineId] || '';

  const getCellarStats = () => ({
    favoritesCount: favorites.length,
    tastedCount: tasted.length,
    wishlistCount: wishlist.length,
    totalRatings: Object.keys(ratings).length
  });

  const clearAllData = () => {
    setFavorites([]);
    setTasted([]);
    setWishlist([]);
    setRatings({});
    setNotes({});
  };

  return (
    <CellarContext.Provider value={{
      favorites,
      tasted,
      wishlist,
      ratings,
      notes,
      toggleFavorite,
      toggleTasted,
      toggleWishlist,
      setWineRating,
      setWineNotes,
      isFavorite,
      hasTasted,
      isWishlisted,
      getWineRating,
      getWineNotes,
      getCellarStats,
      clearAllData
    }}>
      {children}
    </CellarContext.Provider>
  );
};

export default CellarContext;
