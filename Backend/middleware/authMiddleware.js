const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {

  const token = req.header('Authorization')?.split(' ')[1]; 

 
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    req.user = user;

   
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access Denied: Admin privileges required' });
    }

   
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
