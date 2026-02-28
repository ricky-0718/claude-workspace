# Meta広告データ自動取得 セットアッププラグイン

Claude Code用プラグイン。`/setup-meta-ads` コマンドで、Meta広告キャンペーンの日次データ取得環境を自動構築します。

## できること

- Google スプレッドシートの作成・設定
- GAS（Google Apps Script）コードの自動挿入
- Meta API認証情報の設定
- 日次トリガー（毎朝自動取得）の設定
- 過去データのバックフィル

## 取得データ

| 指標 | 説明 |
|------|------|
| 広告費 | 日次の広告支出額 |
| インプレッション | 広告表示回数 |
| リーチ数 | 広告が届いたユニークユーザー数 |
| クリック数 | リンククリック数 |
| LINE登録数 | Pixelコンバージョン（完全登録） |
| フリークエンシー | 1人あたりの平均表示回数 |

## 必要なもの

1. **Claude Code** + **Claude in Chrome/Edge 拡張機能**
2. **Meta for Developers アプリ**（App ID / App Secret）
3. **Meta広告アカウント**（`act_` で始まるID）
4. **アクセストークン**（以下のいずれか）:
   - システムユーザートークン（推奨。ビジネスマネージャで生成。60日有効）
   - ユーザートークン（Graph API Explorerで生成。短期→長期変換が必要）
5. **Google アカウント**（スプレッドシート・GAS用）

## インストール

このフォルダを `.claude/plugins/` 配下に配置します:

```
.claude/
  plugins/
    meta-ads-setup/        ← このフォルダを丸ごとコピー
      plugin.json
      commands/
        setup-meta-ads.md
      skills/
        meta-ads-setup/
          SKILL.md
          references/
            browser-guide.md
            gas-template.js
            code-gs-template.js
            sheet-config.md
```

## 使い方

1. Claude Codeで `/setup-meta-ads` と入力
2. 対話形式で以下の情報を入力:
   - キャンペーン名（例: 「LP-Bテスト」）
   - キャンペーンID（Meta広告マネージャで確認）
   - Meta API認証情報（初回のみ）
3. 自動でスプレッドシート作成 → GASコード挿入 → 認証設定 → テスト実行まで完了

## トークン管理

- システムユーザートークンの有効期限は **60日**
- 期限の10日前にメール通知が届きます
- 更新方法: ビジネスマネージャ → システムユーザー → 新規トークン生成 → GASのScriptPropertiesを更新

## カスタマイズ

### コンバージョン指標の変更

`gas-template.js` の `extractLineRegistrations_()` 関数を修正して、別のコンバージョンイベントに対応可能:

```javascript
// 例: 「購入」イベントに変更
if (actions[i].action_type === 'offsite_conversion.fb_pixel_purchase') {
```

### 取得フィールドの追加

`CONFIG.FIELDS` にMeta APIのフィールドを追加し、`formatRowData_()` とシートヘッダーを対応させてください。

## トラブルシューティング

| 問題 | 対処 |
|------|------|
| 403エラー | トークン期限切れ → 新しいトークンを生成 |
| データが0件 | キャンペーンIDが正しいか確認。広告が停止中の日はデータなし |
| getUi()でハング | エディタから直接実行時の既知問題。実行ログに完了メッセージが出たら「実行を停止」をクリック |
| Monaco APIが見つからない | GASエディタページをリロード |
