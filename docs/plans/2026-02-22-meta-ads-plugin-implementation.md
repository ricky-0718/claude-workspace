# Meta広告セットアッププラグイン 実装計画

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** `/setup-meta-ads` コマンドで、新しいMeta広告キャンペーンのデータ取得環境（スプレッドシート＋GASコード＋トリガー）を一括セットアップするClaude Codeプラグインを作成する

**Architecture:** Claude Codeプラグイン標準構造（.claude-plugin/plugin.json + commands/ + skills/）に準拠。GASテンプレートコードをreferences/に格納し、コマンド/スキル実行時にプレースホルダーを置換してブラウザ操作で自動デプロイする。

**Tech Stack:** Claude Code Plugin, Markdown (commands/skills), JavaScript (GAS template), Edge Browser Automation

**Plugin Location:** `C:\Users\newgo\Claude用\meta-ads-setup\`

---

### Task 1: プラグインマニフェスト作成

**Files:**
- Create: `meta-ads-setup/.claude-plugin/plugin.json`

**Step 1: ディレクトリ構造を作成**

```bash
mkdir -p meta-ads-setup/.claude-plugin
mkdir -p meta-ads-setup/commands
mkdir -p meta-ads-setup/skills/meta-ads-setup/references
```

**Step 2: plugin.json を作成**

```json
{
  "name": "meta-ads-setup",
  "version": "1.0.0",
  "description": "Meta広告データ自動取得のセットアップを一括で行うプラグイン。/setup-meta-ads で新規キャンペーンの環境構築を自動化。"
}
```

**Step 3: 確認**

```bash
cat meta-ads-setup/.claude-plugin/plugin.json
```
Expected: JSONが正しく表示される

---

### Task 2: GASテンプレートコード作成

**Files:**
- Create: `meta-ads-setup/skills/meta-ads-setup/references/gas-template.js`

**Step 1: テンプレートファイルを作成**

既存の `meta_api_auto_fetch.gs` をベースに、以下のプレースホルダーを使用するテンプレートを作成：

- `{{CAMPAIGN_NAME}}` → キャンペーン名
- `{{CAMPAIGN_ID}}` → Meta Campaign ID
- `{{SHEET_NAME}}` → 生データシート名（デフォルト: `Meta広告_生データ`）
- `{{AD_ACCOUNT_ID}}` → 広告アカウントID（デフォルト: `act_710339561118574`）
- `{{TRIGGER_HOUR}}` → トリガー実行時刻（デフォルト: `4`）

テンプレート内容は以下の13関数を含む：
1. `setupCredentials()` — 認証情報UI設定
2. `exchangeForLongLivedToken()` — トークン変換
3. `checkTokenExpiry_()` — トークン期限チェック
4. `fetchMetaInsights_(dateStr)` — API呼び出し
5. `extractLineRegistrations_(actions)` — LINE登録数抽出
6. `formatRowData_(insightData)` — 行データ整形
7. `writeRowToSheet_(rowData)` — シート書込み
8. `dailyFetchMetaAds()` — 日次メイン関数
9. `manualFetchRange(start, end)` — バックフィル
10. `testFetchYesterday()` — テスト実行
11. `sendErrorNotification_()` — エラー通知
12. `setupDailyTrigger()` — トリガー設定
13. `removeDailyTrigger()` — トリガー解除

**注意**: テンプレートのソースは `docs/plans/2026-02-22-meta-ads-auto-fetch-design.md` 内のコードブロックを結合したもの。各プレースホルダー箇所にコメントを付与して、置換対象を明確にする。

**Step 2: ファイルの確認**

```bash
wc -l meta-ads-setup/skills/meta-ads-setup/references/gas-template.js
```
Expected: 約400-450行

---

### Task 3: コード.gs テンプレート作成

**Files:**
- Create: `meta-ads-setup/skills/meta-ads-setup/references/code-gs-template.js`

**Step 1: onOpen関数のテンプレートを作成**

```javascript
/**
 * スプレッドシート起動時にカスタムメニューを追加
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Meta広告データ')
    .addItem('🔄 API: 昨日のデータを取得', 'testFetchYesterday')
    .addItem('📅 API: 期間指定で取得（バックフィル）', 'showBackfillDialog_')
    .addSeparator()
    .addItem('⚙ API認証情報を設定', 'setupCredentials')
    .addItem('🔑 長期トークンに変換', 'exchangeForLongLivedToken')
    .addItem('⏰ 日次トリガーを設定', 'setupDailyTrigger')
    .addItem('⏹ 日次トリガーを解除', 'removeDailyTrigger')
    .addToUi();
}

/**
 * バックフィル用ダイアログを表示
 */
