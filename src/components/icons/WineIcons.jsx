// Custom SVG Wine Icons Collection
// Professional, scalable icons for the wine guide

export const WineGlassIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M8 2h8l-1 9c-.5 3-2.5 5-5 5s-4.5-2-5-5L8 2z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M12 16v6M8 22h8" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7 7c1 0 2 .5 2.5 1.5S10 10 12 10s2-.5 2.5-1.5S15.5 7 17 7" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export const WineBottleIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M10 2h4v3l2 3v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V8l2-3V2z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M8 14h8" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      opacity="0.5"
    />
    <rect x="9" y="2" width="6" height="2" fill={color} opacity="0.3" />
  </svg>
);

export const GrapeClusterIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9" cy="9" r="2.5" stroke={color} strokeWidth="1.5" />
    <circle cx="15" cy="9" r="2.5" stroke={color} strokeWidth="1.5" />
    <circle cx="6" cy="14" r="2.5" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="14" r="2.5" stroke={color} strokeWidth="1.5" />
    <circle cx="18" cy="14" r="2.5" stroke={color} strokeWidth="1.5" />
    <circle cx="9" cy="19" r="2.5" stroke={color} strokeWidth="1.5" />
    <circle cx="15" cy="19" r="2.5" stroke={color} strokeWidth="1.5" />
    <path 
      d="M12 2c1 0 2 1 2 2s-1 3-2 4" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M14 4c2-1 4-1 5 1" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const CorkIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" 
      stroke={color} 
      strokeWidth="2"
    />
    <path d="M8 8h8M8 12h8M8 16h8" stroke={color} strokeWidth="1.5" opacity="0.4" />
  </svg>
);

export const BarrelIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="12" cy="4" rx="8" ry="2" stroke={color} strokeWidth="2" />
    <ellipse cx="12" cy="20" rx="8" ry="2" stroke={color} strokeWidth="2" />
    <path d="M4 4v16M20 4v16" stroke={color} strokeWidth="2" />
    <path d="M5 8h14M5 12h14M5 16h14" stroke={color} strokeWidth="1.5" opacity="0.4" />
  </svg>
);

export const CheeseIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M2 12L12 2l10 10v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinejoin="round"
    />
    <circle cx="8" cy="16" r="1.5" fill={color} opacity="0.5" />
    <circle cx="14" cy="14" r="2" fill={color} opacity="0.5" />
    <circle cx="10" cy="10" r="1" fill={color} opacity="0.5" />
  </svg>
);

export const GlobeIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path d="M2 12h20" stroke={color} strokeWidth="1.5" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const SparkleIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M19 16l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" 
      fill={color}
    />
    <path 
      d="M5 18l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L3 20l1.5-.5.5-1.5z" 
      fill={color}
    />
  </svg>
);

export const HeartIcon = ({ className = '', size = 24, color = 'currentColor', filled = false }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? color : 'none'} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
      stroke={color} 
      strokeWidth="2"
    />
  </svg>
);

export const StarIcon = ({ className = '', size = 24, color = 'currentColor', filled = false }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? color : 'none'} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ThermometerIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M14 14.76V3a2 2 0 00-4 0v11.76a4 4 0 104 0z" 
      stroke={color} 
      strokeWidth="2"
    />
    <circle cx="12" cy="18" r="2" fill={color} opacity="0.5" />
    <path d="M12 8v6" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ClockIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FilterIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ChampagneIcon = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M8 2h8l.5 8c.3 2-.5 4-2 5.5S11.5 17 11.5 17H12.5c0 0-1 2.5-1 5h1M12 22h-2" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="7" cy="5" r="1" fill={color} opacity="0.5" />
    <circle cx="10" cy="7" r="0.5" fill={color} opacity="0.5" />
    <circle cx="14" cy="4" r="0.8" fill={color} opacity="0.5" />
    <circle cx="16" cy="6" r="0.5" fill={color} opacity="0.5" />
  </svg>
);

// Wine type icons with colors
export const RedWineIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M8 2h8l-1 9c-.5 3-2.5 5-5 5s-4.5-2-5-5L8 2z" 
      fill="#722F37"
      stroke="#5a252c" 
      strokeWidth="1"
    />
    <path d="M12 16v6M8 22h8" stroke="#722F37" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="12" cy="7" rx="3" ry="1.5" fill="#8b4049" opacity="0.5" />
  </svg>
);

export const WhiteWineIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M8 2h8l-1 9c-.5 3-2.5 5-5 5s-4.5-2-5-5L8 2z" 
      fill="#f5f0d0"
      stroke="#c9b037" 
      strokeWidth="1"
    />
    <path d="M12 16v6M8 22h8" stroke="#c9b037" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="12" cy="7" rx="3" ry="1.5" fill="#e8e0b0" opacity="0.7" />
  </svg>
);

export const RoseWineIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M8 2h8l-1 9c-.5 3-2.5 5-5 5s-4.5-2-5-5L8 2z" 
      fill="#f8c8cc"
      stroke="#d4727a" 
      strokeWidth="1"
    />
    <path d="M12 16v6M8 22h8" stroke="#d4727a" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="12" cy="7" rx="3" ry="1.5" fill="#f0c4c8" opacity="0.7" />
  </svg>
);

export const SparklingWineIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M8 2h8l-1 9c-.5 3-2.5 5-5 5s-4.5-2-5-5L8 2z" 
      fill="#fffef5"
      stroke="#b8860b" 
      strokeWidth="1"
    />
    <path d="M12 16v6M8 22h8" stroke="#b8860b" strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="5" r="0.5" fill="#ffd700" />
    <circle cx="12" cy="6" r="0.5" fill="#ffd700" />
    <circle cx="15" cy="4" r="0.5" fill="#ffd700" />
    <circle cx="11" cy="8" r="0.5" fill="#ffd700" />
    <circle cx="14" cy="7" r="0.5" fill="#ffd700" />
  </svg>
);

export default {
  WineGlassIcon,
  WineBottleIcon,
  GrapeClusterIcon,
  CorkIcon,
  BarrelIcon,
  CheeseIcon,
  GlobeIcon,
  SparkleIcon,
  HeartIcon,
  StarIcon,
  ThermometerIcon,
  ClockIcon,
  FilterIcon,
  SearchIcon,
  ChampagneIcon,
  RedWineIcon,
  WhiteWineIcon,
  RoseWineIcon,
  SparklingWineIcon
};
