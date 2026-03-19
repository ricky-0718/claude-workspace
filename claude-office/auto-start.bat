@echo off
chcp 65001 >nul
set "BASE=%~dp0"
cd /d "%BASE%"

:: ========== Server ==========
wmic process where "name='node.exe'" get CommandLine 2>nul | findstr /i "server.js" >nul
if %errorlevel%==0 (
    goto :done
)
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -WorkingDirectory '%BASE%' -WindowStyle Minimized -RedirectStandardOutput '%BASE%data\server.log' -RedirectStandardError '%BASE%data\server-error.log'"
timeout /t 2 /nobreak >nul

:: ========== Tailscale Funnel ==========
:: Funnel is configured as a background service (tailscale funnel --bg 3848)
:: It persists across reboots automatically. No need to start it here.
:: Fixed URL: https://hp-spectre-14.tail3a3559.ts.net/

:done
