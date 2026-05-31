import {
  createContext,
  useState,
  useEffect
} from "react";

export const NotificationContext =
  createContext();

function NotificationProvider({
  children
}) {

  const [
    notifications,
    setNotifications
  ] = useState([]);

  /* LOAD */

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "notifications"
        )
      ) || [];

    setNotifications(saved);

  }, []);

  /* SAVE */

  useEffect(() => {

    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );

  }, [notifications]);

  /* ADD */

  const addNotification = (
    message
  ) => {

    const newNotification = {

      message,

      time:
        new Date()
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),

      read: false,
    };

    setNotifications((prev) => [

      ...prev,

      newNotification

    ]);
  };

  /* MARK ALL READ */

  const markAllRead = () => {

    const updated =
      notifications.map(
        (item) => ({
          ...item,
          read: true
        })
      );

    setNotifications(updated);
  };

  return (

    <NotificationContext.Provider
      value={{

        notifications,

        addNotification,

        markAllRead

      }}
    >

      {children}

    </NotificationContext.Provider>
  );
}

export default NotificationProvider;