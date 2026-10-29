import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PharaohMark from "./components/PharaohMark.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import LookupPage from "./pages/LookupPage.jsx";
import QuranPage from "./pages/QuranPage.jsx";
import SchedulesPage from "./pages/SchedulesPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <PharaohMark />
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/schedules" element={<SchedulesPage />} />
            <Route path="/quran" element={<QuranPage />} />
            <Route path="/:stageKey" element={<LookupPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
