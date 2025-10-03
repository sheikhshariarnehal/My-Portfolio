# 🚀 Portfolio Dashboard - Quick Reference Card

## ⚡ START SERVER
```bash
cd backend
npm run dev
```

## 🌐 ACCESS DASHBOARD
**URL:** http://localhost:5001/admin

**Login:**
- Username: `admin`
- Password: `admin123`

## 📁 KEY FILES

| File | Purpose |
|------|---------|
| `backend/server.js` | Main server |
| `backend/.env` | Configuration (CHANGE DEFAULTS!) |
| `backend/routes/projects.js` | Project CRUD + uploads |
| `backend/routes/auth.js` | Login/logout |
| `backend/public/index.html` | Dashboard UI |
| `Frontend/projects/projects.json` | Project database |
| `Frontend/assets/images/projects/` | Image storage |

## 🔧 COMMON COMMANDS

```bash
# Install dependencies
cd backend
npm install

# Start development server (auto-restart)
npm run dev

# Start production server
npm start

# Check Node.js version
node --version
```

## 🎯 DASHBOARD FEATURES

✅ Login/Logout
✅ View all projects
✅ Filter by category
✅ Add new project
✅ Edit project
✅ Delete project
✅ Upload images
✅ Responsive design

## 🔒 SECURITY CHECKLIST

Before deploying:
- [ ] Change `ADMIN_USERNAME` in .env
- [ ] Change `ADMIN_PASSWORD` in .env
- [ ] Change `JWT_SECRET` in .env
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS

## 🐛 QUICK FIXES

**Port in use?**
Change `PORT=5001` to `PORT=3000` in `.env`

**Can't login?**
Check credentials in `backend/.env`

**Images not showing?**
Verify path: `Frontend/assets/images/projects/`

**Server won't start?**
Run `npm install` in backend folder

## 📊 API ENDPOINTS

### Public
- `GET /api/projects` - All projects
- `GET /api/projects/:index` - Single project

### Protected (Need JWT)
- `POST /api/auth/login` - Login
- `POST /api/projects` - Create
- `PUT /api/projects/:index` - Update
- `DELETE /api/projects/:index` - Delete

## 📱 RESPONSIVE BREAKPOINTS

- Desktop: > 768px
- Tablet: 768px
- Mobile: < 768px

## 🎨 TECH STACK

**Backend:**
- Node.js
- Express.js
- JWT (jsonwebtoken)
- Multer (file upload)
- bcryptjs (password hashing)

**Frontend:**
- HTML5
- CSS3 (Dark theme)
- Vanilla JavaScript
- Font Awesome icons

**Storage:**
- JSON file database
- File system for images

## 📚 DOCUMENTATION

- **Quick Setup:** `DASHBOARD_SETUP.md`
- **Complete Guide:** `DASHBOARD_COMPLETE.md`
- **Full Docs:** `backend/README.md`
- **This Card:** `QUICK_REFERENCE.md`

## 💡 PRO TIPS

1. Backup `projects.json` regularly
2. Test locally before deploying
3. Use strong passwords in production
4. Monitor server logs
5. Keep dependencies updated

## 🎯 PROJECT CATEGORIES

- `mern` - MERN Stack
- `basicweb` - Basic Web
- `android` - Android Apps
- `ml` - Machine Learning

## 🖼️ IMAGE SPECS

- **Formats:** JPG, PNG, WEBP, GIF
- **Max Size:** 5MB
- **Recommended:** 800x600px
- **Storage:** `Frontend/assets/images/projects/`

## 🚀 DEPLOYMENT PLATFORMS

- Heroku (Easy)
- Railway (Modern)
- Render (Popular)
- DigitalOcean (Full control)
- Vercel (Serverless)

## 📞 NEED HELP?

1. Check troubleshooting in `DASHBOARD_COMPLETE.md`
2. Review `backend/README.md`
3. Check browser console (F12)
4. Verify Node.js version (v14+)
5. Ensure all dependencies installed

---

**Server Running?** ✅ http://localhost:5001/admin
**Need to Stop?** Press `Ctrl+C` in terminal

---

Made with ❤️ for your portfolio!

