# YouTube対談動画 LINE登録特典 制作プラン

## 方針

- 特典①（ガイドブック）は**既存**。UTAGEファネルID: `k3Hxto5DVonF`
- 残りの特典は**おさるAIとゼロベースで壁打ちして決める**。事前に内容を決めつけない
- おさる式原則: 特典は5個以上。「行動コストを払ってでも欲しい」価値を持たせる

---

## 制作フロー

### Step 1: おさるAI「特典アイデア出し」でブレスト
- GPTs: https://chatgpt.com/g/g-68733d2be7248191bbd22b3fe1f38930-osaruai-te-dian-aiteachu-si
- パーソナルナレッジ（`knowledge/marketing/パーソナルナレッジ.txt`）を入力
- 発信ソースナレッジ（`knowledge/marketing/発信ソースナレッジ.txt`）を入力
- 台湾留学×YouTube対談動画からのLINE登録という文脈で、特典アイデアを出してもらう

### Step 2: おさるAI「特典作成」でコンテンツ生成
- GPTs: https://chatgpt.com/g/g-68734ea9671081919ab3bb4667ff66a1-osaruai-te-dian-zuo-cheng
- Step 1で決まった特典を1つずつ作成

### Step 3: Claudeが批判的レビュー
- 成果物をClaudeに渡して、以下の観点でレビュー:
  - おさる式原則との整合性（8つの心理トリガー、特典設計の原則）
  - ターゲット（高校生＋保護者）に刺さるか
  - 実用価値があるか（「もらって嬉しい」ではなく「行動コストを払ってでも欲しい」か）
  - ファネル上の次のステップ（面談予約）に自然に繋がるか

### Step 4: おさるAIで再生成 → Claudeレビュー → 完璧になるまでループ

---

## 確定済みの素材（おさるAIへの入力候補）

おさるAIに渡す**インプット素材**として使える既存データ:

| データ | パス | 内容 |
|--------|------|------|
| パーソナルナレッジ | `knowledge/marketing/パーソナルナレッジ.txt` | リッキーの経歴・実績・強み |
| 発信ソースナレッジ | `knowledge/marketing/発信ソースナレッジ.txt` | ウェビナー台本の構造 |
| 3期生合格実績 | `knowledge/students/admission-results-3rd-cohort.md` | 65件の出願結果データ |
| 大学データベース | `knowledge/students/university-database.md` | 15大学の情報 |
| TOCFL FAQ | `knowledge/students/band-chat-analysis.md` | 4期生のよくある質問 |

> これらはアイデアの「種」であって、最終的な特典の内容はおさるAIとの壁打ちで決める

---

## 制作進捗（2026-03-21 セッション）

| # | 特典名 | ステータス | 保存先 |
|---|--------|-----------|--------|
| ① | 台湾留学ガイドブック | 既存 | UTAGEファネル |
| ② | 合格実績データブック 2026 | **合格** | `knowledge/marketing/tokuten-02-goukaku-jisseki-databook.md` |
| ③ | 保護者向け費用比較＋安全判断ブック | **合格** | `knowledge/marketing/tokuten-03-hogosya-hiyou-anzen.md` |
| ④ | 失敗回避レポート | **合格** | `knowledge/marketing/tokuten-04-shippai-kaihi-report.md` |
| ⑤ | 大学診断カルテ | **合格** | `knowledge/marketing/tokuten-05-daigaku-shindan-karte.md` |
| ⑥ | 中国語ゼロからA2資料 | **合格** | `knowledge/marketing/tokuten-06-chinese-zero-to-a2.md` |
| ⑦ | 親子別Q&Aブック | **合格** | `knowledge/marketing/tokuten-07-oyako-qa-book.md` |

### 全7本コンテンツ完成（2026-03-21）

### 次のステップ
- ③の全文統合（ChatGPTスレッドから前半・後半統合→MD保存）
- 全特典のPDF化（Canvaデザイン）
- YouTube概要欄の訴求文作成
- LINE登録後の配布導線設計（UTAGE）

### 制作ワークフロー実績
- おさるAI経由: ③④⑥（GPTs生成→Claudeレビュー）
- Claude直接制作: ②⑤⑦（既存データの整形・構造化が中心のためClaude単体で高品質に仕上がる）
- 批判的レビューで改善した点: 数字の追加、チェックリスト欠落、口調調整、既存特典との重複排除
