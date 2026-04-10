-- ===================================================
-- 台湾スピーク 旅行フレーズパック (book=3)
-- 100フレーズ × 4レッスン
-- 繁體字 / Taiwan Mandarin / 台湾固有語彙
-- ===================================================

-- ===== lessons =====
INSERT INTO lessons (id, book, lesson_number, title_zh, title_ja, vocab_count, sort_order) VALUES
('travel-airport',    3, 1, '機場與交通',   '空港・交通',         25, 100),
('travel-food',       3, 2, '夜市與美食',   '夜市・グルメ',       25, 101),
('travel-hotel',      3, 3, '住宿與購物',   '宿泊・買い物',       25, 102),
('travel-emergency',  3, 4, '緊急狀況',     '緊急・困ったとき',   25, 103);

-- ===================================================
-- Lesson 1: travel-airport — 機場與交通
-- ===================================================
INSERT INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES
('travel-airport', 1,
 '請問捷運站怎麼走？',
 'qǐng wèn jié yùn zhàn zěn me zǒu?',
 'MRT駅はどう行けばいいですか？',
 '[{"hanzi":"請問，最近的捷運站在哪裡？","pinyin":"qǐng wèn, zuì jìn de jié yùn zhàn zài nǎ lǐ?","translation_ja":"すみません、一番近いMRT駅はどこですか？"}]'),

('travel-airport', 2,
 '我要去台北車站。',
 'wǒ yào qù tái běi chē zhàn.',
 '台北駅に行きたいのですが。',
 '[{"hanzi":"請問到台北車站要多久？","pinyin":"qǐng wèn dào tái běi chē zhàn yào duō jiǔ?","translation_ja":"台北駅までどのくらいかかりますか？"}]'),

('travel-airport', 3,
 '悠遊卡在哪裡買？',
 'yōu yóu kǎ zài nǎ lǐ mǎi?',
 '悠遊カード（IC カード）はどこで買えますか？',
 '[{"hanzi":"悠遊卡可以在便利商店買到。","pinyin":"yōu yóu kǎ kě yǐ zài biàn lì shāng diàn mǎi dào.","translation_ja":"悠遊カードはコンビニで買えますよ。"}]'),

('travel-airport', 4,
 '請幫我叫計程車。',
 'qǐng bāng wǒ jiào jì chéng chē.',
 'タクシーを呼んでもらえますか？',
 '[{"hanzi":"我想叫一台計程車去市區。","pinyin":"wǒ xiǎng jiào yī tái jì chéng chē qù shì qū.","translation_ja":"市内までタクシーに乗りたいのですが。"}]'),

('travel-airport', 5,
 '到市區要多少錢？',
 'dào shì qū yào duō shǎo qián?',
 '市内までいくらかかりますか？',
 '[{"hanzi":"到台北101大概要多少錢？","pinyin":"dào tái běi yī líng yī dà gài yào duō shǎo qián?","translation_ja":"台北101までだいたいいくらですか？"}]'),

('travel-airport', 6,
 '這班捷運幾點最後一班？',
 'zhè bān jié yùn jǐ diǎn zuì hòu yī bān?',
 'このMRTの終電は何時ですか？',
 '[{"hanzi":"最後一班捷運是幾點？","pinyin":"zuì hòu yī bān jié yùn shì jǐ diǎn?","translation_ja":"終電は何時ですか？"}]'),

('travel-airport', 7,
 '請問要在哪裡轉車？',
 'qǐng wèn yào zài nǎ lǐ zhuǎn chē?',
 'どこで乗り換えればいいですか？',
 '[{"hanzi":"在哪一站可以換乘紅線？","pinyin":"zài nǎ yī zhàn kě yǐ huàn chéng hóng xiàn?","translation_ja":"どの駅で赤線に乗り換えられますか？"}]'),

('travel-airport', 8,
 '一張票多少錢？',
 'yī zhāng piào duō shǎo qián?',
 'チケット一枚はいくらですか？',
 '[{"hanzi":"到西門站一張票多少錢？","pinyin":"dào xī mén zhàn yī zhāng piào duō shǎo qián?","translation_ja":"西門駅まで一枚いくらですか？"}]'),

('travel-airport', 9,
 '行李可以放在這裡嗎？',
 'xíng lǐ kě yǐ fàng zài zhè lǐ ma?',
 'ここに荷物を置いてもいいですか？',
 '[{"hanzi":"請問有行李寄放服務嗎？","pinyin":"qǐng wèn yǒu xíng lǐ jì fàng fú wù ma?","translation_ja":"荷物の一時預かりサービスはありますか？"}]'),

('travel-airport', 10,
 '請問廁所在哪裡？',
 'qǐng wèn cè suǒ zài nǎ lǐ?',
 'トイレはどこですか？',
 '[{"hanzi":"這附近有廁所嗎？","pinyin":"zhè fù jìn yǒu cè suǒ ma?","translation_ja":"この辺りにトイレはありますか？"}]'),

('travel-airport', 11,
 '請給我一張收據。',
 'qǐng gěi wǒ yī zhāng shōu jù.',
 '領収書をください。',
 '[{"hanzi":"可以開收據嗎？","pinyin":"kě yǐ kāi shōu jù ma?","translation_ja":"領収書を発行していただけますか？"}]'),

