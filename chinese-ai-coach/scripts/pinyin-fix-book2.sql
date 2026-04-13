-- Taiwan Mandarin Pinyin Corrections for Book2 vocabulary
-- Generated: 2026-04-12
-- Total rows updated: 18
--
-- Rules applied:
--   1. 一 tone sandhi: before 4th tone -> yí; before 1st/2nd/3rd -> yì
--   2. 不 tone sandhi: before 4th tone -> bú (not bù)
--   3. 危險: wēi -> wéi (Taiwan standard reading)
--   4. 期 in compounds: qī -> qí (Taiwan standard: 期末, 期末考)
--   5. 研究: jiū -> jiù (究=jiù in Taiwan Mandarin)

-- ============================================================
-- Rule 1: 一 tone sandhi
-- ============================================================

-- id=977  一下  (下 xià = 4th tone → 一 becomes yí)
UPDATE vocabulary SET pinyin = 'yí xià' WHERE id = 977;

-- id=1000  一個人  (個 gè = 4th tone → 一 becomes yí)
UPDATE vocabulary SET pinyin = 'yí gè rén' WHERE id = 1000;

-- id=1007  一直  (直 zhí = 2nd tone → 一 becomes yì)
UPDATE vocabulary SET pinyin = 'yì zhí' WHERE id = 1007;

-- id=1039  一點/一點兒  (點 diǎn = 3rd tone → 一 becomes yì)
UPDATE vocabulary SET pinyin = 'yì diǎn / yì diǎn r' WHERE id = 1039;

-- id=1109  一會兒  (會 huì = 4th tone → 一 becomes yí)
UPDATE vocabulary SET pinyin = 'yí huì r' WHERE id = 1109;

-- id=1179  一般  (般 bān = 1st tone → 一 becomes yì)
UPDATE vocabulary SET pinyin = 'yì bān' WHERE id = 1179;

-- id=1341  一下子/一下  (下 xià = 4th tone → 一 becomes yí in both parts)
UPDATE vocabulary SET pinyin = 'yí xià zi / yí xià' WHERE id = 1341;

-- id=1428  一開始  (開 kāi = 1st tone → 一 becomes yì)
UPDATE vocabulary SET pinyin = 'yì kāi shǐ' WHERE id = 1428;

-- id=1745  差(一)點兒  (點 diǎn = 3rd tone → 一 becomes yì)
UPDATE vocabulary SET pinyin = 'chà (yì) diǎnr' WHERE id = 1745;

-- ============================================================
-- Rule 2: 不 tone sandhi (before 4th tone → bú)
-- ============================================================

-- id=983  不但  (但 dàn = 4th tone → 不 becomes bú)
UPDATE vocabulary SET pinyin = 'bú dàn' WHERE id = 983;

-- id=1072  不用  (用 yòng = 4th tone → 不 becomes bú)
UPDATE vocabulary SET pinyin = 'bú yòng' WHERE id = 1072;

-- id=1316  不必  (必 bì = 4th tone → 不 becomes bú)
UPDATE vocabulary SET pinyin = 'bú bì' WHERE id = 1316;

-- ============================================================
-- Rule 3: Taiwan-specific readings
-- ============================================================

-- id=1006  危險  (危 in Taiwan = wéi, not wēi)
UPDATE vocabulary SET pinyin = 'wéi xiǎn' WHERE id = 1006;

-- ============================================================
-- Rule 4: 期 in compounds (Taiwan reads 期 as qí in 期末)
-- ============================================================

-- id=1463  期末  (期 qī → qí in Taiwan)
UPDATE vocabulary SET pinyin = 'qí mò' WHERE id = 1463;

-- id=1490  期末考  (期 qī → qí in Taiwan)
UPDATE vocabulary SET pinyin = 'qí mò kǎo' WHERE id = 1490;

-- ============================================================
-- Rule 5: 研究 (究 = jiù in Taiwan Mandarin, not jiū)
-- ============================================================

-- id=1642  研究所  (究 jiū → jiù)
UPDATE vocabulary SET pinyin = 'yán jiù suǒ' WHERE id = 1642;

-- id=1643  研究  (究 jiū → jiù)
UPDATE vocabulary SET pinyin = 'yán jiù' WHERE id = 1643;

-- id=1668  研究  (究 jiū → jiù)  [duplicate entry in lesson12]
UPDATE vocabulary SET pinyin = 'yán jiù' WHERE id = 1668;
