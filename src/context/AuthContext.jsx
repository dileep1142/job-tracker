
import {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext =
  createContext();

function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  /* LOAD USER */

  useEffect(() => {

    const storedUser =
      JSON.parse(
        localStorage.getItem(
          "currentUser"
        )
      );

    if (storedUser) {

      setUser(storedUser);
    }

  }, []);

  /* REGISTER */

  const register = (
    name,
    email,
    password
  ) => {

    const users =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || [];

    const alreadyExists =
      users.find(
        (u) =>
          u.email === email
      );

    if (alreadyExists) {

      return {
        success: false,
        message:
          "User already exists"
      };
    }

    const newUser = {

      name,
      email,
      password
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    return {
      success: true
    };
  };

  /* LOGIN */

  const login = (
    email,
    password
  ) => {

    const users =
      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || [];

    const matchedUser =
      users.find(
        (u) =>

          u.email === email
          &&
          u.password === password
      );

    if (!matchedUser) {

      return {
        success: false,
        message:
          "Invalid credentials"
      };
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(
        matchedUser
      )
    );

    setUser(matchedUser);

    return {
      success: true
    };
  };

  /* LOGOUT */

  const logout = () => {

    localStorage.removeItem(
      "currentUser"
    );

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{

        user,

        register,

        login,

        logout

      }}
    >

      {children}

    </AuthContext.Provider>

  );
}

export default AuthProvider;
