# 🚀 CloudLinux cPanel Deployment Guide

## ✅ What's Already Done

- ✅ **Files uploaded** to cPanel
- ✅ **server.js updated** with correct paths
- ✅ **routes/projects.js updated** with correct paths

---

## 🎯 Your Setup Information

**Domain:** `profile.sheikhshariarnehal.com`  
**cPanel Path:** `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/`  
**Dashboard URL:** `https://profile.sheikhshariarnehal.com/admin`  
**Hosting:** CloudLinux with NodeJS Selector

---

## ⚠️ IMPORTANT: CloudLinux Difference

Your hosting uses **CloudLinux NodeJS Selector** which:
- ✅ **Automatically manages node_modules** in a virtual environment
- ✅ **Automatically installs dependencies** from package.json
- ✅ **No manual npm install needed!**
- ⚠️ **Must NOT have node_modules folder** in your backend directory

---

## 📝 STEP-BY-STEP DEPLOYMENT

### ✅ STEP 1: Remove node_modules Folder (If Exists)

1. **Go to File Manager** in cPanel

2. Navigate to:
   ```
   /home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/backend/
   ```

3. **Check if `node_modules` folder exists**
   - If YES → **Right-click** → **Delete** it
   - If NO → Great! Continue to next step

4. **Also check for `node_modules` symlink**
   - If you see a link/shortcut called `node_modules` → Delete it too

---

### ✅ STEP 2: Create .env File

1. **In File Manager**, navigate to:
   ```
   /home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/backend/
   ```

2. Click **"File"** button → Type: `.env` → Click **"Create New File"**

3. **Right-click** on `.env` → Select **"Edit"**

4. **Paste this content** (change the password!):

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Admin Credentials - CHANGE THESE!
ADMIN_USERNAME=admin_sheikh
ADMIN_PASSWORD=YourStrongPassword123!

# JWT Secret - Generate new one at https://randomkeygen.com/
JWT_SECRET=8f7d6e5c4b3a2918f7d6e5c4b3a2918f7d6e5c4b3a29abc123

# File Paths
PROJECTS_FILE=/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/projects/projects.json
IMAGES_DIR=/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/assets/images/projects

# File Upload Settings
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
```

5. **⚠️ IMPORTANT:** Change `ADMIN_PASSWORD` to something secure!

6. Click **"Save Changes"** → Click **"Close"**

---

### ✅ STEP 3: Create projects.json File

1. Navigate to:
   ```
   /home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/projects/
   ```

2. **Check if `projects.json` exists**
   - If YES → Skip to Step 4
   - If NO → Continue below

3. Click **"File"** button → Type: `projects.json` → Click **"Create New File"**

4. **Right-click** on `projects.json` → Select **"Edit"**

5. **Paste this:**
```json
[]
```

6. Click **"Save Changes"** → Click **"Close"**

---

### ✅ STEP 4: Create images/projects Directory

1. Navigate to:
   ```
   /home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/assets/
   ```

2. **Check if `images` folder exists**
   - If NO → Click **"Folder"** button → Name: `images` → Create

3. **Open the `images` folder**

4. **Check if `projects` folder exists**
   - If NO → Click **"Folder"** button → Name: `projects` → Create

**Final path should be:**
```
/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/assets/images/projects/
```

---

### ✅ STEP 5: Set File Permissions

#### 5.1 Set permissions for Frontend/projects folder

1. Navigate to: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/`
2. **Right-click** on `projects` folder
3. Select **"Change Permissions"**
4. Enter: **755**
5. ✅ Check **"Recurse into subdirectories"**
6. Click **"Change Permissions"**

#### 5.2 Set permissions for projects.json

1. Navigate to: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/projects/`
2. **Right-click** on `projects.json`
3. Select **"Change Permissions"**
4. Enter: **644**
5. Click **"Change Permissions"**

#### 5.3 Set permissions for images/projects folder

1. Navigate to: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/assets/images/`
2. **Right-click** on `projects` folder
3. Select **"Change Permissions"**
4. Enter: **755**
5. ✅ Check **"Recurse into subdirectories"**
6. Click **"Change Permissions"**

