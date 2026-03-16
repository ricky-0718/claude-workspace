@echo off
:: Self-elevate to admin
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process cmd -ArgumentList '/c \"%~f0\"' -Verb RunAs"
    exit /b
)

echo === OpenSSH Server Setup ===
echo.

:: Install OpenSSH Server
echo [1/4] Installing OpenSSH Server...
dism /Online /Add-Capability /CapabilityName:OpenSSH.Server~~~~0.0.1.0

:: Start and auto-start sshd
echo [2/4] Starting sshd service...
sc config sshd start= auto
net start sshd

:: Firewall rule
echo [3/4] Adding firewall rule...
netsh advfirewall firewall add rule name="OpenSSH Server (sshd)" dir=in action=allow protocol=TCP localport=22

:: Set default shell to PowerShell
echo [4/4] Setting default shell...
reg add "HKLM\SOFTWARE\OpenSSH" /v DefaultShell /t REG_SZ /d "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" /f

echo.
echo === Setup Complete ===
sc query sshd | findstr STATE
echo.
echo Press any key to close...
pause >nul
