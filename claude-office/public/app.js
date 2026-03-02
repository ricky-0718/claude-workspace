// ============================================
// Claude Office - Canvas Pixel Art Dashboard
// Multi-agent + Instructions support
// ============================================

// --- Constants ---
const CANVAS_W = 640, CANVAS_H = 400;
const WALL_H = 96;
const FLOOR_Y = 100;
const TILE = 32;

const STATE_LABELS = {
  idle: '休憩中', writing: '執筆中', researching: '調査中',
  executing: '実行中', syncing: '通信中', error: 'エラー対応',
};
const STATE_ICONS = {
  idle: '\u2615', writing: '\uD83D\uDCBB', researching: '\uD83D\uDCDA',
  executing: '\u26A1', syncing: '\uD83D\uDCE1', error: '\uD83D\uDD25',
};
const STATE_POS = {
  writing:     { x: 80,  y: 190 },
  researching: { x: 300, y: 188 },
  syncing:     { x: 520, y: 190 },
  idle:        { x: 80,  y: 295 },
  executing:   { x: 488, y: 295 },
  error:       { x: 300, y: 370 },
};
const ZONE_LABELS = {
  writing: { x: 40, y: 200, text: '\uD83D\uDCBB \u30C7\u30B9\u30AF' },
  researching: { x: 256, y: 196, text: '\uD83D\uDCDA \u672C\u68DA' },
  syncing: { x: 476, y: 200, text: '\uD83D\uDCE1 \u901A\u4FE1' },
  idle: { x: 36, y: 308, text: '\u2615 \u4F11\u61A9' },
  executing: { x: 448, y: 308, text: '\u26A1 \u30BF\u30FC\u30DF\u30CA\u30EB' },
  error: { x: 260, y: 376, text: '\uD83D\uDD25 \u30C7\u30D0\u30C3\u30B0' },
};

// --- Multi-agent state ---
// { [id]: { name, state, detail, color, online, x, y, targetX, targetY, walkFrame, walkCounter, isWalking } }
const charAgents = {};
let roomBuffer = null;
let connected = false;

// --- DOM ---
const canvas = document.getElementById('room');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// --- Drawing Helpers ---
function R(c, x, y, w, h, color) {
  c.fillStyle = color;
  c.fillRect(Math.round(x), Math.round(y), w, h);
}

// =============================================
// ROOM DRAWING (static, cached to buffer)
// =============================================
function buildRoom() {
  const buf = document.createElement('canvas');
  buf.width = CANVAS_W; buf.height = CANVAS_H;
  const c = buf.getContext('2d');
  c.imageSmoothingEnabled = false;

  drawWalls(c);
  drawFloor(c);
  drawRug(c, 196, 220, 176, 100);
  drawPoster(c, 40, 12);
  drawWindow(c, 190, 6);
  drawClock(c, 348, 26);
  drawWallShelf(c, 440, 22);
  drawBookshelf(c, 256, 105);
  drawWorkDesk(c, 36, 116);
  drawCommDesk(c, 480, 116);
  drawLamp(c, 128, 222);
  drawSofa(c, 32, 250);
  drawCoffeeTable(c, 122, 280);
  drawTerminal(c, 448, 244);
  drawBed(c, 544, 312);
  drawDebugBench(c, 260, 340);
  drawCat(c, 136, 262);
  drawPlant(c, 24, 348);
  drawPlant(c, 604, 320);
  drawPlant(c, 416, 170);
  drawZoneLabels(c);
  drawNameplate(c);
  drawScanlines(c);

  roomBuffer = buf;
}

// --- Walls ---
function drawWalls(c) {
  R(c, 0, 0, 640, WALL_H, '#3d2b1f');
  c.fillStyle = '#352418';
  for (let y = 0; y < WALL_H; y += 18) c.fillRect(0, y, 640, 1);
  for (let x = 0; x < 640; x += 52) c.fillRect(x, 0, 1, WALL_H);
  R(c, 0, WALL_H, 640, 4, '#2a1a10');
  R(c, 0, WALL_H - 2, 640, 2, '#4a3828');
  R(c, 0, 0, 16, CANVAS_H, '#2a1a10');
  R(c, 14, 0, 2, CANVAS_H, '#3a2818');
  R(c, 624, 0, 16, CANVAS_H, '#2a1a10');
  R(c, 624, 0, 2, CANVAS_H, '#3a2818');
}

