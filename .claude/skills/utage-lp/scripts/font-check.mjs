/**
 * font-check.mjs — ウタゲLPフォントサイズ検証スクリプト
 *
 * プレビューページのブラウザコンソールで実行するJavaScript。
 * 22px未満のテキスト要素を検出し、修正が必要な箇所をレポートする。
 *
 * Usage: Playwrightの browser_evaluate で fontCheckScript の内容を実行
 */

export const fontCheckScript = `
const allText = document.querySelectorAll('p, h1, h2, h3, h4, h5, li, span');
const small = [];
for (const el of allText) {
  const text = el.textContent.trim();
  if (text.length < 3) continue;
  const cs = window.getComputedStyle(el);
  const fs = parseFloat(cs.fontSize);
  if (fs >= 22 || fs <= 0) continue;
  if (cs.display === 'none' || cs.visibility === 'hidden') continue;
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) continue;
  const absY = Math.round(rect.top + window.scrollY);
  if (absY < 100) continue;
  small.push(text.substring(0, 40) + ' | ' + fs + 'px | y=' + absY);
}
small.length === 0 ? 'ALL OK - フォントサイズ検証合格' : 'ISSUES FOUND:\\n' + small.join('\\n');
`;

// rem → px 変換目安テーブル
export const remConversionTable = {
  '1rem':    { px: 16,   recommended: '1.75rem', recommendedPx: 28, usage: '本文テキスト' },
  '1.15rem': { px: 18.4, recommended: '2rem',    recommendedPx: 32, usage: '強調テキスト' },
  '1.2rem':  { px: 19.2, recommended: '2rem',    recommendedPx: 32, usage: '小見出し(H3)' },
  '1.3rem':  { px: 20.8, recommended: '2.2rem',  recommendedPx: 35, usage: '中見出し(H2)' },
  '1.5rem':  { px: 24,   recommended: '2.2rem',  recommendedPx: 35, usage: '大見出し(H2)' },
};