('travel-airport', 12,
 '我要去桃園國際機場。',
 'wǒ yào qù táo yuán guó jì jī chǎng.',
 '桃園国際空港に行きたいのですが。',
 '[{"hanzi":"請問搭哪班機場捷運可以到桃園機場？","pinyin":"qǐng wèn dā nǎ bān jī chǎng jié yùn kě yǐ dào táo yuán jī chǎng?","translation_ja":"桃園空港に行くにはどのエアポートMRTに乗ればいいですか？"}]'),

('travel-airport', 13,
 '公車幾號去夜市？',
 'gōng chē jǐ hào qù yè shì?',
 '夜市に行くバスは何番ですか？',
 '[{"hanzi":"請問去士林夜市要搭幾號公車？","pinyin":"qǐng wèn qù shì lín yè shì yào dā jǐ hào gōng chē?","translation_ja":"士林夜市に行くには何番のバスに乗ればいいですか？"}]'),

('travel-airport', 14,
 '請在這裡停車。',
 'qǐng zài zhè lǐ tíng chē.',
 'ここで止めてください。',
 '[{"hanzi":"麻煩在前面路口停一下。","pinyin":"má fán zài qián miàn lù kǒu tíng yī xià.","translation_ja":"すみません、前の交差点で止めてください。"}]'),

('travel-airport', 15,
 '我搭錯車了。',
 'wǒ dā cuò chē le.',
 '乗り間違えてしまいました。',
 '[{"hanzi":"我好像搭錯方向了。","pinyin":"wǒ hǎo xiàng dā cuò fāng xiàng le.","translation_ja":"方向を乗り間違えたみたいです。"}]'),

('travel-airport', 16,
 '這裡可以刷悠遊卡嗎？',
 'zhè lǐ kě yǐ shuā yōu yóu kǎ ma?',
 'ここで悠遊カードを使えますか？',
 '[{"hanzi":"公車上可以用悠遊卡付款嗎？","pinyin":"gōng chē shàng kě yǐ yòng yōu yóu kǎ fù kuǎn ma?","translation_ja":"バスの中で悠遊カードで支払えますか？"}]'),

('travel-airport', 17,
 '請問這班車有到故宮嗎？',
 'qǐng wèn zhè bān chē yǒu dào gù gōng ma?',
 'このバスは故宮博物院に行きますか？',
 '[{"hanzi":"請問去故宮要在哪裡下車？","pinyin":"qǐng wèn qù gù gōng yào zài nǎ lǐ xià chē?","translation_ja":"故宮に行くにはどこで降りればいいですか？"}]'),

('travel-airport', 18,
 '下一班車幾點來？',
 'xià yī bān chē jǐ diǎn lái?',
 '次のバス（電車）は何時に来ますか？',
 '[{"hanzi":"下一班捷運幾分鐘後來？","pinyin":"xià yī bān jié yùn jǐ fēn zhōng hòu lái?","translation_ja":"次のMRTは何分後に来ますか？"}]'),

('travel-airport', 19,
 '請問這附近有停車場嗎？',
 'qǐng wèn zhè fù jìn yǒu tíng chē chǎng ma?',
 'この辺りに駐車場はありますか？',
 '[{"hanzi":"停車費一小時多少錢？","pinyin":"tíng chē fèi yī xiǎo shí duō shǎo qián?","translation_ja":"駐車料金は1時間いくらですか？"}]'),

('travel-airport', 20,
 '我要租腳踏車。',
 'wǒ yào zū jiǎo tà chē.',
 '自転車をレンタルしたいのですが。',
 '[{"hanzi":"請問YouBike站在哪裡？","pinyin":"qǐng wèn YouBike zhàn zài nǎ lǐ?","translation_ja":"YouBikeステーションはどこですか？"}]'),

('travel-airport', 21,
 '請問往九份怎麼去？',
 'qǐng wèn wǎng jiǔ fèn zěn me qù?',
 '九份へはどうやって行けばいいですか？',
 '[{"hanzi":"從台北去九份大概要多久？","pinyin":"cóng tái běi qù jiǔ fèn dà gài yào duō jiǔ?","translation_ja":"台北から九份まで大体どのくらいかかりますか？"}]'),

('travel-airport', 22,
 '我在哪裡可以換錢？',
 'wǒ zài nǎ lǐ kě yǐ huàn qián?',
 'どこで両替できますか？',
 '[{"hanzi":"這裡的匯率怎麼樣？","pinyin":"zhè lǐ de huì lǜ zěn me yàng?","translation_ja":"ここの両替レートはどうですか？"}]'),

('travel-airport', 23,
 '可以幫我拍照嗎？',
 'kě yǐ bāng wǒ pāi zhào ma?',
 '写真を撮っていただけますか？',
 '[{"hanzi":"麻煩幫我們拍一張合照。","pinyin":"má fán bāng wǒ men pāi yī zhāng hé zhào.","translation_ja":"すみません、一緒に写真を撮っていただけますか？"}]'),

