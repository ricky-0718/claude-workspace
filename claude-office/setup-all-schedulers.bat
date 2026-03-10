@echo off
cd /d "%~dp0"
echo === タスクスケジューラ一括登録 ===

echo [1/6] 請求書自動保存（9:00, 13:00, 18:00）
schtasks /create /tn "InvoiceAutoSave" /tr "%~dp0run-invoice-poller.bat" /sc daily /st 09:00 /f
schtasks /create /tn "InvoiceAutoSave_13" /tr "%~dp0run-invoice-poller.bat" /sc daily /st 13:00 /f
schtasks /create /tn "InvoiceAutoSave_18" /tr "%~dp0run-invoice-poller.bat" /sc daily /st 18:00 /f

echo [2/6] ログクリーンアップ（毎週日曜 03:00）
schtasks /create /tn "LogCleanup" /tr "%~dp0run-log-cleanup.bat" /sc weekly /d SUN /st 03:00 /f

echo [3/6] 請求書フォルダチェック（毎週金曜 17:00）
schtasks /create /tn "InvoiceFolderCheck" /tr "%~dp0run-invoice-folder-check.bat" /sc weekly /d FRI /st 17:00 /f

echo [4/6] 朝のブリーフィング（毎日 08:30）
schtasks /create /tn "MorningBriefing" /tr "%~dp0run-morning-briefing.bat" /sc daily /st 08:30 /f

echo [5/6] GASトリガー生存確認（毎日 10:00）
schtasks /create /tn "GasHealthCheck" /tr "%~dp0run-gas-health-check.bat" /sc daily /st 10:00 /f

echo [6/6] 旧PC用: 自動git pull（毎日 04:00）
schtasks /create /tn "AutoGitPull" /tr "%~dp0auto-git-pull.bat" /sc daily /st 04:00 /f

echo === 登録完了 ===
schtasks /query /fo table /nh | findstr /i "Invoice LogClean Folder Morning Gas AutoGit"
pause
