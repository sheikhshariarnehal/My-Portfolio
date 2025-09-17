const express = require('express');
const router = express.Router();
const { generateToken, comparePassword, hashPassword } = require('../middleware/auth');
const { validateLogin } = require('../middleware/validation');
const logger = require('../utils/logger');

// Simple in-memory user store (in production, use a proper database)
const users = {
    admin: {
        username: 'admin',
        password: null, // Will be set on first run
        role: 'admin'
    }
};

// Initialize admin password on startup
const initializeAdmin = async () => {
    if (!users.admin.password) {
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        users.admin.password = await hashPassword(adminPassword);
        logger.info('Admin user initialized');
    }
};

// Initialize admin on module load
initializeAdmin();

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', validateLogin, async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = users[username];
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(user);

        logger.info('User logged in successfully', { username });

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        logger.error('Login error', { error: error.message });
        next(error);
    }
});

// @route   POST /api/auth/verify
// @desc    Verify token validity
// @access  Private
router.post('/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    const jwt = require('jsonwebtoken');
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid token'
            });
        }

        res.json({
            success: true,
            message: 'Token is valid',
            user: {
                username: user.username,
                role: user.role
            }
        });
    });
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', (req, res) => {
    // In a stateless JWT system, logout is handled client-side
    // by removing the token from storage
    res.json({
        success: true,
        message: 'Logout successful'
    });
});

module.exports = router;