function drawFloor(c) {
  const a = '#d4a574', b = '#c49464';
  for (let y = FLOOR_Y; y < CANVAS_H; y += TILE) {
    for (let x = 16; x < 624; x += TILE) {
      const light = ((x / TILE | 0) + (y / TILE | 0)) % 2 === 0;
      R(c, x, y, TILE, TILE, light ? a : b);
      c.fillStyle = 'rgba(0,0,0,0.04)';
      c.fillRect(x, y, TILE, 1);
      c.fillRect(x, y, 1, TILE);
    }
  }
}

function drawRug(c, x, y, w, h) {
  R(c, x, y, w, h, '#7a3030');
  R(c, x+2, y+2, w-4, h-4, '#8a3838');
  R(c, x+4, y+4, w-8, h-8, '#984848');
  R(c, x+8, y+8, w-16, h-16, '#8a3838');
  const cx = x + w/2, cy = y + h/2;
  R(c, cx-16, cy-2, 32, 4, '#c8a060');
  R(c, cx-2, cy-12, 4, 24, '#c8a060');
  for (const [dx, dy] of [[-1,-1],[1,-1],[-1,1],[1,1]]) {
    R(c, cx + dx*28, cy + dy*16, 4, 4, '#c8a060');
  }
}

function drawWorkDesk(c, x, y) {
  R(c, x+3, y+44, 90, 4, 'rgba(0,0,0,0.12)');
  R(c, x+6, y+38, 6, 8, '#5C3A21');
  R(c, x+76, y+38, 6, 8, '#5C3A21');
  R(c, x, y+30, 88, 10, '#A0782C');
  R(c, x+1, y+31, 86, 1, '#BFA060');
  R(c, x, y+39, 88, 1, '#8B6914');
  R(c, x+38, y+22, 12, 10, '#555');
  R(c, x+20, y-2, 48, 26, '#2a2a2a');
  R(c, x+22, y, 44, 22, '#1a2a4a');
  const cc = ['#4a90d9','#6bae23','#daa520','#4a90d9','#9370db'];
  for (let i = 0; i < 5; i++) R(c, x+24, y+2+i*4, 8+((i*11)%22), 2, cc[i]);
  R(c, x+28, y+32, 32, 5, '#444');
  R(c, x+29, y+33, 30, 3, '#555');
  R(c, x+68, y+34, 6, 4, '#ddd');
  R(c, x+4, y+30, 10, 8, '#f0e8d8');
  R(c, x+5, y+31, 8, 5, '#8B4513');
  R(c, x+78, y+20, 4, 12, '#888');
  R(c, x+74, y+16, 12, 6, '#DAA520');
  R(c, x+76, y+22, 8, 2, 'rgba(255,220,100,0.3)');
}

function drawBookshelf(c, x, y) {
  R(c, x+3, y+64, 92, 4, 'rgba(0,0,0,0.12)');
  R(c, x, y, 92, 66, '#5C3A21');
  R(c, x+2, y+2, 88, 62, '#7B5B3A');
  const bk = ['#c44','#48c','#4a4','#da5','#84c','#c84','#4aa','#a4c','#c66','#68c'];
  for (let i = 0; i < 4; i++) {
    const sy = y + 4 + i * 15;
    R(c, x+2, sy+13, 88, 2, '#4a3020');
    let bx = x + 5;
    for (let b = 0; b < 7; b++) {
      const bw = 4 + ((b*3+i) % 5);
      const bh = 9 + (b % 3);
      R(c, bx, sy+13-bh, bw, bh, bk[(i*3+b) % bk.length]);
      bx += bw + 1;
      if (bx > x + 86) break;
    }
  }
  R(c, x+68, y-8, 10, 10, '#4a8ac4');
  R(c, x+70, y-6, 4, 4, '#3a7a44');
  R(c, x+72, y-10, 2, 2, '#888');
}

