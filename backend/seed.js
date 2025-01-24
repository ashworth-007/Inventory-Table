const mongoose = require('mongoose');
require('dotenv').config();
const  Item  = require('./models/Item');  // Assuming your model is in ./models/item.js

const mockItems = [
  // Electronics
  { name: 'Laptop', category: 'Electronics', quantity: 50, description: 'A powerful laptop with 16GB RAM and 512GB SSD' },
  { name: 'Headphones', category: 'Electronics', quantity: 30, description: 'Noise-cancelling headphones with great sound quality' },
  { name: 'Smartphone', category: 'Electronics', quantity: 100, description: 'Latest model with 5G connectivity and 128GB storage' },
  { name: 'Smartwatch', category: 'Electronics', quantity: 25, description: 'Fitness tracking and heart rate monitoring smartwatch' },
  { name: 'Bluetooth Speaker', category: 'Electronics', quantity: 45, description: 'Portable speaker with 10 hours of battery life' },

  // Furniture
  { name: 'Sofa', category: 'Furniture', quantity: 20, description: 'Comfortable 3-seater leather sofa' },
  { name: 'Dining Table', category: 'Furniture', quantity: 15, description: 'Wooden dining table with seating for 6 people' },
  { name: 'Bookshelf', category: 'Furniture', quantity: 40, description: 'Wooden bookshelf with 5 shelves' },
  { name: 'Office Chair', category: 'Furniture', quantity: 60, description: 'Ergonomic office chair with lumbar support' },
  { name: 'Coffee Table', category: 'Furniture', quantity: 35, description: 'Modern glass-top coffee table' },

  // Clothing
  { name: 'T-Shirt', category: 'Clothing', quantity: 150, description: 'Cotton t-shirt available in multiple sizes and colors' },
  { name: 'Jeans', category: 'Clothing', quantity: 120, description: 'Denim jeans, available in regular and slim fit' },
  { name: 'Jacket', category: 'Clothing', quantity: 50, description: 'Winter jacket with fleece lining' },
  { name: 'Sneakers', category: 'Clothing', quantity: 200, description: 'Comfortable sneakers for daily wear' },
  { name: 'Sweater', category: 'Clothing', quantity: 70, description: 'Woolen sweater perfect for winter' },

  // Home Appliances
  { name: 'Microwave Oven', category: 'Home Appliances', quantity: 40, description: 'Microwave oven with 30L capacity and multiple cooking modes' },
  { name: 'Blender', category: 'Home Appliances', quantity: 60, description: 'High-speed blender for smoothies and juices' },
  { name: 'Washing Machine', category: 'Home Appliances', quantity: 25, description: 'Automatic washing machine with 7kg capacity' },
  { name: 'Refrigerator', category: 'Home Appliances', quantity: 20, description: 'Energy-efficient refrigerator with a 300L capacity' },
  { name: 'Air Conditioner', category: 'Home Appliances', quantity: 15, description: 'Split AC with 1.5-ton cooling capacity' },

  // Kitchenware
  { name: 'Cutlery Set', category: 'Kitchenware', quantity: 75, description: 'Stainless steel cutlery set for 6 people' },
  { name: 'Cookware Set', category: 'Kitchenware', quantity: 50, description: 'Non-stick cookware set with 10 pieces' },
  { name: 'Pressure Cooker', category: 'Kitchenware', quantity: 40, description: 'Stainless steel pressure cooker with 5L capacity' },
  { name: 'Coffee Maker', category: 'Kitchenware', quantity: 35, description: 'Automatic coffee maker with 12-cup capacity' },
  { name: 'Toaster', category: 'Kitchenware', quantity: 100, description: '2-slice toaster with adjustable browning levels' },

  // Sports & Outdoors
  { name: 'Tennis Racket', category: 'Sports & Outdoors', quantity: 50, description: 'Professional tennis racket with durable strings' },
  { name: 'Yoga Mat', category: 'Sports & Outdoors', quantity: 120, description: 'Non-slip yoga mat with extra cushioning' },
  { name: 'Football', category: 'Sports & Outdoors', quantity: 200, description: 'Durable football suitable for both indoor and outdoor play' },
  { name: 'Bicycle', category: 'Sports & Outdoors', quantity: 75, description: 'Mountain bike with 21-speed gear system' },
  { name: 'Tent', category: 'Sports & Outdoors', quantity: 40, description: '2-person tent with waterproof fabric' },

  // Toys & Games
  { name: 'Lego Set', category: 'Toys & Games', quantity: 150, description: 'Lego building set for ages 6 and up' },
  { name: 'Action Figures', category: 'Toys & Games', quantity: 200, description: 'Set of superhero action figures' },
  { name: 'Board Game', category: 'Toys & Games', quantity: 120, description: 'Family board game for 2-4 players' },
  { name: 'Dollhouse', category: 'Toys & Games', quantity: 80, description: 'Wooden dollhouse with furniture set' },
  { name: 'Toy Car', category: 'Toys & Games', quantity: 250, description: 'Remote-controlled toy car' },

  // Books & Stationery
  { name: 'Notebook', category: 'Books & Stationery', quantity: 500, description: 'Spiral-bound notebook with 100 pages' },
  { name: 'Pen Set', category: 'Books & Stationery', quantity: 300, description: 'Ballpoint pen set with 12 colors' },
  { name: 'Textbook', category: 'Books & Stationery', quantity: 150, description: 'Mathematics textbook for high school students' },
  { name: 'Marker Set', category: 'Books & Stationery', quantity: 200, description: 'Set of 8 colorful markers' },
  { name: 'Journal', category: 'Books & Stationery', quantity: 250, description: 'Leather-bound journal for writing and sketching' },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB (without deprecated options)
    await mongoose.connect(process.env.MONGO_URI);

    // Delete all existing items
    await Item.deleteMany({});

    // Insert mock data
    await Item.insertMany(mockItems);

    console.log('Mock data seeded successfully');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
