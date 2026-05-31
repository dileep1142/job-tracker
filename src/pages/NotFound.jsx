import "./NotFound.css";

import {
  useNavigate
} from "react-router-dom";

function NotFound() {

  const navigate =
    useNavigate();

  return (

    <div className="notfound">

      <h1>
        404
      </h1>

      <p>
        Page not found
      </p>

      <button
        onClick={() =>
          navigate("/")
        }
      >

        Go Home

      </button>

    </div>
  );
}

export default NotFound;