function showBackfillDialog_() {
  var ui = SpreadsheetApp.getUi();
  var startResult = ui.prompt('開始日を入力 (YYYY-MM-DD):');
  if (startResult.getSelectedButton() !== ui.Button.OK) return;
  var endResult = ui.prompt('終了日を入力 (YYYY-MM-DD):');
  if (endResult.getSelectedButton() !== ui.Button.OK) return;
  manualFetchRange(startResult.getResponseText(), endResult.getResponseText());
}
```

---

### Task 4: シート設定リファレンス作成

**Files:**
- Create: `meta-ads-setup/skills/meta-ads-setup/references/sheet-config.md`

**Step 1: シート設定ドキュメントを作成**

以下を含む：
- 新規スプレッドシートの命名規則: `【{キャンペーン名}】広告分析ダッシュボード`
- 作成するシート一覧と各シートのヘッダー構成
- 「Meta広告_生データ」のA1:G1ヘッダー定義
- 「日次集計」の基本構造
- 「KPIダッシュボード」の基本構造
- 列幅・書式設定の推奨値

---

### Task 5: ブラウザ操作ガイド作成

**Files:**
- Create: `meta-ads-setup/skills/meta-ads-setup/references/browser-guide.md`

**Step 1: ブラウザ操作手順ドキュメントを作成**

以下のステップバイステップガイドを含む：

1. **新規スプレッドシート作成**
   - Google Sheetsを新しいタブで開く
   - タイトルを設定
   - シートを作成しヘッダーを挿入

2. **Apps Scriptエディタ操作**
   - 拡張機能 → Apps Script でエディタを開く
   - Monaco editor APIの使い方（model取得、setValue、保存）
   - ファイル追加の方法

3. **ScriptProperties設定**
   - 一時関数でcredentialsを設定する方法
   - 関数セレクタードロップダウンの操作方法
   - 実行と結果確認の方法

4. **トリガー設定**
   - setupDailyTrigger()の実行方法
   - トリガーページでの確認方法

5. **テスト実行**
   - testFetchYesterday()の実行方法
   - 結果確認（実行ログ＋スプレッドシート）

**重要な注意事項も含む:**
- Edge専用（Chrome不使用）
- `tabs_context_mcp` を最初に呼ぶ
- Monaco APIアクセス方法: `monaco.editor.getModels()`
- SpreadsheetApp.getUi() はエディタから実行不可
- 関数セレクタードロップダウンの信頼性の低さと代替策

---

### Task 6: スキル定義作成 (SKILL.md)

**Files:**
- Create: `meta-ads-setup/skills/meta-ads-setup/SKILL.md`

**Step 1: SKILL.md を作成**

```markdown
---
name: meta-ads-setup
description: Meta広告の新しいキャンペーンのデータ取得環境をセットアップする時に使用。「Meta広告を追加」「新しいキャンペーンを設定」「広告データ取得を設定」などの依頼時にトリガー。
---

# Meta広告データ取得 セットアップスキル

## 概要
同じMetaアカウント(act_710339561118574)内の新しいキャンペーンに対して、
スプレッドシート作成 → GASコード設定 → API認証設定 → トリガー設定 を一括で行う。

## 前提条件
- Edgeブラウザが接続済み（tabs_context_mcp で確認）
- 既存のシステムユーザートークンが有効（60日の有効期限を確認）

## 実行フロー

### Step 1: 情報収集
ユーザーに以下を聞く:
1. **キャンペーン名**（表示用。例: 「LP-Bテスト」）
2. **キャンペーンID**（Meta Campaign ID。例: 120238196486730069）
3. **新規スプレッドシート or 既存に追加？**
4. **（既存の場合）スプレッドシートURL**

### Step 2: スプレッドシート作成/設定
`references/sheet-config.md` を参照。
- 新規の場合: Google Sheetsで作成
- シート名: 「Meta広告_生データ」
- ヘッダー行(A1:G1): 日付, 広告費, インプレッション, リーチ数, クリック数, LINE登録数, フリークエンシー
- 追加シート: 日次集計, KPIダッシュボード

