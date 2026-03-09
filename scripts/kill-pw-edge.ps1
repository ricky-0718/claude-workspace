$procIds = Get-CimInstance Win32_Process -Filter "name='msedge.exe'" | Where-Object { $_.CommandLine -match 'playwright-data' } | Select-Object -ExpandProperty ProcessId
foreach ($p in $procIds) {
    Stop-Process -Id $p -Force -ErrorAction SilentlyContinue
    Write-Host "Killed PID: $p"
}
Write-Host "Done. Killed $($procIds.Count) processes."
