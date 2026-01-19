import { useParams, Link, useNavigate } from 'react-router-dom';
import { useWines } from '../context/WineContext';
import WineDetail from '../components/WineDetail';
import { useEffect } from 'react';

export default function WineDetailPage() {
  const { slug } = useParams();
  const { getWineBySlug } = useWines();
  const navigate = useNavigate();
  
  const wine = getWineBySlug(slug);

  // Scroll to top when wine changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!wine) {
    return (
      <div className="not-found-page">
        <div className="container">
          <h1>Wine Not Found</h1>
          <p>Sorry, we couldn't find a wine with that name.</p>
          <Link to="/search" className="btn btn-primary">
            Browse All Wines →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wine-detail-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/search">All Wines</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{wine.name}</span>
        </nav>
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <WineDetail wine={wine} />
      </div>
    </div>
  );
}
