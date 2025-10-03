# ⚡ Quick Deployment Guide - cPanel Subdomain

Ultra-quick reference for experienced users. For detailed guide, see `CPANEL_SUBDOMAIN_DEPLOYMENT.md`.

---

## 🎯 Overview

**Goal:** Deploy Node.js dashboard to `admin.yourdomain.com`

**Time:** ~60 minutes

**Difficulty:** Medium

---

## 📋 Prerequisites

```
✅ cPanel access
✅ Domain configured
✅ Files: backend.zip, Frontend.zip
✅ Strong password ready
✅ JWT secret generated
```

---

## 🚀 12 Steps to Deploy

### 1️⃣ Create Subdomain (5 min)
```
cPanel → Domains → Create
Subdomain: admin
Document Root: public_html/admin/public
```

### 2️⃣ Upload Files (10 min)
```
File Manager → /public_html/admin/
Upload: backend.zip, Frontend.zip
Extract both
Move backend/* up one level
Delete ZIPs and empty folders
```

### 3️⃣ Configure .env (5 min)
```env
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=yourusername
ADMIN_PASSWORD=YourSecurePass123!
JWT_SECRET=long-random-string-here
PROJECTS_FILE=/home/cpaneluser/public_html/admin/Frontend/projects/projects.json
IMAGES_DIR=/home/cpaneluser/public_html/admin/Frontend/assets/images/projects
```

### 4️⃣ Update Paths (5 min)

**server.js:**
```javascript
const PROJECTS_FILE = '/home/cpaneluser/public_html/admin/Frontend/projects/projects.json';
const IMAGES_DIR = '/home/cpaneluser/public_html/admin/Frontend/assets/images/projects';
```

**routes/projects.js:**
```javascript
const PROJECTS_FILE = '/home/cpaneluser/public_html/admin/Frontend/projects/projects.json';
const IMAGES_DIR = '/home/cpaneluser/public_html/admin/Frontend/assets/images/projects';
```

### 5️⃣ Set Permissions (5 min)
```
Frontend/projects/ → 755
projects.json → 644
Frontend/assets/images/projects/ → 755
.env → 600
```

### 6️⃣ Setup Node.js App (10 min)
```
cPanel → Setup Node.js App → Create
Version: 18.x
Mode: Production
Root: admin
URL: admin.yourdomain.com
Startup: server.js
```

### 7️⃣ Install Dependencies (5 min)
```bash
# Terminal
source /home/user/nodevenv/admin/18/bin/activate
cd ~/admin
npm install --production
```

### 8️⃣ Start App (2 min)
```
Setup Node.js App → Start
Status: Running ✅
```

### 9️⃣ Setup SSL (5 min)
```
cPanel → SSL/TLS Status → Run AutoSSL
Domains → Force HTTPS → ON
```

### 🔟 Test (5 min)
```
URL: https://admin.yourdomain.com/admin
Login with credentials
Test all features
```

### 1️⃣1️⃣ Security (5 min)
```apache
# Create .htaccess
<Files ".env">
    Order allow,deny
    Deny from all
</Files>
```

### 1️⃣2️⃣ Backup (5 min)
```
cPanel → Backup → Download Home Directory
```

---

## 🐛 Quick Troubleshooting

### App Won't Start
```bash
cd ~/admin
npm install
# Restart via cPanel
```

### Permission Errors
```bash
chmod 755 ~/admin/Frontend/projects/
chmod 644 ~/admin/Frontend/projects/projects.json
chmod 755 ~/admin/Frontend/assets/images/projects/
chmod 600 ~/admin/.env
```

### Can't Login
```
1. Check .env credentials
2. Clear browser cache
3. Clear localStorage (F12)
4. Check console errors
```

### 500 Error
```
1. Check logs in Node.js App Manager
2. Verify paths in server.js
3. Check .env format
4. Restart app
```

---

## 📊 File Structure

```
/public_html/admin/
├── middleware/
│   └── auth.js
├── public/              ← Dashboard UI
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── routes/
│   ├── auth.js
│   └── projects.js
├── Frontend/            ← Data & Images
│   ├── assets/images/projects/
│   └── projects/projects.json
├── .env                 ← Config (600)
├── .htaccess           ← Security
├── package.json
└── server.js           ← Entry point
```

---

## ✅ Success Criteria

- [ ] Status: Running
- [ ] SSL: Active
- [ ] Login: Works
- [ ] CRUD: All operations work
- [ ] Upload: Images work
- [ ] Mobile: Responsive
- [ ] Security: .env blocked
- [ ] Backup: Created

---

## 🔗 Important URLs

**Dashboard:**
```
https://admin.yourdomain.com/admin
```

**cPanel:**
```
https://yourdomain.com:2083
```

**SSL Check:**
```
https://www.ssllabs.com/ssltest/
```

---

## 📞 Quick Commands

```bash
# Activate Node.js
source /home/user/nodevenv/admin/18/bin/activate

# Navigate
cd ~/admin

# Install
npm install --production

# Check packages
npm list --depth=0

# View logs
tail -f logs/passenger.log

# Permissions
chmod 755 folder
chmod 644 file
chmod 600 .env

# Ownership
chown user:user filename
```

---

## 🎯 Critical Settings

**Environment Variables:**
```
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=secure_username
ADMIN_PASSWORD=VeryStrong123!
JWT_SECRET=32+_character_random_string
```

**File Permissions:**
```
Folders: 755
Files: 644
.env: 600
```

**Node.js App:**
```
Version: 18.x+
Mode: Production
Root: admin
Startup: server.js
```

---

## 💡 Pro Tips

1. **Use strong passwords** (12+ chars, mixed case, numbers, symbols)
2. **Generate JWT secret** at https://randomkeygen.com/
3. **Test locally first** before deploying
4. **Backup before changes** always
5. **Monitor logs** regularly
6. **Update dependencies** quarterly
7. **Use HTTPS** always (force redirect)
8. **Set correct permissions** (security!)
9. **Document credentials** securely
10. **Test on mobile** after deployment

---

## 📚 Full Documentation

- **Detailed Guide:** `CPANEL_SUBDOMAIN_DEPLOYMENT.md` (300+ lines)
- **Checklist:** `DEPLOYMENT_CHECKLIST.md`
- **Original Guide:** `CPANEL_DEPLOYMENT_GUIDE.md`
- **UI Fixes:** `UI_FIXES_APPLIED.md`
- **Features:** `FINAL_SUMMARY.md`

---

## 🆘 Need Help?

1. **Check logs:** Node.js App Manager → View Log
2. **Browser console:** F12 → Console tab
3. **Test locally:** Ensure it works on localhost first
4. **Verify paths:** Double-check all file paths
5. **Check permissions:** ls -la in Terminal
6. **Read full guide:** `CPANEL_SUBDOMAIN_DEPLOYMENT.md`

---

## ⏱️ Time Breakdown

| Step | Time |
|------|------|
| Subdomain | 5 min |
| Upload | 10 min |
| Configure | 5 min |
| Update Paths | 5 min |
| Permissions | 5 min |
| Node.js Setup | 10 min |
| Install | 5 min |
| Start | 2 min |
| SSL | 5 min |
| Test | 5 min |
| Security | 5 min |
| Backup | 5 min |
| **Total** | **~60 min** |

---

## 🎉 Done!

Your dashboard is live at:
```
https://admin.yourdomain.com/admin
```

**Next Steps:**
1. Test all features
2. Add projects
3. Test on mobile
4. Share with team
5. Monitor performance

---

**Happy deploying! 🚀**

