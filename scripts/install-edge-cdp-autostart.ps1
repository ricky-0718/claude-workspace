$WshShell = New-Object -ComObject WScript.Shell
$StartupPath = [Environment]::GetFolderPath('Startup')
$ShortcutPath = Join-Path $StartupPath 'Edge with CDP.lnk'
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$Shortcut.Arguments = '--remote-debugging-port=9222 --restore-last-session --no-first-run'
$Shortcut.WorkingDirectory = 'C:\Program Files (x86)\Microsoft\Edge\Application'
$Shortcut.Description = 'Edge with Playwright CDP (auto-start at login)'
$Shortcut.WindowStyle = 1
$Shortcut.Save()

Write-Host ('Created: ' + $ShortcutPath)
Write-Host '--- verify ---'
$verify = $WshShell.CreateShortcut($ShortcutPath)
Write-Host ('Target : ' + $verify.TargetPath)
Write-Host ('Args   : ' + $verify.Arguments)
Write-Host ('WorkDir: ' + $verify.WorkingDirectory)
