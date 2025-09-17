#!/usr/bin/env node

/**
 * Deployment Setup Script
 * Prepares your portfolio for deployment to Vercel or Render
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Portfolio Deployment Setup');
console.log('==============================\n');

// Check if we're in the right directory
const requiredFiles = ['backend', 'frontend', 'assets'];
const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));

if (missingFiles.length > 0) {
    console.error('❌ Missing required directories:', missingFiles.join(', '));
    console.error('Please run this script from your portfolio root directory.');
    process.exit(1);
}

console.log('✅ Project structure verified');

// Create package.json for backend if it doesn't exist
const backendPackageJson = path.join('backend', 'package.json');
if (!fs.existsSync(backendPackageJson)) {
    console.log('📦 Creating backend package.json...');
    
    const packageContent = {
        "name": "portfolio-backend",
        "version": "1.0.0",
        "description": "Portfolio backend with admin dashboard",
        "main": "server.js",
        "scripts": {
            "start": "node server.js",
            "dev": "nodemon server.js",
            "build": "echo 'No build step required'"
        },
        "engines": {
            "node": ">=18.0.0"
        },
        "dependencies": {
            "express": "^4.18.2",
            "cors": "^2.8.5",
            "helmet": "^7.0.0",
            "morgan": "^1.10.0",
            "bcryptjs": "^2.4.3",
            "jsonwebtoken": "^9.0.2",
            "express-validator": "^7.0.1",
            "express-rate-limit": "^6.8.1",
            "multer": "^1.4.5-lts.1",
            "uuid": "^9.0.0",
            "socket.io": "^4.7.2",
            "dotenv": "^16.3.1"
        }
    };
    
    fs.writeFileSync(backendPackageJson, JSON.stringify(packageContent, null, 2));
    console.log('✅ Backend package.json created');
}

// Create production environment file template
const envTemplate = path.join('backend', '.env.production.template');
if (!fs.existsSync(envTemplate)) {
    console.log('🔧 Creating environment template...');
    
    const envContent = `# Production Environment Variables
# Copy this to .env.production and fill in your values

NODE_ENV=production
PORT=10000

# Security
JWT_SECRET=your-super-secure-jwt-secret-for-production-min-32-chars
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password

# File Upload
MAX_FILE_SIZE=5242880

# CORS (Update with your frontend URL)
CORS_ORIGIN=https://your-frontend-url.com

# Optional: Cloudinary for image storage
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
`;
    
    fs.writeFileSync(envTemplate, envContent);
    console.log('✅ Environment template created');
}

// Create deployment checklist
const checklist = `# 📋 Deployment Checklist

## Before Deployment

- [ ] Update environment variables in .env.production
- [ ] Test your application locally
- [ ] Commit all changes to Git
- [ ] Push to GitHub repository

## Render Deployment

- [ ] Create Render account
- [ ] Create Web Service for backend
- [ ] Create Static Site for frontend
- [ ] Configure environment variables
- [ ] Test deployed application

## Vercel Deployment

- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Configure environment variables
- [ ] Test deployed application

## Post-Deployment

- [ ] Set up custom domain (optional)
- [ ] Configure Cloudinary for images
- [ ] Set up monitoring and alerts
- [ ] Update CORS_ORIGIN with actual URLs

## Testing

- [ ] Frontend loads correctly
- [ ] Admin dashboard accessible
- [ ] Login functionality works
- [ ] Project creation works
- [ ] Image upload works
- [ ] Real-time updates work

## Production Optimizations

- [ ] Enable compression
- [ ] Set up proper caching
- [ ] Configure error monitoring
- [ ] Set up backup strategy
`;

fs.writeFileSync('DEPLOYMENT_CHECKLIST.md', checklist);
console.log('✅ Deployment checklist created');

// Summary
console.log('\n🎉 Setup Complete!');
console.log('==================');
console.log('');
console.log('Files created:');
console.log('- backend/package.json (if missing)');
console.log('- backend/.env.production.template');
console.log('- DEPLOYMENT_CHECKLIST.md');
console.log('- vercel.json (already exists)');
console.log('- render.yaml (already exists)');
console.log('');
console.log('Next steps:');
console.log('1. Review the deployment guides:');
console.log('   - DEPLOYMENT_GUIDE_RENDER.md (Recommended)');
console.log('   - DEPLOYMENT_GUIDE_VERCEL.md');
console.log('   - DEPLOYMENT_COMPARISON.md');
console.log('');
console.log('2. Fill in your environment variables:');
console.log('   - Copy backend/.env.production.template to backend/.env.production');
console.log('   - Update with your secure values');
console.log('');
console.log('3. Follow the deployment checklist:');
console.log('   - DEPLOYMENT_CHECKLIST.md');
console.log('');
console.log('🚀 Ready to deploy your portfolio!');
