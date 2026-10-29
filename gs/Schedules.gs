function doGet(e) {
  var tabName = (e && e.parameter && (e.parameter.level || e.parameter.sheet)) || "";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabName);

  if (!sheet) {
    return json({ found: false, message: "Sheet not found", sheet: tabName, rows: [] });
  }

  var values = sheet.getDataRange().getDisplayValues();
  return json({ found: true, sheet: tabName, rows: values });
}

function json(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
