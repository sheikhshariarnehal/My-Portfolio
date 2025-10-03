# 🚀 cPanel Deployment Guide - Portfolio Backend Dashboard

Complete step-by-step guide to deploy your Node.js backend dashboard on cPanel hosting.

---

## 📋 Prerequisites

### What You Need:
1. ✅ cPanel hosting account with Node.js support
2. ✅ SSH access (optional but recommended)
3. ✅ Domain or subdomain configured
4. ✅ Your portfolio files ready

### Check cPanel Requirements:
- **Node.js version**: 14.x or higher
- **npm**: Installed
- **Disk space**: At least 500MB free
- **Memory**: At least 512MB RAM

---

## 🎯 Deployment Methods

### Method 1: Using cPanel File Manager (Easiest)
### Method 2: Using SSH/Terminal (Recommended)
### Method 3: Using FTP Client

---

## 📦 Method 1: cPanel File Manager Deployment

### Step 1: Prepare Your Files

1. **On your local computer**, create a ZIP file of your backend:
   ```bash
   # Navigate to your project
   cd e:\My-Portfolio
   
   # Create a ZIP of the backend folder
   # Use Windows Explorer: Right-click backend folder → Send to → Compressed folder
   # Or use 7-Zip/WinRAR
   ```

2. **Files to include in ZIP:**
   ```
   backend/
   ├── middleware/
   ├── public/
   ├── routes/
   ├── .env
   ├── package.json
   ├── server.js
   └── README.md
   ```

3. **Also ZIP your Frontend folder** (for images and JSON):
   ```
   Frontend/
   ├── assets/images/projects/
   └── projects/projects.json
   ```

### Step 2: Upload to cPanel

1. **Login to cPanel**
   - Go to: `https://yourdomain.com:2083`
   - Or: `https://yourdomain.com/cpanel`
   - Enter your cPanel username and password

2. **Navigate to File Manager**
   - Find "Files" section
   - Click "File Manager"

3. **Go to your domain's directory**
   - Usually: `public_html/` or `public_html/yourdomain.com/`
   - For subdomain: `public_html/subdomain/`

4. **Create project structure**
   - Click "New Folder" button
   - Create folder: `portfolio-backend`
   - Enter the folder

5. **Upload ZIP files**
   - Click "Upload" button
   - Select your `backend.zip` file
   - Wait for upload to complete
   - Go back to File Manager

6. **Extract files**
   - Right-click on `backend.zip`
   - Select "Extract"
   - Choose destination: current directory
   - Click "Extract Files"
   - Delete the ZIP file after extraction

7. **Upload Frontend files**
   - Go back to `public_html/`
   - Upload and extract `Frontend.zip`
   - Or manually upload the folders

### Step 3: Setup Node.js Application

1. **Find "Setup Node.js App" in cPanel**
   - Search for "Node.js" in cPanel search
   - Click "Setup Node.js App"

2. **Create Application**
   - Click "Create Application"
   - Fill in details:
     ```
     Node.js version: 14.x or higher (select latest available)
     Application mode: Production
     Application root: portfolio-backend
     Application URL: yourdomain.com or subdomain.yourdomain.com
     Application startup file: server.js
     ```

3. **Set Environment Variables**
   - Scroll down to "Environment Variables"
   - Add these variables:
     ```
     PORT=3000
     NODE_ENV=production
     JWT_SECRET=your-super-secret-jwt-key-change-this
     ADMIN_USERNAME=your_admin_username
     ADMIN_PASSWORD=your_secure_password
     MAX_FILE_SIZE=5242880
     ```
   - Click "Add" for each variable

4. **Save Configuration**
   - Click "Create" button
   - Wait for setup to complete

### Step 4: Install Dependencies

1. **In the Node.js App interface**
   - You'll see a command to run
   - Copy the command (looks like: `source /home/username/nodevenv/...`)

2. **Open Terminal in cPanel**
   - Find "Terminal" in cPanel
   - Click to open

3. **Run commands:**
   ```bash
   # Navigate to your app directory
   cd portfolio-backend
   
   # Source the Node.js environment (paste the command from step 1)
   source /home/username/nodevenv/portfolio-backend/14/bin/activate
   
   # Install dependencies
   npm install --production
   
   # Verify installation
   npm list
   ```