function drawCommDesk(c, x, y) {
  R(c, x+3, y+48, 80, 4, 'rgba(0,0,0,0.12)');
  R(c, x, y+32, 80, 10, '#555');
  R(c, x+4, y+42, 4, 8, '#444');
  R(c, x+72, y+42, 4, 8, '#444');
  R(c, x+4, y+4, 32, 28, '#2a2a2a');
  R(c, x+6, y+6, 28, 22, '#1a1a3a');
  R(c, x+44, y+4, 32, 28, '#2a2a2a');
  R(c, x+46, y+6, 28, 22, '#1a1a3a');
  for (let i = 0; i < 4; i++) {
    R(c, x+8, y+8+i*5, 10+i*3, 2, '#9370DB');
    R(c, x+48, y+8+i*5, 18-i*3, 2, '#9370DB');
  }
  R(c, x+38, y-14, 4, 20, '#888');
  R(c, x+34, y-18, 12, 6, '#aaa');
  R(c, x+36, y-20, 2, 4, '#888');
  R(c, x+42, y-20, 2, 4, '#888');
  R(c, x+39, y-20, 2, 2, '#ff4444');
}

function drawSofa(c, x, y) {
  R(c, x+3, y+36, 86, 4, 'rgba(0,0,0,0.1)');
  R(c, x, y+8, 84, 28, '#7B4513');
  R(c, x+4, y, 76, 12, '#CD853F');
  R(c, x+6, y+2, 22, 8, '#D2A060');
  R(c, x+32, y+2, 22, 8, '#D2A060');
  R(c, x+58, y+2, 20, 8, '#D2A060');
  R(c, x+4, y+12, 76, 20, '#CD853F');
  R(c, x+6, y+14, 34, 16, '#D2A060');
  R(c, x+44, y+14, 34, 16, '#D2A060');
  R(c, x, y+4, 8, 30, '#7B4513');
  R(c, x+76, y+4, 8, 30, '#7B4513');
  R(c, x+14, y+6, 16, 10, '#e88866');
  R(c, x+15, y+7, 14, 8, '#f0a080');
}

function drawCoffeeTable(c, x, y) {
  R(c, x+2, y+14, 36, 3, 'rgba(0,0,0,0.08)');
  R(c, x, y+6, 34, 6, '#8B6914');
  R(c, x+1, y+7, 32, 1, '#A08030');
  R(c, x+2, y+12, 3, 4, '#6B4914');
  R(c, x+29, y+12, 3, 4, '#6B4914');
  R(c, x+8, y+4, 6, 4, '#f0e8d8');
  R(c, x+9, y+5, 4, 2, '#6B4020');
  R(c, x+18, y+3, 12, 5, '#c44');
  R(c, x+19, y+4, 10, 1, '#ffeedd');
}

function drawTerminal(c, x, y) {
  R(c, x+3, y+42, 70, 4, 'rgba(0,0,0,0.12)');
  R(c, x, y+28, 68, 8, '#555');
  R(c, x+4, y+36, 4, 8, '#444');
  R(c, x+60, y+36, 4, 8, '#444');
  R(c, x+6, y, 56, 28, '#2a2a2a');
  R(c, x+8, y+2, 52, 24, '#0a1a0a');
  for (let i = 0; i < 5; i++) {
    const w = 8 + ((i*9) % 28);
    R(c, x+10, y+4+i*4, w, 2, '#00cc44');
  }
  R(c, x+10, y+24, 6, 2, '#00ff66');
  R(c, x+16, y+30, 36, 4, '#444');
  R(c, x+62, y+14, 8, 2, '#666');
  R(c, x+68, y+14, 2, 12, '#666');
}

