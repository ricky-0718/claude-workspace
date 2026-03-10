# ナレッジ一元管理

> 事業に関するナレッジの正本。Claudeはこのフォルダを直接読み、社員はGoogle Drive経由で閲覧。

## カテゴリ

| フォルダ | 内容 | ローカル | Drive参照 |
|---------|------|---------|----------|
| [sales/](sales/) | セールス・面談手法 | 5 | 3 |
| [students/](students/) | 生徒個別記録 | 3 | 4 |
| [marketing/](marketing/) | LP・広告・SNS・文章 | 12 | 3 |
| [operations/](operations/) | 業務手順・ツール設定 | 5 | 1 |
| [business/](business/) | 事業データ・戦略 | 3 | — |

## 重要ルール

- **パーソナルナレッジ** + **発信ソースナレッジ** → SNS台本・クリエイティブ制作時に**必ず参照**（ローカルにコピー済み）
- テキスト系ナレッジ → このフォルダに `.md` で追加
- スプレッドシート → Driveで作成し、該当カテゴリのREADMEにリンク追記
- 新しい面談 → `/mendan` コマンドで `students/` に自動追加
- Google Driveの既存フォルダ構成は変更しない

## フォルダ構成

```
knowledge/
├── README.md                                 ← このファイル（全体目次）
├── index.html                                ← 可視化マップ（ブラウザで開く）
│
├── sales/                                    ← セールス・面談手法
│   ├── README.md
│   ├── SPIN型面談スクリプト.md
│   ├── 面談後フォロー3-7-14ルール.md
│   ├── 個別相談セールス分析レポート.md
│   ├── 講座生FAQまとめ.txt                      ★ Drive→ローカル
│   ├── ウェビナー後個別相談トーク全履歴まとめ.txt    ★ Drive→ローカル
│   ├── [Drive] 相談会
│   ├── [Drive] 個別相談SPINテンプレート
│   ├── [Drive] 【2026年版】台湾留学ガイドブック
│   └── [OneDrive] セールスプレゼンPDF x3
│
├── students/                                 ← 生徒個別記録
│   ├── README.md
│   ├── 面談分析まとめ.md                         （11名統合）
│   ├── LINE下書きまとめ.md                       （11名統合）
│   ├── karin-送信済み.md
│   ├── [Drive] オールインワンプラン生フォルダ
│   ├── [Drive] 【名簿】オールインワンプラン生
│   ├── [Drive] クラス管理表
│   └── [Drive] LINE返信DB
│
├── marketing/                                ← LP・広告・SNS・文章
│   ├── README.md
│   ├── utage-lp-patterns.md
│   ├── writing-rules.md
│   ├── taiwan-lp-final.md
│   ├── taiwan-lp-improved.md
│   ├── meta-ads-report.md
│   ├── lp-diagnosis-report.md
│   ├── new-lp-clarity-analysis.md
│   ├── auto-webinar-meta-ads-data.md
│   ├── パーソナルナレッジ.txt                     ★ Drive→ローカル（必須参照）
│   ├── 発信ソースナレッジ.txt                     ★ Drive→ローカル（必須参照）
│   ├── YouTube関連ナレッジ.txt                   ★ Drive→ローカル
│   ├── chatGPTとのやり取りまとめ.txt              ★ Drive→ローカル
│   ├── [Drive] 広告分析フォルダ（4スプレッドシート）
│   ├── [Drive] LINEステップ作成シート
│   └── [Drive] 【2026年版】台湾留学ガイドブック
│
├── operations/                               ← 業務手順・ツール設定
│   ├── README.md
│   ├── freee-invoice-guide.md
│   ├── utage-line-feedback.md
│   ├── x-trend-collector.md
│   ├── project-lessons-x-trend.md
│   ├── 業務マスター.txt                          ★ Drive→ローカル
│   ├── [Drive] 契約書ひな形フォルダ
│   ├── [Local] gas-scripts/（GASコード集）
│   └── [Local] claude-office/invoice-poller.js
│
└── business/                                 ← 事業データ・戦略
    ├── README.md
    ├── 会社全事業データ総覧.md
    ├── 統合提案書.md
    └── 事業戦略ロードマップ.md

凡例:
  ファイル名.md/.txt  = ローカルファイル（Claude Codeが直接読める）
  ★ Drive→ローカル    = Google Driveからダウンロード済み
  [Drive]             = Google Drive上（READMEにリンクあり）
  [OneDrive]          = OneDrive上
  [Local]             = リポジトリ内の別フォルダ参照
```
