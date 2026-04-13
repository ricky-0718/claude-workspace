-- Total rows updated: 8 (1 pinyin field + 7 examples_json fields)
-- Taiwan Mandarin corrections:
--   一 tone sandhi: yì before 1st/2nd/3rd tone; yí before 4th tone; yī standalone
--   不 tone sandhi: bú before 4th tone; bù before others
--   期 = qí (not qī) in compound words (Taiwan standard)

-- ─────────────────────────────────────────────────────────
-- main pinyin field corrections
-- ─────────────────────────────────────────────────────────

-- ID 59: 星期天 — 期 should be qí (Taiwan standard)
UPDATE vocabulary SET pinyin = 'xīng qí tiān' WHERE id = 59;

-- ─────────────────────────────────────────────────────────
-- examples_json corrections
-- ─────────────────────────────────────────────────────────

-- ID 29: 大家 — example 3: 一起 (一 before 起 3rd tone → yì)
UPDATE vocabulary SET examples_json = '[{"hanzi":"大家好！","pinyin":"dà jiā hǎo!","translation_ja":"みなさん、こんにちは！"},{"hanzi":"大家都很開心","pinyin":"dà jiā dōu hěn kāi xīn.","translation_ja":"みんなとても嬉しいです"},{"hanzi":"大家一起去看電影吧","pinyin":"dà jiā yì qǐ qù kàn diàn yǐng ba.","translation_ja":"みんなで映画を見に行きましょう"}]' WHERE id = 29;

-- ID 35: 喝 — example 3: 一杯 (一 before 杯 1st tone → yì)
UPDATE vocabulary SET examples_json = '[{"hanzi":"你喜歡喝什麼？","pinyin":"nǐ xǐ huān hē shén me?","translation_ja":"あなたは何を飲むのが好きですか？"},{"hanzi":"他每天喝兩杯咖啡","pinyin":"tā měi tiān hē liǎng bēi kā fēi.","translation_ja":"彼は毎日コーヒーを2杯飲みます"},{"hanzi":"我喝了一杯果汁","pinyin":"wǒ hē le yì bēi guǒ zhī.","translation_ja":"私はジュースを一杯飲みました"}]' WHERE id = 35;

-- ID 161: (一)點(兒) — all 3 examples: yīdiǎnr → yìdiǎnr (一 before 點 3rd tone → yì)
UPDATE vocabulary SET examples_json = '[{"hanzi":"我想喝一點兒果汁","pinyin":"Wǒ xiǎng hē yìdiǎnr guǒzhī.","translation_ja":"私はジュースを少し飲みたいです"},{"hanzi":"今天有一點兒冷","pinyin":"Jīntiān yǒu yìdiǎnr lěng.","translation_ja":"今日は少し寒いです"},{"hanzi":"請給我一點兒時間","pinyin":"Qǐng gěi wǒ yìdiǎnr shíjiān.","translation_ja":"少し時間をください"}]' WHERE id = 161;

-- ID 192: 千 — examples 1 and 3: yī qiān → yì qiān (一 before 千 1st tone → yì)
UPDATE vocabulary SET examples_json = '[{"hanzi":"這輛車一千元","pinyin":"Zhè liàng chē yì qiān yuán.","translation_ja":"この車は1000元です"},{"hanzi":"你知道這裡有多少人嗎？幾千吧！","pinyin":"Nǐ zhīdào zhèlǐ yǒu duōshǎo rén ma? Jǐ qiān ba!","translation_ja":"ここに何人いるか知っていますか？何千人でしょう！"},{"hanzi":"他花了一千元買了一部手機","pinyin":"Tā huā le yì qiān yuán, mǎi le yí  bù shǒu jī","translation_ja":"彼は1000元を使って携帯を買いました"}]' WHERE id = 192;

-- ID 214: 下午茶 — example 1: yī qǐ → yì qǐ (一 before 起 3rd tone → yì)
UPDATE vocabulary SET examples_json = '[{"hanzi":"我們下午一起去喝下午茶吧","pinyin":"wǒ men xià wǔ yì qǐ qù hē xià wǔ chá ba","translation_ja":"午後一緒にアフタヌーンティーを飲みに行きましょう"},{"hanzi":"這家餐廳的下午茶很有名","pinyin":"zhè jiā cān tīng de xià wǔ chá hěn yǒu míng","translation_ja":"このレストランのアフタヌーンティーは有名です"},{"hanzi":"你有空喝下午茶嗎？","pinyin":"nǐ yǒu kòng hē xià wǔ chá ma","translation_ja":"アフタヌーンティーを飲む時間がありますか？"}]' WHERE id = 214;

-- ID 276: 跑步 — example 2: spurious bú in 跑步對健康很好 (no 不 in sentence; 步 = bù)
UPDATE vocabulary SET examples_json = '[{"hanzi":"我每天早上跑步","pinyin":"wǒ měi tiān zǎo shàng pǎo bù","translation_ja":"私は毎朝ジョギングをします"},{"hanzi":"跑步對健康很好","pinyin":"pǎo bù duì jiàn kāng hěn hǎo","translation_ja":"ジョギングは健康にとても良いです"},{"hanzi":"他喜歡在公園跑步","pinyin":"tā xǐ huān zài gōng yuán pǎo bù","translation_ja":"彼は公園でジョギングをするのが好きです"}]' WHERE id = 276;

-- ID 585: 成績 — example 2: 期末 qī mò → qí mò (期 = qí in Taiwan)
UPDATE vocabulary SET examples_json = '[{"hanzi":"他的成績非常好","pinyin":"tā de chéng jì fēi cháng hǎo","translation_ja":"彼の成績は非常に良いです"},{"hanzi":"期末考試的成績什麼時候出來","pinyin":"qí mò kǎo shì de chéng jì shén me shí hòu chū lái","translation_ja":"期末試験の成績はいつ発表されますか"},{"hanzi":"學校的活動也會影響成績","pinyin":"xué xiào de huó dòng yě huì yǐng xiǎng chéng jì","translation_ja":"学校の活動も成績に影響します"}]' WHERE id = 585;
