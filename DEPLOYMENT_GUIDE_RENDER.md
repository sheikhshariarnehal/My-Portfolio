# 🚀 **RENDER DEPLOYMENT GUIDE**

## 📋 **Prerequisites**

- ✅ GitHub account
- ✅ Render account (free tier available)
- ✅ Your portfolio project ready

---

## 🔧 **STEP 1: Prepare Your Project for Render**

### **1.1 Create Render Configuration**

Create `render.yaml` in your **root directory**:

```yaml
services:
  - type: web
    name: portfolio-backend
    env: node
    plan: free
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
    healthCheckPath: /health
    
  - type: web
    name: portfolio-frontend
    env: static
    plan: free
    buildCommand: echo "Static files ready"
    staticPublishPath: ./frontend
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### **1.2 Update Backend Package.json**

Ensure `backend/package.json` has proper scripts:

```json
{
  "name": "portfolio-backend",
  "version": "1.0.0",
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
}
```

### **1.3 Update Server for Render**

Update `backend/server.js` to handle Render's port:

```javascript
// Add this at the top after other imports
const PORT = process.env.PORT || 3001;

// Update the server start section
const server = app.listen(PORT, '0.0.0.0', () => {
    logger.info('Server running on port ' + PORT, { 
        environment: process.env.NODE_ENV || 'development',
        port: PORT 
    });
});
```

---

## 🌐 **STEP 2: Deploy Backend to Render**

### **2.1 Push to GitHub**

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio with admin dashboard"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-portfolio.git

# Push to GitHub
git push -u origin main
```

### **2.2 Create Backend Service**

1. **Go to Render**: https://render.com
2. **Sign up/Login** with GitHub
3. **Click "New +"** → **Web Service**
4. **Connect your GitHub repository**
5. **Configure service**:
   - **Name**: `portfolio-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### **2.3 Environment Variables**

Add these in the **Environment** section:

```
NODE_ENV = production
JWT_SECRET = your-super-secure-jwt-secret-for-production-min-32-chars
ADMIN_USERNAME = admin
ADMIN_PASSWORD = your-secure-admin-password
MAX_FILE_SIZE = 5242880
CORS_ORIGIN = https://your-frontend-url.onrender.com
```

### **2.4 Deploy Backend**

1. **Click "Create Web Service"**
2. **Wait for build and deployment**
3. **Your backend will be live at**: `https://your-backend-name.onrender.com`

---

## 🎨 **STEP 3: Deploy Frontend to Render**

### **3.1 Create Frontend Service**

1. **Click "New +"** → **Static Site**
2. **Connect same GitHub repository**
3. **Configure static site**:
   - **Name**: `portfolio-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `echo "Static files ready"`
   - **Publish Directory**: `.`

### **3.2 Update Frontend API URLs**

Update your frontend JavaScript files to use the Render backend URL:

```javascript
// In your frontend JS files, replace localhost URLs with:
const API_BASE_URL = 'https://your-backend-name.onrender.com';

// Example:
fetch(`${API_BASE_URL}/api/projects`)
```

### **3.3 Deploy Frontend**

1. **Click "Create Static Site"**
2. **Your frontend will be live at**: `https://your-frontend-name.onrender.com`

---

## 🔧 **STEP 4: Connect Frontend and Backend**

### **4.1 Update CORS Settings**

Update the `CORS_ORIGIN` environment variable in your backend service:

```
CORS_ORIGIN = https://your-frontend-name.onrender.com
```

### **4.2 Update Frontend Configuration**

Create `frontend/config.js`:

```javascript
const config = {
    API_BASE_URL: 'https://your-backend-name.onrender.com',
    SOCKET_URL: 'https://your-backend-name.onrender.com'
};
```

---

## 🎯 **STEP 5: Test Your Deployment**

### **5.1 Test Endpoints**

- **Frontend**: `https://your-frontend-name.onrender.com`
- **Admin Dashboard**: `https://your-backend-name.onrender.com/admin`
- **API Health**: `https://your-backend-name.onrender.com/health`
- **Projects API**: `https://your-backend-name.onrender.com/api/projects`

### **5.2 Test Admin Login**

1. **Go to**: `https://your-backend-name.onrender.com/admin`
2. **Login with**: `admin` / `your-secure-admin-password`
3. **Test project creation and image upload**

---

## 💾 **STEP 6: Persistent Storage (Important!)**

### **6.1 Render Storage Limitations**

- **Free tier**: Ephemeral storage (files deleted on restart)
- **Paid tier**: Persistent disks available

### **6.2 Recommended: External Storage**

For production, use **Cloudinary** for images:

1. **Sign up**: https://cloudinary.com
2. **Get API credentials**
3. **Add to environment variables**:
   ```
   CLOUDINARY_CLOUD_NAME = your-cloud-name
   CLOUDINARY_API_KEY = your-api-key
   CLOUDINARY_API_SECRET = your-api-secret
   ```

---

## 🔄 **STEP 7: Automatic Deployments**

### **7.1 Auto-Deploy Setup**

- **Every push to main branch** triggers automatic deployment
- **Both frontend and backend** will redeploy automatically
- **Build logs** available in Render dashboard

### **7.2 Manual Deployments**

- **Trigger manual deploys** from Render dashboard
- **Rollback to previous versions** if needed

---

## 📊 **STEP 8: Monitoring & Logs**

### **8.1 View Logs**

- **Real-time logs** in Render dashboard
- **Error tracking** and debugging
- **Performance metrics**

### **8.2 Health Checks**

- **Automatic health monitoring**
- **Email alerts** for downtime
- **Uptime statistics**

---

## 🎉 **DEPLOYMENT COMPLETE!**

Your portfolio is now live on Render with:

### **✅ Backend Service**
- **URL**: `https://your-backend-name.onrender.com`
- **Admin Dashboard**: `/admin`
- **API Endpoints**: `/api/*`
- **Real-time features**: Socket.io enabled

### **✅ Frontend Service**
- **URL**: `https://your-frontend-name.onrender.com`
- **Static hosting**: Fast global CDN
- **Custom domain**: Available on paid plans

### **✅ Features Working**
- ✅ **Project management**
- ✅ **Image uploads** (with external storage recommended)
- ✅ **Real-time updates**
- ✅ **Secure authentication**
- ✅ **Professional admin dashboard**

---

## 🚀 **Next Steps**

1. **Set up custom domain** (paid plans)
2. **Configure external image storage** (Cloudinary)
3. **Set up monitoring** and alerts
4. **Optimize performance** with caching
5. **Add backup strategies** for your data

**Your portfolio is now live and ready for the world!** 🌟
