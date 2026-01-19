import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>🍷 Wine Guide</h4>
          <p>Your no-nonsense guide to great wines under $40. No ratings, no pretension—just solid picks you'll actually enjoy.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">All Wines</Link></li>
            <li><Link to="/search?type=red">Red Wines</Link></li>
            <li><Link to="/search?type=white">White Wines</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/search?category=weeknight-red">Weeknight Reds</Link></li>
            <li><Link to="/search?category=dinner-party">Dinner Party</Link></li>
            <li><Link to="/search?category=beginner">Beginner Friendly</Link></li>
            <li><Link to="/search?category=sparkling">Sparkling</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Disclaimer</h4>
          <p className="disclaimer">Please drink responsibly. This guide is for educational purposes. Prices and availability may vary by location.</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Wine Guide. Made with 🍷 and good taste.</p>
      </div>
    </footer>
  );
}
