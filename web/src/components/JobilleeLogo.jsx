import React from 'react';

function JobilleeLogo({ className = "h-12 w-12", color = "currentColor" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      style={{ transform: 'scaleX(-1)' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bee body */}
      <ellipse cx="50" cy="55" rx="18" ry="25" fill={color} />
      
      {/* Bee head */}
      <circle cx="50" cy="28" r="12" fill={color} />
      
      {/* Stripes */}
      <rect x="35" y="45" width="30" height="4" fill="#FFD60A" rx="2" />
      <rect x="35" y="55" width="30" height="4" fill="#FFD60A" rx="2" />
      <rect x="35" y="65" width="30" height="4" fill="#FFD60A" rx="2" />
      
      {/* Left wing */}
      <ellipse 
        cx="35" 
        cy="45" 
        rx="15" 
        ry="20" 
        fill={color}
        opacity="0.6"
        transform="rotate(-30 35 45)"
      />
      
      {/* Right wing */}
      <ellipse 
        cx="65" 
        cy="45" 
        rx="15" 
        ry="20" 
        fill={color}
        opacity="0.6"
        transform="rotate(30 65 45)"
      />
      
      {/* Antennae */}
      <line x1="45" y1="20" x2="42" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="20" x2="58" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="42" cy="12" r="2" fill={color} />
      <circle cx="58" cy="12" r="2" fill={color} />
      
      {/* Eyes */}
      <circle cx="45" cy="28" r="2" fill="white" />
      <circle cx="55" cy="28" r="2" fill="white" />
    </svg>
  );
}

export default JobilleeLogo;