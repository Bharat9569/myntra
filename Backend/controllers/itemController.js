const Item = require('../models/item');

// GET all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find(); 
   
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items', error });
  }
};

// POST add new item
const addItem = async (req, res) => {
  try {
    const newItem = new Item(req.body); 
    await newItem.save(); 
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item', error });
  }
};

// DELETE an item by ID
const deleteItem = async (req, res) => {
  
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item', error });
  }
};

// PUT update an item by ID
const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item', error });
  }
};

module.exports = { getItems, addItem, deleteItem, updateItem };
