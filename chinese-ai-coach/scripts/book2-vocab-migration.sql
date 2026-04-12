-- ============================================================
-- Book2 Vocabulary Migration
-- 時代華語 Book 2 — Lessons 01-04
-- Generated: 2026-04-12
-- ============================================================

-- Book2 Lessons 1-4: title updates
UPDATE lessons SET title_zh = '認識新朋友' WHERE id = 'book2-lesson01';
UPDATE lessons SET title_zh = '我得做家事' WHERE id = 'book2-lesson02';
UPDATE lessons SET title_zh = '我要租房子' WHERE id = 'book2-lesson03';
UPDATE lessons SET title_zh = '逛夜市' WHERE id = 'book2-lesson04';

-- Insert Book2 Lessons 02-13 if not exist
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson02', 2, 2, '我得做家事', 102, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson03', 2, 3, '我要租房子', 103, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson04', 2, 4, '逛夜市', 104, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson05', 2, 5, '歡迎到我家來玩', 105, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson06', 2, 6, '我們去KTV唱歌吧！', 106, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson07', 2, 7, '坐火車到花蓮去旅行', 107, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson08', 2, 8, '請給我貼紙，我要換史努比！', 108, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson09', 2, 9, '你怕考試嗎？', 109, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson10', 2, 10, '下課後一起去健身吧！', 110, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson11', 2, 11, '你想參加哪一個社團？', 111, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson12', 2, 12, '小職員? 大老闆?', 112, 0);
INSERT OR IGNORE INTO lessons (id, book, lesson_number, title_zh, sort_order, vocab_count) VALUES ('book2-lesson13', 2, 13, '我要買筆電', 113, 0);

-- ============================================================
-- Lesson 01: 認識新朋友 (45 words)
-- ============================================================
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 1, '起來', 'qǐ lái', '起きる、立ち上がる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 2, '背', 'bèi', '背負う、暗記する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 3, '疼', 'téng', '痛い、かわいがる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 4, '一下', 'yī xià', 'ちょっと', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 5, '還是', 'hái shì', 'それとも、やはり', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 6, '最好', 'zuì hǎo', 'できれば、最善', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 7, '或是', 'huò shì', 'あるいは', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 8, '藥房', 'yào fáng', '薬屋', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 9, '藥局', 'yào jú', '薬局', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 10, '不但', 'bù dàn', 'だけでなく', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 11, '溫柔', 'wēn róu', '優しい', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 12, '客氣', 'kè qi', '遠慮する、丁寧な', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 13, '愉快', 'yú kuài', '愉快な', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 14, '安全', 'ān quán', '安全', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 15, '舞會', 'wǔ huì', 'ダンスパーティー', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 16, '當然', 'dāng rán', 'もちろん', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 17, '約會', 'yuē huì', 'デート', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 18, '害怕', 'hài pà', '怖い、恐れる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 19, '敢', 'gǎn', '敢えて〜する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 20, '剛好', 'gāng hǎo', 'ちょうど', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 21, '動物園', 'dòng wù yuán', '動物園', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 22, '開玩笑', 'kāi wán xiào', '冗談を言う', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 23, '完', 'wán', '終わる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 24, '摸', 'mō', '触る', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 25, '好像', 'hǎo xiàng', '〜のようだ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 26, '怎麼了', 'zěn me le', 'どうしたの', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 27, '一個人', 'yī gè rén', '一人で', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 28, '怎麼辦', 'zěn me bàn', 'どうすればいい', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 29, '害羞', 'hài xiū', '恥ずかしがり屋', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 30, '大學生', 'dà xué shēng', '大学生', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 31, '小學生', 'xiǎo xué shēng', '小学生', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 32, '熟', 'shú', '熟れた、慣れた', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 33, '危險', 'wēi xiǎn', '危険', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 34, '一直', 'yī zhí', 'ずっと', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 35, '不久', 'bù jiǔ', 'まもなく', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 36, '心', 'xīn', '心', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 37, '跳', 'tiào', '跳ぶ、鼓動する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 38, '個性', 'gè xìng', '個性', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 39, '趕快', 'gǎn kuài', '急いで', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 40, '結束', 'jié shù', '終わる、終わり', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 41, '散步', 'sàn bù', '散歩する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 42, '拉', 'lā', '引っ張る', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 43, '幸運', 'xìng yùn', '幸運', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 44, '雖然', 'suī rán', '〜だけれど', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson01', 45, '腳', 'jiǎo', '足', '[]');

