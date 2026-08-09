import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import QueueManagement from "../pages/QueueManagement/QueueManagement";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import BookQueue from "../pages/BookQueue/BookQueue";

function AppRoutes() {

  const token = localStorage.getItem("token");

  return (

    <BrowserRouter>

      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
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
              <Navigate to="/login" replace />
            )
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            token ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Book Queue */}
        <Route
          path="/book-queue"
          element={
            token ? (
              <BookQueue />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;