const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

// Register user
const registerUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role: role || 'user' });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (user.isBlocked) {
            return res.status(403).json({ message: "User is blocked by admin" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            user: { email: user.email, role: user.role },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all users (for admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get users', error: err });
    }
};

// Block a user
const blockUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User blocked successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Failed to block user", error: err });
    }
};

// Unblock a user
const unblockUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User unblocked successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Failed to unblock user", error: err });
    }
};

module.exports = { registerUser, loginUser, getUsers, blockUser, unblockUser };
