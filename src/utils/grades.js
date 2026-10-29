export function getGrade(percent) {
  if (percent < 50) return { label: "ضعيف", className: "score-low" };
  if (percent < 65) return { label: "مقبول", className: "score-pass" };
  if (percent < 75) return { label: "جيد", className: "score-good" };
  if (percent < 85) return { label: "جيد جدًا", className: "score-very-good" };
  return { label: "ممتاز", className: "score-excellent" };
}

export function getScore(value) {
  const normalizedValue = String(value ?? "").replace(/,/g, ".");
  const match = normalizedValue.match(/^\s*(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
  if (!match) return null;

  const earned = Number(match[1]);
  const possible = Number(match[2]);
  return { earned, possible, percent: (earned / possible) * 100 };
}

export function normalizeRecord(data) {
  if (Array.isArray(data.fields)) return data.fields;

  const entries = Object.entries(data.record || data);
  const fields = [];
  let sheetNumber = 1;
  let examNumber = 1;

  for (const [key, value] of entries) {
    const header = key.trim();
    const headerMatch = header.match(/^(sheet|exam)\s*=\s*(\d+(?:\.\d+)?)$/i);
    const isMarkColumn = headerMatch || /^\d+(?:\.\d+)?$/.test(header);

    if (isMarkColumn) {
      const type = headerMatch ? headerMatch[1].toLowerCase() : "sheet";
      const maximum = headerMatch ? headerMatch[2] : header;
      const label = type === "exam" ? `Exam ${examNumber++}` : `Sheet ${sheetNumber++}`;
      fields.push({ label, value: `${value}/${maximum}` });
    } else {
      fields.push({ label: key, value });
    }
  }

  return fields;
}
