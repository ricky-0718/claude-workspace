# セッション引き継ぎ — 2026-04-17〜18 大學DB 三連デプロイ＋後続Issue投入

*最終更新: 2026-04-18 早朝 / 作成者: 本体セッション②*

## このセッションで起きたことを1行で
**Paperclip 停止復旧 → CMP-17/30/31パッチの3回分デプロイ → CMP-33（残105校日本人数）Issue投入**

---

## 完了したこと

### 1. Paperclip 復旧（WSL2 Ubuntu）
- `http://localhost:3100` 応答停止を検知 → `run_in_background` で `scripts/start-paperclip.sh` 起動
- CEO (Opus 4.6) + CTO (7fb09381) 両エージェント健全、24 Issue 取得確認
- **根因**: `start-paperclip.sh` の20秒タイムアウトが npx paperclipai の初回ロードに短すぎて `setsid nohup` でもプロセスが親WSLセッション終了時に巻き込まれるパターン → Bashツールの `run_in_background: true` で WSL 接続を維持しながら起動すると安定

### 2. CMP-17 WS-1 大學DB基盤修正 本番反映
- ブランチ `cmp-21-base-fix` の4コミット（WS-1-3 華僑削除 / WS-1-4 モバイル比較UI / WS-1-5 ランキング5分割 / WS-1-6 LINE CTAトラッキング）を master に `--no-ff` マージ
- `npm run deploy` で Cloudflare Pages 反映、2,524ページ 27秒ビルド
- 本番 db.ryugaku101.com 全確認: 華僑情報0件、ランキング5URL全200、LINE CTA `src=db&page=xxx` 付き
- Paperclip CMP-17 Issue を `blocked → in_progress` に変更

### 3. CMP-29 Google Search Console 認証＋サイトマップ送信
- **これは本来 Paperclip CTO のIssueだったが、WSL側にEdge CDP経路がないため本体で実行**
- Playwright MCP で `ryugaku101.com` を Domain property 方式で登録
- ムームードメインに TXT `google-site-verification=Iky-ScohJ6ES8c3-BpLui87NJ8hQU75RFICObEbYvzc` 追加（既存TXTは保持）
- Gmail MCP で MFA 認証URL（JWT token）取得→自動処理
- サイトマップ2本送信: `sitemap-index.xml` と `sitemap-0.xml`（2,524 URL）
- 所有権自動確認成功 → Paperclip CMP-29 を `done`

### 4. CMP-30 上位30校の留学生学費 本番反映
- CTO がWSL側で作成したコミット `a413e3c` を master にマージ
- **マージ前にWTの重複/未完コピーを整理**（loaders.ts/schools.json/index.astro/untracked 2ファイル）
- デプロイ後 NTU詳細ページで `NTD 50,460`（MOE規定 外国人=本国生×2）表示確認
- Paperclip CMP-30 を `done`

### 5. 日本人学生数パッチ（ユーザー指摘対応）
- ユーザーが大学一覧のスクリーンショットで「日本人人数がほとんど反映されてない」と指摘
- 調査: `guide-24schools.json` には24校分 japanese データがあるのに schools.json には **6校のみ**
- **根本原因**: `name-mapping.json` の .guide 値（簡化字「大学」）と guide 本体（繁体字「大學」）の字形差で `includes()` 名寄せが失敗
- `scripts/24-patch-japanese-count.js` 作成: CJK正規化（`學→学` `灣→湾` `臺→台` `國→国` `實→実` `藝→芸` `傳→伝`）＋**厳密マッチ**で再照合
- **最初のバージョンの失敗**: `includes()` 使ったら `国立台北商業大学: JP=5` に全校誤マッチ → 厳密一致に変更
- 結果: 6校 → 23校 に増加、本番反映済み

### 6. CMP-33 新規Issue投入（後続タスク）
- 残り 105校の japanese データ収集を CTO に投入
- **Paperclip 採番**: CMP-31 想定だったが issueCounter が既に 32 まで進んでいたため **CMP-33** に
- Issue ID: `5795ca58-367d-4cd1-b202-9d31a044fb82`
- 目標: 最低60校カバー（合計83/128=65%）
- データソース候補: ① MOE Tableau ② data.gov.tw 6289 ③ 各OIA個別 ④ JASSO ⑤ unews再確認

---

## 未完了・次にやること

### 優先度：高
1. **CMP-33 進捗監視**（CTO実行待ち）
   - CTO が PoC で MOE Tableau を試したら本体実行に切替え依頼が来る可能性あり
   - Paperclip UI `http://localhost:3100` で CMP-33 (ID `5795ca58`) のコメント確認
2. **CMP-25 HP Mockup Day 1 レビュー**（今朝9時発火予定だった）
   - Paperclip停止中に発火時刻を跨いだ可能性 → catchUpPolicy=`skip_missed` で飛んだかも
   - Day 2（明朝9時）分から開始される想定
   - `tasks/hp-mockups/iterations/day-1/` に成果物ができていないか先に確認
3. **in_review 9件のレビュー**（未処理が溜まっている）
   - HPアップグレード案 CMP-14（CTO）
   - Stripe分割払い調査 CMP-13（Paidy追記保留中）
   - LINE導線統合 設計書5点
   - YouTube対談動画 BAND メッセージ＋アンケート
   - 台湾スピーク Book2修正・バグ4件・使い方ページ
   - オートウェビナーB班訴求方針
   - Claude Code Routines設定
   - 台湾スピーク Phase 3-2 100万DLロードマップ

