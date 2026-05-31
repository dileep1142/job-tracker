import "./Sidebar.css";

import {
  Link,
  useLocation
} from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const location = useLocation();

  return (

    <>

      {/* OVERLAY */}

      {
        sidebarOpen && (

          <div
            className="sidebar-overlay"
            onClick={() =>
              setSidebarOpen(false)
            }
          />

        )
      }

      <div
        className={`sidebar ${
          sidebarOpen
            ? "open"
            : ""
        }`}
      >

        {/* CLOSE BTN */}

        <button
          className="close-btn"
          onClick={() =>
            setSidebarOpen(false)
          }
        >
          ✕
        </button>

        <h2 className="logo">
          Job Tracker
        </h2>

        <nav>

          <Link
            to="/app/dashboard"
            className={
              location.pathname.includes("dashboard")
                ? "active"
                : ""
            }
          >
            Dashboard
          </Link>

          <Link
            to="/app/applications"
            className={
              location.pathname.includes("applications")
                ? "active"
                : ""
            }
          >
            Applications
          </Link>

          <Link
            to="/app/analytics"
            className={
              location.pathname.includes("analytics")
                ? "active"
                : ""
            }
          >
            Analytics
          </Link>

          <Link
            to="/app/profile"
            className={
              location.pathname.includes("profile")
                ? "active"
                : ""
            }
          >
            Profile
          </Link>

        </nav>

      </div>

    </>
  );
}

export default Sidebar;