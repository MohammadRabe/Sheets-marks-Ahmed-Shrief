import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { STAGES } from "../config.js";
import Portrait from "../components/Portrait.jsx";
import Results from "../components/Results.jsx";
import Status from "../components/Status.jsx";
import { normalizeRecord } from "../utils/grades.js";
import Spin from "antd/es/spin";

export default function LookupPage() {
  const { stageKey } = useParams();
  const navigate = useNavigate();
  const stage = STAGES[stageKey];
  const levels = stage?.levels || [];
  const [level, setLevel] = useState("");
  const [code, setCode] = useState("");
  const [fields, setFields] = useState([]);
  const [status, setStatus] = useState({ message: "", kind: "" });
  const [isSearching, setIsSearching] = useState(false);
  const [errorPulse, setErrorPulse] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [hasError, setHasError] = useState(false);

  function getAttemptMessage(attempt) {
    if (attempt >= 5) return "بص في ازرق كمان";
    if (attempt === 4) return "انا قولتلك ايه";
    if (attempt === 3) return "ملكش دعوة بدرجة حد";
    return "الكود غير صحيح";
  }

  function showError(message) {
    const nextAttempt = failedAttempts + 1;
    if (nextAttempt >= 6) {
      navigate("/quran", { replace: true });
      return;
    }

    setFailedAttempts(nextAttempt);
    setHasError(true);
    setErrorPulse((current) => current + 1);
    setStatus({ message, kind: "error" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!level || !code.trim()) {
      setFields([]);
      showError("يرجى اختيار المرحلة وإدخال كود الطالب.");
      return;
    }

    setFields([]);
    setIsSearching(true);
    setStatus({ message: "جارٍ البحث عن بيانات الطالب...", kind: "" });

    try {
      const response = await fetch(`${stage.apiUrl}?level=${encodeURIComponent(level)}&code=${encodeURIComponent(code.trim())}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data || data.found === false) {
        showError("لم يتم العثور على بيانات مطابقة لهذا الطالب.");
        return;
      }

      setFields(normalizeRecord(data));
      setFailedAttempts(0);
      setHasError(false);
      setStatus({ message: "تم تحميل بيانات الطالب بنجاح.", kind: "success" });
    } catch (error) {
      setFields([]);
      showError(`تعذر تحميل البيانات: ${error.message}`);
    } finally {
      setIsSearching(false);
    }
  }

  if (!stage) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <main className="card lookup-card">
        <section className="hero">
          <Portrait key={errorPulse} className="hero-portrait" danger={hasError || status.kind === "error"} furious={failedAttempts === 5} />
          <p className="teacher-name">مستر أحمد شريف</p>
          <button className="back-button" type="button" onClick={() => navigate("/")}>العودة إلى المراحل</button>
          <h1>الاستعلام عن بيانات الطالب</h1>
          <p className="lookup-hint">مرحلة <strong className="stage-name">{stage.name}</strong> · اختر المستوى ثم أدخل كود الطالب.</p>
        </section>

        <section className="content">
          <form onSubmit={handleSubmit}>
            <div className="grid">
              <label>
                المرحلة الدراسية
                <select value={level} onChange={(event) => setLevel(event.target.value)} required>
                  <option value="">اختر المرحلة</option>
                  {levels.map((item) => <option value={item} key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                كود الطالب
                <input value={code} onChange={(event) => setCode(event.target.value)} type="text" inputMode="text" autoComplete="off" placeholder="أدخل كود الطالب" required />
              </label>
            </div>
            <div className="actions">
              <button className="loading-button" type="submit" disabled={isSearching} aria-live="polite">
                {isSearching && <Spin size="small" />}
                <span>{isSearching ? "جاري تحميل الدرجات" : "عرض البيانات"}</span>
              </button>
            </div>
          </form>
          <Status message={status.message} kind={status.kind} />
          {fields.length > 0 && <Results fields={fields} />}
        </section>
      </main>

      {status.kind === "error" && (
        <div key={errorPulse} className="error-pharaoh-stage" role="alert" aria-live="assertive">
          <div className="error-pharaoh-content">
            <Portrait className="hero-portrait error-pharaoh-portrait" danger furious={failedAttempts === 5} />
            <p className="error-pharaoh-message">
              {getAttemptMessage(failedAttempts)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
