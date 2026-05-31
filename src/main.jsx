
import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

/* CONTEXTS */

import AuthProvider from "./context/AuthContext";

import JobProvider from "./context/JobContext";

import NotificationProvider from "./context/NotificationContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <AuthProvider>

      <JobProvider>

        <NotificationProvider>

          <App />

          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />

        </NotificationProvider>

      </JobProvider>

    </AuthProvider>

  </React.StrictMode>
);