('travel-airport', 24,
 '請問觀光服務中心在哪裡？',
 'qǐng wèn guān guāng fú wù zhōng xīn zài nǎ lǐ?',
 '観光案内所はどこですか？',
 '[{"hanzi":"有免費的地圖可以拿嗎？","pinyin":"yǒu miǎn fèi de dì tú kě yǐ ná ma?","translation_ja":"無料の地図はありますか？"}]'),

('travel-airport', 25,
 '請問去淡水怎麼坐？',
 'qǐng wèn qù dàn shuǐ zěn me zuò?',
 '淡水へはどうやって乗れば行けますか？',
 '[{"hanzi":"淡水線的終點站是淡水嗎？","pinyin":"dàn shuǐ xiàn de zhōng diǎn zhàn shì dàn shuǐ ma?","translation_ja":"淡水線の終点は淡水ですか？"}]');

-- ===================================================
-- Lesson 2: travel-food — 夜市與美食
-- ===================================================
INSERT INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES
('travel-food', 1,
 '請問這個多少錢？',
 'qǐng wèn zhè ge duō shǎo qián?',
 'これはいくらですか？',
 '[{"hanzi":"這一份多少錢？","pinyin":"zhè yī fèn duō shǎo qián?","translation_ja":"これ一つはいくらですか？"}]'),

('travel-food', 2,
 '我要一份臭豆腐。',
 'wǒ yào yī fèn chòu dòu fu.',
 '臭豆腐を一つください。',
 '[{"hanzi":"臭豆腐有幾種口味？","pinyin":"chòu dòu fu yǒu jǐ zhǒng kǒu wèi?","translation_ja":"臭豆腐は何種類の味がありますか？"}]'),

('travel-food', 3,
 '不要太辣。',
 'bú yào tài là.',
 'あまり辛くしないでください。',
 '[{"hanzi":"可以不要加辣嗎？","pinyin":"kě yǐ bú yào jiā là ma?","translation_ja":"唐辛子を入れないでもらえますか？"}]'),

('travel-food', 4,
 '可以刷卡嗎？',
 'kě yǐ shuā kǎ ma?',
 'カードで支払えますか？',
 '[{"hanzi":"這裡接受信用卡嗎？","pinyin":"zhè lǐ jiē shòu xìn yòng kǎ ma?","translation_ja":"クレジットカードは使えますか？"}]'),

('travel-food', 5,
 '這個怎麼吃？',
 'zhè ge zěn me chī?',
 'これはどうやって食べるのですか？',
 '[{"hanzi":"珍珠奶茶怎麼喝比較好？","pinyin":"zhēn zhū nǎi chá zěn me hē bǐ jiào hǎo?","translation_ja":"タピオカミルクティーはどうやって飲むのがベストですか？"}]'),

('travel-food', 6,
 '請給我一杯珍珠奶茶。',
 'qǐng gěi wǒ yī bēi zhēn zhū nǎi chá.',
 'タピオカミルクティーを一杯ください。',
 '[{"hanzi":"珍珠奶茶要幾分糖？","pinyin":"zhēn zhū nǎi chá yào jǐ fēn táng?","translation_ja":"タピオカミルクティーは何割の甘さにしますか？"}]'),

('travel-food', 7,
 '我對花生過敏。',
 'wǒ duì huā shēng guò mǐn.',
 'ピーナッツアレルギーがあります。',
 '[{"hanzi":"這道菜裡面有花生嗎？","pinyin":"zhè dào cài lǐ miàn yǒu huā shēng ma?","translation_ja":"この料理の中にピーナッツは入っていますか？"}]'),

('travel-food', 8,
 '幫我打包，謝謝。',
 'bāng wǒ dǎ bāo, xiè xie.',
 '持ち帰りにしてください、ありがとうございます。',
 '[{"hanzi":"可以幫我外帶嗎？","pinyin":"kě yǐ bāng wǒ wài dài ma?","translation_ja":"テイクアウトにできますか？"}]'),

('travel-food', 9,
 '請問有素食的選擇嗎？',
 'qǐng wèn yǒu sù shí de xuǎn zé ma?',
 'ベジタリアン向けのメニューはありますか？',
 '[{"hanzi":"我吃素，請問有什麼可以吃？","pinyin":"wǒ chī sù, qǐng wèn yǒu shén me kě yǐ chī?","translation_ja":"私はベジタリアンなのですが、何が食べられますか？"}]'),

('travel-food', 10,
 '推薦什麼好吃的？',
 'tuī jiàn shén me hǎo chī de?',
 'おすすめは何ですか？',
 '[{"hanzi":"這裡最有名的是什麼？","pinyin":"zhè lǐ zuì yǒu míng de shì shén me?","translation_ja":"ここで一番有名なのは何ですか？"}]'),

('travel-food', 11,
 '再來一碗，謝謝。',
 'zài lái yī wǎn, xiè xie.',
 'もう一杯（一碗）ください。',
 '[{"hanzi":"可以再加麵嗎？","pinyin":"kě yǐ zài jiā miàn ma?","translation_ja":"麺を追加できますか？"}]'),

