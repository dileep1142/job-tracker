
import "./Register.css";

import {
  useState,
  useContext
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  toast
} from "react-toastify";

import {
  AuthContext
} from "../context/AuthContext";

function Register() {

  const navigate =
    useNavigate();

  /* CONTEXT */

  const {
    register
  } = useContext(
    AuthContext
  );

  /* STATES */

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");

  const [error, setError] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  /* REGISTER */

  const handleRegister = () => {

    /* EMPTY */

    if (
      !name.trim()
      ||
      !email.trim()
      ||
      !password.trim()
      ||
      !confirmPassword.trim()
    ) {

      setError(
        "Please fill all fields"
      );

      return;
    }

    /* EMAIL */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
    ) {

      setError(
        "Enter valid email"
      );

      return;
    }

    /* PASSWORD */

    if (
      password.length < 6
    ) {

      setError(
        "Password must be at least 6 characters"
      );

      return;
    }

    /* MATCH */

    if (
      password !==
      confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;
    }

    setError("");

    setLoading(true);

    /* REGISTER */

    const result =
      register(
        name,
        email,
        password
      );

    /* SUCCESS */

    if (result.success) {

      toast.success(
        "Account Created Successfully"
      );

      setTimeout(() => {

        setLoading(false);

        navigate("/");

      }, 1200);
    }

    /* FAILED */

    else {

      setLoading(false);

      setError(
        result.message
      );
    }
  };

  /* ENTER */

  const handleKeyDown = (
    e
  ) => {

    if (
      e.key === "Enter"
    ) {

      handleRegister();
    }
  };

  return (

    <div className="register-container">

      <div className="register-box">

        {/* TOP */}

        <div className="register-top">

          <h1 className="register-heading">
            Create Account
          </h1>

          <p className="register-subtext">

            Build your career journey
            and track job applications

          </p>

        </div>

        {/* ERROR */}

        {

          error && (

            <p className="register-error">

              {error}

            </p>

          )

        }

        {/* NAME */}

        <input
          className="register-input"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
        />

        {/* EMAIL */}

        <input
          className="register-input"
          type="email"
          placeholder="Email Address"
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
          className="register-input"
          type="password"
          placeholder="Password"
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

        {/* CONFIRM */}

        <input
          className="register-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
        />

        {/* BUTTON */}

        <button
          className="register-btn"
          onClick={
            handleRegister
          }
          disabled={loading}
        >

          {
            loading
              ? "Creating..."
              : "Create Account"
          }

        </button>

        {/* LOGIN */}

        <p className="register-text">

          Already have an account?

          {" "}

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;
