
import {
  Navigate
} from "react-router-dom";

function ProtectedRoute({
  children
}) {

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  /* NOT LOGGED IN */

  if (!currentUser) {

    return (
      <Navigate to="/" />
    );
  }

  /* ALLOWED */

  return children;
}

export default ProtectedRoute;

