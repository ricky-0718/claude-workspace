@echo off
cd /d "%~dp0.."
git pull origin master >> "%~dp0data\git-pull.log" 2>&1
echo [%date% %time%] git pull completed >> "%~dp0data\git-pull.log"
