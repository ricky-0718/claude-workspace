# ナレッジ一元管理

> 事業に関するナレッジの正本。Claudeはこのフォルダを直接読み、社員はGoogle Drive経由で閲覧。
> 最終更新: 2026-03-26

## カテゴリ

| フォルダ | 内容 | ローカル | Drive参照 |
|---------|------|---------|----------|
| [sales/](sales/) | セールス・面談手法 | 7 | 3 |
| [students/](students/) | 生徒・出願・提案書・書類テンプレート | 59 | 4 |
| [marketing/](marketing/) | LP・広告・おさる式・YouTube・特典 | 38 | 3 |
| [operations/](operations/) | 業務手順・ツール設定・経理 | 7 | 1 |
| [business/](business/) | 事業データ・戦略 | 2 | — |
| [archive/](archive/) | 完了・非アクティブ | 3 | — |

## 重要ルール

- **パーソナルナレッジ** + **発信ソースナレッジ** → SNS台本・クリエイティブ制作時に**必ず参照**（ローカルにコピー済み）
- **おさる式メソドロジー** → LP・ファネル・セミナー設計の全基準（osaru-methodology.md）
- テキスト系ナレッジ → このフォルダに `.md` で追加
- スプレッドシート → Driveで作成し、該当カテゴリのREADMEにリンク追記
- 新しい面談 → `/mendan` コマンドで `students/` に自動追加
- Google Driveの既存フォルダ構成は変更しない

## フォルダ構成