function drawDebugBench(c, x, y) {
  R(c, x+3, y+32, 78, 4, 'rgba(0,0,0,0.1)');
  R(c, x, y+22, 76, 8, '#555');
  R(c, x+4, y+30, 4, 6, '#444');
  R(c, x+68, y+30, 4, 6, '#444');
  R(c, x+18, y, 40, 22, '#2a2a2a');
  R(c, x+20, y+2, 36, 18, '#3a0a0a');
  R(c, x+34, y+4, 8, 2, '#ff4444');
  R(c, x+32, y+6, 12, 2, '#ff4444');
  R(c, x+30, y+8, 16, 2, '#ff4444');
  R(c, x+28, y+10, 20, 2, '#ff4444');
  R(c, x+36, y+12, 4, 4, '#ffcc00');
  R(c, x+2, y+20, 12, 8, '#f0f0e0');
  R(c, x+4, y+22, 6, 1, '#aaa');
  R(c, x+64, y+18, 10, 10, '#f0f0e0');
  R(c, x+66, y+20, 5, 1, '#aaa');
  R(c, x+66, y+23, 4, 1, '#aaa');
  R(c, x+58, y+24, 2, 8, '#999');
  R(c, x+56, y+24, 6, 2, '#bbb');
}

function drawPlant(c, x, y) {
  R(c, x+2, y+14, 12, 8, '#B85533');
  R(c, x+4, y+12, 8, 4, '#C86644');
  R(c, x+4, y+12, 8, 2, '#554030');
  R(c, x+4, y+2, 8, 12, '#3a8a3a');
  R(c, x, y+4, 6, 8, '#2a7a2a');
  R(c, x+10, y+4, 6, 8, '#2a7a2a');
  R(c, x+6, y-4, 4, 8, '#4a9a4a');
  R(c, x+2, y, 4, 4, '#5aaa5a');
}

function drawCat(c, x, y) {
  R(c, x, y+4, 18, 8, '#f0e0c0');
  R(c, x+2, y+2, 14, 12, '#f0e0c0');
  R(c, x-2, y+2, 8, 8, '#f0e0c0');
  R(c, x-2, y, 3, 3, '#d0c0a0');
  R(c, x+3, y, 3, 3, '#d0c0a0');
  R(c, x+16, y+4, 6, 3, '#d0c0a0');
  R(c, x+20, y+2, 4, 3, '#d0c0a0');
  R(c, x+4, y+4, 2, 6, '#d0c0a0');
  R(c, x+10, y+4, 2, 6, '#d0c0a0');
  c.fillStyle = '#8a8a8a';
  c.font = '6px monospace';
  c.fillText('z', x+6, y-2);
  c.fillText('z', x+12, y-6);
  c.fillText('Z', x+17, y-10);
}

function drawBed(c, x, y) {
  R(c, x+3, y+34, 56, 4, 'rgba(0,0,0,0.08)');
  R(c, x, y+4, 54, 28, '#5C3A21');
  R(c, x+2, y+6, 50, 24, '#f0e8d8');
  R(c, x+4, y+8, 18, 10, '#fff');
  R(c, x+6, y+10, 14, 6, '#e0e0f0');
  R(c, x+20, y+10, 30, 18, '#4a6a8a');
  R(c, x+22, y+12, 26, 14, '#5a7a9a');
  R(c, x, y, 54, 6, '#4a3020');
}

function drawLamp(c, x, y) {
  R(c, x+3, y+28, 8, 4, '#888');
  R(c, x+5, y+6, 4, 22, '#999');
  R(c, x-1, y, 16, 8, '#DAA520');
  R(c, x+1, y+2, 12, 4, '#FFDD66');
  R(c, x+3, y+8, 8, 4, 'rgba(255,220,100,0.15)');
}

function drawPoster(c, x, y) {
  R(c, x, y, 40, 52, '#2a2a2a');
  R(c, x+2, y+2, 36, 48, '#1a3a6a');
  R(c, x+10, y+8, 20, 24, '#D97757');
  R(c, x+12, y+10, 16, 20, '#E8956A');
  R(c, x+16, y+14, 8, 8, '#fff');
  c.fillStyle = '#fff';
  c.font = '5px monospace';
  c.textAlign = 'center';
  c.fillText('CLAUDE', x+20, y+44);
  c.textAlign = 'left';
}

