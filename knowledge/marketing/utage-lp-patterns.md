# ウタゲ LP制作パターン集

## ウタゲ基本情報
- **管理画面**: `https://utage-system.com/funnel/{FUNNEL_ID}/page/{PAGE_ID}/edit`
- **プレビュー**: `https://utage-system.com/page/{PAGE_ID}?preview=true`
- **技術スタック**: Vue 3ベースのビジュアルビルダー

## エディタ構造

```
ファネル (funnel)
└── ページ (page)
    └── セクション (section) ← fn-section
        └── 行 (row) ← fn-row
            └── カラム (column) ← fn-column
                └── エレメント (element) ← fn-el-*
                    ├── テキスト: fn-el-text（CKEditor内蔵）
                    ├── 画像: fn-el-image
                    ├── ボタン: fn-el-button
                    ├── カスタムHTML: fn-el-html
                    └── その他
```

## ブラウザ操作パターン

### 1. テキスト要素の編集（CKEditor API）

テキスト要素はCKEditorを使用。ダブルクリックで編集モードになる。

```javascript
// CKEditorインスタンスを見つける
const editors = Object.keys(CKEDITOR.instances);

// 特定のエディタの内容を設定
CKEDITOR.instances['editor-id'].setData('<p>新しいテキスト</p>');

// 内容を取得
CKEDITOR.instances['editor-id'].getData();
```

**手順:**
1. テキスト要素をダブルクリック → CKEditor起動
2. `CKEDITOR.instances` でID確認
3. `setData()` でHTML設定
4. 要素外をクリックして編集終了

### 2. カスタムHTMLの追加

新しいセクションを追加するには「カスタムHTML」エレメントを使う。

**手順:**
1. セクション下部の「+」ボタンをクリック（要素追加）
2. エレメント一覧から「カスタムHTML」を選択
3. HTML入力欄に直接HTMLを入力
4. `<style>` タグも含めてOK（インラインでなくても動作する）

**JavaScriptでの直接設定:**
```javascript
// カスタムHTMLの入力欄を取得
const textareas = document.querySelectorAll('.fn-el-html textarea');
// Vueのリアクティビティを使うため、inputイベントの発火が必要
textarea.value = htmlContent;
textarea.dispatchEvent(new Event('input', { bubbles: true }));
```

### 3. 保存の方法

**方法:** 画面右上の「保存」ボタンをクリック

**確認:**
- ネットワークリクエスト: POST `update/elements` → 200 OK
- `find` ツールで「保存」ボタンを探してクリック

### 4. プレビュー確認

**方法:** プレビューURLを開いてリロード

**セクション存在確認（JavaScript）:**
```javascript
document.body.innerText.includes('検索テキスト')
```

**注意:** 保存しないとプレビューに反映されない（エディタ画面のVueリアクティビティとは別）

## LINE URL関連

- **登録URL形式**: `https://utage-system.com/line/open/{LINE_ACCOUNT_ID}`
- **ウタゲ変換後**: `https://utage-system.com/line/link/{PAGE_ID}/{LINE_ACCOUNT_ID}?rid=...`
- ウタゲがトラッキング用にURLを自動変換する → 変換後のURLが正常

## 実装アプローチ

### ハイブリッドアプローチ（推奨）

既存のウタゲビルダー構築済みLP + カスタムHTMLで新セクション追加。

**メリット:**
- 既存のデザイン・レイアウト・トラッキングを維持
- 新しいコンテンツセクションを柔軟に追加可能
- Meta Pixel等はウタゲ側設定をそのまま活用

**適用場面:**
- 既存LPの改善・コンテンツ追加
- テキストの微調整 + 新セクション追加

### フルHTML埋め込み

LPビルダーを使わず、1つの大きなカスタムHTMLブロックにHTML全体を入れる。

**メリット:** デザインの完全再現
**デメリット:** ウタゲのトラッキング機能が使えない、編集がHTML直書きのみ

**適用場面:**
- 完全に新規のLP作成（ビルダーと無関係に作りたい場合）

## 作業フロー（チェックリスト）

### Phase 1: 準備
- [ ] HTMLソースを用意（ローカルで完成させる）
- [ ] LINE登録URLを確認
- [ ] フッターリンク（プライバシーポリシー、特商法、会社概要）のURLを確認
- [ ] HTMLのLINE URLを一括差し替え
- [ ] 編集ポイントにHTMLコメント追加

### Phase 2: ウタゲ編集（ブラウザ自動化）
- [ ] ウタゲ管理画面をEdgeで開く
- [ ] 既存テキスト要素をCKEditor APIで更新
- [ ] 新セクションをカスタムHTMLで追加
- [ ] 保存ボタンをクリック → 200 OK確認

### Phase 3: 検証
- [ ] プレビューページをリロード
- [ ] 全セクションの存在確認（JavaScript text search）
- [ ] LINE URLの動作確認
- [ ] フッターリンクの確認
- [ ] レスポンシブ（スマホ表示）確認

## トラブルシューティング

| 問題 | 原因 | 解決策 |
|------|------|--------|
| プレビューに変更が反映されない | 未保存 | 保存ボタンクリック → 200確認 → リロード |
| CKEditorのsetData()が効かない | IDが違う | `Object.keys(CKEDITOR.instances)` で確認 |
| カスタムHTMLが表示されない | Vueリアクティビティ | `dispatchEvent(new Event('input'))` を忘れずに |
| 保存で500エラー | HTMLに問題 | `<script>` タグを含めていないか確認 |
| zoomで白い画像 | 座標範囲が小さすぎ | `find` ツールで要素を探す方法に切り替え |

## 今回の実装例（台湾留学LP）

- **ファネルID**: `3fWAUVazzspv`
- **ページID**: `35AdS80V5F7B`
- **LINE登録URL**: `https://utage-system.com/line/open/Dpbj9HjjOAO3`
- **追加した6セクション**: 日本と台湾の差、保護者向け3ポイント、なぜ合格できるのか、合格者の声、なぜ無料？、追伸
- **フッターリンク先**: ryugaku101.com
