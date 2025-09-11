import React, { useState } from 'react';

const RatingFilter = () => {
  const [ratings, setRatings] = useState([
    { id: 5, stars: 5, checked: false },
    { id: 4, stars: 4, checked: false },
    { id: 3, stars: 3, checked: false },
    { id: 2, stars: 2, checked: false },
  ]);

  const handleRatingChange = (id) => {
    const updatedRatings = ratings.map((rating) =>
      rating.id === id ? { ...rating, checked: !rating.checked } : rating
    );
    setRatings(updatedRatings);
  };

  const handleClearAll = () => {
    setRatings(ratings.map(rating => ({ ...rating, checked: false })));
  };

  const hasSelectedRatings = ratings.some(rating => rating.checked);

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Rating</h2>
        {hasSelectedRatings && (
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-150 underline"
          >
            Clear
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {ratings.map((rating) => (
          <label
            key={rating.id}
            className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-150"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={rating.checked}
                onChange={() => handleRatingChange(rating.id)}
                className="sr-only"
              />
              <div className={`
                w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                ${rating.checked 
                  ? 'bg-yellow-500 border-yellow-500' 
                  : 'border-gray-300 group-hover:border-yellow-400'
                }
              `}>
                {rating.checked && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            
            <div className="ml-3 flex items-center">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 transition-colors duration-150 ${
                      i < rating.stars ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className={`ml-2 text-sm transition-colors duration-150 ${
                rating.checked ? 'text-yellow-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                And Up
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;