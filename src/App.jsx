import { Routes, Route } from 'react-router-dom';
import { WineProvider } from './context/WineContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WineDetailPage from './pages/WineDetailPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import WineCompare from './components/WineCompare';

function App() {
  return (
    <WineProvider>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wine/:slug" element={<WineDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
        <Footer />
        <WineCompare />
      </div>
    </WineProvider>
  );
}

export default App;
