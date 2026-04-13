-- pinyin-fix-travel.sql
-- Taiwan Mandarin pinyin corrections for travel vocabulary (IDs 874–973)
-- Rules applied:
--   一 + 4th tone  -> yí  (sandhi)
--   一 + 1st/2nd/3rd tone -> yì  (sandhi)
--   一 standalone / ordinal (第一) -> yī  (no change)
--   不 + 4th tone  -> bú  (sandhi)  — all 不 entries verified CORRECT; no 不 updates needed
--   Taiwan-specific readings verified: shénme/zěnme/nàme/zhème all correct throughout
-- Total UPDATE statements: 32 (17 main pinyin + 15 examples_json)

-- ============================================================
-- ID 877  examples_json
-- 一台 (tái = 2nd tone) -> yì tái
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"我想叫一台計程車去市區。","pinyin":"wǒ xiǎng jiào yì tái jì chéng chē qù shì qū.","translation_ja":"市内までタクシーに乗りたいのですが。"}]'
WHERE id = 877;

-- ============================================================
-- ID 879  main pinyin
-- 最後一班 (bān = 1st tone) -> yì bān
-- ============================================================
UPDATE vocabulary
SET pinyin = 'jié yùn zuì hòu yì bān shì jǐ diǎn?'
WHERE id = 879;

-- ID 879  examples_json
-- 最後一班 (bān = 1st tone) -> yì bān
UPDATE vocabulary
SET examples_json = '[{"hanzi":"最後一班公車是幾點？","pinyin":"zuì hòu yì bān gōng chē shì jǐ diǎn?","translation_ja":"最終バスは何時ですか？"}]'
WHERE id = 879;

-- ============================================================
-- ID 880  examples_json
-- 哪一站 (zhàn = 4th tone) -> yí zhàn
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"在哪一站可以換乘紅線？","pinyin":"zài nǎ yí zhàn kě yǐ huàn chéng hóng xiàn?","translation_ja":"どの駅で赤線に乗り換えられますか？"}]'
WHERE id = 880;

-- ============================================================
-- ID 881  main pinyin
-- 一張 (zhāng = 1st tone) -> yì zhāng
-- ============================================================
UPDATE vocabulary
SET pinyin = 'yì zhāng piào duō shǎo qián?'
WHERE id = 881;

-- ID 881  examples_json
-- 一張 (zhāng = 1st tone) -> yì zhāng
UPDATE vocabulary
SET examples_json = '[{"hanzi":"到西門站一張票多少錢？","pinyin":"dào xī mén zhàn yì zhāng piào duō shǎo qián?","translation_ja":"西門駅まで一枚いくらですか？"}]'
WHERE id = 881;

-- ============================================================
-- ID 884  main pinyin
-- 一張 (zhāng = 1st tone) -> yì zhāng
-- ============================================================
UPDATE vocabulary
SET pinyin = 'qǐng gěi wǒ yì zhāng shōu jù.'
WHERE id = 884;

-- ============================================================
-- ID 887  examples_json
-- 停一下 (xià = 4th tone) -> yí xià
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"麻煩在前面路口停一下。","pinyin":"má fán zài qián miàn lù kǒu tíng yí xià.","translation_ja":"すみません、前の交差点で止めてください。"}]'
WHERE id = 887;

-- ============================================================
-- ID 891  main pinyin
-- 下一班 (bān = 1st tone) -> yì bān
-- ============================================================
UPDATE vocabulary
SET pinyin = 'xià yì bān chē jǐ diǎn lái?'
WHERE id = 891;

-- ID 891  examples_json
-- 下一班 (bān = 1st tone) -> yì bān
UPDATE vocabulary
SET examples_json = '[{"hanzi":"下一班捷運幾分鐘後來？","pinyin":"xià yì bān jié yùn jǐ fēn zhōng hòu lái?","translation_ja":"次のMRTは何分後に来ますか？"}]'
WHERE id = 891;

-- ============================================================
-- ID 892  examples_json
-- 一小時 (xiǎo = 3rd tone) -> yì xiǎo shí
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"停車費一小時多少錢？","pinyin":"tíng chē fèi yì xiǎo shí duō shǎo qián?","translation_ja":"駐車料金は1時間いくらですか？"}]'
WHERE id = 892;

-- ============================================================
-- ID 896  examples_json
-- 一張 (zhāng = 1st tone) -> yì zhāng
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"麻煩幫我們拍一張合照。","pinyin":"má fán bāng wǒ men pāi yì zhāng hé zhào.","translation_ja":"すみません、一緒に写真を撮っていただけますか？"}]'
WHERE id = 896;

