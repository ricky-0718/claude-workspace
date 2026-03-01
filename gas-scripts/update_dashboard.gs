/**
 * 【オートウェビナー】広告分析ダッシュボード
 * UTAGE生データ（面談終了・面談キャンセル・成約金額）を
 * 日次集計・KPIダッシュボード・改善診断レポートに反映するスクリプト
 *
 * 使い方: スプレッドシートの 拡張機能 → Apps Script に貼り付けて
 *         updateAllSheets() を実行
 */

function updateAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  updateDailySheet(ss);
  updateKPIDashboard(ss);
  updateDiagnosticReport(ss);

  SpreadsheetApp.flush();
  Browser.msgBox("完了しました！全シートにUTAGEデータを反映しました。");
}

// ============================================================
// 1. 日次集計シート — P〜U列を追加
// ============================================================
function updateDailySheet(ss) {
  const sheet = ss.getSheetByName("日次集計");
  if (!sheet) { Logger.log("日次集計シートが見つかりません"); return; }

  const lastRow = sheet.getLastRow();

  // --- ヘッダー (Row 1) ---
  sheet.getRange("P1").setValue("面談終了数");
  sheet.getRange("Q1").setValue("面談実施率");
  sheet.getRange("R1").setValue("面談キャンセル数");
  sheet.getRange("S1").setValue("キャンセル率");
  sheet.getRange("T1").setValue("成約金額");
  sheet.getRange("U1").setValue("ROAS");

  // ヘッダー書式設定（既存ヘッダーに合わせて太字・背景色）
  const headerRange = sheet.getRange("P1:U1");
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#4472C4");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setHorizontalAlignment("center");

  if (lastRow < 2) return;

  // --- 数式を行2〜lastRowに設定 ---
  for (let row = 2; row <= lastRow; row++) {
    // P: 面談終了数 = COUNTIFS(UTAGE A列で日付一致, I列=TRUE)
    sheet.getRange("P" + row).setFormula(
      '=IFERROR(IF(A' + row + '="","",COUNTIFS(UTAGE_生データ!A:A,">="&A' + row + ',UTAGE_生データ!A:A,"<"&A' + row + '+1,UTAGE_生データ!I:I,TRUE)),"")'
    );

    // Q: 面談実施率 = 面談終了数 / 個別相談数
    sheet.getRange("Q" + row).setFormula(
      '=IFERROR(IF(OR(A' + row + '="",K' + row + '=0),"",P' + row + '/K' + row + '),"")'
    );

    // R: 面談キャンセル数 = COUNTIFS(UTAGE A列で日付一致, K列=TRUE)
    sheet.getRange("R" + row).setFormula(
      '=IFERROR(IF(A' + row + '="","",COUNTIFS(UTAGE_生データ!A:A,">="&A' + row + ',UTAGE_生データ!A:A,"<"&A' + row + '+1,UTAGE_生データ!K:K,TRUE)),"")'
    );

    // S: キャンセル率 = 面談キャンセル数 / 個別相談数
    sheet.getRange("S" + row).setFormula(
      '=IFERROR(IF(OR(A' + row + '="",K' + row + '=0),"",R' + row + '/K' + row + '),"")'
    );

    // T: 成約金額 = SUMIFS(UTAGE L列, A列で日付一致)
    sheet.getRange("T" + row).setFormula(
      '=IFERROR(IF(A' + row + '="","",SUMIFS(UTAGE_生データ!L:L,UTAGE_生データ!A:A,">="&A' + row + ',UTAGE_生データ!A:A,"<"&A' + row + '+1)),"")'
    );

    // U: ROAS = 成約金額 / 広告費
    sheet.getRange("U" + row).setFormula(
      '=IFERROR(IF(OR(A' + row + '="",B' + row + '=0),"",T' + row + '/B' + row + '),"")'
    );
  }

  // 書式設定
  sheet.getRange("Q2:Q" + lastRow).setNumberFormat("0.00%");
  sheet.getRange("S2:S" + lastRow).setNumberFormat("0.00%");
  sheet.getRange("T2:T" + lastRow).setNumberFormat("#,##0");
  sheet.getRange("U2:U" + lastRow).setNumberFormat("0.00%");

  Logger.log("日次集計シート更新完了");
}

