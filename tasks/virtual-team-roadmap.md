# 仮想マーケティングチーム — ゴールと到達点

## ゴール

「1つの万能AI」から「役割分担されたAIチーム」へ転換し、
マーケティング業務の品質と効率を構造的に向上させる。

### ゴールの具体像（完成時に「できること」）
1. 自然言語の指示で最適な専門エージェントが自動召喚される
2. 各エージェントが**実データに基づく判断基準（Skills）**で動き、品質が安定する
3. `/review-ceo`, `/review-marketer`, `/review-customer` で成果物を3視点から検証できる
4. `/team-audit` でチーム全体の整合性が自動チェックされる
5. 面談・広告・LP等の新データが入るたびにSkillsが更新され、判断基準が育つ

---

## 到達点（2026-03-18時点）

### 完了（✅）
- [x] 6体の召喚型エージェント構築（.claude/agents/）
  - ad-analyst, lp-architect, content-writer, sales-advisor, customer-manager, ops-manager
- [x] CLAUDE.md ルーティングテーブル追加
- [x] /team-audit コマンド + Stopフック（整合性自動チェック）
- [x] /review-ceo, /review-marketer, /review-customer コマンド
- [x] 3つのSkillsファイル（ceo/marketer/customer-review-criteria）
- [x] Skills → レビューコマンド紐づけ（「ロールプレイ」→「データ照合」に転換）

### 未完了（⬜）

#### 1. Skills判断基準のデータ鮮度
- [ ] **customer-review-criteria.md の更新**
  - 現在: 旧12件（セールス分析レポート 2/21）のみベース
  - 必要: 面談分析まとめ.md の16件（〜池田圭織 3/15）を統合
  - 作業: 16件を読み込み → 5大不安・成約/失注パターン・意思決定構造を再分析
  - 優先度: **高**（顧客レビューの正確性に直結）

- [ ] **marketer-review-criteria.md のファネルデータ更新**
  - 現在: LP診断レポート（3/3時点）のClarityデータ
  - 必要: 直近のMeta広告データ・LP A/Bテスト結果の反映
  - 優先度: 中（データは古いが大きく変わっていない可能性）

- [ ] **ceo-review-criteria.md のロードマップ同期**
  - 現在: 事業戦略ロードマップ（3/3作成）ベース
  - 必要: ロードマップ自体の進捗更新（着手済み施策の反映）
  - 優先度: 中

#### 2. おさる式メソドロジーの各エージェントへの反映
- [ ] **おさる式メソドロジー取り込み** — 別セッションで進行中
  - knowledge/marketing/osaru-methodology.md（完了）
  - knowledge/marketing/osaru-funnel-templates.md（完了）
- [ ] **各エージェントへの反映**（おさる取り込み完了後に着手）
  - lp-architect: おさる式LP構成パターン・LPMシート構造の参照追加
  - content-writer: おさる式コンテンツ戦略・ローンチ文脈の参照追加
  - ad-analyst: おさる式ファネル理論・広告→LP→LINE連携の判断基準追加
  - sales-advisor: おさる式セールス構造（SPIN + おさるクロージング）の統合
  - 優先度: **高**（おさる式がコアメソドロジーなのにエージェントが参照していない）

#### 3. エージェント専用Skillsの作成
- [ ] 現在のSkillsは「レビュー判断基準」3本のみ
  - チューリングは8冊の共通マニュアル → うちのエージェントにも専用マニュアルが要る
  - 候補:
    - `brand-voice.md` — 文章トーン・表記ルール（writing-rules.mdベース、全エージェント共通）
    - `funnel-playbook.md` — ファネル設計・運用の判断基準（おさる式ベース）
    - `sales-methodology.md` — SPIN + 3-7-14ルール + クロージング基準
    - `utage-operations.md` — UTAGE固有の操作知識（LP制作、LINE配信）
  - 優先度: 中（エージェントはknowledge/直接参照で動くが、Skillsにまとめた方が品質安定）

#### 4. グローバルスキル/エージェントとの関係整理
- [ ] 別セッションで追加した33スキル + 17エージェント（グローバル）
  - プロジェクト内6エージェントとの連携・使い分けルールが未定義
  - 例: audit-meta（グローバル）と ad-analyst（プロジェクト）の関係は？
  - team-audit のレジストリ（claude-code-toolkit-registry.md）との同期
  - 優先度: 中（機能的には動くが、重複・混乱のリスクあり）

#### 5. セールス分析レポートの統合・最新化
- [ ] 旧12件レポートと新16件分析を統合した「統合セールスインサイト」作成
  - 28件の面談データからパターンを再抽出
  - 成約率・失注原因・顧客ペルソナの最新版
  - これが customer-review-criteria.md の真の基盤になる
  - 優先度: **高**

---

## 推奨実行順序

```
Phase 1: データ基盤（正確性の担保）
  ① セールスデータ統合（旧12件 + 新16件 → 28件の統合分析）
  ② customer-review-criteria.md 更新
  ③ おさる式メソドロジー取り込み完了を待つ

Phase 2: エージェント強化（品質の向上）
  ④ 各エージェントにおさる式メソドロジー参照を追加
  ⑤ エージェント専用Skills作成（brand-voice, funnel-playbook等）
  ⑥ marketer/ceo-review-criteria の最新データ反映

Phase 3: 整合性・ガバナンス（持続性の担保）
  ⑦ グローバル ↔ プロジェクトのエージェント関係整理
  ⑧ team-audit レジストリとの完全同期
  ⑨ /team-audit 実行で全体検証
```

---

## 依存関係

```
おさる式取り込み（別セッション進行中）
  ↓ 完了後
各エージェントへのおさる式反映（Phase 2-④）
  ↓
funnel-playbook.md 作成（Phase 2-⑤）

面談データ統合（Phase 1-①）
  ↓
customer-review-criteria 更新（Phase 1-②）
  ↓
sales-advisor/customer-manager エージェント強化
```

---

## 関連ファイル
- エージェント: `.claude/agents/` （6ファイル）
- Skills: `.claude/skills/` （3ファイル: ceo/marketer/customer-review-criteria）
- コマンド: `.claude/commands/review-ceo.md, review-marketer.md, review-customer.md, team-audit.md`
- フック: `.claude/hookify.team-audit-reminder.local.md`
- ナレッジ: `knowledge/` 全体（5カテゴリ）
- メモリ: `memory/project_virtual_marketing_team.md`
- おさる式: `knowledge/marketing/osaru-methodology.md`, `osaru-funnel-templates.md`
- 面談データ: `knowledge/students/面談分析まとめ.md`（16件）、`knowledge/sales/個別相談セールス分析レポート.md`（12件）
- レジストリ: `knowledge/operations/claude-code-toolkit-registry.md`