-- ============================================================
-- Lesson 02: 我得做家事 (58 words)
-- ============================================================
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 1, '得', 'děi', '〜しなければならない', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 2, '家事', 'jiā shì', '家事', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 3, '開學', 'kāi xué', '新学期が始まる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 4, '球賽', 'qiú sài', '球技試合', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 5, '把', 'bǎ', '〜を（処置文）', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 6, '擦', 'cā', '拭く', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 7, '碗筷', 'wǎn kuài', '茶碗と箸', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 8, '筷子', 'kuài zi', '箸', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 9, '刀叉', 'dāo chā', 'ナイフとフォーク', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 10, '刀(子)', 'dāo (zi)', 'ナイフ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 11, '叉(子)', 'chā (zi)', 'フォーク', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 12, '湯匙', 'tāng chí', 'スプーン', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 13, '要', 'yào', '〜する必要がある', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 14, '客人', 'kè rén', 'お客さん', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 15, '乾', 'gān', '乾く、乾いた', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 16, '丟', 'diū', '捨てる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 17, '著急', 'zháo jí', '焦る', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 18, '髒', 'zāng', '汚い', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 19, '叫', 'jiào', '呼ぶ、命じる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 20, '打掃', 'dǎ sǎo', '掃除する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 21, '一點/一點兒', 'yī diǎn / yī diǎn r', '少し', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 22, '應該', 'yīng gāi', '〜すべきだ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 23, '掃地', 'sǎo dì', '床を掃く', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 24, '地', 'dì', '床、地面', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 25, '暑假', 'shǔ jià', '夏休み', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 26, '才', 'cái', 'やっと、〜してから初めて', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 27, '亂', 'luàn', '散らかった、乱れた', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 28, '念書', 'niàn shū', '勉強する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 29, '念/唸', 'niàn', '読む、唱える', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 30, '小說', 'xiǎo shuō', '小説', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 31, '可惜', 'kě xí', '残念だ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 32, '有用', 'yǒu yòng', '役に立つ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 33, '擦乾', 'cā gān', '拭いて乾かす', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 34, '沒辦法', 'méi bàn fǎ', '仕方がない', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 35, '哈哈哈', 'hā hā hā', 'ははは（笑い声）', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 36, '出門', 'chū mén', '外出する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 37, '看見', 'kàn jiàn', '見える、見かける', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 38, '袋子', 'dài zi', '袋', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 39, '發現', 'fā xiàn', '発見する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 40, '垃圾', 'lè sè', 'ごみ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 41, '下', 'xià', '下、降りる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 42, '上', 'shàng', '上、上る', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 43, '急', 'jí', '急ぐ、焦る', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 44, '回去', 'huí qù', '帰る', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 45, '空氣', 'kōng qì', '空気', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 46, '味道', 'wèi dào', '匂い、味', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 47, '臭', 'chòu', '臭い', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 48, '到處', 'dào chù', 'あちこち', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 49, '蟲子', 'chóng zi', '虫', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 50, '全部', 'quán bù', 'すべて', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 51, '倒', 'dào', '注ぐ、倒す', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 52, '才', 'cái', 'たった〜しか、〜してから', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 53, '鄰居', 'lín jū', '隣人', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 54, '不用', 'bù yòng', '〜しなくてよい', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 55, '牆', 'qiáng', '壁', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 56, '垃圾桶', 'lè sè tǒng', 'ごみ箱', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 57, '小時候', 'xiǎo shí hòu', '子供の頃', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson02', 58, '牆上', 'qiáng shàng', '壁の上', '[]');

