import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Brand */}
                    <Link to="/" className="text-2xl font-bold text-indigo-600">
TaskBoard                    </Link>

                    {/* Links */}
                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/super-admin-login"
                                    className="px-3 py-1 text-sm text-gray-600 hover:text-indigo-600 transition"
                                >
                                    Super Admin
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">
                                    Hello, <span className="font-medium">{user.username}</span> ({user.role.replace('ROLE_', '')})
                                </span>
                                {user.role === 'ROLE_SUPER_ADMIN' && (
                                    <Link
                                        to="/admin-dashboard"
                                        className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                {user.role === 'ROLE_MANAGER' && (
                                    <Link
                                        to="/manager-dashboard"
                                        className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                {user.role === 'ROLE_USER' && (
                                    <Link
                                        to="/user-dashboard"
                                        className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                    >
                                        Profile
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
