import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SuperAdminLogin from './pages/SuperAdminLogin';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import UserDashboard from './pages/UserDashboard';

/**
 * Main App component that sets up routing and authentication context.
 * Defines all routes for the RBAC application with protected routes based on user roles.
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/super-admin-login" element={<SuperAdminLogin />} />

          {/* Protected Routes */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_SUPER_ADMIN']}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/manager-dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_MANAGER']}>
              <ManagerDashboard />
            </ProtectedRoute>
          } />

          <Route path="/user-dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_USER', 'ROLE_MANAGER', 'ROLE_SUPER_ADMIN']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
