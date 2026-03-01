Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\newgo\Claud用"
WshShell.Run "cmd /c ""C:\Users\newgo\.local\bin\claude.exe"" remote-control --permission-mode default", 0, False
