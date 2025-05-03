const Razorpay = require('razorpay');
require('dotenv').config();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_Xi2ECCopU2ajwC',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'nooP3GqBhh8dWt9L4KoRp' ,
});

const createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  console.log('Request received with amount:', amount); 

  const options = {
    amount: amount,  
    currency: currency || 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  try {
    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);
    console.log('Order created:', order);
    res.json(order);
  } catch (err) {
    console.error('Error creating Razorpay order:', err); // Log the error
    res.status(500).json({ error: 'Failed to create Razorpay order', details: err.message });
  }
};

module.exports = { createOrder };