-- ============================================================
-- ID 899  examples_json
-- 這一份 (fèn = 4th tone) -> yí fèn
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"這一份多少錢？","pinyin":"zhè yí fèn duō shǎo qián?","translation_ja":"これ一つはいくらですか？"}]'
WHERE id = 899;

-- ============================================================
-- ID 900  main pinyin
-- 一份 (fèn = 4th tone) -> yí fèn
-- ============================================================
UPDATE vocabulary
SET pinyin = 'wǒ yào yí fèn chòu dòu fu.'
WHERE id = 900;

-- ============================================================
-- ID 904  main pinyin
-- 一杯 (bēi = 1st tone) -> yì bēi
-- ============================================================
UPDATE vocabulary
SET pinyin = 'qǐng gěi wǒ yì bēi zhēn zhū nǎi chá.'
WHERE id = 904;

-- ============================================================
-- ID 909  main pinyin
-- 一碗 (wǎn = 3rd tone) -> yì wǎn
-- ============================================================
UPDATE vocabulary
SET pinyin = 'zài lái yì wǎn, xiè xie.'
WHERE id = 909;

-- ============================================================
-- ID 910  main pinyin
-- 一個 (ge = neutral tone derived from 4th; sandhi applies) -> yí ge
-- ============================================================
UPDATE vocabulary
SET pinyin = 'wǒ yào yí ge biàn dāng.'
WHERE id = 910;

-- ============================================================
-- ID 913  main pinyin
-- 一點 (diǎn = 3rd tone) -> yì diǎn
-- ============================================================
UPDATE vocabulary
SET pinyin = 'kě yǐ shǎo fàng yì diǎn yán ma?'
WHERE id = 913;

-- ============================================================
-- ID 915  main pinyin
-- 一份 (fèn = 4th tone) -> yí fèn
-- ============================================================
UPDATE vocabulary
SET pinyin = 'lǔ ròu fàn yí fèn duō shǎo qián?'
WHERE id = 915;

-- ============================================================
-- ID 922  examples_json
-- 一百 (bǎi = 3rd tone) -> yì bǎi
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"我付一百塊，請找錢。","pinyin":"wǒ fù yì bǎi kuài, qǐng zhǎo qián.","translation_ja":"100元払います、お釣りをください。"}]'
WHERE id = 922;

-- ============================================================
-- ID 924  examples_json
-- 一間 (jiān = 1st tone) -> yì jiān
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"我預約了一間雙人房。","pinyin":"wǒ yù yuē le yì jiān shuāng rén fáng.","translation_ja":"ダブルルームを一室予約しました。"}]'
WHERE id = 924;

-- ============================================================
-- ID 925  examples_json
-- 早一點 (diǎn = 3rd tone) -> yì diǎn
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"我可以早一點辦理入住嗎？","pinyin":"wǒ kě yǐ zǎo yì diǎn bàn lǐ rù zhù ma?","translation_ja":"早めにチェックインできますか？"}]'
WHERE id = 925;

-- ============================================================
-- ID 928  main pinyin
-- 一間 (jiān = 1st tone) -> yì jiān
-- ============================================================
UPDATE vocabulary
SET pinyin = 'kě yǐ huàn yì jiān fáng jiān ma?'
WHERE id = 928;

-- ============================================================
-- ID 930  main pinyin
-- 一下 (xià = 4th tone) -> yí xià
-- ============================================================
UPDATE vocabulary
SET pinyin = 'qǐng bāng wǒ jiào yí xià Morning Call.'
WHERE id = 930;

-- ============================================================
-- ID 931  main pinyin
-- 一條 (tiáo = 2nd tone) -> yì tiáo
-- ============================================================
UPDATE vocabulary
SET pinyin = 'qǐng zài gěi wǒ yì tiáo máo jīn.'
WHERE id = 931;

-- ID 931  examples_json
-- 一套 (tào = 4th tone) -> yí tào
UPDATE vocabulary
SET examples_json = '[{"hanzi":"請多給我一套盥洗用品。","pinyin":"qǐng duō gěi wǒ yí tào guàn xǐ yòng pǐn.","translation_ja":"アメニティセットをもう一つください。"}]'
WHERE id = 931;

-- ============================================================
-- ID 933  examples_json
-- 大一號 (hào = 4th tone) -> yí hào
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"有沒有大一號的？","pinyin":"yǒu méi yǒu dà yí hào de?","translation_ja":"一つ大きいサイズはありますか？"}]'
WHERE id = 933;

