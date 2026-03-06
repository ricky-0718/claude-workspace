@echo off
chcp 65001 >nul
cd /d "%~dp0"

:: Wait for old server to exit
timeout /t 3 /nobreak >nul

:: Kill any remaining server.js
wmic process where "name='node.exe' AND CommandLine LIKE '%%server.js%%'" call terminate >nul 2>&1
timeout /t 1 /nobreak >nul

:: Start fresh
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -WorkingDirectory '%~dp0' -WindowStyle Minimized -RedirectStandardOutput '%~dp0data\server.log' -RedirectStandardError '%~dp0data\server-error.log'"
