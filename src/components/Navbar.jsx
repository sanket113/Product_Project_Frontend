import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Navigation bar component that displays different links based on authentication status and user role.
 * Shows login/register links for unauthenticated users, dashboard links for authenticated users.
 */
const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    /**
     * Handles user logout by calling logout function and navigating to login page.
     */
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">Task Tracker</Link>
            <div className="nav-links">
                {!user ? (
                    <>
                        <Link to="/login" className="btn btn-secondary">Login</Link>
                        <Link to="/register" className="btn">Register</Link>
                        <Link to="/super-admin-login" className="btn btn-secondary" style={{ fontSize: '0.8em' }}>Super Admin</Link>
                    </>
                ) : (
                    <>
                        <span style={{ alignSelf: 'center' }}>Hello, {user.username} ({user.role})</span>
                        {user.role === 'ROLE_SUPER_ADMIN' && <Link to="/admin-dashboard">Dashboard</Link>}
                        {user.role === 'ROLE_MANAGER' && <Link to="/manager-dashboard">Dashboard</Link>}
                        {user.role === 'ROLE_USER' && <Link to="/user-dashboard">Profile</Link>}
                        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
