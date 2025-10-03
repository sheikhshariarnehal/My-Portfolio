# 🚨 URGENT FIX - Install Dependencies

## ✅ Problem Identified:

**Error:** `Cannot find module 'express'`

**Cause:** Dependencies are not installed

**Your Correct Path:** `/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/`

---

## 🔧 SOLUTION - 2 Steps to Fix

### ✅ STEP 1: Install Dependencies via Node.js App Manager

1. **Go to cPanel** → **"Setup Node.js App"**

2. **Find your application** in the list

3. **Look for "Run NPM Install" button** - It should be visible now

4. **Click "Run NPM Install"**

5. **Wait** for installation (2-3 minutes)

6. **You should see:** "Dependencies installed successfully"

---

### ✅ STEP 2: Create/Update .env File

1. **Go to File Manager** in cPanel

2. Navigate to:
   ```
   /home4/sheikhshariarneh/profile.sheikhshariarnehal.com/backend/
   ```

3. **Check if `.env` file exists:**
   - If YES → Right-click → Edit
   - If NO → Click "File" button → Type: `.env` → Create

4. **Paste this content:**

```env
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin123
JWT_SECRET=8f7d6e5c4b3a2918f7d6e5c4b3a2918f7d6e5c4b3a29abc123
PROJECTS_FILE=/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/Frontend/projects/projects.json
IMAGES_DIR=/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/Frontend/assets/images/projects
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
```

5. **Save** the file

6. **Set permissions:**
   - Right-click on `.env`
   - Change Permissions
   - Enter: **600**
   - Save

---

### ✅ STEP 3: Upload Updated Files

You need to re-upload the updated `server.js` and `routes/projects.js` files with the correct paths.

**Option A: Re-upload via File Manager**

1. **On your computer**, navigate to: `E:\My-Portfolio\backend\`

2. **Upload these files** to cPanel (overwrite existing):
   - `server.js`
   - `routes/projects.js`

**Option B: Edit directly in cPanel**

1. **Go to File Manager**

2. **Edit `server.js`:**
   - Navigate to: `/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/backend/`
   - Right-click `server.js` → Edit
   - Find line 11 (around line 11):
   ```javascript
   const FRONTEND_BASE = '/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend';
   ```
   - Change to:
   ```javascript
   const FRONTEND_BASE = '/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/Frontend';
   ```
   - Save

3. **Edit `routes/projects.js`:**
   - Navigate to: `/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/backend/routes/`
   - Right-click `projects.js` → Edit
   - Find lines 9-10:
   ```javascript
   const PROJECTS_FILE = '/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/projects/projects.json';
   const IMAGES_DIR = '/home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/Frontend/assets/images/projects';
   ```
   - Change to:
   ```javascript
   const PROJECTS_FILE = '/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/Frontend/projects/projects.json';
   const IMAGES_DIR = '/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/Frontend/assets/images/projects';
   ```
   - Save

---

### ✅ STEP 4: Restart Application

1. **Go to cPanel** → **"Setup Node.js App"**

2. **Find your application**

3. Click **"Restart"** button

4. **Wait** for status to show **"Running"**

5. **Check logs** - should show no errors now

---

### ✅ STEP 5: Test Your Dashboard

1. **Open browser**

2. Go to:
   ```
   https://profile.sheikhshariarnehal.com/admin
   ```

3. **Login with:**
   - Username: `admin`
   - Password: `Admin123!ChangeThis`

4. **Test features:**
   - Add project
   - Upload image
   - Edit project
   - Delete project

---

## 🎯 Quick Summary

**What was wrong:**
1. ❌ Dependencies not installed (express, cors, etc.)
2. ❌ Wrong file paths (`/home/4/` instead of `/home4/`)

**What we fixed:**
1. ✅ Updated paths in `server.js` and `routes/projects.js`
2. ✅ Created correct `.env` file
3. ✅ Will install dependencies via Node.js App Manager

---

## 📋 Checklist

- [ ] Click "Run NPM Install" in Node.js App Manager
- [ ] Wait for dependencies to install
- [ ] Create/update `.env` file with correct paths
- [ ] Re-upload `server.js` and `routes/projects.js` (or edit in cPanel)
- [ ] Restart application
- [ ] Test dashboard login
- [ ] Test adding a project

---

## 🔍 How to "Run NPM Install" in CloudLinux

### Method 1: Via Node.js App Manager (Recommended)

1. **Go to:** cPanel → Setup Node.js App
2. **Click on your application** (profile.sheikhshariarnehal.com)
3. **Look for one of these:**
   - "Run NPM Install" button
   - "Package Manager" section
   - "Install Dependencies" button
4. **Click it**
5. **Wait** for completion

### Method 2: Via Application Interface

1. **In Node.js App Manager**, after clicking on your app
2. **Scroll down** to find "Detected configuration files"
3. **You should see:** `package.json` detected
4. **Click:** "Run NPM Install" next to it

### Method 3: Via Restart (Auto-install)

Sometimes CloudLinux auto-installs on restart:
1. **Stop** the application
2. **Start** the application
3. **Check logs** - should show "installing dependencies"

---

## 📸 What to Look For

In the Node.js App Manager, after clicking "Run NPM Install", you should see:

```
Installing dependencies...
npm install --production
added 150 packages in 45s
Dependencies installed successfully
```

---

## 🆘 If "Run NPM Install" Button Not Visible

If you don't see the button, try this:

1. **Stop** the application
2. **Edit** the application settings
3. **Save** without changing anything
4. **The button should appear**
5. **Click "Run NPM Install"**
6. **Start** the application

---

## ⚠️ Important Notes

1. **Your actual cPanel path is:**
   ```
   /home4/sheikhshariarneh/profile.sheikhshariarnehal.com/
   ```
   NOT:
   ```
   /home/4/sheikhshariarnehal/profile.sheikhshariarnehal.com/
   ```

2. **Make sure to update ALL files** with the correct path

3. **After installing dependencies**, the application should start successfully

---

## 🎉 After Fix

Your dashboard will work at:
```
https://profile.sheikhshariarnehal.com/admin
```

Login credentials:
- Username: `admin`
- Password: `Admin123!ChangeThis` (change this after first login!)

---

## 📞 Next Steps

1. ✅ **Do STEP 1** - Install dependencies
2. ✅ **Do STEP 2** - Create .env file
3. ✅ **Do STEP 3** - Upload updated files
4. ✅ **Do STEP 4** - Restart application
5. ✅ **Do STEP 5** - Test dashboard

**Take a screenshot if you get stuck and show me!** 🚀