function drawWindow(c, x, y) {
  R(c, x, y, 88, 68, '#5C3A21');
  R(c, x+4, y+4, 36, 56, '#87CEEB');
  R(c, x+44, y+4, 36, 56, '#87CEEB');
  R(c, x+4, y+4, 36, 20, '#a0d8f0');
  R(c, x+44, y+4, 36, 20, '#a0d8f0');
  R(c, x+10, y+10, 14, 4, 'rgba(255,255,255,0.7)');
  R(c, x+12, y+8, 8, 3, 'rgba(255,255,255,0.5)');
  R(c, x+50, y+14, 18, 4, 'rgba(255,255,255,0.6)');
  R(c, x+40, y+4, 4, 56, '#5C3A21');
  R(c, x+4, y+30, 76, 4, '#5C3A21');
  R(c, x-6, y, 10, 68, '#8B3A3A');
  R(c, x-4, y, 2, 68, '#9B4A4A');
  R(c, x+84, y, 10, 68, '#8B3A3A');
  R(c, x+86, y, 2, 68, '#9B4A4A');
  R(c, x+10, y+68+6, 60, 40, 'rgba(255,240,200,0.06)');
}

function drawClock(c, x, y) {
  R(c, x, y, 24, 24, '#D2B48C');
  R(c, x+1, y+1, 22, 22, '#2a2a2a');
  R(c, x+2, y+2, 20, 20, '#f5f0e0');
  R(c, x+11, y+6, 2, 8, '#2a2a2a');
  R(c, x+12, y+11, 6, 2, '#2a2a2a');
  R(c, x+10, y+4, 4, 2, '#aaa');
}

function drawWallShelf(c, x, y) {
  R(c, x, y+22, 68, 4, '#5C3A21');
  R(c, x+8, y+22, 4, 12, '#4a3020');
  R(c, x+56, y+22, 4, 12, '#4a3020');
  R(c, x+4, y+10, 10, 12, '#c44');
  R(c, x+6, y+8, 6, 4, '#d66');
  R(c, x+18, y+14, 14, 8, '#48c');
  R(c, x+36, y+6, 8, 16, '#4a4');
  R(c, x+38, y+4, 4, 4, '#6c6');
  R(c, x+50, y+12, 14, 10, '#da5');
  R(c, x+52, y+14, 10, 6, '#fed');
}

function drawZoneLabels(c) {
  c.font = '7px "Press Start 2P", monospace';
  c.textAlign = 'left';
  for (const [, info] of Object.entries(ZONE_LABELS)) {
    c.fillStyle = 'rgba(255,255,255,0.08)';
    c.fillText(info.text, info.x, info.y);
  }
}

function drawNameplate(c) {
  const text = 'Claude \u306E\u30AA\u30D5\u30A3\u30B9';
  c.font = '9px "Press Start 2P", monospace';
  c.textAlign = 'center';
  const w = 180;
  const x = (640 - w) / 2, y = 386;
  R(c, x, y, w, 14, '#3d2b1f');
  R(c, x+1, y+1, w-2, 12, '#5a4a30');
  c.fillStyle = '#DAA520';
  c.fillText('\u2605', x - 10, y + 11);
  c.fillText('\u2605', x + w + 4, y + 11);
  c.fillStyle = '#f0e0c0';
  c.fillText(text, 320, y + 11);
  c.textAlign = 'left';
}

function drawScanlines(c) {
  c.fillStyle = 'rgba(0,0,0,0.06)';
  for (let y = 0; y < CANVAS_H; y += 4) {
    c.fillRect(0, y, CANVAS_W, 1);
  }
}

