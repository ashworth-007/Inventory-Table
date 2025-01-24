import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 0, description: '' });
  const [filterCategory, setFilterCategory] = useState('');
  const [categorySuggestions, setCategorySuggestions] = useState([]); // To store matching categories
  const [sortAscending, setSortAscending] = useState(true);
  const [editItem, setEditItem] = useState(null); // Store the item being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  useEffect(() => {
    axios.get('https://inventory-table.onrender.com/items')
      .then(response => setItems(response.data));
  }, []);

  useEffect(() => {
    // Generate unique categories from items data
    const categories = [...new Set(items.map(item => item.category))];
    setCategorySuggestions(
      categories.filter(category =>
        category.toLowerCase().includes(filterCategory.toLowerCase())
      )
    );
  }, [filterCategory, items]);

  const addItem = () => {
    axios.post('https://inventory-table.onrender.com/items', newItem)
      .then(response => {
        setItems([...items, response.data]);
        setNewItem({ name: '', category: '', quantity: 0, description: '' });
      });
  };

  const updateItem = (id, updatedItem) => {
    axios.put(`https://inventory-table.onrender.com/items/${id}`, updatedItem)
      .then(response => {
        setItems(items.map(item => item._id === id ? response.data : item));
        setIsModalOpen(false); // Close the modal after updating
      });
  };

  const deleteItem = (id) => {
    axios.delete(`https://inventory-table.onrender.com/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item._id !== id));
      });
  };

  const handleSort = () => {
    setSortAscending(!sortAscending);
  };

  const handleCategorySelect = (category) => {
    setFilterCategory(category); // Set the selected category as the filter
  };

  const handleEditItem = (item) => {
    setEditItem({ ...item });
    setIsModalOpen(true); // Open the modal to edit
  };

  const filteredItems = items.filter(item =>
    filterCategory ? item.category.toLowerCase().includes(filterCategory.toLowerCase()) : true
  );
  const sortedItems = filteredItems.sort((a, b) => sortAscending ? a.quantity - b.quantity : b.quantity - a.quantity);

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditItem(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">Inventory Management</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <button
              onClick={addItem}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Add Item
            </button>
          </div>
        </div>

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

        <div className="mb-6 flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              onClick={handleSort}
              className="border border-black-800 bg-yellow-400 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Sort by Quantity {sortAscending ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>

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
                <td className="border p-4">
  <div className="flex justify-center space-x-6">
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
  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Editing */}
        {/* Modal for Editing */}
{isModalOpen && (
  <div className=" fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
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
)}

      </div>
    </div>
  );
};

export default Home;

