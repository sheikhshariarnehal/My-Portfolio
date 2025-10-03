# ✅ cPanel Subdomain Deployment Checklist

Quick reference checklist for deploying your portfolio dashboard to cPanel subdomain.

---

## 📋 Pre-Deployment

- [ ] cPanel login credentials ready
- [ ] Domain name confirmed
- [ ] Subdomain name decided (e.g., `admin`)
- [ ] Files zipped: `backend.zip` and `Frontend.zip`
- [ ] Strong admin password chosen
- [ ] JWT secret generated (use https://randomkeygen.com/)

---

## 🌐 STEP 1: Create Subdomain (5 minutes)

- [ ] Login to cPanel
- [ ] Go to "Domains" → "Subdomains"
- [ ] Create subdomain: `admin.yourdomain.com`
- [ ] Set document root: `public_html/admin/public`
- [ ] Verify subdomain created successfully
- [ ] Wait for DNS propagation (5-30 minutes)

---

## 📤 STEP 2: Upload Files (10 minutes)

- [ ] Open File Manager in cPanel
- [ ] Navigate to `/public_html/admin/`
- [ ] Upload `backend.zip`
- [ ] Extract `backend.zip`
- [ ] Move files from `backend/` folder up one level
- [ ] Delete empty `backend/` folder
- [ ] Upload `Frontend.zip`
- [ ] Extract `Frontend.zip`
- [ ] Delete both ZIP files
- [ ] Verify file structure is correct

**Expected structure:**
```
/public_html/admin/
├── middleware/
├── public/
├── routes/
├── Frontend/
├── .env
├── package.json
└── server.js
```

---

## ⚙️ STEP 3: Configure Environment (5 minutes)

- [ ] Edit `.env` file in File Manager
- [ ] Change `ADMIN_USERNAME` to your username
- [ ] Change `ADMIN_PASSWORD` to strong password
- [ ] Update `JWT_SECRET` with long random string
- [ ] Find your cPanel username (top-right corner)
- [ ] Update `PROJECTS_FILE` path with your username
- [ ] Update `IMAGES_DIR` path with your username
- [ ] Save `.env` file

**Example .env:**
```env
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=myadmin
ADMIN_PASSWORD=MySecure123!
JWT_SECRET=8f7d6e5c4b3a2918f7d6e5c4b3a29
PROJECTS_FILE=/home/yourusername/public_html/admin/Frontend/projects/projects.json
IMAGES_DIR=/home/yourusername/public_html/admin/Frontend/assets/images/projects
```

---

## 📝 STEP 4: Update File Paths (5 minutes)

### Edit server.js:
- [ ] Open `server.js` in File Manager
- [ ] Find lines with `path.join(__dirname, '../Frontend/...`
- [ ] Replace with absolute paths: `/home/yourusername/public_html/admin/Frontend/...`
- [ ] Save file

### Edit routes/projects.js:
- [ ] Open `routes/projects.js` in File Manager
- [ ] Find lines with `path.join(__dirname, '../../Frontend/...`
- [ ] Replace with absolute paths: `/home/yourusername/public_html/admin/Frontend/...`
- [ ] Save file

---

## 🔒 STEP 5: Set Permissions (5 minutes)

- [ ] Set `Frontend/projects/` folder to **755**
- [ ] Set `projects.json` file to **644**
- [ ] Set `Frontend/assets/images/projects/` to **755**
- [ ] Set `.env` file to **600** (important!)
- [ ] Check "Recurse into subdirectories" for folders

**Permission Guide:**
- **755** = Folder (read/write/execute for owner, read/execute for others)
- **644** = File (read/write for owner, read for others)
- **600** = Secure file (read/write for owner only)

---

## 🚀 STEP 6: Setup Node.js App (10 minutes)

- [ ] Go to cPanel → "Setup Node.js App"
- [ ] Click "Create Application"
- [ ] Select Node.js version (18.x or higher)
- [ ] Set Application mode: **Production**
- [ ] Set Application root: `admin`
- [ ] Set Application URL: `admin.yourdomain.com`
- [ ] Set Startup file: `server.js`
- [ ] Click "Create"
- [ ] Wait for success message
- [ ] Copy the activation command shown

---

## 📦 STEP 7: Install Dependencies (5 minutes)

- [ ] Open Terminal in cPanel
- [ ] Paste the activation command
- [ ] Run: `cd ~/admin`
- [ ] Run: `npm install --production`
- [ ] Wait for installation (2-3 minutes)
- [ ] Verify: `npm list --depth=0`
- [ ] Should see: express, cors, dotenv, jsonwebtoken, bcryptjs, multer

---

## ▶️ STEP 8: Start Application (2 minutes)

- [ ] Go back to "Setup Node.js App"
- [ ] Find your application in the list
- [ ] Click "Start" button
- [ ] Wait for status to show "Running"
- [ ] Verify green "Running" status

---

## 🔐 STEP 9: Setup SSL (5 minutes)

- [ ] Go to cPanel → "SSL/TLS Status"
- [ ] Find `admin.yourdomain.com`
- [ ] Click "Run AutoSSL"
- [ ] Wait for SSL installation (1-2 minutes)
- [ ] Go to "Domains"
- [ ] Find your subdomain
- [ ] Enable "Force HTTPS Redirect"
- [ ] Save changes

---

## 🧪 STEP 10: Test Dashboard (5 minutes)

- [ ] Open browser
- [ ] Go to: `https://admin.yourdomain.com/admin`
- [ ] See login page (no errors)
- [ ] Login with your credentials
- [ ] Dashboard loads successfully
- [ ] Projects are displayed
- [ ] Click "Add New Project" - modal opens
- [ ] Try uploading an image
- [ ] Try editing a project
- [ ] Try deleting a project
- [ ] All features work correctly

---

## 🛡️ STEP 11: Security (5 minutes)

- [ ] Create `.htaccess` file in `/public_html/admin/`
- [ ] Add rules to block .env access
- [ ] Verify .env has 600 permissions
- [ ] Test: Try accessing `https://admin.yourdomain.com/.env` (should be blocked)
- [ ] Change default admin password if not done
- [ ] Save credentials securely

**.htaccess content:**
```apache
<Files ".env">
    Order allow,deny
    Deny from all
</Files>
```

---

## 💾 STEP 12: Backup (5 minutes)

- [ ] Go to cPanel → "Backup"
- [ ] Download "Home Directory Backup"
- [ ] Save to your computer
- [ ] Note backup date
- [ ] Schedule regular backups (weekly)

---

## 📊 Post-Deployment Verification

### Application Status:
- [ ] Node.js app shows "Running" status
- [ ] No errors in application logs
- [ ] SSL certificate is active
- [ ] HTTPS redirect works

### Dashboard Functionality:
- [ ] Login/logout works
- [ ] Projects load correctly
- [ ] Can create new projects
- [ ] Can edit existing projects
- [ ] Can delete projects
- [ ] Image upload works
- [ ] Category filter works
- [ ] Responsive on mobile

### Security:
- [ ] .env file not accessible via browser
- [ ] Strong password set
- [ ] JWT secret is random and long
- [ ] SSL certificate active
- [ ] HTTPS enforced

### Performance:
- [ ] Page loads in < 3 seconds
- [ ] No console errors (F12)
- [ ] Images load correctly
- [ ] Smooth animations

---

## 🐛 Troubleshooting Quick Fixes

### Application Won't Start:
```bash
# In Terminal:
cd ~/admin
npm install
# Then restart via cPanel Node.js App Manager
```

### Permission Errors:
```bash
# In Terminal:
chmod 755 ~/admin/Frontend/projects/
chmod 644 ~/admin/Frontend/projects/projects.json
chmod 755 ~/admin/Frontend/assets/images/projects/
chmod 600 ~/admin/.env
```

### Can't Login:
- [ ] Check .env credentials
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Clear localStorage (F12 → Application → Local Storage)
- [ ] Check browser console for errors

### Images Not Uploading:
```bash
# In Terminal:
chmod 755 ~/admin/Frontend/assets/images/projects/
chown username:username ~/admin/Frontend/assets/images/projects/
```

### 500 Error:
- [ ] Check application logs in Node.js App Manager
- [ ] Verify file paths in server.js and routes/projects.js
- [ ] Check .env file is properly formatted
- [ ] Restart application

---

## 📞 Important Information to Save

**Subdomain URL:**
```
https://admin.yourdomain.com/admin
```

**Admin Credentials:**
```
Username: ___________________
Password: ___________________
```

**cPanel Username:**
```
___________________
```

**File Paths:**
```
Application Root: /home/username/admin
Projects JSON: /home/username/public_html/admin/Frontend/projects/projects.json
Images Dir: /home/username/public_html/admin/Frontend/assets/images/projects
```

**Node.js Version:**
```
___________________
```

**Deployment Date:**
```
___________________
```

---

## 🎯 Time Estimate

| Step | Time | Difficulty |
|------|------|------------|
| Create Subdomain | 5 min | Easy |
| Upload Files | 10 min | Easy |
| Configure .env | 5 min | Easy |
| Update Paths | 5 min | Medium |
| Set Permissions | 5 min | Easy |
| Setup Node.js | 10 min | Medium |
| Install Dependencies | 5 min | Easy |
| Start Application | 2 min | Easy |
| Setup SSL | 5 min | Easy |
| Test Dashboard | 5 min | Easy |
| Security Setup | 5 min | Medium |
| Backup | 5 min | Easy |
| **Total** | **~60 min** | **Medium** |

*Note: First-time deployment may take longer. Subsequent deployments will be faster.*

---

## ✅ Deployment Complete!

Once all items are checked:

🎉 **Your dashboard is live at:**
```
https://admin.yourdomain.com/admin
```

📱 **Test on multiple devices:**
- [ ] Desktop browser
- [ ] Tablet
- [ ] Mobile phone

🔄 **Regular Maintenance:**
- [ ] Check application status weekly
- [ ] Backup monthly
- [ ] Update dependencies quarterly
- [ ] Monitor logs for errors

---

## 📚 Reference Documents

- **Full Guide:** `CPANEL_SUBDOMAIN_DEPLOYMENT.md`
- **Original Guide:** `CPANEL_DEPLOYMENT_GUIDE.md`
- **UI Fixes:** `UI_FIXES_APPLIED.md`
- **Features:** `FINAL_SUMMARY.md`

---

**Deployment Status:** [ ] Not Started  [ ] In Progress  [ ] Complete

**Deployed By:** ___________________

**Date:** ___________________

**Notes:**
```
_____________________________________________
_____________________________________________
_____________________________________________
```

---

**Good luck with your deployment! 🚀**