('travel-food', 12,
 '我要一個便當。',
 'wǒ yào yī ge biàn dāng.',
 '弁当を一つください。',
 '[{"hanzi":"今天的便當有什麼口味？","pinyin":"jīn tiān de biàn dāng yǒu shén me kǒu wèi?","translation_ja":"今日の弁当はどんな種類がありますか？"}]'),

('travel-food', 13,
 '請問幾點打烊？',
 'qǐng wèn jǐ diǎn dǎ yàng?',
 '何時に閉まりますか？',
 '[{"hanzi":"你們今天幾點關門？","pinyin":"nǐ men jīn tiān jǐ diǎn guān mén?","translation_ja":"今日は何時に閉店しますか？"}]'),

('travel-food', 14,
 '這是我第一次吃這個。',
 'zhè shì wǒ dì yī cì chī zhè ge.',
 'これを食べるのは初めてです。',
 '[{"hanzi":"這個味道很特別，我很喜歡。","pinyin":"zhè ge wèi dào hěn tè bié, wǒ hěn xǐ huān.","translation_ja":"この味は独特で、とても気に入りました。"}]'),

('travel-food', 15,
 '可以少放一點鹽嗎？',
 'kě yǐ shǎo fàng yī diǎn yán ma?',
 '塩を少なめにしてもらえますか？',
 '[{"hanzi":"可以少油少鹽嗎？","pinyin":"kě yǐ shǎo yóu shǎo yán ma?","translation_ja":"油と塩を少なめにしてもらえますか？"}]'),

('travel-food', 16,
 '這個是什麼？',
 'zhè ge shì shén me?',
 'これは何ですか？',
 '[{"hanzi":"這個料理有什麼特色？","pinyin":"zhè ge liào lǐ yǒu shén me tè sè?","translation_ja":"この料理の特徴は何ですか？"}]'),

('travel-food', 17,
 '滷肉飯一份多少錢？',
 'lǔ ròu fàn yī fèn duō shǎo qián?',
 '魯肉飯（ルーローハン）一皿はいくらですか？',
 '[{"hanzi":"滷肉飯是台灣的代表小吃。","pinyin":"lǔ ròu fàn shì tái wān de dài biǎo xiǎo chī.","translation_ja":"魯肉飯は台湾を代表する屋台料理です。"}]'),

('travel-food', 18,
 '牛肉麵的湯頭很棒。',
 'niú ròu miàn de tāng tóu hěn bàng.',
 '牛肉麺のスープは最高です。',
 '[{"hanzi":"這碗牛肉麵真的很好吃。","pinyin":"zhè wǎn niú ròu miàn zhēn de hěn hǎo chī.","translation_ja":"この牛肉麺は本当においしいです。"}]'),

('travel-food', 19,
 '請問可以加辣嗎？',
 'qǐng wèn kě yǐ jiā là ma?',
 '辛みを追加できますか？',
 '[{"hanzi":"我喜歡吃辣，可以加很多辣嗎？","pinyin":"wǒ xǐ huān chī là, kě yǐ jiā hěn duō là ma?","translation_ja":"辛いのが好きなので、辛みをたくさん入れてもらえますか？"}]'),

('travel-food', 20,
 '請問有菜單嗎？',
 'qǐng wèn yǒu cài dān ma?',
 'メニューはありますか？',
 '[{"hanzi":"請給我看菜單。","pinyin":"qǐng gěi wǒ kàn cài dān.","translation_ja":"メニューを見せていただけますか？"}]'),

('travel-food', 21,
 '這個味道好極了！',
 'zhè ge wèi dào hǎo jí le!',
 'この味は最高です！',
 '[{"hanzi":"真的很好吃，謝謝你。","pinyin":"zhēn de hěn hǎo chī, xiè xie nǐ.","translation_ja":"本当においしかったです、ありがとう。"}]'),

('travel-food', 22,
 '請問這裡可以內用嗎？',
 'qǐng wèn zhè lǐ kě yǐ nèi yòng ma?',
 'ここで食べていけますか？（店内飲食可能ですか？）',
 '[{"hanzi":"我想內用，有位子嗎？","pinyin":"wǒ xiǎng nèi yòng, yǒu wèi zi ma?","translation_ja":"店内で食べたいのですが、空席はありますか？"}]'),

('travel-food', 23,
 '我要買十個小籠包。',
 'wǒ yào mǎi shí ge xiǎo lóng bāo.',
 '小籠包を10個買いたいのですが。',
 '[{"hanzi":"小籠包要等多久？","pinyin":"xiǎo lóng bāo yào děng duō jiǔ?","translation_ja":"小籠包はどのくらい待ちますか？"}]'),

('travel-food', 24,
 '找我三十塊，謝謝。',
 'zhǎo wǒ sān shí kuài, xiè xie.',
 '30元のお釣りをください。',
 '[{"hanzi":"我付一百塊，請找錢。","pinyin":"wǒ fù yī bǎi kuài, qǐng zhǎo qián.","translation_ja":"100元払います、お釣りをください。"}]'),

('travel-food', 25,
 '我吃飽了，非常好吃。',
 'wǒ chī bǎo le, fēi cháng hǎo chī.',
 'お腹がいっぱいです、とてもおいしかったです。',
 '[{"hanzi":"下次還想再來吃。","pinyin":"xià cì hái xiǎng zài lái chī.","translation_ja":"また次回も食べに来たいです。"}]');

