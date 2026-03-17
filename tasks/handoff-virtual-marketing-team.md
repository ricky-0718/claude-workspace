# セッション引き継ぎ — 2026-03-18 仮想マーケティングチーム構築

## 完了したこと

### 記事分析 → 設計方針の確定
- X記事3本（gstack/チューリングPR/61体AIエージェント）をPlaywright MCPで全文取得・分析
- 「1つの万能AI」→「役割分担されたAIチーム」への転換を決定
- 部門型（チューリング式）+ 役職視点（gstack式）のハイブリッド設計を採用

### 召喚型エージェント6体（.claude/agents/）
- ad-analyst（広告分析官・cyan）— データドリブン、数字に厳密
- lp-architect（LPアーキテクト・green）— ユーザー心理重視、CVR執着
- content-writer（コンテンツライター・magenta）— writing-rules準拠、AIっぽさゼロ
- sales-advisor（セールスアドバイザー・yellow）— SPIN型、押し売りしない
- customer-manager（顧客マネージャー・blue）— 生徒個別対応、LINE返信
- ops-manager（オペレーション管理者・red）— 正確・手順遵守

### CLAUDE.md ルーティングテーブル
- 「仮想マーケティングチーム」セクション追加
- 6エージェントの自動振り分けルールを定義

### 整合性チェック仕組み
- `/team-audit` コマンド — エージェント⇔CLAUDE.md⇔knowledgeの3方向検証
- `hookify.team-audit-reminder.local.md` — Stopイベントで変更検知・警告

### 役職視点レビューコマンド3種
- `/review-ceo` — 経営者視点（ROI・戦略整合性・機会損失）
- `/review-marketer` — マーケ責任者視点（ファネル・KPI・ボトルネック）
- `/review-customer` — 顧客視点（5大不安・信頼・離脱パターン）

### Skills判断基準ファイル3本（.claude/skills/）
- `ceo-review-criteria.md` — ROI閾値、ボトルネック優先順位7項目、おさる式売上方程式
- `marketer-review-criteria.md` — ファネル基準値（実測）、Clarityデータ、A/Bテスト基準
- `customer-review-criteria.md` — 面談12件からの5大不安、成約/失注パターン ★旧データのみ

### Asanaタスク
- 日報記入（仮想チーム構築の日報）
- マイタスクに親タスク + 5サブタスク（Phase 1-3のロードマップ）

## 未完了・次にやること

### 最優先: Phase 1 — データ基盤
1. **面談データ統合**（Asanaタスク: Phase1-①、期限 3/22）
   - `knowledge/students/面談分析まとめ.md`（16件・545KB）を全件読み込み
   - 旧12件（`knowledge/sales/個別相談セールス分析レポート.md`）と統合
   - 28件の成約率・失注原因・顧客ペルソナ・意思決定パターンを再分析
   - → `.claude/skills/customer-review-criteria.md` を最新データで更新
   - ★ 545KBファイルのためサブエージェントに分割読み込みを推奨

2. **おさる式取り込み完了確認**（Asanaタスク: Phase1-③、期限 3/20）
   - 別セッションで進行中
   - `knowledge/marketing/osaru-methodology.md` + `osaru-funnel-templates.md`
   - 完了後、Phase 2に進む

### 次: Phase 2 — エージェント強化
3. **各エージェントにおさる式参照を追加**（期限 3/25）
   - lp-architect, content-writer, ad-analyst, sales-advisor が対象
   - おさる式LP構成パターン・ファネル理論・ローンチ戦略を組み込む
   - ★ おさる式がコアメソドロジーなのにエージェントが参照していない状態

4. **エージェント専用Skills作成**（期限 3/28）
   - brand-voice.md、funnel-playbook.md、sales-methodology.md、utage-operations.md

### 最後: Phase 3 — 整合性
5. **グローバル↔プロジェクト関係整理 + team-audit検証**（期限 3/31）

## 重要なコンテキスト

### 設計判断の経緯
- チューリング記事（188万表示）が最も参考になった。「1人で幅広い業務」の状況が同じ
- gstackの「役職視点切り替え」は当初未実装 → ユーザーの指摘で追加
- レビューコマンドが最初「ロールプレイ型」だった → ユーザーが「正確性は担保できてる？」と指摘 → 実データに基づくSkills判断基準を追加して「データ照合型」に転換

### データ鮮度の問題（重要）
- customer-review-criteria.md は旧12件（2/21のセールス分析レポート）のみベース
- 面談分析まとめ.md には16件（〜池田圭織 3/15）の新データがある
- この統合がPhase 1の最重要タスク

### 別セッションとの並行作業
- おさる式メソドロジー取り込み — 別セッションで進行中
- スキル・プラグイン大規模拡張 — 完了済み（handoff-skills-plugins-expansion.md参照）
- 33グローバルスキル + 17グローバルエージェントが追加された状態

### team-auditの拡張
- 別セッションで検証範囲が拡大済み（レジストリ照合、重複チェックを追加）
- レジストリファイル: `knowledge/operations/claude-code-toolkit-registry.md`

## 関連ファイル

### 今回作成・変更したファイル
- `.claude/agents/` — 6エージェントファイル
- `.claude/commands/review-ceo.md, review-marketer.md, review-customer.md, team-audit.md`
- `.claude/skills/ceo-review-criteria.md, marketer-review-criteria.md, customer-review-criteria.md`
- `.claude/hookify.team-audit-reminder.local.md`
- `CLAUDE.md` — 仮想マーケティングチームセクション追加
- `tasks/virtual-team-roadmap.md` — ゴール・到達点・Phase計画
- `memory/project_virtual_marketing_team.md` — プロジェクトメモリ

### 参照すべきファイル（次セッション開始時）
- `tasks/virtual-team-roadmap.md` — 全体計画と進捗
- `tasks/handoff-skills-plugins-expansion.md` — 別セッションの大規模拡張の引き継ぎ
- `knowledge/students/面談分析まとめ.md` — 統合対象の16件面談データ
- `knowledge/sales/個別相談セールス分析レポート.md` — 統合対象の旧12件データ
