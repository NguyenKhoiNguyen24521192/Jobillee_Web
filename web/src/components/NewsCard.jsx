import React from 'react';
import { Button } from './ui/button.jsx';

function NewsCard({ image, title, description, date, onClick }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        {date && (
          <p className="text-sm text-gray-500 mb-2">{date}</p>
        )}
        <h3 className="text-lg font-bold text-[rgb(var(--jobillee-dark))] mb-3 leading-snug">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
          {description}
        </p>
        <Button 
          onClick={onClick}
          className="w-full bg-[rgb(var(--jobillee-red))] hover:bg-[rgb(var(--jobillee-red))]/90 text-white font-semibold transition-all duration-200 active:scale-98 mt-auto"
        >
          XEM THÊM
        </Button>
      </div>
    </div>
  );
}

export default NewsCard;