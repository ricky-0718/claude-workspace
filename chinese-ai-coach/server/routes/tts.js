const express = require('express');
const router = express.Router();
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// キャッシュディレクトリ
const CACHE_DIR = path.join(__dirname, '../../data/tts-cache');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

// 高品質中国語音声（Xiaoxiao = Microsoft最高品質）
const VOICE = 'zh-CN-XiaoxiaoNeural';

// ピンイン → 代表漢字マッピング（TTSが英語として読むのを防止）
const PINYIN_TO_CHAR = {
  a:'啊',ai:'愛',an:'安',e:'餓',er:'二',wa:'哇',wai:'外',wan:'玩',wang:'王',wei:'為',wen:'問',wo:'我',wu:'五',
  yan:'眼',yang:'養',yao:'要',ye:'也',yi:'一',yin:'因',ying:'應',yong:'用',you:'有',yu:'雨',yuan:'遠',yue:'月',yun:'雲',
  ba:'八',bai:'白',ban:'半',bang:'幫',bao:'包',bei:'北',ben:'本',bi:'比',bian:'邊',biao:'表',bie:'別',bin:'賓',bing:'冰',bo:'波',bu:'不',
  pa:'怕',pai:'拍',pan:'盤',pang:'旁',pao:'跑',peng:'朋',pi:'皮',pian:'片',piao:'票',ping:'平',
  ma:'媽',mai:'買',man:'慢',mang:'忙',mao:'貓',me:'麼',mei:'沒',men:'門',mian:'面',ming:'明',mo:'末',mu:'木',
  fa:'發',fan:'飯',fang:'放',fei:'飛',fen:'分',feng:'風',fu:'付',
  da:'大',dai:'帶',dan:'但',dang:'當',dao:'到',de:'的',dei:'得',deng:'等',di:'地',dian:'電',ding:'定',dong:'東',dou:'都',du:'讀',duan:'短',dui:'對',duo:'多',
  ta:'他',tai:'太',tan:'談',tang:'湯',te:'特',ti:'提',tian:'天',tiao:'條',tie:'貼',ting:'聽',tong:'同',tou:'頭',tu:'圖',
  na:'那',nai:'奶',nan:'南',nao:'腦',ne:'呢',neng:'能',ni:'你',nian:'年',niao:'鳥',nin:'您',niu:'牛','nv':'女',
  lai:'來',lan:'藍',lao:'老',le:'了',lei:'累',leng:'冷',li:'裡',lian:'連',liang:'亮',liao:'料',lin:'林',ling:'零',liu:'六',long:'龍',lou:'樓',lu:'路','lv':'綠',
  gai:'該',gan:'感',gang:'剛',gao:'高',ge:'個',gei:'給',gen:'跟',geng:'更',gong:'公',gou:'狗',gu:'故',guai:'怪',guan:'關',gui:'貴',guo:'國',
  ka:'卡',kai:'開',kan:'看',kang:'抗',kao:'考',ke:'可',kong:'空',kou:'口',ku:'哭',kuai:'快',
  hai:'還',han:'漢',hang:'行',hao:'好',he:'喝',hei:'黑',hen:'很',hong:'紅',hou:'後',hu:'湖',hua:'花',huai:'壞',huan:'換',huang:'黃',hui:'會',hun:'婚',huo:'火',
  ji:'幾',jia:'家',jian:'見',jiang:'將',jiao:'叫',jie:'姐',jin:'今',jing:'經',jiu:'九',ju:'居',jue:'覺',
  qi:'七',qian:'前',qiao:'橋',qie:'切',qin:'親',qing:'請',qiu:'秋',qu:'去',qun:'群',
  xi:'西',xia:'下',xian:'先',xiang:'想',xiao:'小',xie:'謝',xin:'新',xing:'行',xiong:'兄',xiu:'休',xu:'需',xue:'學',
  zhan:'站',zhang:'張',zhao:'找',zhe:'這',zhen:'真',zhi:'知',zhong:'中',zhou:'週',zhu:'住',zhuan:'轉',zhun:'準',zhuo:'桌',
  cha:'茶',chang:'長',chao:'超',che:'車',cheng:'成',chi:'吃',chu:'出',chuan:'穿',chuang:'床',chun:'春',
  sha:'沙',shai:'曬',shan:'山',shang:'上',shao:'少',she:'社',shei:'誰',shen:'深',sheng:'生',shi:'是',shou:'手',shu:'書',shuang:'雙',shui:'水',shuo:'說',
  ran:'然',re:'熱',ren:'人',ri:'日',rong:'容',rou:'肉',ru:'如',
  za:'雜',zai:'在',zao:'早',zen:'怎',zi:'字',zou:'走',zu:'足',zui:'最',zuo:'做',
  cai:'菜',can:'餐',ce:'測',ci:'次',cong:'從',cuo:'錯',
  sai:'賽',se:'色',si:'四',song:'送',sou:'搜',su:'素',suan:'算',sui:'歲',suo:'所',
};

router.get('/', async (req, res) => {
  let text = req.query.text;
  if (!text || text.length > 200) {
    return res.status(400).json({ error: 'text required (max 200 chars)' });
  }

  // ピンイン（英字のみ）の場合は漢字に変換
  if (/^[a-zü]+$/.test(text) && PINYIN_TO_CHAR[text.replace('ü','v')]) {
    text = PINYIN_TO_CHAR[text.replace('ü','v')];
  }

  const hash = crypto.createHash('md5').update(text + VOICE + 'slow').digest('hex');
  const cachePath = path.join(CACHE_DIR, `${hash}.mp3`);

  if (fs.existsSync(cachePath)) {
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=604800');
    return fs.createReadStream(cachePath).pipe(res);
  }

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

    // SSMLでゆっくり読み上げ（1文字は特にゆっくり）
    const rate = text.length === 1 ? 'slow' : 'medium';
    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN"><voice name="${VOICE}"><prosody rate="${rate}">${text}</prosody></voice></speak>`;
    const { audioStream } = tts.rawToStream(ssml);
    const chunks = [];

    audioStream.on('data', (chunk) => chunks.push(chunk));
    audioStream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      // キャッシュに保存
      fs.writeFileSync(cachePath, buffer);

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=604800');
      res.send(buffer);
    });
    audioStream.on('error', (err) => {
      console.error('TTS error:', err);
      res.status(500).json({ error: 'TTS generation failed' });
    });
  } catch (err) {
    console.error('TTS error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
