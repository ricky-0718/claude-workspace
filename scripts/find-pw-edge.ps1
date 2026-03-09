Get-CimInstance Win32_Process -Filter "name='msedge.exe'" | Where-Object { $_.CommandLine -match 'playwright-data' } | Select-Object -ExpandProperty ProcessId
