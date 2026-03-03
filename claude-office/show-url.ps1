$logPath = Join-Path $PSScriptRoot 'data\tunnel.log'
$urlPath = Join-Path $PSScriptRoot 'data\url.txt'

if (Test-Path $logPath) {
    $m = Select-String -Path $logPath -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' -ErrorAction SilentlyContinue
    if ($m) {
        $url = $m[0].Matches[0].Value
        Write-Host "  Tunnel: $url"
        Set-Content -Path $urlPath -Value $url -NoNewline
        Set-Clipboard -Value $url
        Write-Host ''
        Write-Host '  [Copied to clipboard]'
        return
    }
}
Write-Host '  Tunnel: not available'
