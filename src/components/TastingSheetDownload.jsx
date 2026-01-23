import { jsPDF } from 'jspdf';

// Helper to draw a section box with header (clean rounded corners)
const drawSectionBox = (doc, x, y, width, height, title) => {
  const r = 2; // corner radius
  const headerHeight = 6;
  
  // Draw header background with rounded top corners
  doc.setFillColor(245, 245, 245);
  doc.setDrawColor(100, 100, 100);
  
  // Create path for header with rounded top corners only
  doc.moveTo(x + r, y);
  doc.lineTo(x + width - r, y);
  doc.curveTo(x + width, y, x + width, y + r, x + width, y + r);
  doc.lineTo(x + width, y + headerHeight);
  doc.lineTo(x, y + headerHeight);
  doc.lineTo(x, y + r);
  doc.curveTo(x, y, x + r, y, x + r, y);
  doc.fill();
  
  // Draw the full box outline
  doc.setLineWidth(0.4);
  doc.roundedRect(x, y, width, height, r, r);
  
  // Header divider line
  doc.line(x, y + headerHeight, x + width, y + headerHeight);
  
  // Header text
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(114, 47, 55);
  doc.text(title, x + 3, y + 4.5);
  doc.setTextColor(0, 0, 0);
  
  return y + 9;
};

// Helper to draw evenly spaced grid of circle options
const drawOptionGrid = (doc, options, x, y, cols, colWidth, rowHeight) => {
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  
  options.forEach((opt, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const xPos = x + (col * colWidth);
    const yPos = y + (row * rowHeight);
    doc.circle(xPos, yPos - 1, 1.5);
    doc.text(opt, xPos + 3, yPos);
  });
  
  const totalRows = Math.ceil(options.length / cols);
  return y + (totalRows * rowHeight);
};

// Helper to draw a labeled row with circle options
const drawLabeledRow = (doc, label, options, x, y, labelWidth, optionSpacing) => {
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text(label, x, y);
  
  doc.setFont('helvetica', 'normal');
  let xPos = x + labelWidth;
  options.forEach(opt => {
    doc.circle(xPos, y - 1, 1.5);
    doc.text(opt, xPos + 3, y);
    xPos += optionSpacing;
  });
};

// Helper to draw a subheading
const drawSubheading = (doc, text, x, y) => {
  doc.setFontSize(6);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text(text, x, y);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(7);
};

