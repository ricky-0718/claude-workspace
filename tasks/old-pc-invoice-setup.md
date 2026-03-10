# 旧PC 請求書自動保存セットアップ指示書

## 旧PCのClaude Codeに投げるプロンプト（コピペ用）

```
請求書自動保存をセットアップしてください。

1. git pull でコードを最新にする
   cd "C:/Users/newgo/Claud用" && git pull

2. .env に以下の3行があるか確認（なければ追加が必要）
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   GOOGLE_REFRESH_TOKEN
   ファイル: C:/Users/newgo/Claud用/claude-office/.env

3. setup-invoice.bat を管理者権限で実行（npm install + タスクスケジューラ登録 + テスト実行を一括で行う）
   powershell -Command "Start-Process cmd -ArgumentList '/c C:\Users\newgo\Claud用\claude-office\setup-invoice.bat' -Verb RunAs"
```

## 事前準備（自分でやること）
- 新PCの `C:\Users\newgo\Claude用\claude-office\.env` から GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN の3行をコピーして、旧PCの `C:\Users\newgo\Claud用\claude-office\.env` に追記する
- ※ 旧PCのフォルダ名は `Claud用`（eなし）
