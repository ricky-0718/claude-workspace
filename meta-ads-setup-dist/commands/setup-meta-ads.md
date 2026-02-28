---
name: setup-meta-ads
description: Meta広告の新規キャンペーンのデータ取得環境を一括セットアップ
---

# Meta広告セットアップ

Meta広告の新しいキャンペーンに対して、データ取得環境を一括で構築します。

## 実行手順

以下のファイルを順番に読み込んで、手順に従ってください：

1. **スキル定義を読む**: `meta-ads-setup/skills/meta-ads-setup/SKILL.md` を読んで全体のフローを把握
2. **ユーザーに情報を聞く**:
   - キャンペーン名（表示用。例: 「LP-Bテスト」）
   - キャンペーンID（Meta Campaign ID）
   - 新規スプレッドシート or 既存に追加？
   - Meta API認証情報（初回のみ）
3. **スプレッドシート作成**: `meta-ads-setup/skills/meta-ads-setup/references/sheet-config.md` を参照
4. **GASコード挿入**: テンプレートファイルを読み込んでプレースホルダーを置換
   - `meta-ads-setup/skills/meta-ads-setup/references/gas-template.js`（メインのAPI取得コード）
   - `meta-ads-setup/skills/meta-ads-setup/references/code-gs-template.js`（メニュー定義）
5. **ブラウザ操作**: `meta-ads-setup/skills/meta-ads-setup/references/browser-guide.md` を参照
6. **テスト実行**: testFetchYesterday() でデータ取得を確認

## プレースホルダー一覧

GASテンプレート内の以下のプレースホルダーを実際の値に置換:

| プレースホルダー | 説明 | デフォルト |
|---------------|------|----------|
| `{{CAMPAIGN_NAME}}` | キャンペーン名 | ユーザー入力 |
| `{{CAMPAIGN_ID}}` | キャンペーンID | ユーザー入力 |
| `{{SHEET_NAME}}` | シート名 | `Meta広告_生データ` |
| `{{AD_ACCOUNT_ID}}` | 広告アカウントID | ユーザー入力 |
| `{{TRIGGER_HOUR}}` | トリガー実行時刻 | `4`（既存とずらす） |
| `{{PLACEHOLDER_NOTE}}` | テンプレートコメント | 空文字に置換 |

## 必要な認証情報

初回セットアップ時にユーザーから以下を取得:

| 項目 | 説明 | 取得方法 |
|------|------|---------|
| App ID | MetaアプリのID | Meta for Developersのアプリ設定 |
| App Secret | アプリシークレットキー | Meta for Developersのアプリ設定 |
| Ad Account ID | 広告アカウントID（`act_` で始まる） | Meta広告マネージャのURL等から取得 |
| Access Token | システムユーザートークンまたはユーザートークン | ビジネスマネージャ or Graph API Explorer |
| Notification Email | エラー通知先メールアドレス | ユーザーに聞く |

**重要**: ブラウザはユーザーの環境に合わせること。Claude in Chrome/Edge拡張機能が必要。
