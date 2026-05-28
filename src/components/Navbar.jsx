import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="navbar">

      <div className="nav-left">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search jobs, companies..." />
        </div>
      </div>

      <div className="nav-right">

        {/* THEME */}
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <button className="icon-btn">🔔</button>

        {/* ADD JOB NAVIGATION */}
        <button
          className="add-btn"
          onClick={() => navigate("/add-job")}
        >
          + Add Job
        </button>

        {/* PROFILE */}
        <div className="profile">
          <div
            className="avatar"
            onClick={() => navigate("/profile")}
          >
            D
          </div>
        </div>

      </div>

    </div>
  );
}

export default Navbar;