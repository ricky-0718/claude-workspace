#!/bin/bash
# start-paperclip.sh — Paperclip自動起動スクリプト
#
# 呼び出し: Windows タスクスケジューラーからログイン時に実行
#   wsl.exe -d Ubuntu -u ricky -- bash /mnt/c/Users/newgo/Claude用/scripts/start-paperclip.sh
#
# 動作:
# 1. 既に起動中（ポート3100が使用中）なら何もしないで終了
# 2. 起動していなければ、nohup + disown でバックグラウンド起動
# 3. ログは /home/ricky/paperclip.log に出力
# 4. WSLコマンドが終了してもPaperclipは動き続ける（init配下の孤児プロセス）

set -e

LOG_FILE="/home/ricky/paperclip.log"
LOCK_FILE="/tmp/paperclip-startup.lock"

# 多重起動防止（このスクリプト自身）
if [ -e "$LOCK_FILE" ]; then
  PID=$(cat "$LOCK_FILE" 2>/dev/null || echo "")
  if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
    echo "$(date -Iseconds) [start-paperclip] Already starting (pid=$PID), exit"
    exit 0
  fi
fi
echo $$ > "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

echo "$(date -Iseconds) [start-paperclip] Begin"

# 既にPaperclipが動いているか確認（ポート3100をチェック）
if ss -tln 2>/dev/null | grep -q '127.0.0.1:3100 '; then
  echo "$(date -Iseconds) [start-paperclip] Paperclip already running on :3100, nothing to do"
  exit 0
fi

# nvm を読み込む
if [ ! -s "$HOME/.nvm/nvm.sh" ]; then
  echo "$(date -Iseconds) [start-paperclip] ERROR: nvm not found at $HOME/.nvm/nvm.sh"
  exit 1
fi
# shellcheck source=/dev/null
source "$HOME/.nvm/nvm.sh"
nvm use default >/dev/null 2>&1 || true

# workspace が存在するか確認
WORKSPACE="/home/ricky/workspace"
if [ ! -d "$WORKSPACE" ]; then
  echo "$(date -Iseconds) [start-paperclip] ERROR: workspace not found at $WORKSPACE"
  exit 1
fi

cd "$WORKSPACE"

# ログファイルを初期化（ローテーション）
if [ -f "$LOG_FILE" ] && [ "$(stat -c%s "$LOG_FILE")" -gt 10485760 ]; then
  mv "$LOG_FILE" "${LOG_FILE}.old"
fi
echo "$(date -Iseconds) [start-paperclip] Launching Paperclip from $(pwd)" >> "$LOG_FILE"

# 起動（nohup で SIGHUP を無視、& で背景化、disown で jobs table から外す）
nohup npx --yes paperclipai run >> "$LOG_FILE" 2>&1 &
PAPERCLIP_PID=$!
disown "$PAPERCLIP_PID" 2>/dev/null || true

# 起動確認（最大20秒待機）
for i in $(seq 1 20); do
  if ss -tln 2>/dev/null | grep -q '127.0.0.1:3100 '; then
    echo "$(date -Iseconds) [start-paperclip] OK: Paperclip listening on :3100 (pid=$PAPERCLIP_PID)"
    exit 0
  fi
  sleep 1
done

echo "$(date -Iseconds) [start-paperclip] ERROR: Paperclip did not start within 20s. Check $LOG_FILE"
exit 1
