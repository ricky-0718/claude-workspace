# スキルリファクタリング実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thariq記事の9教訓を適用し、コマンドをフォルダ型スキルに昇格、全エージェントのdescriptionを最適化する

**Architecture:** コマンド4件をフォルダ型スキル（SKILL.md + gotchas.md + scripts/）に変換。エージェント10体のdescriptionをトリガー条件型に書き換え。残存コマンド8件のdescriptionも改善。

**Tech Stack:** Markdown, YAML frontmatter, Node.js (helper scripts)

---

## Task 1: utage-checkスキルフォルダ作成

**Files:**
- Create: `.claude/skills/utage-check/SKILL.md`
- Create: `.claude/skills/utage-check/gotchas.md`
- Create: `.claude/skills/utage-check/scripts/quality-check.mjs`
- Delete: `.claude/commands/utage-check.md`

- [ ] Step 1: `.claude/skills/utage-check/` ディレクトリ作成
- [ ] Step 2: 現 `utage-check.md` のワークフロー本体を `SKILL.md` に移行。frontmatterにdescription（トリガー条件型）追加
- [ ] Step 3: 注意事項・トラブル情報を `gotchas.md` に分離
- [ ] Step 4: LINE返信品質チェック5原則をスクリプト化 → `scripts/quality-check.mjs`
- [ ] Step 5: 旧コマンドファイル削除
- [ ] Step 6: コミット

## Task 2: upsider-kaikeiスキルフォルダ作成

**Files:**
- Create: `.claude/skills/upsider-kaikei/SKILL.md`
- Create: `.claude/skills/upsider-kaikei/gotchas.md`
- Create: `.claude/skills/upsider-kaikei/data/transaction-map.json`
- Create: `.claude/skills/upsider-kaikei/scripts/gws-write.mjs`
- Delete: `.claude/commands/upsider-kaikei.md`

- [ ] Step 1: ディレクトリ作成
- [ ] Step 2: ワークフロー本体を `SKILL.md` に移行（振込名対応表はdata/へ外出し参照）
- [ ] Step 3: トラブルシューティングセクションを `gotchas.md` に分離
- [ ] Step 4: 振込名→実態の対応表を `data/transaction-map.json` に構造化
- [ ] Step 5: 日本語Sheets書き込みヘルパーを `scripts/gws-write.mjs` に
- [ ] Step 6: 旧コマンドファイル削除、コミット

## Task 3: mendanスキルフォルダ作成

**Files:**
- Create: `.claude/skills/mendan/SKILL.md`
- Create: `.claude/skills/mendan/gotchas.md`
- Create: `.claude/skills/mendan/templates/report-format.md`
- Create: `.claude/skills/mendan/templates/line-draft-format.md`
- Delete: `.claude/commands/mendan.md`

- [ ] Step 1: ディレクトリ作成
- [ ] Step 2: ワークフロー本体を `SKILL.md` に移行（テンプレートはtemplates/へ外出し参照）
- [ ] Step 3: `gotchas.md` 作成（API接続失敗時、文字起こし不完全時の対処等）
- [ ] Step 4: 分析レポートのフォーマットを `templates/report-format.md` に分離
- [ ] Step 5: LINE下書きのフォーマットを `templates/line-draft-format.md` に分離
- [ ] Step 6: 旧コマンドファイル削除、コミット

## Task 4: utage-lpスキルフォルダ作成

**Files:**
- Create: `.claude/skills/utage-lp/SKILL.md`
- Create: `.claude/skills/utage-lp/gotchas.md`
- Create: `.claude/skills/utage-lp/scripts/font-check.mjs`
- Create: `.claude/skills/utage-lp/scripts/color-check.mjs`
- Create: `.claude/skills/utage-lp/references/editor-patterns.md`
- Delete: `.claude/commands/utage-lp.md`

- [ ] Step 1: ディレクトリ作成
- [ ] Step 2: ワークフロー本体を `SKILL.md` に（簡潔化、詳細はreferences/へ）
- [ ] Step 3: ハマりポイントを `gotchas.md` に集約
- [ ] Step 4: フォントサイズ検証スクリプトを `scripts/font-check.mjs` に
- [ ] Step 5: 背景色/文字色検証スクリプトを `scripts/color-check.mjs` に
- [ ] Step 6: CKEditor/カスタムHTMLパターンを `references/editor-patterns.md` に
- [ ] Step 7: 旧コマンドファイル削除、コミット

## Task 5: 全10エージェントのdescription最適化

**Files:**
- Modify: `.claude/agents/customer-manager.md`
- Modify: `.claude/agents/ops-manager.md`
- Modify: `.claude/agents/sales-advisor.md`
- Modify: `.claude/agents/lp-architect.md`
- Modify: `.claude/agents/ad-analyst.md`
- Modify: `.claude/agents/blog-writer.md`
- Modify: `.claude/agents/blog-editor.md`
- Modify: `.claude/agents/blog-strategist.md`
- Modify: `.claude/agents/content-writer.md`
- Modify: `.claude/agents/student-advisor.md`

- [ ] Step 1: 4エージェント（customer-manager, ops-manager, sales-advisor, lp-architect）の「専門スキル」テーブルを更新（コマンド参照→スキル参照）
- [ ] Step 2: 全10体のdescriptionを「トリガー条件型」に書き換え
- [ ] Step 3: コミット

## Task 6: 残存コマンド8件のdescription改善

**Files:**
- Modify: `.claude/commands/handoff.md`
- Modify: `.claude/commands/team-audit.md`
- Modify: `.claude/commands/review-ceo.md`
- Modify: `.claude/commands/review-customer.md`
- Modify: `.claude/commands/review-marketer.md`
- Modify: `.claude/commands/gas-deploy.md`
- Modify: `.claude/commands/setup-meta-ads.md`
- Modify: `.claude/commands/youtube-transcript.md`

- [ ] Step 1: 全8件のdescriptionをトリガー条件型に改善
- [ ] Step 2: コミット

## Task 7: 検証 + 既存スキル3件の整理

- [ ] Step 1: `.claude/skills/` 内の旧 `ceo-review-criteria.md`, `marketer-review-criteria.md`, `customer-review-criteria.md` をフォルダ化するか判断
- [ ] Step 2: /team-audit でエージェント参照パスの整合性を検証
- [ ] Step 3: 全体の最終確認、コミット
