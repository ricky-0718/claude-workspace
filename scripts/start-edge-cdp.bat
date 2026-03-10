@echo off
chcp 65001 >nul 2>&1
REM Edge を CDP（リモートデバッグ）モードで起動する
REM 複数のClaude Codeセッションが同時にブラウザ操作できるようになる

set "EDGE_PATH=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
set "USER_DATA=C:\Users\newgo\Claude用\.playwright-data"
set "CDP_PORT=9222"

REM 既にCDPポートで起動中か確認
netstat -ano | findstr ":%CDP_PORT% " | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (
    echo Edge is already running on CDP port %CDP_PORT%.
    exit /b 0
)

echo Starting Edge with CDP on port %CDP_PORT%...
start "" "%EDGE_PATH%" --remote-debugging-port=%CDP_PORT% --user-data-dir="%USER_DATA%" --no-first-run
echo Edge started. CDP endpoint: http://localhost:%CDP_PORT%
