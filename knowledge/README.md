# ナレッジ一元管理

> 事業に関するナレッジの正本。Claudeはこのフォルダを直接読み、社員はGoogle Drive経由で閲覧。

## カテゴリ

| フォルダ | 内容 | ファイル数 |
|---------|------|-----------|
| [sales/](sales/) | セールス・面談手法 | 3 + Drive参照 |
| [students/](students/) | 生徒個別記録 | 3 + Drive参照 |
| [marketing/](marketing/) | LP・広告・SNS・文章 | 8 + Drive参照 |
| [operations/](operations/) | 業務手順・ツール設定 | 4 + Drive参照 |
| [business/](business/) | 事業データ・戦略 | 3 |

## 重要ルール

- **パーソナルナレッジ** + **発信ソースナレッジ** → SNS台本・クリエイティブ制作時に**必ず参照**
  - [ナレッジ格納庫（Google Drive）](https://drive.google.com/drive/folders/1-dB0IDA0PMfPI1ZiYUTLXHm0arM9FiRs)
- テキスト系ナレッジ → このフォルダに `.md` で追加
- スプレッドシート → Driveで作成し、該当カテゴリのREADMEにリンク追記
- 新しい面談 → `/mendan` コマンドで `students/` に自動追加
- Google Driveの既存フォルダ構成は変更しない

## フォルダ構成

```
knowledge/
├── README.md                          ← このファイル（全体目次）
├── sales/                             ← セールス・面談手法
│   ├── README.md
│   ├── SPIN型面談スクリプト.md
│   ├── 面談後フォロー3-7-14ルール.md
│   └── 個別相談セールス分析レポート.md
├── students/                          ← 生徒個別記録
│   ├── README.md
│   ├── 面談分析まとめ.md
│   ├── LINE下書きまとめ.md
│   └── karin-送信済み.md
├── marketing/                         ← LP・広告・SNS・文章
│   ├── README.md
│   ├── utage-lp-patterns.md
│   ├── writing-rules.md
│   ├── taiwan-lp-final.md
│   ├── taiwan-lp-improved.md
│   ├── meta-ads-report.md
│   ├── lp-diagnosis-report.md
│   ├── new-lp-clarity-analysis.md
│   └── auto-webinar-meta-ads-data.md
├── operations/                        ← 業務手順・ツール設定
│   ├── README.md
│   ├── freee-invoice-guide.md
│   ├── utage-line-feedback.md
│   ├── x-trend-collector.md
│   └── project-lessons-x-trend.md
└── business/                          ← 事業データ・戦略
    ├── README.md
    ├── 会社全事業データ総覧.md
    ├── 統合提案書.md
    └── 事業戦略ロードマップ.md
```
