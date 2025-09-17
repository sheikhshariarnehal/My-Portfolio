# 📋 Render Deployment Checklist

## ✅ Pre-Deployment

- [ ] Project structure verified (backend/, frontend/, assets/)
- [ ] Backend package.json exists with correct scripts
- [ ] All code committed to Git
- [ ] GitHub repository is public or accessible to Render

## 🚀 Render Deployment Steps

### Backend Web Service
- [ ] Create Render account at https://render.com
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Configure service:
  - Name: portfolio-backend
  - Environment: Node
  - Root Directory: backend
  - Build Command: npm install
  - Start Command: npm start
  - Plan: Free

### Environment Variables (Backend)
Add these in Render dashboard:
- [ ] NODE_ENV = production
- [ ] JWT_SECRET = (32+ character secure string)
- [ ] ADMIN_USERNAME = admin
- [ ] ADMIN_PASSWORD = (your secure password)
- [ ] MAX_FILE_SIZE = 5242880
- [ ] CORS_ORIGIN = * (update after frontend deployment)

### Frontend Static Site
- [ ] Click "New +" → "Static Site"
- [ ] Connect same GitHub repository
- [ ] Configure site:
  - Name: portfolio-frontend
  - Root Directory: frontend
  - Build Command: echo "Ready"
  - Publish Directory: .

### Final Configuration
- [ ] Update CORS_ORIGIN with frontend URL
- [ ] Test backend: https://your-backend.onrender.com/health
- [ ] Test admin: https://your-backend.onrender.com/admin
- [ ] Test frontend: https://your-frontend.onrender.com

## 🧪 Testing

- [ ] Portfolio website loads
- [ ] Admin dashboard accessible
- [ ] Login functionality works
- [ ] Create new project works
- [ ] Image upload works (temporary storage)
- [ ] Real-time updates work
- [ ] Mobile responsive design

## 🎉 Post-Deployment

- [ ] Share portfolio URL
- [ ] Update resume/LinkedIn with live URL
- [ ] Consider custom domain (free)
- [ ] Set up Cloudinary for persistent images (optional)
- [ ] Monitor performance and uptime

## 📝 Notes

- Free tier sleeps after 15 minutes of inactivity
- First load after sleep takes 30-60 seconds
- Uploaded images are temporary on free tier
- 750 hours/month limit (sufficient for portfolio)
- Automatic deployments on Git push
