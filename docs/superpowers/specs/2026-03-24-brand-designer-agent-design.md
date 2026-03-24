# brand-designer エージェント設計書

## Context
台湾留学101センターの仮想マーケティングチーム（10体）に、11体目として専任デザイナーエージェントを追加する。Google Docs・LINE特典PDF・提案書HTML・LP実装・SNSバナーなど、外部向け成果物のデザイン品質をブランド基準で統一することが目的。

きっかけ: 対談動画テンプレート5ドキュメントのGoogle Docs作成時に、プロデザインの適用フローが確立された（2026-03-24）。この知見をエージェントとして永続化し、チーム全体で活用可能にする。

## エージェント定義

### 基本情報
- **名前**: brand-designer（ブランドデザイナー）
- **ファイル**: `.claude/agents/brand-designer.md`
- **color**: yellow
- **model**: inherit
- **tools**: Read, Write, Edit, Grep, Glob, Bash, Agent, WebFetch

### 担当範囲
| 領域 | 具体例 |
|---|---|
| Google Docs | テンプレート・共有資料のプロデザイン（batchUpdate API） |
| LINE特典PDF | tokuten系HTML制作・PDF変換 |
| 提案書HTML | 個別提案書のデザイン・CSS実装 |
| 対外資料 | レポート・ガイドブック等のデザイン |
| LP実装 | lp-architectの戦略指示を受けてUTAGEビジュアル実装 |
| SNS画像・バナー | blog-image skill等を活用した投稿用ビジュアル |

### 呼び出し条件
```yaml
Trigger when: 「デザインして」「見た目を整えて」「PDFにして」「提案書のデザイン」
  「LP実装して」「バナー作って」「Google Docsをプロ品質で」「ブランドに合わせて」
Do NOT trigger for:
  - LP戦略・CVR改善の判断 → lp-architect
  - ブログ記事の執筆 → blog-writer
  - SNS投稿文のテキスト → content-writer
  - 内部用メモ・Asanaタスク → 各エージェント直接
```

### 呼び出しルール（司令塔の判断基準）
```
外部に出る成果物（生徒・保護者・公開用） → brand-designer経由
内部用・一時的なもの → 各エージェントが直接
```

判断の3条件（1つでも該当すればdesigner案件）:
1. **誰が見る？** → 生徒・保護者・外部の人
2. **どこに出す？** → Drive共有・LINE・YouTube・LP・Web
3. **寿命は？** → 繰り返し使う資料

## ブランドデザインシステム（エージェント内蔵）

### カラーパレット
| 名前 | HEX | 用途 |
|---|---|---|
| 濃紺 | #1a365d | ヘッダー・H1/H2・メイン枠線 |
| 中紺 | #2c5282 | サブタイトル・H3 |
| アクセント青 | #3182ce | H4・ボーダー・CTA・推奨色 |
| 赤 | #e53e3e | 警告・注目ポイント |
| 緑 | #38a169 | 成功・ポジティブ・演出メモ |
| オレンジ | #dd6b20 | 情報・注目 |
| パープル | #6b46c1 | インサイト・高度情報 |
| ライトブルー | #ebf8ff | H2背景・引用背景・テーブル偶数行 |
| ライトグレー | #f7fafc | コードブロック・対面メモ背景 |
| 黄色 | #FFF9C4 | 記入欄ハイライト |

### CSS変数（HTML成果物共通）
```css
:root {
  --primary: #1a365d;
  --primary-light: #2c5282;
  --accent: #3182ce;
  --bg: #ffffff;
  --bg-alt: #f7fafc;
  --bg-highlight: #ebf8ff;
  --text: #1a202c;
  --text-light: #718096;
  --border: #e2e8f0;
  --green: #38a169;
  --green-bg: #f0fff4;
  --orange: #dd6b20;
  --orange-bg: #fffaf0;
  --blue: #3182ce;
  --blue-bg: #ebf8ff;
  --purple: #6b46c1;
  --purple-bg: #faf5ff;
  --red: #e53e3e;
  --red-bg: #fff5f5;
}
```

### フォント
- Google Fonts: `Noto Sans JP`（weight: 300/400/500/600/700）
- フォールバック: -apple-system, BlinkMacSystemFont, sans-serif
- 本文: 15px / 行高1.8（HTML） | 10.5pt（Google Docs）

### Google Docs デザイン仕様
| 要素 | スタイル |
|---|---|
| H1 | Noto Sans JP 22pt 濃紺 + アクセント青下線ボーダー2pt |
| H2 | 16pt 濃紺 + ライトブルー背景 + 青左ボーダー3pt |
| H3 | 13pt 中紺 |
| H4 | 11pt アクセント青 イタリック |
| 本文 | Noto Sans JP 10.5pt |
| テーブルヘッダー | 濃紺背景 + 白文字 |
| テーブルデータ行 | 偶数行ライトブルー（ゼブラ） |
| ヘッダー | 右寄せ「台湾留学101センター」グレー8pt |
| 余白 | 54pt (0.75in) |

### PDF制作ルール
- HTML→PDF変換（ブラウザ印刷 or Playwright）
- スマホファースト設計
- 中央配置・均等配置
- カードUI禁止
- 全太字（見出し・重要テキスト）
- 大きめの文字サイズ

## 参照ナレッジ
| 優先度 | パス | 用途 |
|---|---|---|
| ★★★ | `knowledge/marketing/osaru-methodology.md` | LP・ファネルのデザイン判断基準 |
| ★★★ | `knowledge/marketing/osaru-sales-writing-12types.md` | 心理トリガー配置 |
| ★★☆ | `knowledge/marketing/voice-guide-ricky-blog.md` | テキストトーン確認 |
| ★★☆ | `knowledge/marketing/utage-lp-patterns.md` | UTAGE LP実装パターン |
| 参照 | `memory/reference_gdocs_api_patterns.md` | Google Docs API操作パターン |
| 参照 | `memory/feedback_pro_gdocs_design.md` | Google Docsデザイン基準 |

## 他エージェントとの連携
| 連携元 | 流れ |
|---|---|
| **sales-advisor** | 提案内容・テキスト作成 → designer がHTML/PDFデザイン実装 |
| **lp-architect** | LP戦略・構成・コピー指示 → designer がUTAGE実装 |
| **content-writer** | SNSテキスト作成 → designer がバナー・画像制作 |
| **student-advisor** | 出願資料の内容 → designer が共有用PDFに仕上げ |
| **司令塔** | Google Docs・レポート等を直接依頼 |

## 既存エージェントへの変更

### lp-architect
- 「LP実装（HTML/CSS）」を担当範囲から削除
- 「デザイン実装が必要な場合はbrand-designerに委任する」を追加
- Do NOT trigger forに「LP実装・ビジュアルデザイン → brand-designer」を追加

### CLAUDE.md チーム一覧
11体目として追加:
```
| **brand-designer**（ブランドデザイナー） | 全成果物のデザイン・実装 | 外部向け資料のデザイン、LP実装、PDF、Google Docs、バナーの話題 |
```

ルーティングルールに追加:
```
- 外部向け成果物（生徒・保護者・公開用）のデザインが必要な場合、brand-designerを経由させる
```

## 成果物一覧（実装で作成・変更するファイル）
1. `.claude/agents/brand-designer.md` — 新規作成
2. `.claude/agents/lp-architect.md` — LP実装を削除、designer委任を追加
3. `CLAUDE.md` — チーム一覧にbrand-designer追加、ルーティングルール追加