-- ===================================================
-- Lesson 3: travel-hotel — 住宿與購物
-- ===================================================
INSERT INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES
('travel-hotel', 1,
 '我有預約，姓名是⋯⋯',
 'wǒ yǒu yù yuē, xìng míng shì……',
 '予約があります、名前は……です。',
 '[{"hanzi":"我預約了一間雙人房。","pinyin":"wǒ yù yuē le yī jiān shuāng rén fáng.","translation_ja":"ダブルルームを一室予約しました。"}]'),

('travel-hotel', 2,
 '請問幾點可以入住？',
 'qǐng wèn jǐ diǎn kě yǐ rù zhù?',
 'チェックインは何時からですか？',
 '[{"hanzi":"我可以早一點辦理入住嗎？","pinyin":"wǒ kě yǐ zǎo yī diǎn bàn lǐ rù zhù ma?","translation_ja":"早めにチェックインできますか？"}]'),

('travel-hotel', 3,
 '請問有Wi-Fi嗎？',
 'qǐng wèn yǒu Wi-Fi ma?',
 'Wi-Fiはありますか？',
 '[{"hanzi":"Wi-Fi的密碼是什麼？","pinyin":"Wi-Fi de mì mǎ shì shén me?","translation_ja":"Wi-Fiのパスワードは何ですか？"}]'),

('travel-hotel', 4,
 '房間的冷氣壞了。',
 'fáng jiān de lěng qì huài le.',
 '部屋のエアコンが壊れています。',
 '[{"hanzi":"我的房間冷氣不冷，可以派人來看看嗎？","pinyin":"wǒ de fáng jiān lěng qì bù lěng, kě yǐ pài rén lái kàn kàn ma?","translation_ja":"部屋のエアコンが効かないのですが、見に来てもらえますか？"}]'),

('travel-hotel', 5,
 '可以換一間房間嗎？',
 'kě yǐ huàn yī jiān fáng jiān ma?',
 '部屋を替えてもらえますか？',
 '[{"hanzi":"這間房間有點吵，可以換嗎？","pinyin":"zhè jiān fáng jiān yǒu diǎn chǎo, kě yǐ huàn ma?","translation_ja":"この部屋は少しうるさいので、替えていただけますか？"}]'),

('travel-hotel', 6,
 '請問幾點退房？',
 'qǐng wèn jǐ diǎn tuì fáng?',
 'チェックアウトは何時ですか？',
 '[{"hanzi":"我可以延遲退房嗎？","pinyin":"wǒ kě yǐ yán chí tuì fáng ma?","translation_ja":"チェックアウトを遅らせることはできますか？"}]'),

('travel-hotel', 7,
 '請幫我叫一下Morning Call。',
 'qǐng bāng wǒ jiào yī xià Morning Call.',
 'モーニングコールをお願いできますか？',
 '[{"hanzi":"請在明天早上七點叫我起床。","pinyin":"qǐng zài míng tiān zǎo shàng qī diǎn jiào wǒ qǐ chuáng.","translation_ja":"明朝7時にモーニングコールをお願いします。"}]'),

('travel-hotel', 8,
 '請再給我一條毛巾。',
 'qǐng zài gěi wǒ yī tiáo máo jīn.',
 'タオルをもう一枚いただけますか？',
 '[{"hanzi":"請多給我一套盥洗用品。","pinyin":"qǐng duō gěi wǒ yī tào guàn xǐ yòng pǐn.","translation_ja":"アメニティセットをもう一つください。"}]'),

('travel-hotel', 9,
 '我要在便利商店買東西。',
 'wǒ yào zài biàn lì shāng diàn mǎi dōng xi.',
 'コンビニで買い物をしたいです。',
 '[{"hanzi":"附近有全家或7-11嗎？","pinyin":"fù jìn yǒu quán jiā huò 7-11 ma?","translation_ja":"近くにファミリーマートか711はありますか？"}]'),

('travel-hotel', 10,
 '請問這個可以試穿嗎？',
 'qǐng wèn zhè ge kě yǐ shì chuān ma?',
 'これを試着できますか？',
 '[{"hanzi":"有沒有大一號的？","pinyin":"yǒu méi yǒu dà yī hào de?","translation_ja":"一つ大きいサイズはありますか？"}]'),

('travel-hotel', 11,
 '這個有沒有別的顏色？',
 'zhè ge yǒu méi yǒu bié de yán sè?',
 'これに別の色はありますか？',
 '[{"hanzi":"有沒有紅色的款式？","pinyin":"yǒu méi yǒu hóng sè de kuǎn shì?","translation_ja":"赤いデザインはありますか？"}]'),

('travel-hotel', 12,
 '可以打折嗎？',
 'kě yǐ dǎ zhé ma?',
 '割引してもらえますか？',
 '[{"hanzi":"今天有什麼優惠嗎？","pinyin":"jīn tiān yǒu shén me yōu huì ma?","translation_ja":"今日は何かお得なサービスはありますか？"}]'),

