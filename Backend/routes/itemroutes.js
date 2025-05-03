const express = require('express');
const { getItems, addItem, deleteItem, updateItem } = require('../controllers/itemController');

const router = express.Router();

router.get('/items', getItems);
router.post('/items', addItem);
router.delete('/items/:id', deleteItem);
router.put('/items/:id', updateItem);  

module.exports = router;
