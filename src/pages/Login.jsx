import "./Login.css";
import { useState, useEffect } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  /* AUTO LOGIN CHECK */
  useEffect(() => {
    const loggedIn =
      localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
      navigate("/app/dashboard");
    }
  }, [navigate]);

  /* LOGIN FUNCTION */
  const handleLogin = () => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    /* EMPTY FIELDS */
    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please fill all fields"
      );
      return;
    }

    /* LOGIN SUCCESS */
    if (
      storedUser &&
      email === storedUser.email &&
      password ===
        storedUser.password
    ) {
      localStorage.setItem(
        "loggedIn",
        "true"
      );

      setError("");

      alert("Login Successful");

      navigate("/app/dashboard");
    }

    /* INVALID */
    else {
      setError(
        "Invalid Credentials"
      );
    }
  };

  /* ENTER KEY */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1 className="login-heading">
          Welcome Back
        </h1>

        <p className="login-subtext">
          Login to manage your jobs
        </p>

        {/* ERROR */}
        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <input
          className="login-input"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
        />

        {/* PASSWORD */}
        <input
          className="login-input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
        />

        {/* BUTTON */}
        <button
          className="login-btn"
          onClick={
            handleLogin
          }
        >
          Login
        </button>

        {/* REGISTER */}
        <p className="login-text">
          Don’t have account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;