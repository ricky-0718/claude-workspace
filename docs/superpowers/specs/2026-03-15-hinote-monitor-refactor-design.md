# HiNote Monitor リファクタリング設計

## 概要
hinote-monitorのClaude CLI依存を軽量化し、安定した自動面談処理を実現する。

## 現状の問題
1. Claude CLIがmendan全ステップ（ファイル読み書き+Asana+スプレッドシート）を実行 → 600sタイムアウト頻発
2. Edgeで新タブが10分ごとに開く → 作業の邪魔

## アーキテクチャ

### フロー
```
hinote-monitor.js
  ├─ ブラウザ: HiNoteから文字起こし抽出（既存タブ再利用）
  ├─ Claude CLI: 分析テキスト生成 + Asanaタスク作成（allowedTools制限）
  └─ Node.js: ファイル書き込み + git push（mendan-executor.js）
```

### Claude CLIの役割（軽量化）
- 入力: 文字起こし + ナレッジ3ファイル（Readツールで読み込み）
- 処理: 分析レポート生成、LINE4通生成、顧客カード生成、Asanaタスク5件作成、スプレッドシート更新（Bash+gws）
- allowedTools: `Read`, `Bash`, Asana MCP関連ツール
- **Write/Editは使わない** → stdoutに構造化テキストを出力

### Node.js（mendan-executor.js）の役割
- Claude CLIのstdoutから3つのセクション（分析レポート/LINE下書き/顧客カード）を抽出
- 各ファイルに追記:
  - `knowledge/students/面談分析まとめ.md`
  - `knowledge/students/LINE下書きまとめ.md`
  - `knowledge/students/顧客コンテキスト.md`
- 目次にもリンクを追加
- git add + commit + push

### ブラウザちらつき修正
- `context.newPage()` → 既存タブから `hinotes.hidock.com` のタブを検索して再利用
- 見つからない場合のみ新タブ作成
- 処理後もタブを閉じない（次回再利用）

## 出力フォーマット（Claude CLI → Node.js）

Claude CLIのプロンプトで以下の区切りを指定:
```
===REPORT_START===
（面談分析レポート全文）
===REPORT_END===
===LINE_START===
（LINE下書き4通全文）
===LINE_END===
===CUSTOMER_START===
（顧客カード）
===CUSTOMER_END===
```

Node.jsはこの区切りでstdoutをパースし、各ファイルに追記する。

## ファイル構成
- `claude-office/prompts/mendan-lightweight.md` — 軽量版プロンプト（新規）
- `claude-office/mendan-executor.js` — ファイル書き込み+git（新規）
- `claude-office/hinote-monitor.js` — タブ再利用+executor呼び出し（修正）

## Asanaルール
- メインタスク: assignee(`1208498758664385`) + due_on(面談日+14日) を設定
- サブタスク4件: assignee + due_on を設定
- notesにはLINE送信文面の全文をそのまま入れる（概要不可）
- 日報プロジェクト(1209935959800165)のみassignee/due_on設定しない
