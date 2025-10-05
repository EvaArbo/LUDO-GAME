import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../components/auth/AuthPage.jsx';
import Register from '../components/auth/Register.jsx';
import ForgotPassword from '../components/auth/ForgotPassword.jsx'; // <-- imported
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';
import Dashboard from '../components/auth/Dashboard.jsx';
import DeleteAccount from '../components/auth/DeleteAccount.jsx';
import App from '../App.jsx';

function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/delete-account"
        element={
          <ProtectedRoute>
            <DeleteAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/game"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
