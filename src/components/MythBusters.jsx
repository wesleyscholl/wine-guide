import { Link } from 'react-router-dom';

const commonMistakes = [
  {
    id: 'temp',
    mistake: 'Serving wine at the wrong temperature',
    icon: '🌡️',
    reality: 'Most people serve reds too warm and whites too cold',
    fix: 'Reds: 60-65°F (slight chill). Whites: 45-50°F (not ice cold). Sparkling: 40-45°F.',
    impact: 'Temperature dramatically affects flavor perception—proper temp can make a $15 wine taste like $30.'
  },
  {
    id: 'price',
    mistake: 'Thinking expensive = better',
    icon: '💰',
    reality: 'Price reflects rarity, brand, and production costs—not necessarily quality',
    fix: 'Blind taste wines at different price points. You\'ll be surprised how often the $15 bottle wins.',
    impact: 'You can drink incredibly well for under $25 if you know where to look.'
  },
  {
    id: 'saving',
    mistake: 'Saving bottles for a "special occasion"',
    icon: '📅',
    reality: '95% of wines are made to drink within 1-3 years of release',
    fix: 'Unless it\'s a structured wine from a top producer, drink it now. The special occasion is tonight!',
    impact: 'Many bottles go past their prime while waiting for "the right moment."'
  },
  {
    id: 'pairing',
    mistake: 'Overthinking food pairings',
    icon: '🍝',
    reality: 'The old "rules" are guidelines, not laws',
    fix: 'Match weight (light food + light wine). If in doubt, rosé and sparkling pair with almost everything.',
    impact: 'Stressing about pairings ruins dinner. Trust your palate and relax.'
  },
  {
    id: 'ratings',
    mistake: 'Relying solely on point scores',
    icon: '📊',
    reality: 'Ratings reflect one critic\'s taste on one day. Your palate is different.',
    fix: 'Use ratings as a rough filter, but develop your own preferences through tasting.',
    impact: 'A 90-point wine you hate is worse than an 85-pointer you love.'
  },
  {
    id: 'snob',
    mistake: 'Wine snobbery',
    icon: '🧐',
    reality: 'There\'s no wrong way to enjoy wine',
    fix: 'Like it sweet? Great. Prefer ice cubes? Go for it. Life\'s too short for pretension.',
    impact: 'The best wine is the one you enjoy drinking, period.'
  }
];

const wineFacts = [
  { icon: '🍇', fact: 'There are over 10,000 wine grape varieties worldwide' },
  { icon: '🏛️', fact: 'The oldest winery dates back 6,100 years in Armenia' },
  { icon: '🗺️', fact: 'Wine grapes grow best between 30-50° latitude' },
  { icon: '⏰', fact: 'A grape vine takes 3-5 years to produce quality fruit' },
  { icon: '🍷', fact: 'The average wine bottle contains juice from 600-800 grapes' },
  { icon: '🧬', fact: 'Cabernet Sauvignon is a natural cross of Cabernet Franc × Sauvignon Blanc' }
];

const MythBusters = () => {
  return (
    <section className="mythbusters-section">
      <div className="myth-container">
        <div className="myth-header">
          <span className="myth-badge">🎓 WINE WISDOM</span>
          <h2>Common Wine Mistakes (And How to Avoid Them)</h2>
          <p>Level up your wine game by dodging these common pitfalls</p>
        </div>

        <div className="mistakes-grid">
          {commonMistakes.map(item => (
            <div key={item.id} className="mistake-card">
              <div className="mistake-header">
                <span className="mistake-icon">{item.icon}</span>
                <h3>{item.mistake}</h3>
              </div>
              
              <div className="mistake-body">
                <div className="mistake-section reality">
                  <span className="section-label">❌ The Reality:</span>
                  <p>{item.reality}</p>
                </div>
                
                <div className="mistake-section fix">
                  <span className="section-label">✅ The Fix:</span>
                  <p>{item.fix}</p>
                </div>
                
                <div className="mistake-section impact">
                  <span className="section-label">💡 Why It Matters:</span>
                  <p>{item.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fun-facts">
          <h3>🍷 Wine Facts to Impress Your Friends</h3>
          <div className="facts-ticker">
            {wineFacts.map((item, idx) => (
              <div key={idx} className="fact-item">
                <span className="fact-icon">{item.icon}</span>
                <span className="fact-text">{item.fact}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="myth-cta">
          <Link to="/learn" className="btn btn-myth">
            Continue Your Wine Education →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MythBusters;