#### 5.4 Secure .env file

1. Navigate to: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/backend/`
2. **Right-click** on `.env`
3. Select **"Change Permissions"**
4. Enter: **600**
5. Click **"Change Permissions"**

---

### ✅ STEP 6: Setup Node.js Application

1. **Go to cPanel main page** (click Home icon)

2. Search for: **"Setup Node.js App"** or **"NodeJS Selector"**

3. Click **"Setup Node.js App"**

4. Click **"Create Application"** button

5. **Fill in the form:**

   **Node.js version:**
   - Select: **18.x** or **20.x** (latest available)

   **Application mode:**
   - Select: **Production**

   **Application root:**
   ```
   profile.sheikhshariarnehal.com/backend
   ```

   **Application URL:**
   - Select from dropdown: `profile.sheikhshariarnehal.com`

   **Application startup file:**
   ```
   server.js
   ```

   **Passenger log file:** (optional)
   ```
   logs/passenger.log
   ```

6. Click **"Create"** button

7. **Wait** for the application to be created (30-60 seconds)

8. **CloudLinux will automatically:**
   - ✅ Create virtual environment
   - ✅ Read your `package.json`
   - ✅ Install all dependencies automatically
   - ✅ Create `node_modules` symlink

---

### ✅ STEP 7: Start the Application

1. **After creation**, you'll see your application in the list

2. **Status might show:**
   - "Stopped" → Click **"Start"** button
   - "Running" → Already started! ✅

3. Click the **"Start"** button (▶️ play icon)

4. **Wait** for status to change to **"Running"** (green)

5. **Check the logs** if there are any errors:
   - Click **"Open logs"** or **"View logs"**
   - Look for any error messages

---

### ✅ STEP 8: Verify Dependencies Installed

1. In the **Node.js App Manager**, look for:
   - **"Detected configuration files"** section
   - Should show: `package.json` detected
   - Should show: Dependencies installed ✅

2. **If you see "Run NPM Install" button:**
   - Click it to manually trigger installation
   - Wait for completion

3. **Check application logs:**
   - Should show: "added 150+ packages"
   - Or: "Dependencies installed successfully"

---

### ✅ STEP 9: Setup SSL Certificate

1. In cPanel, search for: **"SSL/TLS Status"**

2. Click **"SSL/TLS Status"**

3. Find: `profile.sheikhshariarnehal.com`

4. Click **"Run AutoSSL"** or check the box next to it

5. Click **"Run AutoSSL"** button at bottom

6. **Wait** 1-2 minutes for SSL installation

7. You should see: ✅ **"Certificate installed"**

---

### ✅ STEP 10: Force HTTPS Redirect

1. Go to cPanel → **"Domains"**

2. Find `profile.sheikhshariarnehal.com`

3. Click **"Manage"** button

4. Scroll down to find **"Force HTTPS Redirect"**

5. Toggle it **ON** (should turn blue/green)

6. Click **"Save"** at the bottom

---

### ✅ STEP 11: Test Your Dashboard! 🎉

1. **Open your browser**

2. Go to:
   ```
   https://profile.sheikhshariarnehal.com/admin
   ```

3. You should see the **login page**

4. **Login with:**
   - Username: `admin_sheikh` (or what you set in .env)
   - Password: `YourStrongPassword123!` (or what you set in .env)

5. **Test these features:**
   - ✅ Dashboard loads
   - ✅ Click "Add New Project"
   - ✅ Fill in project details
   - ✅ Upload an image
   - ✅ Save project
   - ✅ Edit project
   - ✅ Delete project

---

### ✅ STEP 12: Security Setup

1. Navigate to: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/backend/`

2. Click **"File"** button → Type: `.htaccess` → Create

3. **Right-click** on `.htaccess` → **"Edit"**

4. **Paste this:**
```apache
<Files ".env">
    Order allow,deny
    Deny from all
</Files>

<Files "package.json">
    Order allow,deny
    Deny from all
</Files>

<Files "package-lock.json">
    Order allow,deny
    Deny from all
</Files>
```