// Generate a single tasting sheet (half page)
const drawTastingSheet = (doc, yOffset) => {
  const pageWidth = 210;
  const margin = 8;
  const contentWidth = pageWidth - (margin * 2);
  const halfPage = 148.5;
  const colWidth = (contentWidth - 4) / 2;
  const rowHeight = 5;
  
  let y = yOffset + 4;
  
  // ===== HEADER =====
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('WINE TASTING NOTES', pageWidth / 2, y, { align: 'center' });
  y += 6;
  
  // Wine Info Box
  const infoBoxY = y;
  drawSectionBox(doc, margin, infoBoxY, contentWidth, 16, 'WINE INFORMATION');
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Wine: ___________________________________________', margin + 3, infoBoxY + 10);
  doc.text('Producer: _______________________________________', margin + 3, infoBoxY + 14);
  doc.text('Date: __________', margin + 110, infoBoxY + 10);
  doc.text('Vintage: _____  Price: _____', margin + 110, infoBoxY + 14);
  
  y = infoBoxY + 19;
  
  // ===== LEFT COLUMN =====
  const leftX = margin;
  const rightX = margin + colWidth + 4;
  const gridColWidth = 21; // Even spacing for grid columns
  
  // APPEARANCE BOX (left)
  const appearanceY = y;
  const appearanceHeight = 42;
  let contentY = drawSectionBox(doc, leftX, appearanceY, colWidth, appearanceHeight, 'APPEARANCE');
  
  drawLabeledRow(doc, 'Clarity:', ['Clear', 'Slight Haze', 'Hazy'], leftX + 3, contentY, 17, 24);
  contentY += rowHeight;
  
  drawLabeledRow(doc, 'Intensity:', ['Pale', 'Medium', 'Deep'], leftX + 3, contentY, 20, 22);
  contentY += rowHeight;
  
  drawLabeledRow(doc, 'Viscosity:', ['Thin', 'Medium', 'Thick'], leftX + 3, contentY, 20, 20);
  contentY += rowHeight + 1;
  
  // Color as grid (3 columns)
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('Color:', leftX + 3, contentY);
  contentY += 4;
  const colors = ['Straw', 'Gold', 'Amber', 'Salmon', 'Pink', 'Copper', 'Ruby', 'Garnet', 'Tawny'];
  drawOptionGrid(doc, colors, leftX + 3, contentY, 3, 28, rowHeight);

  // NOSE BOX (left)
  const noseY = appearanceY + appearanceHeight + 2;
  const noseHeight = 52;
  contentY = drawSectionBox(doc, leftX, noseY, colWidth, noseHeight, 'NOSE');
  
  drawLabeledRow(doc, 'Intensity:', ['Light', 'Med-', 'Med+', 'Pronounced'], leftX + 3, contentY, 20, 17);
  contentY += rowHeight;
  
  drawLabeledRow(doc, 'Development:', ['Youthful', 'Developing', 'Mature'], leftX + 3, contentY, 26, 20);
  contentY += rowHeight + 1;
  
  // Subheading for aromas
  drawSubheading(doc, 'Aromas (circle all that apply):', leftX + 3, contentY);
  contentY += 4;
  
  // Aroma options as 4x5 grid (20 aromas)
  const aromas = [
    'Citrus', 'Tree Fruit', 'Tropical', 'Red Fruit',
    'Black Fruit', 'Dried Fruit', 'Floral', 'Herbal',
    'Spice', 'Oak', 'Earth', 'Mineral',
    'Butter', 'Yeast', 'Smoke', 'Truffle',
    'Leather', 'Honey', 'Petrol', 'Barnyard'
  ];
  drawOptionGrid(doc, aromas, leftX + 3, contentY, 4, gridColWidth, rowHeight);

  // ===== RIGHT COLUMN =====
  
  // PALATE BOX (right)
  const palateY = y;
  const palateHeight = 62;
  contentY = drawSectionBox(doc, rightX, palateY, colWidth, palateHeight, 'PALATE');
  
  drawLabeledRow(doc, 'Sweetness:', ['Dry', 'Off-Dry', 'Medium', 'Sweet'], rightX + 3, contentY, 22, 16);
  contentY += rowHeight;
  
  drawLabeledRow(doc, 'Acidity:', ['Low', 'Med-', 'Med+', 'High'], rightX + 3, contentY, 17, 16);
  contentY += rowHeight;
  
  drawLabeledRow(doc, 'Tannin:', ['None', 'Low', 'Medium', 'High'], rightX + 3, contentY, 16, 16);
  contentY += rowHeight;
  
  drawLabeledRow(doc, 'Body:', ['Light', 'Med-', 'Med+', 'Full'], rightX + 3, contentY, 14, 16);
  contentY += rowHeight;
  
  drawLabeledRow(doc, 'Alcohol:', ['Low', 'Medium', 'High'], rightX + 3, contentY, 18, 20);
  contentY += rowHeight;
  
  drawLabeledRow(doc, 'Finish:', ['Short', 'Medium', 'Long'], rightX + 3, contentY, 15, 20);
  contentY += rowHeight + 2;
  
  // Subheading for flavors
  drawSubheading(doc, 'Flavors on palate (circle all that apply):', rightX + 3, contentY);
  contentY += 4;
  
  // Flavor notes as 4x4 grid (16 flavors)
  const flavors = [
    'Citrus', 'Apple', 'Berry', 'Cherry',
    'Plum', 'Fig', 'Pepper', 'Vanilla',
    'Oak', 'Coffee', 'Chocolate', 'Tobacco',
    'Caramel', 'Licorice', 'Meat', 'Graphite'
  ];
  drawOptionGrid(doc, flavors, rightX + 3, contentY, 4, gridColWidth, rowHeight);

  // OVERALL IMPRESSION BOX (right)
  const conclusionY = palateY + palateHeight + 2;
  const conclusionHeight = 32;
  contentY = drawSectionBox(doc, rightX, conclusionY, colWidth, conclusionHeight, 'OVERALL IMPRESSION');
  
  drawLabeledRow(doc, 'Balance:', ['Unbalanced', 'Balanced', 'Harmonious'], rightX + 3, contentY, 18, 21);
  contentY += rowHeight + 0.5;
  
  drawLabeledRow(doc, 'Complexity:', ['Simple', 'Moderate', 'Complex'], rightX + 3, contentY, 24, 21);
  contentY += rowHeight + 0.5;
  
  // Quality with custom spacing for each option
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('Quality:', rightX + 3, contentY);
  doc.setFont('helvetica', 'normal');
  const qualityOpts = [
    { label: 'Poor', x: 18 },
    { label: 'Acceptable', x: 29 },
    { label: 'Good', x: 47 },
    { label: 'V. Good', x: 58 },
    { label: 'Outstanding', x: 72 }
  ];
  qualityOpts.forEach(opt => {
    doc.circle(rightX + opt.x, contentY - 1, 1.5);
    doc.text(opt.label, rightX + opt.x + 3, contentY);
  });
  contentY += rowHeight + 0.5;
  
  drawLabeledRow(doc, 'Ready:', ['Too Young', 'Drink Now', 'Can Age', 'Past Peak'], rightX + 3, contentY, 15, 17);

  // ===== NOTES SECTION (full width) =====
  const notesY = conclusionY + conclusionHeight + 2;
  const notesHeight = 16;
  contentY = drawSectionBox(doc, leftX, notesY, contentWidth, notesHeight, 'TASTING NOTES & RATING');
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  contentY += 2;
  doc.line(leftX + 3, contentY, leftX + contentWidth - 50, contentY);
  doc.setFont('helvetica', 'bold');
  doc.text('Rating:', leftX + contentWidth - 45, contentY);
  doc.setFont('helvetica', 'normal');
  doc.text('_____ / 100', leftX + contentWidth - 30, contentY);
  contentY += 5;
  doc.line(leftX + 3, contentY, leftX + contentWidth - 6, contentY);
};

