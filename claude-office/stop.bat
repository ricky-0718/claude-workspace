@echo off
chcp 65001 >nul

echo.
echo  ==============================
echo   Claude Office - Shutdown
echo  ==============================
echo.

:: Stop node server.js only (not other node processes)
wmic process where "name='node.exe' and CommandLine like '%%server.js%%'" call terminate >nul 2>&1
echo  [OK] server.js stopped

:: Note: Tailscale Funnel runs as a background service and persists.
:: To disable: tailscale funnel --https=443 off

echo.
echo  Done. (Tailscale Funnel is still active)
echo.
pause