-- ============================================================
-- Lesson 03: 我要租房子 (65 words)
-- ============================================================
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 1, '租', 'zū', '借りる、貸す', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 2, '公寓', 'gōng yù', 'アパート', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 3, '房東', 'fáng dōng', '大家さん', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 4, '出來', 'chū lái', '出てくる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 5, '陪', 'péi', '付き合う、同伴する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 6, '層', 'céng', '階（フロア）', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 7, '出租', 'chū zū', '貸し出す', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 8, '上去', 'shàng qù', '上がっていく', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 9, '臥室/臥房', 'wò shì / wò fáng', '寝室', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 10, '書桌', 'shū zhuō', '勉強机', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 11, '書架', 'shū jià', '本棚', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 12, '書房', 'shū fáng', '書斎', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 13, '衣櫃', 'yī guì', 'クローゼット', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 14, '掛', 'guà', '掛ける', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 15, '冰箱', 'bīng xiāng', '冷蔵庫', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 16, '洗衣機', 'xǐ yī jī', '洗濯機', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 17, '那邊', 'nà biān', 'あちら', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 18, '看起來', 'kàn qǐ lái', '見た感じ〜だ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 19, '起來', 'qǐ lái', '〜に見える（補語）', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 20, '便利商店', 'biàn lì shāng diàn', 'コンビニ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 21, '便利', 'biàn lì', '便利な', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 22, '替', 'tì', '〜の代わりに', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 23, '裝', 'zhuāng', '取り付ける、入れる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 24, '費用', 'fèi yòng', '費用', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 25, '聽起來', 'tīng qǐ lái', '聞いた感じ〜だ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 26, '房租', 'fáng zū', '家賃', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 27, '包括', 'bāo kuò', '含む', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 28, '水費', 'shuǐ fèi', '水道代', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 29, '電費', 'diàn fèi', '電気代', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 30, '電', 'diàn', '電気', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 31, '押金', 'yā jīn', '敷金', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 32, '討論', 'tǎo lùn', '話し合う', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 33, '一會兒', 'yī huì r', 'しばらく', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 34, '這邊', 'zhè biān', 'こちら', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 35, '獎學金', 'jiǎng xué jīn', '奨学金', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 36, '剩', 'shèng', '残る', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 37, '滿意', 'mǎn yì', '満足する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 38, '留學生', 'liú xué shēng', '留学生', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 39, '留學', 'liú xué', '留学する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 40, '好幾', 'hǎo jǐ', 'いくつも', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 41, '願意', 'yuàn yì', '〜したい、喜んで〜する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 42, '簽約', 'qiān yuē', '契約を結ぶ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 43, '過來', 'guò lái', '来る（こちらへ）', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 44, '過去', 'guò qù', '行く（あちらへ）', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 45, '護照', 'hù zhào', 'パスポート', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 46, '鑰匙', 'yào shi', '鍵', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 47, '搬', 'bān', '引越す、運ぶ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 48, '室友', 'shì yǒu', 'ルームメイト', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 49, '總是', 'zǒng shì', 'いつも', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 50, '半夜', 'bàn yè', '真夜中', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 51, '燈', 'dēng', '電灯', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 52, '吵', 'chǎo', 'うるさい、口喧嘩する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 53, '除了', 'chú le', '〜を除いて、〜の他に', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 54, '習慣', 'xí guàn', '慣れる、習慣', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 55, '還', 'hái', 'まだ、さらに', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 56, '弄', 'nòng', 'する、やる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 57, '順利', 'shùn lì', 'スムーズに、順調に', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 58, '資料', 'zī liào', '資料', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 59, '剩下', 'shèng xià', '残り', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 60, '國外', 'guó wài', '海外', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 61, '生活', 'shēng huó', '生活', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 62, '收', 'shōu', '受け取る、片付ける', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 63, '搬家', 'bān jiā', '引越しする', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 64, '沒想到', 'méi xiǎng dào', '思いがけず', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson03', 65, '租屋網站', 'zū wū wǎng zhàn', '賃貸サイト', '[]');

