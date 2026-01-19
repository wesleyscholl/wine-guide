// Wine Bottle SVG Components - Color-coded by type
// Bordeaux-style bottle shape (squared shoulders)

export function WineBottle({ type = 'red', size = 120, name = 'WINE', vintage = '', className = '' }) {
  const colors = {
    red: {
      bottle: '#4a1a1a',
      bottleLight: '#6b2d2d',
      foil: '#2a2a2a'
    },
    white: {
      bottle: '#8b8b3d',
      bottleLight: '#a0a050',
      foil: '#3a4a3a'
    },
    rose: {
      bottle: '#d4a0a5',
      bottleLight: '#e0b5ba',
      foil: '#4a3a3c'
    },
    sparkling: {
      bottle: '#2a4a2a',
      bottleLight: '#3d5d3d',
      foil: '#2a2a2a'
    }
  };

  const c = colors[type] || colors.red;
  
  // Split name into words for multi-line display
  const nameWords = name.split(' ').slice(0, 4); // Max 4 words
  const gradId = `bottleGrad-${type}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Dynamic font size based on longest word and number of words
  const longestWord = Math.max(...nameWords.map(w => w.length));
  const labelWidth = 18; // Available width on label
  const baseFontSize = 2.8;
  // Scale down if word is too long (roughly 0.5 units per character at base size)
  const fontSizeByWidth = Math.min(baseFontSize, labelWidth / (longestWord * 0.55));
  // Also scale down if many words to fit vertically
  const fontSizeByHeight = nameWords.length > 3 ? 2.2 : nameWords.length > 2 ? 2.5 : baseFontSize;
  const fontSize = Math.min(fontSizeByWidth, fontSizeByHeight);
  const lineHeight = fontSize * 1.4;

  return (
    <svg
      width={size}
      height={size * 2.4}
      viewBox="0 0 40 96"
      className={`wine-bottle-svg ${className}`}
      aria-label={`${type} wine bottle - ${name}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c.bottleLight} />
          <stop offset="25%" stopColor={c.bottle} />
          <stop offset="75%" stopColor={c.bottle} />
          <stop offset="100%" stopColor={c.bottleLight} />
        </linearGradient>
      </defs>
      
      {/* Foil capsule wrapping around neck */}
      <rect x="16" y="0" width="8" height="3" rx="1" fill={c.foil} />
      <path
        d="M16 3 L16 16 Q16 17 17 17 L23 17 Q24 17 24 16 L24 3 Z"
        fill={c.foil}
      />
      <path
        d="M16.5 3 L16.5 15"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.15"
      />
      
      {/* Bottle - single path for Bordeaux shape */}
      <path
        d={`
          M16 12
          L16 22
          Q16 24 14 26
          L10 30
          Q8 32 8 36
          L8 90
          Q8 94 12 94
          L28 94
          Q32 94 32 90
          L32 36
          Q32 32 30 30
          L26 26
          Q24 24 24 22
          L24 12
          Z
        `}
        fill={`url(#${gradId})`}
      />
      
      {/* Label - white rectangle */}
      <rect x="9" y="42" width="22" height="42" fill="white" />
      
      {/* Wine name on label - one word per line */}
      <text 
        x="20" 
        textAnchor="middle" 
        fontSize={fontSize}
        fontFamily="Georgia, serif"
        fontWeight="400"
        letterSpacing="0.3"
        fill="#333"
      >
        {nameWords.map((word, i) => (
          <tspan key={i} x="20" dy={i === 0 ? 60 - (nameWords.length - 1) * (lineHeight / 2) : lineHeight}>
            {word.toUpperCase()}
          </tspan>
        ))}
      </text>
      
      {/* Vintage year if provided */}
      {vintage && (
        <text 
          x="20" 
          y={62 + nameWords.length * lineHeight}
          textAnchor="middle" 
          fontSize="3" 
          fontFamily="Georgia, serif"
          fill="#555"
        >
          {vintage}
        </text>
      )}
      
      {/* Subtle bottle shine */}
      <path
        d="M11 36 L11 88"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WineGlass({ type = 'red', size = 80, className = '' }) {
  const wineColors = {
    red: '#722F37',
    white: '#f5e6a3',
    rose: '#e8b4b8',
    sparkling: '#f5e6a3'
  };

  const color = wineColors[type] || wineColors.red;
  const hasBubbles = type === 'sparkling';

  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 60 72"
      className={`wine-glass-svg ${className}`}
      aria-label={`${type} wine glass`}
    >
      {/* Glass bowl */}
      <ellipse cx="30" cy="28" rx="22" ry="24" fill="none" stroke="#ddd" strokeWidth="1.5" />
      
      {/* Wine in glass */}
      <path
        d="M12 30 Q12 48 30 48 Q48 48 48 30 Q48 22 30 22 Q12 22 12 30 Z"
        fill={color}
        opacity="0.7"
      />
      
      {/* Bubbles for sparkling */}
      {hasBubbles && (
        <>
          <circle cx="25" cy="35" r="1" fill="white" opacity="0.6" />
          <circle cx="32" cy="38" r="0.8" fill="white" opacity="0.5" />
          <circle cx="28" cy="32" r="0.6" fill="white" opacity="0.7" />
          <circle cx="35" cy="34" r="0.7" fill="white" opacity="0.5" />
          <circle cx="30" cy="40" r="0.5" fill="white" opacity="0.6" />
        </>
      )}
      
      {/* Glass shine */}
      <path
        d="M16 20 Q14 30 18 40"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.3"
        strokeLinecap="round"
      />
      
      {/* Stem */}
      <rect x="28" y="48" width="4" height="16" fill="#ddd" />
      
      {/* Base */}
      <ellipse cx="30" cy="68" rx="14" ry="3" fill="#ddd" />
    </svg>
  );
}

