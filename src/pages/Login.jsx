
import "./Login.css";

import {
  useState,
  useEffect,
  useContext
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  toast
} from "react-toastify";

import {
  AuthContext
} from "../context/AuthContext";

function Login() {

  const navigate =
    useNavigate();

  /* CONTEXT */

  const {
    login,
    user
  } = useContext(
    AuthContext
  );

  /* STATES */

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const [error, setError] =
    useState("");

  /* AUTO LOGIN */

  useEffect(() => {

    if (user) {

      navigate(
        "/app/dashboard"
      );
    }

  }, [user, navigate]);

  /* LOGIN */

  const handleLogin = () => {

    /* EMPTY */

    if (
      !email.trim()
      ||
      !password.trim()
    ) {

      setError(
        "Please fill all fields"
      );

      return;
    }

    /* LOGIN */

    const result =
      login(
        email,
        password
      );

    /* SUCCESS */

    if (result.success) {

      setError("");

      toast.success(
        "Login Successful"
      );

      navigate(
        "/app/dashboard"
      );
    }

    /* FAILED */

    else {

      setError(
        result.message
      );
    }
  };

  /* ENTER */

  const handleKeyDown = (
    e
  ) => {

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

        {

          error && (

            <p className="login-error">

              {error}

            </p>

          )

        }

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

