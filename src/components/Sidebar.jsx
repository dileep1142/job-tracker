import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">
        JobTracker
      </h2>

      <nav className="nav">

        <NavLink
          to="/app/dashboard"
          className="nav-item"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/app/applications"
          className="nav-item"
        >
          Applications
        </NavLink>

        <NavLink
          to="/app/add-job"
          className="nav-item"
        >
          Add Job
        </NavLink>

        <NavLink
          to="/app/analytics"
          className="nav-item"
        >
          Analytics
        </NavLink>

        <NavLink
          to="/app/profile"
          className="nav-item"
        >
          Profile
        </NavLink>

      </nav>

    </div>
  );
}

export default Sidebar;