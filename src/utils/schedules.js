const HEADER_NAMES = new Set(["المستوى", "الصف", "level", "grade"]);

function toRow(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value);
  return [value];
}

export function normalizeScheduleData(payload, fallbackLevels) {
  const explicitHeaders = Array.isArray(payload?.headers) ? payload.headers : null;
  const rawRows = Array.isArray(payload) ? payload : payload?.rows || payload?.values || payload?.data || [];
  const rows = rawRows.map(toRow).filter((row) => row.some((cell) => String(cell ?? "").trim()));
  const hasHeaderRow = !explicitHeaders && rows.length > 0 && HEADER_NAMES.has(String(rows[0][0] ?? "").trim().toLowerCase());
  const headers = explicitHeaders || (hasHeaderRow ? rows.shift() : null);
  const columnCount = Math.max(headers?.length || 0, ...rows.map((row) => row.length), 1);
  const normalizedHeaders = Array.from({ length: columnCount }, (_, index) => {
    if (headers?.[index]) return String(headers[index]);
    return index === 0 ? "المستوى" : `الموعد ${index}`;
  });
  const normalizedRows = rows.filter((row) => {
    const hasLevel = String(row[0] ?? "").trim();
    const hasTimeSlot = row.length > 1 && row.slice(1).some((cell) => String(cell ?? "").trim());
    return hasLevel && hasTimeSlot;
  });

  return {
    headers: normalizedHeaders,
    rows: normalizedRows.map((row) => Array.from({ length: columnCount }, (_, index) => row[index] ?? "")),
  };
}
