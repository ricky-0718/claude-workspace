@echo off
chcp 65001 >nul
set "BASE=%~dp0"
cd /d "%BASE%"

:: ========== Server ==========
wmic process where "name='node.exe'" get CommandLine 2>nul | findstr /i "server.js" >nul
if %errorlevel%==0 (
    goto :start_tunnel
)
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -WorkingDirectory '%BASE%' -WindowStyle Minimized -RedirectStandardOutput '%BASE%data\server.log' -RedirectStandardError '%BASE%data\server-error.log'"
timeout /t 2 /nobreak >nul

:start_tunnel
:: ========== Cloudflared ==========
wmic process where "name='cloudflared.exe'" get ProcessId 2>nul | findstr /r "[0-9]" >nul
if %errorlevel%==0 goto :save_url

if exist data\tunnel.log del data\tunnel.log
powershell -NoProfile -Command "Start-Process -FilePath '%BASE%cloudflared.exe' -ArgumentList 'tunnel','--url','http://localhost:3848' -WorkingDirectory '%BASE%' -WindowStyle Minimized -RedirectStandardError '%BASE%data\tunnel.log'"

:save_url
:: Wait for tunnel URL and save it
for /l %%i in (1,1,15) do (
    timeout /t 1 /nobreak >nul
    findstr /i "trycloudflare.com" data\tunnel.log >nul 2>&1 && goto :done
)
:done
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0show-url.ps1" >nul 2>&1
