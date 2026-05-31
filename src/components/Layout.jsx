import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout({
  sidebarOpen,
  setSidebarOpen
}) {

  return (

    <div className="layout">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="main-content">

        <Navbar
          setSidebarOpen={setSidebarOpen}
        />

        <div className="page-content">

          <Outlet />

        </div>

      </div>

    </div>
  );
}

export default Layout;