('travel-hotel', 13,
 '這個我不需要袋子。',
 'zhè ge wǒ bù xū yào dài zi.',
 '袋は要りません。',
 '[{"hanzi":"不用袋子，謝謝。","pinyin":"bú yòng dài zi, xiè xie.","translation_ja":"袋は結構です、ありがとうございます。"}]'),

('travel-hotel', 14,
 '請問這附近有藥妝店嗎？',
 'qǐng wèn zhè fù jìn yǒu yào zhuāng diàn ma?',
 'この辺りにドラッグストアはありますか？',
 '[{"hanzi":"Watson''s在哪裡？","pinyin":"Watson''s zài nǎ lǐ?","translation_ja":"ワトソンズはどこですか？"}]'),

('travel-hotel', 15,
 '我要退貨。',
 'wǒ yào tuì huò.',
 '返品したいのですが。',
 '[{"hanzi":"這個壞了，可以換一個嗎？","pinyin":"zhè ge huài le, kě yǐ huàn yī ge ma?","translation_ja":"これが壊れているのですが、交換してもらえますか？"}]'),

('travel-hotel', 16,
 '請問這裡可以寄送到日本嗎？',
 'qǐng wèn zhè lǐ kě yǐ jì sòng dào rì běn ma?',
 'ここから日本に発送できますか？',
 '[{"hanzi":"國際快遞需要幾天？","pinyin":"guó jì kuài dì xū yào jǐ tiān?","translation_ja":"国際便は何日かかりますか？"}]'),

('travel-hotel', 17,
 '我的房卡不能用。',
 'wǒ de fáng kǎ bù néng yòng.',
 'ルームキーが使えません。',
 '[{"hanzi":"我的房卡需要重新設定。","pinyin":"wǒ de fáng kǎ xū yào chóng xīn shè dìng.","translation_ja":"ルームキーを再設定する必要があります。"}]'),

('travel-hotel', 18,
 '請問有保險箱嗎？',
 'qǐng wèn yǒu bǎo xiǎn xiāng ma?',
 '金庫（セーフティボックス）はありますか？',
 '[{"hanzi":"我想把護照放在保險箱裡。","pinyin":"wǒ xiǎng bǎ hù zhào fàng zài bǎo xiǎn xiāng lǐ.","translation_ja":"パスポートを金庫に入れたいのですが。"}]'),

('travel-hotel', 19,
 '請問早餐幾點開始？',
 'qǐng wèn zǎo cān jǐ diǎn kāi shǐ?',
 '朝食は何時から始まりますか？',
 '[{"hanzi":"早餐包含在房費裡嗎？","pinyin":"zǎo cān bāo hán zài fáng fèi lǐ ma?","translation_ja":"朝食は宿泊料金に含まれていますか？"}]'),

('travel-hotel', 20,
 '附近有超市嗎？',
 'fù jìn yǒu chāo shì ma?',
 '近くにスーパーマーケットはありますか？',
 '[{"hanzi":"全聯福利中心在哪裡？","pinyin":"quán lián fú lì zhōng xīn zài nǎ lǐ?","translation_ja":"全聯（スーパー）はどこですか？"}]'),

('travel-hotel', 21,
 '請問有洗衣機可以用嗎？',
 'qǐng wèn yǒu xǐ yī jī kě yǐ yòng ma?',
 '洗濯機は使えますか？',
 '[{"hanzi":"自助洗衣機在哪一層？","pinyin":"zì zhù xǐ yī jī zài nǎ yī céng?","translation_ja":"コインランドリーは何階にありますか？"}]'),

('travel-hotel', 22,
 '請問可以幫我保管行李嗎？',
 'qǐng wèn kě yǐ bāng wǒ bǎo guǎn xíng lǐ ma?',
 '荷物を預かっていただけますか？',
 '[{"hanzi":"退房後可以寄放行李到下午嗎？","pinyin":"tuì fáng hòu kě yǐ jì fàng xíng lǐ dào xià wǔ ma?","translation_ja":"チェックアウト後も午後まで荷物を預かってもらえますか？"}]'),

('travel-hotel', 23,
 '這個多少錢？',
 'zhè ge duō shǎo qián?',
 'これはいくらですか？',
 '[{"hanzi":"這款商品有打折嗎？","pinyin":"zhè kuǎn shāng pǐn yǒu dǎ zhé ma?","translation_ja":"この商品は割引されていますか？"}]'),

('travel-hotel', 24,
 '請給我發票。',
 'qǐng gěi wǒ fā piào.',
 'レシートをください（統一発票）。',
 '[{"hanzi":"可以給我電子發票嗎？","pinyin":"kě yǐ gěi wǒ diàn zǐ fā piào ma?","translation_ja":"電子レシートにしていただけますか？"}]'),

('travel-hotel', 25,
 '請問有免費的停車位嗎？',
 'qǐng wèn yǒu miǎn fèi de tíng chē wèi ma?',
 '無料の駐車スペースはありますか？',
 '[{"hanzi":"飯店有提供停車服務嗎？","pinyin":"fàn diàn yǒu tí gōng tíng chē fú wù ma?","translation_ja":"ホテルは駐車サービスを提供していますか？"}]');

