@echo off
chcp 65001 >nul 2>nul
REM Delayed worktree cleanup script with retry
REM Runs in background after Claude Code session ends
REM Retries every 5 seconds for up to 60 seconds
REM Usage: cleanup-worktree.bat <worktree-name>

if "%~1"=="" exit /b 1

set WORKTREE_NAME=%~1
set REPO_DIR=C:\Users\newgo\Claude用
set WORKTREE_DIR=%REPO_DIR%\.claude\worktrees\%WORKTREE_NAME%
set MAX_RETRIES=12
set RETRY_COUNT=0

:RETRY_LOOP
if %RETRY_COUNT% geq %MAX_RETRIES% goto :FALLBACK

timeout /t 5 /nobreak > nul
set /a RETRY_COUNT+=1

cd /d "%REPO_DIR%"
git worktree remove --force ".claude\worktrees\%WORKTREE_NAME%" 2>nul
if not exist "%WORKTREE_DIR%" goto :DONE

goto :RETRY_LOOP

:FALLBACK
REM If git worktree remove kept failing, try rmdir
if exist "%WORKTREE_DIR%" (
    rmdir /s /q "%WORKTREE_DIR%" 2>nul
)
git worktree prune 2>nul

:DONE
git worktree prune 2>nul
exit /b 0
