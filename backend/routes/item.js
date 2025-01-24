// routes/items.js
const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const { name, category, quantity, description } = req.body;

  const newItem = new Item({
    name,
    category,
    quantity,
    description,
  });

  try {
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update an existing item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.send('Item deleted');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
