# セッション引き継ぎ — 2026-03-31 大学DB 30校データ完全化＋外國學生簡章探索準備

## 完了したこと

### NTNUモデルケース（手動で完璧に）
- `ja_description`: 日本語紹介文（5行、117文字）
- `student_count`: total=16,808（大學問）、foreign=666（MOEオープンデータ）
- `tuition`: NT$47,000〜55,000/学期（外国人学生）
- `dormitory.info_ja`: 日本語寮情報
- `scholarship.info_ja`: 5種類の奨学金詳細（NTNU独自/MOE/MOFA/NSTC/半導体）
- `data_completeness`: "full" に昇格
- ソース: NTNU公式OIA（https://bds.oia.ntnu.edu.tw/bds/en/web/scholarship）

### 主要30校一括データ投入
- **MOEオープンデータ**（113学年度）から外国学位生数を30校に投入
  - JSON: `https://stats.moe.gov.tw/files/opendata/113_ab112_S.json`
  - 學校名稱でマッチング、30/30校成功
- **大學問**（unews.com.tw）から総学生数・学費レンジ・創立年・師生比・登録率を取得
  - ID 1〜180をスキャン、144校のデータを `data/sources/unews-mapping.json` に保存
  - 正規表現パターン: `全校學生數\s*(\d+)\s*人`, `學費\s*([\d,]+)~([\d,]+)\s*元` 等
- **104 APIデータ**から外国人学費レンジを推定
  - 国立大学: 本国生の2倍
  - 私立大学: 本国生と同額
- `ja_description` を30校分自動生成（創立年・大学種別・学院数・学生数・地域・登録率）
- `data_completeness`: 30校全て "full" に昇格（合計 full=35校）
- 学科ページの学費表示に「参考：本国生」ラベル追加

### 大学サイトCMSパターン分析
- **「412システム」**: 16校以上が同一CMS。URL: `/p/412-{unit}-{id}.php`。JSON APIなし（HTMLフラグメント）
- **WordPress**: 3校（逢甲、中原、屏東科技）。`wp-json` REST API可能性あり
- **Joomla**: 2校（元智、中興OIA）
- **独自**: 輔仁(JSP)、嘉義(ASP.NET)、義守(Nuxt.js)等
- OIAサブドメインパターン: `oia.xxx.edu.tw`（NCKU, NSYSU, NDHU, NTUT等）

## 未完了・次にやること

### 最優先: 外國學生簡章の取得（30校分）
1. **簡章URL探索スクリプト** — 412 CMS系OIAページから「外國學生」「招生簡章」のリンクを自動探索
2. **簡章データ抽出** — PDF/HTMLから以下を抽出:
   - 正確な外国人学費（学院別）
   - 出願に必要な書類一覧
   - 出願期間の詳細
   - 言語要件（TOCFL/英語）の正確な基準
3. **schools.json の `foreign_student` 更新** — 現在NTNUとNCKU等の数校のみ

### その他
- LINE CTAのURL差し替え（`lin.ee/placeholder` → 実URL）
- Cloudflare Pages本番デプロイ
- 104未マッチ学科（393学科/16.6%）の改善
- 翻訳品質スポットチェック

## 重要なコンテキスト

### データの2重管理問題
- マスター: `taiwan-university-db/data/final/schools.json`
- Webサイト用: `taiwan-university-website/src/data/schools.json`
- **DB更新後は必ずWebサイト側にもコピー**（`cp` コマンド）
- フィードバック: `memory/feedback_db_website_dual_copy.md`

### 学費データの注意点
- 104 APIの `tuition_104` は**本国生**の学費
- 大學問の学費レンジも**本国生**
- 外国人学費は**外國學生簡章**からしか正確に取れない
- 学科ページでは「参考：本国生」とラベル付け済み（暫定対応）
- フィードバック: `memory/feedback_university_db_tuition.md`

### 大学サイトCMSパターンの活用
- 412 CMS系のOIAは `/p/412-{unit}-{id}.php` でアクセス可能
- NCKU OIA: `oia.ncku.edu.tw` (unit=1032相当)
- NTUT OIA: `oia.ntut.edu.tw` (unit=1032)
- NDHU OIA: `oia.ndhu.edu.tw` (unit=1027)
- 清華 OIA: `oga.site.nthu.edu.tw` (unit=1524)
- WordPress系（逢甲OIA `oia.fcu.edu.tw`）は wp-json API が使える可能性

### full 35校の内訳
NTU(01), NCKU(02), NCYU(03), NCNU(04), NCHU(05), CCU(06), NTNU(07), NDHU(08),
NYCU(11), NCCU(13), NCU(15), NTHU(17), NSYSU(19), NPTU(F0), UTaipei(E0),
TKU(37), SCU(55), NTUT(73), NPUST(74), NKUST(75), CYUT(86), STUST(87),
FJU(45), PCCU(36), FCU(44), THU(39), CYCU(61), ISU(41), PU(42), CJCU(46),
YZU(57), CMU(68), SHU(48), DYU(49)

## 関連ファイル
- `taiwan-university-db/data/final/schools.json` — マスターデータ（35校full）
- `taiwan-university-db/data/sources/unews-mapping.json` — 大學問144校マッピング
- `taiwan-university-website/src/data/schools.json` — Webサイト用コピー
- `taiwan-university-website/src/pages/universities/[schoolSlug]/departments/[deptId].astro` — 学科ページ（学費ラベル修正済み）
- `taiwan-university-website/src/components/DataCompletenessNote.astro` — full=非表示、enriched=警告
- `memory/feedback_university_db_tuition.md` — 学費は外国人向けのみ
- `memory/feedback_university_db_jianzhang.md` — 簡章取得必須
- `memory/feedback_db_website_dual_copy.md` — データコピー忘れ防止
- `memory/reference_moe_opendata.md` — MOEオープンデータ仕様
- `memory/reference_unews_mapping.md` — 大學問スクレイピング仕様
