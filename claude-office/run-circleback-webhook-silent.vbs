' ============================================
' Circleback Webhook Server サイレント起動
' タスクスケジューラからの自動起動用
' ============================================
Set WshShell = CreateObject("WScript.Shell")

' Webhook サーバー起動（ウインドウ非表示）
WshShell.Run """C:\Program Files\nodejs\node.exe"" """ & Replace(WScript.ScriptFullName, WScript.ScriptName, "") & "circleback-webhook.js""", 0, False

' 公開URL: Tailscale Funnel（常時起動済み・追加設定不要）
' https://ricky-omnibook.tail3a3559.ts.net/webhook/circleback
