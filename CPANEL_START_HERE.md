# 🚀 START HERE - Quick Deployment Guide

## ✅ What's Already Done

- ✅ **Files uploaded** to cPanel
- ✅ **server.js updated** with correct paths
- ✅ **routes/projects.js updated** with correct paths

---

## 🎯 What You Need to Do Now (12 Steps)

### Your Information:
- **Domain:** `profile.sheikhshariarnehal.com`
- **cPanel Path:** `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/`
- **Dashboard URL:** `https://profile.sheikhshariarnehal.com/admin`

---

## 📝 Quick Steps Checklist

### ☐ STEP 1: Create .env File (5 min)
**Location:** `backend/.env`

**Content:**
```env
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=admin_sheikh
ADMIN_PASSWORD=ChangeThisPassword123!
JWT_SECRET=8f7d6e5c4b3a2918f7d6e5c4b3a2918f7d6e5c4b3a29
PROJECTS_FILE=/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/projects/projects.json
IMAGES_DIR=/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/assets/images/projects
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
```

**⚠️ IMPORTANT:** Change `ADMIN_PASSWORD` to something secure!

---

### ☐ STEP 2: Create projects.json (2 min)
**Location:** `Frontend/projects/projects.json`

**Content:**
```json
[]
```

---

### ☐ STEP 3: Create Directory (2 min)
**Create:** `Frontend/assets/images/projects/`

---

### ☐ STEP 4: Set Permissions (5 min)
```
Frontend/projects/ → 755 (with recurse)
Frontend/projects/projects.json → 644
Frontend/assets/images/projects/ → 755 (with recurse)
backend/.env → 600
```

---

### ☐ STEP 5: Setup Node.js App (5 min)
**cPanel → Setup Node.js App → Create Application**

```
Node.js version: 18.x or 20.x
Application mode: Production
Application root: profile.sheikhshariarnehal.com/backend
Application URL: profile.sheikhshariarnehal.com
Startup file: server.js
```

**Copy the activation command shown!**

---

### ☐ STEP 6: Install Dependencies (5 min)
**cPanel → Terminal**

```bash
# Paste the activation command you copied
source /home/4/sheikhshariarnehal/nodevenv/profile.sheikhshariarnehal.com/backend/18/bin/activate

# Navigate to backend
cd ~/profile.sheikhshariarnehal.com/backend

# Install packages
npm install --production

# Verify
npm list --depth=0
```

---

### ☐ STEP 7: Start Application (2 min)
**cPanel → Setup Node.js App**

Click **"Start"** button → Wait for **"Running"** status ✅

---

### ☐ STEP 8: Setup SSL (3 min)
**cPanel → SSL/TLS Status**

Find `profile.sheikhshariarnehal.com` → Click **"Run AutoSSL"**

---

### ☐ STEP 9: Force HTTPS (2 min)
**cPanel → Domains → Manage**

Enable **"Force HTTPS Redirect"** → Save

---

### ☐ STEP 10: Test Dashboard (5 min)
**Open:** `https://profile.sheikhshariarnehal.com/admin`

**Login:**
- Username: `admin_sheikh`
- Password: (what you set in .env)

**Test:**
- ✅ Add project
- ✅ Upload image
- ✅ Edit project
- ✅ Delete project

---

### ☐ STEP 11: Security (3 min)
**Create:** `backend/.htaccess`

**Content:**
```apache
<Files ".env">
    Order allow,deny
    Deny from all
</Files>
```

---

### ☐ STEP 12: Backup (5 min)
**cPanel → Backup → Download Home Directory Backup**

---

## ⏱️ Total Time: ~45 minutes

---

## 🎉 Success!

Your dashboard will be live at:
```
https://profile.sheikhshariarnehal.com/admin
```

---

## 📚 Full Documentation

For detailed instructions, see:
- **`DEPLOYMENT_GUIDE_UPDATED.md`** - Complete step-by-step guide
- **`CPANEL_SUBDOMAIN_DEPLOYMENT.md`** - Original comprehensive guide
- **`DEPLOYMENT_CHECKLIST.md`** - Interactive checklist

---

## 🐛 Quick Troubleshooting

**App won't start:**
```bash
cd ~/profile.sheikhshariarnehal.com/backend
npm install
# Restart via cPanel
```

**Permission errors:**
```bash
chmod 755 ~/profile.sheikhshariarnehal.com/Frontend/projects/
chmod 644 ~/profile.sheikhshariarnehal.com/Frontend/projects/projects.json
chmod 755 ~/profile.sheikhshariarnehal.com/Frontend/assets/images/projects/
chmod 600 ~/profile.sheikhshariarnehal.com/backend/.env
```

**Can't login:**
- Check `.env` credentials
- Clear browser cache
- Clear localStorage (F12)

---

## 📞 Need Help?

1. Check application logs in Node.js App Manager
2. Check browser console (F12)
3. Verify all paths are correct
4. Check file permissions
5. See full guide: `DEPLOYMENT_GUIDE_UPDATED.md`

---

**🚀 Ready? Start with STEP 1!**

