$WshShell = New-Object -ComObject WScript.Shell

$paths = @(
    "$env:APPDATA\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar\Microsoft Edge.lnk",
    "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\Edge with CDP.lnk",
    "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Microsoft Edge.lnk",
    "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Microsoft Edge.lnk",
    "$env:USERPROFILE\Desktop\Microsoft Edge.lnk",
    "$env:PUBLIC\Desktop\Microsoft Edge.lnk"
)

foreach ($p in $paths) {
    if (Test-Path $p) {
        $l = $WshShell.CreateShortcut($p)
        $hasCdp = if ($l.Arguments -match 'remote-debugging-port') { 'YES' } else { 'no' }
        Write-Host ('[' + $hasCdp + '] ' + $p)
        Write-Host ('    Args: ' + $l.Arguments)
    } else {
        Write-Host ('[ - ] ' + $p + ' (not found)')
    }
}
