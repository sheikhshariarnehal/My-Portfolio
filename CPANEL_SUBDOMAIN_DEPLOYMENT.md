# 🚀 Complete cPanel Subdomain Deployment Guide

## Step-by-Step Guide to Deploy Your Portfolio Dashboard on cPanel Subdomain

This guide will walk you through deploying your Node.js backend dashboard on a cPanel subdomain (e.g., `admin.yourdomain.com`).

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ cPanel hosting account with Node.js support
- ✅ Your domain already added to cPanel
- ✅ SSH access (optional but helpful)
- ✅ Your portfolio files ready on your computer

---

## 🎯 STEP 1: Create a Subdomain in cPanel

### 1.1 Login to cPanel
1. Go to your cPanel URL:
   - `https://yourdomain.com:2083`
   - Or: `https://yourdomain.com/cpanel`
   - Or: Your hosting provider's cPanel link

2. Enter your cPanel username and password
3. Click "Log in"

### 1.2 Create the Subdomain
1. **Find "Domains" section** in cPanel dashboard
2. Click on **"Domains"** or **"Subdomains"**
3. Click **"Create A New Domain"** or **"Create"** button

4. **Fill in the subdomain details:**
   ```
   Subdomain: admin
   Domain: yourdomain.com (select from dropdown)
   
   Full subdomain will be: admin.yourdomain.com
   ```

5. **Document Root:**
   - cPanel will auto-suggest: `public_html/admin`
   - **Change it to:** `public_html/admin/public`
   - This is important! The `public` folder contains your dashboard files

6. Click **"Create"** or **"Submit"**

7. **Wait for DNS propagation** (can take 5-30 minutes)

### 1.3 Verify Subdomain Created
1. You should see your subdomain listed: `admin.yourdomain.com`
2. Status should show as "Active"

---

## 🎯 STEP 2: Prepare Your Files Locally

### 2.1 On Your Computer (Windows)

1. **Open File Explorer**
2. Navigate to: `E:\My-Portfolio`

3. **Create a ZIP of the backend folder:**
   - Right-click on `backend` folder
   - Select "Send to" → "Compressed (zipped) folder"
   - Name it: `backend.zip`

4. **Create a ZIP of the Frontend folder:**
   - Right-click on `Frontend` folder
   - Select "Send to" → "Compressed (zipped) folder"
   - Name it: `Frontend.zip`

5. **Save both ZIP files** to your Desktop for easy access

### 2.2 What's in Each ZIP?

**backend.zip contains:**
```
backend/
├── middleware/
│   └── auth.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── routes/
│   ├── auth.js
│   └── projects.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

**Frontend.zip contains:**
```
Frontend/
├── assets/
│   └── images/
│       └── projects/
│           └── (your project images)
└── projects/
    └── projects.json
```

---

## 🎯 STEP 3: Upload Files to cPanel

### 3.1 Access File Manager
1. In cPanel, find **"Files"** section
2. Click **"File Manager"**
3. A new tab will open with File Manager

### 3.2 Navigate to Your Subdomain Directory
1. In File Manager, you'll see folders on the left
2. Click on **`public_html`**
3. Look for the **`admin`** folder (created with subdomain)
4. Click on **`admin`** to enter it

### 3.3 Upload Backend Files
1. Make sure you're in: `/public_html/admin/`
2. Click **"Upload"** button at the top
3. Click **"Select File"** button
4. Browse to your Desktop and select **`backend.zip`**
5. Wait for upload to complete (you'll see a progress bar)
6. When done, click **"Go Back to..."** link

### 3.4 Extract Backend Files
1. You should see `backend.zip` in the file list
2. **Right-click** on `backend.zip`
3. Select **"Extract"**
4. In the popup:
   - Extract to: `/public_html/admin/` (should be pre-filled)
   - Click **"Extract File(s)"**
5. Wait for extraction to complete
6. Click **"Close"**

### 3.5 Move Files to Correct Location
After extraction, you'll have: `/public_html/admin/backend/`

We need to move everything UP one level:

1. **Double-click** the `backend` folder to enter it
2. Press **Ctrl+A** (or click "Select All" at top) to select all files
3. Click **"Move"** button at the top
4. In the popup, change path to: `/public_html/admin/`
5. Click **"Move File(s)"**
6. Go back to `/public_html/admin/`
7. **Delete** the now-empty `backend` folder

### 3.6 Upload Frontend Files
1. Make sure you're in: `/public_html/admin/`
2. Click **"Upload"** button
3. Select **`Frontend.zip`**
4. Wait for upload
5. Go back to File Manager

### 3.7 Extract Frontend Files
1. Right-click on `Frontend.zip`
2. Select **"Extract"**
3. Extract to: `/public_html/admin/`
4. Click **"Extract File(s)"**
5. Click **"Close"**

### 3.8 Verify File Structure
Your `/public_html/admin/` should now look like:
```
/public_html/admin/
├── middleware/
├── public/          ← Dashboard UI files
├── routes/
├── Frontend/        ← Images and JSON
├── .env
├── package.json
├── server.js
└── (other files)
```

### 3.9 Clean Up
1. **Delete** `backend.zip`
2. **Delete** `Frontend.zip`
3. Select them and click **"Delete"** button

---

## 🎯 STEP 4: Configure Environment Variables

### 4.1 Edit .env File
1. In File Manager, navigate to: `/public_html/admin/`
2. Find the **`.env`** file
3. **Right-click** on `.env`
4. Select **"Edit"**
5. If popup asks about encoding, click **"Edit"** again

### 4.2 Update .env Content
Replace the content with:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Admin Credentials - CHANGE THESE!
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_strong_password_here

# JWT Secret - Use a long random string
JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-very-long-and-random

# File Upload Settings
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif

# Paths (will be updated in next step)
PROJECTS_FILE=/home/yourusername/public_html/admin/Frontend/projects/projects.json
IMAGES_DIR=/home/yourusername/public_html/admin/Frontend/assets/images/projects
```

