-- Curriculum data export
DELETE FROM lessons;
DELETE FROM vocabulary;
DELETE FROM grammar_points;

INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson01',1,1,'新同學','',44,1);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson02',1,2,'你幾點去學校？','',56,2);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson03',1,3,'買生日禮物','',50,3);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson04',1,4,'你要咖啡還是茶？','',57,4);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson05',1,5,'我的錢包在哪裡？','',54,5);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson06',1,6,'週末去打網球吧！','',57,6);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson07',1,7,'怎麼到飯店去？','',52,7);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson08',1,8,'這條裙子真好看','',54,8);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson09',1,9,'我的中文課','',46,9);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson10',1,10,'最近感冒的人很多','',48,10);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson11',1,11,'你們是怎麼認識的？','',44,11);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson12',1,12,'你想做什麼工作？','',45,12);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson13',1,13,'用手機上網','',47,13);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson14',1,14,'跨年活動','',48,14);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson15',1,15,'十二生肖','',46,15);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book1-lesson16',1,16,'在台灣旅行','',56,16);
INSERT INTO lessons (id,book,lesson_number,title_zh,title_ja,vocab_count,sort_order) VALUES ('book2-lesson01',2,1,'“一下 yí xià” で“ちょっと○○する”をマスターしよう！','',0,101);
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',1,'新','xīn','新しい','[{"hanzi":"這是我新的朋友","pinyin":"zhè shì wǒ xīn de péng yǒu.","translation_ja":"これは私の新しい友達です"},{"hanzi":"他換了新的手機","pinyin":"tā huàn le xīn de shǒu jī.","translation_ja":"彼は新しい携帯電話に買い替えました"},{"hanzi":"我們有新的老師","pinyin":"wǒ men yǒu xīn de lǎo shī.","translation_ja":"私たちには新しい先生がいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',2,'同學','tóng xué','クラスメイト','[{"hanzi":"我是你的同學","pinyin":"wǒ shì nǐ de tóng xué.","translation_ja":"私はあなたのクラスメイトです"},{"hanzi":"他是我的同學","pinyin":"tā shì wǒ de tóng xué.","translation_ja":"彼は私のクラスメイトです"},{"hanzi":"同學們在教室裡","pinyin":"tóng xué men zài jiào shì lǐ.","translation_ja":"クラスメイトたちは教室にいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',3,'她','tā','彼女','[{"hanzi":"她是我的姐姐","pinyin":"tā shì wǒ de jiě jie.","translation_ja":"彼女は私の姉です"},{"hanzi":"她很喜歡跳舞","pinyin":"tā hěn xǐ huān tiào wǔ.","translation_ja":"彼女は踊るのがとても好きです"},{"hanzi":"她的頭髮很長","pinyin":"tā de tóu fǎ hěn cháng.","translation_ja":"彼女の髪はとても長いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',4,'誰','shéi','誰','[{"hanzi":"這是誰的書？","pinyin":"zhè shì shéi de shū?","translation_ja":"これは誰の本ですか？"},{"hanzi":"你知道他是誰嗎？","pinyin":"nǐ zhī dào tā shì shéi ma?","translation_ja":"彼が誰か知っていますか？"},{"hanzi":"誰想一起去看電影？","pinyin":"shéi xiǎng yì qǐ qù kàn diàn yǐng?","translation_ja":"誰が一緒に映画を見に行きたいですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',5,'叫','jiào','呼ぶ','[{"hanzi":"我叫李明","pinyin":"wǒ jiào lǐ míng.","translation_ja":"私は李明と言います"},{"hanzi":"他的名字叫王小明","pinyin":"tā de míng zì jiào wáng xiǎo míng.","translation_ja":"彼の名前は王小明です"},{"hanzi":"她叫做小華","pinyin":"tā jiào zuò xiǎo huá.","translation_ja":"彼女は小華と呼ばれています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',6,'姓','xìng','姓','[{"hanzi":"我姓張","pinyin":"wǒ xìng zhāng.","translation_ja":"私の名字は張です"},{"hanzi":"他姓王","pinyin":"tā xìng wáng.","translation_ja":"彼の名字は王です"},{"hanzi":"她姓李","pinyin":"tā xìng lǐ.","translation_ja":"彼女の名字は李です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',7,'很','hěn','とても','[{"hanzi":"他很高","pinyin":"tā hěn gāo.","translation_ja":"彼は背がとても高いです"},{"hanzi":"她很聰明","pinyin":"tā hěn cōng míng.","translation_ja":"彼女はとても賢いです"},{"hanzi":"我很喜歡這本書","pinyin":"wǒ hěn xǐ huān zhè běn shū.","translation_ja":"私はこの本がとても好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',8,'可愛','kě ài','可愛い','[{"hanzi":"這只小狗很可愛","pinyin":"zhè zhī xiǎo gǒu hěn kě ài.","translation_ja":"この子犬はとても可愛いです"},{"hanzi":"她穿的衣服很可愛","pinyin":"tā chuān de yī fú hěn kě ài.","translation_ja":"彼女の服はとても可愛いです"},{"hanzi":"那個小孩很可愛","pinyin":"nà ge xiǎo hái hěn kě ài.","translation_ja":"あの子供はとても可愛いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',9,'哪','nǎ','どの','[{"hanzi":"你去哪裡？","pinyin":"nǐ qù nǎ lǐ?","translation_ja":"あなたはどこへ行きますか？"},{"hanzi":"這是哪裡的地圖？","pinyin":"zhè shì nǎ lǐ de dì tú?","translation_ja":"これはどこの地図ですか？"},{"hanzi":"你知道哪裡有好吃的嗎？","pinyin":"nǐ zhī dào nǎ lǐ yǒu hǎo chī de ma?","translation_ja":"どこに美味しいものがあるか知っていますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',10,'國','guó','国','[{"hanzi":"你是哪個國家的？","pinyin":"nǐ shì nǎ ge guó jiā de?","translation_ja":"あなたはどの国の人ですか？"},{"hanzi":"我來自日本國","pinyin":"wǒ lái zì rì běn guó.","translation_ja":"私は日本出身です"},{"hanzi":"他來自中國","pinyin":"tā lái zì zhōng guó.","translation_ja":"彼は中国出身です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',11,'妳','nǐ','あなた（女性向け）','[{"hanzi":"妳好！","pinyin":"nǐ hǎo!","translation_ja":"こんにちは！（女性に向けて）"},{"hanzi":"妳的中文很好","pinyin":"nǐ de zhōng wén hěn hǎo.","translation_ja":"あなたの中国語は上手です（女性に向けて）"},{"hanzi":"妳喜歡吃什麼？","pinyin":"nǐ xǐ huān chī shén me?","translation_ja":"あなたは何を食べるのが好きですか？（女性に向けて）"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',12,'知道','zhī dào','知っている','[{"hanzi":"我知道這個問題","pinyin":"wǒ zhī dào zhè ge wèn tí.","translation_ja":"私はこの問題を知っています"},{"hanzi":"妳知道他在哪裡嗎？","pinyin":"nǐ zhī dào tā zài nǎ lǐ ma?","translation_ja":"あなたは彼がどこにいるか知っていますか？（女性に向けて）"},{"hanzi":"我不知道這個答案","pinyin":"wǒ bù zhī dào zhè ge dá àn.","translation_ja":"私はこの答えを知りません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',13,'嗎','ma','～ですか？','[{"hanzi":"你要喝水嗎？","pinyin":"nǐ yào hē shuǐ ma?","translation_ja":"あなたは水を飲みたいですか？"},{"hanzi":"他是老師嗎？","pinyin":"tā shì lǎo shī ma?","translation_ja":"彼は先生ですか？"},{"hanzi":"這是你的書嗎？","pinyin":"zhè shì nǐ de shū ma?","translation_ja":"これはあなたの本ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',14,'日本','rì běn','日本','[{"hanzi":"日本的食物很好吃","pinyin":"rì běn de shí wù hěn hǎo chī.","translation_ja":"日本の食べ物はとても美味しいです"},{"hanzi":"我想去日本旅遊","pinyin":"wǒ xiǎng qù rì běn lǚ yóu.","translation_ja":"私は日本に旅行したいです"},{"hanzi":"他來自日本","pinyin":"tā lái zì rì běn.","translation_ja":"彼は日本出身です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',15,'臺灣 / 台灣','tái wān','台湾','[{"hanzi":"我來自臺灣","pinyin":"wǒ lái zì tái wān.","translation_ja":"私は台湾出身です"},{"hanzi":"臺灣有很多美麗的風景","pinyin":"tái wān yǒu hěn duō měi lì de fēng jǐng.","translation_ja":"台湾にはたくさんの美しい風景があります"},{"hanzi":"你去過臺灣嗎？","pinyin":"nǐ qù guò tái wān ma?","translation_ja":"あなたは台湾に行ったことがありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',16,'中國','zhōng guó','中国','[{"hanzi":"中國的文化很古老","pinyin":"zhōng guó de wén huà hěn gǔ lǎo.","translation_ja":"中国の文化はとても古いです"},{"hanzi":"我想學習中國語言","pinyin":"wǒ xiǎng xué xí zhōng guó yǔ yán.","translation_ja":"私は中国語を学びたいです"},{"hanzi":"他來自中國","pinyin":"tā lái zì zhōng guó.","translation_ja":"彼は中国出身です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',17,'美國','měi guó','アメリカ','[{"hanzi":"美國是很大的國家","pinyin":"měi guó shì hěn dà de guó jiā.","translation_ja":"アメリカはとても大きな国です"},{"hanzi":"我想去美國留學","pinyin":"wǒ xiǎng qù měi guó liú xué.","translation_ja":"私はアメリカに留学したいです"},{"hanzi":"他住在美國","pinyin":"tā zhù zài měi guó.","translation_ja":"彼はアメリカに住んでいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',18,'英國','yīng guó','イギリス','[{"hanzi":"英國的天氣很冷","pinyin":"yīng guó de tiān qì hěn lěng.","translation_ja":"イギリスの天気はとても寒いです"},{"hanzi":"我去過英國","pinyin":"wǒ qù guò yīng guó.","translation_ja":"私はイギリスに行ったことがあります"},{"hanzi":"英國的文化很有趣","pinyin":"yīng guó de wén huà hěn yǒu qù.","translation_ja":"イギリスの文化はとても面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',19,'漂亮','piào liàng','綺麗','[{"hanzi":"她的衣服很漂亮","pinyin":"tā de yī fú hěn piào liang.","translation_ja":"彼女の服はとても綺麗です"},{"hanzi":"這個地方很漂亮","pinyin":"zhè ge dì fāng hěn piào liang.","translation_ja":"この場所はとても綺麗です"},{"hanzi":"你覺得這張照片漂亮嗎？","pinyin":"nǐ jué de zhè zhāng zhào piàn piào liang ma?","translation_ja":"この写真は綺麗だと思いますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',20,'什麼','shén me','何','[{"hanzi":"你喜歡吃什麼？","pinyin":"nǐ xǐ huān chī shén me?","translation_ja":"あなたは何を食べるのが好きですか？"},{"hanzi":"這是什麼？","pinyin":"zhè shì shén me?","translation_ja":"これは何ですか？"},{"hanzi":"你在說什麼？","pinyin":"nǐ zài shuō shén me?","translation_ja":"あなたは何を話していますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',21,'名字','míng zì','名前','[{"hanzi":"你的名字是什麼？","pinyin":"nǐ de míng zì shì shén me?","translation_ja":"あなたの名前は何ですか？"},{"hanzi":"我的名字叫小明","pinyin":"wǒ de míng zì jiào xiǎo míng.","translation_ja":"私の名前は小明です"},{"hanzi":"他記得我的名字","pinyin":"tā jì dé wǒ de míng zì.","translation_ja":"彼は私の名前を覚えています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',22,'姓名','xìng míng','姓名','[{"hanzi":"請寫下你的姓名","pinyin":"qǐng xiě xià nǐ de xìng míng.","translation_ja":"あなたの名前を書いてください"},{"hanzi":"姓名和地址請填好","pinyin":"xìng míng hé dì zhǐ qǐng tián hǎo.","translation_ja":"名前と住所を記入してください"},{"hanzi":"您的姓名是什麼？","pinyin":"nín de xìng míng shì shén me?","translation_ja":"あなたのお名前は何ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',23,'呢','ne','～は？','[{"hanzi":"你呢？","pinyin":"nǐ ne?","translation_ja":"あなたは？"},{"hanzi":"這本書怎麼樣呢？","pinyin":"zhè běn shū zěn me yàng ne?","translation_ja":"この本はどうですか？"},{"hanzi":"他去了哪裡呢？","pinyin":"tā qù le nǎ lǐ ne?","translation_ja":"彼はどこに行きましたか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',24,'印尼','yìn ní','インドネシア','[{"hanzi":"他來自印尼","pinyin":"tā lái zì yìn ní.","translation_ja":"彼はインドネシア出身です"},{"hanzi":"印尼的天氣很熱","pinyin":"yìn ní de tiān qì hěn rè.","translation_ja":"インドネシアの天気はとても暑いです"},{"hanzi":"你去過印尼嗎？","pinyin":"nǐ qù guò yìn ní ma?","translation_ja":"あなたはインドネシアに行ったことがありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',25,'喜歡','xǐ huān','好き','[{"hanzi":"你喜歡喝茶嗎？","pinyin":"nǐ xǐ huān hē chá ma?","translation_ja":"あなたはお茶を飲むのが好きですか？"},{"hanzi":"我喜歡看書","pinyin":"wǒ xǐ huān kàn shū.","translation_ja":"私は本を読むのが好きです"},{"hanzi":"她很喜歡運動","pinyin":"tā hěn xǐ huān yùn dòng.","translation_ja":"彼女は運動がとても好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',26,'你∕妳好','nǐ hǎo','こんにちは','[{"hanzi":"你好！","pinyin":"nǐ hǎo!","translation_ja":"こんにちは！"},{"hanzi":"妳好，請問你是誰？","pinyin":"nǐ hǎo, qǐng wèn nǐ shì shéi?","translation_ja":"こんにちは、どなたですか？"},{"hanzi":"大家好，我是小明","pinyin":"dà jiā hǎo, wǒ shì xiǎo míng.","translation_ja":"みなさん、こんにちは私は小明です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',27,'好','hǎo','良い','[{"hanzi":"今天天氣很好","pinyin":"jīn tiān tiān qì hěn hǎo.","translation_ja":"今日の天気はとても良いです"},{"hanzi":"他是一個好人","pinyin":"tā shì yí gè hǎo rén.","translation_ja":"彼は良い人です"},{"hanzi":"這本書很好看","pinyin":"zhè běn shū hěn hǎo kàn.","translation_ja":"この本はとても面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',28,'請問','qǐng wèn','お尋ねします','[{"hanzi":"請問廁所在哪裡？","pinyin":"qǐng wèn cè suǒ zài nǎ lǐ?","translation_ja":"トイレはどこですか？"},{"hanzi":"請問這本書多少錢？","pinyin":"qǐng wèn zhè běn shū duō shǎo qián?","translation_ja":"この本はいくらですか？"},{"hanzi":"請問，你是誰？","pinyin":"qǐng wèn, nǐ shì shéi?","translation_ja":"お尋ねしますが、どなたですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',29,'大家','dà jiā','皆さん','[{"hanzi":"大家好！","pinyin":"dà jiā hǎo!","translation_ja":"みなさん、こんにちは！"},{"hanzi":"大家都很開心","pinyin":"dà jiā dōu hěn kāi xīn.","translation_ja":"みんなとても嬉しいです"},{"hanzi":"大家一起去看電影吧","pinyin":"dà jiā yī qǐ qù kàn diàn yǐng ba.","translation_ja":"みんなで映画を見に行きましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',30,'朋友','péng yǒu','友達','[{"hanzi":"他是我的朋友","pinyin":"tā shì wǒ de péng yǒu.","translation_ja":"彼は私の友達です"},{"hanzi":"你有很多朋友嗎？","pinyin":"nǐ yǒu hěn duō péng yǒu ma?","translation_ja":"あなたはたくさん友達がいますか？"},{"hanzi":"和朋友一起玩很開心","pinyin":"hé péng yǒu yì qǐ wán hěn kāi xīn.","translation_ja":"友達と一緒に遊ぶのはとても楽しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',31,'愛','ài','愛する','[{"hanzi":"我愛我的家人","pinyin":"wǒ ài wǒ de jiā rén.","translation_ja":"私は家族を愛しています"},{"hanzi":"他愛吃中國菜","pinyin":"tā ài chī zhōng guó cài.","translation_ja":"彼は中華料理を食べるのが好きです"},{"hanzi":"她很愛學中文","pinyin":"tā hěn ài xué zhōng wén.","translation_ja":"彼女は中国語を学ぶのがとても好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',32,'吃','chī','食べる','[{"hanzi":"我喜歡吃水果","pinyin":"wǒ xǐ huān chī shuǐ guǒ.","translation_ja":"私は果物を食べるのが好きです"},{"hanzi":"你今天吃了什麼？","pinyin":"nǐ jīn tiān chī le shén me?","translation_ja":"あなたは今日何を食べましたか？"},{"hanzi":"他吃了一碗麵","pinyin":"tā chī le yì wǎn miàn.","translation_ja":"彼は麺を一杯食べました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',33,'水果','shuǐ guǒ','果物','[{"hanzi":"我每天都吃水果","pinyin":"wǒ měi tiān dōu chī shuǐ guǒ.","translation_ja":"私は毎日果物を食べます"},{"hanzi":"這裡的水果很好吃","pinyin":"zhè lǐ de shuǐ guǒ hěn hǎo chī.","translation_ja":"ここの果物はとても美味しいです"},{"hanzi":"你喜歡吃什麼水果？","pinyin":"nǐ xǐ huān chī shén me shuǐ guǒ?","translation_ja":"あなたはどんな果物が好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',34,'水','shuǐ','水','[{"hanzi":"他喝了一杯水","pinyin":"tā hē le yì bēi shuǐ.","translation_ja":"彼は水を一杯飲みました"},{"hanzi":"水是很重要的","pinyin":"shuǐ shì hěn zhòng yào de.","translation_ja":"水はとても重要です"},{"hanzi":"你每天喝多少水？","pinyin":"nǐ měi tiān hē duō shǎo shuǐ?","translation_ja":"あなたは毎日どれくらい水を飲みますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',35,'喝','hē','飲む','[{"hanzi":"你喜歡喝什麼？","pinyin":"nǐ xǐ huān hē shén me?","translation_ja":"あなたは何を飲むのが好きですか？"},{"hanzi":"他每天喝兩杯咖啡","pinyin":"tā měi tiān hē liǎng bēi kā fēi.","translation_ja":"彼は毎日コーヒーを2杯飲みます"},{"hanzi":"我喝了一杯果汁","pinyin":"wǒ hē le yī bēi guǒ zhī.","translation_ja":"私はジュースを一杯飲みました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',36,'茶','chá','お茶','[{"hanzi":"這杯茶很好喝","pinyin":"zhè bēi chá hěn hǎo hē.","translation_ja":"このお茶はとても美味しいです"},{"hanzi":"你喜歡喝茶還是咖啡？","pinyin":"nǐ xǐ huān hē chá hái shì kā fēi?","translation_ja":"あなたはお茶が好きですか、それともコーヒーですか？"},{"hanzi":"她點了一壺茶","pinyin":"tā diǎn le yì hú chá.","translation_ja":"彼女はお茶を一壺注文しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',37,'謝謝','xiè xiè','ありがとう','[{"hanzi":"謝謝你的幫助","pinyin":"xiè xiè nǐ de bāng zhù.","translation_ja":"あなたの助けに感謝します"},{"hanzi":"謝謝老師教我們","pinyin":"xiè xiè lǎo shī jiāo wǒ men.","translation_ja":"先生が私たちを教えてくれてありがとうございます"},{"hanzi":"他對我說謝謝","pinyin":"tā duì wǒ shuō xiè xiè.","translation_ja":"彼は私に「ありがとう」と言いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',38,'不客氣','bú kè qì','どういたしまして','[{"hanzi":"你幫了我，不客氣！","pinyin":"nǐ bāng le wǒ, bú kè qì!","translation_ja":"助けてくれてありがとう、どういたしまして！"},{"hanzi":"謝謝你！——不客氣","pinyin":"xiè xiè nǐ! —— bú kè qì.","translation_ja":"ありがとう！——どういたしまして"},{"hanzi":"朋友之間不需要說不客氣","pinyin":"péng yǒu zhī jiān bù xū yào shuō bú kè qì.","translation_ja":"友達同士で「どういたしまして」と言う必要はありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',39,'珍珠奶茶','zhēn zhū nǎi chá','タピオカミルクティー','[{"hanzi":"我很喜歡喝珍珠奶茶","pinyin":"wǒ hěn xǐ huān hē zhēn zhū nǎi chá.","translation_ja":"私はタピオカミルクティーを飲むのが大好きです"},{"hanzi":"這家店的珍珠奶茶很好喝","pinyin":"zhè jiā diàn de zhēn zhū nǎi chá hěn hǎo hē.","translation_ja":"このお店のタピオカミルクティーはとても美味しいです"},{"hanzi":"你喝過珍珠奶茶嗎？","pinyin":"nǐ hē guò zhēn zhū nǎi chá ma?","translation_ja":"あなたはタピオカミルクティーを飲んだことがありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',40,'奶茶','nǎi chá','ミルクティー','[{"hanzi":"你喜歡喝奶茶嗎？","pinyin":"nǐ xǐ huān hē nǎi chá ma?","translation_ja":"あなたはミルクティーを飲むのが好きですか？"},{"hanzi":"這杯奶茶不甜","pinyin":"zhè bēi nǎi chá bù tián.","translation_ja":"このミルクティーは甘くありません"},{"hanzi":"他每天喝一杯奶茶","pinyin":"tā měi tiān hē yì bēi nǎi chá.","translation_ja":"彼は毎日ミルクティーを1杯飲みます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',41,'自我介紹','zì wǒ jiè shào','自己紹介','[{"hanzi":"我來做一個自我介紹","pinyin":"wǒ lái zuò yí gè zì wǒ jiè shào.","translation_ja":"私が自己紹介をします"},{"hanzi":"上課時大家都要做自我介紹","pinyin":"shàng kè shí dà jiā dōu yào zuò zì wǒ jiè shào.","translation_ja":"授業中、みんなが自己紹介をする必要があります"},{"hanzi":"你的自我介紹很有趣","pinyin":"nǐ de zì wǒ jiè shào hěn yǒu qù.","translation_ja":"あなたの自己紹介はとても面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',42,'早安','zǎo ān','おはよう','[{"hanzi":"老師，早安！","pinyin":"lǎo shī, zǎo ān!","translation_ja":"先生、おはようございます！"},{"hanzi":"早安，今天的天氣很好","pinyin":"zǎo ān, jīn tiān de tiān qì hěn hǎo.","translation_ja":"おはようございます、今日の天気はとても良いです"},{"hanzi":"早安，你吃早餐了嗎？","pinyin":"zǎo ān, nǐ chī zǎo cān le ma?","translation_ja":"おはようございます、朝ご飯は食べましたか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',43,'午安','wǔ ān','こんにちは','[{"hanzi":"老師，午安！","pinyin":"lǎo shī, wǔ ān!","translation_ja":"先生、こんにちは！"},{"hanzi":"午安，你剛剛去哪裡了？","pinyin":"wǔ ān, nǐ gāng gāng qù nǎ lǐ le?","translation_ja":"こんにちは、さっきどこに行っていたのですか？"},{"hanzi":"午安，今天的課怎麼樣？","pinyin":"wǔ ān, jīn tiān de kè zěn me yàng?","translation_ja":"こんにちは、今日の授業はどうでしたか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson01',44,'晚安','wǎn ān','こんばんは','[{"hanzi":"晚安，明天見！","pinyin":"wǎn ān, míng tiān jiàn!","translation_ja":"おやすみなさい、また明日！"},{"hanzi":"晚安，祝你好夢","pinyin":"wǎn ān, zhù nǐ hǎo mèng.","translation_ja":"おやすみなさい、良い夢を見てください"},{"hanzi":"晚安，今天很累了","pinyin":"wǎn ān, jīn tiān hěn lèi le.","translation_ja":"おやすみなさい、今日はとても疲れました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',1,'幾','jǐ','いくつ','[{"hanzi":"你幾歲？","pinyin":"nǐ jǐ suì?","translation_ja":"あなたは何歳ですか？"},{"hanzi":"你家有幾個人？","pinyin":"nǐ jiā yǒu jǐ ge rén?","translation_ja":"あなたの家には何人いますか？"},{"hanzi":"這裡有幾本書？","pinyin":"zhè lǐ yǒu jǐ běn shū?","translation_ja":"ここには何冊の本がありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',2,'點','diǎn','時','[{"hanzi":"現在幾點了？","pinyin":"xiàn zài jǐ diǎn le?","translation_ja":"今何時ですか？"},{"hanzi":"他三點來我家","pinyin":"tā sān diǎn lái wǒ jiā.","translation_ja":"彼は3時に私の家に来ます"},{"hanzi":"八點的課很有趣","pinyin":"bā diǎn de kè hěn yǒu qù.","translation_ja":"8時の授業はとても面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',3,'點鐘','diǎn zhōng','～時','[{"hanzi":"我早上六點鐘起床","pinyin":"wǒ zǎo shàng liù diǎn zhōng qǐ chuáng.","translation_ja":"私は朝6時に起きます"},{"hanzi":"我們晚上七點鐘吃飯","pinyin":"wǒ men wǎn shàng qī diǎn zhōng chī fàn.","translation_ja":"私たちは夜7時に食事をします"},{"hanzi":"圖書館幾點鐘關門？","pinyin":"tú shū guǎn jǐ diǎn zhōng guān mén?","translation_ja":"図書館は何時に閉まりますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',4,'現在','xiàn zài','現在','[{"hanzi":"現在幾點了？","pinyin":"xiàn zài jǐ diǎn le?","translation_ja":"今何時ですか？"},{"hanzi":"現在外面下雨了","pinyin":"xiàn zài wài miàn xià yǔ le.","translation_ja":"今、外は雨が降っています"},{"hanzi":"你現在在哪裡？","pinyin":"nǐ xiàn zài zài nǎ lǐ?","translation_ja":"あなたは今どこにいますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',5,'去','qù','行く','[{"hanzi":"你幾點去學校？","pinyin":"nǐ jǐ diǎn qù xué xiào?","translation_ja":"あなたは何時に学校へ行きますか？"},{"hanzi":"我想去圖書館","pinyin":"wǒ xiǎng qù tú shū guǎn.","translation_ja":"私は図書館に行きたいです"},{"hanzi":"他去買東西了","pinyin":"tā qù mǎi dōng xi le.","translation_ja":"彼は買い物に行きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',6,'學校','xué xiào','学校','[{"hanzi":"我每天八點去學校","pinyin":"wǒ měi tiān bā diǎn qù xué xiào.","translation_ja":"私は毎朝8時に学校に行きます"},{"hanzi":"學校很大，也很漂亮","pinyin":"xué xiào hěn dà, yě hěn piào liàng.","translation_ja":"学校は広くて、とても綺麗です"},{"hanzi":"你喜歡你的學校嗎？","pinyin":"nǐ xǐ huān nǐ de xué xiào ma?","translation_ja":"あなたは自分の学校が好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',7,'媽媽','mā ma','母','[{"hanzi":"我媽媽很會做飯","pinyin":"wǒ mā ma hěn huì zuò fàn.","translation_ja":"私の母は料理がとても上手です"},{"hanzi":"媽媽今天不在家","pinyin":"mā ma jīn tiān bú zài jiā.","translation_ja":"母は今日は家にいません"},{"hanzi":"你媽媽喜歡喝咖啡嗎？","pinyin":"nǐ mā ma xǐ huān hē kā fēi ma?","translation_ja":"あなたのお母さんはコーヒーが好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',8,'爸爸','bà ba','父','[{"hanzi":"我爸爸是一位老師","pinyin":"wǒ bà ba shì yí wèi lǎo shī.","translation_ja":"私の父は教師です"},{"hanzi":"爸爸每天早上運動","pinyin":"bà ba měi tiān zǎo shàng yùn dòng.","translation_ja":"父は毎朝運動をします"},{"hanzi":"你爸爸喜歡什麼運動？","pinyin":"nǐ bà ba xǐ huān shén me yùn dòng?","translation_ja":"あなたのお父さんはどんな運動が好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',9,'孩子','hái zi','子ども','[{"hanzi":"孩子們在公園玩","pinyin":"hái zi men zài gōng yuán wán.","translation_ja":"子どもたちは公園で遊んでいます"},{"hanzi":"那個孩子很可愛","pinyin":"nà ge hái zi hěn kě ài.","translation_ja":"あの子はとても可愛いです"},{"hanzi":"孩子們喜歡吃蛋糕","pinyin":"hái zi men xǐ huān chī dàn gāo.","translation_ja":"子どもたちはケーキが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',10,'今天','jīn tiān','今日','[{"hanzi":"今天是星期幾？","pinyin":"jīn tiān shì xīng qí jǐ?","translation_ja":"今日は何曜日ですか？"},{"hanzi":"今天的天氣很好","pinyin":"jīn tiān de tiān qì hěn hǎo.","translation_ja":"今日は天気がとても良いです"},{"hanzi":"我今天有很多課","pinyin":"wǒ jīn tiān yǒu hěn duō kè.","translation_ja":"私は今日は授業がたくさんあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',11,'星期','xīng qí','曜日','[{"hanzi":"星期天我們去看電影","pinyin":"xīng qí tiān wǒ men qù kàn diàn yǐng.","translation_ja":"日曜日に私たちは映画を観に行きます"},{"hanzi":"星期五晚上有足球比賽","pinyin":"xīng qí wǔ wǎn shàng yǒu zú qiú bǐ sài.","translation_ja":"金曜日の夜にサッカーの試合があります"},{"hanzi":"今天是星期三","pinyin":"jīn tiān shì xīng qí sān.","translation_ja":"今日は水曜日です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',12,'月','yuè','月','[{"hanzi":"這個月很忙","pinyin":"zhè ge yuè hěn máng.","translation_ja":"今月はとても忙しいです"},{"hanzi":"下個月我要去旅行","pinyin":"xià gè yuè wǒ yào qù lǚ xíng.","translation_ja":"来月、私は旅行に行きます"},{"hanzi":"你幾月生日？","pinyin":"nǐ jǐ yuè shēng rì?","translation_ja":"あなたの誕生日は何月ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',13,'號','hào','日（番号）','[{"hanzi":"今天是幾號？","pinyin":"jīn tiān shì jǐ hào?","translation_ja":"今日は何日ですか？"},{"hanzi":"我們三號去動物園","pinyin":"wǒ men sān hào qù dòng wù yuán.","translation_ja":"私たちは3日に動物園に行きます"},{"hanzi":"這個號碼是什麼意思？","pinyin":"zhè ge hào mǎ shì shén me yì si?","translation_ja":"この番号はどういう意味ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',14,'日','rì','日','[{"hanzi":"今天是幾月幾日？","pinyin":"jīn tiān shì jǐ yuè jǐ rì?","translation_ja":"今日は何月何日ですか？"},{"hanzi":"明日的天氣很好","pinyin":"míng tiān de tiān qì hěn hǎo.","translation_ja":"明日の天気は良さそうです"},{"hanzi":"我們下星期一放假","pinyin":"wǒ men xià xīng qí yī fàng jià.","translation_ja":"私たちは来週月曜日が休みです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',15,'星期天','xīng qī tiān','日曜日','[{"hanzi":"星期天我去公園玩","pinyin":"xīng qí tiān wǒ qù gōng yuán wán.","translation_ja":"日曜日に私は公園で遊びます"},{"hanzi":"星期天不上課","pinyin":"xīng qí tiān bú shàng kè.","translation_ja":"日曜日は授業に出ません"},{"hanzi":"你喜歡星期天嗎？","pinyin":"nǐ xǐ huān xīng qí tiān ma?","translation_ja":"あなたは日曜日が好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',16,'早上','zǎo shàng','朝','[{"hanzi":"早上我七點起床","pinyin":"zǎo shàng wǒ qī diǎn qǐ chuáng.","translation_ja":"朝7時に起きます"},{"hanzi":"早上很冷，要穿外套","pinyin":"zǎo shàng hěn lěng, yào chuān wài tào.","translation_ja":"朝は寒いのでコートを着るべきです"},{"hanzi":"你早上喜歡喝茶嗎？","pinyin":"nǐ zǎo shàng xǐ huān hē chá ma?","translation_ja":"あなたは朝にお茶を飲むのが好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',17,'有','yǒu','ある/いる','[{"hanzi":"我有很多朋友","pinyin":"wǒ yǒu hěn duō péng yǒu.","translation_ja":"私にはたくさんの友達がいます"},{"hanzi":"他有一部新手機","pinyin":"tā yǒu yí bù xīn shǒu jī.","translation_ja":"彼は新しい携帯を持っています"},{"hanzi":"這裡有一本書","pinyin":"zhè lǐ yǒu yì běn shū.","translation_ja":"ここに本が一冊あります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',18,'沒','méi','～ない','[{"hanzi":"我今天沒時間","pinyin":"wǒ jīn tiān méi shí jiān.","translation_ja":"私は今日は時間がありません"},{"hanzi":"他沒來學校","pinyin":"tā méi lái xué xiào.","translation_ja":"彼は学校に来ていません"},{"hanzi":"我家裡沒牛奶了","pinyin":"wǒ jiā lǐ méi niú nǎi le.","translation_ja":"家に牛乳がありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',19,'課','kè','授業','[{"hanzi":"我今天有三節課","pinyin":"wǒ jīn tiān yǒu sān jié kè.","translation_ja":"私は今日は3コマ授業があります"},{"hanzi":"漢語課很有意思","pinyin":"hàn yǔ kè hěn yǒu yì si.","translation_ja":"中国語の授業はとても面白いです"},{"hanzi":"你喜歡上什麼課？","pinyin":"nǐ xǐ huān shàng shén me kè?","translation_ja":"あなたはどんな授業が好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',20,'圖書館','tú shū guǎn','図書館','[{"hanzi":"圖書館裡有很多書","pinyin":"tú shū guǎn lǐ yǒu hěn duō shū.","translation_ja":"図書館にはたくさんの本があります"},{"hanzi":"他在圖書館看書","pinyin":"tā zài tú shū guǎn kàn shū.","translation_ja":"彼は図書館で本を読んでいます"},{"hanzi":"我喜歡去圖書館學習","pinyin":"wǒ xǐ huān qù tú shū guǎn xué xí.","translation_ja":"私は図書館で勉強するのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',21,'中午','zhōng wǔ','正午','[{"hanzi":"中午我們一起吃午飯","pinyin":"zhōng wǔ wǒ men yì qǐ chī wǔ fàn.","translation_ja":"昼に私たちは一緒に昼ご飯を食べます"},{"hanzi":"中午休息一下吧","pinyin":"zhōng wǔ xiū xí yí xià ba.","translation_ja":"昼休みに少し休みましょう"},{"hanzi":"你中午去哪裡吃飯？","pinyin":"nǐ zhōng wǔ qù nǎ lǐ chī fàn?","translation_ja":"あなたは昼にどこでご飯を食べますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',22,'回','huí','戻る','[{"hanzi":"我每天六點回家","pinyin":"wǒ měi tiān liù diǎn huí jiā.","translation_ja":"私は毎日6時に家に帰ります"},{"hanzi":"你什麼時候回來？","pinyin":"nǐ shén me shí hòu huí lái?","translation_ja":"あなたはいつ帰ってきますか？"},{"hanzi":"他回到學校拿書了","pinyin":"tā huí dào xué xiào ná shū le.","translation_ja":"彼は学校に戻って本を取りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',23,'家','jiā','家','[{"hanzi":"我家在台北","pinyin":"wǒ jiā zài tái běi.","translation_ja":"私の家は台北にあります"},{"hanzi":"你的家大嗎？","pinyin":"nǐ de jiā dà ma?","translation_ja":"あなたの家は大きいですか？"},{"hanzi":"我們家有四口人","pinyin":"wǒ men jiā yǒu sì kǒu rén.","translation_ja":"私たちの家族は4人です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',24,'家人','jiā rén','家族','[{"hanzi":"我的家人很喜歡旅行","pinyin":"wǒ de jiā rén hěn xǐ huān lǚ xíng.","translation_ja":"私の家族は旅行が大好きです"},{"hanzi":"你和家人常見面嗎？","pinyin":"nǐ hé jiā rén cháng jiàn miàn ma?","translation_ja":"あなたは家族とよく会いますか？"},{"hanzi":"家人是我最重要的人","pinyin":"jiā rén shì wǒ zuì zhòng yào de rén.","translation_ja":"家族は私にとって最も大切な人たちです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',25,'下午','xià wǔ','午後','[{"hanzi":"下午我去運動","pinyin":"xià wǔ wǒ qù yùn dòng.","translation_ja":"午後に運動をします"},{"hanzi":"你下午有什麼計畫？","pinyin":"nǐ xià wǔ yǒu shén me jì huà?","translation_ja":"あなたは午後に何か予定がありますか？"},{"hanzi":"下午天氣會變好","pinyin":"xià wǔ tiān qì huì biàn hǎo.","translation_ja":"午後には天気が良くなるでしょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',26,'上午','shàng wǔ','午前','[{"hanzi":"上午我在圖書館學習","pinyin":"shàng wǔ wǒ zài tú shū guǎn xué xí.","translation_ja":"午前中は図書館で勉強しました"},{"hanzi":"這是上午的課程表","pinyin":"zhè shì shàng wǔ de kè chéng biǎo.","translation_ja":"これは午前の時間割です"},{"hanzi":"你上午吃過飯了嗎？","pinyin":"nǐ shàng wǔ chī guò fàn le ma?","translation_ja":"午前中にご飯を食べましたか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',27,'下課','xià kè','授業が終わる','[{"hanzi":"下課以後我們去運動吧","pinyin":"xià kè yǐ hòu wǒ men qù yùn dòng ba.","translation_ja":"授業の後に運動しに行きましょう"},{"hanzi":"老師說下課了","pinyin":"lǎo shī shuō xià kè le.","translation_ja":"先生が授業が終わったと言いました"},{"hanzi":"下課的時候要休息一下","pinyin":"xià kè de shí hòu yào xiū xí yí xià.","translation_ja":"授業が終わったら少し休みましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',28,'上課','shàng kè','授業を受ける','[{"hanzi":"我們每天上午九點上課","pinyin":"wǒ men měi tiān shàng wǔ jiǔ diǎn shàng kè.","translation_ja":"私たちは毎朝9時に授業が始まります"},{"hanzi":"今天的上課內容很有趣","pinyin":"jīn tiān de shàng kè nèi róng hěn yǒu qù.","translation_ja":"今日の授業内容はとても面白いです"},{"hanzi":"你喜歡上什麼課？","pinyin":"nǐ xǐ huān shàng shén me kè?","translation_ja":"あなたはどんな授業が好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',29,'分','fēn','分','[{"hanzi":"現在是十點十五分","pinyin":"xiàn zài shì shí diǎn shí wǔ fēn.","translation_ja":"今は10時15分です"},{"hanzi":"你可以給我十分鐘嗎？","pinyin":"nǐ kě yǐ gěi wǒ shí fēn zhōng ma?","translation_ja":"10分だけ時間をもらえますか？"},{"hanzi":"他每天跑步三十分鐘","pinyin":"tā měi tiān pǎo bù sān shí fēn zhōng.","translation_ja":"彼は毎日30分間走ります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',30,'幾點','jǐ diǎn','何時','[{"hanzi":"你幾點上課？","pinyin":"nǐ jǐ diǎn shàng kè?","translation_ja":"あなたは何時に授業が始まりますか？"},{"hanzi":"我們幾點去吃飯？","pinyin":"wǒ men jǐ diǎn qù chī fàn?","translation_ja":"私たちは何時にご飯を食べに行きますか？"},{"hanzi":"他幾點回家？","pinyin":"tā jǐ diǎn huí jiā?","translation_ja":"彼は何時に家に帰りますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',31,'幾點鐘','jǐ diǎn zhōng','何時','[{"hanzi":"圖書館幾點鐘開門？","pinyin":"tú shū guǎn jǐ diǎn zhōng kāi mén?","translation_ja":"図書館は何時に開きますか？"},{"hanzi":"你幾點鐘來這裡？","pinyin":"nǐ jǐ diǎn zhōng lái zhè lǐ?","translation_ja":"あなたは何時にここに来ますか？"},{"hanzi":"明天幾點鐘見面？","pinyin":"míng tiān jǐ diǎn zhōng jiàn miàn?","translation_ja":"明日何時に会いますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',32,'明天','míng tiān','明日','[{"hanzi":"明天有考試嗎？","pinyin":"míng tiān yǒu kǎo shì ma?","translation_ja":"明日は試験がありますか？"},{"hanzi":"明天我不上課","pinyin":"míng tiān wǒ bú shàng kè.","translation_ja":"明日は授業に出ません"},{"hanzi":"明天見！","pinyin":"míng tiān jiàn!","translation_ja":"また明日！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',33,'昨天','zuó tiān','昨日','[{"hanzi":"昨天的電影很好看","pinyin":"zuó tiān de diàn yǐng hěn hǎo kàn.","translation_ja":"昨日の映画はとても面白かったです"},{"hanzi":"他昨天沒來學校","pinyin":"tā zuó tiān méi lái xué xiào.","translation_ja":"彼は昨日学校に来ませんでした"},{"hanzi":"昨天晚上下雨了","pinyin":"zuó tiān wǎn shàng xià yǔ le.","translation_ja":"昨日の夜は雨が降りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',34,'週末','zhōu mò','週末','[{"hanzi":"週末我們去公園玩吧","pinyin":"zhōu mò wǒ men qù gōng yuán wán ba.","translation_ja":"週末に公園で遊びましょう"},{"hanzi":"你週末有什麼計畫？","pinyin":"nǐ zhōu mò yǒu shén me jì huà?","translation_ja":"あなたは週末に何か予定がありますか？"},{"hanzi":"週末可以在家休息","pinyin":"zhōu mò kě yǐ zài jiā xiū xí.","translation_ja":"週末は家で休むことができます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',35,'要','yào','～したい','[{"hanzi":"我要去超市買東西","pinyin":"wǒ yào qù chāo shì mǎi dōng xi.","translation_ja":"私はスーパーに買い物に行きます"},{"hanzi":"你要不要喝茶？","pinyin":"nǐ yào bú yào hē chá?","translation_ja":"あなたはお茶を飲みますか？"},{"hanzi":"明天要早點起床","pinyin":"míng tiān yào zǎo diǎn qǐ chuáng.","translation_ja":"明日は早く起きなければなりません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',36,'來','lái','来る','[{"hanzi":"他下午會來我們家","pinyin":"tā xià wǔ huì lái wǒ men jiā.","translation_ja":"彼は午後に私たちの家に来ます"},{"hanzi":"你可以來我家玩嗎？","pinyin":"nǐ kě yǐ lái wǒ jiā wán ma?","translation_ja":"あなたは私の家に遊びに来られますか？"},{"hanzi":"他正在來這裡的路上","pinyin":"tā zhèng zài lái zhè lǐ de lù shàng.","translation_ja":"彼は今こちらに向かっています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',37,'啊','a','～ね','[{"hanzi":"這麼多書啊！","pinyin":"zhè me duō shū a!","translation_ja":"こんなにたくさんの本が！"},{"hanzi":"你知道嗎啊？","pinyin":"nǐ zhī dào ma a?","translation_ja":"知っていますか？"},{"hanzi":"好啊，我們一起去！","pinyin":"hǎo a, wǒ men yì qǐ qù!","translation_ja":"いいですね、一緒に行きましょう！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',38,'的','de','～の','[{"hanzi":"這是我的書","pinyin":"zhè shì wǒ de shū.","translation_ja":"これは私の本です"},{"hanzi":"他是我們的老師","pinyin":"tā shì wǒ men de lǎo shī.","translation_ja":"彼は私たちの先生です"},{"hanzi":"這是今天的作業","pinyin":"zhè shì jīn tiān de zuò yè.","translation_ja":"これは今日の宿題です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',39,'生日','shēng rì','誕生日','[{"hanzi":"你的生日是幾月幾日？","pinyin":"nǐ de shēng rì shì jǐ yuè jǐ rì?","translation_ja":"あなたの誕生日は何月何日ですか？"},{"hanzi":"祝你生日快樂！","pinyin":"zhù nǐ shēng rì kuài lè!","translation_ja":"お誕生日おめでとう！"},{"hanzi":"他今年的生日很特別","pinyin":"tā jīn nián de shēng rì hěn tè bié.","translation_ja":"彼の今年の誕生日はとても特別です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',40,'快樂','kuài lè','嬉しい','[{"hanzi":"新年快樂！","pinyin":"xīn nián kuài lè!","translation_ja":"新年おめでとう！"},{"hanzi":"他們都很快樂","pinyin":"tā men dōu hěn kuài lè.","translation_ja":"彼らはみんなとても幸せです"},{"hanzi":"祝你天天快樂！","pinyin":"zhù nǐ tiān tiān kuài lè!","translation_ja":"毎日が楽しい日でありますように！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',41,'晚上','wǎn shàng','夜','[{"hanzi":"晚上我和朋友吃飯","pinyin":"wǎn shàng wǒ hé péng yǒu chī fàn.","translation_ja":"夜に友達と食事をします"},{"hanzi":"晚上天氣很冷","pinyin":"wǎn shàng tiān qì hěn lěng.","translation_ja":"夜はとても寒いです"},{"hanzi":"你晚上喜歡做什麼？","pinyin":"nǐ wǎn shàng xǐ huān zuò shén me?","translation_ja":"あなたは夜に何をするのが好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',42,'問題','wèn tí','問題','[{"hanzi":"這個問題很難","pinyin":"zhè ge wèn tí hěn nán.","translation_ja":"この問題はとても難しいです"},{"hanzi":"老師回答了我的問題","pinyin":"lǎo shī huí dá le wǒ de wèn tí.","translation_ja":"先生は私の質問に答えました"},{"hanzi":"你有什麼問題嗎？","pinyin":"nǐ yǒu shén me wèn tí ma?","translation_ja":"あなたは何か質問がありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',43,'沒問題','méi wèn tí','問題ない','[{"hanzi":"這件事沒問題","pinyin":"zhè jiàn shì méi wèn tí.","translation_ja":"この件は問題ありません"},{"hanzi":"他說一切都沒問題","pinyin":"tā shuō yí qiè dōu méi wèn tí.","translation_ja":"彼はすべて問題ないと言いました"},{"hanzi":"如果你需要幫忙，沒問題！","pinyin":"rú guǒ nǐ xū yào bāng máng, méi wèn tí!","translation_ja":"もし助けが必要なら、問題ありません！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',44,'明天見','míng tiān jiàn','また明日','[{"hanzi":"我們明天見！","pinyin":"wǒ men míng tiān jiàn!","translation_ja":"また明日会いましょう！"},{"hanzi":"明天見，希望一切順利","pinyin":"míng tiān jiàn, xī wàng yí qiè shùn lì.","translation_ja":"明日会いましょう、すべてがうまくいくことを願っています"},{"hanzi":"再見，明天見！","pinyin":"zài jiàn, míng tiān jiàn!","translation_ja":"さようなら、また明日！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',45,'再見','zài jiàn','さようなら','[{"hanzi":"他跟朋友說再見","pinyin":"tā gēn péng yǒu shuō zài jiàn.","translation_ja":"彼は友達にさようならを言いました"},{"hanzi":"再見，下次見！","pinyin":"zài jiàn, xià cì jiàn!","translation_ja":"さようなら、また次回！"},{"hanzi":"學校門口大家說再見","pinyin":"xué xiào mén kǒu dà jiā shuō zài jiàn.","translation_ja":"学校の門の前でみんながさようならを言います"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',46,'做','zuò','作る','[{"hanzi":"我在做功課","pinyin":"wǒ zài zuò gōng kè.","translation_ja":"私は宿題をしています"},{"hanzi":"他每天做運動","pinyin":"tā měi tiān zuò yùn dòng.","translation_ja":"彼は毎日運動をしています"},{"hanzi":"你喜歡做什麼菜？","pinyin":"nǐ xǐ huān zuò shén me cài?","translation_ja":"あなたはどんな料理を作るのが好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',47,'歲','suì','～歳','[{"hanzi":"他今年十歲了","pinyin":"tā jīn nián shí suì le.","translation_ja":"彼は今年10歳になりました"},{"hanzi":"你幾歲？","pinyin":"nǐ jǐ suì?","translation_ja":"あなたは何歳ですか？"},{"hanzi":"我弟弟兩歲了","pinyin":"wǒ dì di liǎng suì le.","translation_ja":"私の弟は2歳です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',48,'起床','qǐ chuáng','起きる','[{"hanzi":"我每天六點起床","pinyin":"wǒ měi tiān liù diǎn qǐ chuáng.","translation_ja":"私は毎朝6時に起きます"},{"hanzi":"今天起床晚了","pinyin":"jīn tiān qǐ chuáng wǎn le.","translation_ja":"今日は起きるのが遅くなりました"},{"hanzi":"你早上幾點起床？","pinyin":"nǐ zǎo shàng jǐ diǎn qǐ chuáng?","translation_ja":"あなたは朝何時に起きますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',49,'午飯','wǔ fàn','昼ごはん','[{"hanzi":"我們中午吃午飯","pinyin":"wǒ men zhōng wǔ chī wǔ fàn.","translation_ja":"私たちは昼ご飯を昼に食べます"},{"hanzi":"你午飯吃什麼？","pinyin":"nǐ wǔ fàn chī shén me?","translation_ja":"あなたは昼ご飯に何を食べますか？"},{"hanzi":"午飯後我們去運動","pinyin":"wǔ fàn hòu wǒ men qù yùn dòng.","translation_ja":"昼ご飯の後に運動しに行きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',50,'早飯','zǎo fàn','朝ごはん','[{"hanzi":"他每天早上吃早飯","pinyin":"tā měi tiān zǎo shàng chī zǎo fàn.","translation_ja":"彼は毎朝朝ご飯を食べます"},{"hanzi":"今天的早飯是麵包","pinyin":"jīn tiān de zǎo fàn shì miàn bāo.","translation_ja":"今日の朝ご飯はパンです"},{"hanzi":"你不吃早飯嗎？","pinyin":"nǐ bù chī zǎo fàn ma?","translation_ja":"あなたは朝ご飯を食べないのですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',51,'晚飯','wǎn fàn','夕ごはん','[{"hanzi":"晚飯後我們一起聊天","pinyin":"wǎn fàn hòu wǒ men yì qǐ liáo tiān.","translation_ja":"夜ご飯の後、私たちは一緒にお喋りをします"},{"hanzi":"他做了一頓好吃的晚飯","pinyin":"tā zuò le yí dùn hǎo chī de wǎn fàn.","translation_ja":"彼は美味しい夜ご飯を作りました"},{"hanzi":"你喜歡自己做晚飯嗎？","pinyin":"nǐ xǐ huān zì jǐ zuò wǎn fàn ma?","translation_ja":"あなたは自分で夜ご飯を作るのが好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',52,'飯','fàn','ご飯','[{"hanzi":"我們一起吃飯吧","pinyin":"wǒ men yì qǐ  chī fàn ba.","translation_ja":"一緒にご飯を食べましょう"},{"hanzi":"飯煮好了","pinyin":"fàn zhǔ hǎo le.","translation_ja":"ご飯ができました"},{"hanzi":"你今天吃了什麼飯？","pinyin":"nǐ jīn tiān chī le shén me fàn?","translation_ja":"今日何を食べましたか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',53,'做飯','zuò fàn','料理する','[{"hanzi":"他喜歡做飯給家人吃","pinyin":"tā xǐ huān zuò fàn gěi jiā rén chī.","translation_ja":"彼は家族のために料理を作るのが好きです"},{"hanzi":"我今天要做飯","pinyin":"wǒ jīn tiān yào zuò fàn.","translation_ja":"今日私は料理を作るつもりです"},{"hanzi":"做飯很有趣","pinyin":"zuò fàn hěn yǒu qù.","translation_ja":"料理を作るのはとても楽しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',54,'睡覺','shuì jiào','寝る','[{"hanzi":"我每天十點睡覺","pinyin":"wǒ měi tiān shí diǎn shuì jiào.","translation_ja":"私は毎晩10時に寝ます"},{"hanzi":"他正在睡覺，別吵他","pinyin":"tā zhèng zài shuì jiào, bié chǎo tā.","translation_ja":"彼は寝ていますので、邪魔しないでください"},{"hanzi":"昨晚我睡覺睡得很好","pinyin":"zuó wǎn wǒ shuì jiào shuì de hěn hǎo.","translation_ja":"昨晩はよく眠れました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',55,'忙','máng','忙しい','[{"hanzi":"我今天很忙，沒時間休息","pinyin":"wǒ jīn tiān hěn máng, méi shí jiān xiū xi.","translation_ja":"私は今日とても忙しくて、休む時間がありません"},{"hanzi":"你忙什麼呢？","pinyin":"nǐ máng shén me ne?","translation_ja":"あなたは何を忙しくしていますか？"},{"hanzi":"忙碌的生活也有樂趣","pinyin":"máng lù de shēng huó yě yǒu lè qù.","translation_ja":"忙しい生活にも楽しみがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson02',56,'累','lèi','疲れる','[{"hanzi":"他工作了一整天，很累了","pinyin":"tā gōng zuò le yì zhěng tiān, hěn lèi le.","translation_ja":"彼は一日中働いて、とても疲れています"},{"hanzi":"你累了嗎？","pinyin":"nǐ lèi le ma?","translation_ja":"あなたは疲れましたか？"},{"hanzi":"休息一下，不要太累了","pinyin":"xiū xí yí xià, bù yào tài lèi le.","translation_ja":"少し休んで、無理しすぎないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',1,'買','mǎi','買う','[{"hanzi":"我想買一本書","pinyin":"Wǒ xiǎng mǎi yì běn shū.","translation_ja":"私は本を一冊買いたいです"},{"hanzi":"他去超市買東西了","pinyin":"Tā qù chāoshì mǎi dōngxi le.","translation_ja":"彼はスーパーに買い物に行きました"},{"hanzi":"你要買什麼？","pinyin":"Nǐ yào mǎi shénme?","translation_ja":"あなたは何を買いますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',2,'禮物','lǐ wù','プレゼント','[{"hanzi":"我送給他一個生日禮物","pinyin":"Wǒ sòng gěi tā yí ge shēngrì lǐwù.","translation_ja":"私は彼に誕生日プレゼントを贈ります"},{"hanzi":"你準備好禮物了嗎？","pinyin":"Nǐ zhǔnbèi hǎo lǐwù le ma?","translation_ja":"あなたはプレゼントの準備ができましたか？"},{"hanzi":"這個禮物很特別","pinyin":"Zhège lǐwù hěn tèbié.","translation_ja":"このプレゼントはとても特別です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',3,'想(要)','xiǎng (yào)','～したい','[{"hanzi":"我想買這朵花","pinyin":"Wǒ xiǎng mǎi zhè duǒ huā.","translation_ja":"私はこの花を買いたいです"},{"hanzi":"他想要一本英文書","pinyin":"Tā xiǎng yào yì běn yīngwén shū","translation_ja":"彼は英語の本を一冊欲しいと思っています"},{"hanzi":"你想吃什麼？","pinyin":"Nǐ xiǎng chī shénme?","translation_ja":"あなたは何を食べたいですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',4,'送','sòng','贈る','[{"hanzi":"我要送媽媽一束花","pinyin":"Wǒ yào sòng māma yí shù huā.","translation_ja":"私は母に花を一束贈るつもりです"},{"hanzi":"他送給我一支鉛筆","pinyin":"Tā sòng gěi wǒ yì zhī qiānbǐ.","translation_ja":"彼は私に鉛筆を一本贈りました"},{"hanzi":"你準備送什麼禮物？","pinyin":"Nǐ zhǔnbèi sòng shénme lǐwù?","translation_ja":"あなたはどんなプレゼントを贈る準備をしていますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',5,'個','ge','～個','[{"hanzi":"我買了一個蛋糕","pinyin":"Wǒ mǎile yí ge dàngāo.","translation_ja":"私はケーキを一つ買いました"},{"hanzi":"這是一個好主意","pinyin":"Zhè shì yí ge hǎo zhǔyì.","translation_ja":"これは良いアイデアです"},{"hanzi":"你要幾個？","pinyin":"Nǐ yào jǐ ge?","translation_ja":"あなたはいくつ欲しいですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',6,'看','kàn','見る','[{"hanzi":"我想看那本書","pinyin":"Wǒ xiǎng kàn nà běn shū.","translation_ja":"私はあの本を見たいです"},{"hanzi":"他正在看電視","pinyin":"Tā zhèngzài kàn diànshì.","translation_ja":"彼はテレビを見ています"},{"hanzi":"你看這朵花，好漂亮！","pinyin":"Nǐ kàn zhè duǒ huā, hǎo piàoliàng!","translation_ja":"この花を見てください、とても綺麗です！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',7,'書','shū','本','[{"hanzi":"我每天都看書","pinyin":"Wǒ měitiān dōu kàn shū.","translation_ja":"私は毎日本を読みます"},{"hanzi":"他買了兩本中文書","pinyin":"Tā mǎile liǎng běn Zhōngwén shū.","translation_ja":"彼は中国語の本を2冊買いました"},{"hanzi":"這本書很好看","pinyin":"Zhè běn shū hěn hǎokàn.","translation_ja":"この本はとても面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',8,'兩','liǎng','二つ','[{"hanzi":"我買了兩件衣服","pinyin":"Wǒ mǎile liǎng jiàn yīfú.","translation_ja":"私は服を2着買いました"},{"hanzi":"他有兩個鉛筆盒","pinyin":"Tā yǒu liǎng ge qiān bǐ hé.","translation_ja":"彼は鉛筆ケースを2つ持っています"},{"hanzi":"我們兩個人一起去","pinyin":"Wǒmen liǎng ge rén yì qǐ qù.","translation_ja":"私たちは2人で一緒に行きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',9,'本','běn','～冊','[{"hanzi":"這是一本中文書","pinyin":"Zhè shì yì běn Zhōngwén shū.","translation_ja":"これは中国語の本です"},{"hanzi":"我想看那本英文書","pinyin":"Wǒ xiǎng kàn nà běn Yīngwén shū.","translation_ja":"私はあの英語の本を見たいです"},{"hanzi":"這本書是誰的？","pinyin":"Zhè běn shū shì shéi de?","translation_ja":"この本は誰のですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',10,'中文','zhōng wén','中国語','[{"hanzi":"我在學中文","pinyin":"Wǒ zài xué Zhōngwén.","translation_ja":"私は中国語を勉強しています"},{"hanzi":"他的中文說得很好","pinyin":"Tā de Zhōngwén shuō de hěn hǎo.","translation_ja":"彼は中国語を上手に話します"},{"hanzi":"這是一本中文小說","pinyin":"Zhè shì yì běn Zhōngwén xiǎoshuō.","translation_ja":"これは中国語の小説です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',11,'英文','yīng wén','英語','[{"hanzi":"你會說英文嗎？","pinyin":"Nǐ huì shuō Yīngwén ma?","translation_ja":"あなたは英語を話せますか？"},{"hanzi":"我想買一本英文書","pinyin":"Wǒ xiǎng mǎi yì běn Yīngwén shū.","translation_ja":"私は英語の本を一冊買いたいです"},{"hanzi":"他用英文寫信給我","pinyin":"Tā yòng Yīngwén xiěxìn gěi wǒ.","translation_ja":"彼は英語で私に手紙を書きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',12,'一些','yì xiē','いくつか','[{"hanzi":"我買了一些水果","pinyin":"Wǒ mǎile yì xiē shuǐguǒ.","translation_ja":"私はいくつかの果物を買いました"},{"hanzi":"他有一些問題想問","pinyin":"Tā yǒu yì xiē wèntí xiǎng wèn.","translation_ja":"彼はいくつか質問をしたいです"},{"hanzi":"你需要一些幫助嗎？","pinyin":"Nǐ xūyào yì xiē bāngzhù ma?","translation_ja":"あなたはいくらか助けが必要ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',13,'花','huā','花','[{"hanzi":"這朵花很漂亮","pinyin":"Zhè duǒ huā hěn piàoliàng","translation_ja":"この花はとても綺麗です"},{"hanzi":"我送媽媽一束花","pinyin":"Wǒ sòng māma yí shù huā.","translation_ja":"私は母に花を一束贈ります"},{"hanzi":"他喜歡種花","pinyin":"Tā xǐhuān zhòng huā.","translation_ja":"彼は花を育てるのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',14,'朵','duǒ','～輪','[{"hanzi":"我買了一朵玫瑰花","pinyin":"Wǒ mǎile yì duǒ méiguīhuā.","translation_ja":"私はバラの花を一輪買いました"},{"hanzi":"這朵花是送給你的","pinyin":"Zhè duǒ huā shì sòng gěi nǐ de.","translation_ja":"この花はあなたに贈るものです"},{"hanzi":"你看那朵花，好美！","pinyin":"Nǐ kàn nà duǒ huā, hǎo měi!","translation_ja":"あの花を見てください、とても美しいです！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',15,'和','hé','～と','[{"hanzi":"我和他是好朋友","pinyin":"Wǒ hé tā shì hǎo péngyǒu.","translation_ja":"私と彼は親友です"},{"hanzi":"你喜歡咖啡和茶嗎？","pinyin":"Nǐ xǐhuān kā fēi hé chá ma?","translation_ja":"あなたはコーヒーとお茶が好きですか？"},{"hanzi":"他和我一起去商店","pinyin":"Tā hé wǒ yì qǐ qù shāngdiàn.","translation_ja":"彼は私と一緒にお店に行きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',16,'大','dà','大きい','[{"hanzi":"這個蛋糕很大","pinyin":"Zhège dàngāo hěn dà.","translation_ja":"このケーキはとても大きいです"},{"hanzi":"那是一個大城市","pinyin":"Nà shì yí ge dà chéng shì","translation_ja":"あれは大きな都市です"},{"hanzi":"這件衣服太大了","pinyin":"Zhè jiàn yīfú tài dà le.","translation_ja":"この服は大きすぎます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',17,'小','xiǎo','小さい','[{"hanzi":"這本書很小","pinyin":"Zhè běn shū hěn xiǎo.","translation_ja":"この本はとても小さいです"},{"hanzi":"他住在一個小房子裡","pinyin":"Tā zhù zài yí gè xiǎo fángzi lǐ.","translation_ja":"彼は小さな家に住んでいます"},{"hanzi":"這個盒子太小了","pinyin":"Zhège hézi tài xiǎo le.","translation_ja":"この箱(入れ物)は小さすぎます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',18,'蛋糕','dàn gāo','ケーキ','[{"hanzi":"我買了一個生日蛋糕","pinyin":"Wǒ mǎile yí ge shēngrì dàngāo.","translation_ja":"私は誕生日ケーキを一つ買いました"},{"hanzi":"這個蛋糕很好吃","pinyin":"Zhège dàngāo hěn hǎochī.","translation_ja":"このケーキはとても美味しいです"},{"hanzi":"你會做蛋糕嗎？","pinyin":"Nǐ huì zuò dàngāo ma?","translation_ja":"あなたはケーキを作れますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',19,'蛋','dàn','卵','[{"hanzi":"我早飯吃了兩個蛋","pinyin":"Wǒ zǎofàn chīle liǎng gè dàn.","translation_ja":"私は朝ご飯に卵を2個食べました"},{"hanzi":"這是一顆煮蛋","pinyin":"Zhè shì yì kē zhǔ dàn.","translation_ja":"これはゆで卵です"},{"hanzi":"我喜歡吃雞蛋","pinyin":"Wǒ xǐhuān chī jīdàn.","translation_ja":"私は鶏卵を食べるのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',20,'一起','yì qǐ','一緒に','[{"hanzi":"我們一起去商店吧","pinyin":"Wǒmen yì qǐ qù shāngdiàn ba.","translation_ja":"一緒にお店に行きましょう"},{"hanzi":"他和我一起學中文","pinyin":"Tā hé wǒ yì qǐ xué Zhōngwén.","translation_ja":"彼は私と一緒に中国語を学んでいます"},{"hanzi":"我們一起看電視","pinyin":"Wǒmen yì qǐ kàn diànshì.","translation_ja":"私たちは一緒にテレビを見ます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',21,'啊','a','～ね','[{"hanzi":"好漂亮啊！","pinyin":"Hǎo piàoliàng a!","translation_ja":"とても綺麗ですね！"},{"hanzi":"你怎麼來這裡啊？","pinyin":"Nǐ zěnme lái zhèlǐ a?","translation_ja":"あなたはどうしてここに来ましたか？"},{"hanzi":"別忘了帶手機啊！","pinyin":"Bié wàngle dài shǒujī a!","translation_ja":"携帯を忘れないでね！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',22,'這','zhè','これ','[{"hanzi":"這是我的書","pinyin":"Zhè shì wǒ de shū.","translation_ja":"これは私の本です"},{"hanzi":"你喜歡這件衣服嗎？","pinyin":"Nǐ xǐhuān zhè jiàn yīfú ma?","translation_ja":"この服が好きですか？"},{"hanzi":"這些花很漂亮","pinyin":"Zhè xiē huā hěn piào liàng","translation_ja":"これらの花はとても綺麗です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',23,'那','nà','あれ','[{"hanzi":"那是我的朋友","pinyin":"Nà shì wǒ de péngyǒu.","translation_ja":"あれは私の友達です"},{"hanzi":"那本書很好看","pinyin":"Nà běn shū hěn hǎokàn.","translation_ja":"あの本はとても面白いです"},{"hanzi":"那些東西是誰的？","pinyin":"Nàxiē dōngxi shì shéi de?","translation_ja":"あれらのものは誰のものですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',24,'種','zhǒng','種類','[{"hanzi":"你喜歡哪種顏色？","pinyin":"Nǐ xǐhuān nǎ zhǒng yánsè?","translation_ja":"あなたはどの色が好きですか？"},{"hanzi":"這是一種特別的花","pinyin":"Zhè shì yì zhǒng tèbié de huā.","translation_ja":"これは特別な種類の花です"},{"hanzi":"那種蛋糕很好吃","pinyin":"Nà zhǒng dàngāo hěn hǎochī.","translation_ja":"あの種類のケーキはとても美味しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',25,'鉛筆','qiān bǐ','鉛筆','[{"hanzi":"我買了一支鉛筆","pinyin":"Wǒ mǎile yì zhī qiānbǐ.","translation_ja":"私は鉛筆を一本買いました"},{"hanzi":"你有鉛筆嗎？","pinyin":"Nǐ yǒu qiānbǐ ma?","translation_ja":"あなたは鉛筆を持っていますか？"},{"hanzi":"這支鉛筆很便宜","pinyin":"Zhè zhī qiānbǐ hěn piányí.","translation_ja":"この鉛筆はとても安いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',26,'筆','bǐ','ペン','[{"hanzi":"他送給我一支筆","pinyin":"Tā sòng gěi wǒ yì zhī bǐ.","translation_ja":"彼は私に一本のペンをくれました"},{"hanzi":"我需要一支紅色的筆","pinyin":"Wǒ xūyào yī zhī hóngsè de bǐ.","translation_ja":"私は赤いペンが一本必要です"},{"hanzi":"這支筆很好用","pinyin":"Zhè zhī bǐ hěn hǎo yòng.","translation_ja":"このペンはとても使いやすいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',27,'怎麼樣','zěn me yàng','どうですか','[{"hanzi":"這本書怎麼樣？","pinyin":"Zhè běn shū zěnme yàng?","translation_ja":"この本はどうですか？"},{"hanzi":"你覺得這件衣服怎麼樣？","pinyin":"Nǐ juéde zhè jiàn yīfú zěnme yàng?","translation_ja":"この服はどう思いますか？"},{"hanzi":"那家店的蛋糕怎麼樣？","pinyin":"Nà jiā diàn de dàngāo zěnme yàng?","translation_ja":"あのお店のケーキはどうですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',28,'東西','dōng xi','物','[{"hanzi":"我買了很多東西","pinyin":"Wǒ mǎile hěn duō dōngxi.","translation_ja":"私はたくさんのものを買いました"},{"hanzi":"這些東西是誰的？","pinyin":"Zhèxiē dōngxi shì shéi de?","translation_ja":"これらのものは誰のですか？"},{"hanzi":"我需要一些新東西","pinyin":"Wǒ xūyào yīxiē xīn dōngxi.","translation_ja":"私は新しいものがいくつか必要です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',29,'枝','zhī','～本','[{"hanzi":"他買了一枝花送給我","pinyin":"Tā mǎile yī zhī huā sòng gěi wǒ.","translation_ja":"彼は私に一本の花を買ってくれました"},{"hanzi":"這是一枝很特別的筆","pinyin":"Zhè shì yī zhī hěn tèbié de bǐ.","translation_ja":"これはとても特別なペンです"},{"hanzi":"我有三枝紅色的鉛筆","pinyin":"Wǒ yǒu sān zhī hóngsè de qiānbǐ.","translation_ja":"私は赤い鉛筆を3本持っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',30,'塊錢','kuài qián','～元（お金）','[{"hanzi":"這件衣服要五十塊錢","pinyin":"Zhè jiàn yīfú yào wǔshí kuài qián.","translation_ja":"この服は50元かかります"},{"hanzi":"我只有十塊錢","pinyin":"Wǒ zhǐyǒu shí kuài qián.","translation_ja":"私は10元しか持っていません"},{"hanzi":"那支筆要多少塊錢？","pinyin":"Nà zhī bǐ yào duōshǎo kuài qián?","translation_ja":"あのペンはいくらですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',31,'元','yuán','元','[{"hanzi":"他給了我一百元","pinyin":"Tā gěile wǒ yī bǎi yuán.","translation_ja":"彼は私に100元くれました"},{"hanzi":"這個蛋糕要三十元","pinyin":"Zhège dàngāo yào sānshí yuán.","translation_ja":"このケーキは30元です"},{"hanzi":"我想買五元的鉛筆","pinyin":"Wǒ xiǎng mǎi wǔ yuán de qiānbǐ.","translation_ja":"私は5元の鉛筆を買いたいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',32,'便宜','pián yí','安い','[{"hanzi":"這支筆很便宜","pinyin":"Zhè zhī bǐ hěn piányí.","translation_ja":"このペンはとても安いです"},{"hanzi":"你知道哪裡有便宜的衣服嗎？","pinyin":"Nǐ zhīdào nǎlǐ yǒu piányí de yīfú ma?","translation_ja":"どこに安い服があるか知っていますか？"},{"hanzi":"這家店的東西比較便宜","pinyin":"Zhè jiā diàn de dōngxi bǐjiào piányí.","translation_ja":"このお店のものは比較的安いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',33,'貴','guì','高い（値段）','[{"hanzi":"這件衣服太貴了","pinyin":"Zhè jiàn yīfú tài guì le.","translation_ja":"この服は高すぎます"},{"hanzi":"他買了一個很貴的蛋糕","pinyin":"Tā mǎile yī gè hěn guì de dàngāo.","translation_ja":"彼はとても高価なケーキを買いました"},{"hanzi":"這家店的東西太貴了！","pinyin":"Zhè jiā diàn de dōngxi tài guì le!","translation_ja":"このお店のものは高すぎます！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',34,'顏色','yán sè','色','[{"hanzi":"你喜歡什麼顏色？","pinyin":"Nǐ xǐhuān shénme yánsè?","translation_ja":"あなたはどんな色が好きですか？"},{"hanzi":"這件衣服有很多顏色","pinyin":"Zhè jiàn yīfú yǒu hěn duō yánsè.","translation_ja":"この服にはたくさんの色があります"},{"hanzi":"紅色是我最喜歡的顏色","pinyin":"Hóngsè shì wǒ zuì xǐhuān de yánsè.","translation_ja":"赤は私が一番好きな色です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',35,'紅色','hóng sè','赤色','[{"hanzi":"這件紅色的衣服很好看","pinyin":"Zhè jiàn hóngsè de yīfú hěn hǎokàn.","translation_ja":"この赤い服はとても素敵です"},{"hanzi":"他喜歡紅色的花","pinyin":"Tā xǐhuān hóngsè de huā.","translation_ja":"彼は赤い花が好きです"},{"hanzi":"這本紅色的書是我的","pinyin":"Zhè běn hóngsè de shū shì wǒ de.","translation_ja":"この赤い本は私のです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',36,'白色','bái sè','白色','[{"hanzi":"這朵白色的花很漂亮","pinyin":"Zhè duǒ bái sè de huā hěn piào liàng","translation_ja":"この白い花はとても綺麗です"},{"hanzi":"我想買一件白色的衣服","pinyin":"Wǒ xiǎng mǎi yī jiàn báisè de yīfú.","translation_ja":"私は白い服を一着買いたいです"},{"hanzi":"白色的蛋糕看起來很好吃","pinyin":"Báisè de dàngāo kàn qǐlái hěn hǎochī.","translation_ja":"白いケーキは美味しそうに見えます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',37,'都','dōu','全て','[{"hanzi":"我們都很喜歡這件禮物","pinyin":"Wǒmen dōu hěn xǐhuān zhè jiàn lǐwù.","translation_ja":"私たちはみんなこのプレゼントがとても好きです"},{"hanzi":"他們都去了公園","pinyin":"Tāmen dōu qùle gōngyuán.","translation_ja":"彼らはみんな公園に行きました"},{"hanzi":"這些書我都看過了","pinyin":"Zhèxiē shū wǒ dōu kànguò le.","translation_ja":"これらの本はすべて読みました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',38,'好看','hǎo kàn','綺麗/良い','[{"hanzi":"這本書很好看","pinyin":"Zhè běn shū hěn hǎokàn.","translation_ja":"この本はとても面白いです"},{"hanzi":"她穿的衣服很好看","pinyin":"Tā chuān de yīfú hěn hǎokàn.","translation_ja":"彼女が着ている服はとても素敵です"},{"hanzi":"這部電影真的很好看！","pinyin":"Zhè bù diànyǐng zhēn de hěn hǎokàn!","translation_ja":"この映画は本当に面白いです！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',39,'常(常)','cháng (cháng)','よく','[{"hanzi":"我常常去圖書館","pinyin":"Wǒ chángcháng qù túshūguǎn.","translation_ja":"私はよく図書館に行きます"},{"hanzi":"他常常幫助朋友","pinyin":"Tā chángcháng bāngzhù péngyǒu.","translation_ja":"彼はよく友達を助けます"},{"hanzi":"我們常常一起學中文","pinyin":"Wǒmen chángcháng yīqǐ xué Zhōngwén.","translation_ja":"私たちはよく一緒に中国語を勉強します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',40,'穿','chuān','着る','[{"hanzi":"我每天穿校服去學校","pinyin":"Wǒ měitiān chuān xiàofú qù xuéxiào.","translation_ja":"私は毎日制服を着て学校に行きます"},{"hanzi":"她穿了一件紅色的裙子","pinyin":"Tā chuānle yī jiàn hóngsè de qúnzi.","translation_ja":"彼女は赤いスカートを着ています"},{"hanzi":"你喜歡穿什麼樣的衣服？","pinyin":"Nǐ xǐhuān chuān shénme yàng de yīfú?","translation_ja":"あなたはどんな服を着るのが好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',41,'衣服','yī fu','服','[{"hanzi":"我買了一件新衣服","pinyin":"Wǒ mǎile yī jiàn xīn yīfú.","translation_ja":"私は新しい服を1着買いました"},{"hanzi":"這件衣服很好看","pinyin":"Zhè jiàn yīfú hěn hǎokàn.","translation_ja":"この服はとても素敵です"},{"hanzi":"你喜歡這件衣服嗎？","pinyin":"Nǐ xǐhuān zhè jiàn yīfú ma?","translation_ja":"あなたはこの服が好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',42,'件','jiàn','～着','[{"hanzi":"我買了兩件衣服","pinyin":"Wǒ mǎile liǎng jiàn yīfú.","translation_ja":"私は服を2着買いました"},{"hanzi":"這是一件好事","pinyin":"Zhè shì yī jiàn hǎo shì.","translation_ja":"これは良いことです"},{"hanzi":"那件衣服是誰的？","pinyin":"Nà jiàn yīfú shì shéi de?","translation_ja":"あの服は誰のものですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',43,'請','qǐng','～してください','[{"hanzi":"請問，這裡有廁所嗎？","pinyin":"Qǐngwèn, zhèlǐ yǒu cèsuǒ ma?","translation_ja":"お尋ねしますが、ここにトイレはありますか？"},{"hanzi":"請給我一杯水","pinyin":"Qǐng gěi wǒ yī bēi shuǐ.","translation_ja":"水を一杯ください"},{"hanzi":"請幫我買一本書","pinyin":"Qǐng bāng wǒ mǎi yī běn shū.","translation_ja":"本を1冊買ってください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',44,'玩','wán','遊ぶ','[{"hanzi":"我們一起玩遊戲吧","pinyin":"Wǒmen yīqǐ wán yóuxì ba.","translation_ja":"一緒にゲームをしましょう"},{"hanzi":"孩子們在公園玩","pinyin":"Háizimen zài gōngyuán wán.","translation_ja":"子どもたちは公園で遊んでいます"},{"hanzi":"你喜歡玩什麼？","pinyin":"Nǐ xǐhuān wán shénme?","translation_ja":"あなたは何をするのが好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',45,'這些','zhè xiē','これら','[{"hanzi":"這些書是我的","pinyin":"Zhèxiē shū shì wǒ de.","translation_ja":"これらの本は私のものです"},{"hanzi":"你要不要買這些東西？","pinyin":"Nǐ yào bù yào mǎi zhèxiē dōngxi?","translation_ja":"あなたはこれらのものを買いますか？"},{"hanzi":"這些花很漂亮","pinyin":"Zhè xiē huā hěn piào liàng","translation_ja":"これらの花はとても綺麗です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',46,'那些','nà xiē','あれら','[{"hanzi":"那些人是誰？","pinyin":"Nàxiē rén shì shéi?","translation_ja":"あの人たちは誰ですか？"},{"hanzi":"我喜歡那些花","pinyin":"Wǒ xǐhuān nàxiē huā.","translation_ja":"私はあの花が好きです"},{"hanzi":"那些衣服很便宜","pinyin":"Nàxiē yīfú hěn piányí.","translation_ja":"あの服はとても安いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',47,'點心','diǎn xīn','軽食','[{"hanzi":"下午我們吃了一些點心","pinyin":"Xiàwǔ wǒmen chīle yīxiē diǎnxīn.","translation_ja":"午後、私たちは軽食を少し食べました"},{"hanzi":"他做的點心很好吃","pinyin":"Tā zuò de diǎnxīn hěn hǎochī.","translation_ja":"彼が作った軽食はとても美味しいです"},{"hanzi":"你喜歡吃什麼點心？","pinyin":"Nǐ xǐhuān chī shénme diǎnxīn?","translation_ja":"あなたはどんな軽食が好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',48,'甜點','tián diǎn','デザート','[{"hanzi":"這家店的甜點很好吃","pinyin":"Zhè jiā diàn de tiándiǎn hěn hǎochī.","translation_ja":"このお店のデザートはとても美味しいです"},{"hanzi":"他買了一些甜點給我們","pinyin":"Tā mǎile yīxiē tiándiǎn gěi wǒmen.","translation_ja":"彼は私たちにいくつかのデザートを買ってくれました"},{"hanzi":"你想吃甜點嗎？","pinyin":"Nǐ xiǎng chī tiándiǎn ma?","translation_ja":"あなたはデザートを食べたいですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',49,'甜','tián','甘い','[{"hanzi":"這個蛋糕很甜","pinyin":"Zhège dàngāo hěn tián.","translation_ja":"このケーキはとても甘いです"},{"hanzi":"這杯茶不甜","pinyin":"Zhè bēi chá bù tián.","translation_ja":"このお茶は甘くありません"},{"hanzi":"你喜歡甜的東西嗎？","pinyin":"Nǐ xǐhuān tián de dōngxi ma?","translation_ja":"あなたは甘いものが好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson03',50,'開心','kāi xīn','嬉しい','[{"hanzi":"今天我很開心","pinyin":"Jīntiān wǒ hěn kāixīn.","translation_ja":"今日はとても嬉しいです"},{"hanzi":"他聽到好消息很開心","pinyin":"Tā tīngdào hǎo xiāoxi hěn kāixīn.","translation_ja":"彼は良い知らせを聞いてとても嬉しいです"},{"hanzi":"和朋友一起玩很開心","pinyin":"Hé péngyǒu yīqǐ wán hěn kāixīn.","translation_ja":"友達と遊ぶのはとても楽しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',1,'咖啡','kā fēi','コーヒー','[{"hanzi":"我每天早上喝咖啡","pinyin":"Wǒ měitiān zǎoshàng hē kāfēi.","translation_ja":"私は毎朝コーヒーを飲みます"},{"hanzi":"你想要一杯咖啡嗎？","pinyin":"Nǐ xiǎng yào yī bēi kāfēi ma?","translation_ja":"コーヒーを一杯飲みたいですか？"},{"hanzi":"咖啡比茶貴","pinyin":"Kāfēi bǐ chá guì.","translation_ja":"コーヒーはお茶より高いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',2,'還是','hái shì','それとも','[{"hanzi":"你要咖啡還是茶？","pinyin":"Nǐ yào kāfēi háishì chá?","translation_ja":"コーヒーにしますか、それともお茶にしますか？"},{"hanzi":"我不確定今天熱還是冷","pinyin":"Wǒ bú què dìng jīn tiān rè hái shì lěng","translation_ja":"今日が暑いのか寒いのかわかりません"},{"hanzi":"你喜歡看書還是聽音樂？","pinyin":"Nǐ xǐhuān kàn shū háishì tīng yīnyuè?","translation_ja":"本を読むのが好きですか、それとも音楽を聴くのが好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',3,'天氣','tiān qì','天気','[{"hanzi":"今天的天氣很好","pinyin":"Jīntiān de tiānqì hěn hǎo.","translation_ja":"今日の天気はとても良いです"},{"hanzi":"天氣太熱了","pinyin":"Tiānqì tài rè le.","translation_ja":"天気が暑すぎます"},{"hanzi":"明天的天氣怎麼樣？","pinyin":"Míngtiān de tiānqì zěnme yàng?","translation_ja":"明日の天気はどうですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',4,'好','hǎo','良い','[{"hanzi":"這本書很好看","pinyin":"Zhè běn shū hěn hǎokàn.","translation_ja":"この本はとても面白いです"},{"hanzi":"天氣好的時候，我喜歡散步","pinyin":"Tiānqì hǎo de shíhòu, wǒ xǐhuān sànbù.","translation_ja":"天気が良いとき、散歩が好きです"},{"hanzi":"好好學習，就能考得好","pinyin":"Hǎohǎo xuéxí, jiù néng kǎo de hǎo.","translation_ja":"よく勉強すれば、試験で良い点が取れます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',5,'熱','rè','暑い','[{"hanzi":"今天很熱","pinyin":"Jīntiān hěn rè.","translation_ja":"今日はとても暑いです"},{"hanzi":"我不喜歡喝熱咖啡","pinyin":"Wǒ bù xǐhuān hē rè kāfēi.","translation_ja":"私は熱いコーヒーが好きではありません"},{"hanzi":"這杯茶太熱了，不能喝","pinyin":"Zhè bēi chá tài rè le, bùnéng hē.","translation_ja":"このお茶は熱すぎて飲めません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',6,'冷','lěng','寒い','[{"hanzi":"今天很冷","pinyin":"Jīntiān hěn lěng.","translation_ja":"今日はとても寒いです"},{"hanzi":"冷天氣裡喝熱湯很舒服","pinyin":"Lěng tiānqì lǐ hē rè tāng hěn shūfú.","translation_ja":"寒い日に熱いスープを飲むのは気持ちが良いです"},{"hanzi":"這裡的冬天很冷","pinyin":"Zhèlǐ de dōngtiān hěn lěng.","translation_ja":"ここの冬はとても寒いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',7,'飲料','yǐn liào','飲み物','[{"hanzi":"你喜歡喝什麼飲料？","pinyin":"Nǐ xǐhuān hē shénme yǐnliào?","translation_ja":"あなたはどんな飲み物が好きですか？"},{"hanzi":"這家店的飲料很好喝","pinyin":"Zhè jiā diàn de yǐnliào hěn hǎohē.","translation_ja":"このお店の飲み物はとても美味しいです"},{"hanzi":"他點了一杯冷飲料","pinyin":"Tā diǎnle yī bēi lěng yǐnliào.","translation_ja":"彼は冷たい飲み物を注文しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',8,'也','yě','～も','[{"hanzi":"我也喜歡喝咖啡","pinyin":"Wǒ yě xǐhuān hē kāfēi.","translation_ja":"私もコーヒーを飲むのが好きです"},{"hanzi":"他也是學生","pinyin":"Tā yě shì xuéshēng.","translation_ja":"彼も学生です"},{"hanzi":"天氣不好，我也不想出去","pinyin":"Tiānqì bù hǎo, wǒ yě bù xiǎng chūqù.","translation_ja":"天気が悪いので、私も外出したくありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',9,'餓','è','空腹である','[{"hanzi":"我現在很餓","pinyin":"Wǒ xiànzài hěn è.","translation_ja":"今、とてもお腹が空いています"},{"hanzi":"他餓了，要吃東西","pinyin":"Tā è le, yào chī dōngxi.","translation_ja":"彼はお腹が空いたので、何かを食べたがっています"},{"hanzi":"晚上我餓了，吃了一碗麵","pinyin":"Wǎnshàng wǒ è le, chīle yī wǎn miàn.","translation_ja":"夜にお腹が空いて、麺を一杯食べました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',10,'渴','kě','喉が渇く','[{"hanzi":"你渴嗎？","pinyin":"Nǐ kě ma?","translation_ja":"あなたは喉が渇いていますか？"},{"hanzi":"他很渴，喝了一瓶水","pinyin":"Tā hěn kě, hēle yī píng shuǐ.","translation_ja":"彼はとても喉が渇いて、水を一本飲みました"},{"hanzi":"渴的時候喝果汁很舒服","pinyin":"Kě de shíhòu hē guǒzhī hěn shūfú.","translation_ja":"喉が渇いたときにジュースを飲むのは気持ちが良いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',11,'(一)點(兒)','(yì) diǎn (r)','少し','[{"hanzi":"我想喝一點兒果汁","pinyin":"Wǒ xiǎng hē yīdiǎnr guǒzhī.","translation_ja":"私はジュースを少し飲みたいです"},{"hanzi":"今天有一點兒冷","pinyin":"Jīntiān yǒu yīdiǎnr lěng.","translation_ja":"今日は少し寒いです"},{"hanzi":"請給我一點兒時間","pinyin":"Qǐng gěi wǒ yīdiǎnr shíjiān.","translation_ja":"少し時間をください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',12,'餐廳/飯館','cān tīng / fàn guǎn','レストラン','[{"hanzi":"我們去餐廳吃飯吧","pinyin":"Wǒmen qù cāntīng chīfàn ba.","translation_ja":"レストランに食事に行きましょう"},{"hanzi":"這家餐廳的菜很好吃","pinyin":"Zhè jiā cāntīng de cài hěn hǎochī.","translation_ja":"このレストランの料理はとても美味しいです"},{"hanzi":"你知道附近有什麼飯館嗎？","pinyin":"Nǐ zhīdào fùjìn yǒu shénme fànguǎn ma?","translation_ja":"近くにどんなレストランがあるか知っていますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',13,'家','jiā','家','[{"hanzi":"我家有五個人","pinyin":"Wǒ jiā yǒu wǔ gè rén.","translation_ja":"私の家族は5人です"},{"hanzi":"她今天不在家","pinyin":"Tā jīntiān bù zài jiā.","translation_ja":"彼女は今日は家にいません"},{"hanzi":"我們回家吧","pinyin":"Wǒmen huí jiā ba.","translation_ja":"家に帰りましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',14,'太','tài','あまりに','[{"hanzi":"今天太熱了！","pinyin":"Jīntiān tài rè le!","translation_ja":"今日は暑すぎます！"},{"hanzi":"這件衣服太貴了","pinyin":"Zhè jiàn yīfú tài guì le.","translation_ja":"この服は高すぎます"},{"hanzi":"他太忙，沒時間休息","pinyin":"Tā tài máng, méi shíjiān xiūxi.","translation_ja":"彼は忙しすぎて、休む時間がありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',15,'多','duō','多い','[{"hanzi":"這裡有很多人","pinyin":"Zhèlǐ yǒu hěn duō rén.","translation_ja":"ここにはたくさんの人がいます"},{"hanzi":"你喝了多少水？","pinyin":"Nǐ hēle duōshǎo shuǐ?","translation_ja":"あなたはどれくらい水を飲みましたか？"},{"hanzi":"他的錢比我多","pinyin":"Tā de qián bǐ wǒ duō.","translation_ja":"彼のお金は私より多いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',16,'少','shǎo','少ない','[{"hanzi":"這裡人很少","pinyin":"Zhèlǐ rén hěn shǎo.","translation_ja":"ここには人が少ないです"},{"hanzi":"這本書的字很少","pinyin":"Zhè běn shū de zì hěn shǎo.","translation_ja":"この本は字が少ないです"},{"hanzi":"你少吃一點兒吧","pinyin":"Nǐ shǎo chī yīdiǎnr ba.","translation_ja":"少し食べる量を減らした方がいいですよ"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',17,'麵','miàn','麺','[{"hanzi":"這碗麵很好吃","pinyin":"Zhè wǎn miàn hěn hǎochī.","translation_ja":"この麺はとても美味しいです"},{"hanzi":"你想吃牛肉麵還是雞肉麵？","pinyin":"Nǐ xiǎng chī niúròu miàn háishì jīròu miàn?","translation_ja":"牛肉麺と鶏肉麺のどちらを食べたいですか？"},{"hanzi":"我們中午吃麵吧","pinyin":"Wǒmen zhōngwǔ chī miàn ba.","translation_ja":"昼に麺を食べましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',18,'好吃','hǎo chī','美味しい（食べ物）','[{"hanzi":"這道菜很好吃","pinyin":"Zhè dào cài hěn hǎochī.","translation_ja":"この料理はとても美味しいです"},{"hanzi":"他做的蛋糕特別好吃","pinyin":"Tā zuò de dàngāo tèbié hǎochī.","translation_ja":"彼が作ったケーキは特に美味しいです"},{"hanzi":"你覺得這碗湯好吃嗎？","pinyin":"Nǐ juéde zhè wǎn tāng hǎochī ma?","translation_ja":"このスープは美味しいと思いますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',19,'好喝','hǎo hē','美味しい（飲み物）','[{"hanzi":"這杯咖啡很好喝","pinyin":"Zhè bēi kāfēi hěn hǎohē.","translation_ja":"このコーヒーはとても美味しいです"},{"hanzi":"夏天喝果汁很好喝","pinyin":"Xiàtiān hē guǒzhī hěn hǎohē.","translation_ja":"夏にジュースを飲むのはとても美味しいです"},{"hanzi":"這家店的奶茶真好喝！","pinyin":"Zhè jiā diàn de nǎichá zhēn hǎohē!","translation_ja":"このお店のミルクティーは本当に美味しいです！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',20,'了','le','～した（過去形）','[{"hanzi":"我吃了午飯","pinyin":"Wǒ chīle wǔfàn.","translation_ja":"私は昼ご飯を食べました"},{"hanzi":"他走了很久才到家","pinyin":"Tā zǒule hěn jiǔ cái dào jiā.","translation_ja":"彼は長い間歩いて、やっと家に着きました"},{"hanzi":"雨停了，我們可以出去玩了","pinyin":"Yǔ tíngle, wǒmen kěyǐ chūqù wán le.","translation_ja":"雨が止んだので、外に遊びに行けます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',21,'最','zuì','最も','[{"hanzi":"這是我最喜歡的書","pinyin":"Zhè shì wǒ zuì xǐhuān de shū.","translation_ja":"これは私が一番好きな本です"},{"hanzi":"他最喜歡喝咖啡","pinyin":"Tā zuì xǐhuān hē kāfēi.","translation_ja":"彼はコーヒーを飲むのが一番好きです"},{"hanzi":"今天是最冷的一天","pinyin":"Jīntiān shì zuì lěng de yī tiān.","translation_ja":"今日は一番寒い日です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',22,'賣','mài','売る','[{"hanzi":"這家店賣很多水果","pinyin":"Zhè jiā diàn mài hěn duō shuǐguǒ.","translation_ja":"このお店はたくさんの果物を売っています"},{"hanzi":"他賣了一輛舊車","pinyin":"Tā mài le yī liàng jiù chē.","translation_ja":"彼は古い車を売りました"},{"hanzi":"這裡賣的咖啡很好喝","pinyin":"Zhèlǐ mài de kāfēi hěn hǎohē.","translation_ja":"ここで売っているコーヒーはとても美味しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',23,'牛肉麵','niú ròu miàn','牛肉麺','[{"hanzi":"我想吃牛肉麵","pinyin":"Wǒ xiǎng chī niúròu miàn.","translation_ja":"私は牛肉麵が食べたいです"},{"hanzi":"這碗牛肉麵很好吃","pinyin":"Zhè wǎn niúròu miàn hěn hǎochī.","translation_ja":"この牛肉麺はとても美味しいです"},{"hanzi":"他點了一碗牛肉麵","pinyin":"Tā diǎn le yī wǎn niúròu miàn.","translation_ja":"彼は牛肉麺を一杯注文しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',24,'點','diǎn','注文する','[{"hanzi":"我想點一杯紅茶","pinyin":"Wǒ xiǎng diǎn yī bēi hóngchá.","translation_ja":"私は紅茶を一杯注文したいです"},{"hanzi":"你要點什麼菜？","pinyin":"Nǐ yào diǎn shénme cài?","translation_ja":"あなたはどんな料理を注文しますか？"},{"hanzi":"他點了三個菜","pinyin":"Tā diǎn le sān gè cài.","translation_ja":"彼は料理を3品注文しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',25,'碗','wǎn','～碗','[{"hanzi":"我吃了一碗湯麵","pinyin":"Wǒ chī le yī wǎn tāngmiàn.","translation_ja":"私はスープ麺を一杯食べました"},{"hanzi":"這碗飯是你的嗎？","pinyin":"Zhè wǎn fàn shì nǐ de ma?","translation_ja":"このご飯はあなたのですか？"},{"hanzi":"他每天早上喝一碗湯","pinyin":"Tā měitiān zǎoshàng hē yī wǎn tāng.","translation_ja":"彼は毎朝スープを一杯飲みます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',26,'杯','bēi','～杯','[{"hanzi":"我要一杯咖啡","pinyin":"Wǒ yào yī bēi kāfēi.","translation_ja":"コーヒーを一杯ください"},{"hanzi":"這杯果汁很好喝","pinyin":"Zhè bēi guǒzhī hěn hǎohē.","translation_ja":"このジュースはとても美味しいです"},{"hanzi":"你喝了幾杯水？","pinyin":"Nǐ hē le jǐ bēi shuǐ?","translation_ja":"あなたは何杯の水を飲みましたか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',27,'杯子','bēi zi','コップ','[{"hanzi":"這個杯子是我的","pinyin":"Zhège bēizi shì wǒ de.","translation_ja":"このカップは私のです"},{"hanzi":"你需要新的杯子嗎？","pinyin":"Nǐ xūyào xīn de bēizi ma?","translation_ja":"あなたは新しいカップが必要ですか？"},{"hanzi":"他送給我一個漂亮的杯子","pinyin":"Tā sòng gěi wǒ yī ge piào liàng de bēi zi","translation_ja":"彼は私に素敵なカップをくれました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',28,'瓶子','píng zi','ボトル','[{"hanzi":"這個瓶子很漂亮","pinyin":"Zhège píngzi hěn piào liàng.","translation_ja":"この瓶はとても綺麗です"},{"hanzi":"他買了一瓶子的水","pinyin":"Tā mǎi le yī píngzi de shuǐ.","translation_ja":"彼は瓶一杯の水を買いました"},{"hanzi":"你喜歡用玻璃瓶子嗎？","pinyin":"Nǐ xǐhuān yòng bōlí píngzi ma?","translation_ja":"あなたはガラス瓶を使うのが好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',29,'瓶','píng','～本（瓶）','[{"hanzi":"他買了一瓶牛奶","pinyin":"Tā mǎi le yī píng niúnǎi.","translation_ja":"彼は牛乳を1本買いました"},{"hanzi":"我買了一瓶果汁","pinyin":"Wǒ mǎi le yī píng guǒzhī.","translation_ja":"私はジュースを1本買いました"},{"hanzi":"這瓶茶很便宜","pinyin":"Zhè píng chá hěn piányí.","translation_ja":"このお茶はとても安いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',30,'女','nǚ','女性','[{"hanzi":"那個女孩子是誰？","pinyin":"Nà ge nǚ hái zi shì shéi?","translation_ja":"あの女の子は誰ですか？"},{"hanzi":"這位女士很友好","pinyin":"Zhè wèi nǚshì hěn yǒuhǎo.","translation_ja":"この女性はとても親切です"},{"hanzi":"女孩子喜歡漂亮的花","pinyin":"Nǚ hái zi xǐ huān piào liàng de huā","translation_ja":"女の子は綺麗な花が好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',31,'男','nán','男性','[{"hanzi":"他是一個男孩子","pinyin":"Tā shì yī ge nán háizi.","translation_ja":"彼は男の子です"},{"hanzi":"這位男士是我的老師","pinyin":"Zhè wèi nánshì shì wǒ de lǎoshī.","translation_ja":"この男性は私の先生です"},{"hanzi":"男孩子喜歡踢足球","pinyin":"Nán háizi xǐhuān tī zúqiú.","translation_ja":"男の子はサッカーをするのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',32,'位','wèi','～名','[{"hanzi":"請問這位是誰？","pinyin":"Qǐngwèn zhè wèi shì shéi?","translation_ja":"この方はどなたですか？"},{"hanzi":"有兩位客人來了","pinyin":"Yǒu liǎng wèi kèrén lái le.","translation_ja":"2名のお客様がいらっしゃいました"},{"hanzi":"這位先生是我們的老師","pinyin":"Zhè wèi xiānshēng shì wǒmen de lǎoshī.","translation_ja":"この男性は私たちの先生です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',33,'紅茶','hóng chá','紅茶','[{"hanzi":"我想喝一杯紅茶","pinyin":"Wǒ xiǎng hē yī bēi hóngchá.","translation_ja":"私は紅茶を一杯飲みたいです"},{"hanzi":"這家店的紅茶很好喝","pinyin":"Zhè jiā diàn de hóngchá hěn hǎohē.","translation_ja":"このお店の紅茶はとても美味しいです"},{"hanzi":"你喜歡紅茶還是綠茶？","pinyin":"Nǐ xǐhuān hóngchá háishì lǜchá?","translation_ja":"あなたは紅茶が好きですか、それとも緑茶ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',34,'綠茶','lǜ chá','緑茶','[{"hanzi":"這杯綠茶很香","pinyin":"Zhè bēi lǜchá hěn xiāng.","translation_ja":"この緑茶はとても香りが良いです"},{"hanzi":"夏天喝綠茶很舒服","pinyin":"Xiàtiān hē lǜchá hěn shūfú.","translation_ja":"夏に緑茶を飲むのは気持ちが良いです"},{"hanzi":"你知道哪裡有好喝的綠茶嗎？","pinyin":"Nǐ zhīdào nǎlǐ yǒu hǎohē de lǜchá ma?","translation_ja":"どこに美味しい緑茶があるか知っていますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',35,'綠色','lǜ sè','緑色','[{"hanzi":"綠色是自然的顏色","pinyin":"Lǜsè shì zìrán de yánsè.","translation_ja":"緑色は自然の色です"},{"hanzi":"他穿了一件綠色的衣服","pinyin":"Tā chuānle yī jiàn lǜsè de yīfú.","translation_ja":"彼は緑色の服を着ています"},{"hanzi":"這些綠色的植物很漂亮","pinyin":"Zhè xiē lǜ sè de zhí wù hěn piào liàng","translation_ja":"これらの緑色の植物はとても綺麗です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',36,'綠','lǜ','緑','[{"hanzi":"這條河的水是綠的","pinyin":"Zhè tiáo hé de shuǐ shì lǜ de.","translation_ja":"この川の水は緑色です"},{"hanzi":"綠的植物對眼睛好","pinyin":"Lǜ de zhíwù duì yǎnjīng hǎo.","translation_ja":"緑色の植物は目に良いです"},{"hanzi":"這裡的草地很綠","pinyin":"Zhèlǐ de cǎodì hěn lǜ.","translation_ja":"ここの芝生はとても緑色です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',37,'請','qǐng','～してください','[{"hanzi":"請坐，這裡有空位","pinyin":"Qǐng zuò, zhè lǐ yǒu kòng wèi","translation_ja":"座ってください、ここに空いている席があります"},{"hanzi":"請問洗手間在哪裡？","pinyin":"Qǐngwèn xǐshǒujiān zài nǎlǐ?","translation_ja":"お手洗いはどこですか？"},{"hanzi":"請幫我拿一下那本書","pinyin":"Qǐng bāng wǒ ná yīxià nà běn shū.","translation_ja":"あの本をちょっと取ってください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',38,'給','gěi','与える','[{"hanzi":"請給我一杯水","pinyin":"Qǐng gěi wǒ yī bēi shuǐ.","translation_ja":"水を一杯ください"},{"hanzi":"他給了我一本書","pinyin":"Tā gěile wǒ yī běn shū.","translation_ja":"彼は私に本を一冊くれました"},{"hanzi":"這件衣服是朋友給我的","pinyin":"Zhè jiàn yīfú shì péngyǒu gěi wǒ de.","translation_ja":"この服は友達がくれたものです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',39,'一共','yí gòng','合計','[{"hanzi":"一共多少錢？","pinyin":"Yígòng duōshǎo qián?","translation_ja":"合計でいくらですか？"},{"hanzi":"我們一共買了三杯飲料","pinyin":"Wǒ men yí gòng mǎi le sān bēi yǐn liào","translation_ja":"私たちは合計で3杯の飲み物を買いました"},{"hanzi":"這些東西一共要兩百元","pinyin":"Zhèxiē dōngxi yīgòng yào liǎng bǎi yuán.","translation_ja":"これらのものは合計で200元かかります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',40,'多少','duō shǎo','いくら','[{"hanzi":"這本書多少錢？","pinyin":"Zhè běn shū duōshǎo qián?","translation_ja":"この本はいくらですか？"},{"hanzi":"你家有多少人？","pinyin":"Nǐ jiā yǒu duōshǎo rén?","translation_ja":"あなたの家族は何人ですか？"},{"hanzi":"他喝了多少水？","pinyin":"Tā hēle duōshǎo shuǐ?","translation_ja":"彼はどれくらい水を飲みましたか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',41,'百','bǎi','百','[{"hanzi":"這件衣服一百元","pinyin":"Zhè jiàn yīfú yī bǎi yuán.","translation_ja":"この服は100元です"},{"hanzi":"我存了一百塊錢","pinyin":"Wǒ cúnle yī bǎi kuài qián.","translation_ja":"私は100元貯めました"},{"hanzi":"他買了兩百元的書","pinyin":"Tā mǎile liǎng bǎi yuán de shū.","translation_ja":"彼は200元の本を買いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',42,'千','qiān','千','[{"hanzi":"這輛車一千元","pinyin":"Zhè liàng chē yī qiān yuán.","translation_ja":"この車は1000元です"},{"hanzi":"你知道這裡有多少人嗎？幾千吧！","pinyin":"Nǐ zhīdào zhèlǐ yǒu duōshǎo rén ma? Jǐ qiān ba!","translation_ja":"ここに何人いるか知っていますか？何千人でしょう！"},{"hanzi":"他花了一千元買了一部手機","pinyin":"Tā huā le yī qiān yuán, mǎi le yí  bù shǒu jī","translation_ja":"彼は1000元を使って携帯を買いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',43,'萬','wàn','万','[{"hanzi":"那棟房子要一百萬","pinyin":"Nà dòng fángzi yào yī bǎi wàn.","translation_ja":"あの家は100万元します"},{"hanzi":"我們學校有一萬個學生","pinyin":"Wǒ men xué xiào yǒu yī wàn ge xué shēng","translation_ja":"私たちの学校には1万人の学生がいます"},{"hanzi":"這幅畫賣了三十萬元","pinyin":"Zhè fú huà mài le sān shí wàn yuán.","translation_ja":"この絵は30万元で売れました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',44,'零','líng','ゼロ','[{"hanzi":"他有零錢嗎？","pinyin":"Tā yǒu língqián ma?","translation_ja":"彼は小銭を持っていますか？"},{"hanzi":"這是一千零五十元","pinyin":"Zhè shì yī qiān líng wǔ shí yuán.","translation_ja":"これは1050元です"},{"hanzi":"我只需要一點零錢","pinyin":"Wǒ zhǐ xūyào yīdiǎn língqián.","translation_ja":"小銭が少し必要なだけです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',45,'找錢','zhǎo qián','お釣りを出す','[{"hanzi":"他找給我十元","pinyin":"Tā zhǎo gěi wǒ shí yuán","translation_ja":"彼は私に10元のお釣りをくれました"},{"hanzi":"你有沒有找錯錢？","pinyin":"Nǐ yǒu méiyǒu zhǎo cuò qián?","translation_ja":"お釣りを間違えていませんか？"},{"hanzi":"他找了五塊錢給我","pinyin":"Tā zhǎo le wǔ kuài qián gěi wǒ.","translation_ja":"彼は私に5元のお釣りをくれました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',46,'您','nín','あなた（敬語）','[{"hanzi":"請問，您需要什麼？","pinyin":"Qǐngwèn, nín xūyào shénme?","translation_ja":"お尋ねしますが、何が必要ですか？"},{"hanzi":"您想喝茶還是咖啡？","pinyin":"Nín xiǎng hē chá háishì kāfēi?","translation_ja":"お茶を飲みたいですか、それともコーヒーですか？"},{"hanzi":"謝謝您的幫助！","pinyin":"Xièxiè nín de bāngzhù!","translation_ja":"ご助力ありがとうございます！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',47,'多','duō','多い','[{"hanzi":"這裡的水果很便宜，多買一些吧！","pinyin":"Zhèlǐ de shuǐguǒ hěn piányí, duō mǎi yīxiē ba!","translation_ja":"ここの果物は安いので、もっと買いましょう！"},{"hanzi":"他學了很多中文","pinyin":"Tā xué le hěn duō Zhōngwén.","translation_ja":"彼はたくさん中国語を学びました"},{"hanzi":"多喝水對身體好","pinyin":"Duō hē shuǐ duì shēntǐ hǎo.","translation_ja":"水をたくさん飲むことは体に良いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',48,'夏天','xià tiān','夏','[{"hanzi":"夏天很熱","pinyin":"Xiàtiān hěn rè.","translation_ja":"夏はとても暑いです"},{"hanzi":"我喜歡夏天去海邊玩","pinyin":"Wǒ xǐhuān xiàtiān qù hǎibiān wán.","translation_ja":"夏に海辺で遊ぶのが好きです"},{"hanzi":"夏天的冰淇淋很好吃","pinyin":"Xiàtiān de bīngqílín hěn hǎochī.","translation_ja":"夏のアイスクリームはとても美味しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',49,'春天','chūn tiān','春','[{"hanzi":"春天有很多花開","pinyin":"Chūntiān yǒu hěn duō huā kāi.","translation_ja":"春にはたくさんの花が咲きます"},{"hanzi":"春天的天氣很舒服","pinyin":"Chūntiān de tiānqì hěn shūfú.","translation_ja":"春の天気はとても心地よいです"},{"hanzi":"你喜歡春天還是秋天？","pinyin":"Nǐ xǐhuān chūntiān háishì qiūtiān?","translation_ja":"あなたは春が好きですか、それとも秋ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',50,'秋天','qiū tiān','秋','[{"hanzi":"秋天的天氣很涼快","pinyin":"Qiū tiān de tiān qì hěn liáng kuài","translation_ja":"秋の天気はとても涼しいです"},{"hanzi":"秋天有很多好吃的水果","pinyin":"Qiūtiān yǒu hěn duō hǎochī de shuǐguǒ.","translation_ja":"秋にはたくさんの美味しい果物があります"},{"hanzi":"秋天的風景很漂亮","pinyin":"Qiū tiān de fēng jǐng hěn piào liàng","translation_ja":"秋の風景はとても綺麗です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',51,'冬天','dōng tiān','冬','[{"hanzi":"冬天很冷，要穿外套","pinyin":"Dōngtiān hěn lěng, yào chuān wàitào.","translation_ja":"冬はとても寒いので、コートを着る必要があります"},{"hanzi":"冬天適合喝熱湯","pinyin":"Dōngtiān shìhé hē rè tāng.","translation_ja":"冬は熱いスープを飲むのに適しています"},{"hanzi":"冬天我們常去滑雪","pinyin":"Dōngtiān wǒmen cháng qù huáxuě.","translation_ja":"冬はよくスキーに行きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',52,'店/商店','diàn / shāng diàn','店','[{"hanzi":"這家商店賣很多衣服","pinyin":"Zhè jiā shāngdiàn mài hěn duō yīfú.","translation_ja":"このお店はたくさんの服を売っています"},{"hanzi":"你知道附近有什麼商店嗎？","pinyin":"Nǐ zhīdào fùjìn yǒu shénme shāngdiàn ma?","translation_ja":"近くにどんなお店があるか知っていますか？"},{"hanzi":"他在商店裡買了一些水果","pinyin":"Tā zài shāngdiàn lǐ mǎile yīxiē shuǐguǒ.","translation_ja":"彼はお店で果物をいくつか買いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',53,'果汁','guǒ zhī','ジュース','[{"hanzi":"我想喝一杯橙汁果汁","pinyin":"Wǒ xiǎng hē yī bēi chéngzhī guǒzhī.","translation_ja":"私はオレンジジュースを一杯飲みたいです"},{"hanzi":"夏天喝果汁很舒服","pinyin":"Xiàtiān hē guǒzhī hěn shūfú.","translation_ja":"夏にジュースを飲むのは気持ちが良いです"},{"hanzi":"這杯果汁是新鮮的嗎？","pinyin":"Zhè bēi guǒzhī shì xīnxiān de ma?","translation_ja":"このジュースは新鮮ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',54,'牛奶','niú nǎi','牛乳','[{"hanzi":"早上喝牛奶對身體好","pinyin":"Zǎoshàng hē niúnǎi duì shēntǐ hǎo.","translation_ja":"朝に牛乳を飲むのは体に良いです"},{"hanzi":"你喜歡喝牛奶嗎？","pinyin":"Nǐ xǐhuān hē niúnǎi ma?","translation_ja":"あなたは牛乳を飲むのが好きですか？"},{"hanzi":"我買了一瓶牛奶","pinyin":"Wǒ mǎile yī píng niúnǎi.","translation_ja":"私は牛乳を1本買いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',55,'有的','yǒu de','～のもの','[{"hanzi":"有的人喜歡喝茶，有的人喜歡喝咖啡","pinyin":"Yǒu de rén xǐhuān hē chá, yǒu de rén xǐhuān hē kāfēi.","translation_ja":"お茶が好きな人もいれば、コーヒーが好きな人もいます"},{"hanzi":"這裡有的衣服很便宜","pinyin":"Zhèlǐ yǒu de yīfú hěn piányí.","translation_ja":"ここにある服はとても安いです"},{"hanzi":"我買了一些水果，有的很好吃","pinyin":"Wǒ mǎile yīxiē shuǐguǒ, yǒu de hěn hǎochī.","translation_ja":"私はいくつかの果物を買いましたが、どれも美味しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',56,'每','měi','毎','[{"hanzi":"我每天都喝一杯咖啡","pinyin":"Wǒ měitiān dōu hē yī bēi kāfēi.","translation_ja":"私は毎日コーヒーを1杯飲みます"},{"hanzi":"他每個星期都去運動","pinyin":"Tā měi gè xīngqī dōu qù yùndòng.","translation_ja":"彼は毎週運動に行きます"},{"hanzi":"每個人都有自己的喜好","pinyin":"Měi gè rén dōu yǒu zìjǐ de xǐhào.","translation_ja":"誰もが自分の好みを持っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson04',57,'天','tiān','日/天','[{"hanzi":"今天的天氣很好","pinyin":"Jīntiān de tiānqì hěn hǎo.","translation_ja":"今日の天気はとても良いです"},{"hanzi":"明天天氣會很熱","pinyin":"Míng tiān tiān qì huì hěn rè.","translation_ja":"明日の天気は暑くなるでしょう"},{"hanzi":"每天早上我都會喝茶","pinyin":"Měitiān zǎoshàng wǒ dōu huì hē chá.","translation_ja":"毎朝お茶を飲みます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',1,'錢包','qián bāo','財布','[{"hanzi":"我的錢包在桌子上","pinyin":"wǒ de qián bāo zài zhuō zi shàng","translation_ja":"私の財布は机の上にあります"},{"hanzi":"你看到我的錢包了嗎？","pinyin":"nǐ kàn dào wǒ de qián bāo le ma","translation_ja":"あなたは私の財布を見ましたか？"},{"hanzi":"這個錢包是我姐姐買的","pinyin":"zhè ge qián bāo shì wǒ jiě jie mǎi de","translation_ja":"この財布は姉が買ったものです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',2,'在','zài','〜にある','[{"hanzi":"我在家裡看電視","pinyin":"wǒ zài jiā lǐ kàn diàn shì","translation_ja":"私は家でテレビを見ています"},{"hanzi":"他不在學校","pinyin":"tā bú zài xué xiào","translation_ja":"彼は学校にいません"},{"hanzi":"爸爸在客廳喝茶","pinyin":"bà ba zài kè tīng hē chá","translation_ja":"父はリビングでお茶を飲んでいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',3,'不錯','bú cuò','良い/悪くない','[{"hanzi":"這家咖啡廳的冰淇淋不錯","pinyin":"zhè jiā kā fēi tīng de bīng qí lín bú cuò","translation_ja":"このカフェのアイスクリームは美味しいです"},{"hanzi":"你的中文說得不錯","pinyin":"nǐ de zhōng wén shuō de bú cuò","translation_ja":"あなたの中国語は上手ですね"},{"hanzi":"昨天的電影真的不錯","pinyin":"zuó tiān de diàn yǐng zhēn de bú cuò","translation_ja":"昨日の映画は本当に良かったです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',4,'聽','tīng','聞く','[{"hanzi":"我喜歡聽音樂","pinyin":"wǒ xǐ huān tīng yīn yuè","translation_ja":"私は音楽を聞くのが好きです"},{"hanzi":"他正在聽老師說話","pinyin":"tā zhèng zài tīng lǎo shī shuō huà","translation_ja":"彼は先生の話を聞いています"},{"hanzi":"我沒聽到你說什麼","pinyin":"wǒ méi tīng dào nǐ shuō shén me","translation_ja":"あなたが何を言ったか聞き取れませんでした"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',5,'音樂','yīn yuè','音楽','[{"hanzi":"他在房間裡聽音樂","pinyin":"tā zài fáng jiān lǐ tīng yīn yuè","translation_ja":"彼は部屋で音楽を聞いています"},{"hanzi":"這首音樂很好聽","pinyin":"zhè shǒu yīn yuè hěn hǎo tīng","translation_ja":"この音楽はとても良いです"},{"hanzi":"我每天都聽中文音樂","pinyin":"wǒ měi tiān dōu tīng zhōng wén yīn yuè","translation_ja":"私は毎日中国語の音楽を聞いています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',6,'不錯','bú cuò','良い/悪くない','[{"hanzi":"這家咖啡廳的冰淇淋不錯","pinyin":"zhè jiā kā fēi tīng de bīng qí lín bú cuò","translation_ja":"このカフェのアイスクリームは美味しいです"},{"hanzi":"你的中文說得不錯","pinyin":"nǐ de zhōng wén shuō de bú cuò","translation_ja":"あなたの中国語は上手ですね"},{"hanzi":"昨天的電影真的不錯","pinyin":"zuó tiān de diàn yǐng zhēn de bú cuò","translation_ja":"昨日の映画は本当に良かったです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',7,'下午茶','xià wǔ chá','アフタヌーンティー','[{"hanzi":"我們下午一起去喝下午茶吧","pinyin":"wǒ men xià wǔ yī qǐ qù hē xià wǔ chá ba","translation_ja":"午後一緒にアフタヌーンティーを飲みに行きましょう"},{"hanzi":"這家餐廳的下午茶很有名","pinyin":"zhè jiā cān tīng de xià wǔ chá hěn yǒu míng","translation_ja":"このレストランのアフタヌーンティーは有名です"},{"hanzi":"你有空喝下午茶嗎？","pinyin":"nǐ yǒu kòng hē xià wǔ chá ma","translation_ja":"アフタヌーンティーを飲む時間がありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',8,'咖啡廳','kā fēi tīng','カフェ','[{"hanzi":"我最喜歡去這家咖啡廳","pinyin":"wǒ zuì xǐ huān qù zhè jiā kā fēi tīng","translation_ja":"私はこのカフェに行くのが一番好きです"},{"hanzi":"咖啡廳裡有很多人","pinyin":"kā fēi tīng lǐ yǒu hěn duō rén","translation_ja":"カフェにはたくさんの人がいます"},{"hanzi":"我們明天去咖啡廳吧","pinyin":"wǒ men míng tiān qù kā fēi tīng ba","translation_ja":"明日カフェに行きましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',9,'那裡/那兒','nà lǐ / nà r','そこ','[{"hanzi":"你知道學校的圖書館在那裡嗎？","pinyin":"nǐ zhī dào xué xiào de tú shū guǎn zài nà lǐ ma","translation_ja":"学校の図書館がどこにあるか知っていますか？"},{"hanzi":"那裡有一隻可愛的狗","pinyin":"nà lǐ yǒu yì zhī kě ài de gǒu","translation_ja":"そこに可愛い犬がいます"},{"hanzi":"我喜歡去那裡散步","pinyin":"wǒ xǐ huān qù nà lǐ sàn bù","translation_ja":"私はそこに散歩に行くのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',10,'這裡/這兒','zhè lǐ / zhè r','ここ','[{"hanzi":"這裡的東西很好吃","pinyin":"zhè lǐ de dōng xi hěn hǎo chī","translation_ja":"ここのものは美味しいです"},{"hanzi":"我們可以在這裡休息一下嗎？","pinyin":"wǒ men kě yǐ zài zhè lǐ xiū xí yí xià maå","translation_ja":"ここで少し休めますか？"},{"hanzi":"這裡的風景很漂亮","pinyin":"zhè lǐ de fēng jǐng hěn piào liàng","translation_ja":"ここの景色はとても綺麗です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',11,'冰淇淋','bīng qí lín','アイスクリーム','[{"hanzi":"我最喜歡巧克力味的冰淇淋","pinyin":"wǒ zuì xǐ huān qiǎo kè lì wèi de bīng qí lín","translation_ja":"私はチョコレート味のアイスクリームが一番好きです"},{"hanzi":"這家店的冰淇淋很有名","pinyin":"zhè jiā diàn de bīng qí lín hěn yǒu míng","translation_ja":"この店のアイスクリームは有名です"},{"hanzi":"夏天吃冰淇淋很舒服","pinyin":"xià tiān chī bīng qí lín hěn shū fú","translation_ja":"夏にアイスクリームを食べると気持ちが良いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',12,'巧克力','qiǎo kè lì','チョコレート','[{"hanzi":"這塊巧克力是從法國買的","pinyin":"zhè kuài qiǎo kè lì shì cóng fà guó mǎi de","translation_ja":"このチョコレートはフランスから買ったものです"},{"hanzi":"你想吃巧克力嗎？","pinyin":"nǐ xiǎng chī qiǎo kè lì ma","translation_ja":"チョコレートを食べたいですか？"},{"hanzi":"我買了一盒巧克力給妹妹","pinyin":"wǒ mǎi le yì hé qiǎo kè lì gěi mèi mei","translation_ja":"妹にチョコレートを一箱買いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',13,'半','bàn','半分','[{"hanzi":"我只吃了一半的蛋糕","pinyin":"wǒ zhǐ chī le yí bàn de dàn gāo","translation_ja":"私はケーキを半分だけ食べました"},{"hanzi":"現在是下午三點半","pinyin":"xiàn zài shì xià wǔ sān diǎn bàn","translation_ja":"今は午後3時半です"},{"hanzi":"他跑步跑了半個小時","pinyin":"tā pǎo bù pǎo le bàn gè xiǎo shí","translation_ja":"彼は30分間走りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',14,'吧','ba','～しましょう','[{"hanzi":"我們一起去公園吧","pinyin":"wǒ men yì qǐ qù gōng yuán ba","translation_ja":"一緒に公園へ行きましょう"},{"hanzi":"明天再說吧","pinyin":"míng tiān zài shuō ba","translation_ja":"明日また話しましょう"},{"hanzi":"這個問題你來回答吧","pinyin":"zhè ge wèn tí nǐ lái huí dá ba","translation_ja":"この質問はあなたが答えてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',15,'有空','yǒu kòng','暇がある','[{"hanzi":"你有空的時候可以來找我","pinyin":"nǐ yǒu kòng de shí hòu kě yǐ lái zhǎo wǒ","translation_ja":"暇な時に私を訪ねてください"},{"hanzi":"他今天有空，我們可以見面","pinyin":"tā jīn tiān yǒu kòng, wǒ men kě yǐ jiàn miàn","translation_ja":"彼は今日暇なので、会うことができます"},{"hanzi":"你星期六有空嗎？","pinyin":"nǐ xīng qī liù yǒu kòng ma","translation_ja":"土曜日は暇ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',16,'沒(有)空','méi (yǒu) kòng','暇がない','[{"hanzi":"我今天很忙，沒空出去玩","pinyin":"wǒ jīn tiān hěn máng, méi kòng chū qù wán","translation_ja":"私は今日忙しくて遊びに行く暇がありません"},{"hanzi":"他最近沒有空學中文","pinyin":"tā zuì jìn méi yǒu kòng xué zhōng wén","translation_ja":"彼は最近中国語を学ぶ暇がありません"},{"hanzi":"如果你沒空，我可以幫你買","pinyin":"rú guǒ nǐ méi kòng, wǒ kě yǐ bāng nǐ mǎi","translation_ja":"もし暇がないなら、私が買ってあげます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',17,'跟','gēn','～と一緒に','[{"hanzi":"我跟朋友一起去吃飯","pinyin":"wǒ gēn péng yǒu yì qǐ qù chī fàn","translation_ja":"私は友達と一緒にご飯を食べに行きます"},{"hanzi":"他跟我說他明天有考試","pinyin":"tā gēn wǒ shuō tā míng tiān yǒu kǎo shì","translation_ja":"彼は明日試験があると言いました"},{"hanzi":"你可以跟我去圖書館嗎？","pinyin":"nǐ kě yǐ gēn wǒ qù tú shū guǎn ma","translation_ja":"図書館に一緒に行ってくれますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',18,'可是','kě shì','でも','[{"hanzi":"我很想去旅行，可是沒時間","pinyin":"wǒ hěn xiǎng qù lǚ xíng, kě shì méi shí jiān","translation_ja":"旅行に行きたいですが、時間がありません"},{"hanzi":"他喜歡吃肉，可是他不會做菜","pinyin":"tā xǐ huān chī ròu, kě shì tā bú huì zuò cài","translation_ja":"彼は肉が好きですが、料理ができません"},{"hanzi":"這個地方很好玩，可是很遠","pinyin":"zhè ge dì fāng hěn hǎo wán, kě shì hěn yuǎn","translation_ja":"この場所は楽しいですが、とても遠いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',19,'房間','fáng jiān','部屋','[{"hanzi":"我的房間很乾淨","pinyin":"wǒ de fáng jiān hěn gān jìng","translation_ja":"私の部屋はとてもきれいです"},{"hanzi":"他在房間裡看書","pinyin":"tā zài fáng jiān lǐ kàn shū","translation_ja":"彼は部屋で本を読んでいます"},{"hanzi":"這間房間有兩張床","pinyin":"zhè jiān fáng jiān yǒu liǎng zhāng chuáng","translation_ja":"この部屋にはベッドが二つあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',20,'間','jiān','部屋（量詞）','[{"hanzi":"我家有三間房間","pinyin":"wǒ jiā yǒu sān jiān fáng jiān","translation_ja":"私の家には3部屋あります"},{"hanzi":"學校有很多間教室","pinyin":"xué xiào yǒu hěn duō jiān jiào shì","translation_ja":"学校にはたくさんの教室があります"},{"hanzi":"他租了一間大房間","pinyin":"tā zū le yì jiān dà fáng jiān","translation_ja":"彼は大きな部屋を借りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',21,'房子','fáng zi','家/建物','[{"hanzi":"這棟房子很新","pinyin":"zhè dòng fáng zi hěn xīn","translation_ja":"この家はとても新しいです"},{"hanzi":"我想買一棟房子","pinyin":"wǒ xiǎng mǎi yí dòng fáng zi","translation_ja":"私は家を一軒買いたいです"},{"hanzi":"這個房子的客廳很大","pinyin":"zhè ge fáng zi de kè tīng hěn dà","translation_ja":"この家のリビングはとても広いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',22,'棟','dòng','建物（量詞）','[{"hanzi":"這裡有兩棟新房子","pinyin":"zhè lǐ yǒu liǎng dòng xīn fáng zi","translation_ja":"ここには2軒の新しい家があります"},{"hanzi":"那棟房子是我叔叔的","pinyin":"nà dòng fáng zi shì wǒ shū shu de","translation_ja":"あの家は私のおじのものです"},{"hanzi":"他住在一棟很大的樓房裡","pinyin":"tā zhù zài yí dòng hěn dà de lóu fáng lǐ","translation_ja":"彼はとても大きな建物に住んでいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',23,'裡(面)','lǐ (miàn)','中/中に','[{"hanzi":"書在書包裡面","pinyin":"shū zài shū bāo lǐ miàn","translation_ja":"本はカバンの中にあります"},{"hanzi":"我家裡有一隻貓","pinyin":"wǒ jiā lǐ yǒu yì zhī māo","translation_ja":"私の家には猫が一匹います"},{"hanzi":"水果在冰箱裡","pinyin":"shuǐ guǒ zài bīng xiāng lǐ","translation_ja":"果物は冷蔵庫の中にあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',24,'外(面)','wài (miàn)','外/外に','[{"hanzi":"外面下雨了","pinyin":"wài miàn xià yǔ le","translation_ja":"外は雨が降っています"},{"hanzi":"他在外面等你","pinyin":"tā zài wài miàn děng nǐ","translation_ja":"彼は外であなたを待っています"},{"hanzi":"我們去外面走走吧","pinyin":"wǒ men qù wài miàn zǒu zǒu ba","translation_ja":"外に散歩に行きましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',25,'客廳','kè tīng','リビング','[{"hanzi":"我的客廳有一張沙發","pinyin":"wǒ de kè tīng yǒu yì zhāng shā fā","translation_ja":"私のリビングにはソファがあります"},{"hanzi":"他們在客廳裡聊天","pinyin":"tā men zài kè tīng lǐ liáo tiān","translation_ja":"彼らはリビングでおしゃべりしています"},{"hanzi":"客廳裡有一台電視","pinyin":"kè tīng lǐ yǒu yì tái diàn shì","translation_ja":"リビングにはテレビがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',26,'桌子','zhuō zi','テーブル','[{"hanzi":"書在桌子上","pinyin":"shū zài zhuō zi shàng","translation_ja":"本はテーブルの上にあります"},{"hanzi":"他買了一張新桌子","pinyin":"tā mǎi le yì zhāng xīn zhuō zi","translation_ja":"彼は新しいテーブルを買いました"},{"hanzi":"這張桌子很大","pinyin":"zhè zhāng zhuō zi hěn dà","translation_ja":"このテーブルはとても大きいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',27,'椅子','yǐ zi','椅子','[{"hanzi":"這張椅子很舒服","pinyin":"zhè zhāng yǐ zi hěn shū fú","translation_ja":"この椅子はとても快適です"},{"hanzi":"椅子在桌子旁邊","pinyin":"yǐ zi zài zhuō zi páng biān","translation_ja":"椅子はテーブルの横にあります"},{"hanzi":"房間裡有四張椅子","pinyin":"fáng jiān lǐ yǒu sì zhāng yǐ zi","translation_ja":"部屋の中に椅子が4つあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',28,'張','zhāng','平たいもの（量詞）','[{"hanzi":"我買了一張新桌子","pinyin":"wǒ mǎi le yì zhāng xīn zhuō zi","translation_ja":"私は新しいテーブルを1つ買いました"},{"hanzi":"房間裡有兩張床","pinyin":"fáng jiān lǐ yǒu liǎng zhāng chuáng","translation_ja":"部屋にはベッドが2つあります"},{"hanzi":"這裡有一張照片","pinyin":"zhè lǐ yǒu yì zhāng zhào piàn","translation_ja":"ここに写真が1枚あります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',29,'上(面)','shàng (miàn)','上/上に','[{"hanzi":"書在桌子上面","pinyin":"shū zài zhuō zi shàng miàn","translation_ja":"本は机の上にあります"},{"hanzi":"他把衣服放在床上","pinyin":"tā bǎ yī fú fàng zài chuáng shàng","translation_ja":"彼は服をベッドの上に置きました"},{"hanzi":"貓在沙發上","pinyin":"māo zài shā fā shàng","translation_ja":"猫はソファの上にいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',30,'有','yǒu','ある/いる','[{"hanzi":"這裡有很多人","pinyin":"zhè lǐ yǒu hěn duō rén","translation_ja":"ここにはたくさんの人がいます"},{"hanzi":"我家有兩隻狗","pinyin":"wǒ jiā yǒu liǎng zhī gǒu","translation_ja":"私の家には犬が2匹います"},{"hanzi":"他有一台新電腦","pinyin":"tā yǒu yì tái xīn diàn nǎo","translation_ja":"彼は新しいパソコンを持っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',31,'哥哥','gē ge','兄','[{"hanzi":"我的哥哥很喜歡運動","pinyin":"wǒ de gē ge hěn xǐ huān yùn dòng","translation_ja":"私の兄はスポーツが大好きです"},{"hanzi":"哥哥比我高","pinyin":"gē ge bǐ wǒ gāo","translation_ja":"兄は私より背が高いです"},{"hanzi":"他和哥哥一起去學校","pinyin":"tā hé gē ge yì qǐ qù xué xiào","translation_ja":"彼は兄と一緒に学校へ行きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',32,'姐姐/姊姊','jiě jie','姉','[{"hanzi":"我的姐姐很會做飯","pinyin":"wǒ de jiě jie hěn huì zuò fàn","translation_ja":"私の姉は料理が得意です"},{"hanzi":"姐姐每天早上六點起床","pinyin":"jiě jie měi tiān zǎo shàng liù diǎn qǐ chuáng","translation_ja":"姉は毎朝6時に起きます"},{"hanzi":"她和姐姐去逛街了","pinyin":"tā hé jiě jie qù guàng jiē le","translation_ja":"彼女は姉と買い物に行きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',33,'弟弟','dì di','弟','[{"hanzi":"我的弟弟喜歡踢足球","pinyin":"wǒ de dì di xǐ huān tī zú qiú","translation_ja":"私の弟はサッカーが好きです"},{"hanzi":"弟弟正在寫功課","pinyin":"dì di zhèng zài xiě gōng kè","translation_ja":"弟は宿題を書いています"},{"hanzi":"我跟弟弟一起去圖書館","pinyin":"wǒ gēn dì di yì qǐ qù tú shū guǎn","translation_ja":"私は弟と一緒に図書館に行きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',34,'妹妹','mèi mei','妹','[{"hanzi":"我的妹妹很可愛","pinyin":"wǒ de mèi mei hěn kě ài","translation_ja":"私の妹はとても可愛いです"},{"hanzi":"妹妹在學校裡學中文","pinyin":"mèi mei zài xué xiào lǐ xué zhōng wén","translation_ja":"妹は学校で中国語を学んでいます"},{"hanzi":"她常常跟妹妹玩遊戲","pinyin":"tā cháng cháng gēn mèi mei wán yóu xì","translation_ja":"彼女はよく妹とゲームをします"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',35,'沙發','shā fā','ソファ','[{"hanzi":"他坐在沙發上看書","pinyin":"tā zuò zài shā fā shàng kàn shū","translation_ja":"彼はソファに座って本を読んでいます"},{"hanzi":"沙發旁邊有一張小桌子","pinyin":"shā fā páng biān yǒu yì zhāng xiǎo zhuō zi","translation_ja":"ソファの横に小さなテーブルがあります"},{"hanzi":"我家有一個很大的沙發","pinyin":"wǒ jiā yǒu yí ge hěn dà de shā fā","translation_ja":"私の家にはとても大きなソファがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',36,'下(面)','xià (miàn)','下/下に','[{"hanzi":"鞋子在桌子下面","pinyin":"xié zi zài zhuō zi xià miàn","translation_ja":"靴はテーブルの下にあります"},{"hanzi":"小貓躲在床下面","pinyin":"xiǎo māo duǒ zài chuáng xià miàn","translation_ja":"子猫がベッドの下に隠れています"},{"hanzi":"書包放在椅子下面","pinyin":"shū bāo fàng zài yǐ zi xià miàn","translation_ja":"カバンは椅子の下に置いてあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',37,'旁邊','páng biān','横/隣','[{"hanzi":"我坐在他旁邊","pinyin":"wǒ zuò zài tā páng biān","translation_ja":"私は彼の隣に座っています"},{"hanzi":"桌子旁邊有一個椅子","pinyin":"zhuō zi páng biān yǒu yí ge yǐ zi","translation_ja":"テーブルの横に椅子があります"},{"hanzi":"商店就在學校旁邊","pinyin":"shāng diàn jiù zài xué xiào páng biān","translation_ja":"お店は学校のすぐ隣にあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',38,'前(面)','qián (miàn)','前/前に','[{"hanzi":"車子停在房子前面","pinyin":"chē zi tíng zài fáng zi qián miàn","translation_ja":"車は家の前に停まっています"},{"hanzi":"他站在我前面","pinyin":"tā zhàn zài wǒ qián miàn","translation_ja":"彼は私の前に立っています"},{"hanzi":"花園在房子前面","pinyin":"huā yuán zài fáng zi qián miàn","translation_ja":"庭は家の前にあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',39,'後(面)','hòu (miàn)','後ろ/後に','[{"hanzi":"學校後面有一個公園","pinyin":"xué xiào hòu miàn yǒu yí gè gōng yuán","translation_ja":"学校の後ろに公園があります"},{"hanzi":"他跟在我後面走","pinyin":"tā gēn zài wǒ hòu miàn zǒu","translation_ja":"彼は私の後ろについて歩いています"},{"hanzi":"你可以把書放在門後面嗎？","pinyin":"nǐ kě yǐ bǎ shū fàng zài mén hòu miàn ma","translation_ja":"本をドアの後ろに置いてくれますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',40,'幫','bāng','手伝う','[{"hanzi":"你可以幫我拿那本書嗎？","pinyin":"nǐ kě yǐ bāng wǒ ná nà běn shū ma","translation_ja":"あなたはその本を取るのを手伝ってくれますか？"},{"hanzi":"我幫媽媽洗碗","pinyin":"wǒ bāng mā ma xǐ wǎn","translation_ja":"私は母の皿洗いを手伝います"},{"hanzi":"他們幫老師整理教室","pinyin":"tā men bāng lǎo shī zhěng lǐ jiào shì","translation_ja":"彼らは先生の教室を片付けるのを手伝っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',41,'找','zhǎo','探す','[{"hanzi":"我在找我的手機","pinyin":"wǒ zài zhǎo wǒ de shǒu jī","translation_ja":"私は携帯電話を探しています"},{"hanzi":"你找到了你的鑰匙嗎？","pinyin":"nǐ zhǎo dào le nǐ de yào shi ma","translation_ja":"あなたは鍵を見つけましたか？"},{"hanzi":"他幫我找工作","pinyin":"tā bāng wǒ zhǎo gōng zuò","translation_ja":"彼は私の仕事を探すのを手伝っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',42,'廚房','chú fáng','台所','[{"hanzi":"媽媽在廚房做飯","pinyin":"mā ma zài chú fáng zuò fàn","translation_ja":"母は台所で料理をしています"},{"hanzi":"廚房裡有一台冰箱","pinyin":"chú fáng lǐ yǒu yì tái bīng xiāng","translation_ja":"台所には冷蔵庫があります"},{"hanzi":"他喜歡在廚房裡學做菜","pinyin":"tā xǐ huān zài chú fáng lǐ xué zuò cài","translation_ja":"彼は台所で料理を学ぶのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',43,'再','zài','また','[{"hanzi":"我們明天再來這裡吧","pinyin":"wǒ men míng tiān zài lái zhè lǐ ba","translation_ja":"明日またここに来ましょう"},{"hanzi":"你可以再說一次嗎？","pinyin":"nǐ kě yǐ zài shuō yí cì ma","translation_ja":"もう一度言っていただけますか？"},{"hanzi":"他吃完飯後再去看電影","pinyin":"tā chī wán fàn hòu zài qù kàn diàn yǐng","translation_ja":"彼はご飯を食べてから映画を見に行きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',44,'床','chuáng','ベッド','[{"hanzi":"我的床很舒服","pinyin":"wǒ de chuáng hěn shū fú","translation_ja":"私のベッドはとても快適です"},{"hanzi":"小貓躺在床上睡覺","pinyin":"xiǎo māo tǎng zài chuáng shàng shuì jiào","translation_ja":"子猫がベッドの上で寝ています"},{"hanzi":"我房間裡有一張大床","pinyin":"wǒ fáng jiān lǐ yǒu yì zhāng dà chuáng","translation_ja":"私の部屋には大きなベッドがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',45,'家具','jiā jù','家具','[{"hanzi":"這家店的家具很漂亮","pinyin":"zhè jiā diàn de jiā jù hěn piào liàng","translation_ja":"このお店の家具はとてもきれいです"},{"hanzi":"我們買了一些新家具","pinyin":"wǒ men mǎi le yì xiē xīn jiā jù","translation_ja":"私たちは新しい家具をいくつか買いました"},{"hanzi":"房間裡的家具很整齊","pinyin":"fáng jiān lǐ de jiā jù hěn zhěng qí","translation_ja":"部屋の家具はとても整っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',46,'電視(機)','diàn shì (jī)','テレビ','[{"hanzi":"他在客廳看電視","pinyin":"tā zài kè tīng kàn diàn shì","translation_ja":"彼はリビングでテレビを見ています"},{"hanzi":"這台電視很大","pinyin":"zhè tái diàn shì hěn dà","translation_ja":"このテレビはとても大きいです"},{"hanzi":"我們家有兩台電視機","pinyin":"wǒ men jiā yǒu liǎng tái diàn shì jī","translation_ja":"我が家にはテレビが2台あります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',47,'窗戶','chuāng hù','窓','[{"hanzi":"我打開窗戶看看外面的風景","pinyin":"wǒ dǎ kāi chuāng hù kàn kàn wài miàn de fēng jǐng","translation_ja":"私は窓を開けて外の景色を見ました"},{"hanzi":"窗戶旁邊有一張桌子","pinyin":"chuāng hù páng biān yǒu yì zhāng zhuō zi","translation_ja":"窓の横にテーブルがあります"},{"hanzi":"你可以把窗戶關上嗎？","pinyin":"nǐ kě yǐ bǎ chuāng hù guān shàng ma","translation_ja":"窓を閉めてもらえますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',48,'門','mén','ドア','[{"hanzi":"這個門有點壞了","pinyin":"zhè ge mén yǒu diǎn huài le","translation_ja":"このドアは少し壊れています"},{"hanzi":"他打開門進來了","pinyin":"tā dǎ kāi mén jìn lái le","translation_ja":"彼はドアを開けて中に入りました"},{"hanzi":"門旁邊有一盞燈","pinyin":"mén páng biān yǒu yì zhǎn dēng","translation_ja":"ドアの横にランプがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',49,'貓','māo','猫','[{"hanzi":"這隻貓很可愛","pinyin":"zhè zhī māo hěn kě ài","translation_ja":"この猫はとても可愛いです"},{"hanzi":"貓在沙發上睡覺","pinyin":"māo zài shā fā shàng shuì jiào","translation_ja":"猫がソファの上で寝ています"},{"hanzi":"他很喜歡養貓","pinyin":"tā hěn xǐ huān yǎng māo","translation_ja":"彼は猫を飼うのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',50,'狗','gǒu','犬','[{"hanzi":"我家有一隻狗","pinyin":"wǒ jiā yǒu yì zhī gǒu","translation_ja":"私の家には犬が一匹います"},{"hanzi":"那隻狗跑得很快","pinyin":"nà zhī gǒu pǎo de hěn kuài","translation_ja":"あの犬はとても速く走ります"},{"hanzi":"狗在門口等你","pinyin":"gǒu zài mén kǒu děng nǐ","translation_ja":"犬はドアの前であなたを待っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',51,'鳥','niǎo','鳥','[{"hanzi":"樹上有很多鳥","pinyin":"shù shàng yǒu hěn duō niǎo","translation_ja":"木の上にたくさんの鳥がいます"},{"hanzi":"那隻鳥會說話","pinyin":"nà zhī niǎo huì shuō huà","translation_ja":"あの鳥は話すことができます"},{"hanzi":"他喜歡拍鳥的照片","pinyin":"tā xǐ huān pāi niǎo de zhào piàn","translation_ja":"彼は鳥の写真を撮るのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',52,'隻','zhī','動物の量詞','[{"hanzi":"我有一隻小貓","pinyin":"wǒ yǒu yì zhī xiǎo māo","translation_ja":"私は子猫を一匹飼っています"},{"hanzi":"他買了一隻狗","pinyin":"tā mǎi le yì zhī gǒu","translation_ja":"彼は犬を一匹買いました"},{"hanzi":"公園裡有很多隻鳥","pinyin":"gōng yuán lǐ yǒu hěn duō zhī niǎo","translation_ja":"公園にはたくさんの鳥がいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',53,'曬太陽/晒太陽','shài tài yáng','日向ぼっこをする','[{"hanzi":"我喜歡在公園裡曬太陽","pinyin":"wǒ xǐ huān zài gōng yuán lǐ shài tài yáng","translation_ja":"私は公園で日向ぼっこをするのが好きです"},{"hanzi":"他們坐在沙灘上曬太陽","pinyin":"tā men zuò zài shā tān shàng shài tài yáng","translation_ja":"彼らはビーチで日向ぼっこをしています"},{"hanzi":"今天的天氣很好，適合曬太陽","pinyin":"jīn tiān de tiān qì hěn hǎo, shì hé shài tài yáng","translation_ja":"今日の天気は良いので日向ぼっこに適しています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson05',54,'太陽','tài yáng','太陽','[{"hanzi":"太陽從東邊升起","pinyin":"tài yáng cóng dōng biān shēng qǐ","translation_ja":"太陽は東から昇ります"},{"hanzi":"今天的太陽很大","pinyin":"jīn tiān de tài yáng hěn dà","translation_ja":"今日の太陽はとても明るいです"},{"hanzi":"太陽下山了，天黑了","pinyin":"tài yáng xià shān le, tiān hēi le","translation_ja":"太陽が沈んで空が暗くなりました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',1,'打','dǎ','打つ','[{"hanzi":"我們週末去打網球吧","pinyin":"wǒ men zhōu mò qù dǎ wǎng qiú ba","translation_ja":"私たち週末にテニスをしに行きましょう"},{"hanzi":"他喜歡打籃球","pinyin":"tā xǐ huān dǎ lán qiú","translation_ja":"彼はバスケットボールをするのが好きです"},{"hanzi":"我弟弟每天打棒球","pinyin":"wǒ dì di měi tiān dǎ bàng qiú","translation_ja":"私の弟は毎日野球をしています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',2,'網球','wǎng qiú','テニス','[{"hanzi":"我哥哥的網球打得很好","pinyin":"wǒ gē ge de wǎng qiú dǎ dé hěn hǎo","translation_ja":"私の兄はテニスがとても上手です"},{"hanzi":"我想學打網球","pinyin":"wǒ xiǎng xué dǎ wǎng qiú","translation_ja":"私はテニスを学びたいです"},{"hanzi":"打網球是一個很好的運動","pinyin":"dǎ wǎng qiú shì yí gè hěn hǎo de yùn dòng","translation_ja":"テニスはとても良い運動です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',3,'球','qiú','ボール','[{"hanzi":"這顆球是他的","pinyin":"zhè kē qiú shì tā de","translation_ja":"このボールは彼のものです"},{"hanzi":"我們需要一顆球來打籃球","pinyin":"wǒ men xū yào yì kē qiú lái dǎ lán qiú","translation_ja":"私たちはバスケットボールをするのにボールが必要です"},{"hanzi":"他喜歡收集不同的球","pinyin":"tā xǐ huān shōu jí bù tóng de qiú","translation_ja":"彼はさまざまなボールを集めるのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',4,'篮球','lán qiú','バスケットボール','[{"hanzi":"我們放學後常常打籃球","pinyin":"wǒ men fàng xué hòu cháng cháng dǎ lán qiú","translation_ja":"私たちは放課後によくバスケットボールをします"},{"hanzi":"篮球是一個很受歡迎的運動","pinyin":"lán qiú shì yí gè hěn shòu huān yíng de yùn dòng","translation_ja":"バスケットボールはとても人気のあるスポーツです"},{"hanzi":"他們籃球隊今天有比賽","pinyin":"tā men lán qiú duì jīn tiān yǒu bǐ sài","translation_ja":"彼らのバスケットボールチームは今日試合があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',5,'棒球','bàng qiú','野球','[{"hanzi":"他是棒球隊的隊員","pinyin":"tā shì bàng qiú duì de duì yuán","translation_ja":"彼は野球チームのメンバーです"},{"hanzi":"我們週末會去看棒球比賽","pinyin":"wǒ men zhōu mò huì qù kàn bàng qiú bǐ sài","translation_ja":"私たちは週末に野球の試合を観に行きます"},{"hanzi":"棒球需要很多練習","pinyin":"bàng qiú xū yào hěn duō liàn xí","translation_ja":"野球はたくさんの練習が必要です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',6,'足球','zú qiú','サッカー','[{"hanzi":"他是學校足球隊的隊員","pinyin":"tā shì xué xiào zú qiú duì de duì yuán","translation_ja":"彼は学校のサッカーチームのメンバーです"},{"hanzi":"我們一起去踢足球吧","pinyin":"wǒ men yì qǐ qù tī zú qiú ba","translation_ja":"一緒にサッカーをしに行きましょう"},{"hanzi":"足球是一項很有趣的運動","pinyin":"zú qiú shì yí xiàng hěn yǒu qù de yùn dòng","translation_ja":"サッカーはとても面白いスポーツです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',7,'踢','tī','蹴る','[{"hanzi":"他踢足球踢得很好","pinyin":"tā tī zú qiú tī dé hěn hǎo","translation_ja":"彼はサッカーがとても上手です"},{"hanzi":"我不會踢足球","pinyin":"wǒ bú huì tī zú qiú","translation_ja":"私はサッカーができません"},{"hanzi":"這場比賽誰踢贏了？","pinyin":"zhè chǎng bǐ sài shéi tī yíng le","translation_ja":"この試合、誰が勝ちましたか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',8,'海邊','hǎi biān','海辺','[{"hanzi":"我們夏天常常去海邊玩","pinyin":"wǒ men xià tiān cháng cháng qù hǎi biān wán","translation_ja":"私たちは夏にしばしば海辺に行きます"},{"hanzi":"海邊的風景真漂亮","pinyin":"hǎi biān de fēng jǐng zhēn piào liàng","translation_ja":"海辺の風景は本当に美しいです"},{"hanzi":"他們在海邊拍了很多照片","pinyin":"tā men zài hǎi biān pāi le hěn duō zhào piàn","translation_ja":"彼らは海辺でたくさん写真を撮りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',9,'海','hǎi','海','[{"hanzi":"海裡有很多魚","pinyin":"hǎi lǐ yǒu hěn duō yú","translation_ja":"海にはたくさんの魚がいます"},{"hanzi":"他喜歡在海裡游泳","pinyin":"tā xǐ huān zài hǎi lǐ yóu yǒng","translation_ja":"彼は海で泳ぐのが好きです"},{"hanzi":"這片海真藍","pinyin":"zhè piàn hǎi zhēn lán","translation_ja":"この海は本当に青いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',10,'山','shān','山','[{"hanzi":"山上的風景很美","pinyin":"shān shàng de fēng jǐng hěn měi","translation_ja":"山の風景はとても美しいです"},{"hanzi":"我喜歡去爬山","pinyin":"wǒ xǐ huān qù pá shān","translation_ja":"私は山登りが好きです"},{"hanzi":"這座山很高","pinyin":"zhè zuò shān hěn gāo","translation_ja":"この山はとても高いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',11,'風景','fēng jǐng','風景','[{"hanzi":"我覺得這裡的風景很有趣","pinyin":"wǒ jué dé zhè lǐ de fēng jǐng hěn yǒu qù","translation_ja":"私はここは風景がとても面白いと思います"},{"hanzi":"他們拍了很多風景照","pinyin":"tā men pāi le hěn duō fēng jǐng zhào","translation_ja":"彼らはたくさんの風景写真を撮りました"},{"hanzi":"秋天的風景特別漂亮","pinyin":"qiū tiān de fēng jǐng tè bié piào liàng","translation_ja":"秋の風景は特に美しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',12,'游泳','yóu yǒng','泳ぐ','[{"hanzi":"我每天早上都去游泳","pinyin":"wǒ měi tiān zǎo shàng dōu qù yóu yǒng","translation_ja":"私は毎朝泳ぎに行きます"},{"hanzi":"他游泳游得很快","pinyin":"tā yóu yǒng yóu dé hěn kuài","translation_ja":"彼は泳ぐのがとても速いです"},{"hanzi":"夏天游泳很舒服","pinyin":"xià tiān yóu yǒng hěn shū fú","translation_ja":"夏に泳ぐのはとても気持ちいいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',13,'會','huì','～できる','[{"hanzi":"我會說中文","pinyin":"wǒ huì shuō zhōng wén","translation_ja":"私は中国語を話すことができます"},{"hanzi":"他不會游泳","pinyin":"tā bú huì yóu yǒng","translation_ja":"彼は泳ぐことができません"},{"hanzi":"你會騎腳踏車嗎？","pinyin":"nǐ huì qí jiǎo tà chē ma","translation_ja":"あなたは自転車に乗れますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',14,'得','děi','～しなければならない','[{"hanzi":"我得去學校","pinyin":"wǒ děi qù xué xiào","translation_ja":"私は学校に行かなければなりません"},{"hanzi":"你得多休息","pinyin":"nǐ děi duō xiū xī","translation_ja":"あなたはもっと休まなければなりません"},{"hanzi":"我們得早點出發","pinyin":"wǒ men děi zǎo diǎn chū fā","translation_ja":"私たちは早めに出発しなければなりません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',15,'跑步','pǎo bù','ジョギングをする','[{"hanzi":"我每天早上跑步","pinyin":"wǒ měi tiān zǎo shàng pǎo bù","translation_ja":"私は毎朝ジョギングをします"},{"hanzi":"跑步對健康很好","pinyin":"pǎo bù duì jiàn kāng hěn hǎo","translation_ja":"ジョギングは健康にとても良いです"},{"hanzi":"他喜歡在公園跑步","pinyin":"tā xǐ huān zài gōng yuán pǎo bù","translation_ja":"彼は公園でジョギングをするのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',16,'跑','pǎo','走る','[{"hanzi":"他跑得很快","pinyin":"tā pǎo dé hěn kuài","translation_ja":"彼は走るのがとても速いです"},{"hanzi":"小狗在院子裡跑來跑去","pinyin":"xiǎo gǒu zài yuàn zi lǐ pǎo lái pǎo qù","translation_ja":"子犬が庭で走り回っています"},{"hanzi":"他跑步時喜歡聽音樂","pinyin":"tā pǎo bù shí xǐ huān tīng yīn yuè","translation_ja":"彼はジョギング中に音楽を聴くのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',17,'慢','màn','遅い','[{"hanzi":"他走得很慢","pinyin":"tā zǒu dé hěn màn","translation_ja":"彼は歩くのがとても遅いです"},{"hanzi":"請慢一點說","pinyin":"qǐng màn yì diǎn shuō","translation_ja":"もう少しゆっくり話してください"},{"hanzi":"慢慢來，不要著急","pinyin":"màn màn lái bú yào zháo jí","translation_ja":"ゆっくりやりましょう、焦らないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',18,'快','kuài','速い','[{"hanzi":"他跑得很快","pinyin":"tā pǎo de hěn kuài","translation_ja":"彼は走るのがとても速いです"},{"hanzi":"時間過得真快","pinyin":"shí jiān guò de zhēn kuài","translation_ja":"時間が過ぎるのが本当に早いです"},{"hanzi":"快點出發吧","pinyin":"kuài diǎn chū fā ba","translation_ja":"早く出発しましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',19,'說','shuō','話す','[{"hanzi":"他喜歡說故事","pinyin":"tā xǐ huān shuō gù shì","translation_ja":"彼は物語を話すのが好きです"},{"hanzi":"請不要大聲說","pinyin":"qǐng bú yào dà shēng shuō","translation_ja":"大声で話さないでください"},{"hanzi":"你會說中文嗎？","pinyin":"nǐ huì shuō zhōng wén ma","translation_ja":"あなたは中国語を話せますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',20,'說話','shuō huà','話をする','[{"hanzi":"小朋友在說話","pinyin":"xiǎo péng yǒu zài shuō huà","translation_ja":"子供たちが話をしています"},{"hanzi":"上課時不要說話","pinyin":"shàng kè shí bú yào shuō huà","translation_ja":"授業中は話をしないでください"},{"hanzi":"他的說話方式很有趣","pinyin":"tā de shuō huà fāng shì hěn yǒu qù","translation_ja":"彼の話し方はとても面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',21,'電影','diàn yǐng','映画','[{"hanzi":"我喜歡看愛情電影","pinyin":"wǒ xǐ huān kàn ài qíng diàn yǐng","translation_ja":"私は恋愛映画を見るのが好きです"},{"hanzi":"他週末要去看電影","pinyin":"tā zhōu mò yào qù kàn diàn yǐng","translation_ja":"彼は週末に映画を観に行く予定です"},{"hanzi":"這部電影很好看","pinyin":"zhè bù diàn yǐng hěn hǎo kàn","translation_ja":"この映画はとても面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',22,'部','bù','～本（映画の量詞）','[{"hanzi":"這是一部新的電影","pinyin":"zhè shì yí bù xīn de diàn yǐng","translation_ja":"これは新しい映画です"},{"hanzi":"他看過很多部電影","pinyin":"tā kàn guò hěn duō bù diàn yǐng","translation_ja":"彼はたくさんの映画を観たことがあります"},{"hanzi":"我想推薦一部電影給你","pinyin":"wǒ xiǎng tuī jiàn yí bù diàn yǐng gěi nǐ","translation_ja":"あなたに映画を一本おすすめしたいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',23,'電影院','diàn yǐng yuàn','映画館','[{"hanzi":"我們週末去電影院看電影","pinyin":"wǒ men zhōu mò qù diàn yǐng yuàn kàn diàn yǐng","translation_ja":"私たちは週末に映画館へ映画を観に行きます"},{"hanzi":"電影院裡有很多人","pinyin":"diàn yǐng yuàn lǐ yǒu hěn duō rén","translation_ja":"映画館にはたくさんの人がいます"},{"hanzi":"這家電影院很大","pinyin":"zhè jiā diàn yǐng yuàn hěn dà","translation_ja":"この映画館はとても大きいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',24,'有趣','yǒu qù','面白い','[{"hanzi":"這個故事很有趣","pinyin":"zhè ge gù shì hěn yǒu qù","translation_ja":"この物語はとても面白いです"},{"hanzi":"我覺得學中文很有趣","pinyin":"wǒ jué de xué zhōng wén hěn yǒu qù","translation_ja":"私は中国語を学ぶのはとても面白いと思います"},{"hanzi":"他說話的方式很有趣","pinyin":"tā shuō huà de fāng shì hěn yǒu qù","translation_ja":"彼の話し方はとても面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',25,'覺得','jué dé','～と思う','[{"hanzi":"我覺得這部電影很好看","pinyin":"wǒ jué de zhè bù diàn yǐng hěn hǎo kàn","translation_ja":"私はこの映画はとても面白いと思います"},{"hanzi":"你覺得這件事怎麼樣？","pinyin":"nǐ jué de zhè jiàn shì zěn me yàng","translation_ja":"あなたはこのことについてどう思いますか？"},{"hanzi":"他覺得今天的天氣很舒服","pinyin":"tā jué de jīn tiān de tiān qì hěn shū fú","translation_ja":"彼は今日の天気がとても気持ち良いと思っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',26,'有(一)點(兒)','yǒu (yì) diǎn (er)','少し～','[{"hanzi":"我覺得這本書有一點難","pinyin":"wǒ jué de zhè běn shū yǒu yì diǎn nán","translation_ja":"この本は少し難しいと思います"},{"hanzi":"他今天看起來有點累","pinyin":"tā jīn tiān kàn qǐ lái yǒu diǎn lèi","translation_ja":"彼は今日少し疲れているように見えます"},{"hanzi":"這道菜有一點鹹","pinyin":"zhè dào cài yǒu yì diǎn xián","translation_ja":"この料理は少し塩辛いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',27,'休息','xiū xī','休む','[{"hanzi":"我們在樹下休息吧","pinyin":"wǒ men zài shù xià xiū xí ba","translation_ja":"木の下で休みましょう"},{"hanzi":"他工作了一天需要好好休息","pinyin":"tā gōng zuò le yì tiān xū yào hǎo hǎo xiū xí","translation_ja":"彼は一日働いて、しっかり休む必要があります"},{"hanzi":"午飯後我喜歡休息一下","pinyin":"wǒ xǐ huān xiū xí yí xià","translation_ja":"昼ご飯の後、少し休むのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',28,'上網','shàng wǎng','ネットをする','[{"hanzi":"我晚上喜歡上網聊天","pinyin":"wǒ wǎn shàng xǐ huān shàng wǎng liáo tiān","translation_ja":"私は夜にネットでおしゃべりするのが好きです"},{"hanzi":"他在圖書館上網查資料","pinyin":"tā zài tú shū guǎn shàng wǎng chá zī liào","translation_ja":"彼は図書館でネットで資料を調べています"},{"hanzi":"上網購物很方便","pinyin":"shàng wǎng gòu wù hěn fāng biàn","translation_ja":"ネットショッピングはとても便利です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',29,'電腦','diàn nǎo','コンピュータ','[{"hanzi":"我的電腦壞了","pinyin":"wǒ de diàn nǎo huài le","translation_ja":"私のコンピュータが壊れました"},{"hanzi":"他每天用電腦工作","pinyin":"tā měi tiān yòng diàn nǎo gōng zuò","translation_ja":"彼は毎日コンピュータを使って仕事をしています"},{"hanzi":"這台電腦很快","pinyin":"zhè tái diàn nǎo hěn kuài","translation_ja":"このコンピュータはとても速いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',30,'手機','shǒu jī','携帯電話','[{"hanzi":"我的手機在桌子上","pinyin":"wǒ de shǒu jī zài zhuō zi shàng","translation_ja":"私の携帯電話は机の上にあります"},{"hanzi":"他買了一支新手機","pinyin":"tā mǎi le yì zhī xīn shǒu jī","translation_ja":"彼は新しい携帯電話を買いました"},{"hanzi":"手機現在是很重要的工具","pinyin":"shǒu jī xiàn zài shì hěn zhòng yào de gōng jù","translation_ja":"携帯電話は今とても重要な道具です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',31,'支','zhī','～台（携帯電話など）','[{"hanzi":"我有兩支手機","pinyin":"wǒ yǒu liǎng zhī shǒu jī","translation_ja":"私は携帯電話を2台持っています"},{"hanzi":"這是一支新手機","pinyin":"zhè shì yì zhī xīn shǒu jī","translation_ja":"これは新しい携帯電話です"},{"hanzi":"他買了一支黑色的手機","pinyin":"tā mǎi le yì zhī hēi sè de shǒu jī","translation_ja":"彼は黒い携帯電話を1台買いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',32,'應該','yīng gāi','～すべき','[{"hanzi":"你應該多喝水","pinyin":"nǐ yīng gāi duō hē shuǐ","translation_ja":"あなたはもっと水を飲むべきです"},{"hanzi":"我們應該早點出發","pinyin":"wǒ men yīng gāi zǎo diǎn chū fā","translation_ja":"私たちは早めに出発するべきです"},{"hanzi":"孩子們應該好好學習","pinyin":"hái zi men yīng gāi hǎo hǎo xué xí","translation_ja":"子どもたちはしっかり勉強するべきです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',33,'運動','yùn dòng','運動','[{"hanzi":"他每天早上去運動","pinyin":"tā měi tiān zǎo shàng qù yùn dòng","translation_ja":"彼は毎朝運動をしに行きます"},{"hanzi":"運動對身體很好","pinyin":"yùn dòng duì shēn tǐ hěn hǎo","translation_ja":"運動は体にとても良いです"},{"hanzi":"你喜歡什麼運動？","pinyin":"nǐ xǐ huān shén me yùn dòng","translation_ja":"あなたはどんな運動が好きですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',34,'可以','kě yǐ','～できる','[{"hanzi":"你可以幫我一下嗎？","pinyin":"nǐ kě yǐ bāng wǒ yí xià ma","translation_ja":"私をちょっと手伝ってくれますか？"},{"hanzi":"這裡可以拍照嗎？","pinyin":"zhè lǐ kě yǐ pāi zhào ma","translation_ja":"ここで写真を撮ってもいいですか？"},{"hanzi":"我們可以一起去看電影","pinyin":"wǒ men kě yǐ yì qǐ qù kàn diàn yǐng","translation_ja":"私たちは一緒に映画を観に行けます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',35,'騎','qí','乗る','[{"hanzi":"他每天騎腳踏車上學","pinyin":"tā měi tiān qí jiǎo tà chē shàng xué","translation_ja":"彼は毎日自転車で学校に行きます"},{"hanzi":"我們週末去騎自行車吧","pinyin":"wǒ men zhōu mò qù qí zì xíng chē ba","translation_ja":"私たちは週末に自転車に乗りに行きましょう"},{"hanzi":"她喜歡騎馬","pinyin":"tā xǐ huān qí mǎ","translation_ja":"彼女は馬に乗るのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',36,'腳踏車/自行車','jiǎo tà chē / zì xíng chē','自転車','[{"hanzi":"這是一輛新的自行車","pinyin":"zhè shì yí liàng xīn de zì xíng chē","translation_ja":"これは新しい自転車です"},{"hanzi":"我會騎腳踏車","pinyin":"wǒ huì qí jiǎo tà chē","translation_ja":"私は自転車に乗れます"},{"hanzi":"這輛腳踏車是我的","pinyin":"zhè liàng jiǎo tà chē shì wǒ de","translation_ja":"この自転車は私のものです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',37,'輛','liàng','～台（車両の量詞）','[{"hanzi":"我有一輛腳踏車","pinyin":"wǒ yǒu yí liàng jiǎo tà chē","translation_ja":"私は自転車を1台持っています"},{"hanzi":"他買了一輛新車","pinyin":"tā mǎi le yí liàng xīn chē","translation_ja":"彼は新しい車を1台買いました"},{"hanzi":"這輛車很快","pinyin":"zhè liàng chē hěn kuài","translation_ja":"この車はとても速いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',38,'只','zhǐ','ただ～だけ','[{"hanzi":"我只想休息一下","pinyin":"wǒ zhǐ xiǎng xiū xí yí xià","translation_ja":"私はただ少し休みたいだけです"},{"hanzi":"他只會說英文","pinyin":"tā zhǐ huì shuō yīng wén","translation_ja":"彼は英語しか話せません"},{"hanzi":"我們只去了一次","pinyin":"wǒ men zhǐ qù le yí cì","translation_ja":"私たちは一度しか行ったことがありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',39,'後天','hòu tiān','あさって','[{"hanzi":"後天我們要去爬山","pinyin":"hòu tiān wǒ men yào qù pá shān","translation_ja":"あさって私たちは山登りに行きます"},{"hanzi":"後天的天氣應該很好","pinyin":"hòu tiān de tiān qì yīng gāi hěn hǎo","translation_ja":"あさっての天気は良さそうです"},{"hanzi":"我後天有一個會議","pinyin":"wǒ hòu tiān yǒu yí gè huì yì","translation_ja":"私はあさって会議があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',40,'前天','qián tiān','おととい','[{"hanzi":"我前天去了圖書館","pinyin":"wǒ qián tiān qù le tú shū guǎn","translation_ja":"私はおととい図書館に行きました"},{"hanzi":"前天的比賽很精彩","pinyin":"qián tiān de bǐ sài hěn jīng cǎi","translation_ja":"おとといの試合はとても素晴らしかった"},{"hanzi":"他前天才回來","pinyin":"tā qián tiān cái huí lái","translation_ja":"彼はおととい戻ってきたばかりです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',41,'聽說','tīng shuō','～と聞いている','[{"hanzi":"我聽說這部電影很好看","pinyin":"wǒ tīng shuō zhè bù diàn yǐng hěn hǎo kàn","translation_ja":"この映画は面白いと聞いています"},{"hanzi":"聽說你要去旅行","pinyin":"tīng shuō nǐ yào qù lǚ xíng","translation_ja":"あなたが旅行に行くと聞きました"},{"hanzi":"我聽說這家餐廳很有名","pinyin":"wǒ tīng shuō zhè jiā cān tīng hěn yǒu míng","translation_ja":"このレストランは有名だと聞いています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',42,'不要','bú yào','～しないでください','[{"hanzi":"請不要大聲說話","pinyin":"qǐng bú yào dà shēng shuō huà","translation_ja":"大声で話さないでください"},{"hanzi":"不要忘記帶手機","pinyin":"bú yào wàng jì dài shǒu jī","translation_ja":"携帯電話を持っていくのを忘れないでください"},{"hanzi":"不要太晚回家","pinyin":"bú yào tài wǎn huí jiā","translation_ja":"あまり遅く帰らないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',43,'興趣','xìng qù','興味','[{"hanzi":"他對畫畫很有興趣","pinyin":"tā duì huà huà hěn yǒu xìng qù","translation_ja":"彼は絵を描くことにとても興味があります"},{"hanzi":"我對學中文有興趣","pinyin":"wǒ duì xué zhōng wén yǒu xìng qù","translation_ja":"私は中国語を学ぶことに興味があります"},{"hanzi":"你對什麼事情有興趣？","pinyin":"nǐ duì shén me shì qíng yǒu xìng qù","translation_ja":"あなたは何に興味がありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',44,'幾','jǐ','いくつの、いくら','[{"hanzi":"你有幾個兄弟姐妹？","pinyin":"nǐ yǒu jǐ gè xiōng dì jiě mèi","translation_ja":"あなたには兄弟姉妹が何人いますか？"},{"hanzi":"現在幾點？","pinyin":"xiàn zài jǐ diǎn","translation_ja":"今何時ですか？"},{"hanzi":"這件衣服多少錢？","pinyin":"zhè jiàn yī fú duō shǎo qián","translation_ja":"この服はいくらですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',45,'學','xué','学ぶ','[{"hanzi":"我想學打網球","pinyin":"wǒ xiǎng xué dǎ wǎng qiú","translation_ja":"私はテニスを学びたいです"},{"hanzi":"他正在學中文","pinyin":"tā zhèng zài xué zhōng wén","translation_ja":"彼は中国語を学んでいます"},{"hanzi":"學新的東西很有趣","pinyin":"xué xīn de dōng xī hěn yǒu qù","translation_ja":"新しいことを学ぶのはとても面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',46,'學習','xué xí','学習する','[{"hanzi":"學習語言需要很多時間","pinyin":"xué xí yǔ yán xū yào hěn duō shí jiān","translation_ja":"言語を学ぶのにはたくさんの時間が必要です"},{"hanzi":"他每天都在努力學習","pinyin":"tā měi tiān dōu zài nǔ lì xué xí","translation_ja":"彼は毎日一生懸命に学習しています"},{"hanzi":"學習是一件快樂的事","pinyin":"xué xí shì yí jiàn kuài lè de shì","translation_ja":"学習は楽しいことです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',47,'唱歌','chàng gē','歌を歌う','[{"hanzi":"他喜歡唱歌","pinyin":"tā xǐ huān chàng gē","translation_ja":"彼は歌を歌うのが好きです"},{"hanzi":"我們一起去唱歌吧","pinyin":"wǒ men yì qǐ qù chàng gē ba","translation_ja":"一緒に歌いに行きましょう"},{"hanzi":"她唱歌唱得很好","pinyin":"tā chàng gē chàng dé hěn hǎo","translation_ja":"彼女は歌がとても上手です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',48,'歌','gē','歌','[{"hanzi":"這首歌很好聽","pinyin":"zhè shǒu gē hěn hǎo tīng","translation_ja":"この歌はとても良いです"},{"hanzi":"我喜歡聽中文歌","pinyin":"wǒ xǐ huān tīng zhōng wén gē","translation_ja":"私は中国語の歌を聴くのが好きです"},{"hanzi":"他會唱很多歌","pinyin":"tā huì chàng hěn duō gē","translation_ja":"彼はたくさんの歌を歌えます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',49,'首','shǒu','～曲（歌の量詞）','[{"hanzi":"這是一首流行歌","pinyin":"zhè shì yì shǒu liú xíng gē","translation_ja":"これは1曲の流行歌です"},{"hanzi":"他唱了一首新歌","pinyin":"tā chàng le yì shǒu xīn gē","translation_ja":"彼は1曲新しい歌を歌いました"},{"hanzi":"這首歌是誰唱的？","pinyin":"zhè shǒu gē shì shéi chàng de","translation_ja":"この歌は誰が歌ったものですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',50,'跳舞','tiào wǔ','ダンスをする','[{"hanzi":"他們正在跳舞","pinyin":"tā men zhèng zài tiào wǔ","translation_ja":"彼らは踊っています"},{"hanzi":"我們去跳舞吧","pinyin":"wǒ men qù tiào wǔ ba","translation_ja":"踊りに行きましょう"},{"hanzi":"她跳舞跳得很漂亮","pinyin":"tā tiào wǔ tiào dé hěn piào liàng","translation_ja":"彼女はとても美しく踊ります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',51,'畫畫','huà huà','絵を描く','[{"hanzi":"他喜歡畫畫","pinyin":"tā xǐ huān huà huà","translation_ja":"彼は絵を描くのが好きです"},{"hanzi":"我正在學畫畫","pinyin":"wǒ zhèng zài xué huà huà","translation_ja":"私は絵を描くことを学んでいます"},{"hanzi":"畫畫可以讓人放鬆","pinyin":"huà huà kě yǐ ràng rén fàng sōng","translation_ja":"絵を描くとリラックスできます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',52,'畫','huà','絵','[{"hanzi":"這是一幅漂亮的畫","pinyin":"zhè shì yì fú piào liàng de huà","translation_ja":"これは美しい絵です"},{"hanzi":"他畫了一幅山水畫","pinyin":"tā huà le yì fú shān shuǐ huà","translation_ja":"彼は山水画を1枚描きました"},{"hanzi":"我們去看畫展吧","pinyin":"wǒ men qù kàn huà zhǎn ba","translation_ja":"絵画展を見に行きましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',53,'平常','píng cháng','普段','[{"hanzi":"他平常都很早起","pinyin":"tā píng cháng dōu hěn zǎo qǐ","translation_ja":"彼は普段とても早起きです"},{"hanzi":"我平常週末都會運動","pinyin":"wǒ píng cháng zhōu mò dōu huì yùn dòng","translation_ja":"私は普段週末に運動します"},{"hanzi":"平常他不喝咖啡","pinyin":"píng cháng tā bù hē kā fēi","translation_ja":"普段、彼はコーヒーを飲みません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',54,'有(的)時候','yǒu (de) shí hòu','時々','[{"hanzi":"有的時候我會去公園散步","pinyin":"yǒu de shí hòu wǒ huì qù gōng yuán sàn bù","translation_ja":"時々私は公園を散歩します"},{"hanzi":"他有時候喜歡自己一個人","pinyin":"tā yǒu shí hòu xǐ huān zì jǐ yí gè rén","translation_ja":"彼は時々一人でいるのが好きです"},{"hanzi":"有時候下雨他就不出門","pinyin":"yǒu shí hòu xià yǔ tā jiù bù chū mén","translation_ja":"雨が降る時、彼は外に出ません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',55,'比賽','bǐ sài','試合','[{"hanzi":"今天下午有一場足球比賽","pinyin":"jīn tiān xià wǔ yǒu yì chǎng zú qiú bǐ sài","translation_ja":"今日の午後、サッカーの試合があります"},{"hanzi":"他參加了很多次籃球比賽","pinyin":"tā cān jiā le hěn duō cì lán qiú bǐ sài","translation_ja":"彼はたくさんのバスケットボールの試合に参加しました"},{"hanzi":"這場比賽非常精彩","pinyin":"zhè chǎng bǐ sài fēi cháng jīng cǎi","translation_ja":"この試合はとても素晴らしかったです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',56,'真','zhēn','本当に','[{"hanzi":"今天的天氣真好","pinyin":"jīn tiān de tiān qì zhēn hǎo","translation_ja":"今日の天気は本当に良いです"},{"hanzi":"他真聰明","pinyin":"tā zhēn cōng míng","translation_ja":"彼は本当に賢いです"},{"hanzi":"這本書真有意思","pinyin":"zhè běn shū zhēn yǒu yì si","translation_ja":"この本は本当に面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson06',57,'高興','gāo xìng','嬉しい','[{"hanzi":"我很高興見到你","pinyin":"wǒ hěn gāo xìng jiàn dào nǐ","translation_ja":"あなたに会えてとても嬉しいです"},{"hanzi":"他今天看起來很高興","pinyin":"tā jīn tiān kàn qǐ lái hěn gāo xìng","translation_ja":"彼は今日とても嬉しそうです"},{"hanzi":"聽到這個消息，我們都很高興","pinyin":"tīng dào zhè gè xiāo xī wǒ men dōu hěn gāo xìng","translation_ja":"この知らせを聞いて、私たちはみんなとても嬉しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',1,'怎麼','zěn me','どうやって','[{"hanzi":"你知道怎麼到飯店嗎？","pinyin":"nǐ zhī dào zěn me dào fàn diàn ma","translation_ja":"ホテルにどうやって行くか知っていますか？"},{"hanzi":"怎麼走到最近的超市？","pinyin":"zěn me zǒu dào zuì jìn de chāo shì","translation_ja":"一番近いスーパーへはどうやって行きますか？"},{"hanzi":"他不知道怎麼寫這封信","pinyin":"tā bù zhī dào zěn me xiě zhè fēng xìn","translation_ja":"彼はこの手紙をどう書けばいいのかわかりません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',2,'到','dào','～に到着する','[{"hanzi":"我們到了火車站","pinyin":"wǒ men dào le huǒ chē zhàn","translation_ja":"私たちは駅に着きました"},{"hanzi":"從學校到市場很近","pinyin":"cóng xué xiào dào shì chǎng hěn jìn","translation_ja":"学校から市場まではとても近いです"},{"hanzi":"你什麼時候會到台北？","pinyin":"nǐ shén me shí hòu huì dào tái běi","translation_ja":"いつ台北に着きますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',3,'飯店','fàn diàn','ホテル','[{"hanzi":"這家飯店很舒服，服務也很好","pinyin":"zhè jiā fàn diàn hěn shū fú fú wù yě hěn hǎo","translation_ja":"このホテルはとても快適で、サービスも良いです"},{"hanzi":"我們要在飯店裡等朋友","pinyin":"wǒ men yào zài fàn diàn lǐ děng péng yǒu","translation_ja":"私たちはホテルで友達を待つつもりです"},{"hanzi":"從飯店到機場需要多少時間？","pinyin":"cóng fàn diàn dào jī chǎng xū yào duō shǎo shí jiān","translation_ja":"ホテルから空港までどれくらい時間がかかりますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',4,'旅館','lǚ guǎn','旅館','[{"hanzi":"我們住在一家很便宜的旅館","pinyin":"wǒ men zhù zài yì jiā hěn pián yí de lǚ guǎn","translation_ja":"私たちはとても安い旅館に泊まっています"},{"hanzi":"這家旅館的房間很大，還有廚房","pinyin":"zhè jiā lǚ guǎn de fáng jiān hěn dà hái yǒu chú fáng","translation_ja":"この旅館の部屋は広く、キッチンもあります"},{"hanzi":"你去過幾次這家旅館？","pinyin":"nǐ qù guò jǐ cì zhè jiā lǚ guǎn","translation_ja":"この旅館に何回行ったことがありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',5,'找','zhǎo','探す、探す','[{"hanzi":"他在找一條很近的路去車站","pinyin":"tā zài zhǎo yì tiáo hěn jìn de lù qù chē zhàn","translation_ja":"彼は駅へ行く近道を探しています"},{"hanzi":"我們在附近找了一家餐廳","pinyin":"wǒ men zài fù jìn zhǎo le yì jiā cān tīng","translation_ja":"私たちは近くでレストランを見つけました"},{"hanzi":"你幫我找一下地圖，好嗎？","pinyin":"nǐ bāng wǒ zhǎo yí xià dì tú hǎo ma","translation_ja":"地図を探すのを手伝ってくれますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',6,'韓國','hán guó','韓国','[{"hanzi":"我想明年去韓國旅行","pinyin":"wǒ xiǎng míng nián qù hán guó lǚ xíng","translation_ja":"来年韓国に旅行したいです"},{"hanzi":"韓國的食物非常有名","pinyin":"hán guó de shí wù fēi cháng yǒu míng","translation_ja":"韓国の料理はとても有名です"},{"hanzi":"你去過韓國幾次？","pinyin":"nǐ qù guò hán guó jǐ cì","translation_ja":"韓国に何回行ったことがありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',7,'等','děng','待つ','[{"hanzi":"我在車站等了半個小時","pinyin":"wǒ zài chē zhàn děng le bàn gè xiǎo shí","translation_ja":"私は駅で30分待ちました"},{"hanzi":"等一會兒，我們一起去寄信吧","pinyin":"děng yì huǐ er wǒ men yì qǐ qù jì xìn ba","translation_ja":"少し待ってから、一緒に手紙を出しに行きましょう"},{"hanzi":"火車還沒來，我們繼續等吧","pinyin":"huǒ chē hái méi lái wǒ men jì xù děng ba","translation_ja":"電車はまだ来ていないので、待ち続けましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',8,'坐','zuò','（乗り物に）乗る','[{"hanzi":"我們坐捷運去機場","pinyin":"wǒ men zuò jié yùn qù jī chǎng","translation_ja":"私たちは地下鉄で空港に行きます"},{"hanzi":"你每天坐公共汽車上班嗎？","pinyin":"nǐ měi tiān zuò gōng gòng qì chē shàng bān ma","translation_ja":"毎日バスで通勤していますか？"},{"hanzi":"我不喜歡坐計程車，因為太貴了","pinyin":"wǒ bù xǐ huān zuò jì chéng chē yīn wèi tài guì le","translation_ja":"タクシーに乗るのは好きではありません、なぜなら高いからです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',9,'捷運/地鐵','jié yùn / dì tiě','地下鉄','[{"hanzi":"台北的捷運非常方便","pinyin":"tái běi de jié yùn fēi cháng fāng biàn","translation_ja":"台北の地下鉄はとても便利です"},{"hanzi":"我們坐地鐵去動物園吧","pinyin":"wǒ men zuò dì tiě qù dòng wù yuán ba","translation_ja":"地下鉄で動物園に行きましょう"},{"hanzi":"請問地鐵站在哪裡？","pinyin":"qǐng wèn dì tiě zhàn zài nǎ lǐ","translation_ja":"地下鉄の駅はどこですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',10,'公共汽車/公車','gōng gòng qì chē / gōng chē','バス','[{"hanzi":"我每天坐公共汽車上學","pinyin":"wǒ měi tiān zuò gōng gòng qì chē shàng xué","translation_ja":"私は毎日バスで学校に通っています"},{"hanzi":"這條公車線路很長","pinyin":"zhè tiáo gōng chē xiàn lù hěn cháng","translation_ja":"このバス路線はとても長いです"},{"hanzi":"公共汽車站在超市旁邊","pinyin":"gōng gòng qì chē zhàn zài chāo shì páng biān","translation_ja":"バス停はスーパーの隣にあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',11,'車(子)/汽車','chē (zi) / qì chē','車','[{"hanzi":"他有一輛很漂亮的汽車","pinyin":"tā yǒu yì liàng hěn piào liàng de qì chē","translation_ja":"彼はとても綺麗な車を持っています"},{"hanzi":"那輛車是我的","pinyin":"nà liàng chē shì wǒ de","translation_ja":"あの車は私のです"},{"hanzi":"你知道怎麼開車嗎？","pinyin":"nǐ zhī dào zěn me kāi chē ma","translation_ja":"車の運転の仕方を知っていますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',12,'計程車','jì chéng chē','タクシー','[{"hanzi":"我們打計程車去飯店吧","pinyin":"wǒ men dǎ jì chéng chē qù fàn diàn ba","translation_ja":"タクシーでホテルに行きましょう"},{"hanzi":"計程車司機很熱情","pinyin":"jì chéng chē sī jī hěn rè qíng","translation_ja":"タクシー運転手はとても親切です"},{"hanzi":"你叫了計程車嗎？","pinyin":"nǐ jiào le jì chéng chē ma","translation_ja":"タクシーを呼びましたか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',13,'火車','huǒ chē','電車','[{"hanzi":"我們坐火車去台中吧","pinyin":"wǒ men zuò huǒ chē qù tái zhōng ba","translation_ja":"電車で台中に行きましょう"},{"hanzi":"火車站離這裡很近","pinyin":"huǒ chē zhàn lí zhè lǐ hěn jìn","translation_ja":"駅はここから近いです"},{"hanzi":"火車什麼時候到？","pinyin":"huǒ chē shén me shí hòu dào","translation_ja":"電車はいつ着きますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',14,'上車','shàng chē','乗車する','[{"hanzi":"請排隊上車","pinyin":"qǐng pái duì shàng chē","translation_ja":"並んで乗車してください"},{"hanzi":"小心上車！","pinyin":"xiǎo xīn shàng chē","translation_ja":"気を付けて乗車してください！"},{"hanzi":"他們剛剛上車了","pinyin":"tā men gāng gāng shàng chē","translation_ja":"彼らはさっき乗車しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',15,'下車','xià chē','降車する','[{"hanzi":"我在下一站下車","pinyin":"wǒ zài xià yí zhàn xià chē","translation_ja":"私は次の駅で降ります"},{"hanzi":"請注意下車的時候別忘了東西","pinyin":"qǐng zhù yì xià chē de shí hòu bié wàng le dōng xi","translation_ja":"降車の際、忘れ物にご注意ください"},{"hanzi":"你什麼時候下車？","pinyin":"nǐ shén me shí hòu xià chē","translation_ja":"いつ降りますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',16,'遠','yuǎn','遠い','[{"hanzi":"這裡離飯店很遠","pinyin":"zhè lǐ lí fàn diàn hěn yuǎn","translation_ja":"ここはホテルから遠いです"},{"hanzi":"他家住得很遠","pinyin":"tā jiā zhù de hěn yuǎn","translation_ja":"彼の家はとても遠いです"},{"hanzi":"我覺得這個地方有點遠","pinyin":"wǒ jué de zhè ge dì fāng yǒu diǎn yuǎn","translation_ja":"この場所は少し遠いと感じます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',17,'近','jìn','近い','[{"hanzi":"超市離學校很近","pinyin":"chāo shì lí xué xiào hěn jìn","translation_ja":"スーパーは学校から近いです"},{"hanzi":"我家離郵局很近","pinyin":"wǒ jiā lí yóu jú hěn jìn","translation_ja":"私の家は郵便局から近いです"},{"hanzi":"他們的公司很近，我們可以一起去","pinyin":"tā men de gōng sī hěn jìn wǒ men kě yǐ yì qǐ qù","translation_ja":"彼らの会社は近いので、一緒に行けます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',18,'想','xiǎng','～したいと思う','[{"hanzi":"我想去超市買東西","pinyin":"wǒ xiǎng qù chāo shì mǎi dōng xi","translation_ja":"スーパーに行って買い物をしたいです"},{"hanzi":"你想吃什麼？","pinyin":"nǐ xiǎng chī shén me","translation_ja":"何を食べたいですか？"},{"hanzi":"她很想學開車","pinyin":"tā hěn xiǎng xué kāi chē","translation_ja":"彼女は車の運転を学びたいと思っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',19,'從','cóng','～から','[{"hanzi":"從這裡到捷運站需要五分鐘","pinyin":"cóng zhè lǐ dào jié yùn zhàn xū yào wǔ fēn zhōng","translation_ja":"ここから地下鉄の駅までは5分かかります"},{"hanzi":"從學校到家有多遠？","pinyin":"cóng xué xiào dào jiā yǒu duō yuǎn","translation_ja":"学校から家まではどれくらい遠いですか？"},{"hanzi":"從明天開始，我們要早一點起床","pinyin":"cóng míng tiān kāi shǐ wǒ men yào zǎo yì diǎn qǐ chuáng","translation_ja":"明日から私たちは早起きしなければなりません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',20,'走路','zǒu lù','歩く','[{"hanzi":"我們走路去公園吧","pinyin":"wǒ men zǒu lù qù gōng yuán ba","translation_ja":"歩いて公園に行きましょう"},{"hanzi":"從這裡走路到市場要十分鐘","pinyin":"cóng zhè lǐ zǒu lù dào shì chǎng yào shí fēn zhōng","translation_ja":"ここから市場まで歩いて10分かかります"},{"hanzi":"我喜歡早上走路上學","pinyin":"wǒ xǐ huān zǎo shàng zǒu lù shàng xué","translation_ja":"私は朝歩いて学校に通うのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',21,'走','zǒu','歩く、行く','[{"hanzi":"請你往右走，郵局在那邊","pinyin":"qǐng nǐ wǎng yòu zǒu yóu jú zài nà biān","translation_ja":"右に進んでください郵便局はそちらです"},{"hanzi":"他走得很快，我跟不上","pinyin":"tā zǒu de hěn kuài wǒ gēn bú shàng","translation_ja":"彼は歩くのが速く、私は追いつけません"},{"hanzi":"這條路可以一直走到市場","pinyin":"zhè tiáo lù kě yǐ yì zhí zǒu dào shì chǎng","translation_ja":"この道をまっすぐ行くと市場に着きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',22,'先','xiān','まず、先に','[{"hanzi":"你先去，我等一下就到","pinyin":"nǐ xiān qù wǒ děng yí xià jiù dào","translation_ja":"先に行ってください、すぐに追いかけます"},{"hanzi":"我先吃飯，再做功課","pinyin":"wǒ xiān chī fàn zài zuò gōng kè","translation_ja":"先にご飯を食べてから宿題をします"},{"hanzi":"請你先看看這張地圖","pinyin":"qǐng nǐ xiān kàn kàn zhè zhāng dì tú","translation_ja":"まずこの地図を見てください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',23,'地圖','dì tú','地図','[{"hanzi":"你有台北的地圖嗎？","pinyin":"nǐ yǒu tái běi de dì tú ma","translation_ja":"台北の地図を持っていますか？"},{"hanzi":"我們可以用地圖找路","pinyin":"wǒ men kě yǐ yòng dì tú zhǎo lù","translation_ja":"地図を使って道を探せます"},{"hanzi":"地圖上標出了超市的位置","pinyin":"dì tú shàng biāo chū le chāo shì de wèi zhì","translation_ja":"地図にはスーパーの位置が示されています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',24,'錶/手錶','biǎo / shǒu biǎo','時計/腕時計','[{"hanzi":"我的手錶壞了","pinyin":"wǒ de shǒu biǎo huài le","translation_ja":"私の腕時計が壊れました"},{"hanzi":"這是一塊很貴的手錶","pinyin":"zhè shì yí kuài hěn guì de shǒu biǎo","translation_ja":"これはとても高価な腕時計です"},{"hanzi":"他每天看手錶看時間","pinyin":"tā měi tiān kàn shǒu biǎo kàn shí jiān","translation_ja":"彼は毎日腕時計で時間を確認します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',25,'了','le','～した、～になる','[{"hanzi":"我們已經到了飯店","pinyin":"wǒ men yǐ jīng dào le fàn diàn","translation_ja":"私たちはすでにホテルに着きました"},{"hanzi":"他學會了怎麼開車","pinyin":"tā xué huì le zěn me kāi chē","translation_ja":"彼は車の運転の仕方を学びました"},{"hanzi":"我聽說他去了韓國","pinyin":"wǒ tīng shuō tā qù le hán guó","translation_ja":"彼が韓国に行ったと聞きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',26,'路/馬路','lù / mǎ lù','道路/大通り','[{"hanzi":"這條路很窄","pinyin":"zhè tiáo lù hěn zhǎi","translation_ja":"この道はとても狭いです"},{"hanzi":"我們走這條馬路可以到車站","pinyin":"wǒ men zǒu zhè tiáo mǎ lù kě yǐ dào chē zhàn","translation_ja":"この大通りを歩けば駅に行けます"},{"hanzi":"小心馬路上的車子","pinyin":"xiǎo xīn mǎ lù shàng de chē zi","translation_ja":"大通りの車に気を付けてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',27,'條','tiáo','～本（細長いものを数える）','[{"hanzi":"這是一條新修的路","pinyin":"zhè shì yì tiáo xīn xiū de lù","translation_ja":"これは新しく作られた道です"},{"hanzi":"他有一條很大的狗","pinyin":"tā yǒu yì tiáo hěn dà de gǒu","translation_ja":"彼はとても大きな犬を飼っています"},{"hanzi":"超市旁邊有一條街","pinyin":"chāo shì páng biān yǒu yì tiáo jiē","translation_ja":"スーパーの隣に一本の通りがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',28,'街','jiē','通り','[{"hanzi":"這條街有很多餐廳","pinyin":"zhè tiáo jiē yǒu hěn duō cān tīng","translation_ja":"この通りにはたくさんのレストランがあります"},{"hanzi":"街上很安靜，幾乎沒有人","pinyin":"jiē shàng hěn ān jìng jī hū méi yǒu rén","translation_ja":"通りはとても静かで、ほとんど人がいません"},{"hanzi":"你去過這條街上的書店嗎？","pinyin":"nǐ qù guò zhè tiáo jiē shàng de shū diàn","translation_ja":"この通りの本屋に行ったことがありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',29,'地方','dì fāng','場所','[{"hanzi":"這個地方很安靜，適合散步","pinyin":"zhè ge dì fāng hěn ān jìng shì hé sàn bù","translation_ja":"この場所は静かで、散歩に適しています"},{"hanzi":"我想去一個新的地方旅遊","pinyin":"wǒ xiǎng qù yí ge xīn de dì fāng lǚ yóu","translation_ja":"新しい場所に旅行に行きたいです"},{"hanzi":"這個地方有很多好吃的東西","pinyin":"zhè ge dì fāng yǒu hěn duō hǎo chī de dōng xi","translation_ja":"この場所には美味しいものがたくさんあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',30,'附近','fù jìn','近く','[{"hanzi":"我家附近有一家超市","pinyin":"wǒ jiā fù jìn yǒu yì jiā chāo shì","translation_ja":"私の家の近くにスーパーがあります"},{"hanzi":"你知道附近有沒有郵局？","pinyin":"nǐ zhī dào fù jìn yǒu méi yǒu yóu jú","translation_ja":"近くに郵便局があるか知っていますか？"},{"hanzi":"他常常在學校附近散步","pinyin":"tā cháng cháng zài xué xiào fù jìn sàn bù","translation_ja":"彼はよく学校の近くを散歩しています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',31,'郵局','yóu jú','郵便局','[{"hanzi":"郵局離這裡有多遠？","pinyin":"yóu jú lí zhè lǐ yǒu duō yuǎn","translation_ja":"郵便局はここからどれくらい遠いですか？"},{"hanzi":"我需要去郵局寄信","pinyin":"wǒ xū yào qù yóu jú jì xìn","translation_ja":"郵便局に手紙を出しに行く必要があります"},{"hanzi":"這家郵局早上八點開門","pinyin":"zhè jiā yóu jú zǎo shàng bā diǎn kāi mén","translation_ja":"この郵便局は朝8時に開きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',32,'寄','jì','送る、郵送する','[{"hanzi":"我去郵局寄了一封信","pinyin":"wǒ qù yóu jú jì le yì fēng xìn","translation_ja":"郵便局に手紙を出しに行きました"},{"hanzi":"請幫我寄這些包裹","pinyin":"qǐng bāng wǒ jì zhè xiē bāo guǒ","translation_ja":"これらの荷物を送ってください"},{"hanzi":"你會用手機寄照片嗎？","pinyin":"nǐ huì yòng shǒu jī jì zhào piàn ma","translation_ja":"スマートフォンで写真を送れますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',33,'信','xìn','手紙','[{"hanzi":"他每天都寫信給家人","pinyin":"tā měi tiān dōu xiě xìn gěi jiā rén","translation_ja":"彼は毎日家族に手紙を書いています"},{"hanzi":"我收到了一封很長的信","pinyin":"wǒ shōu dào le yì fēng hěn cháng de xìn","translation_ja":"とても長い手紙を受け取りました"},{"hanzi":"這封信是誰寫的？","pinyin":"zhè fēng xìn shì shéi xiě de","translation_ja":"この手紙は誰が書いたものですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',34,'封','fēng','～通（手紙の量詞）','[{"hanzi":"他給我寫了一封信","pinyin":"tā gěi wǒ xiě le yì fēng xìn","translation_ja":"彼は私に手紙を一通書いてくれました"},{"hanzi":"這封信是給誰的？","pinyin":"zhè fēng xìn shì gěi shéi de","translation_ja":"この手紙は誰宛てですか？"},{"hanzi":"我昨天寄了三封信","pinyin":"wǒ zuó tiān jì le sān fēng xìn","translation_ja":"昨日手紙を3通送りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',35,'信封','xìn fēng','封筒','[{"hanzi":"你有多餘的信封嗎？","pinyin":"nǐ yǒu duō yú de xìn fēng ma","translation_ja":"余分な封筒を持っていますか？"},{"hanzi":"這個信封太小，放不下","pinyin":"zhè ge xìn fēng tài xiǎo fàng bú xià","translation_ja":"この封筒は小さすぎて入りません"},{"hanzi":"我需要買一些信封","pinyin":"wǒ xū yào mǎi yì xiē xìn fēng","translation_ja":"いくつか封筒を買う必要があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',36,'超級市場/超市','chāo jí shì chǎng / chāo shì','スーパー','[{"hanzi":"超市裡有很多新鮮的水果","pinyin":"chāo shì lǐ yǒu hěn duō xīn xiān de shuǐ guǒ","translation_ja":"スーパーにはたくさんの新鮮な果物があります"},{"hanzi":"我們晚上去超市買東西吧","pinyin":"wǒ men wǎn shàng qù chāo shì mǎi dōng xi","translation_ja":"夜にスーパーへ買い物に行きましょう"},{"hanzi":"超級市場的東西很便宜","pinyin":"chāo jí shì chǎng de dōng xi hěn pián yí","translation_ja":"スーパーの商品はとても安いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',37,'市場','shì chǎng','市場','[{"hanzi":"市場裡有很多便宜的衣服","pinyin":"shì chǎng lǐ yǒu hěn duō pián yí de yī fú","translation_ja":"市場にはたくさんの安い服があります"},{"hanzi":"我喜歡早上去市場買菜","pinyin":"wǒ xǐ huān zǎo shàng qù shì chǎng mǎi cài","translation_ja":"朝に市場で野菜を買うのが好きです"},{"hanzi":"這個市場很熱鬧","pinyin":"zhè ge shì chǎng hěn rè nào","translation_ja":"この市場はとても賑やかです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',38,'一定','yí dìng','必ず、絶対に','[{"hanzi":"你一定要試試這家餐廳的菜","pinyin":"nǐ yí dìng yào shì shì zhè jiā cān tīng de cài","translation_ja":"このレストランの料理をぜひ試してみてください"},{"hanzi":"他說他一定會來","pinyin":"tā shuō tā yí dìng huì lái","translation_ja":"彼は必ず来ると言いました"},{"hanzi":"我一定要把這件事情做好","pinyin":"wǒ yí dìng yào bǎ zhè jiàn shì qíng zuò hǎo","translation_ja":"私はこの件を必ずやり遂げます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',39,'又','yòu','また、さらに','[{"hanzi":"今天又是下雨天","pinyin":"jīn tiān yòu shì xià yǔ tiān","translation_ja":"今日もまた雨の日です"},{"hanzi":"他又買了一本新書","pinyin":"tā yòu mǎi le yì běn xīn shū","translation_ja":"彼はまた新しい本を買いました"},{"hanzi":"我昨天去超市，今天又去了","pinyin":"wǒ zuó tiān qù chāo shì jīn tiān yòu qù le","translation_ja":"昨日スーパーに行き、今日もまた行きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',40,'方便','fāng biàn','便利','[{"hanzi":"超市旁邊有一個公車站，很方便","pinyin":"chāo shì páng biān yǒu yí ge gōng chē zhàn hěn fāng biàn","translation_ja":"スーパーの隣にバス停があってとても便利です"},{"hanzi":"用手機查地圖非常方便","pinyin":"yòng shǒu jī chá dì tú fēi cháng fāng biàn","translation_ja":"スマートフォンで地図を調べるのはとても便利です"},{"hanzi":"我覺得坐捷運比坐公車方便","pinyin":"wǒ jué de zuò jié yùn bǐ zuò gōng chē fāng biàn","translation_ja":"地下鉄に乗る方がバスより便利だと思います"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',41,'舒服','shū fú','快適','[{"hanzi":"這張椅子坐起來很舒服","pinyin":"zhè zhāng yǐ zi zuò qǐ lái hěn shū fú","translation_ja":"この椅子は座り心地がとても良いです"},{"hanzi":"房間裡的床很舒服","pinyin":"fáng jiān lǐ de chuáng hěn shū fú","translation_ja":"部屋のベッドはとても快適です"},{"hanzi":"我覺得現在的天氣很舒服","pinyin":"wǒ jué de xiàn zài de tiān qì hěn shū fú","translation_ja":"今の天気はとても快適だと感じます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',42,'線','xiàn','線、路線','[{"hanzi":"這條地鐵線很方便","pinyin":"zhè tiáo dì tiě xiàn hěn fāng biàn","translation_ja":"この地下鉄の路線はとても便利です"},{"hanzi":"你知道這條線到哪裡嗎？","pinyin":"nǐ zhī dào zhè tiáo xiàn dào nǎ lǐ ma","translation_ja":"この路線がどこまで行くか知っていますか？"},{"hanzi":"他每天坐同一條線的公共汽車","pinyin":"tā měi tiān zuò tóng yì tiáo xiàn de gōng gòng qì chē","translation_ja":"彼は毎日同じ路線のバスに乗ります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',43,'藍','lán','青','[{"hanzi":"天空是藍色的，很漂亮","pinyin":"tiān kōng shì lán sè de hěn piào liàng","translation_ja":"空は青くてとても綺麗です"},{"hanzi":"這件藍色的衣服很好看","pinyin":"zhè jiàn lán sè de yī fú hěn hǎo kàn","translation_ja":"この青い服はとても素敵です"},{"hanzi":"你喜歡藍色還是紅色？","pinyin":"nǐ xǐ huān lán sè hái shì hóng sè","translation_ja":"青色が好きですか、それとも赤色ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',44,'機場/飛機場','jī chǎng / fēi jī chǎng','空港','[{"hanzi":"機場離市中心很遠","pinyin":"jī chǎng lí shì zhōng xīn hěn yuǎn","translation_ja":"空港は市の中心から遠いです"},{"hanzi":"我們坐捷運去機場吧","pinyin":"wǒ men zuò jié yùn qù jī chǎng","translation_ja":"地下鉄で空港に行きましょう"},{"hanzi":"機場附近有很多飯店","pinyin":"jī chǎng fù jìn yǒu hěn duō fàn diàn","translation_ja":"空港の近くにはたくさんのホテルがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',45,'開車','kāi chē','車を運転する','[{"hanzi":"他開車技術很好","pinyin":"tā kāi chē jì shù hěn hǎo","translation_ja":"彼は車の運転がとても上手です"},{"hanzi":"你什麼時候學會開車的？","pinyin":"nǐ shén me shí hòu xué huì kāi chē de","translation_ja":"あなたはいつ車の運転を覚えましたか？"},{"hanzi":"父親每天早上開車上班","pinyin":"fù qīn měi tiān zǎo shàng kāi chē shàng bān","translation_ja":"父は毎朝車で出勤します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',46,'司機','sī jī','運転手','[{"hanzi":"計程車司機很熱心","pinyin":"jì chéng chē sī jī hěn rè xīn","translation_ja":"タクシーの運転手はとても親切です"},{"hanzi":"司機知道所有的路","pinyin":"sī jī zhī dào suǒ yǒu de lù","translation_ja":"運転手はすべての道を知っています"},{"hanzi":"我們的司機很守時","pinyin":"wǒ men de sī jī hěn shǒu shí","translation_ja":"私たちの運転手は時間を守ります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',47,'車站','chē zhàn','駅','[{"hanzi":"車站在這條路的右邊","pinyin":"chē zhàn zài zhè tiáo lù de yòu biān","translation_ja":"駅はこの道の右側にあります"},{"hanzi":"我們需要在下一個車站下車","pinyin":"wǒ men xū yào zài xià yí ge chē zhàn xià chē","translation_ja":"次の駅で降りる必要があります"},{"hanzi":"車站附近有很多便利店","pinyin":"chē zhàn fù jìn yǒu hěn duō biàn lì diàn","translation_ja":"駅の近くにはたくさんのコンビニがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',48,'站','zhàn','駅、立つ','[{"hanzi":"公車站在超市旁邊","pinyin":"gōng chē zhàn zài chāo shì páng biān","translation_ja":"バス停はスーパーの隣にあります"},{"hanzi":"我們在車站等公共汽車","pinyin":"wǒ men zài chē zhàn děng gōng gòng qì chē","translation_ja":"私たちはバス停でバスを待っています"},{"hanzi":"他站在門口等朋友","pinyin":"tā zhàn zài mén kǒu děng péng yǒu","translation_ja":"彼は玄関で友達を待っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',49,'飛機','fēi jī','飛行機','[{"hanzi":"我第一次坐飛機的時候很緊張","pinyin":"wǒ dì yī cì zuò fēi jī de shí hòu hěn jǐn zhāng","translation_ja":"初めて飛行機に乗ったとき、とても緊張しました"},{"hanzi":"飛機幾點起飛？","pinyin":"fēi jī jǐ diǎn qǐ fēi","translation_ja":"飛行機は何時に離陸しますか？"},{"hanzi":"這架飛機是飛往東京的","pinyin":"zhè jià fēi jī shì fēi wǎng dōng jīng de","translation_ja":"この飛行機は東京行きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',50,'架','jià','～機（飛行機や機械の量詞）','[{"hanzi":"這架飛機很大，可以坐三百個人","pinyin":"zhè jià fēi jī hěn dà kě yǐ zuò sān bǎi gè rén","translation_ja":"この飛行機はとても大きく、300人が乗れます"},{"hanzi":"他買了一架新相機","pinyin":"tā mǎi le yì jià xīn xiàng jī","translation_ja":"彼は新しいカメラを一台買いました"},{"hanzi":"這裡停了一架飛機","pinyin":"zhè lǐ tíng le yí jià fēi jī","translation_ja":"ここに一機の飛行機が止まっています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',51,'飛','fēi','飛ぶ','[{"hanzi":"飛機正在天空上飛","pinyin":"fēi jī zhèng zài tiān kōng shàng fēi","translation_ja":"飛行機が空を飛んでいます"},{"hanzi":"鳥兒從樹上飛起來了","pinyin":"niǎo er cóng shù shàng fēi qǐ lái le","translation_ja":"鳥が木から飛び立ちました"},{"hanzi":"他夢見自己會飛","pinyin":"tā mèng jiàn zì jǐ huì fēi","translation_ja":"彼は自分が飛べる夢を見ました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson07',52,'起飛','qǐ fēi','離陸する','[{"hanzi":"飛機在九點半起飛","pinyin":"fēi jī zài jiǔ diǎn bàn qǐ fēi","translation_ja":"飛行機は9時半に離陸します"},{"hanzi":"起飛前請繫好安全帶","pinyin":"qǐ fēi qián qǐng xì hǎo ān quán dài","translation_ja":"離陸前にシートベルトをしっかり締めてください"},{"hanzi":"因為天氣不好，飛機延遲起飛","pinyin":"yīn wèi tiān qì bù hǎo fēi jī yán chí qǐ fēi","translation_ja":"天気が悪いため、飛行機の離陸が遅れました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',1,'裙子','qún zi','スカート','[{"hanzi":"這條裙子真漂亮","pinyin":"zhè tiáo qún zi zhēn piào liàng","translation_ja":"このスカートは本当にきれいです"},{"hanzi":"我昨天買了一條裙子","pinyin":"wǒ zuó tiān mǎi le yì tiáo qún zi","translation_ja":"私は昨日スカートを1枚買いました"},{"hanzi":"妹妹的裙子很短","pinyin":"mèi mei de qún zi hěn duǎn","translation_ja":"妹のスカートは短いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',2,'去年','qù nián','昨年','[{"hanzi":"我去年去了台北","pinyin":"wǒ qù nián qù le tái běi","translation_ja":"私は昨年台北に行きました"},{"hanzi":"去年的衣服現在穿起來還很舒服","pinyin":"qù nián de yī fu xiàn zài chuān qǐ lái hái hěn shū fú","translation_ja":"昨年の服は今着てもまだ快適です"},{"hanzi":"你記得去年發生了什麼事嗎？","pinyin":"nǐ jì dé qù nián fā shēng le shén me shì ma","translation_ja":"昨年何が起きたか覚えていますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',3,'年','nián','年','[{"hanzi":"今年是一個特別的年","pinyin":"jīn nián shì yí gè tè bié de nián","translation_ja":"今年は特別な年です"},{"hanzi":"明年我想去留學一年","pinyin":"míng nián wǒ xiǎng qù liú xué yì nián","translation_ja":"来年1年間留学に行きたいと思います"},{"hanzi":"他已經工作很多年了","pinyin":"tā yǐ jīng gōng zuò hěn duō nián le","translation_ja":"彼はすでに長年働いています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',4,'今年','jīn nián','今年','[{"hanzi":"今年的天氣很奇怪","pinyin":"jīn nián de tiān qì hěn qí guài","translation_ja":"今年の天気は変ですね"},{"hanzi":"今年我學了很多新東西","pinyin":"jīn nián wǒ xué le hěn duō xīn dōng xi","translation_ja":"今年私は多くの新しいことを学びました"},{"hanzi":"你今年幾歲了？","pinyin":"nǐ jīn nián jǐ suì le","translation_ja":"今年何歳になりましたか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',5,'明年','míng nián','来年','[{"hanzi":"明年我要去日本旅行","pinyin":"míng nián wǒ yào qù rì běn lǚ xíng","translation_ja":"来年私は日本に旅行に行きます"},{"hanzi":"明年他會搬家到台北","pinyin":"míng nián tā huì bān jiā dào tái běi","translation_ja":"来年彼は台北に引っ越します"},{"hanzi":"你明年還會住在這裡嗎？","pinyin":"nǐ míng nián hái huì zhù zài zhè lǐ ma","translation_ja":"来年もここに住む予定ですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',6,'牌子','pái zi','ブランド','[{"hanzi":"這個牌子的鞋子很有名","pinyin":"zhè gè pái zi de xié zi hěn yǒu míng","translation_ja":"このブランドの靴はとても有名です"},{"hanzi":"我喜歡這個牌子的衣服","pinyin":"wǒ xǐ huān zhè gè pái zi de yī fu","translation_ja":"私はこのブランドの服が好きです"},{"hanzi":"你知道這個牌子是哪裡的嗎？","pinyin":"nǐ zhī dào zhè gè pái zi shì nǎ lǐ de ma","translation_ja":"このブランドがどこのものか知っていますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',7,'因為','yīn wèi','なぜなら','[{"hanzi":"我喜歡這件衣服，因為它的顏色很好看","pinyin":"wǒ xǐ huān zhè jiàn yī fu yīn wèi tā de yán sè hěn hǎo kàn","translation_ja":"この服が好きなのは色がきれいだからです"},{"hanzi":"他今天沒來，因為他生病了","pinyin":"tā jīn tiān méi lái yīn wèi tā shēng bìng le","translation_ja":"彼は今日来なかったのは病気だからです"},{"hanzi":"因為下雨，所以我們取消了活動","pinyin":"yīn wèi xià yǔ suǒ yǐ wǒ men qǔ xiāo le huó dòng","translation_ja":"雨が降ったので活動を中止しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',8,'有名','yǒu míng','有名な','[{"hanzi":"這家餐廳很有名","pinyin":"zhè jiā cān tīng hěn yǒu míng","translation_ja":"このレストランはとても有名です"},{"hanzi":"他是一個很有名的歌手","pinyin":"tā shì yí gè hěn yǒu míng de gē shǒu","translation_ja":"彼はとても有名な歌手です"},{"hanzi":"這部電影在日本也很有名","pinyin":"zhè bù diàn yǐng zài rì běn yě hěn yǒu míng","translation_ja":"この映画は日本でもとても有名です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',9,'褲子','kù zi','ズボン','[{"hanzi":"我需要買一條新褲子","pinyin":"wǒ xū yào mǎi yì tiáo xīn kù zi","translation_ja":"私は新しいズボンを買う必要があります"},{"hanzi":"他喜歡穿寬鬆的褲子","pinyin":"tā xǐ huān chuān kuān sōng de kù zi","translation_ja":"彼はゆったりしたズボンを履くのが好きです"},{"hanzi":"這條褲子太長了","pinyin":"zhè tiáo kù zi tài cháng le","translation_ja":"このズボンは長すぎます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',10,'所以','suǒ yǐ','だから','[{"hanzi":"我很累，所以不想出去玩","pinyin":"wǒ hěn lèi suǒ yǐ bù xiǎng chū qù wán","translation_ja":"とても疲れているので遊びに行きたくないです"},{"hanzi":"他學得很努力，所以考試成績很好","pinyin":"tā xué de hěn nǔ lì suǒ yǐ kǎo shì chéng jì hěn hǎo","translation_ja":"彼は一生懸命勉強したので試験の成績が良いです"},{"hanzi":"天氣很好，所以我們去了海邊","pinyin":"tiān qì hěn hǎo suǒ yǐ wǒ men qù le hǎi biān","translation_ja":"天気が良かったので海辺に行きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',11,'為什麼','wèi shén me','なぜ','[{"hanzi":"為什麼你今天沒來？","pinyin":"wèi shén me nǐ jīn tiān méi lái","translation_ja":"なぜ今日は来なかったのですか"},{"hanzi":"他為什麼那麼高興？","pinyin":"tā wèi shén me nà me gāo xìng","translation_ja":"彼はなぜあんなに嬉しそうなのですか"},{"hanzi":"為什麼這裡沒有人？","pinyin":"wèi shén me zhè lǐ méi yǒu rén","translation_ja":"なぜここには誰もいないのですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',12,'百貨公司','bǎi huò gōng sī','デパート','[{"hanzi":"這家百貨公司有很多好看的衣服","pinyin":"zhè jiā bǎi huò gōng sī yǒu hěn duō hǎo kàn de yī fu","translation_ja":"このデパートにはたくさんのきれいな服があります"},{"hanzi":"我們星期六去百貨公司逛街吧","pinyin":"wǒ men xīng qī liù qù bǎi huò gōng sī guàng jiē ba","translation_ja":"土曜日にデパートに買い物に行きましょう"},{"hanzi":"百貨公司的東西有點貴","pinyin":"bǎi huò gōng sī de dōng xi yǒu diǎn guì","translation_ja":"デパートのものは少し高いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',13,'難','nán','難しい','[{"hanzi":"這道題目很難","pinyin":"zhè dào tí mù hěn nán","translation_ja":"この問題はとても難しいです"},{"hanzi":"學中文一點都不難","pinyin":"xué zhōng wén yì diǎn dōu bù nán","translation_ja":"中国語を学ぶのは全然難しくありません"},{"hanzi":"這本書的內容很難懂","pinyin":"zhè běn shū de nèi róng hěn nán dǒng","translation_ja":"この本の内容は理解しにくいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',14,'容易','róng yì','簡単な','[{"hanzi":"這道題目很容易","pinyin":"zhè dào tí mù hěn róng yì","translation_ja":"この問題はとても簡単です"},{"hanzi":"做飯對我來說很容易","pinyin":"zuò fàn duì wǒ lái shuō hěn róng yì","translation_ja":"料理をするのは私にとってとても簡単です"},{"hanzi":"這件事很容易解決","pinyin":"zhè jiàn shì hěn róng yì jiě jué","translation_ja":"このことは簡単に解決できます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',15,'最近','zuì jìn','最近','[{"hanzi":"最近天氣變冷了","pinyin":"zuì jìn tiān qì biàn lěng le","translation_ja":"最近、天気が寒くなってきました"},{"hanzi":"我最近很忙，沒時間出去玩","pinyin":"wǒ zuì jìn hěn máng méi shí jiān chū qù wán","translation_ja":"最近とても忙しくて遊びに行く時間がありません"},{"hanzi":"最近你看了什麼電影嗎？","pinyin":"zuì jìn nǐ kàn le shén me diàn yǐng ma","translation_ja":"最近何か映画を観ましたか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',16,'胖','pàng','太っている','[{"hanzi":"他最近吃得很多，有點胖了","pinyin":"tā zuì jìn chī de hěn duō yǒu diǎn pàng le","translation_ja":"彼は最近たくさん食べて少し太りました"},{"hanzi":"我不想變胖，所以不吃甜的東西","pinyin":"wǒ bù xiǎng biàn pàng suǒ yǐ bù chī tián de dōng xi","translation_ja":"太りたくないので甘いものは食べません"},{"hanzi":"這隻貓很胖，很可愛","pinyin":"zhè zhī māo hěn pàng hěn kě ài","translation_ja":"この猫は太っていてとてもかわいいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',17,'瘦','shòu','痩せている','[{"hanzi":"她很瘦，穿什麼都好看","pinyin":"tā hěn shòu chuān shén me dōu hǎo kàn","translation_ja":"彼女は痩せていて何を着ても似合います"},{"hanzi":"你瘦了，是不是最近少吃了？","pinyin":"nǐ shòu le shì bù shì zuì jìn shǎo chī le","translation_ja":"痩せましたね、最近あまり食べていないのですか？"},{"hanzi":"我覺得這條褲子太瘦了，不舒服","pinyin":"wǒ jué de zhè tiáo kù zi tài shòu le bù shū fú","translation_ja":"このズボンは細すぎて居心地が悪いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',18,'高','gāo','高い','[{"hanzi":"他比我高很多","pinyin":"tā bǐ wǒ gāo hěn duō","translation_ja":"彼は私よりずっと背が高いです"},{"hanzi":"這棟樓很高，可以看到整個城市","pinyin":"zhè dòng lóu hěn gāo kě yǐ kàn dào zhěng gè chéng shì","translation_ja":"このビルはとても高くて、街全体が見渡せます"},{"hanzi":"高的山很適合爬山","pinyin":"gāo de shān hěn shì hé pá shān","translation_ja":"高い山は登山にぴったりです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',19,'矮','ǎi','低い','[{"hanzi":"他覺得自己太矮了","pinyin":"tā jué de zì jǐ tài ǎi le","translation_ja":"彼は自分が低すぎると思っています"},{"hanzi":"這張桌子很矮，小孩子用剛好","pinyin":"zhè zhāng zhuō zi hěn ǎi xiǎo hái zi yòng gāng hǎo","translation_ja":"この机はとても低くて、子どもにちょうど良いです"},{"hanzi":"我家旁邊有一棟很矮的房子","pinyin":"wǒ jiā páng biān yǒu yí dòng hěn ǎi de fáng zi","translation_ja":"私の家の隣にとても低い家があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',20,'公斤','gōng jīn','キログラム','[{"hanzi":"我買了一公斤的蘋果","pinyin":"wǒ mǎi le yì gōng jīn de píng guǒ","translation_ja":"私はリンゴを1キログラム買いました"},{"hanzi":"這隻狗有二十公斤重","pinyin":"zhè zhī gǒu yǒu èr shí gōng jīn zhòng","translation_ja":"この犬は20キログラムの重さです"},{"hanzi":"每天搬五十公斤的東西很累","pinyin":"měi tiān bān wǔ shí gōng jīn de dōng xi hěn lèi","translation_ja":"毎日50キログラムのものを運ぶのは疲れます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',21,'斤','jīn','斤（500g）','[{"hanzi":"我買了兩斤的草莓","pinyin":"wǒ mǎi le liǎng jīn de cǎo méi","translation_ja":"私はいちごを2斤（1キログラム）買いました"},{"hanzi":"那條魚有一斤重","pinyin":"nà tiáo yú yǒu yì jīn zhòng","translation_ja":"その魚は1斤（500グラム）の重さです"},{"hanzi":"這裡的水果一斤三十塊","pinyin":"zhè lǐ de shuǐ guǒ yì jīn sān shí kuài","translation_ja":"ここでは果物が1斤30元です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',22,'怕','pà','怖い','[{"hanzi":"我很怕黑，所以晚上不敢出門","pinyin":"wǒ hěn pà hēi suǒ yǐ wǎn shàng bù gǎn chū mén","translation_ja":"私は暗いのが怖いので、夜は外に出ません"},{"hanzi":"小孩子怕生，不喜歡跟陌生人說話","pinyin":"xiǎo hái zi pà shēng bù xǐ huān gēn mò shēng rén shuō huà","translation_ja":"子どもは人見知りで、知らない人と話したがりません"},{"hanzi":"他很怕高，所以不敢坐摩天輪","pinyin":"tā hěn pà gāo suǒ yǐ bù gǎn zuò mó tiān lún","translation_ja":"彼は高いところが怖いので観覧車に乗れません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',23,'跟','gēn','～と','[{"hanzi":"我跟朋友一起去吃飯","pinyin":"wǒ gēn péng yǒu yì qǐ qù chī fàn","translation_ja":"私は友達と一緒にご飯を食べに行きます"},{"hanzi":"你可以跟我說你的名字嗎？","pinyin":"nǐ kě yǐ gēn wǒ shuō nǐ de míng zì ma","translation_ja":"あなたの名前を私に教えてもらえますか？"},{"hanzi":"他不想跟我們去旅行","pinyin":"tā bù xiǎng gēn wǒ men qù lǚ xíng","translation_ja":"彼は私たちと旅行に行きたくないです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',24,'時間','shí jiān','時間','[{"hanzi":"我沒有時間去看電影","pinyin":"wǒ méi yǒu shí jiān qù kàn diàn yǐng","translation_ja":"映画を観に行く時間がありません"},{"hanzi":"這件事需要很多時間","pinyin":"zhè jiàn shì xū yào hěn duō shí jiān","translation_ja":"このことにはたくさんの時間が必要です"},{"hanzi":"你有時間幫我嗎？","pinyin":"nǐ yǒu shí jiān bāng wǒ ma","translation_ja":"私を手伝う時間がありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',25,'黃色','huáng sè','黄色','[{"hanzi":"她穿了一件黃色的裙子，很漂亮","pinyin":"tā chuān le yí jiàn huáng sè de qún zi hěn piào liàng","translation_ja":"彼女は黄色のスカートを履いていて、とてもきれいです"},{"hanzi":"我喜歡黃色的花","pinyin":"wǒ xǐ huān huáng sè de huā","translation_ja":"私は黄色の花が好きです"},{"hanzi":"黃色的香蕉很甜","pinyin":"huáng sè de xiāng jiāo hěn tián","translation_ja":"黄色いバナナはとても甘いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',26,'黃','huáng','黄','[{"hanzi":"這裡的樹葉變黃了","pinyin":"zhè lǐ de shù yè biàn huáng le","translation_ja":"ここでは葉が黄色くなりました"},{"hanzi":"黃的衣服很亮眼","pinyin":"huáng de yī fu hěn liàng yǎn","translation_ja":"黄色の服は目立ちます"},{"hanzi":"她喜歡用黃的筆寫字","pinyin":"tā xǐ huān yòng huáng de bǐ xiě zì","translation_ja":"彼女は黄色のペンを使って字を書くのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',27,'吧','ba','～しましょう','[{"hanzi":"我們明天一起去爬山吧","pinyin":"wǒ men míng tiān yì qǐ qù pá shān ba","translation_ja":"明日一緒に登山に行きましょう"},{"hanzi":"你累了吧？","pinyin":"nǐ lèi le ba","translation_ja":"疲れましたよね？"},{"hanzi":"快點吃飯吧，飯都涼了","pinyin":"kuài diǎn chī fàn ba fàn dōu liáng le","translation_ja":"早くご飯を食べましょう、ご飯が冷めました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',28,'流行','liú xíng','流行','[{"hanzi":"這雙鞋子今年很流行","pinyin":"zhè shuāng xié zi jīn nián hěn liú xíng","translation_ja":"この靴は今年とても流行しています"},{"hanzi":"她總是穿很流行的衣服","pinyin":"tā zǒng shì chuān hěn liú xíng de yī fu","translation_ja":"彼女はいつも流行の服を着ています"},{"hanzi":"最近流行短頭髮","pinyin":"zuì jìn liú xíng duǎn tóu fǎ","translation_ja":"最近短い髪型が流行っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',29,'短','duǎn','短い','[{"hanzi":"這條裙子太短了，我不想買","pinyin":"zhè tiáo qún zi tài duǎn le wǒ bù xiǎng mǎi","translation_ja":"このスカートは短すぎて買いたくありません"},{"hanzi":"我的頭髮很短，但很容易整理","pinyin":"wǒ de tóu fǎ hěn duǎn dàn hěn róng yì zhěng lǐ","translation_ja":"私の髪は短いですが、とても手入れが簡単です"},{"hanzi":"他只說了短短幾句話就離開了","pinyin":"tā zhǐ shuō le duǎn duǎn jǐ jù huà jiù lí kāi le","translation_ja":"彼は短い言葉を数句だけ言って立ち去りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',30,'長','cháng','長い','[{"hanzi":"這條褲子太長了，得去改一改","pinyin":"zhè tiáo kù zi tài cháng le děi qù gǎi yì gǎi","translation_ja":"このズボンは長すぎるので直す必要があります"},{"hanzi":"我們走了很長的路才到家","pinyin":"wǒ men zǒu le hěn cháng de lù cái dào jiā","translation_ja":"私たちは長い道のりを歩いてようやく家に着きました"},{"hanzi":"她的頭髮很長，大家都覺得很好看","pinyin":"tā de tóu fǎ hěn cháng dà jiā dōu jué de hěn hǎo kàn","translation_ja":"彼女の髪はとても長く、みんながきれいだと言っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',31,'鞋子','xié zi','靴','[{"hanzi":"這雙鞋子很舒服","pinyin":"zhè shuāng xié zi hěn shū fú","translation_ja":"この靴はとても履き心地が良いです"},{"hanzi":"你喜歡穿什麼樣的鞋子？","pinyin":"nǐ xǐ huān chuān shén me yàng de xié zi","translation_ja":"どんな靴を履くのが好きですか？"},{"hanzi":"這裡有很多漂亮的鞋子可以選","pinyin":"zhè lǐ yǒu hěn duō piào liàng de xié zi kě yǐ xuǎn","translation_ja":"ここには選べるきれいな靴がたくさんあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',32,'襪子','wà zi','靴下','[{"hanzi":"我買了一雙黃色的襪子","pinyin":"wǒ mǎi le yì shuāng huáng sè de wà zi","translation_ja":"私は黄色い靴下を1足買いました"},{"hanzi":"她今天穿了一雙黑色的襪子","pinyin":"tā jīn tiān chuān le yì shuāng hēi sè de wà zi","translation_ja":"彼女は今日黒い靴下を履いています"},{"hanzi":"冬天的時候襪子一定要保暖","pinyin":"dōng tiān de shí hòu wà zi yí dìng yào bǎo nuǎn","translation_ja":"冬の時は靴下で暖かさを保つことが大切です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',33,'雙','shuāng','ペア','[{"hanzi":"我買了一雙新鞋子","pinyin":"wǒ mǎi le yì shuāng xīn xié zi","translation_ja":"私は新しい靴を1足買いました"},{"hanzi":"這雙襪子很舒服，適合冬天穿","pinyin":"zhè shuāng wà zi hěn shū fú shì hé dōng tiān chuān","translation_ja":"この靴下はとても履き心地が良く、冬にぴったりです"},{"hanzi":"他送給我一雙漂亮的手套","pinyin":"tā sòng gěi wǒ yì shuāng piào liàng de shǒu tào","translation_ja":"彼は私にきれいな手袋を1組プレゼントしてくれました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',34,'黑色','hēi sè','黒色','[{"hanzi":"他喜歡穿黑色的衣服","pinyin":"tā xǐ huān chuān hēi sè de yī fu","translation_ja":"彼は黒色の服を着るのが好きです"},{"hanzi":"黑色的包包看起來很有質感","pinyin":"hēi sè de bāo bāo kàn qǐ lái hěn yǒu zhì gǎn","translation_ja":"黒色のバッグは質感が良さそうです"},{"hanzi":"黑色的鞋子很容易搭配","pinyin":"hēi sè de xié zi hěn róng yì dā pèi","translation_ja":"黒い靴はコーディネートしやすいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',35,'黑','hēi','黒い','[{"hanzi":"這隻狗的毛很黑","pinyin":"zhè zhī gǒu de máo hěn hēi","translation_ja":"この犬の毛はとても黒いです"},{"hanzi":"天空很黑，看不到星星","pinyin":"tiān kōng hěn hēi kàn bù dào xīng xīng","translation_ja":"空が真っ暗で星が見えません"},{"hanzi":"他喜歡喝黑咖啡","pinyin":"tā xǐ huān hē hēi kā fēi","translation_ja":"彼はブラックコーヒーを飲むのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',36,'樓','lóu','建物、階','[{"hanzi":"他住在三樓","pinyin":"tā zhù zài sān lóu","translation_ja":"彼は3階に住んでいます"},{"hanzi":"這棟樓很高，有二十層","pinyin":"zhè dòng lóu hěn gāo yǒu èr shí céng","translation_ja":"このビルはとても高く、20階建てです"},{"hanzi":"你家住在哪一樓？","pinyin":"nǐ jiā zhù zài nǎ yì lóu","translation_ja":"あなたの家は何階にありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',37,'樓下','lóu xià','階下','[{"hanzi":"我們在樓下等你","pinyin":"wǒ men zài lóu xià děng nǐ","translation_ja":"私たちは階下であなたを待っています"},{"hanzi":"樓下有一家咖啡店，很方便","pinyin":"lóu xià yǒu yì jiā kā fēi diàn hěn fāng biàn","translation_ja":"階下にカフェがあり、とても便利です"},{"hanzi":"他們把東西放在樓下了","pinyin":"tā men bǎ dōng xi fàng zài lóu xià le","translation_ja":"彼らは物を階下に置きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',38,'樓上','lóu shàng','階上','[{"hanzi":"樓上的鄰居很友善","pinyin":"lóu shàng de lín jū hěn yǒu shàn","translation_ja":"階上の隣人はとても親切です"},{"hanzi":"我想去樓上看看有什麼好吃的","pinyin":"wǒ xiǎng qù lóu shàng kàn kàn yǒu shén me hǎo chī de","translation_ja":"階上に何かおいしいものがあるか見てみたいです"},{"hanzi":"樓上的房間比較安靜","pinyin":"lóu shàng de fáng jiān bǐ jiào ān jìng","translation_ja":"階上の部屋は比較的静かです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',39,'快要','kuài yào','もうすぐ','[{"hanzi":"快要下雨了，記得帶傘","pinyin":"kuài yào xià yǔ le jì dé dài sǎn","translation_ja":"もうすぐ雨が降りそうなので、傘を持っていくのを忘れないでください"},{"hanzi":"我們的表演快要開始了","pinyin":"wǒ men de biǎo yǎn kuài yào kāi shǐ le","translation_ja":"私たちのパフォーマンスがもうすぐ始まります"},{"hanzi":"他快要到家了","pinyin":"tā kuài yào dào jiā le","translation_ja":"彼はもうすぐ家に着きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',40,'快','kuài','速い','[{"hanzi":"他跑得很快，我追不上","pinyin":"tā pǎo de hěn kuài wǒ zhuī bù shàng","translation_ja":"彼はとても速く走るので追いつけません"},{"hanzi":"時間過得真快！","pinyin":"shí jiān guò de zhēn kuài","translation_ja":"時間が本当に速く過ぎますね"},{"hanzi":"請你說得慢一點，我聽不懂這麼快的話","pinyin":"qǐng nǐ shuō de màn yì diǎn wǒ tīng bù dǒng zhè me kuài de huà","translation_ja":"もう少しゆっくり話してください、そんなに速いとわかりません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',41,'關','guān','閉める','[{"hanzi":"請把門關上","pinyin":"qǐng bǎ mén guān shàng","translation_ja":"ドアを閉めてください"},{"hanzi":"電視關掉了，家裡很安靜","pinyin":"diàn shì guān diào le jiā lǐ hěn ān jìng","translation_ja":"テレビを消したので家の中が静かです"},{"hanzi":"睡覺前要記得關燈","pinyin":"shuì jiào qián yào jì dé guān dēng","translation_ja":"寝る前に電気を消すのを忘れないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',42,'開','kāi','開ける','[{"hanzi":"請幫我把窗戶打開","pinyin":"qǐng bāng wǒ bǎ chuāng hù dǎ kāi","translation_ja":"窓を開けてください"},{"hanzi":"這家店早上九點開門","pinyin":"zhè jiā diàn zǎo shàng jiǔ diǎn kāi mén","translation_ja":"このお店は朝9時に開店します"},{"hanzi":"他忘了開燈，房間裡很暗","pinyin":"tā wàng le kāi dēng fáng jiān lǐ hěn àn","translation_ja":"彼は電気をつけるのを忘れて部屋が暗いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',43,'電梯','diàn tī','エレベーター','[{"hanzi":"電梯壞了，我們只能走樓梯","pinyin":"diàn tī huài le wǒ men zhǐ néng zǒu lóu tī","translation_ja":"エレベーターが故障したので階段を使うしかありません"},{"hanzi":"請問電梯在哪裡？","pinyin":"qǐng wèn diàn tī zài nǎ lǐ","translation_ja":"エレベーターはどこですか？"},{"hanzi":"他們搭電梯上樓去了","pinyin":"tā men dā diàn tī shàng lóu qù le","translation_ja":"彼らはエレベーターで上の階に行きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',44,'樓梯','lóu tī','階段','[{"hanzi":"這棟樓有很多樓梯，很方便","pinyin":"zhè dòng lóu yǒu hěn duō lóu tī hěn fāng biàn","translation_ja":"このビルにはたくさんの階段があって便利です"},{"hanzi":"他喜歡走樓梯，不喜歡搭電梯","pinyin":"tā xǐ huān zǒu lóu tī bù xǐ huān dā diàn tī","translation_ja":"彼は階段を歩くのが好きでエレベーターは嫌いです"},{"hanzi":"樓梯上有一個箱子，小心別踢到","pinyin":"lóu tī shàng yǒu yí gè xiāng zi xiǎo xīn bié tī dào","translation_ja":"階段に箱がありますので蹴らないように気をつけてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',45,'沒關係','méi guān xì','大丈夫','[{"hanzi":"對不起，遲到了！","pinyin":"沒關係，下次早點來","translation_ja":"méi guān xì xià cì zǎo diǎn lái"},{"hanzi":"這件事情我可以處理，沒關係","pinyin":"zhè jiàn shì qíng wǒ kě yǐ chǔ lǐ méi guān xì","translation_ja":"この件は私が対応できます、大丈夫です"},{"hanzi":"他說不去也沒關係，我們自己去吧","pinyin":"tā shuō bù qù yě méi guān xì wǒ men zì jǐ qù ba","translation_ja":"彼が行かないと言っても大丈夫です、私たちだけで行きましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',46,'對不起','duì bù qǐ','ごめんなさい','[{"hanzi":"對不起，我打擾你了","pinyin":"duì bù qǐ wǒ dǎ rǎo nǐ le","translation_ja":"ごめんなさい、お邪魔しました"},{"hanzi":"他對不起他的朋友，因為他忘了約定","pinyin":"tā duì bù qǐ tā de péng yǒu yīn wèi tā wàng le yuē dìng","translation_ja":"彼は約束を忘れて友達に申し訳なく思っています"},{"hanzi":"對不起，我把你的書弄壞了","pinyin":"duì bù qǐ wǒ bǎ nǐ de shū nòng huài le","translation_ja":"ごめんなさい、あなたの本を壊してしまいました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',47,'對了','duì le','そういえば','[{"hanzi":"對了，你的書還給你了嗎？","pinyin":"duì le nǐ de shū huán gěi nǐ le ma","translation_ja":"そういえば、あなたの本を返しましたか？"},{"hanzi":"對了，我忘了跟你說明天的計劃","pinyin":"duì le wǒ wàng le gēn nǐ shuō míng tiān de jì huà","translation_ja":"そういえば、明日の予定を伝えるのを忘れていました"},{"hanzi":"對了，你還記得今天的約會嗎？","pinyin":"duì le nǐ hái jì dé jīn tiān de yuē huì ma","translation_ja":"そういえば、今日の約束を覚えていますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',48,'年輕','nián qīng','若い','[{"hanzi":"他們是一群很年輕的學生","pinyin":"tā men shì yì qún hěn nián qīng de xué shēng","translation_ja":"彼らはとても若い学生たちです"},{"hanzi":"年輕人常常喜歡追求新鮮的東西","pinyin":"nián qīng rén cháng cháng xǐ huān zhuī qiú xīn xiān de dōng xi","translation_ja":"若者は新しいものを追い求めるのが好きです"},{"hanzi":"她的笑容讓她看起來很年輕","pinyin":"tā de xiào róng ràng tā kàn qǐ lái hěn nián qīng","translation_ja":"彼女の笑顔は彼女をとても若く見せます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',49,'老','lǎo','年を取った','[{"hanzi":"他雖然老了，但身體還很健康","pinyin":"tā suī rán lǎo le dàn shēn tǐ hái hěn jiàn kāng","translation_ja":"彼は年を取っていますが、体はまだとても元気です"},{"hanzi":"這座城市的老房子很有特色","pinyin":"zhè zuò chéng shì de lǎo fáng zi hěn yǒu tè sè","translation_ja":"この街の古い家々はとても特徴があります"},{"hanzi":"老師教我們很多有用的知識","pinyin":"lǎo shī jiāo wǒ men hěn duō yǒu yòng de zhī shì","translation_ja":"先生は私たちにたくさんの有用な知識を教えてくれます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',50,'皮包','pí bāo','ハンドバッグ','[{"hanzi":"這個皮包是我生日收到的禮物","pinyin":"zhè gè pí bāo shì wǒ shēng rì shōu dào de lǐ wù","translation_ja":"このハンドバッグは私が誕生日にもらったプレゼントです"},{"hanzi":"她的新皮包很漂亮","pinyin":"tā de xīn pí bāo hěn piào liàng","translation_ja":"彼女の新しいハンドバッグはとてもきれいです"},{"hanzi":"我把錢包放在皮包裡了","pinyin":"wǒ bǎ qián bāo fàng zài pí bāo lǐ le","translation_ja":"財布をハンドバッグの中に入れました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',51,'女生','nǚ shēng','女子学生','[{"hanzi":"這班有十個女生和十五個男生","pinyin":"zhè bān yǒu shí gè nǚ shēng hé shí wǔ gè nán shēng","translation_ja":"このクラスには女子が10人、男子が15人います"},{"hanzi":"女生們喜歡一起聊天和分享故事","pinyin":"nǚ shēng men xǐ huān yì qǐ liáo tiān hé fēn xiǎng gù shì","translation_ja":"女子たちは一緒におしゃべりしたり話を共有するのが好きです"},{"hanzi":"這位女生是我們班的班長","pinyin":"zhè wèi nǚ shēng shì wǒ men bān de bān zhǎng","translation_ja":"この女子は私たちのクラスの班長です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',52,'男生','nán shēng','男子学生','[{"hanzi":"男生們喜歡一起踢足球","pinyin":"nán shēng men xǐ huān yì qǐ tī zú qiú","translation_ja":"男子たちは一緒にサッカーをするのが好きです"},{"hanzi":"這個男生很會畫畫","pinyin":"zhè gè nán shēng hěn huì huà huà","translation_ja":"この男子は絵を描くのがとても上手です"},{"hanzi":"男生們常常在一起討論功課","pinyin":"nán shēng men cháng cháng zài yì qǐ tǎo lùn gōng kè","translation_ja":"男子たちはよく一緒に宿題の話をしています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',53,'雜誌','zá zhì','雑誌','[{"hanzi":"我喜歡看旅行雜誌，學到很多東西","pinyin":"wǒ xǐ huān kàn lǚ xíng zá zhì xué dào hěn duō dōng xi","translation_ja":"私は旅行雑誌を読むのが好きで、多くのことを学べます"},{"hanzi":"這本雜誌是新出的，很受歡迎","pinyin":"zhè běn zá zhì shì xīn chū de hěn shòu huān yíng","translation_ja":"この雑誌は新しく出たもので、とても人気があります"},{"hanzi":"他每天都會看一些時尚雜誌","pinyin":"tā měi tiān dōu huì kàn yì xiē shí shàng zá zhì","translation_ja":"彼は毎日いくつかのファッション雑誌を読みます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson08',54,'舊','jiù','古い','[{"hanzi":"這是我家的一張舊照片","pinyin":"zhè shì wǒ jiā de yì zhāng jiù zhào piàn","translation_ja":"これは私の家の古い写真です"},{"hanzi":"這台舊車還能開嗎？","pinyin":"zhè tái jiù chē hái néng kāi ma","translation_ja":"この古い車はまだ運転できますか？"},{"hanzi":"舊的衣服可以送給需要的人","pinyin":"jiù de yī fu kě yǐ sòng gěi xū yào de rén","translation_ja":"古い服は必要な人にあげることができます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',1,'句子','jù zǐ','文','[{"hanzi":"這個句子很簡單","pinyin":"zhè gè jù zǐ hěn jiǎn dān","translation_ja":"この文はとても簡単です"},{"hanzi":"請你造一個句子","pinyin":"qǐng nǐ zào yī gè jù zǐ","translation_ja":"一つ文を作ってください"},{"hanzi":"這個句子的意思我不懂","pinyin":"zhè gè jù zǐ de yì si wǒ bù dǒng","translation_ja":"この文の意味が分かりません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',2,'意思','yì si','意味、気持ち','[{"hanzi":"這個詞的意思是什麼？","pinyin":"zhè gè cí de yì si shì shén me","translation_ja":"この単語の意味は何ですか？"},{"hanzi":"你的意思是要我幫忙嗎？","pinyin":"nǐ de yì si shì yào wǒ bāng máng ma","translation_ja":"あなたの言いたいことは手伝ってほしいということですか？"},{"hanzi":"我不明白他的意思","pinyin":"wǒ bù míng bái tā de yì si","translation_ja":"私は彼の言いたいことが分かりません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',3,'懂','dǒng','分かる','[{"hanzi":"他說的話，我聽不懂","pinyin":"tā shuō de huà, wǒ tīng bù dǒng","translation_ja":"彼が言ったことが分かりません"},{"hanzi":"我不懂這本書的意思","pinyin":"wǒ bù dǒng zhè běn shū de yì si","translation_ja":"私はこの本の意味が分かりません"},{"hanzi":"你能懂這道題目嗎？","pinyin":"nǐ néng dǒng zhè dào tí mù ma","translation_ja":"あなたはこの問題が分かりますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',4,'教','jiāo','教える','[{"hanzi":"老師教我們中文","pinyin":"lǎo shī jiāo wǒ men zhōng wén","translation_ja":"先生は私たちに中国語を教えます"},{"hanzi":"你教我怎麼寫這個字吧！","pinyin":"nǐ jiāo wǒ zěn me xiě zhè gè zì ba","translation_ja":"この漢字の書き方を教えてください！"},{"hanzi":"他會教別人唱歌","pinyin":"tā huì jiāo bié rén chàng gē","translation_ja":"彼は他人に歌を教えることができます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',5,'真的','zhēn de','本当に','[{"hanzi":"這是真的嗎？","pinyin":"zhè shì zhēn de ma","translation_ja":"これは本当ですか？"},{"hanzi":"他真的很聰明","pinyin":"tā zhēn de hěn cōng míng","translation_ja":"彼は本当に頭がいいです"},{"hanzi":"你的中文真的進步了！","pinyin":"nǐ de zhōng wén zhēn de jìn bù le","translation_ja":"あなたの中国語は本当に上達しました！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',6,'問','wèn','質問する','[{"hanzi":"老師，我可以問一個問題嗎？","pinyin":"lǎo shī, wǒ kě yǐ wèn yī gè wèn tí ma","translation_ja":"先生、一つ質問してもいいですか？"},{"hanzi":"有什麼不懂的地方，請隨時問我","pinyin":"yǒu shén me bù dǒng de dì fang, qǐng suí shí wèn wǒ","translation_ja":"分からないところがあれば、いつでも質問してください"},{"hanzi":"我問他今天有什麼課","pinyin":"wǒ wèn tā jīn tiān yǒu shén me kè","translation_ja":"私は彼に今日の授業内容を聞きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',7,'非常','fēi cháng','非常に','[{"hanzi":"他非常喜歡吃台灣的小吃","pinyin":"tā fēi cháng xǐ huān chī tái wān de xiǎo chī","translation_ja":"彼は台湾の軽食が大好きです"},{"hanzi":"今天非常熱","pinyin":"jīn tiān fēi cháng rè","translation_ja":"今日はとても暑いです"},{"hanzi":"我對這個地方非常感興趣","pinyin":"wǒ duì zhè gè dì fang fēi cháng gǎn xìng qù","translation_ja":"私はこの場所に非常に興味があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',8,'聰明','cōng míng','頭がいい','[{"hanzi":"你的妹妹很聰明","pinyin":"nǐ de mèi mèi hěn cōng míng","translation_ja":"あなたの妹はとても頭がいいです"},{"hanzi":"他不僅聰明，還很努力","pinyin":"tā bù jǐn cōng míng, hái hěn nǔ lì","translation_ja":"彼は頭がいいだけでなく、努力家でもあります"},{"hanzi":"小明很聰明，總是考第一名","pinyin":"xiǎo míng hěn cōng míng, zǒng shì kǎo dì yī míng","translation_ja":"小明は非常に賢く、いつもテストで一番です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',9,'那(麼)','nà (me)','それなら','[{"hanzi":"如果你不想去，那麼我們就改天吧","pinyin":"rú guǒ nǐ bù xiǎng qù, nà me wǒ men jiù gǎi tiān ba","translation_ja":"行きたくないなら、また別の日にしましょう"},{"hanzi":"你不懂中文，那麼用英文問吧","pinyin":"nǐ bù dǒng zhōng wén, nà me yòng yīng wén wèn ba","translation_ja":"中国語が分からないなら、英語で質問してください"},{"hanzi":"天氣這麼好，那我們出去走走吧！","pinyin":"tiān qì zhè me hǎo, nà wǒ men chū qù zǒu zǒu ba","translation_ja":"天気がいいので、外に出て散歩しましょう！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',10,'在','zài','～にいる','[{"hanzi":"我在圖書館讀書","pinyin":"wǒ zài tú shū guǎn dú shū","translation_ja":"私は図書館で本を読んでいます"},{"hanzi":"他現在不在家","pinyin":"tā xiàn zài bù zài jiā","translation_ja":"彼は今、家にいません"},{"hanzi":"我們在公園見面吧","pinyin":"wǒ men zài gōng yuán jiàn miàn ba","translation_ja":"公園で会いましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',11,'書法','shū fǎ','書道','[{"hanzi":"我的書法老師很有名","pinyin":"wǒ de shū fǎ lǎo shī hěn yǒu míng","translation_ja":"私の書道の先生はとても有名です"},{"hanzi":"我最近開始學書法","pinyin":"wǒ zuì jìn kāi shǐ xué shū fǎ","translation_ja":"最近、書道を始めました"},{"hanzi":"他用毛筆寫的書法非常漂亮","pinyin":"tā yòng máo bǐ xiě de shū fǎ fēi cháng piào liàng","translation_ja":"彼が毛筆で書いた書道は非常に美しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',12,'毛筆','máo bǐ','毛筆','[{"hanzi":"我們需要一支毛筆來寫字","pinyin":"wǒ men xū yào yī zhī máo bǐ lái xiě zì","translation_ja":"私たちは字を書くために毛筆が必要です"},{"hanzi":"這支毛筆很好用","pinyin":"zhè zhī máo bǐ hěn hǎo yòng","translation_ja":"この毛筆はとても使いやすいです"},{"hanzi":"他用毛筆畫了一幅畫","pinyin":"tā yòng máo bǐ huà le yī fú huà","translation_ja":"彼は毛筆で絵を描きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',13,'宿舍','sù shè','寮','[{"hanzi":"我的宿舍離學校很近","pinyin":"wǒ de sù shè lí xué xiào hěn jìn","translation_ja":"私の寮は学校からとても近いです"},{"hanzi":"宿舍裡有廚房嗎？","pinyin":"sù shè lǐ yǒu chú fáng ma","translation_ja":"寮にキッチンがありますか？"},{"hanzi":"他們的宿舍很大，也很乾淨","pinyin":"tā men de sù shè hěn dà, yě hěn gān jìng","translation_ja":"彼らの寮は広くて、きれいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',14,'功課','gōng kè','宿題','[{"hanzi":"老師給我們很多功課","pinyin":"lǎo shī gěi wǒ men hěn duō gōng kè","translation_ja":"先生は私たちにたくさん宿題を出します"},{"hanzi":"你完成今天的功課了嗎？","pinyin":"nǐ wán chéng jīn tiān de gōng kè le ma","translation_ja":"今日の宿題を終えましたか？"},{"hanzi":"功課做完後，我們去打籃球吧！","pinyin":"gōng kè zuò wán hòu, wǒ men qù dǎ lán qiú ba","translation_ja":"宿題が終わったら、バスケをしに行きましょう！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',15,'作業','zuò yè','作業','[{"hanzi":"作業太多了，我做不完","pinyin":"zuò yè tài duō le, wǒ zuò bù wán","translation_ja":"作業が多すぎて終わりません"},{"hanzi":"你能幫我看看這份作業嗎？","pinyin":"nǐ néng bāng wǒ kàn kàn zhè fèn zuò yè ma","translation_ja":"この作業を見てくれませんか？"},{"hanzi":"今天晚上我得趕作業","pinyin":"jīn tiān wǎn shàng wǒ děi gǎn zuò yè","translation_ja":"今晩、私は作業を急がなければなりません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',16,'再','zài','再び','[{"hanzi":"他說他明天再來","pinyin":"tā shuō tā míng tiān zài lái","translation_ja":"彼は明日また来ると言いました"},{"hanzi":"這個問題太難了，我得再想想","pinyin":"zhè gè wèn tí tài nán le, wǒ děi zài xiǎng xiǎng","translation_ja":"この問題は難しすぎるので、もう一度考える必要があります"},{"hanzi":"再見！我們下次見！","pinyin":"zài jiàn wǒ men xià cì jiàn","translation_ja":"さようなら！また次回会いましょう！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',17,'對面','duì miàn','向かい側','[{"hanzi":"我家在學校對面","pinyin":"wǒ jiā zài xué xiào duì miàn","translation_ja":"私の家は学校の向かい側にあります"},{"hanzi":"超市就在郵局的對面","pinyin":"chāo shì jiù zài yóu jú de duì miàn","translation_ja":"スーパーマーケットは郵便局の向かいにあります"},{"hanzi":"他站在馬路的對面等我","pinyin":"tā zhàn zài mǎ lù de duì miàn děng wǒ","translation_ja":"彼は道路の向かいで私を待っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',18,'中間','zhōng jiān','真ん中','[{"hanzi":"他坐在教室的中間","pinyin":"tā zuò zài jiào shì de zhōng jiān","translation_ja":"彼は教室の真ん中に座っています"},{"hanzi":"桌子中間放著一本書","pinyin":"zhuō zi zhōng jiān fàng zhe yī běn shū","translation_ja":"机の真ん中に本が置いてあります"},{"hanzi":"我們中間隔著一個座位","pinyin":"wǒ men zhōng jiān gé zhe yī gè zuò wèi","translation_ja":"私たちの間には1つ席があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',19,'教室','jiào shì','教室','[{"hanzi":"這間教室可以容納50個人","pinyin":"zhè jiān jiào shì kě yǐ róng nà wǔ shí gè rén","translation_ja":"この教室は50人収容できます"},{"hanzi":"老師已經進教室了","pinyin":"lǎo shī yǐ jīng jìn jiào shì le","translation_ja":"先生はもう教室に入りました"},{"hanzi":"教室裡有很多桌椅","pinyin":"jiào shì lǐ yǒu hěn duō zhuō yǐ","translation_ja":"教室にはたくさんの机と椅子があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',20,'能','néng','～できる','[{"hanzi":"你能幫我開這個瓶子嗎？","pinyin":"nǐ néng bāng wǒ kāi zhè gè píng zi ma","translation_ja":"この瓶を開けてくれますか？"},{"hanzi":"他明天能來參加會議嗎？","pinyin":"tā míng tiān néng lái cān jiā huì yì ma","translation_ja":"彼は明日会議に参加できますか？"},{"hanzi":"我們能用中文交流","pinyin":"wǒ men néng yòng zhōng wén jiāo liú","translation_ja":"私たちは中国語でコミュニケーションできます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',21,'用','yòng','使う','[{"hanzi":"你會用筷子嗎？","pinyin":"nǐ huì yòng kuài zi ma","translation_ja":"あなたは箸を使えますか？"},{"hanzi":"他用手機拍了很多照片","pinyin":"tā yòng shǒu jī pāi le hěn duō zhào piàn","translation_ja":"彼は携帯電話でたくさんの写真を撮りました"},{"hanzi":"我用這支筆寫作業","pinyin":"wǒ yòng zhè zhī bǐ xiě zuò yè","translation_ja":"私はこのペンで宿題を書きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',22,'班','bān','クラス','[{"hanzi":"我們班有20個學生","pinyin":"wǒ men bān yǒu èr shí gè xué shēng","translation_ja":"私たちのクラスには20人の学生がいます"},{"hanzi":"你們班誰最聰明？","pinyin":"nǐ men bān shéi zuì cōng míng","translation_ja":"あなたたちのクラスで一番頭がいいのは誰ですか？"},{"hanzi":"明天我們班要去郊遊","pinyin":"míng tiān wǒ men bān yào qù jiāo yóu","translation_ja":"明日、私たちのクラスは遠足に行きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',23,'禮拜','lǐ bài','週','[{"hanzi":"這個禮拜我要去台北","pinyin":"zhè gè lǐ bài wǒ yào qù tái běi","translation_ja":"今週、私は台北に行きます"},{"hanzi":"下個禮拜我們有期中考","pinyin":"xià gè lǐ bài wǒ men yǒu qī zhōng kǎo","translation_ja":"来週、私たちは中間試験があります"},{"hanzi":"每個禮拜六我都去運動","pinyin":"měi gè lǐ bài liù wǒ dōu qù yùn dòng","translation_ja":"毎週土曜日に運動しています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',24,'語言','yǔ yán','言語','[{"hanzi":"中文是世界上最古老的語言之一","pinyin":"zhōng wén shì shì jiè shàng zuì gǔ lǎo de yǔ yán","translation_ja":"中国語は世界で最も古い言語の一つです"},{"hanzi":"我想學幾種不同的語言","pinyin":"wǒ xiǎng xué jǐ zhǒng bù tóng de yǔ yán","translation_ja":"私はいくつかの異なる言語を学びたいです"},{"hanzi":"語言交換是一種很好的學習方法","pinyin":"yǔ yán jiāo huàn shì yī zhǒng hěn hǎo de xué xí fāng fǎ","translation_ja":"言語交換はとても良い学習方法です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',25,'別的','bié de','他の','[{"hanzi":"你有別的書嗎？","pinyin":"nǐ yǒu bié de shū ma","translation_ja":"他の本を持っていますか？"},{"hanzi":"我想吃別的東西","pinyin":"wǒ xiǎng chī bié de dōng xi","translation_ja":"私は他のものを食べたいです"},{"hanzi":"我們可以試試別的方法","pinyin":"wǒ men kě yǐ shì shì bié de fāng fǎ","translation_ja":"別の方法を試してみましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',26,'別人','bié rén','他人','[{"hanzi":"別人的意見很重要","pinyin":"bié rén de yì jiàn hěn zhòng yào","translation_ja":"他人の意見はとても重要です"},{"hanzi":"我不喜歡打擾別人","pinyin":"wǒ bù xǐ huān dǎ rǎo bié rén","translation_ja":"私は他人を邪魔するのが嫌いです"},{"hanzi":"別人都回家了，你怎麼還在這裡？","pinyin":"bié rén dōu huí jiā le, nǐ zěn me hái zài zhè lǐ","translation_ja":"他のみんなは帰宅したのに、あなたはどうしてまだここにいるの？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',27,'比較','bǐ jiào','比較的','[{"hanzi":"今天的天氣比較冷","pinyin":"jīn tiān de tiān qì bǐ jiào lěng","translation_ja":"今日の天気は比較的寒いです"},{"hanzi":"我覺得這家餐廳的菜比較好吃","pinyin":"wǒ jué de zhè jiā cān tīng de cài bǐ jiào hǎo chī","translation_ja":"このレストランの料理の方が美味しいと思います"},{"hanzi":"中文比較難學嗎？","pinyin":"zhōng wén bǐ jiào nán xué ma","translation_ja":"中国語は比較的難しいですか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',28,'也許','yě xǔ','もしかしたら','[{"hanzi":"他也許今天不會來","pinyin":"tā yě xǔ jīn tiān bù huì lái","translation_ja":"彼はもしかしたら今日は来ないかもしれません"},{"hanzi":"也許明天會下雨","pinyin":"yě xǔ míng tiān huì xià yǔ","translation_ja":"明日は雨が降るかもしれません"},{"hanzi":"你也許應該休息一下","pinyin":"nǐ yě xǔ yīng gāi xiū xī yī xià","translation_ja":"あなたは少し休むべきかもしれません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',29,'希望','xī wàng','希望する','[{"hanzi":"我希望能去台灣留學","pinyin":"wǒ xī wàng néng qù tái wān liú xué","translation_ja":"私は台湾に留学できることを希望しています"},{"hanzi":"希望你早日康復","pinyin":"xī wàng nǐ zǎo rì kāng fù","translation_ja":"あなたが早く回復することを願っています"},{"hanzi":"他希望以後能當老師","pinyin":"tā xī wàng yǐ hòu néng dāng lǎo shī","translation_ja":"彼は将来先生になりたいと望んでいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',30,'期中考','qí zhōng kǎo','中間試験','[{"hanzi":"我們這個禮拜有期中考","pinyin":"wǒ men zhè gè lǐ bài yǒu qí zhōng kǎo","translation_ja":"私たちは今週中間試験があります"},{"hanzi":"他為了期中考每天讀書到很晚","pinyin":"tā wèi le qí zhōng kǎo měi tiān dú shū dào hěn wǎn","translation_ja":"彼は中間試験のために毎日遅くまで勉強しています"},{"hanzi":"期中考結束後，我們一起去玩吧！","pinyin":"qí zhōng kǎo jié shù hòu, wǒ men yī qǐ qù wán ba","translation_ja":"中間試験が終わったら、一緒に遊びに行きましょう！"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',31,'語言交換','yǔ yán jiāo huàn','言語交換','[{"hanzi":"我有一個語言交換的夥伴","pinyin":"wǒ yǒu yī gè yǔ yán jiāo huàn de huǒ bàn","translation_ja":"私には言語交換のパートナーがいます"},{"hanzi":"語言交換對學習外語很有幫助","pinyin":"yǔ yán jiāo huàn duì xué xí wài yǔ hěn yǒu bāng zhù","translation_ja":"言語交換は外国語の学習にとても役立ちます"},{"hanzi":"我每個禮拜和語言交換夥伴見一次面","pinyin":"wǒ měi gè lǐ bài hé yǔ yán jiāo huàn huǒ bàn jiàn yī cì miàn","translation_ja":"私は毎週、言語交換のパートナーと会っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',32,'學期','xué qí','学期','[{"hanzi":"這學期的課程很有趣","pinyin":"zhè xué qí de kè chéng hěn yǒu qù","translation_ja":"この学期の授業はとても面白いです"},{"hanzi":"學期快結束了，你的功課做完了嗎？","pinyin":"xué qí kuài jié shù le, nǐ de gōng kè zuò wán le ma","translation_ja":"学期がもうすぐ終わりますが、宿題は終わりましたか？"},{"hanzi":"下學期我們要學新科目","pinyin":"xià xué qí wǒ men yào xué xīn kē mù","translation_ja":"次の学期には新しい科目を学びます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',33,'開始','kāi shǐ','始まる','[{"hanzi":"中文課已經開始了","pinyin":"zhōng wén kè yǐ jīng kāi shǐ le","translation_ja":"中国語の授業はすでに始まりました"},{"hanzi":"我們什麼時候開始練習？","pinyin":"wǒ men shén me shí hòu kāi shǐ liàn xí","translation_ja":"私たちはいつ練習を始めますか？"},{"hanzi":"比賽開始前，請大家安靜","pinyin":"bǐ sài kāi shǐ qián, qǐng dà jiā ān jìng","translation_ja":"試合開始前に、皆さん静かにしてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',34,'華語','huá yǔ','中国語','[{"hanzi":"我正在學華語","pinyin":"wǒ zhèng zài xué huá yǔ","translation_ja":"私は中国語を学んでいます"},{"hanzi":"華語很有趣，但有點難","pinyin":"huá yǔ hěn yǒu qù, dàn yǒu diǎn nán","translation_ja":"中国語はとても面白いですが、少し難しいです"},{"hanzi":"這本書是用華語寫的","pinyin":"zhè běn shū shì yòng huá yǔ xiě de","translation_ja":"この本は中国語で書かれています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',35,'寫','xiě','書く','[{"hanzi":"你能教我怎麼寫這個字嗎？","pinyin":"nǐ néng jiāo wǒ zěn me xiě zhè gè zì ma","translation_ja":"この漢字の書き方を教えてもらえますか？"},{"hanzi":"我喜歡寫日記","pinyin":"wǒ xǐ huān xiě rì jì","translation_ja":"私は日記を書くのが好きです"},{"hanzi":"他的字寫得很好看","pinyin":"tā de zì xiě de hěn hǎo kàn","translation_ja":"彼の字はとてもきれいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',36,'練習','liàn xí','練習する','[{"hanzi":"我每天練習寫字","pinyin":"wǒ měi tiān liàn xí xiě zì","translation_ja":"私は毎日文字を書く練習をしています"},{"hanzi":"練習多了，你就會進步","pinyin":"liàn xí duō le, nǐ jiù huì jìn bù","translation_ja":"練習すれば、きっと上達しますよ"},{"hanzi":"我們一起練習發音吧","pinyin":"wǒ men yī qǐ liàn xí fā yīn ba","translation_ja":"一緒に発音を練習しましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',37,'日文','rì wén','日本語','[{"hanzi":"我正在學日文","pinyin":"wǒ zhèng zài xué rì wén","translation_ja":"私は日本語を勉強しています"},{"hanzi":"你會說日文嗎？","pinyin":"nǐ huì shuō rì wén ma","translation_ja":"あなたは日本語を話せますか？"},{"hanzi":"這本書是日文寫的","pinyin":"zhè běn shū shì rì wén xiě de","translation_ja":"この本は日本語で書かれています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',38,'讀書','dú shū','勉強する','[{"hanzi":"他每天晚上讀書到很晚","pinyin":"tā měi tiān wǎn shàng dú shū dào hěn wǎn","translation_ja":"彼は毎晩遅くまで勉強しています"},{"hanzi":"我喜歡在安靜的地方讀書","pinyin":"wǒ xǐ huān zài ān jìng de dì fang dú shū","translation_ja":"私は静かな場所で勉強するのが好きです"},{"hanzi":"考試前一天，我們都在圖書館讀書","pinyin":"kǎo shì qián yī tiān, wǒ men dōu zài tú shū guǎn dú shū","translation_ja":"試験の前日は、私たちは皆図書館で勉強します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',39,'讀','dú','読む','[{"hanzi":"他在讀一本小說","pinyin":"tā zài dú yī běn xiǎo shu","translation_ja":"彼は小説を読んでいます"},{"hanzi":"我們一起讀課文吧","pinyin":"wǒ men yī qǐ dú kè wén ba","translation_ja":"一緒にテキストを読みましょう"},{"hanzi":"這篇文章很有意思，你讀過嗎？","pinyin":"zhè piān wén zhāng hěn yǒu yì si, nǐ dú guò ma","translation_ja":"この文章はとても面白いですが、読んだことがありますか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',40,'進步','jìn bù','上達する','[{"hanzi":"他的中文進步很快","pinyin":"tā de zhōng wén jìn bù hěn kuài","translation_ja":"彼の中国語はとても早く上達しています"},{"hanzi":"如果每天練習，你一定會進步","pinyin":"rú guǒ měi tiān liàn xí, nǐ yī dìng huì jìn bù","translation_ja":"毎日練習すれば、必ず上達しますよ"},{"hanzi":"我的聽力還需要進步","pinyin":"wǒ de tīng lì hái xū yào jìn bù","translation_ja":"私のリスニングはまだ上達する必要があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',41,'下','xià','次の','[{"hanzi":"下個禮拜我們有考試","pinyin":"xià gè lǐ bài wǒ men yǒu kǎo shì","translation_ja":"来週、私たちは試験があります"},{"hanzi":"下班後我們一起去吃飯吧！","pinyin":"xià bān hòu wǒ men yī qǐ qù chī fàn ba","translation_ja":"仕事の後に一緒にご飯を食べに行きましょう！"},{"hanzi":"電梯到了，請大家下電梯","pinyin":"diàn tī dào le, qǐng dà jiā xià diàn tī","translation_ja":"エレベーターが着きました、皆さん降りてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',42,'上','shàng','上の','[{"hanzi":"他住在我家樓上","pinyin":"tā zhù zài wǒ jiā lóu shàng","translation_ja":"彼は私の家の上の階に住んでいます"},{"hanzi":"上個禮拜我們去了動物園","pinyin":"shàng gè lǐ bài wǒ men qù le dòng wù yuán","translation_ja":"先週、私たちは動物園に行きました"},{"hanzi":"請把書放在桌子上","pinyin":"qǐng bǎ shū fàng zài zhuō zi shàng","translation_ja":"本を机の上に置いてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',43,'緊張','jǐn zhāng','緊張する','[{"hanzi":"我每次考試都會很緊張","pinyin":"wǒ měi cì kǎo shì dōu huì hěn jǐn zhāng","translation_ja":"私は試験のたびに緊張します"},{"hanzi":"別緊張，一切都會好的","pinyin":"bié jǐn zhāng, yī qiè dōu huì hǎo de","translation_ja":"緊張しないで、全てうまくいきますよ"},{"hanzi":"他在比賽前很緊張，但表現很好","pinyin":"tā zài bǐ sài qián hěn jǐn zhāng, dàn biǎo xiàn hěn hǎo","translation_ja":"彼は試合前に緊張しましたが、良いパフォーマンスをしました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',44,'字','zì','文字','[{"hanzi":"這個字怎麼念？","pinyin":"zhè gè zì zěn me niàn","translation_ja":"この文字はどう読みますか？"},{"hanzi":"他的字寫得很漂亮","pinyin":"tā de zì xiě de hěn piào liàng","translation_ja":"彼の字はとても美しいです"},{"hanzi":"這個字的意思我不懂","pinyin":"zhè gè zì de yì si wǒ bù dǒng","translation_ja":"この文字の意味が分かりません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',45,'考試','kǎo shì','試験','[{"hanzi":"明天有中文考試，你準備好了嗎？","pinyin":"míng tiān yǒu zhōng wén kǎo shì, nǐ zhǔn bèi hǎo le ma","translation_ja":"明日中国語の試験がありますが、準備はできましたか？"},{"hanzi":"考試成績已經出來了","pinyin":"kǎo shì chéng jì yǐ jīng chū lái le","translation_ja":"試験の成績がもう出ました"},{"hanzi":"考試的時候不要緊張","pinyin":"kǎo shì de shí hòu bù yào jǐn zhāng","translation_ja":"試験のときに緊張しないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson09',46,'考','kǎo','受験する','[{"hanzi":"明天我們要考中文","pinyin":"míng tiān wǒ men yào kǎo zhōng wén","translation_ja":"明日、私たちは中国語の試験を受けます"},{"hanzi":"他考上了台灣大學","pinyin":"tā kǎo shàng le tái wān dà xué","translation_ja":"彼は台湾大学に合格しました"},{"hanzi":"這次的考試很簡單","pinyin":"zhè cì de kǎo shì hěn jiǎn dān","translation_ja":"今回の試験はとても簡単でした"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',1,'感冒','gǎn mào','風邪を引く','[{"hanzi":"他最近常常感冒，所以需要注意健康","pinyin":"tā zuì jìn cháng cháng gǎn mào suǒ yǐ xū yào zhù yì jiàn kāng","translation_ja":"彼は最近よく風邪を引くので健康に注意が必要です"},{"hanzi":"我感冒了，今天請假在家休息","pinyin":"wǒ gǎn mào le jīn tiān qǐng jià zài jiā xiū xí","translation_ja":"風邪を引いたので、今日は休んで家で過ごします"},{"hanzi":"冬天不戴口罩很容易感冒","pinyin":"dōng tiān bú dài kǒu zhào hěn róng yì gǎn mào","translation_ja":"冬にマスクをしないと風邪を引きやすいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',2,'請假','qǐng jià','休みを申請する','[{"hanzi":"他今天因為生病請假了","pinyin":"tā jīn tiān yīn wèi shēng bìng qǐng jià le","translation_ja":"彼は今日は病気のため休みを取りました"},{"hanzi":"如果需要請假，要先告訴老師","pinyin":"rú guǒ xū yào qǐng jià yào xiān gào sù lǎo shī","translation_ja":"休みを取る必要がある場合、まず先生に伝えてください"},{"hanzi":"我昨天請假去醫院看病了","pinyin":"wǒ zuó tiān qǐng jià qù yī yuàn kàn bìng le","translation_ja":"昨日、休みを取って病院に行きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',3,'發燒','fā shāo','熱が出る','[{"hanzi":"孩子昨晚開始發燒，爸爸媽媽很擔心","pinyin":"hái zi zuó wǎn kāi shǐ fā shāo bà bà mā mā hěn dān xīn","translation_ja":"子どもが昨晩熱を出し、両親はとても心配しています"},{"hanzi":"發燒時應該多喝水，並且休息","pinyin":"fā shāo shí yīng gāi duō hē shuǐ bìng qiě xiū xí","translation_ja":"熱が出た時は水を多く飲んで休むべきです"},{"hanzi":"他發燒三天了，還沒有退燒","pinyin":"tā fā shāo sān tiān le hái méi yǒu tuì shāo","translation_ja":"彼は3日間熱が続いていて、まだ下がっていません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',4,'醫生','yī shēng','医者','[{"hanzi":"我去醫院看了醫生，他說我需要休息","pinyin":"wǒ qù yī yuàn kàn le yī shēng tā shuō wǒ xū yào xiū xí","translation_ja":"病院で医者に診てもらい、休むように言われました"},{"hanzi":"這位醫生很有名，很多人來找他","pinyin":"zhè wèi yī shēng hěn yǒu míng hěn duō rén lái zhǎo tā","translation_ja":"この医者は有名で、多くの人が診察に来ます"},{"hanzi":"醫生建議我要多喝水和早睡","pinyin":"yī shēng jiàn yì wǒ yào duō hē shuǐ hé zǎo shuì","translation_ja":"医者は私に水を多く飲み、早く寝るように勧めました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',5,'跟','gēn','～と、～に','[{"hanzi":"我今天跟朋友一起吃午飯","pinyin":"wǒ jīn tiān gēn péng yǒu yì qǐ chī wǔ fàn","translation_ja":"私は今日友達と一緒に昼ご飯を食べました"},{"hanzi":"你跟老師說了嗎？","pinyin":"nǐ gēn lǎo shī shuō le ma","translation_ja":"先生に話しましたか？"},{"hanzi":"小狗跟著主人跑了起來","pinyin":"xiǎo gǒu gēn zhe zhǔ rén pǎo le qǐ lái","translation_ja":"子犬が飼い主の後を追いかけて走り始めました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',6,'醫院','yī yuàn','病院','[{"hanzi":"他感冒得很嚴重，所以去醫院了","pinyin":"tā gǎn mào dé hěn yán zhòng suǒ yǐ qù yī yuàn le","translation_ja":"彼はひどい風邪を引いたので病院に行きました"},{"hanzi":"這家醫院離我家很近","pinyin":"zhè jiā yī yuàn lí wǒ jiā hěn jìn","translation_ja":"この病院は私の家からとても近いです"},{"hanzi":"你需要我陪你去醫院嗎？","pinyin":"nǐ xū yào wǒ péi nǐ qù yī yuàn ma","translation_ja":"病院に一緒に行きましょうか？"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',7,'戴','dài','着ける','[{"hanzi":"冬天出門要戴帽子","pinyin":"dōng tiān chū mén yào dài mào zi","translation_ja":"冬は外出時に帽子をかぶるべきです"},{"hanzi":"他總是戴著一副眼鏡","pinyin":"tā zǒng shì dài zhe yí fù yǎn jìng","translation_ja":"彼はいつも眼鏡をかけています"},{"hanzi":"出門記得戴口罩","pinyin":"chū mén jì dé dài kǒu zhào","translation_ja":"外出時はマスクを着けるのを忘れないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',8,'口罩','kǒu zhào','マスク','[{"hanzi":"感冒的時候一定要戴口罩","pinyin":"gǎn mào de shí hòu yí dìng yào dài kǒu zhào","translation_ja":"風邪を引いた時は必ずマスクを着けてください"},{"hanzi":"超市裡有很多種口罩可以買","pinyin":"chāo shì lǐ yǒu hěn duō zhǒng kǒu zhào kě yǐ mǎi","translation_ja":"スーパーにはいろいろな種類のマスクがあります"},{"hanzi":"他忘記戴口罩就出門了","pinyin":"tā wàng jì dài kǒu zhào jiù chū mén le","translation_ja":"彼はマスクを着け忘れて外出しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',9,'洗','xǐ','洗う','[{"hanzi":"吃飯前要記得洗手","pinyin":"chī fàn qián yào jì dé xǐ shǒu","translation_ja":"食事の前に手を洗うのを忘れないでください"},{"hanzi":"媽媽正在洗衣服","pinyin":"mā mā zhèng zài xǐ yī fú","translation_ja":"母は今服を洗っています"},{"hanzi":"小明每天早上都洗臉","pinyin":"xiǎo míng měi tiān zǎo shàng dōu xǐ liǎn","translation_ja":"小明は毎朝顔を洗います"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',10,'手','shǒu','手','[{"hanzi":"她的手很乾淨","pinyin":"tā de shǒu hěn gān jìng","translation_ja":"彼女の手はとても清潔です"},{"hanzi":"請把這個東西拿在手裡","pinyin":"qǐng bǎ zhè ge dōng xī ná zài shǒu lǐ","translation_ja":"この物を手に持ってください"},{"hanzi":"小孩子喜歡用手畫畫","pinyin":"xiǎo hái zi xǐ huān yòng shǒu huà huà","translation_ja":"子供は手で絵を描くのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',11,'手指','shǒu zhǐ','指','[{"hanzi":"他用手指著那本書","pinyin":"tā yòng shǒu zhǐ zhe nà běn shū","translation_ja":"彼は指でその本を指しています"},{"hanzi":"我的手指很冷，需要戴手套","pinyin":"wǒ de shǒu zhǐ hěn lěng xū yào dài shǒu tào","translation_ja":"私の指は冷たいので手袋が必要です"},{"hanzi":"請不要用手指別人，很沒禮貌","pinyin":"qǐng bú yào yòng shǒu zhǐ bié rén hěn méi lǐ mào","translation_ja":"他人を指差さないでください、とても失礼です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',12,'健康','jiàn kāng','健康','[{"hanzi":"多運動對身體健康有幫助","pinyin":"duō yùn dòng duì shēn tǐ jiàn kāng yǒu bāng zhù","translation_ja":"運動をたくさんすることは健康に良いです"},{"hanzi":"他一直很注意自己的健康","pinyin":"tā yì zhí hěn zhù yì zì jǐ de jiàn kāng","translation_ja":"彼はずっと自分の健康に気をつけています"},{"hanzi":"健康是最重要的財富","pinyin":"jiàn kāng shì zuì zhòng yào de cái fù","translation_ja":"健康は最も大切な財産です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',13,'生病','shēng bìng','病気になる','[{"hanzi":"他最近生病了，所以沒來上班","pinyin":"tā zuì jìn shēng bìng le suǒ yǐ méi lái shàng bān","translation_ja":"彼は最近病気になり、仕事に来ていません"},{"hanzi":"如果生病了，要多休息","pinyin":"rú guǒ shēng bìng le yào duō xiū xí","translation_ja":"病気になったら、たくさん休むべきです"},{"hanzi":"孩子生病了，父母非常擔心","pinyin":"hái zi shēng bìng le fù mǔ fēi cháng dān xīn","translation_ja":"子どもが病気になり、両親はとても心配しています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',14,'注意','zhù yì','注意する','[{"hanzi":"過馬路時要注意安全","pinyin":"guò mǎ lù shí yào zhù yì ān quán","translation_ja":"道路を渡るときは安全に注意してください"},{"hanzi":"老師提醒我們要注意發音","pinyin":"lǎo shī tí xǐng wǒ men yào zhù yì fā yīn","translation_ja":"先生は私たちに発音に注意するよう言いました"},{"hanzi":"開車時一定要注意路況","pinyin":"kāi chē shí yí dìng yào zhù yì lù kuàng","translation_ja":"運転中は必ず道路状況に注意してください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',15,'對','duì','～に対して、正しい','[{"hanzi":"這件事情對你來說很重要嗎？","pinyin":"zhè jiàn shì qíng duì nǐ lái shuō hěn zhòng yào ma","translation_ja":"このことはあなたにとって重要ですか？"},{"hanzi":"他對這個問題有自己的看法","pinyin":"tā duì zhè ge wèn tí yǒu zì jǐ de kàn fǎ","translation_ja":"彼はこの問題について自分の考えを持っています"},{"hanzi":"你說的對，我應該改變方法","pinyin":"nǐ shuō de duì wǒ yīng gāi gǎi biàn fāng fǎ","translation_ja":"あなたの言う通り、私はやり方を変えるべきです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',16,'多','duō','多い','[{"hanzi":"冬天要多穿衣服，才能保暖","pinyin":"dōng tiān yào duō chuān yī fú cái néng bǎo nuǎn","translation_ja":"冬にはたくさん服を着て暖かくするべきです"},{"hanzi":"他最近的工作很多，很忙","pinyin":"tā zuì jìn de gōng zuò hěn duō hěn máng","translation_ja":"彼は最近仕事が多く、とても忙しいです"},{"hanzi":"請多吃水果，對健康有好處","pinyin":"qǐng duō chī shuǐ guǒ duì jiàn kāng yǒu hǎo chù","translation_ja":"もっと果物を食べてください、健康に良いですよ"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',17,'少','shǎo','少ない','[{"hanzi":"請少喝冰的飲料，對身體比較好","pinyin":"qǐng shǎo hē bīng de yǐn liào duì shēn tǐ bǐ jiào hǎo","translation_ja":"冷たい飲み物を控えたほうが体に良いです"},{"hanzi":"今天作業比較少，很快就做完了","pinyin":"jīn tiān zuò yè bǐ jiào shǎo hěn kuài jiù zuò wán le","translation_ja":"今日の宿題は少なかったので、すぐに終わりました"},{"hanzi":"我們應該少用塑膠袋，保護環境","pinyin":"wǒ men yīng gāi shǎo yòng sù jiāo dài bǎo hù huán jìng","translation_ja":"環境を守るため、ビニール袋の使用を減らすべきです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',18,'身體','shēn tǐ','体','[{"hanzi":"他的身體最近不好，需要休息","pinyin":"tā de shēn tǐ zuì jìn bù hǎo xū yào xiū xí","translation_ja":"彼は最近体調が良くないので、休養が必要です"},{"hanzi":"多運動對身體健康很好","pinyin":"duō yùn dòng duì shēn tǐ jiàn kāng hěn hǎo","translation_ja":"運動をたくさんすることは体の健康にとても良いです"},{"hanzi":"孩子的身體還很弱，要多注意","pinyin":"hái zi de shēn tǐ hái hěn ruò yào duō zhù yì","translation_ja":"子どもの体はまだ弱いので、もっと気をつける必要があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',19,'帶','dài','持つ、連れる','[{"hanzi":"出門記得帶手機和錢包","pinyin":"chū mén jì dé dài shǒu jī hé qián bāo","translation_ja":"外出するときは携帯電話と財布を忘れずに持ってください"},{"hanzi":"他每次出去都會帶一本書","pinyin":"tā měi cì chū qù dōu huì dài yì běn shū","translation_ja":"彼は出かけるたびに本を1冊持って行きます"},{"hanzi":"我帶朋友去參觀學校","pinyin":"wǒ dài péng yǒu qù cān guān xué xiào","translation_ja":"私は友人を連れて学校を見学しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',20,'蘋果','píng guǒ','りんご','[{"hanzi":"他每天吃一個蘋果，對健康很好","pinyin":"tā měi tiān chī yí ge píng guǒ duì jiàn kāng hěn hǎo","translation_ja":"彼は毎日りんごを1つ食べており、健康にとても良いです"},{"hanzi":"超市裡的蘋果很新鮮","pinyin":"chāo shì lǐ de píng guǒ hěn xīn xiān","translation_ja":"スーパーのりんごはとても新鮮です"},{"hanzi":"我想買幾個蘋果回家","pinyin":"wǒ xiǎng mǎi jǐ ge píng guǒ huí jiā","translation_ja":"家に帰るためにりんごをいくつか買いたいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',21,'香蕉','xiāng jiāo','バナナ','[{"hanzi":"香蕉很甜，小孩子都喜歡吃","pinyin":"xiāng jiāo hěn tián xiǎo hái zi dōu xǐ huān chī","translation_ja":"バナナは甘くて、子どもたちがみんな好きです"},{"hanzi":"早上吃香蕉對腸胃很好","pinyin":"zǎo shàng chī xiāng jiāo duì cháng wèi hěn hǎo","translation_ja":"朝にバナナを食べることは胃腸に良いです"},{"hanzi":"我買了一串香蕉","pinyin":"wǒ mǎi le yí chuàn xiāng jiāo","translation_ja":"私はバナナを1房買いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',22,'咳嗽/咳','ké sòu / ké','咳をする','[{"hanzi":"他感冒了，咳嗽得很厲害","pinyin":"tā gǎn mào le ké sòu dé hěn lì hài","translation_ja":"彼は風邪を引いて、ひどく咳をしています"},{"hanzi":"如果咳嗽不止，應該去看醫生","pinyin":"rú guǒ ké sòu bù zhǐ yīng gāi qù kàn yī shēng","translation_ja":"咳が止まらなければ、医者に診てもらうべきです"},{"hanzi":"喝點熱水可以減少咳嗽","pinyin":"hē diǎn rè shuǐ kě yǐ jiǎn shǎo ké sòu","translation_ja":"温かい水を飲むと咳を減らすことができます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',23,'頭','tóu','頭','[{"hanzi":"我的頭有點痛，想休息一下","pinyin":"wǒ de tóu yǒu diǎn tòng xiǎng xiū xí yí xià","translation_ja":"頭が少し痛いので、少し休みたいです"},{"hanzi":"他頭上戴了一頂紅色的帽子","pinyin":"tā tóu shàng dài le yì dǐng hóng sè de mào zi","translation_ja":"彼は赤い帽子をかぶっています"},{"hanzi":"小朋友們的頭髮都很可愛","pinyin":"xiǎo péng yǒu men de tóu fǎ dōu hěn kě ài","translation_ja":"子どもたちの髪はみんな可愛いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',24,'頭髮','tóu fǎ','髪','[{"hanzi":"她的頭髮很長，也很漂亮","pinyin":"tā de tóu fǎ hěn cháng yě hěn piào liàng","translation_ja":"彼女の髪はとても長く、美しいです"},{"hanzi":"我昨天去剪頭髮了","pinyin":"wǒ zuó tiān qù jiǎn tóu fǎ le","translation_ja":"昨日髪を切りに行きました"},{"hanzi":"她喜歡每天早上整理頭髮","pinyin":"tā xǐ huān měi tiān zǎo shàng zhěng lǐ tóu fǎ","translation_ja":"彼女は毎朝髪を整えるのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',25,'痛','tòng','痛い','[{"hanzi":"我的肚子很痛，應該是吃壞東西了","pinyin":"wǒ de dù zi hěn tòng yīng gāi shì chī huài dōng xi le","translation_ja":"お腹がとても痛く、何か悪いものを食べたかもしれません"},{"hanzi":"走路太久，我的腳很痛","pinyin":"zǒu lù tài jiǔ wǒ de jiǎo hěn tòng","translation_ja":"歩きすぎて足がとても痛いです"},{"hanzi":"頭痛的時候要多休息","pinyin":"tóu tòng de shí hòu yào duō xiū xí","translation_ja":"頭が痛い時はたくさん休むべきです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',26,'鼻子','bí zi','鼻','[{"hanzi":"他的鼻子很挺，看起來很好看","pinyin":"tā de bí zi hěn tǐng kàn qǐ lái hěn hǎo kàn","translation_ja":"彼の鼻は高く、とても魅力的です"},{"hanzi":"感冒的時候，鼻子會不通","pinyin":"gǎn mào de shí hòu bí zi huì bù tōng","translation_ja":"風邪を引いたときは鼻が詰まります"},{"hanzi":"他用鼻子聞了一下花的香味","pinyin":"tā yòng bí zi wén le yí xià huā de xiāng wèi","translation_ja":"彼は鼻で花の香りを嗅ぎました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',27,'嘴(巴)','zuǐ (bā)','口','[{"hanzi":"請張開嘴巴，醫生要檢查一下","pinyin":"qǐng zhāng kāi zuǐ bā yī shēng yào jiǎn chá yí xià","translation_ja":"口を開けてください、医者が検査します"},{"hanzi":"小朋友的嘴巴上有巧克力","pinyin":"xiǎo péng yǒu de zuǐ bā shàng yǒu qiǎo kè lì","translation_ja":"子どもの口の周りにチョコレートが付いています"},{"hanzi":"吃飯的時候不要說話，嘴巴會弄髒","pinyin":"chī fàn de shí hòu bú yào shuō huà zuǐ bā huì nòng zāng","translation_ja":"食事中に話さないでください、口が汚れます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',28,'臉','liǎn','顔','[{"hanzi":"她的臉紅紅的，看起來很可愛","pinyin":"tā de liǎn hóng hóng de kàn qǐ lái hěn kě ài","translation_ja":"彼女の顔は赤く、とても可愛らしいです"},{"hanzi":"他用手洗了一下臉，很清爽","pinyin":"tā yòng shǒu xǐ le yí xià liǎn hěn qīng shuǎng","translation_ja":"彼は手で顔を洗い、とてもさっぱりしました"},{"hanzi":"臉上有灰塵，快去洗一下吧","pinyin":"liǎn shàng yǒu huī chén kuài qù xǐ yí xià ba","translation_ja":"顔にほこりがついているので、すぐに洗いましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',29,'耳朵','ěr duo','耳','[{"hanzi":"小孩子的耳朵很好，什麼都聽得見","pinyin":"xiǎo hái zi de ěr duo hěn hǎo shén me dōu tīng de jiàn","translation_ja":"子どもの耳はとても良く、何でも聞き取れます"},{"hanzi":"我的耳朵有點痛，可能是感冒了","pinyin":"wǒ de ěr duo yǒu diǎn tòng kě néng shì gǎn mào le","translation_ja":"耳が少し痛いです、風邪を引いたかもしれません"},{"hanzi":"戴耳機的時候不要音量太大","pinyin":"dài ěr jī de shí hòu bú yào yīn liàng tài dà","translation_ja":"ヘッドホンを使うときは音量を大きくしすぎないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',30,'眼睛','yǎn jīng','目','[{"hanzi":"她的眼睛很大，像星星一樣漂亮","pinyin":"tā de yǎn jīng hěn dà xiàng xīng xīng yí yàng piào liàng","translation_ja":"彼女の目は大きく、星のように美しいです"},{"hanzi":"我的眼睛最近很乾，需要滴眼藥水","pinyin":"wǒ de yǎn jīng zuì jìn hěn gān xū yào dī yǎn yào shuǐ","translation_ja":"最近目が乾燥していて、目薬を差す必要があります"},{"hanzi":"保護眼睛要多休息，少看手機","pinyin":"bǎo hù yǎn jīng yào duō xiū xí shǎo kàn shǒu jī","translation_ja":"目を守るために、たくさん休み、携帯を見る時間を減らしましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',31,'眼鏡','yǎn jìng','メガネ','[{"hanzi":"他戴著一副黑色的眼鏡","pinyin":"tā dài zhe yí fù hēi sè de yǎn jìng","translation_ja":"彼は黒いメガネをかけています"},{"hanzi":"我的眼鏡壞了，需要去修理","pinyin":"wǒ de yǎn jìng huài le xū yào qù xiū lǐ","translation_ja":"メガネが壊れてしまい、修理に行く必要があります"},{"hanzi":"他上課時總是戴著眼鏡","pinyin":"tā shàng kè shí zǒng shì dài zhe yǎn jìng","translation_ja":"彼は授業中いつもメガネをかけています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',32,'肚子','dù zi','お腹','[{"hanzi":"我的肚子很餓，想吃東西","pinyin":"wǒ de dù zi hěn è xiǎng chī dōng xi","translation_ja":"お腹がとても空いているので、何か食べたいです"},{"hanzi":"他剛剛吃太多，現在肚子很痛","pinyin":"tā gāng gāng chī tài duō xiàn zài dù zi hěn tòng","translation_ja":"彼はさっき食べ過ぎて、今お腹がとても痛いです"},{"hanzi":"小孩子的肚子很圓，看起來很可愛","pinyin":"xiǎo hái zi de dù zi hěn yuán kàn qǐ lái hěn kě ài","translation_ja":"子どものお腹は丸くて、とても可愛いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',33,'乾淨','gān jìng','清潔な','[{"hanzi":"他的房間非常乾淨，整理得很好","pinyin":"tā de fáng jiān fēi cháng gān jìng zhěng lǐ dé hěn hǎo","translation_ja":"彼の部屋はとても清潔で、よく片付いています"},{"hanzi":"請用乾淨的毛巾擦臉","pinyin":"qǐng yòng gān jìng de máo jīn cā liǎn","translation_ja":"清潔なタオルで顔を拭いてください"},{"hanzi":"保持手的乾淨可以避免生病","pinyin":"bǎo chí shǒu de gān jìng kě yǐ bì miǎn shēng bìng","translation_ja":"手を清潔に保つことで病気を防ぐことができます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',34,'需要','xū yào','必要とする','[{"hanzi":"如果生病了，需要多休息","pinyin":"rú guǒ shēng bìng le xū yào duō xiū xí","translation_ja":"病気になった場合は多く休む必要があります"},{"hanzi":"他需要一張椅子來坐下","pinyin":"tā xū yào yì zhāng yǐ zi lái zuò xià","translation_ja":"彼は座るための椅子が必要です"},{"hanzi":"學中文需要多聽多練習","pinyin":"xué zhōng wén xū yào duō tīng duō liàn xí","translation_ja":"中国語を学ぶには多く聞いて練習する必要があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',35,'藥','yào','薬','[{"hanzi":"這種藥一天要吃三次","pinyin":"zhè zhǒng yào yì tiān yào chī sān cì","translation_ja":"この薬は1日に3回飲む必要があります"},{"hanzi":"他去藥局買感冒藥","pinyin":"tā qù yào jú mǎi gǎn mào yào","translation_ja":"彼は薬局に風邪薬を買いに行きました"},{"hanzi":"生病時記得按時吃藥","pinyin":"shēng bìng shí jì dé àn shí chī yào","translation_ja":"病気の時は時間通りに薬を飲むのを忘れないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',36,'會','huì','～できる、～するだろう','[{"hanzi":"他學得很快，會說很多中文","pinyin":"tā xué dé hěn kuài huì shuō hěn duō zhōng wén","translation_ja":"彼は学ぶのが早く、中国語をたくさん話せます"},{"hanzi":"明天會下雨，記得帶傘","pinyin":"míng tiān huì xià yǔ jì dé dài sǎn","translation_ja":"明日は雨が降るでしょう、傘を忘れないでください"},{"hanzi":"我們下星期會去旅行","pinyin":"wǒ men xià xīng qī huì qù lǚ xíng","translation_ja":"私たちは来週旅行に行く予定です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',37,'記得','jì dé','覚えている、忘れない','[{"hanzi":"他還記得小時候的事情","pinyin":"tā hái jì dé xiǎo shí hòu de shì qíng","translation_ja":"彼は子どもの頃のことをまだ覚えています"},{"hanzi":"請記得明天帶資料","pinyin":"qǐng jì dé míng tiān dài zī liào","translation_ja":"明日資料を持ってくるのを忘れないでください"},{"hanzi":"我記得他以前住在台北","pinyin":"wǒ jì dé tā yǐ qián zhù zài tái běi","translation_ja":"彼が以前台北に住んでいたことを覚えています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',38,'要是/如果','yào shì / rú guǒ','もし～なら','[{"hanzi":"要是明天下雨，我們就不去爬山了","pinyin":"yào shì míng tiān xià yǔ wǒ men jiù bú qù pá shān le","translation_ja":"もし明日雨が降ったら、山登りには行きません"},{"hanzi":"如果你有空，請來我家坐坐","pinyin":"rú guǒ nǐ yǒu kòng qǐng lái wǒ jiā zuò zuò","translation_ja":"もし時間があれば、家に遊びに来てください"},{"hanzi":"要是有問題，可以問老師","pinyin":"yào shì yǒu wèn tí kě yǐ wèn lǎo shī","translation_ja":"もし問題があれば、先生に聞いてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',39,'就','jiù','～ならば、すぐに','[{"hanzi":"他下課就回家了","pinyin":"tā xià kè jiù huí jiā le","translation_ja":"彼は授業が終わるとすぐ家に帰りました"},{"hanzi":"如果有問題，就問我吧","pinyin":"rú guǒ yǒu wèn tí jiù wèn wǒ ba","translation_ja":"もし問題があれば、私に聞いてください"},{"hanzi":"天氣很好，我們就去公園玩吧","pinyin":"tiān qì hěn hǎo wǒ men jiù qù gōng yuán wán ba","translation_ja":"天気が良いので、公園に遊びに行きましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',40,'不舒服','bù shū fú','気分が悪い','[{"hanzi":"他今天有點不舒服，沒來上班","pinyin":"tā jīn tiān yǒu diǎn bù shū fú méi lái shàng bān","translation_ja":"彼は今日は少し気分が悪く、仕事に来ませんでした"},{"hanzi":"如果覺得不舒服，請馬上告訴醫生","pinyin":"rú guǒ jué dé bù shū fú qǐng mǎ shàng gào sù yī shēng","translation_ja":"もし気分が悪いと感じたら、すぐに医者に伝えてください"},{"hanzi":"坐太久會讓身體不舒服","pinyin":"zuò tài jiǔ huì ràng shēn tǐ bù shū fú","translation_ja":"長時間座っていると体が不調になります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',41,'打電話','dǎ diàn huà','電話をかける','[{"hanzi":"他剛剛打電話給我，說有事找我","pinyin":"tā gāng gāng dǎ diàn huà gěi wǒ shuō yǒu shì zhǎo wǒ","translation_ja":"彼はさっき私に電話をして、用事があると言いました"},{"hanzi":"媽媽每天都會打電話給奶奶","pinyin":"mā mā měi tiān dōu huì dǎ diàn huà gěi nǎi nǎi","translation_ja":"母は毎日祖母に電話をかけます"},{"hanzi":"明天記得打電話給老師請假","pinyin":"míng tiān jì dé dǎ diàn huà gěi lǎo shī qǐng jià","translation_ja":"明日、先生に電話して休みを取ることを忘れないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',42,'接電話','jiē diàn huà','電話に出る','[{"hanzi":"他正在忙，沒有接電話","pinyin":"tā zhèng zài máng méi yǒu jiē diàn huà","translation_ja":"彼は忙しくしていて、電話に出ませんでした"},{"hanzi":"我接電話的時候，聽到了一個壞消息","pinyin":"wǒ jiē diàn huà de shí hòu tīng dào le yí ge huài xiāo xī","translation_ja":"電話に出た時、悪いニュースを聞きました"},{"hanzi":"他總是很快地接電話","pinyin":"tā zǒng shì hěn kuài de jiē diàn huà","translation_ja":"彼はいつも素早く電話に出ます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',43,'電話','diàn huà','電話','[{"hanzi":"我的電話壞了，明天要去修","pinyin":"wǒ de diàn huà huài le míng tiān yào qù xiū","translation_ja":"私の電話が壊れたので、明日修理に行きます"},{"hanzi":"他剛剛給我打了一個電話","pinyin":"tā gāng gāng gěi wǒ dǎ le yí ge diàn huà","translation_ja":"彼はさっき私に電話をかけてきました"},{"hanzi":"如果你需要幫忙，打我的電話吧","pinyin":"rú guǒ nǐ xū yào bāng máng dǎ wǒ de diàn huà ba","translation_ja":"もし助けが必要なら、私に電話してください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',44,'號碼','hào mǎ','番号','[{"hanzi":"請把你的電話號碼寫下來","pinyin":"qǐng bǎ nǐ de diàn huà hào mǎ xiě xià lái","translation_ja":"あなたの電話番号を書いてください"},{"hanzi":"我不記得他的電話號碼了","pinyin":"wǒ bú jì dé tā de diàn huà hào mǎ le","translation_ja":"私は彼の電話番号を覚えていません"},{"hanzi":"這個號碼很容易記住","pinyin":"zhè ge hào mǎ hěn róng yì jì zhù","translation_ja":"この番号は覚えやすいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',45,'擔心','dān xīn','心配する','[{"hanzi":"爸爸很擔心你的健康","pinyin":"bà bà hěn dān xīn nǐ de jiàn kāng","translation_ja":"お父さんはあなたの健康をとても心配しています"},{"hanzi":"請不要擔心，我會照顧好自己","pinyin":"qǐng bú yào dān xīn wǒ huì zhào gù hǎo zì jǐ","translation_ja":"心配しないでください、自分でうまくやります"},{"hanzi":"孩子很晚還沒回家，媽媽很擔心","pinyin":"hái zi hěn wǎn hái méi huí jiā mā mā hěn dān xīn","translation_ja":"子供が遅くまで帰ってこず、母はとても心配しています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',46,'告訴','gào sù','伝える','[{"hanzi":"請告訴我明天的行程","pinyin":"qǐng gào sù wǒ míng tiān de xíng chéng","translation_ja":"明日の予定を教えてください"},{"hanzi":"他告訴我，他明天不來了","pinyin":"tā gào sù wǒ tā míng tiān bù lái le","translation_ja":"彼は明日来ないと私に伝えました"},{"hanzi":"我剛剛告訴老師我要請假","pinyin":"wǒ gāng gāng gào sù lǎo shī wǒ yào qǐng jià","translation_ja":"先ほど先生に休みを取ると伝えました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',47,'忘記','wàng jì','忘れる','[{"hanzi":"我忘記帶手機了","pinyin":"wǒ wàng jì dài shǒu jī le","translation_ja":"携帯電話を持ってくるのを忘れました"},{"hanzi":"他常常忘記重要的事情","pinyin":"tā cháng cháng wàng jì zhòng yào de shì qíng","translation_ja":"彼はよく大事なことを忘れます"},{"hanzi":"如果你怕忘記，可以寫下來","pinyin":"rú guǒ nǐ pà wàng jì kě yǐ xiě xià lái","translation_ja":"忘れるのが心配なら、書いておくといいですよ"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson10',48,'好了','hǎo le','良くなった、終わった','[{"hanzi":"我的病好了，可以去上班了","pinyin":"wǒ de bìng hǎo le kě yǐ qù shàng bān le","translation_ja":"病気が治ったので、仕事に行けます"},{"hanzi":"這件事已經處理好了","pinyin":"zhè jiàn shì yǐ jīng chǔ lǐ hǎo le","translation_ja":"この件はもう処理しました"},{"hanzi":"準備好了嗎？我們要出發了","pinyin":"zhǔn bèi hǎo le ma wǒ men yào chū fā le","translation_ja":"準備はできましたか？出発します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',1,'認識','rèn shì','知り合う','[{"hanzi":"我們是在學校認識的","pinyin":"wǒ men shì zài xué xiào rèn shì de","translation_ja":"私たちは学校で知り合いました"},{"hanzi":"你認識那個新同學嗎","pinyin":"nǐ rèn shì nà gè xīn tóng xué ma","translation_ja":"あなたはその新しいクラスメイトを知っていますか"},{"hanzi":"他們因為打球而認識的","pinyin":"tā men yīn wèi dǎ qiú ér rèn shì de","translation_ja":"彼らはバスケットボールを通じて知り合いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',2,'了','le','〜した','[{"hanzi":"我吃過晚飯了","pinyin":"wǒ chī guò wǎn fàn le","translation_ja":"私はもう夕飯を食べました"},{"hanzi":"他已經出去了","pinyin":"tā yǐ jīng chū qù le","translation_ja":"彼はもう外出しました"},{"hanzi":"我們決定好了","pinyin":"wǒ men jué dìng hǎo le","translation_ja":"私たちは決めました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',3,'已經','yǐ jīng','すでに','[{"hanzi":"我已經完成了作業","pinyin":"wǒ yǐ jīng wán chéng le zuò yè","translation_ja":"私はすでに宿題を終えました"},{"hanzi":"他已經到學校了","pinyin":"tā yǐ jīng dào xué xiào le","translation_ja":"彼はすでに学校に到着しました"},{"hanzi":"他們已經聊過天了","pinyin":"tā men yǐ jīng liáo guò tiān le","translation_ja":"彼らはすでにおしゃべりしました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',4,'卡片','kǎ piàn','カード','[{"hanzi":"我想寄一張生日卡片給朋友","pinyin":"wǒ xiǎng jì yī zhāng shēng rì kǎ piàn gěi péng yǒu","translation_ja":"友達に誕生日カードを送りたいです"},{"hanzi":"卡片上的字很漂亮","pinyin":"kǎ piàn shàng de zì hěn piào liàng","translation_ja":"カードの文字がとてもきれいです"},{"hanzi":"我收到了一張感謝卡片","pinyin":"wǒ shōu dào le yī zhāng gǎn xiè kǎ piàn","translation_ja":"感謝カードを一枚受け取りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',5,'看到','kàn dào','見かける','[{"hanzi":"我在街上看到他了","pinyin":"wǒ zài jiē shàng kàn dào tā le","translation_ja":"私は彼を通りで見かけました"},{"hanzi":"你有沒有看到我的手機","pinyin":"nǐ yǒu méi yǒu kàn dào wǒ de shǒu jī","translation_ja":"私の携帯電話を見かけませんでしたか"},{"hanzi":"他在照片裡看到了一隻小狗","pinyin":"tā zài zhào piàn lǐ kàn dào le yī zhī xiǎo gǒu","translation_ja":"彼は写真の中で小犬を見つけました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',6,'文章','wén zhāng','文章','[{"hanzi":"這篇文章寫得很好","pinyin":"zhè piān wén zhāng xiě de hěn hǎo","translation_ja":"この文章はとてもよく書かれています"},{"hanzi":"我喜歡看有趣的文章","pinyin":"wǒ xǐ huān kàn yǒu qù de wén zhāng","translation_ja":"私は面白い文章を読むのが好きです"},{"hanzi":"他發表了一篇文章","pinyin":"tā fā biǎo le yī piān wén zhāng","translation_ja":"彼は文章を一本発表しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',7,'然後','rán hòu','それから','[{"hanzi":"我先去買菜，然後回家","pinyin":"wǒ xiān qù mǎi cài rán hòu huí jiā","translation_ja":"まず買い物に行って、それから家に帰ります"},{"hanzi":"我們吃了飯，然後聊天","pinyin":"wǒ men chī le fàn rán hòu liáo tiān","translation_ja":"私たちはご飯を食べてからおしゃべりしました"},{"hanzi":"請你先寫作業，然後再玩","pinyin":"qǐng nǐ xiān xiě zuò yè rán hòu zài wán","translation_ja":"宿題を先にやって、それから遊んでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',8,'留言','liú yán','コメントする','[{"hanzi":"我在他的照片下留言了","pinyin":"wǒ zài tā de zhào piàn xià liú yán le","translation_ja":"私は彼の写真にコメントしました"},{"hanzi":"有很多人給這篇文章留言","pinyin":"yǒu hěn duō rén gěi zhè piān wén zhāng liú yán","translation_ja":"多くの人がこの文章にコメントしました"},{"hanzi":"如果有問題，可以留言問我","pinyin":"rú guǒ yǒu wèn tí kě yǐ liú yán wèn wǒ","translation_ja":"質問があればコメントで聞いてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',9,'回答','huí dá','答える','[{"hanzi":"我不知道怎麼回答這個問題","pinyin":"wǒ bù zhī dào zěn me huí dá zhè gè wèn tí","translation_ja":"この質問にどう答えるかわかりません"},{"hanzi":"老師回答了我的問題","pinyin":"lǎo shī huí dá le wǒ de wèn tí","translation_ja":"先生は私の質問に答えました"},{"hanzi":"你能回答我的問題嗎","pinyin":"nǐ néng huí dá wǒ de wèn tí ma","translation_ja":"私の質問に答えられますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',10,'聊天(兒)','liáo tiān(r)','おしゃべりする','[{"hanzi":"我們每天都在網路上聊天","pinyin":"wǒ men měi tiān dōu zài wǎng lù shàng liáo tiān","translation_ja":"私たちは毎日ネットでおしゃべりします"},{"hanzi":"他們喜歡一起聊天","pinyin":"tā men xǐ huān yī qǐ liáo tiān","translation_ja":"彼らは一緒におしゃべりするのが好きです"},{"hanzi":"週末的時候，我們通常聊很多天","pinyin":"zhōu mò de shí hòu wǒ men tōng cháng liáo hěn duō tiān","translation_ja":"週末には、私たちはたくさんおしゃべりします"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',11,'差不多','chà bù duō','ほぼ同じ','[{"hanzi":"我們的年齡差不多","pinyin":"wǒ men de nián líng chà bù duō","translation_ja":"私たちの年齢はほぼ同じです"},{"hanzi":"現在的時間差不多是六點","pinyin":"xiàn zài de shí jiān chà bù duō shì liù diǎn","translation_ja":"今の時間はほぼ6時です"},{"hanzi":"我學中文差不多學了一年","pinyin":"wǒ xué zhōng wén chà bù duō xué le yī nián","translation_ja":"私は中国語をほぼ1年間学びました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',12,'聊','liáo','話す','[{"hanzi":"我們聊了一整個下午","pinyin":"wǒ men liáo le yī zhěng gè xià wǔ","translation_ja":"私たちは午後ずっと話していました"},{"hanzi":"你可以跟我聊聊嗎","pinyin":"nǐ kě yǐ gēn wǒ liáo liáo ma","translation_ja":"私と少し話してくれませんか"},{"hanzi":"他們正在聊電影","pinyin":"tā men zhèng zài liáo diàn yǐng","translation_ja":"彼らは映画について話しています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',13,'見面','jiàn miàn','会う','[{"hanzi":"我們明天見面吧","pinyin":"wǒ men míng tiān jiàn miàn ba","translation_ja":"明日会いましょう"},{"hanzi":"他們很久沒有見面了","pinyin":"tā men hěn jiǔ méi yǒu jiàn miàn le","translation_ja":"彼らは長い間会っていません"},{"hanzi":"你想什麼時候見面","pinyin":"nǐ xiǎng shén me shí hòu jiàn miàn","translation_ja":"いつ会いたいですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',14,'還沒','hái méi','まだ〜していない','[{"hanzi":"我還沒吃早餐","pinyin":"wǒ hái méi chī zǎo cān","translation_ja":"私はまだ朝食を食べていません"},{"hanzi":"他還沒決定要去哪裡","pinyin":"tā hái méi jué dìng yào qù nǎ lǐ","translation_ja":"彼はどこに行くかまだ決めていません"},{"hanzi":"我們還沒完成這個工作","pinyin":"wǒ men hái méi wán chéng zhè gè gōng zuò","translation_ja":"私たちはこの仕事をまだ終えていません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',15,'還','hái','まだ、さらに','[{"hanzi":"我還沒吃晚飯","pinyin":"wǒ hái méi chī wǎn fàn","translation_ja":"私はまだ夕飯を食べていません"},{"hanzi":"他還在學校工作","pinyin":"tā hái zài xué xiào gōng zuò","translation_ja":"彼はまだ学校で働いています"},{"hanzi":"你還需要什麼嗎","pinyin":"nǐ hái xū yào shén me ma","translation_ja":"他に何か必要ですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',16,'沒','méi','〜しなかった、まだ〜していない','[{"hanzi":"我今天沒去上課","pinyin":"wǒ jīn tiān méi qù shàng kè","translation_ja":"私は今日授業に行きませんでした"},{"hanzi":"他還沒完成作業","pinyin":"tā hái méi wán chéng zuò yè","translation_ja":"彼はまだ宿題を終えていません"},{"hanzi":"昨天的雨沒停","pinyin":"zuó tiān de yǔ méi tíng","translation_ja":"昨日は雨が止みませんでした"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',17,'決定','jué dìng','決める','[{"hanzi":"我已經決定去台灣留學","pinyin":"wǒ yǐ jīng jué dìng qù tái wān liú xué","translation_ja":"私は台湾に留学することを決めました"},{"hanzi":"這件事你決定了嗎","pinyin":"zhè jiàn shì nǐ jué dìng le ma","translation_ja":"このことはもう決めましたか"},{"hanzi":"我們決定一起去旅行","pinyin":"wǒ men jué dìng yī qǐ qù lǚ xíng","translation_ja":"私たちは一緒に旅行に行くことを決めました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',18,'以前','yǐ qián','以前','[{"hanzi":"我以前住在日本","pinyin":"wǒ yǐ qián zhù zài rì běn","translation_ja":"私は以前日本に住んでいました"},{"hanzi":"你以前學過中文嗎","pinyin":"nǐ yǐ qián xué guò zhōng wén ma","translation_ja":"以前中国語を学んだことがありますか"},{"hanzi":"他們以前是好朋友","pinyin":"tā men yǐ qián shì hǎo péng yǒu","translation_ja":"彼らは以前仲の良い友達でした"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',19,'以後','yǐ hòu','以後','[{"hanzi":"我以後想當老師","pinyin":"wǒ yǐ hòu xiǎng dāng lǎo shī","translation_ja":"私は将来先生になりたいです"},{"hanzi":"你以後打算去哪裡","pinyin":"nǐ yǐ hòu dǎ suàn qù nǎ lǐ","translation_ja":"あなたは今後どこに行くつもりですか"},{"hanzi":"我們以後再說吧","pinyin":"wǒ men yǐ hòu zài shuō ba","translation_ja":"この話は後にしましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',20,'經驗','jīng yàn','経験','[{"hanzi":"我有教中文的經驗","pinyin":"wǒ yǒu jiāo zhōng wén de jīng yàn","translation_ja":"私は中国語を教えた経験があります"},{"hanzi":"他有很多工作經驗","pinyin":"tā yǒu hěn duō gōng zuò jīng yàn","translation_ja":"彼は仕事の経験が豊富です"},{"hanzi":"學習經驗對學生很重要","pinyin":"xué xí jīng yàn duì xué shēng hěn zhòng yào","translation_ja":"学習経験は学生にとってとても重要です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',21,'這樣','zhè yàng','このように','[{"hanzi":"這樣做比較快","pinyin":"zhè yàng zuò bǐ jiào kuài","translation_ja":"このようにやると早いです"},{"hanzi":"你這樣說不太好","pinyin":"nǐ zhè yàng shuō bù tài hǎo","translation_ja":"あなたの言い方はあまり良くありません"},{"hanzi":"他們這樣安排很合理","pinyin":"tā men zhè yàng ān pái hěn hé lǐ","translation_ja":"彼らのこのような手配は理にかなっています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',22,'奇怪','qí guài','奇妙な','[{"hanzi":"這個地方的習慣很奇怪","pinyin":"zhè gè dì fāng de xí guàn hěn qí guài","translation_ja":"この地域の習慣はとても奇妙です"},{"hanzi":"他今天的行為很奇怪","pinyin":"tā jīn tiān de xíng wéi hěn qí guài","translation_ja":"彼の今日の行動はとても奇妙です"},{"hanzi":"你有沒有覺得這件事很奇怪","pinyin":"nǐ yǒu méi yǒu jué de zhè jiàn shì hěn qí guài","translation_ja":"この件について奇妙だと感じませんか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',23,'辦法','bàn fǎ','方法','[{"hanzi":"你有什麼辦法解決這個問題","pinyin":"nǐ yǒu shén me bàn fǎ jiě jué zhè gè wèn tí","translation_ja":"この問題を解決する方法はありますか"},{"hanzi":"我想不出辦法了","pinyin":"wǒ xiǎng bù chū bàn fǎ le","translation_ja":"私はもう方法が思いつきません"},{"hanzi":"這是最好的辦法","pinyin":"zhè shì zuì hǎo de bàn fǎ","translation_ja":"これは最良の方法です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',24,'幫忙','bāng máng','手伝う','[{"hanzi":"謝謝你幫忙我","pinyin":"xiè xiè nǐ bāng máng wǒ","translation_ja":"手伝ってくれてありがとう"},{"hanzi":"他請我幫忙搬家","pinyin":"tā qǐng wǒ bāng máng bān jiā","translation_ja":"彼は私に引っ越しを手伝うよう頼みました"},{"hanzi":"我需要你的幫忙","pinyin":"wǒ xū yào nǐ de bāng máng","translation_ja":"私はあなたの助けが必要です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',25,'打算','dǎ suàn','予定する','[{"hanzi":"我打算下個月去旅行","pinyin":"wǒ dǎ suàn xià gè yuè qù lǚ xíng","translation_ja":"私は来月旅行に行く予定です"},{"hanzi":"你打算怎麼過週末","pinyin":"nǐ dǎ suàn zěn me guò zhōu mò","translation_ja":"あなたは週末をどう過ごす予定ですか"},{"hanzi":"我們打算明年一起學日文","pinyin":"wǒ men dǎ suàn míng nián yī qǐ xué rì wén","translation_ja":"私たちは来年一緒に日本語を学ぶ予定です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',26,'可能','kě néng','可能性がある','[{"hanzi":"他可能今天不會來","pinyin":"tā kě néng jīn tiān bù huì lái","translation_ja":"彼は今日来ないかもしれません"},{"hanzi":"明天可能會下雨","pinyin":"míng tiān kě néng huì xià yǔ","translation_ja":"明日は雨が降るかもしれません"},{"hanzi":"你有沒有可能參加這個活動","pinyin":"nǐ yǒu méi yǒu kě néng cān jiā zhè gè huó dòng","translation_ja":"あなたはこのイベントに参加できる可能性はありますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',27,'約','yuē','約束する','[{"hanzi":"我們約好明天見面","pinyin":"wǒ men yuē hǎo míng tiān jiàn miàn","translation_ja":"私たちは明日会う約束をしました"},{"hanzi":"他約朋友一起吃飯","pinyin":"tā yuē péng yǒu yī qǐ chī fàn","translation_ja":"彼は友達を食事に誘いました"},{"hanzi":"你什麼時候有空可以約我嗎","pinyin":"nǐ shén me shí hòu yǒu kòng kě yǐ yuē wǒ ma","translation_ja":"空いている時に私を誘ってもらえますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',28,'但是','dàn shì','しかし','[{"hanzi":"我想去，但是沒有時間","pinyin":"wǒ xiǎng qù dàn shì méi yǒu shí jiān","translation_ja":"行きたいですが、時間がありません"},{"hanzi":"他很累，但是還在工作","pinyin":"tā hěn lèi dàn shì hái zài gōng zuò","translation_ja":"彼は疲れていますが、まだ働いています"},{"hanzi":"雨很大，但是我們還是出去了","pinyin":"yǔ hěn dà dàn shì wǒ men hái shì chū qù le","translation_ja":"雨は強いですが、私たちはそれでも外出しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',29,'給','gěi','渡す','[{"hanzi":"他給了我一份禮物","pinyin":"tā gěi le wǒ yī fèn lǐ wù","translation_ja":"彼は私にプレゼントを渡しました"},{"hanzi":"請把這個文件給老師","pinyin":"qǐng bǎ zhè gè wén jiàn gěi lǎo shī","translation_ja":"この書類を先生に渡してください"},{"hanzi":"我給你介紹一個朋友","pinyin":"wǒ gěi nǐ jiè shào yī gè péng yǒu","translation_ja":"あなたに友達を一人紹介します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',30,'什麼時候','shén me shí hòu','いつ','[{"hanzi":"你什麼時候有空","pinyin":"nǐ shén me shí hòu yǒu kòng","translation_ja":"あなたはいつ空いていますか"},{"hanzi":"我不知道他什麼時候來","pinyin":"wǒ bù zhī dào tā shén me shí hòu lái","translation_ja":"彼がいつ来るか分かりません"},{"hanzi":"我們什麼時候出發","pinyin":"wǒ men shén me shí hòu chū fā","translation_ja":"私たちはいつ出発しますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',31,'網路','wǎng lù','インターネット','[{"hanzi":"我每天都會用網路","pinyin":"wǒ měi tiān dōu huì yòng wǎng lù","translation_ja":"私は毎日インターネットを使います"},{"hanzi":"網路上有很多有趣的資訊","pinyin":"wǎng lù shàng yǒu hěn duō yǒu qù de zī xùn","translation_ja":"ネット上にはたくさんの面白い情報があります"},{"hanzi":"我家的網路很快","pinyin":"wǒ jiā de wǎng lù hěn kuài","translation_ja":"私の家のインターネットは速いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',32,'菜單','cài dān','メニュー','[{"hanzi":"這家餐廳的菜單很豐富","pinyin":"zhè jiā cān tīng de cài dān hěn fēng fù","translation_ja":"このレストランのメニューは豊富です"},{"hanzi":"你可以幫我看一下菜單嗎","pinyin":"nǐ kě yǐ bāng wǒ kàn yī xià cài dān ma","translation_ja":"メニューをちょっと見てくれますか"},{"hanzi":"他正在研究菜單上的特別菜","pinyin":"tā zhèng zài yán jiū cài dān shàng de tè bié cài","translation_ja":"彼はメニューの特別料理を研究しています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',33,'特別','tè bié','特別な','[{"hanzi":"今天的菜特別好吃","pinyin":"jīn tiān de cài tè bié hǎo chī","translation_ja":"今日の料理は特別に美味しいです"},{"hanzi":"他是一個特別的朋友","pinyin":"tā shì yī gè tè bié de péng yǒu","translation_ja":"彼は特別な友達です"},{"hanzi":"這個節日對我來說很特別","pinyin":"zhè gè jié rì duì wǒ lái shuō hěn tè bié","translation_ja":"この祝日は私にとってとても特別です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',34,'點菜','diǎn cài','注文する','[{"hanzi":"我們點了三個菜","pinyin":"wǒ men diǎn le sān gè cài","translation_ja":"私たちは3品注文しました"},{"hanzi":"服務員可以幫我們點菜嗎","pinyin":"fú wù yuán kě yǐ bāng wǒ men diǎn cài ma","translation_ja":"店員さん、注文をお願いできますか"},{"hanzi":"他正在看菜單準備點菜","pinyin":"tā zhèng zài kàn cài dān zhǔn bèi diǎn cài","translation_ja":"彼はメニューを見て注文を準備しています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',35,'菜','cài','料理','[{"hanzi":"我最喜歡吃媽媽做的菜","pinyin":"wǒ zuì xǐ huān chī mā mā zuò de cài","translation_ja":"私は母が作った料理が一番好きです"},{"hanzi":"今天晚上的菜很豐富","pinyin":"jīn tiān wǎn shàng de cài hěn fēng fù","translation_ja":"今夜の料理はとても豪華です"},{"hanzi":"這家店的菜很有名","pinyin":"zhè jiā diàn de cài hěn yǒu míng","translation_ja":"この店の料理はとても有名です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',36,'盤','pán','皿','[{"hanzi":"桌上有一盤水果","pinyin":"zhuō shàng yǒu yī pán shuǐ guǒ","translation_ja":"テーブルの上に一皿の果物があります"},{"hanzi":"他端來了一盤熱菜","pinyin":"tā duān lái le yī pán rè cài","translation_ja":"彼は一皿の温かい料理を運んできました"},{"hanzi":"這盤菜看起來很好吃","pinyin":"zhè pán cài kàn qǐ lái hěn hǎo chī","translation_ja":"この皿の料理は美味しそうです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',37,'盤子','pán zi','皿','[{"hanzi":"你可以把盤子拿過來嗎","pinyin":"nǐ kě yǐ bǎ pán zi ná guò lái ma","translation_ja":"お皿を持ってきてくれませんか"},{"hanzi":"他把髒的盤子拿到廚房","pinyin":"tā bǎ zāng de pán zi ná dào chú fáng","translation_ja":"彼は汚れた皿を台所に持っていきました"},{"hanzi":"我需要一個大盤子","pinyin":"wǒ xū yào yī gè dà pán zi","translation_ja":"私は大きなお皿が必要です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',38,'照相','zhào xiàng','写真を撮る','[{"hanzi":"我們在公園裡照相","pinyin":"wǒ men zài gōng yuán lǐ zhào xiàng","translation_ja":"私たちは公園で写真を撮ります"},{"hanzi":"他喜歡到處照相","pinyin":"tā xǐ huān dào chù zhào xiàng","translation_ja":"彼はあちこちで写真を撮るのが好きです"},{"hanzi":"請幫我們照一張相","pinyin":"qǐng bāng wǒ men zhào yī zhāng xiàng","translation_ja":"私たちの写真を一枚撮ってください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',39,'照','zhào','照らす、撮る','[{"hanzi":"太陽照在草地上","pinyin":"tài yáng zhào zài cǎo dì shàng","translation_ja":"太陽が草地を照らしています"},{"hanzi":"我用手機照了一張相片","pinyin":"wǒ yòng shǒu jī zhào le yī zhāng xiàng piàn","translation_ja":"私は携帯で写真を一枚撮りました"},{"hanzi":"這盞燈可以照得很亮","pinyin":"zhè zhǎn dēng kě yǐ zhào de hěn liàng","translation_ja":"このランプはとても明るく照らすことができます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',40,'照相機','zhào xiàng jī','カメラ','[{"hanzi":"我買了一台新的照相機","pinyin":"wǒ mǎi le yī tái xīn de zhào xiàng jī","translation_ja":"私は新しいカメラを買いました"},{"hanzi":"他的照相機很專業","pinyin":"tā de zhào xiàng jī hěn zhuān yè","translation_ja":"彼のカメラはとてもプロフェッショナルです"},{"hanzi":"這部照相機很好用","pinyin":"zhè bù zhào xiàng jī hěn hǎo yòng","translation_ja":"このカメラはとても使いやすいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',41,'相片/照片','xiàng piàn / zhào piàn','写真','[{"hanzi":"這是我家的照片","pinyin":"zhè shì wǒ jiā de zhào piàn","translation_ja":"これは私の家族の写真です"},{"hanzi":"我很喜歡這張相片","pinyin":"wǒ hěn xǐ huān zhè zhāng xiàng piàn","translation_ja":"私はこの写真がとても好きです"},{"hanzi":"這些照片都是他拍的","pinyin":"zhè xiē zhào piàn dōu shì tā pāi de","translation_ja":"これらの写真はすべて彼が撮りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',42,'心情','xīn qíng','気持ち','[{"hanzi":"今天我的心情很好","pinyin":"jīn tiān wǒ de xīn qíng hěn hǎo","translation_ja":"今日はとても気分が良いです"},{"hanzi":"他因為考試沒考好，心情很不好","pinyin":"tā yīn wèi kǎo shì méi kǎo hǎo xīn qíng hěn bù hǎo","translation_ja":"彼は試験がうまくいかなかったので、気分が悪いです"},{"hanzi":"心情不好時，可以出去走走","pinyin":"xīn qíng bù hǎo shí kě yǐ chū qù zǒu zǒu","translation_ja":"気分が悪い時は外に出て散歩すると良いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',43,'出去','chū qù','出かける','[{"hanzi":"他每天早上七點出去跑步","pinyin":"tā měi tiān zǎo shàng qī diǎn chū qù pǎo bù","translation_ja":"彼は毎朝7時にジョギングに出かけます"},{"hanzi":"我們下午一起出去玩吧","pinyin":"wǒ men xià wǔ yī qǐ chū qù wán ba","translation_ja":"午後一緒に遊びに行きましょう"},{"hanzi":"她剛剛出去買東西了","pinyin":"tā gāng gāng chū qù mǎi dōng xī le","translation_ja":"彼女はさっき買い物に出かけました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson11',44,'機會','jī huì','チャンス','[{"hanzi":"這是一個很好的學習機會","pinyin":"zhè shì yī gè hěn hǎo de xué xí jī huì","translation_ja":"これはとても良い学習の機会です"},{"hanzi":"如果有機會，我想去台灣旅行","pinyin":"rú guǒ yǒu jī huì wǒ xiǎng qù tái wān lǚ xíng","translation_ja":"機会があれば台湾旅行に行きたいです"},{"hanzi":"他抓住了這次機會，表現得很好","pinyin":"tā zhuā zhù le zhè cì jī huì biǎo xiàn de hěn hǎo","translation_ja":"彼はこの機会を掴んで、とても良い結果を出しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',1,'工作','gōng zuò','仕事','[{"hanzi":"他每天都去公司工作","pinyin":"tā měi tiān dōu qù gōng sī gōng zuò","translation_ja":"彼は毎日会社に行って仕事をします"},{"hanzi":"你喜歡現在的工作嗎","pinyin":"nǐ xǐ huān xiàn zài de gōng zuò ma","translation_ja":"あなたは今の仕事が好きですか"},{"hanzi":"找到適合的工作很重要","pinyin":"zhǎo dào shì hé de gōng zuò hěn zhòng yào","translation_ja":"自分に合う仕事を見つけることはとても重要です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',2,'怎麼','zěn me','どう','[{"hanzi":"這個字怎麼讀","pinyin":"zhè ge zì zěn me dú","translation_ja":"この字はどう読みますか"},{"hanzi":"你怎麼來學校的","pinyin":"nǐ zěn me lái xué xiào de","translation_ja":"あなたはどうやって学校に来ましたか"},{"hanzi":"這裡的咖啡怎麼這麼便宜","pinyin":"zhè lǐ de kā fēi zěn me zhè me pián yi","translation_ja":"ここのコーヒーはどうしてこんなに安いのですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',3,'參加','cān jiā','参加する','[{"hanzi":"我參加了昨天的會議","pinyin":"wǒ cān jiā le zuó tiān de huì yì","translation_ja":"私は昨日の会議に参加しました"},{"hanzi":"你想參加這個活動嗎","pinyin":"nǐ xiǎng cān jiā zhè ge huó dòng ma","translation_ja":"あなたはこのイベントに参加したいですか"},{"hanzi":"他經常參加社團活動","pinyin":"tā jīng cháng cān jiā shè tuán huó dòng","translation_ja":"彼はよくクラブ活動に参加します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',4,'當','dāng','～になる','[{"hanzi":"他以後想當老師","pinyin":"tā yǐ hòu xiǎng dāng lǎo shī","translation_ja":"彼は将来先生になりたいです"},{"hanzi":"我姐姐當護士","pinyin":"wǒ jiě jie dāng hù shì","translation_ja":"私の姉は看護師をしています"},{"hanzi":"你想當什麼工作","pinyin":"nǐ xiǎng dāng shén me gōng zuò","translation_ja":"あなたは何の仕事をしたいですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',5,'護理師/護士','hù lǐ shī / hù shì','看護師','[{"hanzi":"她是醫院的護士","pinyin":"tā shì yī yuàn de hù shì","translation_ja":"彼女は病院の看護師です"},{"hanzi":"護理師的工作很辛苦","pinyin":"hù lǐ shī de gōng zuò hěn xīn kǔ","translation_ja":"看護師の仕事はとても大変です"},{"hanzi":"我想當一名護士","pinyin":"wǒ xiǎng dāng yī míng hù shì","translation_ja":"私は看護師になりたいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',6,'用','yòng','使う','[{"hanzi":"請用這支筆寫字","pinyin":"qǐng yòng zhè zhī bǐ xiě zì","translation_ja":"このペンを使って字を書いてください"},{"hanzi":"他用手機拍了很多照片","pinyin":"tā yòng shǒu jī pāi le hěn duō zhào piàn","translation_ja":"彼は携帯でたくさんの写真を撮りました"},{"hanzi":"你知道怎麼用這個嗎","pinyin":"nǐ zhī dào zěn me yòng zhè ge ma","translation_ja":"あなたはこれをどう使うか知っていますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',7,'記者','jì zhě','記者','[{"hanzi":"他是一名新聞記者","pinyin":"tā shì yī míng xīn wén jì zhě","translation_ja":"彼は新聞記者です"},{"hanzi":"我想當一位記者","pinyin":"wǒ xiǎng dāng yī wèi jì zhě","translation_ja":"私は記者になりたいです"},{"hanzi":"記者的工作需要很多時間","pinyin":"jì zhě de gōng zuò xū yào hěn duō shí jiān","translation_ja":"記者の仕事は多くの時間を必要とします"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',8,'銀行','yín háng','銀行','[{"hanzi":"我在銀行工作","pinyin":"wǒ zài yín háng gōng zuò","translation_ja":"私は銀行で働いています"},{"hanzi":"你知道銀行幾點關門嗎","pinyin":"nǐ zhī dào yín háng jǐ diǎn guān mén ma","translation_ja":"銀行は何時に閉まるか知っていますか"},{"hanzi":"我們家附近有一家銀行","pinyin":"wǒ men jiā fù jìn yǒu yī jiā yín háng","translation_ja":"私たちの家の近くに銀行があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',9,'畢業','bì yè','卒業する','[{"hanzi":"他去年從大學畢業","pinyin":"tā qù nián cóng dà xué bì yè","translation_ja":"彼は去年大学を卒業しました"},{"hanzi":"畢業以後你打算做什麼","pinyin":"bì yè yǐ hòu nǐ dǎ suàn zuò shén me","translation_ja":"卒業後、何をする予定ですか"},{"hanzi":"我快要畢業了","pinyin":"wǒ kuài yào bì yè le","translation_ja":"私はもうすぐ卒業します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',10,'以後','yǐ hòu','以後','[{"hanzi":"他以後想去國外工作","pinyin":"tā yǐ hòu xiǎng qù guó wài gōng zuò","translation_ja":"彼は将来海外で働きたいです"},{"hanzi":"請以後不要再遲到","pinyin":"qǐng yǐ hòu bú yào zài chí dào","translation_ja":"今後遅刻しないでください"},{"hanzi":"畢業以後你有什麼打算","pinyin":"bì yè yǐ hòu nǐ yǒu shén me dǎ suàn","translation_ja":"卒業後の予定は何ですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',11,'以前','yǐ qián','以前','[{"hanzi":"我以前住在台北","pinyin":"wǒ yǐ qián zhù zài tái běi","translation_ja":"私は以前台北に住んでいました"},{"hanzi":"他以前是老師","pinyin":"tā yǐ qián shì lǎo shī","translation_ja":"彼は以前先生でした"},{"hanzi":"這裡以前是個小村子","pinyin":"zhè lǐ yǐ qián shì ge xiǎo cūn zi","translation_ja":"ここは以前小さな村でした"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',12,'公司','gōng sī','会社','[{"hanzi":"他在一家大公司上班","pinyin":"tā zài yī jiā dà gōng sī shàng bān","translation_ja":"彼は大きな会社で働いています"},{"hanzi":"你知道這家公司的名字嗎","pinyin":"nǐ zhī dào zhè jiā gōng sī de míng zi ma","translation_ja":"この会社の名前を知っていますか"},{"hanzi":"公司有很多重要的事情要做","pinyin":"gōng sī yǒu hěn duō zhòng yào de shì qíng yào zuò","translation_ja":"会社にはたくさんの重要なことがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',13,'老闆/老板','lǎo bǎn','社長、店長','[{"hanzi":"我的老闆對我很好","pinyin":"wǒ de lǎo bǎn duì wǒ hěn hǎo","translation_ja":"私の社長は私にとても優しいです"},{"hanzi":"老闆今天不在公司","pinyin":"lǎo bǎn jīn tiān bú zài gōng sī","translation_ja":"社長は今日会社にいません"},{"hanzi":"這家店的老闆很有名","pinyin":"zhè jiā diàn de lǎo bǎn hěn yǒu míng","translation_ja":"このお店の店長はとても有名です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',14,'事(情)','shì (qíng)','事、用事','[{"hanzi":"我有一些重要的事情要處理","pinyin":"wǒ yǒu yī xiē zhòng yào de shì qíng yào chǔ lǐ","translation_ja":"私には処理すべき重要な用事があります"},{"hanzi":"你有什麼事情需要幫忙嗎","pinyin":"nǐ yǒu shén me shì qíng xū yào bāng máng ma","translation_ja":"何か手伝いが必要なことがありますか"},{"hanzi":"每天都有很多事情要做","pinyin":"měi tiān dōu yǒu hěn duō shì qíng yào zuò","translation_ja":"毎日やるべきことがたくさんあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',15,'準時','zhǔn shí','時間通りに','[{"hanzi":"請準時到教室","pinyin":"qǐng zhǔn shí dào jiào shì","translation_ja":"時間通りに教室に来てください"},{"hanzi":"他每天準時上班","pinyin":"tā měi tiān zhǔn shí shàng bān","translation_ja":"彼は毎日時間通りに出勤します"},{"hanzi":"火車準時出發了","pinyin":"huǒ chē zhǔn shí chū fā le","translation_ja":"列車は時間通りに出発しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',16,'上班','shàng bān','出勤する','[{"hanzi":"我早上八點上班","pinyin":"wǒ zǎo shàng bā diǎn shàng bān","translation_ja":"私は朝8時に出勤します"},{"hanzi":"他今天不上班","pinyin":"tā jīn tiān bú shàng bān","translation_ja":"彼は今日出勤しません"},{"hanzi":"你什麼時候開始上班","pinyin":"nǐ shén me shí hòu kāi shǐ shàng bān","translation_ja":"あなたはいつから仕事を始めますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',17,'下班','xià bān','退勤する','[{"hanzi":"他每天六點下班","pinyin":"tā měi tiān liù diǎn xià bān","translation_ja":"彼は毎日6時に退勤します"},{"hanzi":"我下班以後想去運動","pinyin":"wǒ xià bān yǐ hòu xiǎng qù yùn dòng","translation_ja":"退勤後に運動したいです"},{"hanzi":"今天我很晚下班","pinyin":"jīn tiān wǒ hěn wǎn xià bān","translation_ja":"今日は退勤がとても遅かったです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',18,'麵包','miàn bāo','パン','[{"hanzi":"我早上吃了麵包","pinyin":"wǒ zǎo shàng chī le miàn bāo","translation_ja":"私は朝にパンを食べました"},{"hanzi":"這家店的麵包很好吃","pinyin":"zhè jiā diàn de miàn bāo hěn hǎo chī","translation_ja":"このお店のパンはとてもおいしいです"},{"hanzi":"你喜歡吃什麼口味的麵包","pinyin":"nǐ xǐ huān chī shén me kǒu wèi de miàn bāo","translation_ja":"どんな味のパンが好きですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',19,'辛苦','xīn kǔ','大変、苦労する','[{"hanzi":"他每天工作很辛苦","pinyin":"tā měi tiān gōng zuò hěn xīn kǔ","translation_ja":"彼は毎日とても大変な仕事をしています"},{"hanzi":"學中文不容易，但也不太辛苦","pinyin":"xué zhōng wén bù róng yì, dàn yě bù tài xīn kǔ","translation_ja":"中国語を学ぶのは簡単ではありませんが、それほど大変でもありません"},{"hanzi":"辛苦了，休息一下吧","pinyin":"xīn kǔ le, xiū xí yī xià ba","translation_ja":"お疲れ様です、少し休んでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',20,'而且','ér qiě','さらに、しかも','[{"hanzi":"他很聰明，而且很用功","pinyin":"tā hěn cōng míng, ér qiě hěn yòng gōng","translation_ja":"彼はとても賢く、しかも努力家です"},{"hanzi":"這個地方風景很美，而且很安靜","pinyin":"zhè ge dì fāng fēng jǐng hěn měi, ér qiě hěn ān jìng","translation_ja":"この場所は景色がきれいで、しかも静かです"},{"hanzi":"我覺得中文很有趣，而且很實用","pinyin":"wǒ jué de zhōng wén hěn yǒu qù, ér qiě hěn shí yòng","translation_ja":"私は中国語がとても面白く、しかも実用的だと思います"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',21,'同事','tóng shì','同僚','[{"hanzi":"我的同事都很友好","pinyin":"wǒ de tóng shì dōu hěn yǒu hǎo","translation_ja":"私の同僚はみんな親切です"},{"hanzi":"他和同事一起吃午餐","pinyin":"tā hé tóng shì yī qǐ chī wǔ cān","translation_ja":"彼は同僚と一緒に昼食を食べます"},{"hanzi":"你和同事相處得怎麼樣","pinyin":"nǐ hé tóng shì xiāng chǔ de zěn me yàng","translation_ja":"あなたは同僚とうまくやっていますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',22,'對','duì','～に対して','[{"hanzi":"他對這份工作很有興趣","pinyin":"tā duì zhè fèn gōng zuò hěn yǒu xìng qù","translation_ja":"彼はこの仕事にとても興味があります"},{"hanzi":"我對中文的文法不太了解","pinyin":"wǒ duì zhōng wén de wén fǎ bú tài liǎo jiě","translation_ja":"私は中国語の文法をあまり理解していません"},{"hanzi":"你對這件事怎麼看","pinyin":"nǐ duì zhè jiàn shì zěn me kàn","translation_ja":"あなたはこの件をどう思いますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',23,'成績','chéng jì','成績','[{"hanzi":"他的成績非常好","pinyin":"tā de chéng jì fēi cháng hǎo","translation_ja":"彼の成績は非常に良いです"},{"hanzi":"期末考試的成績什麼時候出來","pinyin":"qī mò kǎo shì de chéng jì shén me shí hòu chū lái","translation_ja":"期末試験の成績はいつ発表されますか"},{"hanzi":"學校的活動也會影響成績","pinyin":"xué xiào de huó dòng yě huì yǐng xiǎng chéng jì","translation_ja":"学校の活動も成績に影響します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',24,'過','guò','過ぎる、経験する','[{"hanzi":"我以前去過日本","pinyin":"wǒ yǐ qián qù guò rì běn","translation_ja":"私は以前日本に行ったことがあります"},{"hanzi":"時間過得真快","pinyin":"shí jiān guò de zhēn kuài","translation_ja":"時間が本当に早く過ぎます"},{"hanzi":"他沒過這種生活","pinyin":"tā méi guò zhè zhǒng shēng huó","translation_ja":"彼はこのような生活を経験したことがありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',25,'夠','gòu','十分、足りる','[{"hanzi":"我帶的錢夠用嗎","pinyin":"wǒ dài de qián gòu yòng ma","translation_ja":"持っているお金は足りますか"},{"hanzi":"今天的時間不夠","pinyin":"jīn tiān de shí jiān bú gòu","translation_ja":"今日の時間が足りません"},{"hanzi":"我覺得這些東西已經夠了","pinyin":"wǒ jué de zhè xiē dōng xi yǐ jīng gòu le","translation_ja":"私はこれらのものはすでに十分だと思います"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',26,'遲到','chí dào','遅刻する','[{"hanzi":"今天我又遲到了","pinyin":"jīn tiān wǒ yòu chí dào le","translation_ja":"今日また遅刻しました"},{"hanzi":"他上課常常遲到","pinyin":"tā shàng kè cháng cháng chí dào","translation_ja":"彼は授業にしょっちゅう遅刻します"},{"hanzi":"遲到會影響你的成績","pinyin":"chí dào huì yǐng xiǎng nǐ de chéng jì","translation_ja":"遅刻すると成績に影響します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',27,'準備','zhǔn bèi','準備する','[{"hanzi":"他正在準備期末考試","pinyin":"tā zhèng zài zhǔn bèi qī mò kǎo shì","translation_ja":"彼は期末試験の準備をしています"},{"hanzi":"我準備了很多資料","pinyin":"wǒ zhǔn bèi le hěn duō zī liào","translation_ja":"私はたくさんの資料を準備しました"},{"hanzi":"你準備好旅行的行李了嗎","pinyin":"nǐ zhǔn bèi hǎo lǚ xíng de xíng lǐ le ma","translation_ja":"旅行の荷物の準備はできましたか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',28,'小時/鐘頭','xiǎo shí / zhōng tóu','時間','[{"hanzi":"我每天學中文兩個小時","pinyin":"wǒ měi tiān xué zhōng wén liǎng gè xiǎo shí","translation_ja":"私は毎日中国語を2時間勉強します"},{"hanzi":"他等了我三個鐘頭","pinyin":"tā děng le wǒ sān gè zhōng tóu","translation_ja":"彼は私を3時間待っていました"},{"hanzi":"這本書要花幾個小時才能看完","pinyin":"zhè běn shū yào huā jǐ gè xiǎo shí cái néng kàn wán","translation_ja":"この本を読み終えるのに何時間かかりますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',29,'分鐘','fēn zhōng','分','[{"hanzi":"我們還有五分鐘就到學校了","pinyin":"wǒ men hái yǒu wǔ fēn zhōng jiù dào xué xiào le","translation_ja":"私たちはあと5分で学校に着きます"},{"hanzi":"電影還有十分鐘就開始了","pinyin":"diàn yǐng hái yǒu shí fēn zhōng jiù kāi shǐ le","translation_ja":"映画はあと10分で始まります"},{"hanzi":"休息十分鐘再開始工作吧","pinyin":"xiū xí shí fēn zhōng zài kāi shǐ gōng zuò ba","translation_ja":"10分休んでから仕事を始めましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',30,'節目','jié mù','番組','[{"hanzi":"我喜歡看這個節目","pinyin":"wǒ xǐ huān kàn zhè ge jié mù","translation_ja":"私はこの番組を見るのが好きです"},{"hanzi":"這個節目的內容很有趣","pinyin":"zhè ge jié mù de nèi róng hěn yǒu qù","translation_ja":"この番組の内容はとても面白いです"},{"hanzi":"你昨天看了什麼節目","pinyin":"nǐ zuó tiān kàn le shén me jié mù","translation_ja":"昨日何の番組を見ましたか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',31,'父母','fù mǔ','両親','[{"hanzi":"我的父母很支持我的決定","pinyin":"wǒ de fù mǔ hěn zhī chí wǒ de jué dìng","translation_ja":"私の両親は私の決定をとても応援しています"},{"hanzi":"他和父母住在一起","pinyin":"tā hé fù mǔ zhù zài yī qǐ","translation_ja":"彼は両親と一緒に住んでいます"},{"hanzi":"父母常常問我的學習情況","pinyin":"fù mǔ cháng cháng wèn wǒ de xué xí qíng kuàng","translation_ja":"両親はよく私の学習状況を尋ねます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',32,'父親','fù qīn','父','[{"hanzi":"我的父親是一名醫生","pinyin":"wǒ de fù qīn shì yī míng yī shēng","translation_ja":"私の父は医者です"},{"hanzi":"父親每天很早起床","pinyin":"fù qīn měi tiān hěn zǎo qǐ chuáng","translation_ja":"父は毎日早く起きます"},{"hanzi":"他父親對他很嚴格","pinyin":"tā fù qīn duì tā hěn yán gé","translation_ja":"彼の父は彼にとても厳しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',33,'母親','mǔ qīn','母','[{"hanzi":"我的母親很喜歡做飯","pinyin":"wǒ de mǔ qīn hěn xǐ huān zuò fàn","translation_ja":"私の母は料理をするのが好きです"},{"hanzi":"母親在家照顧我們的生活","pinyin":"mǔ qīn zài jiā zhào gù wǒ men de shēng huó","translation_ja":"母は家で私たちの生活の面倒を見ています"},{"hanzi":"他母親身體健康","pinyin":"tā mǔ qīn shēn tǐ jiàn kāng","translation_ja":"彼の母は健康です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',34,'兒子','ér zi','息子','[{"hanzi":"他有一個可愛的兒子","pinyin":"tā yǒu yī ge kě ài de ér zi","translation_ja":"彼にはかわいい息子がいます"},{"hanzi":"我的兒子很喜歡運動","pinyin":"wǒ de ér zi hěn xǐ huān yùn dòng","translation_ja":"私の息子はスポーツが大好きです"},{"hanzi":"他兒子的成績很好","pinyin":"tā ér zi de chéng jì hěn hǎo","translation_ja":"彼の息子の成績はとても良いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',35,'女兒','nǚ ér','娘','[{"hanzi":"她有兩個女兒","pinyin":"tā yǒu liǎng ge nǚ ér","translation_ja":"彼女には娘が2人います"},{"hanzi":"我的女兒喜歡畫畫","pinyin":"wǒ de nǚ ér xǐ huān huà huà","translation_ja":"私の娘は絵を描くのが好きです"},{"hanzi":"他女兒今年上小學了","pinyin":"tā nǚ ér jīn nián shàng xiǎo xué le","translation_ja":"彼の娘は今年小学校に入りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',36,'談','tán','話す','[{"hanzi":"我們談了一個小時","pinyin":"wǒ men tán le yī ge xiǎo shí","translation_ja":"私たちは1時間話しました"},{"hanzi":"他喜歡跟朋友談音樂","pinyin":"tā xǐ huān gēn péng yǒu tán yīn yuè","translation_ja":"彼は友達と音楽について話すのが好きです"},{"hanzi":"你想談什麼話題","pinyin":"nǐ xiǎng tán shén me huà tí","translation_ja":"何について話したいですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',37,'談話','tán huà','会話する','[{"hanzi":"老師跟學生談話了","pinyin":"lǎo shī gēn xué shēng tán huà le","translation_ja":"先生は学生と会話しました"},{"hanzi":"他們正在談話","pinyin":"tā men zhèng zài tán huà","translation_ja":"彼らは会話中です"},{"hanzi":"這次的談話很有意義","pinyin":"zhè cì de tán huà hěn yǒu yì yì","translation_ja":"今回の会話はとても意義がありました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',38,'自己','zì jǐ','自分','[{"hanzi":"我想自己做這件事","pinyin":"wǒ xiǎng zì jǐ zuò zhè jiàn shì","translation_ja":"私は自分でこの事をやりたいです"},{"hanzi":"他喜歡自己解決問題","pinyin":"tā xǐ huān zì jǐ jiě jué wèn tí","translation_ja":"彼は自分で問題を解決するのが好きです"},{"hanzi":"你要對自己有信心","pinyin":"nǐ yào duì zì jǐ yǒu xìn xīn","translation_ja":"自分に自信を持ってください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',39,'結婚','jié hūn','結婚する','[{"hanzi":"他們去年結婚了","pinyin":"tā men qù nián jié hūn le","translation_ja":"彼らは昨年結婚しました"},{"hanzi":"你什麼時候打算結婚","pinyin":"nǐ shén me shí hòu dǎ suàn jié hūn","translation_ja":"あなたはいつ結婚する予定ですか"},{"hanzi":"結婚是一件重要的事","pinyin":"jié hūn shì yī jiàn zhòng yào de shì","translation_ja":"結婚は重要なことです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',40,'重要','zhòng yào','重要','[{"hanzi":"這是一個很重要的決定","pinyin":"zhè shì yī ge hěn zhòng yào de jué dìng","translation_ja":"これはとても重要な決定です"},{"hanzi":"學好中文很重要","pinyin":"xué hǎo zhōng wén hěn zhòng yào","translation_ja":"中国語をしっかり学ぶことは重要です"},{"hanzi":"健康比什麼都重要","pinyin":"jiàn kāng bǐ shén me dōu zhòng yào","translation_ja":"健康は何よりも重要です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',41,'冷氣(機)','lěng qì (jī)','エアコン','[{"hanzi":"房間裡的冷氣壞了","pinyin":"fáng jiān lǐ de lěng qì huài le","translation_ja":"部屋のエアコンが壊れました"},{"hanzi":"夏天開冷氣很舒服","pinyin":"xià tiān kāi lěng qì hěn shū fú","translation_ja":"夏はエアコンをつけると快適です"},{"hanzi":"這台冷氣機很省電","pinyin":"zhè tái lěng qì jī hěn shěng diàn","translation_ja":"このエアコンは省エネです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',42,'辦公室','bàn gōng shì','オフィス','[{"hanzi":"老闆現在在辦公室嗎","pinyin":"lǎo bǎn xiàn zài zài bàn gōng shì ma","translation_ja":"社長は今オフィスにいますか"},{"hanzi":"這是我們公司的辦公室","pinyin":"zhè shì wǒ men gōng sī de bàn gōng shì","translation_ja":"これは私たちの会社のオフィスです"},{"hanzi":"辦公室裡的環境很好","pinyin":"bàn gōng shì lǐ de huán jìng hěn hǎo","translation_ja":"オフィスの環境はとても良いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',43,'還','hái','まだ','[{"hanzi":"我還在學中文","pinyin":"wǒ hái zài xué zhōng wén","translation_ja":"私はまだ中国語を学んでいます"},{"hanzi":"他還沒回家","pinyin":"tā hái méi huí jiā","translation_ja":"彼はまだ家に帰っていません"},{"hanzi":"還需要一點時間","pinyin":"hái xū yào yī diǎn shí jiān","translation_ja":"まだ少し時間が必要です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',44,'工廠','gōng chǎng','工場','[{"hanzi":"這是我們公司的工廠","pinyin":"zhè shì wǒ men gōng sī de gōng chǎng","translation_ja":"これは私たちの会社の工場です"},{"hanzi":"工廠的工作很辛苦","pinyin":"gōng chǎng de gōng zuò hěn xīn kǔ","translation_ja":"工場の仕事はとても大変です"},{"hanzi":"他每天早上到工廠上班","pinyin":"tā měi tiān zǎo shàng dào gōng chǎng shàng bān","translation_ja":"彼は毎朝工場に出勤します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson12',45,'工人','gōng rén','工場労働者','[{"hanzi":"工廠裡有很多工人","pinyin":"gōng chǎng lǐ yǒu hěn duō gōng rén","translation_ja":"工場には多くの労働者がいます"},{"hanzi":"他是一名工人","pinyin":"tā shì yī míng gōng rén","translation_ja":"彼は労働者です"},{"hanzi":"工人的工作很辛苦","pinyin":"gōng rén de gōng zuò hěn xīn kǔ","translation_ja":"労働者の仕事はとても大変です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',1,'喂','wéi','もしもし','[{"hanzi":"喂，你好，請問這是王先生的電話嗎？","pinyin":"wéi nǐ hǎo qǐng wèn zhè shì wáng xiān shēng de diàn huà ma","translation_ja":"もしもし、王さんの電話でしょうか"},{"hanzi":"喂，我現在很忙，有什麼事嗎？","pinyin":"wéi wǒ xiàn zài hěn máng yǒu shén me shì ma","translation_ja":"もしもし、今忙しいのですが、どうしましたか"},{"hanzi":"喂，我打錯電話了，真不好意思","pinyin":"wéi wǒ dǎ cuò diàn huà le zhēn bù hǎo yì si","translation_ja":"もしもし、電話を間違えました、すみません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',2,'電子郵件','diàn zǐ yóu jiàn','電子メール','[{"hanzi":"我已經收到你的電子郵件了，謝謝","pinyin":"wǒ yǐ jīng shōu dào nǐ de diàn zǐ yóu jiàn le xiè xiè","translation_ja":"あなたの電子メールを受け取りました、ありがとう"},{"hanzi":"請你把電子郵件發給我，好嗎？","pinyin":"qǐng nǐ bǎ diàn zǐ yóu jiàn fā gěi wǒ hǎo ma","translation_ja":"電子メールを送ってもらえますか"},{"hanzi":"電子郵件裡的圖片很漂亮，我很喜歡","pinyin":"diàn zǐ yóu jiàn lǐ de tú piàn hěn piào liàng wǒ hěn xǐ huan","translation_ja":"メールの中の写真がとてもきれいで気に入りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',3,'郵件','yóu jiàn','郵便/手紙','[{"hanzi":"我今天收到了一封來自朋友的郵件","pinyin":"wǒ jīn tiān shōu dào le yī fēng lái zì péng yǒu de yóu jiàn","translation_ja":"今日、友達からの手紙を受け取りました"},{"hanzi":"這封郵件裡附有一張漂亮的明信片","pinyin":"zhè fēng yóu jiàn lǐ fù yǒu yī zhāng piào liàng de míng xìn piàn","translation_ja":"この手紙にはきれいな絵葉書が同封されていました"},{"hanzi":"郵局說你的郵件明天就會到達","pinyin":"yóu jú shuō nǐ de yóu jiàn míng tiān jiù huì dào dá","translation_ja":"郵便局によると、あなたの郵便は明日届くそうです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',4,'剛剛','gāng gāng','たった今','[{"hanzi":"我剛剛吃完飯，還不太餓","pinyin":"wǒ gāng gāng chī wán fàn hái bù tài è","translation_ja":"たった今食事を終えたので、まだあまりお腹が空いていません"},{"hanzi":"剛剛下雨了，現在天氣變涼了","pinyin":"gāng gāng xià yǔ le xiàn zài tiān qì biàn liáng le","translation_ja":"たった今雨が降って、今は涼しくなりました"},{"hanzi":"我剛剛看到他從這裡走過去","pinyin":"wǒ gāng gāng kàn dào tā cóng zhè lǐ zǒu guò qù","translation_ja":"たった今彼がここを通り過ぎたのを見ました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',5,'博物館','bó wù guǎn','博物館','[{"hanzi":"我們今天下午要去博物館參觀特別展覽","pinyin":"wǒ men jīn tiān xià wǔ yào qù bó wù guǎn cān guān tè bié zhǎn lǎn","translation_ja":"今日の午後、博物館で特別展を見学します"},{"hanzi":"這個博物館的歷史展覽很有意思","pinyin":"zhè ge bó wù guǎn de lì shǐ zhǎn lǎn hěn yǒu yì si","translation_ja":"この博物館の歴史展はとても面白いです"},{"hanzi":"我第一次參觀這個博物館，覺得很新奇","pinyin":"wǒ dì yī cì cān guān zhè ge bó wù guǎn jué de hěn xīn qí","translation_ja":"初めてこの博物館を訪れ、とても新鮮に感じました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',6,'網址','wǎng zhǐ','URL','[{"hanzi":"這個網站的網址是多少？","pinyin":"zhè ge wǎng zhǐ de wǎng zhǐ shì duō shǎo","translation_ja":"このウェブサイトのURLは何ですか"},{"hanzi":"請你把網址寄給我，好嗎？","pinyin":"qǐng nǐ bǎ wǎng zhǐ jì gěi wǒ hǎo ma","translation_ja":"URLを送っていただけますか"},{"hanzi":"這個網址好像無法打開","pinyin":"zhè ge wǎng zhǐ hǎo xiàng wú fǎ dǎ kāi","translation_ja":"このURLは開けないみたいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',7,'帶','dài','持つ/連れる','[{"hanzi":"我帶了一本書來圖書館看","pinyin":"wǒ dài le yī běn shū lái tú shū guǎn kàn","translation_ja":"図書館に本を1冊持ってきました"},{"hanzi":"明天我要帶朋友來參觀學校","pinyin":"míng tiān wǒ yào dài péng yǒu lái cān guān xué xiào","translation_ja":"明日、友達を学校に連れてきます"},{"hanzi":"出門的時候別忘了帶雨傘","pinyin":"chū mén de shí hòu bié wàng le dài yǔ sǎn","translation_ja":"出かけるときは傘を持っていくのを忘れないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',8,'參觀','cān guān','見学する','[{"hanzi":"我們今天參觀了市中心的博物館","pinyin":"wǒ men jīn tiān cān guān le shì zhōng xīn de bó wù guǎn","translation_ja":"今日、市中心の博物館を見学しました"},{"hanzi":"老師帶我們去參觀了大學校園","pinyin":"lǎo shī dài wǒ men qù cān guān le dà xué xiào yuán","translation_ja":"先生が大学のキャンパスを見学させてくれました"},{"hanzi":"明天有一個參觀工廠的活動","pinyin":"míng tiān yǒu yī ge cān guān gōng chǎng de huó dòng","translation_ja":"明日は工場見学のイベントがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',9,'網站','wǎng zhàn','ウェブサイト','[{"hanzi":"這個網站有很多有用的學習資源","pinyin":"zhè ge wǎng zhàn yǒu hěn duō yǒu yòng de xué xí zī yuán","translation_ja":"このウェブサイトにはたくさんの役に立つ学習リソースがあります"},{"hanzi":"他每天都會在網站上看新聞","pinyin":"tā měi tiān dōu huì zài wǎng zhàn shàng kàn xīn wén","translation_ja":"彼は毎日ウェブサイトでニュースを見ています"},{"hanzi":"這家公司的網站設計得很專業","pinyin":"zhè jiā gōng sī de wǎng zhàn shè jì de hěn zhuān yè","translation_ja":"この会社のウェブサイトは非常にプロフェッショナルに設計されています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',10,'地址','dì zhǐ','住所/アドレス','[{"hanzi":"你的地址是什麼？","pinyin":"nǐ de dì zhǐ shì shén me","translation_ja":"あなたの住所は何ですか"},{"hanzi":"請你把公司的地址寫在這裡","pinyin":"qǐng nǐ bǎ gōng sī de dì zhǐ xiě zài zhè lǐ","translation_ja":"会社の住所をここに書いてください"},{"hanzi":"這裡是我家的地址，很方便找","pinyin":"zhè lǐ shì wǒ jiā de dì zhǐ hěn fāng biàn zhǎo","translation_ja":"ここが私の家の住所です、簡単に見つけられます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',11,'往','wǎng','～へ向かう','[{"hanzi":"往右走，你會看到一家超市","pinyin":"wǎng yòu zǒu nǐ huì kàn dào yī jiā chāo shì","translation_ja":"右に歩いていくと、スーパーが見えます"},{"hanzi":"他往學校的方向跑去","pinyin":"tā wǎng xué xiào de fāng xiàng pǎo qù","translation_ja":"彼は学校の方向に向かって走っていきました"},{"hanzi":"往前看，你會看到一座大山","pinyin":"wǎng qián kàn nǐ huì kàn dào yī zuò dà shān","translation_ja":"前を見てみると、大きな山が見えます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',12,'右(邊)','yòu (biān)','右(側)','[{"hanzi":"我家在學校的右邊","pinyin":"wǒ jiā zài xué xiào de yòu biān","translation_ja":"私の家は学校の右側にあります"},{"hanzi":"往右邊走就是公園","pinyin":"wǎng yòu biān zǒu jiù shì gōng yuán","translation_ja":"右側に進むと公園があります"},{"hanzi":"右邊的商店賣很多新鮮水果","pinyin":"yòu biān de shāng diàn mài hěn duō xīn xiān shuǐ guǒ","translation_ja":"右側のお店では新鮮な果物がたくさん売られています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',13,'左(邊)','zuǒ (biān)','左(側)','[{"hanzi":"左邊那棟樓是圖書館","pinyin":"zuǒ biān nà dòng lóu shì tú shū guǎn","translation_ja":"左側のあの建物は図書館です"},{"hanzi":"走到左邊會看到一條河流","pinyin":"zǒu dào zuǒ biān huì kàn dào yī tiáo hé liú","translation_ja":"左側に行くと川が見えます"},{"hanzi":"左邊的座位是我的，請不要坐錯","pinyin":"zuǒ biān de zuò wèi shì wǒ de qǐng bù yào zuò cuò","translation_ja":"左側の席は私のなので、間違えないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',14,'轉','zhuǎn','曲がる','[{"hanzi":"到前面十字路口左轉就是車站","pinyin":"dào qián miàn shí zì lù kǒu zuǒ zhuǎn jiù shì chē zhàn","translation_ja":"前の交差点を左に曲がると駅があります"},{"hanzi":"請你右轉後直走五十公尺","pinyin":"qǐng nǐ yòu zhuǎn hòu zhí zǒu wǔ shí gōng mǐ","translation_ja":"右に曲がってから50メートルまっすぐ進んでください"},{"hanzi":"那輛車剛剛轉彎了，看不到了","pinyin":"nà liàng chē gāng gāng zhuǎn wān le kàn bú dào le","translation_ja":"あの車はたった今曲がって、見えなくなりました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',15,'門口','mén kǒu','入口/ドア口','[{"hanzi":"他在門口等你，快點過來吧","pinyin":"tā zài mén kǒu děng nǐ kuài diǎn guò lái ba","translation_ja":"彼が入口であなたを待っています、早く来てください"},{"hanzi":"超市的門口有一個很大的廣告牌","pinyin":"chāo shì de mén kǒu yǒu yī ge hěn dà de guǎng gào pái","translation_ja":"スーパーの入口に大きな看板があります"},{"hanzi":"門口有一隻小狗在睡覺，好可愛","pinyin":"mén kǒu yǒu yī zhī xiǎo gǒu zài shuì jiào hǎo kě ài","translation_ja":"入口で子犬が寝ています、とてもかわいいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',16,'見','jiàn','見る/会う','[{"hanzi":"我剛剛在街上見到你的朋友了","pinyin":"wǒ gāng gāng zài jiē shàng jiàn dào nǐ de péng yǒu le","translation_ja":"たった今通りであなたの友達に会いました"},{"hanzi":"明天學校有活動，我們可以見到校長","pinyin":"míng tiān xué xiào yǒu huó dòng wǒ men kě yǐ jiàn dào xiào zhǎng","translation_ja":"明日、学校でイベントがあり校長に会えます"},{"hanzi":"我希望有一天能見到我喜歡的歌手","pinyin":"wǒ xī wàng yǒu yī tiān néng jiàn dào wǒ xǐ huan de gē shǒu","translation_ja":"いつか好きな歌手に会いたいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',17,'晚','wǎn','遅い/夜','[{"hanzi":"今天我回家太晚了，媽媽很擔心","pinyin":"jīn tiān wǒ huí jiā tài wǎn le mā ma hěn dān xīn","translation_ja":"今日は帰宅が遅くなり、母が心配しました"},{"hanzi":"太晚睡覺對身體不好，應該早點休息","pinyin":"tài wǎn shuì jiào duì shēn tǐ bù hǎo yīng gāi zǎo diǎn xiū xí","translation_ja":"夜更かしは体によくないので早めに休むべきです"},{"hanzi":"晚上的天氣很涼快，我們去散步吧","pinyin":"wǎn shàng de tiān qì hěn liáng kuài wǒ men qù sàn bù ba","translation_ja":"夜は涼しくて快適なので散歩に行きましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',18,'早','zǎo','早い/朝','[{"hanzi":"今天早上我很早就起床了","pinyin":"jīn tiān zǎo shàng wǒ hěn zǎo jiù qǐ chuáng le","translation_ja":"今朝はとても早く起きました"},{"hanzi":"明天的會議很早開始，我們得早點出門","pinyin":"míng tiān de huì yì hěn zǎo kāi shǐ wǒ men děi zǎo diǎn chū mén","translation_ja":"明日の会議は早く始まるので、早めに出発しないといけません"},{"hanzi":"他比我早到教室，已經在讀書了","pinyin":"tā bǐ wǒ zǎo dào jiào shì yǐ jīng zài dú shū le","translation_ja":"彼は私より早く教室に着いて、すでに勉強していました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',19,'不好意思','bù hǎo yì si','すみません','[{"hanzi":"不好意思，我來晚了","pinyin":"bù hǎo yì si wǒ lái wǎn le","translation_ja":"すみません、遅れました"},{"hanzi":"不好意思，請問廁所在哪裡？","pinyin":"bù hǎo yì si qǐng wèn cè suǒ zài nǎ lǐ","translation_ja":"すみません、お手洗いはどこですか"},{"hanzi":"不好意思，可以幫我一下嗎？","pinyin":"bù hǎo yì si kě yǐ bāng wǒ yī xià ma","translation_ja":"すみません、少し手伝っていただけますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',20,'就要','jiù yào','まもなく～する','[{"hanzi":"我就要去機場了，再見！","pinyin":"wǒ jiù yào qù jī chǎng le zài jiàn","translation_ja":"私はまもなく空港に向かいます、さようなら"},{"hanzi":"他們就要開始上課了，我們快進去吧","pinyin":"tā men jiù yào kāi shǐ shàng kè le wǒ men kuài jìn qù ba","translation_ja":"彼らはまもなく授業が始まるので、早く入りましょう"},{"hanzi":"這場比賽就要結束了，真精彩！","pinyin":"zhè chǎng bǐ sài jiù yào jié shù le zhēn jīng cǎi","translation_ja":"この試合はまもなく終わります、本当に素晴らしいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',21,'排隊','pái duì','並ぶ','[{"hanzi":"我們要排隊買票，別插隊","pinyin":"wǒ men yào pái duì mǎi piào bié chā duì","translation_ja":"切符を買うために並ばないといけません、割り込まないでください"},{"hanzi":"超市裡排隊的人很多，我們等一下再去吧","pinyin":"chāo shì lǐ pái duì de rén hěn duō wǒ men děng yī xià zài qù ba","translation_ja":"スーパーでは並んでいる人が多いので、少し待ってから行きましょう"},{"hanzi":"他們正在排隊參加活動，氣氛很熱鬧","pinyin":"tā men zhèng zài pái duì cān jiā huó dòng qì fèn hěn rè nào","translation_ja":"彼らはイベントに参加するために並んでいて、とても賑やかです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',22,'票','piào','切符/チケット','[{"hanzi":"我買了兩張電影票，今晚一起去吧！","pinyin":"wǒ mǎi le liǎng zhāng diàn yǐng piào jīn wǎn yī qǐ qù ba","translation_ja":"映画のチケットを2枚買ったので、今夜一緒に行きましょう"},{"hanzi":"這次的火車票好像比上次便宜","pinyin":"zhè cì de huǒ chē piào hǎo xiàng bǐ shàng cì pián yí","translation_ja":"今回の列車の切符は前回より安いみたいです"},{"hanzi":"請檢查一下票上的時間和座位號碼","pinyin":"qǐng jiǎn chá yī xià piào shàng de shí jiān hé zuò wèi hào mǎ","translation_ja":"チケットの時間と座席番号を確認してください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',23,'介紹','jiè shào','紹介する','[{"hanzi":"請你幫我介紹一下這裡的名勝古蹟","pinyin":"qǐng nǐ bāng wǒ jiè shào yī xià zhè lǐ de míng shèng gǔ jì","translation_ja":"ここにある名所旧跡を少し紹介してください"},{"hanzi":"他正在向新同學介紹學校的規則","pinyin":"tā zhèng zài xiàng xīn tóng xué jiè shào xué xiào de guī zé","translation_ja":"彼は新しいクラスメートに学校の規則を紹介しています"},{"hanzi":"我想要介紹一個好吃的餐廳給你","pinyin":"wǒ xiǎng yào jiè shào yī ge hǎo chī de cān tīng gěi nǐ","translation_ja":"あなたにおいしいレストランを紹介したいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',24,'進去','jìn qù','入る/入っていく','[{"hanzi":"你先進去，我馬上過來","pinyin":"nǐ xiān jìn qù wǒ mǎ shàng guò lái","translation_ja":"先に中に入ってください、すぐに行きます"},{"hanzi":"那家店不能隨便進去，要有預約","pinyin":"nà jiā diàn bù néng suí biàn jìn qù yào yǒu yù yuē","translation_ja":"そのお店は予約がないと簡単に入れません"},{"hanzi":"他們一看到我們，就立刻進去準備了","pinyin":"tā men yī kàn dào wǒ men jiù lì kè jìn qù zhǔn bèi le","translation_ja":"彼らは私たちを見かけるとすぐに中に入って準備しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',25,'進來','jìn lái','入る/入ってくる','[{"hanzi":"請你進來坐一下，我倒杯茶給你","pinyin":"qǐng nǐ jìn lái zuò yī xià wǒ dào bēi chá gěi nǐ","translation_ja":"中に入って少し座ってください、お茶を淹れます"},{"hanzi":"小狗聽到主人叫牠，馬上跑進來","pinyin":"xiǎo gǒu tīng dào zhǔ rén jiào tā mǎ shàng pǎo jìn lái","translation_ja":"子犬は飼い主の声を聞いてすぐに駆け込んできました"},{"hanzi":"這間教室很安靜，進來的時候請小聲一點","pinyin":"zhè jiān jiào shì hěn ān jìng jìn lái de shí hòu qǐng xiǎo shēng yī diǎn","translation_ja":"この教室はとても静かなので、入るときは静かにしてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',26,'安靜','ān jìng','静か','[{"hanzi":"這裡是圖書館，請保持安靜","pinyin":"zhè lǐ shì tú shū guǎn qǐng bǎo chí ān jìng","translation_ja":"ここは図書館なので、静かにしてください"},{"hanzi":"晚上的街道很安靜，幾乎沒有人","pinyin":"wǎn shàng de jiē dào hěn ān jìng jī hū méi yǒu rén","translation_ja":"夜の通りはとても静かで、ほとんど人がいません"},{"hanzi":"孩子們睡著了，家裡變得很安靜","pinyin":"hái zi men shuì zháo le jiā lǐ biàn de hěn ān jìng","translation_ja":"子供たちが眠って家の中がとても静かになりました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',27,'大聲','dà shēng','大きな声','[{"hanzi":"他們在教室裡說話很大聲，影響了別人","pinyin":"tā men zài jiào shì lǐ shuō huà hěn dà shēng yǐng xiǎng le bié rén","translation_ja":"彼らは教室で大声で話して、他の人に迷惑をかけました"},{"hanzi":"請你不要大聲喊叫，這裡是醫院","pinyin":"qǐng nǐ bù yào dà shēng hǎn jiào zhè lǐ shì yī yuàn","translation_ja":"大声で叫ばないでください、ここは病院です"},{"hanzi":"他大聲地唱了一首歌，大家都拍手","pinyin":"tā dà shēng de chàng le yī shǒu gē dà jiā dōu pāi shǒu","translation_ja":"彼は大声で歌を歌い、みんなが拍手しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',28,'聲音','shēng yīn','音/声','[{"hanzi":"你的聲音聽起來有點沙啞，還好嗎？","pinyin":"nǐ de shēng yīn tīng qǐ lái yǒu diǎn shā yǎ hái hǎo ma","translation_ja":"あなたの声が少しかすれて聞こえますが、大丈夫ですか"},{"hanzi":"我喜歡聽鳥兒的聲音，讓人覺得放鬆","pinyin":"wǒ xǐ huan tīng niǎo ér de shēng yīn ràng rén jué de fàng sōng","translation_ja":"鳥の声を聞くのが好きで、リラックスできます"},{"hanzi":"教室裡傳來了學生的歡笑聲音","pinyin":"jiào shì lǐ chuán lái le xué shēng de huān xiào shēng yīn","translation_ja":"教室から学生たちの笑い声が聞こえてきました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',29,'圖片','tú piàn','写真/画像','[{"hanzi":"他拍了很多漂亮的圖片，分享在網上","pinyin":"tā pāi le hěn duō piào liàng de tú piàn fēn xiǎng zài wǎng shàng","translation_ja":"彼はたくさんのきれいな写真を撮ってオンラインで共有しました"},{"hanzi":"我們可以把這些圖片印出來做海報嗎？","pinyin":"wǒ men kě yǐ bǎ zhè xiē tú piàn yìn chū lái zuò hǎi bào ma","translation_ja":"これらの画像を印刷してポスターにできますか"},{"hanzi":"請你在簡報中加入幾張相關的圖片","pinyin":"qǐng nǐ zài jiǎn bào zhōng jiā rù jǐ zhāng xiāng guān de tú piàn","translation_ja":"プレゼン資料にいくつか関連画像を追加してください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',30,'馬上','mǎ shàng','すぐに','[{"hanzi":"我馬上就來，請等一下","pinyin":"wǒ mǎ shàng jiù lái qǐng děng yī xià","translation_ja":"すぐに行きますので、少々お待ちください"},{"hanzi":"請把這些文件馬上交給老師","pinyin":"qǐng bǎ zhè xiē wén jiàn mǎ shàng jiāo gěi lǎo shī","translation_ja":"これらの書類をすぐに先生に渡してください"},{"hanzi":"火車馬上就要出發了，我們趕快上車吧！","pinyin":"huǒ chē mǎ shàng jiù yào chū fā le wǒ men gǎn kuài shàng chē ba","translation_ja":"列車がまもなく出発するので、急いで乗りましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',31,'歷史','lì shǐ','歴史','[{"hanzi":"這本書講述了台灣的歷史故事，非常有趣","pinyin":"zhè běn shū jiǎng shù le tái wān de lì shǐ gù shì fēi cháng yǒu qù","translation_ja":"この本は台湾の歴史についての物語を語っており、とても面白いです"},{"hanzi":"我們參觀了博物館裡的歷史展覽","pinyin":"wǒ men cān guān le bó wù guǎn lǐ de lì shǐ zhǎn lǎn","translation_ja":"博物館の歴史展示を見学しました"},{"hanzi":"他對中國的歷史很感興趣，一直在研究","pinyin":"tā duì zhōng guó de lì shǐ hěn gǎn xìng qù yī zhí zài yán jiū","translation_ja":"彼は中国の歴史に興味を持ち、研究を続けています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',32,'故事','gù shì','物語','[{"hanzi":"她給孩子們講了一個很有趣的故事","pinyin":"tā gěi hái zi men jiǎng le yī ge hěn yǒu qù de gù shì","translation_ja":"彼女は子供たちにとても面白い物語を話しました"},{"hanzi":"這部電影的故事情節非常感人","pinyin":"zhè bù diàn yǐng de gù shì qíng jié fēi cháng gǎn rén","translation_ja":"この映画のストーリーは非常に感動的です"},{"hanzi":"我最喜歡聽奶奶講以前的故事","pinyin":"wǒ zuì xǐ huan tīng nǎi nai jiǎng yǐ qián de gù shì","translation_ja":"私はおばあさんが昔話をするのを聞くのが大好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',33,'算','suàn','計算する','[{"hanzi":"我們一起來算一下這道數學題吧！","pinyin":"wǒ men yī qǐ lái suàn yī xià zhè dào shù xué tí ba","translation_ja":"一緒にこの数学の問題を計算してみましょう"},{"hanzi":"你算好了嗎？答案是多少？","pinyin":"nǐ suàn hǎo le ma dá àn shì duō shǎo","translation_ja":"計算終わりましたか？答えは何ですか"},{"hanzi":"我算了一下，我們還有三十分鐘的時間","pinyin":"wǒ suàn le yī xià wǒ men hái yǒu sān shí fēn zhōng de shí jiān","translation_ja":"計算してみたら、私たちにはまだ30分の時間があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',34,'數學','shù xué','数学','[{"hanzi":"我哥哥數學很好，常常教我解題","pinyin":"wǒ gē ge shù xué hěn hǎo cháng cháng jiāo wǒ jiě tí","translation_ja":"私の兄は数学が得意で、よく私に問題の解き方を教えてくれます"},{"hanzi":"她最喜歡的科目是數學和科學","pinyin":"tā zuì xǐ huan de kē mù shì shù xué hé kē xué","translation_ja":"彼女の一番好きな教科は数学と科学です"},{"hanzi":"這次數學考試很難，我的分數不高","pinyin":"zhè cì shù xué kǎo shì hěn nán wǒ de fēn shù bù gāo","translation_ja":"今回の数学の試験は難しくて、点数があまり良くありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',35,'科學','kē xué','科学','[{"hanzi":"他對科學很有興趣，尤其是天文學","pinyin":"tā duì kē xué hěn yǒu xìng qù yóu qí shì tiān wén xué","translation_ja":"彼は科学にとても興味があり、特に天文学が好きです"},{"hanzi":"這本科學雜誌介紹了很多新發現","pinyin":"zhè běn kē xué zá zhì jiè shào le hěn duō xīn fā xiàn","translation_ja":"この科学雑誌は多くの新しい発見を紹介しています"},{"hanzi":"他希望將來能成為一位科學家","pinyin":"tā xī wàng jiāng lái néng chéng wéi yī wèi kē xué jiā","translation_ja":"彼は将来科学者になることを望んでいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',36,'展','zhǎn','展示','[{"hanzi":"這次的畫展吸引了很多人參觀","pinyin":"zhè cì de huà zhǎn xī yǐn le hěn duō rén cān guān","translation_ja":"今回の絵画展は多くの人を引きつけました"},{"hanzi":"他們正在展廳裡布置展品","pinyin":"tā men zhèng zài zhǎn tīng lǐ bù zhì zhǎn pǐn","translation_ja":"彼らは展示室で展示品を配置しています"},{"hanzi":"這次的展覽展示了很多有趣的作品","pinyin":"zhè cì de zhǎn lǎn zhǎn shì le hěn duō yǒu qù de zuò pǐn","translation_ja":"今回の展示会ではたくさんの面白い作品が紹介されました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',37,'出','chū','出る/現れる','[{"hanzi":"他從門口走出來了，看起來很開心","pinyin":"tā cóng mén kǒu zǒu chū lái le kàn qǐ lái hěn kāi xīn","translation_ja":"彼は入口から出てきて、とても楽しそうに見えました"},{"hanzi":"太陽從東邊升出來了，早晨真美","pinyin":"tài yáng cóng dōng biān shēng chū lái le zǎo chén zhēn měi","translation_ja":"太陽が東の空から昇ってきて、朝が本当に美しいです"},{"hanzi":"這本書終於出版了，大家都很期待","pinyin":"zhè běn shū zhōng yú chū bǎn le dà jiā dōu hěn qī dài","translation_ja":"この本がついに出版され、みんなが楽しみにしていました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',38,'方向','fāng xiàng','方向','[{"hanzi":"請問往車站的方向應該怎麼走？","pinyin":"qǐng wèn wǎng chē zhàn de fāng xiàng yīng gāi zěn me zǒu","translation_ja":"駅に向かう方向はどう行けばいいですか？"},{"hanzi":"我對這個方向不太熟，可能需要問一下別人","pinyin":"wǒ duì zhè ge fāng xiàng bù tài shú kě néng xū yào wèn yī xià bié rén","translation_ja":"この方向にはあまり詳しくないので、他の人に聞く必要がありそうです"},{"hanzi":"他朝著正確的方向走去了","pinyin":"tā cháo zhe zhèng què de fāng xiàng zǒu qù le","translation_ja":"彼は正しい方向に向かって歩いて行きました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',39,'過','guò','通り過ぎる/過ぎる','[{"hanzi":"我每天都會經過那家咖啡店","pinyin":"wǒ měi tiān dōu huì jīng guò nà jiā kā fēi diàn","translation_ja":"私は毎日あのカフェを通り過ぎます"},{"hanzi":"火車剛剛已經過了這個站","pinyin":"huǒ chē gāng gāng yǐ jīng guò le zhè ge zhàn","translation_ja":"列車はたった今この駅を過ぎました"},{"hanzi":"他走過我們身邊，但沒有說話","pinyin":"tā zǒu guò wǒ men shēn biān dàn méi yǒu shuō huà","translation_ja":"彼は私たちのそばを通り過ぎましたが、何も話しませんでした"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',40,'第','dì','第～','[{"hanzi":"這是我第一次來台灣旅行，覺得很新奇","pinyin":"zhè shì wǒ dì yī cì lái tái wān lǚ xíng jué de hěn xīn qí","translation_ja":"これは私が初めて台湾に旅行に来たことで、とても新鮮に感じます"},{"hanzi":"這次考試我是班上的第一名","pinyin":"zhè cì kǎo shì wǒ shì bān shàng de dì yī míng","translation_ja":"今回の試験で私はクラスで1番でした"},{"hanzi":"他住在我們家旁邊的第三棟樓","pinyin":"tā zhù zài wǒ men jiā páng biān de dì sān dòng lóu","translation_ja":"彼は私たちの家の隣の3番目の建物に住んでいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',41,'十字路口','shí zì lù kǒu','交差点','[{"hanzi":"走到前面的十字路口然後右轉","pinyin":"zǒu dào qián miàn de shí zì lù kǒu rán hòu yòu zhuǎn","translation_ja":"前方の交差点まで行って右に曲がってください"},{"hanzi":"十字路口有一個紅綠燈，請注意安全","pinyin":"shí zì lù kǒu yǒu yī ge hóng lǜ dēng qǐng zhù yì ān quán","translation_ja":"交差点には信号機があるので、安全に注意してください"},{"hanzi":"孩子們在十字路口的便利店買了零食","pinyin":"hái zi men zài shí zì lù kǒu de biàn lì diàn mǎi le líng shí","translation_ja":"子供たちは交差点のコンビニでお菓子を買いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',42,'路口','lù kǒu','道の角/入り口','[{"hanzi":"在前面路口左轉，你會看到學校","pinyin":"zài qián miàn lù kǒu zuǒ zhuǎn nǐ huì kàn dào xué xiào","translation_ja":"前方の角を左に曲がると、学校が見えます"},{"hanzi":"路口那裡有一個水果攤，賣得很便宜","pinyin":"lù kǒu nà lǐ yǒu yī ge shuǐ guǒ tān mài de hěn pián yí","translation_ja":"角に果物屋があって、安く売っています"},{"hanzi":"請你在下一個路口停車，我要下車","pinyin":"qǐng nǐ zài xià yī ge lù kǒu tíng chē wǒ yào xià chē","translation_ja":"次の角で車を止めてください、降ります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',43,'壞','huài','壊れる/悪い','[{"hanzi":"我的手機壞了，無法使用了","pinyin":"wǒ de shǒu jī huài le wú fǎ shǐ yòng le","translation_ja":"私の携帯電話が壊れて使えなくなりました"},{"hanzi":"他今天心情不好，說了很多壞話","pinyin":"tā jīn tiān xīn qíng bù hǎo shuō le hěn duō huài huà","translation_ja":"彼は今日機嫌が悪くて、たくさん悪口を言いました"},{"hanzi":"那輛車因為壞了所以不能開了","pinyin":"nà liàng chē yīn wèi huài le suǒ yǐ bù néng kāi le","translation_ja":"あの車は故障したので運転できません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',44,'世界','shì jiè','世界','[{"hanzi":"世界上有很多不同的文化和語言","pinyin":"shì jiè shàng yǒu hěn duō bù tóng de wén huà hé yǔ yán","translation_ja":"世界にはたくさんの異なる文化と言語があります"},{"hanzi":"他夢想環遊世界，看看每個地方的美景","pinyin":"tā mèng xiǎng huán yóu shì jiè kàn kàn měi gè dì fāng de měi jǐng","translation_ja":"彼は世界を旅して、各地の美しい風景を見るのが夢です"},{"hanzi":"這是一場世界級的音樂比賽，吸引了很多人參加","pinyin":"zhè shì yī chǎng shì jiè jí de yīn yuè bǐ sài xī yǐn le hěn duō rén cān jiā","translation_ja":"これは世界規模の音楽コンクールで、多くの人が参加しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',45,'生活','shēng huó','生活/暮らし','[{"hanzi":"他很喜歡現在的生活，簡單而幸福","pinyin":"tā hěn xǐ huan xiàn zài de shēng huó jiǎn dān ér xìng fú","translation_ja":"彼は現在の生活がとても好きで、シンプルで幸せです"},{"hanzi":"生活中總會有快樂和困難，這是很正常的","pinyin":"shēng huó zhōng zǒng huì yǒu kuài lè hé kùn nán zhè shì hěn zhèng cháng de","translation_ja":"生活には喜びと困難がつきもので、これは普通のことです"},{"hanzi":"他的生活習慣非常健康，每天都會運動","pinyin":"tā de shēng huó xí guàn fēi cháng jiàn kāng měi tiān dōu huì yùn dòng","translation_ja":"彼の生活習慣は非常に健康的で、毎日運動をしています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',46,'忘了','wàng le','忘れる','[{"hanzi":"我忘了帶手機，回去拿一下","pinyin":"wǒ wàng le dài shǒu jī huí qù ná yī xià","translation_ja":"携帯電話を持ってくるのを忘れたので、取りに戻ります"},{"hanzi":"別忘了明天早上八點有會議","pinyin":"bié wàng le míng tiān zǎo shàng bā diǎn yǒu huì yì","translation_ja":"明日の朝8時に会議があるのを忘れないでください"},{"hanzi":"我差點忘了今天是你的生日！","pinyin":"wǒ chà diǎn wàng le jīn tiān shì nǐ de shēng rì","translation_ja":"今日があなたの誕生日だということをもう少しで忘れるところでした"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson13',47,'世界上','shì jiè shàng','世界で','[{"hanzi":"世界上最高的山是珠穆朗瑪峰","pinyin":"shì jiè shàng zuì gāo de shān shì zhū mù lǎng mǎ fēng","translation_ja":"世界で一番高い山はエベレストです"},{"hanzi":"世界上有很多神秘的地方值得探索","pinyin":"shì jiè shàng yǒu hěn duō shén mì de dì fāng zhí de tàn suǒ","translation_ja":"世界には探検する価値のある多くの神秘的な場所があります"},{"hanzi":"世界上最快的動物是獵豹","pinyin":"shì jiè shàng zuì kuài de dòng wù shì liè bào","translation_ja":"世界で最も速い動物はチーターです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',1,'活動','huó dòng','イベント・活動','[{"hanzi":"這個活動很好","pinyin":"zhè ge huó dòng hěn hǎo","translation_ja":"この活動はいいです"},{"hanzi":"我們都喜歡這個活動","pinyin":"wǒ men dōu xǐ huān zhè ge huó dòng","translation_ja":"私たちはみんなこの活動が好きです"},{"hanzi":"你要去活動嗎?","pinyin":"nǐ yào qù huó dòng ma?","translation_ja":"あなたはイベントに行きますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',2,'住','zhù','住む','[{"hanzi":"我住在台北","pinyin":"wǒ zhù zài tái běi","translation_ja":"私は台北に住んでいます"},{"hanzi":"你住哪裡?","pinyin":"nǐ zhù nǎ lǐ","translation_ja":"あなたはどこに住んでいますか?"},{"hanzi":"他住在這裡","pinyin":"tā zhù zài zhè lǐ","translation_ja":"彼はここに住んでいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',3,'新年','xīn nián','新年','[{"hanzi":"新年快到了","pinyin":"xīn nián kuài dào le","translation_ja":"もうすぐ新年です"},{"hanzi":"新年很好玩","pinyin":"xīn nián hěn hǎo wán","translation_ja":"新年はとても楽しいです"},{"hanzi":"我想在家過新年","pinyin":"wǒ xiǎng zài jiā guò xīn nián","translation_ja":"私は家で新年を過ごしたいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',4,'次','cì','回・回数','[{"hanzi":"這是我第一次來這裡","pinyin":"zhè shì wǒ dì yī cì lái zhè lǐ","translation_ja":"ここに来るのは初めてです"},{"hanzi":"你下次什麼時候來?","pinyin":"nǐ xià cì shén me shí hòu lái","translation_ja":"あなたは次はいつ来ますか?"},{"hanzi":"我每次都很開心","pinyin":"wǒ měi cì dōu hěn kāi xīn","translation_ja":"私は毎回とても楽しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',5,'過','guò','過ごす/経る','[{"hanzi":"我想和家人一起過新年","pinyin":"wǒ xiǎng hé jiā rén yì qǐ guò xīn nián","translation_ja":"家族と一緒に新年を過ごしたいです"},{"hanzi":"你過了幾天假?","pinyin":"nǐ guò le jǐ tiān jià","translation_ja":"あなたは何日間休みを過ごしましたか?"},{"hanzi":"我們一起過生日吧","pinyin":"wǒ men yì qǐ guò shēng rì ba","translation_ja":"一緒に誕生日を過ごしましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',6,'最後','zuì hòu','最後','[{"hanzi":"這是最後一天","pinyin":"zhè shì zuì hòu yì tiān","translation_ja":"これは最後の日です"},{"hanzi":"最後一個人走了","pinyin":"zuì hòu yí ge rén zǒu le","translation_ja":"最後の一人が帰りました"},{"hanzi":"我們等到最後","pinyin":"wǒ men děng dào zuì hòu","translation_ja":"私たちは最後まで待ちました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',7,'城市','chéng shì','都市','[{"hanzi":"這個城市很大","pinyin":"zhè ge chéng shì hěn dà","translation_ja":"この都市は大きいです"},{"hanzi":"我想去別的城市","pinyin":"wǒ xiǎng qù bié de chéng shì","translation_ja":"私は別の都市に行きたいです"},{"hanzi":"那個城市很有名","pinyin":"nà ge chéng shì hěn yǒu míng","translation_ja":"あの都市は有名です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',8,'晚會','wǎn huì','夜会・パーティー','[{"hanzi":"你參加晚會嗎?","pinyin":"nǐ cān jiā wǎn huì ma?","translation_ja":"あなたはパーティーに参加しますか?"},{"hanzi":"晚會在我家","pinyin":"wǎn huì zài wǒ jiā","translation_ja":"パーティーは私の家でやります"},{"hanzi":"我們一起準備晚會","pinyin":"wǒ men yì qǐ zhǔn bèi wǎn huì","translation_ja":"私たちは一緒にパーティーを準備します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',9,'演唱會','yǎn chàng huì','コンサート','[{"hanzi":"我想去演唱會","pinyin":"wǒ xiǎng qù yǎn chàng huì","translation_ja":"私はコンサートに行きたいです"},{"hanzi":"演唱會很多人","pinyin":"yǎn chàng huì hěn duō rén","translation_ja":"コンサートは人が多いです"},{"hanzi":"你有演唱會的票嗎?","pinyin":"nǐ yǒu yǎn chàng huì de piào ma?","translation_ja":"コンサートのチケットを持っていますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',10,'演唱','yǎn chàng','歌う(公に)','[{"hanzi":"他在台上演唱","pinyin":"tā zài tái shàng yǎn chàng","translation_ja":"彼はステージで歌っています"},{"hanzi":"我喜歡聽他演唱","pinyin":"wǒ xǐ huān tīng tā yǎn chàng","translation_ja":"私は彼の歌を聴くのが好きです"},{"hanzi":"你要不要演唱?","pinyin":"nǐ yào bú yào yǎn chàng","translation_ja":"あなたは歌いたいですか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',11,'場','chǎng','〜回・(イベントの)回数や場所','[{"hanzi":"這場演唱會很好","pinyin":"zhè chǎng yǎn chàng huì hěn hǎo","translation_ja":"この回のコンサートはよかったです"},{"hanzi":"我看過兩場表演","pinyin":"wǒ kàn guò liǎng chǎng biǎo yǎn","translation_ja":"私は2回の公演を見たことがあります"},{"hanzi":"這場比賽在下午","pinyin":"zhè chǎng bǐ sài zài xià wǔ","translation_ja":"この試合は午後にあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',12,'表演','biǎo yǎn','公演・演技','[{"hanzi":"表演很有趣","pinyin":"biǎo yǎn hěn yǒu qù","translation_ja":"公演はとても面白いです"},{"hanzi":"我想看那個表演","pinyin":"wǒ xiǎng kàn nà ge biǎo yǎn","translation_ja":"私はあの公演を見たいです"},{"hanzi":"他們在公園表演","pinyin":"tā men zài gōng yuán biǎo yǎn","translation_ja":"彼らは公園で公演しています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',13,'熱鬧','rè nào','賑やか','[{"hanzi":"這裡很熱鬧","pinyin":"zhè lǐ hěn rè nào","translation_ja":"ここはとても賑やかです"},{"hanzi":"晚會很熱鬧","pinyin":"wǎn huì hěn rè nào","translation_ja":"パーティーはとても賑やかです"},{"hanzi":"跨年那天很熱鬧","pinyin":"kuà nián nà tiān hěn rè nào","translation_ja":"年越しの日はとても賑やかです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',14,'有意思','yǒu yì si','面白い','[{"hanzi":"這個活動很有意思","pinyin":"zhè ge huó dòng hěn yǒu yì si","translation_ja":"この活動は面白いです"},{"hanzi":"表演非常有意思","pinyin":"biǎo yǎn fēi cháng yǒu yì si","translation_ja":"公演はとても面白いです"},{"hanzi":"新年晚會有意思嗎?","pinyin":"xīn nián wǎn huì yǒu yì si ma?","translation_ja":"新年パーティーは面白いですか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',15,'站','zhàn','立つ・駅(量詞)','[{"hanzi":"我站在門口","pinyin":"wǒ zhàn zài mén kǒu","translation_ja":"私は入口に立っています"},{"hanzi":"請站好","pinyin":"qǐng zhàn hǎo","translation_ja":"ちゃんと立ってください"},{"hanzi":"這個站在台北","pinyin":"zhè ge zhàn zài tái běi","translation_ja":"この駅は台北にあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',16,'坐','zuò','座る','[{"hanzi":"請坐","pinyin":"qǐng zuò","translation_ja":"座ってください"},{"hanzi":"我想坐在這裡","pinyin":"wǒ xiǎng zuò zài zhè lǐ","translation_ja":"私はここに座りたいです"},{"hanzi":"我們一起坐吧","pinyin":"wǒ men yì qǐ zuò ba","translation_ja":"一緒に座りましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',17,'晚','wǎn','遅い・夜','[{"hanzi":"現在很晚了","pinyin":"xiàn zài hěn wǎn le","translation_ja":"もう遅いです"},{"hanzi":"晚一點再去吧","pinyin":"wǎn yì diǎn zài qù ba","translation_ja":"もう少し遅くに行きましょう"},{"hanzi":"昨天我回家很晚","pinyin":"zuó tiān wǒ huí jiā hěn wǎn","translation_ja":"昨日は家に帰るのが遅かったです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',18,'久','jiǔ','長い(時間)','[{"hanzi":"好久不見","pinyin":"hǎo jiǔ bú jiàn","translation_ja":"お久しぶりです"},{"hanzi":"我等了很久","pinyin":"wǒ děng le hěn jiǔ","translation_ja":"私は長いこと待ちました"},{"hanzi":"你玩了多久?","pinyin":"nǐ wán le duō jiǔ","translation_ja":"あなたはどのくらい遊びましたか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',19,'大樓','dà lóu','ビル・大きな建物','[{"hanzi":"這棟大樓很高","pinyin":"zhè dòng dà lóu hěn gāo","translation_ja":"このビルはとても高いです"},{"hanzi":"我住在那棟大樓","pinyin":"wǒ zhù zài nà dòng dà lóu","translation_ja":"私はあのビルに住んでいます"},{"hanzi":"公司在大樓裡面","pinyin":"gōng sī zài dà lóu lǐ miàn","translation_ja":"会社はビルの中にあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',20,'台北101','tái běi yī líng yī','台北101','[{"hanzi":"台北101很有名","pinyin":"tái běi yī líng yī hěn yǒu míng","translation_ja":"台北101は有名です"},{"hanzi":"我想去台北101","pinyin":"wǒ xiǎng qù tái běi yī líng yī","translation_ja":"私は台北101に行きたいです"},{"hanzi":"台北101的跨年活動很熱鬧","pinyin":"tái běi yī líng yī de kuà nián huó dòng hěn rè nào","translation_ja":"台北101の年越しイベントはとても賑やかです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',21,'台北','tái běi','台北','[{"hanzi":"我住在台北","pinyin":"wǒ zhù zài tái běi","translation_ja":"私は台北に住んでいます"},{"hanzi":"台北有很多公園","pinyin":"tái běi yǒu hěn duō gōng yuán","translation_ja":"台北にはたくさん公園があります"},{"hanzi":"台北很方便","pinyin":"tái běi hěn fāng biàn","translation_ja":"台北はとても便利です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',22,'多久','duō jiǔ','どのくらい(時間)','[{"hanzi":"你要等多久?","pinyin":"nǐ yào děng duō jiǔ","translation_ja":"あなたはどのくらい待ちますか?"},{"hanzi":"從這裡到學校要多久?","pinyin":"cóng zhè lǐ dào xué xiào yào duō jiǔ","translation_ja":"ここから学校までどのくらいかかりますか?"},{"hanzi":"你住在這裡多久了?","pinyin":"nǐ zhù zài zhè lǐ duō jiǔ le","translation_ja":"あなたはここにどのくらい住んでいますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',23,'歡迎','huān yíng','歓迎する','[{"hanzi":"歡迎你來我家","pinyin":"huān yíng nǐ lái wǒ jiā","translation_ja":"私の家へようこそ"},{"hanzi":"我們歡迎大家","pinyin":"wǒ men huān yíng dà jiā","translation_ja":"私たちはみんなを歓迎します"},{"hanzi":"歡迎你參加活動","pinyin":"huān yíng nǐ cān jiā huó dòng","translation_ja":"イベントへの参加を歓迎します"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',24,'進','jìn','入る','[{"hanzi":"請進","pinyin":"qǐng jìn","translation_ja":"どうぞお入りください"},{"hanzi":"我可以進來嗎?","pinyin":"wǒ kě yǐ jìn lái ma?","translation_ja":"入ってもいいですか?"},{"hanzi":"你進房間看一下","pinyin":"nǐ jìn fáng jiān kàn yí xià","translation_ja":"部屋に入ってちょっと見てみてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',25,'公園','gōng yuán','公園','[{"hanzi":"我每天去公園","pinyin":"wǒ měi tiān qù gōng yuán","translation_ja":"私は毎日公園に行きます"},{"hanzi":"公園裡有很多人","pinyin":"gōng yuán lǐ yǒu hěn duō rén","translation_ja":"公園には人がたくさんいます"},{"hanzi":"你喜歡去公園嗎?","pinyin":"nǐ xǐ huān qù gōng yuán ma?","translation_ja":"あなたは公園に行くのが好きですか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',26,'樹','shù','木・樹木','[{"hanzi":"公園裡有很多樹","pinyin":"gōng yuán lǐ yǒu hěn duō shù","translation_ja":"公園にはたくさんの木があります"},{"hanzi":"這棵樹很高","pinyin":"zhè kē shù hěn gāo","translation_ja":"この木はとても高いです"},{"hanzi":"我喜歡看大樹","pinyin":"wǒ xǐ huān kàn dà shù","translation_ja":"私は大きな木を見るのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',27,'棵','kē','(樹など)〜本','[{"hanzi":"一棵樹","pinyin":"yì kē shù","translation_ja":"一本の木"},{"hanzi":"這裡有幾棵樹?","pinyin":"zhè lǐ yǒu jǐ kē shù","translation_ja":"ここには何本の木がありますか?"},{"hanzi":"那棵樹很漂亮","pinyin":"nà kē shù hěn piào liàng","translation_ja":"あの木はとてもきれいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',28,'環境','huán jìng','環境','[{"hanzi":"這裡的環境很好","pinyin":"zhè lǐ de huán jìng hěn hǎo","translation_ja":"ここの環境はとても良いです"},{"hanzi":"我喜歡安靜的環境","pinyin":"wǒ xǐ huān ān jìng de huán jìng","translation_ja":"私は静かな環境が好きです"},{"hanzi":"這個公園的環境很乾淨","pinyin":"zhè ge gōng yuán de huán jìng hěn gān jìng","translation_ja":"この公園の環境はとても清潔です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',29,'酒','jiǔ','酒','[{"hanzi":"我不喝酒","pinyin":"wǒ bù hē jiǔ","translation_ja":"私はお酒を飲みません"},{"hanzi":"這瓶酒是誰的?","pinyin":"zhè píng jiǔ shì shuí de","translation_ja":"このお酒は誰のですか?"},{"hanzi":"你喜歡喝酒嗎?","pinyin":"nǐ xǐ huān hē jiǔ ma?","translation_ja":"あなたはお酒を飲むのが好きですか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',30,'餃子','jiǎo zi','ギョーザ','[{"hanzi":"我想吃餃子","pinyin":"wǒ xiǎng chī jiǎo zi","translation_ja":"私はギョーザを食べたいです"},{"hanzi":"這裡的餃子很好吃","pinyin":"zhè lǐ de jiǎo zi hěn hǎo chī","translation_ja":"ここのギョーザはとてもおいしいです"},{"hanzi":"你會做餃子嗎?","pinyin":"nǐ huì zuò jiǎo zi ma?","translation_ja":"あなたはギョーザを作れますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',31,'包子','bāo zi','中華まん','[{"hanzi":"我早餐吃包子","pinyin":"wǒ zǎo cān chī bāo zi","translation_ja":"私は朝ごはんに中華まんを食べます"},{"hanzi":"包子很好吃","pinyin":"bāo zi hěn hǎo chī","translation_ja":"中華まんはとてもおいしいです"},{"hanzi":"你要幾個包子?","pinyin":"nǐ yào jǐ ge bāo zi","translation_ja":"中華まんをいくつ要りますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',32,'牛','niú','牛','[{"hanzi":"那裡有一頭牛","pinyin":"nà lǐ yǒu yì tóu niú","translation_ja":"あそこに牛が1頭います"},{"hanzi":"牛在草地上","pinyin":"niú zài cǎo dì shàng","translation_ja":"牛は草むらにいます"},{"hanzi":"我喜歡看牛","pinyin":"wǒ xǐ huān kàn niú","translation_ja":"私は牛を見るのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',33,'肉','ròu','肉','[{"hanzi":"我不吃肉","pinyin":"wǒ bù chī ròu","translation_ja":"私は肉を食べません"},{"hanzi":"你喜歡吃什麼肉?","pinyin":"nǐ xǐ huān chī shén me ròu","translation_ja":"あなたはどんな肉が好きですか?"},{"hanzi":"這個肉很好吃","pinyin":"zhè ge ròu hěn hǎo chī","translation_ja":"この肉はとてもおいしいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',34,'魚','yú','魚','[{"hanzi":"我喜歡吃魚","pinyin":"wǒ xǐ huān chī yú","translation_ja":"私は魚を食べるのが好きです"},{"hanzi":"魚很新鮮","pinyin":"yú hěn xīn xiān","translation_ja":"魚はとても新鮮です"},{"hanzi":"你要不要買魚?","pinyin":"nǐ yào bú yào mǎi yú","translation_ja":"あなたは魚を買いますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',35,'湯','tāng','スープ','[{"hanzi":"這碗湯很熱","pinyin":"zhè wǎn tāng hěn rè","translation_ja":"このスープは熱いです"},{"hanzi":"我喜歡喝湯","pinyin":"wǒ xǐ huān hē tāng","translation_ja":"私はスープを飲むのが好きです"},{"hanzi":"你會做湯嗎?","pinyin":"nǐ huì zuò tāng ma?","translation_ja":"あなたはスープを作れますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',36,'這麼/那麼','zhè me / nà me','こんなに/そんなに','[{"hanzi":"這麼多人","pinyin":"zhè me duō rén","translation_ja":"こんなに人が多い"},{"hanzi":"那麼好吃","pinyin":"nà me hǎo chī","translation_ja":"そんなにおいしい"},{"hanzi":"你為什麼那麼忙?","pinyin":"nǐ wèi shén me nà me máng","translation_ja":"どうしてそんなに忙しいの?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',37,'重','zhòng','重い','[{"hanzi":"這個包很重","pinyin":"zhè ge bāo hěn zhòng","translation_ja":"このカバンは重いです"},{"hanzi":"不要拿太重的東西","pinyin":"bú yào ná tài zhòng de dōng xi","translation_ja":"あまり重いものを持たないでください"},{"hanzi":"他的行李很重","pinyin":"tā de xíng lǐ hěn zhòng","translation_ja":"彼の荷物は重いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',38,'拿','ná','取る・持つ','[{"hanzi":"請拿好東西","pinyin":"qǐng ná hǎo dōng xi","translation_ja":"物をしっかり持ってください"},{"hanzi":"我可以拿嗎?","pinyin":"wǒ kě yǐ ná ma?","translation_ja":"取ってもいいですか?"},{"hanzi":"你幫我拿一下","pinyin":"nǐ bāng wǒ ná yí xià","translation_ja":"ちょっと持ってくれますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',39,'日出','rì chū','日の出','[{"hanzi":"日出很漂亮","pinyin":"rì chū hěn piào liàng","translation_ja":"日の出はとてもきれいです"},{"hanzi":"我想早起看日出","pinyin":"wǒ xiǎng zǎo qǐ kàn rì chū","translation_ja":"私は早起きして日の出を見たいです"},{"hanzi":"你看過日出嗎?","pinyin":"nǐ kàn guò rì chū ma?","translation_ja":"あなたは日の出を見たことがありますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',40,'教堂','jiào táng','教会','[{"hanzi":"這裡有一座教堂","pinyin":"zhè lǐ yǒu yí zuò jiào táng","translation_ja":"ここには教会が一つあります"},{"hanzi":"我想進去教堂看看","pinyin":"wǒ xiǎng jìn qù jiào táng kàn kàn","translation_ja":"私は教会に入ってみたいです"},{"hanzi":"教堂很安靜","pinyin":"jiào táng hěn ān jìng","translation_ja":"教会はとても静かです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',41,'比','bǐ','〜より','[{"hanzi":"今天比昨天冷","pinyin":"jīn tiān bǐ zuó tiān lěng","translation_ja":"今日は昨日より寒いです"},{"hanzi":"我比你大","pinyin":"wǒ bǐ nǐ dà","translation_ja":"私はあなたより年上です"},{"hanzi":"這裡比那裡好","pinyin":"zhè lǐ bǐ nà lǐ hǎo","translation_ja":"ここはあそこよりいいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',42,'同意','tóng yì','同意する','[{"hanzi":"我同意你的想法","pinyin":"wǒ tóng yì nǐ de xiǎng fǎ","translation_ja":"私はあなたの考えに同意します"},{"hanzi":"你同意嗎?","pinyin":"nǐ tóng yì ma?","translation_ja":"あなたは同意しますか?"},{"hanzi":"我們都同意了","pinyin":"wǒ men dōu tóng yì le","translation_ja":"私たちはみんな同意しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',43,'國家','guó jiā','国','[{"hanzi":"你是哪國人?","pinyin":"nǐ shì nǎ guó rén","translation_ja":"あなたはどの国の人ですか?"},{"hanzi":"每個國家都有文化","pinyin":"měi ge guó jiā dōu yǒu wén huà","translation_ja":"どの国にも文化があります"},{"hanzi":"這個國家很大","pinyin":"zhè ge guó jiā hěn dà","translation_ja":"この国はとても大きいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',44,'慶祝','qìng zhù','祝う','[{"hanzi":"我們一起慶祝新年吧","pinyin":"wǒ men yì qǐ qìng zhù xīn nián ba","translation_ja":"一緒に新年を祝おう"},{"hanzi":"我想慶祝你的生日","pinyin":"wǒ xiǎng qìng zhù nǐ de shēng rì","translation_ja":"私はあなたの誕生日を祝いたいです"},{"hanzi":"他們慶祝得很開心","pinyin":"tā men qìng zhù de hěn kāi xīn","translation_ja":"彼らはとても楽しそうにお祝いしています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',45,'交通','jiāo tōng','交通','[{"hanzi":"這裡的交通很方便","pinyin":"zhè lǐ de jiāo tōng hěn fāng biàn","translation_ja":"ここの交通はとても便利です"},{"hanzi":"城市裡交通很多車","pinyin":"chéng shì lǐ jiāo tōng hěn duō chē","translation_ja":"都市には交通量が多いです"},{"hanzi":"你覺得這裡交通好嗎?","pinyin":"nǐ jué de zhè lǐ jiāo tōng hǎo ma?","translation_ja":"ここの交通はいいと思いますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',46,'警察','jǐng chá','警察','[{"hanzi":"警察在路上","pinyin":"jǐng chá zài lù shàng","translation_ja":"警察が道路にいます"},{"hanzi":"你看到警察了嗎?","pinyin":"nǐ kàn dào jǐng chá le ma?","translation_ja":"警察を見かけましたか?"},{"hanzi":"我有事要找警察","pinyin":"wǒ yǒu shì yào zhǎo jǐng chá","translation_ja":"警察に用事があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',47,'小心','xiǎo xīn','気をつける','[{"hanzi":"請小心","pinyin":"qǐng xiǎo xīn","translation_ja":"気をつけてください"},{"hanzi":"你走路要小心","pinyin":"nǐ zǒu lù yào xiǎo xīn","translation_ja":"歩くとき気をつけてください"},{"hanzi":"小心看路","pinyin":"xiǎo xīn kàn lù","translation_ja":"道をしっかり見て気をつけてください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson14',48,'受傷','shòu shāng','ケガをする','[{"hanzi":"他不小心受傷了","pinyin":"tā bù xiǎo xīn shòu shāng le","translation_ja":"彼はうっかりケガをしました"},{"hanzi":"我腳受傷不能走","pinyin":"wǒ jiǎo shòu shāng bù néng zǒu","translation_ja":"足をケガして歩けません"},{"hanzi":"你有沒有受傷?","pinyin":"nǐ yǒu méi yǒu shòu shāng","translation_ja":"あなたはケガをしていませんか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',1,'課','kè','レッスン','[{"hanzi":"我要上課","pinyin":"wǒ yào shàng kè","translation_ja":"私はレッスンを受けます"},{"hanzi":"現在開始上課","pinyin":"xiàn zài kāi shǐ shàng kè","translation_ja":"今からレッスンを始めます"},{"hanzi":"你幾點下課","pinyin":"nǐ jǐ diǎn xià kè","translation_ja":"何時に授業が終わりますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',2,'剛才','gāng cái','さっき','[{"hanzi":"我剛才回家","pinyin":"wǒ gāng cái huí jiā","translation_ja":"私はさっき家に帰りました"},{"hanzi":"他剛才吃飯","pinyin":"tā gāng cái chī fàn","translation_ja":"彼はさっきご飯を食べました"},{"hanzi":"剛才天氣很熱","pinyin":"gāng cái tiān qì hěn rè","translation_ja":"さっきは天気がとても暑かった"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',3,'動物','dòng wù','動物','[{"hanzi":"我喜歡小動物","pinyin":"wǒ xǐ huān xiǎo dòng wù","translation_ja":"私は小動物が好きです"},{"hanzi":"那裏有很多動物","pinyin":"nà lǐ yǒu hěn duō dòng wù","translation_ja":"あそこにはたくさんの動物がいます"},{"hanzi":"我常常看動物","pinyin":"wǒ cháng cháng kàn dòng wù","translation_ja":"私はよく動物を見ます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',4,'打開','dǎ kāi','開ける','[{"hanzi":"請打開門","pinyin":"qǐng dǎ kāi mén","translation_ja":"ドアを開けてください"},{"hanzi":"請打開電視","pinyin":"qǐng dǎ kāi diàn shì","translation_ja":"テレビをつけてください"},{"hanzi":"不要打開那個包","pinyin":"bú yào dǎ kāi nà ge bāo","translation_ja":"そのカバンを開けないでください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',5,'課本','kè běn','テキスト','[{"hanzi":"請打開課本","pinyin":"qǐng dǎ kāi kè běn","translation_ja":"テキストを開いてください"},{"hanzi":"我們一起看課本","pinyin":"wǒ men yì qǐ kàn kè běn","translation_ja":"私たちは一緒にテキストを見ましょう"},{"hanzi":"那是我的課本","pinyin":"nà shì wǒ de kè běn","translation_ja":"あれは私のテキストです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',6,'課文','kè wén','課文','[{"hanzi":"這是今天的課文","pinyin":"zhè shì jīn tiān de kè wén","translation_ja":"これは今日の課文です"},{"hanzi":"請讀課文","pinyin":"qǐng dú kè wén","translation_ja":"課文を読んでください"},{"hanzi":"我喜歡這課文","pinyin":"wǒ xǐ huān zhè kè wén","translation_ja":"私はこの課文が好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',7,'原來','yuán lái','もともと/なるほど','[{"hanzi":"我原來在這裏","pinyin":"wǒ yuán lái zài zhè lǐ","translation_ja":"もともと私はここにいました"},{"hanzi":"原來你不喜歡他","pinyin":"yuán lái nǐ bù xǐ huān tā","translation_ja":"なるほど、あなたは彼が好きではなかったのですね"},{"hanzi":"他原來是老師","pinyin":"tā yuán lái shì lǎo shī","translation_ja":"彼はもともと先生でした"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',8,'華人','huá rén','華人（中国系）','[{"hanzi":"我是華人","pinyin":"wǒ shì huá rén","translation_ja":"私は華人です"},{"hanzi":"華人說漢語","pinyin":"huá rén shuō hàn yǔ","translation_ja":"華人は中国語を話します"},{"hanzi":"你認識華人嗎","pinyin":"nǐ rèn shì huá rén ma","translation_ja":"あなたは華人を知っていますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',9,'一樣','yí yàng','同じ','[{"hanzi":"我們一樣高","pinyin":"wǒ men yí yàng gāo","translation_ja":"私たちは同じ高さです"},{"hanzi":"這和那一樣大","pinyin":"zhè hé nà yí yàng dà","translation_ja":"これはあれと同じ大きさです"},{"hanzi":"你們不一樣","pinyin":"nǐ men bù yí yàng","translation_ja":"あなたたちは同じではありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',10,'代表','dài biǎo','代表する','[{"hanzi":"我代表我家","pinyin":"wǒ dài biǎo wǒ jiā","translation_ja":"私は私の家を代表します"},{"hanzi":"老師代表學校","pinyin":"lǎo shī dài biǎo xué xiào","translation_ja":"先生は学校を代表します"},{"hanzi":"這個字代表什麼","pinyin":"zhè ge zì dài biǎo shén me","translation_ja":"この字は何を表していますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',11,'越南','yuè nán','ベトナム','[{"hanzi":"我朋友是越南人","pinyin":"wǒ péng yǒu shì yuè nán rén","translation_ja":"私の友達はベトナム人です"},{"hanzi":"他從越南來","pinyin":"tā cóng yuè nán lái","translation_ja":"彼はベトナムから来ました"},{"hanzi":"越南在哪裏?","pinyin":"yuè nán zài nǎ lǐ","translation_ja":"ベトナムはどこにありますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',12,'出生','chū shēng','生まれる','[{"hanzi":"我出生在臺灣","pinyin":"wǒ chū shēng zài tái wān","translation_ja":"私は台湾で生まれました"},{"hanzi":"他出生在一九九零年","pinyin":"tā chū shēng zài yī jiǔ jiǔ líng nián","translation_ja":"彼は1990年に生まれました"},{"hanzi":"你出生在哪國?","pinyin":"nǐ chū shēng zài nǎ guó","translation_ja":"あなたはどの国で生まれましたか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',13,'屬','shǔ','属する','[{"hanzi":"我屬牛","pinyin":"wǒ shǔ niú","translation_ja":"私は丑年（牛）です"},{"hanzi":"你屬什麼?","pinyin":"nǐ shǔ shén me","translation_ja":"あなたは何年ですか?"},{"hanzi":"他屬馬","pinyin":"tā shǔ mǎ","translation_ja":"彼は午年（馬）です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',14,'啊','a','～だよ(語気助詞)','[{"hanzi":"好啊","pinyin":"hǎo a","translation_ja":"いいよ"},{"hanzi":"我不知道啊","pinyin":"wǒ bù zhī dào a","translation_ja":"知りませんよ"},{"hanzi":"真漂亮啊","pinyin":"zhēn piào liàng a","translation_ja":"本当にきれいだよ"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',15,'簡單','jiǎn dān','簡単','[{"hanzi":"這個問題很簡單","pinyin":"zhè ge wèn tí hěn jiǎn dān","translation_ja":"この問題は簡単です"},{"hanzi":"中文不簡單","pinyin":"zhōng wén bù jiǎn dān","translation_ja":"中国語は簡単ではありません"},{"hanzi":"你覺得簡單嗎?","pinyin":"nǐ jué de jiǎn dān ma","translation_ja":"簡単だと思いますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',16,'查','chá','調べる','[{"hanzi":"我要查字典","pinyin":"wǒ yào chá zì diǎn","translation_ja":"私は辞書を引きたいです"},{"hanzi":"你可以查一下嗎?","pinyin":"nǐ kě yǐ chá yí xià ma","translation_ja":"ちょっと調べてもらえますか?"},{"hanzi":"我們去上網查","pinyin":"wǒ men qù shàng wǎng chá","translation_ja":"私たちはネットで調べましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',17,'羊','yáng','羊','[{"hanzi":"我看見一隻羊","pinyin":"wǒ kàn jiàn yì zhī yáng","translation_ja":"私は羊を1匹見ました"},{"hanzi":"羊很可愛","pinyin":"yáng hěn kě ài","translation_ja":"羊はかわいい"},{"hanzi":"那裏有很多羊","pinyin":"nà lǐ yǒu hěn duō yáng","translation_ja":"あそこにたくさん羊がいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',18,'馬','mǎ','馬','[{"hanzi":"我不會騎馬","pinyin":"wǒ bú huì qí mǎ","translation_ja":"私は馬に乗れません"},{"hanzi":"馬跑得很快","pinyin":"mǎ pǎo de hěn kuài","translation_ja":"馬は走るのが速い"},{"hanzi":"你想看馬嗎?","pinyin":"nǐ xiǎng kàn mǎ ma","translation_ja":"あなたは馬を見たいですか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',19,'兔/兔子','tù / tù zi','ウサギ','[{"hanzi":"這隻兔子很小","pinyin":"zhè zhī tù zi hěn xiǎo","translation_ja":"このウサギは小さい"},{"hanzi":"我喜歡白色的兔子","pinyin":"wǒ xǐ huān bái sè de tù zi","translation_ja":"私は白いウサギが好きです"},{"hanzi":"你要不要養兔子?","pinyin":"nǐ yào bú yào yǎng tù zi","translation_ja":"ウサギを飼いませんか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',20,'龍','lóng','竜','[{"hanzi":"中國人很喜歡龍","pinyin":"zhōng guó rén hěn xǐ huān lóng","translation_ja":"中国の人は竜が好きです"},{"hanzi":"龍是動物嗎?","pinyin":"lóng shì dòng wù ma","translation_ja":"竜は動物ですか?"},{"hanzi":"我沒看過龍","pinyin":"wǒ méi kàn guo lóng","translation_ja":"私は竜を見たことがありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',21,'著','zhe','～している(進行)','[{"hanzi":"他看著電視","pinyin":"tā kàn zhe diàn shì","translation_ja":"彼はテレビを見ています"},{"hanzi":"我拿著一本書","pinyin":"wǒ ná zhe yì běn shū","translation_ja":"私は本を持っています"},{"hanzi":"你聽著音樂嗎?","pinyin":"nǐ tīng zhe yīn yuè ma","translation_ja":"あなたは音楽を聴いていますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',22,'燈籠','dēng lóng','提灯','[{"hanzi":"元宵節可以看燈籠","pinyin":"yuán xiāo jié kě yǐ kàn dēng lóng","translation_ja":"元宵節には提灯が見られます"},{"hanzi":"這個燈籠很漂亮","pinyin":"zhè ge dēng lóng hěn piào liàng","translation_ja":"この提灯はとてもきれいです"},{"hanzi":"我們拿著燈籠","pinyin":"wǒ men ná zhe dēng lóng","translation_ja":"私たちは提灯を持っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',23,'講','jiǎng','話す/語る','[{"hanzi":"老師在講課文","pinyin":"lǎo shī zài jiǎng kè wén","translation_ja":"先生は課文について話しています"},{"hanzi":"我想講一個故事","pinyin":"wǒ xiǎng jiǎng yì ge gù shì","translation_ja":"私は一つ物語を話したいです"},{"hanzi":"你可以再講一次嗎?","pinyin":"nǐ kě yǐ zài jiǎng yí cì ma","translation_ja":"もう一度話してもらえますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',24,'講話','jiǎng huà','話す','[{"hanzi":"他在講話","pinyin":"tā zài jiǎng huà","translation_ja":"彼は話しています"},{"hanzi":"請不要大聲講話","pinyin":"qǐng bú yào dà shēng jiǎng huà","translation_ja":"大きな声で話さないでください"},{"hanzi":"我們一起講話吧","pinyin":"wǒ men yì qǐ jiǎng huà ba","translation_ja":"一緒に話しましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',25,'好玩','hǎo wán','面白い/楽しい','[{"hanzi":"這個遊戲很好玩","pinyin":"zhè ge yóu xì hěn hǎo wán","translation_ja":"このゲームは面白い"},{"hanzi":"你覺得好玩嗎?","pinyin":"nǐ jué de hǎo wán ma","translation_ja":"面白いと思いますか?"},{"hanzi":"這裏的公園真好玩","pinyin":"zhè lǐ de gōng yuán zhēn hǎo wán","translation_ja":"ここの公園はとても楽しい"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',26,'大人','dà rén','大人','[{"hanzi":"你是大人了嗎?","pinyin":"nǐ shì dà rén le ma","translation_ja":"あなたはもう大人ですか?"},{"hanzi":"大人可以喝酒嗎?","pinyin":"dà rén kě yǐ hē jiǔ ma","translation_ja":"大人はお酒が飲めますか?"},{"hanzi":"大人要工作","pinyin":"dà rén yào gōng zuò","translation_ja":"大人は仕事をしなければなりません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',27,'小孩','xiǎo hái','子供','[{"hanzi":"這個小孩很可愛","pinyin":"zhè ge xiǎo hái hěn kě ài","translation_ja":"この子はとても可愛い"},{"hanzi":"小孩喜歡玩","pinyin":"xiǎo hái xǐ huān wán","translation_ja":"子供は遊ぶのが好き"},{"hanzi":"你有小孩嗎?","pinyin":"nǐ yǒu xiǎo hái ma","translation_ja":"あなたに子どもはいますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',28,'元宵節','yuán xiāo jié','元宵節','[{"hanzi":"元宵節在農曆正月十五","pinyin":"yuán xiāo jié zài nóng lì zhēng yuè shí wǔ","translation_ja":"元宵節は旧暦の1月15日です"},{"hanzi":"元宵節有很多燈籠","pinyin":"yuán xiāo jié yǒu hěn duō dēng lóng","translation_ja":"元宵節にはたくさんの提灯があります"},{"hanzi":"我想去看元宵節","pinyin":"wǒ xiǎng qù kàn yuán xiāo jié","translation_ja":"元宵節を見に行きたい"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',29,'燈會','dēng huì','ランタンフェス','[{"hanzi":"燈會在春天","pinyin":"dēng huì zài chūn tiān","translation_ja":"ランタンフェスティバルは春にあります"},{"hanzi":"你要不要去燈會?","pinyin":"nǐ yào bú yào qù dēng huì","translation_ja":"ランタンフェスに行きませんか?"},{"hanzi":"燈會很熱鬧","pinyin":"dēng huì hěn rè nào","translation_ja":"ランタンフェスはとてもにぎやかです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',30,'虎/老虎','hǔ / lǎo hǔ','虎','[{"hanzi":"你看過老虎嗎?","pinyin":"nǐ kàn guò lǎo hǔ ma","translation_ja":"虎を見たことありますか?"},{"hanzi":"老虎很大","pinyin":"lǎo hǔ hěn dà","translation_ja":"虎は大きい"},{"hanzi":"我不敢看老虎","pinyin":"wǒ bù gǎn kàn lǎo hǔ","translation_ja":"私は虎を見る勇気がありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',31,'放','fàng','置く/放す','[{"hanzi":"請把書放在桌上","pinyin":"qǐng bǎ shū fàng zài zhuō shàng","translation_ja":"本を机の上に置いてください"},{"hanzi":"不要放這裏","pinyin":"bú yào fàng zhè lǐ","translation_ja":"ここに置かないでください"},{"hanzi":"他放了一隻魚","pinyin":"tā fàng le yì zhī yú","translation_ja":"彼は魚を放しました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',32,'紙','zhǐ','紙','[{"hanzi":"我有白紙","pinyin":"wǒ yǒu bái zhǐ","translation_ja":"私は白い紙を持っています"},{"hanzi":"請給我幾張紙","pinyin":"qǐng gěi wǒ jǐ zhāng zhǐ","translation_ja":"紙を数枚ください"},{"hanzi":"這張紙太小","pinyin":"zhè zhāng zhǐ tài xiǎo","translation_ja":"この紙は小さすぎます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',33,'黑板','hēi bǎn','黒板','[{"hanzi":"老師在黑板上寫字","pinyin":"lǎo shī zài hēi bǎn shàng xiě zì","translation_ja":"先生は黒板に字を書いています"},{"hanzi":"請看黑板","pinyin":"qǐng kàn hēi bǎn","translation_ja":"黒板を見てください"},{"hanzi":"黑板上有圖","pinyin":"hēi bǎn shàng yǒu tú","translation_ja":"黒板に絵があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',34,'河','hé','川','[{"hanzi":"這條河很長","pinyin":"zhè tiáo hé hěn cháng","translation_ja":"この川は長い"},{"hanzi":"我們去河邊走走","pinyin":"wǒ men qù hé biān zǒu zǒu","translation_ja":"川辺を散歩しに行きます"},{"hanzi":"河裏有魚嗎?","pinyin":"hé lǐ yǒu yú ma","translation_ja":"川に魚はいますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',35,'湖','hú','湖','[{"hanzi":"我家旁邊有一個湖","pinyin":"wǒ jiā páng biān yǒu yì ge hú","translation_ja":"私の家のそばには湖があります"},{"hanzi":"這個湖不大","pinyin":"zhè ge hú bú dà","translation_ja":"この湖は大きくありません"},{"hanzi":"我喜歡看湖","pinyin":"wǒ xǐ huān kàn hú","translation_ja":"私は湖を見るのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',36,'比賽','bǐ sài','試合/競争','[{"hanzi":"我們有一個比賽","pinyin":"wǒ men yǒu yì ge bǐ sài","translation_ja":"私たちは試合があります"},{"hanzi":"你想看比賽嗎?","pinyin":"nǐ xiǎng kàn bǐ sài ma","translation_ja":"試合を見たいですか?"},{"hanzi":"比賽非常好看","pinyin":"bǐ sài fēi cháng hǎo kàn","translation_ja":"試合はとても見ごたえがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',37,'贏','yíng','勝つ','[{"hanzi":"我想贏","pinyin":"wǒ xiǎng yíng","translation_ja":"私は勝ちたい"},{"hanzi":"他贏了比賽","pinyin":"tā yíng le bǐ sài","translation_ja":"彼は試合に勝ちました"},{"hanzi":"你覺得誰會贏?","pinyin":"nǐ jué de shéi huì yíng","translation_ja":"誰が勝つと思いますか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',38,'輸','shū','負ける','[{"hanzi":"我不想輸","pinyin":"wǒ bù xiǎng shū","translation_ja":"負けたくない"},{"hanzi":"他輸了","pinyin":"tā shū le","translation_ja":"彼は負けました"},{"hanzi":"你為什麼輸?","pinyin":"nǐ wèi shén me shū","translation_ja":"なぜ負けたのですか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',39,'排','pái','並べる/列','[{"hanzi":"請排好","pinyin":"qǐng pái hǎo","translation_ja":"きちんと並んでください"},{"hanzi":"我們一起排隊","pinyin":"wǒ men yì qǐ pái duì","translation_ja":"一緒に列に並びましょう"},{"hanzi":"請看那排桌子","pinyin":"qǐng kàn nà pái zhuō zi","translation_ja":"あの並んでいる机を見てください"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',40,'其他','qí tā','その他','[{"hanzi":"你還有其他問題嗎?","pinyin":"nǐ hái yǒu qí tā wèn tí ma","translation_ja":"他に質問がありますか?"},{"hanzi":"我想看其他顏色","pinyin":"wǒ xiǎng kàn qí tā yán sè","translation_ja":"他の色を見たいです"},{"hanzi":"沒有其他了","pinyin":"méi yǒu qí tā le","translation_ja":"他には何もありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',41,'鼠/老鼠','shǔ / lǎo shǔ','ネズミ','[{"hanzi":"老鼠很小","pinyin":"lǎo shǔ hěn xiǎo","translation_ja":"ネズミは小さい"},{"hanzi":"我害怕老鼠","pinyin":"wǒ hài pà lǎo shǔ","translation_ja":"私はネズミが怖い"},{"hanzi":"你看見老鼠了嗎?","pinyin":"nǐ kàn jiàn lǎo shǔ le ma","translation_ja":"ネズミを見ましたか?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',42,'蛇','shé','ヘビ','[{"hanzi":"我不喜歡蛇","pinyin":"wǒ bù xǐ huān shé","translation_ja":"私はヘビが好きではありません"},{"hanzi":"你見過蛇嗎?","pinyin":"nǐ jiàn guo shé ma","translation_ja":"ヘビを見たことがありますか?"},{"hanzi":"蛇在草裏","pinyin":"shé zài cǎo lǐ","translation_ja":"ヘビは草の中にいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',43,'猴/猴子','hóu / hóu zi','サル','[{"hanzi":"猴子很聰明","pinyin":"hóu zi hěn cōng míng","translation_ja":"サルはとても賢い"},{"hanzi":"你喜歡猴子嗎?","pinyin":"nǐ xǐ huān hóu zi ma","translation_ja":"サルは好きですか?"},{"hanzi":"我在動物園看猴子","pinyin":"wǒ zài dòng wù yuán kàn hóu zi","translation_ja":"動物園でサルを見ました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',44,'雞','jī','ニワトリ','[{"hanzi":"雞會下蛋","pinyin":"jī huì xià dàn","translation_ja":"ニワトリは卵を産みます"},{"hanzi":"我不喜歡吃雞","pinyin":"wǒ bù xǐ huān chī jī","translation_ja":"私は鶏肉は好きではありません"},{"hanzi":"這隻雞在叫","pinyin":"zhè zhī jī zài jiào","translation_ja":"このニワトリは鳴いています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',45,'豬','zhū','ブタ','[{"hanzi":"我家沒有豬","pinyin":"wǒ jiā méi yǒu zhū","translation_ja":"私の家にはブタはいません"},{"hanzi":"豬很可愛","pinyin":"zhū hěn kě ài","translation_ja":"ブタはかわいい"},{"hanzi":"豬喜歡吃東西","pinyin":"zhū xǐ huān chī dōng xi","translation_ja":"ブタは何かを食べるのが好き"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson15',46,'受歡迎','shòu huān yíng','人気がある','[{"hanzi":"這個東西很受歡迎","pinyin":"zhè ge dōng xi hěn shòu huān yíng","translation_ja":"これはとても人気があります"},{"hanzi":"這家餐廳很受歡迎","pinyin":"zhè jiā cān tīng hěn shòu huān yíng","translation_ja":"このレストランはとても人気があります"},{"hanzi":"為什麼那麼受歡迎","pinyin":"wèi shén me nà me shòu huān yíng","translation_ja":"なぜそんなに人気があるの?"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',1,'放假','fàng jià','休みになる','[{"hanzi":"下個月我們放假","pinyin":"xià ge yuè wǒ men fàng jià","translation_ja":"来月私たちは休みになります"},{"hanzi":"我放假在家","pinyin":"wǒ fàng jià zài jiā","translation_ja":"休みは家にいます"},{"hanzi":"今天放假我很開心","pinyin":"jīn tiān fàng jià wǒ hěn kāi xīn","translation_ja":"今日は休みになって嬉しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',2,'計畫','jì huà','計画する','[{"hanzi":"我計畫去高雄","pinyin":"wǒ jì huà qù gāo xióng","translation_ja":"高雄へ行く計画をしています"},{"hanzi":"你有什麼計畫嗎?","pinyin":"nǐ yǒu shén me jì huà ma","translation_ja":"何か計画がありますか"},{"hanzi":"我們計畫明年一起旅行","pinyin":"wǒ men jì huà míng nián yì qǐ lǚ xíng","translation_ja":"私たちは来年一緒に旅行する計画です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',3,'這次','zhè cì','今回','[{"hanzi":"這次我想吃小籠包","pinyin":"zhè cì wǒ xiǎng chī xiǎo lóng bāo","translation_ja":"今回は小籠包が食べたいです"},{"hanzi":"這次我們去看夜市","pinyin":"zhè cì wǒ men qù kàn yè shì","translation_ja":"今回私たちは夜市を見に行きます"},{"hanzi":"這次的天氣很好","pinyin":"zhè cì de tiān qì hěn hǎo","translation_ja":"今回の天気はとてもいいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',4,'上次','shàng cì','前回','[{"hanzi":"上次我沒去","pinyin":"shàng cì wǒ méi qù","translation_ja":"前回私は行きませんでした"},{"hanzi":"上次你去哪裡?","pinyin":"shàng cì nǐ qù nǎ lǐ","translation_ja":"前回どこへ行きましたか"},{"hanzi":"我上次買了很多水果","pinyin":"wǒ shàng cì mǎi le hěn duō shuǐ guǒ","translation_ja":"前回たくさん果物を買いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',5,'下次','xià cì','次回','[{"hanzi":"下次我們再來","pinyin":"xià cì wǒ men zài lái","translation_ja":"次回また来ましょう"},{"hanzi":"你下次要不要一起?","pinyin":"nǐ xià cì yào bú yào yì qǐ","translation_ja":"次回一緒に行きませんか"},{"hanzi":"我下次想帶家人來","pinyin":"wǒ xià cì xiǎng dài jiā rén lái","translation_ja":"次回は家族を連れて来たいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',6,'離','lí','〜から離れている','[{"hanzi":"我家離學校很近","pinyin":"wǒ jiā lí xué xiào hěn jìn","translation_ja":"私の家は学校から近いです"},{"hanzi":"這裡離車站遠不遠?","pinyin":"zhè lǐ lí chē zhàn yuǎn bù yuǎn","translation_ja":"ここは駅から遠いですか"},{"hanzi":"他的公司離我家不遠","pinyin":"tā de gōng sī lí wǒ jiā bù yuǎn","translation_ja":"彼の会社は私の家から遠くありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',7,'東','dōng','東','[{"hanzi":"太陽從東邊出來","pinyin":"tài yáng cóng dōng biān chū lái","translation_ja":"太陽は東から昇ります"},{"hanzi":"我家在學校東邊","pinyin":"wǒ jiā zài xué xiào dōng biān","translation_ja":"私の家は学校の東側にあります"},{"hanzi":"東邊有一家超市","pinyin":"dōng biān yǒu yì jiā chāo shì","translation_ja":"東側にスーパーがあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',8,'西','xī','西','[{"hanzi":"我們去西邊看夕陽","pinyin":"wǒ men qù xī biān kàn xī yáng","translation_ja":"私たちは西側に夕日を見に行きます"},{"hanzi":"西邊有很多房子","pinyin":"xī biān yǒu hěn duō fáng zi","translation_ja":"西側に家がたくさんあります"},{"hanzi":"那裡是學校的西門","pinyin":"nà lǐ shì xué xiào de xī mén","translation_ja":"あそこは学校の西門です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',9,'南','nán','南','[{"hanzi":"南部的天氣很熱","pinyin":"nán bù de tiān qì hěn rè","translation_ja":"南部の天気はとても暑いです"},{"hanzi":"我想去南邊玩","pinyin":"wǒ xiǎng qù nán biān wán","translation_ja":"南側へ遊びに行きたいです"},{"hanzi":"南邊有一個小湖","pinyin":"nán biān yǒu yì ge xiǎo hú","translation_ja":"南側に小さな湖があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',10,'北','běi','北','[{"hanzi":"我家在城北","pinyin":"wǒ jiā zài chéng běi","translation_ja":"私の家は街の北にあります"},{"hanzi":"北邊有一座山","pinyin":"běi biān yǒu yí zuò shān","translation_ja":"北側に山があります"},{"hanzi":"你喜歡北部的冬天嗎?","pinyin":"nǐ xǐ huān běi bù de dōng tiān ma","translation_ja":"北部の冬は好きですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',11,'部','bù','部（〜地方）','[{"hanzi":"我住在這個部","pinyin":"wǒ zhù zài zhè ge bù","translation_ja":"私はこのエリアに住んでいます"},{"hanzi":"那個部天氣很好","pinyin":"nà ge bù tiān qì hěn hǎo","translation_ja":"あのエリアは天気が良いです"},{"hanzi":"部裡的人都很友善","pinyin":"bù lǐ de rén dōu hěn yǒu shàn","translation_ja":"エリアの人々はみんな優しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',12,'中部','zhōng bù','中部','[{"hanzi":"中部有很多山","pinyin":"zhōng bù yǒu hěn duō shān","translation_ja":"中部には山がたくさんあります"},{"hanzi":"我想去中部吃小吃","pinyin":"wǒ xiǎng qù zhōng bù chī xiǎo chī","translation_ja":"中部に行って軽食を食べたいです"},{"hanzi":"中部的夜市很熱鬧","pinyin":"zhōng bù de yè shì hěn rè nào","translation_ja":"中部の夜市はとても賑やかです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',13,'小學','xiǎo xué','小学校','[{"hanzi":"我妹妹今年上小學","pinyin":"wǒ mèi mei jīn nián shàng xiǎo xué","translation_ja":"私の妹は今年小学校に入ります"},{"hanzi":"我小學有很多同學","pinyin":"wǒ xiǎo xué yǒu hěn duō tóng xué","translation_ja":"私の小学校にはたくさん同級生がいます"},{"hanzi":"小學生活很好玩","pinyin":"xiǎo xué shēng huó hěn hǎo wán","translation_ja":"小学校生活はとても楽しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',14,'中學','zhōng xué','中学校','[{"hanzi":"他在那所中學讀書","pinyin":"tā zài nà suǒ zhōng xué dú shū","translation_ja":"彼はあの中学校で勉強しています"},{"hanzi":"我中學有很多好朋友","pinyin":"wǒ zhōng xué yǒu hěn duō hǎo péng yǒu","translation_ja":"私の中学にはたくさんの友達がいます"},{"hanzi":"中學老師很好","pinyin":"zhōng xué lǎo shī hěn hǎo","translation_ja":"中学校の先生はとてもいいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',15,'大學','dà xué','大学','[{"hanzi":"我想上大學","pinyin":"wǒ xiǎng shàng dà xué","translation_ja":"私は大学に行きたいです"},{"hanzi":"他的哥哥在大學教書","pinyin":"tā de gē ge zài dà xué jiāo shū","translation_ja":"彼のお兄さんは大学で教えています"},{"hanzi":"大學很大也很漂亮","pinyin":"dà xué hěn dà yě hěn piào liang","translation_ja":"大学は広くて綺麗です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',16,'年級','nián jí','学年','[{"hanzi":"我今年讀三年級","pinyin":"wǒ jīn nián dú sān nián jí","translation_ja":"私は今年3年生です"},{"hanzi":"你是幾年級?","pinyin":"nǐ shì jǐ nián jí","translation_ja":"あなたは何年生ですか"},{"hanzi":"我弟弟下半年要上一年級","pinyin":"wǒ dì di xià bàn nián yào shàng yì nián jí","translation_ja":"弟は下半期に1年生になります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',17,'報紙','bào zhǐ','新聞','[{"hanzi":"我每天看報紙","pinyin":"wǒ měi tiān kàn bào zhǐ","translation_ja":"私は毎日新聞を読みます"},{"hanzi":"爸爸買了一份報紙","pinyin":"bà ba mǎi le yí fèn bào zhǐ","translation_ja":"父は新聞を1部買いました"},{"hanzi":"這份報紙很有意思","pinyin":"zhè fèn bào zhǐ hěn yǒu yì si","translation_ja":"この新聞はとても面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',18,'份','fèn','〜部（新聞を数える量詞）','[{"hanzi":"我要買兩份報紙","pinyin":"wǒ yào mǎi liǎng fèn bào zhǐ","translation_ja":"新聞を2部買いたいです"},{"hanzi":"他只買了一份","pinyin":"tā zhǐ mǎi le yí fèn","translation_ja":"彼は1部だけ買いました"},{"hanzi":"這裡有三份給你們","pinyin":"zhè lǐ yǒu sān fèn gěi nǐ men","translation_ja":"ここに3部あるのでみなさんにあげます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',19,'下雪','xià xuě','雪が降る','[{"hanzi":"今天下雪了","pinyin":"jīn tiān xià xuě le","translation_ja":"今日は雪が降りました"},{"hanzi":"我很喜歡下雪的時候","pinyin":"wǒ hěn xǐ huān xià xuě de shí hòu","translation_ja":"私は雪が降る時がとても好きです"},{"hanzi":"下雪時要穿很多衣服","pinyin":"xià xuě shí yào chuān hěn duō yī fú","translation_ja":"雪が降るときはたくさん服を着る必要があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',20,'雪','xuě','雪','[{"hanzi":"這裡的雪很漂亮","pinyin":"zhè lǐ de xuě hěn piào liang","translation_ja":"ここの雪はとても綺麗です"},{"hanzi":"小孩子喜歡玩雪","pinyin":"xiǎo hái zi xǐ huān wán xuě","translation_ja":"子どもは雪遊びが好きです"},{"hanzi":"我堆了一個雪人","pinyin":"wǒ duī le yí ge xuě rén","translation_ja":"私は雪だるまを作りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',21,'下雨','xià yǔ','雨が降る','[{"hanzi":"今天下午下雨了","pinyin":"jīn tiān xià wǔ xià yǔ le","translation_ja":"今日の午後雨が降りました"},{"hanzi":"下雨的時候要帶雨傘","pinyin":"xià yǔ de shí hòu yào dài yǔ sǎn","translation_ja":"雨が降るときは傘を持っていく必要があります"},{"hanzi":"我不喜歡下雨天","pinyin":"wǒ bù xǐ huān xià yǔ tiān","translation_ja":"私は雨の日が好きではありません"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',22,'雨','yǔ','雨','[{"hanzi":"這裡的雨很大","pinyin":"zhè lǐ de yǔ hěn dà","translation_ja":"ここの雨は強いです"},{"hanzi":"你帶雨衣了嗎?","pinyin":"nǐ dài yǔ yī le ma","translation_ja":"レインコートを持ってきましたか"},{"hanzi":"下雨了我們快走吧","pinyin":"xià yǔ le wǒ men kuài zǒu ba","translation_ja":"雨が降ってきたので早く行きましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',23,'夜','yè','夜','[{"hanzi":"今天夜裡很安靜","pinyin":"jīn tiān yè lǐ hěn ān jìng","translation_ja":"今夜はとても静かです"},{"hanzi":"我喜歡安靜的夜","pinyin":"wǒ xǐ huān ān jìng de yè","translation_ja":"静かな夜が好きです"},{"hanzi":"夜裡我常常看書","pinyin":"yè lǐ wǒ cháng cháng kàn shū","translation_ja":"夜はよく本を読みます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',24,'太魯閣','tài lǔ gé','太魯閣','[{"hanzi":"太魯閣很有名","pinyin":"tài lǔ gé hěn yǒu míng","translation_ja":"太魯閣はとても有名です"},{"hanzi":"我想去太魯閣旅行","pinyin":"wǒ xiǎng qù tài lǔ gé lǚ xíng","translation_ja":"太魯閣へ旅行に行きたいです"},{"hanzi":"太魯閣的風景很美","pinyin":"tài lǔ gé de fēng jǐng hěn měi","translation_ja":"太魯閣の風景はとても美しいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',25,'花蓮','huā lián','花蓮','[{"hanzi":"花蓮在台灣東部","pinyin":"huā lián zài tái wān dōng bù","translation_ja":"花蓮は台湾東部にあります"},{"hanzi":"我去過花蓮一次","pinyin":"wǒ qù guo huā lián yí cì","translation_ja":"花蓮に一度行ったことがあります"},{"hanzi":"花蓮的海很漂亮","pinyin":"huā lián de hǎi hěn piào liang","translation_ja":"花蓮の海はとても綺麗です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',26,'合歡山','hé huān shān','合歡山','[{"hanzi":"合歡山很高","pinyin":"hé huān shān hěn gāo","translation_ja":"合歓山はとても高いです"},{"hanzi":"冬天合歡山會下雪","pinyin":"dōng tiān hé huān shān huì xià xuě","translation_ja":"冬の合歓山は雪が降ります"},{"hanzi":"我們要去合歡山看日出","pinyin":"wǒ men yào qù hé huān shān kàn rì chū","translation_ja":"私たちは合歓山へ日の出を見に行きます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',27,'日月潭','rì yuè tán','日月潭','[{"hanzi":"日月潭風景很好","pinyin":"rì yuè tán fēng jǐng hěn hǎo","translation_ja":"日月潭の景色はとても素晴らしいです"},{"hanzi":"我想在日月潭搭船","pinyin":"wǒ xiǎng zài rì yuè tán dā chuán","translation_ja":"日月潭で船に乗りたいです"},{"hanzi":"日月潭在台灣中部","pinyin":"rì yuè tán zài tái wān zhōng bù","translation_ja":"日月潭は台湾中部にあります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',28,'本來/原來','běn lái/yuán lái','もともと／元々','[{"hanzi":"我本來想去看電影","pinyin":"wǒ běn lái xiǎng qù kàn diàn yǐng","translation_ja":"もともと映画を見に行きたかったです"},{"hanzi":"原來他不在家","pinyin":"yuán lái tā bú zài jiā","translation_ja":"元々彼は家にいなかったのです"},{"hanzi":"本來今天有課 後來放假","pinyin":"běn lái jīn tiān yǒu kè hòu lái fàng jià","translation_ja":"もともと今日は授業があったが後から休みになりました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',29,'後來','hòu lái','後から','[{"hanzi":"我先去吃飯 後來去逛街","pinyin":"wǒ xiān qù chī fàn hòu lái qù guàng jiē","translation_ja":"まずご飯を食べて後から買い物に行きました"},{"hanzi":"後來我回家了","pinyin":"hòu lái wǒ huí jiā le","translation_ja":"後で私は家に帰りました"},{"hanzi":"後來他才知道這件事","pinyin":"hòu lái tā cái zhī dào zhè jiàn shì","translation_ja":"後になって彼はこのことを知りました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',30,'搭','dā','乗る','[{"hanzi":"我們一起搭公車去","pinyin":"wǒ men yì qǐ dā gōng chē qù","translation_ja":"一緒にバスに乗って行きましょう"},{"hanzi":"你常搭火車嗎？","pinyin":"nǐ cháng dā huǒ chē ma","translation_ja":"よく電車に乗りますか"},{"hanzi":"搭船去那個小島很有趣","pinyin":"dā chuán qù nà ge xiǎo dǎo hěn yǒu qù","translation_ja":"船に乗ってあの小島に行くのは面白いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',31,'更','gèng','さらに','[{"hanzi":"我想要更好地學中文","pinyin":"wǒ xiǎng yào gèng hǎo de xué zhōng wén","translation_ja":"もっと上手に中国語を学びたいです"},{"hanzi":"天氣變更熱了","pinyin":"tiān qì biàn gèng rè le","translation_ja":"天気がさらに暑くなりました"},{"hanzi":"我想吃得更飽一點","pinyin":"wǒ xiǎng chī de gèng bǎo yì diǎn","translation_ja":"もっとお腹いっぱい食べたいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',32,'浴室','yù shì','浴室','[{"hanzi":"我家有一個浴室","pinyin":"wǒ jiā yǒu yì ge yù shì","translation_ja":"我が家には浴室が一つあります"},{"hanzi":"浴室裡有熱水嗎？","pinyin":"yù shì lǐ yǒu rè shuǐ ma","translation_ja":"浴室にはお湯がありますか"},{"hanzi":"媽媽在浴室洗衣服","pinyin":"mā ma zài yù shì xǐ yī fú","translation_ja":"母は浴室で洗濯をしています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',33,'廁所/洗手間','cè suǒ/xǐ shǒu jiān','トイレ／洗面所','[{"hanzi":"廁所在那邊","pinyin":"cè suǒ zài nà biān","translation_ja":"トイレはあちらです"},{"hanzi":"我可以用洗手間嗎？","pinyin":"wǒ kě yǐ yòng xǐ shǒu jiān ma","translation_ja":"洗面所を使ってもいいですか"},{"hanzi":"洗手間裡有紙嗎？","pinyin":"xǐ shǒu jiān lǐ yǒu zhǐ ma","translation_ja":"洗面所に紙はありますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',34,'洗澡','xǐ zǎo','お風呂に入る','[{"hanzi":"我每天晚上洗澡","pinyin":"wǒ měi tiān wǎn shàng xǐ zǎo","translation_ja":"私は毎晩お風呂に入ります"},{"hanzi":"洗澡以後要早點睡","pinyin":"xǐ zǎo yǐ hòu yào zǎo diǎn shuì","translation_ja":"お風呂に入った後早めに寝る必要があります"},{"hanzi":"他洗澡洗很久","pinyin":"tā xǐ zǎo xǐ hěn jiǔ","translation_ja":"彼は長い時間お風呂に入ります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',35,'換','huàn','換える','[{"hanzi":"我想換衣服","pinyin":"wǒ xiǎng huàn yī fú","translation_ja":"服を着替えたいです"},{"hanzi":"這件衣服太小 要不要換","pinyin":"zhè jiàn yī fú tài xiǎo yào bú yào huàn","translation_ja":"この服は小さいですが交換しますか"},{"hanzi":"我要換教室","pinyin":"wǒ yào huàn jiào shì","translation_ja":"教室を替えます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',36,'付','fù','払う','[{"hanzi":"我來付錢","pinyin":"wǒ lái fù qián","translation_ja":"私が支払います"},{"hanzi":"你要付多少？","pinyin":"nǐ yào fù duō shǎo","translation_ja":"いくら払わなければいけませんか"},{"hanzi":"我付了晚餐的錢","pinyin":"wǒ fù le wǎn cān de qián","translation_ja":"夕食代を払いました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',37,'一半/一半兒','yí bàn/yí bànr','半分','[{"hanzi":"我吃了一半的蛋糕","pinyin":"wǒ chī le yí bàn de dàn gāo","translation_ja":"私はケーキを半分食べました"},{"hanzi":"還有一半給你","pinyin":"hái yǒu yí bàn gěi nǐ","translation_ja":"残りの半分はあなたにあげます"},{"hanzi":"我們一人一半吧","pinyin":"wǒ men yì rén yí bàn ba","translation_ja":"私たちで半分こしましょう"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',38,'風','fēng','風','[{"hanzi":"今天的風很大","pinyin":"jīn tiān de fēng hěn dà","translation_ja":"今日は風が強いです"},{"hanzi":"我不喜歡颳風的天氣","pinyin":"wǒ bù xǐ huān guā fēng de tiān qì","translation_ja":"風が吹く天気は好きではありません"},{"hanzi":"風來了 天氣變涼了","pinyin":"fēng lái le tiān qì biàn liáng le","translation_ja":"風が吹いて涼しくなりました"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',39,'笑','xiào','笑う','[{"hanzi":"她常常笑","pinyin":"tā cháng cháng xiào","translation_ja":"彼女はよく笑います"},{"hanzi":"你為什麼笑？","pinyin":"nǐ wèi shén me xiào","translation_ja":"どうして笑っているのですか"},{"hanzi":"大家都笑得很開心","pinyin":"dà jiā dōu xiào de hěn kāi xīn","translation_ja":"みんな笑ってとても楽しそうです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',40,'高雄','gāo xióng','高雄','[{"hanzi":"高雄在台灣南部","pinyin":"gāo xióng zài tái wān nán bù","translation_ja":"高雄は台湾の南部にあります"},{"hanzi":"我想去高雄玩","pinyin":"wǒ xiǎng qù gāo xióng wán","translation_ja":"高雄へ遊びに行きたいです"},{"hanzi":"高雄的夜市很好吃","pinyin":"gāo xióng de yè shì hěn hǎo chī","translation_ja":"高雄の夜市は美味しいものが多いです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',41,'西子灣','xī zǐ wān','西子湾','[{"hanzi":"西子灣的風景很美","pinyin":"xī zǐ wān de fēng jǐng hěn měi","translation_ja":"西子湾の風景はとても美しいです"},{"hanzi":"我們下午去西子灣","pinyin":"wǒ men xià wǔ qù xī zǐ wān","translation_ja":"午後に西子湾へ行きます"},{"hanzi":"你去過西子灣嗎？","pinyin":"nǐ qù guo xī zǐ wān ma","translation_ja":"西子湾に行ったことがありますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',42,'高鐵','gāo tiě','高速鉄道','[{"hanzi":"我們可以搭高鐵去台北","pinyin":"wǒ men kě yǐ dā gāo tiě qù tái běi","translation_ja":"高鉄に乗って台北へ行けます"},{"hanzi":"高鐵很快","pinyin":"gāo tiě hěn kuài","translation_ja":"高速鉄道は速いです"},{"hanzi":"你喜歡坐高鐵嗎?","pinyin":"nǐ xǐ huān zuò gāo tiě ma","translation_ja":"高鉄に乗るのは好きですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',43,'台灣高鐵','tái wān gāo tiě','台湾高速鉄道','[{"hanzi":"台灣高鐵從北到南","pinyin":"tái wān gāo tiě cóng běi dào nán","translation_ja":"台湾高速鉄道は北から南まで走っています"},{"hanzi":"我常坐台灣高鐵","pinyin":"wǒ cháng zuò tái wān gāo tiě","translation_ja":"私はよく台湾高速鉄道に乗ります"},{"hanzi":"台灣高鐵很方便","pinyin":"tái wān gāo tiě hěn fāng biàn","translation_ja":"台湾高速鉄道はとても便利です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',44,'邊/邊兒','biān/biānr','〜辺','[{"hanzi":"我坐在窗邊","pinyin":"wǒ zuò zài chuāng biān","translation_ja":"私は窓辺に座っています"},{"hanzi":"你家在河邊嗎?","pinyin":"nǐ jiā zài hé biān ma","translation_ja":"あなたの家は川辺にありますか"},{"hanzi":"他站在我旁邊","pinyin":"tā zhàn zài wǒ páng biān","translation_ja":"彼は私の隣に立っています"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',45,'中國大陸','zhōng guó dà lù','中国大陸','[{"hanzi":"中國大陸很大","pinyin":"zhōng guó dà lù hěn dà","translation_ja":"中国大陸は広いです"},{"hanzi":"我想去中國大陸看看","pinyin":"wǒ xiǎng qù zhōng guó dà lù kàn kan","translation_ja":"中国大陸を見に行きたいです"},{"hanzi":"中國大陸有很多城市","pinyin":"zhōng guó dà lù yǒu hěn duō chéng shì","translation_ja":"中国大陸にはたくさんの都市があります"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',46,'菲律賓','fēi lǜ bīn','フィリピン','[{"hanzi":"菲律賓在台灣南邊","pinyin":"fēi lǜ bīn zài tái wān nán biān","translation_ja":"フィリピンは台湾の南にあります"},{"hanzi":"我有菲律賓朋友","pinyin":"wǒ yǒu fēi lǜ bīn péng yǒu","translation_ja":"フィリピン人の友達がいます"},{"hanzi":"你去過菲律賓嗎?","pinyin":"nǐ qù guo fēi lǜ bīn ma","translation_ja":"フィリピンに行ったことがありますか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',47,'荷蘭','hé lán','オランダ','[{"hanzi":"荷蘭在歐洲","pinyin":"hé lán zài ōu zhōu","translation_ja":"オランダはヨーロッパにあります"},{"hanzi":"荷蘭有很多花","pinyin":"hé lán yǒu hěn duō huā","translation_ja":"オランダにはたくさんの花があります"},{"hanzi":"我想去荷蘭看風車","pinyin":"wǒ xiǎng qù hé lán kàn fēng chē","translation_ja":"オランダへ風車を見に行きたいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',48,'公里','gōng lǐ','キロメートル','[{"hanzi":"我家離公司五公里","pinyin":"wǒ jiā lí gōng sī wǔ gōng lǐ","translation_ja":"私の家は会社から5キロ離れています"},{"hanzi":"我每天走一公里","pinyin":"wǒ měi tiān zǒu yì gōng lǐ","translation_ja":"私は毎日1キロ歩きます"},{"hanzi":"這裡到學校十公里","pinyin":"zhè lǐ dào xué xiào shí gōng lǐ","translation_ja":"ここから学校まで10キロです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',49,'公尺','gōng chǐ','メートル','[{"hanzi":"游泳池有五十公尺長","pinyin":"yóu yǒng chí yǒu wǔ shí gōng chǐ cháng","translation_ja":"プールは50メートルの長さがあります"},{"hanzi":"我跑了一百公尺","pinyin":"wǒ pǎo le yì bǎi gōng chǐ","translation_ja":"私は100メートル走りました"},{"hanzi":"這裡離那裡兩公尺","pinyin":"zhè lǐ lí nà lǐ liǎng gōng chǐ","translation_ja":"ここはあそこから2メートルです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',50,'公分','gōng fēn','センチメートル','[{"hanzi":"我有一把三十公分的尺","pinyin":"wǒ yǒu yì bǎ sān shí gōng fēn de chǐ","translation_ja":"30センチの定規を持っています"},{"hanzi":"這朵花有十公分高","pinyin":"zhè duǒ huā yǒu shí gōng fēn gāo","translation_ja":"この花は高さ10センチです"},{"hanzi":"蘋果大約八公分寬","pinyin":"píng guǒ dà yuē bā gōng fēn kuān","translation_ja":"そのリンゴは幅約8センチです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',51,'外國','wài guó','外国','[{"hanzi":"我想去外國旅行","pinyin":"wǒ xiǎng qù wài guó lǚ xíng","translation_ja":"外国へ旅行に行きたいです"},{"hanzi":"他有很多外國朋友","pinyin":"tā yǒu hěn duō wài guó péng yǒu","translation_ja":"彼には外国の友達がたくさんいます"},{"hanzi":"這些是外國的水果","pinyin":"zhè xiē shì wài guó de shuǐ guǒ","translation_ja":"これらは外国の果物です"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',52,'上學','shàng xué','学校に通う','[{"hanzi":"我們早上八點上學","pinyin":"wǒ men zǎo shàng bā diǎn shàng xué","translation_ja":"私たちは朝8時に登校します"},{"hanzi":"你今天上學嗎?","pinyin":"nǐ jīn tiān shàng xué ma","translation_ja":"今日学校に行きますか"},{"hanzi":"我喜歡和同學一起上學","pinyin":"wǒ xǐ huān hé tóng xué yì qǐ shàng xué","translation_ja":"同級生と一緒に登校するのが好きです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',53,'夜市','yè shì','夜市','[{"hanzi":"這裡的夜市很好玩","pinyin":"zhè lǐ de yè shì hěn hǎo wán","translation_ja":"ここの夜市はとても楽しいです"},{"hanzi":"我想去夜市吃東西","pinyin":"wǒ xiǎng qù yè shì chī dōng xi","translation_ja":"夜市へ行って何か食べたいです"},{"hanzi":"夜市裡有很多人","pinyin":"yè shì lǐ yǒu hěn duō rén","translation_ja":"夜市には人がたくさんいます"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',54,'食物','shí wù','食べ物','[{"hanzi":"這些食物都很好吃","pinyin":"zhè xiē shí wù dōu hěn hǎo chī","translation_ja":"これらの食べ物はみんな美味しいです"},{"hanzi":"你喜歡什麼食物?","pinyin":"nǐ xǐ huān shén me shí wù","translation_ja":"どんな食べ物が好きですか"},{"hanzi":"我想學做台灣食物","pinyin":"wǒ xiǎng xué zuò tái wān shí wù","translation_ja":"台湾の食べ物の作り方を学びたいです"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',55,'遊戲','yóu xì','ゲーム','[{"hanzi":"我們一起玩遊戲","pinyin":"wǒ men yì qǐ wán yóu xì","translation_ja":"一緒にゲームをしましょう"},{"hanzi":"這個遊戲很好玩","pinyin":"zhè ge yóu xì hěn hǎo wán","translation_ja":"このゲームはとても面白いです"},{"hanzi":"你想玩什麼遊戲?","pinyin":"nǐ xiǎng wán shén me yóu xì","translation_ja":"どんなゲームをしたいですか"}]');
INSERT INTO vocabulary (lesson_id,sort_order,hanzi,pinyin,translation_ja,examples_json) VALUES ('book1-lesson16',56,'小籠包','xiǎo lóng bāo','小籠包','[{"hanzi":"我很喜歡吃小籠包","pinyin":"wǒ hěn xǐ huān chī xiǎo lóng bāo","translation_ja":"小籠包を食べるのが大好きです"},{"hanzi":"這家店的小籠包很有名","pinyin":"zhè jiā diàn de xiǎo lóng bāo hěn yǒu míng","translation_ja":"この店の小籠包は有名です"},{"hanzi":"我想學做小籠包","pinyin":"wǒ xiǎng xué zuò xiǎo lóng bāo","translation_ja":"小籠包の作り方を学びたいです"}]');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson01',1,'形容詞を修飾する「很 / 不」','1. 形容詞を修飾する「很」
「很」は日本語で「とても」と訳されることが多いですが、中国語では単に形容詞を自然に使うためのつなぎの言葉としてもよく使われます。

構造：
主語 + 很 + 形容詞

例文：
他 很高。
（Tā hěn gāo.）
彼は背が高い。

這個蛋糕 很好吃。
（Zhège dàngāo hěn hǎochī.）
このケーキは美味しいです。

今天 很冷。
（Jīntiān hěn lěng.）
今日は寒いです。

ポイント：「很」は強調の意味がある場合もありますが、単に形容詞を自然に述べるときにも使います。


2. 否定を表す「不」
「不」は形容詞の否定に使われ、「～ではない」という意味になります。
基本構造：

主語 + 不 + 形容詞
例文：

我不累。
　Wǒ bù lèi.
　私は疲れていません。

這個地方不遠。
　Zhège dìfāng bù yuǎn.
　この場所は遠くありません。

ポイント：

「不」は形容詞の前に置くだけで、簡単に否定できます。','問題１：次の日本語を中国語に翻訳してください。
この本はとても面白い。
私は背が高くない。
今日は寒いです。','這本書 很有趣。
（Zhè běn shū hěn yǒuqù.）

我 不高。
（Wǒ bù gāo.）

今天 很冷。
（Jīntiān hěn lěng.）','今日は形容詞を修飾する「很」と「不」について学びました。「很」は肯定的に形容詞を述べるときに使い、「不」は否定するときに使います。形容詞を使うときは、必ずどちらかをつけることを意識してくださいね！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson01',2,'『嗎』を使った疑問文の作り方','「嗎」とは？
「嗎」は、中国語の文末に付けることで「～ですか？」という疑問文を作る助詞です。英語だと動詞を前にして～ってやるんですけど
中国語は文末にマを付けるだけなので、とても簡単です。

使い方
肯定文（普通の文）の後ろに「嗎」を付けるだけで疑問文が完成します！

肯定文：你是學生。(Nǐ shì xuéshēng.) あなたは学生です。
疑問文：你是學生嗎？(Nǐ shì xuéshēng ma?) あなたは学生ですか？
例文

他喜歡吃蘋果。(Tā xǐhuān chī píngguǒ.)
→ 他喜歡吃蘋果嗎？(Tā xǐhuān chī píngguǒ ma?)
彼はリンゴが好きですか？


注意点

「嗎」ははい・いいえで答えられる質問に使います。
**疑問詞（什麼、誰、哪裡など）**を含む文には使いません。
例えば：這是什麼？(Zhè shì shénme?) これは何ですか？
この場合は「嗎」を付けません。','次の文を「嗎」を使った疑問文に変えてみましょう。

他是老師。(Tā shì lǎoshī.)
你喜歡看電影。(Nǐ xǐhuān kàn diànyǐng.)
他住在台北。(Tā zhù zài Táiběi.)','他是老師嗎？(Tā shì lǎoshī ma?)
你喜歡看電影嗎？(Nǐ xǐhuān kàn diànyǐng ma?)
他住在台北嗎？(Tā zhù zài Táiběi ma?)','今日は中国語で疑問文を作るときに便利な「嗎」について学びました！とっても簡単なので、ぜひたくさん練習して使ってみてくださいね。

それではまた次回お会いしましょう～下次見！');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson01',3,'中国語の省略型疑問文「呢」について','「呢（ne）」は、疑問や強調を表すための助詞で、特に次の2つの場面で使われます。

1. 状況を尋ねるとき
「呢」は、「～はどうですか？」と誰かの状況や意見を尋ねるときに使います。この場合、「呢」を使うことでフレンドリーで柔らかい印象を与えます。

例文：
你呢？（nǐ ne?）
あなたはどうですか？

天氣怎麼樣？下雨呢？（tiānqì zěnme yàng? xiàyǔ ne?）
天気はどう？雨が降っていますか？

2. 省略を表現するとき
「呢」を使うことで文中の一部を省略しても自然な疑問文を作ることができます。この用法は、すでに話の文脈が共有されている場合によく使われます。

例文：
我的手機呢？（shǒujī ne?）
携帯はどこ？（「我的手機在哪裡？」の省略）

午餐呢？（fàn ne?）
ご飯はどうしたの？（「飯做好了嗎？」の省略）

ポイント
「呢」を使うとき、主語や文脈を省略してもOK！
疑問のニュアンスを加えることで、会話がよりスムーズに！','次の「呢」を使った文章に隠された日本語の疑問詞部分を答えてください。

這是我的書，那本呢？
我在家，媽媽呢？
昨天的作業你寫了，今天的呢？','這是我的書，那本呢？（zhè shì wǒ de shū, nà běn ne?）
→ これは私の本だけど、あの本は誰の？
省略された疑問詞： 誰的？

我在家，媽媽呢？（wǒ zài jiā, māma ne?）
→ 私は家にいるけど、お母さんはどこ？
省略された疑問詞： 在哪裡？

昨天的作業你寫了，今天的呢？（zuótiān de zuòyè nǐ xiě le, jīntiān de ne?）
→ 昨日の宿題は書いたけど、今日の宿題はどう？
省略された疑問詞：完成了嗎？','「呢」を使えば、文を簡潔にしながら相手の状況や考えを尋ねることができます。今日の練習問題を通して、省略された意味をしっかりと理解できましたね。これからぜひ会話で使ってみてください！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson01',4,'喜歡で好きを伝えよう！','喜歡の文法解説
1. 基本構造
「喜歡」は動詞なので、動詞述語文の形を使います。
主語 + 喜歡 + 目的語

例文：

我喜歡音樂。
（wǒ xǐ huān yīn yuè）
（私は音楽が好きです。）

她喜歡吃水果。
（tā xǐ huān chī shuǐ guǒ）
（彼女は果物を食べるのが好きです。）

2. 否定文
「喜歡」を否定する場合は、「不（bù）」を使います。
主語 + 不 + 喜歡 + 目的語

例文：

我不喜歡喝咖啡。
（wǒ bù xǐ huān hē kā fēi）
（私はコーヒーを飲むのが好きではありません。）

他不喜歡運動。
（tā bù xǐ huān yùn dòng）
（彼は運動が好きではありません。）

3. 疑問文
「喜歡」を使った疑問文は、以下の形で表現します。
主語 + 喜歡 + 目的語 + 嗎？

例文：

你喜歡看書嗎？
（nǐ xǐ huān kàn shū ma）
（あなたは本を読むのが好きですか？）

他喜歡運動嗎？
（tā xǐ huān yùn dòng ma）
（彼は運動が好きですか？）','練習問題
① 次の文を中国語に訳してください。

私はリンゴが好きです。
あなたはコーヒーが好きですか？
彼女はスイカが好きではありません。','解答：
①

我喜歡蘋果。（wǒ xǐ huān píng guǒ）
你喜歡喝咖啡嗎？（nǐ xǐ huān yīn yuè ma）
她不喜歡吃西瓜。（tā bù xǐ huān xī guā）','今日は「喜歡」の使い方を学びました。ポイントは以下のとおりです：

基本構造：「主語 + 喜歡 + 目的語」で「～が好き」を表現できます。
否定文：「不」を使うことで「好きではない」を表現できます。
疑問文：「嗎」を使って「～が好きですか？」と尋ねられます。

「喜歡」をマスターすれば、自分の好みをスムーズに伝えられるようになります。ぜひ今日の内容を活用してみてください！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',1,'中国語の時間表現とその位置のルール','1. 基本ルール
時間表現は主語の後、動詞の前に置きます。
例：
日本語：私は昨日学校に行きました。
中国語：我昨天去學校了。
（wǒ zuótiān qù xuéxiào le）
2. 時間表現の種類
時間表現には以下のような種類があります：

具体的な時間：今天 (jīntiān) 今日、明天 (míngtiān) 明日、昨天 (zuótiān) 昨日
時間帯：早上 (zǎoshàng) 朝、晚上 (wǎnshàng) 夜
時刻：九點 (jiǔ diǎn) 9時
3. 例文で位置を確認
主語＋時間＋動詞＋目的語
我今天吃了早餐。
（wǒ jīntiān chī le zǎocān）
私は今日朝ごはんを食べました。
他昨天去看電影。
（tā zuótiān qù kàn diànyǐng）
彼は昨日映画を見に行きました。
4. 時間を強調したい場合
時間を強調したい場合は、文頭に置くことも可能です。ただし、その場合も動詞の前に時間表現を置くことは変わりません。

例：
昨天他去看電影了。
（zuótiān tā qù kàn diànyǐng le）
昨日、彼は映画を見に行きました。','問題1：
次の日本語文を中国語に訳してください。

私は明日図書館に行きます。
彼は今日宿題をしました。
彼女は昨日の夜8時にテレビを見ました。
ヒント：
主語、時間、動詞、目的語の順番を意識してください。
「宿題をする」は 做作業 (zuò zuòyè)、「テレビを見る」は 看電視 (kàn diànshì) です。','我明天去圖書館。
（wǒ míngtiān qù túshūguǎn）
他今天做了作業。
（tā jīntiān zuò le zuòyè）
她昨晚八點看了電視。
（tā zuówǎn bā diǎn kàn le diànshì）','今日学んだポイントを復習しましょう！

時間表現は主語の後、動詞の前に置くのが基本。
強調する場合は文頭に置いてもよい。
練習を重ねて、自然に使えるようにしましょう！
それではまた次回お会いしましょう～下次見！');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',2,'所有を表す中国語文法：有 yǒu と 沒有 méiyǒu','文法解説
1. 有 yǒu を使った「持っている」の表現
「有」は「持っている」や「所有している」という意味で、肯定文で使われます。

文法構造：主語 + 有 + 名詞

例文：
我有書。（Wǒ yǒu yī běn shū.）
私は本を1冊持っています。
他有狗。（Tā yǒu yī zhī gǒu.）
彼は犬を1匹飼っています。
2. 沒有 méiyǒu を使った「持っていない」の表現
「沒有」は「持っていない」や「所有していない」という否定の意味で使われます。

文法構造：主語 + 沒有 + 名詞

例文：
我沒有錢。（Wǒ méiyǒu qián.）
私はお金を持っていません。
他沒有車。（Tā méiyǒu chē.）
彼は車を持っていません。
3. 疑問文での使い方
「有嗎？」を使って質問することができます。

文法構造：主語 + 有 + 名詞 + 嗎？

例文：
你有時間嗎？（Nǐ yǒu shíjiān ma?）
あなたは時間がありますか？
文法構造：主語 + 有沒有 + 名詞？','問題 1: 次の日本語を中国語に翻訳してください。
私は猫を飼っています。
あなたは兄弟がいますか？
彼女は車を持っていません。','問題 1

我有貓。（Wǒ yǒu yī zhī māo.）
你有兄弟嗎？（Nǐ yǒu xiōngdì ma?）
她沒有車。（Tā méiyǒu chē.）','今日は、「持っている」を表す「有」と「持っていない」を表す「沒有」について学びました！この表現を覚えると、所有や状況について話すときにとても役立ちます。ぜひ日常生活でたくさん使ってみてくださいね！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',3,'所有・所属を表す「的」について','1. 「的」の基本的な使い方はとてもシンプルで、
名詞 + 的 + 名詞
日本語の「AのB」に相当します。

例文

我的书（wǒ de shū）私の本
朋友的家（péngyǒu de jiā）友達の家
老师的学生（lǎoshī de xuéshēng）先生の生徒','問題1: 次の日本語を中国語に訳しましょう。
私のペン
先生の名前
あなたのお友達','問題1:
我的筆（wǒ de bǐ）
老師的名字（lǎoshī de míngzì）
你的朋友（nǐ de péngyǒu）','まとめ
今日は「的」を使った所有・所属の表現を学びました！

「的」は「～の」を表す。
文脈によって省略可能だが、フォーマルな場面では使うほうが良い。
使い方を工夫するとニュアンスを伝えることも可能。
それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',4,'助動詞「要」で意志や予定を伝えよう！','文法解説
1. 助動詞「要」とは？
「要（yào, 4声）」は動詞の前に置いて、話者の意志や予定を表します。英語の「want to」や「will」に近いニュアンスです。

2. 主な使い方
意志を表す「～したい」
自分の希望や意志を伝えるときに使います。

構造: 主語 + 要 + 動詞 + 目的語
例: 我要喝水。
(Wǒ yào hē shuǐ.)
私は水を飲みたいです。
予定を表す「～する予定だ」
未来の行動や予定を表すときにも使います。

構造: 主語 + 時間 + 要 + 動詞 + 目的語
例: 明天我要去學校。
(Míngtiān wǒ yào qù xuéxiào.)
明日私は学校に行く予定です。
注意！「要」には別の意味もある
「要」は「必要だ」や「～が欲しい」という意味でも使われますが、今回は「意志」や「予定」に限定して学びます。

會（huì, 4声）
意味: ～できる（学んだ技能）、～するだろう（未来の予測）
例: 我會開車。
(Wǒ huì kāichē.)
私は車を運転できます。


應該（yīnggāi, 1声+1声）
意味: ～すべき、～するはずだ
例: 你應該多休息。
(Nǐ yīnggāi duō xiūxí.)
あなたはもっと休むべきです。','練習問題
問題 1
以下の日本語を中国語に訳してみましょう。

私は映画を見たいです。
明日、彼はご飯を食べる予定です。
あなたは何をしたいですか？
ヒント

「映画を見たい」＝要看電影（yào kàn diànyǐng）
「ご飯を食べる」＝吃飯（chī fàn）
「何をしたい」＝要做什麼（yào zuò shénme）','解答

我要看電影。
(Wǒ yào kàn diànyǐng.)
明天他要吃飯。
(Míngtiān tā yào chī fàn.)
你要做什麼？
(Nǐ yào zuò shénme?)','今日は中国語の助動詞について学びました。助動詞を使うことで、意志や能力、義務などを簡単に表現できます。「要」「能」「可以」「應該」「會」の使い方をぜひ覚えて、日常会話に取り入れてみてください！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',5,'反復疑問文で会話をスムーズに！中国語の確認フレーズをマスターしよう','1. 反復疑問文とは？
反復疑問文とは、述語部分で肯定と否定表現を反復することで疑問文にします。

2. 反復疑問文の基本形
動詞＋不＋動詞 または 形容詞＋不＋形容詞 の形で作ります。

3. 主なパターンと例文
動詞を使った反復疑問文

構造: [動詞 + 不 + 動詞]
例: 你去不去？
(Nǐ qù bù qù?)
あなたは行きますか？
解説: 動詞「去（行く）」を繰り返して確認しています。
形容詞を使った反復疑問文

構造: [形容詞 + 不 + 形容詞]
例: 天氣好不好？
(Tiānqì hǎo bù hǎo?)
天気はいいですか？
解説: 形容詞「好（よい）」を繰り返して確認しています。
助動詞を使った反復疑問文

構造: [助動詞 + 不 + 助動詞]
例: 你要不要來？
(Nǐ néng bù néng lái?)
あなたは来たいですか？
解説: 助動詞「要（したい）」を繰り返して確認しています。

有沒有
你有沒有筆
不は使わない！','次の日本語を反復疑問文を使って中国語に訳しましょう。

あなたは忙しいですか？
彼は食べますか？
先生は来ますか？
ヒント

「忙しい」＝忙（máng, 2声）
「食べる」＝吃（chī, 1声）
「来る」＝來（lái, 2声）','解答

你忙不忙？
(Nǐ máng bù máng?)
他吃不吃？
(Tā chī bù chī?)
老師來不來？
(Lǎoshī lái bù lái?)','今日は反復疑問文について学びました。「動詞＋不＋動詞」や「形容詞＋不＋形容詞」の形を覚えると、会話の確認がスムーズになります。反復疑問文をどんどん練習して、日常会話で使えるようにしてくださいね！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',6,'「どれくらい〇〇？を中国語で聞く方法｜“(有)多＋形容詞”パターン解説」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',7,'「2週間〇〇してない！？中国語の《没V(O)了 / 不V(O)》を完全マスター！」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',8,'「誰でも・どこでも」ってどう言うの？中国語の万能フレーズ「疑問詞＋都／也」完全マスター！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',9,'また！？中国語の“又”の使い方を完全攻略！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',10,'『時間＋才＋V』で“思ったより遅い”を表す方法','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson02',11,'「やっと〇〇できた！中国語の『才』で条件と結果を表そう！」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson03',1,'「送」を使った二重目的語構文の使い方','1. 二重目的語構文とは
中国語の二重目的語構文は、動詞に対して「人」と「物」という2つの目的語を置く文型です。「送」はこの構文でよく使われる動詞の一つです。

 詳しい意味
「送」には：
贈る、プレゼントするという意味があります。

2. 「送」を使った基本構造
主語 + 送 + 人 + 物

例文：
（私はお母さんにプレゼントを送ります。）この文の目的語はお母さんという人とプレゼントという物ですよね
我送媽媽一個禮物。　送るのすぐ後ろに送る相手、そしてその後ろに送るもの　量詞も忘れずに！
wǒ sòng māma yí gè lǐwù


（彼は私に本を1冊贈りました。）
他送我一本書。
tā sòng wǒ yì běn shū


4. 注意点
「送」の後に人（受け手）を置くことが重要です。文の流れが自然になります。
目的語が2つある場合、語順は固定されています。
正しい例：我送媽媽一個禮物。
誤った例：我送一個禮物媽媽。','問題1
以下の日本語を中国語に訳してください。

彼は友達に時計を贈りました。
私は先生に手紙を送りました。
問題2
次の中国語文を完成させてください。

我送______一朵花。（受け手を入れる）
他送弟弟______。（目的物を入れる）
ヒント
「送」の後に「人」が先、「物」が後です。
必要に応じて量詞（本、個、朵など）を加えてみてください。','問題1
他送朋友一個手錶。
tā sòng péngyǒu yí gè shǒubiǎo
我送老師一封信。
wǒ sòng lǎoshī yì fēng xìn
問題2
我送媽媽一朵花。
wǒ sòng māma yì duǒ huā
他送弟弟一本書。
tā sòng dìdi yì běn shū','今日は「送」を使った二重目的語構文について学びました。「送」の使い方を覚えると、物を渡す場面でとても役に立ちます！たくさん練習して、ぜひ実際に使ってみてくださいね。それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson03',2,'「これ」「それ」「どれ」の使い方をマスターしよう！ 這／那／哪＋数詞＋量詞＋名詞','1. 基本の形：這／那／哪＋数詞＋量詞＋名詞
「這」「那」「哪」は、数量や名詞と組み合わせて具体的に何を指しているかを表します。

這（zhè, 第4声）：「これ／この」
自分の近くのものや人を指します。
例）這個蘋果很好吃。
Zhè ge píngguǒ hěn hǎochī.
（このリンゴはおいしいです。）

那（nà, 第4声）：「それ／あれ／その／あの」
自分から離れたものや人を指します。
例）那本書是我的。
Nà běn shū shì wǒ de.
（その本は私のです。）

哪（nǎ, 第3声）：「どの／どれ」
選択肢が複数ある中からどれかを尋ねます。
例）哪個包包比較便宜？
Nǎ ge bāobao bǐjiào piányi?
（どのバッグがより安いですか？）

2. 量詞の役割
中國語では、名詞の前に必ず「量詞」をつけます。
例）

一本書（yī běn shū, 一冊の本）
一個蘋果（yī ge píngguǒ, 一つのリンゴ）
3. 具体的な組み合わせ例
形式        例文        意味
這＋数詞＋量詞＋名詞        這兩個問題很簡單。        この2つの問題は簡単です。
那＋数詞＋量詞＋名詞        那三個學生都很努力。        あの3人の学生は努力家です。
哪＋数詞＋量詞＋名詞        哪一本書比較好看？        どの本が面白いですか？','練習問題
問題1: 空欄を埋めましょう
＿＿（這／那／哪）本書是你的？
我喜歡＿＿（這／那／哪）個蛋糕。

問題2: 日本語に訳しましょう
這五個學生
哪個房子
那兩件衣服','解答
問題1

哪
那
問題2

この5人の学生はみんな賢いです。
どの家がより大きいですか？
あの2着の服は新品です。','今日は、「這」「那」「哪」を使ったフレーズを勉強しました！ポイントは以下の3つ：

這＝これ／この、那＝それ／その、哪＝どれ／どの
数詞や量詞と組み合わせて使う
量詞の使い方を意識しよう
実生活でたくさん練習して、自然に使えるようにしましょう！それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson03',3,'修飾語句としての「的」の使い方','文法解説
形容詞が名詞を修飾する時、「的」は、形容詞と名詞の真ん中に位置する。
1. 「的」は形容詞と名詞の間に位置する
「的」は修飾語（形容詞や名詞）と名詞をつなぐ役割を果たします。
このため、形容詞や修飾語句は必ず「的」を通して名詞を説明します。

例文：

漂亮的花 (piàoliàng de huā)：きれいな花
新的衣服 (xīn de yīfú)：新しい服
この構造を意識することで、中国語の文法が自然に身につきます。

2. 「的」の省略
単音節の形容詞を用いる場合、「的」を省略することができます。
ただし、意味が明確である場合に限ります。省略できるのは比較的口語的な表現であることが多いです。

例文：

大房子 → 大的房子 (dà fángzi / dà de fángzi)：大きな家
好孩子 → 好的孩子 (hǎo háizi / hǎo de háizi)：良い子
注意：
多音節の形容詞や形容詞句の場合は「的」を省略することはできません。
例：

聰明的學生 (cōngmíng de xuéshēng)：賢い学生
跑得快的狗 (pǎo de kuài de gǒu)：走るのが速い犬
3. 名詞の省略
名詞が文中ですでに言及されている場合、その名詞を省略して「的」だけを残すことができます。これにより、繰り返しを避けて簡潔な表現が可能になります。

例文：

這是我的書，那是你的。(Zhè shì wǒ de shū, nà shì nǐ de.)
（これは私の本で、それはあなたのものです。）
那台車是新的，這台是舊的。(Nà tái chē shì xīn de, zhè tái shì jiù de.)
（あの車は新しいもので、この車は古いものです。）
注意：
名詞を省略する場合でも「的」を省略することはできません。','練習問題
問題1：以下の日本語を中国語に翻訳してください。

大きな車
速い犬
私の先生
ヒント：「的」を使って、形容詞や名詞をつなげてみましょう！','解答：

大きな車 → 大的車 (dà de chē)
速い犬 → 快的狗 (kuài de gǒu)
私の先生 → 我的老師 (wǒ de lǎoshī)','今日は修飾語句としての「的」の使い方を学びました！
「的」を使えば、形容詞や名詞をスムーズにつなげて、より詳しく説明できます。

次回も引き続き中国語を楽しく学んでいきましょう！
それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson03',4,'「都（dōu）」を使ってみよう！どちらも、みんな、すべての表現をマスター！','文法解説
「主語 + 都 + 動詞/形容詞」

1. 「どちらも」を表す「都」
「都」は、2つ以上の対象が同じ性質や状態であることを表す時に使います。

例文：

他和我都是學生。
Tā hé wǒ dōu shì xuéshēng.
（彼と私はどちらも学生です。）

我們都喜歡運動。
Wǒmen dōu xǐhuān yùndòng.
（私たちはみんな運動が好きです。）

2. 「みんな」を表す「都」
「都」は、複数の人や物について共通することを述べる時にも使います。

例文：

他們都來了。
Tāmen dōu láile.
（彼らはみんな来ました。）

這些蘋果都很好吃。
Zhèxiē píngguǒ dōu hěn hǎochī.
（これらのリンゴはどれもおいしいです。）

3. 「すべて」を表す「都」
「都」は、完全性を強調する時にも使われます。

例文：

這本書的內容我都看過了。
Zhè běn shū de nèiróng wǒ dōu kànguò le.
（この本の内容はすべて読みました。）

我的朋友都很友好。
Wǒ de péngyǒu dōu hěn yǒuhǎo.
（私の友達はみんなとても親切です。）','練習問題
問題1
次の文を中国語に翻訳してください：

私たちはみんな学生です。
この店の料理はどれもおいしいです。
彼と私はどちらも日本人です。
ヒント
「みんな」は「都」を使います。
主語が2つ以上の場合、主語の後に「都」を置きます。','練習問題の解答
我們都是學生。
Wǒmen dōu shì xuéshēng.

這家店的菜都很好吃。
Zhè jiā diàn de cài dōu hěn hǎochī.

他和我都是日本人。
Tā hé wǒ dōu shì Rìběnrén.','まとめ
今日学んだ「都」のポイントをおさらいしましょう：

「都」は2つ以上の対象が同じ性質を持つ時に使います。
「都」は「みんな」「すべて」を表現する便利な単語です。
文の中で「主語 + 都 + 動詞/形容詞」の順序を守りましょう！
練習を繰り返して、ぜひ使いこなしてくださいね。それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson03',5,'ふんわり伝える中国語！2音節動詞の重ね型の使い方','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson03',6,'「〜に見える・聞こえる・感じる」は中国語でこう言う！「〜起來」完全マスター','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson03',7,'代わりにやってくれる？中国語の「替」の使い方','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson03',8,'「AもBも好き」ってどう言うの？『除了⋯⋯，還⋯⋯』完全ガイド！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson03',9,'動作の結果を伝える「把＋得」構文！驚き・感動・文句もこれでOK！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',1,'「也」の使い方～「～も」と表現する方法～','文法解説
1. 「也」の基本的な位置
「也」は通常、主語の後に置かれます。

主語 + 也 + 動詞/形容詞
例文：
他也是學生。(Tā yě shì xuéshēng.)
（彼も学生です。）
我們也想去旅行。(Wǒmen yě xiǎng qù lǚxíng.)
（私たちも旅行に行きたいです。）
2. 否定文での使い方
「也」は否定文でも使えます。この場合、「也」は「不(bù)」または「沒(méi)」の前に置きます。

例文：
我也不喜歡喝咖啡。(Wǒ yě bù xǐhuān hē kāfēi.)
（私もコーヒーが好きではありません。）
他也沒去過台灣。(Tā yě méi qù guò Táiwān.)
（彼も台湾に行ったことがありません。）

4. 主語が複数ある場合の注意点
主語が複数ある場合、「也」を使う位置を気をつけましょう。
例文：
他喜歡游泳，我也喜歡游泳。(Tā xǐhuān yóuyǒng, wǒ yě xǐhuān yóuyǒng.)
（彼は泳ぐのが好きで、私も泳ぐのが好きです。）

主語が異なる場合の基本ルール
異なる主語で「も」を表現する場合、「也」を新しい主語の直後、述語の前に置きます。

構文：
主語1 + 述語，主語2 + 也 + 述語
例文：
他喜歡打籃球，我也喜歡打籃球。
(Tā xǐhuān dǎ lánqiú, wǒ yě xǐhuān dǎ lánqiú.)
（彼はバスケットボールが好きで、私もバスケットボールが好きです。）
妹妹喜歡吃蛋糕，哥哥也喜歡吃蛋糕。
(Mèimei xǐhuān chī dàngāo, gēge yě xǐhuān chī dàngāo.)
（妹はケーキが好きで、兄もケーキが好きです。）
異なる主語の「も」の注意点
この場合、「也」を使うことで、新しい主語が前の主語と同じ述語を共有していることを強調します。ただし、「也」を使う主語が異なることを明確にするために、前後の主語をしっかり区別しましょう。','練習問題
問題1
次の日本語を中国語に訳してください。

私も学生です。
彼も旅行に行きたがっています。
私も野菜が好きではありません。
ヒント
「も」は「也」を使います。
主語の後、動詞の前に「也」を入れましょう。','解答
我也是學生。(Wǒ yě shì xuéshēng.)
他也想去旅行。(Tā yě xiǎng qù lǚxíng.)
我也不喜歡吃蔬菜。(Wǒ yě bù xǐhuān chī shūcài.)','まとめ
今日は「也」の使い方を学びました。「也」は「～も」という意味で、肯定文、否定文、他の副詞との組み合わせなど、さまざまな場面で使える便利な表現です。ポイントは「主語の後、動詞の前」に置くことです。

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',2,'感情を強調！「太…了！」の使い方','文法解説

構造:
太 + 形容詞 + 了

意味:
「とても～だ」「～すぎる」

例文:

這部電影太好看了！
(Zhè bù diànyǐng tài hǎokàn le!)
この映画、すっごく面白い！

今天天氣太熱了！
(Jīntiān tiānqì tài rè le!)
今日は天気が暑すぎる！

這道菜太辣了！
(Zhè dào cài tài là le!)
この料理、辛すぎる！

注意点:

「太…了！」は基本的に肯定的な意味でも、否定的な意味でも使えます。
（例: 太高興了！（嬉しすぎる！） 太累了！（疲れすぎた！））
感情を表現する文なので、実際に話すときにはトーンや表情も重要で','練習問題
次の文を中国語で表現してみましょう。
(1) このスープ、しょっぱすぎる！
(2) このパンダ、すごくかわいい！
(3) 昨日の宿題、多すぎた！
ヒント:

「しょっぱい」→ 鹹 (xián)
「かわいい」→ 可愛 (kě''ài)
「多い」→ 多 (duō)','解答:
(1) 這個湯太鹹了！
(Zhège tāng tài xián le!)

(2) 這隻熊貓太可愛了！
(Zhè zhī xióngmāo tài kě''ài le!)

(3) 昨天的作業太多了！
(Zuótiān de zuòyè tài duō le!)','まとめ
今日は「太…了！」という感情を強調する表現を学びました！
このフレーズを使えば、感情をよりダイレクトに伝えられますね。ポジティブなときもネガティブなときも活躍する便利な表現です！
ぜひ日常会話でたくさん使ってみてください。

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',3,'数の数え方を学ぼう！','文法解説
1. 基本の数字 (1から10)
まずは中国語の基本の数字を確認しましょう。

数字	繁体字	ピンイン (声調付き)
1	一	yī (1声)
2	二	èr (4声)
3	三	sān (1声)
4	四	sì (4声)
5	五	wǔ (3声)
6	六	liù (4声)
7	七	qī (1声)
8	八	bā (1声)
9	九	jiǔ (3声)
10	十	shí (2声)
2. 11以上の数字の作り方
中国語では、10以上の数字をシンプルに作れます。

11〜19: 「十」+ 数字
例: 11 = 十一 (shí yī), 15 = 十五 (shí wǔ)

20, 30, ...: 数字 + 「十」
例: 20 = 二十 (èr shí), 30 = 三十 (sān shí)

21〜99: 数字 + 「十」+ 数字
例: 21 = 二十一 (èr shí yī), 45 = 四十五 (sì shí wǔ)

3. 100以上の数字
100〜999: 「百」(bǎi) を使います。
例: 100 = 一百 (yī bǎi), 356 = 三百五十六 (sān bǎi wǔ shí liù)

1000以上: 「千」(qiān)、さらに「萬」(wàn) を使います。
例: 1,000 = 一千 (yī qiān), 10,000 = 一萬 (yī wàn)

4. 特殊な場合
ゼロ (0): 「零」(líng) を使います。
例: 205 = 二百零五 (èr bǎi líng wǔ)

二と兩の使い分け: 数えるときの「2」は通常「兩」(liǎng) を使います。
例: 200 = 兩百 (liǎng bǎi)','練習問題
問題 1: 次の数字を中国語にしてみましょう。
12
34
102
1,000
2,345
ヒント:

10の位や100の位には「十」や「百」を使います。
数字の順番をしっかり守りましょう。','答え:
十二 (shí èr)
三十四 (sān shí sì)
一百零二 (yī bǎi líng èr)
一千 (yī qiān)
二千三百四十五 (èr qiān sān bǎi sì shí wǔ)','まとめ
今日は中国語の数体系について学びました！基本の数字から1000以上の数字まで、一つ一つのルールを理解するとスムーズに話せるようになります。特に「十」「百」「千」「萬」の使い方をしっかりマスターしてみてください。

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',4,'中国語で『～以上』を表す『多』をマスターしよう！','2. 「多」の位置とニュアンスの違い
(1) 数＋多＋量詞＋名詞
意味：「数＋量詞」を少し超えた量を表します。
特徴：
「多」は量詞にかかり、超過する数が比較的少ないことを示します。
範囲が具体的で分かりやすい表現です。
例文：

二百多本書 (èrbǎi duō běn shū)
→ 「200冊と少し多い本」
200冊を少し超えた量の本を指します。

一百五十多個箱子 (yībǎi wǔshí duō gè xiāngzi)
→ 「150個と少し多い箱」
150個を少し超えた量の箱を指します。

(2) 数＋量詞＋多＋名詞
意味：「数＋量詞」を超えた全体の多さを表します。
特徴：
「多」は名詞にかかり、超過する数が多いことを示します。
範囲があいまいで、全体的な多さを強調します。
例文：

二百本多書 (èrbǎi běn duō shū)
→ 「200冊以上の本」
200冊を超える多くの本を指しますが、具体的な数は明示されません。

一百五十個多箱子 (yībǎi wǔshí gè duō xiāngzi)
→ 「150個以上の箱」
150個を超える多くの箱を指しますが、具体的な数は曖昧です。

3. ニュアンスの違いを比較
構造        意味の特徴        具体性の有無
数＋多＋量詞＋名詞        「～から少し多い」と具体的に伝える        具体的（範囲が狭い）
数＋量詞＋多＋名詞        「～を超えて多い」と全体像を伝える        あいまい（範囲が広い）','練習問題
練習問題
次の日本語を中国語に翻訳してください：

300個以上の椅子が必要です。
300個と少し多い椅子が必要です。
500冊以上のノートを配りました。
500冊と少し多いノートを配りました。
ヒント：
「具体的」か「あいまい」かを意識して考えましょう。
椅子の「個」は量詞「張 (zhāng)」、ノートの「冊」は量詞「本 (běn)」です。','解答
三百張多椅子 (sānbǎi zhāng duō yǐzi)
→ 「300個以上の椅子が必要です」

三百多張椅子 (sānbǎi duō zhāng yǐzi)
→ 「300個と少し多い椅子が必要です」

五百本多筆記本 (wǔbǎi běn duō bǐjìběn)
→ 「500冊以上のノートを配りました」

五百多本筆記本 (wǔbǎi duō běn bǐjìběn)
→ 「500冊と少し多いノートを配りました」','まとめ
今日のレッスンでは、「多」の位置によってニュアンスが変わる2つの構造を学びました。

「数＋多＋量詞＋名詞」は具体的で分かりやすい範囲を表す。
「数＋量詞＋多＋名詞」は全体的な多さをあいまいに表す。
このルールをマスターすれば、中国語で「～以上」を使いこなせるようになりますよ！
それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',5,'見えた？聞こえた？中国語の「V到」徹底マスター！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',6,'「わかる」の中国語は4種類！？“懂”の使い方を完全マスター！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',7,'「とにかく○○すぎる！」を中国語で言いたいときの2つの言い方！「得不得了」「極了」の使い分け講座','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',8,'中国語で“どんどん〜になる”を表す！『越來越』の使い方をマスターしよう！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',9,'「買える？買えない？」をスマートに表現！V得起／V不起の使い方💡','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',10,'「V飽」の使い方｜お腹いっぱい？それとも足りない？一発でわかる文法解説！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson04',11,'「〜に興味がある」って中国語でどう言うの？『對～有興趣』の使い方をマスターしよう！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson05',1,'○○しようよ！提案をやわらかく伝える「吧（ba）」の使い方','文法解説：「吧（ba）」で提案を表す
1. 「吧（ba）」とは？
提案をするときや、相手に軽く同意を求めるときに文末につけます。
「～しましょう」「～しようか？」というニュアンスをやわらかく伝えてくれます。
2. 使い方の基本形
主語 + 動詞（+ 目的語） + 吧
文末に「吧」をつけるだけで、**「提案」や「同意を求める」**ニュアンスになります。
3. 例文
我們去吃飯吧。

拼音：Wǒmen qù chīfàn ba
意味：「私たち、ご飯を食べに行きましょう。」
一起走吧。

拼音：Yīqǐ zǒu ba
意味：「一緒に行きましょう。」


走吧。英語のレッツゴー　よく使う


休息一下吧。

拼音：Xiūxí yíxià ba
意味：「少し休みましょう。」
文末につけるだけで、丁寧かつやわらかな提案になるのがポイントです。','練習問題
以下の文を見て、（　　）の中に正しい形を入れてください。ヒントを参考に考えてみましょう。

我們去（　）。

ヒント：「いっしょに映画を観に行こうよ」の意味にしたい。


我們明天（　）？

ヒント：「明日また会おうか？」と提案したい。','解答
我們去看電影吧。
(Wǒmen qù kàn diànyǐng ba)

我們明天再見吧？
(Wǒmen míngtiān zàijiàn ba?)','まとめ
今回は「吧（ba）」を使って提案をする方法を学びました。文末につけるだけで「～しましょう」「～しようか？」というやわらかい表現に変えることができます。これを使えば、友だちや家族に何かを提案するときに自然な中国語を伝えられますね。ぜひ活用してみてください。

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson05',2,'方向詞を使って場所や動作を伝える文法「○○はどこで何をしている」','2．文法解説
（1）名詞＋在＋方向詞
形：
「名詞」＋「在（zài／ㄗㄞˋ）」＋「方向詞」

意味：
「～は〇〇の（方向詞）にいる／ある」という意味を表します。

方向詞の例：

上面（shàngmiàn／ㄕㄤˋ ㄇ一ㄢˋ）：上
下面（xiàmiàn／ㄒ一ㄚˋ ㄇ一ㄢˋ）：下
前面（qiánmiàn／ㄑ一ㄢˊ ㄇ一ㄢˋ）：前
後面（hòumiàn／ㄏㄡˋ ㄇ一ㄢˋ）：後ろ
裡面（lǐmiàn／ㄌ一ˇ ㄇ一ㄢˋ）：中（内）
外面（wàimiàn／ㄨㄞˋ ㄇ一ㄢˋ）：外
左邊（zuǒbiān／ㄗㄨㄛˇ ㄅ一ㄢ）：左
右邊（yòubiān／ㄧㄡˋ ㄅ一ㄢ）：右
例文：

書在桌子上面。

Shū zài zhuōzi shàngmiàn.
ㄕㄨ ㄗㄞˋ ㄓㄨㄛ ㄗ˙ ㄕㄤˋ ㄇ一ㄢˋ
「本は机の上にある。」
老師在教室裡面。

Lǎoshī zài jiàoshì lǐmiàn.
ㄌㄠˇ ㄕ ㄗㄞˋ ㄐ一ㄠˋ ㄕˋ ㄌ一ˇ ㄇ一ㄢˋ
「先生は教室の中にいる。」
（2）名詞＋在＋方向詞＋V(O)
形：
「名詞」＋「在（zài／ㄗㄞˋ）」＋「方向詞」＋「動詞（＋目的語）」
意味：
「～は〇〇の（方向詞）で××している」という動作を表します。
例文：
弟弟在房間裡面看書。

Dìdi zài fángjiān lǐmiàn kànshū.
ㄉ一ˋ ㄉ一˙ ㄗㄞˋ ㄈㄤˊ ㄐ一ㄢ ㄌ一ˇ ㄇ一ㄢˋ ㄎㄢˋ ㄕㄨ
「弟は部屋の中で本を読んでいる。」
我們在外面玩球。

Wǒmen zài wàimiàn wánqiú.
ㄨㄛˇ ㄇㄣ˙ ㄗㄞˋ ㄨㄞˋ ㄇ一ㄢˋ ㄨㄢˊ ㄑ一ㄡˊ
「私たちは外でボール遊びをしている。」','3．練習問題
今回は、方向詞を選んで文を完成させる問題です。次の(1)～(5)の文を読んで、（　　）に入る方向詞を考えてみましょう。

書在桌子（　　　）。

Shū zài zhuōzi ( ).
ㄕㄨ ㄗㄞˋ ㄓㄨㄛ ㄗ˙ ( )
「本は机の（　　　）にある。」
我在房間（　　　）睡覺。

Wǒ zài fángjiān ( ) shuìjiào.
ㄨㄛˇ ㄗㄞˋ ㄈㄤˊ ㄐ一ㄢ ( ) ㄕㄨㄟˋ ㄐ一ㄠˋ
「私は部屋の（　　　）で寝ている。」
你的貓在沙發（　　　）嗎？

Nǐ de māo zài shāfā ( ) ma?
ㄋ一ˇ ㄉㄜ˙ ㄇㄠ ㄗㄞˋ ㄕㄚ ㄈㄚ ( ) ㄇㄚ˙
「あなたの猫はソファの（　　　）にいますか？」
哥哥在電腦（　　　）寫功課。

Gēge zài diànnǎo ( ) xiě gōngkè.
ㄍㄜ ㄍㄜ ㄗㄞˋ ㄉ一ㄢˋ ㄋㄠˇ ( ) ㄒ一ㄝˇ ㄍㄨㄥ ㄎㄜˋ
「お兄さんはパソコンの（　　　）で宿題をしている。」
我們在教室（　　　）說話。

Wǒmen zài jiàoshì ( ) shuōhuà.
ㄨㄛˇ ㄇㄣ˙ ㄗㄞˋ ㄐ一ㄠˋ ㄕˋ ( ) ㄕㄨㄛ ㄏㄨㄚˋ
「私たちは教室の（　　　）で話をしている。」','（2）答え
書在桌子上面。

Shū zài zhuōzi shàngmiàn.
「本は机の上にある。」
我在房間裡面睡覺。

Wǒ zài fángjiān lǐmiàn shuìjiào.
「私は部屋の中で寝ている。」
你的貓在沙發下面嗎？

Nǐ de māo zài shāfā xiàmiàn ma?
「あなたの猫はソファの下にいますか？」
哥哥在電腦前面寫功課。

Gēge zài diànnǎo qiánmiàn xiě gōngkè.
「お兄さんはパソコンの前で宿題をしている。」
我們在教室外面說話。

Wǒmen zài jiàoshì wàimiàn shuōhuà.
「私たちは教室の外で話をしている。」','「名詞＋在＋方向詞」
物や人が「どこにいるか／あるか」を表す。
「名詞＋在＋方向詞＋動詞(目的語)」
そこが「どんな場所」なのかに加え、そこで「何をしているのか」を表せる。
日常会話や文章の中で、方向詞を使う表現はとても頻繁に登場します。覚えれば覚えるほど、自分の状況や周りの様子を正確に伝えられるようになるので、ぜひ積極的に使ってみてください！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson05',3,'「V著V著，就～了」：気づいたらそうなってた！自然な変化を表す中国語文法🌟','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson05',4,'「只要...就...」で条件表現マスター！〜すれば〜できる中国語文法✨','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson05',5,'「有時候…有時候…」はこう使う！～な時もあれば、～な時もあるを中国語で表そう！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson05',6,'「V起來」の使い方完全マスター！始まりを伝える中国語表現','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson05',7,'中国語でギリギリセーフを表現！『還好～，要不然～』文法講座','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson05',8,'「毎週1回〇〇する」って中国語でどう言うの？“每～就～一回”の使い方徹底マスター！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson05',9,'「A像B一樣」ってどう使う？比べるときの中国語表現をマスターしよう！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson06',1,'構造助詞「得（de）」を使って動作の状態や結果を表そう！','文法解説
1. 
形：主語 + 動詞 + 得 + 形容詞や状態を表す言葉
意味：主語がどのように動作をしているかを表す。
例文：
我跑得很快
pīn yīn：wǒ pǎo de hěn kuài

日本語訳：私は速く走ります。

他说得很流利
pīn yīn：tā shuō de hěn liúlì
日本語訳：彼は流暢に話します。
「得」の後ろで、動作がどんなふうに行われているのか(速い、上手、流暢 など)を説明します。

2.
形：主語 + （動詞 + 目的語） + 再び動詞 + 得 + 形容詞や状態を表す言葉
意味：目的語を挟んだ動詞フレーズ全体が、どのように行われたかを表す。
例文：
他唱歌唱得很好听
pīn yīn：tā chàng gē chàng de hěn hǎo tīng
日本語訳：彼は歌をとても上手に歌います。

我打球打得不錯
pīn yīn：wǒ dǎ qiú dǎ de bú cuò
日本語訳：私はボール（スポーツ）をなかなか上手にします。
ここでは「V+O」を一まとまりとしてもう一度動詞を繰り返し、その後に「得」で状態を説明します。

3. 
形：主語 + 目的語 + 動詞 + 得 + 形容詞や状態を表す言葉
意味：目的語を先に示してから、その目的語を「どのように動作するか」を伝える。
例文：我中文说得很好
pīn yīn：wǒ Zhōngwén shuō de hěn hǎo
日本語訳：私は中国語を上手に話します。

他汉字写得很漂亮
pīn yīn：tā Hànzì xiě de hěn piàoliang
日本語訳：彼は漢字をきれいに書きます。
このパターンでは、先に目的語を言ってから「V + 得」で状態を述べるので、目的語が強調されるイメージです。

4. 
形：主語 + 的 + 目的語 + 動詞 + 得 + 形容詞や状態を表す言葉
意味：主語の所有物や関係するものを示してから、その動作の様子を伝える。
例文：
我的中文说得很流利
pīn yīn：wǒ de Zhōngwén shuō de hěn liúlì
日本語訳：私の中国語（力）はとても流暢です。

他的球踢得非常好
pīn yīn：tā de qiú tī de fēicháng hǎo
日本語訳：彼のサッカー（ボール捌き）はとても上手です。
「的」を使って「～の〇〇」という形で所有や所属をはっきりさせ、どんなふうに動作をしているかを表しています。','練習問題
それでは、いくつか練習してみましょう！それぞれのパターンに当てはまるように、中国語の文章を完成させてください。

問題1
（1）次の日本語を、中国語に訳してみましょう。

私は速く泳ぎます。
彼女はダンスをとても上手に踊ります（「彼女は踊りがとても上手」と言いたい）。
ヒント

「速く泳ぐ」：泳ぐ=「游泳 yóuyǒng」、速い=「快 kuài」
「ダンスを上手に踊る」：ダンス=「舞蹈 wǔdǎo」または「跳舞 tiào wǔ」、上手=「很好 hěn hǎo」「很棒 hěn bàng」など
問題2
（2）以下の文を、（　）内の日本語を参考にして完成させてください。

我(　　)写得很认真（私は〇〇をとてもまじめに書きます）
例：漢字 / 作文 / 日記 など
你的(　　)说得真好（あなたの〇〇は本当に上手に話せます）
例：中文 / 英文 / 日語 など
ヒント

パターン3、パターン4を意識してみてください。
「まじめに書く」は「认真 rènzhēn」、「本当に上手」は「真好 zhēn hǎo」など使えます。','解答例
問題1 解答例
我游泳游得很快

pīn yīn：wǒ yóu yǒng yóu de hěn kuài
声調：wǒˇ yóuˊ yǒngˇ yóuˊ de hěnˇ kuàiˋ
她跳舞跳得很好

pīn yīn：tā tiào wǔ tiào de hěn hǎo
声調：tā tiàoˋ wǔˇ tiàoˋ de hěnˇ hǎoˇ
（「舞蹈 wǔdǎo」を使ってもOKです。）
問題2 解答例
我作文写得很认真

pīn yīn：wǒ zuòwén xiě de hěn rènzhēn
声調：wǒˇ zuòˋwénˊ xiěˇ de hěnˇ rènˋzhēnˉ
你的中文说得真好

pīn yīn：nǐ de Zhōngwén shuō de zhēn hǎo
声調：nǐˇ de Zhōngˉwénˊ shuō de zhēnˉ hǎoˇ','まとめ
**構造助詞「得」**は、動作の状態や結果を詳しく説明するときに使われます。
大きく分けて4つのパターンがあり、主語・動詞・目的語・所有をどこに置くかで形が変わります。
「得」の後ろには「どんなふうに」「どれくらい上手に」などの動作の様子が続きます。
どのパターンでも「得」のあとの補語部分が**“どのように動作をしているか”**をしっかり説明するポイントになるので、ぜひ会話や文章で使ってみてくださいね。

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson06',2,'ちょっと〇〇したいときに！「有(一)點(兒)」の使い方をマスターしよう','文法解説
1. 「有(一)點(兒)」(yǒu yì diǎn ér) とは？
「有(一)點(兒)」は「ちょっと～」「少し～」という意味を表すときに使う副詞です。主に形容詞の前につけて、「程度が少しだけ強い」ことを伝える表現です。多くの場合は、少しネガティブなニュアンス（「～しすぎる」「少し困った」など）を含むことが多いです。

基本の形
有(一)點(兒) + 形容詞
例：有(一)點(兒) + [太い][難しい][高い] など

「一點」の部分は省略可能で、「有點(兒)」(yǒu diǎn ér) として使われることも多いです。実際の会話では短くなる傾向があります。

2. 使い方と語順
「有(一)點(兒)」は形容詞の前に置きます。

主語 + 有(一)點(兒) + 形容詞
例文1

我有(一)點(兒)累。
我(wǒ)：私
有(一)點(兒)(yǒu yì diǎn ér)：ちょっと
累(lèi)：疲れた
⇒「私はちょっと疲れています。」
例文2

這杯果汁有(一)點(兒)甜。
這(zhè)：これ
杯(bēi)：～杯
果汁(guǒ zhī)：ジュース
有(一)點(兒)(yǒu yì diǎn ér)：少し
甜(tián)：甘い
⇒「このジュース、ちょっと甘いです。」
例文3

今天的天氣有點(兒)熱。
今天(jīn tiān)：今日
的(de)：～の
天氣(tiān qì)：天気
有點(兒)(yǒu diǎn ér)：少し
熱(rè)：暑い（熱い）
⇒「今日は少し暑いです。」
3. 「一點兒」だけとの違い
一點兒(yì diǎn ér) + 名詞：ものの量が「少しだけ」を表すとき
例：我要一點兒水。 (「少し水がほしいです」)
有(一)點(兒) + 形容詞：状態や感情が「少し～だ」と感じるとき
例：我有一點兒口渴。 (「ちょっとのどが渇きました」)
「有(一)點(兒)」は形容詞を修飾する副詞と考えて、状態を表すのに使う点がポイントです。','練習問題
問題1
次の(　　)に入るもっとも適切な言葉を選び、中国語で書いてみましょう。

今日は少し寒いです。

今天(　　)。
このスープはちょっとしょっぱいです。

這個湯(　　)。
私は少しお腹が空きました。

我(　　)。
ヒント
「少し～」という意味の副詞を形容詞の前に置く
有點(兒) か 有一點(兒) で迷ったらどちらでもOK','解答例
問題1 解答例
今天有(一)點(兒)冷。
這個湯有(一)點(兒)鹹。
我有(一)點(兒)餓。
問題2 解答例
有(一)點(兒)苦。 (yǒu yì diǎn ér kǔ)
你有(一)點(兒)太早了。 (nǐ yǒu yì diǎn ér tài zǎo le)
※「你有(一)點(兒)太早了」は直訳で「あなたはちょっと早すぎます」となります。「太(tài)」を入れることで「～すぎる」の表現になります。','まとめ
「有(一)點(兒)」(yǒu yì diǎn ér) は「少し～だ」「ちょっと～だ」という意味の副詞
形容詞の前に置き、程度が少しだけ強まるニュアンスを伝える
一般的にネガティブよりの表現で使われることが多い
ちょっとした不満や感覚を伝えたいときに便利な表現です。例文や練習問題を通して、ぜひ使いこなしてみてくださいね！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson06',3,'「～してもいい？」！「可以(kě yǐ)」」の使い方をマスターしよう','文法解説
1. 提案を表す「可以(kě yǐ)」
まずは、仲間や友だちに「～してみない？」と提案するときの使い方です。

基本形：「(主語) + 可以(kě yǐ) + 動詞 + 目的語 」
意味： 「～したら？」・「～してくれない？」
例文
お母さんに何をプレゼントしたらいいかわかりません。
你可以送他一件紅色的新衣服。
新しい赤い洋服をプレゼントしてあげれば？。

你可以幫我拿一下嗎？
Nǐ kěyǐ bāng wǒ ná yíxià ma?
（ちょっと手伝ってくれない？）

こうした文は、相手に「～したらどうかな？」と提案したり誘ったりするニュアンスを含みます。

2. 許可を表す「可以(kě yǐ)」
次に、「～してもいいですか？」と誰かに許可を求めたり、逆に相手に「～してもいいよ」と言ってあげる使い方です。

媽媽，我可以吃冰淇淋嗎？　Ｂ：太冷了，不可以。

２、Ａ：老師，我現在可以去洗手間嗎？　Ｂ：可以。

　　Ａ：先生、今トイレに行ってもいいですか？　
　　Ｂ：いいですよ。

「可以(kě yǐ)」は「OK」というイメージなので、「やってもOK？」「やってもいいよ」という感じを表します。

答え方は可以阿！！','"問題：「いっしょにご飯を食べようか？」と言いたいときの文を作ってください。

(提案の「可以(kě yǐ)」を使う)

ヒント：主語は「我們(Wǒmen)」＝私たち、動詞は「吃(chī)」＝食べる、目的語は「飯(fàn)」＝ご飯 です。最後は「～嗎(ma)？」で提案のニュアンスになります。
問題２
問題： 「ここに座ってもいいですか？」と言いたいときの文を作ってください。

(許可の「可以(kě yǐ)」を使う)

ヒント：「ここ」は「這裡(zhèlǐ)」、「座る」は「坐(zuò)」です。最後に「嗎(ma)？」をつけるのを忘れずに。"','解答と解説
解答１
我們可以一起吃飯嗎？
Wǒmen kěyǐ yìqǐ chī fàn ma?

解説：「一起(yìqǐ)」を入れると「一緒に」という意味が強調できます。提案するときは、最後を疑問形にすると「～しようか？」のニュアンスになります。
解答２
我可以坐在這裡嗎？
Wǒ kěyǐ zuò zài zhèlǐ ma?

解説：「坐在(zuò zài)」で「～に座る」という表現です。「可以(kě yǐ)」を使うと、「ここに座ってもよいですか？」と丁寧に尋ねるニュアンスになります。','まとめ
今日は「可以(kě yǐ)」の2つの使い方を学びました。

提案：「(主語) + 可以 + 動詞 + 目的語 ～？」
「～してみない？」という誘いの表現
許可：「(主語) + 可以 + 動詞 + 目的語 ～嗎？」
「～してもいい？」と尋ねたり「～してもいいよ」と許可する表現
「可以(kě yǐ)」はとても便利で、提案・許可どちらにも使える魔法のフレーズです。ぜひ会話でたくさん使ってみてください！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson06',4,'「言い間違えた！」って中国語で？動詞＋錯で失敗表現をマスター！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson06',5,' 「できるようになった！」を中国語で表す！動詞＋會の使い方徹底解説','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson06',6,' 「何でもOK！」の中国語表現〜想吃什麼就吃什麼〜の使い方！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson06',7,'「きっと〜するよ！」中国語で安心させる表現《會～的》の使い方','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson06',8,'「〜したらすぐ〜する」を中国語で言いたいときは？『等……就……』の使い方！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson06',9,'「たった〇〇しか…」中国語の「才」の使い方！主観的に“少ない”を伝える便利表現！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson06',10,'A讓B + 感情！中国語で「〜を〜な気持ちにさせる」言い方をマスター！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',1,'移動方法をマスターしよう！「どうやって行くの？」を中国語で言おう','1. 「どうやって」を表す「怎麼 zěn me(3 5)」
「どうやって～するの？」と尋ねる場合は「怎麼 zěn me(3 5)」を使います。

你怎麼來？
　nǐ(3) zěn me(3 5) lái(2)
　（どうやって来るの？）
「來 lái(2)」は「来る」、「去 qù(4)」は「行く」を意味します。目的地が「ここ」の場合は「來」、それ以外の場合は「去」を使います。

你怎麼去？
　nǐ(3) zěn me(3 5) qù(4)
　（どうやって行くの？）
2. 「乗り物」に乗る場合は「坐 zuò(4)」を使う
「～に乗って行く・来る」は「坐～去」「坐～來」と表します。
乗り物の例：
公車 gōng chē(1 1)（バス）
計程車 jì chéng chē(4 2 1)（タクシー）
捷運 jié yùn(2 4)（MRT・地下鉄）
火車 huǒ chē(3 1)（電車）
例文
我坐公車去。
　wǒ(3) zuò(4) gōng chē(1 1) qù(4)
　（私はバスに乗って行きます。）
他坐捷運來。
　tā(1) zuò(4) jié yùn(2 4) lái(2)
　（彼はMRTに乗って来ます。）
3. 「自転車やバイクに乗る」は「騎 qí(2)」、歩くなら「走路 zǒu lù(3 4)」
自転車（腳踏車 jiǎo tà chē(3 4 1)）やバイク（機車 jī chē(1 1)）に乗るときは「騎 qí(2)」を使います。
歩いて行く場合は「走路 zǒu lù(3 4)」を使いましょう。
例文
我騎腳踏車來。
　wǒ(3) qí(2) jiǎo tà chē(3 4 1) lái(2)
　（私は自転車で来ました。）
你要走路去嗎？
　nǐ(3) yào(4) zǒu lù(3 4) qù(4) ma(5)
　（歩いて行くつもりですか？）','問題1
次の（　）に当てはまる最適な語句を選んで、全文を完成させてください。

A：你怎麼（　）學校？
　nǐ(3) zěn me(3 5) (　) xué xiào(2 4)
　（どうやって学校に行きますか？）
　B：我坐公車（　）。
　wǒ(3) zuò(4) gōng chē(1 1) (　)
　（バスに乗って行きます。）

ヒント：学校へ行く→「去 qù(4)」を使う。
答えを入れると「A：你怎麼去學校？　B：我坐公車去。」


A：他怎麼（　）日本？
　tā(1) zěn me(3 5) (　) rì běn(4 3)
　（彼はどうやって日本に来るの？）
　B：他坐飛機（　）。
　tā(1) zuò(4) fēi jī(1 1) (　)
　（彼は飛行機に乗って来ます。）

ヒント：日本に「来る」は「來 lái(2)」を使いましょう。飛行機に「乗って来る」は「坐飛機來」。
答えのイメージ：「來」「來」','【模範解答】
去 / 去
去 / 騎 / 去
來 / 來','まとめ
今日のポイントは「怎麼 zěn me(3 5)」を使った「どうやって？」の聞き方、そして目的地が“ここ”なら「來 lái(2)」、それ以外なら「去 qù(4)」を使うということでした。また、交通手段によって「坐 zuò(4)」「騎 qí(2)」「走路 zǒu lù(3 4)」を使い分ける点にも注意しましょう。これで「どうやって行くの？」という会話がスムーズになるはずです！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',2,'「状況の変化を表す“了“」をマスターしよう！','文法解説
1．「S + 形容詞 + 了」で状態の変化を表す
それまでそうではなかったのに、今は「形容詞の状態になった」という変化を伝える表現です。

例文1
我累了。
wǒ lèi le
（疲れてなかった状態から）「疲れたよ」という意味
例文2
天氣變熱了。
tiānqì biàn rè le
（まだ熱くなかったのが）「天気が暑くなった」という変化
このように、形容詞が示す状態に「なった」ことを強調したいときに使います。

我餓了。

2．「S + (助)動詞 + 了」で行動や可能の変化を表す
それまで「できなかったこと」が「できるようになった」「していなかったことを今はするようになった」など、行動や可能性に関する変化を表すときのパターンです。

例文1
公車到了。
gōngchē dào le
（まだバスが来ていなかったのが）「バスが到着した」
例文2
我們可以回家了。
wǒmen kěyǐ huí jiā le
（まだ帰れなかったのが）「帰れるようになった」という意味
「了」を文末につけることで、「状況の変化」をしっかりと伝えられます。

注意点
中国語の「了」は、日本語訳で過去の意味になる場合でも、「過去形」の用法とは言えません。
過去の了ではなくて変化の了で覚えてください
それは、日本語や英語にはない中国語の特徴。過去、現在、未来という時制の変化がない言語なので、ちょっとややこしいですね。','練習問題
次の文を、中国語で「～了」を使って表現してみましょう。

さっきまで暑くなかったけど、今は暑くなったよ。
ごはんができたから、一緒に食べられるようになったよ。
急に眠くなったよ。','解答例
現在很熱了。
xiànzài hěn rè le
（今は暑くなったよ）
飯做好了，我們可以一起吃了。
fàn zuò hǎo le, wǒmen kěyǐ yìqǐ chī le
（ごはんができたから、一緒に食べられるようになった）
我突然覺得很困了。
wǒ tūrán juéde hěn kùn le
（急に眠くなったよ）','まとめ
「S + 形容詞 + 了」 は、「以前は～ではなかった状態が、いまは変化して～になった」と言いたいときに使います。
「S + (助)動詞 + 了」 は、「今まではできなかった（していなかった）行動が、いまはできる（するようになった）」ときに使います。
ポイントは「変化」を伝えたいときに文末に「了（le）」をつけるということです。
今回の内容を身につければ、「まだ～じゃなかったのに、今は～だよ！」という状況をスムーズに伝えられるようになりますよ！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',3,'「動詞＋目的語」を文の最初に置いて“感想“を言ってみよう！','文法解説
1. どんなときに使う？
まず、この表現は「何をするか」をはっきり伝えたいときに使われます。たとえば、普通に言うなら「我覺得坐捷運很方便（私はMRTに乗るのがとても便利だと思います）」となりますが、それを「坐捷運，很方便。」と最初に「MRTに乗ること」を出すことで、「乗ること」に注目させることができるのです。

2. 基本の形
V(O) + コメント（感想・意見 など）
例：坐捷運（zuò jiéyùn），很方便。（MRTに乗るのはとても便利です）
3. 例文
踢足球（tī zúqiú），我們都很喜歡。
サッカーをするの、私たちみんな好きですよ。
走路（zǒu lù）去太慢了！
歩いて行くのは遅すぎる！
唱歌（chàng gē）、跳舞（tiào wǔ）都很有趣。
歌うのも、踊るのも、とても楽しいです。','練習問題
ここからは、実際にこの文法を使ってみましょう。

問題1
「本を読むのはとても面白いです。」

ヒント：
本を読む：看書（kàn shū）
とても面白い：很有趣（hěn yǒuqù）
問題2
「ケーキを作るのは少し難しいです。」

ヒント：
ケーキを作る：做蛋糕（zuò dàngāo）
少し難しい：有點難（yǒudiǎn nán）
問題3
「運動するのは体にいいです。」

ヒント：
運動する：做運動（zuò yùndòng）
体にいい：對身體很好（duì shēntǐ hěn hǎo）','解答例
看書（kàn shū）很有趣。

本を読むのはとても面白いです。
做蛋糕（zuò dàngāo）有點難。

ケーキを作るのは少し難しいです。
做運動（zuò yùndòng）對身體很好。

運動するのは体にいいです。','まとめ
今回学んだのは、「動詞＋目的語」を最初に言って、それについてどう感じるかを続ける文法です。中国語では「これをすること」自体を強調して、意見や感想をはっきり伝えられるのがポイントです。ぜひ普段の会話でも試してみてください！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',4,'「“又～又～”を使って、ひとつの主語に２つの特性を表そう！」','文法解説
1. 基本の形
「又～又～」は、ひとつの主語が同時に2つの特性（形容詞や動作）を持っていることを表します。
台湾のMRT（地下鉄）は「速くて便利」

文型は以下のとおりです。

S + 又 + 形容詞／(助)動詞 + 又 + 形容詞／(助)動詞
. 例文
台北的捷運　又快又方便

意味：台北のMRTは速くて便利です。

ポイント1：主語は必ず1つ。
ポイント2：「又」の直後には名詞は来ません。形容詞か動詞（特に助動詞）が入ります。

他　又會唱歌　又會畫畫

他　tā (1)
又　yòu (4)
會唱歌　huì chànggē (4・4,1)
又　yòu (4)
會畫畫　huì huàhuà (4・4,4)
意味：彼は歌も歌えるし、絵も描けます。
我同學的妹妹　又可愛　又漂亮

我同學的妹妹　wǒ tóngxué de mèimei (3,2・2・de・4,5)
又　yòu (4)
可愛　kě’ài (3,4)
又　yòu (4)
漂亮　piàoliang (4,・)

意味：私の同級生の妹はかわいくてきれいです。
我現在　又餓　又渴

我現在　wǒ xiànzài (3,4,4)
又　yòu (4)
餓　è (4)
又　yòu (4)
渴　kě (3)
意味：今、お腹も空いてのども渇きました。
他　又想去日本　又想去韓國

他　tā (1)
又　yòu (4)
想去日本　xiǎng qù rìběn (3,4,4,3)
又　yòu (4)
想去韓國　xiǎng qù hánguó (3,4,2,2)
意味：彼は日本にも行きたいし、韓国にも行きたいです。','練習問題
以下の日本語を、中国語の「又～又～」を使った文にしてみましょう。
（例文と同じにならないように注意してください）

このケーキは甘くて美味しい。
私のお兄さんはピアノも弾けるし、ギターも弾ける。
彼女は英語も話せるし、中国語も話せる。
ヒント
それぞれの文の主語を一つ決める（例：このケーキ、私のお兄さん、彼女）。
「又 A 又 B」の形で、形容詞や助動詞＋動詞を入れましょう。
助動詞＋動詞の例：「會 (huì) + 動詞」「想 (xiǎng) + 動詞」など。','答例
這個蛋糕　又甜　又好吃

這個蛋糕 zhège dàngāo (4,・4,1)
又 yòu (4)
甜 tián (2)
又 yòu (4)
好吃 hǎochī (3,1)
我哥哥　又會彈鋼琴　又會彈吉他

我哥哥 wǒ gēge (3,1,・)
又 yòu (4)
會彈鋼琴 huì tán gāngqín (4,2,1,2)
又 yòu (4)
會彈吉他 huì tán jítā (4,2,2,・)
她　又會說英文　又會說中文

她 tā (1)
又 yòu (4)
會說英文 huì shuō yīngwén (4,1,1,2)
又 yòu (4)
會說中文 huì shuō zhōngwén (4,1,1,2)','まとめ
今回は「又～又～」を使って、主語の2つの特性を同時に表す方法を学びました。

、ポイント1：主語は必ず1つ。
ポイント2：「又」の直後には名詞は来ません。形容詞か動詞（特に助動詞）が入ります。
例：「台北的捷運又快又方便」「我又餓又渴」「他又會唱歌又會畫畫」など。
この表現を覚えると、短いフレーズで「Aも～だしBも～」という意味を伝えられるので、とても便利です。ぜひ活用してみてください！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',5,'びっくり！「ひとつも〜ない」を強調する中国語表現【一＋M＋都／也＋不／沒】','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',6,'「〜させてあげる」「〜してもらう」の丁寧な言い方！中国語の『讓』の使い方','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',7,'「本当にきれいだね」はどう言う？中国語の強調「是＋形容詞」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',8,'全部使い果たした！中国語の「V光了」使い方解説💡','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',9,'「全然～ない！」を強調する中国語文法：一點兒都不〜の使い方！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',10,'「〜したばかりで、すぐに〜」を中国語で！『剛...就...』の使い方をマスターしよう！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson07',11,'「〜のうちに〇〇する！」中国語の「趁(著)」でチャンスを逃さず行動！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson08',1,'「因為～所以」の使い方','1．文法解説
(1) 基本の形：因為(yīnwèi) A，所以(suǒyǐ) B
意味：「Aが理由なので、Bという結果になる」
日本語訳：「Aだから、Bだ」「Aなので、Bだ」
例文1
中国語：因為(yīnwèi)學校(xué xiào)很(hěn)遠(yuǎn)，所以(suǒyǐ)我(wǒ)不(bù)想(xiǎng)走路(zǒu lù)到(dào)學校(xué xiào)去(qù)。
ピンイン：Yīnwèi xuéxiào hěn yuǎn, suǒyǐ wǒ bù xiǎng zǒulù dào xuéxiào qù.
和訳：学校が遠いので、歩いて行きたくありません。
例文2
中国語：因為(yīnwèi)他(tā)很(hěn)累(lèi)，所以(suǒyǐ)他(tā)要(yào)在(zài)家(jiā)休息(xiū xi)。
ピンイン：Yīnwèi tā hěn lèi, suǒyǐ tā yào zài jiā xiūxi.
和訳：彼はとても疲れているので、家で休みたいそうです。
例文3
中国語：因為(yīnwèi)明天(míng tiān)是(shì)我(wǒ)弟弟(dì di)的(de)生日(shēng rì)，所以(suǒyǐ)我要(wǒ yào)去(qù)買(mǎi)他的(tā de)生日禮物(shēng rì lǐ wù)。
ピンイン：Yīnwèi míngtiān shì wǒ dìdi de shēngrì, suǒyǐ wǒ yào qù mǎi tā de shēngrì lǐwù.
和訳：明日は弟の誕生日なので、プレゼントを買いに行きます。
(2) 「因為」または「所以」を省略する
中国語では「因為(yīnwèi)～所以(suǒyǐ)」のどちらかを省略しても通じます。ただし、両方とも省略してしまうことはできません。

例：「因為(yīnwèi)學校很遠，我不想走路到學校去。」
例：「學校很遠，所以(suǒyǐ)我不想走路到學校去。」
ただし、会話の流れや文章の書き方によっては、「因為」だけ、「所以」だけ、あるいは両方を使うかなどが自然に決まってきます。慣れてきたら自分の言いやすい形を試してみましょう。

(3) 間違いやすいポイント
順番：「因為～所以」の順番を逆にしない。
誤：所以我不想走路到學校去，因為學校很遠。
正：因為學校很遠，所以我不想走路到學校去。
両方の省略：二つとも消してしまうとただの「～が遠い。私は歩きたくない」になり、理由と結果のつながりがはっきりしません。','2．練習問題
以下の文を「因為(yīnwèi)～所以(suǒyǐ)」を使って完成させてみましょう。必要であれば「因為」か「所以」のどちらかを省略してもOKです。ただし、意味が通じるように気をつけてください。

(1) 文を並べ替えましょう

____ 學費(xué fèi)太(tài)貴(guì)。
____ 我(wǒ)決定(jué dìng)自己(zì jǐ)賺錢(zhuàn qián)上大學(shàng dàxué)。
ヒント：「学費が高い」という理由、「自分でお金を稼いで大学へ行く」という結果をつなげてください。


(2) 文を完成させましょう
問題：____天氣(tiān qì)不好(bù hǎo)，____我(wǒ)不想(bù xiǎng)出去(chūqù)玩(wán)。
ヒント：「天気が悪いから外に出たくない」という流れを作ってみましょう。
(3) 理由と結果を考えましょう
問題：以下のAとBを「因為～所以」を使ってひとつの文にまとめてください。
A：我很想學吉他(wǒ hěn xiǎng xué jí tā)。
B：我每天練習(wǒ měi tiān liàn xí)。
ヒント：「ギターを学びたい」という理由と「毎日練習している」という結果をどうつなげるかを考えてください。','3．解答例
(1) 文を並べ替えましょう
答えの例：因為(yīnwèi)學費太貴，所以(suǒyǐ)我決定自己賺錢上大學。
ピンイン：Yīnwèi xuéfèi tài guì, suǒyǐ wǒ juédìng zìjǐ zhuànqián shàng dàxué.
(2) 文を完成させましょう
答えの例：因為(yīnwèi)天氣不好，所以(suǒyǐ)我不想出去玩。
ピンイン：Yīnwèi tiānqì bù hǎo, suǒyǐ wǒ bù xiǎng chūqù wán.
または「天氣不好，所以我不想出去玩」「因為天氣不好，我不想出去玩」のように一方を省略してもOKです。
(3) 理由と結果を考えましょう
答えの例：因為(yīnwèi)我很想學吉他，所以(suǒyǐ)我每天練習。
ピンイン：Yīnwèi wǒ hěn xiǎng xué jítā, suǒyǐ wǒ měitiān liànxí.','4．まとめ
今日は「因為(yīnwèi)～所以(suǒyǐ)」という形を使って、「理由」と「結果」を伝える文の作り方を学びました。

基本：「因為 A，所以 B」＝「Aだから、Bだ」
省略可能：どちらか一方だけ残してもOK。ただし両方消さないこと。
ポイント：順番を間違えない、両方とも省略しない。
この表現を覚えておくと、理由をしっかり伝えたいときにとても便利です。ぜひ会話や文章で使ってみてください。

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson08',2,'「推測の『吧』」をマスターしよう！」','1．文法解説
◆「推測の『吧』」とは？
「吧（ba）」は、話し手が「～だよね？」「～でしょう？」と相手に同意や確認を求めるときに使う表現です。相手に「きっとこうだろう」と思っているけれど、自分の推測が正しいかどうかをやんわり確かめたい、という気持ちが込められています。

ポイント：

語順は通常の平叙文のままで、最後に「吧（ba）」をつけます。
「是不是」などと比べて、相手にやわらかく確認するときに使われやすいです。
話し手自身がある程度確信を持っている場合に使うことが多いです。
◆例文
A：你會唱中文歌吧？
Nǐ huì chàng zhōngwén gē ba?
（あなた、中国語の歌は歌えますよね？）


A：他平常都坐捷運來上課吧？
Tā píngcháng dōu zuò jiéyùn lái shàngkè ba?
（彼は普段、MRTで授業に来てますよね？）


A：你現在有空吧？要不要跟我一起去看網球比賽？
Nǐ xiànzài yǒu kòng ba? Yào bú yào gēn wǒ yìqǐ qù kàn wǎngqiú bǐsài?
（今、時間空いてますよね？ 一緒にテニスの試合を見に行きませんか？）


▼間違えやすいポイント：

「吧（ba）」は推測の質問として使われるだけでなく、「～しましょう」などの提案にも使われます（例：我們走吧 Wǒmen zǒu ba：行きましょう）。今回の用法は、「相手に確認・同意を求める推測」の場合なので、文末の語気がやや疑問調になることを意識してみてください。
「吧」と「嗎(ma)」の違いにも注意しましょう。「嗎(ma)」は単純な疑問（はい／いいえ）で聞くときに使いますが、「吧(ba)」は**「～でしょう？」「～ですよね？」と相手の答えをある程度予測している**点が異なります。','2．練習問題
それでは、ここで練習問題に挑戦してみましょう！以下の日本語を参考に、「～でしょう？」という意味で文末に「吧（ba）」をつけた中国語の文章を作ってください。

（日本語）あなたのお父さんは背が高いですよね？
（ヒント）「背が高い」は「個子很高（gèzi hěn gāo）」と表現します。

（日本語）今日は暑いですよね？
（ヒント）「暑い」は「熱（rè）」、主語は「今天（jīntiān）」を使いましょう。

（日本語）あなたはピアノが弾けますよね？
（ヒント）「ピアノを弾く」は「彈鋼琴（tán gāngqín）」、主語は「你（nǐ）」です。','◆解答例
你爸爸個子很高吧？
Nǐ bàba gèzi hěn gāo ba?
今天很熱吧？
Jīntiān hěn rè ba?
你會彈鋼琴吧？
Nǐ huì tán gāngqín ba?','3．まとめ
今日のポイントは、**「～でしょう？」「～ですよね？」という推測をやわらかく相手に確認する表現「推測の『吧』」**でした。文末に「吧」をつけることで、単なる質問ではなく「自分の推測が合っているかを聞く」ニュアンスを出せるのが特徴です。

語順は基本そのまま
文末に「吧（ba）」をつけて、相手にやんわり確認
推測の「吧」と提案の「吧」を混同しない
このポイントを覚えておくと、日常会話で「ですよね？」と自然に言いたいときにとても便利ですよ！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson08',3,'VV看で『～してみる』！チャレンジ表現をマスターしよう','文法解説：「単音節動詞を2回＋看」で「～してみる」
1. 構造
単音節動詞を2回くり返し
そのあとに看(kàn) をつける
形は「動詞＋動詞＋看」で、「ちょっと試しに～してみる」という意味になります。
ニュアンス：「まずやってみよう」「ちょっと試してみて判断しよう」
友達に「とりあえずやってみたら？」と背中を押すときにも使えますし、自分が「ちょっと試してみようかな」と言うときにも使えます。
たとえば、以下のような感じです：

（このレストラン、人気があるみたいだね。）　行ってみる
B：要不要去去看？
Yào bú yào qù qù kàn?
（ちょっと行ってみない？）


「想 (xiǎng)」（考える）→「想想看 (xiǎng xiǎng kàn)」　考えてみる
これ一緒にやってみない？　
考えてみてよ


「吃( chī )」→「吃吃看 ( chī chī kàn )」　食べてみる
これおいしいかな？　食べてみなよ



「試 (shì)」（試す）→「試試看 (shì shì kàn)」これは万能！
（この方法がうまくいくかわからないんだよね。）

B：那就試試看吧。
Nà jiù shì shì kàn ba.
（じゃあ試しにやってみようよ。）


3. 間違いやすいポイント
単音節の動詞だけ
2音節以上の動詞（例：「學習(xué xí)」など）には基本的にこの形は使えません。
最後の看(kàn)を忘れない
「穿穿」で終わらず「穿穿看」とする必要があります。','練習問題
それでは練習問題です。下の会話文のカッコの中に入る動詞を、「単音節動詞を2回＋看」の形で考えてみましょう。

問題1
A：この帽子、僕に似合うかな？
B：とりあえず（　　　）看 ！

ヒント： 「かぶる」は「戴(dài)」
問題2
A：この問題の答え、ちょっと複雑だね。
B：まずは（　　　）看再說！一緒に考えよう。

ヒント： 「考える」は「想(xiǎng)」
問題3
A：これ、ちゃんと動くかわからないんだ。
B：じゃあ一回（　　　）看吧。もし動かなかったら別の方法を考えよう。

ヒント： 「試す」は「試(shì)」','解答例
戴戴看 (dài dài kàn)
想想看 (xiǎng xiǎng kàn)
試試看 (shì shì kàn)','まとめ
今日のポイントは「単音節動詞を2回＋看」で「試しに～してみる」という表現が作れることでした。

使いたい動詞が単音節であること
動詞を2回繰り返して、最後に「看」までしっかりつけること
「まずはやってみよう」「お試しでどう？」というときに便利
ぜひ会話の中でたくさん使ってみてくださいね！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson08',4,'快（要）／要～了を使って、もうすぐ～するを言えるようになろう！「快（要）／要～了」でもうすぐ起こることを表現しよう！','文法解説
① 「快（要）～了」「要～了」：まもなく～する
「快」または「快要」を使うと、「もうすぐ～する」という意味になります。

📌 文の構造
👉 快（要）+ 動詞 + 了

📌 例文

快下雨了。（Tiān kuài xiàyǔ le.）
もうすぐ雨が降ります。
電影快開始了。（Diànyǐng kuài kāishǐ le.）
映画がもうすぐ始まります。
他快回來了。（Tā kuài huílái le.）
彼はもうすぐ帰ってきます。
📝 ポイント

「快」だけでもOKですが、のみは少しカジュアル。「快要」の方が良く使う
「了」をつけることで、もうすぐ変化が起こることを強調できます。


具体的な時間があるときは「要～了」しか使えない。

📌 文の構造
👉 （時間詞）+ 要 + 動詞 + 了

📌 例文

火車五分鐘後要開了。（Huǒchē wǔ fēnzhōng hòu yào kāi le.）
電車は5分後に発車します。
我們明天要考試了。（Wǒmen míngtiān yào kǎoshì le.）
私たちは明日テストがあります（もうすぐテストです）。
媽媽晚上要回來了。（Māma wǎnshàng yào huílái le.）
お母さんは今夜帰ってきます。
📝 ポイント

時間詞（○分後、明日、夜など）があるときは「要～了」を使う！
「快～了」との違いは、「要～了」には具体的な時間があることが多い という点です。','練習問題
🔹次の日本語を中国語に訳しましょう！

まもなく夏休みが始まります。（ヒント：「夏休み＝暑假」）
10分後に電車が出発します。（ヒント：「出発する＝開」）
もうすぐご飯ができあがるよ。（ヒント：「ご飯ができる＝做好飯」）
彼はすぐに来ます。（ヒント：「来る＝來」）
明日、テストが始まるよ。（ヒント：「テストが始まる＝考試開始」）','解答
暑假快開始了。（Shǔjià kuài kāishǐ le.）
10分鐘後火車要開了。（Wǔ fēnzhōng hòu huǒchē yào kāi le.）
飯快做好了。（Fàn kuài zuòhǎo le.）
他快來了。（Tā kuài lái le.）
明天考試要開始了。（Míngtiān kǎoshì yào kāishǐ le.）','まとめ
✔ 「快（要）～了」 は「もうすぐ～する」「まもなく～する」という意味！
✔ 「快～了」と「要～了」の違いは、要～了は具体的な時間があるときに使う！
✔ 文末の「了」を忘れずにつけること！

それではまた次回お会いしましょう～ 下次見! 😊');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson08',5,'「～すら〇〇!?」驚きを伝える中国語表現！連～都の使い方をマスターしよう！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson08',6,'「彼みたいな人」って中国語でどう言う？像〜這樣的Nをマスター！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson08',7,'選ぶ余地ナシ…「只好」で表す"やむを得ず"の気持ち【中国語文法】','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson08',8,'「〜のために」を中国語で言うと？「為了」の使い方完全ガイド！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson08',9,'接触・達成・心の変化を表す「上」の使い方をマスターしよう！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson08',10,'「〜のせいで」を表す中国語：因為～的關係の使い方','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',1,'從…到…（時間）—— 中国語で期間を表す表現','文法解説
「從（cóng）」は「～から」、「到（dào）」は「～まで」という意味を持ちます。
これらを組み合わせて 「從A到B」 の形にすると、時間の範囲 を表すことができます。

✅ 基本構造：
　從 + 開始の時間 + 到 + 終わりの時間

この表現は、特定の期間や時間帯を示すときによく使われます。
また、主語が同じ場合は、後半の主語を省略することができます。

例文
📌 日常でよく使う「從…到…」の例文を見てみましょう！

1️⃣ 暑假從七月到八月。
　📌 Xuéxiào de shǔjià cóng qī yuè dào bā yuè.
　🎯 学校の夏休みは7月から8月までです。

2️⃣ Ａ：你每天工作幾點到幾點？
　📌 Nǐ měitiān gōngzuò jǐ diǎn dào jǐ diǎn?
　🎯 あなたは毎日何時から何時まで仕事ですか？
　Ｂ：我每天從上午八點到下午六點都在公司。
　📌 Wǒ měitiān cóng shàngwǔ bā diǎn dào xiàwǔ liù diǎn dōu zài gōngsī.
　🎯 私は毎日午前8時から午後6時まで会社にいます。

3️⃣ Ａ：你下週要去旅行嗎？
　📌 Nǐ xià zhōu yào qù lǚxíng ma?
　🎯 来週旅行に行く予定ですか？
　Ｂ：對，我從星期五到星期天會去台中玩。
　📌 Duì, wǒ cóng xīngqī wǔ dào xīngqī tiān huì qù Táizhōng wán.
　🎯 はい、私は金曜日から日曜日まで台中に遊びに行きます。','練習問題
次の文を中国語に訳してみましょう！

問題
私は毎日朝7時から夜11時まで勉強しています。
私のアルバイトは午後2時から夜8時までです。
私たちは6月から8月まで台湾に行く予定です。
✅ ヒント：
・「勉強する」→ 學習（xuéxí）
・「アルバイト」→ 打工（dǎgōng）
・「行く予定」→ 打算去（dǎsuàn qù）','解答
我每天從早上七點到晚上十一點都在學習。
　📌 Wǒ měitiān cóng zǎoshàng qī diǎn dào wǎnshàng shíyī diǎn dōu zài xuéxí.



我的打工時間是從下午兩點到晚上八點。
　📌 Wǒ de dǎgōng shíjiān shì cóng xiàwǔ liǎng diǎn dào wǎnshàng bā diǎn.

我們打算從六月到八月去台灣。
　📌 Wǒmen dǎsuàn cóng liù yuè dào bā yuè qù Táiwān.','まとめ
今日は 「從…到…」 を使った時間表現について学びました！

✅ ポイントのおさらい！
✔ 「從 A 到 B」= 「A から B まで」 の意味
✔ 時間の範囲 を示すときに使う
✔ 主語が同じ場合、後半の主語を省略できる
この表現を使えば、スケジュールや期間を簡単に伝えられますね✨
日常会話でどんどん使ってみてくださいね！
それではまた次回お会いしましょう～下次見! 🎉');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',2,'「先…再…」を使いこなそう！','🔹文法解説
「先…再…」は、 二つの事柄が前後して発生する ことを表します。
日本語で言う「まず…して、それから…する」と同じ意味ですね。

📌 基本の形
👉 先 + 動詞1 + 再 + 動詞2
（まず～して、それから～する）

📌 例文

1️⃣ 私はまず宿題をしてから、ゲームをする。
✅ 我先寫作業，再玩遊戲。
　 wǒ xiān xiě zuòyè，zài wán yóuxì。

2️⃣ 彼は先にご飯を食べて、それから出かける。
✅ 他先吃飯，再出去。
　 tā xiān chī fàn，zài chūqù。

3️⃣ あなたは先にお風呂に入って、それから寝てください。
✅ 你先洗澡，再睡覺。
　 nǐ xiān xǐzǎo，zài shuìjiào。

4️⃣ 彼女は先に台湾へ行って、それから日本に帰ってきます。
✅ 她先去台灣，再回日本。
　 tā xiān qù táiwān，zài huí rìběn。','🔹練習問題
次の日本語を中国語にしてみましょう！💡

1️⃣ まず朝ごはんを食べて、それから仕事に行く。
2️⃣ 私は先に本を読んで、それから映画を見る。
3️⃣ 彼は先に銀行へ行って、それから買い物をする。
4️⃣ あなたは先に宿題をして、それからテレビを見てもいいよ。

✨ヒント✨

「朝ごはんを食べる」→ 吃早餐（chī zǎocān）
「仕事に行く」→ 上班（shàngbān）
「本を読む」→ 看書（kàn shū）
「映画を見る」→ 看電影（kàn diànyǐng）
「銀行へ行く」→ 去銀行（qù yínháng）
「買い物をする」→ 買東西（mǎi dōngxi）
「宿題をする」→ 寫作業（xiě zuòyè）
「テレビを見る」→ 看電視（kàn diànshì）','🔹解答
1️⃣ 我先吃早餐，再去上班。
2️⃣ 我先看書，再看電影。
3️⃣ 他先去銀行，再買東西。
4️⃣ 你先寫作業，再看電視。','🔹まとめ
✔ 「先…再…」は 「まず～して、それから～する」 という順序を表す表現！
✔ 基本の形は「先 + 動詞1， 再 + 動詞2」
✔ 主語が入る場合は「再」の前に置く！

これを使えば、会話で自然に順序を説明できますね！
それではまた次回お会いしましょう～ 下次見! 👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',3,'「能」の使い方：～できる・～してもいい','「能」は「能力があってできる」「状況的に可能である」という意味で使います。

🟢 1. 能力があって「できる」
この場合、「スキルや能力があるので、できる」という意味になります。
たとえば…
＜例文＞
我能游泳。（Wǒ néng yóuyǒng.）
　👉「私は泳ぐことができます。」（能力がある）
他能说中文。（Tā néng shuō zhōngwén.）
　👉「彼は中国語を話すことができます。」（話す能力がある）
🚨 注意！
「能」は能力的・状況的に可能な場合に使います。例えば、習得したスキルを表す場合には「会（huì）」の方がよく使われます。


✅ 我会游泳。（Wǒ huì yóuyǒng.）もOK！（泳ぐスキルがある）

🟢 2. 状況的に「できる」
この場合、「その場の条件や状況が整っているので、できる」という意味になります。

✅ 例文
今天太忙了，我不能去。（Jīntiān tài máng le, wǒ bù néng qù.）
　👉「今日はとても忙しくて、行くことができません。」（忙しくて行ける状況ではない）
这里太吵了，我不能睡觉。（Zhèlǐ tài chǎo le, wǒ bù néng shuìjiào.）
　👉「ここはうるさすぎて、寝ることができません。」（環境が悪くて眠れない）
我感冒了，不能出去玩。（Wǒ gǎnmào le, bù néng chūqù wán.）
　👉「風邪をひいたので、遊びに行けません。」（体調が悪くて行ける状況ではない）
🚨 注意！
「能」は 「環境・状況・体調などが原因で、できる・できない」 を表すときにも使います。
この場合、「会（huì）」ではなく 「能（néng）」を使うのが正解！


② 能：許可を表す（～してもいい）
「能」は許可を表すときにも使えます。「～してもいいですか？」と尋ねるときに便利です。

＜例文＞
这里能拍照吗？（Zhèlǐ néng pāizhào ma?）
　👉「ここで写真を撮ってもいいですか？」（許可を求める）
你能帮我一下吗？（Nǐ néng bāng wǒ yíxià ma?）
　👉「ちょっと手伝ってもらえますか？」（頼むときの表現）
🚨 注意！
「能」は「～してもよいか？」という一般的な許可を尋ねるときに使います。一方で、もっとフォーマルな場面では「可以（kěyǐ）」の方がよく使われます。
✅ 这里可以拍照吗？（Zhèlǐ kěyǐ pāizhào ma?）もOK！','① 私は車を運転できます。
👉 （ヒント：運転する＝开车 kāi chē）

② ここで電話をかけてもいいですか？
👉 （ヒント：電話をかける＝打电话 dǎ diànhuà）

③ あなたはピアノを弾くことができますか？
👉 （ヒント：ピアノを弾く＝弹钢琴 tán gāngqín）','解答
① 我能开车。（Wǒ néng kāi chē.）
② 这里能打电话吗？（Zhèlǐ néng dǎ diànhuà ma?）
③ 你能弹钢琴吗？（Nǐ néng tán gāngqín ma?）','まとめ
今日学んだ「能 néng」のポイントを振り返りましょう！

✅ 「能（néng）」は「～できる」「～してもいい」の意味で使う！
✅ 能力的・状況的に可能な場合の「できる」
✅ 許可を求めるときの「してもいい？」
✅ 状況によって「会（huì）」や「可以（kěyǐ）」と使い分けよう！

それではまた次回お会いしましょう～下次见！');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',4,'「～のほうが比較的～だ」を言えるようになろう！','🔍 文法解説：「比較（bǐjiào）」の使い方
✅ 基本構造
👉 主語 ＋ 比較 ＋ 形容詞
意味：比較的○○だ

📝 例文（日常会話でよく使うフレーズ）
形容詞と一緒に使う場合
今天的天氣比較熱。
　(jīntiān de tiānqì bǐjiào rè.)
　→ 今日は比較的暑いです。
　（ほかの日と比べて、今日は暑いと感じる）

這家餐廳的菜比較好吃。
　(zhè jiā cāntīng de cài bǐjiào hǎochī.)
　→ このレストランの料理は比較的おいしいです。

這件衣服比較便宜。
　(zhè jiàn yīfú bǐjiào piányi.)
　→ この服は比較的安いです。

2. （V＋得）＋ 比較＋形容詞
動詞の後ろに 「得（de）」 をつけることで、動作の程度を表すことができます。
この形に 「比較（bǐjiào）」 を加えると、「～のほうが比較的～だ」という意味になります。

📌 基本の形
👉 S + V + 得 + 比較 + 形容詞
（主語＋動詞＋得＋比較＋形容詞）

🔹 例文
1️⃣ 哥哥跑得比較快。
（Gēgē pǎo de bǐjiào kuài.）
👉 お兄ちゃんは走るのが比較的早いです。

2️⃣ 她寫字寫得比較好看。
（Tā xiě zì xiě de bǐjiào hǎokàn.）
👉 彼女は字を書くのが比較的きれいです。','練習問題
✅ 次の質問に中国語で答えてみましょう！

1. A：誰比較瘦？
　B：（　　　　　　）

🔹 ヒント：「お姉ちゃんの方が痩せています」 → 姐姐比較瘦


3. A：你們兩個人，誰唱歌唱得比較好聽？
　B：（　　　　　　）

🔹 ヒント：「私は彼の方が上手いと思います」 → 我覺得他唱得比較好聽。','','まとめ
✅ 「比較（bǐjiào）」は 「比較的～だ」 という意味。
✅ 「S + 比較 + 形容詞」 で、「～の方がやや～だ」と表現できる。
✅ 「S + V + 得 + 比較 + 形容詞」 で、動作の程度を表現できる。

日常会話でとてもよく使う表現なので、ぜひ覚えて使ってみてください！

それではまた次回お会いしましょう～下次見! 👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',5,'中国語ですぐ使える！「快一點兒」「慢一點兒」で急かす・ゆっくりしてと言える！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',6,'場所・時間・数量の到達を示す便利な表現「V+到」完全マスター！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',7,'疑問詞だけど疑問詞じゃない？「あまり〜ない」「特に〜してない」を表す【不/沒＋疑問詞】の使い方','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',8,'会話が一気にネイティブ風！驚きを表す「怎麼這麼…？」！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',9,'日本人が意外とできない中国語！V 得/不下「入りきる／入りきらない」をマスターしよう！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',10,'リズムで覚える！中国語の動詞重ね型「乾乾淨淨的」「慢慢地走」完全マスター！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',11,'10課「不但…而且…」で中国語の文章を一気にレベルアップ！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',12,'これを言えたらネイティブ！強調表現「Vs死了」！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',13,'【ネイティブ必須】「越…越…」で「〜すればするほど」をスムーズに！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',14,'⭐︎日本語の「到底」とは違う？「いったい何なの？」を自然に言う方法！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',15,'【中国語の視点表現】「對NP來說」で「〜にとって」を自在に言おう！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',16,'「的話」＝もし〜なら？一番簡単な仮定表現を完全解説！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson09',17,'【超便利表現】「對…有幫助」「有影響」「有好處」日常で使い倒そう！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson10',1,'名詞を説明するときに使う『的』のカンタン使い方講座」','【文法解説】
「的」は、名詞を説明する部分と名詞をつないでくれる言葉です。

① だれが何をしたかを表す文が名詞を説明する場合

我寫的字（wǒ xiě de zì）
「私が書いた文字」
媽媽給我的蘋果（māma gěi wǒ de píngguǒ）
「お母さんが私にくれたリンゴ」
名詞を説明する文（我寫／媽媽給我）のあとに「的」を入れるだけでOKです。

② 動作や状態を表すフレーズが名詞を説明する場合
「台北でMRT（地下鉄）に乗る人→名詞は人　どんな人？台北でMRT（地下鉄）に乗る
在台北坐捷運的人
後ろに文を続けることができます
在台北坐捷運的人很多。（zài Táiběi zuò jiéyùn de rén hěn duō）
「台北でMRT（地下鉄）に乗る人はたくさんいます」

中国語を話せる人→名詞は人　中国語を話す→會說中文的人

會說中文的人不一定會教中文。（huì shuō Zhōngwén de rén bù yídìng huì jiāo Zhōngwén）
「中国語を話せる人が必ずしも中国語を教えられるわけではありません」
「在台北坐捷運」「會說中文」のような動作や状態を表す部分も、「的」を挟んで名詞（人）を説明しています。

③ 指示代詞と量詞がある場合

我太太買的那件衣服好貴！（wǒ tàitai mǎi de nà jiàn yīfu hǎo guì）
「私の妻が買ったあの服は高かった！」
你問的這兩個問題都非常難。（nǐ wèn de zhè liǎng ge wèntí dōu fēicháng nán）
「あなたが聞いたこの2つの質問はとても難しいです」
「那件衣服」「這兩個問題」という名詞にも同じように「的」をつけて説明します。','以下の日本語を中国語にしてみましょう。

「兄が撮った写真はとてもきれいです」
「昨日あの店で食べた料理はおいしかった」
「あの人が書いた本は有名です」
ヒント：

「兄が撮った」は「哥哥（gēge）＋撮る（pāi）＋的＋写真（zhàopiàn）」
「昨日あの店で食べた」は「昨天在那家店吃（動詞）＋的＋料理（cài）」
「あの人が書いた」は「あの人（nà ge rén）＋書く（xiě）＋的＋本（shū）」','解答例：

哥哥拍的照片很漂亮。
（wǒ gēge pāi de zhàopiàn hěn piàoliàng）
昨天在那家店吃的菜很好吃。
（zuótiān zài nà jiā diàn chī de cài hěn hàochī）
那個人寫的書很有名。
（nà ge rén xiě de shū hěn yǒumíng）','「的（de）」は、名詞を説明する文や動作をまとめるときに使います。
「○○が～した」や「～する人・もの」を表現したいときに「的」を挟みます。
ぜひ色々な例文で練習してみてくださいね。

────────────────────────────────── 【締めのあいさつ】
それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson10',2,'「『多＋動詞』＆『少＋動詞』を使いこなそう！―『もっと～／～を控えよう』の中国語表現解説」','【文法解説】

◆ 「多＋動詞」
「多」は「たくさん」「もっと」という意味があります。動作を表す言葉（食べる・見る・歩く など）と組み合わせることで、「もっと～しなさい」「たくさん～する」というニュアンスを表せます。

例1：多走路（duō zǒulù）
意味：「もっと歩くようにしなさい」「たくさん歩くようにしなさい」

例2：多看電視（duō kàn diànshì）
意味：「もっとテレビを見たら？」（たとえば中国語の勉強のためにテレビを見なさいと勧める感じ）

これらは、「もっとしたほうがいいよ」「たくさんするといいよ」という提案をするときに便利です。

◆ 「少＋動詞」
「少」は「少なめに」「控える」という意味があります。動作を表す言葉と組み合わせると、「～するのを控えなさい」「少なめに～する」という表現になります。

例1：少玩手機（shǎo wán shǒujī）
意味：「スマホで遊ぶのを控えなさい」

例2：少花錢（shǎo huā qián）
意味：「あまりお金を使わないようにしなさい」

「～しすぎないほうがいいよ」「控えめにしておきましょう」と伝えたいときに役立ちます。

【間違いやすいポイント】

「多＋動詞」と「少＋動詞」の順番が逆にならないように気を付ける

「走路多」や「花錢少」は自然な言い方ではありません。「多走路」「少花錢」のように「多／少」を先に置きましょう。
「多／少」の後ろは、基本的に「食べる」「使う」「歩く」などの動作を示す言葉が来る

名詞とだけ組み合わせるのではなく、動作を示す言葉（動詞）をしっかり入れるのがポイントです。','【練習問題】
ここからは練習問題です。文法解説で取り上げた例文とは別の例文を使っています。ぜひ実際に声に出して読んでみてください。

① 「もっと運動して健康を保ちましょう」
【中国語にしてみよう】
ヒント：運動する → 運動（yùndòng）、健康を保つ → 可以略
解答例：多運動（duō yùndòng）
→ 意味：「もっと運動しよう」

② 「甘い物をあまり食べすぎないようにしてね」
【中国語にしてみよう】
ヒント：甘い物 → 甜食（tiánshí）、食べる → 吃（chī）
解答例：少吃甜食（shǎo chī tiánshí）
→ 意味：「甘い物をあまり食べすぎないようにしてね」

③ 「テレビを見るのを少し控えて
【中国語にしてみよう】

ヒント：テレビを見る → 看電視（kàn diànshì）、頑張る → 可以略
解答例：少看電視（shǎo kàn diànshì）
→ 意味：「テレビを見るのを控えて勉強しようね」

④ 「もっと野菜を食べるようにしよう」
【中国語にしてみよう】

ヒント：野菜 → 蔬菜（shūcài）、食べる → 吃（chī）
解答例：多吃蔬菜（duō chī shūcài）
→ 意味：「もっと野菜を食べよう」','','【まとめ】
・「多＋動詞」で「もっと～しなさい」「たくさん～する」と提案できる。
・「少＋動詞」で「～するのを控える」「少なめに～する」とアドバイスできる。
・「多／少」が先、動作を示す言葉が後ろという語順がポイント。

どちらもとても日常で使いやすい表現なので、ぜひ普段の中国語会話で活用してみてくださいね。

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson10',3,'「“會(huì)”で未来の可能性を表す！中国語で「～だろう」を使いこなそう」','【文法解説】

◆ 「會(huì)」ってどんなときに使うの？

客観的に分かる未来や習慣を示す時に使う


我明天會去看電影。
wǒ míngtiān huì qù kàn diànyǐng
「私は明日映画を見に行きます。」→既にチケットを買っている

明天會下雨（Míngtiān huì xià yǔ）。
明日雨が降るだろう。

我每天都會在這邊買早餐（Wǒ měitiān dōuhuì zài zhè biān mǎi zǎocān）。
毎日ここで朝ごはんを買っています。（いつもそうしているから、これからもそうだろう）」

你明天會來嗎?


「會（huì）」と「要（yào）」は、どちらも未来やこれからすることを指し示しますが、「會」は客観的な可能性の強調、「要」は主観的な意志や決まった予定の強調と覚えると使い分けやすいです。','練習問題
ここからは実際に練習問題にチャレンジしてみましょう！
（※練習問題の文は上記例文とは別のものを使用しています）

問題1
次の日本語を、中国語にしてみましょう。
「明日はきっと暑くなるだろう。」

ヒント

「明日」は「明天（míngtiān）」
「暑い」は「熱（rè）」
「なる」は「會（huì）」の後に「形容詞」をつける感覚
解答例
明天會很熱。
míngtiān huì hěn rè

問題2
（　　）に正しい言葉を入れて文章を完成させましょう。
「週末、彼は家にいるだろう。」

ヒント

「きっと～だろう」は「會（huì）」
「家にいる」は「在家（zài jiā）」
解答例
週末だから、他會在家。
zhōumò de shíhou, tā huì zài jiā.

問題3
「私の弟は来月、北京へ引っ越すだろう。」

「我弟弟下個月會搬到北京。」

ヒント

「弟弟」は「私の弟」
「下個月」は「来月」
「搬到北京」は「北京へ引っ越す」
解答例
「私の弟は来月、北京へ引っ越すだろう。」','','「會（huì）」は、
「～だろう」「～するはずだ」という客観的に分かる未来や習慣を示す時に使う
「要（yào）」は、**話し手や相手の「意志」や「予定」**を強調する言葉。
「～するつもりだ」「～しようと思っている」「～する必要がある」というニュアンスが強いです。');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson10',4,'「要是／如果…就…」で条件を相手に伝えよう！','◆ 文法解説
基本の形
要是A…就B…
如果A…就B…
「もしAが起きたら、Bをする・Bになるよ」という構造になります。

「要是／如果…就…」の意味
要是（yàoshì）や如果（rúguǒ）は「もし～ならば」という意味を表し、その後に就（jiù）を続けることで「その場合～だよ」という流れを作ります。



例文①（主語が同じ場合）
要是明天放假（yàoshì míngtiān fàngjià），我就去圖書館（wǒ jiù qù túshūguǎn）。
もし明日お休みなら、私は図書館に行きます。

例文②（主語が同じ場合）
如果今天不下雨（rúguǒ jīntiān bú xiàyǔ），我就想去公園（wǒ jiù xiǎng qù gōngyuán）。
もし今日雨が降らないなら、公園に行きたいと思います。

例文③（主語が変わる場合）
要是你不忙（yàoshì nǐ bù máng），我就請你看電影（wǒ jiù qǐng nǐ kàn diànyǐng）。
もしあなたが忙しくないなら、私が映画に招待します。
後半の文に出てくる「私（wǒ）」のように、別の人が主語になるときは「就（jiù）」の前にその主語を置くのが特徴です。','◆ 練習問題

ここからは、文法解説で使った例文とは別の文を用意しました。実際に「要是／如果…就…」を使ってみましょう。

＜問題1＞
（　　）天氣好（tiānqì hǎo），（　　）去海邊（qù hǎibiān）。

ヒント：天気が良かったら海辺に行く、という内容を伝えたい。
解答例：要是天氣好，我就去海邊。
ピンイン付き：要是天氣好（yàoshì tiānqì hǎo），我就去海邊（wǒ jiù qù hǎibiān）。
＜問題2＞
（　　）我有時間（wǒ yǒu shíjiān），（　　）做飯（zuòfàn）。

ヒント：「もし私に時間があれば、私は料理をする」という文章を作りたい。
解答例：如果我有時間，我就做飯。
ピンイン付き：如果我有時間（rúguǒ wǒ yǒu shíjiān），我就做飯（wǒ jiù zuòfàn）。
＜問題3＞
（　　）他不來（tā bù lái），我（　　）打電話給他（dǎ diànhuà gěi tā）。

ヒント：「もし彼が来なかったら、私が電話してみる」という流れにしたい。
解答例：要是他不來，我就打電話給他。
ピンイン付き：要是他不來（yàoshì tā bù lái），我就打電話給他（wǒ jiù dǎ diànhuà gěi tā）。','','◆ まとめ

✅「要是（yàoshì）／如果（rúguǒ）…就（jiù）…」は、条件を示して「もし～ならば、その場合～だよ」と伝える便利なフレーズ。
✅主語が変わる場合は「就（jiù）」の前に新しい主語を置いて表現する。
✅日常会話で「もしこうなったら？」「じゃあこうしよう！」というときに、とってもよく使う表現なので、ぜひ練習問題や実際の会話で試してみてくださいね。

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson11',1,'沒(méi) と 還沒(hái méi) 「まだ～していない」の言い方をマスタ‐しよう！','全ての文法解説
1. 「沒(méi)」の基本的な使い方
「沒(méi)」は、ある動作や変化が起こっていないことを表すときに使います。過去形でも現在形でも使うことができます。

ポイント
「～しなかった」「～していない」の意味を表します。
日本語でいう「～しなかった」という過去の否定や、結果として「～していない」状態を示す場合にも使われます。
例文
我沒吃早餐。
(wǒ méi chī zǎocān)
「私は朝ごはんを食べていない（食べなかった）。」

他沒去學校。
(tā méi qù xuéxiào)
「彼は学校に行っていなかった（行かなかった）。」

你沒看到嗎？
(nǐ méi kàn dào ma)
「見なかったの？（見えていないの？）」

※「沒(méi)」を使うと、過去でも現在でも「その動作は起こっていない」という意味合いになります。

2. 「還沒(hái méi)」の基本的な使い方
「還沒(hái méi)」は「まだ～していない」ことを表します。つまり、これから先「起こるかもしれない」「やる予定がある」というニュアンスが含まれます。

ポイント
「まだ～していない（でも、そのうちする可能性がある）」という意味。
日本語でいう「まだ○○していない」や「これから○○するつもり」を表すときに便利です。
例文
我還沒吃早餐。
(wǒ hái méi chī zǎocān)
「私はまだ朝ごはんを食べていない（これから食べる可能性がある）。」

他還沒做功課。
(tā hái méi zuò gōngkè)
「彼はまだ宿題をしていない（やるつもり、やる必要がある）。」

你還沒睡覺嗎？
(nǐ hái méi shuì jiào ma)
「まだ寝ていないの？」

3. 「沒」と「還沒」の違いをまとめると
沒(méi)

「動作や変化が起こっていない」ことを伝える否定表現。
過去形にも現在形にも使える。
例：「我沒吃早餐。(私は朝ごはんを食べなかった)」
還沒(hái méi)

「まだ～していない」という未完了の状態を強調する。
「これから起こるかもしれない」というニュアンスがある。
例：「我還沒吃早餐。(私はまだ朝ごはんを食べていない、でもこれから食べるかも)」


4. 「了(le)」との関係にも注意
「沒」を使うときは「了(le)」の否定形として使われることも多いです。たとえば疑問文で「你吃了嗎？(nǐ chī le ma)」に対して、「我沒吃。(wǒ méi chī)」と答えると「まだ食べていない」「食べなかった」という意味になります。
一方、「還沒(hái méi)」を使う場合は、「これから食べるかもしれないよ」といった「まだ完了していない」ニュアンスがより強く表れます。','練習問題
それでは練習問題を通して、実際に使い分けを体験してみましょう。今回の問題では「沒」「還沒」を使って適切な文を作ってみてください。

問題1
次の日本語を、中国語で表現してみましょう。

私はまだ宿題を終わらせていない。
彼は先週、映画を見に行かなかった。
ヒント
「まだ～していない」は「還沒(hái méi)」を使う。
過去に「～しなかった」場合は「沒(méi)」。
問題2
次の中国語を日本語に訳してください。

我還沒看那本書。
(wǒ hái méi kàn nà běn shū)
你沒聽到老師說話嗎？
(nǐ méi tīng dào lǎoshī shuōhuà ma)
ヒント
「還沒(hái méi)」は「まだ～していない」。
「沒(méi)」は「～しなかった・～していない」の否定表現。','解答例
問題1の解答例
私はまだ宿題を終わらせていない。
我還沒做完功課。
(wǒ hái méi zuò wán gōngkè)

「還沒(hái méi)」を使うことで、「まだ終わっていない」けど「これからやる可能性がある」ことを伝えられます。


彼は先週、映画を見に行かなかった。
他上個星期沒去看電影。
(tā shàng gè xīngqī méi qù kàn diànyǐng)

「沒(méi)」で「行かなかった」という過去の否定を表します。

問題2の解答例
我還沒看那本書。
「私はまだあの本を読んでいない（これから読む可能性がある）。」

你沒聽到老師說話嗎？
「先生が話しているの、聞こえなかったの？」または「先生の話を聞いていなかったの？」

「沒(méi)」を使うことで「(過去またはそのとき)聞いていなかった」というニュアンスが出ます。','まとめ
「沒(méi)」は「～していない」「～しなかった」の否定表現。
「還沒(hái méi)」は「まだ～していない」の意味で、これから起こる可能性があることを示す。
「没」も「還沒」も日常会話で頻繁に使うので、しっかり区別して身につけることが大切です。
それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson11',2,'「中国語の『是～的』構文で強調したい場所や時間をスッキリ表現！」','「是（shì）～的（de）」の基本イメージ
ある行動や出来事が「いつ」「どこで」「誰が」「どうやって」「なんのために」行われたのかを強調したいときに使います。話し手が「ここを特に聞いてほしい・注目してほしい」という部分をはっきり示すイメージです。

◆例文で確認してみましょう

2）這本書是她送給我的。
　（zhè běn shū shì tā sòng gěi wǒ de）
　意味：「この本は彼女がくれたんですよ」
　→強調したいのは「彼女がくれた」ということです。

②你是從哪裡來？
②我是從日本來的。

我是跟同學去買東西的。

◆ポイント

「是（shì）」は省略されることもありますが、「的（de）」は強調の終わりを示す大切なサインです。
どこを強調するかによって、「是（shì）」の後ろに置く語句が変わります。
過去の行動・出来事を強調することが多いですが、強調する内容によっては現在や未来のことを言う場合もあります。','次の文を「是～的」の形を使って強調表現に書き換えてみましょう。答え例とヒントも併せて確認してください。

1）我昨天在家看電影。
【ヒント】強調したい内容を「いつ」と「どこ」で表してみよう。

2）他用自行車去學校。
【ヒント】強調したいのは「何で学校に行ったのか」を表す部分。

3）她跟朋友一起買蛋糕。
【ヒント】強調したいのは「誰と一緒に買ったのか」。','1）我（是）昨天在家看的電影。
　（wǒ (shì) zuó tiān zài jiā kàn de diàn yǐng）
　→「昨日、家で見た」を強調しています。省略可能な場合でも、特に強調したいなら「是」を使うとハッキリ伝わります。

2）他（是）用自行車去的學校。
　（tā (shì) yòng zì xíng chē qù de xué xiào）
　→「自転車を使って行った」という方法の部分を強調しています。

3）她（是）跟朋友一起買的蛋糕。
　（tā (shì) gēn péng yǒu yì qǐ mǎi de dàn gāo）
　→「友達と一緒に買った」という一緒に行動した相手を強調しています。','・「是～的」は、「いつ」「どこで」「誰が」「どうやって」「なぜ」といった部分を強調したいときに使う表現。
・「是」はしばしば省略されることもあるが、「的」は強調の終わりをしっかり示すので忘れずに。
・強調したい要素によって、文の形が変わるので自在に入れ替えてみてください。

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson11',3,'「【中国語文法】先・等・再の使い方を徹底解説！」','◆ 文法解説

「先（xiān）」「等（děng）」「再（zài）」は、それぞれ「まず」「～を待って」「それから（改めて）」といった意味を表す、行動や状態を詳しく説明する言葉です。日本語の「まず～、待って～、そして～」のように順番やタイミングを示すときに役立ちます。ここでは、主に次の３つの使い方を見ていきましょう。

(1) 「……，……再……」
ある動作が「未来のある状況」になってから発生することを表します。
「～してから（状況が整ったら）、改めて～する」というニュアンスになります。

【例文①】
這家餐廳今天人太多了，我們以後再來吧。

【例文②】
我現在沒空，晚上再討論吧。（děng nǐ máng wán，wǒmen zài tǎolùn）
→「あなたが忙しいのを終えてから、（改めて）話し合いましょう。」

(2) 「等……，再……」
ある動作が「別の動作が終了した後」で発生することを表します。
「まず～が終わるのを待って、それから～する」という流れです。

【例文①】
等我洗好碗，再一起看電視。（děng wǒ xǐ hǎo wǎn，zài yìqǐ kàn diànshì）
→「私が皿洗いを終わらせたら、一緒にテレビを見ましょう。」

【例文②】
等他回來，再商量。（děng tā huílái，zài shāngliáng）
→「彼が戻ってきてから、話し合いましょう。」

(3) 「先……，等……，再……」
順番に行動を示したり、一定のタイミングを待ってから次の行動に移ることをまとめて表します。
「先に～して、（それを待って）、それから（改めて）～する」という、流れを強調したいときに便利です。

【例文①】
先買好票，等車子到了，再上車。（xiān mǎi hǎo piào，děng chēzi dào le，zài shàng chē）
→「まずチケットを買っておいて、バス（車）が来るのを待って、それから乗車します。」

【例文②】
先打電話給我，等我確認時間，再告訴你地點。（xiān dǎ diànhuà gěi wǒ，děng wǒ quèrèn shíjiān，zài gàosu nǐ dìdiǎn）
→「まず私に電話して、それから私が時間を確認したら、改めて場所をお伝えします。」','◆ 練習問題

それでは、実際に使い方を身につけるための練習問題です。各文のカッコに入る言葉を考えてみましょう。ヒントの後に解答例も載せていますので、ぜひ挑戦してみてください！

問題①
（　　）我吃完早餐，（　　）去上學。

【ヒント】

「まず～して、それから～する」という流れ。
「吃完早餐」は「朝ごはんを食べ終える」。
【解答例】
先（xiān）我吃完早餐，再（zài）去上學。
→「まず朝ごはんを食べ終えて、それから学校へ行く。」

問題②
（　　）客人都到齊了，（　　）開始用餐。

【ヒント】

「客人都到齊了」は「お客さんがみんな到着した」状態。
「開始用餐」は「食事を始める」。
【解答例】
等（děng）客人都到齊了，再（zài）開始用餐。
→「お客さんがみんな到着してから、（改めて）食事を始めます。」

問題③
（　　）把衣服收好，（　　）媽媽回家，（　　）帶你去公園。

【ヒント】

「把衣服收好」は「服を片づける」。
「媽媽回家」は「お母さんが帰ってくる」。
「帶你去公園」は「あなたを公園に連れていく」。
三段階の流れを示したいときに使える表現。
【解答例】
先（xiān）把衣服收好，等（děng）媽媽回家，再（zài）帶你去公園。
→「まず服を片づけて、お母さんが帰ってくるのを待って、それから公園に連れて行きます。」','','◆ まとめ

「……，……再……」は、未来のある状況になってから改めて行動するイメージ。
「等……，再……」は、「～が終わって（やってきて）から、それから～する」という流れを強調。
「先……，等……，再……」は、複数の段階を踏んで行動する場合に便利な表現。
この３つを上手に使い分けると、より的確に順序やタイミングを伝えることができます。ぜひ練習を重ねて、スムーズに使いこなしてみてください！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson11',4,'「“給”で広がる表現の幅！相手に何かをする時に使う中国語のポイント」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson11',5,'「興味ある？ない？中国語でサラッと言ってみよう！」對……(不)感興趣','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson11',6,'「分かる？分からない？“出來”の正体はこれ！」V 出來（V 出來了 / 沒 V 出來 / V 得出來 / V 不出來）','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson11',7,'「“嘛”をつけるだけでネイティブっぽさ爆上がり！」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson11',8,'「『同じ〜』を言いたいときはコレ！」同 + 一 + M(+N)','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson11',9,'『〜から学ぶ』はこう言う！“從…中”を使いこなそう','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',1,'「“以前”と“以後”を使いこなそう！中国語で時間を伝える方法」','文法解説
1．「以前」「以後」の基本的なイメージ
以前（yǐqián）：昔や過去を指すほか、「～する前に」という意味でも使えます。
以後（yǐhòu）：将来や未来を指すほか、「～した後に」という意味でも使えます。
まずは、中国語の会話でよく使われるシンプルな例文を見てみましょう。

例文①
以前我住在日本。
（yǐqián wǒ zhù zài rìběn）
意味：昔、私は日本に住んでいました。

以後我要好好學習。
（yǐhòu wǒ yào hǎo hǎo xuéxí）
意味：今後、私はしっかり勉強します。

2．時間を表す言葉＋「以前／以後」
「以前」「以後」は、特定の時間を示す言葉と組み合わせて使うことができます。
時点や期間、動作に「以前／以後」が付く場合は、「以」を省略できます。

A. 時点（○○年、○○月、○○日 など）＋ 以前／以後
「その時間より前／後」という意味になります。

例文②
2020年以前，我從沒去過台灣。
（èr líng èr líng nián yǐqián，wǒ cóng méi qù guò táiwān）
意味：2020年より前は、台湾に行ったことがありませんでした。

下個月以後，我會比較有空。
（xià gè yuè yǐhòu，wǒ huì bǐjiào yǒu kòng）
意味：来月以降は、私は比較的時間があります。

B. 期間（五分鐘、一個月、三年 など）＋ 以前／以後
「今から○○前／後」という意味で使えます。口語では「前／後」のほうが一般的です。

例文③
三年以前，我還不會說中文。
（sān nián yǐqián，wǒ hái bú huì shuō zhōngwén）
意味：今から3年前は、私は中国語を話せませんでした。

五分鐘以後，我們去吃飯吧。
（wǔ fēnzhōng yǐhòu，wǒmen qù chīfàn ba）
意味：今から5分後に、ご飯を食べに行きましょう。

3．「～する前に」「～した後に」の表現
（動作）＋以前（yǐqián）：～する前に
（動作）＋以後（yǐhòu）：～した後に
例文④
吃飯以前，別忘了洗手。
（chīfàn yǐqián，bié wàng le xǐshǒu）
意味：ご飯を食べる前に、手を洗うのを忘れないで。

下班以後，我常常去運動。
（xiàbān yǐhòu，wǒ chángcháng qù yùndòng）
意味：仕事が終わった後、私はよく運動しに行きます。','練習問題
ここからは練習問題です。文法解説で使った例文と同じにならないよう、別の文章でチャレンジしてみましょう。各問題にヒントと解答例を用意しています。



問題1
三か月前は中国語を話せなかった
三個月以前我不會說中文。


十時になってから家を出る
十點以後，我要出門。


運転を覚える前はバスに乗ることが多かった
我學會開車以前，常常坐公車。','','まとめ
**以前（yǐqián）**は「昔」「前」を表すときや、「～する前に」を表すときに使う。
**以後（yǐhòu）**は「将来」「あと」を表すときや、「～した後に」を表すときに使う。
時点や期間（○○年、○○月、○○日、五分鐘、一個月など）と組み合わせることで、「何年より前／後」「今から何年前／後」など多様な言い方ができる。
期間、動作に「以前／以後」が付く場合は、「以」を省略できます。
今回のポイントを押さえて、ぜひ日々の会話や文章で活用してみてくださいね！

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',2,'「對（duì）」の使い方をマスターしよう','【文法解説】

意味：～に言う、話す対象を表すとき
1）對（duì）＋人＋說（shuō）

ポイント：誰に向けて話しているかを強調できます
❏ 例文

我對媽媽說（wǒ duì māma shuō）：今天有很多作業。
わたしはお母さんに言いました：「今日は宿題がたくさんあるよ」。

老師對學生說（lǎoshī duì xuéshēng shuō）：明天要早點到校。
先生は生徒に言いました：「明日は早めに学校に来てください」。

2）對（duì）＋名詞＋形容詞
意味：～に（とって）
ポイント：ある対象にとって、どんな特徴や影響があるかを示します
❏ 例文

牛奶對骨頭很好（牛乳は骨に良い）

運動對身體（yùndòng duì shēntǐ）很好（hěn hǎo）。
運動は体にとって良いものです。

よく使うフレーズ對＋人＋來說

「運動對身體很好」 → 運動は（一般的に）身体に良い
「運動對我來說很重要」 → 運動は（私にとって）とても大切だし、特別な意味がある

這件事對我來說（zhè jiàn shì duì wǒ lái shuō）很重要（hěn zhòngyào）。
この出来事は私にとって（私の立場から見て）とても大切です。

3）對（duì）＋人
意味：～に（対して）
ポイント：対応・待遇・対人関係を表します
❏ 例文

他對我（tā duì wǒ）很客氣（hěn kèqì）。
彼はわたしに対してとても丁寧です。

服務生對客人（fúwùshēng duì kèrén）非常友善（fēicháng yǒushàn）。
店員はお客さんに対してとても親切です。','次の日本語を、中国語にするとどうなるでしょうか。「對（duì）」を使って表現してみてください。

お姉さんは弟に向かって「宿題は終わったの？」と言いました：
この映画は私にとって素晴らしいです。
わたしは店員さんにとても感謝しています。','解答例（一例）

姐姐對弟弟說（jiějie duì dìdi shuō）：作業寫完了嗎？
這部電影對我來說（zhè bù diànyǐng duì wǒ lái shuō）很棒（tài bàng le）。
我對店員（wǒ duì diànyuán）很感謝（hěn gǎnxiè）。','【まとめ】

「對 + 人 + 說」は、「誰に言うか」をはっきり示すときに使う。
「對 + 名詞 + 形容詞」は、「ある対象にとってどうか」を表すときに使う。
「對○○來說」は「○○の立場や気持ちからすると」という、より主観的・個人的な側面を強調したいときに使われる。
状況や文脈に合わせて、どの「對（duì）」を使うか選んで表現しましょう。
「對 + 人」は、「人に対して」「人との関係」を示すときに使う。
これらを押さえておくと、会話や文章で正確に気持ちを伝えやすくなります。
それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',3,'：「過」の使い方をマスターしよう！','①「動詞 + 過」：経験を表す
「過」は動詞の後ろにつけることで、
日本語の「～したことがある」にあたる表現ですね！

🔹 基本構造
👉 主語 + 動詞 + 過 + 目的語

🔹 例文

我去過台灣。（Wǒ qù guò Táiwān.）
　→ 私は台湾に行ったことがあります。

你吃過臭豆腐嗎？（Nǐ chī guò chòu dòufu ma?）
　→ あなたは臭豆腐を食べたことがありますか？

②「V過了」：完了を強調する
「動詞 + 過了」は、「もう～した（完了している）」という意味を表します。
日本語の「～してしまった」「～し終わった」に近いです！

🔹 基本構造
👉 主語 + 動詞 + 過+ 目的語+ 了 

🔹 例文

我吃過了。（Wǒ chī guò le.）
　→ もう食べました。（食べ終わっています。）

他已經回過家了。（Tā yǐjīng huí guò jiā le.）
　→ 彼はすでに家に帰りました。（帰宅済みです。）

💡 「過」だけと「過了」の違い

「過」単独 → 経験
「過了」→ すでに完了（もうしていない）
✅ 正しい例
✔ 你去過日本嗎？（Nǐ qù guò Rìběn ma?）
（あなたは日本に行ったことがありますか？）
👉 使い方：「これまでの人生の中で、日本に行ったことがあるか」を聞いている。

✔ 你去過日本了嗎？（Nǐ qù guò Rìběn le ma?）
（あなたはもう日本に行きましたか？）

→ 違い：「経験」を聞くのか、「完了」を聞くのかの違い！','問題①：次の日本語を中国語に訳しましょう！
私は一度も北京に行ったことがありません。
あなたはもう宿題を終えましたか？
彼はすでに朝ごはんを食べました。

✏ ヒント

「一度も～ない」→ 沒（méi）+ 動詞 + 過
「もう～しましたか？」→ 動詞 + 過了嗎？
「まだ～していない」→ 還沒（hái méi）+ 動詞','解答
我沒去過北京。（Wǒ méi qù guò Běijīng.）
你做過作業了嗎？（Nǐ zuò guò zuòyè le ma?）
他已經吃過早餐了。（Tā yǐjīng chī guò zǎocān le.）
她看過這本小說嗎？（Tā kàn guò zhè běn xiǎoshuō ma?）
我還沒看過這部電影。（Wǒ hái méi kàn guò zhè bù diànyǐng.）','まとめ
✨ 今日学んだ「過」の使い方 ✨
✅ 動詞 + 過：「～したことがある」（経験を表す）
✅ 動詞 + 過了：「もう～した」（完了を強調）

この違いをマスターすれば、中国語がもっと自然に話せるようになりますよ！💡

それではまた次回お会いしましょう～下次見! 👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',4,'：「～の時」って中国語でどう言うの？「……的時候，……」の使い方を解説！','📖 「……的時候，……」の基本構造
「……的時候，……」は、日本語の「～の時、～」にあたります。
意味としては「ある特定の時点や時間帯に、何かをする・起こる」ことを表します。

📌 基本の形
👉 （動作や状態）＋的時候，……（何かが起こる / する）

📝 例文でチェック！
① 動作の時を表す
💡 「勉強している時、音楽を聞きます。」
➡ 我學習的時候，會聽音樂。
（Wǒ xuéxí de shíhòu, huì tīng yīnyuè.）

🎯 ポイント：「學習的時候」=「勉強している時」

② 状態の時を表す
💡 「疲れた時は、コーヒーを飲みます。」
➡ 我累的時候，會喝咖啡。
（Wǒ lèi de shíhòu, huì hē kāfēi.）

🎯 ポイント：「累的時候」=「疲れた時」

③ 過去の時間を表す
💡 「子供の時、よく外で遊びました。」
➡ 我小的時候，常常在外面玩。
（Wǒ xiǎo de shíhòu, chángcháng zài wàimiàn wán.）

🎯 ポイント：「小的時候」=「子供の時」','📝 練習問題！
次の日本語を中国語にしてみましょう！💪

雨が降る時は、傘を持っていきます。
お腹が空いた時、ラーメンを食べます。
夏の時は、海に行きます。
✏ ヒント：「雨が降る」＝下雨（xià yǔ）、「お腹が空いた」＝肚子餓（dùzi è）、「夏」＝夏天（xiàtiān）','📝 練習問題の解答！ 🎯
雨が降る時は、傘を持っていきます。
✅ 下雨的時候，我會帶傘。
（Xiàyǔ de shíhòu, wǒ huì dài sǎn.）

お腹が空いた時、ラーメンを食べます。
✅ 肚子餓的時候，我會吃拉麵。
（Dùzi è de shíhòu, wǒ huì chī lāmiàn.）

夏の時は、海に行きます。
✅ 夏天的時候，我會去海邊。
（Xiàtiān de shíhòu, wǒ huì qù hǎibiān.）','🎯 まとめ
✅ 「……的時候，……」＝「～の時、～」
✅ 動作・状態・時間を表す時に使う


それではまた次回お会いしましょう～下次見!👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',5,'『〜ほどじゃない』をサラッと表現！NP1 + 像/不像 + NP2 + 那麼/這麼 + V','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',6,'「『〜から始まる』シンプルに言える便利フレーズ！」(S)(+從) + Time/VP + 起，(S)就...','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',7,'『〜に向かって』『〜に対して』を自然に言おう！向 + N/NP +','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',8,'『なるほど！』『どうりで〜』はコレ！難怪...','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',9,'⭐️次回ここからできる？できない？“得了 / 不了”を完全攻略！V 得了/ V不了','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',10,'「数えるだけじゃない！“個”の意外な使い方」V 個 + N(O)','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson12',11,'『やらせる！』を中国語でサクッと表す方法！N/NP + 來(+V)','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson13',1,'從……往…… の使い方！','文法解説
🔹「從……往……」の基本構造
「從（cóng）」は 「〜から」 を意味し、「往（wǎng）」は 「〜へ」「〜に向かって」 を意味します。

📌 基本の語順
👉 從 + 出発地点 + 往 + 目的地点 + 動作

これで、「どこからどこへ向かうのか」を表現できます！

🔹 例文で学ぼう！
🌟 例文1
📍從學校往車站走。
（cóng xuéxiào wǎng chēzhàn zǒu）
➡ 学校から駅へ歩く。

🌟 例文2
📍從這裡往山上看，風景很美。
（cóng zhèlǐ wǎng shānshàng kàn, fēngjǐng hěn měi）
➡ ここから山の方を見ると、景色がとてもきれい。

🌟 例文3
📍從左往右讀。
（cóng zuǒ wǎng yòu dú）
➡ 左から右へ読む。

💡 ポイント！
「從……往……」の後には、動詞（歩く・見る・読む など）が続くのが一般的です！','練習問題
では、ここで練習問題です！💡
次の日本語を、中国語に訳してみましょう！

📝 問題
駅から学校へ歩く。
ここから出口の方を見る。
右から左へ書く。
💡 ヒント

「〜から」は 從（cóng）
「〜へ・〜の方に向かって」は 往（wǎng）
「歩く」は 走（zǒu）、「見る」は 看（kàn）、「書く」は 寫（xiě）','解答と解説
📌 解答例

從車站往學校走。
（cóng chēzhàn wǎng xuéxiào zǒu）
➡ 「駅から学校へ歩く。」

從這裡往門口看。
（cóng zhèlǐ wǎng ménkǒu kàn）
➡ 「ここから出口の方を見る。」

從右往左寫。
（cóng yòu wǎng zuǒ xiě）
➡ 「右から左へ書く。」

🔹 解説

「從（cóng）」で出発地点を示し、「往（wǎng）」で向かう方向を示す。
移動や視線の方向を表現するときにとても便利な表現！','まとめ
今日は 「從……往……」 を使った表現を学びました！

✅ 「從」は 「〜から」 の意味
✅ 「往」は 「〜へ・〜に向かって」 の意味
✅ 方向を示すときによく使われる！

この表現をマスターすれば、移動や視線の向きをスムーズに表現できます！ぜひ練習してみてくださいね💡

それではまた次回お会いしましょう～下次見！👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson13',2,'：「就」の使い方を完全マスター！簡単＆速い表現を学ぼう！','🔹 文法解説：「就（jiù）」の基本構造
「就」は 動詞の前 に置くことで、

① すぐに・もう・簡単に（行動や状況のスピード・容易さを強調）
👉 「すぐに終わった！」「もうやったよ！」「簡単にできるよ！」といった 速さ・簡単さ を表します。

✅ 例文

📌 這本書我昨天 就 看完了。
（Zhè běn shū wǒ zuótiān jiù kànwán le.）
➡ この本、昨日のうちにもう読み終わったよ。（はやい）

📌 我回家 就 開始做作業。
（Wǒ huí jiā jiù kāishǐ zuò zuòyè.）
➡ 家に帰るとすぐに宿題を始めます。（スピード）

📌 這道題目很簡單，你 就 能答對！
（Zhè dào tímù hěn jiǎndān, nǐ jiù néng dáduì!）
➡ この問題は簡単だから、すぐに答えられるよ！（簡単）

📌 他小時候 就 會說三種語言了。
（Tā xiǎoshíhou jiù huì shuō sān zhǒng yǔyán le.）
➡ 彼は子供の頃からすでに3か国語話せたよ。（早い時点での完了）','🔹 練習問題（「就」を使って中国語にしてみよう！）
次の日本語を中国語にしてみましょう！✨

1️⃣ 私は朝6時にはもう起きました。
2️⃣ 彼は帰宅するとすぐにご飯を食べました。
3️⃣ これをクリックするだけで、簡単に申し込みができますよ。

📌 ヒント

「起きる」＝「起床（qǐchuáng）」
「ご飯を食べる」＝「吃飯（chī fàn）」
「申し込む」＝「申請（shēnqǐng）」','🔹 解答と解説
🔸 正解例

1️⃣ 我早上六點 就 起床了。
（Wǒ zǎoshàng liù diǎn jiù qǐchuáng le.）
➡ 私は朝6時にはもう起きました。（早い）

2️⃣ 他回家 就 吃飯了。
（Tā yī huí jiā jiù chī fàn le.）
➡ 彼は帰宅するとすぐにご飯を食べました。（スピード）

3️⃣ 只要點這個按鈕，就 能申請了。
（Zhǐyào diǎn zhège ànniǔ, jiù néng shēnqǐng le.）
➡ これをクリックするだけで、簡単に申し込みができますよ。（簡単）','🔹 まとめ
「就」をマスターすると、 スピード感や完了・簡単さを伝える表現 が自然に話せるようになります！💡

✅ 「就」は動詞の前に置く！
✅ 「すぐに・早く」 👉 速さを強調
✅ 「もう・すでに」 👉 完了を強調
✅ 「簡単に」 👉 容易さを強調

このポイントを押さえて、日常会話でどんどん使ってみてくださいね！✨

それではまた次回お会いしましょう～ 下次見! 👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson13',3,'：「就要……了」でもうすぐ起こることを表現しよう！','🔹 文法解説：「就要……了」の基本構造
🔹「就要……了」＝ もうすぐ〇〇する
「就要……了」は、 未来に起こる出来事がすぐそこまで来ている ことを表します。

特に、
✅ 時間を表す言葉（日時） を前に置くことが多い。
✅ 変化や動作が差し迫っていることを強調 する。

🔹 例文
📌 我們 就要 下課 了。
（Wǒmen jiù yào xiàkè le.）
➡ もうすぐ授業が終わります。

📌 飛機 就要 起飛 了，請趕快登機！
（Fēijī jiù yào qǐfēi le, qǐng gǎnkuài dēngjī!）
➡ 飛行機がもうすぐ離陸します。急いで搭乗してください！

📌 他 就要 到車站 了，我們快去接他吧！
（Tā jiù yào dào chēzhàn le, wǒmen kuài qù jiē tā ba!）
➡ 彼はもうすぐ駅に着きます。早く迎えに行きましょう！

📌 春天 就要 來 了，天氣越來越暖和了。
（Chūntiān jiù yào lái le, tiānqì yuèláiyuè nuǎnhuo le.）
➡ もうすぐ春が来ます。どんどん暖かくなってきました。','🔹 練習問題（「就要……了」を使って中国語にしてみよう！）
次の日本語を中国語にしてみましょう！✨

1️⃣ もうすぐ新学期が始まります。
2️⃣ 彼はもうすぐここに来ます。
3️⃣ 私たちはもうすぐ出発します！

📌 ヒント

「新学期」＝「新學期（xīn xuéqī）」
「来る」＝「來（lái）」
「出発する」＝「出發（chūfā）」','🔹 解答と解説
🔸 正解例

1️⃣ 新學期 就要 開始 了。
（Xīn xuéqī jiù yào kāishǐ le.）
➡ もうすぐ新学期が始まります。

2️⃣ 他 就要 到 了。
（Tā jiù yào dào le.）
➡ 彼はもうすぐここに来ます。

3️⃣ 我們 就要 出發 了！
（Wǒmen jiù yào chūfā le!）
➡ 私たちはもうすぐ出発します！','🔹 まとめ
✅ 「就要……了」＝ もうすぐ〇〇する
✅ 「就要」の前には時間を表す言葉を入れることが多い！
✅ 動作や変化がすぐに起こることを強調 できる！

この表現を覚えれば、 未来にすぐ起こる出来事をスムーズに伝えられるようになりますよ！ ✨

それではまた次回お会いしましょう～ 下次見! 👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson13',4,'動作がどのくらい続く？持続時間を表す方法','🌟基本の形
中国語では、「だれが」「どんな行動をする」「どのくらいの時間続けるか」という流れで組み立てます。
ここでポイントになるのが「行動の対象となる言葉（物や相手）」があるかないかです。

1⃣ 対象がない場合
「～をする」という行動だけで、何か物を使ったり相手がいたりしないときは、行動のあとに直接時間を置くのが基本的な形です。

例1
我每天運動三十分鐘
wǒ měitiān yùndòng sānshí fēnzhōng
（私は毎日30分運動します）
例2
①我每天工作八個小時。
例3
我要等五分鐘
wǒ  děng wǔ fēnzhōng
（私は5分待たなければなりません）
ポイントは、**「運動」「跑步」「等」**などの行動のあとに、すぐ「時間」を続けるということです。

2⃣ 対象がある場合
「～を読む」「～を食べる」「～を練習する」など、行動の相手・物があるときは、次の二つのパターンがよく使われます。

Aパターン：行動を繰り返して、最後に時間を言う
行動 + 対象 + 行動 + 時間

はじめに「行動＋対象」をセットで言って、もう一度行動を言い直してから最後に時間を置く形です。
🌸例1
我每天看書看一個小時
wǒ měitiān kàn shū kàn yí ge xiǎoshí
（私は毎日、本を1時間読みます）
「看書（kàn shū）＝本を読む」を言ってから、もう一度「看（kàn）」を繰り返して「一個小時（時間）」を続けています。
🌸例2
她每週打網球打兩個小時
tā měi zhōu dǎ wǎngqiú dǎ liǎng ge xiǎoshí
（彼女は毎週、テニスを2時間します）
「打網球（dǎ wǎngqiú）＝テニスをする」を先に言って、再び「打（dǎ）」を言い、最後に「兩個小時」。
🌸例3
我練習中文練二十分鐘
wǒ  liànxí Zhōngwén liàn èrshí fēnzhōng
（私は中国語を20分練習します）
「練習中文（liànxí Zhōngwén）＝中国語を練習する」をまず言い、再び「練」で時間を言い足します。
Bパターン：行動の直後に時間を入れて、「的」で対象をつなぐ
行動 + 時間 + 的 + 対象

時間のあとに「的」をはさんで、対象を続ける形です。
🌸例1
我每天看一個小時的書
wǒ měitiān kàn yí ge xiǎoshí de shū
（私は毎日、本を1時間読みます）
「一個小時的書」で「1時間読む本」のイメージになります。
🌸例2
她每週打兩個小時的網球
tā měi zhōu dǎ liǎng ge xiǎoshí de wǎngqiú
（彼女は毎週、テニスを2時間します）
「兩個小時的網球」で「2時間するテニス」を表します。
🌸例3
我常常學二十分鐘的中文
wǒ chángcháng xué èrshí fēnzhōng de Zhōngwén
（私はよく、中国語を20分学びます）','✨練習問題
文法解説で使用したものとは別の文を使って練習してみましょう。

1⃣【文を作ってみよう】
(1) 「私は毎晩1時間ドラマを見ます」を中国語にしてみましょう。

ヒント：
「ドラマ」は「電視劇（diànshìjù）」

(2) 「弟は毎週1時間サッカーをします」を中国語にしましょう。
ヒント：
サッカー → 足球（zúqiú）
行動 → 踢（tī）「蹴る・サッカーをする」
1時間 → 一個小時（yí ge xiǎoshí）

（３）「私は明日6時間車を運転します」','✅解答と解説
1⃣【文を作ってみよう】
(1) 「私は毎晩1時間ドラマを見ます」

解答例Aパターン: 我每天晚上看電視劇看一個小時
wǒ měitiān wǎnshang kàn diànshìjù kàn yí ge xiǎoshí
解答例Bパターン: 我每天晚上看一個小時的電視劇
wǒ měitiān wǎnshang kàn yí ge xiǎoshí de diànshìjù

(2) 「弟は毎週1時間サッカーをします」

Aパターン：弟弟每週踢足球踢一個小時
dìdi měi zhōu tī zúqiú tī yí ge xiǎoshí
Bパターン：弟弟每週踢一個小時的足球
dìdi měi zhōu tī yí ge xiǎoshí de zúqiú


A. 我明天開車開六個小時
wǒ míngtiān kāi chē kāi liù ge xiǎoshí

B. 我明天開六個小時的車
wǒ míngtiān kāi liù ge xiǎoshí de chē','🎯まとめ
対象がない場合は、行動のあとに直接「時間」を置く。
対象がある場合は大きく2パターン
行動を一度言って対象を示し、もう一度行動を繰り返してから「時間」をつける。
行動のあとに時間を入れて、最後に「的 + 対象」をつなぐ。
まずは「対象があるかどうか」をはっきりさせると、どの形を使うか決めやすいです。
このコツを押さえると、中国語で「どのくらいの間、行動を続けるか」をきちんと伝えられるようになりますよ。

それではまた次回お会いしましょう～下次見!');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson13',5,'「比較表現の決定版！『〜より〜した方がいい』を自然に話す方法」不如……','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson13',6,'「ちょっとだけ…を表現！中国語で微妙な変化や感情を伝える裏技」Vs 了 (一)點兒','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson13',7,'「“AはBより…”の言い方完全攻略！ネイティブの比較表現をマスター」比、比較、比起來','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson13',8,'「あと少しで…！中国語で『もう少しで危なかった』を自然に言おう」 差(一)點','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson13',9,'「せっかく〜したのに…を表す！“白 + V”で悔しさをリアルに伝えよう」白 + V　','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson14',1,'「了」が2回!? 今も続いている行動を伝える中国語表現⏱【時間の継続②】','🧠文法解説：「了」が2回使われるとき（今も続いている）
🔸基本構造
主語 ＋ 動詞 ＋ 了 ＋ 時間 ＋ 了

この形は、「その動作が過去から今まで続いていて、しかもまだ終わっていない」ことを伝えます。

1つ目の「了」は動作が始まったことを、
2つ目の「了」は今もその状態が続いていることを表します。

✅ パターン①：目的語がない場合
📌 主語 ＋ 動詞 ＋ 了 ＋ 時間 ＋ 了

👉 例文：
他等了二十分鐘了。
（tā zài děng nǐ děng le èrshí fēnzhōng le）
→ 彼は20分待ち続けているよ。

✔️ ポイント：
2つ目の「了」が入ることで、「まだ終わってないんだよ！」というニュアンスが加わります。

✅ パターン②：目的語があるパターン①（動詞を繰り返す）
📌 主語 ＋ 動詞 ＋ 目的語 ＋ 動詞 ＋ 了 ＋ 時間 ＋ 了

👉 例文：
我寫作業寫了三個小時了。
（wǒ xiě zuòyè xiě le sān ge xiǎoshí le）
→ 私は宿題を3時間書き続けているところです。

✔️ ポイント：
目的語「作業」があるので、動詞「寫（xiě）」を繰り返すのがこのパターンの特徴です。

✅ パターン③：目的語があるパターン②（時間＋的＋目的語）
📌 主語 ＋ 動詞 ＋ 了 ＋ 時間 ＋ 的 ＋ 目的語 ＋ 了

👉 例文：
他們已經打了一個小時的麻將了。
（tāmen yǐjīng dǎ le yí ge xiǎoshí de májiàng le）
→ 彼らはすでに1時間マージャンを打ち続けています。

✔️ ポイント：
目的語（麻將）と時間（1時間）を「時間＋的＋目的語」で一塊にして、「まだやってるよ！」を伝えたいときの形です。','📝 練習問題（3問）
次の日本語に合う中国語を考えてみましょう！

Q1. 私たちは今、30分ずっと待っています。
ヒント：目的語なし

Q2. 妹はもう2時間も漫画を読んでいます。
ヒント：動詞を繰り返すパターン

Q3. 僕たちはもうすでに1時間の会議を続けています。
ヒント：「時間＋的＋目的語」パターン','✅ 解答と解説
A1：
我們等了三十分鐘了。
（wǒmen děng le sānshí fēnzhōng le）
👉 「等」には目的語がないのでシンプルな形！

A2：
妹妹看漫畫看了兩個小時了。
（mèimei kàn mànhuà kàn le liǎng ge xiǎoshí le）
👉 「漫畫」が目的語なので動詞を繰り返す！

A3：
我們已經開了一個小時的會議了。
（wǒmen yǐjīng kāi le yí ge xiǎoshí de huìyì le）
👉 時間＋的＋目的語「會議」パターン！','🎯 まとめ
✨ 「了」が2回あるときは、**“過去から今まで続いていて、まだ終わってない”**という意味になる！

🔹 目的語がない → 動詞＋了＋時間＋了
🔹 目的語がある → 動詞を繰り返す or 時間＋的＋目的語＋了

この「了」の感覚がつかめると、ネイティブっぽい会話表現がぐんと増えますよ💬

それではまた次回お会いしましょう～
下次見！👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson14',2,'「比（bǐ）」の使い方完全マスター！“〜より◯◯”を中国語で言ってみよう！','🧠文法解説
🔹基本の文型
まずは基本のかたちから！

👉 A 比 B + 形容詞

これで、「AはBより〇〇だ」という意味になります！

🔸差の程度を強調する表現
比べたあとに、どのくらい違うのかを伝えたいときは、

多了（duō le）・得多（de duō）：「すごく〇〇」

一點（yìdiǎn）：「ちょっと〇〇」

または具体的な数字や量を使って、より正確に伝えることもできます！

🧪例文（※すべて新規）
這家餐廳比那家便宜一點。
　zhè jiā cāntīng bǐ nà jiā piányí yìdiǎn
　👉 このレストランはあのレストランよりちょっと安いです。

哥哥的腳踏車比我的快多了。
　gēge de jiǎotàchē bǐ wǒ de kuài duō le
　👉 兄の自転車は私のよりずっと速いです。

這棟樓比對面的樓高三層。
　zhè dòng lóu bǐ duìmiàn de lóu gāo sān céng
　👉 このビルは向かいのビルより3階分高いです。

今天的作業比昨天的難得多。
　jīntiān de zuòyè bǐ zuótiān de nán de duō
　👉 今日の宿題は昨日のよりずっと難しいです。

🏃‍♀️動作を比べるパターン
「誰の方が〜するのが上手／早い／遅い」など、動きやスキルを比べたいときはこうします👇

👉 動詞 + 得 + 比 B + 形容詞

🧪例文（動作比較）
姐姐唱歌唱得比我準。
　jiějie chàng gē chàng de bǐ wǒ zhǔn
　👉 姉は私より正確に歌を歌えます。

他開車開得比以前穩多了。
　tā kāi chē kāi de bǐ yǐqián wěn duō le
　👉 彼は以前よりずっと安定して運転できるようになりました。

學生們寫作業寫得比上個月快很多。
　xuéshēng men xiě zuòyè xiě de bǐ shàng gè yuè kuài hěn duō
　👉 生徒たちは先月よりずっと速く宿題を書くようになった。','📝練習問題
それでは、あなたの番です！
以下の日本語を「比」を使った中国語にしてみましょう！

❓問題①
「このバッグはそのバッグより軽い。」
🧩ヒント：

バッグ → 包包（bāobāo）

軽い → 輕（qīng）

❓問題②
「弟は兄より泳ぐのが速い。」
🧩ヒント：

泳ぐ → 游泳（yóuyǒng）

速い → 快（kuài）

❓問題③
「この月は先月より雨が多い。」
🧩ヒント：

今月 → 這個月（zhè ge yuè）

雨が多い → 下雨多（xià yǔ duō）','✅解答と解説
✅①
這個包包比那個包包輕。
zhè ge bāobāo bǐ nà ge bāobāo qīng
👉 このバッグはあのバッグより軽いです。

✅②
我弟弟游泳游得比哥哥快。
wǒ dìdi yóuyǒng yóu de bǐ gēge kuài
👉 弟は兄より泳ぐのが速いです。

✅③
這個月比上個月下雨多。
zhè ge yuè bǐ shàng ge yuè xià yǔ duō
👉 今月は先月より雨が多いです。','📌まとめ
✅ **比（bǐ）**を使えば、誰かや何かと比較する表現がスッキリ伝えられる！
✅ 形容詞のあとに「多了」「一點」「具体的な数字」を使えば、差の程度も自由に調整！
✅ 動作を比べたいときは「動詞 + 得 + 比〜 + 形容詞」を使う！

今日の内容をしっかりマスターして、自然に「比」の文を使えるようになりましょう💪✨

それではまた次回お会いしましょう～
下次見！');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson14',3,'「『今まで一度も…したことがない』を中国語で自然に言う方法」從來+ 沒/不','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson14',4,'「〜したらすぐ…！中国語の“タイミング表現”をすぐ使える」當……，就','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson14',5,'やらない→「“讓”の使い方完全理解！人に〜させる／してもらう表現を自在に」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson14',6,'「『どうでもいい』『構わない』を中国語でサラッと言えるコツ」無所謂','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson14',7,'「〜して行ってしまった／行けないをマスター！V走シリーズ徹底解説」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson14',8,'「もし〜がなかったら…！中国語で“もしも”を自然に話す表現」要不是','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',1,'「一…就…」＝秒で◯◯！？反応の早さを表す魔法のフレーズ！','🧠文法解説｜一……就……の基本構造
🔸基本の形
👉　一（動作①），就（動作②）

この構文は、**「何かをすると、すぐ次のことが起こる」**という流れを表します。

✅ポイント：
「一」は ある動作が始まった瞬間 を示す

「就」は すぐに起きる次の動作 を表します

✅① 主語が同じ場合
👉　主語 + 一 + 動詞① + 就 + 動詞②

📌例文：
我一喝咖啡（wǒ yī hē kāfēi），就睡不著（jiù shuì bù zháo）。
＝コーヒーを飲むと、すぐに眠れなくなります。

📌例文：
他一到家（tā yī dào jiā），就開始玩手機（jiù kāishǐ wán shǒujī）。
＝彼は家に着くと、すぐスマホをいじり始めます。

✅② 主語が異なる場合
👉　主語A + 一 + 動詞①，主語B + 就 + 動詞②

📌例文：
我一打開窗戶（wǒ yī dǎkāi chuānghù），他就關起來了（tā jiù guān qǐláile）。
＝私が窓を開けると、彼はすぐ閉めました。

📌例文：
妹妹一哭（mèimei yī kū），媽媽就過來抱她（māmā jiù guòlái bào tā）。
＝妹が泣き出すと、すぐにお母さんが抱っこしに来ます。

⚠️間違いやすいポイント
“就”は必ず入れましょう！
　「一……」だけでは意味が通じません。

「一……就……」は日常的な習慣や自然な流れによく使われます。','✍️練習問題
【問題①】
「私はパソコンを使うとすぐ肩が痛くなる」
➡ この文を「一……就……」で言ってみましょう！

💡ヒント：
我（使う）電腦，肩膀（痛くなる）

【問題②】
「弟が泣き始めると、母はすぐにテレビを見せる」
➡ 主語が異なるパターンです！

💡ヒント：
弟弟（泣く），媽媽（見せる）電視','✅解答と解説
【解答①】
我一用電腦（wǒ yī yòng diànnǎo），就肩膀痛（jiù jiānbǎng tòng）。

👉 パソコンを使った瞬間に肩が痛くなる、という流れを表現しています。

【解答②】
弟弟一哭（dìdi yī kū），媽媽就給他看電視（māmā jiù gěi tā kàn diànshì）。

👉 弟が泣くとすぐにテレビを見せる、という自然な反応を「就」で表しています。','📝まとめ
今日のポイントをおさらい！

✅ 「一……就……」は「～すると、すぐ～する」
✅ 主語が同じでも違っても使える
✅ 自然な流れや習慣にぴったりの表現
✅ 「就」を忘れずに！

それではまた次回お会いしましょう～下次見! 👋✨');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',2,'動作がず〜っと続いてる！「V着」の使い方をマスターしよう！✨','🧠文法解説：「V着」の基本構造
【基本構造】
👉　動詞 + 着（zhe）

この形で、「動作や状態が続いているよ〜」ということを表します。
ポイントは、「動作そのものが行われている最中」ではなく、その動作の結果や状態が続いていることを示すことです。

📌パターンA：ある動作・状態が続いている
例文①
他看著窗戶外面
（tā kàn zhe chuāng hù wài miàn）
→ 彼は窓の外を見ています

🔍解説：
「看（見る）」という動作の状態がずっと続いています。
今まさに“窓の外を見ている状態”です。

例文②
他在門口等著你
（tā zài mén kǒu děng zhe nǐ）
→ 彼は玄関であなたを待っています

🔍解説：
「等（待つ）」という動作の継続を表していて、
今もその状態が続いていることを伝えています。

📌パターンB：命令・お願いとして使う場合
相手に注意を向けてもらいたいとき、または命令やお願いの文としても使われます。

例文③
你們看著我
（nǐ men kàn zhe wǒ）
→ みんな、私を見て！

🔍解説：
先生が生徒に「ちゃんとこっち見てね！」と伝えたい時のような場面で使います。

例文④
大家聽著，明天一定要準時到
（dà jiā tīng zhe, míng tiān yí dìng yào zhǔn shí dào）
→ みんな聞いて、明日は絶対に時間通りに来てね！

🔍解説：
「聽著（聞いて）」で、みんなの注意をこちらに向けたい時に使う便利な言い回しです。','✏️練習問題
【問題①】
彼は私を見ながら笑っている


🧩ヒント：2つの動作が同時に続いています。順序も考えて！

【問題②】
みんな、私の言うことを聞いてください
👉 大家（　　　）我的話。

🧩ヒント：「お願い・命令」の用法です！','✅解答＆解説
【解答①】
看著我，笑著。
（kàn zhe wǒ, xiào zhe）
→ 私を見ながら笑っている

💡ポイント：「笑う」も「見る」も状態の継続を表すので、どちらにも「着」を使います。

【解答②】
聽著
（tīng zhe）
→ 注意して聞いて、という命令の表現になります！','🧠まとめ
✅「V着」は「動作・状態が続いている」ことを表す文法
✅「看著」「等著」「笑著」などよく使われる！
✅ 命令・お願いとしても大活躍！

それではまた次回お会いしましょう～
**下次見！**👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',3,'「AはBほどじゃない」って中国語でどう言う？『沒有～那麼』の使い方を完全マスター✨','📘 文法解説
🔹 基本構造
A沒有B 那麼／這麼 + 形容詞

👉 **「AはBほど〜ではない」**という否定の比較を表すときに使います。

那麼（nàme）＝「それほど」

這麼（zhème）＝「こんなに」
→ 話し手との距離によって使い分けますが、意味の違いは大きくありません。

🌟 例文①（形容詞と一緒に使うパターン）
我的中文沒有老師那麼流利。
　→ 私の中国語は先生ほど流暢ではありません。
　（wǒ de Zhōngwén méiyǒu lǎoshī nàme liúlì）

這杯咖啡沒有昨天那麼苦。
　→ このコーヒーは昨日ほど苦くないです。
　（zhè bēi kāfēi méiyǒu zuótiān nàme kǔ）

📌 ポイント：
形容詞の前に**「那麼」や「這麼」**を入れて、比較の程度を示します。

🌟 例文②（V＋得構文と一緒に使うパターン）
🔹 構造：
A + 動詞 + 得 + 沒有 B 那麼／這麼 + 形容詞／量

哥哥唱歌唱得沒有妹妹那麼好聽。
　→ お兄さんの歌は妹ほどきれいではありません。
　（gēge chànggē chàng de méiyǒu mèimei nàme hǎotīng）

他畫畫畫得沒有我那麼快。
　→ 彼は私ほど速く絵が描けません。
　（tā huàhuà huà de méiyǒu wǒ nàme kuài）

📌 このパターンでは、「動詞＋得」で動作の様子を説明しています！','📝 練習問題
それでは練習してみましょう✍️
次の日本語を中国語にしてみてください！

【問題1】
私は友達ほど疲れていません。

🔍ヒント：「疲れている」＝累、「〜ほどじゃない」＝沒有～那麼

【問題2】
弟は兄ほどたくさん宿題をしません。

🔍ヒント：「宿題をする」＝寫作業、「V得構文」にしてみましょう！

【問題3】
今日の天気は昨日ほど寒くないです。

🔍ヒント：「天気が寒い」＝天氣冷、「那麼」使用！','✅ 解答・解説
【解答1】
我沒有朋友那麼累。
（wǒ méiyǒu péngyǒu nàme lèi）

【解答2】
弟弟寫作業寫得沒有哥哥那麼多。
（dìdi xiě zuòyè xiě de méiyǒu gēge nàme duō）

【解答3】
今天的天氣沒有昨天那麼冷。
（jīntiān de tiānqì méiyǒu zuótiān nàme lěng）','🎯 まとめ
今日のポイントはこちら👇

✅「沒有～那麼／這麼」は、否定の比較
✅ 形容詞とも、動詞＋得の構文とも組み合わせられる
✅ 「～ほどではない」を表現したいときに大活躍！

身近なことを比べるときに、自然に使える表現です。
どんどん口に出して練習してみましょう！');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',4,'「離」の使い方徹底マスター！場所の距離感を伝える中国語表現🧭✨','🧠文法解説：「離」の基本構造
「離（lí）」は、2つの場所の距離を表すときに使います。
基本の文型はこちら👇

A 離 B（很/不太/有點兒）＋形容詞（遠 / 近）
AはBから（遠い / 近い）

✅例文①
🏠我家離超市很近。
（wǒ jiā lí chāo shì hěn jìn）
→ 私の家はスーパーから近いです。

✅例文②
📚圖書館離學校不太遠。
（tú shū guǎn lí xué xiào bù tài yuǎn）
→ 図書館は学校からそんなに遠くないです。

✅例文③
🏞️這家餐廳離公園有點兒遠。
（zhè jiā cān tīng lí gōng yuán yǒu diǎn er yuǎn）
→ このレストランは公園からちょっと遠いです。','📝練習問題（※すべて例文と違う内容）
以下の文を読んで、「離」を使って正しい中国語の文章を作りましょう。

Q1
空港は駅からとても遠いです。

💡ヒント：
空港（jī chǎng）
駅（huǒ chē zhàn）
とても遠い（hěn yuǎn）

Q2
郵便局はこのビルから近いです。

💡ヒント：
郵便局（yóu jú）
ビル（dà lóu）
近い（jìn）

Q3
ホテルは海から少し遠いです。

💡ヒント：
ホテル（lǚ guǎn）
海（hǎi）
少し遠い（yǒu diǎn er yuǎn）','✅解答と解説
A1
✈️機場離火車站很遠。
（jī chǎng lí huǒ chē zhàn hěn yuǎn）

👉 空港（A）は駅（B）からとても遠い、という意味になります。

A2
📮郵局離大樓很近。
（yóu jú lí dà lóu hěn jìn）

👉 郵便局（A）はビル（B）から近い、の表現です。

A3
🏖️旅館離海有點兒遠。
（lǚ guǎn lí hǎi yǒu diǎn er yuǎn）

👉 ホテル（A）は海（B）から少し遠い、という表現です。','📌まとめ
今日の文法ポイントは「離（lí）」を使った距離の表現でした！

🔹 基本構文は「A 離 B（＋程度）＋遠 / 近」
🔹 「很」「不太」「有點兒」などで距離の程度を調整できる
🔹 日常会話でよく使う便利な構文です！

ぜひ自分の生活に当てはめて、いろんな距離の言い方を試してみてくださいね😊');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',5,'「本來／原來……，後來……」で変化を伝える便利フレーズ✨','✏️文法解説
🔹基本構造
S + 本來／原來 + V(O)，後來 + V(O) + 了

👉「もともとは〇〇だったが、その後〇〇になった」という変化の流れを表します。

本來（běnlái）／原來（yuánlái）：もともと～だった

後來（hòulái）：その後、あとで～

どちらを使っても意味はほとんど同じです💡
※「原來」には別の意味もありますが、今回は「以前は〜だった」の意味で使います！

✅ 例文１
我原來住在台中，後來搬到高雄了。
（wǒ yuánlái zhù zài tái zhōng ， hòulái bān dào gāo xióng le）

もともとは台中に住んでいましたが、その後高雄に引っ越しました。

✅ 例文２
這家店本來只賣飲料，後來開始賣便當了。
（zhè jiā diàn běn lái zhǐ mài yǐn liào ， hòu lái kāi shǐ mài biàn dāng le）

このお店はもともと飲み物だけ売っていましたが、その後お弁当も売り始めました。

✅ 例文３
他原來不會說中文，後來學會了。
（tā yuán lái bú huì shuō zhōng wén ， hòu lái xué huì le）

彼はもともと中国語が話せませんでしたが、その後話せるようになりました。

🧠 ワンポイント！
「本來」と「原來」はどちらを使ってもOKですが、少しだけ違いがあります👇

本來：状況の変化にフォーカス

原來：以前の事実を述べるイメージ

でも、会話ではほぼ同じように使われます😊','📝練習問題
それでは、練習してみましょう！🎯
次の文に合うように、（　）に「本來／原來」「後來」を入れてください。

Q1
我（　　　）很喜歡吃辣的，（　　　）覺得太辣了。

▶️ヒント：もともと辛いものが好きだったけど、その後嫌いになった。

Q2
他（　　　）想當醫生，（　　　）改變主意了。

▶️ヒント：彼はもともと医者になりたかったが、その後考えが変わった

Q3
這裡（　　　）有一座橋，（　　　）拆掉了。

▶️ヒント：ここにはもともと橋があったが、その後取り壊された','✅解答と解説
A1
我本來很喜歡吃辣的，後來覺得太辣了。
👉 もともと辛いものが好きだったけど、あとで「辛すぎる」と感じた

A2
他原來想當醫生，後來改變主意了。
👉 彼はもともと医者になりたかったけど、その後考えを変えた

A3
這裡本來有一座橋，後來拆掉了。
👉 ここにはもともと橋があったが、後で取り壊された','🎯まとめ
今日は「本來／原來……，後來……」の使い方を学びました！

🔸 もともとこうだった → その後こうなった
🔸 状況や気持ちの変化を表す便利な構文
🔸 「本來」も「原來」も意味はほぼ同じ

この文型を使えると、自然なストーリーが話せるようになりますよ📈✨

それではまた次回お会いしましょう～
下次見! 👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',6,'「更」でレベルアップ！中国語で“もっと〜”を自然に伝えよう✨','✏️ 文法解説：「更」の基本構造
✅ 基本構造
A + 比（bǐ）+ B + 更（gèng）+ 形容詞（Vs）

👉 意味：AはBよりもっと〜だ

「比（bǐ）」で比べる対象を示し、「更（gèng）」で“さらに・もっと”という強調を加えます！

🧊 例文①
今天比昨天更冷。
jīn tiān bǐ zuó tiān gèng lěng
👉 今日は昨日よりもっと寒いです。

📘 例文②
這本書比那本書更有意思。
zhè běn shū bǐ nà běn shū gèng yǒu yì si
👉 この本はあの本よりもっと面白いです。

🧠 よくある間違いポイント
❌ 更比という語順には注意！
「比」→「更」の順番が正しいです。
間違えて「更比～」のように言わないようにしましょう！','📝 練習問題
次の日本語に合うように、中国語の空欄を埋めましょう！
ヒントもあるので安心してください✨

Q1
この映画は前に見たものよりもっと感動的だった。
這部電影＿＿＿＿我以前看的＿＿＿＿感人。
👉 ヒント：比較の構文を思い出そう。「もっと感動的」と言いたい！

Q2
兄は私よりもっと背が高い。
哥哥＿＿＿＿我＿＿＿＿高。
👉 ヒント：「私より」という部分を「比」で、「もっと」を「更」で！

Q3
夏は春よりもっと暑い。
夏天＿＿＿＿春天＿＿＿＿熱。
👉 ヒント：季節の比較＋「更」で強調しよう！','✅ 解答と解説
A1
這部電影比我以前看的更感人。
👉「比」で“前に見たもの”と比べて、「更」で“もっと感動的”を表現！

A2
哥哥比我更高。
👉「比我」＝“私より”、そのあとに「更」で“もっと”！

A3
夏天比春天更熱。
👉 季節の比較でも全く同じ使い方。シンプルですね！','まとめ
今日のポイントをおさらいしましょう！

✅ 「更」は“もっと～”という意味
✅ 「比」のあとに「更＋形容詞」の順番で使う
✅ 「更比」など順番を間違えないように注意！

この文法は日常会話でもめちゃくちゃ使えるので、たくさん練習してみてください！

それではまた次回お会いしましょう～
下次見! 👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',7,'「～したら、すぐに～する」「了」と「就」の使い方を完全マスター✨','🧠文法解説
✅基本のかたち
➡️ 「〜したら、すぐに〜する」
👉「動作＋了， 就＋次の動作」
🔤キーワード：
・了（le）：最初の動作が終わったことを表す
・就（jiù）：すぐに次の動作に移ることを表す

（1）過去に起きたこと
ある行動が終わった後、すぐに別の行動をしたときに使います。

例：
昨天晚上我洗了澡，就睡覺了。
（私は昨晩お風呂に入ってから、すぐに寝ました）

ポイントは、「お風呂に入った」が完了した出来事なので、動詞のあとに**“了”を使います。
「寝た」も過去なので、最後に“了”**がつきます。

（2）いつもやっている習慣
毎日、毎回、同じ流れで行動する習慣にも使えます。

例：
每天晚上我洗了澡，就睡覺。
（私は毎晩お風呂に入ったら、すぐに寝ます）

この場合、最後の動作は習慣なので“了”は使いません。
“就”で「すぐに」という流れが分かるので、それだけでOK！

（3）これからの予定や計画
これからやる予定のことにも、同じ形で使えます。

例：
今天晚上我洗了澡，就要睡覺。
（私は今晩お風呂に入ったら、すぐに寝るつもりです）

ポイントは、“就”のあとに“要”を加えると、**「これから〜するつもり」**という意味になります！','📝練習問題
それでは練習してみましょう✏️
次の日本語を中国語にしてみてください！

Q1
昨日昼ごはんを食べてから、すぐに買い物に行きました。
💡ヒント：「昼ごはんを食べた」→ 食べた後に“了”が必要

Q2
彼は毎回試験が終わったら、すぐにゲームをします。
💡ヒント：「毎回」＝習慣なので最後は“了”をつけない

Q3
明日朝ごはんを食べたら、すぐにバスに乗るつもりです。
💡ヒント：「バスに乗るつもり」→“要”を入れよう！','✅解答と解説
A1
我昨天吃了午飯，就去買東西了。
→ 食べた → 完了（了）
→ 買い物に行った → 完了（了）

A2
他每次考完試，就開始打遊戲。
→ 毎回の流れ → 習慣だから最後に“了”はなし

A3
我明天吃了早餐，就要搭公車。
→ これからの予定なので“要”を使う！','🧾まとめ
今日覚えてほしいポイントはこの3つ👇

✅ 「〜したら、すぐに〜する」は「〜了，就〜」の形
✅ 「了」は最初の行動が完了したことを表す
✅ 「就」はすぐに次の行動が起こることを表す
✅ 習慣なら「最後に“了”は不要」、未来なら「“要”をつける」

📌日常会話で本当によく使う表現なので、ぜひ今日から使ってみてくださいね！

それではまた次回お会いしましょう～
下次見！👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',8,'「動作の回数や一瞬を表す！中国語の“V(了) + 一 + M”をマスター」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',9,'「下來マジック！『動作の方向・書き留め・止まる』を自在に表現」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',10,'「『言ったらすぐやる』を中国語で自然に！ネイティブ感満点の表現」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson15',11,'「まさかの展開に使える！『誰知道…？』で驚きや疑問を表現」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson16',1,'「『場合による／〜次第』をスムーズに言える中国語フレーズ」得看 / 要看','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson16',2,'「具体例を挙げて説明！『〜みたいな／〜とか』を自然に言おう」像……什麼的','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson16',3,'「動作の繰り返しを表す！中国語で“〜しては〜する”を自在に」V來V去','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson16',4,'「比べたいときの決定版！『〜にかなわない／〜には敵わない』を自然に」比得/不上','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book1-lesson16',5,'「『〜してこそ…』の条件表現を中国語でマスター！」只有......才','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book2-lesson01',1,'「“最好 + 動詞”で“～したほうがいい”を伝えよう！🌟」','📝 文法の基本構造

最好  +  動詞句（VP）
最好（zuì hǎo） = 「最も良い」「ベスト」

後ろに “行動や状態を表す言葉” を置くことで「～したほうがいい」という提案・助言を表す。

✨ 例文（文法解説用）

你最好早一點睡覺，明天才有精神。
nǐ zuì hǎo zǎo yì diǎn shuì jiào, míng tiān cái yǒu jīng shén
→ 「明日元気でいるために、早めに寝たほうがいいよ。」

天氣很冷，你最好多穿一件外套。
tiān qì hěn lěng, nǐ zuì hǎo duō chuān yì jiàn wài tào
→ 「寒いから、コートをもう1枚着たほうがいいよ。」

這份報告很重要，我們最好今天就完成。
zhè fèn bào gào hěn zhòng yào, wǒ men zuì hǎo jīn tiān jiù wán chéng
→ 「このレポートは大事だから、今日中に仕上げたほうがいいね。」

🔍 ポイント
命令ではなく、相手を思いやる柔らかい提案。

否定形は「最好不要 + 動詞句」（～しないほうがいい）
例：你最好不要一個人去。nǐ zuì hǎo bú yào yí gè rén qù（1人で行かないほうがいいよ）','🏃‍♀️ 練習問題
下の日本語を中国語にしてみましょう。ヒントを参考に考えてください✏️

#        日本語        ヒント
1        明日は試験だよ。勉強したほうがいいよ。        「勉強する」＝念書 niàn shū
2        暑いね。水をたくさん飲んだほうがいいよ。        「水を飲む」＝喝水 hē shuǐ
3        その映画は長いよ。先にチケットを買ったほうがいいよ。        「チケットを買う」＝買票 mǎi piào','✅ 解答 & 解説
你最好念書，因為明天要考試。
nǐ zuì hǎo niàn shū, yīn wèi míng tiān yào kǎo shì
→ “要考試” を理由で添えてもOK。

天氣很熱，你最好多喝水。
tiān qì hěn rè, nǐ zuì hǎo duō hē shuǐ

那部電影很長，你最好先買票。
nà bù diàn yǐng hěn cháng, nǐ zuì hǎo xiān mǎi piào
→ “先（xiān）” を入れて「先に～」を強調。

ポイント解説

“最好” の後は動詞句をそのまま置く。

理由を言いたいときは前後に理由文を挟むと自然。

“多 + 動詞” で「たくさん～する」、 “先 + 動詞” で「先に～する」など幅を広げよう！','📌 まとめ
最好 + 動詞句 =「～したほうがいい」「～がベスト」

“最好不要 + 動詞句” で「～しないほうがいい」

柔らかく相手を思いやるアドバイス表現として大活躍✨

これで今日の文法もバッチリですね！復習するときは、身近なシーンで「最好～」を口に出してみると覚えやすいですよ😊

それではまた次回お会いしましょう～下次見! 👋');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book2-lesson01',2,'「不但…也…」の使い方｜2つの良いことを伝える便利な表現！','🧠 文法解説｜基本の形と意味
「不但……，也……」の基本構造はこちら👇

不但 A，也 B

✅ 意味：A だけでなく、B もそうだということを伝えたいときに使います。

「不但」は「A だけでなく」、
「也」は「B もまた」と言いたいときにセットで使います。

🗣️ 例文解説
📌 例文①
我不但想吃小籠包，也想吃牛肉麵。
（wǒ bùdàn xiǎng chī xiǎolóngbāo, yě xiǎng chī niúròumiàn）
👉 小籠包だけでなく、牛肉麺も食べたいです。

📌 例文②
學中文不但很有意思，也比較容易找工作。
（xué zhōngwén bùdàn hěn yǒu yìsi, yě bǐjiào róngyì zhǎo gōngzuò）
👉 中国語を学ぶのは面白いだけじゃなく、仕事も見つけやすくなります。

📌 例文③
台灣不但風景美，交通也很方便。
（Táiwān bùdàn fēngjǐng měi, jiāotōng yě hěn fāngbiàn）
👉 台湾は景色がきれいなだけでなく、交通も便利です。

❗ よくある間違いポイント
❌「也」を忘れると意味が通じにくくなることがあります。

✅「不但…也…」の形はセット！
「不但」が出てきたら、必ず後半に「也」「還」「而且」などを入れましょう。','📝 練習問題
それでは、実際に使ってみましょう！

Q1.
この映画は感動的なだけでなく、音楽もすごく良かったと言いたい時は？

ヒント：「感動的」は「感人（gǎnrén）」、「音楽が良い」は「音樂也很好」

Q2.
彼はスポーツが得意なだけでなく、勉強もできると言いたい時は？

ヒント：「スポーツが得意」は「很會運動」、「勉強ができる」は很會讀書','✅ 解答＆解説
A1.
這部電影不但很感人，音樂也很好。
（zhè bù diànyǐng bùdàn hěn gǎnrén, yīnyuè yě hěn hǎo）

A2.
他不但很會運動，功課也很好。很會讀書
（tā bùdàn hěn huì yùndòng, gōngkè yě hěn hǎo）','🧾 まとめ
今日は「不但……，也……」の文法を学びました！
🔹 「A だけでなく、B もそうだ」と言いたいときに使える便利なフレーズ。
🔹「不但」が出てきたら、「也」などでしっかり後半をつなげよう！

いろんな場面で使えるので、ぜひ口に出して練習してみてくださいね！');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book2-lesson01',3,'「動きが“全部終わった”ことを伝える『完』の使い方」','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book2-lesson01',4,'『「V在＋場所」で “どこにいるか・置くか” をスッキリ説明！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book2-lesson01',5,'「動詞＋給」で“誰に何をする”が言える！','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book2-lesson01',6,'同時に2つのことをする時に使える便利な文法！「一邊～一邊～」の使い方','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book2-lesson01',7,'「雖然……可是……」の使い方をマスターしよう！｜対比を表す便利な表現','','','','');
INSERT INTO grammar_points (lesson_id,sort_order,title,explanation,exercises,answers,summary) VALUES ('book2-lesson01',8,'相手にやさしく伝えるコツ！中国語の文末「呢」の使い方','','','','');