-- ===================================================
-- Lesson 4: travel-emergency — 緊急狀況
-- ===================================================
INSERT INTO vocabulary (lesson_id, sort_order, hanzi, pinyin, translation_ja, examples_json) VALUES
('travel-emergency', 1,
 '請幫我叫救護車！',
 'qǐng bāng wǒ jiào jiù hù chē!',
 '救急車を呼んでください！',
 '[{"hanzi":"有人受傷了，請快點叫救護車！","pinyin":"yǒu rén shòu shāng le, qǐng kuài diǎn jiào jiù hù chē!","translation_ja":"怪我人がいます、すぐに救急車を呼んでください！"}]'),

('travel-emergency', 2,
 '我的護照不見了。',
 'wǒ de hù zhào bú jiàn le.',
 'パスポートがなくなりました。',
 '[{"hanzi":"我把護照弄丟了，怎麼辦？","pinyin":"wǒ bǎ hù zhào nòng diū le, zěn me bàn?","translation_ja":"パスポートをなくしてしまいました、どうすればいいですか？"}]'),

('travel-emergency', 3,
 '我迷路了。',
 'wǒ mí lù le.',
 '道に迷ってしまいました。',
 '[{"hanzi":"我不知道怎麼回飯店。","pinyin":"wǒ bù zhī dào zěn me huí fàn diàn.","translation_ja":"ホテルに戻る方法がわかりません。"}]'),

('travel-emergency', 4,
 '我不舒服。',
 'wǒ bù shū fu.',
 '体の具合が悪いです。',
 '[{"hanzi":"我肚子很痛，請幫我看一下。","pinyin":"wǒ dù zi hěn tòng, qǐng bāng wǒ kàn yī xià.","translation_ja":"お腹がとても痛いので、診てもらえますか？"}]'),

('travel-emergency', 5,
 '請幫我叫警察！',
 'qǐng bāng wǒ jiào jǐng chá!',
 '警察を呼んでください！',
 '[{"hanzi":"有人偷了我的錢包，請叫警察！","pinyin":"yǒu rén tōu le wǒ de qián bāo, qǐng jiào jǐng chá!","translation_ja":"財布が盗まれました、警察を呼んでください！"}]'),

('travel-emergency', 6,
 '請問最近的醫院在哪裡？',
 'qǐng wèn zuì jìn de yī yuàn zài nǎ lǐ?',
 '一番近い病院はどこですか？',
 '[{"hanzi":"附近有診所嗎？","pinyin":"fù jìn yǒu zhěn suǒ ma?","translation_ja":"近くにクリニックはありますか？"}]'),

('travel-emergency', 7,
 '我的錢包被偷了。',
 'wǒ de qián bāo bèi tōu le.',
 '財布を盗まれました。',
 '[{"hanzi":"我的手機也不見了。","pinyin":"wǒ de shǒu jī yě bú jiàn le.","translation_ja":"携帯電話もなくなりました。"}]'),

('travel-emergency', 8,
 '請問日本在台灣的辦事處在哪裡？',
 'qǐng wèn rì běn zài tái wān de bàn shì chù zài nǎ lǐ?',
 '台湾にある日本の事務所（台北駐日経済文化代表処）はどこですか？',
 '[{"hanzi":"我需要去日本台灣交流協會辦理補發護照。","pinyin":"wǒ xū yào qù rì běn tái wān jiāo liú xié huì bàn lǐ bǔ fā hù zhào.","translation_ja":"日本台湾交流協会でパスポートの再発行手続きをする必要があります。"}]'),

('travel-emergency', 9,
 '我的頭很暈。',
 'wǒ de tóu hěn yūn.',
 '頭がひどくぼんやりします（めまいがします）。',
 '[{"hanzi":"我可能中暑了。","pinyin":"wǒ kě néng zhòng shǔ le.","translation_ja":"熱中症にかかったかもしれません。"}]'),

('travel-emergency', 10,
 '請幫我找翻譯。',
 'qǐng bāng wǒ zhǎo fān yì.',
 '通訳を探してもらえますか？',
 '[{"hanzi":"有人會說日文嗎？","pinyin":"yǒu rén huì shuō rì wén ma?","translation_ja":"日本語を話せる人はいますか？"}]'),

('travel-emergency', 11,
 '請問這附近有藥局嗎？',
 'qǐng wèn zhè fù jìn yǒu yào jú ma?',
 'この辺りに薬局はありますか？',
 '[{"hanzi":"我需要買止痛藥。","pinyin":"wǒ xū yào mǎi zhǐ tòng yào.","translation_ja":"鎮痛剤を買う必要があります。"}]'),

('travel-emergency', 12,
 '我對這個藥物過敏。',
 'wǒ duì zhè ge yào wù guò mǐn.',
 'この薬に対してアレルギーがあります。',
 '[{"hanzi":"我有藥物過敏，請告訴醫生。","pinyin":"wǒ yǒu yào wù guò mǐn, qǐng gào sù yī shēng.","translation_ja":"薬のアレルギーがあります、医師に伝えてください。"}]'),

('travel-emergency', 13,
 '請問警察局在哪裡？',
 'qǐng wèn jǐng chá jú zài nǎ lǐ?',
 '警察署はどこですか？',
 '[{"hanzi":"我需要去警察局報案。","pinyin":"wǒ xū yào qù jǐng chá jú bào àn.","translation_ja":"警察署に被害届を出しに行く必要があります。"}]'),

