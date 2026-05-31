import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import {
  useState
} from "react";

import {
  AnimatePresence
} from "framer-motion";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Application from "./pages/Application";
import AddJob from "./pages/AddJob";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Kanban from "./pages/Kanban";

function AnimatedRoutes() {

  const location =
    useLocation();

  const [
    sidebarOpen,
    setSidebarOpen
  ] = useState(false);

  return (

    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="applications"
            element={<Application />}
          />

          <Route
            path="add-job"
            element={<AddJob />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="kanban"
            element={<Kanban />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;