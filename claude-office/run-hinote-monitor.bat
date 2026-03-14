@echo off
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" hinote-monitor.js >> data\hinote-monitor.log 2>&1
