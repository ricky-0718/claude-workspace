# ウェビナー動画カット編集 — 実行指示書

> **作成日**: 2026-03-13
> **ステータス**: ✅ 完了（2026-03-17 Ver.2に差し替え済み — 大学紹介カット + 1.1倍速化、尺1:30:32。20:00開催分から新動画で配信中）

---

## 目的

オートウェビナー動画（約1時間47分）から、時期的に古くなった「大学紹介セクション」（00:47:10〜00:55:12）をカットして、通年で使えるエバーグリーン動画にする。

---

## ファイル情報

| 項目 | パス |
|---|---|
| **マスター動画（原本・絶対に編集しない）** | `C:/Users/newgo/OneDrive/デスクトップ/A&W/プレゼン/オート動画素材/オートウェビナー用動画（編集済み1月８日）.mov` |
| **作業用コピー** | `C:/Users/newgo/Claude用/temp-webinar/original.mov` |
| **ffmpeg** | `C:/Users/newgo/AppData/Local/Programs/Shotcut/ffmpeg.exe` |
| **作業ディレクトリ** | `C:/Users/newgo/Claude用/temp-webinar/` |
| **マスター動画サイズ** | 2.1GB |
| **形式** | .mov（コーデックは要確認。Step 2参照） |

---

## カット内容

### カットする箇所（1箇所のみ）

| カット範囲 | カット時間 | 内容 |
|---|---|---|
| **00:47:10 〜 00:55:12** | **約8分02秒** | 大学紹介セクション丸ごと（提携校一覧 + 英語課程紹介） |

### カットする理由
- 提携校紹介に「2月末まで間に合います」「3月から合宿講座」等の時期限定表現が含まれている
- 提携校セクションだけカットすると英語課程だけ紹介が残り不自然なため、大学紹介全体をカット

### カット前後のつながり
- **カット直前（〜00:47:10）**: 大学制度（国立/私立）の一般的な説明
- **カット直後（00:55:12〜）**: 出願スケジュールの説明（「各大学の出願時期は学校によって違います」）
- **遷移の自然さ**: 大学制度の説明 → 出願スケジュールの説明。自然な流れ

### カットしない箇所（元々の編集候補だったが今回は見送り）
| # | タイムスタンプ | 内容 | 見送り理由 |
|---|---|---|---|
| 2+3 | 01:33:08〜01:34:24 | B班「今まだ間に合います」+ C班スケジュール | ユーザー判断で今回はカットしない |
| 4 | 00:55:40〜00:56:17 | 出願スケジュール「10月〜12月」 | 一般的な年間スケジュール説明。問題なし |
| 5 | 01:06:19〜01:06:49 | 台北科技大「速報」表現 | ユーザー判断で今回はカットしない |

---

## 実行手順

### Step 0: 作業用コピーの確認

前のセッションでコピーを開始している。完了を確認する。

```bash
ls -lh "C:/Users/newgo/Claude用/temp-webinar/original.mov"
```

- 2.1GBであればコピー完了
- ファイルがなければ再コピー:
```bash
mkdir -p "C:/Users/newgo/Claude用/temp-webinar"
cp "C:/Users/newgo/OneDrive/デスクトップ/A&W/プレゼン/オート動画素材/オートウェビナー用動画（編集済み1月８日）.mov" "C:/Users/newgo/Claude用/temp-webinar/original.mov"
```

### Step 1: フォーマット確認

```bash
FFMPEG="C:/Users/newgo/AppData/Local/Programs/Shotcut/ffmpeg.exe"
WORKDIR="C:/Users/newgo/Claude用/temp-webinar"

"$FFMPEG" -i "$WORKDIR/original.mov" 2>&1 | grep -E "Stream|Duration|bitrate"
```

確認すべき項目:
- **映像コーデック**: H.264 / ProRes / 等
- **音声コーデック**: AAC / PCM / 等
- **解像度**: 1920x1080 等
- **Duration**: 約1:47:xx であること

### Step 2: カットポイント周辺のプレビュー作成（任意だが推奨）

正確なカットポイントを確認するために、カット前後の短いクリップを切り出して再生確認する。

```bash
FFMPEG="C:/Users/newgo/AppData/Local/Programs/Shotcut/ffmpeg.exe"
WORKDIR="C:/Users/newgo/Claude用/temp-webinar"

# カットイン周辺（47:00〜47:20 の20秒）
"$FFMPEG" -i "$WORKDIR/original.mov" -ss 00:47:00 -t 20 -c copy "$WORKDIR/preview_cut_in.mov"

# カットアウト周辺（55:02〜55:22 の20秒）
"$FFMPEG" -i "$WORKDIR/original.mov" -ss 00:55:02 -t 20 -c copy "$WORKDIR/preview_cut_out.mov"
```

Windowsメディアプレーヤーで再生して確認:
- `preview_cut_in.mov`: 47:10付近で話が一区切りになっているか
- `preview_cut_out.mov`: 55:12付近から話が自然に始まるか

**もしタイムスタンプの微調整が必要であれば、この段階で調整する。**

### Step 3: セグメント分割

動画を2つのセグメントに分割する（カット部分を除いた「残す部分」）。

```bash
FFMPEG="C:/Users/newgo/AppData/Local/Programs/Shotcut/ffmpeg.exe"
WORKDIR="C:/Users/newgo/Claude用/temp-webinar"

# セグメント1: 冒頭 〜 カット開始点
"$FFMPEG" -i "$WORKDIR/original.mov" -ss 00:00:00 -to 00:47:10 \
  -c:v libx264 -crf 18 -preset medium \
  -c:a aac -b:a 192k \
  "$WORKDIR/seg1.mp4"

# セグメント2: カット終了点 〜 最後
"$FFMPEG" -i "$WORKDIR/original.mov" -ss 00:55:12 \
  -c:v libx264 -crf 18 -preset medium \
  -c:a aac -b:a 192k \
  "$WORKDIR/seg2.mp4"
```

