@echo off
echo ============================================
echo  Quick-Bopha Website - Local Start Script
echo ============================================
echo.

:: Set Node.js on PATH
set PATH=C:\Program Files\nodejs;%PATH%

:: Move to project directory
cd /d "C:\Users\marke\Downloads\Quick-Bopha-Website-main\Quick-Bopha-Website-main"
echo Working directory: %CD%
echo.

:: Verify node works
echo Checking Node.js...
node -v
if errorlevel 1 (
    echo ERROR: Node.js not found at C:\Program Files\nodejs\
    pause
    exit /b 1
)

echo Checking npm...
npm -v
echo.

:: Clean old node_modules
echo Cleaning old node_modules (if any)...
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    del /f /q package-lock.json
)
echo Done cleaning.
echo.

:: Fresh install
echo Installing dependencies (this may take a few minutes)...
npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo.

:: Build
echo Building production app...
npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo.

:: Start
echo Starting production server...
echo Open your browser at: http://localhost:3000
echo Press Ctrl+C to stop the server.
echo.
npm start
pause
