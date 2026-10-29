import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="التنقل الرئيسي">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          الصفحة الرئيسية
        </NavLink>
        <NavLink
          to="/schedules"
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          جداول المواعيد
        </NavLink>
      </nav>
    </header>
  );
}
