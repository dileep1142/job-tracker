import "./Toast.css";

function Toast({
  message,
  type,
  show
}) {

  return (

    <div
      className={`toast ${show ? "show" : ""} ${type}`}
    >

      {message}

    </div>
  );
}

export default Toast;