import React from 'react';

const CategoryFilter = ({ filterCategory, setFilterCategory, categorySuggestions, handleCategorySelect }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Filter by Category</h2>
      <input
        type="text"
        placeholder="Search categories..."
        className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      />
      {categorySuggestions.length > 0 && (
        <ul className="mt-2 space-y-2">
          {categorySuggestions.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategorySelect(category)}
              className="p-2 cursor-pointer hover:bg-gray-200 rounded-md"
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryFilter;
