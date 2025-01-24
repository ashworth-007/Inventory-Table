import React from 'react';

const ItemTable = ({ sortedItems, handleEditItem, deleteItem }) => {
  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-4">Name</th>
          <th className="border p-4">Category</th>
          <th className="border p-4">Quantity</th>
          <th className="border p-4">Description</th>
          <th className="border p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map(item => (
          <tr key={item._id} className={item.quantity < 10 ? 'bg-red-200' : ''}>
            <td className="border p-4">{item.name}</td>
            <td className="border p-4">{item.category}</td>
            <td className="border p-4">{item.quantity}</td>
            <td className="border p-4">{item.description}</td>
            <td className="border p-4 flex space-x-4 justify-center">
              <button
                onClick={() => handleEditItem(item)}
                className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemTable;
