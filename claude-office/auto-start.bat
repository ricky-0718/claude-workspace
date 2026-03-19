@echo off
chcp 65001 >nul
set "BASE=%~dp0"
cd /d "%BASE%"

:: ========== Claude Office Server (port 3848) ==========
wmic process where "name='node.exe'" get CommandLine 2>nul | findstr /i "server.js" >nul
if %errorlevel%==0 (
    goto :blog_test
)
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -WorkingDirectory '%BASE%' -WindowStyle Minimized -RedirectStandardOutput '%BASE%data\server.log' -RedirectStandardError '%BASE%data\server-error.log'"
timeout /t 2 /nobreak >nul

:blog_test
:: ========== Blog Test Server (port 8787) ==========
:: start-tunnel.js has built-in port conflict check — safe to call even if already running
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'start-tunnel.js' -WorkingDirectory '%BASE%..\blog-test' -WindowStyle Minimized"

:: ========== Tailscale Funnel ==========
:: Configured as background service. Persists across reboots.
:: https://hp-spectre-14.tail3a3559.ts.net/      → localhost:3848
:: https://hp-spectre-14.tail3a3559.ts.net/blog/  → localhost:8787