### 優先度：中
4. **おさる回答受領 → LPイベント感実装**（返信待ち継続）
   - 返信案A: OW LPにカウントダウン／期間限定特典
   - 返信案B: ガイドブック→OW誘導に「今、期間限定」
5. **上野航 追加出願実行**（4/14 提案書完成済み）
   - 東海大學 第3梯次 **4/30締切** が最優先
   - 淡江R2 4/16〜5/6
6. **worktree後片付け**（ユーザー許可必要）
   - `cmp-21-base-fix`（prunable、マージ済み）
   - `cmp-30-foreign-tuition`（prunable、マージ済み）
   - `cmp-22-seo-content`（prunable、CMP-22のまま）

### 優先度：低
7. **Search Console 24時間後確認**
   - サイトマップステータスが「取得できませんでした」→ 「成功」に変わっているか
8. **`site:db.ryugaku101.com` 1週間後再測定**
   - 今は0件、インデックス開始の初動確認

---

## 重要なコンテキスト

### 今回得られた本質的学び

#### 1. CTO vs 本体の役割分担が明確化
- **本体（Windows）**: Googleログイン・ムームーログイン・Playwright+Edge CDPが必要なタスク
- **CTO（WSL）**: Firecrawl / pdf-parse / HTMLスクレイプ / 公開API / コード実装
- CMP-29 は「CTOに振ったが環境的に本体でやる方が合計所要時間が短い」と気づいて切替
- 将来的な WSL↔Windows Edge CDP ブリッジ構築は優先度低（CTOの他作業が豊富）

#### 2. 繁体字↔簡化字 の字形差バグ
- 台湾関連データでは頻出するパターン（「大學」「灣」「臺」「國」「實」「藝」）
- `includes()` ベースの名寄せは危険 → **厳密一致 + 明示的な文字正規化** が安全
- 今回の教訓は `scripts/24-patch-japanese-count.js` 内の `NORMALIZE_MAP` で再利用可能

#### 3. Paperclip 起動の罠
- `scripts/start-paperclip.sh` の20秒タイムアウトは本番環境で頻繁に引っかかる
- 恒久対策候補:
  - タイムアウトを 60秒に延長
  - `setsid` で完全デタッチしてから監視ループ
  - Windows タスクスケジューラー `Start-Paperclip-AtLogin` の挙動も要確認

#### 4. 「WT側の重複/未完コピー」パターン
- CTOが worktree に移る前にメインWTで作業していた痕跡が残ることがある
- CMP-30 マージ時に loaders.ts/schools.json/index.astro の WT版がブランチ版と食い違って conflict
- 対策: `tasks/paperclip-issues/*.md` ブリーフに「**作業はworktree内のみ、メインWTを汚さない**」明記する（これは今後のブリーフ雛形で反映したい）

### ムームーDNS 操作時の注意
- 完了アラート（「正常に終了しました」）のダイアログ閉じが **shared infra変更** 判定でブロックされることがある
- 実際には変更は既に終わっているので「アラートを閉じるだけ」と説明して許可を貰う運用

### 日本人学生数データの真実
- 現時点 23/128校カバー = 18%
- 「中小私立・技術系の日本人数は実質0」のケースが多い → 65%カバーが現実的な天井
- データ不在 vs 数値0 の区別を残す設計必須（次のCMP-33で設計）

---

## 関連ファイル

### 新規作成
- `taiwan-university-db/scripts/24-patch-japanese-count.js` — CJK正規化＋厳密マッチのパッチスクリプト
- `tasks/paperclip-issues/10-cmp28-search-console-setup.md` — CMP-29 ブリーフ
- `tasks/paperclip-issues/11-cmp29-foreign-tuition-extraction.md` — CMP-30 ブリーフ
- `tasks/paperclip-issues/12-cmp31-japanese-count-expansion.md` — CMP-33 ブリーフ

### 変更
- `taiwan-university-website/src/data/schools.json` — 日本人数23校、留学生学費29校
- `taiwan-university-website/src/data/loaders.ts` — ForeignTuition型追加
- `taiwan-university-website/src/pages/universities/[schoolSlug]/index.astro` — 留学生学費カードUI
- `tasks/activity-log.md` — 3エントリ追記
- `tasks/CURRENT-STATE.md` — （要更新）

### Git
- commits: `5dcc524` (CMP-17 merge) → `8c3ef19` (CMP-30 merge) → `21d2805` (JP fix) → `de52f15` (docs)
- origin/master 反映済み

---

## 再開手順

1. **最新の Paperclip 稼働確認**: `curl http://localhost:3100` で HTTP 200
2. **Paperclip UI を開いて** CMP-33 / CMP-25（HP Mockup Day N）の状態確認
3. **`tasks/CURRENT-STATE.md`** を最新状態に更新（このハンドオフで未更新）
4. **in_review 9件** のどれから着手するか決める

## 参照リンク

- Paperclip UI: http://localhost:3100
- db.ryugaku101.com（本番）: https://db.ryugaku101.com/
- Search Console: https://search.google.com/search-console?resource_id=sc-domain%3Aryugaku101.com
- Google sitemap確認: https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aryugaku101.com
