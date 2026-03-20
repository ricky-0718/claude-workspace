---
name: gas-deploy
description: |
  GASスクリプトのデプロイ。clasp push + トリガー設定 + Monaco editor対応。
  Use when: 「GASをデプロイして」「/gas-deploy」「clasp push」「トリガー設定」と言われたとき。
  Do NOT use: GASコードの新規作成（司令塔が直接対応）、スプレッドシート操作のみ
---

# GAS デプロイワークフロー

指定されたGASスクリプトをデプロイする。

## 前提ルール
- Trigger API: `.timeBased()` を使用（`.timeDriven()` は存在しない）
- Monaco editor bulk set: `window.monaco.editor.getModels()[0].setValue(code)`
- Gmail検索: 必ず `newer_than:7d` を含める
- ローカルコピー: `C:\Users\newgo\Claude用\gas-scripts\`

## ワークフロー

### Step 1: 対象スクリプトの確認
1. `C:/Users/newgo/Claude用/gas-scripts/` のファイル一覧を確認
2. ユーザーが指定したスクリプトを読み込む
3. 変更内容があれば確認する

### Step 2: clasp push
1. clasp パス: `"C:/Users/newgo/AppData/Roaming/npm/clasp.cmd"`
2. `clasp push` でGASにアップロード
3. エラーがあれば修正して再push

### Step 3: トリガー設定（必要な場合）
1. スクリプト内のトリガー設定関数を確認
2. `.timeBased()` を使用していることを確認（`.timeDriven()` は使わない）
3. 必要に応じて `clasp run` でトリガー設定関数を実行

### Step 4: 動作確認
1. `clasp run` でテスト実行
2. ログを確認して正常動作を検証
3. エラーがあれば修正

### Step 5: ローカルコピー更新
1. `gas-scripts/` のローカルファイルが最新であることを確認
2. 変更があればローカルにも反映

## 注意事項
- Bashの `curl` で日本語JSON送信は文字化けする → Node.js の fetch または MCP 経由で送ること
- バックグラウンドサーバー起動時は先に旧プロセスを停止する
