import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import QueueManagement from "../pages/QueueManagement/QueueManagement";

function AppRoutes() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Queue Management */}
        <Route
          path="/queue-management"
          element={
            token ? (
              <QueueManagement />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;