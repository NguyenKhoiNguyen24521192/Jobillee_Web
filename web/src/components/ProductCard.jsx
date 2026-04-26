import React from 'react';
import { Button } from './ui/button.jsx';

function ProductCard({ image, title, buttonText, onClick }) {
  return (
    <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl">
      <div className="wood-texture p-6">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <Button 
          onClick={onClick}
          className="w-full bg-[rgb(var(--jobillee-red))] hover:bg-[rgb(var(--jobillee-red))]/90 text-[rgb(var(--jobillee-yellow))] font-bold py-6 text-sm transition-all duration-200 active:scale-98"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;