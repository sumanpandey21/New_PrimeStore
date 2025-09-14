import React, { useState } from 'react';

const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleApply = () => {
    console.log(`Filter applied: Min ${minPrice}, Max ${maxPrice}`);
  };

  const handleClear = () => {
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="border-b border-gray-200 pb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Price</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="number"
              value={minPrice}
              onChange={handleMinChange}
              placeholder="Min"
              min={1}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
          <span className="text-gray-500 font-medium">-</span>
          <div className="relative flex-1">
            <input
              type="number"
              value={maxPrice}
              onChange={handleMaxChange}
              placeholder="Max"
              min={1}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
          <button
            onClick={handleApply}
            className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-md hover:shadow-lg group"
            title="Apply Filter"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {(minPrice || maxPrice) && (
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-150 underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default PriceFilter;