// =============================================
// CHARACTER DRAWING
// =============================================
function drawCharacter(cx, cy, color, frame, walking, name) {
  const c = ctx;
  // Shadow
  c.fillStyle = 'rgba(0,0,0,0.2)';
  c.fillRect(cx-10, cy-2, 20, 6);

  const lOff = walking ? (frame % 4 === 1 ? -2 : frame % 4 === 3 ? 2 : 0) : 0;
  const rOff = walking ? (frame % 4 === 3 ? -2 : frame % 4 === 1 ? 2 : 0) : 0;
  const aOff = walking ? (frame % 4 === 1 ? 2 : frame % 4 === 3 ? -2 : 0) : 0;

  // Legs
  R(c, cx-5, cy-12+lOff, 4, 12, '#2a2a2a');
  R(c, cx-6, cy-2+lOff, 5, 3, color);
  R(c, cx+1, cy-12+rOff, 4, 12, '#2a2a2a');
  R(c, cx+1, cy-2+rOff, 5, 3, color);
  // Body
  R(c, cx-8, cy-28, 16, 18, color);
  R(c, cx-8, cy-28, 16, 1, '#2a2a2a');
  R(c, cx-8, cy-11, 16, 1, '#2a2a2a');
  R(c, cx-8, cy-28, 1, 18, '#2a2a2a');
  R(c, cx+7, cy-28, 1, 18, '#2a2a2a');
  // Chest screen
  R(c, cx-4, cy-24, 8, 8, '#fff');
  R(c, cx-3, cy-23, 6, 6, '#a0d0ff');
  R(c, cx-2, cy-22, 4, 1, color);
  R(c, cx-1, cy-20, 3, 1, color);
  // Arms
  R(c, cx-11, cy-26+aOff, 3, 12, color);
  R(c, cx+8, cy-26-aOff, 3, 12, color);
  R(c, cx-11, cy-15+aOff, 3, 3, '#fff');
  R(c, cx+8, cy-15-aOff, 3, 3, '#fff');
  // Head
  R(c, cx-7, cy-40, 14, 12, '#fff');
  R(c, cx-7, cy-40, 14, 1, '#2a2a2a');
  R(c, cx-7, cy-29, 14, 1, '#2a2a2a');
  R(c, cx-7, cy-40, 1, 12, '#2a2a2a');
  R(c, cx+6, cy-40, 1, 12, '#2a2a2a');
  // Ears
  R(c, cx-9, cy-37, 2, 6, color);
  R(c, cx+7, cy-37, 2, 6, color);
  // Eyes
  R(c, cx-4, cy-37, 3, 3, color);
  R(c, cx+1, cy-37, 3, 3, color);
  R(c, cx-4, cy-37, 1, 1, '#fff');
  R(c, cx+1, cy-37, 1, 1, '#fff');
  // Mouth
  R(c, cx-2, cy-32, 4, 1, '#2a2a2a');
  // Antenna
  R(c, cx-1, cy-46, 2, 6, '#2a2a2a');
  R(c, cx-2, cy-48, 4, 3, color);
  R(c, cx-3, cy-49, 6, 5, color + '44');

  // Name tag below character
  if (name) {
    c.font = '6px "Press Start 2P", monospace';
    c.textAlign = 'center';
    c.fillStyle = 'rgba(0,0,0,0.5)';
    const tw = c.measureText(name).width + 6;
    R(c, cx - tw/2, cy+4, tw, 10, 'rgba(0,0,0,0.5)');
    c.fillStyle = '#fff';
    c.fillText(name, cx, cy+12);
    c.textAlign = 'left';
  }
}

// --- Speech Bubble ---
function drawBubble(cx, cy, text) {
  const c = ctx;
  c.font = '7px "Press Start 2P", monospace';
  c.textAlign = 'center';
  const m = c.measureText(text);
  const w = m.width + 14;
  const h = 16;
  const bx = Math.round(cx - w/2);
  const by = Math.round(cy - 62);

  const clampX = Math.max(4, Math.min(bx, CANVAS_W - w - 4));

  R(c, clampX, by, w, h, '#fff');
  R(c, clampX, by, w, 1, '#2a2a2a');
  R(c, clampX, by+h-1, w, 1, '#2a2a2a');
  R(c, clampX, by, 1, h, '#2a2a2a');
  R(c, clampX+w-1, by, 1, h, '#2a2a2a');
  R(c, cx-2, by+h, 5, 2, '#fff');
  R(c, cx-3, by+h, 1, 2, '#2a2a2a');
  R(c, cx+2, by+h, 1, 2, '#2a2a2a');
  R(c, cx-2, by+h+1, 5, 1, '#2a2a2a');
  c.fillStyle = '#2a2a2a';
  c.fillText(text, clampX + w/2, by + 11);
  c.textAlign = 'left';
}

