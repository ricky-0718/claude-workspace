#!/bin/bash
# Claude Office - Start from Git Bash / Claude Code
# Uses PowerShell Start-Process for independent, persistent processes

DIR="C:/Users/newgo/Claud用/claude-office"
NODE="C:/Program Files/nodejs/node.exe"
TUNNEL_LOG="$DIR/data/tunnel.log"
TUNNEL_URL=""

echo ""
echo "=== Claude Office Startup ==="
echo ""

# --- Server ---
if WMIC PROCESS WHERE "name='node.exe'" GET CommandLine 2>/dev/null | grep -qi "server.js"; then
    echo "[OK] server.js already running"
else
    echo "[..] Starting server..."
    powershell -NoProfile -Command "\
        Start-Process -FilePath '$NODE' \
        -ArgumentList 'server.js' \
        -WorkingDirectory '$DIR' \
        -WindowStyle Minimized \
        -RedirectStandardOutput '$DIR/data/server.log' \
        -RedirectStandardError '$DIR/data/server-error.log'"
    sleep 2
    if curl -s http://localhost:3848/status >/dev/null 2>&1; then
        echo "[OK] server.js started"
    else
        echo "[!!] server.js failed to start. Check data/server-error.log"
    fi
fi

# --- Cloudflared ---
if WMIC PROCESS WHERE "name='cloudflared.exe'" GET ProcessId 2>/dev/null | grep -q "[0-9]"; then
    echo "[OK] cloudflared already running"
    # Read URL from existing log
    TUNNEL_URL=$(grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' "$TUNNEL_LOG" 2>/dev/null | head -1)
else
    rm -f "$TUNNEL_LOG"
    echo "[..] Starting tunnel..."
    powershell -NoProfile -Command "\
        Start-Process -FilePath '$DIR/cloudflared.exe' \
        -ArgumentList 'tunnel','--url','http://localhost:3848' \
        -WorkingDirectory '$DIR' \
        -WindowStyle Minimized \
        -RedirectStandardError '$TUNNEL_LOG'"
    echo "[..] Waiting for tunnel URL..."
    for i in $(seq 1 15); do
        sleep 1
        TUNNEL_URL=$(grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' "$TUNNEL_LOG" 2>/dev/null | head -1)
        if [ -n "$TUNNEL_URL" ]; then
            echo "[OK] cloudflared started"
            break
        fi
    done
    if [ -z "$TUNNEL_URL" ]; then
        echo "[!!] Tunnel URL not found yet"
    fi
fi

# --- Result ---
echo ""
echo "==========================================="
echo " Local:  http://localhost:3848"
if [ -n "$TUNNEL_URL" ]; then
    echo " Tunnel: $TUNNEL_URL"
fi
echo "==========================================="
echo ""
