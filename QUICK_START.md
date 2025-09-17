# 🚀 Quick Start - Deploy to Render

## 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## 2. Deploy Backend
1. Go to https://render.com
2. New Web Service → Connect GitHub
3. Root Directory: `backend`
4. Build: `npm install`
5. Start: `npm start`

## 3. Add Environment Variables
```
NODE_ENV=production
JWT_SECRET=your-32-char-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password
CORS_ORIGIN=*
```

## 4. Deploy Frontend
1. New Static Site → Same repo
2. Root Directory: `frontend`
3. Build: `echo "Ready"`

## 5. Update CORS
Update CORS_ORIGIN with your frontend URL

## 6. Test Everything!
- Portfolio: https://your-frontend.onrender.com
- Admin: https://your-backend.onrender.com/admin

Done! 🎉