### 4.3 Important: Update These Values

**1. Change Admin Credentials:**
```env
ADMIN_USERNAME=myadmin
ADMIN_PASSWORD=MySecurePassword123!
```

**2. Generate Strong JWT Secret:**
- Go to: https://randomkeygen.com/
- Copy a "CodeIgniter Encryption Key" (long random string)
- Paste it as JWT_SECRET:
```env
JWT_SECRET=8f7d6e5c4b3a2918f7d6e5c4b3a2918f7d6e5c4b3a29
```

**3. Find Your cPanel Username:**
- Look at the top-right of cPanel
- You'll see: "Logged in as: **username**"
- Or check the File Manager path: `/home/username/`

**4. Update Paths with Your Username:**
Replace `yourusername` with your actual cPanel username:
```env
PROJECTS_FILE=/home/actualusername/public_html/admin/Frontend/projects/projects.json
IMAGES_DIR=/home/actualusername/public_html/admin/Frontend/assets/images/projects
```

### 4.4 Save the File
1. Click **"Save Changes"** button (top-right)
2. Click **"Close"** to exit editor

---

## 🎯 STEP 5: Update File Paths in Code

### 5.1 Edit server.js
1. In File Manager: `/public_html/admin/`
2. Right-click **`server.js`**
3. Select **"Edit"**

4. **Find these lines** (around line 10-15):
```javascript
const PROJECTS_FILE = path.join(__dirname, '../Frontend/projects/projects.json');
const IMAGES_DIR = path.join(__dirname, '../Frontend/assets/images/projects');
```

5. **Replace with** (use your actual username):
```javascript
const PROJECTS_FILE = '/home/yourusername/public_html/admin/Frontend/projects/projects.json';
const IMAGES_DIR = '/home/yourusername/public_html/admin/Frontend/assets/images/projects';
```

6. Click **"Save Changes"**
7. Click **"Close"**

### 5.2 Edit routes/projects.js
1. Navigate to: `/public_html/admin/routes/`
2. Right-click **`projects.js`**
3. Select **"Edit"**

4. **Find these lines** (near the top):
```javascript
const PROJECTS_FILE = path.join(__dirname, '../../Frontend/projects/projects.json');
const IMAGES_DIR = path.join(__dirname, '../../Frontend/assets/images/projects');
```

5. **Replace with** (use your actual username):
```javascript
const PROJECTS_FILE = '/home/yourusername/public_html/admin/Frontend/projects/projects.json';
const IMAGES_DIR = '/home/yourusername/public_html/admin/Frontend/assets/images/projects';
```

6. Click **"Save Changes"**
7. Click **"Close"**

---

## 🎯 STEP 6: Set File Permissions

### 6.1 Set Permissions for Projects Directory
1. Navigate to: `/public_html/admin/Frontend/`
2. **Right-click** on `projects` folder
3. Select **"Change Permissions"**
4. Set to: **755**
   - Check: Read, Write, Execute for Owner
   - Check: Read, Execute for Group
   - Check: Read, Execute for World
5. **Check** "Recurse into subdirectories"
6. Click **"Change Permissions"**

### 6.2 Set Permissions for projects.json
1. Navigate to: `/public_html/admin/Frontend/projects/`
2. **Right-click** on `projects.json`
3. Select **"Change Permissions"**
4. Set to: **644**
   - Check: Read, Write for Owner
   - Check: Read for Group
   - Check: Read for World
5. Click **"Change Permissions"**

