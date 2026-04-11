# 台湾スピーク ベータローンチ引き継ぎ（2026-04-11）

## 現在の状態

**本番URL**: https://chinese.ryugaku101.com
**ブランチ**: master（全Phase 1+2完了・デプロイ済み）
**ワークツリー**: なし

### 完了済み（4/11セッション）

**Phase 1**:
- [x] リブランディング（台灣華語コーチ → 台湾スピーク）
- [x] セルフサインアップ（招待コード制）
- [x] フリーミアム制限（chat 10回/日・speech 10回/日）
- [x] alert() 全廃 → Toast通知

**Phase 2**:
- [x] ゲーミフィケーション（5レベル・14実績・confetti・レベルバッジ）
- [x] 旅行者パック100フレーズ（4カテゴリ・繁體字・台湾語彙）
- [x] シェア機能（SVG→PNG・Web Share API）

**インフラ**:
- [x] カスタムドメイン `chinese.ryugaku101.com`（ムームードメイン + Let's Encrypt）
- [x] アプリ内URLを新ドメインに更新

## 次セッションでやること（優先順位順）

### 🔥 1. ベータテスト開始（最優先）
**目的**: 実ユーザーフィードバック収集開始

- [ ] ダッシュボード（https://chinese.ryugaku101.com/dashboard）で招待コード50件生成
  - 有効期限: 30日
  - 講師キー: `coach2026`（Fly secretsで変更可）
- [ ] 配布用アナウンス文を作成（LINEグループ用）
  - アプリの特徴（無料で始められる・旅行パック・発音AI）
  - 招待コードの使い方
  - フィードバック依頼
- [ ] 4-5期生のLINEグループに配布
- [ ] ダッシュボードで使用状況を日次でチェック

### 🎨 2. アプリアイコン刷新
**現状**: 台湾留学101のロゴを流用
**必要**: 「台湾スピーク」専用アイコン

- [ ] デザインコンセプト: 台湾＋吹き出し＋発音波形 など
- [ ] Gemini Image Gen or Canvaで生成
- [ ] 192px + 512px を `public/icons/` に配置
- [ ] manifest.json は既に参照済み（ファイル差し替えのみでOK）

### ⏰ 3. SpeechSuper判断（4/30期限・残り19日）
**現状**: トライアルキー `17756596580006d9`、sent.eval統一
**判断材料が必要**:

- [ ] ベータユーザーの録音データで実精度を評価
- [ ] 声調認識の正確さ・誤検知率を集計
- [ ] 代替候補（Azure Pronunciation Assessment / Chivox）のPoC
- [ ] 継続契約 or 切替の判断

### 📊 4. アナリティクス導入
**目的**: ユーザー行動の可視化

候補:
- **Microsoft Clarity**: 無料・ヒートマップ・セッション録画（MCP連携済み）
- **Plausible**: 有料・プライバシー重視・軽量
- **自前**: 既存の `activity_log` / `drill_logs` から集計ダッシュボード作成

### 5. 細かい改善（余裕があれば）
- [ ] デイリーチャレンジ機能（`daily_challenges` テーブル未実装）
- [ ] 友達招待機能（招待コード配布を自動化）
- [ ] 完璧クイズ実績の実装（`stats.perfect_quizzes = 0` で止まっている）
- [ ] 本番DBへのテストアカウント削除（`e2e-test-*`, `phase2test`, `limit-test`, `テスト太郎`）

## 重要な技術メモ

### 本番デプロイ
```bash
cd "C:/Users/newgo/Claude用/chinese-ai-coach"
"C:/Users/newgo/Claude用/flyctl-new/flyctl.exe" deploy
```

### 本番DBへのSQL実行（fly ssh）
```bash
"C:/Users/newgo/Claude用/flyctl-new/flyctl.exe" ssh console -C "node scripts/import-travel-pack.js"
```
※ 最後に「Error: The handle is invalid.」が出るが正常動作（Windows特有）

### API構成
| エンドポイント | 認証 | 用途 |
|---|---|---|
| `POST /api/register` | なし | 招待コードで新規登録 |
| `POST /api/login` | なし | 既存ユーザーログイン |
| `POST /api/dashboard/invite-codes/batch` | coachAuth | 招待コードバッチ生成 |
| `GET /api/dashboard/invite-codes` | coachAuth | 使用状況一覧 |
| `GET /api/curriculum/stats` | student | plan/level/achievements/usage |
| `GET /api/curriculum/achievements` | student | 実績一覧 |

### ハマりポイント
- **Express v5ルート順序**: `app.use('/api/dashboard', router)` の**前**に個別の `/api/dashboard/*` エンドポイントを定義すること
- **Git Bashのcurl日本語問題**: Shift-JISで送信されるためAPIテストでは英数字のみ使用
- **ワークツリーのnode_modules**: worktree作成直後は `npm install` が必要

### ファイル構成
```
chinese-ai-coach/
├── server/
│   ├── index.js            # usageLimit, register, invite codes routes
│   ├── db/
│   │   ├── schema.sql      # 招待コード・daily_usage・achievementsテーブル
│   │   └── index.js        # migrations（plan, invite_code_id列追加）
│   └── routes/
│       └── curriculum.js   # LEVELS, ACHIEVEMENT_DEFS, checkAchievements
├── public/
│   ├── index.html          # login-view + register-view
│   ├── js/
│   │   ├── app.js          # showToast, register, confetti, shareMyScore
│   │   └── dashboard.js    # loadInviteCodes, generateInviteCodes
│   └── css/
│       ├── style.css       # toast, limit-overlay, confetti, level-badge
│       └── dashboard.css   # invite-grid, invite-card
└── scripts/
    ├── travel-pack.sql     # 100フレーズ（本番DB投入済み）
    └── import-travel-pack.js
```

## 次セッション開始方法

```
「台湾スピークのベータ配布準備して」
→ このファイル（tasks/handoff-taiwan-speak-beta-launch.md）を参照
→ まず招待コード50件生成 + 配布文作成から
```
