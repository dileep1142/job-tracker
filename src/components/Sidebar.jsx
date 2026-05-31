import "./Sidebar.css";

import {
  NavLink,
  useLocation
} from "react-router-dom";

import { useEffect } from "react";

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const location = useLocation();

  // Auto close on mobile route change
  useEffect(() => {

    if (window.innerWidth <= 768) {

      setSidebarOpen(false);
    }

  }, [location.pathname]);

  return (
    

    <div
      className={`sidebar ${
        sidebarOpen ? "show-sidebar" : ""
      }`}
    >

      <h1 className="logo">
        JobTrack
      </h1>

        <nav className="nav">

  <NavLink
    to="/app/dashboard"
    className={({ isActive }) =>
      isActive
        ? "nav-item active"
        : "nav-item"
    }
  >
    Dashboard
  </NavLink>

  <NavLink
    to="/app/applications"
    className={({ isActive }) =>
      isActive
        ? "nav-item active"
        : "nav-item"
    }
  >
    Applications
  </NavLink>

  <NavLink
    to="/app/add-job"
    className={({ isActive }) =>
      isActive
        ? "nav-item active"
        : "nav-item"
    }
  >
    Add Job
  </NavLink>

  <NavLink
    to="/app/analytics"
    className={({ isActive }) =>
      isActive
        ? "nav-item active"
        : "nav-item"
    }
  >
    Analytics
  </NavLink>

  <NavLink
    to="/app/kanban"
    className={({ isActive }) =>
      isActive
        ? "nav-item active"
        : "nav-item"
    }
  >
    Kanban Board
  </NavLink>

  <NavLink
    to="/app/profile"
    className={({ isActive }) =>
      isActive
        ? "nav-item active"
        : "nav-item"
    }
  >
    Profile
  </NavLink>

</nav>

    </div>
  );
}

export default Sidebar;