### Step 5: Configure File Paths

1. **Edit server.js** (if needed)
   - In File Manager, right-click `server.js`
   - Select "Edit"
   - Update paths to Frontend folder:
     ```javascript
     // Update these paths to absolute paths
     const PROJECTS_FILE = '/home/username/public_html/Frontend/projects/projects.json';
     const IMAGES_DIR = '/home/username/public_html/Frontend/assets/images/projects';
     ```
   - Replace `username` with your cPanel username
   - Save changes

2. **Update routes/projects.js**
   - Edit the file
   - Update paths similarly:
     ```javascript
     const PROJECTS_FILE = '/home/username/public_html/Frontend/projects/projects.json';
     const IMAGES_DIR = '/home/username/public_html/Frontend/assets/images/projects';
     ```

### Step 6: Set File Permissions

1. **In File Manager:**
   - Select `Frontend/projects/` folder
   - Click "Permissions"
   - Set to: `755`
   - Check "Recurse into subdirectories"
   - Apply

2. **For projects.json:**
   - Select `projects.json`
   - Set permissions to: `644`

3. **For images folder:**
   - Select `Frontend/assets/images/projects/`
   - Set to: `755`

### Step 7: Start the Application

1. **Go back to "Setup Node.js App"**
   - Find your application
   - Click "Start" button
   - Wait for status to show "Running"

2. **Check Application URL**
   - Click on the application URL
   - Add `/admin` to access dashboard
   - Example: `https://yourdomain.com/admin`

### Step 8: Setup Domain/Subdomain (Optional)

If you want a custom subdomain like `admin.yourdomain.com`:

1. **Create Subdomain**
   - Go to "Domains" → "Subdomains"
   - Create: `admin`
   - Document root: `portfolio-backend/public`

2. **Setup Reverse Proxy**
   - Go to "Domains" → "Domains"
   - Find your subdomain
   - Click "Manage"
   - Enable "Proxy"
   - Set proxy to: `http://localhost:3000`

---

## 🔧 Method 2: SSH Deployment (Recommended)

### Step 1: Connect via SSH

```bash
# From your local terminal
ssh username@yourdomain.com -p 22

# Or use PuTTY on Windows
# Host: yourdomain.com
# Port: 22
# Username: your_cpanel_username
```

### Step 2: Upload Files

**Option A: Using SCP (from local machine)**
```bash
# Upload backend folder
scp -r backend username@yourdomain.com:~/portfolio-backend

# Upload Frontend folder
scp -r Frontend username@yourdomain.com:~/public_html/Frontend
```

**Option B: Using Git (if you have a repository)**
```bash
# On server
cd ~
git clone https://github.com/yourusername/your-repo.git portfolio-backend
cd portfolio-backend
```

### Step 3: Setup Node.js

```bash
# Navigate to directory
cd ~/portfolio-backend

# Load Node.js environment
source /home/username/nodevenv/portfolio-backend/14/bin/activate

# Install dependencies
npm install --production

# Create .env file
nano .env
```

**Add to .env:**
```env
PORT=3000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key
ADMIN_USERNAME=your_admin
ADMIN_PASSWORD=your_password
MAX_FILE_SIZE=5242880
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### Step 4: Update File Paths

```bash
# Edit server.js
nano server.js

# Update paths (replace 'username' with your actual username)
# Save and exit

# Edit routes/projects.js
nano routes/projects.js

# Update paths
# Save and exit
```

### Step 5: Start Application

```bash
# Using Node.js App Manager (recommended)
# Go to cPanel → Setup Node.js App → Start

# Or manually (for testing)
node server.js

# Or using PM2 (if available)
npm install -g pm2
pm2 start server.js --name portfolio-backend
pm2 save
pm2 startup
```

---

## 🌐 Method 3: FTP Deployment

### Step 1: Connect via FTP

1. **Use FileZilla or similar FTP client**
   - Host: `ftp.yourdomain.com`
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21

2. **Navigate to directories**
   - Local: Your project folder
   - Remote: `/public_html/`

### Step 2: Upload Files

1. **Upload backend folder**
   - Drag `backend` folder to remote
   - Wait for upload to complete

2. **Upload Frontend folder**
   - Drag `Frontend` folder to remote

### Step 3: Continue with Method 1 Steps 3-8

---

## ✅ Post-Deployment Checklist

### 1. Test the Application

```bash
# Check if server is running
curl http://localhost:3000

