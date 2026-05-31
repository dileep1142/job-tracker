
import {
  useEffect,
  useState,
  useRef
} from "react";

import {
  useNavigate
} from "react-router-dom";

import "./Navbar.css";

function Navbar({
  setSidebarOpen
}) {

  const [theme, setTheme] =
    useState("light");

  const [search, setSearch] =
    useState("");

  const [
    showNotifications,
    setShowNotifications
  ] = useState(false);

  const [
    notifications,
    setNotifications
  ] = useState([]);

  const notificationRef =
    useRef();

  const navigate =
    useNavigate();

  /* CURRENT USER */

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  const userInitial =
    currentUser?.name
      ?.charAt(0)
      ?.toUpperCase() || "U";

  /* LOAD THEME */

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme) {

      setTheme(savedTheme);

      document.documentElement
        .setAttribute(
          "data-theme",
          savedTheme
        );
    }

  }, []);

  /* LOAD NOTIFICATIONS */

  useEffect(() => {

    const savedNotifications =
      JSON.parse(
        localStorage.getItem(
          "notifications"
        )
      ) || [];

    setNotifications(
      savedNotifications
    );

  }, []);

  /* UPDATE THEME */

  useEffect(() => {

    document.documentElement
      .setAttribute(
        "data-theme",
        theme
      );

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  /* OUTSIDE CLICK */

  useEffect(() => {

    function handleClickOutside(e) {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          e.target
        )
      ) {

        setShowNotifications(
          false
        );
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  /* TOGGLE THEME */

  const toggleTheme = () => {

    setTheme((prev) =>

      prev === "light"
        ? "dark"
        : "light"

    );
  };

  /* SEARCH */

  const handleSearch = (e) => {

    const value =
      e.target.value;

    setSearch(value);

    navigate(
      `/app/applications?search=${value}`
    );
  };

  /* LOGOUT */

  const handleLogout = () => {

    /* REMOVE SESSION */

    localStorage.removeItem(
      "loggedIn"
    );

    localStorage.removeItem(
      "currentUser"
    );

    /* REDIRECT */

    navigate("/");
  };

  /* MARK AS READ */

  const markAsRead = () => {

    const updated =
      notifications.map(
        (item) => ({
          ...item,
          read: true
        })
      );

    setNotifications(updated);

    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );
  };

  /* UNREAD COUNT */

  const unreadCount =
    notifications.filter(
      (item) => !item.read
    ).length;

  return (

    <div className="navbar">

      {/* LEFT */}

      <div className="nav-left">

        <button
          className="menu-btn"
          onClick={() =>
            setSidebarOpen(true)
          }
        >
          ☰
        </button>

        <div className="search-box">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={handleSearch}
          />

        </div>

      </div>

      {/* RIGHT */}

      <div className="nav-right">

        {/* THEME */}

        <button
          className="icon-btn"
          onClick={toggleTheme}
        >

          {
            theme === "light"
              ? "🌙"
              : "☀️"
          }

        </button>

        {/* NOTIFICATIONS */}

        <div
          className="notification-wrapper"
          ref={notificationRef}
        >

          <button
            className="icon-btn notification-btn"
            onClick={() => {

              setShowNotifications(
                !showNotifications
              );

              markAsRead();
            }}
          >

            🔔

            {

              unreadCount > 0 && (

                <span className="notification-badge">

                  {unreadCount}

                </span>

              )

            }

          </button>

          {

            showNotifications && (

              <div className="notification-dropdown">

                <div className="notification-header">

                  <h4>
                    Notifications
                  </h4>

                </div>

                {

                  notifications.length === 0 ? (

                    <div className="empty-notification">

                      No notifications yet

                    </div>

                  ) : (

                    notifications
                      .slice()
                      .reverse()
                      .map(
                        (
                          item,
                          index
                        ) => (

                        <div
                          key={index}
                          className={`notification-item ${
                            item.read
                              ? "read"
                              : "unread"
                          }`}
                        >

                          <p>
                            {item.message}
                          </p>

                          <span>
                            {item.time}
                          </span>

                        </div>

                      ))

                  )

                }

              </div>

            )

          }

        </div>

        {/* ADD JOB */}

        <button
          className="add-btn"
          onClick={() =>
            navigate("/app/add-job")
          }
        >

          + Add Job

        </button>

        {/* PROFILE */}

        <div
          className="avatar"
          onClick={() =>
            navigate("/app/profile")
          }
        >

          {userInitial}

        </div>

        {/* LOGOUT */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          Logout

        </button>

      </div>

    </div>
  );
}

export default Navbar;