// Generate the reference guide page
const drawReferenceGuide = (doc) => {
  const pageWidth = 210;
  const margin = 12;
  const contentWidth = pageWidth - (margin * 2);
  const colWidth = (contentWidth - 8) / 2;
  
  let y = 12;
  
  // Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('WINE AROMA & FLAVOR REFERENCE GUIDE', pageWidth / 2, y, { align: 'center' });
  y += 8;
  
  // ===== AROMAS SECTION (Left Column) =====
  const leftX = margin;
  const rightX = margin + colWidth + 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(114, 47, 55);
  doc.text('AROMAS (Nose)', leftX, y);
  doc.setTextColor(0, 0, 0);
  y += 5;
  
  // Very common aromas
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('Very Common / Foundational:', leftX, y);
  doc.setTextColor(0, 0, 0);
  y += 4;
  
  const commonAromas = [
    ['Citrus', 'lemon, lime, grapefruit, orange, tangerine'],
    ['Tree Fruit', 'apple, pear, peach, apricot, nectarine'],
    ['Tropical', 'pineapple, mango, passionfruit, guava'],
    ['Red Fruit', 'cherry, strawberry, raspberry, cranberry'],
    ['Black Fruit', 'blackberry, black cherry, black currant'],
    ['Floral', 'rose, violet, orange blossom, jasmine, lavender'],
    ['Herbal', 'grass, sage, thyme, mint, eucalyptus, green pepper'],
    ['Spice', 'pepper, clove, baking spice, cinnamon, anise'],
    ['Oak', 'vanilla, toast, coconut, cedar, smoke'],
    ['Earth', 'forest floor, soil, mushroom, wet leaves']
  ];
  
  doc.setFontSize(6.5);
  commonAromas.forEach(([name, desc]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${name}`, leftX, y);
    doc.setFont('helvetica', 'normal');
    doc.text(` — ${desc}`, leftX + 18, y);
    y += 3.5;
  });
  
  y += 2;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('Common but Style-Dependent:', leftX, y);
  doc.setTextColor(0, 0, 0);
  y += 4;
  
  const styleAromas = [
    ['Dried Fruit', 'raisins, fig — warm climates, age'],
    ['Mineral', 'wet stone, chalk — debated but widely used'],
    ['Butter', 'malolactic Chardonnay'],
    ['Yeast', 'bread, brioche — Champagne, lees aging'],
    ['Smoke', 'toasted oak, Syrah, volcanic soils'],
    ['Honey', 'aged whites, botrytis wines']
  ];
  
  doc.setFontSize(6.5);
  styleAromas.forEach(([name, desc]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${name}`, leftX, y);
    doc.setFont('helvetica', 'normal');
    doc.text(` — ${desc}`, leftX + 18, y);
    y += 3.5;
  });
  
  y += 2;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('Less Frequent but Legit:', leftX, y);
  doc.setTextColor(0, 0, 0);
  y += 4;
  
  const rareAromas = [
    ['Truffle', 'aged Nebbiolo, Burgundy'],
    ['Leather', 'aged reds, especially Italian/French'],
    ['Petrol', 'classic aged Riesling'],
    ['Barnyard', 'Brettanomyces — can be positive in small amounts']
  ];
  
  doc.setFontSize(6.5);
  rareAromas.forEach(([name, desc]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${name}`, leftX, y);
    doc.setFont('helvetica', 'normal');
    doc.text(` — ${desc}`, leftX + 18, y);
    y += 3.5;
  });
  
  // ===== FLAVORS SECTION (Right Column) =====
  let yRight = 20;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(114, 47, 55);
  doc.text('FLAVORS (Palate)', rightX, yRight);
  doc.setTextColor(0, 0, 0);
  yRight += 5;
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('Very Common / Core Palate:', rightX, yRight);
  doc.setTextColor(0, 0, 0);
  yRight += 4;
  
  const commonFlavors = [
    ['Citrus', 'lemon, lime, grapefruit, orange, tangerine'],
    ['Apple', 'green to baked'],
    ['Berry', 'raspberry, strawberry, blueberry, blackberry'],
    ['Cherry', 'red or black'],
    ['Plum', 'ripe or fresh'],
    ['Pepper', 'black/white — Syrah, Zinfandel'],
    ['Vanilla', 'oak influence'],
    ['Oak', 'toast, wood, spice, smoke']
  ];
  
  doc.setFontSize(6.5);
  commonFlavors.forEach(([name, desc]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${name}`, rightX, yRight);
    doc.setFont('helvetica', 'normal');
    doc.text(` — ${desc}`, rightX + 16, yRight);
    yRight += 3.5;
  });
  
  yRight += 2;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('Common but Style-Specific:', rightX, yRight);
  doc.setTextColor(0, 0, 0);
  yRight += 4;
  
  const styleFlavors = [
    ['Fig', 'warm climates, age'],
    ['Coffee', 'dark toast oak, long élevage'],
    ['Chocolate', 'ripe reds, oak + fruit'],
    ['Tobacco', 'aged Bordeaux, Rioja'],
    ['Caramel', 'oxidation, barrel age, fortified wines'],
    ['Licorice', 'Syrah, Sangiovese, Mourvèdre']
  ];
  
  doc.setFontSize(6.5);
  styleFlavors.forEach(([name, desc]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${name}`, rightX, yRight);
    doc.setFont('helvetica', 'normal');
    doc.text(` — ${desc}`, rightX + 16, yRight);
    yRight += 3.5;
  });
  
  yRight += 2;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('Less Common but Legit:', rightX, yRight);
  doc.setTextColor(0, 0, 0);
  yRight += 4;
  
  const rareFlavors = [
    ['Meat', 'savory/umami — Syrah, Rhône, Barolo'],
    ['Graphite', 'classic Bordeaux, Cab-heavy blends']
  ];
  
  doc.setFontSize(6.5);
  rareFlavors.forEach(([name, desc]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${name}`, rightX, yRight);
    doc.setFont('helvetica', 'normal');
    doc.text(` — ${desc}`, rightX + 16, yRight);
    yRight += 3.5;
  });
  
  // ===== STRUCTURAL ELEMENTS SECTION (Left) =====
  const faultsY = Math.max(y, yRight) + 4;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(114, 47, 55);
  doc.text('STRUCTURAL ELEMENTS', leftX, faultsY);
  doc.setTextColor(0, 0, 0);
  
  let structY = faultsY + 5;
  const structures = [
    ['Acidity', 'tartness, freshness — makes mouth water'],
    ['Tannin', 'drying sensation, grip — from skins, seeds, oak'],
    ['Body', 'weight/fullness — light (water) to full (cream)'],
    ['Alcohol', 'warmth in throat — higher = more viscosity'],
    ['Sweetness', 'residual sugar — dry to sweet'],
    ['Finish', 'how long flavors linger after swallowing']
  ];
  
  doc.setFontSize(6.5);
  structures.forEach(([name, desc]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${name}`, leftX, structY);
    doc.setFont('helvetica', 'normal');
    doc.text(` — ${desc}`, leftX + 18, structY);
    structY += 3.5;
  });
  
  // ===== WINE FAULTS SECTION (Right) =====
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(114, 47, 55);
  doc.text('WINE FAULTS (What to Watch For)', rightX, faultsY);
  doc.setTextColor(0, 0, 0);
  
  let faultY = faultsY + 5;
  const faults = [
    ['Cork Taint (TCA)', 'musty, wet cardboard — wine is "corked"'],
    ['Oxidation', 'brown color, flat/sherry-like — too much air'],
    ['Volatile Acidity', 'vinegar or nail polish smell'],
    ['Reduction', 'rotten egg, burnt rubber — needs air'],
    ['Brettanomyces', 'barnyard, band-aid — flaw or character'],
    ['Heat Damage', 'cooked fruit, flat — stored too warm']
  ];
  
  doc.setFontSize(6.5);
  faults.forEach(([name, desc]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${name}`, rightX, faultY);
    doc.setFont('helvetica', 'normal');
    doc.text(` — ${desc}`, rightX + 28, faultY);
    faultY += 3.5;
  });
  
  // Divider line
  const dividerY = structY + 4;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin, dividerY, pageWidth - margin, dividerY);
  
  // ===== TASTING TIPS SECTION =====
  let tipY = dividerY + 5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(114, 47, 55);
  doc.text('Tasting Tips:', leftX, tipY);
  doc.setTextColor(0, 0, 0);
  tipY += 4;
  
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  const tips = [
    '• Primary aromas come from the grape — variety and terroir',
    '• Secondary aromas develop during fermentation — yeast, butter, bread',
    '• Tertiary aromas develop with aging — leather, tobacco, earth',
    '• Let wine breathe — aromas change over time in the glass',
    '• Serve at proper temp: whites 45-55°F, reds 55-65°F'
  ];
  tips.forEach(tip => {
    doc.text(tip, leftX, tipY);
    tipY += 3.2;
  });
  
  // Additional tips column
  tipY = dividerY + 9;
  const tips2 = [
    '• Use a clean glass — residue affects perception',
    '• Taste blind when possible — labels influence judgment',
    '• Compare wines side by side to train your palate',
    '• Trust your senses — there are no wrong answers'
  ];
  tips2.forEach(tip => {
    doc.text(tip, rightX, tipY);
    tipY += 3.2;
  });
  
  // ===== COMMON GRAPE CHARACTERISTICS =====
  const grapeY = tipY + 4;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(114, 47, 55);
  doc.text('Common Grape Variety Signatures:', leftX, grapeY);
  doc.setTextColor(0, 0, 0);
  
  let gY = grapeY + 4;
  doc.setFontSize(6);
  const grapes = [
    ['Cabernet Sauvignon', 'black currant, cedar, tobacco, firm tannins'],
    ['Merlot', 'plum, chocolate, softer tannins than Cab'],
    ['Pinot Noir', 'red cherry, earth, mushroom, silky texture'],
    ['Syrah/Shiraz', 'black pepper, smoke, meat, dark fruit'],
    ['Chardonnay', 'apple, citrus (unoaked) or butter, vanilla (oaked)'],
    ['Sauvignon Blanc', 'grapefruit, grass, green pepper, crisp acidity'],
    ['Riesling', 'lime, peach, petrol (aged), high acidity'],
    ['Pinot Grigio/Gris', 'pear, almond, light to medium body']
  ];
  
  grapes.forEach(([name, desc], i) => {
    const col = i < 4 ? leftX : rightX;
    const row = i < 4 ? i : i - 4;
    doc.setFont('helvetica', 'bold');
    doc.text(`${name}:`, col, gY + (row * 3.5));
    doc.setFont('helvetica', 'normal');
    doc.text(desc, col + 28, gY + (row * 3.5));
  });
};

// Generate and download the PDF
export const generateTastingSheetPDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  doc.setFont('helvetica');
  
  // Page 1: Two tasting sheets
  drawTastingSheet(doc, 0);
  drawTastingSheet(doc, 148.5);
  
  // Page 2: Reference guide
  doc.addPage();
  drawReferenceGuide(doc);
  
  doc.save('wine-tasting-sheet.pdf');
};

// React component for the download button
const TastingSheetDownload = ({ className = '' }) => {
  const handleDownload = () => {
    generateTastingSheetPDF();
  };

  return (
    <button 
      className={`tasting-sheet-download-btn ${className}`}
      onClick={handleDownload}
    >
      📝 Download Tasting Sheet (PDF)
    </button>
  );
};

export default TastingSheetDownload;
