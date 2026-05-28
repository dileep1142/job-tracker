import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleRegister = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please fill all fields"
      );
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setError("");

    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="register-container">

      <div className="register-box">

        <h1 className="register-heading">
          Create Account
        </h1>

        <p className="register-subtext">
          Start tracking your job applications
        </p>

        {error && (
          <p className="register-error">
            {error}
          </p>
        )}

        <input
          className="register-input"
          type="text"
          placeholder="Enter name"
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

        <input
          className="register-input"
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

        <input
          className="register-input"
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

        <button
          className="register-btn"
          onClick={
            handleRegister
          }
        >
          Register
        </button>

        <p className="register-text">
          Already have account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;