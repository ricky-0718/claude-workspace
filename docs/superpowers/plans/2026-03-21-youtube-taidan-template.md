# YouTube対談動画 台本テンプレート 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** おさる式12ステップの台本テンプレートファイル一式を作成し、4期生1本目の収録に必要な全素材を揃える

**Architecture:** knowledge/marketing/ に台本テンプレート本体を配置。生徒別の台本は knowledge/students/ 配下に個別ファイルとして生成。LINE特典素材は別タスクで制作。

**Spec:** `docs/superpowers/specs/2026-03-21-youtube-taidan-template-design.md`

---

## ファイル構成

| ファイル | 役割 | 操作 |
|---------|------|------|
| `knowledge/marketing/youtube-taidan-template.md` | 12ステップ台本テンプレート本体（穴埋め式） | 新規作成 |
| `knowledge/marketing/youtube-taidan-checklist.md` | 収録前〜公開後チェックリスト | 新規作成 |
| `knowledge/marketing/youtube-description-template.md` | YouTube概要欄テンプレート | 新規作成 |
| `knowledge/students/taidan-ueno-wataru.md` | 上野航さん用の個別台本（1本目） | 新規作成 |

---

## Task 1: 台本テンプレート本体の作成

**Files:**
- Create: `knowledge/marketing/youtube-taidan-template.md`

- [ ] **Step 1: テンプレートのヘッダーとメタ情報を記述**

以下の内容で作成開始:
- テンプレートの使い方ガイド（3行）
- 12ステップ一覧表
- 動画の基本情報記入欄（生徒名、期、大学、収録形式、収録日）

- [ ] **Step 2: 前半パート（ステップ1〜4）の質問テンプレートを記述**

スペックのステップ1〜4を穴埋め式の台本フォーマットに変換:
- 各ステップに「リッキーのセリフ」と「質問」と「引き出したいキーワード」を配置
- `【＿＿＿】` でカスタマイズ箇所を明示
- Zoom版/対面版の分岐を `> Zoom:` `> 対面:` で記載

- [ ] **Step 3: 中盤パート（ステップ5〜7）の質問テンプレートを記述**

訴求①（中国語プログラム）と訴求②（合格サポート）のセクション:
- Q6〜Q13を穴埋め式で配置
- 「引き出したいキーワード」をチェックリスト形式で記載
- 演出ノート（テロップ表示タイミング等）を `> 演出:` で記載

- [ ] **Step 4: 親パート（ステップ8〜9）の質問テンプレートを記述**

親の登場〜決め手セクション:
- Q14〜Q18を穴埋め式で配置
- フォールバック3パターン（A: 別日Zoom / B: 生徒が代弁 / C: テキスト代読）を注記
- 親パートへの導入セリフのテンプレート

- [ ] **Step 5: 締めパート（ステップ10〜12）の質問テンプレート＋CTAスクリプトを記述**

Q19〜Q20 ＋ リッキーのまとめセリフ:
- CTAパートは穴埋めではなく**ほぼ完成形のスクリプト**として記述
- 特典リスト挿入箇所
- ステップ9の伏線回収セリフのテンプレート
- LINE登録URLの差し込み箇所

- [ ] **Step 6: 検証 — スペックの12ステップと全Q番号（Q1〜Q20＋Q8b）の対応を確認**

テンプレートがスペックの全要素をカバーしていることを目視確認:
- 全21問が含まれているか
- 心理トリガーの割当が一致しているか
- Zoom/対面の分岐が全ステップに入っているか

- [ ] **Step 7: コミット**

```bash
git add knowledge/marketing/youtube-taidan-template.md
git commit -m "feat: YouTube対談動画12ステップ台本テンプレートを作成"
```

---

## Task 2: 収録チェックリストの作成

**Files:**
- Create: `knowledge/marketing/youtube-taidan-checklist.md`

- [ ] **Step 1: 収録前チェックリストを記述**

スペックの収録前チェックリストを拡張:
- 3セクション: 共通 / Zoom追加 / 対面追加
- 撮影・公開同意書を最上位に配置
- 事前共有物の内容（「テーマ概要版のみ」の方針を反映）

- [ ] **Step 2: 収録当日チェックリストを記述**

当日の手順:
- 機材セットアップ
- 生徒・親へのリラックス促し（アイスブレイク）
- 録画開始前の最終確認事項
- 収録中のメモ取り（テロップ候補の記録）

- [ ] **Step 3: 編集・公開チェックリストを記述**

スペックの編集ガイドラインを反映:
- テロップ・BGM・カットの方針
- サムネイル作成（3パターンのコピー案）
- 概要欄の記入
- LINE登録URL・QRコードの確認
- 公開後: コメント対応、SNS横展開

