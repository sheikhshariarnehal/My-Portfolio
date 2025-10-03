const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Absolute paths for cPanel deployment
const FRONTEND_BASE = '/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/Frontend';
const IMAGES_DIR = path.join(FRONTEND_BASE, 'assets/images/projects');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files with absolute paths
app.use('/uploads', express.static(IMAGES_DIR));
app.use('/admin', express.static(PUBLIC_DIR));

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API is running!',
    endpoints: {
      admin: '/admin',
      api: {
        auth: '/api/auth',
        projects: '/api/projects'
      }
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// API info route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        verify: 'GET /api/auth/verify'
      },
      projects: {
        list: 'GET /api/projects',
        create: 'POST /api/projects',
        update: 'PUT /api/projects/:id',
        delete: 'DELETE /api/projects/:id',
        upload: 'POST /api/projects/upload'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Admin Dashboard: /admin`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`📁 Images Directory: ${IMAGES_DIR}`);
});

