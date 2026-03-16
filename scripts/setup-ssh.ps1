# ============================================
# OpenSSH Server セットアップスクリプト
# 旧PC (hp-spectre-14) にSSHサーバーを設定する
# 実行方法: PowerShell を管理者権限で実行
#   powershell -ExecutionPolicy Bypass -File setup-ssh.ps1
# ============================================

Write-Host "=== OpenSSH Server セットアップ ===" -ForegroundColor Cyan

# 1. OpenSSH Server のインストール状態を確認
$sshCapability = Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Server*'

if ($sshCapability.State -eq 'Installed') {
    Write-Host "[OK] OpenSSH Server は既にインストール済みです" -ForegroundColor Green
} else {
    Write-Host "[INFO] OpenSSH Server をインストール中..." -ForegroundColor Yellow
    Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
    Write-Host "[OK] インストール完了" -ForegroundColor Green
}

# 2. sshd サービスの起動と自動起動設定
Write-Host "[INFO] sshd サービスを設定中..." -ForegroundColor Yellow
Set-Service -Name sshd -StartupType Automatic
Start-Service sshd
Write-Host "[OK] sshd サービス起動・自動起動設定完了" -ForegroundColor Green

# 3. ファイアウォールルール追加（既存なら無視）
$rule = Get-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -ErrorAction SilentlyContinue
if ($rule) {
    Write-Host "[OK] ファイアウォールルールは既に存在します" -ForegroundColor Green
} else {
    New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' `
        -DisplayName 'OpenSSH Server (sshd)' `
        -Enabled True -Direction Inbound -Protocol TCP `
        -Action Allow -LocalPort 22
    Write-Host "[OK] ファイアウォールルール追加完了" -ForegroundColor Green
}

# 4. デフォルトシェルを PowerShell に設定
$regPath = 'HKLM:\SOFTWARE\OpenSSH'
if (-not (Test-Path $regPath)) {
    New-Item -Path $regPath -Force | Out-Null
}
$pwshPath = (Get-Command powershell.exe).Source
New-ItemProperty -Path $regPath -Name DefaultShell -Value $pwshPath -PropertyType String -Force | Out-Null
Write-Host "[OK] デフォルトシェル: $pwshPath" -ForegroundColor Green

# 5. 確認
$service = Get-Service sshd
Write-Host ""
Write-Host "=== セットアップ完了 ===" -ForegroundColor Cyan
Write-Host "  サービス状態: $($service.Status)"
Write-Host "  起動タイプ:   $($service.StartType)"
Write-Host "  接続方法:     ssh $env:USERNAME@<IPアドレス>"
Write-Host ""
