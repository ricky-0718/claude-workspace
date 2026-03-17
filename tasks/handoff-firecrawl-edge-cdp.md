# セッション引き継ぎ — 2026/3/18 Firecrawl導入 + Edge CDP修正

## 完了したこと

### Firecrawl導入
- 無料プラン登録完了（newgoodriki@gmail.com / Google認証）
- APIキー `fc-1b65d563e2b445d5a594f91d2143a6c0` を `~/.claude/settings.json` の `env` に設定
- 500クレジット/月、推定使用量70クレジット/月 → 無料枠で十分
- Firecrawl CLIスキルはプラグインとして既にインストール済み

### Edge CDP重大バグ修正
- **問題**: `ensure-edge-cdp.js` が `--user-data-dir=.playwright-data` で別プロファイルのEdgeを起動していた
- **影響**: UTAGEなど同時ログイン不可のサイトで、ユーザーの常用Edgeのセッションが切れる
- **修正**: デフォルトプロファイルのまま再起動する方式に変更
- タスクバーのEdgeショートカットにも `--remote-debugging-port=9222` を追加済み

### ツール使い分け基準の確立
- Firecrawl: Web検索、公開サイトスクレイプ、クロール
- Playwright MCP: ログイン必要サイト（UTAGE, HiNote, Freee）、X（Twitter）
- PWAウィンドウ（Google カレンダー等）は操作しない → 新規タブで開く

### メモリ更新
- `feedback_edge_cdp_same_profile.md` — 別プロファイル禁止ルール
- `reference_firecrawl_setup.md` — Firecrawl設定・使い分けルール
- MEMORY.md にインデックス追加

## 未完了・次にやること
- 特になし。すべて完了。

## 重要なコンテキスト
- Firecrawlは X（Twitter）を公式に非対応としている（scrapeもbrowserモードもブロック）
- Firecrawlのbrowserモードはクラウド上の未ログインChromium → ログイン必要サイトには使えない
- Edge CDPスクリプトはEdgeを一度終了→再起動する動作。`--restore-last-session` でタブ復元
- スタートメニューのEdgeショートカットは管理者権限不足で変更失敗（タスクバーのみ変更済み）

## 関連ファイル
- `~/.claude/settings.json` — `env.FIRECRAWL_API_KEY` 追加
- `~/.claude/ensure-edge-cdp.js` — デフォルトプロファイル方式に修正
- `~/.claude/projects/.../memory/feedback_edge_cdp_same_profile.md` — 新規
- `~/.claude/projects/.../memory/reference_firecrawl_setup.md` — 新規
- `.firecrawl/` — Firecrawlキャッシュディレクトリ（gitignore推奨）
