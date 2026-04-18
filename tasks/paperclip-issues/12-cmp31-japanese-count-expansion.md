# CMP-33 指示ブリーフ — 残り105校の日本人学生数データ収集・統合

> ⚠ Paperclip 採番で **CMP-33**（ファイル名は 12-cmp31 のまま、実番号は 33）。Issue ID: `5795ca58-367d-4cd1-b202-9d31a044fb82`

## 背景

2026-04-18 時点、`src/data/schools.json` 全 128校のうち **23校のみ** に `student_count.japanese` が入っている状態。ユーザーから「大學データベースまだまだ情報の抜けがある、特に日本人の人数がほとんど反映されてない」と指摘を受け、guide-24schools.json（既存データ）からの名寄せ修正で 6校→23校 まで増えたが、残り **105校は元データ自体に japanese 情報が無い**。

本Issueは、残り 105校について外部データソースから日本人学生数を自動収集し、DB に統合する。

## 既存状況

**日本人学生数を持つ 23校**（降順）:
1. 国立台湾大学 (194)
2. 逢甲大学 (146)
3. 淡江大学 (131)
4. 国立台湾師範大学 (114)
5. 中原大学 (113)
6. 実践大学 (106)
7. 中国文化大学 (94)
8. 銘伝大学（台北）(86)
9. 国立政治大学 (84)
10. 東呉大学 (78)
11. 東海大学 (68)
12. 天主教輔仁大学 (63)
13. 国立清華大学 (51)
14. 国立高雄大学 (22)
15. 国立中山大学 (17)
16. 国立台湾芸術大学 (16)
17. 国立台湾科技大学 (13)
18. 国立台北大学 (12)
19. 国立陽明交通大学 (11)
20. 国立台北科技大学 (10)
21. 台北市立大学 (8)
22. 国立台北教育大学 (6)
23. 国立体育大学 (1)

**未取得の105校**: 国立中央大学、国立成功大学、国立中興大学、長庚大学、元智大学、輔仁大学、銘伝大学（桃園）、技術系専門大学群、その他 95校。

## 目標

105校のうち **最低60校** で `student_count.japanese` を正しく埋める（達成率57%）。すべて埋める必要はない（専門学校系・小規模私立で日本人留学生が実質0〜数名の学校は多く、データ不在が真であるケースも含む）。

## データソース候補（優先順）

### 候補1: MOE Tableau ダッシュボード（推奨）
- URL: `https://stats.moe.gov.tw/statedu/chart.aspx?pvalue=36`
- 校別フィルターと国別フィルターが併用できる可能性あり
- Playwright MCP + Edge CDP が必要（WSLからは繋げないため**本体実行を依頼する可能性あり**）
- まず画面遷移で「校別×日本」のデータ取得可否を検証する

### 候補2: data.gov.tw データセット6289
- 校別の外国学位生合計はあるが、国別内訳が付いているかは要調査
- JSON/CSV ダウンロード可能、認証不要
- `https://data.gov.tw/dataset/6289` で一覧

### 候補3: 各大学 OIA (International Office) ページ
- 大学ごとの demographics ページ（例: https://oia.ntu.edu.tw/statistics）
- Firecrawl で HTML 取得 → 日本人学生数のテキスト抽出
- 「日本」「Japan」「日籍」などのキーワード検索
- 全校分スクレイプは重い → 上位40校くらいに絞る

### 候補4: JASSO（日本学生支援機構）統計
- URL: `https://www.jasso.go.jp/ryugaku/statistics/` に「日本人学生の海外留学状況」があり、国別・機関別の留学生数が公開されている可能性
- 逆引き方向の参照で整合性チェックにも使える

### 候補5: 大学問（unews）マッピング既存データ
- `taiwan-university-db/data/sources/unews-mapping.json` 144校スキャン済み
- 日本人学生数が含まれていないか再確認

## 実装方針

1. **まず小さな PoC**: NTU 1校で候補1〜5のどれから取れるか検証（0.5人日）
2. **抽出パイプライン確立**: 最も再現性の高いソースを選定、スクリプトを `taiwan-university-db/scripts/25-fetch-japanese-count.cjs` として実装
3. **バッチ実行**: 残り 105校を一括処理、結果を `taiwan-university-db/data/sources/japanese-count-extracted.json` に保存
4. **schools.json への統合**: `scripts/24-patch-japanese-count.js` と同じパターンで正規化マッチング後に書き込み
5. **本番デプロイ**: **必ず Windows 側で `npm run deploy` を実行**（memory `feedback_cloudflare_pages_deploy.md` 準拠）
6. **信頼度タグ**: 候補1（MOE）= `high`、候補3（OIA個別）= `medium`、データ不在で推定0 = `unknown` 等を `student_count.japanese_confidence` に記録

## 制約

- **MOE Tableau は Windows 側 Playwright 推奨**: CTO は WSL から繋げない。もし候補1ルートを採るなら、CTO はスクリプト設計のみで、実行は本体セッションに依頼する or 代替ソースに倒す
- **データ鮮度**: 113學年度（2024-2025）データが最新。115年度データはまだ公開されていない可能性
- **数値ゼロの扱い**: `japanese=0` と `japanese=null`（データ不在）は明確に区別する

## 完了条件

- 最低60校で `student_count.japanese` が埋まる（合計83校以上、全体65%カバー）
- 本番 db.ryugaku101.com の大学一覧ページで60校以上に「日本人 N名」タグが表示
- 本番デプロイ完了、`npm run deploy` で反映

## 担当

**CTO**（Claude Code adapter, WSL）。ただしデータソース選定によっては本体実行を依頼する可能性があるため、Phase 1 の PoC 段階でリッキーに「どのソースから取るか＋本体に実行依頼が必要か」を Comment で報告する。

## 優先度

**Medium**（上位校はカバー済み。残り105校の多くは技術系専門校でCVRへの影響は限定的。ただし「データが欠けている」印象は UX を損なうので、ある程度埋めるのが望ましい）

## 関連

- 親: CMP-16 `[親Issue] 大學DBサイト 月間100万PV達成プロジェクト`
- 前タスク: 本日（2026-04-18）のパッチ `scripts/24-patch-japanese-count.js`
- 参照: `memory/reference_moe_opendata.md`（校別 JSON API だが国別内訳なし）
- 参照: `memory/feedback_university_db_tuition.md`（データ整備の原則）
- 参照: `memory/feedback_cloudflare_pages_deploy.md`（デプロイコマンド）
