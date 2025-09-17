@echo off
echo Starting Portfolio Backend Server...
echo.

cd backend

echo Installing dependencies...
npm install

echo.
echo Starting server in development mode...
echo Server will be available at: http://localhost:3001
echo Admin dashboard: http://localhost:3001/admin
echo.
echo Default admin credentials:
echo Username: admin
echo Password: admin123
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