5. Click **"Save Changes"** → **"Close"**

6. **Test security:** Try accessing:
   ```
   https://profile.sheikhshariarnehal.com/.env
   ```
   You should see: **403 Forbidden** ✅

---

### ✅ STEP 13: Create Backup

1. Go to cPanel → **"Backup"**

2. Click **"Download a Home Directory Backup"**

3. **Wait** for backup to generate (may take a few minutes)

4. **Download** the backup file to your computer

5. **Save it safely!**

---

## 🎉 DEPLOYMENT COMPLETE!

Your dashboard is now live at:
```
https://profile.sheikhshariarnehal.com/admin
```

---

## 📋 Final Checklist

- [ ] node_modules folder removed from backend
- [ ] .env file created with strong password
- [ ] projects.json file exists
- [ ] images/projects directory exists
- [ ] All permissions set (755, 644, 600)
- [ ] Node.js app created in cPanel
- [ ] Application started (Running status)
- [ ] Dependencies auto-installed by CloudLinux
- [ ] SSL certificate installed
- [ ] HTTPS redirect enabled
- [ ] Dashboard accessible
- [ ] Login works
- [ ] All features tested
- [ ] .htaccess created
- [ ] Backup downloaded

---

## 🐛 Troubleshooting

### Application won't start:

**Check logs in Node.js App Manager:**
1. Go to Setup Node.js App
2. Click on your application
3. Click "Open logs" or "View logs"
4. Look for error messages

**Common issues:**
- Missing dependencies → Click "Run NPM Install"
- Wrong file paths → Check .env file
- Permission errors → Check file permissions

### "Cannot find module" error:

**Solution:**
1. Go to Node.js App Manager
2. Find "Run NPM Install" button
3. Click it to reinstall dependencies
4. Restart application

### Permission errors:

**In File Manager:**
```
Frontend/projects/ → 755
Frontend/projects/projects.json → 644
Frontend/assets/images/projects/ → 755
backend/.env → 600
```

### Can't login:

1. Check `.env` file credentials
2. Clear browser cache (Ctrl+Shift+Delete)
3. Clear localStorage (F12 → Application → Local Storage → Clear)
4. Check browser console for errors

### Images won't upload:

**Check permissions:**
```
Frontend/assets/images/projects/ → 755
```

**Check .env paths are correct:**
```
IMAGES_DIR=/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/assets/images/projects
```

---

## 📞 Quick Reference

**Your URLs:**
- Dashboard: `https://profile.sheikhshariarnehal.com/admin`
- API Root: `https://profile.sheikhshariarnehal.com/`
- Health Check: `https://profile.sheikhshariarnehal.com/health`

**Your Paths:**
- Backend: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/backend/`
- Frontend: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/`
- Projects JSON: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/projects/projects.json`
- Images: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/assets/images/projects/`

**Admin Credentials:**
- Username: (from your .env file)
- Password: (from your .env file)

---

## ⏱️ Time Estimate

| Step | Time |
|------|------|
| Remove node_modules | 1 min |
| Create .env | 5 min |
| Create projects.json | 2 min |
| Create directories | 2 min |
| Set permissions | 5 min |
| Setup Node.js App | 5 min |
| Start application | 2 min |
| Auto-install deps | 3 min |
| Setup SSL | 3 min |
| Force HTTPS | 2 min |
| Test dashboard | 5 min |
| Security setup | 3 min |
| Backup | 5 min |
| **Total** | **~45 min** |

---

## 🎯 Key Differences with CloudLinux

**Traditional cPanel:**
- Manual npm install via Terminal
- node_modules in application folder

**CloudLinux NodeJS Selector:**
- ✅ Automatic dependency installation
- ✅ Virtual environment management
- ✅ node_modules via symlink
- ✅ No Terminal needed!

---

**🚀 Ready? Start with STEP 1!**

**Remember: CloudLinux will automatically install your dependencies from package.json when you create/start the application!**