-- ============================================================
-- ID 938  examples_json
-- 一個 (ge neutral/4th) -> yí ge
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"這個壞了，可以換一個嗎？","pinyin":"zhè ge huài le, kě yǐ huàn yí ge ma?","translation_ja":"これが壊れているのですが、交換してもらえますか？"}]'
WHERE id = 938;

-- ============================================================
-- ID 944  examples_json
-- 哪一層 (céng = 2nd tone) -> yì céng
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"自助洗衣機在哪一層？","pinyin":"zì zhù xǐ yī jī zài nǎ yì céng?","translation_ja":"コインランドリーは何階にありますか？"}]'
WHERE id = 944;

-- ============================================================
-- ID 952  examples_json
-- 看一下 (xià = 4th tone) -> yí xià
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"我肚子很痛，請幫我看一下。","pinyin":"wǒ dù zi hěn tòng, qǐng bāng wǒ kàn yí xià.","translation_ja":"お腹がとても痛いので、診てもらえますか？"}]'
WHERE id = 952;

-- ============================================================
-- ID 962  examples_json
-- 一份 (fèn = 4th tone) -> yí fèn
-- ============================================================
UPDATE vocabulary
SET examples_json = '[{"hanzi":"請給我一份報案證明。","pinyin":"qǐng gěi wǒ yí fèn bào àn zhèng míng.","translation_ja":"被害届の証明書をください。"}]'
WHERE id = 962;

-- ============================================================
-- ID 973  main pinyin
-- 一下 (xià = 4th tone) -> yí xià
-- ============================================================
UPDATE vocabulary
SET pinyin = 'qǐng ràng wǒ zuò xià lái xiū xi yí xià.'
WHERE id = 973;

