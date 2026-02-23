# ブラウザ操作ガイド

## 前提条件

- **ブラウザ: Edge専用**（Chrome不使用。switch_browserは呼ばない）
- 最初に `tabs_context_mcp` を呼んでタブ情報を取得すること
- Google アカウントにログイン済みであること

## Step 1: 新規スプレッドシート作成

### 1.1 新しいタブで Google Sheets を開く

```
tabs_create_mcp → navigate to "https://sheets.new"
```

3-5秒待機して読み込み完了を確認。

### 1.2 タイトルを設定

1. ページ左上のタイトル入力欄（「無題のスプレッドシート」）をクリック
2. `【{キャンペーン名}】広告分析ダッシュボード` を入力
3. Enter で確定

### 1.3 シート名を変更

デフォルトの「シート1」タブを右クリック → 「名前を変更」を選択 → `Meta広告_生データ` と入力 → Enter

### 1.4 ヘッダーを入力

A1セルをクリックして以下を順に入力（TabキーでセルC移動）：
```
日付 → 広告費 → インプレッション → リーチ数 → クリック数 → LINE登録数 → フリークエンシー
```

または JavaScript で一括入力:
```javascript
// スプレッドシートのURLからIDを取得してGAS APIは使えないので、
// セルに直接入力するにはキーボード操作を使う
```

### 1.5 追加シートを作成

1. シートタブバーの「+」ボタンをクリック → シート名を `日次集計` に変更
2. 再度「+」をクリック → シート名を `KPIダッシュボード` に変更

## Step 2: Apps Script エディタ操作

### 2.1 エディタを開く

メニューから: **拡張機能** → **Apps Script**

新しいタブでApps Scriptエディタが開く。3-5秒待機。

### 2.2 Monaco Editor APIでコードを挿入

Apps Script エディタはMonaco Editorを使用している。JavaScriptで直接操作可能:

```javascript
// エディタのモデルを取得
const models = monaco.editor.getModels();
// models[0] が現在開いているファイル

// コード全体を置換
models[0].setValue(newCode);
```

**手順:**
1. `javascript_tool` で `monaco.editor.getModels().length` を実行してモデル数を確認
2. `models[0].setValue(code)` で既存の `コード.gs` にメニュー関数を設定
3. Ctrl+S で保存

### 2.3 新しいファイルを追加

1. ファイルパネル上部の「+」アイコン（ファイルを追加）をクリック
2. 「スクリプト」を選択
3. ファイル名を入力（例: `meta_api_auto_fetch`）— `.gs` 拡張子は自動追加
4. 新しいファイルが開かれたら、Monaco APIでコードを挿入:

```javascript
const models = monaco.editor.getModels();
// 最後に追加されたモデル（新しいファイル）
models[models.length - 1].setValue(newCode);
```

5. Ctrl+S で保存

### 2.4 保存のショートカット

```javascript
// Ctrl+S をシミュレート
// computer tool で key "ctrl+s" を送信
```

## Step 3: ScriptProperties設定（認証情報）

### 3.1 一時関数を生成して認証情報を設定

SpreadsheetApp.getUi() はエディタからの直接実行ではエラーになるため、
**一時関数** を使ってScriptPropertiesに直接書き込む。

```javascript
// 一時的にエディタに挿入する関数
function _tempSetCredentials() {
  const props = PropertiesService.getScriptProperties();
  props.setProperties({
    'META_APP_ID': '2182235012581636',
    'META_APP_SECRET': '3df7d73e747b4aba7e0621fcd766c7c7',
    'META_ACCESS_TOKEN': '{現在のトークン}',
    'META_AD_ACCOUNT_ID': '{AD_ACCOUNT_ID}',
    'META_CAMPAIGN_ID': '{CAMPAIGN_ID}',
    'NOTIFICATION_EMAIL': '{メールアドレス}',
    'TOKEN_SET_DATE': '{今日の日付ISO}',
    'TOKEN_TYPE': 'system_user',
  });
  Logger.log('認証情報設定完了');
}
```

### 3.2 関数セレクタードロップダウンで選択・実行

**⚠️ 重要: ドロップダウンはDIVベースのカスタムARIA listbox。`form_input` は使用不可（DIV要素非対応）。**

**推奨手順（最も確実）:**

1. **対象ファイルがエディタで開かれていることを確認**
   - 左パネルのファイル名をクリック
2. **ドロップダウンを開く**
   - ドロップダウン矢印部分を `computer` ツールで座標クリック
   - 位置: エディタ上部ツールバーの「▶ 実行」ボタンの右側、ドロップダウン表示エリア
   - `screenshot` → `zoom` で正確な座標を特定
3. **関数を選択**
   - 展開されたリストから対象関数を座標クリック
4. **「▶ 実行」ボタンをクリック**
   - ドロップダウンの左側にある実行ボタン
5. 初回は権限承認ダイアログが表示される → 承認する

**ドロップダウンが反応しない場合:**
1. ページをリロード（`navigate` で同じURLに移動）
2. 3-5秒待機
3. 対象ファイルをクリック
4. 再度ドロップダウンの座標クリックを試行

**⛔ 使ってはいけない方法:**
- `form_input` → DIV要素のため "Element type DIV is not a supported form input" エラー
- `find` で option を見つけて click → ドロップダウンが展開されていないと要素が存在しない

### 3.3 一時関数の削除

実行後、セキュリティのため一時関数を削除。

**⚠️ 正規表現は `javascript_tool` 内で不安定なことがある。`indexOf` + `substring` 方式を推奨:**

