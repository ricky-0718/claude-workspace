-- 旅行パック 文法・自然さ修正
-- 本番DBへの適用はRickyが手動で行う: sqlite3 /data/coach.db < scripts/fix-travel-pack.sql

-- 修正1: travel-airport #6 — 「這班捷運幾點最後一班」→「捷運最後一班是幾點」
-- 理由: 「這班」と「一班」が重複して文として不自然
UPDATE vocabulary SET
  hanzi = '捷運最後一班是幾點？',
  pinyin = 'jié yùn zuì hòu yī bān shì jǐ diǎn?',
  translation_ja = 'MRTの終電は何時ですか？',
  examples_json = '[{"hanzi":"最後一班公車是幾點？","pinyin":"zuì hòu yī bān gōng chē shì jǐ diǎn?","translation_ja":"最終バスは何時ですか？"}]'
WHERE lesson_id = 'travel-airport' AND sort_order = 6;

-- 修正2: travel-airport #25 — 「怎麼坐」→「怎麼搭」
-- 理由: 台湾マンダリンでは交通手段に「搭」を使うのが自然（「坐」も通じるが「搭」の方がネイティブ的）
UPDATE vocabulary SET
  hanzi = '請問去淡水怎麼搭？',
  pinyin = 'qǐng wèn qù dàn shuǐ zěn me dā?',
  translation_ja = '淡水へはどうやって行けますか？'
WHERE lesson_id = 'travel-airport' AND sort_order = 25;

-- 修正3: travel-food #3 examples — 「可以不要加辣嗎」→「可以不加辣嗎」
-- 理由: 「不要」を「可以...嗎」構文内で使うのは文法的に冗長。「不加」がシンプルで正確
UPDATE vocabulary SET
  examples_json = '[{"hanzi":"可以不加辣嗎？","pinyin":"kě yǐ bù jiā là ma?","translation_ja":"辛みを入れないでもらえますか？"}]'
WHERE lesson_id = 'travel-food' AND sort_order = 3;

-- 修正4: travel-emergency #8 — 機関名を正しく修正
-- 理由: 「日本在台灣的辦事處」は曖昧。日本人が台湾で行くのは「日本台灣交流協會」
UPDATE vocabulary SET
  hanzi = '請問日本台灣交流協會在哪裡？',
  pinyin = 'qǐng wèn rì běn tái wān jiāo liú xié huì zài nǎ lǐ?',
  translation_ja = '日本台湾交流協会はどこですか？'
WHERE lesson_id = 'travel-emergency' AND sort_order = 8;

-- 修正5: travel-emergency #9 — 「我的頭很暈」→「我頭很暈」
-- 理由: 身体部位に所有格「的」は不要（中国語の慣用表現）
UPDATE vocabulary SET
  hanzi = '我頭很暈。',
  pinyin = 'wǒ tóu hěn yūn.',
  translation_ja = '頭がくらくらします（めまいがします）。'
WHERE lesson_id = 'travel-emergency' AND sort_order = 9;

-- 確認クエリ
SELECT lesson_id, sort_order, hanzi FROM vocabulary
WHERE (lesson_id = 'travel-airport' AND sort_order IN (6, 25))
   OR (lesson_id = 'travel-food' AND sort_order = 3)
   OR (lesson_id = 'travel-emergency' AND sort_order IN (8, 9));
