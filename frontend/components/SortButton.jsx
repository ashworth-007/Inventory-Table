import React from 'react';

const SortButton = ({ handleSort, sortAscending }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <button
        onClick={handleSort}
        className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
      >
        Sort by Quantity {sortAscending ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
};

export default SortButton;
