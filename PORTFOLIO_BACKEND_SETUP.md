# Portfolio Backend System - Complete Setup Guide

## 🚀 Overview

This is a complete Node.js backend system for your portfolio website that includes:

- **RESTful API** for managing portfolio projects
- **Real-time updates** using WebSockets (Socket.io)
- **Professional admin dashboard** with authentication
- **File upload system** for project images
- **Secure authentication** with JWT tokens
- **Production-ready** with comprehensive security

## 📁 Project Structure

```
My-Portfolio/
├── backend/                    # Backend API server
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js     # Data management for projects.json
│   │   ├── middleware/
│   │   │   ├── auth.js         # JWT authentication
│   │   │   ├── validation.js   # Input validation
│   │   │   ├── upload.js       # File upload handling
│   │   │   └── errorHandler.js # Error handling
│   │   ├── routes/
│   │   │   ├── auth.js         # Authentication endpoints
│   │   │   └── projects.js     # Project CRUD endpoints
│   │   └── utils/
│   │       └── logger.js       # Logging system
│   ├── public/
│   │   └── admin/              # Admin dashboard files
│   │       ├── index.html      # Dashboard interface
│   │       ├── styles.css      # Dashboard styling
│   │       └── script.js       # Dashboard functionality
│   ├── uploads/                # Uploaded project images
│   ├── server.js              # Main server file
│   ├── package.json           # Dependencies
│   ├── .env                   # Environment variables
│   └── README.md              # Backend documentation
├── projects/
│   ├── projects.json          # Your existing projects data
│   └── ...                    # Your existing project files
├── assets/js/
│   └── script.js              # Updated with API integration
├── start-backend.bat          # Windows startup script
├── start-backend.sh           # Linux/Mac startup script
└── PORTFOLIO_BACKEND_SETUP.md # This file
```

## 🛠️ Quick Start

### Method 1: Using Startup Scripts (Recommended)

**Windows:**
```bash
# Double-click or run in command prompt
start-backend.bat
```

**Linux/Mac:**
```bash
# Make executable and run
chmod +x start-backend.sh
./start-backend.sh
```

### Method 2: Manual Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm run dev
```

## 🌐 Access Points

Once the server is running:

- **API Base URL:** `http://localhost:3001/api`
- **Admin Dashboard:** `http://localhost:3001/admin`
- **Health Check:** `http://localhost:3001/health`

## 🔐 Admin Dashboard

### Default Credentials
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Important:** Change these credentials in production by updating the `.env` file!

### Dashboard Features
- ✅ **Project Management:** Add, edit, delete projects
- ✅ **Real-time Updates:** Changes reflect immediately on your portfolio
- ✅ **Statistics Dashboard:** View project counts by category
- ✅ **Responsive Design:** Works on desktop and mobile
- ✅ **File Upload:** Upload project images (future feature)
- ✅ **Secure Authentication:** JWT-based login system

## 🔌 API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project by index
- `GET /health` - Server health check

### Admin Endpoints (Require Authentication)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/verify` - Verify authentication token
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update existing project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/upload` - Upload project image

## 🔄 Real-time Updates

Your portfolio now supports real-time updates! When you make changes in the admin dashboard:

1. **Immediate Updates:** Changes appear instantly on your live portfolio
2. **No Page Refresh:** Users see updates without refreshing the page
3. **Multiple Admins:** Multiple admin sessions stay synchronized
4. **Fallback Support:** Works even if real-time connection fails

## 🔧 Configuration

### Environment Variables (.env file)

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# File Upload
MAX_FILE_SIZE=5242880  # 5MB
UPLOAD_PATH=uploads/

# CORS
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000    # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100    # 100 requests per window
```

## 🛡️ Security Features

- **JWT Authentication:** Secure token-based authentication
- **Rate Limiting:** Prevents API abuse (100 requests per 15 minutes)
- **Security Headers:** Helmet.js for security headers
- **Input Validation:** Comprehensive request validation
- **CORS Protection:** Controlled cross-origin access
- **File Upload Security:** Type and size restrictions
- **Error Handling:** Secure error responses

## 📊 How It Works

### Before (Static)
```
Portfolio Website → projects.json (static file)
```

### After (Dynamic)
```
Portfolio Website ←→ Backend API ←→ projects.json (managed)
                 ↕
            Admin Dashboard
```

### Data Flow
1. **Admin Dashboard:** You manage projects through the web interface
2. **Backend API:** Processes requests and updates projects.json
3. **Real-time Updates:** WebSocket broadcasts changes
4. **Portfolio Website:** Automatically updates with new data

## 🚀 Production Deployment

### 1. Update Environment Variables
```env
NODE_ENV=production
JWT_SECRET=your-very-secure-production-secret
ADMIN_PASSWORD=your-secure-production-password
FRONTEND_URL=https://your-domain.com
```

### 2. Use Process Manager (PM2)
```bash
npm install -g pm2
cd backend
pm2 start server.js --name "portfolio-api"
pm2 startup
pm2 save
```

### 3. Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name your-api-domain.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔍 Testing the System

### 1. Test API Endpoints
```bash
# Health check
curl http://localhost:3001/health

# Get projects
curl http://localhost:3001/api/projects

# Login (get token)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 2. Test Admin Dashboard
1. Open `http://localhost:3001/admin`
2. Login with admin credentials
3. Try adding/editing/deleting projects
4. Check that changes appear on your portfolio

### 3. Test Real-time Updates
1. Open your portfolio in one browser tab
2. Open admin dashboard in another tab
3. Add/edit a project in the admin dashboard
4. Watch the portfolio update automatically

## 🐛 Troubleshooting

### Common Issues

**1. Port already in use**
```bash
# Change PORT in .env file or kill existing process
netstat -ano | findstr :3001  # Windows
lsof -ti:3001 | xargs kill    # Mac/Linux
```

**2. CORS errors**
- Update `FRONTEND_URL` in `.env` to match your portfolio URL

**3. Real-time updates not working**
- Check browser console for Socket.io connection errors
- Ensure firewall allows WebSocket connections

**4. Admin dashboard not loading**
- Check that server is running on correct port
- Verify `http://localhost:3001/admin` URL

**5. Projects not updating**
- Check file permissions on `projects/projects.json`
- Verify API endpoints are working with curl

### Debug Mode
Set `NODE_ENV=development` in `.env` for detailed error messages.

## 📝 Logs

The system creates detailed logs in `backend/logs/`:
- `app.log` - General application logs
- `error.log` - Error logs
- `debug.log` - Debug logs (development only)

## 🎯 Next Steps

1. **Test the system** thoroughly with your existing projects
2. **Customize the admin dashboard** styling to match your brand
3. **Add more project fields** if needed (tags, technologies, etc.)
4. **Set up production deployment** when ready
5. **Configure SSL/HTTPS** for production
6. **Set up automated backups** for projects.json

## 💡 Tips

- **Backup your projects.json** before making changes
- **Use strong passwords** in production
- **Monitor the logs** for any issues
- **Test real-time updates** with multiple browser tabs
- **Keep dependencies updated** regularly

## 🆘 Support

If you encounter any issues:

1. Check the logs in `backend/logs/`
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Test API endpoints individually
5. Check browser console for frontend errors

The system is designed to be robust and production-ready. Enjoy your new dynamic portfolio management system! 🎉
