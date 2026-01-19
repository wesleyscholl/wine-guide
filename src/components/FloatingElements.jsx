import { useMemo } from 'react';

// Floating wine bubbles for sparkling/champagne effect
export function FloatingBubbles({ count = 20 }) {
  const bubbles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.4
    }));
  }, [count]);

  return (
    <div className="floating-bubbles" aria-hidden="true">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            opacity: bubble.opacity
          }}
        />
      ))}
    </div>
  );
}

// Floating wine glasses for decoration
export function FloatingGlasses() {
  const glasses = ['🍷', '🥂', '🍾', '🍇'];
  
  const elements = useMemo(() => {
    return glasses.flatMap((emoji, emojiIndex) =>
      Array.from({ length: 2 }, (_, i) => ({
        id: `${emojiIndex}-${i}`,
        emoji,
        left: (emojiIndex * 25) + (Math.random() * 20),
        top: 20 + Math.random() * 60,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 10,
        size: 20 + Math.random() * 20
      }))
    );
  }, []);

  return (
    <div className="floating-glasses" aria-hidden="true">
      {elements.map(el => (
        <span
          key={el.id}
          className="floating-glass"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
            fontSize: `${el.size}px`
          }}
        >
          {el.emoji}
        </span>
      ))}
    </div>
  );
}

// Wine stain decorative element
export function WineStain({ position = 'left', color = 'red' }) {
  const colorMap = {
    red: 'rgba(114, 47, 55, 0.1)',
    white: 'rgba(201, 176, 55, 0.1)',
    rose: 'rgba(212, 114, 122, 0.1)'
  };

  return (
    <div 
      className={`wine-stain wine-stain--${position}`}
      style={{ background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)` }}
      aria-hidden="true"
    />
  );
}

// Grape vine decorative border
export function GrapeVine({ position = 'top' }) {
  return (
    <div className={`grape-vine grape-vine--${position}`} aria-hidden="true">
      <svg viewBox="0 0 400 40" preserveAspectRatio="none">
        <path 
          d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none"
          className="vine-path"
        />
        {/* Grape clusters */}
        {[50, 150, 250, 350].map((x, i) => (
          <g key={i} className="grape-cluster" style={{ animationDelay: `${i * 0.3}s` }}>
            <circle cx={x} cy={15} r={4} fill="currentColor" opacity="0.5" />
            <circle cx={x - 5} cy={20} r={4} fill="currentColor" opacity="0.6" />
            <circle cx={x + 5} cy={20} r={4} fill="currentColor" opacity="0.6" />
            <circle cx={x} cy={25} r={4} fill="currentColor" opacity="0.7" />
          </g>
        ))}
        {/* Leaves */}
        {[25, 125, 225, 325].map((x, i) => (
          <path
            key={`leaf-${i}`}
            d={`M${x},18 Q${x + 8},10 ${x + 15},18 Q${x + 8},26 ${x},18`}
            fill="currentColor"
            opacity="0.3"
            className="vine-leaf"
            style={{ animationDelay: `${i * 0.4 + 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

// Animated wine pour effect
export function WinePour({ color = '#722f37' }) {
  return (
    <div className="wine-pour" aria-hidden="true">
      <div className="pour-stream" style={{ background: color }} />
      <div className="pour-splash" style={{ background: color }} />
    </div>
  );
}

// Sparkle effect for highlighting
export function Sparkles({ count = 6 }) {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      size: 10 + Math.random() * 20
    }));
  }, [count]);

  return (
    <div className="sparkles" aria-hidden="true">
      {sparkles.map(sparkle => (
        <span
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.delay}s`,
            fontSize: `${sparkle.size}px`
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}

export default { FloatingBubbles, FloatingGlasses, WineStain, GrapeVine, WinePour, Sparkles };