-- ============================================================
-- Lesson 04: 逛夜市 (70 words)
-- ============================================================
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 1, '逛', 'guàng', 'ぶらぶら歩く', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 2, '忽然', 'hū rán', '突然', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 3, '小吃', 'xiǎo chī', '軽食、屋台料理', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 4, '出口', 'chū kǒu', '出口', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 5, '剛', 'gāng', 'ちょうど〜したところ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 6, '姓', 'xìng', '苗字は〜', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 7, '就', 'jiù', 'すぐに、〜ならば', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 8, '各', 'gè', 'それぞれ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 9, '殺價', 'shā jià', '値切る', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 10, '殺', 'shā', '殺す、削る', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 11, '招牌', 'zhāo pái', '看板', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 12, '遊客', 'yóu kè', '観光客', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 13, '豆腐', 'dòu fu', '豆腐', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 14, '炸', 'zhá', '揚げる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 15, '雞排', 'jī pái', '鶏の唐揚げ（厚切り）', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 16, '香', 'xiāng', '香ばしい、良い香り', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 17, '習慣', 'xí guàn', '慣れる、習慣', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 18, '糖', 'táng', '砂糖', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 19, '選', 'xuǎn', '選ぶ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 20, '無', 'wú', 'ない（書き言葉）', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 21, '加', 'jiā', '加える', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 22, '加上', 'jiā shàng', '加えると', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 23, '加起來', 'jiā qǐ lái', '合計すると', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 24, '冰塊/冰塊兒', 'bīng kuài / bīng kuài r', '氷', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 25, '推薦', 'tuī jiàn', 'おすすめする', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 26, '辣', 'là', '辛い', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 27, '酸', 'suān', '酸っぱい', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 28, '鹹', 'xián', 'しょっぱい', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 29, '苦', 'kǔ', '苦い', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 30, '聞', 'wén', '匂いを嗅ぐ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 31, '討厭', 'tǎo yàn', '嫌いだ、うんざりする', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 32, '其實', 'qí shí', '実は', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 33, '試', 'shì', '試す', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 34, '臭豆腐', 'chòu dòu fu', '臭豆腐', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 35, '蚵仔煎', 'é zǎi jiān', 'カキのオムレツ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 36, '特別是', 'tè bié shì', '特に', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 37, '文化', 'wén huà', '文化', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 38, '一般', 'yī bān', '一般的に', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 39, '大概', 'dà gài', 'だいたい', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 40, '吃喝玩樂', 'chī hē wán lè', '食飲遊楽', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 41, '擠', 'jǐ', '混雑した、押す', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 42, '不得了', 'bù dé liǎo', 'たまらない、すごい', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 43, '旅遊', 'lǚ yóu', '旅行する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 44, '越', 'yuè', 'だんだん〜になる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 45, '逛街', 'guàng jiē', '街をぶらつく', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 46, '了解/瞭解', 'liǎo jiě', '理解する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 47, '做法/作法', 'zuò fǎ', 'やり方、作り方', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 48, '價錢', 'jià qián', '値段', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 49, '起', 'qǐ', '〜から（起点）', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 50, '烤', 'kǎo', '焼く、あぶる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 51, '魷魚', 'yóu yú', 'イカ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 52, '芒果', 'máng guǒ', 'マンゴー', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 53, '冰', 'bīng', 'かき氷、氷', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 54, '西瓜', 'xī guā', 'スイカ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 55, '生意', 'shēng yi', '商売', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 56, '吃飽', 'chī bǎo', '満腹になる', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 57, '飽', 'bǎo', '満腹な', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 58, '無聊', 'wú liáo', '暇つぶし、つまらない', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 59, '講價', 'jiǎng jià', '値段交渉する', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 60, '寺廟', 'sì miào', '寺院、廟', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 61, '比如(說)', 'bǐ rú (shuō)', '例えば', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 62, '廟', 'miào', '廟', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 63, '值得', 'zhí de', '〜する価値がある', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 64, '鹹酥雞', 'xián sū jī', '台湾唐揚げ', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 65, '滷肉飯', 'lǔ ròu fàn', '魯肉飯', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 66, '豆花', 'dòu huā', '豆花（台湾スイーツ）', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 67, '芒果冰', 'máng guǒ bīng', 'マンゴーかき氷', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 68, '龍山寺', 'lóng shān sì', '龍山寺', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 69, '華西街', 'huá xī jiē', '華西街', '[]');
INSERT OR REPLACE INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES ('book2-lesson04', 70, '極了', 'jí le', '非常に〜だ', '[]');

-- ============================================================
-- Update vocab_count for each lesson
-- ============================================================
UPDATE lessons SET vocab_count = (SELECT COUNT(*) FROM vocabulary WHERE lesson_id = 'book2-lesson01') WHERE id = 'book2-lesson01';
UPDATE lessons SET vocab_count = (SELECT COUNT(*) FROM vocabulary WHERE lesson_id = 'book2-lesson02') WHERE id = 'book2-lesson02';
UPDATE lessons SET vocab_count = (SELECT COUNT(*) FROM vocabulary WHERE lesson_id = 'book2-lesson03') WHERE id = 'book2-lesson03';
UPDATE lessons SET vocab_count = (SELECT COUNT(*) FROM vocabulary WHERE lesson_id = 'book2-lesson04') WHERE id = 'book2-lesson04';
