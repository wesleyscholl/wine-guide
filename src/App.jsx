import { Routes, Route } from 'react-router-dom';
import { WineProvider } from './context/WineContext';
import { CellarProvider } from './contexts/CellarContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WineDetailPage from './pages/WineDetailPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import WineCompare from './components/WineCompare';
import SommelierPage from './pages/SommelierPage';
import CellarPage from './pages/CellarPage';
import LearnPage from './pages/LearnPage';
import WineBoldnessPage from './pages/WineBoldnessPage';
import GrapeTypesPage from './pages/GrapeTypesPage';
import WineGlassesPage from './pages/WineGlassesPage';
import WineColorPage from './pages/WineColorPage';

function App() {
  return (
    <CellarProvider>
      <WineProvider>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/wine/:slug" element={<WineDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/sommelier" element={<SommelierPage />} />
              <Route path="/cellar" element={<CellarPage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/boldness-chart" element={<WineBoldnessPage />} />
              <Route path="/grape-types" element={<GrapeTypesPage />} />
              <Route path="/wine-glasses" element={<WineGlassesPage />} />
              <Route path="/wine-colors" element={<WineColorPage />} />
            </Routes>
          </main>
          <Footer />
          <WineCompare />
        </div>
      </WineProvider>
    </CellarProvider>
  );
}

export default App;
