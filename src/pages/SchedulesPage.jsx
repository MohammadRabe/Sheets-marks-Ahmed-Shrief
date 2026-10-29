import { useState } from "react";
import { SCHEDULES_API_URL } from "../config.js";
import { normalizeScheduleData } from "../utils/schedules.js";
import Spin from "antd/es/spin";

const scheduleSections = [
  { symbol: "𓂀", title: "المرحلة الابتدائية", subtitle: "ابتدائي", tab: "ابتدائي", levels: ["الرابع", "الخامس", "السادس"] },
  { symbol: "𓋹", title: "المرحلة الإعدادية", subtitle: "إعدادي", tab: "إعدادي", levels: ["أولى إعدادي", "تانية إعدادي", "تالتة إعدادي"] },
  { symbol: "𓆣", title: "المرحلة الثانوية", subtitle: "ثانوي", tab: "ثانوي", levels: ["أولى ثانوي", "تانية ثانوي", "تالتة ثانوي"] },
];

export default function SchedulesPage() {
  const [scheduleData, setScheduleData] = useState({});
  const [loadingTab, setLoadingTab] = useState("");
  const [error, setError] = useState("");
  const [openSchedule, setOpenSchedule] = useState("");

  async function handleToggle(section) {
    if (openSchedule === section.tab) {
      setOpenSchedule("");
      return;
    }

    setOpenSchedule(section.tab);
    setError("");
    if (scheduleData[section.tab] || !SCHEDULES_API_URL) return;

    setLoadingTab(section.tab);
    try {
      const url = new URL(SCHEDULES_API_URL);
      url.searchParams.set("level", section.tab);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      setScheduleData((current) => ({
        ...current,
        [section.tab]: normalizeScheduleData(payload, section.levels),
      }));
    } catch (requestError) {
      setError("تعذر تحميل جداول المواعيد حاليًا.");
    } finally {
      setLoadingTab("");
    }
  }

  return (
    <main className="card schedules-card">
      <header className="schedules-heading">
        <p className="kicker">𓋹 تنظيم العام الدراسي 𓋹</p>
        <h1>جداول المواعيد</h1>
        <p>جداول المواعيد مرتبة حسب المرحلة الدراسية.</p>
      </header>

      {error && <p className="schedule-message schedule-message-error">{error}</p>}

      <section className="schedule-grid" aria-label="جداول المراحل الدراسية">
        {scheduleSections.map((section) => {
          const { symbol, title, subtitle, tab, levels } = section;
          const data = scheduleData[tab] || normalizeScheduleData([], levels);
          const tableId = `schedule-table-${tab}`;
          const isOpen = openSchedule === tab;

          return (
          <article className="schedule-section" key={subtitle}>
            <button
              className="schedule-toggle"
              type="button"
              aria-expanded={isOpen}
              aria-controls={tableId}
              onClick={() => handleToggle(section)}
            >
              <span className="schedule-section-heading">
                <span className="schedule-symbol" aria-hidden="true">{symbol}</span>
                <span>
                  <span className="schedule-subtitle">{subtitle}</span>
                  <span className="schedule-title">{title}</span>
                </span>
                <span className={`schedule-chevron${isOpen ? " open" : ""}`} aria-hidden="true">⌄</span>
              </span>
            </button>
            {isOpen && <div className="schedule-table-wrap" id={tableId}>
              {loadingTab === tab ? (
                <div className="schedule-inline-loading" role="status" aria-live="polite">
                  <Spin size="large" />
                  <span>جاري تحميل الجدول</span>
                </div>
              ) : data.rows.length === 0 ? <p className="schedule-empty">لا يوجد موعد مسجل حاليًا.</p> : (
                <table className="schedule-table">
                  <thead>
                    <tr>
                      {data.headers.map((header) => <th scope="col" key={header}>{header}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row, rowIndex) => (
                      <tr key={`${tab}-${rowIndex}`}>
                        {row.map((cell, cellIndex) => cellIndex === 0
                          ? <th scope="row" key={`${tab}-${rowIndex}-${cellIndex}`}>{cell}</th>
                          : <td key={`${tab}-${rowIndex}-${cellIndex}`}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>}
          </article>
          );
        })}
      </section>
    </main>
  );
}
