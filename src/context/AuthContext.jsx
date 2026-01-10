import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

/**
 * Authentication context provider for managing user authentication state.
 * Provides login, logout functionality and user state management.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Init from stored token
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const username = localStorage.getItem('username');

        if (token && role && username) {
            setUser({ token, role, username });
        }
        setLoading(false);
    }, []);

    /**
     * Logs in the user by storing credentials and updating state.
     * @param {string} token - JWT token
     * @param {string} role - User role
     * @param {string} username - Username
     */
    const login = (token, role, username) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username);
        setUser({ token, role, username });
    };

    /**
     * Logs out the user by clearing stored data and resetting state.
     */
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

/**
 * Hook to access authentication context.
 * @returns {Object} Authentication context value
 */
export const useAuth = () => useContext(AuthContext);