### 6.3 Set Permissions for Images Directory
1. Navigate to: `/public_html/admin/Frontend/assets/images/`
2. **Right-click** on `projects` folder
3. Select **"Change Permissions"**
4. Set to: **755**
5. **Check** "Recurse into subdirectories"
6. Click **"Change Permissions"**

### 6.4 Secure .env File
1. Navigate to: `/public_html/admin/`
2. **Right-click** on `.env`
3. Select **"Change Permissions"**
4. Set to: **600**
   - Check: Read, Write for Owner ONLY
   - Uncheck everything else
5. Click **"Change Permissions"**

---

## 🎯 STEP 7: Setup Node.js Application

### 7.1 Find Setup Node.js App
1. Go back to cPanel main page
2. In the search box at top, type: **"Node.js"**
3. Click **"Setup Node.js App"**

### 7.2 Create Application
1. Click **"Create Application"** button

2. **Fill in the form:**

   **Node.js version:**
   - Select the latest available (14.x, 16.x, 18.x, or higher)
   - Recommended: 18.x or higher

   **Application mode:**
   - Select: **Production**

   **Application root:**
   ```
   admin
   ```
   (This is relative to your home directory)

   **Application URL:**
   - Select your subdomain from dropdown: `admin.yourdomain.com`

   **Application startup file:**
   ```
   server.js
   ```

   **Passenger log file:**
   - Leave default or set to: `logs/passenger.log`

3. Click **"Create"** button at the bottom

### 7.3 Wait for Setup
- You'll see a progress indicator
- Wait for "Application created successfully" message
- This may take 30-60 seconds

---

## 🎯 STEP 8: Install Dependencies

### 7.4 Copy the Command
After creating the app, you'll see a command like:
```bash
source /home/username/nodevenv/admin/18/bin/activate && cd /home/username/admin
```
**Copy this entire command!**

### 7.5 Open Terminal
1. In cPanel, search for: **"Terminal"**
2. Click **"Terminal"**
3. A new tab will open with a black terminal window

### 7.6 Activate Node.js Environment
1. **Paste** the command you copied
2. Press **Enter**
3. You should see your prompt change (showing Node.js is active)

### 7.7 Install npm Packages
Run these commands one by one:

```bash
# Make sure you're in the right directory
cd ~/admin

# Install dependencies
npm install --production

# Wait for installation to complete (may take 2-3 minutes)
```

You should see output like:
```
added 150 packages in 45s
```

### 7.8 Verify Installation
```bash
# Check if packages installed
npm list --depth=0
```

You should see:
```
├── bcryptjs@2.4.3
├── cors@2.8.5
├── dotenv@16.3.1
├── express@4.21.2
├── jsonwebtoken@9.0.2
└── multer@1.4.5
```

---

## 🎯 STEP 9: Start the Application

### 9.1 Go Back to Node.js App Manager
1. Return to cPanel
2. Go to **"Setup Node.js App"** again
3. You should see your application listed

### 9.2 Start the Application
1. Find your app: `admin.yourdomain.com`
2. Click the **"Start"** button (play icon)
3. Wait for status to change to **"Running"**
4. You should see a green "Running" status

### 9.3 Check Application Details
You should see:
```
Application URL: https://admin.yourdomain.com
Status: Running
Node.js version: 18.x
Application root: admin
Startup file: server.js
```

---

## 🎯 STEP 10: Configure SSL Certificate (IMPORTANT!)

### 10.1 Enable SSL
1. In cPanel, search for: **"SSL/TLS Status"**
2. Click **"SSL/TLS Status"**
3. Find your subdomain: `admin.yourdomain.com`
4. Click **"Run AutoSSL"** or check the box next to it
5. Click **"Run AutoSSL"** button at bottom
6. Wait for SSL certificate to be installed (1-2 minutes)

### 10.2 Force HTTPS
1. Go to cPanel → **"Domains"**
2. Find `admin.yourdomain.com`
3. Click **"Manage"** or the settings icon
4. Find **"Force HTTPS Redirect"**
5. Toggle it **ON**
6. Click **"Save"**

---

## 🎯 STEP 11: Test Your Dashboard

### 11.1 Access Your Dashboard
Open your browser and go to:
```
https://admin.yourdomain.com/admin
```

### 11.2 You Should See
- ✅ Login page with dark theme
- ✅ Username and password fields
- ✅ "Login" button
- ✅ No errors in the page

### 11.3 Login
Use the credentials you set in `.env`:
```
Username: your_admin_username
Password: your_strong_password_here
```

### 11.4 Test Features
After logging in:
1. ✅ Dashboard loads
2. ✅ Projects are displayed
3. ✅ Click "Add New Project" - modal opens
4. ✅ Try uploading an image
5. ✅ Try editing a project
6. ✅ Try deleting a project

