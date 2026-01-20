import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Home Cook",
    avatar: "👩‍🍳",
    rating: 5,
    text: "This guide changed how I buy wine! Found amazing bottles for weeknight dinners that don't break the bank.",
    wine: "La Crema Pinot Noir",
    location: "Portland, OR"
  },
  {
    id: 2,
    name: "Marcus T.",
    role: "Wine Enthusiast",
    avatar: "👨‍💼",
    rating: 5,
    text: "Finally, a wine guide that speaks my language. No pretentious jargon, just honest recommendations.",
    wine: "Meiomi Chardonnay",
    location: "Austin, TX"
  },
  {
    id: 3,
    name: "Emily R.",
    role: "Party Planner",
    avatar: "🎉",
    rating: 5,
    text: "Hosted a dinner party and everyone asked about the wines. All came from this guide!",
    wine: "Gruet Brut",
    location: "Denver, CO"
  },
  {
    id: 4,
    name: "David L.",
    role: "New to Wine",
    avatar: "🍷",
    rating: 5,
    text: "As a beginner, I was overwhelmed at wine shops. This guide gave me confidence to try new things.",
    wine: "Josh Cellars Cabernet",
    location: "Chicago, IL"
  },
  {
    id: 5,
    name: "Jessica K.",
    role: "Date Night Expert",
    avatar: "💕",
    rating: 5,
    text: "My partner and I discovered our new favorite wines here. The pairing suggestions are spot-on!",
    wine: "Veuve du Vernay Brut",
    location: "Miami, FL"
  },
  {
    id: 6,
    name: "Robert H.",
    role: "BBQ Master",
    avatar: "🔥",
    rating: 5,
    text: "These wine pairings took my backyard cookouts to the next level. Friends are impressed!",
    wine: "Seghesio Zinfandel",
    location: "Nashville, TN"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonials-section">
      <div className="testimonials-background">
        <div className="testimonial-bubble b1">🍷</div>
        <div className="testimonial-bubble b2">⭐</div>
        <div className="testimonial-bubble b3">🍇</div>
      </div>

      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="testimonials-badge">💬 TESTIMONIALS</span>
          <h2 className="testimonials-title">
            What Wine Lovers Are Saying
          </h2>
          <p className="testimonials-subtitle">
            Join thousands who've found their perfect wines
          </p>
        </div>

        <div 
          className="testimonial-carousel"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <button className="carousel-btn prev" onClick={goToPrev}>
            <span>←</span>
          </button>

          <div className={`testimonial-card ${isAnimating ? 'animating' : ''}`}>
            <div className="testimonial-quote-icon">"</div>
            
            <div className="testimonial-content">
              <p className="testimonial-text">{currentTestimonial.text}</p>
              
              <div className="testimonial-wine-tag">
                <span className="wine-tag-icon">🍷</span>
                <span className="wine-tag-text">Favorite: {currentTestimonial.wine}</span>
              </div>
            </div>

            <div className="testimonial-author">
              <div className="author-avatar">
                <span>{currentTestimonial.avatar}</span>
              </div>
              <div className="author-info">
                <h4 className="author-name">{currentTestimonial.name}</h4>
                <p className="author-role">{currentTestimonial.role}</p>
                <p className="author-location">📍 {currentTestimonial.location}</p>
              </div>
              <div className="author-rating">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
            </div>
          </div>

          <button className="carousel-btn next" onClick={goToNext}>
            <span>→</span>
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="testimonials-stats">
          <div className="testimonial-stat">
            <span className="stat-number">10,000+</span>
            <span className="stat-text">Happy Wine Lovers</span>
          </div>
          <div className="testimonial-stat">
            <span className="stat-number">4.9/5</span>
            <span className="stat-text">Average Rating</span>
          </div>
          <div className="testimonial-stat">
            <span className="stat-number">125+</span>
            <span className="stat-text">Wines Reviewed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