// ============================================================
// 2. KPIダッシュボード — 全期間サマリー・目標比較・週次に追加
// ============================================================
function updateKPIDashboard(ss) {
  const sheet = ss.getSheetByName("KPIダッシュボード");
  if (!sheet) { Logger.log("KPIダッシュボードが見つかりません"); return; }

  // --- 全期間サマリー（Row 1-4）: P〜R列を追加 ---
  // ヘッダー
  sheet.getRange("P2").setValue("面談終了数");
  sheet.getRange("Q2").setValue("面談実施率");
  sheet.getRange("R2").setValue("成約金額");
  sheet.getRange("S2").setValue("ROAS");

  const summaryHeader = sheet.getRange("P2:S2");
  summaryHeader.setFontWeight("bold");
  summaryHeader.setBackground("#4472C4");
  summaryHeader.setFontColor("#FFFFFF");
  summaryHeader.setHorizontalAlignment("center");

  // 合計行 (Row 3)
  sheet.getRange("P3").setFormula('=SUM(日次集計!P:P)');
  sheet.getRange("Q3").setFormula('=IFERROR(P3/K3,"")');
  sheet.getRange("R3").setFormula('=SUM(日次集計!T:T)');
  sheet.getRange("S3").setFormula('=IFERROR(R3/B3,"")');

  // 日平均行 (Row 4)
  sheet.getRange("P4").setFormula('=IFERROR(P3/COUNTA(日次集計!A2:A),"")');
  sheet.getRange("Q4").setFormula('=Q3');
  sheet.getRange("R4").setFormula('=IFERROR(R3/COUNTA(日次集計!A2:A),"")');
  sheet.getRange("S4").setFormula('=S3');

  // 書式
  sheet.getRange("Q3:Q4").setNumberFormat("0.00%");
  sheet.getRange("R3:R4").setNumberFormat("#,##0");
  sheet.getRange("S3:S4").setNumberFormat("0.00%");

  // --- 目標値との比較（Row 6-10）---
  // 既存の最後の列の後に追加
  // Row 7のヘッダーを確認して、面談実施率とROASを追加
  // 現在: CTR, CPC, LINE追加率, 説明会参加率, 個別相談率, 成約率, CPA
  // 追加: 面談実施率, ROAS

  // 現在のヘッダー位置を確認 (B7~H7あたり)
  // 既存構造: B7=CTR, C7=CPC, D7=LINE追加率, E7=説明会参加率, F7=個別相談率, G7=成約率, H7=CPA
  // I7, J7に追加
  sheet.getRange("I7").setValue("面談実施率");
  sheet.getRange("J7").setValue("ROAS");

  const targetHeader = sheet.getRange("I7:J7");
  targetHeader.setFontWeight("bold");
  targetHeader.setBackground("#4472C4");
  targetHeader.setFontColor("#FFFFFF");
  targetHeader.setHorizontalAlignment("center");

  // 目標値 (Row 8)
  sheet.getRange("I8").setValue(0.80);   // 面談実施率目標: 80%
  sheet.getRange("J8").setValue(3.0);    // ROAS目標: 300%

  // 実績値 (Row 9)
  sheet.getRange("I9").setFormula('=Q3');  // 全期間の面談実施率
  sheet.getRange("J9").setFormula('=S3');  // 全期間のROAS

  // 達成率 (Row 10)
  sheet.getRange("I10").setFormula('=IFERROR(I9/I8,"")');
  sheet.getRange("J10").setFormula('=IFERROR(J9/J8,"")');

  // 書式
  sheet.getRange("I8:I10").setNumberFormat("0.00%");
  sheet.getRange("J8").setNumberFormat("0.00%");
  sheet.getRange("J9").setNumberFormat("0.00%");
  sheet.getRange("J10").setNumberFormat("0.0%");

  // 条件付き書式（達成率の色分け）
  var rule1 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThanOrEqualTo(1)
    .setBackground("#C6EFCE")
    .setFontColor("#006100")
    .setRanges([sheet.getRange("I10:J10")])
    .build();
  var rule2 = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(1)
    .setBackground("#FFC7CE")
    .setFontColor("#9C0006")
    .setRanges([sheet.getRange("I10:J10")])
    .build();
  var rules = sheet.getConditionalFormatRules();
  rules.push(rule1, rule2);
  sheet.setConditionalFormatRules(rules);

  // --- 週次サマリー（Row 12+）---
  // 現在の週次ヘッダー行は13行目
  // 既存の最後: CPA列の後に追加
  // 週次の列位置を特定するため、ヘッダー行を読む
  const weeklyHeaderRow = 13;
  const weeklyHeaders = sheet.getRange(weeklyHeaderRow, 1, 1, 20).getValues()[0];

  // CPA列の位置を探す
  let cpaCol = -1;
  for (let i = 0; i < weeklyHeaders.length; i++) {
    if (weeklyHeaders[i] === "CPA") {
      cpaCol = i + 1; // 1-based
      break;
    }
  }

  if (cpaCol === -1) {
    Logger.log("週次サマリーのCPA列が見つかりません。最終列の後に追加します。");
    cpaCol = weeklyHeaders.filter(h => h !== "").length;
  }

  const newCol1 = cpaCol + 1; // 面談終了数
  const newCol2 = cpaCol + 2; // 面談実施率
  const newCol3 = cpaCol + 3; // 面談キャンセル数
  const newCol4 = cpaCol + 4; // 成約金額
  const newCol5 = cpaCol + 5; // ROAS

  // 週次ヘッダー
  sheet.getRange(weeklyHeaderRow, newCol1).setValue("面談終了数");
  sheet.getRange(weeklyHeaderRow, newCol2).setValue("面談実施率");
  sheet.getRange(weeklyHeaderRow, newCol3).setValue("面談キャンセル数");
  sheet.getRange(weeklyHeaderRow, newCol4).setValue("成約金額");
  sheet.getRange(weeklyHeaderRow, newCol5).setValue("ROAS");

  const weeklyHeaderRange = sheet.getRange(weeklyHeaderRow, newCol1, 1, 5);
  weeklyHeaderRange.setFontWeight("bold");
  weeklyHeaderRange.setBackground("#4472C4");
  weeklyHeaderRange.setFontColor("#FFFFFF");
  weeklyHeaderRange.setHorizontalAlignment("center");

  // 週次データ行（Row 14以降）
  const lastWeeklyRow = sheet.getLastRow();

  // 開始日・終了日の列を特定
  let startDateCol = -1;
  let endDateCol = -1;
  for (let i = 0; i < weeklyHeaders.length; i++) {
    if (weeklyHeaders[i] === "開始日") startDateCol = i + 1;
    if (weeklyHeaders[i] === "終了日") endDateCol = i + 1;
  }

  // 個別相談数の列を特定
  let weeklyConsultCol = -1;
  for (let i = 0; i < weeklyHeaders.length; i++) {
    if (weeklyHeaders[i] === "個別相談数") {
      weeklyConsultCol = i + 1;
      break;
    }
  }

  // 広告費の列を特定
  let weeklyAdCostCol = -1;
  for (let i = 0; i < weeklyHeaders.length; i++) {
    if (weeklyHeaders[i] === "広告費") {
      weeklyAdCostCol = i + 1;
      break;
    }
  }

  if (startDateCol > 0 && endDateCol > 0) {
    for (let row = weeklyHeaderRow + 1; row <= lastWeeklyRow; row++) {
      const startCell = sheet.getRange(row, startDateCol).getA1Notation();
      const endCell = sheet.getRange(row, endDateCol).getA1Notation();

      // 面談終了数
      sheet.getRange(row, newCol1).setFormula(
        '=IFERROR(COUNTIFS(UTAGE_生データ!A:A,">="&' + startCell + ',UTAGE_生データ!A:A,"<="&' + endCell + '+1,UTAGE_生データ!I:I,TRUE),0)'
      );

      // 面談実施率
      if (weeklyConsultCol > 0) {
        const consultCell = sheet.getRange(row, weeklyConsultCol).getA1Notation();
        sheet.getRange(row, newCol2).setFormula(
          '=IFERROR(' + sheet.getRange(row, newCol1).getA1Notation() + '/' + consultCell + ',"")'
        );
      }

      // 面談キャンセル数
      sheet.getRange(row, newCol3).setFormula(
        '=IFERROR(COUNTIFS(UTAGE_生データ!A:A,">="&' + startCell + ',UTAGE_生データ!A:A,"<="&' + endCell + '+1,UTAGE_生データ!K:K,TRUE),0)'
      );

      // 成約金額
      sheet.getRange(row, newCol4).setFormula(
        '=IFERROR(SUMIFS(UTAGE_生データ!L:L,UTAGE_生データ!A:A,">="&' + startCell + ',UTAGE_生データ!A:A,"<="&' + endCell + '+1),0)'
      );

      // ROAS
      if (weeklyAdCostCol > 0) {
        const adCostCell = sheet.getRange(row, weeklyAdCostCol).getA1Notation();
        sheet.getRange(row, newCol5).setFormula(
          '=IFERROR(' + sheet.getRange(row, newCol4).getA1Notation() + '/' + adCostCell + ',"")'
        );
      }
    }

    // 書式設定
    const dataRows = lastWeeklyRow - weeklyHeaderRow;
    if (dataRows > 0) {
      sheet.getRange(weeklyHeaderRow + 1, newCol2, dataRows).setNumberFormat("0.00%");
      sheet.getRange(weeklyHeaderRow + 1, newCol4, dataRows).setNumberFormat("#,##0");
      sheet.getRange(weeklyHeaderRow + 1, newCol5, dataRows).setNumberFormat("0.00%");
    }
  }

  Logger.log("KPIダッシュボード更新完了");
}

