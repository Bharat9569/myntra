const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware')
const { registerUser, loginUser, getUsers, blockUser, unblockUser } = require('../controllers/authController');


router.post('/register', registerUser);


router.post('/login', loginUser);


router.get('/users',authMiddleware, getUsers); 
router.patch('/users/:id/block',authMiddleware, blockUser); 
router.patch('/users/:id/unblock',authMiddleware, unblockUser); 

module.exports = router;