('travel-emergency', 14,
 '我需要報失竊。',
 'wǒ xū yào bào shī qiè.',
 '盗難届を出す必要があります。',
 '[{"hanzi":"請給我一份報案證明。","pinyin":"qǐng gěi wǒ yī fèn bào àn zhèng míng.","translation_ja":"被害届の証明書をください。"}]'),

('travel-emergency', 15,
 '我的行李不見了。',
 'wǒ de xíng lǐ bú jiàn le.',
 '荷物がなくなりました。',
 '[{"hanzi":"我在機場的行李找不到了。","pinyin":"wǒ zài jī chǎng de xíng lǐ zhǎo bú dào le.","translation_ja":"空港で荷物が見つかりません。"}]'),

('travel-emergency', 16,
 '請幫我打電話給飯店。',
 'qǐng bāng wǒ dǎ diàn huà gěi fàn diàn.',
 'ホテルに電話してもらえますか？',
 '[{"hanzi":"可以幫我聯絡我的飯店嗎？","pinyin":"kě yǐ bāng wǒ lián luò wǒ de fàn diàn ma?","translation_ja":"私のホテルに連絡してもらえますか？"}]'),

('travel-emergency', 17,
 '我需要緊急就醫。',
 'wǒ xū yào jǐn jí jiù yī.',
 '緊急で受診する必要があります。',
 '[{"hanzi":"請帶我去急診室。","pinyin":"qǐng dài wǒ qù jí zhěn shì.","translation_ja":"救急外来に連れて行ってください。"}]'),

('travel-emergency', 18,
 '請問附近有ATM嗎？',
 'qǐng wèn fù jìn yǒu ATM ma?',
 '近くにATMはありますか？',
 '[{"hanzi":"這個ATM可以刷外國卡嗎？","pinyin":"zhè ge ATM kě yǐ shuā wài guó kǎ ma?","translation_ja":"このATMは外国のカードを使えますか？"}]'),

('travel-emergency', 19,
 '我的信用卡被吞了。',
 'wǒ de xìn yòng kǎ bèi tūn le.',
 'クレジットカードが飲み込まれてしまいました。',
 '[{"hanzi":"ATM把我的卡吞了，怎麼辦？","pinyin":"ATM bǎ wǒ de kǎ tūn le, zěn me bàn?","translation_ja":"ATMにカードを飲み込まれてしまいました、どうすればいいですか？"}]'),

('travel-emergency', 20,
 '我需要找人幫我翻譯。',
 'wǒ xū yào zhǎo rén bāng wǒ fān yì.',
 '翻訳を手伝ってもらえる人を探しています。',
 '[{"hanzi":"這裡有人會講日文嗎？","pinyin":"zhè lǐ yǒu rén huì jiǎng rì wén ma?","translation_ja":"ここに日本語を話せる人はいますか？"}]'),

('travel-emergency', 21,
 '我發燒了。',
 'wǒ fā shāo le.',
 '熱があります。',
 '[{"hanzi":"我燒到三十九度，需要就醫。","pinyin":"wǒ shāo dào sān shí jiǔ dù, xū yào jiù yī.","translation_ja":"39度の熱があります、受診が必要です。"}]'),

('travel-emergency', 22,
 '請問台灣的急救電話是幾號？',
 'qǐng wèn tái wān de jí jiù diàn huà shì jǐ hào?',
 '台湾の緊急連絡先（救急）は何番ですか？',
 '[{"hanzi":"台灣的警察電話是110，救護車是119。","pinyin":"tái wān de jǐng chá diàn huà shì yī yī líng, jiù hù chē shì yī yī jiǔ.","translation_ja":"台湾の警察は110番、救急車は119番です。"}]'),

('travel-emergency', 23,
 '請幫我通知家人。',
 'qǐng bāng wǒ tōng zhī jiā rén.',
 '家族に連絡してもらえますか？',
 '[{"hanzi":"這是我的緊急聯絡人電話。","pinyin":"zhè shì wǒ de jǐn jí lián luò rén diàn huà.","translation_ja":"これが私の緊急連絡先の電話番号です。"}]'),

('travel-emergency', 24,
 '我有買旅遊保險。',
 'wǒ yǒu mǎi lǚ yóu bǎo xiǎn.',
 '海外旅行保険に加入しています。',
 '[{"hanzi":"我需要保險理賠的相關文件。","pinyin":"wǒ xū yào bǎo xiǎn lǐ péi de xiāng guān wén jiàn.","translation_ja":"保険の請求に必要な書類が必要です。"}]'),

('travel-emergency', 25,
 '請讓我坐下來休息一下。',
 'qǐng ràng wǒ zuò xià lái xiū xi yī xià.',
 '少し座って休ませてもらえますか？',
 '[{"hanzi":"我感覺有點不舒服，可以先坐下嗎？","pinyin":"wǒ gǎn jué yǒu diǎn bù shū fu, kě yǐ xiān zuò xià ma?","translation_ja":"少し体の具合が悪いので、先に座ってもいいですか？"}]');
