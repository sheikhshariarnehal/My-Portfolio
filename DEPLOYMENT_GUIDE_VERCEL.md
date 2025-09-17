# 🚀 **VERCEL DEPLOYMENT GUIDE**

## 📋 **Prerequisites**

- ✅ GitHub account
- ✅ Vercel account (free tier available)
- ✅ Your portfolio project ready

---

## 🔧 **STEP 1: Prepare Your Project for Vercel**

### **1.1 Create Vercel Configuration**

Create `vercel.json` in your **root directory**:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/admin/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/assets/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### **1.2 Update Backend for Vercel**

Create `backend/package.json` (if not exists):

```json
{
  "name": "portfolio-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
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

### **1.3 Environment Variables**

Create `backend/.env.production`:

```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secure-jwt-secret-for-production-min-32-chars
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
MAX_FILE_SIZE=5242880
CORS_ORIGIN=https://your-domain.vercel.app
```

---

## 🌐 **STEP 2: Deploy to Vercel**

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

### **2.2 Connect to Vercel**

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure project settings**:
   - **Project Name**: `my-portfolio`
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (leave empty)

### **2.3 Environment Variables in Vercel**

1. **Go to Project Settings** → **Environment Variables**
2. **Add these variables**:
   ```
   NODE_ENV = production
   JWT_SECRET = your-super-secure-jwt-secret-for-production-min-32-chars
   ADMIN_USERNAME = admin
   ADMIN_PASSWORD = your-secure-admin-password
   MAX_FILE_SIZE = 5242880
   CORS_ORIGIN = https://your-project-name.vercel.app
   ```

### **2.4 Deploy**

1. **Click "Deploy"**
2. **Wait for build to complete**
3. **Your site will be live at**: `https://your-project-name.vercel.app`

---

## 🔧 **STEP 3: Post-Deployment Configuration**

### **3.1 Update CORS Origin**

After deployment, update the `CORS_ORIGIN` environment variable with your actual Vercel URL.

### **3.2 Test Your Deployment**

- **Frontend**: `https://your-project-name.vercel.app`
- **Admin Dashboard**: `https://your-project-name.vercel.app/admin`
- **API**: `https://your-project-name.vercel.app/api/projects`

---

## ⚠️ **IMPORTANT VERCEL LIMITATIONS**

### **File Upload Limitations**
- **Serverless functions have limited file system access**
- **Uploaded images won't persist between deployments**
- **Consider using external storage (Cloudinary, AWS S3)**

### **Recommended Solution for Images**
Use **Cloudinary** for image storage:

1. **Sign up at**: https://cloudinary.com
2. **Install Cloudinary SDK**:
   ```bash
   npm install cloudinary
   ```
3. **Update upload middleware** to use Cloudinary instead of local storage

---

## 🎯 **STEP 4: Custom Domain (Optional)**

1. **Go to Project Settings** → **Domains**
2. **Add your custom domain**
3. **Update DNS records** as instructed
4. **SSL certificate** will be automatically provisioned

---

## 🔄 **STEP 5: Automatic Deployments**

- **Every push to main branch** triggers automatic deployment
- **Preview deployments** for pull requests
- **Rollback capability** from Vercel dashboard

---

## 📊 **Monitoring & Analytics**

- **Built-in analytics** in Vercel dashboard
- **Performance monitoring**
- **Error tracking**
- **Usage statistics**

---

## 🎉 **DEPLOYMENT COMPLETE!**

Your portfolio is now live on Vercel with:
- ✅ **Professional admin dashboard**
- ✅ **Real-time project management**
- ✅ **Secure authentication**
- ✅ **Automatic deployments**
- ✅ **Global CDN**
- ✅ **SSL certificate**

**Next**: Check the Render deployment guide for backend-specific hosting!
