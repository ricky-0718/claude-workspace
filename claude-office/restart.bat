@echo off
chcp 65001 >nul
set "BASE=%~dp0"
cd /d "%BASE%"
set "PORT=3848"
set "MAX_RETRY=3"
set "RETRY=0"

echo [restart] Stopping server...

:: Kill any remaining server.js
wmic process where "name='node.exe' AND CommandLine LIKE '%%server.js%%'" call terminate >nul 2>&1
timeout /t 2 /nobreak >nul

:start_server
set /a RETRY+=1
echo [restart] Starting server (attempt %RETRY%/%MAX_RETRY%)...

powershell -NoProfile -Command "Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList 'server.js' -WorkingDirectory '%BASE%' -WindowStyle Minimized -RedirectStandardOutput '%BASE%data\server.log' -RedirectStandardError '%BASE%data\server-error.log'"

:: Health check: wait up to 10 seconds for /status to respond
echo [restart] Health check...
for /l %%i in (1,1,10) do (
    timeout /t 1 /nobreak >nul
    curl -s -o nul -w "%%{http_code}" http://localhost:%PORT%/status 2>nul | findstr "200" >nul && goto :healthy
)

:: Health check failed
echo [restart] Server not responding after 10s.
if %RETRY% lss %MAX_RETRY% (
    echo [restart] Killing and retrying...
    wmic process where "name='node.exe' AND CommandLine LIKE '%%server.js%%'" call terminate >nul 2>&1
    timeout /t 2 /nobreak >nul
    goto :start_server
)
echo [restart] FAILED after %MAX_RETRY% attempts. Check data\server-error.log
exit /b 1

:healthy
echo [restart] Server is healthy (attempt %RETRY%).
exit /b 0
