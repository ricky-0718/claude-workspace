#!/usr/bin/env node
/**
 * quality-check.mjs — LINE返信品質チェック（utage-checkスキル用）
 *
 * Claudeが返信案を作成した後に、5原則に沿った自己チェックを促すテンプレートを出力する。
 * Claudeはこのチェックリストを読んで、返信案の品質を検証する。
 *
 * Usage:
 *   node quality-check.mjs "返信案テキスト"
 *   echo "返信案テキスト" | node quality-check.mjs
 */

import { createInterface } from 'readline';

const principles = [
  {
    id: 1,
    name: 'ファクトチェック',
    question: '面談や提案内容と矛盾する情報がないか？',
    checkPoints: [
      '面談で伝えた料金・スケジュールと矛盾していないか',
      '提案済みのプランと異なる内容を言っていないか',
      '存在しないサービスや特典を記載していないか',
    ],
  },
  {
    id: 2,
    name: '文脈読解',
    question: '相手の直近メッセージの意図を正しく読み取っているか？',
    checkPoints: [
      '相手が聞いていることに直接答えているか',
      '言外の不安や期待を汲み取っているか',
      '相手のトーン（ビジネス/カジュアル）に合わせているか',
    ],
  },
  {
    id: 3,
    name: '情報量',
    question: '必要な情報が過不足なく含まれているか？',
    checkPoints: [
      '聞かれたことに全て答えているか',
      '不要な情報で長くなっていないか',
      '次のアクションが明確か',
    ],
  },
  {
    id: 4,
    name: '個別適合',
    question: 'テンプレ的でなく、相手の状況に合わせた内容か？',
    checkPoints: [
      '相手の名前・状況・志望に触れているか',
      '汎用的なフレーズだけで構成されていないか',
      '面談で出た具体的な話題に言及しているか',
    ],
  },
  {
    id: 5,
    name: '既出確認',
    question: '前回送った内容を繰り返していないか？',
    checkPoints: [
      '直前のメッセージと同じ情報を再送していないか',
      '同じリンクやURLを重複送信していないか',
      '新しい価値のある情報が含まれているか',
    ],
  },
];

function generateChecklist(replyText) {
  const lines = [
    '# LINE返信 品質チェック結果',
    '',
    `> 対象テキスト（${replyText.length}文字）:`,
    `> ${replyText.substring(0, 100)}${replyText.length > 100 ? '...' : ''}`,
    '',
  ];

  for (const p of principles) {
    lines.push(`## ${p.id}. ${p.name}`);
    lines.push(`**${p.question}**`);
    lines.push('');
    for (const cp of p.checkPoints) {
      lines.push(`- [ ] ${cp}`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('全項目チェック後、問題があれば返信案を修正してからユーザーに提示すること。');

  return lines.join('\n');
}

// メイン処理
const args = process.argv.slice(2);

if (args.length > 0) {
  // 引数から取得
  console.log(generateChecklist(args.join(' ')));
} else {
  // stdinから取得
  const rl = createInterface({ input: process.stdin });
  const inputLines = [];
  rl.on('line', (line) => inputLines.push(line));
  rl.on('close', () => {
    const text = inputLines.join('\n');
    if (text.trim()) {
      console.log(generateChecklist(text));
    } else {
      console.error('Usage: node quality-check.mjs "返信案テキスト"');
      process.exit(1);
    }
  });
}
