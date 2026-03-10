# ナレッジ一元管理 ハンドオフ

## 状態
- ブランチ: `feature/knowledge-base`（masterから作成済み）
- 設計書: `docs/plans/2026-03-10-knowledge-base-design.md`

## 完了済み
- [x] 設計確定（全カテゴリの内容と構成）
- [x] gws CLI に `newgoodriki@gmail.com` を認証（Drive/Docs/Sheets）
- [x] `knowledge/` フォルダ構成作成（sales, students, marketing, operations, business）
- [x] sales/ に3ファイルコピー（SPIN, 3-7-14, セールス分析）+ README（.docxはDriveリンク参照）
- [x] students/ 完了: 面談分析まとめ.md（11名統合）、LINE下書きまとめ.md（11名統合）、karin-送信済み.md + README
- [x] marketing/ 完了: 8ファイルコピー + README（Driveリンク含む）
- [x] operations/ 完了: 4ファイルコピー + README
- [x] business/ 完了: 3ファイルコピー + README
- [x] 各カテゴリのREADME.md作成（5カテゴリ）
- [x] 全体README.md作成

## 未完了
- [ ] ローカル「ナレッジ格納庫」削除（移行完了後、ユーザー確認後）
- [ ] MEMORY.md更新（knowledgeフォルダの参照先変更）
- [ ] masterにマージ

## gws CLI アカウント情報
- 現在: `newgoodriki@gmail.com`（Drive/Docs/Sheets）
- バックアップ: `C:/Users/newgo/.config/gws/`
  - `credentials.enc.ricky` / `token_cache.json.ricky` → ricky@ryugaku101.com
  - `credentials.enc.newgoodriki` / `token_cache.json.newgoodriki` → newgoodriki@gmail.com
- 切替方法: バックアップファイルを `credentials.enc` / `token_cache.json` にコピー

## Google Drive リンク一覧（README記載用）

### students/README.md
- [オールインワンプラン生フォルダ](https://drive.google.com/drive/folders/1t5BP6SAste89WMOr1SzOQHtKMjJ0cInp)
- [【名簿】オールインワンプラン生](https://docs.google.com/spreadsheets/d/1CiPIRh1RC1CwLwvpXp8C9L_GQKIDG0dRzxQZrOyYAjw)
- [クラス管理表](https://docs.google.com/spreadsheets/d/1gvFuU_StP_VYt0ZlYFIKyPmYS4vQpL4wX8m2d_qafA0)
- [LINE返信DB](https://docs.google.com/spreadsheets/d/1_Mg0HcOKLp6jE9r642pXuzKqx1VpSV-VY6LDV475mvs) ※DriveナレッジID
- 出願アカウント 4期生、TOCFL管理シート

### sales/README.md
- [相談会](https://docs.google.com/document/d/1AMmn2zY8gM_ZM0yCXDWmEAJOiGo_2ZjrgYoDXFFojrE)
- [個別相談SPINテンプレート](Drive ナレッジ格納庫内 .docx)
- [【2026年版】台湾留学ガイドブック](https://docs.google.com/document/d/1BavHHJ5BPpzAPSaJiQsG_6ApZJerpGtTt2qu8Skhxjw) ※marketing/にも
- セールスプレゼンPDF x3（OneDrive: A&W/プレゼン/）
  - 2025年版サービス案内パンフレット
  - 国立台北科技大学合同説明会
  - オートウェビナー用スライド
- 公式ホームページLINK (Google Drawing)
- Drive「ナレッジ格納庫」内のGoogle Docs版:
  - 講座生FAQまとめ
  - ウェビナー後個別相談トーク全履歴まとめ

### marketing/README.md
- [広告分析フォルダ](https://drive.google.com/drive/folders/1ihIYk-jKoLPpWwd8XbOqlBzBJyc7QvDw)
  - 【オートウェビナー】広告分析ダッシュボード
  - 【北科大オート】広告分析ダッシュボード
  - エバーローンチ申し込みフォーム関係
  - 広告運用シート
- [LINEステップ作成シート](https://docs.google.com/spreadsheets/d/1pEdR7RfD0_SWC-77J0CXF0aw1jPUYQO7WXFwZ0kWr7Y)
- [【2026年版】台湾留学ガイドブック](https://docs.google.com/document/d/1BavHHJ5BPpzAPSaJiQsG_6ApZJerpGtTt2qu8Skhxjw) ※sales/にも
- Drive「ナレッジ格納庫」内:
  - パーソナルナレッジ ★クリエイティブ制作時に必ず参照
  - 発信ソースナレッジ ★クリエイティブ制作時に必ず参照
  - YouTube関連ナレッジ
  - chatGPTとのやり取りまとめ

### operations/README.md
- [契約書 ひな形](https://drive.google.com/drive/folders/1P4vxxIp3lJJUjsJlYifcUzZfuV51PLDy) ※新PC版
- gas-scripts/ へのローカルパス参照
- Drive「ナレッジ格納庫」内:
  - 業務マスター

### business/README.md
- 売上一覧、財務データ分析、月次管理資料
- 01. 101センターフォルダ（Driveの全体フォルダ構成）

## 重要ルール
- パーソナルナレッジ + 発信ソースナレッジ → SNS台本・クリエイティブ制作時に必ず参照
- Google Driveの既存フォルダ構成は変更しない
- 移行完了後、ローカル「ナレッジ格納庫」はユーザー確認後に削除
