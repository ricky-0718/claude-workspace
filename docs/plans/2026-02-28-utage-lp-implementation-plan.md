# 台湾留学LP ウタゲ実装 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 完成済みの `taiwan-lp-final.html` を改修し、ウタゲのLP機能にHTML埋め込みで実装する

**Architecture:** ハイブリッドアプローチ。HTMLデザインはそのまま活用し、LINEリンクを実URL化、Meta Pixelはウタゲ側設定を利用。ウタゲの管理画面をブラウザ操作して実装する。

**Tech Stack:** HTML/CSS、ウタゲ（SaaS）、Edge MCP（ブラウザ自動化）

---

### Task 1: HTML改修 - LINE URLの一括差し替え

**Files:**
- Modify: `taiwan-lp-final.html` (8箇所)

**Step 1: LINE URLを差し替え**

`href="#line"` を全8箇所 `href="https://utage-system.com/line/open/Dpbj9HjjOAO3"` に一括置換。

対象行:
- L335: `cta-inline` 「LINE追加で席を確保する」
- L348: `cta-inline` 「無料で席を確保する」
- L468: `cta-inline` 「無料で情報を受け取る」
- L586: `cta-inline` 「特典付きで席を確保する」
- L613: `cta-inline` 「無料で席を確保する（LINE追加）」
- L624: `cta-inline` 「今すぐ席を確保する」
- L648: `cta-inline` 「LINE追加で情報を受け取る」
- L670: `cta-btn` 固定CTA「LINEを追加して席を確保する」

**Step 2: 差し替え結果を確認**

Run: `grep -c "utage-system.com" taiwan-lp-final.html`
Expected: 8

Run: `grep -c 'href="#line"' taiwan-lp-final.html`
Expected: 0

**Step 3: Commit**

```bash
git add taiwan-lp-final.html
git commit -m "fix: LINE URLをウタゲ登録URLに一括差し替え（8箇所）"
```

---

### Task 2: HTML改修 - 変更しやすいポイントにコメント追加

**Files:**
- Modify: `taiwan-lp-final.html`

**Step 1: 編集ガイドコメントを追加**

以下の箇所にHTMLコメントを挿入し、非エンジニアでも変更箇所がわかるようにする:

1. **日程・対象情報** (L329-332付近)
   ```html
   <!-- ★編集ポイント: 対象・参加形式・費用の説明 -->
   ```

2. **先着人数** (L334, L584, L646)
   ```html
   <!-- ★編集ポイント: 先着人数（現在: 20名） -->
   ```

3. **金額比較** (L341-342)
   ```html
   <!-- ★編集ポイント: 費用比較（日本:500万円 / 台湾:120万円） -->
   ```

4. **実績数字** (L356-367)
   ```html
   <!-- ★編集ポイント: 合格率・奨学金実績の数字 -->
   ```

5. **特典内容** (L547-580)
   ```html
   <!-- ★編集ポイント: 8大特典の名前・内容 -->
   ```

6. **講師名** (L526)
   ```html
   <!-- ★編集ポイント: 講師名・肩書 -->
   ```

**Step 2: Commit**

```bash
git add taiwan-lp-final.html
git commit -m "docs: 変更しやすいポイントにHTMLコメントを追加"
```

---

### Task 3: HTML改修 - フッターリンクの更新

**Files:**
- Modify: `taiwan-lp-final.html:656-658`

**Step 1: フッターの実URLを確認**

ユーザーに以下のURLを確認:
- プライバシーポリシーのURL
- 特定商取引法に基づく表記のURL
- 会社概要のURL

**Step 2: URLを差し替え**

L656-658の `href="#"` を実URLに更新。

**Step 3: Commit**

```bash
git add taiwan-lp-final.html
git commit -m "fix: フッターリンクを実URLに更新"
```

---

### Task 4: ウタゲ埋め込み用HTML準備

**Files:**
- Create: `taiwan-lp-utage.html` （ウタゲ埋め込み専用版）

**Step 1: ウタゲのHTML埋め込み仕様を確認**

ブラウザでウタゲの管理画面を開き、HTML埋め込みブロックがどの形式を受け付けるか確認:
- フルHTMLページ（`<html>`タグ含む）が入るのか
- `<style>` + body内コンテンツだけで良いのか
- `<script>` タグは使えるか

**Step 2: 仕様に合わせたHTML版を作成**

`taiwan-lp-final.html` から、ウタゲの埋め込み形式に合わせた版を作成。
想定パターン:
- **パターンA**: フルHTML OK → そのまま使用
- **パターンB**: body内のみ → `<style>` を `<div>` 内 `<style>` に移動、外枠タグ削除

**Step 3: Commit**

```bash
git add taiwan-lp-utage.html
git commit -m "feat: ウタゲ埋め込み専用HTMLを作成"
```

---

### Task 5: ウタゲ管理画面でLP作成

**Step 1: ウタゲ管理画面にアクセス**

Edge MCPでウタゲの管理画面を開く。

**Step 2: 新規LPページを作成**

ウタゲのLP作成画面で新規ページを作成。

**Step 3: HTML埋め込みブロックを追加**

HTML埋め込みブロックを追加し、Task 4で作成したHTMLを貼り付ける。

**Step 4: Commit（作業記録）**

```bash
git commit --allow-empty -m "chore: ウタゲ管理画面でLP作成完了"
```

---

### Task 6: 表示確認・動作テスト

**Step 1: プレビューでデザイン確認**

ウタゲのプレビュー機能で以下を確認:
- デザインが崩れていないか
- レスポンシブ（モバイル表示）が正常か
- 固定CTAボタン（`position: fixed`）が正常に表示されるか

**Step 2: LINE遷移テスト**

CTAボタンをクリックして、正しいLINE追加URLに遷移するか確認。
Expected: `https://utage-system.com/line/open/Dpbj9HjjOAO3` に遷移

**Step 3: Meta Pixel発火確認**

ブラウザの開発者ツール（Network タブ）で以下を確認:
- `facebook.com/tr` へのリクエストが発生しているか
- PageView イベントが送信されているか

**Step 4: フッターリンク確認**

プライバシーポリシー・特商法・会社概要のリンクが正しいURLに遷移するか確認。

---

### Task 7: 公開・最終確認

**Step 1: ウタゲでLPを公開**

プレビュー確認後、ウタゲの管理画面でLPを公開状態にする。

**Step 2: 公開URLでの最終確認**

実際の公開URLにアクセスして最終確認:
- デザイン表示
- LINE遷移
- Meta Pixel発火
- モバイル表示

**Step 3: 完了コミット**

```bash
git commit --allow-empty -m "feat: 台湾留学LPのウタゲ実装完了"
```
