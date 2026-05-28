import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div style={{ flex: 1 }}>

        <Navbar />

        {/* PAGE CONTENT */}
        <Outlet />

      </div>

    </div>
  );
}

export default Layout;