# Meta広告セットアッププラグイン 設計ドキュメント

> **Date:** 2026-02-22
> **Status:** Approved
> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

## 概要

同じMetaアカウント内の別キャンペーンを、スプレッドシート作成からGASコード設定・トリガー設定まで一括で自動セットアップするClaude Codeプラグイン。

## アプローチ

**テンプレート＋ブラウザ自動化方式** — プラグイン内にGASテンプレートコードとブラウザ操作ガイドを持ち、Claudeがブラウザ操作で全ステップを自動実行する。

## プラグイン構成

```
meta-ads-setup/
├── plugin.json                    # プラグインマニフェスト
├── commands/
│   └── setup-meta-ads.md          # /setup-meta-ads コマンド定義
└── skills/
    └── meta-ads-setup/
        ├── SKILL.md               # スキル定義（自然言語トリガー）
        └── references/
            ├── gas-template.js    # GASテンプレートコード
            ├── sheet-config.md    # シート構成・ヘッダー定義
            └── browser-guide.md   # ブラウザ操作手順ガイド
```

## 実行フロー

### Step 1: 情報入力
- キャンペーン名（表示用。例: 「LP-Bテスト」）
- キャンペーンID（Meta Campaign ID）
- 新規スプレッドシート作成 or 既存に追加
- （既存の場合）スプレッドシートURL

### Step 2: スプレッドシート作成/設定
- **新規の場合**: Google Sheetsで新規スプレッドシート作成
- スプレッドシート名: `【{キャンペーン名}】広告分析ダッシュボード`
- シート作成:
  1. `Meta広告_生データ` — ヘッダー: 日付, 広告費, インプレッション, リーチ数, クリック数, LINE登録数, フリークエンシー
  2. `日次集計` — 集計ビュー（基本構造のみ）
  3. `KPIダッシュボード` — KPI可視化（基本構造のみ）

### Step 3: GASコード設定
- Apps Scriptエディタを開く
- `gas-template.js` をベースにプレースホルダーを置換してコード生成
- Monaco APIで挿入 → Ctrl+S で保存
- `コード.gs` にメニュー関数を追加

### Step 4: API認証情報設定
- 既存のシステムユーザートークンを再利用:
  - APP_ID: `2182235012581636`
  - APP_SECRET: `3df7d73e747b4aba7e0621fcd766c7c7`
  - ACCESS_TOKEN: 既存トークン
  - AD_ACCOUNT_ID: `act_710339561118574`（共通）
  - CAMPAIGN_ID: ユーザー入力値
- ScriptPropertiesに保存する一時関数を生成・実行

### Step 5: トリガー設定 & テスト
- `setupDailyTrigger()` を実行（時刻は既存トリガーとずらす）
- `testFetchYesterday()` でAPIテスト実行
- 結果をユーザーに報告

## GASテンプレート設計

### プレースホルダー
| プレースホルダー | 説明 | 例 |
|---------------|------|-----|
| `{{CAMPAIGN_NAME}}` | キャンペーン名 | `LP-Bテスト` |
| `{{CAMPAIGN_ID}}` | Meta Campaign ID | `120238196486730069` |
| `{{SHEET_NAME}}` | 生データシート名 | `Meta広告_生データ` |
| `{{AD_ACCOUNT_ID}}` | 広告アカウントID | `act_710339561118574` |
| `{{TRIGGER_HOUR}}` | トリガー実行時刻 | `5`（午前5-6時） |

### テンプレートに含まれる関数
- `setupCredentials()` — 認証情報UI設定
- `exchangeForLongLivedToken()` — トークン変換
- `checkTokenExpiry_()` — トークン期限チェック
- `fetchMetaInsights_(dateStr)` — API呼び出し
- `extractLineRegistrations_(actions)` — LINE登録数抽出
- `formatRowData_(insightData)` — 行データ整形
- `writeRowToSheet_(rowData)` — シート書込み
- `dailyFetchMetaAds()` — 日次メイン関数
- `manualFetchRange(start, end)` — バックフィル
- `testFetchYesterday()` — テスト実行
- `sendErrorNotification_()` — エラー通知
- `setupDailyTrigger()` — トリガー設定
- `removeDailyTrigger()` — トリガー解除

## 技術的考慮事項

### トークン共有
同じMetaアカウント内なので、システムユーザートークンは全キャンペーンで共有可能。ただし、各GASプロジェクトのScriptPropertiesにそれぞれ保存する（独立性担保）。

### トリガー時刻の衝突回避
複数キャンペーンが同時刻にAPIを叩くと制限に引っかかる可能性あり。新規セットアップ時は既存トリガーの時刻を確認し、1時間ずらして設定。

### エラーハンドリング
- APIエラー → メール通知
- トークン期限切れ → 50日経過で警告メール
- シート未存在 → エラーログ＋メール通知

## 制約事項
- ブラウザ操作はEdge（Chrome不使用）
- GAS実行にはスプレッドシートへのOAuth権限承認が必要（初回のみ）
- システムユーザートークンの有効期限は60日（手動更新が必要）
