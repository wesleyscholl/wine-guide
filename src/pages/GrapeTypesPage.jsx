import React, { useState, useMemo } from 'react';
import './GrapeTypesPage.css';

const GrapeTypesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrape, setSelectedGrape] = useState(null);
  const [bodyFilter, setBodyFilter] = useState('all');

  // Comprehensive grape data organized by type
  const grapes = {
    red: [
      // Light-bodied reds
      { name: 'Brachetto', body: 'light', origin: 'Piedmont, Italy', description: 'Aromatic, slightly sweet with strawberry and rose notes. Often made sparkling.', food: 'Chocolate, fruit desserts', characteristics: ['Sweet', 'Aromatic', 'Low Tannin'] },
      { name: 'Frappato', body: 'light', origin: 'Sicily, Italy', description: 'Light, fresh with cherry and herbs. Often blended with Nero d\'Avola.', food: 'Fish, light pasta', characteristics: ['Fresh', 'Fruity', 'Herbal'] },
      { name: 'Gamay', body: 'light', origin: 'Burgundy, France', description: 'The grape of Beaujolais. Bright cherry, banana, and violet notes with low tannins.', food: 'Charcuterie, roast chicken', characteristics: ['Fruity', 'Low Tannin', 'High Acid'] },
      { name: 'Lambrusco', body: 'light', origin: 'Emilia-Romagna, Italy', description: 'Sparkling red ranging from dry to sweet. Cherry, violet, and strawberry flavors.', food: 'Pizza, cured meats', characteristics: ['Sparkling', 'Fruity', 'Versatile'] },
      { name: 'Schiava', body: 'light', origin: 'Alto Adige, Italy', description: 'Delicate with cotton candy, almond, and cherry notes. Also called Trollinger.', food: 'Light appetizers, salads', characteristics: ['Delicate', 'Aromatic', 'Light'] },
      { name: 'Zweigelt', body: 'light', origin: 'Austria', description: 'Austria\'s most planted red. Cherry and spice with soft tannins.', food: 'Pork, duck', characteristics: ['Cherry', 'Spicy', 'Approachable'] },
      { name: 'Cinsault', body: 'light', origin: 'Southern France', description: 'Light, perfumed with red fruits. Key component in Châteauneuf-du-Pape blends.', food: 'Mediterranean cuisine', characteristics: ['Perfumed', 'Soft', 'Blending'] },
      { name: 'Pinot Noir', body: 'light', origin: 'Burgundy, France', description: 'The noble red of Burgundy. Red cherry, earth, and mushroom. Ethereal and elegant.', food: 'Salmon, duck, mushrooms', characteristics: ['Elegant', 'Complex', 'Silky'] },
      { name: 'St. Laurent', body: 'light', origin: 'Austria', description: 'Related to Pinot Noir. Dark cherry, spice with velvety texture.', food: 'Game birds, beef', characteristics: ['Velvety', 'Spicy', 'Dark Fruit'] },
      { name: 'Nerello Mascalese', body: 'light', origin: 'Sicily, Italy', description: 'Volcanic soils of Mt. Etna. Cherry, herbs, and mineral with high acidity.', food: 'Grilled fish, pasta', characteristics: ['Mineral', 'High Acid', 'Elegant'] },
      { name: 'Castelão', body: 'light', origin: 'Portugal', description: 'Strawberry and herb notes. Major variety in Setúbal and Tejo.', food: 'Seafood, light meats', characteristics: ['Herbal', 'Strawberry', 'Fresh'] },
      { name: 'Carménère', body: 'light-medium', origin: 'Chile (orig. Bordeaux)', description: 'Lost Bordeaux variety reborn in Chile. Green pepper, cherry, and spice.', food: 'Grilled vegetables, steak', characteristics: ['Herbaceous', 'Smooth', 'Savory'] },
      { name: 'Valpolicella', body: 'light', origin: 'Veneto, Italy', description: 'Blend of Corvina, Rondinella, Molinara. Cherry and almond notes.', food: 'Pasta, risotto', characteristics: ['Cherry', 'Almond', 'Bitter'] },
      
      // Medium-bodied reds
      { name: 'Bobal', body: 'medium', origin: 'Spain', description: 'Spain\'s third most planted. Dark fruit, violet, and earth.', food: 'Paella, grilled meats', characteristics: ['Earthy', 'Dark Fruit', 'Value'] },
      { name: 'Carignan', body: 'medium', origin: 'Southern France/Spain', description: 'High-yielding, best from old vines. Cranberry, licorice, and spice.', food: 'Stews, cassoulet', characteristics: ['Rustic', 'Tannic', 'Spicy'] },
      { name: 'Blaufränkisch', body: 'medium', origin: 'Austria/Germany', description: 'Dark cherry, pepper, and earth. Austria\'s answer to Pinot Noir.', food: 'Beef, game', characteristics: ['Peppery', 'Earthy', 'Structured'] },
      { name: 'Cabernet Franc', body: 'medium', origin: 'Loire Valley, France', description: 'Parent of Cabernet Sauvignon. Raspberry, bell pepper, and graphite.', food: 'Lamb, roasted vegetables', characteristics: ['Herbaceous', 'Fresh', 'Elegant'] },
      { name: 'Concord', body: 'medium', origin: 'United States', description: 'Native American grape. Intense "grape jelly" flavor. Often sweet.', food: 'Desserts, casual sipping', characteristics: ['Foxy', 'Sweet', 'Aromatic'] },
      { name: 'Agiorgitiko', body: 'medium', origin: 'Greece', description: 'Greece\'s noble red from Nemea. Plum, spice, and soft tannins.', food: 'Lamb, moussaka', characteristics: ['Plummy', 'Spicy', 'Velvety'] },
      { name: 'Baga', body: 'medium', origin: 'Portugal', description: 'Tannic and acidic. Ages beautifully with dark fruit and earth.', food: 'Roast suckling pig', characteristics: ['Tannic', 'Age-worthy', 'Intense'] },
      { name: 'Barbera', body: 'medium', origin: 'Piedmont, Italy', description: 'High acid, low tannin. Dark cherry and dried herbs.', food: 'Tomato-based pasta, pizza', characteristics: ['High Acid', 'Fruity', 'Versatile'] },
      { name: 'Bonarda', body: 'medium', origin: 'Argentina', description: 'Argentina\'s second grape. Plum, fig, and soft tannins.', food: 'Grilled meats, empanadas', characteristics: ['Soft', 'Plummy', 'Easy-drinking'] },
      { name: 'Dolcetto', body: 'medium', origin: 'Piedmont, Italy', description: 'Despite meaning "little sweet one," it\'s dry. Purple fruit, licorice.', food: 'Antipasti, pasta', characteristics: ['Bitter Almond', 'Fruity', 'Early-drinking'] },
      { name: 'Grenache', body: 'medium', origin: 'Spain/France', description: 'Strawberry, leather, and spice. Key in Southern Rhône and Priorat.', food: 'Roasted meats, Mediterranean', characteristics: ['Fruity', 'Spicy', 'High Alcohol'] },
      { name: 'Mencía', body: 'medium', origin: 'Spain', description: 'Bierzo\'s star. Floral, mineral, with red and blue fruits.', food: 'Octopus, pork', characteristics: ['Floral', 'Mineral', 'Fresh'] },
      { name: 'Merlot', body: 'medium', origin: 'Bordeaux, France', description: 'Plum, chocolate, and soft tannins. The approachable Bordeaux grape.', food: 'Beef, lamb, mushrooms', characteristics: ['Plummy', 'Soft', 'Approachable'] },
      { name: 'Montepulciano', body: 'medium', origin: 'Abruzzo, Italy', description: 'Not to be confused with Vino Nobile. Dark cherry, spice, and earth.', food: 'Lamb, hard cheese', characteristics: ['Rustic', 'Dark Fruit', 'Value'] },
      { name: 'Nebbiolo', body: 'medium', origin: 'Piedmont, Italy', description: 'The king of Italian grapes. Rose, tar, cherry, and powerful tannins.', food: 'Truffle pasta, braised meats', characteristics: ['Tannic', 'Aromatic', 'Age-worthy'] },
      { name: 'Negroamaro', body: 'medium', origin: 'Puglia, Italy', description: 'Dark and bitter (as name suggests). Prune, earth, and tobacco.', food: 'Grilled lamb, aged cheese', characteristics: ['Bitter', 'Dark', 'Rustic'] },
      { name: 'Rhône/GSM Blend', body: 'medium', origin: 'Rhône Valley, France', description: 'Grenache, Syrah, Mourvèdre blend. Complex, spicy, with red and dark fruits.', food: 'Grilled meats, stews', characteristics: ['Complex', 'Spicy', 'Full'] },
      { name: 'Sangiovese', body: 'medium', origin: 'Tuscany, Italy', description: 'Chianti\'s grape. Sour cherry, tomato, leather, and herbs.', food: 'Pasta with red sauce, steak', characteristics: ['High Acid', 'Tannic', 'Savory'] },
      { name: 'Tempranillo', body: 'medium', origin: 'Rioja, Spain', description: 'Spain\'s noble grape. Leather, tobacco, cherry, and vanilla from oak.', food: 'Lamb, cured meats', characteristics: ['Earthy', 'Leathery', 'Oak-friendly'] },
      { name: 'Xinomavro', body: 'medium', origin: 'Greece', description: 'Greece\'s Nebbiolo. High acid, high tannin. Tomato, olive, and spice.', food: 'Lamb, goat', characteristics: ['Tannic', 'Acidic', 'Complex'] },
      
      // Full-bodied reds
      { name: 'Aglianico', body: 'full', origin: 'Southern Italy', description: 'One of Italy\'s most age-worthy. Dark fruit, smoke, and firm tannins.', food: 'Rich stews, aged cheese', characteristics: ['Powerful', 'Tannic', 'Complex'] },
      { name: 'Alicante Bouschet', body: 'full', origin: 'France/Portugal/Spain', description: 'Rare teinturier (red flesh). Intense color and dark fruit.', food: 'Game, hearty stews', characteristics: ['Intense', 'Dark', 'Powerful'] },
      { name: 'Bordeaux Blend', body: 'full', origin: 'Bordeaux, France', description: 'Cabernet Sauvignon, Merlot, Cabernet Franc. The world\'s classic blend.', food: 'Lamb, beef, hard cheese', characteristics: ['Structured', 'Complex', 'Age-worthy'] },
      { name: 'Cabernet Sauvignon', body: 'full', origin: 'Bordeaux, France', description: 'The king of reds. Cassis, cedar, and firm tannins. Ages beautifully.', food: 'Steak, lamb, aged cheese', characteristics: ['Tannic', 'Full', 'Age-worthy'] },
      { name: 'Malbec', body: 'full', origin: 'Argentina (orig. Cahors)', description: 'Plum, blackberry, chocolate, and violet. Argentina\'s flagship grape.', food: 'Grilled beef, empanadas', characteristics: ['Plummy', 'Velvety', 'Rich'] },
      { name: 'Monastrell', body: 'full', origin: 'Spain (Mourvèdre)', description: 'Also Mourvèdre. Blackberry, meat, and earth. Major in Jumilla.', food: 'BBQ, game', characteristics: ['Meaty', 'Rustic', 'Full'] },
      { name: 'Nero d\'Avola', body: 'full', origin: 'Sicily, Italy', description: 'Sicily\'s signature grape. Dark fruit, spice, and chocolate.', food: 'Grilled meats, hard cheese', characteristics: ['Rich', 'Spicy', 'Warming'] },
      { name: 'Petit Verdot', body: 'full', origin: 'Bordeaux, France', description: 'Deep color, violet, and firm tannins. Blending grape gaining solo fame.', food: 'Rich beef dishes', characteristics: ['Intense', 'Floral', 'Tannic'] },
      { name: 'Petite Sirah', body: 'full', origin: 'California (orig. France)', description: 'Also Durif. Inky, intense with blueberry, black pepper, and chocolate.', food: 'BBQ, braised short ribs', characteristics: ['Inky', 'Powerful', 'Peppery'] },
      { name: 'Pinotage', body: 'full', origin: 'South Africa', description: 'Pinot Noir × Cinsault cross. Unique smoky, earthy, and dark fruit profile.', food: 'Braai (BBQ), game', characteristics: ['Smoky', 'Earthy', 'Unique'] },
      { name: 'Sagrantino', body: 'full', origin: 'Umbria, Italy', description: 'Most tannic grape in the world. Blackberry, leather, and espresso.', food: 'Wild boar, aged cheese', characteristics: ['Extremely Tannic', 'Powerful', 'Intense'] },
      { name: 'Syrah', body: 'full', origin: 'Northern Rhône, France', description: 'Dark fruit, black pepper, and smoke. Shiraz in Australia is riper.', food: 'Lamb, game, pepper steak', characteristics: ['Peppery', 'Dark', 'Savory'] },
      { name: 'Tannat', body: 'full', origin: 'Uruguay (orig. France)', description: 'Extremely tannic. Dark fruit, leather, and robust structure.', food: 'Rich beef stews', characteristics: ['Very Tannic', 'Powerful', 'Age-worthy'] },
      { name: 'Touriga Nacional', body: 'full', origin: 'Portugal', description: 'Portugal\'s flagship. Floral, violet, dark fruit. Key in Port.', food: 'Rich stews, strong cheese', characteristics: ['Floral', 'Concentrated', 'Complex'] },
      { name: 'Zinfandel', body: 'full', origin: 'California', description: 'Same as Primitivo. Jammy, high alcohol with raspberry and pepper.', food: 'BBQ, pizza, burgers', characteristics: ['Jammy', 'High Alcohol', 'Bold'] },
      
      // Additional lesser-known reds
      { name: 'Corvina', body: 'medium', origin: 'Veneto, Italy', description: 'Main grape of Amarone. Cherry, almond, and chocolate when dried.', food: 'Rich pasta, risotto', characteristics: ['Cherry', 'Versatile', 'Drying-friendly'] },
      { name: 'Graciano', body: 'medium', origin: 'Rioja, Spain', description: 'Aromatic blending partner. Violet, licorice, and high acidity.', food: 'Lamb, game', characteristics: ['Aromatic', 'Acidic', 'Complex'] },
      { name: 'Mourvèdre', body: 'full', origin: 'Provence, France', description: 'Meaty, earthy with dark fruit. Key in Bandol rosé and reds.', food: 'Grilled lamb, herbs', characteristics: ['Meaty', 'Earthy', 'Structured'] },
      { name: 'Primitivo', body: 'full', origin: 'Puglia, Italy', description: 'Same as Zinfandel. Rich, jammy with prune and spice.', food: 'BBQ, grilled meats', characteristics: ['Rich', 'Jammy', 'High Alcohol'] },
      { name: 'Refosco', body: 'medium', origin: 'Friuli, Italy', description: 'Wild berry, pepper, and almond. Rustic and age-worthy.', food: 'Game, hard cheese', characteristics: ['Rustic', 'Peppery', 'Wild'] },
      { name: 'Teroldego', body: 'medium', origin: 'Trentino, Italy', description: 'Dark and brooding with blackberry, violet, and bitter almond.', food: 'Speck, aged cheese', characteristics: ['Dark', 'Bitter', 'Intense'] },
      { name: 'Trollinger', body: 'light', origin: 'Germany', description: 'Same as Schiava. Light, fruity, everyday drinking wine.', food: 'Light dishes, cheese', characteristics: ['Light', 'Fresh', 'Simple'] },
      { name: 'Dornfelder', body: 'medium', origin: 'Germany', description: 'Modern German cross. Deep color, cherry, and soft tannins.', food: 'Pork, duck', characteristics: ['Fruity', 'Soft', 'Approachable'] },
      { name: 'Lemberger', body: 'medium', origin: 'Germany/Washington', description: 'Same as Blaufränkisch. Dark cherry and pepper.', food: 'Game, beef', characteristics: ['Peppery', 'Cherry', 'Spicy'] },
      { name: 'Norton', body: 'full', origin: 'United States', description: 'Native American variety. Dark, tannic, distinctive character.', food: 'BBQ, grilled meats', characteristics: ['Distinctive', 'Tannic', 'Native'] },
      { name: 'Chambourcin', body: 'medium', origin: 'France/US', description: 'French-American hybrid. Dark fruit, smoke, versatile.', food: 'Grilled meats', characteristics: ['Hybrid', 'Dark', 'Versatile'] },
      { name: 'Pais', body: 'light', origin: 'Chile', description: 'Ancient grape also called Listán Prieto. Light, rustic, and fresh.', food: 'Simple foods', characteristics: ['Rustic', 'Light', 'Historic'] },
      { name: 'Crljenak Kaštelanski', body: 'full', origin: 'Croatia', description: 'Croatian ancestor of Zinfandel. Rich and powerful.', food: 'Grilled meats', characteristics: ['Rich', 'Ancestral', 'Powerful'] },
      { name: 'Kadarka', body: 'medium', origin: 'Hungary', description: 'Spicy, light, in Bull\'s Blood blend. Pepper and cherry.', food: 'Goulash', characteristics: ['Spicy', 'Peppery', 'Traditional'] },
      { name: 'Mavrud', body: 'full', origin: 'Bulgaria', description: 'Bulgaria\'s pride. Dark, tannic, with blackberry and spice.', food: 'Rich stews', characteristics: ['Powerful', 'Tannic', 'Dark'] },
      { name: 'Sapevari', body: 'medium', origin: 'Georgia', description: 'Often made in qvevri (clay vessels). Dark, tannic, historic.', food: 'Traditional Georgian', characteristics: ['Historic', 'Tannic', 'Unique'] },
      { name: 'Plavac Mali', body: 'full', origin: 'Croatia', description: 'Zinfandel relative. Dark fruit, dried herbs, and high alcohol.', food: 'Grilled fish, lamb', characteristics: ['Powerful', 'High Alcohol', 'Dark'] },
    ],
    
    white: [
      // Light-bodied whites
      { name: 'Prosecco', body: 'light', origin: 'Veneto, Italy', description: 'Actually Glera grape. Green apple, pear, and floral. Charmat method sparkling.', food: 'Aperitivo, light appetizers', characteristics: ['Sparkling', 'Fresh', 'Fruity'] },
      { name: 'Cava', body: 'light', origin: 'Spain', description: 'Traditional method Spanish sparkling from Macabeo, Parellada, Xarel-lo.', food: 'Tapas, seafood', characteristics: ['Sparkling', 'Crisp', 'Value'] },
      { name: 'Crémant', body: 'light', origin: 'France', description: 'Traditional method sparkling from regions outside Champagne.', food: 'Oysters, appetizers', characteristics: ['Sparkling', 'Elegant', 'Diverse'] },
      { name: 'Champagne', body: 'light', origin: 'Champagne, France', description: 'The world\'s most famous sparkling. Chardonnay, Pinot Noir, Pinot Meunier.', food: 'Celebrations, oysters', characteristics: ['Prestigious', 'Complex', 'Age-worthy'] },
      { name: 'Franciacorta', body: 'light', origin: 'Lombardy, Italy', description: 'Italy\'s answer to Champagne. Traditional method, elegant.', food: 'Fine dining, seafood', characteristics: ['Elegant', 'Complex', 'Premium'] },
      { name: 'Melon de Bourgogne', body: 'light', origin: 'Loire, France', description: 'Grape of Muscadet. Mineral, citrus, and saline. Perfect with oysters.', food: 'Oysters, shellfish', characteristics: ['Mineral', 'Crisp', 'Saline'] },
      { name: 'Piquepoul', body: 'light', origin: 'Languedoc, France', description: 'Zesty and mineral with citrus and white flower notes.', food: 'Mediterranean seafood', characteristics: ['Zesty', 'Mineral', 'Fresh'] },
      { name: 'Vinho Verde', body: 'light', origin: 'Portugal', description: 'Blend of local grapes. Slight fizz, citrus, and green apple.', food: 'Seafood, light salads', characteristics: ['Slightly Fizzy', 'Light', 'Refreshing'] },
      { name: 'Pinot Blanc', body: 'light', origin: 'Alsace, France', description: 'Apple, almond, and subtle spice. Round and approachable.', food: 'Light chicken dishes', characteristics: ['Round', 'Subtle', 'Approachable'] },
      { name: 'Assyrtiko', body: 'light', origin: 'Santorini, Greece', description: 'Volcanic minerality, citrus, and honey. Greece\'s star white.', food: 'Grilled fish, feta', characteristics: ['Mineral', 'High Acid', 'Volcanic'] },
      { name: 'Colombard', body: 'light', origin: 'France/South Africa', description: 'Crisp, citrus, often used in brandy. Fresh table wines.', food: 'Salads, light fish', characteristics: ['Crisp', 'Citrus', 'Fresh'] },
      { name: 'Albariño', body: 'light', origin: 'Galicia, Spain', description: 'Peach, apricot, and saline. Spain\'s premier white.', food: 'Seafood, especially shellfish', characteristics: ['Aromatic', 'Mineral', 'Peachy'] },
      { name: 'Friulano', body: 'light', origin: 'Friuli, Italy', description: 'Almond, white flower, and subtle citrus. Formerly called Tocai.', food: 'Prosciutto, light pasta', characteristics: ['Almond', 'Floral', 'Elegant'] },
      { name: 'Verdicchio', body: 'light', origin: 'Marche, Italy', description: 'Citrus, almond, and mineral. Italy\'s underrated white.', food: 'Seafood, especially anchovies', characteristics: ['Mineral', 'Citrus', 'Age-worthy'] },
      { name: 'Cortese', body: 'light', origin: 'Piedmont, Italy', description: 'Grape of Gavi. Light, citrus, and mineral driven.', food: 'Pesto, light seafood', characteristics: ['Light', 'Mineral', 'Crisp'] },
      { name: 'Muscadet', body: 'light', origin: 'Loire, France', description: 'Made from Melon de Bourgogne. Briny, mineral, oyster\'s best friend.', food: 'Oysters, mussels', characteristics: ['Briny', 'Lean', 'Mineral'] },
      { name: 'Furmint', body: 'light', origin: 'Hungary', description: 'Grape of Tokaji. High acid, citrus, smoke, and honey (in sweet styles).', food: 'Foie gras (sweet), fish (dry)', characteristics: ['High Acid', 'Versatile', 'Complex'] },
      { name: 'Riesling', body: 'light', origin: 'Germany', description: 'Noble variety. Floral, petrol, and can range bone dry to sweet.', food: 'Spicy food, seafood', characteristics: ['Aromatic', 'Versatile', 'Age-worthy'] },
      { name: 'Verdejo', body: 'light', origin: 'Rueda, Spain', description: 'Fennel, citrus, and tropical notes. Spain\'s fresh white.', food: 'Tapas, grilled vegetables', characteristics: ['Herbaceous', 'Fresh', 'Citrus'] },
      { name: 'Fiano', body: 'light', origin: 'Campania, Italy', description: 'Honey, hazelnut, and spice. One of southern Italy\'s best whites.', food: 'Pasta with clams', characteristics: ['Nutty', 'Honeyed', 'Complex'] },
      { name: 'Grechetto', body: 'light', origin: 'Umbria, Italy', description: 'Almond, apple, and herbs. Often blended with Trebbiano.', food: 'Light pasta, chicken', characteristics: ['Nutty', 'Fresh', 'Simple'] },
      { name: 'Silvaner', body: 'light', origin: 'Germany', description: 'Subtle, earthy, and mineral. Franconia\'s signature grape.', food: 'Asparagus, fish', characteristics: ['Earthy', 'Mineral', 'Subtle'] },
      { name: 'Pinot Gris', body: 'light-medium', origin: 'Alsace, France', description: 'Honeycomb, pear, and subtle spice. Fuller than Italian Grigio.', food: 'Rich fish, pork', characteristics: ['Rich', 'Honeyed', 'Round'] },
      { name: 'Torrontés', body: 'light', origin: 'Argentina', description: 'Intensely aromatic with rose, lychee, and citrus. Argentina\'s white star.', food: 'Spicy food, Asian cuisine', characteristics: ['Aromatic', 'Floral', 'Expressive'] },
      { name: 'Fernão Pires', body: 'light', origin: 'Portugal', description: 'Portugal\'s most planted white. Citrus, floral, fresh.', food: 'Seafood, light dishes', characteristics: ['Fresh', 'Citrus', 'Floral'] },
      { name: 'Moschofilero', body: 'light', origin: 'Greece', description: 'Pink-skinned but makes white wine. Rose, citrus, and spice.', food: 'Meze, salads', characteristics: ['Aromatic', 'Spicy', 'Unique'] },
      { name: 'Chenin Blanc', body: 'light-medium', origin: 'Loire, France', description: 'Incredibly versatile. Apple, honey, and quince. Dry to sweet.', food: 'Pork, Thai food', characteristics: ['Versatile', 'Honeyed', 'Age-worthy'] },
      { name: 'Garganega', body: 'light', origin: 'Veneto, Italy', description: 'Grape of Soave. Almond, citrus, and white flower.', food: 'Risotto, light fish', characteristics: ['Almond', 'Delicate', 'Fresh'] },
      { name: 'Grüner Veltliner', body: 'light', origin: 'Austria', description: 'White pepper, citrus, and green herbs. Austria\'s flagship white.', food: 'Wiener Schnitzel, Asian', characteristics: ['Peppery', 'Herbal', 'Crisp'] },
      { name: 'Sauvignon Blanc', body: 'light', origin: 'Loire/Bordeaux, France', description: 'Gooseberry, grass, and citrus. Zesty and refreshing.', food: 'Goat cheese, salads', characteristics: ['Zesty', 'Herbaceous', 'Crisp'] },
      
      // Medium-bodied whites
      { name: 'Garganega', body: 'medium', origin: 'Veneto, Italy', description: 'Main grape of Soave. Almond, citrus, and white flower notes.', food: 'Risotto, seafood', characteristics: ['Nutty', 'Floral', 'Elegant'] },
      { name: 'Vermentino', body: 'medium', origin: 'Sardinia/Provence', description: 'Citrus, herb, and saline. Mediterranean summer wine.', food: 'Grilled fish, pesto', characteristics: ['Herbaceous', 'Saline', 'Fresh'] },
      { name: 'Falanghina', body: 'medium', origin: 'Campania, Italy', description: 'Citrus, apple, and white flower. Ancient Roman favorite.', food: 'Seafood, buffalo mozzarella', characteristics: ['Fresh', 'Floral', 'Historic'] },
      { name: 'Sémillon', body: 'medium', origin: 'Bordeaux, France', description: 'Waxy, honeyed, and figgy. Key in Sauternes (sweet) and dry blends.', food: 'Rich fish, foie gras (sweet)', characteristics: ['Waxy', 'Rich', 'Age-worthy'] },
      { name: 'Viura', body: 'medium', origin: 'Rioja, Spain', description: 'Also Macabeo. Apple, floral, often oaked in Rioja Blanco.', food: 'Roasted chicken, seafood', characteristics: ['Fresh', 'Versatile', 'Oak-friendly'] },
      { name: 'Airen', body: 'medium', origin: 'La Mancha, Spain', description: 'World\'s most planted white. Simple, fresh, neutral.', food: 'Everyday dishes', characteristics: ['Neutral', 'Fresh', 'Simple'] },
      { name: 'Trebbiano Toscano', body: 'medium', origin: 'Italy/France', description: 'Also Ugni Blanc. Neutral, high acid, used in brandy and blends.', food: 'Light pasta', characteristics: ['Neutral', 'High Acid', 'Blending'] },
      { name: 'Savagnin', body: 'medium', origin: 'Jura, France', description: 'Grape of Vin Jaune. Nutty, oxidative, unique.', food: 'Comté cheese, chicken', characteristics: ['Nutty', 'Oxidative', 'Unique'] },
      { name: 'Grenache Blanc', body: 'medium', origin: 'Southern France/Spain', description: 'Round, peachy, with citrus and floral notes.', food: 'Mediterranean cuisine', characteristics: ['Round', 'Peachy', 'Warm'] },
      { name: 'Gewürztraminer', body: 'medium', origin: 'Alsace, France', description: 'Intensely aromatic. Lychee, rose, and ginger. Low acid.', food: 'Spicy Asian, foie gras', characteristics: ['Aromatic', 'Exotic', 'Low Acid'] },
      { name: 'Marsanne', body: 'medium', origin: 'Northern Rhône, France', description: 'Almond, marzipan, and stone fruit. Often blended with Roussanne.', food: 'Rich fish, cream sauces', characteristics: ['Rich', 'Nutty', 'Full'] },
      { name: 'Roussanne', body: 'medium', origin: 'Northern Rhône, France', description: 'Herbal tea, pear, and honey. More aromatic than Marsanne.', food: 'Roasted poultry', characteristics: ['Herbal', 'Honeyed', 'Aromatic'] },
      { name: 'Viognier', body: 'medium', origin: 'Northern Rhône, France', description: 'Peach, apricot, and violet. Lush and aromatic.', food: 'Roast chicken, curry', characteristics: ['Aromatic', 'Peachy', 'Lush'] },
      
      // Full-bodied whites
      { name: 'Chardonnay', body: 'full', origin: 'Burgundy, France', description: 'The world\'s most versatile white. Apple to tropical, influenced by oak and terroir.', food: 'Lobster, roast chicken', characteristics: ['Versatile', 'Oak-friendly', 'Complex'] },
      
      // Additional lesser-known whites
      { name: 'Picpoul', body: 'light', origin: 'Languedoc, France', description: 'High acid, citrus, perfect for oysters. Also called Piquepoul.', food: 'Oysters, seafood', characteristics: ['Zesty', 'High Acid', 'Mineral'] },
      { name: 'Arneis', body: 'light', origin: 'Piedmont, Italy', description: 'Pear, almond, and white flower. Piedmont\'s elegant white.', food: 'Light pasta, seafood', characteristics: ['Delicate', 'Almond', 'Floral'] },
      { name: 'Greco', body: 'medium', origin: 'Campania, Italy', description: 'Ancient Greek grape. Almond, citrus, and mineral.', food: 'Seafood, pizza', characteristics: ['Mineral', 'Nutty', 'Historic'] },
      { name: 'Malvasia', body: 'medium', origin: 'Mediterranean', description: 'Family of grapes. Aromatic, honeyed, can be dry or sweet.', food: 'Varied by style', characteristics: ['Aromatic', 'Honeyed', 'Diverse'] },
      { name: 'Müller-Thurgau', body: 'light', origin: 'Germany', description: 'Riesling cross. Floral, peachy, easy-drinking.', food: 'Aperitivo, light fish', characteristics: ['Floral', 'Light', 'Easy'] },
      { name: 'Pecorino', body: 'medium', origin: 'Marche, Italy', description: 'Nothing to do with cheese! Citrus, herb, mineral.', food: 'Seafood, pasta', characteristics: ['Mineral', 'Herbal', 'Fresh'] },
      { name: 'Rkatsiteli', body: 'medium', origin: 'Georgia', description: 'Ancient grape. Apple, quince, often made in qvevri.', food: 'Traditional Georgian', characteristics: ['Historic', 'Versatile', 'Mineral'] },
      { name: 'Welschriesling', body: 'light', origin: 'Austria/Hungary', description: 'Not related to Riesling. Crisp, apple, simple.', food: 'Aperitivo', characteristics: ['Crisp', 'Simple', 'Fresh'] },
      { name: 'Xarel-lo', body: 'medium', origin: 'Catalonia, Spain', description: 'Cava grape. Earthy, citrus, gaining solo fame.', food: 'Tapas, seafood', characteristics: ['Earthy', 'Citrus', 'Structured'] },
      { name: 'Zierfandler', body: 'medium', origin: 'Austria', description: 'Rare Austrian grape. Spicy, full-bodied whites.', food: 'Rich dishes', characteristics: ['Rare', 'Spicy', 'Full'] },
      { name: 'Roter Veltliner', body: 'medium', origin: 'Austria', description: 'Not related to Grüner. Spicy, full, rare.', food: 'Rich dishes', characteristics: ['Spicy', 'Full', 'Rare'] },
      { name: 'Kerner', body: 'light', origin: 'Germany', description: 'Riesling × Trollinger cross. Aromatic, balanced.', food: 'Light dishes', characteristics: ['Aromatic', 'Balanced', 'Fresh'] },
      { name: 'Bacchus', body: 'light', origin: 'Germany/England', description: 'Aromatic hybrid. Elderflower, citrus. Popular in England.', food: 'Light dishes', characteristics: ['Aromatic', 'Fresh', 'Cool-climate'] },
      { name: 'Seyval Blanc', body: 'light', origin: 'France/US/UK', description: 'French-American hybrid. Citrus, apple, versatile.', food: 'Seafood', characteristics: ['Hybrid', 'Crisp', 'Versatile'] },
      { name: 'Traminette', body: 'medium', origin: 'United States', description: 'Gewürztraminer hybrid. Floral, spicy, cold-hardy.', food: 'Spicy food', characteristics: ['Aromatic', 'Spicy', 'Hardy'] },
    ],
    
    dessert: [
      { name: 'Sauternes', body: 'full', origin: 'Bordeaux, France', description: 'Botrytis-affected Sémillon blend. Honey, apricot, and caramel. World\'s greatest dessert wine.', food: 'Foie gras, blue cheese, crème brûlée', characteristics: ['Botrytis', 'Luxurious', 'Age-worthy'] },
      { name: 'Ice Wine', body: 'full', origin: 'Germany/Canada', description: 'Made from frozen grapes. Intensely sweet with peach, honey, and tropical notes.', food: 'Fruit tarts, cheesecake', characteristics: ['Frozen Grapes', 'Intense', 'Rare'] },
      { name: 'Madeira', body: 'full', origin: 'Madeira, Portugal', description: 'Fortified, heated wine. Caramel, toffee, and nuts. Virtually immortal.', food: 'Nuts, caramel desserts', characteristics: ['Fortified', 'Oxidized', 'Immortal'] },
      { name: 'Moscatel de Setúbal', body: 'full', origin: 'Portugal', description: 'Fortified Muscat. Orange, honey, and spice.', food: 'Pastries, fruit', characteristics: ['Fortified', 'Aromatic', 'Sweet'] },
      { name: 'Vin Santo', body: 'full', origin: 'Tuscany, Italy', description: 'Dried grape wine. Hazelnut, honey, and dried fruit.', food: 'Biscotti, nuts', characteristics: ['Dried Grapes', 'Nutty', 'Amber'] },
      { name: 'Muscat Alexandrie', body: 'medium', origin: 'Mediterranean', description: 'Ancient grape for sweet wines. Orange blossom and grape.', food: 'Fruit, light pastries', characteristics: ['Aromatic', 'Grapey', 'Ancient'] },
      { name: 'Port', body: 'full', origin: 'Douro, Portugal', description: 'Fortified red. Dark fruit, chocolate, and spice. Ruby, Tawny, and Vintage styles.', food: 'Chocolate, blue cheese, nuts', characteristics: ['Fortified', 'Rich', 'Powerful'] },
      { name: 'Sherry', body: 'medium-full', origin: 'Jerez, Spain', description: 'Fortified from Palomino. Ranges from dry Fino to sweet Pedro Ximénez.', food: 'Tapas, nuts, desserts (sweet styles)', characteristics: ['Fortified', 'Diverse', 'Complex'] },
      { name: 'Tokaji Aszú', body: 'full', origin: 'Hungary', description: 'Botrytis Furmint. Honey, apricot, and marmalade. Historic sweetness.', food: 'Foie gras, blue cheese', characteristics: ['Botrytis', 'Historic', 'Honeyed'] },
      { name: 'Pedro Ximénez', body: 'full', origin: 'Spain', description: 'Dried grape sherry. Molasses, fig, and raisin. Syrupy sweetness.', food: 'Ice cream, chocolate', characteristics: ['Dried Grapes', 'Syrupy', 'Intense'] },
      { name: 'Rutherglen Muscat', body: 'full', origin: 'Australia', description: 'Fortified, aged Muscat. Toffee, raisin, and Christmas cake.', food: 'Chocolate, cheese', characteristics: ['Fortified', 'Rich', 'Aged'] },
      { name: 'Banyuls', body: 'full', origin: 'Roussillon, France', description: 'Fortified Grenache. Chocolate, cherry, and coffee.', food: 'Chocolate desserts', characteristics: ['Fortified', 'Chocolate', 'Rich'] },
      { name: 'Commandaria', body: 'full', origin: 'Cyprus', description: 'World\'s oldest named wine. Dried grapes, caramel, and spice.', food: 'Pastries, dried fruit', characteristics: ['Ancient', 'Historic', 'Sweet'] },
      { name: 'Passito', body: 'full', origin: 'Italy', description: 'Dried grape wines. Raisin, honey, and nut flavors.', food: 'Biscotti, hard cheese', characteristics: ['Dried Grapes', 'Rich', 'Traditional'] },
      { name: 'Recioto', body: 'full', origin: 'Veneto, Italy', description: 'Sweet Amarone. Dried grape, cherry, and chocolate.', food: 'Chocolate, aged cheese', characteristics: ['Dried Grapes', 'Sweet', 'Rich'] },
    ]
  };

  // Flatten grapes for filtering
  const allGrapes = useMemo(() => {
    const redWithType = grapes.red.map(g => ({ ...g, type: 'red' }));
    const whiteWithType = grapes.white.map(g => ({ ...g, type: 'white' }));
    const dessertWithType = grapes.dessert.map(g => ({ ...g, type: 'dessert' }));
    return [...redWithType, ...whiteWithType, ...dessertWithType];
  }, []);

  // Filter grapes based on search and filters
  const filteredGrapes = useMemo(() => {
    let result = allGrapes;
    
    if (activeCategory !== 'all') {
      result = result.filter(g => g.type === activeCategory);
    }
    
    if (bodyFilter !== 'all') {
      result = result.filter(g => g.body === bodyFilter || g.body.includes(bodyFilter));
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(g => 
        g.name.toLowerCase().includes(term) ||
        g.origin.toLowerCase().includes(term) ||
        g.description.toLowerCase().includes(term) ||
        g.characteristics.some(c => c.toLowerCase().includes(term))
      );
    }
    
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [allGrapes, activeCategory, bodyFilter, searchTerm]);

  const getTypeColor = (type) => {
    switch(type) {
      case 'red': return '#8B0000';
      case 'white': return '#DAA520';
      case 'dessert': return '#C71585';
      default: return '#8B4513';
    }
  };

  const getBodyLabel = (body) => {
    switch(body) {
      case 'light': return '🪶 Light';
      case 'light-medium': return '🪶⚖️ Light-Medium';
      case 'medium': return '⚖️ Medium';
      case 'medium-full': return '⚖️💪 Medium-Full';
      case 'full': return '💪 Full';
      default: return body;
    }
  };

  return (
    <div className="grape-types-page">
      <div className="page-header">
        <h1>🍇 Grape Types Encyclopedia</h1>
        <p>Explore {allGrapes.length}+ grape varieties from around the world</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search grapes, regions, or characteristics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="filter-buttons">
          <div className="filter-group">
            <label>Type:</label>
            <button 
              className={activeCategory === 'all' ? 'active' : ''} 
              onClick={() => setActiveCategory('all')}
            >
              All ({allGrapes.length})
            </button>
            <button 
              className={`${activeCategory === 'red' ? 'active' : ''} red-btn`} 
              onClick={() => setActiveCategory('red')}
            >
              🍷 Red ({grapes.red.length})
            </button>
            <button 
              className={`${activeCategory === 'white' ? 'active' : ''} white-btn`} 
              onClick={() => setActiveCategory('white')}
            >
              🥂 White ({grapes.white.length})
            </button>
            <button 
              className={`${activeCategory === 'dessert' ? 'active' : ''} dessert-btn`} 
              onClick={() => setActiveCategory('dessert')}
            >
              🍯 Dessert ({grapes.dessert.length})
            </button>
          </div>
          
          <div className="filter-group">
            <label>Body:</label>
            <button 
              className={bodyFilter === 'all' ? 'active' : ''} 
              onClick={() => setBodyFilter('all')}
            >
              All
            </button>
            <button 
              className={bodyFilter === 'light' ? 'active' : ''} 
              onClick={() => setBodyFilter('light')}
            >
              Light
            </button>
            <button 
              className={bodyFilter === 'medium' ? 'active' : ''} 
              onClick={() => setBodyFilter('medium')}
            >
              Medium
            </button>
            <button 
              className={bodyFilter === 'full' ? 'active' : ''} 
              onClick={() => setBodyFilter('full')}
            >
              Full
            </button>
          </div>
        </div>
      </div>

      <div className="results-summary">
        Showing <strong>{filteredGrapes.length}</strong> grape{filteredGrapes.length !== 1 ? 's' : ''}
        {searchTerm && <span> matching "<em>{searchTerm}</em>"</span>}
      </div>

      <div className="grapes-grid">
        {filteredGrapes.map((grape, index) => (
          <div 
            key={`${grape.name}-${index}`}
            className={`grape-card ${grape.type}`}
            onClick={() => setSelectedGrape(selectedGrape?.name === grape.name ? null : grape)}
            style={{ '--type-color': getTypeColor(grape.type) }}
          >
            <div className="grape-header">
              <h3>{grape.name}</h3>
              <span className="grape-type-badge">{grape.type}</span>
            </div>
            <div className="grape-origin">📍 {grape.origin}</div>
            <div className="grape-body">{getBodyLabel(grape.body)}</div>
            <p className="grape-description">{grape.description}</p>
            
            <div className="grape-characteristics">
              {grape.characteristics.map((char, i) => (
                <span key={i} className="char-tag">{char}</span>
              ))}
            </div>
            
            <div className="grape-food">
              <strong>🍽️ Pairs with:</strong> {grape.food}
            </div>
          </div>
        ))}
      </div>

      {filteredGrapes.length === 0 && (
        <div className="no-results">
          <span className="no-results-icon">🍇</span>
          <h3>No grapes found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}

      <div className="page-footer">
        <div className="footer-stats">
          <div className="stat">
            <span className="stat-number">{grapes.red.length}</span>
            <span className="stat-label">Red Varieties</span>
          </div>
          <div className="stat">
            <span className="stat-number">{grapes.white.length}</span>
            <span className="stat-label">White Varieties</span>
          </div>
          <div className="stat">
            <span className="stat-number">{grapes.dessert.length}</span>
            <span className="stat-label">Dessert Wines</span>
          </div>
        </div>
        <p className="footer-note">
          💡 This list represents the most significant grape varieties in winemaking. 
          There are over 10,000 grape varieties worldwide, but these are the ones you're most likely to encounter.
        </p>
      </div>
    </div>
  );
};

export default GrapeTypesPage;
