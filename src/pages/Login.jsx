import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, role } = response.data;
            login(token, role, email);

            if (role === 'ROLE_SUPER_ADMIN') navigate('/admin-dashboard');
            else if (role === 'ROLE_MANAGER') navigate('/manager-dashboard');
            else navigate('/user-dashboard');
        } catch (err) {
            setError(err.response?.status === 401 ? 'Invalid credentials' : 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-4">
                    <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
                </p>

                <p className="text-center text-sm mt-4 text-gray-500">
                    <Link to="/super-admin-login" className="hover:underline">Super Admin Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
