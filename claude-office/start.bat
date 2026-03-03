@echo off
chcp 65001 >nul
cd /d "C:\Users\newgo\Claud用\claude-office"

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
    powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -WorkingDirectory 'C:\Users\newgo\Claud用\claude-office' -WindowStyle Minimized -RedirectStandardOutput 'C:\Users\newgo\Claud用\claude-office\data\server.log' -RedirectStandardError 'C:\Users\newgo\Claud用\claude-office\data\server-error.log'"
    timeout /t 2 /nobreak >nul
    echo  [OK] server.js started
)

:: ========== Cloudflared ==========
wmic process where "name='cloudflared.exe'" get ProcessId 2>nul | findstr /r "[0-9]" >nul
if %errorlevel%==0 (
    echo  [OK] cloudflared already running
    goto :show_status
)
if exist data\tunnel.log del data\tunnel.log
echo  [..] Starting tunnel...
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Users\newgo\Claud用\claude-office\cloudflared.exe' -ArgumentList 'tunnel','--url','http://localhost:3848' -WorkingDirectory 'C:\Users\newgo\Claud用\claude-office' -WindowStyle Minimized -RedirectStandardError 'C:\Users\newgo\Claud用\claude-office\data\tunnel.log'"
echo  [..] Waiting for tunnel URL (max 15s)...
for /l %%i in (1,1,15) do (
    timeout /t 1 /nobreak >nul
    findstr /i "trycloudflare.com" data\tunnel.log >nul 2>&1 && goto :url_found
)
echo  [!!] Tunnel URL not found yet. Check data\tunnel.log later.
goto :show_status
:url_found
echo  [OK] cloudflared started

:show_status
echo.
echo  ------------------------------------------
echo   Local:  http://localhost:3848

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0show-url.ps1"

echo  ------------------------------------------
echo.
pause
