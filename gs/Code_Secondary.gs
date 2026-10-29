// Google Apps Script for: درجات ثانوي
const EXPECTED_TABS = ["أولى ثانوي", "تانية ثانوي", "تالتة ثانوي"];

function doGet(e) {
  const action = String((e.parameter.action || "record")).trim().toLowerCase();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (action === "levels") return jsonResponse({ levels: EXPECTED_TABS });

  const level = String((e.parameter.level || "")).trim();
  const code = String((e.parameter.code || "")).trim();
  if (!level || !code) return jsonResponse({ found: false, error: "المرحلة والكود مطلوبان." });
  if (!EXPECTED_TABS.includes(level)) return jsonResponse({ found: false, error: "اسم التبويب غير صحيح." });

  return findStudent(spreadsheet.getSheetByName(level), code, level);
}

function findStudent(sheet, code, level) {
  if (!sheet) return jsonResponse({ found: false, error: `لم يتم العثور على تبويب: ${level}` });
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return jsonResponse({ found: false, error: "لا توجد بيانات طلاب في هذا التبويب." });

  const headers = values[0].map(String);
  const codeIndex = headers.findIndex((name) => name.trim().toLowerCase() === "code");
  if (codeIndex === -1) return jsonResponse({ found: false, error: "يجب وجود عمود Code." });

  const match = values.slice(1).find((row) => String(row[codeIndex]).trim() === code);
  if (!match) return jsonResponse({ found: false });

  const fields = headers.slice(0, 2).map((header, index) => ({ label: header, value: match[index] }));
  const counters = {};
  headers.slice(2).forEach((header, offset) => {
    const parsed = String(header).trim().match(/^(sheet|exam)\s*=\s*(\d+(?:\.\d+)?)$/i);
    const type = parsed ? parsed[1].toLowerCase() : "sheet";
    const total = parsed ? parsed[2] : String(header).trim();
    counters[type] = (counters[type] || 0) + 1;
    fields.push({ label: `${type === "exam" ? "Exam" : "Sheet"} ${counters[type]}`, value: `${match[offset + 2]}/${total}` });
  });

  return jsonResponse({ found: true, fields });
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