---

## 🎯 STEP 12: Troubleshooting

### If You See "Application Error" or 500 Error

**Check Application Logs:**
1. Go to: Setup Node.js App
2. Click on your application
3. Scroll down to find "Log" section
4. Click "View Log" or check the log file path

**Common Issues:**

**1. Port Already in Use**
- Solution: Change PORT in .env to 3001 or 3002
- Restart application

**2. Cannot Find Module**
```bash
# In Terminal, run:
cd ~/admin
npm install
```

**3. Permission Denied on projects.json**
```bash
# In Terminal, run:
chmod 644 ~/admin/Frontend/projects/projects.json
chmod 755 ~/admin/Frontend/projects/
```

**4. Images Not Uploading**
```bash
# In Terminal, run:
chmod 755 ~/admin/Frontend/assets/images/projects/
chown username:username ~/admin/Frontend/assets/images/projects/
```
(Replace `username` with your cPanel username)

### If Dashboard Doesn't Load

**1. Check Application is Running:**
- Go to: Setup Node.js App
- Status should be "Running"
- If not, click "Start"

**2. Check URL:**
- Should be: `https://admin.yourdomain.com/admin`
- Note the `/admin` at the end!

**3. Clear Browser Cache:**
- Press: Ctrl+Shift+Delete
- Clear cache and cookies
- Try again

**4. Check DNS:**
- Subdomain may take 5-30 minutes to propagate
- Try: `ping admin.yourdomain.com` in Command Prompt
- Should return your server IP

### If Login Doesn't Work

**1. Check Credentials:**
- Open File Manager
- Edit `/public_html/admin/.env`
- Verify ADMIN_USERNAME and ADMIN_PASSWORD

**2. Check Browser Console:**
- Press F12
- Go to Console tab
- Look for errors
- Check Network tab for failed requests

**3. Clear localStorage:**
- Press F12
- Go to Application tab
- Click "Local Storage"
- Right-click → Clear
- Try logging in again

---

## 🎯 STEP 13: Security Hardening

### 13.1 Hide .env from Web
1. In File Manager: `/public_html/admin/`
2. Create new file: `.htaccess`
3. Add this content:
```apache
<Files ".env">
    Order allow,deny
    Deny from all
</Files>

<Files "package.json">
    Order allow,deny
    Deny from all
</Files>
```
4. Save file

### 13.2 Verify .env Permissions
```bash
# In Terminal:
chmod 600 ~/admin/.env
```

### 13.3 Setup Backup
1. In cPanel, go to **"Backup"**
2. Click **"Download a Home Directory Backup"**
3. Save to your computer
4. Schedule regular backups (weekly recommended)

---

## 🎯 STEP 14: Monitoring & Maintenance

### 14.1 Check Application Status
Regularly check:
- cPanel → Setup Node.js App
- Verify status is "Running"

### 14.2 View Logs
```bash
# In Terminal:
cd ~/admin
tail -f logs/passenger.log
```

### 14.3 Restart Application
If needed:
1. Go to: Setup Node.js App
2. Click "Restart" button
3. Wait for status to return to "Running"

### 14.4 Update Dependencies
Every few months:
```bash
cd ~/admin
npm update
# Restart application after update
```

---

## ✅ Final Checklist

- [ ] Subdomain created: `admin.yourdomain.com`
- [ ] Files uploaded and extracted
- [ ] .env file configured with strong credentials
- [ ] File paths updated in server.js and routes/projects.js
- [ ] File permissions set correctly (755, 644, 600)
- [ ] Node.js application created and configured
- [ ] Dependencies installed via npm
- [ ] Application started and running
- [ ] SSL certificate installed
- [ ] HTTPS redirect enabled
- [ ] Dashboard accessible at https://admin.yourdomain.com/admin
- [ ] Login works with your credentials
- [ ] Can add/edit/delete projects
- [ ] Image upload works
- [ ] .htaccess created for security
- [ ] Backup created

---

## 🎉 Success!

Your portfolio backend dashboard is now live at:
```
https://admin.yourdomain.com/admin
```

**Login with:**
- Username: (what you set in .env)
- Password: (what you set in .env)

---

## 📞 Quick Reference Commands

```bash
# Activate Node.js environment
source /home/username/nodevenv/admin/18/bin/activate

# Navigate to app
cd ~/admin

# Install dependencies
npm install --production

# Check installed packages
npm list --depth=0

# View logs
tail -f logs/passenger.log

# Check file permissions
ls -la

# Set permissions
chmod 755 foldername
chmod 644 filename

# Restart app (via cPanel Node.js App Manager)
```

---

**Your dashboard is now deployed and ready to manage your portfolio! 🚀**