### Step 3: GASコード設定
`references/gas-template.js` を読み込み、プレースホルダーを置換:
- `{{CAMPAIGN_NAME}}` → ユーザー入力のキャンペーン名
- `{{CAMPAIGN_ID}}` → ユーザー入力のキャンペーンID
- `{{SHEET_NAME}}` → 'Meta広告_生データ'
- `{{AD_ACCOUNT_ID}}` → 'act_710339561118574'
- `{{TRIGGER_HOUR}}` → 既存トリガーとずらした時刻

`references/browser-guide.md` の手順に従い:
1. Apps Scriptエディタを開く
2. Monaco APIでコードを挿入
3. コード.gsにメニュー関数を追加（references/code-gs-template.js参照）
4. Ctrl+S で保存

### Step 4: API認証情報設定
既存のシステムユーザートークンを再利用。一時関数を生成して実行:
- META_APP_ID: 2182235012581636
- META_APP_SECRET: 3df7d73e747b4aba7e0621fcd766c7c7
- META_ACCESS_TOKEN: （既存トークンを使用 - 有効期限確認必要）
- META_AD_ACCOUNT_ID: act_710339561118574
- META_CAMPAIGN_ID: ユーザー入力値
- TOKEN_SET_DATE: 実行日
- TOKEN_TYPE: system_user

### Step 5: トリガー設定 & テスト
1. setupDailyTrigger() を実行
2. testFetchYesterday() でテスト
3. スプレッドシートでデータ確認
4. 結果をユーザーに報告

## 共有トークンの注意
システムユーザートークンの有効期限は60日。
現在のトークン設定日: 2026-02-22（期限: ~2026-04-23）
期限が近い場合は、先にトークン更新を案内すること。

## エラー時の対処
- 403エラー → トークン期限切れまたは権限不足
- シートが見つからない → シート名の確認
- Monaco APIが見つからない → ページリロード後再試行
```

**Step 2: 確認**

SKILL.md がreferences/フォルダと同階層にあることを確認。

---

### Task 7: コマンド定義作成

**Files:**
- Create: `meta-ads-setup/commands/setup-meta-ads.md`

**Step 1: コマンドファイルを作成**

```markdown
---
name: setup-meta-ads
description: Meta広告の新規キャンペーンのデータ取得環境を一括セットアップ
---

Meta広告の新しいキャンペーンをセットアップします。

`meta-ads-setup` スキルを呼び出して、以下を一括で実行してください：
1. ユーザーにキャンペーン名とIDを聞く
2. スプレッドシートを作成/設定
3. GASコードを挿入
4. API認証情報を設定
5. 日次トリガーを設定
6. テスト実行して結果を確認

スキルの `SKILL.md` と `references/` フォルダの内容に従って実行してください。
```

---

### Task 8: プラグインの検証とインストール

**Step 1: ファイル構造を確認**

```bash
find meta-ads-setup -type f | sort
```

期待される出力:
```
meta-ads-setup/.claude-plugin/plugin.json
meta-ads-setup/commands/setup-meta-ads.md
meta-ads-setup/skills/meta-ads-setup/SKILL.md
meta-ads-setup/skills/meta-ads-setup/references/browser-guide.md
meta-ads-setup/skills/meta-ads-setup/references/code-gs-template.js
meta-ads-setup/skills/meta-ads-setup/references/gas-template.js
meta-ads-setup/skills/meta-ads-setup/references/sheet-config.md
```

**Step 2: plugin-validator エージェントで検証**

plugin-validator エージェントを使ってプラグイン構造を検証。

**Step 3: プラグインをインストール**

```bash
claude plugin add ./meta-ads-setup
```

**Step 4: 動作確認**

新しいClaude Codeセッションで `/setup-meta-ads` コマンドが表示されることを確認。

---

## 実行順序まとめ

| # | タスク | 所要時間 |
|---|--------|---------|
| 1 | プラグインマニフェスト作成 | 2分 |
| 2 | GASテンプレートコード作成 | 10分 |
| 3 | コード.gsテンプレート作成 | 3分 |
| 4 | シート設定リファレンス作成 | 5分 |
| 5 | ブラウザ操作ガイド作成 | 8分 |
| 6 | スキル定義作成 (SKILL.md) | 5分 |
| 7 | コマンド定義作成 | 3分 |
| 8 | プラグインの検証とインストール | 5分 |
