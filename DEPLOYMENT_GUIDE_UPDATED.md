# 🚀 Updated Deployment Guide - Your Specific Setup

## ✅ Files Already Updated!

I've already updated your `server.js` and `routes/projects.js` files with the correct absolute paths for your cPanel setup.

---

## 📍 Your Specific Information

**cPanel Username:** `sheikhshariarnehal`  
**Domain:** `profile.sheikhshariarnehal.com`  
**Full Path:** `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/`

**Files Updated:**
- ✅ `backend/server.js` - Updated with absolute paths
- ✅ `backend/routes/projects.js` - Updated with absolute paths

---

## 🎯 NEXT STEPS - Follow These in Order

### ✅ STEP 1: Create .env File (IMPORTANT!)

1. **In cPanel File Manager**, navigate to:
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

# JWT Secret - Use this or generate new one at https://randomkeygen.com/
JWT_SECRET=8f7d6e5c4b3a2918f7d6e5c4b3a2918f7d6e5c4b3a29abc123

# File Paths - Already configured for your cPanel
PROJECTS_FILE=/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/projects/projects.json
IMAGES_DIR=/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/assets/images/projects

# File Upload Settings
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
```

5. Click **"Save Changes"** → Click **"Close"**

---

### ✅ STEP 2: Create projects.json File

1. Navigate to:
   ```
   /home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/projects/
   ```

2. **Check if `projects.json` exists**
   - If YES → Skip to Step 3
   - If NO → Continue below

3. Click **"File"** button → Type: `projects.json` → Click **"Create New File"**

4. **Right-click** on `projects.json` → Select **"Edit"**

5. **Paste this:**
```json
[]
```

6. Click **"Save Changes"** → Click **"Close"**

---

### ✅ STEP 3: Create images/projects Directory

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

### ✅ STEP 4: Set File Permissions

#### 4.1 Set permissions for Frontend/projects folder

1. Navigate to: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/`
2. **Right-click** on `projects` folder
3. Select **"Change Permissions"**
4. Enter: **755**
5. ✅ Check **"Recurse into subdirectories"**
6. Click **"Change Permissions"**

#### 4.2 Set permissions for projects.json

1. Navigate to: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/projects/`
2. **Right-click** on `projects.json`
3. Select **"Change Permissions"**
4. Enter: **644**
5. Click **"Change Permissions"**

#### 4.3 Set permissions for images/projects folder

1. Navigate to: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/assets/images/`
2. **Right-click** on `projects` folder
3. Select **"Change Permissions"**
4. Enter: **755**
5. ✅ Check **"Recurse into subdirectories"**
6. Click **"Change Permissions"**

#### 4.4 Secure .env file

1. Navigate to: `/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/backend/`
2. **Right-click** on `.env`
3. Select **"Change Permissions"**
4. Enter: **600**
5. Click **"Change Permissions"**

---

### ✅ STEP 5: Setup Node.js Application

1. **Go to cPanel main page** (click Home icon)

2. Search for: **"Node.js"** or **"Setup Node.js App"**

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

6. Click **"Create"** button

7. **Wait** for success message (30-60 seconds)

8. **IMPORTANT:** Copy the command shown (looks like this):
   ```bash
   source /home/4/sheikhshariarnehal/nodevenv/profile.sheikhshariarnehal.com/backend/18/bin/activate
   ```

---

### ✅ STEP 6: Install Dependencies

1. **In cPanel**, search for: **"Terminal"**

2. Click **"Terminal"** - a black window will open

3. **Paste the activation command** you copied (right-click → Paste):
   ```bash
   source /home/4/sheikhshariarnehal/nodevenv/profile.sheikhshariarnehal.com/backend/18/bin/activate
   ```

4. Press **Enter**

5. **Navigate to backend directory:**
   ```bash
   cd ~/profile.sheikhshariarnehal.com/backend
   ```

6. **Install dependencies:**
   ```bash
   npm install --production
   ```

7. **Wait** for installation (2-3 minutes)

8. You should see:
   ```
   added 150+ packages in 45s
   ```

9. **Verify installation:**
   ```bash
   npm list --depth=0
   ```

10. You should see these packages:
    ```
    ├── bcryptjs@2.4.3
    ├── cors@2.8.5
    ├── dotenv@16.3.1
    ├── express@4.21.2
    ├── jsonwebtoken@9.0.2
    └── multer@1.4.5
    ```

---

### ✅ STEP 7: Start the Application

1. **Go back to cPanel** → **"Setup Node.js App"**

2. You should see your application listed:
   - **Application URL:** `profile.sheikhshariarnehal.com`
   - **Application Root:** `profile.sheikhshariarnehal.com/backend`

3. Click the **"Start"** button (▶️ play icon)

4. **Wait** for status to change to **"Running"** (green)

5. If you see **"Running"** status → Success! ✅

---

### ✅ STEP 8: Setup SSL Certificate

1. In cPanel, search for: **"SSL/TLS Status"**

2. Click **"SSL/TLS Status"**

3. Find: `profile.sheikhshariarnehal.com`

4. Click **"Run AutoSSL"** or check the box next to it

5. Click **"Run AutoSSL"** button at bottom

6. **Wait** 1-2 minutes for SSL installation

7. You should see: ✅ **"Certificate installed"**

---

### ✅ STEP 9: Force HTTPS Redirect

1. Go to cPanel → **"Domains"**

2. Find `profile.sheikhshariarnehal.com`

3. Click **"Manage"** button

4. Scroll down to find **"Force HTTPS Redirect"**

5. Toggle it **ON** (should turn blue/green)

6. Click **"Save"** at the bottom

---

### ✅ STEP 10: Test Your Dashboard! 🎉

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

### ✅ STEP 11: Security Setup

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

### ✅ STEP 12: Create Backup

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

## 📋 Quick Reference

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

## 🐛 Troubleshooting

### Application won't start:
```bash
# In Terminal:
cd ~/profile.sheikhshariarnehal.com/backend
npm install
# Then restart via cPanel Node.js App Manager
```

### Permission errors:
```bash
# In Terminal:
chmod 755 ~/profile.sheikhshariarnehal.com/Frontend/projects/
chmod 644 ~/profile.sheikhshariarnehal.com/Frontend/projects/projects.json
chmod 755 ~/profile.sheikhshariarnehal.com/Frontend/assets/images/projects/
chmod 600 ~/profile.sheikhshariarnehal.com/backend/.env
```

### Can't login:
1. Check `.env` file credentials
2. Clear browser cache (Ctrl+Shift+Delete)
3. Clear localStorage (F12 → Application → Local Storage → Clear)

### Images won't upload:
```bash
# In Terminal:
chmod 755 ~/profile.sheikhshariarnehal.com/Frontend/assets/images/projects/
```

---

## ✅ Final Checklist

- [ ] .env file created with strong password
- [ ] projects.json file exists
- [ ] images/projects directory exists
- [ ] All permissions set (755, 644, 600)
- [ ] Node.js app created
- [ ] Dependencies installed (npm install)
- [ ] Application started (Running status)
- [ ] SSL certificate installed
- [ ] HTTPS redirect enabled
- [ ] Dashboard accessible
- [ ] Login works
- [ ] Can add/edit/delete projects
- [ ] Image upload works
- [ ] .htaccess created
- [ ] Backup downloaded

---

**Start with STEP 1 and follow each step carefully!** 🚀

**Your files are already updated with the correct paths, so you just need to follow the configuration steps!**

