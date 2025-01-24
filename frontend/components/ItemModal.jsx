import React from 'react';

const ItemModal = ({ isModalOpen, editItem, handleModalChange, updateItem, setIsModalOpen }) => {
  return (
    isModalOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg w-1/3">
          <h2 className="text-2xl font-semibold mb-6">Edit Item</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            value={editItem.name}
            onChange={handleModalChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="p-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            value={editItem.category}
            onChange={handleModalChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="p-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            value={editItem.quantity}
            onChange={handleModalChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="p-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
            value={editItem.description}
            onChange={handleModalChange}
          />
          <div className="flex gap-x-6 mt-6 justify-center">
            <button
              onClick={() => updateItem(editItem._id, editItem)}
              className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Save
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ItemModal;