// ============================================================
// 3. 改善診断レポート — ファネルに面談終了追加、診断項目追加
// ============================================================
function updateDiagnosticReport(ss) {
  const sheet = ss.getSheetByName("改善診断レポート");
  if (!sheet) { Logger.log("改善診断レポートが見つかりません"); return; }

  // --- 最終更新日を更新 ---
  sheet.getRange("B2").setValue(new Date());
  sheet.getRange("B2").setNumberFormat("yyyy/MM/dd HH:mm");

  // --- 診断項目セクション ---
  // 現在: Row 5-10 (CTR, LINE追加率, 説明会参加率, 個別相談率, 成約率, CPA)
  // Row 10の後に面談実施率とROASを追加

  // まず既存の行10の下に2行挿入
  sheet.insertRowsAfter(10, 2);

  // Row 11: 面談実施率
  sheet.getRange("A11").setValue("面談実施率");
  sheet.getRange("B11").setValue(0.80);
  sheet.getRange("B11").setNumberFormat("0%");
  sheet.getRange("C11").setFormula('=KPIダッシュボード!Q3');
  sheet.getRange("C11").setNumberFormat("0.00%");
  sheet.getRange("D11").setFormula(
    '=IF(C11="","",IF(C11>=B11,"良好","要改善"))'
  );
  sheet.getRange("E11").setFormula(
    '=IF(D11="要改善","面談キャンセル率が高い可能性があります。リマインド配信の強化、面談日程の柔軟化を検討してください。","")'
  );

  // Row 12: ROAS
  sheet.getRange("A12").setValue("ROAS（広告費用対効果）");
  sheet.getRange("B12").setValue(3.0);
  sheet.getRange("B12").setNumberFormat("0%");
  sheet.getRange("C12").setFormula('=KPIダッシュボード!S3');
  sheet.getRange("C12").setNumberFormat("0.00%");
  sheet.getRange("D12").setFormula(
    '=IF(C12="","",IF(C12>=B12,"良好","要改善"))'
  );
  sheet.getRange("E12").setFormula(
    '=IF(D12="要改善","成約単価を上げるか、広告費を最適化してください。高単価商品の訴求強化やアップセル施策を検討してください。","")'
  );

  // 条件付き書式（良好=緑、要改善=赤）
  var ruleGood = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("良好")
    .setBackground("#C6EFCE")
    .setFontColor("#006100")
    .setRanges([sheet.getRange("D11:D12")])
    .build();
  var ruleBad = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("要改善")
    .setBackground("#FFC7CE")
    .setFontColor("#9C0006")
    .setRanges([sheet.getRange("D11:D12")])
    .build();
  var rules = sheet.getConditionalFormatRules();
  rules.push(ruleGood, ruleBad);
  sheet.setConditionalFormatRules(rules);

  // --- ファネル分析セクション ---
  // 行が挿入されたので、ファネル分析の位置が2行下がっている
  // 元: Row 13-20 → 新: Row 15-22
  // ファネル分析のヘッダーを探す
  let funnelHeaderRow = -1;
  const dataRange = sheet.getRange("A1:A30").getValues();
  for (let i = 0; i < dataRange.length; i++) {
    if (String(dataRange[i][0]).indexOf("ファネル分析") !== -1) {
      funnelHeaderRow = i + 1; // 1-based
      break;
    }
  }

  if (funnelHeaderRow === -1) {
    Logger.log("ファネル分析セクションが見つかりません");
    return;
  }

  // ファネルの「成約」行を探す
  let seiyakuRow = -1;
  for (let i = funnelHeaderRow; i < dataRange.length; i++) {
    if (String(dataRange[i][0]).trim() === "成約") {
      seiyakuRow = i + 1;
      break;
    }
  }

  if (seiyakuRow === -1) {
    Logger.log("ファネルの成約行が見つかりません");
    return;
  }

  // 「個別相談」と「成約」の間に「面談終了」行を挿入
  sheet.insertRowAfter(seiyakuRow - 1);
  const newFunnelRow = seiyakuRow; // 面談終了行
  const newSeiyakuRow = seiyakuRow + 1; // 成約行が1つ下がる

  // 面談終了データ
  sheet.getRange("A" + newFunnelRow).setValue("面談終了");
  sheet.getRange("B" + newFunnelRow).setFormula('=SUM(日次集計!P:P)');

  // 個別相談の行を探す
  let consultRow = -1;
  const updatedData = sheet.getRange("A1:A30").getValues();
  for (let i = funnelHeaderRow; i < updatedData.length; i++) {
    if (String(updatedData[i][0]).trim() === "個別相談") {
      consultRow = i + 1;
      break;
    }
  }

  // 転換率 = 面談終了数 / 個別相談数
  if (consultRow > 0) {
    sheet.getRange("C" + newFunnelRow).setFormula(
      '=IFERROR(B' + newFunnelRow + '/B' + consultRow + ',"")'
    );
  }

  // 離脱率 = 1 - 転換率
  sheet.getRange("D" + newFunnelRow).setFormula(
    '=IFERROR(1-C' + newFunnelRow + ',"")'
  );

  // 書式
  sheet.getRange("B" + newFunnelRow).setNumberFormat("#,##0");
  sheet.getRange("C" + newFunnelRow).setNumberFormat("0.00%");
  sheet.getRange("D" + newFunnelRow).setNumberFormat("0.00%");

  // 成約行の転換率を面談終了ベースに更新
  sheet.getRange("C" + newSeiyakuRow).setFormula(
    '=IFERROR(B' + newSeiyakuRow + '/B' + newFunnelRow + ',"")'
  );
  sheet.getRange("D" + newSeiyakuRow).setFormula(
    '=IFERROR(1-C' + newSeiyakuRow + ',"")'
  );

  // --- ファネルの後に成約金額サマリーを追加 ---
  // 成約行の2行下に追加
  const summaryRow = newSeiyakuRow + 2;
  sheet.getRange("A" + summaryRow).setValue("【収益サマリー】").setFontWeight("bold");
  sheet.getRange("A" + summaryRow + ":E" + summaryRow).setBackground("#4472C4");
  sheet.getRange("A" + summaryRow).setFontColor("#FFFFFF");

  const detailRow1 = summaryRow + 1;
  sheet.getRange("A" + detailRow1).setValue("総成約金額");
  sheet.getRange("B" + detailRow1).setFormula('=KPIダッシュボード!R3');
  sheet.getRange("B" + detailRow1).setNumberFormat("¥#,##0");

  const detailRow2 = summaryRow + 2;
  sheet.getRange("A" + detailRow2).setValue("総広告費");
  sheet.getRange("B" + detailRow2).setFormula('=KPIダッシュボード!B3');
  sheet.getRange("B" + detailRow2).setNumberFormat("¥#,##0");

  const detailRow3 = summaryRow + 3;
  sheet.getRange("A" + detailRow3).setValue("ROAS");
  sheet.getRange("B" + detailRow3).setFormula('=IFERROR(B' + detailRow1 + '/B' + detailRow2 + ',"")');
  sheet.getRange("B" + detailRow3).setNumberFormat("0.00%");
  sheet.getRange("A" + detailRow3 + ":B" + detailRow3).setFontWeight("bold");

  const detailRow4 = summaryRow + 4;
  sheet.getRange("A" + detailRow4).setValue("成約単価（平均）");
  sheet.getRange("B" + detailRow4).setFormula('=IFERROR(B' + detailRow1 + '/KPIダッシュボード!M3,"")');
  sheet.getRange("B" + detailRow4).setNumberFormat("¥#,##0");

  Logger.log("改善診断レポート更新完了");
}
