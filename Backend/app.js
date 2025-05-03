const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemroutes');
const authRoutes = require('./routes/authroutes');
const paymentRoutes = require('./routes/paymentroutes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// CORS headers (if not using cors package directly)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// API Routes
app.use('/api/m1', itemRoutes);
app.use('/api/m1', authRoutes);
app.use('/api/m1', paymentRoutes);


const frontendPath = path.join(__dirname,"..", "Myntra-clone", "dist");
app.use(express.static(frontendPath));


app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
