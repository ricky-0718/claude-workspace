@echo off
chcp 65001 >nul

echo.
echo  ==============================
echo   Claude Office - Shutdown
echo  ==============================
echo.

:: Stop ALL cloudflared processes
taskkill /im cloudflared.exe /f >nul 2>&1
wmic process where "name='cloudflared.exe'" call terminate >nul 2>&1
echo  [OK] cloudflared stopped

:: Stop node server.js only (not other node processes)
wmic process where "name='node.exe' and CommandLine like '%%server.js%%'" call terminate >nul 2>&1
echo  [OK] server.js stopped

echo.
echo  Done.
echo.
pause
