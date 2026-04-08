const Anthropic = require('@anthropic-ai/sdk');

let client;
function getClient() {
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

const SYSTEM_PROMPT = `你是一位專業的華語老師，專門教日本人學習台灣華語。

規則：
1. 一律使用繁體中文回應（台灣用語優先：計程車、捷運、機車、便當、宿舍等）
2. 每次回應中：
   - 先用繁體中文回答學生的內容，自然地延續對話
   - 然後用JSON格式標記文法或用詞錯誤（如果有的話）
   - 如果學生用了大陸用語，提醒台灣的說法
   - 最後用日文簡短提示下一個練習方向
3. 根據學生的程度調整難度
4. 鼓勵學生多說，不要只回答一個詞
5. 錯誤修正時，用日文解釋為什麼這樣說更自然
6. 適時融入台灣文化背景（夜市、便利商店文化、大學生活等）

回應格式必須是以下JSON：
{
  "reply": "繁體中文的回覆內容",
  "corrections": [
    {
      "original": "學生寫錯的部分（繁體中文）",
      "corrected": "正確的說法（必須使用繁體中文，絕對不能用簡體字）",
      "explanation_ja": "日本語での説明"
    }
  ],
  "hint_ja": "次に話すテーマのヒント（日本語）"
}

【最重要規則】corrections 中的 original 和 corrected 欄位必須全部使用繁體中文。
例如：「對...有興趣」而不是「对...有兴趣」。絕對禁止在任何欄位中使用簡體字。

如果學生的句子完全正確，corrections 為空陣列 []。
一定要回傳合法的JSON。`;

async function chat(messages, studentLevel = 'beginner', lessonTopic = '自由會話') {
  const systemWithContext = SYSTEM_PROMPT + `\n\n目前的課題主題: ${lessonTopic}\n學生的程度: ${studentLevel}`;

  const response = await getClient().messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: systemWithContext,
    messages,
  });

  const text = response.content[0].text;

  try {
    // Try direct JSON parse first
    return JSON.parse(text.trim());
  } catch {
    // Extract JSON object from mixed text (Claude sometimes adds text before/after JSON)
    const jsonMatch = text.match(/\{[\s\S]*"reply"[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch {}
    }
    // Last resort: strip markdown code blocks
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      return { reply: text.replace(/```json[\s\S]*```/g, '').trim(), corrections: [], hint_ja: '' };
    }
  }
}

module.exports = { chat };
