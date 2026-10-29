import { Link } from "react-router-dom";

export default function QuranPage() {
  return (
    <main className="card quran-card">
      <h1>بسم الله الرحمن الرحيم</h1>
      <p className="quran-verse" lang="ar">
        ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ ۖ وَلَا تَجَسَّسُوا وَلَا يَغْتَبْ بَعْضُكُم بَعْضًا﴾
      </p>
      <p className="quran-reference" lang="ar">[سورة الحجرات: 12]</p>
      <p className="quran-note">صدق الله العظيم</p>
      <Link className="back-button quran-back" to="/">العودة إلى الصفحة الرئيسية</Link>
    </main>
  );
}
