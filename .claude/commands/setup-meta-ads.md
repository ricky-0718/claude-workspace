---
description: |
  Meta広告の新規キャンペーンのデータ取得環境を一括セットアップ。
  Use when: 「新しいキャンペーンのデータ取得環境作って」「/setup-meta-ads」と言われたとき、新キャンペーン追加時。
  Do NOT use: 既存キャンペーンの分析（→ad-analyst）、広告クリエイティブの制作
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
| `{{AD_ACCOUNT_ID}}` | 広告アカウントID | `act_710339561118574` |
| `{{TRIGGER_HOUR}}` | トリガー実行時刻 | `4`（既存とずらす） |
| `{{PLACEHOLDER_NOTE}}` | テンプレートコメント | 空文字に置換 |

## 共有認証情報

同一Metaアカウント内のシステムユーザートークンを再利用:
- App ID: `2182235012581636`
- App Secret: `3df7d73e747b4aba7e0621fcd766c7c7`
- Ad Account: `act_710339561118574`
- Business ID: `851002876238061`
- System User: `広告データ取得用` (ID: `61588451516728`)

**重要**: ブラウザはEdge専用。`tabs_context_mcp` で開始、`switch_browser` は使わないこと。
