# HiNote Monitor リファクタリング計画

## 現状の問題
1. **Claude CLI子プロセスが不安定**: mendan全ステップを10分以内にやるのは無理（600sタイムアウト頻発）
2. **Edgeのタブが10分ごとに開く**: 新PCで作業中にブラウザがちらつく

## 解決方針

### アーキテクチャ変更: B案（Node.js直接実行）

**Before**: hinote-monitor → Claude CLI（全ステップ実行）→ 失敗多発
**After**: hinote-monitor → Claude CLI（分析テキスト生成のみ）→ Node.js（機械的処理）

#### Claude CLIの役割を限定
- 入力: 文字起こしテキスト + ナレッジ3ファイル
- 出力: **構造化JSON**（分析レポート・LINE4通・顧客カード）
- ツール不要（Read/Write/Asana等は使わない）→ 高速化
- プロンプトを `mendan-analysis-only.md` として新規作成

#### Node.jsで直接実行する処理
1. **ファイル書き込み**: fs.appendFileSync で面談分析まとめ.md / LINE下書きまとめ.md / 顧客コンテキスト.md に追記
2. **Asanaタスク作成**: Asana REST API（npm `asana` パッケージ or fetch直接）でメインタスク+サブタスク4件作成
3. **スプレッドシート更新**: gws CLI（既存のexecFileSync方式）
4. **git commit + push**: 自動コミット

### ブラウザちらつき対策

#### 選択肢
- **A. タブ再利用**: 既存のHiNoteタブを検出して再利用（新タブを開かない）
- **B. 最小化ウィンドウ**: CDP経由でウィンドウを最小化してから操作
- **C. 旧PCに移動**: 旧PCでEdge CDP + hinote-monitor実行

推奨: **A（タブ再利用）**が最もシンプル。HiNoteのタブを常時開いておき、navigateで更新するだけ。

## 実装ステップ

### Phase 1: ブラウザちらつき修正（小）
- [ ] `getNotesFromPage` で新タブ作成 → 既存タブ再利用に変更
- [ ] HiNoteタブが見つからない場合のみ新タブ作成

### Phase 2: 分析専用プロンプト作成（中）
- [ ] `mendan-analysis-only.md` — JSON出力のプロンプト
- [ ] 出力スキーマ定義（分析レポート / LINE4通 / 顧客カード / スプレッドシート行）

### Phase 3: Node.js直接実行モジュール（大）
- [ ] `mendan-executor.js` — Claude APIの出力JSONを受け取り、全処理を実行
  - [ ] ファイル書き込み（面談分析まとめ / LINE下書き / 顧客コンテキスト）
  - [ ] Asana REST API（タスク作成 + 親子関係設定）
  - [ ] gws CLI（スプレッドシート追記）
  - [ ] git add + commit + push

### Phase 4: 結合テスト
- [ ] dry-runモードでJSON出力確認
- [ ] 本番実行テスト（1件）
- [ ] タスクスケジューラ10分実行で安定動作確認

## 依存関係
- Asana REST API: Personal Access Token が必要（.envに追加）
- Claude CLI: allowedTools を空にして、テキスト生成のみに制限
- gws CLI: 既存のまま使用

## 期待効果
- Claude CLI実行時間: 10分超 → 2〜3分（ツール不要のため）
- 安定性: タイムアウト頻発 → ほぼ確実に成功
- ブラウザ: タブちらつきなし
