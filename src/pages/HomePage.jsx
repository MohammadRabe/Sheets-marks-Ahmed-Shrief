import { useNavigate } from "react-router-dom";
import { STAGES } from "../config.js";
import Portrait from "../components/Portrait.jsx";
import StageButton from "../components/StageButton.jsx";

const stageCards = [
  { key: "primary", symbol: "𓂀", subtitle: "المرحلة الأولى" },
  { key: "preparatory", symbol: "𓋹", subtitle: "مرحلة البناء والمعرفة" },
  { key: "secondary", symbol: "𓂀", subtitle: "طريق التميز" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="card chooser">
      <Portrait className="chooser-portrait" />
      <p className="teacher-name">مستر أحمد شريف</p>
      <h1>اختر المرحلة الدراسية</h1>
      <p>ابدأ من بوابة المرحلة للوصول إلى بيانات الطلاب ودرجاتهم.</p>
      <div className="stage-grid">
        {stageCards.map(({ key, symbol, subtitle }) => (
          <StageButton key={key} stageKey={key} symbol={symbol} subtitle={subtitle} onChoose={(stage) => navigate(`/${stage}`)} />
        ))}
      </div>
    </main>
  );
}
