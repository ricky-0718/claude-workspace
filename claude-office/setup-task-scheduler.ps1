$action = New-ScheduledTaskAction -Execute "C:\Users\newgo\Claude用\claude-office\run-invoice-poller.bat"

$trigger1 = New-ScheduledTaskTrigger -Daily -At "09:00"
$trigger2 = New-ScheduledTaskTrigger -Daily -At "13:00"
$trigger3 = New-ScheduledTaskTrigger -Daily -At "18:00"

Register-ScheduledTask -TaskName "InvoiceAutoSave" -Action $action -Trigger $trigger1,$trigger2,$trigger3 -Description "請求書・契約書PDF自動保存" -RunLevel Highest -Force

Write-Output "タスク 'InvoiceAutoSave' を登録しました（9時・13時・18時に実行）"
