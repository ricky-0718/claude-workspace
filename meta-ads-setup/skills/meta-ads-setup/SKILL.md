---
name: meta-ads-setup
description: Meta広告の新しいキャンペーンのデータ取得環境をセットアップする時に使用。「Meta広告を追加」「新しいキャンペーンを設定」「広告データ取得を設定」「Meta広告のセットアップ」などの依頼時にトリガー。
---

# Meta広告データ取得 セットアップスキル

## 概要

同じMetaアカウント(act_710339561118574)内の新しいキャンペーンに対して、
**スプレッドシート作成 → GASコード設定 → API認証設定 → トリガー設定** を一括で行う。

## 前提条件

- Edgeブラウザが接続済み（`tabs_context_mcp` で確認）
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

- 新規の場合: Google Sheetsで作成（`sheets.new` にナビゲート）
- スプレッドシート名: `【{キャンペーン名}】広告分析ダッシュボード`
- シート名: `Meta広告_生データ`
- ヘッダー行(A1:G1): 日付, 広告費, インプレッション, リーチ数, クリック数, LINE登録数, フリークエンシー
- 追加シート: 日次集計, KPIダッシュボード

### Step 3: GASコード設定

`references/gas-template.js` を読み込み、プレースホルダーを置換:

| プレースホルダー | 置換内容 |
|---------------|---------|
| `{{CAMPAIGN_NAME}}` | ユーザー入力のキャンペーン名 |
| `{{CAMPAIGN_ID}}` | ユーザー入力のキャンペーンID |
| `{{SHEET_NAME}}` | `Meta広告_生データ` |
| `{{AD_ACCOUNT_ID}}` | `act_710339561118574` |
| `{{TRIGGER_HOUR}}` | 既存トリガーとずらした時刻（既存が4時なら5時） |
| `{{PLACEHOLDER_NOTE}}` | 空文字に置換（コメント整理） |

`references/browser-guide.md` の手順に従い:

1. Apps Scriptエディタを開く（拡張機能 → Apps Script）
2. 新しいスクリプトファイル `meta_api_auto_fetch` を追加
3. Monaco APIで置換済みコードを挿入: `monaco.editor.getModels()[最新index].setValue(code)`
4. `コード.gs` に `references/code-gs-template.js` の内容を設定: `models[0].setValue(code)`
5. Ctrl+S で保存

### Step 4: API認証情報設定

既存のシステムユーザートークンを再利用。一時関数を生成してエディタで実行:

```javascript
// --- 一時関数 ---
function _tempSetCredentials() {
  const props = PropertiesService.getScriptProperties();
  props.setProperties({
    'META_APP_ID': '2182235012581636',
    'META_APP_SECRET': '3df7d73e747b4aba7e0621fcd766c7c7',
    'META_ACCESS_TOKEN': '{現在有効なトークン}',
    'META_AD_ACCOUNT_ID': 'act_710339561118574',
    'META_CAMPAIGN_ID': '{ユーザー入力のキャンペーンID}',
    'NOTIFICATION_EMAIL': '{ユーザーのメールアドレス}',
    'TOKEN_SET_DATE': new Date().toISOString(),
    'TOKEN_TYPE': 'system_user',
  });
  Logger.log('認証情報設定完了');
}
// --- 一時関数ここまで ---
```

**注意:**
- `META_ACCESS_TOKEN` は現在有効なシステムユーザートークンを使用
- トークンの有効期限を確認し、期限切れの場合は先にトークン更新を案内
- 一時関数実行後は必ず削除してセキュリティを確保

**トークンの取得方法（既存プロジェクトから再利用）:**
1. 既存の稼働中GASプロジェクト（例: オートウェビナー）のApps Scriptエディタを開く
2. 一時関数でScriptPropertiesを読み取る:
```javascript
function _tempReadToken() {
  const props = PropertiesService.getScriptProperties();
  Logger.log('TOKEN: ' + props.getProperty('META_ACCESS_TOKEN'));
  Logger.log('SET_DATE: ' + props.getProperty('TOKEN_SET_DATE'));
}
```
3. 実行ログからトークンをコピー
4. `TOKEN_SET_DATE` から有効期限（60日）を確認
5. 一時関数を削除

### Step 5: テスト実行 → トリガー設定

**重要: テストを先に行い、APIが正常動作することを確認してからトリガーを設定する。**