-- ============================================================
-- VERIFIED CORRECT — no changes needed:
-- ============================================================
-- ID 874  qǐng wèn jié yùn zhàn zěn me zǒu?          (no 一/不)
-- ID 875  wǒ yào qù tái běi chē zhàn.                 (no 一/不)
-- ID 876  yōu yóu kǎ zài nǎ lǐ mǎi?                  (no 一/不)
-- ID 878  dào shì qū yào duō shǎo qián?               (no 一/不)
-- ID 882  xíng lǐ kě yǐ fàng zài zhè lǐ ma?          (no 一/不)
-- ID 883  qǐng wèn cè suǒ zài nǎ lǐ?                 (no 一/不)
-- ID 885  wǒ yào qù táo yuán guó jì jī chǎng.        (no 一/不)
-- ID 886  gōng chē jǐ hào qù yè shì?                 (no 一/不)
-- ID 888  wǒ dā cuò chē le.                           (no 一/不)
-- ID 889  zhè lǐ kě yǐ shuā yōu yóu kǎ ma?           (no 一/不)
-- ID 890  qǐng wèn zhè bān chē yǒu dào gù gōng ma?  (no 一/不)
-- ID 893  wǒ yào zū jiǎo tà chē.                     (no 一/不)
-- ID 894  qǐng wèn wǎng jiǔ fèn zěn me qù?           (no 一/不)
-- ID 895  wǒ zài nǎ lǐ kě yǐ huàn qián?              (no 一/不)
-- ID 896 main  kě yǐ bāng wǒ pāi zhào ma?            (no 一/不)
-- ID 897  qǐng wèn guān guāng fú wù zhōng xīn zài nǎ lǐ?  (no 一/不)
-- ID 898  qǐng wèn qù dàn shuǐ zěn me dā?            (no 一/不)
-- ID 901 main  bú yào tài là.                         CORRECT (不要=bú)
-- ID 902  kě yǐ shuā kǎ ma?                           (no 一/不)
-- ID 903  zhè ge zěn me chī?                          (no 一/不)
-- ID 905  wǒ duì huā shēng guò mǐn.                  (no 一/不)
-- ID 906  bāng wǒ dǎ bāo, xiè xie.                   (no 一/不)
-- ID 907  qǐng wèn yǒu sù shí de xuǎn zé ma?         (no 一/不)
-- ID 908  tuī jiàn shén me hǎo chī de?                (no 一/不)
-- ID 911  qǐng wèn jǐ diǎn dǎ yàng?                  (no 一/不)
-- ID 912 main  zhè shì wǒ dì yī cì chī zhè ge.       CORRECT (第一 ordinal -> yī)
-- ID 914  zhè ge shì shén me?                         (no 一/不)
-- ID 916  niú ròu miàn de tāng tóu hěn bàng.         (no 一/不)
-- ID 917  qǐng wèn kě yǐ jiā là ma?                  (no 一/不)
-- ID 918  qǐng wèn yǒu cài dān ma?                   (no 一/不)
-- ID 919  zhè ge wèi dào hǎo jí le!                  (no 一/不)
-- ID 920  qǐng wèn zhè lǐ kě yǐ nèi yòng ma?         (no 一/不)
-- ID 921  wǒ yào mǎi shí ge xiǎo lóng bāo.           (no 一; 十 not 一)
-- ID 923  wǒ chī bǎo le, fēi cháng hǎo chī.          (no 一/不)
-- ID 926  qǐng wèn yǒu Wi-Fi ma?                      (no 一/不)
-- ID 927 main  fáng jiān de lěng qì huài le.          (no 一/不)
-- ID 929  qǐng wèn jǐ diǎn tuì fáng?                 (no 一/不)
-- ID 932  wǒ yào zài biàn lì shāng diàn mǎi dōng xi. (no 一/不)
-- ID 934  zhè ge yǒu méi yǒu bié de yán sè?          (no 一/不)
-- ID 935  kě yǐ dǎ zhé ma?                            (no 一/不)
-- ID 936 main  zhè ge wǒ bù xū yào dài zi.           CORRECT (不需=bù)
-- ID 937  qǐng wèn zhè fù jìn yǒu yào zhuāng diàn ma? (no 一/不)
-- ID 939  qǐng wèn zhè lǐ kě yǐ jì sòng dào rì běn ma? (no 一/不)
-- ID 940 main  wǒ de fáng kǎ bù néng yòng.           CORRECT (不能=bù)
-- ID 941  qǐng wèn yǒu bǎo xiǎn xiāng ma?            (no 一/不)
-- ID 942  qǐng wèn zǎo cān jǐ diǎn kāi shǐ?          (no 一/不)
-- ID 943  fù jìn yǒu chāo shì ma?                    (no 一/不)
-- ID 945  qǐng wèn kě yǐ bāng wǒ bǎo guǎn xíng lǐ ma? (no 一/不)
-- ID 946  zhè ge duō shǎo qián?                       (no 一/不)
-- ID 947  qǐng gěi wǒ fā piào.                       (no 一/不)
-- ID 948  qǐng wèn yǒu miǎn fèi de tíng chē wèi ma? (no 一/不)
-- ID 949  qǐng bāng wǒ jiào jiù hù chē!              (no 一/不)
-- ID 950 main  wǒ de hù zhào bú jiàn le.             CORRECT (不見=bú)
-- ID 951 main  wǒ mí lù le.                           (no 一/不)
-- ID 953  qǐng bāng wǒ jiào jǐng chá!                (no 一/不)
-- ID 954  qǐng wèn zuì jìn de yī yuàn zài nǎ lǐ?    (醫院 yī is not 一; CORRECT)
-- ID 955 main  wǒ de qián bāo bèi tōu le.            (no 一/不)
-- ID 956  qǐng wèn rì běn tái wān jiāo liú xié huì zài nǎ lǐ? (no 一/不)
-- ID 957  wǒ tóu hěn yūn.                            (no 一/不)
-- ID 958  qǐng bāng wǒ zhǎo fān yì.                  (no 一/不)
-- ID 959  qǐng wèn zhè fù jìn yǒu yào jú ma?         (no 一/不)
-- ID 960  wǒ duì zhè ge yào wù guò mǐn.              (no 一/不)
-- ID 961  qǐng wèn jǐng chá jú zài nǎ lǐ?            (no 一/不)
-- ID 963 main  wǒ de xíng lǐ bú jiàn le.             CORRECT (不見=bú)
-- ID 964  qǐng bāng wǒ dǎ diàn huà gěi fàn diàn.    (no 一/不)
-- ID 965  wǒ xū yào jǐn jí jiù yī.                   (就醫 yī = 醫, not 一; CORRECT)
-- ID 966  qǐng wèn fù jìn yǒu ATM ma?                (no 一/不)
-- ID 967  wǒ de xìn yòng kǎ bèi tūn le.              (no 一/不)
-- ID 968  wǒ xū yào zhǎo rén bāng wǒ fān yì.        (no 一/不)
-- ID 969  wǒ fā shāo le.                              (no 一/不)
-- ID 970  qǐng wèn tái wān de jí jiù diàn huà shì jǐ hào? (no 一/不)
-- ID 971  qǐng bāng wǒ tōng zhī jiā rén.             (no 一/不)
-- ID 972  wǒ yǒu mǎi lǚ yóu bǎo xiǎn.               (no 一/不)
-- ID 973 EX  wǒ gǎn jué yǒu diǎn bù shū fu ...       CORRECT (不舒=bù)