# Test API endpoint
curl http://localhost:3000/api/projects

# Test admin dashboard
# Open: https://yourdomain.com/admin
```

### 2. Verify File Permissions

```bash
# Check projects.json is writable
ls -la Frontend/projects/projects.json

# Check images directory
ls -la Frontend/assets/images/projects/
```

### 3. Test Dashboard Features

- ✅ Login works
- ✅ Projects load
- ✅ Can add new project
- ✅ Can upload image
- ✅ Can edit project
- ✅ Can delete project

### 4. Setup SSL Certificate (IMPORTANT!)

1. **In cPanel:**
   - Go to "Security" → "SSL/TLS Status"
   - Find your domain
   - Click "Run AutoSSL"
   - Wait for completion

2. **Force HTTPS:**
   - Go to "Domains" → "Domains"
   - Find your domain
   - Enable "Force HTTPS Redirect"

---

## 🔒 Security Hardening

### 1. Secure .env File

```bash
# Set restrictive permissions
chmod 600 .env

# Verify
ls -la .env
# Should show: -rw------- (600)
```

### 2. Hide .env from Web

Create `.htaccess` in backend folder:
```apache
<Files ".env">
    Order allow,deny
    Deny from all
</Files>
```

### 3. Setup Firewall Rules

In cPanel:
- Go to "Security" → "IP Blocker"
- Block suspicious IPs if needed

### 4. Enable Rate Limiting

Add to `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🐛 Troubleshooting

### Application Won't Start

**Check logs:**
```bash
# In cPanel Terminal
cd ~/portfolio-backend
tail -f logs/error.log
```

**Common issues:**
1. Port already in use → Change PORT in .env
2. Missing dependencies → Run `npm install`
3. Wrong Node.js version → Update in Node.js App settings

### Can't Write to projects.json

```bash
# Fix permissions
chmod 644 Frontend/projects/projects.json
chmod 755 Frontend/projects/
```

### Images Not Uploading

```bash
# Fix images directory
chmod 755 Frontend/assets/images/projects/
chown username:username Frontend/assets/images/projects/
```

### 502 Bad Gateway

- Check if Node.js app is running
- Verify PORT matches in .env and Node.js App settings
- Restart the application

### Can't Access Dashboard

1. Check application URL in Node.js App
2. Verify domain DNS settings
3. Clear browser cache
4. Check .htaccess rules

---

## 📊 Monitoring & Maintenance

### Check Application Status

```bash
# Via cPanel
# Go to: Setup Node.js App → Check status

# Via SSH
ps aux | grep node
```

### View Logs

```bash
# Application logs
tail -f ~/portfolio-backend/logs/app.log

# Error logs
tail -f ~/portfolio-backend/logs/error.log

# cPanel logs
tail -f ~/logs/error_log
```

### Restart Application

```bash
# Via cPanel
# Setup Node.js App → Restart button

# Via SSH (if using PM2)
pm2 restart portfolio-backend
```

### Update Application

```bash
# Via SSH
cd ~/portfolio-backend
git pull  # if using git
npm install
# Restart via cPanel
```

---

## 🎉 Success!

Your portfolio backend dashboard should now be live!

**Access your dashboard:**
```
https://yourdomain.com/admin
```

**Login with your credentials from .env**

---

## 📞 Need Help?

### Common Resources:
- cPanel Documentation: https://docs.cpanel.net/
- Node.js on cPanel: https://docs.cpanel.net/cpanel/software/setup-nodejs-app/
- Your hosting provider's support

### Quick Commands Reference:
```bash
# Navigate to app
cd ~/portfolio-backend

# Install dependencies
npm install

# Check Node.js version
node --version

# Check running processes
ps aux | grep node

# View logs
tail -f logs/error.log

# Test server
curl http://localhost:3000
```

---

**Deployment Complete! 🚀**

Your professional portfolio backend dashboard is now live on cPanel!

