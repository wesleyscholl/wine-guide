import { useWines } from '../context/WineContext';
import CategoryCard from '../components/CategoryCard';
import WineCard from '../components/WineCard';
import SearchBar from '../components/SearchBar';
import WineQuiz from '../components/WineQuiz';
import WineOfTheDay from '../components/WineOfTheDay';
import AnimatedStats from '../components/AnimatedStats';
import WinePairingGame from '../components/WinePairingGame';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import RegionExplorer from '../components/RegionExplorer';
import { FloatingBubbles, FloatingGlasses, WineStain, Sparkles } from '../components/FloatingElements';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { categories, wines, getWinesByCategory } = useWines();

  // Get featured wines (one from each main category)
  const featuredWines = wines.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <FloatingBubbles count={15} />
        <FloatingGlasses />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-icon">🍷</span>
            Wine Guide
          </h1>
          <p className="hero-subtitle">
            Your no-nonsense guide to great wines under $40.<br />
            No ratings, no pretension—just solid picks you'll actually enjoy.
          </p>
          <SearchBar />
          <Link to="/search" className="browse-all-btn">
            Just browsing? See all wines →
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy">
        <WineStain position="left" color="red" />
        <WineStain position="right" color="rose" />
        <div className="container">
          <h2>Our Philosophy</h2>
          <div className="philosophy-grid stagger-children">
            <div className="philosophy-card hover-lift">
              <span className="philosophy-icon">💰</span>
              <h3>Budget-Friendly</h3>
              <p>Every wine under $40. Most under $25. Because great wine shouldn't require a second mortgage.</p>
            </div>
            <div className="philosophy-card hover-lift">
              <span className="philosophy-icon">🎯</span>
              <h3>Occasion-Based</h3>
              <p>Organized by when you'll drink it, not by pretentious regions or scores.</p>
            </div>
            <div className="philosophy-card hover-lift">
              <span className="philosophy-icon">✅</span>
              <h3>Actually Available</h3>
              <p>Wines you can actually find at stores near you. No unicorn bottles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <AnimatedStats />

      {/* Wine of the Day Section */}
      <WineOfTheDay />

      {/* Categories Section */}
      <section className="categories-section animated-bg">
        <div className="container">
          <h2>Browse by Occasion</h2>
          <p className="section-subtitle">Pick your scenario, we'll pick the wine.</p>
          <div className="categories-grid stagger-children">
            {categories.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category}
                wineCount={getWinesByCategory(category.id).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Wine Quiz Section */}
      <section className="quiz-section">
        <div className="container">
          <WineQuiz />
        </div>
      </section>

      {/* Wine Pairing Game Section */}
      <section className="pairing-game-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
            🎮 Test Your Skills
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-text-light)' }}>
            Think you know your pairings? Put your wine knowledge to the test!
          </p>
          <WinePairingGame />
        </div>
      </section>

      {/* Region Explorer Section */}
      <RegionExplorer />

      {/* Featured Wines Section */}
      <section className="featured-section">
        <Sparkles count={8} />
        <div className="container">
          <h2>Featured Picks</h2>
          <p className="section-subtitle">Our current favorites across all categories.</p>
          <div className="wines-grid stagger-children">
            {featuredWines.map(wine => (
              <WineCard key={wine.id} wine={wine} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/search" className="btn btn-primary btn-glow">
              View All Wines →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Guide Section */}
      <section className="quick-guide">
        <div className="container">
          <h2>Quick Guide</h2>
          <div className="guide-grid stagger-children">
            <div className="guide-card hover-lift">
              <h3>🥩 Having Steak?</h3>
              <p>Go with a bold red like Quinta do Crasto Douro or Catena Malbec.</p>
            </div>
            <div className="guide-card hover-lift">
              <h3>🦐 Seafood Night?</h3>
              <p>Grab a crisp white like Burgans Albariño or Muscadet.</p>
            </div>
            <div className="guide-card hover-lift">
              <h3>🎉 Celebrating?</h3>
              <p>Segura Viudas Cava offers Champagne vibes at 1/4 the price.</p>
            </div>
            <div className="guide-card hover-lift">
              <h3>🌱 New to Wine?</h3>
              <p>Start with Kim Crawford Sauvignon Blanc or Georges Duboeuf Beaujolais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="pro-tips-section">
        <div className="container">
          <h2>Pro Tips for Beginners</h2>
          <div className="tips-grid stagger-children">
            <div className="tip-card hover-lift">
              <span className="tip-number">1</span>
              <h3>Temperature Matters</h3>
              <p>Whites: refrigerator cold. Reds: slightly below room temp (60-65°F). Sparkling: ice cold.</p>
            </div>
            <div className="tip-card hover-lift">
              <span className="tip-number">2</span>
              <h3>Glassware Isn't Everything</h3>
              <p>A clean glass is better than a dirty fancy glass. Start simple.</p>
            </div>
            <div className="tip-card hover-lift">
              <span className="tip-number">3</span>
              <h3>Trust Your Palate</h3>
              <p>If you like it, it's good wine. Don't let anyone tell you otherwise.</p>
            </div>
            <div className="tip-card hover-lift">
              <span className="tip-number">4</span>
              <h3>Open It</h3>
              <p>Most wines under $40 are meant to be enjoyed now, not cellared for decades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />
    </div>
  );
}
