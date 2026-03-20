/**
 * color-check.mjs — ウタゲLP背景色/文字色整合性検証
 *
 * 濃い背景色のセクションで文字色がデフォルト（黒/グレー）のまま
 * 読めなくなっている箇所を検出する。
 *
 * Usage: Playwrightの browser_evaluate で colorCheckScript の内容を実行
 */

export const colorCheckScript = `
const issues = [];

function parseRgb(str) {
  const m = str.match(/rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/);
  return m ? { r: +m[1], g: +m[2], b: +m[3] } : null;
}

function luminance(rgb) {
  return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
}

const allElements = document.querySelectorAll('section, [class*="section"], div[style*="background"]');
for (const sec of allElements) {
  const bg = parseRgb(window.getComputedStyle(sec).backgroundColor);
  if (!bg || luminance(bg) > 100) continue;

  const texts = sec.querySelectorAll('p, h1, h2, h3, h4, span, li, a');
  for (const t of texts) {
    const fg = parseRgb(window.getComputedStyle(t).color);
    if (!fg) continue;
    if (luminance(fg) > 100) continue;

    const text = t.textContent.trim().substring(0, 30);
    if (text.length < 2) continue;
    const rect = t.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    issues.push(text + ' | fg:rgb(' + fg.r + ',' + fg.g + ',' + fg.b + ') on bg:rgb(' + bg.r + ',' + bg.g + ',' + bg.b + ')');
  }
}
issues.length === 0 ? 'ALL OK - 色整合性検証合格' : 'ISSUES FOUND:\\n' + issues.join('\\n');
`;
