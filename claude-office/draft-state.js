// ============================================
// ドラフト状態管理
// 直近の返信案を保持し、フィードバックによる再生成を可能にする
// ============================================

let activeDraft = null;

/**
 * アクティブな返信案を設定
 * @param {object} draft - { lineName, originalMessage, draft, utageUrl, messageId }
 */
export function setActiveDraft(draft) {
  activeDraft = {
    ...draft,
    setAt: new Date().toISOString(),
    feedbackHistory: [],
  };
}

/**
 * アクティブな返信案を取得
 * 30分以上経過したら無効とみなす
 */
export function getActiveDraft() {
  if (!activeDraft) return null;

  const elapsed = Date.now() - new Date(activeDraft.setAt).getTime();
  if (elapsed > 30 * 60 * 1000) {
    activeDraft = null;
    return null;
  }

  return activeDraft;
}

/**
 * フィードバックを追加
 */
export function addFeedback(feedback) {
  if (!activeDraft) return;
  activeDraft.feedbackHistory.push({
    feedback,
    at: new Date().toISOString(),
  });
}

/**
 * 返信案を更新（再生成後）
 */
export function updateDraft(newDraftText) {
  if (!activeDraft) return;
  activeDraft.draft = newDraftText;
  activeDraft.setAt = new Date().toISOString();
}

/**
 * アクティブな返信案をクリア
 */
export function clearActiveDraft() {
  activeDraft = null;
}
