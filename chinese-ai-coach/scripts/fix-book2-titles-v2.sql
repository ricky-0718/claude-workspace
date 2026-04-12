-- 時代華語2冊目 第1〜4課の正規タイトルを設定
-- 出典: 正中書局『時代華語2』目次 (https://sites.google.com/clc.tku.edu.tw/modernchinese-official/第二冊)
-- 本番DBへの適用はRickyが手動で行う: sqlite3 /data/coach.db < scripts/fix-book2-titles-v2.sql

UPDATE lessons SET title_zh = '認識新朋友' WHERE id = 'book2-lesson01';
UPDATE lessons SET title_zh = '我得做家事' WHERE id = 'book2-lesson02';
UPDATE lessons SET title_zh = '我要租房子' WHERE id = 'book2-lesson03';
UPDATE lessons SET title_zh = '逛夜市真有趣' WHERE id = 'book2-lesson04';

-- 確認
SELECT id, lesson_number, title_zh FROM lessons WHERE book = 2 AND lesson_number <= 4 ORDER BY sort_order;
