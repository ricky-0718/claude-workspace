@echo off
cd /d "%~dp0"

echo === 請求書自動保存セットアップ ===

echo [1/3] npm install 実行中...
"C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install
if errorlevel 1 (
    echo [ERROR] npm install 失敗
    pause
    exit /b 1
)

echo [2/3] タスクスケジューラ登録中...
schtasks /create /tn "InvoiceAutoSave" /tr "%~dp0run-invoice-poller.bat" /sc daily /st 09:00 /f
schtasks /create /tn "InvoiceAutoSave_13" /tr "%~dp0run-invoice-poller.bat" /sc daily /st 13:00 /f
schtasks /create /tn "InvoiceAutoSave_18" /tr "%~dp0run-invoice-poller.bat" /sc daily /st 18:00 /f

echo [3/3] テスト実行中...
"C:\Program Files\nodejs\node.exe" invoice-poller.js

echo === セットアップ完了 ===
pause
