import { useEffect, useRef } from "react";
import { GRADE_LABELS } from "../config.js";
import { getGrade, getScore } from "../utils/grades.js";

export default function Results({ fields }) {
  const resultRef = useRef(null);
  const entries = fields.map(({ label, value }) => [label, value]);
  const studentName = entries.find(([label]) => label.trim().toLowerCase() === "name")?.[1];
  let earned = 0;
  let possible = 0;

  useEffect(() => {
    if (!fields.length) return undefined;
    const timer = setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
    return () => clearTimeout(timer);
  }, [fields]);

  for (const [label, value] of entries) {
    if (!/^(Sheet|Exam) \d+$/.test(label)) continue;
    const score = getScore(value);
    if (score) {
      earned += score.earned;
      possible += score.possible;
    }
  }

  if (possible > 0) {
    const totalPercentage = `${((earned / possible) * 100).toFixed(2)}%`;
    const totalIndex = entries.findIndex(([label]) => label === "Total Percentage");
    if (totalIndex >= 0) {
      entries[totalIndex] = ["Total Percentage", totalPercentage];
    } else {
      entries.push(["Total Percentage", totalPercentage]);
    }
  }

  return (
    <section ref={resultRef} className="result" aria-live="polite">
      <div className="result-heading">
        <div>
          <h2>بيانات الطالب</h2>
          {studentName && <p className="print-student-name">{studentName}</p>}
        </div>
        <button className="print-button" type="button" onClick={() => window.print()}>
          طباعة
        </button>
      </div>
      <div className="fields">
        {entries.map(([key, value], index) => {
          const score = getScore(value);
          const percentageMatch = String(value ?? "").match(/(?:^|\()(\d+(?:\.\d+)?)%/);
          const percent = percentageMatch ? Number(percentageMatch[1]) : score?.percent;
          const grade = percent !== undefined && Number.isFinite(percent) ? getGrade(percent) : null;
          const isTotal = key === "Total Percentage";

          return (
            <div className={`field ${isTotal ? "total-field" : ""} ${isTotal && grade ? `total-grade ${grade.className}` : ""}`.trim()} key={`${key}-${index}`}>
              <strong>{GRADE_LABELS[key] || key}</strong>
              <span className={grade ? `score-badge ${grade.className}` : ""}>
                {isTotal && grade ? `${percent.toFixed(2)}%` : value ?? ""}
                {isTotal && grade && <em className={`grade-indicator ${grade.className}`}>{grade.label}</em>}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
