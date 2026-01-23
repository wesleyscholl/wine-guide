import { useState, useMemo } from 'react';
import FlavorWheel from '../components/FlavorWheel';
import TastingSheetDownload from '../components/TastingSheetDownload';

const LearnPage = () => {
  // Glossary state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedTerm, setExpandedTerm] = useState(null);
  
  // Temperature guide state
  const [hoveredTemp, setHoveredTemp] = useState(null);

  // Expanded glossary terms (60+ terms)
  const glossaryTerms = [
    // Tasting Terms
    { term: 'Tannins', categories: ['Tasting', 'Production'], definition: 'Compounds from grape skins, seeds, and oak that create a dry, astringent sensation in red wines. They provide structure and aging potential.', example: 'A young Cabernet Sauvignon may have firm, grippy tannins that soften with age.' },
    { term: 'Acidity', categories: ['Tasting', 'Viticulture'], definition: 'The tartness or sourness in wine that provides freshness and balance. High acidity makes wines feel crisp and lively.', example: 'Sauvignon Blanc is known for its bright, citrusy acidity.' },
    { term: 'Body', categories: ['Tasting', 'Serving'], definition: 'The weight and texture of wine in your mouth, ranging from light to full. Influenced by alcohol, tannins, and extract.', example: 'Pinot Noir is typically light-bodied, while Syrah is full-bodied.' },
    { term: 'Finish', categories: ['Tasting', 'Aromas'], definition: 'The flavors and sensations that linger after swallowing. A long finish is generally considered a sign of quality.', example: 'Great wines may have a finish lasting 30+ seconds.' },
    { term: 'Legs', categories: ['Tasting', 'Serving'], definition: 'The droplets that form on the inside of a wine glass, indicating alcohol and glycerol content—not quality.', example: 'A high-alcohol wine like Amarone will have pronounced, slow-moving legs.' },
    { term: 'Bouquet', categories: ['Tasting', 'Aromas'], definition: 'The complex aromas that develop in wine through aging, as opposed to primary fruit aromas.', example: 'An aged Burgundy may develop bouquet notes of leather and truffle.' },
    { term: 'Nose', categories: ['Tasting', 'Aromas'], definition: 'The aroma or smell of a wine. Sommeliers often say "the nose" to describe what they smell.', example: 'This wine has a beautiful nose of dark berries and violets.' },
    { term: 'Palate', categories: ['Tasting', 'Aromas'], definition: 'The taste and mouthfeel of wine, or your personal ability to perceive flavors.', example: 'On the palate, this wine shows layers of cherry and spice.' },
    { term: 'Mouthfeel', categories: ['Tasting', 'Production'], definition: 'The physical sensations of wine in your mouth—weight, texture, astringency, and viscosity.', example: 'The wine has a silky mouthfeel with velvety tannins.' },
    { term: 'Balance', categories: ['Tasting', 'Production'], definition: 'When no single element dominates—fruit, acidity, tannins, alcohol, and oak work in harmony.', example: 'A well-balanced wine is enjoyable and food-friendly.' },
    { term: 'Complexity', categories: ['Tasting', 'Aromas'], definition: 'Multiple layers of aromas and flavors that evolve as you taste. A hallmark of fine wine.', example: 'Each sip reveals something new—that\'s complexity.' },
    { term: 'Structure', categories: ['Tasting', 'Production'], definition: 'The framework of a wine—its tannins, acidity, and alcohol that give it shape and aging potential.', example: 'This wine has the structure to age for 20 years.' },
    { term: 'Phenolics', categories: ['Tasting', 'Viticulture'], definition: 'Compounds including tannins and anthocyanins that contribute to color, flavor, and mouthfeel.', example: 'Thick-skinned grapes like Cabernet have high phenolic content.' },
    
    // Aroma Terms
    { term: 'Primary Aromas', categories: ['Aromas', 'Tasting'], definition: 'Aromas from the grape itself—fruit, floral, and herbal notes.', example: 'A Gewürztraminer\'s lychee and rose are primary aromas.' },
    { term: 'Secondary Aromas', categories: ['Aromas', 'Production'], definition: 'Aromas from fermentation—yeast, butter, bread, cheese notes.', example: 'Champagne\'s brioche note comes from yeast fermentation.' },
    { term: 'Tertiary Aromas', categories: ['Aromas', 'Production'], definition: 'Aromas from aging—leather, tobacco, earth, nuts, dried fruit.', example: 'An aged Rioja develops tertiary notes of tobacco and vanilla.' },
    { term: 'Volatile Aromas', categories: ['Aromas', 'Faults'], definition: 'Aromas that easily evaporate and reach your nose. More volatiles = more aromatic wine.', example: 'Muscat is highly aromatic due to abundant volatile compounds.' },
    { term: 'Reduction', categories: ['Aromas', 'Faults'], definition: 'Sulfur compounds creating struck match, rubber, or garlic aromas. Often dissipates with air.', example: 'Swirl a reductive wine vigorously to blow off the funk.' },
    
    // Viticulture Terms
    { term: 'Terroir', categories: ['Viticulture', 'Classification'], definition: 'The complete natural environment where grapes grow—soil, climate, topography—and how it influences wine character.', example: 'Burgundy\'s limestone terroir gives its wines distinctive minerality.' },
    { term: 'Brix', categories: ['Viticulture', 'Production'], definition: 'A measurement of sugar content in grapes, used to determine optimal harvest time.', example: 'Grapes are typically harvested at 22-26 Brix for dry wines.' },
    { term: 'Old Vines', categories: ['Viticulture', 'Classification'], definition: 'Grapevines typically 35+ years old. They produce fewer but more concentrated grapes.', example: '"Vieilles Vignes" on French labels indicates old vine wine.' },
    { term: 'Rootstock', categories: ['Viticulture', 'Production'], definition: 'The root portion of a grafted vine, typically American species resistant to phylloxera.', example: 'Nearly all European vines are grafted onto American rootstock.' },
    { term: 'Canopy Management', categories: ['Viticulture', 'Production'], definition: 'Techniques to optimize leaf and shoot growth for grape quality and vine health.', example: 'Leaf pulling exposes grapes to sunlight for better ripening.' },
    { term: 'Green Harvest', categories: ['Viticulture', 'Production'], definition: 'Removing unripe grape clusters to concentrate energy in remaining fruit.', example: 'Green harvesting reduces yield but increases quality.' },
    { term: 'Phylloxera', categories: ['Viticulture', 'Faults'], definition: 'A vine pest that devastated European vineyards in the 1800s. Solved by grafting onto resistant rootstock.', example: 'Phylloxera nearly destroyed all of Bordeaux in the 1870s.' },
    { term: 'Clone', categories: ['Viticulture', 'Classification'], definition: 'A vine propagated from a single parent plant, sharing identical genetics.', example: 'Dijon clones 667 and 777 are popular for Pinot Noir.' },
    
    // Production Terms
    { term: 'Vintage', categories: ['Production', 'Classification'], definition: 'The year the grapes were harvested. Vintage variation matters more in cooler climates where conditions vary yearly.', example: '2010 was an exceptional vintage in Bordeaux.' },
    { term: 'Malolactic Fermentation', categories: ['Production', 'Tasting'], definition: 'A secondary fermentation converting sharp malic acid to softer lactic acid, creating creamier, buttery wines.', example: 'Most red wines and oaked Chardonnays undergo malolactic fermentation.' },
    { term: 'Lees', categories: ['Production', 'Aromas'], definition: 'Dead yeast cells that settle after fermentation. Aging on lees adds complexity and creamy texture.', example: 'Muscadet Sur Lie is aged on its lees for added richness.' },
    { term: 'Oxidation', categories: ['Production', 'Faults'], definition: 'Wine\'s exposure to oxygen. Controlled oxidation adds complexity; too much causes spoilage.', example: 'Sherry\'s nutty flavors come from intentional oxidation.' },
    { term: 'Négociant', categories: ['Production', 'Classification'], definition: 'A wine merchant who buys grapes or wine from growers and bottles under their own label.', example: 'Louis Jadot is a famous Burgundy négociant.' },
    { term: 'Micro-oxygenation', categories: ['Production', 'Tasting'], definition: 'Controlled introduction of tiny oxygen amounts during winemaking to soften tannins.', example: 'Many modern wineries use micro-ox to make wines approachable younger.' },
    { term: 'Residual Sugar', categories: ['Production', 'Tasting'], definition: 'Grape sugar remaining after fermentation. Dry wines have less than 4g/L; sweet wines much more.', example: 'Most Rieslings have some residual sugar for balance.' },
    { term: 'Extraction', categories: ['Production', 'Tasting'], definition: 'The process of drawing color, tannins, and flavor from grape skins during winemaking.', example: 'Extended maceration increases extraction in red wines.' },
    { term: 'Cold Soak', categories: ['Production', 'Aromas'], definition: 'Pre-fermentation maceration at low temperatures to extract color and fruit character without tannins.', example: 'Pinot Noir often benefits from a cold soak.' },
    { term: 'Bâtonnage', categories: ['Production', 'Tasting'], definition: 'Stirring lees in barrel to add richness and protect against oxidation.', example: 'Weekly bâtonnage gives Burgundian Chardonnay its creamy texture.' },
    { term: 'Racking', categories: ['Production', 'Serving'], definition: 'Transferring wine from one vessel to another, leaving sediment behind.', example: 'Racking clarifies wine and introduces small amounts of oxygen.' },
    { term: 'Fining', categories: ['Production', 'Serving'], definition: 'Clarifying wine by adding agents (egg whites, bentonite) that bind to particles and settle out.', example: 'Egg white fining softens harsh tannins in red wines.' },
    { term: 'Carbonic Maceration', categories: ['Production', 'Aromas'], definition: 'Whole-grape fermentation in CO2, creating fruity, low-tannin wines.', example: 'Beaujolais Nouveau uses carbonic maceration for its juicy style.' },
    
    // Classification Terms
    { term: 'Appellation', categories: ['Classification', 'Viticulture'], definition: 'A legally defined wine-growing region with specific rules about grape varieties, yields, and winemaking practices.', example: 'Champagne can only come from the Champagne appellation in France.' },
    { term: 'Cru', categories: ['Classification', 'Viticulture'], definition: 'French term meaning "growth," used to classify vineyards by quality. Grand Cru is the highest classification.', example: 'Château Margaux is a Premier Grand Cru Classé.' },
    { term: 'Varietal', categories: ['Classification', 'Viticulture'], definition: 'A wine named after its grape variety, rather than its region of origin.', example: 'California wines are typically labeled by varietal (Chardonnay, Cabernet).' },
    { term: 'Reserve', categories: ['Classification', 'Production'], definition: 'A term suggesting higher quality, though its meaning varies by country. Legally defined in Spain and Italy.', example: 'Rioja Reserva must age 3 years with 1 year in barrel.' },
    { term: 'Grand Vin', categories: ['Classification', 'Production'], definition: 'The primary or flagship wine of an estate, made from the best vineyard selections.', example: 'Château Latour\'s Grand Vin is separate from Les Forts de Latour.' },
    { term: 'DOC/DOCG', categories: ['Classification', 'Serving'], definition: 'Italian quality classifications. DOCG (Denominazione di Origine Controllata e Garantita) is highest.', example: 'Barolo is DOCG, while Langhe Nebbiolo is DOC.' },
    { term: 'AOC/AOP', categories: ['Classification', 'Production'], definition: 'French quality classification (Appellation d\'Origine Contrôlée/Protégée) guaranteeing origin and methods.', example: 'Châteauneuf-du-Pape AOC has 18 permitted grape varieties.' },
    { term: 'IGT/IGP', categories: ['Classification', 'Production'], definition: 'Geographic indication with fewer restrictions than DOC/AOC, allowing more winemaker freedom.', example: 'Super Tuscans are often labeled as IGT Toscana.' },
    
    // Serving Terms
    { term: 'Decanting', categories: ['Serving', 'Production'], definition: 'Pouring wine into a separate vessel to expose it to oxygen or separate it from sediment.', example: 'Young tannic reds benefit from 1-2 hours of decanting.' },
    { term: 'Sommelier', categories: ['Serving', 'Classification'], definition: 'A trained wine professional who specializes in wine service, pairing, and cellar management.', example: 'A Master Sommelier has passed one of the world\'s most difficult exams.' },
    { term: 'Vertical Tasting', categories: ['Serving', 'Tasting'], definition: 'Tasting different vintages of the same wine to understand vintage variation and aging.', example: 'A vertical of Opus One from 2010-2020 shows the estate\'s evolution.' },
    { term: 'Horizontal Tasting', categories: ['Serving', 'Tasting'], definition: 'Tasting different wines from the same vintage or region for comparison.', example: 'A horizontal of 2019 Napa Cabernets compares different producers.' },
    { term: 'Blind Tasting', categories: ['Serving', 'Tasting'], definition: 'Tasting wine without knowing what it is, removing bias to assess purely on sensory experience.', example: 'Sommeliers train with blind tastings to sharpen their skills.' },
    { term: 'Flight', categories: ['Serving', 'Tasting'], definition: 'A set of wines served together for comparison, typically 3-6 wines.', example: 'We\'ll start with a flight of Burgundy from different villages.' },
    
    // Faults
    { term: 'Corked', categories: ['Faults', 'Aromas'], definition: 'Wine contaminated by TCA (trichloroanisole), causing musty, wet cardboard aromas. Affects ~2-3% of cork-sealed wines.', example: 'If your wine smells like wet newspaper, it may be corked.' },
    { term: 'Bretty', categories: ['Faults', 'Aromas'], definition: 'Aromas from Brettanomyces yeast—barnyard, band-aid, or horse stable. Low levels can add complexity; high levels are faulty.', example: 'Some Rhône and Burgundy wines have detectable brett character.' },
    { term: 'Volatile Acidity', categories: ['Faults', 'Tasting'], definition: 'Acetic acid in wine. Low levels add complexity; high levels smell like vinegar.', example: 'VA above 1.2 g/L is generally considered faulty.' },
    { term: 'Maderized', categories: ['Faults', 'Serving'], definition: 'Wine damaged by heat exposure, showing cooked, caramelized flavors and brown color.', example: 'Wine left in a hot car will likely be maderized.' },
    { term: 'Oxidized', categories: ['Faults', 'Aromas'], definition: 'Wine overexposed to oxygen, losing freshness and developing brown color and flat flavors.', example: 'An oxidized white wine looks brownish and tastes nutty/stale.' },
    { term: 'Sulfur', categories: ['Faults', 'Production'], definition: 'Excess sulfur dioxide causing burning matches or rubber aromas. Usually dissipates with aeration.', example: 'Swirl the wine vigorously to blow off excess sulfur.' },
    { term: 'Heat Damage', categories: ['Faults', 'Serving'], definition: 'Wine that was stored at high temperatures, showing cooked fruit and often a pushed cork.', example: 'A protruding cork is a warning sign of heat damage.' },
    
    // 10 New Terms
    { term: 'Minerality', categories: ['Tasting', 'Viticulture'], definition: 'Flavors suggesting wet stones, chalk, or flint. Often attributed to vineyard soil but debated among experts.', example: 'Chablis is famous for its flinty, mineral character from Kimmeridgian limestone.' },
    { term: 'Oenology', categories: ['Production', 'Classification'], definition: 'The science and study of winemaking, from grape to bottle.', example: 'An oenologist oversees all technical aspects of wine production.' },
    { term: 'Maceration', categories: ['Production', 'Tasting'], definition: 'Contact between grape juice and skins to extract color, tannins, and flavor compounds.', example: 'Extended maceration can last 30+ days for intense red wines.' },
    { term: 'Botrytis', categories: ['Viticulture', 'Aromas'], definition: 'A beneficial fungus ("noble rot") that concentrates sugars in grapes, creating luscious dessert wines.', example: 'Sauternes relies on Botrytis cinerea for its honeyed sweetness.' },
    { term: 'Meritage', categories: ['Classification', 'Production'], definition: 'American term for Bordeaux-style blends using traditional varieties like Cabernet Sauvignon and Merlot.', example: 'Opus One is one of California\'s most famous Meritage wines.' },
    { term: 'Assemblage', categories: ['Production', 'Classification'], definition: 'The French term for blending different grape varieties, vineyards, or vintages into a final wine.', example: 'Champagne houses create consistent style through careful assemblage.' },
    { term: 'Élevage', categories: ['Production', 'Aromas'], definition: 'The "raising" or maturation of wine between fermentation and bottling, including barrel aging.', example: 'Careful élevage develops complexity in fine Burgundy.' },
    { term: 'Flor', categories: ['Production', 'Aromas'], definition: 'A layer of yeast that forms on certain wines, protecting them from oxidation while adding unique flavors.', example: 'Fino Sherry develops under flor, giving it a distinctive yeasty tang.' },
    { term: 'Ullage', categories: ['Serving', 'Faults'], definition: 'The air space between wine and cork in a bottle. Excessive ullage indicates evaporation or leakage.', example: 'High ullage in an old bottle is a warning sign of potential oxidation.' },
    { term: 'Punt', categories: ['Serving', 'Production'], definition: 'The indentation at the bottom of a wine bottle, which aids stability and sediment collection.', example: 'Champagne bottles have deep punts to withstand internal pressure.' },
  ];

  const categories = [...new Set(glossaryTerms.flatMap(t => t.categories))];

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = searchQuery === '' || 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || term.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory]);

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Tasting': '👅', 'Aromas': '👃', 'Viticulture': '🍇', 'Production': '🏭',
      'Classification': '🏷️', 'Serving': '🍷', 'Faults': '⚠️'
    };
    return emojis[category] || '📚';
  };

  return (
    <div className="learn-page">
      <div className="learn-header">
        <h1>🎓 Wine Education Center</h1>
        <p>Your complete guide to understanding and appreciating wine</p>
      </div>

      {/* How to Taste Wine Section */}
      <section className="learn-section tasting-steps-section">
        <h2>🍷 The 5 S's of Wine Tasting</h2>
        <p className="section-intro">Master the art of tasting wine like a professional sommelier</p>
        
        <div className="tasting-download-section">
          <TastingSheetDownload />
          <span className="download-hint">Print & use while tasting!</span>
        </div>
        
        <div className="tasting-steps">
          <div className="tasting-step">
            <div className="step-visual">
              <svg viewBox="0 0 80 80" className="step-svg">
                {/* SEE - Eye examining wine glass */}
                {/* Wine glass */}
                <path d="M40 75 L40 55 M32 75 L48 75" stroke="#722F37" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M25 35 Q25 55 40 55 Q55 55 55 35" fill="none" stroke="#722F37" strokeWidth="2.5"/>
                <ellipse cx="40" cy="35" rx="15" ry="5" fill="none" stroke="#722F37" strokeWidth="2.5"/>
                {/* Wine fill */}
                <path d="M27 42 Q27 53 40 53 Q53 53 53 42 Q53 38 40 38 Q27 38 27 42" fill="rgba(114, 47, 55, 0.3)"/>
                {/* Eye above */}
                <ellipse cx="40" cy="15" rx="14" ry="8" fill="none" stroke="#722F37" strokeWidth="2"/>
                <circle cx="40" cy="15" r="5" fill="#722F37"/>
                <circle cx="42" cy="13" r="2" fill="white"/>
                {/* Looking lines */}
                <line x1="40" y1="23" x2="40" y2="28" stroke="#722F37" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.5"/>
              </svg>
            </div>
            <div className="step-content">
              <div className="step-number">1</div>
              <h3>See</h3>
              <p>Hold your glass against a white background and tilt it. Observe the color, clarity, and viscosity. Color can indicate age, grape variety, and style.</p>
              <div className="step-tips">
                <span>🔴 Red wines lighten with age (ruby → garnet → brick)</span>
                <span>⚪ White wines deepen with age (pale → gold → amber)</span>
              </div>
            </div>
          </div>
          
          <div className="tasting-step">
            <div className="step-visual">
              <svg viewBox="0 0 80 80" className="step-svg">
                {/* SWIRL - Glass with circular motion */}
                {/* Wine glass */}
                <path d="M40 75 L40 55 M32 75 L48 75" stroke="#722F37" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M25 35 Q25 55 40 55 Q55 55 55 35" fill="none" stroke="#722F37" strokeWidth="2.5"/>
                <ellipse cx="40" cy="35" rx="15" ry="5" fill="none" stroke="#722F37" strokeWidth="2.5"/>
                {/* Tilted wine with wave effect */}
                <path d="M28 45 Q35 40 40 45 Q45 50 52 45" fill="none" stroke="rgba(114, 47, 55, 0.6)" strokeWidth="3" strokeLinecap="round"/>
                {/* Circular arrows around glass */}
                <path d="M18 40 A25 25 0 0 1 40 15" fill="none" stroke="#722F37" strokeWidth="2" strokeLinecap="round"/>
                <polygon points="40,12 36,18 44,18" fill="#722F37"/>
                <path d="M62 40 A25 25 0 0 1 40 65" fill="none" stroke="#722F37" strokeWidth="2" strokeLinecap="round"/>
                <polygon points="40,68 36,62 44,62" fill="#722F37"/>
              </svg>
            </div>
            <div className="step-content">
              <div className="step-number">2</div>
              <h3>Swirl</h3>
              <p>Gently swirl the wine to release volatile aromatic compounds. This introduces oxygen and helps the wine "open up."</p>
              <div className="step-tips">
                <span>🌀 Rest the base on a table for stability</span>
                <span>⏱️ 5-10 seconds is usually enough</span>
              </div>
            </div>
          </div>
          
          <div className="tasting-step">
            <div className="step-visual">
              <svg viewBox="0 0 80 80" className="step-svg">
                {/* SNIFF - Nose over glass with aroma waves */}
                {/* Wine glass */}
                <path d="M40 75 L40 58 M32 75 L48 75" stroke="#722F37" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M28 42 Q28 58 40 58 Q52 58 52 42" fill="none" stroke="#722F37" strokeWidth="2.5"/>
                <ellipse cx="40" cy="42" rx="12" ry="4" fill="none" stroke="#722F37" strokeWidth="2.5"/>
                {/* Wine fill */}
                <path d="M30 48 Q30 56 40 56 Q50 56 50 48 Q50 45 40 45 Q30 45 30 48" fill="rgba(114, 47, 55, 0.3)"/>
                {/* Nose */}
                <path d="M40 8 C35 8 32 15 33 22 C33 26 37 28 40 28 C43 28 47 26 47 22 C48 15 45 8 40 8" fill="#f5e6d3" stroke="#d4a574" strokeWidth="1.5"/>
                {/* Nostrils */}
                <circle cx="37" cy="24" r="2" fill="#d4a574"/>
                <circle cx="43" cy="24" r="2" fill="#d4a574"/>
                {/* Aroma waves */}
                <path d="M32 38 Q30 34 34 32" fill="none" stroke="#722F37" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                <path d="M40 36 Q38 31 42 29" fill="none" stroke="#722F37" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
                <path d="M48 38 Q50 34 46 32" fill="none" stroke="#722F37" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              </svg>
            </div>
            <div className="step-content">
              <div className="step-number">3</div>
              <h3>Sniff</h3>
              <p>Put your nose in the glass and take short sniffs. Identify primary (fruit), secondary (fermentation), and tertiary (aging) aromas.</p>
              <div className="step-tips">
                <span>👃 First impression is often most accurate</span>
                <span>🔄 Take breaks—your nose fatigues quickly</span>
              </div>
            </div>
          </div>
          
          <div className="tasting-step">
            <div className="step-visual">
              <svg viewBox="0 0 80 80" className="step-svg">
                {/* SIP - Tilted glass toward lips */}
                {/* Tilted wine glass */}
                <g transform="rotate(-30, 40, 50)">
                  <path d="M40 70 L40 55 M34 70 L46 70" stroke="#722F37" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M28 38 Q28 55 40 55 Q52 55 52 38" fill="none" stroke="#722F37" strokeWidth="2.5"/>
                  <ellipse cx="40" cy="38" rx="12" ry="4" fill="none" stroke="#722F37" strokeWidth="2.5"/>
                  {/* Wine */}
                  <path d="M30 46 Q30 53 40 53 Q50 53 50 46 Q50 43 40 43 Q30 43 30 46" fill="rgba(114, 47, 55, 0.4)"/>
                </g>
                {/* Lips */}
                <ellipse cx="62" cy="28" rx="10" ry="5" fill="#e8c4b8" stroke="#d4a574" strokeWidth="1.5"/>
                <path d="M54 28 Q62 24 70 28" fill="none" stroke="#c4947a" strokeWidth="1.5"/>
                <path d="M54 28 Q62 32 70 28" fill="none" stroke="#c4947a" strokeWidth="1"/>
                {/* Wine droplet */}
                <circle cx="48" cy="32" r="3" fill="rgba(114, 47, 55, 0.6)"/>
              </svg>
            </div>
            <div className="step-content">
              <div className="step-number">4</div>
              <h3>Sip</h3>
              <p>Take a small sip and let it coat your entire mouth. Draw in a little air to release more flavors. Notice the body, tannins, acidity, and sweetness.</p>
              <div className="step-tips">
                <span>🫗 Roll the wine around your mouth</span>
                <span>💨 The "slurp" aerates wine on your palate</span>
              </div>
            </div>
          </div>
          
          <div className="tasting-step">
            <div className="step-visual">
              <svg viewBox="0 0 80 80" className="step-svg">
                {/* SAVOR - Satisfied face with timer */}
                {/* Face circle */}
                <circle cx="40" cy="32" r="22" fill="#f5e6d3" stroke="#d4a574" strokeWidth="2"/>
                {/* Closed happy eyes */}
                <path d="M30 28 Q34 24 38 28" fill="none" stroke="#722F37" strokeWidth="2" strokeLinecap="round"/>
                <path d="M42 28 Q46 24 50 28" fill="none" stroke="#722F37" strokeWidth="2" strokeLinecap="round"/>
                {/* Content smile */}
                <path d="M32 38 Q40 46 48 38" fill="none" stroke="#722F37" strokeWidth="2" strokeLinecap="round"/>
                {/* Cheek blush */}
                <circle cx="26" cy="35" r="4" fill="rgba(114, 47, 55, 0.2)"/>
                <circle cx="54" cy="35" r="4" fill="rgba(114, 47, 55, 0.2)"/>
                {/* Stopwatch below */}
                <circle cx="40" cy="66" r="10" fill="none" stroke="#722F37" strokeWidth="2"/>
                <line x1="40" y1="66" x2="40" y2="60" stroke="#722F37" strokeWidth="2" strokeLinecap="round"/>
                <line x1="40" y1="66" x2="46" y2="68" stroke="#722F37" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="38" y="54" width="4" height="3" fill="#722F37" rx="1"/>
              </svg>
            </div>
            <div className="step-content">
              <div className="step-number">5</div>
              <h3>Savor</h3>
              <p>After swallowing (or spitting), notice the finish—the flavors that linger. A long, pleasant finish often indicates quality.</p>
              <div className="step-tips">
                <span>⏱️ Great wines have 30+ second finishes</span>
                <span>📝 Note what you taste and feel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smell Guide */}
      <section className="learn-section smell-section">
        <h2>👃 The Olfactory Guide</h2>
        <p className="section-intro">Your nose is wine's greatest interpreter—80% of "taste" is actually smell</p>
        
        <div className="smell-anatomy">
          <div className="nose-diagram">
            <svg viewBox="0 0 120 160" className="nose-svg">
              {/* Side profile nose - more realistic */}
              {/* Face outline/context */}
              <path d="M20 10 Q20 40 30 60" fill="none" stroke="#d4a574" strokeWidth="1.5" opacity="0.5"/>
              
              {/* Nose bridge */}
              <path d="M30 20 C35 25 40 45 42 65 C44 80 50 95 55 100" 
                    fill="none" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round"/>
              
              {/* Nose tip and nostril area */}
              <path d="M55 100 C60 105 65 110 60 115 C55 120 45 118 40 115 C35 112 30 105 35 100" 
                    fill="#f5e6d3" stroke="#8B4513" strokeWidth="2"/>
              
              {/* Nostril */}
              <ellipse cx="48" cy="112" rx="6" ry="4" fill="#c4947a"/>
              
              {/* Nasal cavity (cross-section indicator) */}
              <path d="M42 65 C38 70 35 85 38 100" fill="none" stroke="#d4a574" strokeWidth="1" strokeDasharray="3,2"/>
              
              {/* Olfactory region - top of nasal cavity */}
              <ellipse cx="35" cy="50" rx="8" ry="5" fill="#722F37" opacity="0.6"/>
              <text x="60" y="50" fontSize="8" fill="#722F37" fontWeight="500">Olfactory</text>
              <text x="60" y="60" fontSize="8" fill="#722F37" fontWeight="500">Region</text>
              
              {/* Aroma path arrows */}
              <path d="M70 130 Q55 125 50 115" fill="none" stroke="#722F37" strokeWidth="1.5" strokeDasharray="4,2"/>
              <polygon points="52,117 48,113 54,114" fill="#722F37"/>
              
              {/* Arrow continuing up nasal passage */}
              <path d="M45 110 Q40 90 37 55" fill="none" stroke="#722F37" strokeWidth="1.5" strokeDasharray="4,2"/>
              <polygon points="37,58 34,50 40,52" fill="#722F37"/>
              
              {/* Wine glass hint */}
              <path d="M85 145 L85 135 M80 145 L90 145" stroke="#722F37" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M78 125 Q78 135 85 135 Q92 135 92 125" fill="none" stroke="#722F37" strokeWidth="1.5"/>
              <ellipse cx="85" cy="125" rx="7" ry="3" fill="none" stroke="#722F37" strokeWidth="1.5"/>
              
              {/* Aroma waves from glass */}
              <path d="M82 120 Q80 115 84 112" fill="none" stroke="#722F37" strokeWidth="1" opacity="0.6"/>
              <path d="M88 120 Q90 115 86 112" fill="none" stroke="#722F37" strokeWidth="1" opacity="0.6"/>
              
              {/* Label */}
              <text x="60" y="155" textAnchor="middle" fontSize="9" fill="#666">Orthonasal Route</text>
            </svg>
          </div>
          
          <div className="smell-info">
            <div className="smell-route">
              <h4>👃 Orthonasal Smelling</h4>
              <p>Breathing in through your nose—what you do when you sniff the glass. Captures volatile aromas rising from the wine.</p>
              <div className="route-tip">Best for: First impressions, identifying fruit and floral notes</div>
            </div>
            
            <div className="smell-route">
              <h4>👄 Retronasal Smelling</h4>
              <p>Aromas that travel from your mouth up to your nasal cavity while tasting. This is why you "taste" more with wine in your mouth.</p>
              <div className="route-tip">Best for: Detecting subtle spices, earth, and complexity</div>
            </div>
            
            <div className="smell-facts">
              <h4>🧠 Did You Know?</h4>
              <ul>
                <li>Humans can distinguish over <strong>1 trillion</strong> different scents</li>
                <li>Wine contains <strong>200+ aromatic compounds</strong></li>
                <li>Your olfactory memory is the <strong>longest-lasting</strong> type of memory</li>
                <li>Women typically have <strong>more olfactory neurons</strong> than men</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="aroma-categories">
          <h3>The Three Categories of Wine Aromas</h3>
          <div className="aroma-grid">
            <div className="aroma-card primary">
              <h4>🍇 Primary Aromas</h4>
              <p>From the grape itself—influenced by variety and terroir</p>
              <div className="aroma-examples">
                <span>🍒 Fruits</span>
                <span>🌸 Flowers</span>
                <span>🌿 Herbs</span>
                <span>🫑 Peppers</span>
              </div>
              <div className="aroma-wines">Found in: Young, fruit-forward wines</div>
            </div>
            
            <div className="aroma-card secondary">
              <h4>🥖 Secondary Aromas</h4>
              <p>From fermentation and winemaking processes</p>
              <div className="aroma-examples">
                <span>🧈 Butter</span>
                <span>🍞 Bread</span>
                <span>🧀 Cheese</span>
                <span>🥜 Yeast</span>
              </div>
              <div className="aroma-wines">Found in: Champagne, oaked Chardonnay</div>
            </div>
            
            <div className="aroma-card tertiary">
              <h4>🍂 Tertiary Aromas</h4>
              <p>From aging in bottle or barrel—complexity develops over time</p>
              <div className="aroma-examples">
                <span>🍄 Earth</span>
                <span>🚬 Tobacco</span>
                <span>🍮 Vanilla</span>
                <span>🥜 Nuts</span>
              </div>
              <div className="aroma-wines">Found in: Aged Bordeaux, Rioja, Barolo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tongue/Taste Guide */}
      <section className="learn-section tongue-section">
        <h2>👅 The Taste Guide</h2>
        <p className="section-intro">Understanding how your tongue perceives wine's fundamental components</p>
        
        <div className="tongue-content">
          <div className="tongue-diagram">
            <svg viewBox="0 0 200 280" className="tongue-svg">
              {/* Tongue shape */}
              <path d="M100 20 Q40 40 30 100 Q25 160 40 200 Q60 250 100 270 Q140 250 160 200 Q175 160 170 100 Q160 40 100 20" 
                    fill="#e8a0a0" stroke="#c77070" strokeWidth="2"/>
              
              {/* Bitter zone (back) */}
              <ellipse cx="100" cy="60" rx="45" ry="25" fill="#9b59b6" opacity="0.5"/>
              <text x="100" y="65" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">Bitter</text>
              
              {/* Sour zones (sides) */}
              <ellipse cx="55" cy="130" rx="20" ry="45" fill="#f1c40f" opacity="0.5"/>
              <text x="55" y="135" textAnchor="middle" fontSize="10" fill="#333" fontWeight="bold">Sour</text>
              <ellipse cx="145" cy="130" rx="20" ry="45" fill="#f1c40f" opacity="0.5"/>
              <text x="145" y="135" textAnchor="middle" fontSize="10" fill="#333" fontWeight="bold">Sour</text>
              
              {/* Salty zones */}
              <ellipse cx="70" cy="200" rx="18" ry="25" fill="#3498db" opacity="0.5"/>
              <text x="70" y="205" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">Salty</text>
              <ellipse cx="130" cy="200" rx="18" ry="25" fill="#3498db" opacity="0.5"/>
              <text x="130" y="205" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">Salty</text>
              
              {/* Sweet zone (tip) */}
              <ellipse cx="100" cy="240" rx="35" ry="20" fill="#e74c3c" opacity="0.5"/>
              <text x="100" y="245" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">Sweet</text>
              
              {/* Umami (center) */}
              <ellipse cx="100" cy="150" rx="30" ry="35" fill="#2ecc71" opacity="0.4"/>
              <text x="100" y="155" textAnchor="middle" fontSize="10" fill="#333" fontWeight="bold">Umami</text>
            </svg>
            <p className="diagram-note">⚠️ Note: The "tongue map" is actually a myth! All taste buds can detect all tastes, but some areas are slightly more sensitive.</p>
          </div>
          
          <div className="taste-info">
            <div className="taste-element">
              <div className="taste-header sweet-header">
                <span className="taste-icon">🍬</span>
                <h4>Sweet</h4>
              </div>
              <p>Residual sugar from grapes. Even "dry" wines can have trace sweetness that adds richness.</p>
              <div className="wine-examples">
                <strong>Wines:</strong> Moscato, Riesling (sweet styles), Port, Sauternes
              </div>
            </div>
            
            <div className="taste-element">
              <div className="taste-header sour-header">
                <span className="taste-icon">🍋</span>
                <h4>Sour/Acidic</h4>
              </div>
              <p>Tartness that makes your mouth water. Essential for freshness, balance, and food pairing.</p>
              <div className="wine-examples">
                <strong>High acid wines:</strong> Sauvignon Blanc, Riesling, Champagne, Sangiovese
              </div>
            </div>
            
            <div className="taste-element">
              <div className="taste-header bitter-header">
                <span className="taste-icon">🫒</span>
                <h4>Bitter</h4>
              </div>
              <p>Often from tannins or grape skins. Provides structure and complexity, especially in reds.</p>
              <div className="wine-examples">
                <strong>Wines:</strong> Nebbiolo, young Cabernet, Amarone, Barolo
              </div>
            </div>
            
            <div className="taste-element">
              <div className="taste-header umami-header">
                <span className="taste-icon">🍖</span>
                <h4>Umami</h4>
              </div>
              <p>Savory depth from aging, lees contact, or certain grapes. Think "meaty" or "brothy."</p>
              <div className="wine-examples">
                <strong>Wines:</strong> Aged Champagne, Burgundy, Sherry, aged Barolo
              </div>
            </div>
            
            <div className="taste-element">
              <div className="taste-header tannin-header">
                <span className="taste-icon">🫖</span>
                <h4>Tannin (Astringency)</h4>
              </div>
              <p>Not a taste but a texture—the drying, gripping sensation on gums and tongue.</p>
              <div className="wine-examples">
                <strong>High tannin:</strong> Cabernet Sauvignon, Nebbiolo, Tannat, Sagrantino
              </div>
            </div>
            
            <div className="taste-element">
              <div className="taste-header alcohol-header">
                <span className="taste-icon">🔥</span>
                <h4>Alcohol (Heat)</h4>
              </div>
              <p>Warming sensation, especially noticeable in high-alcohol wines (14%+).</p>
              <div className="wine-examples">
                <strong>High alcohol:</strong> Zinfandel, Amarone, Châteauneuf-du-Pape
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flavor Wheel Section */}
      <section className="learn-section flavor-wheel-section">
        <h2>🎨 Wine Flavor Wheel</h2>
        <p className="section-intro">Explore the universe of wine flavors—click categories to dive deeper</p>
        <div className="flavor-section">
          <FlavorWheel interactive={true} />
        </div>
      </section>

      {/* Serving Guide Section */}
      <section className="learn-section serving-guide-section">
        <h2>🍷 Wine Serving Guide</h2>
        <p className="section-intro">Temperature, decanting, and glassware for optimal enjoyment</p>
        
        <div className="temp-guide-container">
          {/* Thermometer Visual */}
          <div className="thermometer-container">
            <div className="thermometer">
              <div className="temp-tube">
                {/* Red Wine Zone - 60-68°F */}
                <div 
                  className={`temp-zone red-zone ${hoveredTemp === 'red' ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredTemp('red')}
                  onMouseLeave={() => setHoveredTemp(null)}
                  style={{ top: '0%', height: '27%' }}
                >
                  <span className="zone-marker">🔴</span>
                </div>
                {/* Light Red / Full White Zone - 55-60°F */}
                <div 
                  className={`temp-zone overlap-zone ${hoveredTemp === 'light-red' ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredTemp('light-red')}
                  onMouseLeave={() => setHoveredTemp(null)}
                  style={{ top: '27%', height: '16%' }}
                >
                  <span className="zone-marker">🟠</span>
                </div>
                {/* Rosé Zone - 50-55°F */}
                <div 
                  className={`temp-zone rose-zone ${hoveredTemp === 'rose' ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredTemp('rose')}
                  onMouseLeave={() => setHoveredTemp(null)}
                  style={{ top: '43%', height: '14%' }}
                >
                  <span className="zone-marker">🌸</span>
                </div>
                {/* White Wine Zone - 45-50°F */}
                <div 
                  className={`temp-zone white-zone ${hoveredTemp === 'white' ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredTemp('white')}
                  onMouseLeave={() => setHoveredTemp(null)}
                  style={{ top: '57%', height: '17%' }}
                >
                  <span className="zone-marker">⚪</span>
                </div>
                {/* Sparkling Zone - 40-45°F */}
                <div 
                  className={`temp-zone sparkling-zone ${hoveredTemp === 'sparkling' ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredTemp('sparkling')}
                  onMouseLeave={() => setHoveredTemp(null)}
                  style={{ top: '74%', height: '26%' }}
                >
                  <span className="zone-marker">✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wine Type Cards */}
          <div className="temp-wine-cards">
            <div 
              className={`temp-wine-card ${hoveredTemp === 'red' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredTemp('red')}
              onMouseLeave={() => setHoveredTemp(null)}
            >
              <div className="temp-card-header red">
                <span className="temp-icon">🔴</span>
                <div className="temp-card-title">
                  <h4>Full-Bodied Reds</h4>
                  <span className="temp-range">60-68°F (15-20°C)</span>
                </div>
              </div>
              <div className="temp-card-body">
                <p className="wine-examples">Cabernet, Syrah, Malbec, Barolo</p>
                <p className="temp-tip">Slightly below room temp—too warm makes alcohol harsh</p>
                <div className="temp-extras">
                  <span>⏱️ Decant 1-2 hrs</span>
                  <span>🥂 Large bowl glass</span>
                </div>
              </div>
            </div>

            <div 
              className={`temp-wine-card ${hoveredTemp === 'light-red' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredTemp('light-red')}
              onMouseLeave={() => setHoveredTemp(null)}
            >
              <div className="temp-card-header light-red">
                <span className="temp-icon">🟠</span>
                <div className="temp-card-title">
                  <h4>Light Reds & Full Whites</h4>
                  <span className="temp-range">55-60°F (13-15°C)</span>
                </div>
              </div>
              <div className="temp-card-body">
                <p className="wine-examples">Pinot Noir, Beaujolais, Oaked Chardonnay</p>
                <p className="temp-tip">A brief chill brings out fruit and freshness</p>
                <div className="temp-extras">
                  <span>⏱️ Decant 30 min</span>
                  <span>🥂 Burgundy glass</span>
                </div>
              </div>
            </div>

            <div 
              className={`temp-wine-card ${hoveredTemp === 'rose' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredTemp('rose')}
              onMouseLeave={() => setHoveredTemp(null)}
            >
              <div className="temp-card-header rose">
                <span className="temp-icon">🌸</span>
                <div className="temp-card-title">
                  <h4>Rosé Wines</h4>
                  <span className="temp-range">50-55°F (10-13°C)</span>
                </div>
              </div>
              <div className="temp-card-body">
                <p className="wine-examples">Provence Rosé, White Zinfandel, Rosato</p>
                <p className="temp-tip">Between red and white—bridges both worlds</p>
                <div className="temp-extras">
                  <span>⏱️ No decanting</span>
                  <span>🥂 White wine glass</span>
                </div>
              </div>
            </div>

            <div 
              className={`temp-wine-card ${hoveredTemp === 'white' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredTemp('white')}
              onMouseLeave={() => setHoveredTemp(null)}
            >
              <div className="temp-card-header white">
                <span className="temp-icon">⚪</span>
                <div className="temp-card-title">
                  <h4>White Wines</h4>
                  <span className="temp-range">45-50°F (7-10°C)</span>
                </div>
              </div>
              <div className="temp-card-body">
                <p className="wine-examples">Sauvignon Blanc, Riesling, Pinot Grigio</p>
                <p className="temp-tip">Colder = crisper; preserves bright acidity</p>
                <div className="temp-extras">
                  <span>⏱️ No decanting</span>
                  <span>🥂 Smaller bowl glass</span>
                </div>
              </div>
            </div>

            <div 
              className={`temp-wine-card ${hoveredTemp === 'sparkling' ? 'active' : ''}`}
              onMouseEnter={() => setHoveredTemp('sparkling')}
              onMouseLeave={() => setHoveredTemp(null)}
            >
              <div className="temp-card-header sparkling">
                <span className="temp-icon">✨</span>
                <div className="temp-card-title">
                  <h4>Sparkling Wines</h4>
                  <span className="temp-range">40-45°F (4-7°C)</span>
                </div>
              </div>
              <div className="temp-card-body">
                <p className="wine-examples">Champagne, Prosecco, Cava, Crémant</p>
                <p className="temp-tip">Well chilled—keeps bubbles lively</p>
                <div className="temp-extras">
                  <span>⏱️ Never decant!</span>
                  <span>🥂 Tulip glass</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pro-tips-section">
          <h3>🏆 Pro Tips</h3>
          <div className="pro-tips-grid">
            <div className="pro-tip">
              <span className="tip-icon">🍾</span>
              <p>Store wine on its side to keep corks moist</p>
            </div>
            <div className="pro-tip">
              <span className="tip-icon">❄️</span>
              <p>15 minutes in the fridge drops wine temp ~5°F</p>
            </div>
            <div className="pro-tip">
              <span className="tip-icon">🤌</span>
              <p>Hold wine glasses by the stem, not the bowl</p>
            </div>
            <div className="pro-tip">
              <span className="tip-icon">🫗</span>
              <p>Pour wine to the widest point of the glass only</p>
            </div>
            <div className="pro-tip">
              <span className="tip-icon">🔄</span>
              <p>Re-cork leftover wine and refrigerate (even reds)</p>
            </div>
            <div className="pro-tip">
              <span className="tip-icon">⏳</span>
              <p>A wine left open loses freshness within 3-5 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wine Faults Quick Reference */}
      <section className="learn-section faults-section">
        <h2>⚠️ Wine Faults: What to Watch For</h2>
        <p className="section-intro">Not every unusual character is a fault—but here's how to spot real problems</p>
        
        <div className="faults-grid">
          <div className="fault-card">
            <span className="fault-icon">📰</span>
            <h4>Corked (TCA)</h4>
            <p>Wet cardboard, musty basement, damp dog smell. Caused by contaminated cork. Affects 1-3% of cork-sealed wines.</p>
            <div className="fault-action">Action: Return it—this is the most common legitimate fault.</div>
          </div>
          <div className="fault-card">
            <span className="fault-icon">🐴</span>
            <h4>Brett</h4>
            <p>Barnyard, band-aid, sweaty horse. From Brettanomyces yeast. Low levels can add complexity; high levels are faulty.</p>
            <div className="fault-action">Action: Subjective—some love it, some hate it.</div>
          </div>
          <div className="fault-card">
            <span className="fault-icon">🧪</span>
            <h4>Volatile Acidity</h4>
            <p>Nail polish remover, vinegar smell. Some VA is normal; excess indicates bacterial spoilage.</p>
            <div className="fault-action">Action: Minor VA may blow off; strong VA is faulty.</div>
          </div>
          <div className="fault-card">
            <span className="fault-icon">🔥</span>
            <h4>Heat Damage</h4>
            <p>Cooked, jammy, stewed fruit. Cork may be pushed out. Wine was stored too hot.</p>
            <div className="fault-action">Action: Check for pushed cork before opening.</div>
          </div>
          <div className="fault-card">
            <span className="fault-icon">🥜</span>
            <h4>Oxidation</h4>
            <p>Brown color, flat/stale flavors, sherry-like notes in non-sherry wines. Too much oxygen exposure.</p>
            <div className="fault-action">Action: Often from poor storage or old age.</div>
          </div>
          <div className="fault-card">
            <span className="fault-icon">🧲</span>
            <h4>Reduction</h4>
            <p>Struck match, rubber, onion, garlic. Opposite of oxidation—too little oxygen.</p>
            <div className="fault-action">Action: Often blows off with aggressive swirling.</div>
          </div>
        </div>
      </section>

      {/* Glossary Section */}
      <section className="learn-section glossary-section">
        <div className="glossary-container">
          <div className="glossary-header">
            <span className="glossary-icon">📖</span>
            <h2>Wine Glossary</h2>
            <p>Master the language of wine with {glossaryTerms.length} essential terms</p>
          </div>

          <div className="glossary-controls">
            <div className="glossary-search">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            <div className="category-filters">
              <button
                className={`category-filter ${selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('All')}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-filter ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {getCategoryEmoji(cat)} {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="glossary-stats">
            <span>{filteredTerms.length} terms</span>
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>

          <div className="glossary-grid">
            {filteredTerms.map(item => (
              <div 
                key={item.term}
                className={`glossary-card ${expandedTerm === item.term ? 'expanded' : ''}`}
                onClick={() => setExpandedTerm(expandedTerm === item.term ? null : item.term)}
              >
                <div className="card-header">
                  <div className="term-categories">
                    {item.categories.map(cat => (
                      <span key={cat} className="term-category-tag">
                        <span className="term-category-emoji">{getCategoryEmoji(cat)}</span>
                        <span className="term-category">{cat}</span>
                      </span>
                    ))}
                  </div>
                  <h3 className="term-name">{item.term}</h3>
                </div>
                
                <p className="term-definition">{item.definition}</p>
                
                {expandedTerm === item.term && item.example && (
                  <div className="term-example">
                    <span className="example-label">Example:</span>
                    <p>{item.example}</p>
                  </div>
                )}

                <span className="expand-indicator">
                  {expandedTerm === item.term ? '−' : '+'}
                </span>
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">🤔</span>
              <p>No terms found matching your search</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Continue Learning */}
      <section className="learn-section continue-section">
        <h2>📚 Continue Your Journey</h2>
        <div className="continue-links">
          <a href="/wine-guide/grape-types" className="continue-card">
            <span className="continue-icon">🍇</span>
            <h4>Grape Types</h4>
            <p>Explore 150+ grape varieties</p>
          </a>
          <a href="/wine-guide/boldness-chart" className="continue-card">
            <span className="continue-icon">📊</span>
            <h4>Body & Sweetness</h4>
            <p>Understand wine weight and sugar</p>
          </a>
          <a href="/wine-guide/wine-glasses" className="continue-card">
            <span className="continue-icon">🥂</span>
            <h4>Glassware Guide</h4>
            <p>Choose the right glass</p>
          </a>
          <a href="/wine-guide/search" className="continue-card">
            <span className="continue-icon">🍷</span>
            <h4>Explore Wines</h4>
            <p>Browse our collection</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default LearnPage;
