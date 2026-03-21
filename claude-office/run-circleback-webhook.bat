@echo off
REM ============================================
REM Circleback Webhook Server 起動スクリプト
REM ポート3849でWebhookサーバーを起動
REM ============================================

cd /d "%~dp0"

echo [Circleback Webhook] Starting server...
"C:\Program Files\nodejs\node.exe" circleback-webhook.js

pause