// =============================================
// MULTI-AGENT POSITION MANAGEMENT
// =============================================
function getAgentOffset(agentId, state) {
  // Count how many agents share this zone
  const sameZone = Object.values(charAgents).filter(a => a.state === state);
  const idx = sameZone.findIndex(a => a.id === agentId);
  if (idx <= 0) return { dx: 0, dy: 0 };
  // Offset each subsequent agent
  return { dx: idx * 30, dy: idx * 8 };
}

function ensureCharAgent(agent) {
  if (!charAgents[agent.id]) {
    const pos = STATE_POS[agent.state] || STATE_POS.idle;
    charAgents[agent.id] = {
      id: agent.id,
      name: agent.name,
      state: agent.state,
      detail: agent.detail,
      color: agent.color,
      online: agent.online,
      x: pos.x, y: pos.y,
      targetX: pos.x, targetY: pos.y,
      walkFrame: 0,
      walkCounter: 0,
      isWalking: false,
    };
  }
  return charAgents[agent.id];
}

// =============================================
// ANIMATION LOOP
// =============================================
function update() {
  for (const a of Object.values(charAgents)) {
    const dx = a.targetX - a.x, dy = a.targetY - a.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > 1.5) {
      a.x += (dx / dist) * 1.5;
      a.y += (dy / dist) * 1.5;
      a.isWalking = true;
      a.walkCounter++;
      if (a.walkCounter % 8 === 0) a.walkFrame = (a.walkFrame + 1) % 4;
    } else {
      a.x = a.targetX;
      a.y = a.targetY;
      a.isWalking = false;
      a.walkFrame = 0;
    }
  }
}