```
knowledge/
├── README.md                                 ← このファイル（全体目次）
├── index.html                                ← ディレクトリ構造マップ（ブラウザで開く）
│
├── sales/                                    ← セールス・面談手法（7ファイル）
│   ├── README.md
│   ├── SPIN型面談スクリプト.md
│   ├── 面談後フォロー3-7-14ルール.md
│   ├── 個別相談セールス分析レポート.md
│   ├── セミナー個別面談スライド台本V2.md           ★ 面談スライド最新版
│   ├── 面談スライド台本V2.html                    ★ プレゼン用HTML
│   ├── 講座生FAQまとめ.txt                      ★ Drive→ローカル
│   ├── ウェビナー後個別相談トーク全履歴まとめ.txt    ★ Drive→ローカル
│   ├── [Drive] 相談会
│   ├── [Drive] 個別相談SPINテンプレート
│   ├── [Drive] 【2026年版】台湾留学ガイドブック
│   └── [OneDrive] セールスプレゼンPDF x3
│
├── students/                                 ← 生徒・出願・提案書（59ファイル）
│   ├── README.md
│   ├── 顧客コンテキスト.md                       ★ 全見込み客の状況・経緯
│   ├── 面談分析まとめ.md                         （統合レポート）
│   ├── LINE下書きまとめ.md                       （統合レポート）
│   ├── asana-mendan-records.md                 面談記録（Asana連携）
│   ├── asana-application-management.md         出願管理（Asana連携）
│   │
│   │  ── 出願ナレッジ基盤 ──
│   ├── university-database.md                  大学データベース
│   ├── admission-results-3rd-cohort.md         3期生合格実績
│   ├── application-manual-miro.md              出願マニュアル（Miro）
│   ├── application-6steps-webinar.md           出願6ステップウェビナー
│   ├── visa-application-guide.md               ビザ申請ガイド
│   ├── staff-manuals-and-resources.md          スタッフマニュアル集
│   ├── video-manual-progress.md                動画マニュアル進捗
│   ├── band-chat-analysis.md                   BANDチャット分析（総合）
│   │
│   │  ── 個別提案書 ──
│   ├── 提案書_川上悠哉.md
│   ├── slides_川上悠哉.md / .html / _review.html
│   ├── 提案書_オライオン.md
│   ├── taidan-ueno-wataru.md                   対談: 上野渡
│   │
│   ├── band-conversations/                    ← BANDトピック別（10ファイル）
│   │   ├── application-documents.md            出願書類
│   │   ├── application-system.md               出願制度
│   │   ├── tocfl-language.md                   TOCFL・語学
│   │   ├── university-selection.md             志望校選び
│   │   ├── autobio-study-plan.md               自伝・学習計画
│   │   ├── financial-scholarship.md            費用・奨学金
│   │   ├── parent-communication.md             保護者対応
│   │   ├── class-homework.md                   授業・宿題
│   │   ├── staff-templates.md                  スタッフ定型文
│   │   └── travel-logistics.md                 渡航・ロジ
│   │
│   ├── drive-pdfs/                            ← Drive書類PDF（15ファイル）
│   │   ├── 大学図鑑.pdf
│   │   ├── 生活費レポート.pdf
│   │   ├── よくある質問.pdf
│   │   ├── 認証手続きガイド.pdf / 認証申請書_札幌東京.pdf
│   │   ├── 推薦書ガイド.pdf
│   │   ├── 自伝学習計画書フォーマット.pdf
│   │   ├── 自伝見本_雲林.pdf / 学習計画書見本_雲林.pdf
│   │   ├── 自伝テンプレート.docx / 学習計画テンプレート.docx
│   │   ├── 卒業見込み書見本_英語.pdf / 成績証明見本_英語.pdf
│   │   ├── 高校必要書類準備のお願い.pdf
│   │   └── 委任状_個人.pdf
│   │
│   ├── drive-texts/                           ← Drive書類テキスト版（15ファイル）
│   │   ├── university-guide.md                 大学図鑑
│   │   ├── living-cost-report.md               生活費レポート
│   │   ├── faq-official.md                     よくある質問
│   │   ├── certification-guide.md              認証手続きガイド
│   │   ├── certification-application-form.md   認証申請書
│   │   ├── recommendation-letter-guide.md      推薦書ガイド
│   │   ├── autobio-studyplan-format.md         自伝学習計画書フォーマット
│   │   ├── autobio-sample-yunlin.md            自伝見本（雲林）
│   │   ├── studyplan-sample-yunlin.md           学習計画見本（雲林）
│   │   ├── autobio-template.md                 自伝テンプレート
│   │   ├── studyplan-template.md               学習計画テンプレート
│   │   ├── graduation-certificate-sample.md    卒業見込み書見本
│   │   ├── transcript-sample.md                成績証明見本
│   │   ├── highschool-document-request.md      高校書類依頼
│   │   └── power-of-attorney.md                委任状
│   │
│   ├── [Drive] オールインワンプラン生フォルダ
│   ├── [Drive] 【名簿】オールインワンプラン生
│   ├── [Drive] クラス管理表
│   └── [Drive] LINE返信DB
│
├── marketing/                                ← LP・広告・おさる式・YouTube（38ファイル）
│   ├── README.md
│   │
│   │  ── おさる式コア理論 ──
│   ├── osaru-methodology.md                    ★ メソドロジー全体（LP/ファネル/SNS/セミナー）
│   ├── osaru-funnel-templates.md               11パターン＋おさるAI GPTs全56種
│   ├── osaru-sales-writing-12types.md          セールスライティング12の型
│   ├── osaru-masterclass-index.md              マスタークラス全体索引
│   ├── osaru-ai-gpts-workflow.md               おさるAI GPTsワークフロー
│   │
│   │  ── LINE特典コンテンツ ──
│   ├── tokuten-02-goukaku-jisseki-databook.md  特典02: 合格実績データブック
│   ├── tokuten-03-hogosya-hiyou-anzen.md       特典03: 保護者向け費用・安全
│   ├── tokuten-04-shippai-kaihi-report.md      特典04: 失敗回避レポート
│   ├── tokuten-05-daigaku-shindan-karte.md     特典05: 大学診断カルテ
│   ├── tokuten-06-chinese-zero-to-a2.md        特典06: 中国語ゼロ→A2
│   ├── tokuten-07-oyako-qa-book.md             特典07: 親子Q&Aブック
│   │
│   │  ── YouTube対談 ──
│   ├── youtube-taidan-template.md              対談動画テンプレート
│   ├── youtube-taidan-checklist.md             対談チェックリスト
│   ├── youtube-taidan-hearing-sheet.md         ヒアリングシート
│   ├── youtube-description-template.md         概要欄テンプレート
│   │
│   │  ── ブログ・コンテンツ制作 ──
│   ├── voice-guide-ricky-blog.md               リッキーブログVoice Guide
│   ├── writing-rules.md                        文章生成ルール
│   │
│   │  ── LP・広告分析 ──
│   ├── utage-lp-patterns.md                    UTAGE LPパターン集
│   ├── meta-ads-report.md                      Meta広告レポート
│   ├── lp-diagnosis-report.md                  LP診断レポート
│   ├── new-lp-clarity-analysis.md              新LP Clarity分析
│   ├── auto-webinar-meta-ads-data.md           オートウェビナー広告データ
│   │
│   │  ── ソースナレッジ（Drive→ローカル）──
│   ├── パーソナルナレッジ.txt                     ★ 必須参照
│   ├── 発信ソースナレッジ.txt                     ★ 必須参照
│   ├── YouTube関連ナレッジ.txt                   ★ Drive→ローカル
│   ├── chatGPTとのやり取りまとめ.txt              ★ Drive→ローカル
│   │
│   ├── auto-webinar/                          ← オートウェビナーファネル（8ファイル）
│   │   ├── README.md
│   │   ├── webinar-script.md                   台本
│   │   ├── webinar-transcript.md               文字起こし
│   │   ├── line-scenario.md                    LINEシナリオ
│   │   ├── lp/current.md                       現行LP
│   │   ├── lp/ab-test.md                       A/Bテスト
│   │   ├── ads/meta-ads.md                     Meta広告設定
│   │   ├── ads/creatives.md                    クリエイティブ
│   │   └── analytics/clarity.md                Clarity分析
│   │
│   ├── [Drive] 広告分析フォルダ（4スプレッドシート）
│   ├── [Drive] LINEステップ作成シート
│   └── [Drive] 【2026年版】台湾留学ガイドブック
│
├── operations/                               ← 業務手順・ツール設定（7ファイル）
│   ├── README.md
│   ├── freee-invoice-guide.md                  Freee請求書操作
│   ├── salary-payment-config.md                給料支払い設定
│   ├── utage-line-rules.md                     UTAGE LINEルール
│   ├── utage-line-feedback.md                  LINE対応フィードバック
│   ├── asana-api-notes.md                      Asana APIメモ
│   ├── 5ki-taiwan-costs.md                     5期生台湾費用データ
│   ├── 業務マスター.txt                          ★ Drive→ローカル
│   ├── [Drive] 契約書ひな形フォルダ
│   ├── [Local] gas-scripts/（GASコード集）
│   └── [Local] claude-office/invoice-poller.js
│
├── business/                                 ← 事業データ・戦略（2ファイル）
│   ├── README.md
│   ├── 会社全事業データ総覧.md
│   └── 事業戦略ロードマップ.md
│
└── archive/                                  ← 完了・非アクティブ（3ファイル）
    ├── karin-送信済み.md                        LINE返信完了
    ├── x-trend-collector.md                    X AIトレンド収集（完了PJ）
    └── project-lessons-x-trend.md              同PJ振り返り

凡例:
  ファイル名.md/.txt  = ローカルファイル（Claude Codeが直接読める）
  ★ Drive→ローカル    = Google Driveからダウンロード済み
  ★ 必須参照          = コンテンツ制作時に必ず読むファイル
  [Drive]             = Google Drive上（READMEにリンクあり）
  [OneDrive]          = OneDrive上
  [Local]             = リポジトリ内の別フォルダ参照
```
