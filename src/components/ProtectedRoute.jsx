import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Component that protects routes based on user roles.
 * Redirects to login if user is not authenticated or doesn't have required role.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <div className="container text-center">
            <h2>Access Denied</h2>
            <p>You do not have permission to view this page.</p>
        </div>;
    }

    return children;
};

export default ProtectedRoute;
