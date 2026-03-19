@echo off
chcp 65001 >nul
set "BASE=%~dp0"
cd /d "%BASE%"

echo.
echo  ==============================
echo   Claude Office - Startup
echo  ==============================
echo.

:: ========== Server ==========
wmic process where "name='node.exe'" get CommandLine 2>nul | findstr /i "server.js" >nul
if %errorlevel%==0 (
    echo  [OK] server.js already running
) else (
    echo  [..] Starting server...
    powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -WorkingDirectory '%BASE%' -WindowStyle Minimized -RedirectStandardOutput '%BASE%data\server.log' -RedirectStandardError '%BASE%data\server-error.log'"
    timeout /t 2 /nobreak >nul
    echo  [OK] server.js started
)

:: ========== Tailscale Funnel ==========
echo.
echo  ------------------------------------------
echo   Local:  http://localhost:3848
echo   Public: https://hp-spectre-14.tail3a3559.ts.net/
echo  ------------------------------------------
echo.
pause
