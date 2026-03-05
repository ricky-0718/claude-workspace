@echo off
chcp 65001 >nul

echo.
echo  ==============================
echo   Claude Office - Auto Start Setup
echo  ==============================
echo.

:: Register Windows Task Scheduler task to run on logon
schtasks /create /tn "ClaudeOffice" /tr "C:\Users\newgo\Claud用\claude-office\auto-start.bat" /sc onlogon /rl highest /f

if %errorlevel%==0 (
    echo  [OK] Auto-start registered successfully!
    echo  PC login at automatically server + tunnel will start.
    echo.
    echo  To remove: schtasks /delete /tn "ClaudeOffice" /f
) else (
    echo  [!!] Failed to register. Run as Administrator.
)
echo.
pause
