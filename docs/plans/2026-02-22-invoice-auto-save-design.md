# 請求書/契約書 自動保存ワークフロー 設計書

## 概要
Gmail に届く請求書・契約書のPDF添付ファイルを自動的にGoogle Driveフォルダに保存する。
Google Drive for Desktop経由でPCのローカルフォルダにも自動同期される。

## 技術スタック
- Google Apps Script (GAS)
- Gmail API (GAS内蔵)
- Google Drive API (GAS内蔵)

## 対象メール送信元
| 送信元 | 種別 |
|--------|------|
| `support@cloudsign.jp` | 契約書 |
| `noreply@freee.co.jp` | 請求書 |
| (将来追加可能) | - |

## 保存先
- Google Drive フォルダID: `1H7kwZsby0wb0CeV0fW_e2OEmLwA1Bq0u`
- ローカル同期: Google Drive for Desktop 経由

## アーキテクチャ

```
Gmail受信 → GASトリガー(5分おき) → メール検索 → PDF添付抽出 → Google Driveに保存
                                                                    ↓
                                                         Google Drive for Desktop
                                                                    ↓
                                                         PC ローカルフォルダ
```

## コンポーネント設計

### 1. メール検索
- 検索クエリ: `from:(support@cloudsign.jp OR noreply@freee.co.jp) has:attachment -label:自動保存済み`
- 未処理メールのみ対象
- 処理済みメールには `自動保存済み` ラベルを付与

### 2. PDF抽出・保存
- PDFファイルのみ抽出 (`.pdf` 拡張子)
- ファイル名形式: `{YYYY-MM-DD}_{送信元識別}_{元のファイル名}.pdf`
  - 例: `2026-02-22_cloudsign_契約書.pdf`
  - 例: `2026-02-22_freee_請求書_202602.pdf`
- 重複ファイル名の場合は末尾に連番付与

### 3. トリガー
- 時間駆動型: 5分間隔
- GAS標準のトリガー機能を使用

### 4. エラー処理
- 処理失敗時にメール通知（自分宛て）

## スコープ
### 対応するもの
- メールに直接添付されたPDFファイル
- 上記送信元からのメール

### 対応しないもの
- ダウンロードリンク型（外部認証が必要）
- PDF以外のファイル形式

## 拡張性
- `SENDER_CONFIG` 配列に送信元を追加するだけで新しい送信元に対応可能
