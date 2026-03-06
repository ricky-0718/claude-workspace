@echo off
chcp 65001 >nul
cd /d "C:\Users\newgo\Claude用\claude-office"

:: ========== Server ==========
wmic process where "name='node.exe'" get CommandLine 2>nul | findstr /i "server.js" >nul
if %errorlevel%==0 (
    goto :start_tunnel
)
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -WorkingDirectory 'C:\Users\newgo\Claude用\claude-office' -WindowStyle Minimized -RedirectStandardOutput 'C:\Users\newgo\Claude用\claude-office\data\server.log' -RedirectStandardError 'C:\Users\newgo\Claude用\claude-office\data\server-error.log'"
timeout /t 2 /nobreak >nul

:start_tunnel
:: ========== Cloudflared ==========
wmic process where "name='cloudflared.exe'" get ProcessId 2>nul | findstr /r "[0-9]" >nul
if %errorlevel%==0 goto :save_url

if exist data\tunnel.log del data\tunnel.log
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Users\newgo\Claude用\claude-office\cloudflared.exe' -ArgumentList 'tunnel','--url','http://localhost:3848' -WorkingDirectory 'C:\Users\newgo\Claude用\claude-office' -WindowStyle Minimized -RedirectStandardError 'C:\Users\newgo\Claude用\claude-office\data\tunnel.log'"

:save_url
:: Wait for tunnel URL and save it
for /l %%i in (1,1,15) do (
    timeout /t 1 /nobreak >nul
    findstr /i "trycloudflare.com" data\tunnel.log >nul 2>&1 && goto :done
)
:done
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0show-url.ps1" >nul 2>&1