export function WineBottleSimple({ type = 'red', size = 60, name = '', vintage = '', className = '' }) {
  const colors = {
    red: { 
      bottle: '#4a1a1a', 
      bottleLight: '#6b2d2d',
      foil: '#2a2a2a'
    },
    white: { 
      bottle: '#8b8b3d', 
      bottleLight: '#a0a050',
      foil: '#3a4a3a'
    },
    rose: { 
      bottle: '#d4a0a5', 
      bottleLight: '#e0b5ba',
      foil: '#4a3a3c'
    },
    sparkling: { 
      bottle: '#2a4a2a', 
      bottleLight: '#3d5d3d',
      foil: '#2a2a2a'
    }
  };

  const c = colors[type] || colors.red;
  
  // Split name into words for multi-line display (max 2 for small bottle)
  const nameWords = name ? name.split(' ').slice(0, 2) : [];
  const gradId = `simpleGrad-${type}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Dynamic font size based on longest word
  const longestWord = nameWords.length > 0 ? Math.max(...nameWords.map(w => w.length)) : 0;
  const labelWidth = 10; // Available width on small label
  const baseFontSize = 1.9;
  const fontSize = Math.min(baseFontSize, labelWidth / (longestWord * 0.35));
  const lineHeight = fontSize * 1.5;

  return (
    <svg
      width={size}
      height={size * 2.4}
      viewBox="0 0 24 58"
      className={`wine-bottle-simple-svg ${className}`}
      aria-label={`${type} wine bottle${name ? ` - ${name}` : ''}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c.bottleLight} />
          <stop offset="30%" stopColor={c.bottle} />
          <stop offset="70%" stopColor={c.bottle} />
          <stop offset="100%" stopColor={c.bottleLight} />
        </linearGradient>
      </defs>
      
      {/* Foil capsule wrapping around neck */}
      <rect x="9" y="0" width="6" height="2" rx="0.5" fill={c.foil} />
      <path
        d="M9 2 L9 11 Q9 11.5 10 11.5 L14 11.5 Q15 11.5 15 11 L15 2 Z"
        fill={c.foil}
      />
      <path
        d="M9.5 2 L9.5 10.5"
        stroke="white"
        strokeWidth="0.3"
        opacity="0.15"
      />
      
      {/* Bottle - single path for Bordeaux shape */}
      <path
        d={`
          M9 7.5
          L9 15.5
          Q9 16.5 8 17.5
          L6 19.5
          Q5 20.5 5 23.5
          L5 54
          Q5 57 7 57
          L17 57
          Q19 57 19 54
          L19 23.5
          Q19 20.5 18 19.5
          L16 17.5
          Q15 16.5 15 15.5
          L15 7.5
          Z
        `}
        fill={`url(#${gradId})`}
      />
      
      {/* Label */}
      <rect x="5" y="25" width="14" height="26" fill="white" />
      
      {/* Wine name on label - one word per line */}
      {nameWords.length > 0 && (
        <text 
          x="12" 
          textAnchor="middle" 
          fontSize={fontSize}
          fontFamily="Georgia, serif"
          fontWeight="400"
          letterSpacing="0.2"
          fill="#333"
        >
          {nameWords.map((word, i) => (
            <tspan key={i} x="12" dy={i === 0 ? 37 - (nameWords.length - 1) * (lineHeight / 2) : lineHeight}>
              {word.toUpperCase()}
            </tspan>
          ))}
        </text>
      )}
      
      {/* Vintage */}
      {vintage && (
        <text 
          x="12" 
          y={39 + nameWords.length * lineHeight}
          textAnchor="middle" 
          fontSize="2.2" 
          fontFamily="Georgia, serif"
          fill="#555"
        >
          {vintage}
        </text>
      )}
      
      {/* Shine */}
      <path
        d="M7 22 L7 52"
        fill="none"
        stroke="white"
        strokeWidth="0.8"
        opacity="0.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default WineBottle;
