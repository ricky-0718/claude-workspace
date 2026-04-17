$LnkPath = 'C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Microsoft Edge.lnk'
$NewArgs = '--remote-debugging-port=9222 --restore-last-session --no-first-run'

try {
    $WshShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WshShell.CreateShortcut($LnkPath)
    $Shortcut.Arguments = $NewArgs
    $Shortcut.Save()
    Write-Host ('OK: patched ' + $LnkPath)

    $verify = $WshShell.CreateShortcut($LnkPath)
    Write-Host ('Args now: ' + $verify.Arguments)
    exit 0
}
catch {
    Write-Host ('FAILED: ' + $_.Exception.Message)
    Write-Host 'This path usually requires Administrator privileges.'
    exit 1
}
