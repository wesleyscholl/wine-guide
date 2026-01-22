import { useState } from 'react';
import WineGlossary from '../components/WineGlossary';
import FlavorWheel from '../components/FlavorWheel';

const LearnPage = () => {
  const [activeSection, setActiveSection] = useState('glossary');

  return (
    <div className="learn-page">
      <div className="learn-header">
        <h1>🎓 Wine Education</h1>
        <p>Everything you need to become a wine expert</p>
      </div>

      <div className="learn-nav">
        <button 
          className={`learn-nav-btn ${activeSection === 'glossary' ? 'active' : ''}`}
          onClick={() => setActiveSection('glossary')}
        >
          📖 Glossary
        </button>
        <button 
          className={`learn-nav-btn ${activeSection === 'flavors' ? 'active' : ''}`}
          onClick={() => setActiveSection('flavors')}
        >
          🎨 Flavor Wheel
        </button>
        <button 
          className={`learn-nav-btn ${activeSection === 'guide' ? 'active' : ''}`}
          onClick={() => setActiveSection('guide')}
        >
          🍷 Serving Guide
        </button>
      </div>

      <div className="learn-content">
        {activeSection === 'glossary' && <WineGlossary />}
        
        {activeSection === 'flavors' && (
          <div className="flavor-section">
            <FlavorWheel interactive={true} />
          </div>
        )}

        {activeSection === 'guide' && (
          <div className="serving-guide-section">
            <h2>🍷 Wine Serving Guide</h2>
            
            <div className="guide-cards">
              <div className="guide-card">
                <div className="guide-card-header red">
                  <span className="guide-icon">🔴</span>
                  <h3>Red Wine</h3>
                </div>
                <div className="guide-card-content">
                  <div className="guide-item">
                    <span className="item-label">🌡️ Temperature</span>
                    <span className="item-value">60-68°F (15-20°C)</span>
                    <p className="item-tip">Slightly below room temperature. Too warm and alcohol dominates.</p>
                  </div>
                  <div className="guide-item">
                    <span className="item-label">⏱️ Decanting</span>
                    <span className="item-value">30 min - 2 hours</span>
                    <p className="item-tip">Young, tannic wines benefit most. Older wines need just 15-30 min.</p>
                  </div>
                  <div className="guide-item">
                    <span className="item-label">🥂 Glass</span>
                    <span className="item-value">Large bowl, tapered rim</span>
                    <p className="item-tip">Allows swirling and directs aromas to your nose.</p>
                  </div>
                </div>
              </div>

              <div className="guide-card">
                <div className="guide-card-header white">
                  <span className="guide-icon">⚪</span>
                  <h3>White Wine</h3>
                </div>
                <div className="guide-card-content">
                  <div className="guide-item">
                    <span className="item-label">🌡️ Temperature</span>
                    <span className="item-value">45-55°F (7-13°C)</span>
                    <p className="item-tip">Crisp whites colder, oaked Chardonnay slightly warmer.</p>
                  </div>
                  <div className="guide-item">
                    <span className="item-label">⏱️ Decanting</span>
                    <span className="item-value">Usually not needed</span>
                    <p className="item-tip">Premium aged whites can benefit from 15-20 minutes.</p>
                  </div>
                  <div className="guide-item">
                    <span className="item-label">🥂 Glass</span>
                    <span className="item-value">Medium bowl, U-shaped</span>
                    <p className="item-tip">Smaller than red wine glasses to maintain temperature.</p>
                  </div>
                </div>
              </div>

              <div className="guide-card">
                <div className="guide-card-header sparkling">
                  <span className="guide-icon">✨</span>
                  <h3>Sparkling Wine</h3>
                </div>
                <div className="guide-card-content">
                  <div className="guide-item">
                    <span className="item-label">🌡️ Temperature</span>
                    <span className="item-value">40-50°F (4-10°C)</span>
                    <p className="item-tip">Well chilled. Vintage Champagne can be slightly warmer.</p>
                  </div>
                  <div className="guide-item">
                    <span className="item-label">⏱️ Decanting</span>
                    <span className="item-value">Never</span>
                    <p className="item-tip">Decanting removes the bubbles you paid for!</p>
                  </div>
                  <div className="guide-item">
                    <span className="item-label">🥂 Glass</span>
                    <span className="item-value">Tulip or white wine glass</span>
                    <p className="item-tip">Flutes are pretty but tulips show aromatics better.</p>
                  </div>
                </div>
              </div>

              <div className="guide-card">
                <div className="guide-card-header rose">
                  <span className="guide-icon">🌸</span>
                  <h3>Rosé Wine</h3>
                </div>
                <div className="guide-card-content">
                  <div className="guide-item">
                    <span className="item-label">🌡️ Temperature</span>
                    <span className="item-value">45-55°F (7-13°C)</span>
                    <p className="item-tip">Treat like white wine - refreshing when cold.</p>
                  </div>
                  <div className="guide-item">
                    <span className="item-label">⏱️ Decanting</span>
                    <span className="item-value">Not needed</span>
                    <p className="item-tip">Rosé is meant to be fresh and immediate.</p>
                  </div>
                  <div className="guide-item">
                    <span className="item-label">🥂 Glass</span>
                    <span className="item-value">White wine glass</span>
                    <p className="item-tip">Standard white wine glass works perfectly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pro-tips-section">
              <h3>🏆 Pro Tips</h3>
              <div className="pro-tips-grid">
                <div className="pro-tip">
                  <span className="tip-number">01</span>
                  <p>Store wine on its side to keep corks moist</p>
                </div>
                <div className="pro-tip">
                  <span className="tip-number">02</span>
                  <p>15 minutes in the fridge drops wine temp ~5°F</p>
                </div>
                <div className="pro-tip">
                  <span className="tip-number">03</span>
                  <p>Hold wine glasses by the stem, not the bowl</p>
                </div>
                <div className="pro-tip">
                  <span className="tip-number">04</span>
                  <p>Pour wine to the widest point of the glass only</p>
                </div>
                <div className="pro-tip">
                  <span className="tip-number">05</span>
                  <p>Re-cork leftover wine and refrigerate (even reds)</p>
                </div>
                <div className="pro-tip">
                  <span className="tip-number">06</span>
                  <p>Swirl wine clockwise to release aromas</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