```javascript
const models = monaco.editor.getModels();
let code = models[targetIndex].getValue();
const startMarker = '// --- 一時関数 ---';
const endMarker = '// --- 一時関数ここまで ---';
const startIdx = code.indexOf(startMarker);
const endIdx = code.indexOf(endMarker);
if (startIdx !== -1 && endIdx !== -1) {
  const before = code.substring(0, startIdx).replace(/\n+$/, '\n');
  const after = code.substring(endIdx + endMarker.length).replace(/^\n+/, '');
  code = before + after;
  models[targetIndex].setValue(code);
}
```

**同じパターンでバックフィル一時関数も削除可能:**
- マーカーを `'// --- バックフィル用一時関数 ---'` と `'// --- バックフィル用一時関数ここまで ---'` に変更するだけ

Ctrl+S で保存。

## Step 4: テスト実行 → トリガー設定

**重要: テストを先に実行してAPIが動作することを確認してからトリガーを設定する。**

### 4.1 testFetchYesterday() を実行

1. 関数セレクタードロップダウンで `testFetchYesterday` を選択
2. 「▶ 実行」ボタンをクリック
3. 実行ログで「=== 取得完了:」メッセージを確認
4. **getUi()ハングへの対処:** ログに「取得完了」が出た後も実行が止まらない場合は「実行を停止」ボタンをクリック（データ取得は成功済み）
5. スプレッドシートのタブに切り替えてデータが追加されたことを確認

### 4.2 setupDailyTrigger() を実行

1. 関数セレクタードロップダウンで `setupDailyTrigger` を選択
2. 「▶ 実行」ボタンをクリック
3. 実行ログで「日次トリガーを設定しました」を確認
4. **getUi()ハングへの対処:** ログに設定完了メッセージが出た後も実行が止まらない場合は「実行を停止」ボタンをクリック

### 4.3 トリガーページで確認（任意）

左メニューの時計アイコン（トリガー）をクリック → 新しいトリガーが表示されることを確認

### 4.4 バックフィル（任意）

過去データが必要な場合、一時ラッパー関数パターンを使用:

1. Monaco APIで一時関数を挿入:
```javascript
const models = monaco.editor.getModels();
const targetModel = models[targetIndex]; // meta_api_auto_fetch.gs のモデル
let code = targetModel.getValue();
code += '\n// --- バックフィル用一時関数 ---\nfunction _tempBackfill() {\n  manualFetchRange("{開始日}", "{終了日}");\n}\n// --- バックフィル用一時関数ここまで ---\n';
targetModel.setValue(code);
```
2. Ctrl+S で保存
3. ドロップダウンから `_tempBackfill` を選択して実行
4. 完了後、indexOf方式で一時関数を削除（セクション3.3参照）
5. Ctrl+S で保存

## Step 5: 最終確認

### 5.1 スプレッドシートでデータ確認

スプレッドシートのタブに切り替え → `Meta広告_生データ` シートで:
- テスト実行のデータ（昨日の日付）が追加されていること
- バックフィル実行した場合は、期間内の全日付データが追加されていること

**注意:** テスト実行データとバックフィルデータの並び順は追記順のため、日付順にはなっていない場合がある。必要に応じてA列で昇順ソートを案内。

### 5.2 ユーザーへの最終報告

以下をまとめて報告:
- 取得済みデータの行数と期間
- 日次トリガーの設定時刻
- トークンの有効期限（設定日 + 60日）
- スプレッドシートのURL

## 重要な注意事項

### Monaco API について
- `monaco.editor.getModels()` でファイル一覧を取得
- `models[i].uri.path` でファイル名を確認可能
- `models[i].getValue()` で現在のコードを取得
- `models[i].setValue(code)` でコードを設定
- 変更後は必ず Ctrl+S で保存すること

### SpreadsheetApp.getUi() の制限（重要）
- GASエディタからの直接実行では `SpreadsheetApp.getUi()` が**エラーではなく無限ハング**する
- 実行ログの「実行開始」の後、本来の処理ログは出力されるが、最後の `getUi().alert()` で停止
- **影響を受ける関数:** `testFetchYesterday()`, `setupDailyTrigger()`, `removeDailyTrigger()`, `manualFetchRange()`, `exchangeForLongLivedToken()`, `setupCredentials()`
- **対処法:** 実行ログで本来の処理完了メッセージ（例:「取得完了」「トリガーを設定しました」「バックフィル完了」）が表示されたら、「実行を停止」ボタンをクリック
- 「実行を停止」ボタンの探し方: `find` ツールで "実行を停止" を検索、または実行ログパネル付近をスクリーンショットで確認
- スプレッドシートのカスタムメニューやトリガーからの実行時は正常動作する（ハングしない）

### 関数セレクタードロップダウン
- DIVベースのカスタムコンポーネント（`<select>` ではない）
- **`form_input` は使用不可** — DIV要素のため "Element type DIV is not a supported form input" エラー
- **推奨操作手順:**
  1. ページリロードで状態をリセット
  2. 対象ファイル（.gs）を左パネルでクリックして開く
  3. ドロップダウン矢印を `computer` ツールの座標クリックで展開
  4. 表示されたオプションを座標クリックで選択
- `screenshot` → `zoom` で座標を正確に特定することが重要
- 選択後、ドロップダウン表示が更新されたか `screenshot` で確認してから実行ボタンをクリック

### 権限承認
- 新しいGASプロジェクトで初めて関数を実行する際、Googleの権限承認ダイアログが表示される
- 「詳細」→「安全でないページに移動」→「許可」の手順で承認
- 一度承認すれば以後は不要
