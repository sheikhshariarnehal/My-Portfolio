# Portfolio Backend Dashboard 🚀

A modern, professional backend dashboard for managing your portfolio projects with a local JSON file database and image upload capabilities.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based login system
- 📁 **Project Management** - Full CRUD operations (Create, Read, Update, Delete)
- 🖼️ **Image Upload** - Upload and manage project images
- 🎨 **Modern UI** - Dark theme with responsive design
- 📱 **Mobile Friendly** - Works on desktop, tablet, and mobile
- 🗂️ **Category Filtering** - Filter projects by category (MERN, Basic Web, Android, ML)
- 💾 **JSON Database** - Simple file-based storage, no database setup required
- ⚡ **Fast & Lightweight** - Built with Node.js and Express

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Edit the `.env` file and update the following:
   ```env
   PORT=5000
   NODE_ENV=development
   
   # Change these to secure values!
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   
   # File Upload Settings
   MAX_FILE_SIZE=5242880
   ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/webp,image/gif
   ```

   ⚠️ **IMPORTANT**: Change the default username and password before deploying!

## 🚀 Running the Application

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📱 Accessing the Dashboard

1. Open your browser and navigate to:
   ```
   http://localhost:5000/admin
   ```

2. Login with your credentials:
   - **Username**: admin (or what you set in .env)
   - **Password**: admin123 (or what you set in .env)

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username and password
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - Logout (client-side token removal)

### Projects (Protected routes require JWT token)
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:index` - Get single project by index (public)
- `POST /api/projects` - Create new project (protected)
- `PUT /api/projects/:index` - Update project (protected)
- `DELETE /api/projects/:index` - Delete project (protected)

## 📂 Project Structure

```
backend/
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── public/                  # Admin dashboard frontend
│   ├── index.html          # Dashboard HTML
│   ├── styles.css          # Dashboard styles
│   └── script.js           # Dashboard JavaScript
├── routes/
│   ├── auth.js             # Authentication routes
│   └── projects.js         # Project management routes
├── .env                    # Environment variables
├── package.json            # Dependencies
├── server.js               # Main server file
└── README.md              # This file
```

## 🖼️ Image Upload

Images are stored in: `Frontend/assets/images/projects/`

Supported formats:
- JPEG/JPG
- PNG
- WEBP
- GIF

Max file size: 5MB (configurable in .env)

## 🔒 Security Features

- JWT-based authentication
- Protected API routes
- File type validation
- File size limits
- CORS enabled
- Environment variable configuration

## 🎨 Dashboard Features

### Projects Management
- View all projects in a grid layout
- Filter by category (All, MERN, Basic Web, Android, ML)
- Add new projects with image upload
- Edit existing projects
- Delete projects with confirmation
- Real-time project count

### Settings
- System information
- Backend status indicator
- Total projects count

## 📝 Usage Guide

### Adding a New Project

1. Click the "Add New Project" button
2. Fill in the project details:
   - **Name**: Project title
   - **Description**: Brief description
   - **Category**: Select from dropdown
   - **View Link**: Live demo URL (optional)
   - **Code Link**: GitHub repository URL (optional)
   - **Image**: Upload project screenshot
3. Click "Save Project"

### Editing a Project

1. Click the "Edit" button on any project card
2. Modify the fields you want to change
3. Upload a new image if needed (old image will be replaced)
4. Click "Update Project"

### Deleting a Project

1. Click the "Delete" button on any project card
2. Confirm the deletion
3. The project and its associated image will be removed

## 🔧 Troubleshooting

### Port Already in Use
If port 5000 is already in use, change the PORT in `.env` file:
```env
PORT=3000
```

### Images Not Loading
Make sure the images directory exists:
```
Frontend/assets/images/projects/
```

### Authentication Issues
1. Clear browser localStorage
2. Check if JWT_SECRET is set in .env
3. Verify username and password in .env

### CORS Issues
If accessing from a different domain, update CORS settings in `server.js`

## 🌐 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
JWT_SECRET=use-a-very-strong-random-string-here
ADMIN_USERNAME=your-secure-username
ADMIN_PASSWORD=your-secure-password
```

### Recommended Hosting Platforms
- Heroku
- Railway
- Render
- DigitalOcean
- AWS EC2

## 📄 License

MIT License - Feel free to use this for your portfolio!

## 🤝 Support

If you encounter any issues or have questions, please check:
1. All dependencies are installed
2. .env file is properly configured
3. Node.js version is 14 or higher
4. Port is not being used by another application

## 🎉 Features Coming Soon

- [ ] Bulk image upload
- [ ] Project categories management
- [ ] Analytics dashboard
- [ ] Export/Import projects
- [ ] Image optimization
- [ ] Search functionality

---

Made with ❤️ for portfolio management