- [ ] **Step 4: 検証 — スペックのチェックリスト項目が全て含まれていることを確認**

- [ ] **Step 5: コミット**

```bash
git add knowledge/marketing/youtube-taidan-checklist.md
git commit -m "feat: 対談動画の収録〜公開チェックリストを作成"
```

---

## Task 3: YouTube概要欄テンプレートの作成

**Files:**
- Create: `knowledge/marketing/youtube-description-template.md`

- [ ] **Step 1: 概要欄テンプレートを記述**

スペックの概要欄テンプレートをベースに:
- LINE登録URL差し込み箇所（冒頭3行）
- 特典リスト
- タイムスタンプ（プレースホルダー。「編集後に実測値で記入」の注記付き）
- SNSリンク
- ハッシュタグ

- [ ] **Step 2: サムネイルコピー案テンプレートを追記**

3パターン × 穴埋め式:
- パターン1: 短期的快楽型「中国語ゼロ→【＿＿＿】に合格」
- パターン2: 逆説・衝撃型
- パターン3: ネガティブ訴求型

- [ ] **Step 3: コミット**

```bash
git add knowledge/marketing/youtube-description-template.md
git commit -m "feat: YouTube概要欄＋サムネイルコピーのテンプレートを作成"
```

---

## Task 4: 上野航さん用の個別台本を作成（1本目）

**Files:**
- Create: `knowledge/students/taidan-ueno-wataru.md`
- Read: `knowledge/students/asana-mendan-records.md`（上野航セクション）
- Read: `knowledge/students/band-chat-analysis.md`（上野航関連）
- Read: `knowledge/marketing/youtube-taidan-template.md`（Task 1で作成したもの）

- [ ] **Step 1: 上野航さんのデータを収集・整理**

既存ナレッジから以下を抽出:
- 面談記録（4回分）: 志望校選定の過程、政治大合格、淡江大出願
- BANDトーク: 出願書類準備の具体的なやりとり
- スペック: 出身地、高校、評定、TOCFL/TOEICスコア、合格校

- [ ] **Step 2: テンプレートに上野航さんのデータを埋め込み**

`youtube-taidan-template.md` の穴埋め箇所を具体的な内容で埋める:
- ステップ1ダイジェスト: 「政治大学 創新國際學院に合格」
- ステップ2紹介: 国際関係・外交系志望、政治大合格
- ステップ4〜7: 面談記録から予想される回答のガイドを記載
- ステップ8-9: 親パートの想定質問を上野航さんの状況に合わせてカスタマイズ

- [ ] **Step 3: リッキー用のインタビューガイドノートを追記**

台本の末尾に:
- 「この質問ではこのエピソードを引き出したい」という面接官メモ
- 深掘りのフォローアップ質問候補
- 親の参加可否が未確定の場合のフォールバック指示

- [ ] **Step 4: 検証 — テンプレートの全ステップ(1-12)と全質問(Q1-Q20+Q8b)がカバーされていることを確認**

- [ ] **Step 5: コミット**

```bash
git add knowledge/students/taidan-ueno-wataru.md
git commit -m "feat: 上野航さん用YouTube対談動画の個別台本を作成"
```

---

## Task 5: LINE特典素材の制作計画を整理

**Files:**
- Create: `tasks/youtube-line-tokuten.md`

- [ ] **Step 1: 特典の既存/新規ステータスを整理**

| # | 特典 | ステータス | ソース |
|---|------|-----------|--------|
| 1 | ガイドブックPDF | 既存流用 | ガイドブックLP特典 |
| 2 | 費用シミュレーションシート | 要新規作成 | — |
| 3 | 大学選びガイド | 要新規作成 | university-database.md |
| 4 | TOCFL対策キット | 要新規作成 | band-chat-analysis.md FAQ |
| 5 | 合格実績データ集 | PDF化のみ | admission-results-3rd-cohort.md |

- [ ] **Step 2: 各特典の制作タスクと優先順位を記述**

- 優先度高: ①（流用のみ）と⑤（PDF化のみ）→ 即対応可
- 優先度中: ③（データベースからの変換）
- 優先度低: ②と④（新規作成。動画公開までに間に合えばOK）

- [ ] **Step 3: コミット**

```bash
git add tasks/youtube-line-tokuten.md
git commit -m "docs: YouTube対談動画LINE特典の制作計画を整理"
```

---

## 実行順序

```
Task 1（台本テンプレート）
  ↓
Task 2（チェックリスト）  ←  Task 1と並行可
  ↓
Task 3（概要欄テンプレート） ← Task 1と並行可
  ↓
Task 4（上野航さん個別台本） ← Task 1完了後
  ↓
Task 5（LINE特典計画）      ← 独立、いつでも可
```

Task 1〜3は並行実行可能。Task 4はTask 1の成果物に依存。
