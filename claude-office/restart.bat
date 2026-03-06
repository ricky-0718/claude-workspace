@echo off
chcp 65001 >nul
cd /d "C:\Users\newgo\Claude用\claude-office"

:: Wait for old server to exit
timeout /t 3 /nobreak >nul

:: Kill any remaining server.js
wmic process where "name='node.exe' AND CommandLine LIKE '%%server.js%%'" call terminate >nul 2>&1
timeout /t 1 /nobreak >nul

:: Start fresh
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -WorkingDirectory 'C:\Users\newgo\Claude用\claude-office' -WindowStyle Minimized -RedirectStandardOutput 'C:\Users\newgo\Claude用\claude-office\data\server.log' -RedirectStandardError 'C:\Users\newgo\Claude用\claude-office\data\server-error.log'"
