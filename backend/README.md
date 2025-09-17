# Portfolio Backend API

A comprehensive Node.js backend system for managing portfolio projects with real-time updates and an admin dashboard.

## Features

- **RESTful API** for portfolio projects CRUD operations
- **Real-time updates** using Socket.io
- **Admin dashboard** with authentication
- **File upload system** for project images
- **Secure authentication** with JWT
- **Rate limiting** and security headers
- **Comprehensive logging** system
- **Production-ready** configuration

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` file with your configuration:
```env
PORT=3001
JWT_SECRET=your-super-secret-jwt-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3001`

### Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server.js --name "portfolio-api"
```

## API Endpoints

### Public Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /health` - Health check

### Admin Endpoints (Require Authentication)

- `POST /api/auth/login` - Admin login
- `POST /api/auth/verify` - Verify token
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/upload` - Upload project image

## Admin Dashboard

Access the admin dashboard at: `http://localhost:3001/admin`

Default credentials:
- Username: `admin`
- Password: `admin123` (change in production!)

### Features

- **Project Management**: Add, edit, delete projects
- **Real-time Updates**: Changes reflect immediately on the frontend
- **Responsive Design**: Works on desktop and mobile
- **File Upload**: Upload project images
- **Statistics Dashboard**: View project counts by category

## Real-time Updates

The system uses Socket.io for real-time communication:

- **Frontend Integration**: Automatically updates when projects change
- **Admin Dashboard**: Live updates across multiple admin sessions
- **Fallback Support**: Works with or without real-time connection

## Security Features

- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevents API abuse
- **Security Headers**: Helmet.js protection
- **Input Validation**: Comprehensive request validation
- **File Upload Security**: Type and size restrictions
- **CORS Configuration**: Controlled cross-origin access

## File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js      # Data access layer
│   ├── controllers/         # Route controllers
│   ├── middleware/
│   │   ├── auth.js         # Authentication middleware
│   │   ├── validation.js   # Input validation
│   │   ├── upload.js       # File upload handling
│   │   └── errorHandler.js # Error handling
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   └── projects.js     # Project routes
│   └── utils/
│       └── logger.js       # Logging utility
├── public/
│   └── admin/              # Admin dashboard files
├── uploads/                # Uploaded files
├── logs/                   # Application logs
├── server.js              # Main server file
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | Token expiration | `24h` |
| `ADMIN_USERNAME` | Admin username | `admin` |
| `ADMIN_PASSWORD` | Admin password | `admin123` |
| `MAX_FILE_SIZE` | Max upload size | `5242880` (5MB) |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## Logging

The system includes comprehensive logging:

- **Application logs**: `logs/app.log`
- **Error logs**: `logs/error.log`
- **Debug logs**: `logs/debug.log` (development only)

## Error Handling

- **Graceful error handling** for all routes
- **Validation errors** with detailed messages
- **File upload errors** with specific feedback
- **Authentication errors** with proper status codes

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

### Adding New Features

1. Create route handlers in `src/routes/`
2. Add middleware in `src/middleware/`
3. Update validation in `src/middleware/validation.js`
4. Add real-time events in routes if needed
5. Update admin dashboard if required

## Troubleshooting

### Common Issues

1. **Port already in use**: Change `PORT` in `.env`
2. **CORS errors**: Update `FRONTEND_URL` in `.env`
3. **File upload fails**: Check `uploads/` directory permissions
4. **Real-time not working**: Ensure Socket.io client is loaded

### Debug Mode

Set `NODE_ENV=development` for detailed error messages and debug logs.

## License

MIT License - see LICENSE file for details.