function render() {
  if (!roomBuffer) return;
  ctx.drawImage(roomBuffer, 0, 0);

  // Sort agents by Y position for correct overlap
  const sorted = Object.values(charAgents)
    .filter(a => a.online)
    .sort((a, b) => a.y - b.y);

  for (const a of sorted) {
    drawCharacter(
      Math.round(a.x), Math.round(a.y),
      a.color, a.walkFrame, a.isWalking, a.name
    );
    if (!a.isWalking) {
      const label = STATE_LABELS[a.state] || a.state;
      drawBubble(Math.round(a.x), Math.round(a.y), label);
    }
  }
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// =============================================
// POLLING & STATE
// =============================================
async function fetchStatus() {
  try {
    const r = await fetch('/status');
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const d = await r.json();
    connected = true;
    applyAgents(d.agents || []);
    updateFooter(d.agents || []);
  } catch {
    connected = false;
  }
}

function applyAgents(agents) {
  const knownIds = new Set();

  for (const agent of agents) {
    knownIds.add(agent.id);
    const ca = ensureCharAgent(agent);

    ca.name = agent.name;
    ca.color = agent.color;
    ca.online = agent.online;
    ca.detail = agent.detail;

    if (ca.state !== agent.state) {
      ca.state = agent.state;
      const pos = STATE_POS[agent.state] || STATE_POS.idle;
      const offset = getAgentOffset(agent.id, agent.state);
      ca.targetX = pos.x + offset.dx;
      ca.targetY = pos.y + offset.dy;
    }
  }

  // Remove agents no longer in server
  for (const id of Object.keys(charAgents)) {
    if (!knownIds.has(id)) delete charAgents[id];
  }

  renderAgentsPanel(agents);
}

// --- Agents Panel ---
function renderAgentsPanel(agents) {
  const el = document.getElementById('agents-list');
  if (!agents.length) {
    el.innerHTML = '<div style="color:var(--text-dim);font-size:7px;text-align:center;padding:8px">待機中...</div>';
    return;
  }
  el.innerHTML = agents.map(a => {
    const stateLabel = STATE_LABELS[a.state] || a.state;
    const icon = STATE_ICONS[a.state] || '';
    const timeStr = formatRelative(a.updatedAt);
    return `<div class="agent-row">
      <span class="agent-dot${a.online ? '' : ' offline'}" style="background:${a.color}"></span>
      <span class="agent-name">${a.name}</span>
      <span class="agent-state">${icon} ${stateLabel}${a.detail ? ' - ' + a.detail : ''}</span>
      <span class="agent-time">${timeStr}</span>
    </div>`;
  }).join('');
}

// --- Activity Log (from server) ---
async function fetchActivity() {
  try {
    const r = await fetch('/activity');
    if (!r.ok) return;
    const log = await r.json();
    renderActivityLog(log);
  } catch {}
}

function renderActivityLog(log) {
  const ul = document.getElementById('log-list');
  ul.innerHTML = log.slice(0, 20).map(e => {
    const d = new Date(e.time);
    const time = d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
    const icon = STATE_ICONS[e.state] || '';
    const label = STATE_LABELS[e.state] || e.state;
    return `<li>
      <span class="log-time">${time}</span>
      <span class="log-icon">${icon}</span>
      <span class="log-agent">${e.agent || ''}</span>
      <span class="log-state">${label}${e.detail ? ' - ' + e.detail : ''}</span>
    </li>`;
  }).join('');
}

// --- Instructions ---
async function fetchInstructions() {
  try {
    const r = await fetch('/instructions');
    if (!r.ok) return;
    const list = await r.json();
    renderInstructions(list);
  } catch {}
}

function renderInstructions(list) {
  const el = document.getElementById('instruction-list');
  if (!list.length) {
    el.innerHTML = '<div style="color:var(--text-dim);font-size:7px;text-align:center;padding:4px">指示なし</div>';
    return;
  }
  el.innerHTML = list.slice(0, 10).map(inst => {
    const isDone = inst.status === 'done';
    const d = new Date(inst.createdAt);
    const time = d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
    const doneBtn = isDone ? '' : `<button class="instr-done-btn" onclick="markDone('${inst.id}')">完了</button>`;
    return `<div class="instr-row">
      <span class="instr-status">${isDone ? '\u2705' : '\u23F3'}</span>
      <span class="instr-text${isDone ? ' done' : ''}">${escHtml(inst.text)}</span>
      <span class="instr-time">${time}</span>
      ${doneBtn}
    </div>`;
  }).join('');
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function sendInstruction() {
  const textarea = document.getElementById('instruction-text');
  const text = textarea.value.trim();
  if (!text) return;

  try {
    const r = await fetch('/instructions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (r.ok) {
      textarea.value = '';
      fetchInstructions();
    }
  } catch {}
}

async function markDone(id) {
  try {
    await fetch(`/instructions/${id}/done`, { method: 'POST' });
    fetchInstructions();
  } catch {}
}

// Make markDone available globally for onclick
window.markDone = markDone;

// --- Footer ---
function updateFooter(agents) {
  const online = (agents || []).filter(a => a.online);
  if (!online.length) {
    document.getElementById('footer-state').textContent = '[オフライン] サーバー待機中...';
    return;
  }
  const active = online.filter(a => a.state !== 'idle');
  if (active.length > 0) {
    const names = active.map(a => a.name).join(', ');
    document.getElementById('footer-state').textContent = `[稼働中] ${names} が作業中`;
  } else {
    document.getElementById('footer-state').textContent = `[休憩中] ${online.length}体のエージェントが待機中`;
  }
}

function formatRelative(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 5) return '\u305F\u3063\u305F\u4ECA';
  if (diff < 60) return Math.floor(diff) + '\u79D2\u524D';
  if (diff < 3600) return Math.floor(diff/60) + '\u5206\u524D';
  return Math.floor(diff/3600) + '\u6642\u9593\u524D';
}

// =============================================
// INIT
// =============================================
function init() {
  requestAnimationFrame(() => {
    buildRoom();
    requestAnimationFrame(gameLoop);

    fetchStatus();
    fetchActivity();
    fetchInstructions();
    setInterval(fetchStatus, 2000);
    setInterval(fetchActivity, 5000);
    setInterval(fetchInstructions, 5000);
  });

  // Instruction form handlers
  document.getElementById('instruction-send').addEventListener('click', sendInstruction);
  document.getElementById('instruction-text').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendInstruction();
    }
  });
}

window.addEventListener('resize', () => { if (roomBuffer) buildRoom(); });
if (document.fonts) {
  document.fonts.ready.then(() => { if (roomBuffer) buildRoom(); });
}

init();
