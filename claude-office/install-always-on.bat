@echo off
chcp 65001 >nul

echo.
echo  ==============================
echo   Spectre Always-On Setup
echo  ==============================
echo.

:: 1. Disable sleep on AC power
echo  [1/3] Setting sleep to never (AC power)...
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0
powercfg /change monitor-timeout-ac 30
echo  [OK] Sleep disabled, monitor off after 30min

:: 2. Register auto-start task
echo.
echo  [2/3] Registering auto-start task...
schtasks /create /tn "ClaudeOffice" /tr "%~dp0auto-start.bat" /sc onlogon /rl highest /f
if %errorlevel%==0 (
    echo  [OK] Auto-start on login registered
) else (
    echo  [!!] Failed. Try running as Administrator.
)

:: 3. Start now
echo.
echo  [3/3] Starting services now...
call "%~dp0start.bat"
