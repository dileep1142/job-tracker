import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Application from "./pages/Application";
import AddJob from "./pages/AddJob";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* MAIN APP */}
        <Route
          path="/app"
          element={<Layout />}
        >
          {/* DEFAULT */}
          <Route
            index
            element={
              <Navigate to="dashboard" />
            }
          />

          {/* PAGES */}
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
            path="profile"
            element={<Profile />}
          />
        </Route>

        {/* INVALID ROUTE */}
        <Route
  path="*"
  element={<Login />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;