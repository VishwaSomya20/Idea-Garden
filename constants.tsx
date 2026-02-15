
import React from 'react';

export const GARDEN_COLORS = {
  light: '#90be6d',
  mid: '#4d908e',
  dark: '#277da1',
  grass: '#43aa8b',
};

// Grass Blade Asset based on user doodle (squiggly M/W style)
export const GrassAsset = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 opacity-60">
    <path 
      d="M5 30 Q10 10 15 20 Q20 5 25 25 Q30 10 35 30" 
      stroke="#2d6a4f" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

// SVG Paths or Components for Hand-Drawn style
export const FlowerAssets: Record<string, React.ReactNode> = {
  sunflower: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 95 V60" stroke="#43aa8b" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 75 Q40 70 35 80" stroke="#43aa8b" strokeWidth="3" fill="none" />
      <circle cx="50" cy="40" r="15" fill="#582f0e" stroke="#2a1a0a" strokeWidth="2" />
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="20"
          rx="6"
          ry="15"
          fill="#f9c74f"
          stroke="#e9b73f"
          strokeWidth="1"
          style={{
            transformOrigin: '50px 40px',
            transform: `rotate(${i * 30}deg)`,
          }}
        />
      ))}
    </svg>
  ),
  tulip: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 95 V50" stroke="#43aa8b" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 80 Q65 75 70 85" stroke="#43aa8b" strokeWidth="3" fill="none" />
      <path d="M35 50 Q50 70 65 50 Q65 20 50 10 Q35 20 35 50" fill="#f94144" stroke="#d93134" strokeWidth="2" />
      <path d="M45 50 Q50 30 55 50" fill="#d93134" />
    </svg>
  ),
  rose: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 95 V55" stroke="#43aa8b" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="35" r="20" fill="#f3722c" stroke="#e3621c" strokeWidth="2" />
      <path d="M50 15 Q65 25 50 35 Q35 25 50 15" fill="#9b2226" opacity="0.4" />
      <path d="M35 35 Q50 55 65 35" stroke="#9b2226" strokeWidth="2" fill="none" />
    </svg>
  ),
  daisy: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 95 V50" stroke="#43aa8b" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="40" r="8" fill="#f9c74f" stroke="#e9b73f" strokeWidth="2" />
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="25"
          rx="5"
          ry="12"
          fill="#ffffff"
          stroke="#dddddd"
          strokeWidth="1"
          style={{
            transformOrigin: '50px 40px',
            transform: `rotate(${i * 45}deg)`,
          }}
        />
      ))}
    </svg>
  ),
};