1. `testFetchYesterday()` を関数セレクターから選択して実行
2. 実行ログで「取得完了」を確認（`getUi()`で実行がハングしたら「実行を停止」をクリック — データ取得自体は成功済み）
3. スプレッドシートでデータ確認
4. `setupDailyTrigger()` を関数セレクターから選択して実行
5. 実行ログで「日次トリガーを設定しました」を確認（同様にハングしたら「実行を停止」をクリック — トリガー設定自体は成功済み）
6. 結果をユーザーに報告

**`getUi()`ハング問題について:**
- `testFetchYesterday()`, `setupDailyTrigger()`, `manualFetchRange()` は末尾で `SpreadsheetApp.getUi().alert()` を呼ぶ
- エディタからの直接実行では `getUi()` がエラーではなく**無限ハング**する
- 実行ログに本来の処理（データ取得やトリガー設定）の完了メッセージが出た時点で処理は成功
- 「実行を停止」ボタン（`find` で "実行を停止" を検索）をクリックしてハングを解消する

**トリガー時刻の決定方法:**
- 既存キャンペーンのトリガー時刻を確認（最初のキャンペーンは午前4時）
- 新しいキャンペーンは1時間ずらす（5時、6時、...）
- API制限回避のため同時実行を避ける

### Step 6: バックフィル（任意）

キャンペーン開始日から昨日までの過去データが必要な場合:

1. 一時ラッパー関数を作成してMonaco APIで挿入:
```javascript
// --- バックフィル用一時関数 ---
function _tempBackfill() {
  manualFetchRange("{開始日}", "{終了日}");
}
// --- バックフィル用一時関数ここまで ---
```
2. Ctrl+S で保存
3. 関数セレクターから `_tempBackfill` を選択して実行
4. 実行完了を待つ（日数×約2秒 + getUi()ハング）
5. 実行ログで「バックフィル完了: 成功=N, スキップ=N, エラー=0」を確認
6. ハングしていたら「実行を停止」をクリック
7. 一時関数をMonaco APIで削除（`indexOf`方式が安定）:
```javascript
const models = monaco.editor.getModels();
let code = models[targetIndex].getValue();
const startMarker = '// --- バックフィル用一時関数 ---';
const endMarker = '// --- バックフィル用一時関数ここまで ---';
const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);
if (startIdx !== -1 && endIdx !== -1) {
  const before = code.substring(0, startIdx).replace(/\n+$/, '\n');
  const after = code.substring(endIdx + endMarker.length).replace(/^\n+/, '');
  models[targetIndex].setValue(before + after);
}
```
8. Ctrl+S で保存
9. スプレッドシートでデータ確認

**注意:** `manualFetchRange()` は引数が必要だが、GASの関数セレクタードロップダウンでは引数を渡せない。そのため一時ラッパー関数パターンを使う。

## 共有トークンの注意

システムユーザートークンの有効期限は60日。
以下の情報で有効期限を管理:

- App ID: `2182235012581636`
- App Secret: `3df7d73e747b4aba7e0621fcd766c7c7`
- Ad Account ID: `act_710339561118574`
- Business ID: `851002876238061`
- System User: `広告データ取得用` (ID: `61588451516728`)

期限が近い場合は、ビジネスマネージャでシステムユーザーの新規トークンを生成し、
各GASプロジェクトのScriptPropertiesを更新する必要がある。

## エラー時の対処

| エラー | 原因 | 対処 |
|-------|------|-----|
| 403エラー | トークン期限切れまたは権限不足 | トークン再生成・更新 |
| シートが見つからない | シート名の不一致 | SHEET_NAME設定を確認 |
| Monaco APIが見つからない | エディタ未読み込み | ページリロード後再試行 |
| SpreadsheetApp.getUi() で無限ハング | エディタからの直接実行時、getUi()が応答しない | 実行ログで本来の処理完了を確認後「実行を停止」をクリック。処理自体は成功済み |
| 関数ドロップダウンが反応しない | GASエディタUIの不安定性 | ページリロード → 対象ファイルをクリック → ドロップダウン矢印を座標クリック → オプション選択 |
| `form_input` でDIVエラー | ドロップダウンがDIV要素（`<select>`ではない） | `form_input` は使用不可。`computer` ツールの座標クリックで操作 |
| 権限承認ダイアログ | 初回実行時 | 「詳細」→「安全でないページに移動」→「許可」 |
| 一時関数の正規表現削除が失敗 | `javascript_tool` 内での正規表現の制限 | `indexOf` + `substring` 方式で削除（Step 6参照） |
