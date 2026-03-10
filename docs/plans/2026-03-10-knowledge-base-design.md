# ナレッジ一元管理 設計書

## 日付
2026-03-10

## コンセプト
- **正本はローカルMarkdown**（`knowledge/` フォルダ内）
- **Google Drive for Desktop で自動同期** → 社員はDriveで閲覧（編集は管理者のみ）
- **Google Driveの既存フォルダは構成を崩さず**、READMEにリンクで参照
- **Claudeはローカルファイルを直接読む**（今まで通り）

## フォルダ構成

```
knowledge/
├── README.md                          ← 全体目次
│
├── sales/                             ← セールス・面談手法
│   ├── README.md                      ← 目次 + Drive/PDFリンク
│   ├── SPIN型面談スクリプト.md
│   ├── 面談後フォロー3-7-14ルール.md
│   ├── 個別相談セールス分析レポート.md
│   ├── 講座生FAQまとめ.md              ← .docx→Markdown変換
│   └── ウェビナー後個別相談トーク全履歴.md  ← .docx→Markdown変換
│
├── students/                          ← 生徒個別記録
│   ├── README.md                      ← 生徒一覧 + Driveリンク
│   ├── 面談分析まとめ.md                ← 全員分統合（期ごとに増やす想定）
│   ├── LINE下書きまとめ.md              ← 全員分統合
│   └── karin-送信済み.md
│
├── marketing/                         ← LP・広告・SNS・文章
│   ├── README.md                      ← 目次 + Drive/PDFリンク
│   ├── utage-lp-patterns.md
│   ├── writing-rules.md
│   ├── taiwan-lp-final.md
│   ├── taiwan-lp-improved.md
│   ├── meta-ads-report.md
│   ├── lp-diagnosis-report.md
│   ├── new-lp-clarity-analysis.md
│   └── auto-webinar-meta-ads-data.md
│
├── operations/                        ← 業務手順・ツール設定
│   ├── README.md                      ← 目次 + gas-scripts/リンク
│   ├── freee-invoice-guide.md
│   ├── utage-line-feedback.md
│   ├── x-trend-collector.md
│   └── project-lessons-x-trend.md
│
└── business/                          ← 事業データ・戦略
    ├── README.md                      ← 目次 + Driveリンク
    ├── 会社全事業データ総覧.md
    ├── 統合提案書.md
    └── 事業戦略ロードマップ.md
```

## 移行対象

### ローカルファイル移行
| 移行元 | 移行先 | 操作 |
|--------|--------|------|
| ナレッジ格納庫/SPIN型面談スクリプト.md | knowledge/sales/ | コピー |
| ナレッジ格納庫/面談後フォロー3-7-14ルール.md | knowledge/sales/ | コピー |
| ナレッジ格納庫/個別相談セールス分析レポート.md | knowledge/sales/ | コピー |
| ナレッジ格納庫/講座生FAQまとめ.docx | knowledge/sales/ | .docx→.md変換 |
| ナレッジ格納庫/ウェビナー後個別相談トーク全履歴まとめ.docx | knowledge/sales/ | .docx→.md変換 |
| ナレッジ格納庫/面談分析/*.md | knowledge/students/面談分析まとめ.md | 統合 |
| ナレッジ格納庫/LINE下書き/*.md | knowledge/students/LINE下書きまとめ.md | 統合 |
| tasks/karin-reply-draft.md | knowledge/students/karin-送信済み.md | 移動 |
| memory/utage-lp-patterns.md | knowledge/marketing/ | コピー |
| memory/writing-rules.md | knowledge/marketing/ | コピー |
| ads-audit-data/*.md (4ファイル) | knowledge/marketing/ | コピー |
| taiwan-lp-final.md | knowledge/marketing/ | コピー |
| taiwan-lp-improved.md | knowledge/marketing/ | コピー |
| memory/freee-invoice-guide.md | knowledge/operations/ | コピー |
| memory/utage-line-feedback.md | knowledge/operations/ | コピー |
| memory/x-trend-collector.md | knowledge/operations/ | コピー |
| memory/project-lessons-x-trend.md | knowledge/operations/ | コピー |
| 会社全事業データ総覧.md | knowledge/business/ | コピー |
| 会社データ活用_統合提案書.md | knowledge/business/ | コピー |
| memory/business-strategy-roadmap.md | knowledge/business/ | コピー |

### Google Drive リンク（README内に記載）
| リンク先 | 記載先README |
|---------|-------------|
| オールインワンプラン生フォルダ | students/README.md |
| 出願アカウント 4期生 | students/README.md |
| TOCFL管理シート | students/README.md |
| 広告分析フォルダ（4スプレッドシート） | marketing/README.md |
| サービス案内パンフレット (OneDrive PDF) | marketing/README.md |
| 台北科技大学合同説明会スライド (OneDrive PDF) | marketing/README.md |
| オートウェビナー用スライド (OneDrive PDF) | marketing/README.md |
| 売上一覧 | business/README.md |
| 財務データ分析 | business/README.md |
| 月次管理資料 | business/README.md |
| 01. 101センターフォルダ | business/README.md |

## 移行しないもの
- `memory/` — Claude専用セッション間メモリ（MEMORY.md等）
- `tasks/` — 進行中タスクのハンドオフ
- `docs/plans/` — 設計書・実装計画（プロジェクト履歴）
- `gas-scripts/` — GASコード（operations/READMEからリンク）
- `.claude/` — Claude Code設定

## 運用ルール
- テキスト系ナレッジ → `knowledge/` に .md で追加
- スプレッドシート → Driveで作成し、該当カテゴリのREADMEにリンク追記
- 新しい面談 → `/mendan` コマンドで自動的に `students/` に追加
- Google Driveの既存フォルダ構成は変更しない

## gws CLI アカウント設定
- `newgoodriki@gmail.com` — Google Drive操作用（Drive, Docs, Sheets）
- `ricky@ryugaku101.com` — Gmail, Calendar, GAS用
- 切り替え: `C:/Users/newgo/.config/gws/` のバックアップファイルをコピー
  - `.ricky` → ricky@ryugaku101.com
  - `.newgoodriki` → newgoodriki@gmail.com