**注意事項:**
- `-ss` を `-i` の前に置くとシーク速度は速いがキーフレーム依存で不正確。`-i` の後ろに置くとフレーム正確だが遅い
- 上記は `-i` の後ろに `-ss` を置く方式（正確さ優先）
- CRF 18 = 視覚的にほぼ無損失。ウェビナー（スライド中心）なので十分な品質
- エンコード所要時間: 2.1GBの動画で約30〜90分（CPU性能依存）
- **もし元動画がProResコーデックの場合**: libx264への再エンコードは必須（ProResはウェブ再生非対応）
- **もし元動画がH.264の場合**: `-c copy`（無劣化）も選択肢だが、カットポイントの精度が落ちる

### Step 4: セグメント結合

```bash
FFMPEG="C:/Users/newgo/AppData/Local/Programs/Shotcut/ffmpeg.exe"
WORKDIR="C:/Users/newgo/Claude用/temp-webinar"

# concat用リストファイル作成
cat > "$WORKDIR/concat.txt" << 'EOF'
file 'seg1.mp4'
file 'seg2.mp4'
EOF

# 結合（セグメント間は無劣化結合）
"$FFMPEG" -f concat -safe 0 -i "$WORKDIR/concat.txt" -c copy "$WORKDIR/edited.mp4"
```

### Step 5: 確認

```bash
FFMPEG="C:/Users/newgo/AppData/Local/Programs/Shotcut/ffmpeg.exe"
WORKDIR="C:/Users/newgo/Claude用/temp-webinar"

# 編集済み動画の情報確認
"$FFMPEG" -i "$WORKDIR/edited.mp4" 2>&1 | grep -E "Duration|Stream"
```

確認ポイント:
- **Duration**: 約1:39:xx（元1:47:xx から約8分減）
- **映像・音声コーデック**: H.264 + AAC
- **カット境界の再生確認**: edited.mp4 の47分付近を再生して、話の流れが自然につながっているか

Windowsで再生確認:
```bash
start "" "$WORKDIR/edited.mp4"
```

### Step 6: UTAGEに再アップロード

1. **UTAGE管理画面にアクセス**: `https://utage-system.com/funnel/3fWAUVazzspv/page`
2. **ウェビナー視聴ページ**の編集画面を開く
3. 動画エレメントを見つけて、ホスティング方式を確認:
   - **UTAGEに直接アップロードされている場合**: 動画ファイルを差し替え（`browser_file_upload`でアップロード可能）
   - **YouTube/Vimeo等の外部サービスの場合**: 外部サービスで動画を差し替え → URLが変わればUTAGE側も更新
   - **カスタムHTML内のvideo要素の場合**: 新しいURLに差し替え
4. **プレビューで再生確認**: ウェビナー視聴ページが正常に動作することを確認

### Step 7: 後処理

1. **webinar-transcript.mdの更新**: 要編集箇所テーブルの編集1を「カット済み」に変更
2. **中間ファイルの削除**: `seg1.mp4`, `seg2.mp4`, `concat.txt`, `preview_*.mov` を削除
3. **original.mov は保持**: バックアップとして `temp-webinar/original.mov` は当面残す
4. **マスターデータは絶対にそのまま**: OneDrive上のマスターは一切触らない

---

## トラブルシューティング

| 問題 | 対処法 |
|---|---|
| ffmpegがエラーで動かない | Shotcut版パスを確認。代替: `C:/Users/newgo/AppData/Local/CapCut/Apps/8.1.1.3417/ffmpeg.exe` |
| エンコードが遅すぎる | `-preset fast` に変更（品質は若干下がるがほぼ分からない）。またはCapCut版ffmpegのGPUエンコード: `-c:v h264_nvenc` |
| カット境界で音声に「プチッ」というノイズ | 音声フェード追加: `-af "afade=t=out:st=2829:d=0.05,afade=t=in:st=0:d=0.05"` |
| UTAGEにアップロードできない（ファイルサイズ制限） | CRFを23に上げて圧縮: `-crf 23`。または解像度を下げる: `-vf scale=1280:720` |
| concat時にエラー（コーデック不一致） | 両セグメントの解像度・フレームレートが一致しているか確認。一致していれば問題なし |
| 動画と音声がズレる | `-async 1` オプションを追加。または `-ss` の位置を `-i` の前に移動して試す |

---

## 関連ファイル

- **ウェビナー文字起こし**: `knowledge/marketing/auto-webinar/webinar-transcript.md`
- **ウェビナー台本**: `knowledge/marketing/auto-webinar/webinar-script.md`
- **ファネル全体俯瞰**: `knowledge/marketing/auto-webinar/README.md`
- **全文テキスト**: `knowledge/marketing/発信ソースナレッジ.txt`（283行目以降）
- **UTAGE LP操作パターン**: `knowledge/marketing/utage-lp-patterns.md`

---

## 編集後の期待結果

- **編集前**: 約1時間47分（2.1GB .mov）
- **編集後**: 約1時間39分（推定800MB〜1.5GB .mp4）
- **カット内容**: 00:47:10〜00:55:12 の大学紹介セクション（提携校+英語課程）を除去
- **カット後の流れ**: 大学制度（国立/私立）の一般説明 → 出願スケジュールの説明
